# MolWave molecule-data roadmap

Status: planning — development mode is v59.24

Progress: v59.23 exports engine-test molecules as JSON (`schemaVersion: 2`,
flat legacy record + stamp — a **stopgap**) and stores the `unsupported` naming
diagnostic record. v59.24 ships the common-ether systematic labels and per-arm
parent chains, which was the last record-shape change. The record **shape** is
frozen at v3 (2026-11-26, below); schema files, the v3 export, the normalizer,
the per-file dev loader and the generated release bundle are not built yet.

Batch order (owner, 2026-11-26): **v59.24 ether naming (done) → v59.25 schema
freeze → quiz multi-chain verification → post-2013 algorithm → corpus/release
generator.**

Target: closed, stable corpus release (~1000 molecules, v60)

Scope: stored molecules + menu/index pipeline. No new-molecule UI in the closed release.

## Goal

Build a stable closed release that:

- ships ~1000 stored molecules covering secondary-education requirements;
- has every molecule available on page load;
- lists the menu by formula, by name (GR/EN), and by skeletal SVG representation;
- has no runtime folder scanning, no 1000 individual requests, and no boot-time
  classification loop over the whole corpus;
- keeps a development mode that reads one molecule file at a time for
  student-molecule debugging and core-naming improvement.

## Constraints

- Static, no-build runtime (JSME + JSmol + vanilla JavaScript; Drupal-embeddable).
- The browser cannot list a folder. Development must use either a dev-server
  directory endpoint or a generated manifest.
- One JSON object per molecule is the source record.
- Do not execute student/imported JavaScript. Import JSON only.
- Keep `nameExamples` and the existing menu/scenario/probe contracts stable
  during the migration.
- Final closed release must not expose new-molecule/draft/import controls.
- Core naming results are authoritative; student/proposed/oracle names are
  validation inputs, not displayed truth.
- **Drupal embedding contract (closed tree).** Drupal serves the closed build as
  plain static files: the generated data ships as synchronous `<script>` tags,
  with no `fetch()`, no directory scan, no dev-server endpoint, and no build
  step on the Drupal side. The app must stay CSP-friendly (the `?libs=local`
  JSmol/JSME path keeps working when the CDN is blocked) and must not leak
  global CSS into the host page. Keep the URL contract (`?scenario=`, `?lang=`,
  `?mol=`, `#step=N`, URL-encoded Greek scenario names). No PII in the static
  app: Drupal owns auth, sessions, logging storage and CSV export; the app only
  queues `researchMode` events.

## Two data modes, one contract

### Development mode

- Reads per-molecule JSON files from `molecules/`.
- Discovery: dev server endpoint (`/api/molecules`) or `molecules/index.json`.
- Loads all (or on demand), validates, builds `nameExamples` and menu data.
- Keeps sandbox import and naming-debug tooling.
- May compute classification/names live.
- Local `file://` is unsupported; use the dev server.

### Closed release mode

- Loads generated, checked-in data synchronously:
  - `js/molecules-60.js` — all records (the `derived` audit block is omitted
    and 3D may be split into a lazy chunk);
  - `js/menu-index-60.js` — precomputed menu metadata.
- Nothing is generated in the browser: names, classification, carbon counts and
  menu skeletal thumbnails are all baked into the generated index.
- No fetch of molecule files, no directory scan, no boot classification loop.
- Build stamp includes core version/hash and data version.
- No new-molecule/draft/import UI.

### Shared runtime contract

```js
window.nameExamples    // key -> full molecule record
window.menuIndex       // key -> precomputed menu metadata
window.MulerDataReady  // resolved/promise gate before boot
```

App boot waits for `MulerDataReady`; release resolves immediately. Menu builder
uses `menuIndex` and falls back to record metadata if absent.

## Source layout

```text
molecules/
  schema.json
  index.json                 # generated manifest for static dev
  builtin/
    ethane.json
    butane.json
    ...
  incoming/                  # student candidates, not live
```

## Molecule record v3 (shape frozen 2026-11-26)

`schemaVersion: 2` (shipped in v59.23) is the flat legacy record plus a stamp: a
stopgap, not the corpus schema. The canonical record is **v3**; the nested
proposal previously sketched here as "v2" is superseded.

**Principle: store what cannot be recomputed; recompute what the current engine
defines.** Geometry, provenance and human verdicts are data. Chains, names,
components, classification and SMILES are engine output.

| Field class | Stored? | Why |
|---|---|---|
| 4 mol blocks (condensed / expanded / skeletal / 3D) | yes, authoritative | hand-curated school geometry cannot be regenerated |
| `key`, `formula`, `inchiKey`, aliases | yes | identity and menu key |
| `provenance` (author, proposedName, note, history) | yes | human record |
| `oracle` (GR/EN/SMILES validation inputs) | yes | external reference, not engine output |
| `naming` decline diagnostics | yes | an observation about a specific engine version; unrecoverable once the engine learns the case |
| chains, names, components, slots, classification, SMILES | no — `derived` block | pure function of (molfile, rules); otherwise a second truth |

```json
{
  "format": "mulermoc-molecule",
  "schemaVersion": 3,
  "key": "ethyl_isopropyl_ether",
  "formula": "C5H12O",
  "inchiKey": "…",

  "representations": {
    "condensed": { "format": "mol", "mdl": "V2000", "mol": "…" },
    "expanded":  { "format": "mol", "mdl": "V2000", "mol": "…" },
    "skeletal":  { "format": "mol", "mdl": "V2000", "mol": "…" },
    "threeD":    { "format": "sdf", "mdl": "V2000", "mol": "…" }
  },

  "ethers": {
    "common": {
      "symmetric": false,
      "groups": [
        { "role": "parent",
          "atoms":        { "condensed": [], "expanded": [], "skeletal": [], "threeD": [] },
          "parentChain":  { "condensed": [], "expanded": [], "skeletal": [], "threeD": [] },
          "attachLocant": { "condensed": 2, "expanded": 2, "skeletal": 2, "threeD": 2 },
          "substituents": [],
          "labels": { "gr": { "common": "ισοπροπυλο", "systematic": "προπαν-2-υλο" },
                      "en": { "common": "isopropyl",   "systematic": "propan-2-yl" } } }
      ]
    },
    "substitutive": { "parent": { "rule": "school-pre2013", "chain": 0 },
                      "alkoxy": { "parentChain": {}, "attachLocant": {} } }
  },

  "provenance": { "author": "", "proposedName": "", "note": "", "history": [] },
  "oracle":     { "grName": "", "enName": "", "smiles": "" },
  "naming":     { "status": "unsupported", "rule": "school-pre2013", "reason": "…" },

  "derived": {
    "engine": "v59.24",
    "chains": {
      "school-pre2013": {
        "condensed": [ { "atoms": [1,2,3], "len": 3, "fg": null, "fgCover": 0,
                         "anchors": 0, "multi": 0, "dbl": 0 } ],
        "expanded":  [ "…same pool shape…" ],
        "skeletal":  [ "…same pool shape…" ],
        "threeD":    [ "…same pool shape…" ]
      }
    },
    "names": [ { "lang": "gr", "rule": "school-pre2013", "substStyle": "school",
                 "etherStyle": "common", "chain": 0, "text": "…" } ],
    "classification": {},
    "smiles": "…"
  }
}
```

Record rules:

- **Optional blocks appear only where applicable**: `ethers` only for ethers,
  `naming` only for engine declines, `derived.names` only for the supported
  variants. The `ethers` keys follow the v59.24 implementation (frame → arm
  descriptor → per-representation atoms/chains/locants + both label styles).

- **Atom indices are 1-based molfile atom numbers, carbons only.** The runtime
  mixes 0-based fragments with 1-based main chains; the JSON fixes one
  convention and the loader converts.
- **Rule eras are string ids** (`school-pre2013`, `iupac-2013`), never booleans,
  so a new rule is a new key, not a schema change. Post-2013 can select a
  different parent for the same molecule; the shape already allows it.
- **Ethers decompose differently per style**: common = two alkyl arms, each with
  its own parent chain, attach locant, substituents and both label styles
  (`labels.gr.common/systematic`, `labels.en.common/systematic`, emitted by
  `fGetEtherCommonParts()` in v59.24); substitutive = parent chain + alkoxy
  substituent. Store per style; one shared group array is wrong.
- **`derived` is machine-written, engine-stamped and never read at runtime.**
  The validator regenerates it and requires a zero diff; the build fails if the
  data's `derived.engine` predates the core naming version. Option A (block in
  the molecule file) was chosen over a separate golden file so a molecule can be
  audited alone.
- **`derived.chains` mirrors the engine's ranked chain pool**, not a bare path
  list: `{ atoms, len, fg, fgCover, anchors, multi, dbl }` (the fields
  `fRankChainPool` already scores with), index 0 = displayed candidate. The
  runtime aliases are `mainChainPool` / `mainChainPool3D` and
  `mainChainPoolIdx`; scenario steps store the chosen pool index as `chainIdx`
  (v47, additive). Storing the scoring metadata is what makes the order
  auditable.
- **No stored chain preference.** Display order is already deterministic in the
  engine: `fRankChainPool` ranks the candidates and
  `fHorizontalEquivalentIndex` prefers the horizontal orientation. A new rule
  era may rank differently, which is exactly why the pool lives under the rule
  id.
- **`naming` stays per-molecule** for now, with `naming.rule` defaulting to
  `school-pre2013`. It becomes per-variant only when a second rule era exists.
- **`quiz.parentRule` is a forward provision** on scenario steps (default
  `school-pre2013`). No quiz logic changes with it yet.
- **3D is inline in the JSON source** (all four mol blocks, owner requirement),
  but the generated release may move it to a lazy chunk: the boot payload must
  not carry data used only when the 3D view opens.
- **JSON is the source; the release is generated JS.** The Drupal contract
  forbids `fetch()` in the closed build, so the shipped artifact embeds the same
  objects as synchronous `<script>` data.

Measured sizes (154 molecules, 2026-11-26):

| Data | 154 molecules | ×1000 (est.) |
|---|---|---|
| 3 × 2D molfiles (`window.MOL2D`) | 0.42 MB | ~2.7 MB |
| 3D SDF on disk (`mols/nomeclature-moc2/*_3D.sdf`) | 0.36 MB (155 files) | ~2.3 MB |
| All four forms inline | 0.78 MB | ~5.1 MB raw (~1.3 MB gzip) |

Built-in `nameExamples` entries store no structures: 2D text lives in
`window.MOL2D[key]` in the same data file, and 3D is a `file3D` path loaded on
demand. That is why the current JSON export of a built-in is nearly empty.

Decided (owner, 2026-11-24):

- **Closed release is fully precomputed.** No menu or naming work happens at
  page load in the closed educational build.
- **Menu thumbnails are precomputed skeletal SVGs** generated from the stored
  skeletal MOLs with the app's own `MuSVG` renderer (the same code the viewer
  draws with). No JSME pass at boot and no new renderer dependency
  (`SmilesDrawer` etc.). Falling back to a second renderer in the menu is
  rejected: curated v59 geometry must match the viewer exactly.
- **Drupal is the deployment target** for the closed tree (see the Drupal
  embedding contract under Constraints).

Decided (owner, 2026-11-26):

- **Derived data lives in the molecule JSON** (Option A), not in a separate
  golden file: a `derived` block, machine-written and engine-stamped, so one
  file can be audited without the app. The loader ignores it.
- **No `teach.preferredChain`.** A stored chain preference is replaced by the
  engine's existing deterministic ranking (`fRankChainPool` +
  `fHorizontalEquivalentIndex`), which is testable and needs no per-record
  data.
- **`naming` stays per-molecule** for now, with `naming.rule` (default
  `school-pre2013`); per-variant diagnostics wait for a second rule era.
- **The schema shape is rule-agnostic, so post-2013 does not block the freeze.**
  A new era adds a `chainSets` key and `variants` entries. Prove the shape with
  one synthetic record whose `iupac-2013` chain differs from school, before the
  algorithm exists.
- **Batch order:** v59.24 ether naming → v59.25 schema freeze → quiz
  multi-chain → post-2013 → corpus + release generator. Ether work is the only
  remaining shape-changing change.

## Menu index (release)

One compact entry per molecule:

```json
{
  "key": "ethane",
  "formula": "CH3CH3",
  "nameGR": "αιθάνιο",
  "nameEN": "ethane",
  "classification": {},
  "carbonCount": 2,
  "skeletalSvg": "<svg…>",
  "aliases": []
}
```

Menu requirements:

- display mode: formula / name / skeletal structure;
- search across formula, names, aliases and class (normalize Greek accents and
  euphony variants once against the index, not against live engine output);
- existing grouping by chemical class / homologous series (series-first);
- collapsed groups and/or virtualized rows for ~1000 items;
- thumbnails are precomputed strings, injected lazily on group expand /
  `IntersectionObserver` — loaded with the index, never rendered on demand;
- molecules without a stored skeletal MOL (e.g. `methane`, whose
  `MOL2D.skeletal` is `null`) fall back to formula text, not to another
  renderer;
- no boot-time JSME pass over the corpus.

## Milestones

### M0 — Ether naming (v59.24, before the schema freeze) — DONE

- [x] Shared structural alkyl descriptor (parent chain, attach locant,
      substituents) in `core`.
- [x] Common ether: a parent chain for **both** arms.
- [x] Common frame with both label styles: `ισοπροπυλο μεθυλαιθέρας` /
      `προπαν-2-υλο μεθυλαιθέρας`.
- [x] Un-hide the Κοινή/Συστηματική toggle in common ether mode.
- [x] EN path uses the systematic label map, not transliteration.
- [x] Symmetric multiplier/parenthesis rule (`δι(προπαν-2-υλο)`).

Acceptance met: `probe-branch-quiz` + `probe-final` green; the ether list reads
correctly in GR and EN for common, systematic and substitutive frames.

Implementation: `fGetEtherCommonParts()` (molview) returns
`parentChain`/`attachLocant`/`label`/`labelSys`/`labelSysEN`/`retained` per arm
plus `hasSysVariant`; `fGRSysLabel()` and `fEtherSysLabelEN()` reuse
`GR_SYST_SUBST` / `EN_SYST_SUBST`. Box order and ids stay positional. The stored
`ethers` block above mirrors that descriptor.

### M1 — Freeze schema and contract (v3)

- [x] Decide authoritative vs derived fields (table above, 2026-11-26).
- [ ] Write `molecules/schema.json` + human-readable schema notes for v3.
- [ ] Define the loader/runtime contract (`nameExamples`, `menuIndex`,
      `MulerDataReady`).
- [ ] Add one hand-written v3 sample plus one synthetic record whose
      `iupac-2013` chain differs from school, and a validation checklist.

Acceptance: a JSON file can be authored by hand and reviewed without app code;
the synthetic record validates without the post-2013 algorithm existing.

### M2 — JSON export (v3)

- [x] Add “Export molecule JSON” (one object, no JS wrapper) — v59.23, flat v2.
- [ ] Replace the v2 payload with the v3 shape (`representations`, `provenance`,
      `oracle`, `naming.rule`, `derived`).
- [ ] Write the v2 → v3 normalizer (flat `structure2D_*`/`sdf3D`/`mainChain_*`
      into `representations`; wrap chains as one-element candidate arrays).
- [ ] Keep legacy `.js` export temporarily for compatibility.
- [ ] Add “Export all” JSON bundle for corpus work.
- [ ] Use `<key>.json` filenames.

Acceptance: downloaded JSON reparses losslessly and validates against M1;
`derived` regenerates to a zero diff.

### M2b — Quiz multi-chain (verify; mostly already shipped)

Already in the tree before v59.24: `mainChainPool` / `mainChainPool3D` with
`fRankChainPool` + `fHorizontalEquivalentIndex`, `mainChainPoolIdx`, scenario
`chainIdx` (v47), and `fMulerQuizComparePool` + chain adoption
(`mainChainPoolIdx` + `fApplyChainStep`) in `fMulerQuizRefresh`.

- [ ] Verify in Present that a mirrored but equivalent chain scores exact for the
      chain component, and that numbering/locant/group/bond targets follow the
      adopted chain.
- [ ] Add a mirrored-selection case to `probe-scenario-quiz` (or
      `probe-branch-quiz`) if absent; keep the existing single-chain assertions.
- [ ] Confirm `compCarbonsCount` solved-state unlocking still fires after an
      adoption (it is captured before the target clears).
- [ ] Defer `quiz.parentRule` until a second rule era exists; keep it documented
      as a forward provision, not implemented logic.

Acceptance: the engine's primary chain and a mirrored equivalent chain both
solve the step, with consistent numbering; no probe assertion is weakened.

### M3 — Sandbox JSON import (dev app)

- [ ] Dev-only “Load molecule JSON” picker.
- [ ] Parse + schema validate + key-collision check.
- [ ] Load into a temporary sandbox registry, not live data.
- [ ] Run classification and naming; show formula, derived GR/EN names,
      oracle/proposed comparison and errors.
- [ ] Discard or promote to the live/incoming set.

Acceptance: student JSON can be loaded without a reload and debugged immediately.

### M4 — Shared validator

- [ ] Node/harness validator for one file or a folder.
- [ ] Check schema, duplicate keys, molfile parse, atom/bond/valence, chains,
      2D/3D consistency.
- [ ] Run naming and compare with oracle/proposed names; write a report.
- [ ] Use the same validation code in the dev loader and release generator.

Acceptance: one command validates a folder and produces a clear pass/fail report.

### M5 — Development per-file loader

- [ ] Add dev-server molecule listing endpoint (preferred) or generated
      `molecules/index.json` fallback.
- [ ] Fetch per-molecule JSONs and build `nameExamples`/`menuIndex`.
- [ ] Gate menu build and `?mol=`/scenario deep links on `MulerDataReady`.
- [ ] Keep current bundled v59 data as fallback during migration.
- [ ] Reuse M4 validation; report bad files without blocking the rest.

Acceptance: the dev app runs from the per-file corpus with the same behaviour as
the bundled data.

### M6 — Migrate the 154 built-ins

- [ ] Convert current `nameExamples` entries to `molecules/builtin/*.json`
      in family batches (v3 shape; `MOL2D` text and `file3D` SDF move inline).
- [ ] Compare generated records, formulas, chains, structures and menu output
      against v59.
- [ ] Keep v59 live until v60 parity is proven.

Acceptance: 154/154 keys match; menu and probes unchanged.

### M7 — Release generator

- [ ] Read `molecules/builtin/`, validate, generate:
      `js/molecules-60.js`, `js/menu-index-60.js`, `molecules/index.json`.
- [ ] Precompute names, classification, carbon count, aliases.
- [ ] Omit `derived` from the release payload (it is audit data) and may move
      `representations.threeD.mol` to a lazy chunk; the boot payload carries 2D
      and the index only.
- [ ] Render `skeletalSvg` from each record's stored skeletal MOL with the
      shared `MuSVG` renderer (one renderer: menu matches viewer); emit a
      formula-only entry when the skeletal form is absent.
- [ ] Add build stamp: core hash/version + data version.
- [ ] Fail the build if a release bundle predates the core naming version.
- [ ] Report bundle size and gzip size; keep the output minified and
      gzip-friendly for Drupal/school networks.

Acceptance: closed page loads synchronously from generated files, skips the
boot classification loop, and renders no chemistry in the browser; cold load
stays within the school-hardware budget.

### M8 — Corpus and naming-core loop

- [ ] Freeze the secondary-education coverage matrix and family counts
      for ~1000 molecules.
- [ ] Add molecules in family batches via `molecules/incoming/`.
- [ ] Validate each batch; promote only verified records.
- [ ] Run corpus naming regression; triage failures by rule/type.
- [ ] Fix core rules in batches; rerun affected slices.

Acceptance: ~1000 verified molecules, no schema/chemistry errors, naming
failures triaged, no regression on the existing suite.

### M9 — Closed release and menu

- [ ] Implement formula/name/skeletal display modes.
- [ ] Add search, grouping, collapsed groups and/or virtualized rows.
- [ ] Remove new-molecule/draft/import UI from the closed build; keep dev tools
      separate.
- [ ] Run full regression + load-size/performance checks on school hardware.
- [ ] Freeze v60 and update docs.

Acceptance: all molecules available on load; menu opens fast; stable static/
Drupal build; no runtime corpus network dependency.

## Student → core workflow

1. Student creates a molecule in the dev app.
2. Student exports JSON.
3. Owner places it in `molecules/incoming/`.
4. Sandbox import or dev loader loads it.
5. Validator + live naming reveal core defects.
6. Fix the core; rerun naming regression.
7. Promote the file to `builtin/`.
8. Regenerate the release bundle/index.
9. Closed release ships only verified molecules.

`incoming/` is quarantine. It must never be in the live manifest/bundle.

## Risks and mitigations

- **Stale precomputed names** — `derived.engine` stamp + naming regression after
  every core change; the build fails on a stale stamp.
- **Dev/release drift** — shared validator and runtime contract; build verifies
  cached names equal live naming and regenerates `derived` to a zero diff.
- **Size** — measured 0.78 MB per 154 molecules with all four forms
  (~5.1 MB raw / ~1.3 MB gzip at 1000). Minify/gzip; test Drupal/school
  networks. The release boot payload carries 2D + index only; 3D may move to a
  lazy chunk. Split menu metadata from full records only if necessary; keep the
  corpus local, not directory-fetched.
- **Atom-index drift** — JSON fixes 1-based molfile numbering, carbons only; the
  loader converts. The validator checks every chain index against the molfile.
- **Student code execution** — JSON only; never eval imported JS.
- **Boot ordering** — async dev loader must gate menu/`?mol=`; release remains
  synchronous.
- **Migration churn** — keep v59 bundled data live until v60 parity; migrate in
  batches, not one cut.

## Immediate next actions

1. v59.24 ether naming (M0) — **done**; the record's ether block now mirrors the
   implemented per-arm descriptor.
2. v59.25 schema freeze (M1/M2) — `molecules/schema.json`, v3 export, the
   v2 → v3 normalizer, validator skeleton, synthetic rule-era record.
3. Quiz multi-chain (M2b) — verification only (pool matching already shipped),
   then the post-2013 algorithm as population.
4. Build the shared validator and the dev per-file loader.
5. Only then start the 154-molecule migration and the release generator.
