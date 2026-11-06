# Stage 2 + authoring/exercises roadmap (v54+, 2026-11-03)

> **Status 2026-11-06: v54 LIVE (`index.html` → v54, `?v=54.16`). Draft flow shipped + hardened (commits `d081c88`, `35d791e`, `aa6d250`, `ab590dc`, `d6513f0`, `3126c93`, `5d40ebe`).**
> Dedicated `jsmeEditDraft` edit applet (display applet stays depict-only; no `options()` flipping), Edit/New entries with drawing master switch (`Σχεδίαση και προσθήκη μορίων`, default on), draft session + guards (`selectedMol` untouched, Cancel restores, Present read-only, `_epoch`/`_submitId` + `accepting` lock against ghost Accept), Submit → engine + PubChem preview (GR engine name + predicted EN + tri-state `[✓|?|✕]` verdicts persisted as `nameCheck`, depict SVG view, Draw back-flip, freshness state machine with SMILES re-check + Draw-mid-fetch invalidation), Accept (same-molecule update vs fork by CID/normalized-SMILES identity, readable keys, dup + PubChem-3D gates, manual per-molecule `MULERMOC_*_data.js` save), 3-slot 2D at Accept (drawn verbatim + linearized school-condensed + H-expanded + JSME-first skeletal ladder with built-in fallback, each rung validated), Linearize + auto-linearize, canonical SMILES end-to-end, HOOC/ether layout fixes, condensed H-strip, V2000 shape scan + strict parse (non-finite coords fail closed), async depict race fix, per-mode C–C pixel equalizer + label/numbering compensation, collision-aware H placement + splay, Edit skip-tidy, stray-H guard, fork outcome-based full generation, OpenClatura second oracle (display + verdict + merged OR + stale-marker fix). Full list: `docs/CHANGELOG.md [v54]`.
> Open: RDKit local 3D (no `RDKit/` vendored in tree — local ETKDG generation TODO; gates Accept for record-less drawings), 2B author correction, exercise types (Q4 first).

## Where we are (v54 draft flow live; Stage 1 plan below is historical context)
- v54 forked from v53; `index.html` → v54 since 2026-11-04.
- Dual applets: display applet depict-only + dedicated `jsmeEditDraft` edit applet (no `options()` flipping; ORGNL retired, commented restorable).
- Drawing master switch (`Σχεδίαση και προσθήκη μορίων`, default on): Edit/New entries exist only while enabled; mid-draft toggle blocked.
- Applet re-fits via `fResizeViewers()` on show; height probe counts applet as 2D viewer (`viewerMaxHeight`/`viewerBothHeight` apply).

## Stage 2A — submit drawing to the engine (SHIPPED in v54; kept as record)
1. **Read the drawing**: `getMolFile()` / `getSmiles()` from the dedicated `jsmeEditDraft` applet (display applet never leaves depict; old single-applet plan retired).
2. **Run the pipeline**: shared sandbox pass `fMolDraftSandboxAnalyse` (chain rebuild included) → `fMolDraftAutoTidy` (read → sandbox → linearize → write back → re-read); empty/cyclic guard (union-find), `selectedMol` untouched until Accept.
3. **Three 2D modes**: derived at Accept (answered 2026-11-04, see Q1): outcome-based — fork ⇒ full generation (linearize → top-up → ladder, `drawnVariant` ignored), update ⇒ single edited slot verbatim (siblings byte-untouched); skeletal always via JSME-first ladder (display → edit applet on PubChem canonical SMILES, built-in `fZigzagMol` fallback; `_acceptSkel` validates each rung). Condensed H-strip; Edit skips auto-tidy; stray-H guard on Edit-expanded; equalizer + font/numbering compensation + collision-aware placement + splay (see CHANGELOG `?v=54.12`).
4. **3D**: PubChem SDF 3D first via inline `load data` (`fJSmolLoadInlineSDF` — `blob:` URLs rejected by JSmol online), CIR fallback (`iupac-54.js`). Novel/record-without-3D drawings stay 2D-only with a note; Accept is gated for 3D-less molecules. No `RDKit/` in tree (removed pre-v44) — local ETKDG generation is a TODO (fetch remote vs vendor decision open).
5. **Name validation**: engine guess + predicted EN (sandbox transliteration, PubChem systematic fallback) → shared-comparator oracle verdicts (PubChem 3-way `fMolDraftPCMatch` OR OpenClatura `fMatchENvsOC`, tri-state, untouched-only auto-check with `enAutoSource`, non-blocking) → author sign-off. No auto-merge: validated-by-oracle ≠ accepted.

## Stage 2B — author correction (ROADMAP, not in v54)
- Today: name-component click → atom highlight (one direction).
- Add reverse: click atoms/bonds (2D applet + 3D) → selects name component(s); author edits component text / locants; display name recomputes from overridden slots; overrides stored per draft (not in engine tables).
- Same infra later powers exercises/questions (fragment assembly, name↔structure matching) — design the selection events reusable, not author-panel-specific.

## Persistence + review workflow (ROADMAP; v54 ships only manual per-molecule save)
- Format: **JSON payload inside a `.js` file** (e.g. `js/jsme-nick-nomeclature-moc2-data_custom.js` defining `nameExamplesCustom`, merged at boot). Plain `.json` + `fetch` breaks on `file://`; script-tag `.js` works everywhere incl. Drupal embed.
- Record schema (mirror `nameExamples` entry + workflow fields): `{ key, smiles, mol2D variants, classification, GR slots, nameEN, oracle snapshot, author, status: draft|engine-checked|author-corrected|expert-approved, history }`.
- Flow: student draws → submits draft file → engine/oracle pre-check → author correction → expert validation → merge into app data. Assignable per-student (one draft file each).
- Duplicate guard: canonical SMILES compare against existing 141 + other drafts at submit.

## Open questions (tomorrow)
1. ~~2D mode variants: derive at submit (JSME-side) vs store one molfile + convert on switch?~~ Answered 2026-11-04: derive at Accept, store all three slots (drawn verbatim + linearized school-condensed + H-expanded + zigzag skeletal via JSME ladder with built-in fallback).
2. RDKit.js: no `RDKit/` vendored in tree (local ETKDG generation TODO; see README/.gitignore wording). Decision open: fetch remote RDKit.js WASM vs vendor locally vs keep the 3D gate. Fallback today: record-less drawings stay 2D-only, Accept gated.
3. Correction granularity: free-text component edit vs slot-level (prefix/locant/stem/suffix) pickers?
4. Exercise question types to lock fragment-event API before building author UI twice.
