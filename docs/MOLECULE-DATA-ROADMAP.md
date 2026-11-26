# MolWave molecule-data roadmap

Status: planning — development mode is v59.29

Progress: v59.23 exports engine-test molecules as JSON (`schemaVersion: 2`,
flat legacy record + stamp — a **stopgap**) and stores the `unsupported` naming
diagnostic record. v59.24 ships the common-ether systematic labels and per-arm
parent chains (the last record-shape change); v59.25 applies the English P-29.1
di-/bis- prefix rule; v59.26 fixes the decline-audit semantics, stamps
`naming.rule`/`naming.engine` and locks the v3 decisions recorded in
`docs/SCHEMA-V3-PLAN.md`; v59.27 fixes the English C9 stem and makes the EN
builder fail closed on any untransliterable fragment; v59.28 elides the Greek
C9 stem's final alpha before a vowel (`εννεάνιο`); v59.29 adds the ε+ι
diaeresis (`εννεϊνόλη`, `εννεΐνιο`). The record **shape** is
frozen at v3 (2026-11-26, below); schema files, the v3 export, the normalizer,
the per-file dev loader and the generated release bundle are not built yet.

Batch order (owner, 2026-11-26): **v59.24 ether naming (done) → v59.25 di/bis
prefixes (done) → v59.26 audit + v3 decisions (done) → schema files + export +
validator → quiz multi-chain verification → post-2013 algorithm →
corpus/release generator.**

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
  - `js/molecules-60.js` — all records (the audit-only `derived` block is
    omitted, `reference.chains` stays, 3D may be split into a lazy chunk);
  - `js/menu-index-60.js` — precomputed menu metadata;
  - `js/menu-thumbs-60.js` — precomputed `MuSVG` skeletal thumbnails (lazy).
- **No boot-time menu/classification work:** names, classification, carbon
  counts and skeletal thumbnails are baked into the index. The naming engine
  still runs **on selection** for the name panel, explain, stepper and quiz
  targets (menu-only precompute, owner decision 2026-11-26).
- No fetch of molecule files, no directory scan, no boot classification loop.
- Build stamp includes core version/hash and data version in the records, the
  menu index and the thumbnails chunk.
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
defines.** Geometry, provenance, human verdicts and the hand-verified
`reference.chains` baseline are data. Chains (the ranked pool), names,
components, classification and SMILES are engine output.

| Field class | Stored? | Why |
|---|---|---|
| 4 mol blocks (condensed / expanded / skeletal / 3D) + `source` | yes, authoritative | hand-curated school geometry cannot be regenerated; the source records provenance |
| `key`, `formula` (menu structural label), aliases, optional `inchiKey` | yes | identity, menu key and search |
| `provenance` (author, proposedName, note, `status`, **verdicts**, history) | yes | human record; verdicts are labeled eval data |
| `oracle` (`pubchem`, `openclatura`, `identity` inputs) | yes | external reference, not engine output |
| `naming` decline diagnostics | yes | an observation about a specific engine version; unrecoverable once the engine learns the case |
| `reference.chains` (hand-verified primary per representation) | yes | the verification baseline for engine updates |
| `ethers` structural decomposition (no label text) | yes | the naming decision (arms/locants) cannot be re-derived reliably |
| chains (ranked pool), names, components, slots, classification, SMILES, molecular formula | no — `derived` block | pure function of (molfile, rules); otherwise a second truth |
| ether arm label text | no — `derived.names` / `derived.ethers` | engine output (v59.24/25 changed it) |

```json
{
  "format": "mulermoc-molecule",
  "schemaVersion": 3,
  "key": "ethyl_isopropyl_ether",
  "formula": "CH3CH2OCH(CH3)2",
  "inchiKey": null,
  "aliases": [],

  "representations": {
    "condensed": { "format": "mol", "mdl": "V2000", "mol": "…", "source": "namelecule" },
    "expanded":  { "format": "mol", "mdl": "V2000", "mol": "…", "source": "derived" },
    "skeletal":  { "format": "mol", "mdl": "V2000", "mol": "…", "source": "jsme" },
    "threeD":    { "format": "sdf", "mdl": "V2000", "mol": "…", "source": "pubchem-jsmol",
                   "file": "mols/nomeclature-moc2/ethyl_isopropyl_ether_3D.sdf" }
  },

  "reference": {
    "source": "v59 data (hand-verified)",
    "verifiedAt": "2026-11-25",
    "chains": {
      "school-pre2013": {
        "condensed": [4,2,5], "expanded": [4,2,5], "skeletal": [4,2,5], "threeD": [2,1,3]
      }
    }
  },

  "ethers": {
    "common": {
      "symmetric": false,
      "groups": [
        { "role": "parent",
          "atoms":        { "condensed": [], "expanded": [], "skeletal": [], "threeD": [] },
          "parentChain":  { "condensed": [4,2,5], "expanded": [4,2,5], "skeletal": [4,2,5], "threeD": [2,1,3] },
          "attachLocant": { "condensed": 2, "expanded": 2, "skeletal": 2, "threeD": 2 },
          "substituents": [] }
      ]
    },
    "substitutive": { "parent": { "rule": "school-pre2013", "chain": 0 },
                      "alkoxy": { "parentChain": {}, "attachLocant": {} } }
  },

  "provenance": {
    "author": "", "proposedName": "", "note": "",
    "status": "draft",
    "verdicts": { "gr": "unconfirmed", "en": "unconfirmed",
                  "enAutoValidated": false, "enAutoSource": null },
    "history": []
  },

  "oracle": {
    "pubchem":     { "cid": null, "iupac": null, "title": null, "systematic": null },
    "openclatura": { "name": null, "opsin": null, "done": false },
    "identity":    { "smiles": "CCOC(C)C", "canonicalSmiles": "CCOC(C)C" }
  },

  "naming": {
    "status": "unsupported", "rule": "school-pre2013", "engine": "v59.29",
    "reason": "…", "callSite": "…", "frame": "…", "at": "…",
    "features": [ … ], "snapshot": { … }
  },

  "derived": {
    "engine": "v59.29",
    "molecularFormula": "C5H12O",
    "chains": {
      "school-pre2013": {
        "condensed": [ { "atoms": [4,2,5], "len": 3, "fg": null, "fgCover": 0,
                         "anchors": 0, "multi": 0, "dbl": 0 } ],
        "expanded":  [ "…same pool shape…" ],
        "skeletal":  [ "…same pool shape…" ],
        "threeD":    [ "…same pool shape…" ]
      }
    },
    "names": [ { "lang": "gr", "rule": "school-pre2013", "substStyle": "school",
                 "etherStyle": "common", "representation": "condensed",
                 "chain": 0, "text": "…" } ],
    "ethers": { "common": { "groups": [ { "role": "parent",
                 "labels": { "gr": { "common": "ισοπροπυλο", "systematic": "προπαν-2-υλο" },
                             "en": { "common": "isopropyl",  "systematic": "propan-2-yl" } } } ] } },
    "classification": {},
    "smiles": "…"
  }
}
```

Record rules:

- **Two chain layers.** `reference.chains` is the hand-verified expectation from
  the pre-algorithm data; `derived.chains` is the engine's ranked pool, index 0 =
  displayed. The validator compares index 0 to `reference`; a diff is reported
  (not a failure) when `derived.engine` changed, and `--bless` re-stamps
  `reference`. `reference` is optional (absent on app-accepted/test molecules).

- **Optional blocks appear only where applicable**: `reference`, `ethers` for
  ethers, `naming` for engine declines, `representations.threeD` when a 3D model
  exists, `derived.ethers` only when per-arm audit labels are wanted. The
  `ethers` keys follow the v59.24 implementation (frame → arm descriptor →
  per-representation atoms/chains/locants), **without** label text.

- **Atom indices are 1-based molfile atom numbers, carbons only** for chains and
  ether descriptors. `naming.features[].atoms` and `snapshot.branchCarbons` are
  also 1-based but may include heteroatoms. The runtime
  mixes 0-based fragments with 1-based main chains; the JSON fixes one
  convention and the loader converts.
- **Rule eras are string ids** (`school-pre2013`, `iupac-2013`), never booleans,
  so a new rule is a new key, not a schema change. Post-2013 can select a
  different parent for the same molecule; the shape already allows it.
- **Ethers decompose differently per style**: common = two alkyl arms, each with
  its own parent chain, attach locant and substituents; substitutive = parent
  chain + alkoxy substituent. Store the structure per style (one shared group
  array is wrong); the arm label text is engine output in `derived.names` /
  `derived.ethers` (v59.24/25 changed it).
- **`derived` is machine-written, engine-stamped and never read at runtime.**
  The release generator ships the current engine's output. The validator
  compares `derived.chains[0]` to `reference.chains`: a same-engine diff is a
  failure (hand edit/corruption), an engine-version diff is a **report** for
  review, and `--bless` re-stamps `reference` with a history entry. Option A
  (block in the molecule file) was chosen over a separate golden file so a
  molecule can be audited alone.
- **`derived.chains` mirrors the engine's ranked chain pool**, not a bare path
  list: `{ atoms, len, fg, fgCover, anchors, multi, dbl }` (the fields
  `fRankChainPool` already scores with), index 0 = displayed candidate. The
  runtime aliases are `mainChainPool` / `mainChainPool3D` and
  `mainChainPoolIdx`; scenario steps store the chosen pool index as `chainIdx`
  (v47, additive). Storing the scoring metadata is what makes the order
  auditable.
- **No stored display preference.** Display order is deterministic in the engine:
  `fRankChainPool` ranks the candidates and `fHorizontalEquivalentIndex` prefers
  the horizontal orientation. `reference.chains` is a **verification
  expectation**, not a per-molecule display override; a new rule era may rank
  differently, which is why the pool lives under the rule id.
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

- **Menu-only precompute (owner, 2026-11-26).** The closed educational build
  precomputes the **menu** (names, classification, carbon count, formula, search
  string, skeletal SVG thumbnails) and the chains; the naming engine still runs
  on selection for the panel, explain, stepper and quiz targets. It is not a
  full naming cache (`derived.slots`/`explain`/`quizTargets` are not shipped).
  What disappears is the boot classification loop, not runtime naming.
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
- **Batch order:** v59.24 ether naming → v59.25 di/bis prefixes → v59.26 audit
  + v3 decisions → schema files/export/validator → quiz multi-chain → post-2013
  → corpus + release generator. Ether work was the last shape-changing naming
  change.

Decided (owner, 2026-11-26, v59.26 review):

- **Human verdicts are stored** in `provenance.verdicts`, never in `derived`
  (they are labeled eval data and cannot be regenerated).
- **`formula` is the menu structural label** (`CH3CH2CH3`). Hill notation is
  `derived.molecularFormula` and is what the validator checks.
- **`oracle` holds external inputs only** (`pubchem`, `openclatura`,
  `identity`); engine names live in `derived.names`.
- **`ethers` stores the structure only**; arm label text is engine output in
  `derived.names` / `derived.ethers` (v59.24/25 could change it).
- **`reference.chains` is stored** as the hand-verified verification baseline;
  `derived.chains` is the engine snapshot. Same-version diff = failure;
  engine-version change = reported diff + `--bless` updates `reference`.
- **Atom indices:** chains/ethers 1-based carbons only; diagnostic atom arrays
  1-based any element.
- **Validation split:** pure-Node structural validator + Playwright naming audit
  (`derived` regeneration needs the JSME applet).
- **`provenance.status`** is `draft | candidate | verified`; `inchiKey` optional;
  `aliases` stored when authored.

## Menu index (release)

One compact entry per molecule, generated at build time by a naming-capable
runner (the engine needs the JSME applet, so the generator is a headless-browser
step, not a plain Node script). The index is a **projection**, not part of the
molecule record.

```json
{
  "key": "ethyl_isopropyl_ether",
  "engine": "v59.29",
  "formula": "CH3CH2OCH(CH3)2",
  "molecularFormula": "C5H12O",
  "carbonCount": 5,
  "names": {
    "gr": { "school": "αιθυλο ισοπροπυλαιθέρας",
            "systematic": "αιθυλο προπαν-2-υλο αιθέρας" },
    "en": { "school": "ethyl isopropyl ether",
            "systematic": "ethyl propan-2-yl ether",
            "pin": "2-ethoxypropane" }
  },
  "classification": { "seriesKey": "…", "chemicalClass": "…", "taxonomy": "…" },
  "aliases": [],
  "search": "αιθυλο ισοπροπυλαιθερας … c5h12o … cco …",
  "thumbRef": "ethyl_isopropyl_ether"
}
```

Menu requirements:

- display mode: formula / name / skeletal structure;
- **search** across names (GR school/systematic, EN school/systematic/PIN), the
  Greek→Latin transliteration, formula (structural + Hill), SMILES (canonical +
  drawn), classification, carbon count, aliases and CID. The generator writes
  one normalized `search` string per molecule (lowercase, accent-folded,
  final-sigma folded, locants/hyphens flattened, Latin transliteration
  appended); the runtime filter is a linear substring scan over ~1000 entries.
  Exact-key → exact-name → prefix → substring ranking; empty query returns the
  grouped tree;
- existing grouping by chemical class / homologous series (series-first);
- collapsed groups and/or virtualized rows for ~1000 items;
- thumbnails are precomputed `MuSVG` strings rendered from each record's stored
  skeletal MOL, shipped in a separate lazy chunk (`menu-thumbs-60.js`) and
  injected on group expand / `IntersectionObserver` — never rendered on demand
  at runtime and never a second renderer;
- molecules without a stored skeletal MOL (e.g. `methane`, whose
  `MOL2D.skeletal` is `null`) fall back to formula text;
- no boot-time JSME pass over the corpus; the naming panel still runs on
  selection;
- `engine` is the build stamp: if it differs from the core version the index is
  stale and the build must regenerate it (a menu/panel name mismatch is a bug).

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

### M0b — English di-/bis- multiplying prefixes (v59.25) — DONE

- [x] `fIsCompoundSubstEN()` classifier (leading locant, hetero stem, embedded
      basic multiplier in amino/imino names).
- [x] `fSystematicSubstSlot`: `bis/tris/tetrakis` for compound groups, `di` for
      simple ones; whole-word, parenthesized and hyphenated (`di-tert-butyl`)
      forms.
- [x] Common-ether symmetric multiplier follows the same class (school
      `di-tert-butyl` vs systematic `bis(2-methylpropan-2-yl)`).
- [x] `fENSubstSortKey`: simple groups ignore the multiplier (P-14.5.1),
      compound groups sort under `bis` (P-14.5.2).
- [x] Greek kept on `δι/τρι/τετρα` + parens (owner decision; source check
      pending if it is ever changed).

Acceptance met: `probe-branch-quiz` + `probe-final` green; slot/sort/classifier
checks and an end-to-end `fPopulateEngineENFromGreek` run pass; Greek output is
byte-identical to v59.24.

### M1 — Freeze schema and contract (v3)

Plan: `docs/SCHEMA-V3-PLAN.md` (files, normalizer mapping, validator checks,
open questions).

- [x] Decide authoritative vs derived fields (table above, 2026-11-26; full
      decision list in `docs/SCHEMA-V3-PLAN.md` §3).
- [ ] Write `molecules/schema.json` + human-readable schema notes for v3.
- [ ] Define the loader/runtime contract (`nameExamples`, `menuIndex`,
      `MulerDataReady`), including which saved chain fields the loader hydrates
      (`mainChain_*` / `mainChain3D` from `reference`/`derived`).
- [ ] Add one hand-written v3 sample plus one synthetic record whose
      `iupac-2013` chain differs from school, and a validation checklist.

Acceptance: a JSON file can be authored by hand and reviewed without app code;
the synthetic record validates without the post-2013 algorithm existing.

### M2 — JSON export (v3)

- [x] Add “Export molecule JSON” (one object, no JS wrapper) — v59.23, flat v2.
- [ ] Replace the v2 payload with the v3 shape (`representations`, `reference`,
      `provenance.verdicts`, `oracle`, `naming.rule`/`engine`, `derived`).
- [ ] Write the v2 → v3 normalizer with the explicit field map in
      `docs/SCHEMA-V3-PLAN.md` §6 (no silent drops).
- [ ] Stamp `derived.engine` from `MULER_CORE_VERSION` and bundle metadata
      (`engine`, `generatedAt`, `count`).
- [ ] Keep legacy `.js` export temporarily for compatibility.
- [ ] Add “Export all” JSON bundle for corpus work.
- [ ] Use `<key>.json` filenames.

Acceptance: downloaded JSON reparses losslessly and validates against M1; the
structural validator passes and `derived.chains[0]` equals `reference` at the
same engine version (full regeneration is the Playwright audit).

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

- [ ] Node/harness structural validator for one file or a folder (schema,
      duplicate keys, molfile parse, atom/bond/valence, chains, formula,
      ethers, `reference` vs `derived.chains[0]` at the same engine stamp).
- [ ] Playwright naming audit that regenerates `derived` and reports diffs;
      `--bless` updates `reference` with a history entry. This is separate
      because naming needs the JSME applet.
- [ ] Run naming and compare with oracle/proposed names; write a report.
- [ ] Use the structural half in the dev loader and release generator.

Acceptance: one command validates a folder and produces a clear pass/fail report;
a diff after an engine change is reported (not failed) and can be blessed; a
same-version diff is a failure.

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
      `js/molecules-60.js`, `js/menu-index-60.js`, `js/menu-thumbs-60.js`,
      `molecules/index.json`.
- [ ] Precompute the menu entry: names (GR school/systematic, EN school/
      systematic/PIN), classification, carbon count, formula, aliases,
      normalized `search` string.
- [ ] Ship `reference.chains` (primary per representation) in the record
      payload; omit the audit-only `derived` block. Move
      `representations.threeD.mol` to a lazy chunk; the boot payload carries 2D
      + reference chains + the index.
- [ ] Render `thumbRef` SVGs from each record's stored skeletal MOL with the
      shared `MuSVG` renderer into `menu-thumbs-60.js` (one renderer: menu
      matches viewer); emit a formula-only entry when the skeletal form is
      absent.
- [ ] Add build stamp: core version/hash + data version to the records, the
      menu index and the thumbs chunk.
- [ ] Fail the build if a release bundle or menu index predates the core naming
      version.
- [ ] Report bundle, index and thumbs sizes (raw + gzip) for Drupal/school
      networks.

Acceptance: closed page loads synchronously from generated files, skips the
boot classification loop, keeps runtime naming for the panel, and search works
across names/formula/SMILES/classification with no network fetch; cold load
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

- **Stale precomputed names** — `menuIndex.engine` + `derived.engine` stamps +
  naming regression after every core change; the build fails on a stale stamp
  (a menu/panel name mismatch is the visible symptom).
- **Dev/release drift** — shared validator and runtime contract; the menu index
  is generated from the same engine, and the derived audit reports (not hides)
  diffs after a rule change.
- **Size** — measured 0.78 MB per 154 molecules with all four forms
  (~5.1 MB raw / ~1.3 MB gzip at 1000). Minify/gzip; test Drupal/school
  networks. The release boot payload carries 2D + reference chains + index
  (3D and thumbnails move to lazy chunks). Split menu metadata from full records
  only if necessary; keep the corpus local, not directory-fetched.
- **Atom-index drift** — JSON fixes 1-based molfile numbering, carbons only; the
  loader converts. The validator checks every chain index against the molfile.
- **Student code execution** — JSON only; never eval imported JS.
- **Boot ordering** — async dev loader must gate menu/`?mol=`; release remains
  synchronous.
- **Migration churn** — keep v59 bundled data live until v60 parity; migrate in
  batches, not one cut.

## Immediate next actions

1. v59.24 ether naming (M0) — **done**; the record's ether block mirrors the
   implemented per-arm descriptor, labels are derived.
2. v59.25 English di/bis prefixes (M0b) — **done**; Greek stays on
   δι/τρι/τετρα pending a source check.
3. v59.26 audit + v3 decisions — **done**: the decline audit checks host
   carbons and P-41 seniority, `naming.rule`/`naming.engine` are written, and
   the decisions above are recorded in `docs/SCHEMA-V3-PLAN.md`.
4. Next: schema files + v3 export + normalizer + structural validator (M1/M2/M4).
5. Quiz multi-chain (M2b) — verification only (pool matching already shipped),
   then the post-2013 algorithm as population.
6. Only then start the 154-molecule migration and the release generator.
