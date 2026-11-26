# Schema v3 freeze — implementation plan (v59.26)

Status: **ready to implement** (2026-11-26). Current tree: v59.25.
Scope: the molecule record shape, the v3 JSON export, the v2 → v3 normalizer and
the validator skeleton. Runtime naming does not change in this batch.

Related: `docs/MOLECULE-DATA-ROADMAP.md` (record section, M1/M2/M2b),
`docs/new-molecules-upgrade-naming-algorithm.md` (test-molecule workflow).

## 1. Why v3

`schemaVersion: 2` (v59.23) is the flat legacy custom record plus a stamp. It
cannot represent the corpus needs that are now settled:

- all four mol blocks in one file (3 × 2D + 3D);
- several equivalent main chains per representation;
- different parent chains per naming rule era (school-pre-2013 vs iupac-2013);
- ethers, whose two arms decompose differently in the common and substitutive
  frames and whose labels have both a school and a systematic form.

## 2. Principle

**Store what cannot be recomputed; recompute what the current engine defines.**

| Stored (authoritative) | Derived (`derived` block) |
|---|---|
| 4 mol blocks, geometry | chains (ranked candidate pool) |
| `key`, `formula`, `inchiKey`, aliases | names per variant |
| `provenance` (author, proposedName, note, history) | name components / slots |
| `oracle` (GR/EN/SMILES inputs) | `classification`, SMILES |
| `naming` decline diagnostics (unrecoverable later) | |
| `ethers` (structural arms + both label sets) | |

`derived` is machine-written and engine-stamped, never read at runtime; the
validator regenerates it and requires a zero diff. The build fails if
`derived.engine` predates the core naming version.

## 3. Decisions (owner, 2026-11-26) — do not re-open

1. `derived` block lives **inside** each molecule JSON (Option A), not a
   separate golden file, so one molecule can be audited alone.
2. **No `teach.preferredChain`.** Display order is the engine's existing
   `fRankChainPool` + `fHorizontalEquivalentIndex`.
3. `naming` stays **per-molecule** with `naming.rule` (default
   `school-pre2013`); per-variant diagnostics only when a second rule era exists.
4. Rule eras are **string ids** (`school-pre2013`, `iupac-2013`), never booleans.
5. Atom indices in JSON are **1-based molfile numbers, carbons only**.
   (Runtime mixes 0-based fragments with 1-based chains; the loader converts.)
6. `quiz.parentRule` is a forward provision on scenario steps (default
   `school-pre2013`); no quiz logic changes in this batch.
7. 3D is **inline in the JSON source**; the release build may move it to a lazy
   chunk. JSON is the source; the closed build ships generated synchronous JS
   (Drupal contract: no `fetch()`).
8. Ethers are stored **per frame** (common = two arms; substitutive = parent +
   alkoxy); each arm carries `parentChain`, `attachLocant`, `substituents` and
   both label sets.
9. Greek multipliers stay `δι/τρι/τετρα` by owner decision (English only was
   updated in v59.25).

## 4. Record shape

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
    "engine": "v59.25",
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

Optional blocks appear only where applicable: `ethers` for ethers, `naming` for
engine declines, `derived.names` for supported variants.

`derived.chains` mirrors the runtime ranked pool
(`mainChainPool` / `mainChainPool3D`, fields `atoms/len/fg/fgCover/anchors/multi/dbl`,
index 0 = displayed). Scenario `chainIdx` already indexes this pool.

## 5. M1 — schema files

- [ ] `molecules/schema.json` (JSON Schema, draft 2020-12) for the shape above.
- [ ] `docs/MOLECULE-DATA-ROADMAP.md` record section stays the human reference.
- [ ] One hand-written sample (`molecules/samples/ethyl_isopropyl_ether.json`)
      — structure only, `derived` optional, validates.
- [ ] One synthetic `molecules/samples/synthetic-rule-era.json` whose
      `derived.chains["iupac-2013"]` deliberately differs from
      `school-pre2013`; it must validate **without** the 2013 algorithm.

Acceptance: a reviewer can read a molecule file and the schema without running
the app; both samples validate; the synthetic record proves the shape is
rule-agnostic.

## 6. M2 — export, normalizer, validator skeleton

Files:
- `js/mulermoc-nom-molview-59.js` — replace the v2 payload with a v3 builder
  (`fMolRecordV3(rec)`); keep the legacy `.js` save untouched.
- `js/mulermoc-nom-molview-59.js` — `fMolRecordV2ToV3(rec)` normalizer.
- `tools/muler-harness/validate-molecule.js` — node validator (one file or a
  folder), shared by the dev loader later.

Normalizer mapping (lossless):

| v2 | v3 |
|---|---|
| `structure2D_Condensed/_Expanded/_Skeletal` | `representations.*.mol` |
| `sdf3D` | `representations.threeD.mol` |
| `file3D` | `representations.threeD.file` (reference kept when no inline SDF) |
| `mainChain_Condensed` etc. | one-element candidate pool per representation |
| `grName`/`engineEN`/`slots`/`nameCheck` | `derived.names[0]` (engine stamp added) |
| `author`/`proposedName`/`authorNote`/`history` | `provenance` |
| `classification`/`smiles` | `derived.classification` / `derived.smiles` |
| `naming` | `naming` (+ `rule: "school-pre2013"` when absent) |

Bundle shape becomes
`{ "format": "mulermoc-molecule-bundle", "schemaVersion": 3, "molecules": {…} }`.

Validator checks (minimum):
- schema shape, duplicate keys in a folder/bundle;
- molfile parse (V2000), atom/bond counts, valence sanity;
- every chain index exists and is a carbon; chain is a simple path;
  primary index in range; `condensed` chain equals `expanded` chain;
- `formula` matches the molfile atom counts (with H);
- ethers: each `attachLocant` matches the atom inside `parentChain`;
- `derived.engine` present; regenerated `derived` diffs to zero (report only in
  v59.26, hard-fail from the release generator);
- `naming.status === "unsupported"` ⇒ `grName` empty and a decline reason present.

Acceptance: `node tools/muler-harness/validate-molecule.js <path>` validates one
file or a folder and reports pass/fail per file; a v2 record normalizes to v3 and
re-validates; `derived` regenerates to a zero diff on the sample.

## 7. Verification

```powershell
Get-ChildItem js\*-59.js | ForEach-Object { node --check $_.FullName }
git diff --check
cd tools\muler-harness
$env:MULER_BASE = "http://localhost:8901"
node probe-final.js
node probe-branch-quiz.js
```

Export/normalizer changes are data-only; if runtime naming is untouched, the
probe set is unchanged from v59.25. Do not run probes for the schema JSON/docs
alone.

## 8. Out of scope (next batches)

- quiz multi-chain acceptance (already shipped — verification only, M2b);
- the post-2013 algorithm (adds `iupac-2013` chains/names as population);
- migrating the 154 built-ins;
- the release generator and menu index.

## 9. Open questions

1. Does the closed release accept ~5 MB raw / ~1.3 MB gzip for 1000 molecules,
   or do we need chunked 2D loading as well?
2. `inchiKey` as the dedupe identity (needs the oracle at build time) — yes/no?
3. Store every variant name for all 1000 molecules, or only the UI-exposed
   variants and recompute the rest in dev?
4. Keep equivalent chains beyond the primary (recommended: yes) and store the
   ranking metadata (already in the shape)?
5. 3D split threshold for the release payload (per-molecule lazy vs one chunk).
