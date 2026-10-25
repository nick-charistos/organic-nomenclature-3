# Importing the MSc student's `thesis-work` upgrades

Repeatable procedure for folding the student's branch
(`https://github.com/yanisken9/organic-nomenclature-3`, branch `thesis-work`)
into this repo. First run: v48 → **v49** (2026-10-21).

## v51 additive molecule import (2026-10-25)

The second import was **additive**, not another version fork:

- Appended 18 molecules (9 alcohols, 6 dienes, 3 enynes) to
  `js/jsme-nick-nomeclature-moc2-data_51.js` (80 → 98 keys), each with three
  embedded 2D MOL forms, a `reg()` MOL2D registration, and a runtime
  `mols/nomeclature-moc2/<key>_3D.sdf`. Existing entries were left intact.
- Ported only the bounded acyclic-alcohol/branch core and the required
  molview explanation/highlight support; kept the local palette and
  `fFitNameComponents`. Did **not** import lessons, theory/library UI,
  Namelecule theme, `fFit2DSVG`, diene parallel drawing, 3D camera zoom, or the
  label-plate change.
- Normalized double-bond stereo to `0` in all new 2D forms and in the local 3D
  SDFs that still carried stereo `3`. `index.html` stayed on v50.
- Generalizing branch prefixes to other homologous series (ketones, aldehydes,
  acids, amines, halides, mixed FGs) is deliberately deferred; the current
  `fSupportsAlkylBranchPrefixes()` gate remains hydrocarbon/acyclic-alcohol
  only.

## Roles / policy

- **Import** (student's own work): new molecules + `.sdf`/`.mol` sources, core
  engine fixes/upgrades, new scenarios.
- **Keep local** (our v48 line is better/approved): the name auto-fit
  (`fFitNameComponents` / `--nameCompScale`, 0.7 floor + horizontal-scroll
  fallback) and the structural branch highlight/explain. Do **not** pull in
  their `fFitNameToWidth` / `--nl-name-scale` or text-parsing branch code.
- **Do not import**: the Namelecule product layer — `css/namelecule-*.css`,
  `design/*`, `assets/*`, `AGENTS.md`, welcome/library, theory library,
  8-alkyl table, loading/error screen, `showStepNumbers` / `reserveTitleSpace`,
  mint/teal theme, `index.html` → welcome redirect.
- Naming convention: we keep the **explicit terminal locant** (e.g.
  `3-μεθυλο-1-βουτένιο`), matching the student and IUPAC over the v48 omission.

## 1. Compare

Common sync base is recorded in the student's `docs/UPSTREAM-COMPARISON-*.md`
(v49: `f1ac038`; local tip at import: `1ac7636`).

```
# changed files + patches between the last common base and the branch tip
GET https://api.github.com/repos/yanisken9/organic-nomenclature-3/compare/<base>...thesis-work

# per-file history (identifies the real code commits)
GET https://api.github.com/repos/yanisken9/organic-nomenclature-3/commits?sha=thesis-work&path=<file>
```

GitHub omits inline patches for very large files; the student's
`docs/patches/*.patch` (core) and `docs/CORE-CHANGES-*.md` are the fallback.
File listing/sizes:

```
GET https://api.github.com/repos/yanisken9/organic-nomenclature-3/contents/<dir>?ref=thesis-work
```

## 2. Fork the version set

Copy byte-identically, then change only the asset refs in the html:

```powershell
Copy-Item mulermoc-nom-48.html              mulermoc-nom-49.html
Copy-Item js/jsme-nick-nomeclature-moc2-data_48.js js/jsme-nick-nomeclature-moc2-data_49.js
Copy-Item js/mulermoc-nom-core-48.js        js/mulermoc-nom-core-49.js
Copy-Item js/mulermoc-nom-molview-48.js     js/mulermoc-nom-molview-49.js
Copy-Item js/mulermoc-nom-teaching-48.js    js/mulermoc-nom-teaching-49.js
Copy-Item js/mulermoc-nom-scenario-48.js    js/mulermoc-nom-scenario-49.js
Copy-Item css/jsme-nick-48.css              css/jsme-nick-49.css
Copy-Item css/mulermoc-nom-scenario-48.css  css/mulermoc-nom-scenario-49.css
```

`js/ui-icons.js` is shared — do not copy. Edit `mulermoc-nom-49.html`: the 2
`<link>` and 5 `<script>` refs to `-49`. Leave `index.html` → previous version
(off-live) until the owner flips it after verification. For v49 the owner flipped
it live with browser click-through still pending; record that status in
`README.md` and `docs/CHANGELOG.md`.

## 3. Core

Port from the student's core patch (`docs/patches/core-session-*.patch`), not
by applying it verbatim (their line numbers assume their comp1No rework):

- Add helpers before `fOrientChainPath`: `fIsAcyclicHydrocarbonGraph`,
  `fCarbonBranchLocants`, `fCompareLocantSets`.
- `getSubstituentLocantSet` (2D) and `getSubstituentLocantSet3D`: for acyclic
  C/H graphs, append `fCarbonBranchLocants(...)` before the sort.
- `fRankChainPool(paths, req, scoreFn, orientFn, connList, typeList)`: after the
  `scored = top` tier, when `bestMu === 0 && fIsAcyclicHydrocarbonGraph(...)`,
  keep max branch count then lowest oriented branch locant set.
- Update both `fRankChainPool` call sites to pass the 2D/3D connectivity/type
  arrays.
- `fGuessName` branched-hydrocarbon block: keep the bond locant in `comp1No`
  whenever a multiple bond exists (incl. position 1); mixed en-yne → double in
  `comp1No`, triple in `comp3`.

## 4. Data

The student's `data_48.js` snapshot equals our data + the intended deltas
(verify with `git diff --no-index`). Base the new data file on it, then confirm:

```powershell
node --check js/jsme-nick-nomeclature-moc2-data_49.js
# key count and reg() count must match (v49: 73)
```

Watch for the "duplicate key from a naive merge" trap the student warns about —
keep exactly one entry per molecule.

Download new molecule assets from raw:

```powershell
$b = "https://raw.githubusercontent.com/yanisken9/organic-nomenclature-3/thesis-work"
Invoke-WebRequest "$b/mols/nomeclature-moc2/<key>_3D.sdf" -OutFile "mols/nomeclature-moc2/<key>_3D.sdf" -UseBasicParsing
# + mols/new_molecules/<key>_2D_{Condensed,Expanded,Skeletal}.mol and _3D.sdf
```

## 5. Scenarios

The branch keeps many drafts (numbered prefixes, English names). Import the
**canonical** lesson(s) only, under the plain title filename; skip numbered
drafts, English duplicates and superseded files (e.g. `ethene.scenario.json`).
Validate that every `selectedMol` exists in the data key set.

## 6. Docs

Add a new `[vNN]` section to `docs/CHANGELOG.md` (use `[Unreleased]` only
before release), update
`README.md` (baseline/entry/table/counts), and append a `docs/SESSION-NOTES.md`
entry. Bump the CSS/JS header path comments from `-NN` to `-NN+1`.

## 7. Verify

```powershell
node --check js/mulermoc-nom-core-49.js  # + molview/teaching/scenario/data/ui-icons
# CSS brace balance; git diff --check; scenario selectedMol ⊆ data keys
```

Owner browser click-through: new molecule (all 2D modes + 3D SDF + both chain
modes + highlights), existing-alkane stepper pools, the `3-μεθυλο-1-βουτένιο`
locant change, imported scenarios (Play/Present/Exit), long-name auto-fit.
