# Stage 2 + authoring/exercises roadmap (v54+, 2026-11-03)

> **Status 2026-11-04: v54 LIVE (`index.html` → v54). Stage 1 + draft flow built (Steps 0–4 + fixes).**
> Dedicated edit applet, Edit/New entries, draft session + guards, Submit
> (engine + PubChem preview incl. predicted EN + verdicts, depict SVG view, Draw back-flip, freshness
> state machine), Accept (fork/update-in-place by molecule identity, readable keys, dup + 3D
> gates, manual per-molecule save), 3-slot 2D generation (linearized school-condensed, H-expanded,
> JSME zigzag skeletal ladder), formula generator, menu fixes, chain-stepper atom map, toast hardening. Open:
> RDKit local 3D (gates Accept), beautify button (spec'd), 2B author correction,
> exercise types (Q4 first).

## Where we are (Stage 1, done; v54 live)
- v54 forked from v53; `index.html` → v54 since 2026-11-04.
- Single JSME applet (`depict,marker,depictaction,toggle`); ORGNL retired (commented, restorable).
- `Επεξεργασία/Σχεδίαση 2D (JSME)` checkbox shows live applet / hides SVG + radios (delegated-handler order fixed).
- Applet re-fits via `fResizeViewers()` on show; height probe counts applet as 2D viewer (`viewerMaxHeight`/`viewerBothHeight` apply).

## Stage 2A — submit drawing to the engine
1. **Read the drawing**: `getMolFile()` / `getSmiles()` from `jsmeNomeclatureApplet` (already the analyzed applet).
2. **Run the pipeline**: same path as `fClassifyAllMolecules` — `readMolFile` → `fAnalyseStructure` → `fDetectMolType` → `fGuessName` → `fUpdateSVG` → `fShowNameAnalysis`. Validate input first (empty drawing → toast, no state corruption; never overwrite `selectedMol` until explicit accept).
3. **Three 2D modes**: condensed = CHn symbols, expanded = C symbols, skeletal = none. Check how `mode2D`/`modeSuffix` (`_2D_Skeletal`) derives variants today (stored `structure2D_*` per molecule). For a new drawing, derive all three variants from the single molfile at submit time so mode switching works immediately.
4. **3D**: PubChem SDF 3D first (`fFetchSDF3D_PubChem`, exists), CIR fallback (`iupac-54.js`). Novel drawings have no record → need local generation: evaluate `RDKit/` dir in repo for RDKit.js WASM (ETKDG 3D + canonical SMILES + duplicate check). This is the only offline-safe path for truly new molecules.
5. **Name validation**: engine guess → PubChem oracle (`fMatchEngineEN` shared comparator) → author sign-off. No auto-merge: validated-by-oracle ≠ accepted.

## Stage 2B — author correction (bidirectional fragments)
- Today: name-component click → atom highlight (one direction).
- Add reverse: click atoms/bonds (2D applet + 3D) → selects name component(s); author edits component text / locants; display name recomputes from overridden slots; overrides stored per draft (not in engine tables).
- Same infra later powers exercises/questions (fragment assembly, name↔structure matching) — design the selection events reusable, not author-panel-specific.

## Persistence + review workflow (student tasks)
- Format: **JSON payload inside a `.js` file** (e.g. `js/jsme-nick-nomeclature-moc2-data_custom.js` defining `nameExamplesCustom`, merged at boot). Plain `.json` + `fetch` breaks on `file://`; script-tag `.js` works everywhere incl. Drupal embed.
- Record schema (mirror `nameExamples` entry + workflow fields): `{ key, smiles, mol2D variants, classification, GR slots, nameEN, oracle snapshot, author, status: draft|engine-checked|author-corrected|expert-approved, history }`.
- Flow: student draws → submits draft file → engine/oracle pre-check → author correction → expert validation → merge into app data. Assignable per-student (one draft file each).
- Duplicate guard: canonical SMILES compare against existing 141 + other drafts at submit.

## Open questions (tomorrow)
1. 2D mode variants: derive at submit (JSME-side) vs store one molfile + convert on switch?
2. RDKit.js: is `RDKit/` usable as WASM, or fetch remote? Fallback if neither?
3. Correction granularity: free-text component edit vs slot-level (prefix/locant/stem/suffix) pickers?
4. Exercise question types to lock fragment-event API before building author UI twice.
