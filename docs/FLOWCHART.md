# Flowchart: mulermoc-nom-core-44.js (origin: core-37)
> **HISTORICAL 2026-10-07:** engine diagram predates ethers/esters/branched chains and the viewer/teaching/scenario layers. Covers core analysis flow only; viewer/teaching/scenario flows are not diagrammed. Source of truth for layers: `docs/LAYERS-PLAN.md`. Duplicate High-Level Flow block removed; version/count claims before v44 superseded.

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│            MOLECULAR NOMENCLATURE ANALYSIS ENGINE            │
│          (Pure JavaScript, no DOM/jQuery dependency)         │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    fInitNamingProps()
                    • Greek hydrocarbon names (μεθ, αιθ, etc)
                    • Functional group suffixes & prefixes
                    • Multiplicity prefixes (δι, τρι, etc)
                              ↓
          ┌─────────────────────────────────────┐
          │    USER DRAWS MOLECULE IN JSME      │
          │         (2D Structure)               │
          └─────────────────────────────────────┘
                              ↓
                  fAnalyseStructure()
    ┌─────────────────────────────────────────────┐
    │ • Get atoms from JSME applet                │
    │ • Calculate connectivity & valence          │
    │ • Calculate C-H count                       │
    │ • Analyze bonds (single/double/triple)      │
    │ • Categorize C-C multi-bonds (CCd, CCt)    │
    └─────────────────────────────────────────────┘
                              ↓
                   fDetectMolType()
        ┌──────────────────────────────────────┐
        │ Identify functional groups:          │
        │ • Hydrocarbon (only C)               │
        │ • Halogens (Cl, Br, F, I)           │
        │ • Alcohols (terminal O, val=1)      │
        │ • Aldehydes (terminal O, val=2, C3) │
        │ • Ketones (terminal O, val=2, C≠3)  │
        │ • Carboxylic acids (COOH detection) │
        │ • Cyanides (C≡N)                     │
        │ • Amines (terminal N)                │
        │ • Nitro groups (N bonded to C)      │
        │ • Ethers (internal O)                │
        └──────────────────────────────────────┘
                              ↓
                    fCalcMainChain()
    ┌─────────────────────────────────────────────────────┐
    │ STEP 1: Build C-only adjacency graph                │
    │ STEP 2: Handle trivial case (single C)             │
    │ STEP 3: Find terminal carbons (degree ≤ 1)         │
    │ STEP 4: DFS enumerate all terminal-to-terminal     │
    │         simple paths                               │
    │ STEP 5: Identify anchor carbons (FG-bearing C)     │
    │         + principal FG carbons (alcohol/ketone/amine)
    │         + forced-C1 carbons (aldehyde/acid/cyanide)│
    │ STEP 6: Pre-compute CC multi-bond lookup sets      │
    │ ┌───────────────────────────────────────────┐      │
    │ │ STEP 7: SCORE all candidate paths         │      │
    │ │ Priority: length → anchors → multi-bonds  │      │
    │ │         → double bonds                    │      │
    │ └───────────────────────────────────────────┘      │
    │ ┌───────────────────────────────────────────┐      │
    │ │ STEP 8: Orient path (C1 determination)    │      │
    │ │ Rule A: Forced-C1 (aldehyde/acid/cyanide)│      │
    │ │ Rule B: Lowest-locant (all others)       │      │
    │ │   Tier 1: Principal FG locants            │      │
    │ │   Tier 2: Multi-bond locants              │      │
    │ │   Tier 2b: Double vs triple bond priority│      │
    │ │   Tier 3: Substituent locants             │      │
    │ └───────────────────────────────────────────┘      │
    │ STEP 9: Convert to 1-based JSME atom numbers      │
    │ STEP 10: Validate against stored examples         │
    └─────────────────────────────────────────────────────┘
                              ↓
                  fValidateMainChain()
    ┌──────────────────────────────────────────┐
    │ Compare computed vs stored main chain:   │
    │ ✓ Exact match (no warning)              │
    │ ✗ Length mismatch                       │
    │ ✗ Atom mismatch                         │
    │ ✗ Direction mismatch                    │
    └──────────────────────────────────────────┘
                              ↓
    ┌─────────────────────────────────────────────────────┐
    │ IF 3D Structure Available (SDF file):               │
    │ • fParseSDF3D()  - Parse MDL V2000 format          │
    │ • fDetectMolType3D() - Detect FG in 3D            │
    │ • fCalcMainChain3D() - Calculate main chain (3D)  │
    │ • fValidateMainChain3D() - Validate 3D result     │
    └─────────────────────────────────────────────────────┘
                              ↓
                     fGuessName()
    ┌─────────────────────────────────────────────────────┐
    │ Component Assembly (Greek nomenclature):            │
    │                                                      │
    │ comp0: Locants of multi-bonds (CC double/triple)   │
    │ comp0Text: Multi-bond prefixes (δι-εν, τρι-ιν)    │
    │ comp1: Main chain base (μεθ, αιθ, προπ...)        │
    │ comp2: Unsaturation suffix (αν, εν, ιν)           │
    │ comp3: Secondary bond locants                      │
    │ comp4: Functional group suffix & prefix count     │
    │                                                      │
    │ + Handle multiple functional groups with priority: │
    │   carboxylicAcid > cyanide > aldehyde > ketone    │
    │                  > alcohol > amine > nitro        │
    │                                                      │
    │ + Greek euphony rules:                             │
    │   consonant + consonant → insert 'ο' connector     │
    │   exception: π/τ + δ → insert 'α' instead         │
    └─────────────────────────────────────────────────────┘
                              ↓
    ┌──────────────────────────────────────────┐
    │  currentMolName = Assembled Greek name   │
    └──────────────────────────────────────────┘
                              ↓
    ┌─────────────────────────────────────────┐
    │  OUTPUT OPTIONS:                        │
    │  • Display name in UI                   │
    │  • fSpeakGreek() - Speak full name     │
    │  • fSpeakNameWithPauses() - Speak with │
    │    pauses between components            │
    └─────────────────────────────────────────┘
```

## Function Dependencies

```
fInitNamingProps()
    ↓
fAnalyseStructure()
    ↓
fDetectMolType()
    ├→ fCalcMainChain()
    │   ├→ fValidateMainChain()
    │   └→ Shared state: mainChainAtomsList
    │
    └→ [PARALLEL 3D PATH if SDF available]
        ├→ fParseSDF3D()
        ├→ fDetectMolType3D()
        ├→ fCalcMainChain3D()
        └→ fValidateMainChain3D()
             
        └→ Shared state: mainChainAtoms3D
             
fGuessName()
    └→ Consumes: mainChainAtomsList, 
       functionalGroupObj, multiBondsObj
    └→ Produces: currentMolName, 
       nameComponentsList

[Output] → fSpeakGreek() OR fSpeakNameWithPauses()
```

## Key Data Structures

```
GLOBAL STATE (Analysis Results):
  atomsCount, bondsCount
  allAtomsTypeList, atomTypes, atomTypeObj
  atomConnectivityList, atomValenceList
  bondList, multiBondListCC, svgBondList
  multiBondsObj { CCd, CCt, COd, CNt }
  carbonHydrogens[]
  mainChainAtomsList (1-based JSME atom numbers)
  functionalGroupObj (FG→heteroatom→indices)
  anchorCarbons, principalFgCarbons
  ccDoubleBondKeys, ccTripleBondKeys

GLOBAL STATE (3D):
  *3D variants of above (allAtomsTypeList3D, etc)
  mainChainAtoms3D (1-based SDF atom numbers)

GLOBAL STATE (Naming):
  currentMolName (final Greek name)
  nameComponentsList (assembly components)
  nameMainCompList1 (hydrocarbon bases)
  nameMainCompObj3 (FG suffixes/prefixes)
  nameMultiPrefix (multiplicity prefixes)
  functionalGroupsOrder (priority order)
  molTaxonomy (Greek category name)
  molType (derived category)
```

## Main Chain Selection Algorithm (fCalcMainChain - IUPAC Rules)

```
INPUTS:
  - Molecular structure (atoms, bonds, connectivity)
  - Detected functional groups

ALGORITHM:
  1. Extract carbons only → compute C-only adjacency
  2. Find all terminal carbons (branch tips)
  3. DFS: enumerate all terminal-to-terminal paths
  4. Deduplicate by {start, end} canonical pairs
  5. Identify anchor carbons (bonded to heteroatoms)
  6. Build CC multi-bond lookup (O(1) checking)
  7. Score each path:
     Criterion 1: Longest length
     Criterion 2: Most anchor carbons
     Criterion 3: Most CC multi-bonds
     Criterion 4: Most CC double bonds
  8. Orient best path (choose C1 end):
     Rule A: Forced-C1 (aldehyde, cyanide, carboxylic acid)
     Rule B: Lowest-locant rule (3-tier IUPAC priority)
  9. Convert 0-based indices → 1-based atom numbers
  10. Validate against nameExamples database

OUTPUT: mainChainAtomsList (1-based JSME atom IDs in order C1 → Cn)
```

## Name Construction Examples

```
Ethanol:
  comp0: ""               (no multi-bonds)
  comp1: "αιθ"            (2 carbons)
  comp2: "αν"             (saturated)
  comp4: "όλη"            (alcohol suffix)
  → "αιθανόλη"

But-2-en-1-ol:
  comp0: "2-"             (double bond at position 2)
  comp1: "βουτ"           (4 carbons)
  comp2: "εν"             (unsaturated)
  comp3: "-1-"            (alcohol at position 1)
  comp4: "όλη"            (alcohol suffix)
  → "βουτ-2-ενόλη"

3-Bromo-propanal:
  comp0: ""               (3 carbons < min for numbering)
  comp0Text: "βρωμο"      (halogen prefix)
  comp1: "προπ"           (3 carbons)
  comp2: "αν"             (saturated)
  comp4: "άλη"            (aldehyde suffix)
  → "βρωμοπροπανάλη"
```

## Special Cases Handled

```
CARBOXYLIC ACID Detection:
  ✓ Both alcohol O (val=1) and ketone O (val=2)
  ✓ Both bonded to same C
  ✓ Removes duplicates, re-classifies as COOH

ALDEHYDE Detection:
  ✓ Terminal O with double bond
  ✓ Connected C has valence 3 (only one other bond)

KETONE Detection:
  ✓ Terminal O with double bond
  ✓ Connected C has valence > 3 (more than one other bond)

MULTIPLE FUNCTIONAL GROUPS:
  ✓ Priority: carboxylicAcid > cyanide > aldehyde
                > ketone > alcohol > amine > nitro
  ✓ Only highest-priority gets suffix; others get prefix
  ✓ Locant numbering follows IUPAC 3-tier hierarchy

METHANE/FORMIC ACID (Single Carbon):
  ✓ Trivial case: mainChainAtomsList = [1 atom]
```

## Error Validation Points

```
fValidateMainChain() checks:
  ✓ Main chain length matches stored data
  ✓ Atom set matches (direction-independent)
  ✓ Direction matches stored (or reversed)
  ✓ Locant equivalence (both directions OK)
  
  Outputs to console:
  ✗ LENGTH MISMATCH
  ✗ ATOM MISMATCH
  ✗ DIRECTION MISMATCH
  ✗ ORDER MISMATCH
```

