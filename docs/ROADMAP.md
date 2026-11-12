# Roadmap — next development (v55 working tree, 2026-11-12; v56 implements it)

Two workstreams, ordered by dependency. Status: UI entry + phase 1B done
(selection button, gating, 2D click capture + cyan overlay paint); 1C
(compare/validate) and workstream 2 pending. Harness (`muler-harness`,
Playwright + installed Chrome) is the verification vehicle for both.

---

## 1. Clickable 2D/3D molecules + validation against name components

**Goal:** the user clicks an atom or a bond (2D and 3D); the selection
highlights; Shift-click accumulates; the selection is stored in a variable
and can be compared/validated against a name component (main chain,
functional group, substituent, locants…).

### What exists today (no new research needed here)

- **2D overlay already knows atom identity.** The native-SVG overlay keeps
  `atomTextMap[atomIdx]`, `atomRectMap[atomIdx]` and `textNodeAtomIndexMap`
  (`molview-55.js:5253,5278,6074`), plus a `colorContext.atomIdx` channel
  used by the painters (`:5944–5963, :6234, :6263`). Bond lookup by atom
  pair exists: `fFindBondIndexByAtoms` (`:5299`). → 2D clicks bind on the
  app-owned SVG overlay, **not** inside the JSME depict applet (vendor
  code, do not touch).
- **Highlight painters exist and are quiet-flaggable**: `fHighlightAtomChain[3D]`,
  `fHighLightMainChain[Bonds]`, `fHighlightMultiBonds[3D]`,
  `fHighlightSingleBondsCC[3D]`, `fShowAnalysisNumbering` (`:11660–13105`,
  all `__mulerExplainQuiet`-aware). Reuse them; do not fork new paint code.
- **Component atom sets exist** as engine globals: `mainChainAtomsList`
  (+3D via `fTranslateChain2D3D`, `:10642`), FG fragments via
  `nameMainCompObj*` (`:9096, :11835`), branch groups
  (`fGetHydrocarbonBranchGroup`, `fDescribeCarbonBranches`). Validation =
  set comparison against these, not new analysis.
- **2D↔3D isomorphism map exists** (`fTranslateChain2D3D`, chain stepper,
  Edit-accept path all use it) — reuse for cross-viewer selection sync.
- Precedent for stored-highlight replay: scenario apply seeds stored mode
  before `fSelectMol` (sticky-selection work). Same pattern for replaying a
  user selection after viewer reloads.

### Phases

**1A — input spike (harness-verified, no UI yet).**
- 2D: delegated click listener on `#jsmeNomeclatureSVG`; resolve target →
  atom index via the existing node→index map (fallback: nearest
  `atomRectMap` rect); bond clicks resolve via the two endpoint atoms +
  `fFindBondIndexByAtoms`. Condensed-mode groups (`CH₃` = one shape):
  decide group semantics (select = all member atoms; record both the group
  and its atoms).
- 3D: verify which pick path the bundled JSmol honors (pick callback vs
  `show picked` read-back). If neither is reliable, fallback is click-ray
  via `getPropertyAsArray` — spike decides, do not guess.
- Deliverable: console-level proof — clicking logs `{viewer, kind, index}`.
  If JSMol picking is unavailable, STOP and replan (do not build 2D-only
  silently).

**1B — selection model + paint.**
- New global, e.g. `window.MulerUserSelection = { molKey, epoch, atoms2D: [],
  bonds2D: [], atoms3D: [], bonds3D: [] }`. Epoch = current `molText`/molKey:
  any molecule switch, Draw, or teardown invalidates (same epoch-guard
  discipline as the minimize pipeline).
- Plain click replaces, Shift-click accumulates, Esc / click-empty clears.
  Paint through the existing highlight painters (selection style must be
  visually distinct from component highlight — e.g. outline vs fill; owner
  picks the skin).
- Cross-viewer: selecting in 2D mirrors to 3D via the isomorphism map
  (heavy atoms; H follows its parent or is ignored — decide in 1A).
- Disabled in Present by default (authoring-only aid like eye-edit; the
  `QUIZ-FUTURE` hook is the natural later consumer).

**1C — compare/validate vs component.**
- Validator: order-insensitive set compare of selection vs the component's
  atom set (main chain / FG / branch / locant set), heavy-atom canonical.
  Verdicts: exact / subset / superset / partial (overlap %) / disjoint.
  Reuse the tri-state verdict control pattern (`draftVBtn`), not toasts.
- Entry point: with an active selection, clicking a name box (or a
  Validate button) runs the compare instead of only highlighting; result
  renders next to the explanation. Never auto-marks anything correct —
  same standing as the oracle verdicts (display only).

### Risks / open calls (owner)

- JSmol picking API uncertainty → spike first (1A gate).
- Condensed-group semantics (group vs atoms) — propose: store both.
- H handling in selections and in compare (H = part of parent vs own pick).
- Present mode: authoring-only, or read-only quiz consumer later?

### Acceptance

- Click atom/bond in each 2D mode + 3D → highlight + selection var updates;
  Shift accumulates; Esc clears; molecule switch invalidates.
- Validate vs main chain on 3 molecules: exact, subset, disjoint → correct
  verdicts; oracle/eye/narration flows untouched (`node --check` + harness
  matrix incl. EN + collapsed rail).

---

## 2. Data-structure decision (one file vs per-molecule; redundant vs derived)

### Current state (measured, not assumed)

- **Stored 141 = minimal:** per key only `formula` + `mainChain_*` (+`mainChain3D`)
  (`jsme-nick-nomeclature-moc2-data_55.js`); MOL text lives in the `MOL2D`
  map in the same file; 3D SDF in `mols/<key>_3D.sdf`.
- **Customs = rich snapshot:** `MULERMOC_*_data.js` files merge via
  `window.nameExamplesCustom` → boot-folded into `nameExamples`
  (`molview-55.js:462`), carrying slots, SMILES, classification, verdicts,
  history, `sdf3DSource` (+ MOLs/SDF — verify exact embedding when
  implementing).
- So today both philosophies already coexist, split by provenance. The
  question is which one wins going forward.

### Options

- **A. One file for all.** Single source, single diff to review; but the
  file is already ~MB-scale, Accept-time rewrites risk conflicts, and
  per-molecule history gets noisy.
- **B. One file per molecule (status-quo direction).** Matches the custom
  flow; boot merge already works (`Object.assign`, stored keys win);
  pain point is manual `<script>` registration per file (noted in
  `mulermoc-nom-55.html`) → needs a manifest/registry, not more tags.
- **C. Normalized core + derived cache.** Store only non-derivable facts
  (MOLs, SMILES, CID, verdicts, history, `sdf3D(+Source)`); recompute
  slots/names at boot via the engine (single source of truth) with a
  freshness/version stamp to detect engine drift. Kills redundancy
  (slots duplicating engine output), costs boot time, loses frozen
  eval-data unless predictions are snapshotted separately.

### Recommendation (for owner decision)

Keep **B for layout** (per-molecule files; add a manifest so registration
is one line) with **C for content**: custom files store non-derivable
facts only and recompute derivations at boot, stamped with the engine
version. Stored 141 stay minimal; migrate them only if the manifest work
forces it. Backfill/verify with a headless pass over all keys (slots and
names byte-identical before/after, same discipline as the v54.23 no-op
proofs).

### Open questions (owner)

1. Does any downstream flow (eval tables, REVIEW docs) rely on stored
   *predictions* as frozen data, or can they be recomputed?
2. Boot-cost tolerance offline (141 × engine pass) vs frozen-snapshot speed?
3. Who hand-edits data files — do we need human-diffable MOL sections?
4. Point-1 interplay: should user selections/validation verdicts persist
   into molecule records (schema impact), or stay session-only?

### Sequencing with workstream 1

Independent except 1C persistence (Q4). Suggested order: 1A spike and the
Q1–Q4 decisions in parallel → manifest + normalization → 1B/1C on the
settled schema. Do not let 1B invent a second selection-persistence
format before Q4 is answered.

---

## Verification standard (both workstreams)

`node --check` on touched files; harness matrix (GR/EN × 1500/1100,
drawer open, collapsed rail) with screenshots for visual changes;
headless byte-identical proofs for any data migration; CHANGELOG +
SESSION-NOTES entries per batch, following repo convention.
