let selectedMol
let jsmeNomeclatureApplet
let atomSymbols3DFlag = true
let rotateFlag = false
let atomsCount, bondsCount
let carbonHydrogens
let bondList, multiBondListCC, svgBondList, atomValenceList
let multiBondsObj = { CCd: [], CCt: [], COd: [], CNt: [] }
let molBondType
let mainChainAtomsList
let mainChainAtoms3D = []
let allAtomsTypeList
let atomTypeObj, atomTypes
let atomConnectivityList
let functionalGroupObj, functionalGroupsList
let molType
let mode2D = 'condensed'
let modeSuffix = ''
let molSnap
let highAtoms
let nameAnalysisMode
let carbons = 0
let myNumberingTimeout
let numberingFlag = false
let numbersSVGElements = []
let currNumberEl = 0
let namingRules
let ruleFlag = false
let ruleTableHighlight = 0
let ruleTableFlag = false
let vis3D = 'ballnstick'
let JmolSelection = "select none"
let selectedRule
let nameComponentsList = []
let nameMainCompList1 = []
let nameMainCompObj3 = {}
let nameMultiPrefix = []
let functionalGroupsOrder = []
const gFunctionalGroupsOrder = ["carboxylicAcid", "cyanide", "aldehyde", "ketone", "alcohol", "amine", "nitro"];
let molTaxonomy = ""

///////// INIT JSME //////
function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "450px", "200px", {
        'options': "nozoom,depict,marker",
        'depictbg': '#fff',
        'atombgsize': '0.6',
    });
    // jsmeNomeclatureApplet.options("nozoom,depict,marker")
    jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6)

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#ff8566", "#66ff66"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())
}

$(document).ready(function () {

    fInitData()
    fInitNamingProps()
    fInitNomeclatureMenu()
    fInitTheory()
    fShowCreditLibs()

    // Add data (2D structure files ) to nameExamples object
    function fInitData() {
        for (let prop in nameExamples) {

            my2D = eval(prop + "_2D");
            my2D_Ε = eval(prop + "_2D_E");
            my2D_D = eval(prop + "_diagr2D");

            nameExamples[prop].structure2D = my2D
            nameExamples[prop].structure2D_Ε = my2D_Ε
            nameExamples[prop].structure2D_D = my2D_D

            my3D = "mols/nomeclature-moc2/" + prop + "_3D.sdf"
            nameExamples[prop].file3D = my3D
        }

    }

    function fInitNamingProps() {
        nameMainCompList1 = ["μεθ", "αιθ", "προπ", "βουτ", "πεντ", "εξ", "επτ", "οκτ", "εν", "δεκ"]

        nameMainCompObj3 = {
            hydrocarbon: { suffix: "ιο", substitute: "" },
            halogen: { suffix: 'ιο', substitute: { Br: "βρωμο", I: "ιωδο", F: "φθορο", Cl: "χλωρο" } },
            alcohol: { suffix: 'όλη', substitute: "υδροξυ" },
            aldehyde: { suffix: 'άλη', substitute: "οξο" },
            ketone: { suffix: 'όνη', substitute: "κετο" },
            carboxylicAcid: { suffix: 'ικό οξύ', substitute: "καβροξυ" },
            cyanide: { suffix: 'νιτρίλιο', substitute: "κυανο" },
            amine: { suffix: 'αμίνη', substitute: "αμινο" },
            nitro: { suffix: 'ιο', substitute: "νιτρο" }
        }

        nameMultiPrefix = ["", "δι", "τρι", "τετρα", "πεντα", "εξα", "επτα", "οκτα"]

        functionalGroupsOrder = ["carboxylicAcid", "cyanide", "aldehyde", "ketone", "alcohol", "amine", "nitro"]
    }

    function fSelectMol() {

        fInitProps()
        fClearHighlights()
        fLoadMol2D()
        fLoadMol3D()

        showAtomSymbols3D();
        rotate3D()

        // fShowNumbering()
        fShowMolName()
        fShowNameAnalysis()
        // fExplainNameComp()

        getMolData() // debug
    }

    function fDeselectMol() {
        fInitProps()
        fClearHighlights()

        selectedMol = null;
        $(".menuLi").removeClass("selectedLi");

        myMol3D = null;
        Jmol.script(jmolAppletNomeclature, "zap");

        myMol2D = null;
        jsmeNomeclatureApplet.reset()
        fUpdateSVG()

        $("#molName").html("")
        $("#nameAnalysis").html("")

    }

    function fInitProps() {
        currNumberEl = 0
        clearInterval(myNumberingTimeout)
        nameAnalysisMode = 'none'
        carbons = 0
        ruleTableHighlight = 0
    }

    function fShowMolName() {
        molName = nameExamples[selectedMol].name
        $("#molName").html(molName)
        // console.log(molName)
    }

    function fLoadMol2D() {

        switch (mode2D) {
            case 'condensed':
                myMol2D = nameExamples[selectedMol].structure2D
                break;
            case 'expanded':
                myMol2D = nameExamples[selectedMol].structure2D_Ε
                break;
            case 'diagramatic':
                myMol2D = nameExamples[selectedMol].structure2D_D
                break;
            default:
                myMol2D = nameExamples[selectedMol].structure2D
        }

        if (!myMol2D) { jsmeNomeclatureApplet.clear() }

        jsmeNomeclatureApplet.readMolFile(myMol2D);
        jsmeNomeclatureApplet.setMolecularAreaScale(2.4)

        fAnalyseStructure()
        fDetectMolType()
        fGuessName()
        fUpdateSVG()

    }

    function fAnalyseStructure() {
        carbons = 0
        atomTypeObj = {}
        atomTypes = []
        atomsCount = jsmeNomeclatureApplet.totalNumberOfAtoms();
        bondsCount = jsmeNomeclatureApplet.totalNumberOfBonds();
        allAtomsTypeList = Array(atomsCount)
        for (i = 1; i < atomsCount + 1; i++) {
            currAtomType = jsmeNomeclatureApplet.getAtom(0, i).label
            allAtomsTypeList[i - 1] = currAtomType
            if (!atomTypes.includes(currAtomType)) {
                atomTypes.push(currAtomType)
            }
            if (atomTypeObj.hasOwnProperty(currAtomType)) {
                atomTypeObj[currAtomType] += 1
            } else {
                atomTypeObj[currAtomType] = 1
            }

        }

        //// calculate the valencce and connectivity of each atom
        atomConnectivityList = Array(atomsCount).fill(0)
        atomValenceList = Array(atomsCount).fill(0)
        for (i = 1; i < bondsCount + 1; i++) {
            currBond = jsmeNomeclatureApplet.getBond(0, i);

            bondOrder = currBond.order
            bondAtom1 = currBond.atoms[0]
            bondAtom2 = currBond.atoms[1]

            if (allAtomsTypeList[bondAtom2 - 1] == "H" || allAtomsTypeList[bondAtom1 - 1] == "H") { continue }

            if (Array.isArray(atomConnectivityList[bondAtom1 - 1])) {
                atomConnectivityList[bondAtom1 - 1].push(bondAtom2 - 1)
            } else {
                atomConnectivityList[bondAtom1 - 1] = [bondAtom2 - 1]
            }

            if (Array.isArray(atomConnectivityList[bondAtom2 - 1])) {
                atomConnectivityList[bondAtom2 - 1].push(bondAtom1 - 1)
            } else {
                atomConnectivityList[bondAtom2 - 1] = [bondAtom1 - 1]
            }

            atomValenceList[bondAtom1 - 1] = atomValenceList[bondAtom1 - 1] + bondOrder
            atomValenceList[bondAtom2 - 1] = atomValenceList[bondAtom2 - 1] + bondOrder
        }

        //// calculate the hydrogens of each cabon atom
        for (i = 0; i < atomsCount; i++) {
            if (allAtomsTypeList[i] == 'C') {
                carbonHydrogens[i] = 4 - atomValenceList[i]
                carbons += 1
            } else {
                carbonHydrogens[i] = 0
            }
        }

        //// analyse bonds

        bondList = Array(bondsCount)
        multiBondListCC = []
        multiBondsObj = { CCd: [], CCt: [], COd: [], CNt: [] }
        svgBondList = []
        let svgBondCounter = 0
        for (i = 1; i < bondsCount + 1; i++) {
            let currBond = jsmeNomeclatureApplet.getBond(0, i);
            bondOrder = currBond.order
            svgBondCounter += 1
            svgBondList.push(svgBondCounter)
            svgBondCounter += (bondOrder - 1)
            bondAtom1 = currBond.atoms[0]
            atomType1 = jsmeNomeclatureApplet.getAtom(0, bondAtom1).label
            bondAtom2 = currBond.atoms[1]
            atomType2 = jsmeNomeclatureApplet.getAtom(0, bondAtom2).label
            bondList[i - 1] = [bondAtom1, bondAtom2, bondOrder]
            if (bondOrder > 1 && atomType1 == atomType2 && atomType1 == 'C') {
                multiBondListCC.push(i)
            }
            switch (bondOrder) {
                case 2:
                    if (atomType1 == atomType2 && atomType1 == 'C') {
                        multiBondsObj.CCd.push(i)
                    }

                    if ((atomType1 == "O" && atomType2 == 'C') || (atomType1 == "C" && atomType2 == 'O')) {
                        multiBondsObj.COd.push(i)
                    }
                    break;
                case 3:
                    if (atomType1 == atomType2 && atomType1 == 'C') {
                        multiBondsObj.CCt.push(i)
                    }
                    if ((atomType1 == "N" && atomType2 == 'C') || (atomType1 == "C" && atomType2 == 'N')) {
                        multiBondsObj.CNt.push(i)
                    }
                    break;
            }
        }

    }

    function fDetectMolType() {
        molType = ""
        functionalGroupObj = {}
        myAtomTypes = Object.keys(atomTypeObj)

        if (atomTypes.length == 1) { ///// only Carbon atoms
            if (atomTypes.includes("C")) {
                molType = 'hydrocarbon-'
                molTaxonomy = "Υδρογονάνθρακες"
                functionalGroupObj.hydrocarbon = { C: [1] }
            } else {
                molType = "not organic"
            }
        } else {
            molType = "homolog-"

            for (t = 0; t < myAtomTypes.length; t++) {
                if (myAtomTypes[t] == "C") {
                    continue
                } else {
                    myHetero = myAtomTypes[t]
                }

                if (["Cl", "Br", "F", "I"].includes(myHetero)) {
                    myX = "X"
                } else {
                    myX = myHetero
                }

                myXcount = atomTypeObj[myHetero]
                myStart = allAtomsTypeList.indexOf(myHetero)
                switch (myX) {
                    case "X":
                        myFunctionalGroup = "halogen"
                        molTaxonomy = "Υδρογονάνθρακες"
                        for (i = 0; i < myXcount; i++) {
                            for (j = myStart; j < allAtomsTypeList.length; j++) {
                                if (allAtomsTypeList[j] == myHetero) {
                                    myXAtomIndex = j
                                    if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                        if (functionalGroupObj[myFunctionalGroup].hasOwnProperty(myHetero)) {
                                            functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = j
                                        } else {
                                            functionalGroupObj[myFunctionalGroup][myHetero] = [j]
                                        }
                                    } else {
                                        functionalGroupObj[myFunctionalGroup] = {}
                                        functionalGroupObj[myFunctionalGroup][myHetero] = [j]
                                    }
                                    myStart = j + 1
                                    break
                                }
                            }
                        }
                        break;
                    case "N":
                        for (i = 0; i < myXcount; i++) {
                            for (j = myStart; j < allAtomsTypeList.length; j++) {
                                if (allAtomsTypeList[j] == myHetero) {
                                    myXAtomIndex = j
                                    //check if terminal
                                    if (atomConnectivityList[j].length == 1) { // is terminal
                                        // check bond order from valency
                                        switch (atomValenceList[j]) {
                                            case 1:// single bond
                                                myFunctionalGroup = "amine"
                                                molTaxonomy = "Αμίνες"
                                                break;
                                            case 2:// double bond 
                                                myFunctionalGroup = "imine"
                                                molTaxonomy = "Ιμίνες"
                                                break;
                                            case 3:// triple bond
                                                myFunctionalGroup = "cyanide"
                                                molTaxonomy = "Νιτρίλια"
                                                break;
                                        }
                                    } else { //is not terminal   
                                        switch (atomValenceList[j]) {
                                            case 2:// two single bonds 
                                                myFunctionalGroup = "CCamine"
                                                break;
                                            case 3:// single and double bonds // WRONG!!!! Τριτοταγης αμίνη 3 απλοί !!!!!!!!!!!!
                                                myFunctionalGroup = "CCimine"
                                                break;
                                            case 4:
                                                myFunctionalGroup = "nitro"
                                                molTaxonomy = "Υδρογονάνθρακες"

                                                break;
                                        }
                                    }
                                    if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                        functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = j
                                    } else {
                                        functionalGroupObj[myFunctionalGroup] = {}
                                        functionalGroupObj[myFunctionalGroup][myHetero] = [j]
                                    }
                                    myStart = j + 1
                                    console.log("found N functional group: ", functionalGroupObj)
                                    break
                                }
                            }
                        }
                        break;
                    case "O":
                        for (i = 0; i < myXcount; i++) {
                            for (j = myStart; j < allAtomsTypeList.length; j++) {
                                if (allAtomsTypeList[j] == myHetero) {
                                    myXAtomIndex = j
                                    //check if terminal
                                    if (atomConnectivityList[j].length == 1) { // is terminal
                                        // check bond order from valency
                                        switch (atomValenceList[j]) {
                                            case 1:// single bond
                                                myFunctionalGroup = "alcohol"
                                                molTaxonomy = "Αλκοόλες"
                                                break;
                                            case 2:// double bond 
                                                theCarbon = atomConnectivityList[j]
                                                if (atomValenceList[theCarbon] == 3) {
                                                    myFunctionalGroup = "aldehyde"
                                                    molTaxonomy = "Αλδεΰδες"
                                                } else {
                                                    myFunctionalGroup = "ketone"
                                                    molTaxonomy = "Κετόνες"
                                                }
                                                break;
                                        }
                                    } else { //is not terminal   
                                        myFunctionalGroup = "ether"
                                        molTaxonomy = "Αιθέρες"
                                    }
                                    if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                        functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = j
                                    } else {
                                        functionalGroupObj[myFunctionalGroup] = {}
                                        functionalGroupObj[myFunctionalGroup][myHetero] = [j]
                                    }
                                    myStart = j + 1
                                    break
                                }
                            }
                        }

                        // check if acid 
                        if (functionalGroupObj.hasOwnProperty("alcohol") && functionalGroupObj.hasOwnProperty("ketone")) {
                            for (a = functionalGroupObj.alcohol.O.length - 1; a >= 0; a--) {
                                theAtom1 = atomConnectivityList[functionalGroupObj.alcohol.O[a]][0]
                                for (k = functionalGroupObj.ketone.O.length - 1; k >= 0; k--) {
                                    theAtom2 = atomConnectivityList[functionalGroupObj.ketone.O[k]][0]
                                    if (theAtom1 == theAtom2) {
                                        if (allAtomsTypeList[theAtom1] == "C") {
                                            myFunctionalGroup = "carboxylicAcid"
                                            molTaxonomy = "Καροξυλικά οξέα"
                                        } else if (allAtomsTypeList[theAtom1] == "N") {
                                            myFunctionalGroup = "nitro"
                                            myHetero = "N"
                                            molTaxonomy = "Υδρογονάνθρακες"
                                        }

                                        if (myFunctionalGroup == "carboxylicAcid") {
                                            if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                                functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = [functionalGroupObj.alcohol.O[a], functionalGroupObj.ketone.O[k]]
                                            } else {
                                                functionalGroupObj[myFunctionalGroup] = {}
                                                functionalGroupObj[myFunctionalGroup][myHetero] = [[functionalGroupObj.alcohol.O[a], functionalGroupObj.ketone.O[k]]]
                                            }
                                        }
                                        functionalGroupObj.alcohol.O.splice(a, 1)
                                        functionalGroupObj.ketone.O.splice(k, 1)

                                    }
                                }
                            }
                            if (functionalGroupObj.alcohol.O.length == 0) {
                                delete functionalGroupObj.alcohol
                            }
                            if (functionalGroupObj.ketone.O.length == 0) {
                                delete functionalGroupObj.ketone
                            }
                        }

                        // check if ester
                        if (functionalGroupObj.hasOwnProperty("ether") && functionalGroupObj.hasOwnProperty("ketone")) {
                            for (e = functionalGroupObj.ether.O.length - 1; e >= 0; e--) {
                                theCarbon1 = atomConnectivityList[functionalGroupObj.ether.O[e]][0]
                                theCarbon2 = atomConnectivityList[functionalGroupObj.ether.O[e]][1]
                                if (atomValenceList[theCarbon1] >= 3) {
                                    for (c = 0; c < atomConnectivityList[theCarbon1].length; c++) {
                                        if (allAtomsTypeList[c] == "O" && atomValenceList[c] == 2) {
                                            myFunctionalGroup = "ester"
                                            molTaxonomy = "Εστέρες"
                                            if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                                functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = [functionalGroupObj.ether.O[a], c]
                                            } else {
                                                functionalGroupObj[myFunctionalGroup] = {}
                                                functionalGroupObj[myFunctionalGroup][myHetero] = [[functionalGroupObj.ether.O[a], c]]
                                            }
                                            functionalGroupObj.ether.O.splice(e, 1)
                                            break;
                                        }
                                    }
                                } else if (atomValenceList[theCarbon2] >= 3) {
                                    for (c = 0; c < atomConnectivityList[theCarbon1].length; c++) {
                                        if (allAtomsTypeList[c] == "O" && atomValenceList[c] == 2) {
                                            myFunctionalGroup = "ester"
                                            molTaxonomy = "Εστέρες"
                                            if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                                functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = [functionalGroupObj.ether.O[a], c]
                                            } else {
                                                functionalGroupObj[myFunctionalGroup] = {}
                                                functionalGroupObj[myFunctionalGroup][myHetero] = [[functionalGroupObj.ether.O[a], c]]
                                            }
                                            functionalGroupObj.ether.O.splice(e, 1)
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        break;
                }

            }
        }

    }

    function fGuessName() {

        // ελεγχει αν ειναι υδρογονανθρακας
        functionalGroupsList = Object.keys(functionalGroupObj)
        if (functionalGroupsList.length == 0) {
            functionalGroupObj.hydrocarbon = allAtomsTypeList
            functionalGroupsList = Object.keys(functionalGroupObj)
        }

        ////// GUESS MOLECULE NAME ///////////
        switch (mode2D) {
            case 'condensed':
                theSuffix = ''
                break;
            case 'expanded':
                theSuffix = '_E'
                break;
            case 'diagramatic':
                theSuffix = '_diagr'
                break;
        }
        mainChainAtomsList = nameExamples[selectedMol]['mainChain' + theSuffix]
        mainChainAtoms3D = nameExamples[selectedMol].mainChain3D // for 3D highlighting and multiBond detection

        guessNameObj = {}
        comp0 = null // αριθμητικό  υποκαταστατων μπροστά στο το όνομα
        comp0b = null // αριθμητικό 2ou  υποκαταστατη μπροστά στο το όνομα
        comp0Text = null // αλκυλαλογονίδια μπροστα στο το όνομα
        comp0bText = null // 2o αλκυλαλογονίδια μπροστα στο το όνομα
        comp3 = null // αριθμητικό συνθετικό υποκαταστατων της βαρυτερης ομαδας
        comp1 = nameMainCompList1[mainChainAtomsList.length - 1] // 1ο Κυριο συνθετικό: μεθ/αιθ/προπ..... 
        comp1No = null // αριθμός θέσης διπλου/τριπλου δεσμού όταν μπαινει πριν του 1ου κυριου συνθετικού μετα από υποκαταστάτη αλογονο
        ////// 
        comp2 = "" // 2ο Κυριο συνθετικό: αν/εν/ιν
        comp2b = "" // 2ο Κυριο συνθετικό: ιν (για περιπτωση διπλων και τριπλων δεσμων)
        bondPrefixDB = "" //Αρίθμηση διπλων δεσμών CC
        bondPrefixΤB = "" //Αριθμιση τριπλών δεσμων CC
        if (multiBondListCC.length > 0) {
            // διπλοι δεσμοι
            sortedMultiDBonds = []
            for (i = 0; i < multiBondsObj.CCd.length; i++) {
                currDouble = multiBondsObj.CCd[i]
                bondAtom1 = bondList[currDouble - 1][0]
                bondAtom2 = bondList[currDouble - 1][1]
                bondPos = Math.min(mainChainAtomsList.indexOf(bondAtom1), mainChainAtomsList.indexOf(bondAtom2)) + 1
                sortedMultiDBonds.push(bondPos)
            }
            if (sortedMultiDBonds.length > 0) {
                sortedMultiDBonds.sort()
            }
            for (i = 0; i < sortedMultiDBonds.length; i++) {
                bondPrefixDB += sortedMultiDBonds[i]
                if (i < sortedMultiDBonds.length - 1) {
                    bondPrefixDB += ","
                } else {
                    bondPrefixDB += "-"
                }
                comp0 = bondPrefixDB
            }
            //Τριπλοι Δεσμοί
            sortedMultiTBonds = []
            for (i = 0; i < multiBondsObj.CCt.length; i++) {
                currTriple = multiBondsObj.CCt[i]
                bondAtom1 = bondList[currTriple - 1][0]
                bondAtom2 = bondList[currTriple - 1][1]
                bondPos = Math.min(mainChainAtomsList.indexOf(bondAtom1), mainChainAtomsList.indexOf(bondAtom2)) + 1
                sortedMultiTBonds.push(bondPos)
            }
            if (sortedMultiTBonds.length > 0) {
                sortedMultiTBonds.sort()
            }
            for (i = 0; i < sortedMultiTBonds.length; i++) {
                bondPrefixΤB += sortedMultiTBonds[i]
                if (i < sortedMultiTBonds.length - 1) {
                    bondPrefixΤB += ","
                } else {
                    bondPrefixΤB += "-"
                }
                comp0 = bondPrefixΤB
            }
            if (mainChainAtomsList.length <= 3) { // Αν η κυρια αλυσιδα είναι μέχρι 3 άτομα C, τότε χωρις αρίθμηση πολλαπλών δεσμων
                bondPrefixDB = ""
                bondPrefixΤB = ""
                comp0 = null
            }

            if (sortedMultiDBonds.length > 0 && sortedMultiTBonds.length == 0) { //μονο διπλοι δεσμοι
                comp2 += nameMultiPrefix[sortedMultiDBonds.length - 1] + "εν"
            } else if (sortedMultiDBonds.length == 0 && sortedMultiTBonds.length > 0) { // μονο τριπλοι δεσμοι
                comp2 += nameMultiPrefix[sortedMultiTBonds.length - 1] + "ιν"
            } else if (sortedMultiDBonds.length > 0 && sortedMultiTBonds.length > 0) { // διπλοι και τριπλοι δεσμοι
                comp0 = bondPrefixDB
                comp2 += nameMultiPrefix[sortedMultiDBonds.length - 1] + "εν"
                comp3 = "-" + bondPrefixΤB
                comp2b = "ιν"
            }
        } else {  // μόνο απλοι δεσμοι
            comp2 = "αν"
        }

        comp0NumberList = [] // αριθμοί θέσεων πολλων υποκαταστατών για το comp0
        comp0TextList = [] // ονόματα πολλων υποκαταστατών για το comp0Text
        subPrefix = "" // συνθετικό υποκαταστατων
        if (functionalGroupsList.length < 2) { // αν περιέχει 1 ΧΟ
            comp4 = nameMainCompObj3[functionalGroupsList[0]].suffix // 3<sup>o</sup> Κυριο Συνθετικό - κατάληξη
            switch (functionalGroupsList[0]) { // ΟΜΟΛΟΓΕΣ ΣΕΙΡΕΣ
                case "halogen": //ΑΛΚΥΛΑΛΟΓΟΝΙΔΙΑ
                    theHalogens = Object.keys(functionalGroupObj.halogen)
                    sortedHalogens = Object.keys(nameMainCompObj3.halogen.substitute)
                    for (let i = sortedHalogens.length - 1; i >= 0; i--) { // αλβαβητική σειρα αλογόνων
                        if (theHalogens.indexOf(sortedHalogens[i]) < 0) {
                            sortedHalogens.splice(i, 1)
                        }
                    }
                    for (let i = sortedHalogens.length - 1; i >= 0; i--) { // τρεχει για κάθε διαφορετικό αλογόνο που υπάρχει
                        let currX = sortedHalogens[i]
                        myXpositions = ""
                        theCountPrefix = nameMultiPrefix[functionalGroupObj.halogen[currX].length - 1] // Δι, τρι, τετρα....
                        for (j = 0; j < functionalGroupObj.halogen[currX].length; j++) { // τρέχει για όλα τα άτομα του συγκεκριμένου αλογονου
                            theXno = functionalGroupObj.halogen[currX][j]
                            currXPos = mainChainAtomsList.indexOf(atomConnectivityList[theXno][0] + 1) + 1
                            myXpositions += currXPos
                            if (j < functionalGroupObj.halogen[currX].length - 1) {
                                myXpositions += ","
                            }
                        }
                        // subPrefix = myXpositions + "-" + theCountPrefix + nameMainCompObj3.halogen.substitute[currX] + "-" + subPrefix
                        subPrefix = theCountPrefix + nameMainCompObj3.halogen.substitute[currX]
                        comp0NumberList.push(myXpositions) // για να φτιαχτει το comp0 με τις θεσεις των αλογονων
                        comp0TextList.push(subPrefix) // για να φτιαχτει το comp0Text με τις ονομασιες των αλογονων
                    }
                    // console.log(comp0NumberList, comp0TextList)
                    comp0 = myXpositions + "-"
                    comp0Text = subPrefix
                    // PATCH 
                    if (bondPrefixDB !== "") {
                        comp1No = "-" + bondPrefixDB
                    } else {
                        comp1No = ""
                    }
                    // console.log("bondPrefixDB", bondPrefixDB)
                    break; /// ΤΕΛΟΣ αλκυλαλογονίδια
                case "nitro":
                    myFunctionalGroups = functionalGroupObj[functionalGroupsList[0]].N

                    myXpositions = ""
                    sortedFunPositions = []
                    theCountPrefix = nameMultiPrefix[myFunctionalGroups.length - 1] // Δι, τρι, τετρα....
                    for (i = 0; i < myFunctionalGroups.length; i++) { // τρέχει για όλες τις εμφανίσεις της ΧΟ
                        theXno = myFunctionalGroups[i]
                        currXPos = mainChainAtomsList.indexOf(atomConnectivityList[theXno][0] + 1) + 1
                        sortedFunPositions.push(currXPos)
                    }
                    sortedFunPositions.sort()
                    for (j = 0; j < sortedFunPositions.length; j++) {
                        myXpositions += sortedFunPositions[j]
                        if (j < sortedFunPositions.length - 1) {
                            myXpositions += ","
                        }
                    }
                    if (mainChainAtomsList.length < 3) {
                        myXpositions = ""
                    } else {
                        myXpositions += "-"
                    }

                    // comp1 = myXpositions + nameMainCompObj3.nitro.substitute + comp1
                    comp0 = myXpositions
                    comp0Text = nameMainCompObj3.nitro.substitute

                    break;
                case "ketone":  // Κετόνες και Αλκοολες
                case "alcohol":
                    myFunctionalGroups = functionalGroupObj[functionalGroupsList[0]].O

                    myXpositions = ""
                    sortedFunPositions = []
                    theCountPrefix = nameMultiPrefix[myFunctionalGroups.length - 1] // Δι, τρι, τετρα....
                    for (i = 0; i < myFunctionalGroups.length; i++) { // τρέχει για όλες τις εμφανίσεις της ΧΟ
                        theXno = myFunctionalGroups[i]
                        currXPos = mainChainAtomsList.indexOf(atomConnectivityList[theXno][0] + 1) + 1
                        sortedFunPositions.push(currXPos)
                    }
                    sortedFunPositions.sort()
                    for (j = 0; j < sortedFunPositions.length; j++) {
                        myXpositions += sortedFunPositions[j]
                        if (j < sortedFunPositions.length - 1) {
                            myXpositions += ","
                        }
                    }

                    if (functionalGroupsList[0] == "alcohol") {
                        if (mainChainAtomsList.length < 3) {
                            myXpositions = ""
                        } else {
                            myXpositions += "-"
                        }
                    } else {
                        if (mainChainAtomsList.length < 5) {
                            myXpositions = ""
                        } else {
                            myXpositions += "-"
                        }
                    }
                    if (multiBondListCC.length == 0) {
                        comp0 = myXpositions
                        // comp1 = myXpositions + comp1
                        comp4 = theCountPrefix + comp4
                    } else {
                        comp3 = "-" + myXpositions
                        comp4 = theCountPrefix + comp4
                    }
                    break;
                // 
                case "cyanide":
                case "aldehyde":
                case "carboxylicAcid":
                    myFunctionalGroups = functionalGroupObj[functionalGroupsList[0]][Object.keys(functionalGroupObj[functionalGroupsList[0]])[0]]
                    if (myFunctionalGroups.length < 3) {
                        theCountPrefix = nameMultiPrefix[myFunctionalGroups.length - 1] // τιποτα ή  Δι
                    } else {
                        theCountPrefix = nameMultiPrefix[1] // Δι
                    }
                    comp4 = theCountPrefix + comp4
                    break;
            }

        } else { // αν περιέχει > 1 ΧΟ
            console.log("multiple functional groups ", functionalGroupsList)
            functionalGroupsOrder = ["carboxylicAcid", "cyanide", "aldehyde", "ketone", "alcohol", "amine", "nitro"]

            ///////// PATCH για σωστή σειρά υποκαταστατών ////////////

            functionalGroupsList.sort(function (a, b) {
                return functionalGroupsOrder.indexOf(b) - functionalGroupsOrder.indexOf(a);
            });

            /////////////////////////////////////////

            // functionalGroupsOrder
            for (i = functionalGroupsOrder.length - 1; i >= 0; i--) {
                if (functionalGroupsList.indexOf(functionalGroupsOrder[i]) < 0) {
                    functionalGroupsOrder.splice(i, 1)
                }
            }

            if (functionalGroupsOrder[0] == "cyanide") {
                myFunctionalGroups = functionalGroupObj[functionalGroupsOrder[0]].N
            } else {
                myFunctionalGroups = functionalGroupObj[functionalGroupsOrder[0]].O
            }
            if (myFunctionalGroups.length < 3) {
                theCountPrefix = nameMultiPrefix[myFunctionalGroups.length - 1] // τιποτα ή Δι
            } else {
                theCountPrefix = nameMultiPrefix[1] // δι
            }

            comp4 = theCountPrefix + nameMainCompObj3[functionalGroupsOrder[0]].suffix // 3<sup>o</sup> Κυριο Συνθετικό - κατάληξη
            // console.log(comp4)
            XOPrefix = ""
            myXpositions = ""
            sortedFunPositions = []
            for (i = 1; i < functionalGroupsOrder.length; i++) {
                currXO = functionalGroupsOrder[i] // η τρεχουσα ΧΟ υποκαταστατη
                currXOhetero = Object.keys(functionalGroupObj[functionalGroupsOrder[i]])[0] // το ετεροάτομο της ΧΟ
                currXOcount = functionalGroupObj[functionalGroupsOrder[i]][currXOhetero].length // ποσες φορες υπάρχει η ΧΟ
                theCountPrefix = nameMultiPrefix[currXOcount - 1] // τιποτα,Δι,τρι....

                for (j = 0; j < currXOcount; j++) {
                    theXno = functionalGroupObj[functionalGroupsOrder[i]][currXOhetero][j] // ο αριθμός του ετερορατομου της τρεχουσας ΧΟ
                    currXPos = mainChainAtomsList.indexOf(atomConnectivityList[theXno][0] + 1) + 1
                    sortedFunPositions.push(currXPos)
                }
                sortedFunPositions.sort()
                for (j = 0; j < sortedFunPositions.length; j++) {
                    myXpositions += sortedFunPositions[j]
                    if (j < sortedFunPositions.length - 1) {
                        myXpositions += ","
                    } else {
                        myXpositions += "-"
                    }
                }

                if (currXO == "aldehyde") { myXpositions = "" }
                if (currXO == "ketone" && mainChainAtomsList.length < 5) { myXpositions = "" }

                XOPrefix += nameMainCompObj3[currXO].substitute
            }

            // comp0 = myXpositions + theCountPrefix + XOPrefix;
            comp0 = myXpositions;
            comp0Text = theCountPrefix + XOPrefix;

            // comp1 = myXpositions + theCountPrefix + XOPrefix + comp1

        }
        // guessName = comp1 + comp2 + comp4
        if (comp0NumberList.length > 1) {
            /// μονο 2 αλογονα ΘΕΛΕΙ ΛΟΥΠΑ !!!ΧΧΧ!!!
            comp0 = comp0NumberList[1] + "-"
            comp0Text = comp0TextList[1]
            comp0b = "-" + comp0NumberList[0] + "-"
            comp0bText = comp0TextList[0]
        }

        console.log(comp0, comp0Text, comp0b, comp0bText, comp1No, comp1, comp2, comp3, comp2b, comp4)

        nameComponentsList = [comp0, comp0Text, comp0b, comp0bText, comp1No, comp1, comp2, comp3, comp2b, comp4]

    }

    function fAddHydrogens2SVG() {
        // console.log('Hydr')
        molSnap = Snap("#jsmeNomeclatureSVG svg")

        tmpTexts = molSnap.selectAll('text')
        tmpRects = molSnap.selectAll('rect')
        tmpBonds = molSnap.selectAll('line')
        for (i = 0; i < tmpBonds.length; i++) {

        }

        for (i = 0; i < tmpTexts.length; i++) {
            currText = tmpTexts[i].attr('text');
            currElement = molSnap.select("text:nth-of-type(" + (i + 1) + ")");

            if (currText === 'C') {
                currID = currText + (i + 1)

                currHydrogensCount = carbonHydrogens[i]
                switch (currHydrogensCount) {
                    case 0:
                        myLabel = 'C'
                        myNo = ''
                        break
                    case 1:
                        myLabel = 'CH'
                        myNo = ''
                        tmpRects[i + 1].attr({ width: 470 })
                        rectX = parseInt(tmpRects[i + 1].attr('x')) + 60
                        tmpRects[i + 1].attr({ x: rectX })
                        break
                    case 4:
                        myLabel = 'CH'
                        myNo = 4
                        break
                    default:
                        myLabel = 'CH'
                        myNo = currHydrogensCount
                        tmpRects[i + 1].attr({ width: 600 })
                        rectX = parseInt(tmpRects[i + 1].attr('x')) - 120
                        tmpRects[i + 1].attr({ x: rectX })
                        textX = parseInt(tmpTexts[i].attr('x')) - 160
                        tmpTexts[i].attr({ x: textX })
                }

                currString = tmpTexts[i].toString();
                newString = currString.replace((['>C</text>']), 'class="svgAtomLabel" id="' + currID + '"><tspan >' + myLabel + '<tspan dy="70" font-size=".8em">' + myNo + '</tspan></tspan></text>');
                newStringElement = Snap.parse(newString)
                tmpTexts[i].remove()
                molSnap.select("g").append(newStringElement)

            } else {
                currString = tmpTexts[i].toString();
                newStringElement = Snap.parse(currString)
                tmpTexts[i].remove()
                molSnap.select("g").append(newStringElement)
            }

        }

    }

    function fUpdateSVG() {

        let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
        $("#jsmeNomeclatureSVG").html(mySVG);
        if (mode2D == 'condensed') {
            // fAnalyseStructure()
            fAddHydrogens2SVG()
        }
        molSnap = Snap("#jsmeNomeclatureSVG svg")
        snapLogo = molSnap.select('polygon:last-of-type')
        snapLogo.remove()

    }

    function patchtheNitrogen() {
        ////// NH2 special case PATCH //////    
        if (functionalGroupObj.hasOwnProperty("amine")) {
            molSnap.selectAll('text').forEach(function (el) {
                var txt = el.attr('text') || '';
                if (String(txt).trim() === '2') {
                    el.attr({ text: 'NH2' });
                }
            });
        }
        ////// NO2 special case PATCH //////    
        if (functionalGroupObj.hasOwnProperty("nitro")) {
            molSnap.selectAll('text').forEach(function (el) {
                var txt = el.attr('text') || '';
                if (String(txt).trim() === '+') {
                    el.attr({ text: 'N+' });
                }
                if (String(txt).trim() === '-') {
                    el.attr({ text: 'O-' });
                }
            });
        }
    }

    function fLoadMol3D() {
        let myMol3D = nameExamples[selectedMol].file3D
        Jmol.script(jmolAppletNomeclature, "frank off;load " + myMol3D + ";  select all; center selected;" + nameExamples[selectedMol].moveto + "; script spt/init-3.spt;");
        fSetMolVis3D()
    }

    function showAtomSymbols3D() {
        if (atomSymbols3DFlag) {
            Jmol.script(jmolAppletNomeclature, "select all; labels %e;" + JmolSelection + ";")
        } else {
            Jmol.script(jmolAppletNomeclature, "select all; labels off;" + JmolSelection + ";")
        }

        if (nameAnalysisMode == 'compCarbonsCount') {
            fShowNumbering3D()
        }
    }

    function rotate3D() {
        if (rotateFlag) {
            Jmol.script(jmolAppletNomeclature, "rotate spin 60;")
        } else {
            Jmol.script(jmolAppletNomeclature, "rotate  off;")
        }

    }

    $("#radio2DMode").on("click", ".radioCheckContainer", function () {
        currMode2DNo = $(this).parent().children(".radioCheckContainer").index(this);
        switch (currMode2DNo) {
            case 0:
                mode2D = 'condensed'
                modeSuffix = ''
                break;
            case 1:
                mode2D = 'expanded'
                modeSuffix = '_E'
                break;
            case 2:
                mode2D = 'diagramatic'
                modeSuffix = '_diagr2D'
                break;

        }

        fLoadMol2D()
        currNumberEl = 0
        fExplainNameComp()

        // getMolData() // debug

    });

    ///////////////  Name Analysis /////////////////

    function fInitTheory() {
        r0 = "Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα (χωρίς διακλαδώσεις) προκύπτει από τον συνδυασμό τριών συνθετικών."
        r1 = "Το πρώτο συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας."
        r2 = "Το δεύτερο συνθετικό δείχνει το είδος των δεσμών μεταξύ των ατόμων άνθρακα (βαθμός κορεσμού της ένωσης)."
        r3 = "Το τρίτο συνθετικό δηλώνει την χημική τάξη που ανήκει η οργανική ένωση."
        r4 = ""

        r1Table = "   <div class='VFlex namingRuleTable rule1'>" +
            "        <div class='HFlex ruleRow'>" +
            "                <div class='ruleCase ruleTableTitle'> Άτομα Άνθρακα </div>" +
            "              <div class=' ruleName ruleTableTitle'> 1<sup>o</sup> Συνθετικό </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>1 C</div>" +
            "            <div class='ruleName'> Μεθ- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>2 C</div>" +
            "            <div class='ruleName'> Αιθ- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>3 C</div>" +
            "            <div class='ruleName'> Προπ- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>4 C</div>" +
            "            <div class='ruleName'> Βουτ- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>5 C</div>" +
            "            <div class='ruleName'> Πεντ- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>6 C</div>" +
            "            <div class='ruleName'> Εξ- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>7 C</div>" +
            "            <div class='ruleName'> Επτ- </div>" +
            "        </div>" +
            "    </div>";

        r2Table = "    <div class='VFlex namingRuleTable rule2'>" +
            "        <div class='HFlex ruleRow'>" +
            "                <div class='ruleCase ruleTableTitle'> Είδος Δεσμών </div>" +
            "              <div class=' ruleName ruleTableTitle'> 2<sup>o</sup> Συνθετικό </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>Απλοί δεσμοί</div>" +
            "            <div class='ruleName'> -αν- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> 1 διπλός δεσμός </div>" +
            "            <div class='ruleName'> -εν- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> 1 τριπλός δεσμός </div>" +
            "            <div class='ruleName'> -ιν- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> 2 διπλοί δεσμοί </div>" +
            "            <div class='ruleName'> -διεν- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> 3 διπλοί δεσμοί </div>" +
            "            <div class='ruleName'> -τριεν- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> 2 τριπλοί δεσμοί </div>" +
            "            <div class='ruleName'> -διιν- </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> 1 διπλός + 1 τριπλός</div>" +
            "            <div class='ruleName'> -ενιν- </div>" +
            "        </div>" +
            "    </div>";

        r3Table = "    <div class='VFlex namingRuleTable rule3'>" +
            "        <div class='HFlex ruleRow'>" +
            "                <div class='ruleCase ruleTableTitle'> Χημική Τάξη </div>" +
            "              <div class=' ruleName ruleTableTitle'> 3<sup>o</sup> Συνθετικό </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'>Υδρογονάνθρακας</div>" +
            "            <div class='ruleName'> -ιο </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> Αλκοόλη (-ΟΗ) </div>" +
            "            <div class='ruleName'> -όλη </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> Αλδεϋδη (-CH=O) </div>" +
            "            <div class='ruleName'> -άλη </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> Κετόνη (C-C(=O)-C) </div>" +
            "            <div class='ruleName'> -όνη </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> Καρβοξυλικό οξύ (-COOH)</div>" +
            "            <div class='ruleName'> -ικό οξύ </div>" +
            "        </div>" +
            "        <div class='HFlex ruleRow'>" +
            "            <div class='ruleCase'> Νιτρίλιο (-CN) </div>" +
            "            <div class='ruleName'> -νιτρίλιο </div>" +
            "        </div>" +
            "    </div>";

        r4Table = `
        <div class='VFlex namingRuleTable rule4'>
            <div class='HFlex ruleRow'>
                <div class='ruleCase'><span class='orderNo'>1.</span> Καρβοξύλιο </div>
                <div class='ruleName'> -COOH </div>
            </div>
            <div class='HFlex ruleRow'>
                <div class='ruleCase'><span class='orderNo'>2.</span> Κυανομάδα </div>
                <div class='ruleName'> -CN </div>
            </div>
            <div class='HFlex ruleRow'>
                <div class='ruleCase'><span class='orderNo'>3.</span> Αλδεϋδομάδα </div>
                <div class='ruleName'> -CH=O </div>
            </div>
            <div class='HFlex ruleRow'>
                <div class='ruleCase'><span class='orderNo'>4.</span> Κετονομάδα </div>
                <div class='ruleName'> C-C(=O)-C </div>
            </div>
            <div class='HFlex ruleRow'>
                <div class='ruleCase'><span class='orderNo'>5.</span> Υδροξύλιο</div>
                <div class='ruleName'> -OH </div>
            </div>
            <div class='HFlex ruleRow'>
                <div class='ruleCase'><span class='orderNo'>6.</span> Αμινοομάδα</div>
                <div class='ruleName'> -ΝΗ<sub>2</sub> </div>
            </div>
        </div>
        `;

        let rulesTheory_1_8 = ["Η αρίθμηση της ανθρακικής αλυσίδας αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα ή στον Πολλαπλό Δεσμό", "Η θέση της Χαρακτηριστικής Ομάδας ή του Πολλαπλού Δεσμού καθορίζεται με έναν αριθμό που γράφεται στην αρχή του ονόματος της ένωσης.", "Αλδεΰδες (-CH=O), καρβοξυλικά οξέα (-COOH) και νιτρίλια (-CN) είναι Χαρακτηριστικές Ομάδες που βρίσκονται υποχρεωτικά στην άκρη της ανθρακικής αλυσίδας και η αρίθμηση αρχίζει από τον άνθρακα της Χαρακτηριστικής Ομάδας.", "Αν στην οργανική ένωση έχουμε Χαρακτηριστική Ομάδα και Πολλαπλό Δεσμό τότε η θέση του του Πολλαπλού Δεσμού καθορίζεται πριν από το βασικό όνομα και η αρίθμηση για την Χαρακτηριστική Ομάδα πριν από το 3<sup>o</sup> συνθετικό που δηλώνει το όνομα της Χαρακτηριστικής Ομάδας", "Αν στην οργανική ένωση έχουμε διπλό δεσμό και τριπλό δεσμό που ισαπέχουν από τα δύο άκρα της ανθρακικής αλυσίδας, η αρίθμηση ξεκινά από το άκρο που είναι πλησιέστερα στον διπλό δεσμό.", "Οι δευτερεύουσες ομάδες αλογόνα (-Χ), αμινομάδα (-ΝΗ<sub>2</sub>), νιτροομάδα (-ΝΟ<sub>2</sub>) δεν δίνουν κατάληξη στο όνομα της ένωσης. Δηλώνονται ως πρόθεμα πριν το βασικό όνομα της ένωσης με την ανάλογη αρίθμηση.", "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες ίδιες Xαρακτηριστικές Oμάδες τότε πριν από το 3<sup>o</sup> συνθετικό βάζουμε το πρόθεμα δι- τρι- κ.λπ.", "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες διαφορετικές Χαρακτηριστικές Ομάδες τότε η ισχυρότερη ομάδα δίνει την κατάληξη στο όνομα της ένωσης και καθορίζει την αρίθμηση της ανθρακικής αλυσίδας."]

        namingRules = {
            general: r0,
            rule1: r1,
            rule2: r2,
            rule3: r3,
            rule4: r4,
            table1: r1Table,
            table2: r2Table,
            table3: r3Table,
            table4: r4Table,
            rulesTheory_1_8: rulesTheory_1_8
        }
    }

    function fShowRuleTheory() {
        ruleTitle = (selectedRule + 1) + "<sup>ος</sup> Κανόνας"
        ruleTheory = "<div class='panelTitle '>" + ruleTitle + "</div><div class='ruleText' >" + namingRules.rulesTheory_1_8[selectedRule] + "</div>"
        $("#ruleTheory").html(ruleTheory)
    }

    function fShowNameAnalysis() {

        // compCount = nameExamples[selectedMol].nameComponents.length; //διαβαζει τα συνθετικα του ονοματος από το data

        compCount = nameComponentsList.length; //διαβαζει τα συνθετικα του ονοματος από τη λιστα που φτιαχνει το fGuessName

        nameCompContainer = "<div class='panelTitle '>Επεξήγηση ονομασίας </div><div class='nameCompContainer'>"

        for (i = 0; i < compCount; i++) {
            currComp = nameComponentsList[i]
            if (currComp == "" || currComp == undefined) { continue }

            compBox = "<div class='nameCompBox' " + "id='comp" + i + "' >" + currComp + "</div>"
            if (i < compCount - 1) {
                compBox += "<div class='nameCompPlus' > + </div>"
            }
            nameCompContainer += compBox
        }

        nameCompContainer += "</div>"

        $("#nameAnalysis").html(nameCompContainer)
        fExplainNameComp()

    }

    function fClearHighlights() {
        clearInterval(myNumberingTimeout)
        currNumberEl = 0
        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.resetBondColors(0)
        Jmol.script(jmolAppletNomeclature, "select all;  selectionHalos off; color bonds none; color atoms none;")
        showAtomSymbols3D()
        removeEcho3D()
        // ruleFlag = false
        $("#ruleTheoryContainer").hide()
        $("#nameAnalysisExplain").html('')
        ruleTableHighlight = 0
        JmolSelection = 'select none;'

    }

    $(document).on("click", ".nameCompBox", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')
            fClearHighlights()
            fUpdateSVG()
            fExplainNameComp()
        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')

            switch ($(this).attr('id')) {
                case 'comp0':
                    nameAnalysisMode = 'compNumber1'
                    break;
                case 'comp1':
                    nameAnalysisMode = ' compSecondSub1'
                    break;
                case 'comp2':
                    nameAnalysisMode = 'compNumber2'
                    break;
                case 'comp3':
                    nameAnalysisMode = ' compSecondSub2'
                    break;
                case 'comp4':
                    nameAnalysisMode = 'compBondPos'
                    break;
                case 'comp5':
                    nameAnalysisMode = 'compCarbonsCount'
                    break;
                case 'comp6':
                    nameAnalysisMode = 'compBondType'
                    break
                case 'comp7':
                    nameAnalysisMode = 'compEndNumber'
                    break;
                case 'comp8':
                    nameAnalysisMode = 'compBondType2'
                    break;
                case 'comp9':
                    nameAnalysisMode = 'compSuffix'
                    break;
                default:
                    nameAnalysisMode = 'none'
                    numberingFlag = false
                    break;

            }

            fExplainNameComp()
        }

    })

    function fExplainNameComp() {
        console.log(nameAnalysisMode)
        switch (nameAnalysisMode) {
            case 'none':
                myText = 'Κάνε κλικ σε ένα συνθετικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;background-color:#fff;font-size:1rem;box-shadow:0 0 #fff;"
                myClass = ''
                ruleFlag = false
                numberingFlag = false
                break;
            case 'compNumber1':

                nStyle = ""
                myClass = ''
                if (nameComponentsList[1] !== null && nameComponentsList[1].length > 0) {
                    if (nameComponentsList[3] !== null && nameComponentsList[3].length > 0) {
                        myText = " Δηλώνει τη θέση της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
                        fHighlightFG(1)
                        fHighlightFG3D(1)
                    } else {
                        if (nameComponentsList[0].includes(',')) {
                            countSubs = (nameComponentsList[0].match(/,/g) || []).length;
                            switch (countSubs) {
                                case 1:
                                    myCountText = " δύο "
                                    break;
                                case 2:
                                    myCountText = " τριών"
                                    break;
                                default:
                                    myCountText = ""
                            }

                            myText = " Δηλώνει τις θέσεις των " + myCountText + " δευτερευουσών  Χαρακτηριστικών Ομάδών."
                        } else {
                            // 
                            myText = " Δηλώνει τη θέση της δευτερεύουσας Χαρακτηριστικής Ομάδας."
                        }

                        if (Object.keys(functionalGroupObj).length > 1) {
                            fHighlightFG(1)
                            fHighlightFG3D(1)
                            // Βρισκει τις υπαρχουσες ΧΟ και επιλέγει τη σειρά στον πινακα
                            myFG0 = functionalGroupsList[0]
                            myFG1 = functionalGroupsList[1]
                            ruleTableHighlight = [gFunctionalGroupsOrder.indexOf(myFG0), gFunctionalGroupsOrder.indexOf(myFG1)];
                            $("#ruleTheoryContainer").show()
                        } else {
                            fHighlightFG()
                            fHighlightFG3D()
                        }
                    }

                } else if (nameComponentsList[6] == "άν" || nameComponentsList[6] == "αν") {
                    if (nameComponentsList[0].includes(',')) {
                        countSubs = (nameComponentsList[0].match(/,/g) || []).length;
                        switch (countSubs) {
                            case 1:
                                myCountText = " δύο "
                                break;
                            case 2:
                                myCountText = " τριών"
                                break;
                            default:
                                myCountText = ""
                        }

                        myText = " Δηλώνει τις θέσεις των " + myCountText + "  Χαρακτηριστικών Ομάδών."
                    } else {
                        myText = " Δηλώνει τη θέση της Χαρακτηριστικής Ομάδας."
                    }

                    fHighlightFG()
                    fHighlightFG3D()
                } else {
                    switch (nameComponentsList[6]) {
                        case 'έν':
                        case 'εν':
                            myText = " Δηλώνει τη θέση του διπλού δεσμού."
                            ruleTableHighlight = 2;
                            break
                        case 'διέν':
                        case 'διεν':
                            myText = " Δηλώνει τις θέσεις των διπλών δεσμών."
                            ruleTableHighlight = 4;
                            break
                        case 'ίν':
                        case 'ιν':
                            myText = " Δηλώνει τη θέση του τριπλού δεσμού."
                            ruleTableHighlight = 3;
                            break
                        case 'διίν':
                        case 'διιν':
                            myText = " Δηλώνει τις θέσεις των τριπλών δεσμών."

                            ruleTableHighlight = 6;
                            break
                        default:
                        // myText = " Δηλώνει τη θέση του Πολλαπλού Δεσμού."
                    }
                    fHighlightMultiBonds(1)
                    fHighlightMultiBonds3D(1)
                    // 
                    $("#ruleTheoryContainer").show()

                }
                numberingFlag = true
                fShowNumbering(0)
                break;
            case ' compSecondSub1':
                numberingFlag = false
                nStyle = ""
                myClass = ''
                if (nameComponentsList[3] !== null && nameComponentsList[3].length > 0) {
                    myText = " Δηλώνει τo όνομα της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
                    fHighlightFG(1)
                    fHighlightFG3D(1)
                } else {
                    if (Object.keys(functionalGroupObj).length > 1) {
                        fHighlightFG(1)
                        fHighlightFG3D(1)

                        // Βρισκει τις υπαρχουσες ΧΟ και επιλέγει τη σειρά στον πινακα
                        myFG0 = functionalGroupsList[0]
                        myFG1 = functionalGroupsList[1]
                        ruleTableHighlight = [gFunctionalGroupsOrder.indexOf(myFG0), gFunctionalGroupsOrder.indexOf(myFG1)];
                        $("#ruleTheoryContainer").show()
                    } else {
                        fHighlightFG()
                        fHighlightFG3D()
                    }
                    myText = " Δηλώνει τo όνομα της δευτερεύουσας Χαρακτηριστικής Ομάδας."

                    // console.log(" Δηλώνει τo όνομα της δευτερεύουσας Χαρακτηριστικής Ομάδας. ", Object.keys(functionalGroupObj).length)
                }

                break
            case 'compNumber2':
                nStyle = ""
                myClass = ''
                myText = " Δηλώνει τη θέση της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
                numberingFlag = true

                fHighlightFG(2)
                fHighlightFG3D(2)
                fShowNumbering(0)
                break;
            case ' compSecondSub2':
                nStyle = ""
                myClass = ''
                myText = " Δηλώνει τo όνομα της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
                numberingFlag = false
                fHighlightFG(2)
                fHighlightFG3D(2)
                //  $("#ruleTheoryContainer").show()
                break;
            case 'compBondPos':
                nStyle = ""
                myClass = ''
                switch (nameComponentsList[6]) {
                    case 'έν':
                    case 'εν':
                        myText = " Δηλώνει τη θέση του διπλού δεσμού."
                        ruleTableHighlight = 2
                        break
                    case 'ίν':
                    case 'ιν':
                        myText = " Δηλώνει τη θέση του τριπλού δεσμού."
                        ruleTableHighlight = 3
                        break
                    default:
                        myText = " Δηλώνει τη θέση του Πολλαπλού Δεσμού."
                }
                fHighlightMultiBonds(1)
                fHighlightMultiBonds3D(1)
                numberingFlag = true
                fShowNumbering(0)
                $("#ruleTheoryContainer").show()
                break
            case 'compCarbonsCount':
                myText = 'Έχει ' + carbons + ' άτομα άνθρακα C'
                nStyle = ""
                myClass = ''
                ruleTableHighlight = carbons
                numberingFlag = true
                fShowNumbering()
                $("#ruleTheoryContainer").show()
                break;
            case 'compBondType':
                switch (nameComponentsList[6]) {
                    case 'αν':
                    case 'άν':
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                        break
                    case 'εν':
                    case 'έν':
                        myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 2
                        break
                    case 'ιν':
                    case 'ίν':
                        myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 3
                        break
                    case 'διεν':
                    case 'διέν':
                        myText = 'δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 4
                        break
                    default:
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                }
                myText = 'Έχει ' + myText
                nStyle = ""
                myClass = ''
                numberingFlag = false
                // showAtomSymbols3D()
                fHighlightMultiBonds(1)
                fHighlightMultiBonds3D(1)
                $("#ruleTheoryContainer").show()
                break;
            case 'compBondType2':
                switch (nameComponentsList[8]) {
                    case 'άν':
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                        break
                    case 'αν':
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                        break
                    case 'έν':
                        myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 2
                        break
                    case 'εν':
                        myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 2
                        break
                    case 'ίν':
                        myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 3
                        break
                    case 'ιν':
                        myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 3
                        break
                    case 'διέν':
                        myText = 'δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 4
                        break
                    case 'διεν':
                        myText = 'δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 4
                        break
                    default:
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                }
                myText = 'Έχει ' + myText
                nStyle = ""
                myClass = ''
                numberingFlag = false
                fHighlightMultiBonds(2)
                fHighlightMultiBonds3D(2)
                $("#ruleTheoryContainer").show()
                break;
            case 'compEndNumber':
                nStyle = ""
                myClass = ''
                if (nameComponentsList[8].length === 0) {
                    fHighlightFG()
                    fHighlightFG3D()
                    myText = " Δηλώνει τη θέση της  Χαρακτηριστικής Ομάδας."
                } else {
                    myText = " Δηλώνει τη θέση του τριπλού δεσμού."
                    fHighlightMultiBonds3D(2)
                    fHighlightMultiBonds(2)
                }
                numberingFlag = true
                fShowNumbering(0)
                break
            case 'compSuffix':
                myText = 'Ανήκει στη χημική τάξη ' + molTaxonomy//nameExamples[selectedMol].class
                nStyle = ""
                myClass = ''
                // switch (nameExamples[selectedMol].class) {

                switch (molTaxonomy) {
                    // case 'Υδρογονάνθρακες (με αλογόνα)':
                    // case 'Υδρογονάνθρακες (με νιτροομάδα)':
                    case 'Υδρογονάνθρακες':
                        ruleTableHighlight = 1
                        break
                    case 'Αλκοόλες':
                        ruleTableHighlight = 2
                        break
                    case 'Αλδεϋδες':
                        ruleTableHighlight = 3
                        break
                    case 'Κετόνες':
                        ruleTableHighlight = 4
                        break
                    case 'Καροξυλικά οξέα':
                        ruleTableHighlight = 5
                        console.log(molTaxonomy)
                        break
                    case 'Νιτρίλια':
                        ruleTableHighlight = 6
                        break
                }
                numberingFlag = false
                if (molTaxonomy != "Υδρογονάνθρακες") {
                    if (Object.keys(functionalGroupObj).length > 1) {
                        fHighlightFG(2)
                        fHighlightFG3D(2)
                    } else {
                        fHighlightFG()
                        fHighlightFG3D()
                    }
                }
                // fHighlightFG()
                // fHighlightFG3D()
                $("#ruleTheoryContainer").show()
                break;
            default:
                myText = 'Κάνε κλικ σε ένα συστατικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;"
                myClass = ''
        }
        fShowRule(nameAnalysisMode)
        myHTML = "<div class='explainText " + myClass + " ' style='" + nStyle + "'  >" + myText + "</div>"
        $("#nameAnalysisExplain").html(myHTML)

    }

    function fShowRule(theRule) {

        switch (theRule) {
            case 'compNumber1':
                if (Object.keys(functionalGroupObj).length > 1) {
                    ruleText = namingRules.rule4
                    ruleTable = namingRules.table4
                    ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων"
                } else {
                    ruleText = namingRules.rule2
                    ruleTable = namingRules.table2
                    ruleTitle = "Κανόνας συνθετικού τύπου δεσμών"
                }
                break;
            case ' compSecondSub1':
                ruleText = namingRules.rule4
                ruleTable = namingRules.table4
                ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων"
                break;
            case 'compCarbonsCount':
                ruleText = namingRules.rule1
                ruleTable = namingRules.table1
                ruleTitle = "Κανόνας συνθετικού ανθρακικής αλυσίδας"
                break;
            case 'compBondPos':
            case 'compBondType':
                ruleText = namingRules.rule2
                ruleTable = namingRules.table2
                ruleTitle = "Κανόνας συνθετικού τύπου δεσμών"
                break;
            case 'compSuffix':
                ruleText = namingRules.rule3
                ruleTable = namingRules.table3
                ruleTitle = "Κανόνας συνθετικού χημικής τάξης"
                break;
            case 'none':
                ruleText = ""
                ruleTable = ""
                ruleTitle = ""
                break;
        }

        if (ruleFlag) {
            myStyle = 'display: block;'
            myClass = 'open'
        } else {
            myStyle = 'display:none;'
            myClass = 'closed'
        }

        myHTML = "<div class='ruleTheory' >"
        myHTML += "<div class='ruleTile " + myClass + "' id='ruleTitle'> " + ruleTitle + " </div>"
        myHTML += "<div id='ruleContainer' style='" + myStyle + "'>"
        myHTML += "<div class='ruleText' >" + ruleText + "</div>"
        myHTML += "<div class='ruleTable' >" + ruleTable + "</div>"
        myHTML += "</div>"
        myHTML += "</div>"

        $("#ruleTheoryContainer").html(myHTML)

        if (Number.isInteger(ruleTableHighlight)) {
            $(".ruleRow:nth-of-type(" + (ruleTableHighlight + 1) + ")").addClass("selected")
        }
        if (Array.isArray(ruleTableHighlight)) {
            $("#ruleContainer .ruleText").addClass("hideTopRow")
            $(".ruleRow:nth-of-type(" + (ruleTableHighlight[0] + 1) + ")").addClass("selected selectedB")
            $(".ruleRow:nth-of-type(" + (ruleTableHighlight[1] + 1) + ")").addClass("selected selectedA")
        }

        if (ruleFlag) {
            fAdjustRuleContainerHeight()
        }
    }

    function fAdjustRuleContainerHeight() {
        ruleElement = document.querySelector('.ruleTable');
        if (!ruleFlag) {
            ruleElement.setAttribute("style", " max-height: none ");
        } else {
            ////////////// Claculate Height of the ruleContainer ///////////// ruleTitle

            myTop = document.querySelector('#ruleContainer .ruleTable').getBoundingClientRect().top;
            myBottom = document.querySelector('#molRepColumn').getBoundingClientRect().bottom;
            ruleContainerHeight = myBottom - myTop;
            ruleElement.setAttribute("style", " max-height:" + ruleContainerHeight + "px; overflow:auto; ");
            // console.log('ruleContainerHeight ', ruleContainerHeight, myTop, myBottom)
        }

    }

    $(document).on('click', '#ruleTitle', function () {
        $("#ruleContainer").slideToggle();
        ruleFlag = !ruleFlag
        if (ruleFlag) {
            $("#ruleTitle").addClass('open')
            $("#ruleTitle").removeClass('closed')
            fAdjustRuleContainerHeight()
        } else {
            $("#ruleTitle").addClass('closed')
            $("#ruleTitle").removeClass('open')
        }

    })

    function fHighLightMainChain() {
        if (nameAnalysisMode == 'none') { return }

        highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]
        // if (highAtoms === undefined) { return }

        let highAtomsArg = ""
        for (let i = 0; i < highAtoms.length; i++) {
            //jsme highlight
            highAtomsArg += highAtoms[i] + ",9"
            if (i < highAtoms.length - 1) { highAtomsArg += "," }
        }
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

        fUpdateSVG()

    }

    function fHighlightFG(FGno) {

        if (nameAnalysisMode == 'none') { return }
        let highAtomsFG = []

        if (modeSuffix == '_diagr2D') { repType2D = '_diagr' } else { repType2D = modeSuffix } // διορθωση ονοματος
        if (FGno === undefined) {
            highAtomsFG = nameExamples[selectedMol]['functionalGroup' + repType2D]
        } else {
            highAtomsFG = nameExamples[selectedMol]['functionalGroup' + repType2D][FGno - 1]
            // console.log(highAtomsFG, nameExamples[selectedMol]['functionalGroup' + repType2D], FGno)
        }

        if (highAtomsFG === undefined) { return }

        let highAtomsFGArg = ""
        for (let i = 0; i < highAtomsFG.length; i++) {
            //jsme highlight
            highAtomsFGArg += highAtomsFG[i] + ",9"
            if (i < highAtomsFG.length - 1) { highAtomsFGArg += "," }
        }

        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

        let highBonds = []
        if (FGno === undefined) {
            highBonds = nameExamples[selectedMol]['functionalBonds' + repType2D]
        } else {
            if (nameExamples[selectedMol]['functionalBonds' + repType2D] !== undefined) {
                // console.log(nameExamples[selectedMol]['functionalBonds' + repType2D],nameExamples[selectedMol], repType2D, FGno)
                highBonds = nameExamples[selectedMol]['functionalBonds' + repType2D][FGno - 1]
            }
        }

        // console.log('highBonds ', highBonds, FGno)

        if (highBonds === undefined || highBonds.length == 0) {
            fUpdateSVG()
            patchtheNitrogen()
            return
        }
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",9"
            if (i < highBonds.length - 1) { highBondsArg += "," }
        }
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
        fUpdateSVG()
        patchtheNitrogen()

    }

    function fHighlightFG3D(FGno) {

        let highAtoms3D = []

        if (FGno === undefined) {
            highAtoms3D = nameExamples[selectedMol].functionalGroup3D
        } else {
            highAtoms3D = nameExamples[selectedMol]['functionalGroup3D'][FGno - 1]
        }

        if (highAtoms3D === undefined) { return }
        // console.log(highAtoms3D.length)

        if (highAtoms3D.length == 0) {
            Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color atoms none; color bonds none;color atoms none;");
            return;
        }

        let highAtoms3DArg = "select"
        for (let i = 0; i < highAtoms3D.length; i++) {
            highAtoms3DArg += " atomno = " + highAtoms3D[i]
            if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }

        }

        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + ";color selectionHalos[Xff5c33]; selectionHalos on; color bonds [xff8566]; color atoms [xff8566];")

        JmolSelection = highAtoms3DArg

    }

    function fShowNumbering(time) {

        if (!numberingFlag) { return }
        clearInterval(myNumberingTimeout)
        numbersSVGElements = []

        // if (nameAnalysisMode == 'none') { return }
        // add atom numbering
        molSnap = Snap("#jsmeNomeclatureSVG svg");
        switch (mode2D) {
            case 'condensed':
                highAtoms = nameExamples[selectedMol]['mainChain']
                numberOffset = [20, -280]
                for (let i = 0; i < highAtoms.length; i++) {
                    currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
                    x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                    y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                    r = 220
                    // <circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />
                    numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Roboto Condensed' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                    numbersSVGElements[i] = numberString
                }
                break
            case 'expanded':
                highAtoms = nameExamples[selectedMol]['mainChain_E']
                numberOffset = [-120, -280]
                for (let i = 0; i < highAtoms.length; i++) {
                    currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
                    x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                    y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                    r = 220
                    // <circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />
                    numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Roboto Condensed' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                    numbersSVGElements[i] = numberString
                }
                break

            case 'diagramatic':
                highAtoms = nameExamples[selectedMol]['mainChain_diagr']
                numberOffset = [-50, -180]
                for (let i = 0; i < highAtoms.length; i++) {
                    for (b = 0; b < bondList.length; b++) {
                        if (highAtoms[i] == bondList[b][0]) {

                            currAtomTextElement = molSnap.select("line:nth-of-type(" + svgBondList[b] + ")");
                            x = parseInt(currAtomTextElement.attr('x1')) + numberOffset[0]
                            y = parseInt(currAtomTextElement.attr('y1')) + + numberOffset[1]

                            break;
                        } else {
                            if (highAtoms[i] == bondList[b][1]) {

                                currAtomTextElement = molSnap.select("line:nth-of-type(" + svgBondList[b] + ")");
                                x = parseInt(currAtomTextElement.attr('x2')) + numberOffset[0]
                                y = parseInt(currAtomTextElement.attr('y2')) + + numberOffset[1]

                            }
                        }
                    }

                    r = 220
                    // myBg = "<circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />"
                    numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Roboto Condensed' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                    numbersSVGElements[i] = numberString
                }
                break
        }

        if (time === undefined) {
            time = 400
            myNumberingTimeout = setInterval(fShowNumber, time);
        } else if (time == 0) {
            for (let i = 0; i < numbersSVGElements.length; i++) {
                fShowNumber()
            }

        }
    }

    function fShowNumber() {

        fShowNumber3D(currNumberEl)
        numberElement = Snap.parse(numbersSVGElements[currNumberEl])
        molSnap.select("g").append(numberElement)
        // console.log('fShowNumber: ', currNumberEl)
        currNumberEl += 1

        if (currNumberEl > numbersSVGElements.length) {
            currNumberEl = 0
            clearInterval(myNumberingTimeout)
        }

    }

    function fShowNumbering3D() {

        mainChainAtoms3D = nameExamples[selectedMol].mainChain3D

        for (i = 0; i < mainChainAtoms3D.length; i++) {
            fShowNumber3D(i)
        }

    }

    function removeEcho3D() {
        Jmol.script(jmolAppletNomeclature, " set echo  off;");
    }

    function fShowNumber3D(n) {

        // console.log('3D number ', n)

        myAtom = nameExamples[selectedMol].mainChain3D[n]

        // Exit if myAtom is undefined or null
        if (typeof myAtom === "undefined" || myAtom === null) {
            return;
        }

        // myScript = "select atomno=" + myAtom + "; labels " + (n + 1) + " %e"

        ////// ECHO LABLES!!! //////
        myScript = " set echo theGroupEcho" + (n + 1) + "{atomno = " + myAtom + "}; set echo offset {-1.1 1.1 0}; font echo  36 sansSerif bold; color echo[x193F8F];  echo  " + (n + 1) + ";"

        Jmol.script(jmolAppletNomeclature, myScript)
        // console.log(myScript)
    }

    function fHighlightMultiBonds(bondCompPos) {

        if (nameAnalysisMode == 'none') { return }
        if (multiBondListCC.length == 0) { return }

        let highAtomsArg = ""
        let highBondsArg = ""
        if (bondCompPos == 1) {  // one type of multiple bond
            if (multiBondsObj.CCd.length > 0) {
                bondType = 2 // double bond     
            } else {
                bondType = 3 // triple bond
            }

            for (let i = 0; i < multiBondListCC.length; i++) {
                bondID = multiBondListCC[i]
                if (bondList[bondID - 1][2] !== bondType) { continue } // skip if not the  bond type
                highBondsArg += multiBondListCC[i] + ",9"
                if (i < multiBondListCC.length - 1) { highBondsArg += "," }

                highAtomsArg += bondList[multiBondListCC[i] - 1][0] + ",9," + bondList[multiBondListCC[i] - 1][1] + ",9"
                if (i < multiBondListCC.length - 1) { highAtomsArg += "," }
            }
        } else if (bondCompPos == 2) { // two types of multiple bonds -- highlight triple bonds
            for (let i = 0; i < multiBondListCC.length; i++) {
                bondID = multiBondListCC[i]
                if (bondList[bondID - 1][2] !== 3) { continue } // skip if not triple bond
                highBondsArg += multiBondListCC[i] + ",9"
                if (i < multiBondListCC.length - 1) { highBondsArg += "," }

                highAtomsArg += bondList[multiBondListCC[i] - 1][0] + ",9," + bondList[multiBondListCC[i] - 1][1] + ",9"
                if (i < multiBondListCC.length - 1) { highAtomsArg += "," }
            }

        }

        console.log('highBondsArg', highBondsArg, highAtomsArg)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

        fUpdateSVG()

    }

    function fHighlightMultiBonds3D(bondCompPos) {

        if (multiBondListCC.length == 0) { return }
        highBonds3D = []
        if (bondCompPos == 1) {  // one type of multiple bond
            if (multiBondsObj.CCd.length > 0) {
                bondType = 2 // double bond     
            } else {
                bondType = 3 // triple bond
            }

            for (i = 0; i < multiBondListCC.length; i++) {
                //get 2D bond atom numbers from 2D bond ID
                bondID = multiBondListCC[i]
                if (bondList[bondID - 1][2] !== bondType) { continue } // skip if not the  bond type
                atom1 = bondList[bondID - 1][0]
                atom2 = bondList[bondID - 1][1]
                //get 3D atom numbers from 2D atom numbers
                pos2D_1 = mainChainAtomsList.indexOf(atom1)
                pos2D_2 = mainChainAtomsList.indexOf(atom2)
                atom1 = mainChainAtoms3D[pos2D_1]
                atom2 = mainChainAtoms3D[pos2D_2]

                highBonds3D.push([atom1, atom2])

            }
        } else if (bondCompPos == 2) { // two types of multiple bonds -- highlight triple bonds
            for (i = 0; i < multiBondListCC.length; i++) {
                //get 2D bond atom numbers from 2D bond ID
                bondID = multiBondListCC[i]
                if (bondList[bondID - 1][2] != 3) { continue } // skip if not triple bond
                atom1 = bondList[bondID - 1][0]
                atom2 = bondList[bondID - 1][1]
                //get 3D atom numbers from 2D atom numbers
                pos2D_1 = mainChainAtomsList.indexOf(atom1)
                pos2D_2 = mainChainAtomsList.indexOf(atom2)
                atom1 = mainChainAtoms3D[pos2D_1]
                atom2 = mainChainAtoms3D[pos2D_2]

                highBonds3D.push([atom1, atom2])
            }

        }

        let highAtoms3DArg = "select"
        for (i = 0; i < highBonds3D.length; i++) {
            highAtoms3DArg += " atomno=" + highBonds3D[i][0] + ",  atomno=" + highBonds3D[i][1]
            if (i < highBonds3D.length - 1) { highAtoms3DArg += "," }
            Jmol.script(jmolAppletNomeclature, "select atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1] + " ; color bond [xff8566]  ");

        }

        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + " ;color selectionHalos[Xff5c33]; selectionHalos on; color atoms [xff8566];  ");

        JmolSelection = highAtoms3DArg

    }

    function fSetMolVis3D(theVisModel) {
        if (theVisModel === undefined) {
            theVisModel = vis3D
        }

        switch (theVisModel) {
            case 'ballnstick':
                mySpt = ' select all and not _Xx;  spacefill 24%; wireframe 0.13;zoom 100;set labelFront off;' + JmolSelection
                break
            case 'spacefill':
                mySpt = ' select all and not _Xx;  spacefill 70%; wireframe off;zoom 85;set labelFront off;' + JmolSelection
                break
            case 'sticks':
                mySpt = ' select all and not _Xx;  spacefill off; wireframe 0.2; zoom 100; set labelFront on;' + JmolSelection
                break
        }
        Jmol.script(jmolAppletNomeclature, mySpt);

        switch (nameAnalysisMode) {
            case 'compCarbonsCount':

                break
            case 'compBondType':

                // fHighlightMultiBonds3D()

                break
            case 'compSuffix':

                // fHighlightFG3D()

                break
            case 'none':

                break
            default:

        }

    }

    //////////////  GUI: buttons, checkboxes, etc

    // //// Create menu
    // function fInitNomeclatureMenu() {
    //     let myHTML = " <div class='panelTitle' style=''> Παραδείγματα </div><div class='menuContainer' style=''>"

    //     for (let prop in nameExamples) {

    //         let myMolFormula = nameExamples[prop].formula;
    //         //format formula
    //         myMolFormula = myMolFormula.replace(/(\d+)/g, '<sub>$1</sub>'); // sub numbers

    //         myMolFormula = myMolFormula.replace(/(['='])/g, '<span class="bondSymbol large" >&#9552;</span>');
    //         // double bond
    //         myMolFormula = myMolFormula.replace(/(['_'])/g, '<span class="bondSymbol " style="" >&#9776;</span>'); // triple bond

    //         //add menu item
    //         myHTML += "<div id='" + prop + "' class='menuLi'> " + myMolFormula + "</div>"
    //     }
    //     myHTML += "</div>"
    //     $("#nomeclatureMenu").html(myHTML)
    // }

    /// Menu funcionality: SELECT MOLECULE
    $(".menuLi").on("click", function () {
        selectedMol = $(this).attr('id');

        $(".menuLi").removeClass("selectedLi");
        $(this).addClass("selectedLi");

        fSelectMol()

    });

    /////////////// MENU ///////////////
    function fInitNomeclatureMenu() {
        let myHTML = "<div class='panelTitle' style=''> Παραδείγματα </div><div class='menuNomeclature2Container' style=''> "
        let rule = 0;

        let myNamesArr = Object.getOwnPropertyNames(nameExamples)
        tmpTXT = ""
        for (j = 0; j < myNamesArr.length; j++) {
            tmpTXT += (j + 1) + ": " + myNamesArr[j] + ", "

        }

        // console.log(tmpTXT)

        for (let currRule in ruleExamples) {
            // console.log(ruleExamples[currRule])
            rule += 1;
            myRuleName = rule + "<sup>ος</sup> Κανόνας"
            myHTML += "<div  class='crossMenuLi'> " + myRuleName + "</div>"

            currExamples = ruleExamples[currRule]

            myHTML += "<div class='exmplContainer closed' ><div class='menuListContainer'>"
            for (tmpExmpl = 0; tmpExmpl < currExamples.length; tmpExmpl++) {
                let prop = myNamesArr[currExamples[tmpExmpl] - 1]

                // console.log(currRule, prop, nameExamples[prop])

                let myMolFormula = nameExamples[prop].formula;
                //format formula
                myMolFormula = myMolFormula.replace(/(\d+)/g, '<sub>$1</sub>'); // sub numbers

                myMolFormula = myMolFormula.replace(/(['='])/g, '<span class="bondSymbol large" >&#9552;</span>');
                // double bond
                myMolFormula = myMolFormula.replace(/(['_'])/g, '<span class="bondSymbol " style="" >&#9776;</span>'); // triple bond

                //add menu item
                myHTML += "<div id='" + prop + "' class='menuLi'> " + myMolFormula + "</div>"
            }
            myHTML += "</div></div>"
        }
        myHTML += "</div>"
        $("#nomeclature2Menu").html(myHTML)

    }

    $(".menuNomeclature2Container .crossMenuLi").on("click", function () {

        if ($(this).hasClass("selectedLi")) { return }

        fDeselectMol()

        $(".crossMenuLi").removeClass("selectedLi");
        $(this).addClass("selectedLi");

        $(".exmplContainer.open").slideUp()
        $(this).next(".exmplContainer").slideDown()

        $(".exmplContainer").removeClass("open")
        $(this).next(".exmplContainer").removeClass("closed")
        $(this).next(".exmplContainer").addClass("open")

        selectedRule = $(this).parent().children(".crossMenuLi").index(this);

        /////////////////////////////// ADD RULE TEXT IN MENU ///////////////////////////////
        $("#molRepColumn").find(".ruleTextCenter").remove();
        $("#molRepColumn").find(".panelTitle").remove();
        ruleTitle = (selectedRule + 1) + "<sup>ος</sup> Κανόνας"
        ruleTheory = "<div class='panelTitle '>" + ruleTitle + "</div><div class='ruleTextCenter' >" + namingRules.rulesTheory_1_8[selectedRule] + "</div>"
        //  $(this).next(".exmplContainer").prepend(ruleTheory)
        $("#molRepColumn").prepend(ruleTheory)
        /////////////////////////////// ADD RULE TEXT IN MENU ///////////////////////////////

        // fShowRuleTheory()

        // selectedAtom = 0;
        // selectedBond = 0;
        // selectedHomoIndex = $(this).parent().children(".crossMenuLi").index(this);

        // setHighlight(selectedHomoIndex)

        // selectedHomoMolIndex = 0;
        // fLoadHomo2D3D()
        // updateCurrN()
        // $(".crossMenuLi").removeClass("selectedLi");
        // let myOldSelectedLi = $(".selectedLi")

        // $(this).addClass("selectedLi");
        // let myLi = this;

        // let myOpenMenu = $(".radioMenuContainer").not(this)
        // if (document.getElementsByClassName("radioGroupContainer").length > 0) {

        //     $(".n").removeClass("n")

        //     myOpenMenu.slideUp(300, function () {

        //         myOpenMenu.detach();
        //         myOldSelectedLi.removeClass("selectedLi");

        // })
        // showRadio(myLi);

        // } else {
        // showRadio(myLi)
        // }

    });

    function showRadio(myLi) {

        let radioHtml = "<div class='radioMenuContainer' style='padding:0;margin:0; border-top:0;'> <div class='radioGroupContainer VFlex ' style='display:none'>" +
            "    <div class='radioNoneContainer selectedRadio'> 1<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span" +
            "            class='radioCheck'></span></div>" +
            "    <div class='radioNoneContainer unselectedRadio'> 2<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span" +
            "            class='radioCheck'></span> </div>" +
            "    <div class='radioNoneContainer unselectedRadio'> 3<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span" +
            "            class='radioCheck'></span> </div>" +
            "</div></div>"

        $(myLi).after(radioHtml);

        updateRadioNumbers(selectedHomoIndex)

        $(".radioGroupContainer").slideDown(300)
    }

    //////////////////////////////////////////////////////////

    $("#atomSymbolsCheck").on("click", function () {
        atomSymbols3DFlag = !atomSymbols3DFlag;
        showAtomSymbols3D()
    })

    $("#rotateCheck").on("click", function () {
        rotateFlag = !rotateFlag;
        rotate3D()
    })

    $(".checkBoxContainer").on("click", function () {
        if ($(this).hasClass("unselectedCheck")) {

            $(this).removeClass("unselectedCheck")
            $(this).addClass("selectedCheck")
        } else {
            $(this).removeClass("selectedCheck")
            $(this).addClass("unselectedCheck")
        }
    })

    $(".radioCheckContainer").on("click", function () {
        // console.log("radio")
        if ($(this).hasClass("unselectedRadio")) {
            $(".radioCheckContainer").removeClass("selectedRadio");
            $(".radioCheckContainer").addClass("unselectedRadio");
            $(this).removeClass("unselectedRadio");
            $(this).addClass("selectedRadio");

        }

    });

    let dropState = false
    let selectedLabel

    menuItmes = ["Σφαίρες και Ράβδοι", "Σφαίρες", "Ράβδοι"]
    fCreateDropMenu(menuItmes)

    function fCreateDropMenu(myItems) {

        selectedLabel = myItems[0]
        myHTML = "<div id='dropLabel' class=' closed' >" + selectedLabel + "</div>"
        myHTML += "<div id='dropLiContainer' class='molvis closed' >"
        for (i = 0; i < myItems.length; i++) {
            myHTML += "<div id='dropLi" + i + "' class='dropLi'>" + myItems[i] + "</div>"
        }
        myHTML += "</div>"
        $("#dropMenu").html(myHTML)
        // console.log(myHTML)
    }

    $('html').on('click', function () {
        $("#dropLiContainer").slideUp(100)
        $("#dropLabel").removeClass('open')
        $("#dropLabel").addClass('closed')
        dropState = false
    });

    $('#dropLabel').on('click', function (event) {
        event.stopPropagation();
    });

    $("#dropLabel").on('click', function () {
        dropState = !dropState
        $("#dropLiContainer").slideToggle(100)

        if (dropState) {
            $("#dropLabel").removeClass('closed')
            $("#dropLabel").addClass('open')
        } else {
            $("#dropLabel").removeClass('open')
            $("#dropLabel").addClass('closed')
        }

    })

    $(".dropLi").on('click', function () {
        selectedLabel = $(this).html()
        $("#dropLabel").html(selectedLabel)
        $("#dropLiContainer").slideToggle(100)
        dropState = false
        $("#dropLabel").removeClass('open')
        $("#dropLabel").addClass('closed')

    })

    $(".molvis .dropLi").on('click', function () {
        myID = $(this).attr('id')
        // console.log(myID)
        switch (myID) {
            case 'dropLi0':
                vis3D = 'ballnstick'
                break
            case 'dropLi1':
                vis3D = 'spacefill'
                break
            case 'dropLi2':
                vis3D = 'sticks'
                break

        }
        fSetMolVis3D(vis3D)

    })

    function fShowCreditLibs() {
        myCredits = "<div class='creditsContainer'>"
        myCredits += "<div class=''>2D visualizations made with <strong>JSME</strong>: B. Bienfait and P. Ertl, J. Cheminform., 2013, 5, 24.</div>"
        myCredits += "<div> | </div>"
        myCredits += "<div class=''>3D visualizations made with <strong>JSmol</strong>: R. M. Hanson, J. Prilusky, Z. Renjian, T. Nakane and J. L. Sussman, Isr. J. Chem., 2013, 53, 207–216.</div> "
        myCredits += "</div>"

        // $("#creditsLib").html(myCredits)

        myCredits = ""
        myCredits += "<div class='creditsContainer'>"
        myCredits += "<div class=''>Anastasia Theofanidou, Vasilis Koutalas, Nickolas Charistos </div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>Laboratory of Quantum and Computational Chemistry</div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>School of Chemistry</div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>AUTH 2025</div>"

        // myCredits += "<div class=''>2024</div>"
        myCredits += "</div>"
        $("#creditsUs").html(myCredits)

    }

    ////////////// DEBUG //////////////////

    let selectedAtom, selectedBond;

    function getMolData() {
        let atomsCount = jsmeNomeclatureApplet.totalNumberOfAtoms()
        let bondsCount = jsmeNomeclatureApplet.totalNumberOfBonds()

        str1 = "<div>Άτομα: " + atomsCount + ", Δεσμοί: " + bondsCount + "</div>";

        for (i = 1; i <= atomsCount; i++) {
            str1 += "<div class='crossMenuLi  atomNo'> Atom " + i + "</div>"
        }

        for (i = 1; i <= bondsCount; i++) {
            str1 += "<div class='crossMenuLi bondNo'> Bond " + i + "</div>"
        }

        $("#debug").html(str1)
    }

    $("#debug").on("click", ".atomNo", function () {
        $(".atomNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeNomeclatureApplet.resetAtomColors(0)
        selectedAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
        fUpdateSVG()

    })

    $("#debug").on("click", ".bondNo", function () {
        $(".bondNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeNomeclatureApplet.resetBondColors(0)
        selectedBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
        fUpdateSVG()
        if (mode2D == 'condensed') {

            // fAnalyseStructure()
            fAddHydrogens2SVG()

        }
    })

    $("#debug").on("mouseover", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
        myAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, myAtom + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseover", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
        myBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, myBond + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
        fUpdateSVG()

    })

})
// 

