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
// 3D analysis globals (populated asynchronously from SDF by fFetchAndParse3D)
let allAtomsTypeList3D = []
let atomTypeObj3D = {}
let atomTypes3D = []
let atomConnectivityList3D = []
let atomValenceList3D = []
let bondList3D = []
let multiBondListCC3D = []
let multiBondsObj3D = { CCd: [], CCt: [], COd: [], CNt: [] }
let functionalGroupObj3D = {}
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
let currentMolName = ""
let nameMainCompList1 = []
let nameMainCompObj3 = {}
let nameMultiPrefix = []
let functionalGroupsOrder = []
const gFunctionalGroupsOrder = ["carboxylicAcid", "cyanide", "aldehyde", "ketone", "alcohol", "amine", "nitro"];
let molTaxonomy = ""
let narrateAnalysisFlag = false

const svgSpeaker = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/></svg>"
const svgMute   = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-1.27-1.27L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/></svg>"
const svgStop   = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M6 6h12v12H6z'/></svg>"
const svgPlay   = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M8 5v14l11-7z'/></svg>"

///////// INIT JSME //////
function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "450px", "200px", {
        'options': "nozoom,depict,marker",
        'depictbg': '#fff',
        'atombgsize': '0.6',
    });
    jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6)

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#79dc6d", "#ff8566", "#66ff66", "#93bfff"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())
}

function fInitData() {
    for (let prop in nameExamples) {

        my2D = eval(prop + "_2D");
        my2D_E = eval(prop + "_2D_E");
        try { my2D_D = eval(prop + "_diagr2D"); } catch(e) { my2D_D = null; }

        nameExamples[prop].structure2D = my2D
        nameExamples[prop].structure2D_E = my2D_E
        nameExamples[prop].structure2D_D = my2D_D

        my3D = "mols/nomeclature-moc2/" + prop + "_3D.sdf"
        nameExamples[prop].file3D = my3D
    }

}

function fUpdateDiagr2DButton() {
    const $diagrBtn = $("#radio2DMode .radioCheckContainer").eq(2);
    const hasDiagr2D = selectedMol && !!nameExamples[selectedMol]?.structure2D_D;
    if (hasDiagr2D) {
        $diagrBtn.show();
    } else {
        $diagrBtn.hide();
        if (mode2D === 'diagramatic') {
            mode2D = 'condensed';
            modeSuffix = '';
            $("#radio2DMode .radioCheckContainer").removeClass("selectedRadio").addClass("unselectedRadio");
            $("#radio2DMode .radioCheckContainer").eq(0).removeClass("unselectedRadio").addClass("selectedRadio");
        }
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
        carboxylicAcid: { suffix: 'ικό οξύ', substitute: "καρβοξυ" },
        cyanide: { suffix: 'νιτρίλιο', substitute: "κυανο" },
        amine: { suffix: 'αμίνη', substitute: "αμινο" },
        nitro: { suffix: 'ιο', substitute: "νιτρο" }
    }

    nameMultiPrefix = ["", "δι", "τρι", "τετρα", "πεντα", "εξα", "επτα", "οκτα"]

    functionalGroupsOrder = ["carboxylicAcid", "cyanide", "aldehyde", "ketone", "alcohol", "amine", "nitro"]
}

function fSelectMol() {

    if (!selectedMol || !nameExamples[selectedMol]) { return }

    fInitProps()
    fClearHighlights()
    fUpdateDiagr2DButton()
    fLoadMol2D()
    fLoadMol3D()
    fFetchAndParse3D()

    showAtomSymbols3D();
    rotate3D()

    // fShowMolName()
    fShowNameAnalysis()

    getMolData()
}

function fDeselectMol() {
    fInitProps()
    fClearHighlights()

    selectedMol = null;
    $(".menuLi").removeClass("selectedLi");

    myMol3D = null;
    Jmol.script(jmolAppletNomeclature, "zap");

    myMol2D = null;
    if (jsmeNomeclatureApplet) jsmeNomeclatureApplet.reset()
    fUpdateSVG()

    $("#molName").html("")
    $("#nameAnalysis").html("")
    fUpdateDiagr2DButton()

}

function fInitProps() {
    currNumberEl = 0
    clearInterval(myNumberingTimeout)
    nameAnalysisMode = 'none'
    carbons = 0
    ruleTableHighlight = 0
}

function fShowMolName() {
    if (!selectedMol || !nameExamples[selectedMol]) {
        $("#molName").html("")
        return
    }

    molName = currentMolName
    $("#molName").html(molName)
}

function fLoadMol2D() {

    const selectedExample = nameExamples[selectedMol]
    if (!selectedExample) {
        myMol2D = null
        jsmeNomeclatureApplet.clear()
        return
    }

    switch (mode2D) {
        case 'condensed':
            myMol2D = selectedExample.structure2D
            break;
        case 'expanded':
            myMol2D = selectedExample.structure2D_E
            break;
        case 'diagramatic':
            myMol2D = selectedExample.structure2D_D
            break;
        default:
            myMol2D = selectedExample.structure2D
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
                                                molTaxonomy = "Αλδεϋδες"
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

                    // check if acid from alcohol+aldehyde (HCOOH: carbonyl C has valence 3, mis-detected as aldehyde)
                    if (functionalGroupObj.hasOwnProperty("alcohol") && functionalGroupObj.hasOwnProperty("aldehyde")) {
                        for (a = functionalGroupObj.alcohol.O.length - 1; a >= 0; a--) {
                            theAtom1 = atomConnectivityList[functionalGroupObj.alcohol.O[a]][0]
                            for (k = functionalGroupObj.aldehyde.O.length - 1; k >= 0; k--) {
                                theAtom2 = atomConnectivityList[functionalGroupObj.aldehyde.O[k]][0]
                                if (theAtom1 == theAtom2 && allAtomsTypeList[theAtom1] == "C") {
                                    myFunctionalGroup = "carboxylicAcid"
                                    molTaxonomy = "Καροξυλικά οξέα"
                                    myHetero = "O"
                                    if (functionalGroupObj.hasOwnProperty(myFunctionalGroup)) {
                                        functionalGroupObj[myFunctionalGroup][myHetero][functionalGroupObj[myFunctionalGroup][myHetero].length] = [functionalGroupObj.alcohol.O[a], functionalGroupObj.aldehyde.O[k]]
                                    } else {
                                        functionalGroupObj[myFunctionalGroup] = {}
                                        functionalGroupObj[myFunctionalGroup][myHetero] = [[functionalGroupObj.alcohol.O[a], functionalGroupObj.aldehyde.O[k]]]
                                    }
                                    functionalGroupObj.alcohol.O.splice(a, 1)
                                    functionalGroupObj.aldehyde.O.splice(k, 1)
                                }
                            }
                        }
                        if (functionalGroupObj.alcohol.O.length == 0) {
                            delete functionalGroupObj.alcohol
                        }
                        if (functionalGroupObj.aldehyde.O.length == 0) {
                            delete functionalGroupObj.aldehyde
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
    bondPrefixTB = "" //Αριθμιση τριπλών δεσμων CC
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
            bondPrefixTB += sortedMultiTBonds[i]
            if (i < sortedMultiTBonds.length - 1) {
                bondPrefixTB += ","
            } else {
                bondPrefixTB += "-"
            }
            comp0 = bondPrefixTB
        }
        if (mainChainAtomsList.length <= 3) { // Αν η κυρια αλυσιδα είναι μέχρι 3 άτομα C, τότε χωρις αρίθμηση πολλαπλών δεσμων
            bondPrefixDB = ""
            bondPrefixTB = ""
            comp0 = null
        }

        if (sortedMultiDBonds.length > 0 && sortedMultiTBonds.length == 0) { //μονο διπλοι δεσμοι
            comp2 += nameMultiPrefix[sortedMultiDBonds.length - 1] + "εν"
        } else if (sortedMultiDBonds.length == 0 && sortedMultiTBonds.length > 0) { // μονο τριπλοι δεσμοι
            comp2 += nameMultiPrefix[sortedMultiTBonds.length - 1] + "ιν"
        } else if (sortedMultiDBonds.length > 0 && sortedMultiTBonds.length > 0) { // διπλοι και τριπλοι δεσμοι
            comp0 = bondPrefixDB
            comp2 += nameMultiPrefix[sortedMultiDBonds.length - 1] + "εν"
            comp3 = "-" + bondPrefixTB
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
                    subPrefix = theCountPrefix + nameMainCompObj3.halogen.substitute[currX]
                    comp0NumberList.push(myXpositions)
                    comp0TextList.push(subPrefix)
                }
                comp0 = myXpositions + "-"
                comp0Text = subPrefix
                if (bondPrefixDB !== "") {
                    comp1No = "-" + bondPrefixDB
                } else {
                    comp1No = ""
                }
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
                    comp4 = theCountPrefix + comp4
                } else {
                    comp3 = "-" + myXpositions
                    comp4 = theCountPrefix + comp4
                }
                break;
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

        comp4 = theCountPrefix + nameMainCompObj3[functionalGroupsOrder[0]].suffix
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

        comp0 = myXpositions;
        comp0Text = theCountPrefix + XOPrefix;

    }
    if (comp0NumberList.length > 1) {
        comp0 = comp0NumberList[1] + "-"
        comp0Text = comp0TextList[1]
        comp0b = "-" + comp0NumberList[0] + "-"
        comp0bText = comp0TextList[0]
    }

    console.log(comp0, comp0Text, comp0b, comp0bText, comp1No, comp1, comp2, comp3, comp2b, comp4)

    nameComponentsList = [comp0, comp0Text, comp0b, comp0bText, comp1No, comp1, comp2, comp3, comp2b, comp4]
    // Greek euphony rule: if a name component ends with a consonant and the next starts
    // with a consonant, insert connecting vowel 'ο' between them (e.g. αιθαν+νιτρίλιο → αιθανονιτρίλιο)
    // Exception: last='π' + first='δ' → insert 'α' instead (e.g. επτα+δε... → επταδε...)
    const _gkVowels = new Set(['α','ε','η','ι','ο','υ','ω','ά','έ','ή','ί','ό','ύ','ώ']);
    const _isGkConsonant = ch => /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) && !_gkVowels.has(ch);
    const _parts = nameComponentsList.filter(c => c != null && c !== '');
    currentMolName = _parts.reduce((acc, part) => {
        if (acc === '') return part;
        const lastCh = acc[acc.length - 1];
        const firstCh = part[0];
        if (_isGkConsonant(lastCh) && _isGkConsonant(firstCh)) {
            const connector = ((lastCh === 'π' || lastCh === 'τ') && firstCh === 'δ') ? 'α' : 'ο';
            return acc + connector + part;
        }
        return acc + part;
    }, '');

}

function fAddHydrogens2SVG() {
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

    if (!jsmeNomeclatureApplet) return
    let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
    $("#jsmeNomeclatureSVG").html(mySVG);
    if (mode2D == 'condensed') {
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
    const selectedExample = nameExamples[selectedMol]
    if (!selectedExample) { return }

    let myMol3D = selectedExample.file3D
    Jmol.script(jmolAppletNomeclature, "frank off;load " + myMol3D + ";  select all; center selected;" + selectedExample.moveto + "; script spt/init-3.spt;");
    fSetMolVis3D()
}

function fParseSDF3D(text) {
    // Parse MDL V2000 SDF text and populate all *3D globals directly.
    // Mirrors fAnalyseStructure logic but operates on parsed SDF data only,
    // with no side effects on any 2D global.
    const lines = text.split(/\r?\n/)
    // counts line is line index 3 (after 3-line header)
    const countsLine = lines[3]
    const atomsCount3D = parseInt(countsLine.substring(0, 3).trim(), 10)
    const bondsCount3D = parseInt(countsLine.substring(3, 6).trim(), 10)

    // ---- Build atoms array (1-based: atoms[0] unused, atoms[i] = element) ----
    const atoms = ['']  // index 0 placeholder so atoms[i] is 1-based
    for (let i = 0; i < atomsCount3D; i++) {
        const line = lines[4 + i]
        const element = line.substring(31, 34).trim()
        atoms.push(element)
    }

    // ---- Build bonds array (1-based: bonds[0] unused) ----
    const bonds = ['']  // index 0 placeholder
    for (let i = 0; i < bondsCount3D; i++) {
        const line = lines[4 + atomsCount3D + i]
        const parts = line.trim().split(/\s+/)
        bonds.push({ atom1: parseInt(parts[0], 10), atom2: parseInt(parts[1], 10), order: parseInt(parts[2], 10) })
    }

    // ---- Atoms analysis (mirrors fAnalyseStructure atom loop) ----
    allAtomsTypeList3D = []
    atomTypeObj3D = {}
    atomTypes3D = []
    for (let i = 1; i <= atomsCount3D; i++) {
        const el = atoms[i]
        allAtomsTypeList3D[i - 1] = el
        if (!atomTypes3D.includes(el)) { atomTypes3D.push(el) }
        if (atomTypeObj3D.hasOwnProperty(el)) { atomTypeObj3D[el] += 1 } else { atomTypeObj3D[el] = 1 }
    }

    // ---- Connectivity and valence (mirrors fAnalyseStructure bond loop, skips H) ----
    atomConnectivityList3D = Array(atomsCount3D).fill(0)
    atomValenceList3D = Array(atomsCount3D).fill(0)
    for (let i = 1; i <= bondsCount3D; i++) {
        const b = bonds[i]
        const a1 = b.atom1, a2 = b.atom2, order = b.order
        if (allAtomsTypeList3D[a2 - 1] === 'H' || allAtomsTypeList3D[a1 - 1] === 'H') { continue }
        if (Array.isArray(atomConnectivityList3D[a1 - 1])) { atomConnectivityList3D[a1 - 1].push(a2 - 1) }
        else { atomConnectivityList3D[a1 - 1] = [a2 - 1] }
        if (Array.isArray(atomConnectivityList3D[a2 - 1])) { atomConnectivityList3D[a2 - 1].push(a1 - 1) }
        else { atomConnectivityList3D[a2 - 1] = [a1 - 1] }
        atomValenceList3D[a1 - 1] += order
        atomValenceList3D[a2 - 1] += order
    }

    // ---- Bond analysis (mirrors fAnalyseStructure bond analysis loop) ----
    bondList3D = Array(bondsCount3D)
    multiBondListCC3D = []
    multiBondsObj3D = { CCd: [], CCt: [], COd: [], CNt: [] }
    for (let i = 1; i <= bondsCount3D; i++) {
        const b = bonds[i]
        const a1 = b.atom1, a2 = b.atom2, order = b.order
        const type1 = atoms[a1], type2 = atoms[a2]
        bondList3D[i - 1] = [a1, a2, order]
        if (order > 1 && type1 === 'C' && type2 === 'C') { multiBondListCC3D.push(i) }
        switch (order) {
            case 2:
                if (type1 === 'C' && type2 === 'C') { multiBondsObj3D.CCd.push(i) }
                if ((type1 === 'O' && type2 === 'C') || (type1 === 'C' && type2 === 'O')) { multiBondsObj3D.COd.push(i) }
                break
            case 3:
                if (type1 === 'C' && type2 === 'C') { multiBondsObj3D.CCt.push(i) }
                if ((type1 === 'N' && type2 === 'C') || (type1 === 'C' && type2 === 'N')) { multiBondsObj3D.CNt.push(i) }
                break
        }
    }
}

function fDetectMolType3D() {
    // Mirrors fDetectMolType exactly but reads/writes only *3D globals.
    // Does NOT touch molType, molTaxonomy or any 2D global.
    functionalGroupObj3D = {}
    const myAtomTypes3D = Object.keys(atomTypeObj3D)

    if (atomTypes3D.length === 1) {
        if (atomTypes3D.includes('C')) {
            functionalGroupObj3D.hydrocarbon = { C: [1] }
        }
        return
    }

    for (let t = 0; t < myAtomTypes3D.length; t++) {
        if (myAtomTypes3D[t] === 'C' || myAtomTypes3D[t] === 'H') { continue }
        const myHetero = myAtomTypes3D[t]
        const myX = ['Cl', 'Br', 'F', 'I'].includes(myHetero) ? 'X' : myHetero
        const myXcount = atomTypeObj3D[myHetero]
        let myStart = allAtomsTypeList3D.indexOf(myHetero)
        let myFunctionalGroup

        switch (myX) {
            case 'X':
                myFunctionalGroup = 'halogen'
                for (let i = 0; i < myXcount; i++) {
                    for (let j = myStart; j < allAtomsTypeList3D.length; j++) {
                        if (allAtomsTypeList3D[j] === myHetero) {
                            if (functionalGroupObj3D.hasOwnProperty(myFunctionalGroup)) {
                                if (functionalGroupObj3D[myFunctionalGroup].hasOwnProperty(myHetero)) {
                                    functionalGroupObj3D[myFunctionalGroup][myHetero][functionalGroupObj3D[myFunctionalGroup][myHetero].length] = j
                                } else { functionalGroupObj3D[myFunctionalGroup][myHetero] = [j] }
                            } else {
                                functionalGroupObj3D[myFunctionalGroup] = {}
                                functionalGroupObj3D[myFunctionalGroup][myHetero] = [j]
                            }
                            myStart = j + 1
                            break
                        }
                    }
                }
                break

            case 'N':
                for (let i = 0; i < myXcount; i++) {
                    for (let j = myStart; j < allAtomsTypeList3D.length; j++) {
                        if (allAtomsTypeList3D[j] === myHetero) {
                            if (!Array.isArray(atomConnectivityList3D[j])) { myStart = j + 1; break }
                            if (atomConnectivityList3D[j].length === 1) {
                                switch (atomValenceList3D[j]) {
                                    case 1: myFunctionalGroup = 'amine'; break
                                    case 2: myFunctionalGroup = 'imine'; break
                                    case 3: myFunctionalGroup = 'cyanide'; break
                                    default: myFunctionalGroup = 'amine'
                                }
                            } else {
                                switch (atomValenceList3D[j]) {
                                    case 2: myFunctionalGroup = 'CCamine'; break
                                    case 3: myFunctionalGroup = 'CCimine'; break
                                    case 4: myFunctionalGroup = 'nitro'; break
                                    default: myFunctionalGroup = 'CCamine'
                                }
                            }
                            if (functionalGroupObj3D.hasOwnProperty(myFunctionalGroup)) {
                                functionalGroupObj3D[myFunctionalGroup][myHetero][functionalGroupObj3D[myFunctionalGroup][myHetero].length] = j
                            } else {
                                functionalGroupObj3D[myFunctionalGroup] = {}
                                functionalGroupObj3D[myFunctionalGroup][myHetero] = [j]
                            }
                            myStart = j + 1
                            break
                        }
                    }
                }
                break

            case 'O':
                for (let i = 0; i < myXcount; i++) {
                    for (let j = myStart; j < allAtomsTypeList3D.length; j++) {
                        if (allAtomsTypeList3D[j] === myHetero) {
                            if (!Array.isArray(atomConnectivityList3D[j])) { myStart = j + 1; break }
                            if (atomConnectivityList3D[j].length === 1) {
                                switch (atomValenceList3D[j]) {
                                    case 1: myFunctionalGroup = 'alcohol'; break
                                    case 2:
                                        const theCarbon = atomConnectivityList3D[j][0]
                                        myFunctionalGroup = (atomValenceList3D[theCarbon] === 3) ? 'aldehyde' : 'ketone'
                                        break
                                    default: myFunctionalGroup = 'alcohol'
                                }
                            } else {
                                myFunctionalGroup = 'ether'
                            }
                            if (functionalGroupObj3D.hasOwnProperty(myFunctionalGroup)) {
                                functionalGroupObj3D[myFunctionalGroup][myHetero][functionalGroupObj3D[myFunctionalGroup][myHetero].length] = j
                            } else {
                                functionalGroupObj3D[myFunctionalGroup] = {}
                                functionalGroupObj3D[myFunctionalGroup][myHetero] = [j]
                            }
                            myStart = j + 1
                            break
                        }
                    }
                }
                // check if carboxylic acid: alcohol O and ketone O share same C
                if (functionalGroupObj3D.hasOwnProperty('alcohol') && functionalGroupObj3D.hasOwnProperty('ketone')) {
                    for (let a = functionalGroupObj3D.alcohol.O.length - 1; a >= 0; a--) {
                        const theAtom1 = atomConnectivityList3D[functionalGroupObj3D.alcohol.O[a]][0]
                        for (let k = functionalGroupObj3D.ketone.O.length - 1; k >= 0; k--) {
                            const theAtom2 = atomConnectivityList3D[functionalGroupObj3D.ketone.O[k]][0]
                            if (theAtom1 === theAtom2 && allAtomsTypeList3D[theAtom1] === 'C') {
                                if (functionalGroupObj3D.hasOwnProperty('carboxylicAcid')) {
                                    functionalGroupObj3D.carboxylicAcid.O[functionalGroupObj3D.carboxylicAcid.O.length] = [functionalGroupObj3D.alcohol.O[a], functionalGroupObj3D.ketone.O[k]]
                                } else {
                                    functionalGroupObj3D.carboxylicAcid = { O: [[functionalGroupObj3D.alcohol.O[a], functionalGroupObj3D.ketone.O[k]]] }
                                }
                                functionalGroupObj3D.alcohol.O.splice(a, 1)
                                functionalGroupObj3D.ketone.O.splice(k, 1)
                            } else if (theAtom1 === theAtom2 && allAtomsTypeList3D[theAtom1] === 'N') {
                                // nitro group: both O atoms bond to N ??" remove from alcohol/ketone
                                // (the N is already stored under functionalGroupObj3D.nitro.N)
                                functionalGroupObj3D.alcohol.O.splice(a, 1)
                                functionalGroupObj3D.ketone.O.splice(k, 1)
                            }
                        }
                    }
                    if (functionalGroupObj3D.alcohol && functionalGroupObj3D.alcohol.O.length === 0) { delete functionalGroupObj3D.alcohol }
                    if (functionalGroupObj3D.ketone && functionalGroupObj3D.ketone.O.length === 0) { delete functionalGroupObj3D.ketone }
                }
                // check if carboxylic acid from alcohol+aldehyde (HCOOH: carbonyl C valence 3, mis-detected as aldehyde)
                if (functionalGroupObj3D.hasOwnProperty('alcohol') && functionalGroupObj3D.hasOwnProperty('aldehyde')) {
                    for (let a = functionalGroupObj3D.alcohol.O.length - 1; a >= 0; a--) {
                        const theAtom1 = atomConnectivityList3D[functionalGroupObj3D.alcohol.O[a]][0]
                        for (let k = functionalGroupObj3D.aldehyde.O.length - 1; k >= 0; k--) {
                            const theAtom2 = atomConnectivityList3D[functionalGroupObj3D.aldehyde.O[k]][0]
                            if (theAtom1 === theAtom2 && allAtomsTypeList3D[theAtom1] === 'C') {
                                if (functionalGroupObj3D.hasOwnProperty('carboxylicAcid')) {
                                    functionalGroupObj3D.carboxylicAcid.O[functionalGroupObj3D.carboxylicAcid.O.length] = [functionalGroupObj3D.alcohol.O[a], functionalGroupObj3D.aldehyde.O[k]]
                                } else {
                                    functionalGroupObj3D.carboxylicAcid = { O: [[functionalGroupObj3D.alcohol.O[a], functionalGroupObj3D.aldehyde.O[k]]] }
                                }
                                functionalGroupObj3D.alcohol.O.splice(a, 1)
                                functionalGroupObj3D.aldehyde.O.splice(k, 1)
                            }
                        }
                    }
                    if (functionalGroupObj3D.alcohol && functionalGroupObj3D.alcohol.O.length === 0) { delete functionalGroupObj3D.alcohol }
                    if (functionalGroupObj3D.aldehyde && functionalGroupObj3D.aldehyde.O.length === 0) { delete functionalGroupObj3D.aldehyde }
                }
                break
        }
    }
    // if no heteroatom FG was found (only C+H after skipping), treat as hydrocarbon
    if (Object.keys(functionalGroupObj3D).length === 0) {
        functionalGroupObj3D.hydrocarbon = { C: [1] }
    }
}

function fFetchAndParse3D() {
    if (!selectedMol || !nameExamples[selectedMol]) { return }
    const mol = selectedMol  // stale-mol guard
    const url = nameExamples[selectedMol].file3D
    fetch(url)
        .then(function (r) { return r.text() })
        .then(function (text) {
            if (selectedMol !== mol) { return }  // user navigated away
            fParseSDF3D(text)
            fDetectMolType3D()
            console.log('[3D parsed]', mol, 'FG:', Object.keys(functionalGroupObj3D), 'CCd bonds:', multiBondsObj3D.CCd)
        })
        .catch(function (e) { console.warn('[3D parse failed]', url, e) })
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

function fGetNameBoxes() {
    return Array.from(document.querySelectorAll('.nameCompContainer .nameCompBox'))
        .map(function (el) { return { text: el.textContent.trim(), selected: el.classList.contains('selected') } })
        .filter(function (b) { return b.text })
}

function fDrawNameBoxes(ctx, nameBoxes, canvasWidth, yTop) {
    if (!nameBoxes.length) return
    let font = 'bold 40px Arial, sans-serif'
    ctx.font = font
    let pad = 18
    let boxH = 60
    let gap = -2  // boxes overlap border like CSS margin-right: -2px
    let totalW = nameBoxes.reduce(function (acc, b) {
        return acc + ctx.measureText(b.text).width + pad * 2
    }, 0) + gap * (nameBoxes.length - 1)
    let x = Math.round((canvasWidth - totalW) / 2)
    let y = yTop + 10
    nameBoxes.forEach(function (b) {
        let tw = ctx.measureText(b.text).width
        let bw = Math.round(tw + pad * 2)
        ctx.fillStyle = b.selected ? '#5FAD56' : '#ffffff'
        ctx.fillRect(x, y, bw, boxH)
        ctx.strokeStyle = b.selected ? '#5FAD56' : '#dddddd'
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, bw, boxH)
        ctx.fillStyle = b.selected ? '#ffffff' : '#000000'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(b.text, x + pad, y + boxH / 2)
        x += bw + gap
    })
}

window.fSave2DPng = function () {
    let svgEl = document.querySelector("#jsmeNomeclatureSVG svg")
    if (!svgEl) return
    let nameBoxes = fGetNameBoxes()
    let bbox = svgEl.getBoundingClientRect()
    let srcWidth = bbox.width || 450
    let srcHeight = bbox.height || 200
    let width = 1200
    let molHeight = Math.round(srcHeight * (width / srcWidth))
    let labelHeight = nameBoxes.length ? 90 : 0

    let svgClone = svgEl.cloneNode(true)
    svgClone.setAttribute('width', srcWidth)
    svgClone.setAttribute('height', srcHeight)

    let svgData = new XMLSerializer().serializeToString(svgClone)
    if (!svgData.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgData = svgData.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
    }

    // Fix JSME bug: highlighted atom labels produce malformed XML:
    // fill="rgb(X,X,X) stroke=" black"="" stroke-width="11px"
    // ??' fill="rgb(X,X,X)" stroke="black" stroke-width="11px"
    // Fix JSME C-type highlight bug: fill="rgb(...) stroke=" black"="" stroke-width="11px"
    svgData = svgData.replace(
        /fill="([^"]*?) stroke=" ([^"]*)"="" stroke-width="([^"]*)"/g,
        'fill="$1" stroke="$2" stroke-width="$3"'
    )
    // Fix JSME N-type highlight bug (e.g. NH2): XMLSerializer escapes > as &gt; inside
    // the attribute value, producing: stroke-width="11px&gt;&lt;tspan&gt;...garbage..." sub"="">
    // ??' stroke-width="11px">
    svgData = svgData.replace(
        /stroke-width="(\d+px?)&gt;[^"]*" [^>]*>/g,
        'stroke-width="$1">'
    )

    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = molHeight + labelHeight
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let img = new Image()
    img.onload = function () {
        ctx.drawImage(img, 0, 0, width, molHeight)
        fDrawNameBoxes(ctx, nameBoxes, width, molHeight)
        canvas.toBlob(function (blob) {
            if (!blob) { console.error('2D PNG: toBlob returned null'); return }
            let a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = (currentMolName || selectedMol || 'molecule').replace(/\s+/g, '_') + '_2D.png'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(a.href)
        })
    }
    img.onerror = function () {
        console.error('[2D PNG] SVG failed to load. SVG content:')
        console.log(svgData)
    }

    let svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    img.src = URL.createObjectURL(svgBlob)
}

window.fSaveJmolPng = function () {
    let baseName = (currentMolName || selectedMol || 'molecule').replace(/\s+/g, '_')
    let safeLabel = (currentMolName || '').replace(/'/g, '')

    // // File 1: without name label
    // Jmol.script(jmolAppletNomeclature,
    //     "write IMAGE 1200 1200 PNG '" + baseName + "_3D.png';"
    // )

    // File 2: with molecule name as echo label ??" delayed to allow first download to register
    // setTimeout(function () {
        Jmol.script(jmolAppletNomeclature,
            "set echo  bottom center; color echo black; font echo 24 ; echo " + safeLabel + "|| ;" +
            "write IMAGE 1200 1200 PNG '" + baseName + "_3D.png';"
        )
        setTimeout(function () {
            Jmol.script(jmolAppletNomeclature, "set echo off;")
        }, 500)
    // }, 600)
}

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

    let rulesTheory_1_8 = ["Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα προκύπτει από τον συνδυασμό τριών συνθετικών. Το 1<sup>ο</sup> Συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας. Το 2<sup>ο</sup> Συνθετικό δείχνει το είδος των δεσμών που υπάρχουν μεταξύ των ατόμων του άνθρακα. Το 3<sup>ο</sup> Συνθετικό δηλώνει την χημική τάξη που ανήκει.","Η αρίθμηση της ανθρακικής αλυσίδας αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα ή στον Πολλαπλό Δεσμό", "Η θέση της Χαρακτηριστικής Ομάδας ή του Πολλαπλού Δεσμού καθορίζεται με έναν αριθμό που γράφεται στην αρχή του ονόματος της ένωσης.", "Αλδεϋδες (-CH=O), καρβοξυλικά οξέα (-COOH) και νιτρίλια (-CN) είναι Χαρακτηριστικές Ομάδες που βρίσκονται υποχρεωτικά στην άκρη της ανθρακικής αλυσίδας και η αρίθμηση αρχίζει από τον άνθρακα της Χαρακτηριστικής Ομάδας.", "Αν στην οργανική ένωση έχουμε Χαρακτηριστική Ομάδα και Πολλαπλό Δεσμό τότε η θέση του Πολλαπλού Δεσμού καθορίζεται πριν από το βασικό όνομα και η αρίθμηση για την Χαρακτηριστική Ομάδα πριν από το 3<sup>o</sup> συνθετικό που δηλώνει το όνομα της Χαρακτηριστικής Ομάδας", "Αν στην οργανική ένωση έχουμε διπλό δεσμό και τριπλό δεσμό που ισαπέχουν από τα δύο άκρα της ανθρακικής αλυσίδας, η αρίθμηση ξεκινά από το άκρο που είναι πλησιέστερα στον διπλό δεσμό.", "Οι δευτερεύουσες ομάδες αλογόνα (-Χ), αμινομάδα (-ΝΗ<sub>2</sub>), νιτροομάδα (-ΝΟ<sub>2</sub>) δεν δίνουν κατάληξη στο όνομα της ένωσης. Δηλώνονται ως πρόθεμα πριν το βασικό όνομα της ένωσης με την ανάλογη αρίθμηση.", "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες ίδιες Xαρακτηριστικές Ομάδες τότε πριν από το 3<sup>o</sup> συνθετικό βάζουμε το πρόθεμα δι-, τρι-, κ.λ.π.", "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες διαφορετικές Χαρακτηριστικές Ομάδες τότε η ισχυρότερη ομάδα δίνει την κατάληξη στο όνομα της ένωσης και καθορίζει την αρίθμηση της ανθρακικής αλυσίδας."]

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
    window.speechSynthesis.cancel()
    ruleTitle = (selectedRule + 1) + "<sup>ος</sup> Κανόνας"
    ruleTheory = "<div class='panelTitle'>" + ruleTitle + "<button id='narrateBtn' class='narrateBtn' data-tooltip='Ανάγνωση κανόνα'>" + svgPlay + "</button></div><div class='ruleText'>" + namingRules.rulesTheory_1_8[selectedRule] + "</div>"
    $("#ruleTheory").html(ruleTheory)
}

function fNarrateRule() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
        $('#narrateBtn').html(svgPlay)
        return
    }
    const rawText = namingRules.rulesTheory_1_8[selectedRule]
    const plainText = rawText
        .replace(/<[^>]*>/g, '')
        .replace(/\s*\(-[^)]*\)/g, '')
        .replace(/3o/g, 'τρίτο')
        .replace(/δι-,?\s*τρι-,?/g, 'δί, τρί')
        .replace(/κ\.λ\.π\.?/g, 'και τα λοιπά')
    const utterance = new SpeechSynthesisUtterance(plainText)
    utterance.lang = 'el-GR'
    utterance.rate = 0.9
    const voices = window.speechSynthesis.getVoices()
    const greekVoices = voices.filter(v => v.lang.startsWith('el'))
    const femaleNames = /eleni|nefeli|maria|sofia|female/i
    const maleNames = /stefanos|nikos|kostas|giorgos|male/i
    const femaleVoice = greekVoices.find(v => femaleNames.test(v.name))
                     || greekVoices.find(v => !maleNames.test(v.name))
                     || greekVoices[0]
    if (femaleVoice) utterance.voice = femaleVoice
    utterance.onstart = function () { $('#narrateBtn').html(svgStop) }
    utterance.onend = function () { $('#narrateBtn').html(svgPlay) }
    utterance.onerror = function () { $('#narrateBtn').html(svgPlay) }
    window.speechSynthesis.speak(utterance)
}

function fSpeakGreek(text) {
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = 'el-GR'
    utterance.rate = 0.9
    const voices = window.speechSynthesis.getVoices()
    const greekVoices = voices.filter(v => v.lang.startsWith('el'))
    const femaleNames = /eleni|nefeli|maria|sofia|female/i
    const maleNames = /stefanos|nikos|kostas|giorgos|male/i
    const femaleVoice = greekVoices.find(v => femaleNames.test(v.name))
                     || greekVoices.find(v => !maleNames.test(v.name))
                     || greekVoices[0]
    if (femaleVoice) utterance.voice = femaleVoice
    window.speechSynthesis.speak(utterance)
}

function fSpeakNameWithPauses() {
    const parts = nameComponentsList.filter(c => c && c !== '')
    if (!parts.length) return
    window.speechSynthesis.cancel()
    const voices = window.speechSynthesis.getVoices()
    const greekVoices = voices.filter(v => v.lang.startsWith('el'))
    const femaleNames = /eleni|nefeli|maria|sofia|female/i
    const maleNames = /stefanos|nikos|kostas|giorgos|male/i
    const femaleVoice = greekVoices.find(v => femaleNames.test(v.name))
                     || greekVoices.find(v => !maleNames.test(v.name))
                     || greekVoices[0]
    let idx = 0
    function speakNext() {
        if (idx >= parts.length) return
        const text = parts[idx].replace(/<[^>]*>/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
        idx++
        const utt = new SpeechSynthesisUtterance(text)
        utt.lang = 'el-GR'
        utt.rate = 0.9
        if (femaleVoice) utt.voice = femaleVoice
        utt.onend = function () { setTimeout(speakNext, 0) }
        window.speechSynthesis.speak(utt)
    }
    speakNext()
}

function fShowNameAnalysis() {

    compCount = nameComponentsList.length;

    const toggleIcon = narrateAnalysisFlag ? svgSpeaker : svgMute
    const toggleTitle = narrateAnalysisFlag ? 'Αφήγηση ενεργή' : 'Αφήγηση ανενεργή'
    const playDisabled = narrateAnalysisFlag ? '' : ' disabled'
    nameCompContainer = "<div class='panelTitle'>Επεξήγηση ονομασίας<button id='narrateAnalysisToggle' class='narrateBtn' data-tooltip='" + toggleTitle + "'>" + toggleIcon + "</button></div>" +
        "<div class='HFlex' style='justify-content:center;'><div class='nameCompContainer'>"

    for (i = 0; i < compCount; i++) {
        currComp = nameComponentsList[i]
        if (currComp == "" || currComp == undefined) { continue }

        // Apply Greek euphony: append connecting vowel to this component's display
        // if it ends with a consonant and the next non-empty component starts with one
        let displayComp = currComp
        for (let n = i + 1; n < compCount; n++) {
            const nextComp = nameComponentsList[n]
            if (!nextComp) continue
            const lastCh = currComp[currComp.length - 1]
            const firstCh = nextComp[0]
            const _isGkConsonant = ch => /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) && !new Set(['α','ε','η','ι','ο','υ','ω','ά','έ','ή','ί','ό','ύ','ώ']).has(ch);
            if (_isGkConsonant(lastCh) && _isGkConsonant(firstCh)) {
                const connector = ((lastCh === 'π' || lastCh === 'τ') && firstCh === 'δ') ? 'α' : 'ο';
                displayComp = currComp + "<span class='euphonyLetter'>" + connector + "</span>"
            }
            break
        }

        compBox = "<div class='nameCompBox' " + "id='comp" + i + "' >" + displayComp + "</div>"
        if (i < compCount - 1) {
            compBox += "<div class='nameCompPlus' > + </div>"
        }
        nameCompContainer += compBox
    }

    nameCompContainer += "</div><button id='readNameBtn' class='readNameBtn' data-tooltip='Ανάγνωση ονόματος'" + playDisabled + ">" + svgPlay + "</button></div>"

    $("#nameAnalysis").html(nameCompContainer)
    fExplainNameComp()

}

function fClearHighlights() {
    clearInterval(myNumberingTimeout)
    currNumberEl = 0
    if (!jsmeNomeclatureApplet) return
    jsmeNomeclatureApplet.resetAtomColors(0)
    jsmeNomeclatureApplet.resetBondColors(0)
    Jmol.script(jmolAppletNomeclature, "select all;  selectionHalos off; color bonds none; color atoms none;")
    showAtomSymbols3D()
    removeEcho3D()
    $("#ruleTheoryContainer").hide()
    $("#nameAnalysisExplain").html('')
    ruleTableHighlight = 0
    JmolSelection = 'select none;'

}

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
                        myText = " Δηλώνει τη θέση της δευτερεύουσας Χαρακτηριστικής Ομάδας."
                    }

                    if (Object.keys(functionalGroupObj).length > 1) {
                        fHighlightFG(1)
                        fHighlightFG3D(1)
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
                myText = " Δηλώνει το όνομα  της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
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
                myText = " Δηλώνει το όνομα της δευτερεύουσας Χαρακτηριστικής Ομάδας."
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
            myText = " Δηλώνει το όνομα  της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
            numberingFlag = false
            fHighlightFG(2)
            fHighlightFG3D(2)
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
                case 'ίν':
                case 'ιν':
                    myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                    ruleTableHighlight = 3
                    break
                case 'διέν':
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
            myText = 'Ανήκει στη χημική τάξη ' + molTaxonomy
            nStyle = ""
            myClass = ''

            switch (molTaxonomy) {
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
}

function fAdjustRuleContainerHeight() {
    ruleElement = document.querySelector('.ruleTable');
    if (!ruleFlag) {
        ruleElement.setAttribute("style", " max-height: none ");
    } else {
        myTop = document.querySelector('#ruleContainer .ruleTable').getBoundingClientRect().top;
        myBottom = document.querySelector('#molRepColumn').getBoundingClientRect().bottom;
        ruleContainerHeight = myBottom - myTop;
        ruleElement.setAttribute("style", " max-height:" + ruleContainerHeight + "px; overflow:auto; ");
    }

}

function fHighLightMainChain() {
    if (nameAnalysisMode == 'none') { return }

    highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]

    let highAtomsArg = ""
    for (let i = 0; i < highAtoms.length; i++) {
        highAtomsArg += highAtoms[i] + ",9"
        if (i < highAtoms.length - 1) { highAtomsArg += "," }
    }
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

    fUpdateSVG()

}

function fHighlightFG(FGno) {
    // Algorithmic: reads functionalGroupObj computed by fDetectMolType.
    // No static nameExamples.functionalGroup* data used.
    if (nameAnalysisMode == 'none') { return }

    const fgKeys = Object.keys(functionalGroupObj)
        .filter(function (k) { return k !== 'hydrocarbon' })

    if (fgKeys.length === 0) { return }

    // Build flat [fgKey, heteroEl] instances ??" one per distinct element type per FG key.
    // This lets FGno index correctly across multi-element FG types (e.g. halogen: {Br, Cl}).
    let fgInstances = []
    for (let k = 0; k < fgKeys.length; k++) {
        const heteroEls = Object.keys(functionalGroupObj[fgKeys[k]])
        for (let e = 0; e < heteroEls.length; e++) {
            fgInstances.push([fgKeys[k], heteroEls[e]])
        }
    }
    // Sort: lower-priority FGs first, matching functionalGroupsList order (FGno=1 = first prefix).
    const fgPriorityOrder2D = ['carboxylicAcid', 'cyanide', 'aldehyde', 'ketone', 'alcohol', 'amine', 'nitro']
    const halogenOrder2D = Object.keys(nameMainCompObj3.halogen.substitute)
    fgInstances.sort(function (a, b) {
        if (a[0] === 'halogen' && b[0] === 'halogen') {
            return halogenOrder2D.indexOf(a[1]) - halogenOrder2D.indexOf(b[1])
        }
        return fgPriorityOrder2D.indexOf(b[0]) - fgPriorityOrder2D.indexOf(a[0])
    })

    let targetInstances = []
    if (FGno === undefined) {
        targetInstances = fgInstances
    } else {
        if (fgInstances[FGno - 1]) { targetInstances = [fgInstances[FGno - 1]] }
    }

    let highAtomsFG = []

    for (let t = 0; t < targetInstances.length; t++) {
        const fgKey = targetInstances[t][0]
        const heteroEl = targetInstances[t][1]
        const heteroList = functionalGroupObj[fgKey][heteroEl]  // 0-based atom indices

        for (let i = 0; i < heteroList.length; i++) {
            const entry = heteroList[i]
            if (Array.isArray(entry)) {
                // carboxylicAcid: entry = [oh_idx, co_idx] both 0-based
                const ohIdx = entry[0], coIdx = entry[1]
                if (!highAtomsFG.includes(ohIdx + 1)) { highAtomsFG.push(ohIdx + 1) }
                if (!highAtomsFG.includes(coIdx + 1)) { highAtomsFG.push(coIdx + 1) }
                if (Array.isArray(atomConnectivityList[ohIdx])) {
                    const sharedC = atomConnectivityList[ohIdx][0]
                    if (!highAtomsFG.includes(sharedC + 1)) { highAtomsFG.push(sharedC + 1) }
                }
                // H on the -OH oxygen (present in expanded mode)
                for (let b = 0; b < bondList.length; b++) {
                    if (!bondList[b]) { continue }
                    const ba1 = bondList[b][0], ba2 = bondList[b][1]
                    let hIdx = -1
                    if (ba1 === ohIdx + 1 && allAtomsTypeList[ba2 - 1] === 'H') { hIdx = ba2 }
                    else if (ba2 === ohIdx + 1 && allAtomsTypeList[ba1 - 1] === 'H') { hIdx = ba1 }
                    if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) { highAtomsFG.push(hIdx) }
                }
            } else {
                const heteroIdx = entry  // 0-based
                if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                if (fgKey === 'alcohol' || fgKey === 'amine') {
                    // highlight H atoms bonded to the heteroatom (present in expanded mode)
                    for (let b = 0; b < bondList.length; b++) {
                        if (!bondList[b]) { continue }
                        const ba1 = bondList[b][0], ba2 = bondList[b][1]
                        let hIdx = -1
                        if (ba1 === heteroIdx + 1 && allAtomsTypeList[ba2 - 1] === 'H') { hIdx = ba2 }
                        else if (ba2 === heteroIdx + 1 && allAtomsTypeList[ba1 - 1] === 'H') { hIdx = ba1 }
                        if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) { highAtomsFG.push(hIdx) }
                    }
                } else if (fgKey === 'aldehyde') {
                    // O + carbonyl C + aldehyde H on carbonyl C
                    if (Array.isArray(atomConnectivityList[heteroIdx]) && atomConnectivityList[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList[heteroIdx][0]  // 0-based
                        if (!highAtomsFG.includes(carbonylC + 1)) { highAtomsFG.push(carbonylC + 1) }
                        for (let b = 0; b < bondList.length; b++) {
                            if (!bondList[b]) { continue }
                            const ba1 = bondList[b][0], ba2 = bondList[b][1]
                            let hIdx = -1
                            if (ba1 === carbonylC + 1 && allAtomsTypeList[ba2 - 1] === 'H') { hIdx = ba2 }
                            else if (ba2 === carbonylC + 1 && allAtomsTypeList[ba1 - 1] === 'H') { hIdx = ba1 }
                            if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) { highAtomsFG.push(hIdx) }
                        }
                    }
                } else if (fgKey === 'ketone') {
                    // O + carbonyl C + C-neighbors of carbonyl C
                    if (Array.isArray(atomConnectivityList[heteroIdx]) && atomConnectivityList[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList[heteroIdx][0]  // 0-based
                        if (!highAtomsFG.includes(carbonylC + 1)) { highAtomsFG.push(carbonylC + 1) }
                        if (Array.isArray(atomConnectivityList[carbonylC])) {
                            for (let n = 0; n < atomConnectivityList[carbonylC].length; n++) {
                                const neighbor = atomConnectivityList[carbonylC][n]  // 0-based
                                if (allAtomsTypeList[neighbor] === 'C' && !highAtomsFG.includes(neighbor + 1)) {
                                    highAtomsFG.push(neighbor + 1)
                                }
                            }
                        }
                    }
                } else if (fgKey === 'halogen') {
                    // halogen atom only ??" no carbon neighbor
                } else if (fgKey === 'nitro') {
                    // N + bonded O atoms only, no carbon
                    if (Array.isArray(atomConnectivityList[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList[heteroIdx][n]  // 0-based
                            if (allAtomsTypeList[neighbor] === 'O' && !highAtomsFG.includes(neighbor + 1)) {
                                highAtomsFG.push(neighbor + 1)
                            }
                        }
                    }
                } else {
                    // cyanide, imine, ether, CCamine, etc.
                    if (Array.isArray(atomConnectivityList[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList[heteroIdx][n] + 1  // to 1-based
                            if (!highAtomsFG.includes(neighbor)) { highAtomsFG.push(neighbor) }
                        }
                    }
                }
            }
        }
    }

    if (highAtomsFG.length === 0) { return }

    let highAtomsFGArg = ""
    for (let i = 0; i < highAtomsFG.length; i++) {
        highAtomsFGArg += highAtomsFG[i] + ",9"
        if (i < highAtomsFG.length - 1) { highAtomsFGArg += "," }
    }
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg)

    // Derive highlighted bonds: any bond with both endpoints highlighted
    let highBondsFG = []
    for (let b = 0; b < bondList.length; b++) {
        if (!bondList[b]) { continue }
        if (highAtomsFG.includes(bondList[b][0]) && highAtomsFG.includes(bondList[b][1])) {
            highBondsFG.push(b + 1)
        }
    }

    if (highBondsFG.length === 0) {
        fUpdateSVG()
        patchtheNitrogen()
        return
    }

    let highBondsArg = ""
    for (let i = 0; i < highBondsFG.length; i++) {
        highBondsArg += highBondsFG[i] + ",9"
        if (i < highBondsFG.length - 1) { highBondsArg += "," }
    }
    jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg)
    fUpdateSVG()
    patchtheNitrogen()

}

function fHighlightFG3D(FGno) {
    // Build atom list from computed functionalGroupObj3D (SDF 1-based indices).
    // FGno undefined  ??' all FG atoms (for suffix / single-FG display)
    // FGno 1 or 2     ??' atoms for the Nth functional group (for prefix position display)

    const fgKeys = Object.keys(functionalGroupObj3D)
        .filter(function (k) { return k !== 'hydrocarbon' })

    let highAtoms3D = []

    if (fgKeys.length === 0) {
        // pure hydrocarbon ??" clear any existing highlight
        Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color atoms none; color bonds none;")
        return
    }

    // Build flat [fgKey, heteroEl] instances ??" one per distinct element type per FG key.
    let fgInstances = []
    for (let k = 0; k < fgKeys.length; k++) {
        const heteroEls = Object.keys(functionalGroupObj3D[fgKeys[k]])
        for (let e = 0; e < heteroEls.length; e++) {
            fgInstances.push([fgKeys[k], heteroEls[e]])
        }
    }
    // Sort: lower-priority FGs first, matching functionalGroupsList order (FGno=1 = first prefix).
    const fgPriorityOrder3D = ['carboxylicAcid', 'cyanide', 'aldehyde', 'ketone', 'alcohol', 'amine', 'nitro']
    const halogenOrder3D = Object.keys(nameMainCompObj3.halogen.substitute)
    fgInstances.sort(function (a, b) {
        if (a[0] === 'halogen' && b[0] === 'halogen') {
            return halogenOrder3D.indexOf(a[1]) - halogenOrder3D.indexOf(b[1])
        }
        return fgPriorityOrder3D.indexOf(b[0]) - fgPriorityOrder3D.indexOf(a[0])
    })

    let targetInstances = []
    if (FGno === undefined) {
        targetInstances = fgInstances
    } else {
        if (fgInstances[FGno - 1]) { targetInstances = [fgInstances[FGno - 1]] }
    }

    for (let t = 0; t < targetInstances.length; t++) {
        const fgKey = targetInstances[t][0]
        const heteroEl = targetInstances[t][1]
        const heteroList = functionalGroupObj3D[fgKey][heteroEl]  // array of 0-based indices

        for (let i = 0; i < heteroList.length; i++) {
            const entry = heteroList[i]
            if (Array.isArray(entry)) {
                // carboxylicAcid: [oh_idx, co_idx] both 0-based
                const ohIdx = entry[0], coIdx = entry[1]
                highAtoms3D.push(ohIdx + 1)  // to 1-based
                highAtoms3D.push(coIdx + 1)
                // also include the shared C
                if (Array.isArray(atomConnectivityList3D[ohIdx])) {
                    const sharedC = atomConnectivityList3D[ohIdx][0]
                    if (!highAtoms3D.includes(sharedC + 1)) { highAtoms3D.push(sharedC + 1) }
                }
                // H on the -OH oxygen
                for (let b = 0; b < bondList3D.length; b++) {
                    if (!bondList3D[b]) { continue }
                    const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1]
                    let hIdx = -1
                    if (ba1 === ohIdx + 1 && allAtomsTypeList3D[ba2 - 1] === 'H') { hIdx = ba2 }
                    else if (ba2 === ohIdx + 1 && allAtomsTypeList3D[ba1 - 1] === 'H') { hIdx = ba1 }
                    if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) { highAtoms3D.push(hIdx) }
                }
            } else {
                const heteroIdx = entry  // 0-based
                if (!highAtoms3D.includes(heteroIdx + 1)) { highAtoms3D.push(heteroIdx + 1) }
                if (fgKey === 'alcohol' || fgKey === 'amine') {
                    // highlight H atoms bonded to the heteroatom
                    for (let b = 0; b < bondList3D.length; b++) {
                        if (!bondList3D[b]) { continue }
                        const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1]
                        let hIdx = -1
                        if (ba1 === heteroIdx + 1 && allAtomsTypeList3D[ba2 - 1] === 'H') { hIdx = ba2 }
                        else if (ba2 === heteroIdx + 1 && allAtomsTypeList3D[ba1 - 1] === 'H') { hIdx = ba1 }
                        if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) { highAtoms3D.push(hIdx) }
                    }
                } else if (fgKey === 'aldehyde') {
                    // O + carbonyl C + aldehyde H on carbonyl C
                    if (Array.isArray(atomConnectivityList3D[heteroIdx]) && atomConnectivityList3D[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList3D[heteroIdx][0]  // 0-based
                        if (!highAtoms3D.includes(carbonylC + 1)) { highAtoms3D.push(carbonylC + 1) }
                        for (let b = 0; b < bondList3D.length; b++) {
                            if (!bondList3D[b]) { continue }
                            const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1]
                            let hIdx = -1
                            if (ba1 === carbonylC + 1 && allAtomsTypeList3D[ba2 - 1] === 'H') { hIdx = ba2 }
                            else if (ba2 === carbonylC + 1 && allAtomsTypeList3D[ba1 - 1] === 'H') { hIdx = ba1 }
                            if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) { highAtoms3D.push(hIdx) }
                        }
                    }
                } else if (fgKey === 'ketone') {
                    // O + carbonyl C + C-neighbors of carbonyl C
                    if (Array.isArray(atomConnectivityList3D[heteroIdx]) && atomConnectivityList3D[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList3D[heteroIdx][0]  // 0-based
                        if (!highAtoms3D.includes(carbonylC + 1)) { highAtoms3D.push(carbonylC + 1) }
                        if (Array.isArray(atomConnectivityList3D[carbonylC])) {
                            for (let n = 0; n < atomConnectivityList3D[carbonylC].length; n++) {
                                const neighbor = atomConnectivityList3D[carbonylC][n]  // 0-based
                                if (allAtomsTypeList3D[neighbor] === 'C' && !highAtoms3D.includes(neighbor + 1)) {
                                    highAtoms3D.push(neighbor + 1)
                                }
                            }
                        }
                    }
                } else if (fgKey === 'halogen') {
                    // halogen atom only ??" no carbon neighbor
                } else if (fgKey === 'nitro') {
                    // N + bonded O atoms only, no carbon
                    if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList3D[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList3D[heteroIdx][n]  // 0-based
                            if (allAtomsTypeList3D[neighbor] === 'O' && !highAtoms3D.includes(neighbor + 1)) {
                                highAtoms3D.push(neighbor + 1)
                            }
                        }
                    }
                } else {
                    // cyanide, imine, ether, CCamine, etc.
                    if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList3D[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList3D[heteroIdx][n] + 1
                            if (!highAtoms3D.includes(neighbor)) { highAtoms3D.push(neighbor) }
                        }
                    }
                }
            }
        }
    }

    if (highAtoms3D.length === 0) {
        Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color atoms none; color bonds none;")
        return
    }

    let highAtoms3DArg = "select"
    for (let i = 0; i < highAtoms3D.length; i++) {
        highAtoms3DArg += " atomno=" + highAtoms3D[i]
        if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }
    }

    Jmol.script(jmolAppletNomeclature, highAtoms3DArg + ";color selectionHalos[X79dc6d]; selectionHalos on; color bonds [X79dc6d]; color atoms [X79dc6d];")
    JmolSelection = highAtoms3DArg
}

function fShowNumbering(time) {

    if (!numberingFlag) { return }
    clearInterval(myNumberingTimeout)
    numbersSVGElements = []

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
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
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
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
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
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
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

    myAtom = nameExamples[selectedMol].mainChain3D[n]

    if (typeof myAtom === "undefined" || myAtom === null) {
        return;
    }

    let id = "theGroupEcho" + (n + 1)
    let atom = "{atomno = " + myAtom + "}"
    let num = (n + 1)
    let d = 0.01  // stroke thickness in ?. (tune this)

    // Shadow echoes in 4 directions (black stroke)
    let s = ""
    s += " set echo " + id + " " + atom + "; set echo offset {-1.1 1.1 3}; font echo 42 sansSerif bold; color echo[x193f8f]; echo " + num + ";"

    s += " set echo " + id + "s1 " + atom + "; set echo offset {" + (-1.1 + d) + " " + (1.1 - d) + " 3}; font echo 42 sansSerif bold; color echo black; echo " + num + ";"

    Jmol.script(jmolAppletNomeclature, s)
    // myScript = " set echo theGroupEcho" + (n + 1) + "{atomno = " + myAtom + "}; set echo offset {-1.1 1.1 3}; font echo  42 sansSerif bold; color echo[x19B702];  echo  " + (n + 1) + ";"

    // Jmol.script(jmolAppletNomeclature, myScript)
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
    // Uses SDF-derived *3D globals directly ??" no 2D??'position??'3D mapping needed.

    if (multiBondListCC3D.length === 0) { return }

    let bondType
    if (bondCompPos === 1) {
        bondType = multiBondsObj3D.CCd.length > 0 ? 2 : 3
    } else {
        bondType = 3  // bondCompPos 2 always targets triple bonds
    }

    const highBonds3D = []
    for (let i = 0; i < multiBondListCC3D.length; i++) {
        const bondID = multiBondListCC3D[i]
        if (bondList3D[bondID - 1][2] !== bondType) { continue }
        const atom1 = bondList3D[bondID - 1][0]  // already SDF 1-based
        const atom2 = bondList3D[bondID - 1][1]
        highBonds3D.push([atom1, atom2])
    }

    if (highBonds3D.length === 0) { return }

    let highAtoms3DArg = "select"
    for (let i = 0; i < highBonds3D.length; i++) {
        highAtoms3DArg += " atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1]
        if (i < highBonds3D.length - 1) { highAtoms3DArg += "," }
        Jmol.script(jmolAppletNomeclature, "select atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1] + "; color bond [X79dc6d];")
    }

    Jmol.script(jmolAppletNomeclature, highAtoms3DArg + "; color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];")

    // Single bonds bridging two highlighted atoms (e.g. C2-C3 in a diene) inherit green from
    // atom colors even though they were never explicitly colored. Reset them to CPK.
    const highAtomSet = new Set()
    for (let i = 0; i < highBonds3D.length; i++) {
        highAtomSet.add(highBonds3D[i][0])
        highAtomSet.add(highBonds3D[i][1])
    }
    for (let b = 0; b < bondList3D.length; b++) {
        if (!bondList3D[b]) { continue }
        const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1], bOrder = bondList3D[b][2]
        if (bOrder === 1 && highAtomSet.has(ba1) && highAtomSet.has(ba2)) {
            Jmol.script(jmolAppletNomeclature, "select atomno=" + ba1 + ", atomno=" + ba2 + "; color bond cpk;")
        }
    }

    JmolSelection = highAtoms3DArg
}

function fSetMolVis3D(theVisModel) {
    if (theVisModel === undefined) {
        theVisModel = vis3D
    }

    switch (theVisModel) {
        case 'ballnstick':
            mySpt = ' select all and not _Xx;  spacefill 24%; wireframe 0.13;set labelFront off;' + JmolSelection
            break
        case 'spacefill':
            mySpt = ' select all and not _Xx;  spacefill 70%; wireframe off;set labelFront off;' + JmolSelection
            break
        case 'sticks':
            mySpt = ' select all and not _Xx;  spacefill off; wireframe 0.2;  set labelFront on;' + JmolSelection
            break
    }
    Jmol.script(jmolAppletNomeclature, mySpt);

    switch (nameAnalysisMode) {
        case 'compCarbonsCount':
            break
        case 'compBondType':
            break
        case 'compSuffix':
            break
        case 'none':

            break
        default:

    }

}

function fInitNomeclatureMenu() {
    let myHTML = "<div class='panelTitle' style=''> Παραδείγματα </div><div class='menuNomeclature2Container' style=''> "
    let rule = 0;

    let myNamesArr = Object.getOwnPropertyNames(nameExamples)
    tmpTXT = ""
    for (j = 0; j < myNamesArr.length; j++) {
        tmpTXT += (j + 1) + ": " + myNamesArr[j] + ", "
    }

    for (let currRule in ruleExamples) {
        rule += 1;
        myRuleName = rule + "<sup>ος</sup> Κανόνας"
        myHTML += "<div  class='crossMenuLi'> " + myRuleName + "</div>"

        currExamples = ruleExamples[currRule]

        myHTML += "<div class='exmplContainer closed' ><div class='menuListContainer'>"
        for (tmpExmpl = 0; tmpExmpl < currExamples.length; tmpExmpl++) {
            let prop = myNamesArr[currExamples[tmpExmpl] - 1]

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

function showRadio(myLi) {

    let radioHtml = "<div class='radioMenuContainer' style='padding:0;margin:0; border-top:0;'> <div class='radioGroupContainer VFlex ' style='display:none'>" +
        "    <div class='radioNoneContainer selectedRadio'> 1<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span"
        "            class='radioCheck'></span></div>" +
        "    <div class='radioNoneContainer unselectedRadio'> 2<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span"
        "            class='radioCheck'></span> </div>" +
        "    <div class='radioNoneContainer unselectedRadio'> 3<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span"
        "            class='radioCheck'></span> </div>" +
        "</div></div>"

    $(myLi).after(radioHtml);

    updateRadioNumbers(selectedHomoIndex)

    $(".radioGroupContainer").slideDown(300)
}

function fCreateDropMenu(myItems) {

    selectedLabel = myItems[0]
    myHTML = "<div id='dropLabel' class=' closed' >" + selectedLabel + "</div>"
    myHTML += "<div id='dropLiContainer' class='molvis closed' >"
    for (i = 0; i < myItems.length; i++) {
        myHTML += "<div id='dropLi" + i + "' class='dropLi'>" + myItems[i] + "</div>"
    }
    myHTML += "</div>"
    $("#dropMenu").html(myHTML)
}

function fShowCreditLibs() {
    myCredits = "<div class='creditsContainer'>"
    myCredits += "<div class=''>2D visualizations made with <strong>JSME</strong>: B. Bienfait and P. Ertl, J. Cheminform., 2013, 5, 24.</div>"
    myCredits += "<div> | </div>"
    myCredits += "<div class=''>3D visualizations made with <strong>JSmol</strong>: R. M. Hanson, J. Prilusky, Z. Renjian, T. Nakane and J. L. Sussman, Isr. J. Chem., 2013, 53, 207–216.</div> "
    myCredits += "</div>"

    myCredits = ""
    myCredits += "<div class='creditsContainer'>"
    myCredits += "<div class=''>Αναστασία Θεοφανίδου, Βασίλης Κουταλάς, <a href='https://nicharis.webpages.auth.gr/' target='_blank'> Νικόλας Χαριστός </a></div>"
    myCredits += "<div>|</div>"
    myCredits += "<div class=''>Τμήμα Χημείας</div>"
    myCredits += "<div>|</div>"
    myCredits += "<div class=''>ΑΠΘ 2025-26</div>"
    myCredits += "</div>"
    $("#creditsUs").html(myCredits)

}

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

$(document).ready(function () {

    fInitData()
    fInitNamingProps()
    fInitNomeclatureMenu()
    fInitTheory()
    fShowCreditLibs()

    $(document).on('click', '#narrateBtn', fNarrateRule)

    $(document).on('click', '#narrateAnalysisToggle', function () {
        narrateAnalysisFlag = !narrateAnalysisFlag
        $(this).html(narrateAnalysisFlag ? svgSpeaker : svgMute)
            .attr('data-tooltip', narrateAnalysisFlag ? 'Αφήγηση ενεργή' : 'Αφήγηση ανενεργή')
        if (!narrateAnalysisFlag) {
            window.speechSynthesis.cancel()
            $('#readNameBtn').prop('disabled', true)
        } else {
            $('#readNameBtn').prop('disabled', false)
        }
    })

    $(document).on('click', '#readNameBtn', function () {
        if (!narrateAnalysisFlag || !selectedMol || !nameExamples[selectedMol]) return
        const text = currentMolName.replace(/<[^>]*>/g, '')
        fSpeakGreek(text)
    })

    // ---- Drop menu: init early so upstream errors don't prevent it loading ----
    let dropState = false
    let selectedLabel

    menuItmes = ["Σφαίρες και Ράβδοι", "Σφαίρες", "Ράβδοι"]
    fCreateDropMenu(menuItmes)

    $('html').on('click', function () {
        $("#dropLiContainer").slideUp(100)
        $("#dropLabel").removeClass('open').addClass('closed')
        dropState = false
    })

    $(document).on('click', '#dropLabel', function (event) {
        event.stopPropagation()
        dropState = !dropState
        $("#dropLiContainer").slideToggle(100)
        if (dropState) {
            $(this).removeClass('closed').addClass('open')
        } else {
            $(this).removeClass('open').addClass('closed')
        }
    })

    $(document).on('click', '.dropLi', function () {
        selectedLabel = $(this).html()
        $("#dropLabel").html(selectedLabel)
        $("#dropLiContainer").slideUp(100)
        dropState = false
        $("#dropLabel").removeClass('open').addClass('closed')
    })

    $(document).on('click', '.molvis .dropLi', function () {
        const myID = $(this).attr('id')
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
    // ---- End drop menu early init ----

    // Add data (2D structure files ) to nameExamples object

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

        if (!selectedMol || !nameExamples[selectedMol]) { return }

        fLoadMol2D()
        currNumberEl = 0
        fExplainNameComp()

    });

    /////////// Export PNG /////////////

    /////////// Export PNG /////////////

    ///////////////  Name Analysis /////////////////

    $(document).on("click", ".nameCompBox", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const lockScroll = () => window.scrollTo(scrollX, scrollY);
        window.addEventListener('scroll', lockScroll);
        requestAnimationFrame(() => requestAnimationFrame(() => window.removeEventListener('scroll', lockScroll)));
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
            if (narrateAnalysisFlag) {
                const explainText = $('#nameAnalysisExplain').text().replace(/\bC\b/g, '')
                fSpeakGreek(explainText)
            }
        }

    })

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

    /// Menu funcionality: SELECT MOLECULE
    $(".menuLi").on("click", function () {
        selectedMol = $(this).attr('id');

        $(".menuLi").removeClass("selectedLi");
        $(this).addClass("selectedLi");

        fSelectMol()

    });

    /////////////// MENU ///////////////

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

    });

    // Select first rule by default on load
    $(".menuNomeclature2Container .crossMenuLi").first().trigger("click");
    // Select first molecule by default on load
    $(".menuLi").first().trigger("click");

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
        if ($(this).hasClass("unselectedRadio")) {
            let group = $(this).closest(".radioGroupContainer").find(".radioCheckContainer");
            group.removeClass("selectedRadio").addClass("unselectedRadio");
            $(this).removeClass("unselectedRadio").addClass("selectedRadio");
        }
    });

    ////////////// DEBUG //////////////////

    let selectedAtom, selectedBond;

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

