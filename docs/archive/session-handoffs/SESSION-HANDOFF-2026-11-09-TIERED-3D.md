# Session handoff — 2026-11-09 (v55 tiered-3D build + debug marathon)

> **Resume pointer (cross-machine):** HEAD `1cc02aa` (2026-11-09) — v55
> tiered draft 3D (`?v=55.0`, `index.html` → `mulermoc-nom-55.html`). 15 commits on top of `bfa9ce0`, all pushed-or-not:
> check `git log --oneline -16` + `git status` after pulling.
> Routine on the other machine: pull first, hard-reload the page
> (Ctrl+Shift+R — `?v=55.0` never changed, stale cache bites), then resume.
> OpenCode sessions stay machine-local.

## What this session did

Goal decided at start: give the app local 3D for novel molecules (no more
PubChem-3D gate blocking Accept), keep JSME for 2D, keep JSmol for 3D.

Shipped (all in v55, `?v=55.0`):
- `063b462` fork v55 + 3-tier draft 3D (PubChem SDF → CIR SDF → local UFF
  minimize), Accept ungated on any tier, `sdf3DSource` provenance everywhere.
- `2084ae0` tier-2 switched to JSmol `load $SMILES` (applet proxy-routed);
  direct CIR fetch retired (cactus.nci.nih.gov sends no CORS headers —
  browser-direct CIR is impossible, including the old `iupac_name` fallback).
- `290c1fa` `window.MULER_SKIP_REMOTE3D` console hook to test tier-3 online.
- Draft hardening along the way: `zap`-first loads (frame accumulation),
  `calculate hydrogens` (the `add hydrogens` command does not exist — silent
  whole-line killer), inline-SDF loader kept as the sink.
- `47e46fb` V2000 parser reads z (flat check resurrected; spread over heavy
  atoms only so H-noise can't fake 3D).
- `b4e7183` manual Minimize-3D button (shows on total tier miss) + always
  show the flat drawing in the 3D viewer.
- `3261b34` Accept lights on any-tier 3D (dropped the stale `d.pubchem`
  requirement in the bar state machine) + success toast.
- `7747bff` → `d0500cc` explicit-confirm, then OK-only save dialog
  ("Αποθηκεύστε την 3D διαμόρφωση..."): OK stores best-effort and unlocks
  Accept; ESC/backdrop = back out, stay locked. `jsmol-min` vs
  `jsmol-unminimized` provenance kept everywhere.
- `1cc02aa` fire-and-forget minimize + single delayed read-back (25 s, no
  scripts meanwhile), explicit MMFF-then-UFF, iterative re-minimize from the
  live model, no convergence requirement (partial descent counts).

## Key findings (why tier-3 took 10 rounds)

1. `scriptWait` + immediate read-back gets exactly 0.000 Å movement —
   follow-up scripts interrupt the in-flight minimize. Console-typed
   `select all; minimize steps 500;` converges (414 steps, E 45992→131).
   Fix: fire async, touch nothing, single delayed read. Verified working —
   auto tier-3 now yields optimized structure without the button (user
   confirmed: "Bravo!").
2. Translate-test proved `write MOL` the only live-model serializer
   (`molFile` returns an unparseable layout, `fileContents` is a stale
   dump). Battery = `write MOL` alone; load-verify checks live heavy count
   + matches-loaded ≈ 0.
3. Planar-saddle freeze (flat input → zero z-forces) + E=46000+ overlap
   divergence → pure-JS 2D untangle + z-jiggle (±0.3), both self-verifying
   (short-line MOLs used to come out unparseable — jiggle verifies parse +
   heavy count, falls back to input).
4. Movement is judged vs the pre-fire snapshot (`fMolDraftMeanDisplacement`,
   ≥ 0.05 Å) — jiggle noise alone can never pass.

## Current state / UX contract

- Tiers 1–2 (PubChem, NCI-via-JSmol) auto-accept silently as before.
- Tier-3 auto-attempts once per Submit (25 s undisturbed window); on miss
  the flat model shows + Minimize button (repeat presses continue from the
  live model). Minimize → OK dialog → Accept unlocks. Author judges the
  geometry; records stay honest (`jsmol-min` vs `jsmol-unminimized`).
- Naming engine untouched throughout (all changes are molview/iupac/lang).

## Open / next (NOT started — user said RDKit stays out for now)

1. "Minimizing… please wait" status message during the 25 s window
   (planned, agreed: set `molDraftStatus` to `draftMinimizing` at fire,
   restore "Preview: ‹name›" after; navigation mid-wait already guarded).
2. Browser 141 sweep + P3 blessing of Greek word forms (carried over).
3. RDKit.js spike for real offline 3D (deferred by owner decision).
4. `?v=55.0` never bumped — consider `?v=55.1` before any public link.

## Test recipe (home PC)

1. Pull, serve root (`python -m http.server`), open
   `mulermoc-nom-55.html` (?libs=local also works offline), hard-reload.
2. Novel drawing → Submit → tier-1 404 → tier-2 remote *or* skip-hook →
   tier-3 auto (watch `[SDF-3D]` console lines) → flat + button on miss.
3. Minimize → OK → Accept lights → Accept → save `.js` from Settings.
4. Console probes used during the session: `typeof fMolDraftManualMinimize`
   etc. for version check; `translate selected 0 0 5` + re-read for the
   live-vs-stale read-back test.
