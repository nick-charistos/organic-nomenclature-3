# Quiz & Interactive Scenarios — Planning Document
## Project: MuLERMoCs-Anastasia | Organic Nomenclature v37+
## Created: 2026-05-02 | Status: HISTORICAL — superseded (see banner below)

> **HISTORICAL 2026-10-07:** this plan predates the v44 baseline (64 molecules, LEARN-first layers, scenario scaffold in `js/mulermoc-nom-scenario-44.js`; v43 frozen at tag `v43`). Status claims (`PLANNING — no implementation yet`, v37+/59 mols, `mulermoc-nom-38.html`/`quiz-nom-1.html`) are superseded. Source of truth: `README.md` + `docs/LAYERS-PLAN.md` + `docs/didactic-scenario-plan.md`. Kept for theory/history only.

---

## Research Dimension
The quiz system is also a **research tool**. Full research design, theoretical framework (CTML + DeFT), RQs, study distribution, and methodology are in **[RESEARCH-PLAN.md](RESEARCH-PLAN.md)**.

Summary: comparing which molecular representation (2D-condensed / 2D-expanded / 2D-annotated-skeletal / 2D-skeletal / 3D) leads to better identification accuracy and faster learning. Every student interaction must be logged with the active representation.

---

## Phase 1 — Exploration Mode (upgrade: v38)
**File: mulermoc-nom-37.html → mulermoc-nom-38.html + molview-38.js**

Add an "Εξερεύνηση" (Exploration) toggle alongside existing Study mode.

### Core New Mechanism: Atom Click Targets
- After every `fUpdateSVG()`, run `fAddAtomClickTargets()`
- Use existing `molSnap` (Snap.svg) to overlay transparent hit circles on each atom
- Circle center = atom `<text>` element bounding box center, radius generous (+10px)
- Each circle gets `data-atom` = 1-based JSME atom index
- Circles only active when `quizSelectionActive === true`

### 3D Click (JSmol)
```
set picking atom; set pickCallback 'window.fOnAtomClick3D';
```
- Callback receives string like `"atomno=3 C #3"`, parse with `/atomno=(\d+)/`
- JSmol 1-based atom numbers match SDF file atom order → match `allAtomsTypeList3D`

### Ground Truth Mapping (answer checking)
| nameAnalysisMode | Student selects | Ground truth |
|---|---|---|
| compCarbonsCount | All main chain C atoms | `mainChainAtomsList` (1-based) |
| compBondType / compBondPos | C=C or C≡C atoms | `multiBondsObj.CCd`/`CCt` → `bondList[bIdx-1][0,1]` |
| compSuffix / compNumber1 | Functional group atoms | `functionalGroupObj[type][element]` (0-based → +1) |
| compEndNumber | FG atom or triple bond end | context from `nameComponentsList[8]` |

**Index convention note:** `mainChainAtomsList` = 1-based; `functionalGroupObj` arrays = 0-based (need +1 for JSME calls).

### Interaction flow (Explore mode)
1. Name component box pulses/glows as question prompt
2. Student clicks atoms on 2D or 3D viewer
3. Clicked atoms highlight in a "selection" color (distinct from existing highlight colors)
4. [Έλεγχος] button → compare selection to ground truth → green/red feedback
5. [Επόμενο συνθετικό] → advance to next component
6. All 3 components done → summary + [Επόμενο μόριο]

---

## Phase 2 — Separate Quiz SPA
**New file: quiz-nom-1.html**
**New JS: js/mulermoc-nom-quiz-1.js**
**New JS: js/mulermoc-nom-log-1.js**
**New CSS: css/jsme-nick-quiz-1.css**

### Reused unchanged
- js/jsme-nick-nomeclature-moc2-data_37.js  (all 59 molecules + structures — extended with SMILES field)
- js/mulermoc-nom-core-37.js               (analysis engine — no changes)
- js/mulermoc-nom-molview-37.js            (viewers — minor additions only)

### Layout
```
[Rule filter: 0|1|2|3|4|5|6|7|8]  [Scenario: A|B|C|D|E]
[Rep: 2D▾]  [Τυχαία / Επόμενο]    Score: 7/10  ⏱ 2:34
─────────────────────────────────────────────────────────
 2D viewer  │  Prompt banner (question)
 (clickable)│  Name display (boxes / blanks / tiles)
            │  ─────────────────────────────────────
────────────│  Feedback panel (correct/partial/wrong)
 3D viewer  │
 (clickable)│  [Έλεγχος]  [Επόμενο]  [Δείξε Απάντηση]
```
Both viewers visible simultaneously → log records which was last used before Check.

---

## Five Scenarios

### Scenario A — Component Identification (Structure → Click)
*"Ποια άτομα αντιστοιχούν στο «βουτ»;"*
- Show molecule + assembled name, one box highlighted as question
- Student clicks atoms sequentially: chain → bond → FG (3-step task)
- After each step: feedback + next prompt
- Direct reverse of study tool's flow

### Scenario B — Name Assembly (Structure → Build)
*"Συναρμολόγησε το όνομα."*
- Show molecule; present shuffled tile set (correct components + distractors)
- Distractors from neighboring molecules in the same rule group
- Student clicks tiles in order: [1ο] + [2ο] + [3ο]
- Check against `nameComponentsList`

### Scenario C — Multiple Choice
*"Ποιο είναι το σωστό όνομα;"*
- Show molecule; 4 name options
- Distractors generated algorithmically:
  - Wrong 1st component: adjacent carbon count from `nameMainCompList1`
  - Wrong 2nd component: αν↔εν↔ιν swap
  - Wrong locant: correct components, wrong position number
- Feedback: wrong options fade showing why; correct highlights green

### Scenario D — Name → Structure (Reverse Direction)
*"Βρες στα άτομα..."*
- Show IUPAC name with one component highlighted; molecule dimmed
- Student clicks atoms to match each component
- Trains the exam skill that the study tool doesn't address

### Scenario E — Timed Challenge
- Rapid-fire multiple-choice with countdown (5-minute Pomodoro-style session)
- Live score display
- Rule group filter (e.g. "only rule 3+4 molecules")

---

## Session Logging (Research Layer)
**File: js/mulermoc-nom-log-1.js**

Log schema per attempt:
```
ts            : Date.now()
mol           : "mol_012"
scenario      : 'A'|'B'|'C'|'D'|'E'
representation: '2D-condensed'|'2D-expanded'|'2D-annotated-skeletal'|'2D-skeletal'|'3D'
component     : 'chain'|'bond'|'fg'|'full-name'
correct       : boolean
attempts      : int (how many clicks before correct)
ms            : time to answer in milliseconds
```
- Persist to `localStorage` on every entry
- [Εξαγωγή CSV] button for researcher download
- Research question: which representation → better accuracy + fewer attempts?

---

## Implementation Order
1. `fAddAtomClickTargets()` + `fOnAtomClick2D/3D()` → add to molview as v38
2. Scenario C (Multiple Choice) — simplest state machine, validates data pipeline
3. Scenario A (Click to Identify) — uses click targets; most educationally distinctive
4. `fLogAttempt()` + CSV export — add once A and C work
5. Scenario B (Name Assembly) — needs drag/drop or click-to-build UI
6. Scenario D (Reverse) — variant of A with representation inverted
7. Scenario E (Timed) — wrapper around C/A with timer

---

## Technical Constraints / Notes
- JSME SVG is redrawn on every `fUpdateSVG()` call → click targets must be re-added each time
- JSME `readMolFile()` redraws internally; no direct atom coordinate API → derive positions from `<text>` element bboxes in the SVG output
- JSmol pick callback: use `window.fOnAtomClick3D` as a global; JSmol calls it as a string callback
- Stale-mol guard pattern (from `fFetchAndParse3D`) must be applied to any async quiz flow
- Bond click targets: hit rectangle between two atom positions, derived from `bondList[i-1][0,1]` → look up atom SVG positions
- `functionalGroupObj` uses 0-based atom indices; `bondList` atoms are 1-based; `mainChainAtomsList` is 1-based. All must be normalized to one convention before comparison.

---

## Representation Fading — Pedagogical Framework

The five 2D modes form a **fading sequence** aligned with DeFT's constraining function:

```
Condensed → Expanded → Annotated Skeletal → Pure Skeletal → 3D
CH₃CH₂OH    (explicit H)  (C+H on bond          (C implicit,    (spatial
(textbook)               angle geometry)         H implicit)      geometry)
```

Each step removes one scaffolding layer. The familiar representation constrains interpretation of the next. This sequence is the direct basis for RQ2 in RESEARCH-PLAN.md.

### Annotated Skeletal — Technical Approach

The `[C]` bracket trick already used in all 59 condensed MOL files applies directly:
- Pure skeletal MOL (zig-zag geometry from JSME auto-layout) has atoms as plain `C`
- A single regex on the atom block replaces ` C  ` → `[C] ` (V2000 atom symbol column)
- JSME renders `[C]` as a visible `<text>C</text>` at each vertex
- Existing `fAddHydrogens2SVG()` then injects CH₃/CH₂/CH labels as normal
- Heteroatoms (O, N, Cl…) are unaffected — they already render as text in JSME

```javascript
// New utility function (molview-38.js)
function fMakeAnnotatedSkeletal(molStr) {
    // Replace atom-block ' C  ' with '[C] ', preserving coordinates and heteroatoms
    return molStr.replace(
        /^( {0,10}-?\d+\.\d+ {0,10}-?\d+\.\d+ {0,10}-?\d+\.\d+) C  /mg,
        '$1 [C] '
    )
}
```

**Edge case:** Branch-point C atoms with 0 implicit H render as bare `C` — the existing `case 0: myLabel = 'C'` path in `fAddHydrogens2SVG()` handles this, but the white background rect injection must be verified for bond-line masking on branched molecules.

---

## Molecule Database Architecture

### Existing 59 Molecules (study app)
- Keep all hand-crafted MOL strings unchanged — they use textbook-specific horizontal layouts
- Pedagogically intentional; do not replace with auto-generated geometry
- Add `smiles` field to each entry in `data_37.js` as canonical identifier (no runtime use)

### New Molecules (quiz expansion / transfer test set)
Authoring pipeline — adding one molecule costs: **1 SMILES string + 1 offline 3D SDF**

```
1. SMILES string
       ↓
2. jsmeApplet.readSmiles(smi)          → auto-layout geometry in JSME
       ↓
3. jsmeApplet.molFile()                → pure skeletal MOL  →  store as _diagr2D
       ↓
4. fMakeAnnotatedSkeletal(molStr)      → [C] substitution   →  store as _diagr2D_C  (new field)
       ↓  (fAddHydrogens2SVG runs at display time — not stored)
5. 3D SDF: pre-generated offline via RDKit Python script → saved to mols/ folder
6. Condensed MOL: JSME horizontal layout acceptable for quiz-only molecules
   (not textbook-style, but fine for Scenarios C/D/E)
```

### New Data Fields
```javascript
mol_XXX: {
    smiles:       'CC(=O)CCC',   // canonical identifier (all molecules)
    structure2D:  '...',          // condensed MOL   — existing 59: hand-crafted
    structure2D_E:'...',          // expanded MOL    — existing 59: hand-crafted
    structure2D_D:'...',          // pure skeletal   — existing 59: hand-crafted (some)
    structure2D_C:'...',          // annotated skeletal — NEW: derived from _D via fMakeAnnotatedSkeletal
    file3D:       'mols/...sdf',  // path to pre-generated SDF
}
```

### Python Authoring Tool (tools/gen_3d.py)
- Input: SMILES string + molecule key
- Output: 3D SDF file saved to `mols/nomeclature-moc2/`
- Uses RDKit: `AllChem.EmbedMolecule()` + `AllChem.MMFFOptimizeMolecule()`
- Run offline during content creation; never a runtime dependency
- Automatable for bulk addition of quiz-expansion molecules

### Research Note on Layout Consistency
Existing 59 molecules (hand-crafted textbook layouts) will look visually different from
new quiz molecules (JSME auto-layout). For research studies, record `layoutStyle: 'textbook'|'auto'`
in the log. Do not mix layout styles within the same experimental condition.

---

## Open Design Questions (to discuss before implementation)
1. Should the 2D and 3D viewers appear simultaneously in the quiz, or can the student choose one?
2. For Scenario B tile drag/drop: CSS drag-and-drop or click-to-place (simpler, more mobile-friendly)?
3. Progress tracking: per-session only (localStorage) or server-side for classroom use?
4. Should difficulty levels be explicit to the student, or only recorded in the log?
5. Onboarding: animated tooltip for first-time users showing "click the atoms"?
6. For the research design: should representation be fixed per session or randomized per question?

