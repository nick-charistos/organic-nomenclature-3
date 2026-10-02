// nom-core-35.js
// Pure analysis engine — no DOM, no jQuery.
// Reads molecular data from JSME API / parsed SDF text.
// Writes to shared globals consumed by nom-molview-35.js.

// ── Analysis globals (2D) ──────────────────────────────────────────────────
let atomsCount, bondsCount
let carbonHydrogens = []
let bondList, multiBondListCC, svgBondList, atomValenceList
let multiBondsObj = { CCd: [], CCt: [], COd: [], CNt: [] }
let molBondType
let mainChainAtomsList
let mainChainAtoms3D = []
let allAtomsTypeList
let atomTypeObj, atomTypes
let atomConnectivityList
let functionalGroupObj, functionalGroupsList

// ── Analysis globals (3D, populated asynchronously from SDF) ──────────────
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

let carbons = 0

// ── Naming globals ────────────────────────────────────────────────────────
let nameComponentsList = []
let currentMolName = ""
let nameMainCompList1 = []
let nameMainCompObj3 = {}
let nameMultiPrefix = []
let functionalGroupsOrder = []
const gFunctionalGroupsOrder = ["carboxylicAcid", "cyanide", "aldehyde", "ketone", "alcohol", "amine", "nitro"]
let molTaxonomy = ""

// ── fInitNamingProps ──────────────────────────────────────────────────────

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

// ── fAnalyseStructure ─────────────────────────────────────────────────────

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

// ── fDetectMolType ────────────────────────────────────────────────────────

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

// ── fGuessName ────────────────────────────────────────────────────────────

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
        comp4 = nameMainCompObj3[functionalGroupsList[0]].suffix // 3o Κυριο Συνθετικό - κατάληξη
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

// ── fSpeakGreek ───────────────────────────────────────────────────────────

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

// ── fSpeakNameWithPauses ──────────────────────────────────────────────────

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

// ── fParseSDF3D ───────────────────────────────────────────────────────────

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

// ── fDetectMolType3D ──────────────────────────────────────────────────────

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

