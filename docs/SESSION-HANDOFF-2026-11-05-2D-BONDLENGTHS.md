# Session handoff — 2026-11-05 — 2D bond lengths, draft slot contract, pixel equalizer (v54 working copy)

> **SUPERSEDED 2026-11-06: live is `5d40ebe ?v=54.16`. Do not resume from here — see `docs/SESSION-NOTES.md` 2026-11-06 entries + `docs/DATA-PHASE-PLAN.md` + `docs/CHANGELOG.md [v54]`. Collision-aware H placement + splay below shipped in `3126c93` (`?v=54.12`).**

> **Status: BUILT, HEADLESS-VERIFIED, COMMITTED (`d6513f0`, pushed). Browser
> click-through pending (owner).**
> `index.html` → `mulermoc-nom-54.html`. Cache-busters `?v=54.6`. Vars `MOLGEN_CC_LEN = 1.0`,
> `MOLGEN_CH_LEN = 0.5` (owner values — exact half ratio).

## 1. Repository state (read this first on the other machine)

- Branch: `main`. Committed + pushed as `d6513f0` (this doc) + pointer update.
  Tree clean at push time.
  - `js/mulermoc-nom-core-54.js` — bond vars + wiring
  - `js/mulermoc-nom-molview-54.js` — slot contract, fork confirm, bar hints, equalizer,
    owner applet-option edits
  - `js/mulermoc-nom-scenario-54.js` — 2 scale sites routed through equalizer
  - `js/mulermoc-nom-lang-54.js` — 6 draft keys
  - `mulermoc-nom-54.html` — `?v=54.6` (13 refs)
  - `docs/CHANGELOG.md`, `docs/SESSION-NOTES.md`, `docs/STAGE2-AUTHORING-54.md`,
    `docs/REVIEW-EN-53.md`, `docs/TEACHER-GUIDE-EN-53.md`
- **To continue elsewhere: commit + push HERE first** (say the word), then pull there,
  hard reload (`Ctrl+F5`, DevTools cache off — stale JS wasted a full debug round this session).

## 2. What was built

- **Bond vars** (`core-54.js`, hardcoded): `MOLGEN_CC_LEN` (heavy–heavy, linearizer/zigzag)
  + `MOLGEN_CH_LEN` (H top-up). Stored MOLs obey exactly (measured).
- **New radio-free**: New ignores the 2D radio (full triple generation; heavy skeleton
  linearized at Accept through CC). Edit honors the radio as source-slot selector.
- **Edit single-slot update**: same-molecule redraw rewrites only the edited slot
  (`updated-slot:<variant>` history; skeletal always via ladder, never verbatim).
  Different-molecule Edit asks via `fScenarioConfirm` fork dialog (stored source untouched).
- **Draft bar states the contract** at entry (slot-only / all-views hints) + preview
  (same/different-molecule hint). 6 new lang keys.
- **Per-mode C–C pixel equalizer**: `fMol2DModeScaleFactor()` (= meanAll/meanHeavy of the
  loaded MOL) + `fMol2DModeScale()`/`fApplyMol2DScale()`; display scale writes in
  `fLoadMol2D`, `fReapplyZoomScale2D`, both scenario apply sites route through it.
  User zoom stays in `molZoom2D`; nothing stored. Edit-applet/draft writes excluded.
- **Owner manual edits (kept)**: display applet dropped `depictaction`+`canonize`;
  edit applet dropped `autonumber`+`canonize`. Net effect: JSME no longer reorders atoms
  on input — chain-index mapping prefers this; watch index-related behavior.

## 3. Hard findings (all console-measured, `lens()` bond tables)

1. Stored MOLs obey the vars exactly (0.17/0.10/1.00 CC measured; H at CH).
2. JSME rescales every loaded MOL by whole-input bond statistics — **both applets,
   depict on AND off** (depict removed at construction + cache-cleared reload, behavior
   unchanged; highlights still work, so the v52 "depict needed" comment is stale).
   Uniform MOLs render 1.40 at any stored scale (0.10/0.825/1.00/1.17 all → 1.40).
   Mixed heavy+H MOLs inflate (expanded 2.17–2.36). Ratios survive exactly.
3. Consequence: absolute CC can never show live; cross-view C–C pixel equality is
   impossible from MOLs alone (different mixes normalize differently) — the equalizer
   (§2) compensates per-view zoom instead. Headless proof: all expanded cases → 1.40.
4. H–H overlap sweep (141 regen-expanded MOLs, CH=0.5): worst 0.170 (3 complex branched
   offenders); 0.55–0.78 worse (down to 0.004). Stored hand layouts clean (0.321).
   Residual collisions are bisection *placement*, not length — no HLEN clears them.
5. Stored scales vary across the 141 (0.82–4.095, hand-spaced branches); normalization
   has papered it over into uniform 1.40 for years.
6. Yannis branch (thesis-work): same JSME bundle (identical `.cache.js` names), so same
   behavior. His 0.6188/0.3094 policy (30/10–1/11, 127 forms) works via ratio 0.5 —
   same mechanism as ours. Our imports predate it (26–28/10); sync question open.

## 4. Pending browser checks (owner)

- Condensed vs expanded C–C pixels per molecule (expect equal now), incl. a branched case.
- Zoom ± keeps equality; mode switch keeps zoom; Save→Present→Exit round-trip.
- Edit single-slot update (siblings byte-untouched); fork dialog on redrawn-different.
- Draft bar hints GR/EN. `?v=54.6` hard reload first.

## 5. Open threads (not started)

- Collision-aware H placement (nudge new H within threshold) — real fix for §3.4;
  verifiable with the `hh-overlap-check.js` harness pattern.
- Stale comments/docs: "depict needed for highlights" (`molview-54.js:334`, v52 CHANGELOG).
- Yannis 127-form uniform-policy sync (adopt 0.6188/0.3094 vs keep 1.17-based?).
- Custom renderer only if live absolute CC ever matters (expensive; not recommended).
