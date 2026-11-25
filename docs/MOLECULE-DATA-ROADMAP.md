# MolWave molecule-data roadmap

Status: planning — development mode is v59.21
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
  - `js/molecules-60.js` — all records;
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

## Molecule record v2 (proposal)

```json
{
  "format": "mulermoc-molecule",
  "schemaVersion": 2,
  "key": "custom_ethane_2",
  "formula": "CH3CH3",
  "chains": {
    "condensed": [],
    "expanded": [],
    "skeletal": [],
    "3d": []
  },
  "structures": {
    "condensed": "molfile text",
    "expanded": "molfile text",
    "skeletal": "molfile text"
  },
  "model3D": {
    "file": "mols/....sdf"
  },
  "provenance": {
    "author": "",
    "created": "",
    "status": "draft"
  },
  "oracle": {
    "grName": "",
    "enName": "",
    "smiles": ""
  }
}
```

Decisions still required:

- Are `classification`/`smiles`/names stored, derived, or cached?
  Recommendation: derived/live in dev, precomputed into the release index,
  never trusted as canonical in the source record.
- Is 3D embedded (`sdf3D`) or referenced (`file3D`)?
- Keep current flat field names during migration, or introduce the nested
  shape with a compatibility normalizer?

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

### M1 — Freeze schema and contract

- [ ] Write `molecules/schema.json` + human-readable schema notes.
- [ ] Decide authoritative vs derived fields.
- [ ] Define the loader/runtime contract (`nameExamples`, `menuIndex`,
      `MulerDataReady`).
- [ ] Add one sample molecule JSON and a validation checklist.

Acceptance: a JSON file can be authored by hand and reviewed without app code.

### M2 — JSON export

- [ ] Add “Export molecule JSON” (one object, no JS wrapper).
- [ ] Keep legacy `.js` export temporarily for compatibility.
- [ ] Add “Export all” JSON bundle for corpus work.
- [ ] Sanitize undefined/runtime-only fields; keep provenance/oracle.
- [ ] Use `<key>.json` filenames.

Acceptance: downloaded JSON reparses losslessly and validates against M1.

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
      in family batches.
- [ ] Compare generated records, formulas, chains, structures and menu output
      against v59.
- [ ] Keep v59 live until v60 parity is proven.

Acceptance: 154/154 keys match; menu and probes unchanged.

### M7 — Release generator

- [ ] Read `molecules/builtin/`, validate, generate:
      `js/molecules-60.js`, `js/menu-index-60.js`, `molecules/index.json`.
- [ ] Precompute names, classification, carbon count, aliases.
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

- **Stale precomputed names** — build stamp + naming regression after every core
  change.
- **Dev/release drift** — shared validator and runtime contract; build verifies
  cached names equal live naming.
- **Size** — 1000 records may be several MB raw. Minify/gzip; test Drupal/school
  networks. Split menu metadata from full records only if necessary; keep the
  corpus local, not directory-fetched.
- **Student code execution** — JSON only; never eval imported JS.
- **Boot ordering** — async dev loader must gate menu/`?mol=`; release remains
  synchronous.
- **Migration churn** — keep v59 bundled data live until v60 parity; migrate in
  batches, not one cut.

## Immediate next actions

1. Write the v2 schema and one sample JSON.
2. Add JSON export to the dev draft flow.
3. Add sandbox import + display of derived/oracle names.
4. Build the shared validator.
5. Only then start the dev per-file loader and the 154-molecule migration.
