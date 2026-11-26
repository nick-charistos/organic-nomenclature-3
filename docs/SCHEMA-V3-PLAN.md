# Schema v3 freeze — implementation plan (v59.29)

Status: **decisions locked; audit semantics fixed** (2026-11-26). Current tree:
v59.29. Scope: the molecule record shape, the v3 JSON export, the v2 → v3
normalizer and the validator skeleton. Runtime naming does not change in this
batch.

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
| 4 mol blocks + per-representation `source` | chains (ranked candidate pool) |
| `key`, `formula` (menu structural label), aliases, optional `inchiKey` | names per variant (+ `representation`) |
| `provenance` (author, proposedName, note, status, **verdicts**, history) | name components / slots |
| `oracle` (PubChem / OpenClatura / identity inputs) | `classification`, `smiles`, `molecularFormula` |
| `naming` decline diagnostics (unrecoverable later) | |
| `ethers` (structural arms only — no label text) | ether label text |
| `reference.chains` (hand-verified expectation) | |

**Two chain layers.** `reference.chains` is the hand-verified expectation from
the pre-algorithm data (the 154 built-ins, including the hand-checked C14 tie).
`derived.chains` is the engine's current ranked pool, stamped with
`derived.engine`. The verification check is
`derived.chains[rule][rep][0].atoms === reference.chains[rep]`. A diff is a
**finding for review**, not automatically a failure: the engine is expected to
change when the algorithm is upgraded. `--bless` re-stamps `reference` with a
history entry. `reference` is optional (absent on app-accepted molecules and
test molecules).

`derived` is machine-written and engine-stamped, never read at runtime. The
release generator ships the current engine's output; the validator compares it to
`reference` (same-engine diff = failure, engine-version diff = report).

## 3. Decisions (owner, 2026-11-26) — do not re-open

1. `derived` block lives **inside** each molecule JSON (Option A), not a
   separate golden file, so one molecule can be audited alone.
2. **No `teach.preferredChain`.** Display order is the engine's existing
   `fRankChainPool` + `fHorizontalEquivalentIndex`.
3. `naming` stays **per-molecule** with `naming.rule` (default
   `school-pre2013`); per-variant diagnostics only when a second rule era exists.
4. Rule eras are **string ids** (`school-pre2013`, `iupac-2013`), never booleans.
5. Atom indices in JSON are **1-based molfile numbers**; chain and ether
   descriptors are carbons only (diagnostic arrays may include heteroatoms —
   see decision 19). (Runtime mixes 0-based fragments with 1-based chains; the
   loader converts.)
6. `quiz.parentRule` is a forward provision on scenario steps (default
   `school-pre2013`); no quiz logic changes in this batch.
7. 3D is **inline in the JSON source**; the release build may move it to a lazy
   chunk. JSON is the source; the closed build ships generated synchronous JS
   (Drupal contract: no `fetch()`).
8. Ethers are stored **per frame** (common = two arms; substitutive = parent +
   alkoxy); each arm carries `parentChain`, `attachLocant` and `substituents`.
   Labels are derived (decision 13).
9. Greek multipliers stay `δι/τρι/τετρα` by owner decision (English only was
   updated in v59.25).
10. **Human verdicts are stored**, not derived: `provenance.verdicts`
    (`gr`, `en`, `enAutoValidated`, `enAutoSource`). They are labeled eval data
    and cannot be regenerated.
11. **`formula` is the menu structural label** (`CH3CH2CH3`), not a Hill
    formula. Hill is `derived.molecularFormula` and is what the validator
    checks against the molfile.
12. **`oracle` holds external inputs only** — `pubchem`
    (`cid/iupac/title/systematic`), `openclatura` (`name/opsin/done`),
    `identity` (`smiles/canonicalSmiles`). Engine names never live there.
13. **`ethers` stores the structural decomposition only** (role, atoms, parent
    chain, attach locant, substituents, `symmetric`). Arm label text is engine
    output and lives in `derived.names` (+ optional `derived.ethers`).
14. **Two chain layers** (see §2): `reference.chains` hand-verified, stored;
    `derived.chains` engine snapshot. Diff semantics below.
15. **Menu-only precompute.** The closed app precomputes the menu index (names,
    classification, carbon count, formula, search string, thumbnail) and chains;
    the naming engine still runs on selection for the panel, explain, stepper
    and quiz targets. No `derived.slots`/`explain`/`quizTargets` cache.
16. `derived.names[]` records its `representation` (`condensed` today) so the
    `chain` index is unambiguous (2D and 3D pools use different atom numbers).
17. `provenance.status` is `draft | candidate | verified` (maps to
    `incoming/` vs `builtin/`). `inchiKey` is optional (no InChI in the app;
    dedupe by canonical SMILES + CID); `aliases` is stored when authored.
18. **Validation is split:** a pure-Node structural validator (schema, molfile,
    valence, chains, formula, ethers) and a Playwright naming audit that
    regenerates `derived`. Derived regeneration cannot run in plain Node — the
    engine needs the JSME applet.
19. Atom indices: chains and ether descriptors are **1-based, carbons only**;
    `naming.features[].atoms` / `snapshot.branchCarbons` are 1-based and may
    include heteroatoms (documented per field).
20. `condensedZigZag` is a **view alias of `skeletal`**, never a fourth stored
    2D block.

## 4. Record shape

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
    "status": "unsupported",
    "rule": "school-pre2013",
    "engine": "v59.29",
    "reason": "C-C triple bond off main chain",
    "callSite": "mulermoc-nom-core-59.js:3841",
    "frame": "…",
    "at": "2026-11-26T…Z",
    "features": [ … ],
    "snapshot": { "…": "…", "mainChain": [1,2,3,4,5] }
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

Optional blocks appear only where applicable: `reference` (hand-verified
built-ins only), `ethers` for ethers, `naming` for engine declines,
`representations.threeD` when a 3D model exists, `derived.ethers` when per-arm
audit labels are wanted.

`derived.chains` mirrors the runtime ranked pool
(`mainChainPool` / `mainChainPool3D`, fields `atoms/len/fg/fgCover/anchors/multi/dbl`,
index 0 = displayed). Scenario `chainIdx` already indexes this pool.
`reference.chains` is the hand-verified expectation (one path per
representation) that index 0 is compared against.

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

Normalizer mapping (explicit — no silent drops):

| v2 | v3 |
|---|---|
| `structure2D_Condensed/_Expanded/_Skeletal` | `representations.*.mol` (`source: "drawn\|jsme\|normalized"`) |
| `sdf3D` | `representations.threeD.mol` |
| `sdf3DSource` | `representations.threeD.source` |
| `file3D` | `representations.threeD.file` (kept when no inline SDF) |
| `mainChain_Condensed/_Expanded/_Skeletal` | `reference.chains["school-pre2013"][rep]` **and** one-element `derived.chains[…]` |
| `mainChain3D` | `reference.chains["school-pre2013"].threeD` |
| `grName` / `engineEN` / `slots` | `derived.names[]` (`gr` / `en` entries, engine stamp added) |
| `engineDelegated` | `derived.names[].delegated` |
| `nameCheck` | **`provenance.verdicts`** (human data, never `derived`) |
| `author`/`proposedName`/`authorNote`/`history`/`status` | `provenance` |
| `systematicEN` / `iupacPubchem` / `titlePubchem` | `oracle.pubchem.*` |
| `openclaturaEN` / `openclaturaOpsin` / `openclaturaDone` | `oracle.openclatura.*` |
| `pubchemCID` | `oracle.pubchem.cid` |
| `smiles` / `canonicalSmiles` | `oracle.identity.*` (and `derived.smiles` from the engine) |
| `classification` | `derived.classification` |
| `formula` | `formula` (menu structural label, verbatim) |
| `naming` | `naming` (+ `rule`/`engine` when absent) |
| — | `derived.molecularFormula` (Hill, computed) |

Bundle shape becomes
`{ "format": "mulermoc-molecule-bundle", "schemaVersion": 3, "engine": "v59.29",
   "generatedAt": "…", "count": N, "molecules": {…} }`.

Validator checks (minimum):
- schema shape, duplicate keys in a folder/bundle;
- molfile parse (V2000), atom/bond counts, valence sanity;
- every chain index exists and is a carbon; chain is a simple path;
  primary index in range; `condensed` chain equals `expanded` chain;
- `derived.molecularFormula` matches the molfile atom counts with H —
  **not** `formula`, which is the display label;
- `reference.chains[rule][rep]` equals `derived.chains[rule][rep][0].atoms`
  when `derived.engine` equals the core version; a diff is **reported** (not a
  failure) when the engine version changed; `--bless` re-stamps `reference`;
- ethers: each `attachLocant` matches the atom inside `parentChain`, and no
  stored label text exists in `ethers`;
- `derived.engine` present and not newer than the core version;
- `naming.status === "unsupported"` ⇒ `grName` empty, decline reason present,
  `naming.rule`/`naming.engine` present.

Acceptance: `node tools/muler-harness/validate-molecule.js <path>` validates one
file or a folder and reports pass/fail per file; a v2 record normalizes to v3 and
re-validates; on the sample, `derived.chains[0]` equals `reference` at the same
engine version (full `derived` regeneration is the Playwright audit, not this
script).

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
probe set is unchanged from v59.29. Do not run probes for the schema JSON/docs
alone.

## 8. Out of scope (next batches)

- quiz multi-chain acceptance (already shipped — verification only, M2b);
- the post-2013 algorithm (adds `iupac-2013` chains/names as population);
- migrating the 154 built-ins;
- the release generator and menu index.

## 9. Open questions

1. Does the closed release accept ~5 MB raw / ~1.3 MB gzip for 1000 molecules,
   or do we need chunked 2D loading as well?
2. ~~`inchiKey` as dedupe identity~~ — **closed**: optional field, no InChI in
   the app; dedupe by canonical SMILES + CID.
3. Store every variant name for all 1000 molecules, or only the UI-exposed
   variants and recompute the rest in dev? (Menu index needs only the display
   set: school GR/EN, systematic GR/EN, PIN.)
4. ~~Equivalent chains beyond the primary~~ — **closed**: yes, the ranked pool
   is `derived.chains`; `reference` keeps the hand-verified primary.
5. 3D split threshold for the release payload (per-molecule lazy vs one chunk).
6. Menu thumbnail chunking: one `menu-thumbs-60.js` vs per-group chunks (size
   dominates the menu payload, not the names).
