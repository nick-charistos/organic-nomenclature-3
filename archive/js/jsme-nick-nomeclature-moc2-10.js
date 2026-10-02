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
let numbersSVGElements = []
let currNumberEl = 0
let namingRules
let ruleFlag = false
let ruleTableHighlight = 0
let ruleTableFlag = false
let vis3D = 'ballnstick'
let JmolSelection = "select none"
let selectedRule

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

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#66ff66"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())
}




$(document).ready(function () {


    fInitData()
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




    function fSelectMol() {

        fInitProps()
        fClearHighlights()
        fLoadMol2D()
        fLoadMol3D()

        showAtomSymbols3D();
        rotate3D()

        fShowNumbering()
        fShowMolName()
        fShowNameAnalysis()
        // fExplainNameComp()

        // getMolData() // debug
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
                                                break;
                                            case 2:// double bond 
                                                myFunctionalGroup = "imine"
                                                break;
                                            case 3:// triple bond
                                                myFunctionalGroup = "cyanide"
                                                break;
                                        }
                                    } else { //is not terminal   
                                        switch (atomValenceList[j]) {
                                            case 2:// two single bonds 
                                                myFunctionalGroup = "CCamine"
                                                break;
                                            case 3:// single and double bonds
                                                myFunctionalGroup = "CCimine"
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
                                                break;
                                            case 2:// double bond 
                                                theCarbon = atomConnectivityList[j]
                                                if (atomValenceList[theCarbon] == 3) {
                                                    myFunctionalGroup = "aldehyde"
                                                } else {
                                                    myFunctionalGroup = "ketone"
                                                }
                                                break;
                                        }
                                    } else { //is not terminal   
                                        myFunctionalGroup = "ether"
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
                                theCarbon1 = atomConnectivityList[functionalGroupObj.alcohol.O[a]][0]
                                for (k = functionalGroupObj.ketone.O.length - 1; k >= 0; k--) {
                                    theCarbon2 = atomConnectivityList[functionalGroupObj.ketone.O[k]][0]
                                    if (theCarbon1 == theCarbon2) {
                                        myFunctionalGroup = "carboxylicAcid"

                                        if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                            functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = [functionalGroupObj.alcohol.O[a], functionalGroupObj.ketone.O[k]]
                                        } else {
                                            functionalGroupObj[myFunctionalGroup] = {}
                                            functionalGroupObj[myFunctionalGroup][myHetero] = [[functionalGroupObj.alcohol.O[a], functionalGroupObj.ketone.O[k]]]
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


        switch (multiBondListCC.length) {
            case 0:
                molType += 'an'
                molBondType = 's'
                break;
            case 1:
                currBondOrder = bondList[multiBondListCC[0] - 1][2]
                if (currBondOrder == 2) {
                    molType += "en"
                    molBondType = 'd'
                }
                if (currBondOrder == 3) {
                    molType += "yn"
                    molBondType = 't'
                }
                break;
            case 2:
                currBondOrder1 = bondList[multiBondListCC[0] - 1][2]
                currBondOrder2 = bondList[multiBondListCC[1] - 1][2]
                if (currBondOrder1 == currBondOrder2) {
                    if (currBondOrder1 == 2) {
                        molType += "dien"
                        molBondType = 'dd'
                    }
                    if (currBondOrder1 == 3) {
                        molType += "diyn"
                        molBondType = 'tt'
                    }
                } else {
                    molType += "enyn"
                    molBondType = 'dt'
                }

                break;
            default:

                break;
        }


    }

    function fGuessName() {

        nameMainCompList1 = ["μεθ", "αιθ", "προπ", "βουτ", "πεντ", "εξ", "επτ", "οκτ", "εν", "δεκ"]
        nameMainCompObj2 = { s: "αν", d: "εν", t: "ιν", dd: "διεν", tt: "διιν", dt: "ενιν" }
        nameMainCompObj3 = {
            hydrocarbon: { suffix: "ιο", substitute: "" },
            halogen: { suffix: 'ιο', substitute: { Br: "Βρωμο", I: "Ιωδο", F: "Φθορο", Cl: "Χλωρο" } },
            alcohol: { suffix: 'ολη', substitute: "Υδροξυ" },
            aldehyde: { suffix: 'αλη', substitute: "Οξο" },
            ketone: { suffix: 'ονη', substitute: "Κετο" },
            carboxylicAcid: { suffix: 'ικο οξύ', substitute: "" },
            cyanide: { suffix: 'νιτρίλιο', substitute: "" },
            amine: { suffix: 'αμίνη', substitute: "Αμινο" },
        }

        nameMultiPrefix = ["", "Δι", "Τρι", "Τετρα", "Πεντα", "Εξα", "Επτα", "Οκτα"]

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

        comp1 = nameMainCompList1[atomTypeObj.C - 1] // 1ο Κυριο συνθετικό: μεθ/αιθ/προπ.....
        comp2 = nameMainCompObj2[molBondType] // 2ο Κυριο συνθετικό: αν/εν/ιν.....
        //
        if (functionalGroupsList.length < 2) { // αν περιέχει 1 ΧΟ
            comp3 = nameMainCompObj3[functionalGroupsList[0]].suffix // 3ο Κυριο Συνθετικό - κατάληξη
            if (functionalGroupsList[0] == "halogen") { // Αλογόνα
                theHalogens = Object.keys(functionalGroupObj.halogen)
                sortedHalogens = Object.keys(nameMainCompObj3.halogen.substitute)
                for (let i = sortedHalogens.length - 1; i >= 0; i--) { // αλβαβητική σειρα αλογώνων
                    if (theHalogens.indexOf(sortedHalogens[i]) < 0) {
                        sortedHalogens.splice(i, 1)
                    }
                }

                for (let i = sortedHalogens.length - 1; i >= 0; i--) { // τρεχει για κάθε διαφορετικό αλογόνο που υπάρχει
                    let currX = sortedHalogens[i]
                    myXpositions = ""
                    theCountPrefix = nameMultiPrefix[functionalGroupObj.halogen[currX].length-1] // Δι, τρι, τετρα....
                    for (j = 0; j < functionalGroupObj.halogen[currX].length; j++) { // τρέχει για όλα τα άτομα του συγκεκριμένου αλογονου
                       
                        theXno = functionalGroupObj.halogen[currX][j]
                        currXPos = mainChainAtomsList.indexOf(atomConnectivityList[theXno][0] + 1) + 1
                        myXpositions += currXPos
                        if (j < functionalGroupObj.halogen[currX].length - 1) {
                            myXpositions += ","
                        }
                    }
                    comp1 = myXpositions + "-" + theCountPrefix + nameMainCompObj3.halogen.substitute[currX] + "-" + comp1
                }
                // comp1 = myXpositions + "-" + nameMainCompObj3.halogen.substitute[currX] + "-" + comp1
            }

        } else { // αν περιέχει > 1 ΧΟ
            comp3 = " (θα το φτιάξει η Αναστασία...) "
        }
        guessName = comp1 + comp2 + comp3

        $("#guessNameContainer").html(guessName)


        ///////// DEBUG ANALYSE MOLECULE ////////////////
        myGuess = ""
        myGuess += "<p>Αριθμός Ατόμων: " + allAtomsTypeList.length + "</p>"
        myAtomTypes = Object.keys(atomTypeObj)
        for (a = 0; a < myAtomTypes.length; a++) {
            myGuess += "<p>Αριθμός Ατόμων " + myAtomTypes[a] + ": " + atomTypeObj[myAtomTypes[a]] + "</p>"
        }
        if (multiBondListCC.length > 0) {

            if (multiBondsObj.CCd.length > 0) { myGuess += "<p>Αριθμός Διπλών Δεσμών CC: " + multiBondsObj.CCd.length + "</p>" }
            if (multiBondsObj.CCt.length > 0) { myGuess += "<p>Αριθμός Τριπλών Δεσμών CC: " + multiBondsObj.CCt.length + "</p>" }
        } else {
            myGuess += "Μόνο απλοί δεσμοί CC"
        }




        myGuess += "<p> Χαρακτηριστικές Ομάδες: " + functionalGroupsList.length + " </p>"


        if (functionalGroupsList.length > 0) {

            myGuess += "<ul>"
            for (f = 0; f < functionalGroupsList.length; f++) {

                tmpProp = Object.keys(functionalGroupObj[functionalGroupsList[f]])
                if (functionalGroupsList[f] == "halogen") {
                    myGreekGroup = "Αλογονομάδες"
                    for (p = 0; p < tmpProp.length; p++) {
                        myGuess += "<li>" + myGreekGroup + " " + tmpProp[p] + ": " + functionalGroupObj[functionalGroupsList[f]][tmpProp[p]].length + "</li>"
                    }
                } else {
                    switch (functionalGroupsList[f]) {
                        case "alcohol":
                            myGreekGroup = "υδροξύλια"
                            break;
                        case "aldehyde":
                            myGreekGroup = "αλδεϋδομάδες"
                            break;
                        case "ketone":
                            myGreekGroup = "κετονομάδες"
                            break;
                        case "carboxylicAcid":
                            myGreekGroup = "καρβοξυλομάδες"
                            break;
                        case "cyanide":
                            myGreekGroup = "νιτρίλια"
                            break;
                        case "amine":
                            myGreekGroup = "αμινομάδες"
                            break;
                        case "hydrocarbon":
                            myGreekGroup = "Υδρογονάνθρακας"

                    }
                    myGuess += "<li>" + myGreekGroup + ": " + functionalGroupObj[functionalGroupsList[f]][tmpProp[0]].length + "</li>"
                }
            }
            myGuess += "</ul>"
        }
        $("#guessMolInfoContainer").html(myGuess)


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

    function fLoadMol3D() {
        let myMol3D = nameExamples[selectedMol].file3D
        Jmol.script(jmolAppletNomeclature, "frank off;load " + myMol3D + ";  select all; center selected;" + nameExamples[selectedMol].moveto + "; script spt/init-2.spt;");
        fSetMolVis3D()
    }


    function showAtomSymbols3D() {
        if (atomSymbols3DFlag) {
            Jmol.script(jmolAppletNomeclature, "select all; labels %e;" + JmolSelection + ";")
        } else {
            Jmol.script(jmolAppletNomeclature, "select all; labels off;" + JmolSelection + ";")
        }

        if (nameAnalysisMode == 'compMain1') {
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
        fClearHighlights()
        fShowNumbering()

        switch (nameAnalysisMode) {
            case 'compMain1':
                fClearHighlights()
                fShowNumbering()
                $("#ruleTheoryContainer").show()
                break
            case 'compMain2':
                fHighlightMultiBonds()
                fHighlightMultiBonds3D()
                $("#ruleTheoryContainer").show()
                break
            case 'compMain3':
                fHighlightFG()
                fHighlightFG3D()
                $("#ruleTheoryContainer").show()
                break
            case 'none':

                break
            default:

        }




        // getMolData() // debug

    });


    ///////////////  Name Analysis /////////////////

    function fInitTheory() {
        r0 = "Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα (χωρίς διακλαδώσεις) προκύπτει από τον συνδυασμό τριών συνθετικών."
        r1 = "Το πρώτο συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας."
        r2 = "Το δεύτερο συνθετικό δείχνει το είδος των δεσμών μεταξύ των ατόμων άνθρακα (βαθμός κορεσμού της ένωσης)."
        r3 = "Το τρίτο συνθετικό δηλώνει την χημική τάξη που ανήκει η οργανική ένωση."

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

        let rulesTheory_1_8 = ["Η αρίθμηση της ανθρακικής αλυσίδας αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα ή στον Πολλαπλό Δεσμό", "Η θέση της Χαρακτηριστικής Ομάδας ή του Πολλαπλού Δεσμού καθορίζεται με έναν αριθμό που γράφεται στην αρχή του ονόματος της ένωσης.", "Αλδεΰδες (-CH=O), καρβοξυλικά οξέα (-COOH) και νιτρίλια (-CN) είναι Χαρακτηριστικές Ομάδες που βρίσκονται υποχρεωτικά στην άκρη της ανθρακικής αλυσίδας και η αρίθμηση αρχίζει από τον άνθρακα της Χαρακτηριστικής Ομάδας.", "Αν στην οργανική ένωση έχουμε Χαρακτηριστική Ομάδα και Πολλαπλό Δεσμό τότε η θέση του του Πολλαπλού Δεσμού καθορίζεται πριν από το βασικό όνομα και η αρίθμηση για την Χαρακτηριστική Ομάδα πριν από το 3ο συνθετικό που δηλώνει το όνομα της Χαρακτηριστικής Ομάδας", "Αν στην οργανική ένωση έχουμε διπλό δεσμό και τριπλό δεσμό που ισαπέχουν από τα δύο άκρα της ανθρακικής αλυσίδας, η αρίθμηση ξεκινά από το άκρο που είναι πλησιέστερα στον διπλό δεσμό.", "Οι δευτερεύουσες ομάδες αλογόνα (-Χ), αμινομάδα (-ΝΗ2), νιτροομάδα (-ΝΟ2) δεν δίνουν κατάληξη στο όνομα της ένωσης. Δηλώνονται ως πρόθεμα πριν το βασικό όνομα της ένωσης με την ανάλογη αρίθμηση.", "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες ίδιες Xαρακτηριστικές Oμάδες τότε πριν από το 3ο συνθετικό βάζουμε το πρόθεμα δι- τρι- κ.λπ.", "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες διαφορετικές Χαρακτηριστικές Ομάδες τότε η ισχυρότερη ομάδα δίνει την κατάληξη στο όνομα της ένωσης και καθορίζει την αρίθμηση της ανθρακικής αλυσίδας."]


        namingRules = {
            general: r0,
            rule1: r1,
            rule2: r2,
            rule3: r3,
            table1: r1Table,
            table2: r2Table,
            table3: r3Table,
            rulesTheory_1_8: rulesTheory_1_8
        }
    }

    function fShowRuleTheory() {
        ruleTitle = (selectedRule + 1) + "<sup>ος</sup> Κανόνας"
        ruleTheory = "<div class='panelTitle '>" + ruleTitle + "</div><div class='ruleText' >" + namingRules.rulesTheory_1_8[selectedRule] + "</div>"
        $("#ruleTheory").html(ruleTheory)
    }

    // function fShowNameAnalysis() {
    //     compMain1 = nameExamples[selectedMol].nameComponents[0]
    //     compMain2 = nameExamples[selectedMol].nameComponents[1]
    //     compMain3 = nameExamples[selectedMol].nameComponents[2]

    //     compBox = "<div class='nameCompBox' "
    //     compBox1 = compBox + " id='compMain1' >" + compMain1 + "</div>"
    //     compBox2 = compBox + " id='compMain2' >" + compMain2 + "</div>"
    //     compBox3 = compBox + " id='compMain3' >" + compMain3 + "</div>"

    //     nameCompContainer = "<div class='nameCompContainer'>"
    //     nameCompContainer += compBox1
    //     nameCompContainer += "<div class='nameCompPlus' > + </div>"
    //     nameCompContainer += compBox2
    //     nameCompContainer += "<div class='nameCompPlus' > + </div>"
    //     nameCompContainer += compBox3
    //     nameCompContainer += "</div>"

    //     $("#nameAnalysis").html(nameCompContainer)

    // }

    function fShowNameAnalysis() {
        compCount = nameExamples[selectedMol].nameComponents.length;
        // console.log(compCount)
        nameCompContainer = "<div class='nameCompContainer'>"

        for (i = 0; i < compCount; i++) {
            currComp = nameExamples[selectedMol].nameComponents[i]
            compBox = "<div class='nameCompBox' " + "id='comp" + i + "' >" + currComp + "</div>"
            if (i < compCount - 1) {
                compBox += "<div class='nameCompPlus' > + </div>"
            }
            nameCompContainer += compBox
        }

        nameCompContainer += "</div>"

        $("#nameAnalysis").html(nameCompContainer)




    }

    function fClearHighlights() {
        clearInterval(myNumberingTimeout)
        currNumberEl = 0
        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.resetBondColors(0)
        Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color bonds none")
        showAtomSymbols3D()
        // ruleFlag = false
        $("#ruleTheoryContainer").hide()
        ruleTableHighlight = 0
        JmolSelection = 'select none;'

    }

    // first component
    $(document).on("click", "#compMain1", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')
            fClearHighlights()
            fUpdateSVG()

        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')
            nameAnalysisMode = 'compMain1'
            fShowNumbering()
            fShowNumbering3D()
            $("#ruleTheoryContainer").show()
        }
        fExplainNameComp()

    })
    // second component
    $(document).on("click", "#compMain2", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')


        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')
            nameAnalysisMode = 'compMain2'
            showAtomSymbols3D()
            fHighlightMultiBonds()
            fHighlightMultiBonds3D()
            $("#ruleTheoryContainer").show()
        }
        fExplainNameComp()

    })

    // third component
    $(document).on("click", "#compMain3", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')

        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')
            nameAnalysisMode = 'compMain3'
            showAtomSymbols3D()
            fHighlightFG()
            fHighlightFG3D()
            $("#ruleTheoryContainer").show()
        }
        fExplainNameComp()

    })

    function fExplainNameComp() {

        switch (nameAnalysisMode) {
            case 'none':
                myText = 'Κάνε κλικ σε ένα συνθετικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;background-color:#fff;font-size:1rem;box-shadow:0 0 #fff;"
                myClass = ''
                ruleFlag = false
                break;
            case 'compMain1':
                myText = 'Έχει ' + carbons + ' άτομα άνθρακα C'
                nStyle = ""
                myClass = ''
                ruleTableHighlight = carbons
                break;
            case 'compMain2':
                switch (nameExamples[selectedMol].nameComponents[1]) {
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
                break;
            case 'compMain3':
                myText = 'Ανήκει στη χημική τάξη ' + nameExamples[selectedMol].class
                nStyle = ""
                myClass = ''
                switch (nameExamples[selectedMol].class) {
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
                    case 'Καρβοξυλικά οξέα':
                        ruleTableHighlight = 5
                        break
                    case 'Νιτρίλια':
                        ruleTableHighlight = 6
                        break
                }
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
            case 'compMain1':
                ruleText = namingRules.rule1
                ruleTable = namingRules.table1
                ruleTitle = "Κανόνας 1<sup>ου</sup> συνθετικού"

                break;
            case 'compMain2':
                ruleText = namingRules.rule2
                ruleTable = namingRules.table2
                ruleTitle = "Κανόνας 2<sup>ου</sup> συνθετικού "

                break;
            case 'compMain3':
                ruleText = namingRules.rule3
                ruleTable = namingRules.table3
                ruleTitle = "Κανόνας 3<sup>ου</sup> συνθετικού "

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

        $(".ruleRow:nth-of-type(" + (ruleTableHighlight + 1) + ")").addClass("selected")

        // console.log('row ' + ruleTableHighlight )

    }

    $(document).on('click', '#ruleTitle', function () {
        $("#ruleContainer").slideToggle();
        ruleFlag = !ruleFlag
        if (ruleFlag) {
            $("#ruleTitle").addClass('open')
            $("#ruleTitle").removeClass('closed')
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
            highAtomsArg += highAtoms[i] + ",1"
            if (i < highAtoms.length - 1) { highAtomsArg += "," }
        }
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);


        fUpdateSVG()

    }

    function fHighlightFG() {
        if (nameAnalysisMode == 'none') { return }

        highAtomsFG = nameExamples[selectedMol]['functionalGroup' + modeSuffix]
        if (highAtomsFG === undefined) { return }

        let highAtomsFGArg = ""
        for (let i = 0; i < highAtomsFG.length; i++) {
            //jsme highlight
            highAtomsFGArg += highAtomsFG[i] + ",1"
            if (i < highAtomsFG.length - 1) { highAtomsFGArg += "," }
        }
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

        highBonds = nameExamples[selectedMol]['functionalBonds' + modeSuffix]
        // if (highBonds === undefined) { return }
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",1"
            if (i < highBonds.length - 1) { highBondsArg += "," }
        }
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
        fUpdateSVG()
    }

    function fHighlightFG3D() {

        let highAtoms3D = nameExamples[selectedMol].functionalGroup3D
        if (highAtoms3D === undefined) { return }
        // console.log(highAtoms3D.length)

        if (highAtoms3D.length == 0) {
            Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off");
            return;
        }

        let highAtoms3DArg = "select"
        for (let i = 0; i < highAtoms3D.length; i++) {
            highAtoms3DArg += " atomno = " + highAtoms3D[i]
            if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }

        }

        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + "; selectionHalos on")

        JmolSelection = highAtoms3DArg

    }


    function fShowNumbering() {

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
                    r = 160
                    // <circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />
                    numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='280px' font-weight='bold' font-family='Roboto Condensed' fill='#219EBC'>" + (i + 1) + "</text> "
                    numbersSVGElements[i] = numberString
                }
                break
            case 'expanded':
                highAtoms = nameExamples[selectedMol]['mainChain_E']
                numberOffset = [-80, -280]
                for (let i = 0; i < highAtoms.length; i++) {
                    currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
                    x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                    y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                    r = 160
                    // <circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />
                    numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='280px' font-weight='bold' font-family='Roboto Condensed' fill='#219EBC'>" + (i + 1) + "</text> "
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

                    r = 160
                    myBg = "<circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />"
                    numberString = myBg + "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='280px' font-weight='bold' font-family='Roboto Condensed' fill='#219EBC'>" + (i + 1) + "</text> "
                    numbersSVGElements[i] = numberString
                }
                break
        }




        myNumberingTimeout = setInterval(fShowNumber, 600);

    }

    function fShowNumber() {
        // console.log(currNumberEl)
        fShowNumber3D(currNumberEl)
        numberElement = Snap.parse(numbersSVGElements[currNumberEl])
        molSnap.select("g").append(numberElement)
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



    function fShowNumber3D(n) {

        myAtom = nameExamples[selectedMol].mainChain3D[n]

        myScript = "select atomno=" + myAtom + "; labels " + (n + 1) + " %e"
        Jmol.script(jmolAppletNomeclature, myScript)
    }


    function fHighlightMultiBonds() {
        // fAnalyseBonds()
        // console.log("bondList: ", bondList)
        if (nameAnalysisMode == 'none') { return }

        // highBonds = nameExamples[selectedMol]['multibonds' + modeSuffix]
        highBonds = multiBondListCC
        if (highBonds === undefined) { return }

        let highAtomsArg = ""
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",1"
            if (i < highBonds.length - 1) { highBondsArg += "," }

            highAtomsArg += bondList[highBonds[i] - 1][0] + ",1," + bondList[highBonds[i] - 1][1] + ",1"
            if (i < highBonds.length - 1) { highAtomsArg += "," }
        }

        // console.log(highBondsArg, highAtomsArg)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);


        fUpdateSVG()

    }

    function fHighlightMultiBonds3D() {
        // if (nameAnalysisMode == 'none') { return }
        highBonds3D = nameExamples[selectedMol].multibonds3D
        if (highBonds3D.length == 0) { return }

        let highAtoms3DArg = "select"
        for (i = 0; i < highBonds3D.length; i++) {
            highAtoms3DArg += " atomno=" + highBonds3D[i][0] + ",  atomno=" + highBonds3D[i][1]
            if (i < highBonds.length - 1) { highAtoms3DArg += "," }
            Jmol.script(jmolAppletNomeclature, "select atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1] + " ; color bond [x7ddfff]  ");
        }
        // console.log(highBonds3D, highAtoms3DArg)
        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + " ; selectionHalos on  ");

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
            case 'compMain1':


                break
            case 'compMain2':

                // fHighlightMultiBonds3D()

                break
            case 'compMain3':

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

            myHTML += "<div class='exmplContainer closed' >"
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
            myHTML += "</div>"
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
        fShowRuleTheory()
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

        $("#creditsLib").html(myCredits)

        myCredits = ""
        myCredits += "<div class='creditsContainer'>"
        myCredits += "<div class=''>Anastasia Theofanidou, Vasilis Koutalas, Nickolas Charistos </div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>Laboratory of Quantum and Computational Chemistry</div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>School of Chemistry</div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>AUTh 2024</div>"

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
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        fUpdateSVG()

    })

    $("#debug").on("click", ".bondNo", function () {
        $(".bondNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeNomeclatureApplet.resetBondColors(0)
        selectedBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",1");
        fUpdateSVG()
        if (mode2D == 'condensed') {

            // fAnalyseStructure()
            fAddHydrogens2SVG()

        }
    })

    $("#debug").on("mouseover", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        myAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, myAtom + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseover", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",1");
        myBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, myBond + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",1");
        fUpdateSVG()

    })





})
