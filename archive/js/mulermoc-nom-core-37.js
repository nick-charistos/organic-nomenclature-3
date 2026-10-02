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

// ── fCalcMainChain shared state (read by fValidateMainChain) ──────────────────
let anchorCarbons = {}       // all FG-bearing C atoms (used for scoring + substituent tier)
let principalFgCarbons = {}  // subset: alcohol/ketone/amine — priority over multi-bonds
let anchorSubstName = {}     // Greek prefix-substituent names per anchor C (halogen/nitro); Tier-4 tiebreaker
let ccDoubleBondKeys = {}
let ccTripleBondKeys = {}

// ── fCalcMainChain3D shared state (read by fValidateMainChain3D) ─────────────
let anchorCarbons3D = {}
let principalFgCarbons3D = {}
let ccDoubleBondKeys3D = {}
let ccTripleBondKeys3D = {}

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
    if (!jsmeNomeclatureApplet) {
        console.error("jsmeNomeclatureApplet is not initialized.");
        return;
    }
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
                                // console.log("found N functional group: ", functionalGroupObj)
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

// ── fCalcMainChain ────────────────────────────────────────────────────────────
// Algorithmically determines the main (longest) carbon chain following IUPAC rules.
// Populates global `mainChainAtomsList` with 1-based JSME atom numbers, C1 → Cn.
//
// Requires (set by fAnalyseStructure + fDetectMolType before this is called):
//   allAtomsTypeList, atomsCount, atomConnectivityList, bondList, multiBondsObj,
//   functionalGroupObj
//
// Algorithm:
//   1.  Build carbon-only adjacency subgraph (0-based indices)
//   2.  Trivial case: single carbon → done
//   3.  Identify terminal carbons (degree ≤ 1 in C-only graph)
//   4.  DFS from each terminal → enumerate all terminal-to-terminal simple paths
//   5.  Collect anchor carbons (C bonded to heteroatoms) from functionalGroupObj
//   6.  Build CC multi-bond lookup sets for scoring
//   7.  Score each candidate path (longest → most FG anchors → most multi-bonds → most doubles)
//   8.  Orient selected path: forced-C1 rule (aldehyde/acid/cyanide) OR lowest-locant rule
//   9.  Write result to mainChainAtomsList (1-based)
//  10.  Validate against stored nameExamples data via fValidateMainChain()

function fCalcMainChain() {

    // ── Step 1: Carbon-only adjacency list (all indices 0-based) ─────────────────
    // Restrict the molecular graph to C–C bonds only, ignoring all heteroatoms.
    // This gives the pure carbon skeleton that IUPAC naming operates on.
    const carbAtoms = []  // 0-based indices of every C atom
    for (let i = 0; i < atomsCount; i++) {
        if (allAtomsTypeList[i] === 'C') carbAtoms.push(i)
    }

    // cAdj[c] = array of 0-based indices of carbons directly bonded to carbon c
    const cAdj = {}
    for (let ci = 0; ci < carbAtoms.length; ci++) {
        const c = carbAtoms[ci]
        cAdj[c] = []
        if (Array.isArray(atomConnectivityList[c])) {
            for (let ni = 0; ni < atomConnectivityList[c].length; ni++) {
                const nb = atomConnectivityList[c][ni]
                if (allAtomsTypeList[nb] === 'C') cAdj[c].push(nb)
            }
        }
    }

    // ── Step 2: Trivial case — single carbon (methane, methanoic acid, etc.) ─────
    if (carbAtoms.length === 1) {
        mainChainAtomsList = [carbAtoms[0] + 1]  // 0-based → 1-based JSME number
        fValidateMainChain()
        return
    }

    // ── Step 3: Terminal carbons (chain endpoints / leaf nodes) ─────────────────
    // degree 1 in C-only graph = tip of a chain or branch.
    // Simple linear chain → exactly 2 terminals.
    // Branched chain → 3 or more terminals (each branch tip is a terminal).
    const terminals = carbAtoms.filter(function(c) { return cAdj[c].length <= 1 })

    // ── Step 4: DFS — enumerate all simple paths between terminal pairs ──────────
    // For acyclic (tree) graphs there is exactly ONE simple path between any two nodes,
    // so deduplication by unordered {start, end} pair is sufficient.
    // The stack holds [currentNode, pathSoFar]; a path is complete when no unvisited
    // C-neighbour remains (dead end = terminal, or revisiting would create a cycle).
    // This structure correctly handles future branched molecules: every leaf-to-leaf
    // path is found in a single pass.

    function dfsAllPaths(start) {
        const result = []
        const stack = [[start, [start]]]  // each entry: [currentNode, pathArray]
        while (stack.length > 0) {
            const top = stack.pop()
            const node = top[0], path = top[1]
            // Collect C-neighbours not yet visited in this path
            const unvisited = []
            const neighbours = cAdj[node]
            for (let k = 0; k < neighbours.length; k++) {
                if (path.indexOf(neighbours[k]) < 0) unvisited.push(neighbours[k])
            }
            if (unvisited.length === 0) {
                // Cannot extend further — path is complete
                result.push(path)
            } else {
                // Extend to each unvisited neighbour
                for (let k = 0; k < unvisited.length; k++) {
                    stack.push([unvisited[k], path.concat([unvisited[k]])])
                }
            }
        }
        return result
    }

    // Collect all terminal-to-terminal paths, deduplicated by canonical {start, end} key
    const candidatePaths = []
    const seenPairs = {}
    for (let ti = 0; ti < terminals.length; ti++) {
        const t = terminals[ti]
        const paths = dfsAllPaths(t)
        for (let pi = 0; pi < paths.length; pi++) {
            const p = paths[pi]
            const otherEnd = p[p.length - 1]
            // Discard paths that don't reach a terminal at both ends
            if (cAdj[otherEnd].length > 1) continue
            // Canonical pair key avoids collecting A→B and B→A as two separate paths
            const pairKey = Math.min(t, otherEnd) + '_' + Math.max(t, otherEnd)
            if (!seenPairs[pairKey]) {
                seenPairs[pairKey] = true
                candidatePaths.push(p)
            }
        }
    }

    // ── Step 5: Anchor and forced-C1 carbons from functionalGroupObj ─────────────
    // anchorCarbons: every C atom directly bonded to a heteroatom of a detected FG.
    //   These Cs SHOULD sit on the main chain (secondary scoring criterion).
    // terminalFgCarbons: subset where IUPAC always places the FG at C1 (no locant):
    //   aldehyde (-CHO), carboxylicAcid (-COOH), cyanide (-C≡N).
    //   Finding one in the best path forces the chain direction (C1 end).
    // Note: halogen, alcohol, amine, ketone, nitro all get numeric locants → NOT forced-C1.

    anchorCarbons = {}       // all FG-bearing C atoms — also read by fValidateMainChain
    principalFgCarbons = {}  // subset: alcohol/ketone/amine (beat multi-bonds in orientation)
    anchorSubstName = {}     // reset: rebuilt each call for Tier-4 tiebreaker
    const terminalFgCarbons = {} // sub-set: aldehyde/acid/cyanide — forced to C1 (Rule A)

    const fgKeys = Object.keys(functionalGroupObj)
    for (let fi = 0; fi < fgKeys.length; fi++) {
        const fg = fgKeys[fi]
        if (fg === 'hydrocarbon') continue  // no heteroatom → no anchor C
        const fgData = functionalGroupObj[fg]
        const heteroKeys = Object.keys(fgData)
        for (let hi = 0; hi < heteroKeys.length; hi++) {
            const heteroAtoms = fgData[heteroKeys[hi]]
            for (let ei = 0; ei < heteroAtoms.length; ei++) {
                const entry = heteroAtoms[ei]
                let anchorC = null
                if (Array.isArray(entry)) {
                    // Paired entry (carboxylicAcid): [o_alcohol_idx, o_ketone_idx].
                    // Both O atoms are bonded to the same COOH C — use the first O to reach it.
                    if (Array.isArray(atomConnectivityList[entry[0]])) {
                        anchorC = atomConnectivityList[entry[0]][0]
                    }
                } else {
                    // Single heteroatom index — its first (only, for terminal atoms) C neighbour
                    if (Array.isArray(atomConnectivityList[entry])) {
                        anchorC = atomConnectivityList[entry][0]
                    }
                }
                if (anchorC !== null) {
                    anchorCarbons[anchorC] = true
                    if (fg === 'carboxylicAcid') {
                        terminalFgCarbons[anchorC] = 3  // highest IUPAC priority: always C1 when on chain
                    } else if (fg === 'cyanide') {
                        terminalFgCarbons[anchorC] = 2
                    } else if (fg === 'aldehyde') {
                        terminalFgCarbons[anchorC] = 1  // demoted when higher-priority FG also present
                    } else if (fg === 'alcohol' || fg === 'ketone' || fg === 'amine') {
                        // Principal characteristic groups: suffix FGs that rank above multi-bonds
                        principalFgCarbons[anchorC] = true
                    }
                    // halogen / nitro: also store Greek name for Tier-4 alphabetical tiebreaker
                    if (fg === 'halogen') {
                        const gName = nameMainCompObj3.halogen.substitute[heteroKeys[hi]]
                        if (gName) {
                            if (!anchorSubstName[anchorC]) anchorSubstName[anchorC] = []
                            anchorSubstName[anchorC].push(gName)
                        }
                    } else if (fg === 'nitro') {
                        if (!anchorSubstName[anchorC]) anchorSubstName[anchorC] = []
                        anchorSubstName[anchorC].push(nameMainCompObj3.nitro.substitute)
                    }
                }
            }
        }
    }

    // ── Step 6: CC multi-bond lookup (canonical 0-based "minIdx_maxIdx" keys) ────
    // Precompute sets of bond keys so scoring helpers run in O(path_length) per path.
    ccDoubleBondKeys = {}  // also read by fValidateMainChain
    ccTripleBondKeys = {}  // also read by fValidateMainChain
    for (let bi = 0; bi < multiBondsObj.CCd.length; bi++) {
        const bIdx = multiBondsObj.CCd[bi]
        const a1 = bondList[bIdx - 1][0] - 1  // bondList entries are 1-based → 0-based
        const a2 = bondList[bIdx - 1][1] - 1
        ccDoubleBondKeys[Math.min(a1, a2) + '_' + Math.max(a1, a2)] = true
    }
    for (let bi = 0; bi < multiBondsObj.CCt.length; bi++) {
        const bIdx = multiBondsObj.CCt[bi]
        const a1 = bondList[bIdx - 1][0] - 1
        const a2 = bondList[bIdx - 1][1] - 1
        ccTripleBondKeys[Math.min(a1, a2) + '_' + Math.max(a1, a2)] = true
    }

    // Helpers — operate on 0-based path arrays
    function countDoubleBonds(path) {
        let n = 0
        for (let i = 0; i < path.length - 1; i++) {
            if (ccDoubleBondKeys[Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])]) n++
        }
        return n
    }
    function countMultiBonds(path) {
        let n = 0
        for (let i = 0; i < path.length - 1; i++) {
            const key = Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])
            if (ccDoubleBondKeys[key] || ccTripleBondKeys[key]) n++
        }
        return n
    }
    function countAnchorsInPath(path) {
        let n = 0
        for (let i = 0; i < path.length; i++) { if (anchorCarbons[path[i]]) n++ }
        return n
    }

    // ── Step 7: Score candidates and select the best path ────────────────────────
    // IUPAC priority (adapted for Greek high-school scope):
    //   a) Longest chain (most C atoms)                            ← primary
    //   b) Most anchor carbons included (FG-bearing Cs on chain)   ← secondary
    //   c) Most total CC multi-bonds on the chain                  ← tertiary
    //   d) Most CC double bonds specifically                       ← quaternary
    let bestPath = null
    let bestLen = -1, bestAnchors = -1, bestMulti = -1, bestDouble = -1

    for (let ci = 0; ci < candidatePaths.length; ci++) {
        const p       = candidatePaths[ci]
        const pLen    = p.length
        const pAnch   = countAnchorsInPath(p)
        const pMulti  = countMultiBonds(p)
        const pDouble = countDoubleBonds(p)

        const isBetter = (
            pLen > bestLen ||
            (pLen === bestLen && pAnch   > bestAnchors) ||
            (pLen === bestLen && pAnch   === bestAnchors && pMulti  > bestMulti) ||
            (pLen === bestLen && pAnch   === bestAnchors && pMulti  === bestMulti && pDouble > bestDouble)
        )
        if (isBetter) {
            bestPath = p; bestLen = pLen; bestAnchors = pAnch; bestMulti = pMulti; bestDouble = pDouble
        }
    }

    if (!bestPath) {
        // Fallback: should never occur for a valid organic molecule
        mainChainAtomsList = carbAtoms.map(function(c) { return c + 1 })
        fValidateMainChain()
        return
    }

    // ── Step 8: Orient the path — determine C1 → Cn direction ────────────────────
    // Rule A — Forced C1 (aldehyde / carboxylicAcid / cyanide):
    //   The anchor C of these FGs is always C1 (no locant appears in the IUPAC name).
    //   If the forced-C1 carbon is currently at the END of the path → reverse.
    // Rule B — Lowest locants (all other molecule types):
    //   Compute sorted locant sets for both forward and reversed orientations.
    //   Pick the direction whose locant set is lexicographically smaller
    //   (first-differing locant wins — standard IUPAC lowest-locant criterion).

    let oriented = bestPath.slice()  // working copy; do not mutate bestPath

    // Check whether a forced-C1 carbon is present in this path
    let forcedC1 = -1
    let forcedC1Priority = -1
    const termFgKeys = Object.keys(terminalFgCarbons)
    for (let ti = 0; ti < termFgKeys.length; ti++) {
        const tc = parseInt(termFgKeys[ti])
        // Pick the highest-priority FG carbon on the path (handles molecules with two terminal FGs,
        // e.g. oxo-acid: CHO priority=1 vs COOH priority=3 → COOH wins as C1).
        if (oriented.indexOf(tc) >= 0 && terminalFgCarbons[tc] > forcedC1Priority) {
            forcedC1 = tc
            forcedC1Priority = terminalFgCarbons[tc]
        }
    }

    if (forcedC1 >= 0) {
        // Forced-C1 must be at index 0
        if (oriented[oriented.length - 1] === forcedC1) {
            // Currently at tail → reverse so it becomes the head
            oriented = oriented.slice().reverse()
        }
    } else {
        // No forced C1 → use lowest-locant rule.
        // IUPAC hierarchy: FG locants take priority over multi-bond locants.
        // Three-tier IUPAC priority for direction:
        //   Tier 1 — principal characteristic groups (alcohol/ketone/amine): suffix FGs beat everything
        //   Tier 2 — multiple bonds (C=C, C≡C): beat prefix substituents
        //   Tier 3 — detachable prefixes (halogen/nitro): lowest priority
        //   e.g. pent-4-en-2-ol:       FG(fwd)=[2] < FG(rev)=[4]  → tier 1 decides
        //        4-bromo-but-1-ene:    FG tied=[]   → multiBond(fwd)=[1] < multiBond(rev)=[3] → tier 2 decides

        function getPrincipalFgLocantSet(path) {
            const locants = []
            const ancKeys = Object.keys(principalFgCarbons)
            for (let ai = 0; ai < ancKeys.length; ai++) {
                const pos = path.indexOf(parseInt(ancKeys[ai]))
                if (pos >= 0) locants.push(pos + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function getMultiBondLocantSet(path) {
            const locants = []
            for (let i = 0; i < path.length - 1; i++) {
                const key = Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])
                if (ccDoubleBondKeys[key] || ccTripleBondKeys[key]) locants.push(i + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function getDoubleBondLocantSet(path) {
            const locants = []
            for (let i = 0; i < path.length - 1; i++) {
                const key = Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])
                if (ccDoubleBondKeys[key]) locants.push(i + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function getSubstituentLocantSet(path) {
            // halogen / nitro: anchorCarbons that are NOT principalFgCarbons
            const locants = []
            const ancKeys = Object.keys(anchorCarbons)
            for (let ai = 0; ai < ancKeys.length; ai++) {
                const ac = parseInt(ancKeys[ai])
                if (principalFgCarbons[ac]) continue
                const pos = path.indexOf(ac)
                if (pos >= 0) locants.push(pos + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function lexLess(a, b) {
            const maxLen = Math.max(a.length, b.length)
            for (let i = 0; i < maxLen; i++) {
                const la = (i < a.length) ? a[i] : Infinity
                const lb = (i < b.length) ? b[i] : Infinity
                if (la < lb) return true
                if (lb < la) return false
            }
            return false
        }

        const rev = oriented.slice().reverse()
        const fwdFg = getPrincipalFgLocantSet(oriented)
        const revFg = getPrincipalFgLocantSet(rev)
        let useForward = true
        if (lexLess(revFg, fwdFg)) {
            // Tier 1: reversed gives lower principal-FG locants
            useForward = false
        } else if (!lexLess(fwdFg, revFg)) {
            // Tier 1 tied → Tier 2: multi-bond locants
            const fwdMb = getMultiBondLocantSet(oriented)
            const revMb = getMultiBondLocantSet(rev)
            if (lexLess(revMb, fwdMb)) {
                useForward = false
            } else if (!lexLess(fwdMb, revMb)) {
                // Tier 2 tied → Tier 2b: double bonds get lower locants than triple bonds
                const fwdDb = getDoubleBondLocantSet(oriented)
                const revDb = getDoubleBondLocantSet(rev)
                if (lexLess(revDb, fwdDb)) {
                    useForward = false
                } else if (!lexLess(fwdDb, revDb)) {
                    // Tier 2b tied → Tier 3: substituent (halogen/nitro) locants
                    const fwdSub = getSubstituentLocantSet(oriented)
                    const revSub = getSubstituentLocantSet(rev)
                    if (lexLess(revSub, fwdSub)) {
                        useForward = false
                    } else if (!lexLess(fwdSub, revSub)) {
                        // Tier 4: alphabetical priority — give lowest locant to the
                        // alphabetically-first substituent name (IUPAC; Greek alphabet here).
                        // e.g. βρωμο < χλωρο → Br must get the lower locant.
                        function getSubstituentAlphaList(path) {
                            const pairs = []
                            const acKeys = Object.keys(anchorSubstName)
                            for (let ai = 0; ai < acKeys.length; ai++) {
                                const ac = parseInt(acKeys[ai])
                                if (principalFgCarbons[ac]) continue
                                const pos = path.indexOf(ac)
                                if (pos < 0) continue
                                const names = anchorSubstName[ac]
                                for (let ni = 0; ni < names.length; ni++) {
                                    pairs.push([names[ni], pos + 1])
                                }
                            }
                            pairs.sort(function(a, b) {
                                if (a[0] < b[0]) return -1
                                if (a[0] > b[0]) return 1
                                return a[1] - b[1]
                            })
                            return pairs
                        }
                        const fwdAlpha = getSubstituentAlphaList(oriented)
                        const revAlpha = getSubstituentAlphaList(rev)
                        for (let ai = 0; ai < fwdAlpha.length && ai < revAlpha.length; ai++) {
                            if (fwdAlpha[ai][0] !== revAlpha[ai][0]) break
                            if (revAlpha[ai][1] < fwdAlpha[ai][1]) { useForward = false; break }
                            if (fwdAlpha[ai][1] < revAlpha[ai][1]) break
                        }
                    }
                }
            }
        }
        if (!useForward) oriented = oriented.slice().reverse()
    }

    // ── Step 9: Write mainChainAtomsList (1-based JSME atom numbers) ─────────────
    // Convert 0-based internal C indices back to 1-based JSME atom numbers,
    // the format consumed by fGuessName (indexOf, locant arithmetic).
    mainChainAtomsList = oriented.map(function(c) { return c + 1 })

    // ── Step 10: Validate against stored data ────────────────────────────────────
    fValidateMainChain()
}

// ── fValidateMainChain ────────────────────────────────────────────────────────
// Compares computed mainChainAtomsList against the hand-curated nameExamples data.
// Logs to console only — no side-effects on any global.
// Outcomes per molecule:
//   ✓  exact match (length + atoms + direction)
//   DIRECTION MISMATCH — correct atoms but wrong end chosen as C1
//   ATOM MISMATCH — wrong atoms selected
//   LENGTH MISMATCH — wrong chain length

function fValidateMainChain() {
    if (!selectedMol || typeof nameExamples === 'undefined' || !nameExamples[selectedMol]) return

    // Map display mode to the correct stored-chain key suffix
    let suffix = ''
    if (typeof mode2D !== 'undefined') {
        if      (mode2D === 'expanded')    suffix = '_E'
        else if (mode2D === 'diagramatic') suffix = '_diagr'
    }

    const stored = nameExamples[selectedMol]['mainChain' + suffix]
    if (!stored || stored.length === 0) return  // no stored data for this mode — skip

    const calc = mainChainAtomsList

    // Check 1: chain length
    if (calc.length !== stored.length) {
        console.warn('[fCalcMainChain] LENGTH MISMATCH  "' + selectedMol + '"' +
            '  calc=[' + calc + ']  stored=[' + stored + ']')
        return
    }

    // Check 2: same atom set (direction-agnostic)
    const calcSet = {}, storedSet = {}
    for (let i = 0; i < calc.length;   i++) calcSet[calc[i]]     = true
    for (let i = 0; i < stored.length; i++) storedSet[stored[i]] = true
    let sameAtoms = true
    const sk = Object.keys(storedSet)
    for (let i = 0; i < sk.length; i++) { if (!calcSet[sk[i]])    { sameAtoms = false; break } }
    if (sameAtoms) {
        const ck = Object.keys(calcSet)
        for (let i = 0; i < ck.length; i++) { if (!storedSet[ck[i]]) { sameAtoms = false; break } }
    }
    if (!sameAtoms) {
        console.warn('[fCalcMainChain] ATOM MISMATCH  "' + selectedMol + '"' +
            '  calc=[' + calc + ']  stored=[' + stored + ']')
        return
    }

    // Check 3: exact direction match
    let sameDir = true
    for (let i = 0; i < calc.length; i++) { if (calc[i] !== stored[i]) { sameDir = false; break } }
    if (sameDir) {
        // console.log('[fCalcMainChain] \u2713  "' + selectedMol + '"  [' + calc + ']')
        return
    }

    // Check 3b: reversed direction matches stored
    const rev = calc.slice().reverse()
    let revMatch = true
    for (let i = 0; i < rev.length; i++) { if (rev[i] !== stored[i]) { revMatch = false; break } }
    if (revMatch) {
        // Only a true mismatch if the two orientations produce different locant sets.
        // e.g. but-2-ene: both ends give locant 2 → equivalent, not an error.
        function _locants(chain) {
            const locs = []
            const ancKeys = Object.keys(anchorCarbons)
            for (let ai = 0; ai < ancKeys.length; ai++) {
                const pos = chain.indexOf(parseInt(ancKeys[ai]) + 1) // chain is 1-based
                if (pos >= 0) locs.push(pos + 1)
            }
            for (let i = 0; i < chain.length - 1; i++) {
                const a = chain[i] - 1, b = chain[i + 1] - 1  // 1-based → 0-based for key
                const key = Math.min(a, b) + '_' + Math.max(a, b)
                if (ccDoubleBondKeys[key] || ccTripleBondKeys[key]) locs.push(i + 1)
            }
            locs.sort(function(a, b) { return a - b })
            return locs.join(',')
        }
        if (_locants(calc) === _locants(stored)) {
            // console.log('[fCalcMainChain] \u2713  "' + selectedMol + '"  [' + calc + ']  (equivalent direction)')
        } else {
            console.warn('[fCalcMainChain] DIRECTION MISMATCH  "' + selectedMol + '"' +
                '  calc=[' + calc + ']  (reversed would match)  stored=[' + stored + ']')
        }
    } else {
        console.warn('[fCalcMainChain] ORDER MISMATCH  "' + selectedMol + '"' +
            '  calc=[' + calc + ']  stored=[' + stored + ']')
    }
}

// ── fCalcMainChain3D ──────────────────────────────────────────────────────────
// 3D version of fCalcMainChain — operates on SDF-parsed *3D globals.
// Populates mainChainAtoms3D with 1-based SDF atom numbers, C1 → Cn.
// Called from fFetchAndParse3D() after fDetectMolType3D().
// Validation mode: result is logged to console; stored mainChain3D still drives display.

function fCalcMainChain3D() {

    const atomsCount3D = allAtomsTypeList3D.length

    // ── Step 1: Carbon-only adjacency list (0-based) ─────────────────────────────
    const carbAtoms3D = []
    for (let i = 0; i < atomsCount3D; i++) {
        if (allAtomsTypeList3D[i] === 'C') carbAtoms3D.push(i)
    }

    const cAdj3D = {}
    for (let ci = 0; ci < carbAtoms3D.length; ci++) {
        const c = carbAtoms3D[ci]
        cAdj3D[c] = []
        if (Array.isArray(atomConnectivityList3D[c])) {
            for (let ni = 0; ni < atomConnectivityList3D[c].length; ni++) {
                const nb = atomConnectivityList3D[c][ni]
                if (allAtomsTypeList3D[nb] === 'C') cAdj3D[c].push(nb)
            }
        }
    }

    // ── Step 2: Trivial case — single carbon ─────────────────────────────────────
    if (carbAtoms3D.length === 1) {
        mainChainAtoms3D = [carbAtoms3D[0] + 1]
        fValidateMainChain3D()
        return
    }

    // ── Step 3: Terminal carbons ──────────────────────────────────────────────────
    const terminals3D = carbAtoms3D.filter(function(c) { return cAdj3D[c].length <= 1 })

    // ── Step 4: DFS — enumerate all simple paths between terminal pairs ──────────
    function dfsAllPaths3D(start) {
        const result = []
        const stack = [[start, [start]]]
        while (stack.length > 0) {
            const top = stack.pop()
            const node = top[0], path = top[1]
            const unvisited = []
            const neighbours = cAdj3D[node]
            for (let k = 0; k < neighbours.length; k++) {
                if (path.indexOf(neighbours[k]) < 0) unvisited.push(neighbours[k])
            }
            if (unvisited.length === 0) {
                result.push(path)
            } else {
                for (let k = 0; k < unvisited.length; k++) {
                    stack.push([unvisited[k], path.concat([unvisited[k]])])
                }
            }
        }
        return result
    }

    const seen3D = {}
    const candidatePaths3D = []
    for (let ti = 0; ti < terminals3D.length; ti++) {
        const paths = dfsAllPaths3D(terminals3D[ti])
        for (let pi = 0; pi < paths.length; pi++) {
            const p = paths[pi]
            const last = p[p.length - 1]
            if (!terminals3D.includes(last)) continue
            const key = Math.min(p[0], last) + '_' + Math.max(p[0], last)
            if (!seen3D[key]) {
                seen3D[key] = true
                candidatePaths3D.push(p)
            }
        }
    }

    // ── Step 5: Anchor carbons from functionalGroupObj3D ─────────────────────────
    anchorCarbons3D = {}
    principalFgCarbons3D = {}
    const terminalFgCarbons3D = {}

    const fgKeys3D = Object.keys(functionalGroupObj3D)
    for (let fi = 0; fi < fgKeys3D.length; fi++) {
        const fg = fgKeys3D[fi]
        if (fg === 'hydrocarbon') continue
        const fgData = functionalGroupObj3D[fg]
        const heteroKeys = Object.keys(fgData)
        for (let hi = 0; hi < heteroKeys.length; hi++) {
            const heteroAtoms = fgData[heteroKeys[hi]]
            for (let ei = 0; ei < heteroAtoms.length; ei++) {
                const entry = heteroAtoms[ei]
                let anchorC = null
                if (Array.isArray(entry)) {
                    if (Array.isArray(atomConnectivityList3D[entry[0]])) {
                        anchorC = atomConnectivityList3D[entry[0]][0]
                    }
                } else {
                    if (Array.isArray(atomConnectivityList3D[entry])) {
                        anchorC = atomConnectivityList3D[entry][0]
                    }
                }
                if (anchorC !== null) {
                    anchorCarbons3D[anchorC] = true
                    if (fg === 'carboxylicAcid') {
                        terminalFgCarbons3D[anchorC] = 3
                    } else if (fg === 'cyanide') {
                        terminalFgCarbons3D[anchorC] = 2
                    } else if (fg === 'aldehyde') {
                        terminalFgCarbons3D[anchorC] = 1
                    } else if (fg === 'alcohol' || fg === 'ketone' || fg === 'amine') {
                        principalFgCarbons3D[anchorC] = true
                    }
                }
            }
        }
    }

    // ── Step 6: CC multi-bond lookup sets ────────────────────────────────────────
    ccDoubleBondKeys3D = {}
    ccTripleBondKeys3D = {}
    for (let bi = 0; bi < multiBondsObj3D.CCd.length; bi++) {
        const bIdx = multiBondsObj3D.CCd[bi]
        const a1 = bondList3D[bIdx - 1][0] - 1
        const a2 = bondList3D[bIdx - 1][1] - 1
        ccDoubleBondKeys3D[Math.min(a1, a2) + '_' + Math.max(a1, a2)] = true
    }
    for (let bi = 0; bi < multiBondsObj3D.CCt.length; bi++) {
        const bIdx = multiBondsObj3D.CCt[bi]
        const a1 = bondList3D[bIdx - 1][0] - 1
        const a2 = bondList3D[bIdx - 1][1] - 1
        ccTripleBondKeys3D[Math.min(a1, a2) + '_' + Math.max(a1, a2)] = true
    }

    function countDoubleBonds3D(path) {
        let n = 0
        for (let i = 0; i < path.length - 1; i++) {
            if (ccDoubleBondKeys3D[Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])]) n++
        }
        return n
    }
    function countMultiBonds3D(path) {
        let n = 0
        for (let i = 0; i < path.length - 1; i++) {
            const key = Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])
            if (ccDoubleBondKeys3D[key] || ccTripleBondKeys3D[key]) n++
        }
        return n
    }
    function countAnchorsInPath3D(path) {
        let n = 0
        for (let i = 0; i < path.length; i++) { if (anchorCarbons3D[path[i]]) n++ }
        return n
    }

    // ── Step 7: Score candidates ──────────────────────────────────────────────────
    let bestPath3D = null
    let bestLen3D = -1, bestAnchors3D = -1, bestMulti3D = -1, bestDouble3D = -1

    for (let ci = 0; ci < candidatePaths3D.length; ci++) {
        const p       = candidatePaths3D[ci]
        const pLen    = p.length
        const pAnch   = countAnchorsInPath3D(p)
        const pMulti  = countMultiBonds3D(p)
        const pDouble = countDoubleBonds3D(p)

        const isBetter = (
            pLen > bestLen3D ||
            (pLen === bestLen3D && pAnch   > bestAnchors3D) ||
            (pLen === bestLen3D && pAnch   === bestAnchors3D && pMulti  > bestMulti3D) ||
            (pLen === bestLen3D && pAnch   === bestAnchors3D && pMulti  === bestMulti3D && pDouble > bestDouble3D)
        )
        if (isBetter) {
            bestPath3D = p; bestLen3D = pLen; bestAnchors3D = pAnch; bestMulti3D = pMulti; bestDouble3D = pDouble
        }
    }

    if (!bestPath3D) {
        mainChainAtoms3D = carbAtoms3D.map(function(c) { return c + 1 })
        fValidateMainChain3D()
        return
    }

    // ── Step 8: Orient the path ───────────────────────────────────────────────────
    let oriented3D = bestPath3D.slice()

    let forcedC1_3D = -1
    let forcedC1Priority3D = -1
    const termFgKeys3D = Object.keys(terminalFgCarbons3D)
    for (let ti = 0; ti < termFgKeys3D.length; ti++) {
        const tc = parseInt(termFgKeys3D[ti])
        if (oriented3D.indexOf(tc) >= 0 && terminalFgCarbons3D[tc] > forcedC1Priority3D) {
            forcedC1_3D = tc
            forcedC1Priority3D = terminalFgCarbons3D[tc]
        }
    }

    if (forcedC1_3D >= 0) {
        if (oriented3D[oriented3D.length - 1] === forcedC1_3D) {
            oriented3D = oriented3D.slice().reverse()
        }
    } else {
        function getPrincipalFgLocantSet3D(path) {
            const locants = []
            const ancKeys = Object.keys(principalFgCarbons3D)
            for (let ai = 0; ai < ancKeys.length; ai++) {
                const pos = path.indexOf(parseInt(ancKeys[ai]))
                if (pos >= 0) locants.push(pos + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function getMultiBondLocantSet3D(path) {
            const locants = []
            for (let i = 0; i < path.length - 1; i++) {
                const key = Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])
                if (ccDoubleBondKeys3D[key] || ccTripleBondKeys3D[key]) locants.push(i + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function getDoubleBondLocantSet3D(path) {
            const locants = []
            for (let i = 0; i < path.length - 1; i++) {
                const key = Math.min(path[i], path[i+1]) + '_' + Math.max(path[i], path[i+1])
                if (ccDoubleBondKeys3D[key]) locants.push(i + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function getSubstituentLocantSet3D(path) {
            const locants = []
            const ancKeys = Object.keys(anchorCarbons3D)
            for (let ai = 0; ai < ancKeys.length; ai++) {
                const ac = parseInt(ancKeys[ai])
                if (principalFgCarbons3D[ac]) continue
                const pos = path.indexOf(ac)
                if (pos >= 0) locants.push(pos + 1)
            }
            locants.sort(function(a, b) { return a - b })
            return locants
        }
        function lexLess3D(a, b) {
            const maxLen = Math.max(a.length, b.length)
            for (let i = 0; i < maxLen; i++) {
                const la = (i < a.length) ? a[i] : Infinity
                const lb = (i < b.length) ? b[i] : Infinity
                if (la < lb) return true
                if (lb < la) return false
            }
            return false
        }

        const rev3D = oriented3D.slice().reverse()
        const fwdFg3D = getPrincipalFgLocantSet3D(oriented3D)
        const revFg3D = getPrincipalFgLocantSet3D(rev3D)
        let useForward3D = true
        if (lexLess3D(revFg3D, fwdFg3D)) {
            useForward3D = false
        } else if (!lexLess3D(fwdFg3D, revFg3D)) {
            const fwdMb3D = getMultiBondLocantSet3D(oriented3D)
            const revMb3D = getMultiBondLocantSet3D(rev3D)
            if (lexLess3D(revMb3D, fwdMb3D)) {
                useForward3D = false
            } else if (!lexLess3D(fwdMb3D, revMb3D)) {
                // Tier 2 tied → Tier 2b: double bonds get lower locants than triple bonds
                const fwdDb3D = getDoubleBondLocantSet3D(oriented3D)
                const revDb3D = getDoubleBondLocantSet3D(rev3D)
                if (lexLess3D(revDb3D, fwdDb3D)) {
                    useForward3D = false
                } else if (!lexLess3D(fwdDb3D, revDb3D)) {
                    // Tier 2b tied → Tier 3: substituent (halogen/nitro) locants
                    const fwdSub3D = getSubstituentLocantSet3D(oriented3D)
                    const revSub3D = getSubstituentLocantSet3D(rev3D)
                    if (lexLess3D(revSub3D, fwdSub3D)) useForward3D = false
                }
            }
        }
        if (!useForward3D) oriented3D = oriented3D.slice().reverse()
    }

    // ── Step 9: Write mainChainAtoms3D (1-based SDF atom numbers) ────────────────
    mainChainAtoms3D = oriented3D.map(function(c) { return c + 1 })

    // ── Step 10: Validate against stored data ────────────────────────────────────
    fValidateMainChain3D()
}

// ── fValidateMainChain3D ──────────────────────────────────────────────────────
// Compares computed mainChainAtoms3D against nameExamples[mol].mainChain3D.
// Logs to console only — no side-effects on any global.

function fValidateMainChain3D() {
    if (!selectedMol || typeof nameExamples === 'undefined' || !nameExamples[selectedMol]) return

    const stored3D = nameExamples[selectedMol].mainChain3D
    if (!stored3D || stored3D.length === 0) return

    const calc3D = mainChainAtoms3D

    if (calc3D.length !== stored3D.length) {
        console.warn('[fCalcMainChain3D] LENGTH MISMATCH  "' + selectedMol + '"' +
            '  calc=[' + calc3D + ']  stored=[' + stored3D + ']')
        return
    }

    const calcSet3D = {}, storedSet3D = {}
    for (let i = 0; i < calc3D.length;   i++) calcSet3D[calc3D[i]]     = true
    for (let i = 0; i < stored3D.length; i++) storedSet3D[stored3D[i]] = true
    let sameAtoms3D = true
    const sk3D = Object.keys(storedSet3D)
    for (let i = 0; i < sk3D.length; i++) { if (!calcSet3D[sk3D[i]])    { sameAtoms3D = false; break } }
    if (sameAtoms3D) {
        const ck3D = Object.keys(calcSet3D)
        for (let i = 0; i < ck3D.length; i++) { if (!storedSet3D[ck3D[i]]) { sameAtoms3D = false; break } }
    }
    if (!sameAtoms3D) {
        console.warn('[fCalcMainChain3D] ATOM MISMATCH  "' + selectedMol + '"' +
            '  calc=[' + calc3D + ']  stored=[' + stored3D + ']')
        return
    }

    let sameDir3D = true
    for (let i = 0; i < calc3D.length; i++) { if (calc3D[i] !== stored3D[i]) { sameDir3D = false; break } }
    if (sameDir3D) {
        // console.log('[fCalcMainChain3D] \u2713  "' + selectedMol + '"  [' + calc3D + ']')
        return
    }

    const rev3D = calc3D.slice().reverse()
    let revMatch3D = true
    for (let i = 0; i < rev3D.length; i++) { if (rev3D[i] !== stored3D[i]) { revMatch3D = false; break } }
    if (revMatch3D) {
        function _locants3D(chain) {
            const locs = []
            const ancKeys = Object.keys(anchorCarbons3D)
            for (let ai = 0; ai < ancKeys.length; ai++) {
                const pos = chain.indexOf(parseInt(ancKeys[ai]) + 1)  // chain is 1-based
                if (pos >= 0) locs.push(pos + 1)
            }
            for (let i = 0; i < chain.length - 1; i++) {
                const a = chain[i] - 1, b = chain[i + 1] - 1
                const key = Math.min(a, b) + '_' + Math.max(a, b)
                if (ccDoubleBondKeys3D[key] || ccTripleBondKeys3D[key]) locs.push(i + 1)
            }
            locs.sort(function(a, b) { return a - b })
            return locs.join(',')
        }
        if (_locants3D(calc3D) === _locants3D(stored3D)) {
            // console.log('[fCalcMainChain3D] \u2713  "' + selectedMol + '"  [' + calc3D + ']  (equivalent direction)')
        } else {
            console.warn('[fCalcMainChain3D] DIRECTION MISMATCH  "' + selectedMol + '"' +
                '  calc=[' + calc3D + ']  (reversed would match)  stored=[' + stored3D + ']')
        }
    } else {
        console.warn('[fCalcMainChain3D] ORDER MISMATCH  "' + selectedMol + '"' +
            '  calc=[' + calc3D + ']  stored=[' + stored3D + ']')
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
    // Compute and validate main chain (result overwritten below until integration is complete)
    fCalcMainChain()
    if (mainChainMode !== 'algorithmic') {
        const _dChain = nameExamples[selectedMol]['mainChain' + theSuffix]
        if (_dChain && _dChain.length) mainChainAtomsList = _dChain
        const _d3Chain = nameExamples[selectedMol].mainChain3D
        if (_d3Chain && _d3Chain.length) mainChainAtoms3D = _d3Chain
        // fall through to algorithmic result when suffix-specific data is absent
    }

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

    // Υδρογονάνθρακες, αλκυλαλογονίδια, νιτρο (-ιο): τόνος στο τελευταίο συνθετικό δεσμού (άν/έν/ίν)
    if (nameMainCompObj3[functionalGroupsList[0]].suffix === "ιο") {
        if (comp2b !== "") { // μεικτή περίπτωση (διπλοί + τριπλοί): τόνος μόνο στο τελευταίο (comp2b)
            comp2b = "ίν"
        } else { // μόνο ένας τύπος δεσμού: τόνος στο τελικό συλλαβικό
            comp2 = comp2.replace(/αν$/, "άν").replace(/εν$/, "έν").replace(/ιν$/, "ίν")
        }
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
        // console.log("multiple functional groups ", functionalGroupsList)
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

    // console.log(comp0, comp0Text, comp0b, comp0bText, comp1No, comp1, comp2, comp3, comp2b, comp4)

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

