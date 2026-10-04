# Session notes — 2026-10-03 (resume point for next session)

Working baseline: **v43**, `index.html` → `mulermoc-nom-43.html`. Tree clean at `cb2460c`.
No JS runtime in the assistant environment — all changes were verified statically
(braces HEAD-identical, grep audits) + user browser click-throughs. Re-verify in
browser after any new change: all 3 modes, numbering, rule tables, menu grouping,
one scenario Save → Present → Next → Exit round-trip, Export/Import.

## Committed today (history order)

1. `3ddb1bf` T1–T3 hardening (behavior-identical): `js/state-43.js` (AppState +
   fStateGet/Set, the only `"use strict"` file), 39 leaked loop counters scoped,
   4× `eval` removed (64-row `MOL2D` registry in data file, `fInitData` lookup,
   `fScenarioG` 13-key whitelist with live values).
2. `b5cedd9` A+B scoping (behavior-identical): ~150 function temps scoped
   per-function across molview/teaching/core; `comp0` family/`theSuffix`/
   `guessNameObj` proven single-function (others use `"compN"` DOM-id strings);
   core owns `esterInfo`/`alkylSubstituentNames`; molview owns `myMol2D/myMol3D`;
   `currBond` double-writer split. Core file: 0 bare assignments. Remainder =
   writes to declared shared state (Phase C surface), params, false positives.
3. `cb2460c` Scenario stage: per-step `title` → page `#pageTitle` in present
   (restored on exit), `note` → `#scStepText` div below h1 (plain text,
   `show.text` default true; drawer textarea + checkbox; `noteFormat` reserved);
   `#menuCol` hidden wholesale in present (flex recenters); scenario CSS moved
   from `fScenarioInjectCss` to `css/mulermoc-nom-scenario-43.css` (injector deleted).
4. Docs: twofold+1 vision, LEARN-first layers, `docs/LAYERS-PLAN.md` (new source
   of truth), team P1–P6, embedded-static Drupal, research-primary logging,
   conditional EN Phase 5 (§8), `lang` reserved in schema/events.

Deliberately NOT done: global `"use strict"` in legacy files, AppState migration
(Phase C, before PRACTICE), molview split, 2D/3D de-dup, `*-42` removal, T4
(key/suffix normalization), T5 (chain smoke test).

## Queued work (not in docs unless noted)

### NEXT: JSmol scenario repair (S0–S4) — user takes first look at JSmol API
- **A1 verdict CONFIRMED by user's pasted JSON**: `fScenarioGetMoveto`'s
  `Jmol.getPropertyAsString(applet, …)` branch is wrong (property API, not script);
  JSmol returned a `getProperty ERROR … Options include: …` dump that starts with
  `moveto\t"`, passed the `^moveto` prefix check + 2048 limit, got stored, and
  fails silently on apply → "always loads the default". Prefix validation is
  proven insufficient by this exact string.
- User's working-copy one-liner (`"moveto"` → `"show moveto"` in
  `getPropertyAsString`) cannot help; S1 supersedes it (check if still uncommitted).
- S1: scriptWait-only capture + spin-off precondition + strict numeric moveto
  grammar + import-time quarantine of poisoned steps (flag `moveto: null`).
- S2: gate custom moveto + name-box click on confirmed model load AND
  `fFetchAndParse3D` completion, per-step token (fixes apply race + stale/missing
  3D highlights). Reference pattern: `fLoadMol3D` bundles moveto atomically.
- S3: normalize leading-space mode keys (`" compSecondSub1/2"`), real
  `jmol_isReady` handshake for deep links.
- S4: close didactic-plan §8 moveto-timing question + CHANGELOG.
- Open: A2 race vs B1/B2 highlight causes still need S0 probes + user's answers
  (drawer badges 3D✓/–, which steps lose highlights).

### Open-text justification questions (idea stage, P3/PRACTICE future)
- Stage 1: deterministic rubric checker in static app (stem sets, accent/case
  folding, required/forbidden logic, until-correct loop), offline, fully logged.
- Stage 2: Drupal teacher-review queue (labeled data + audit trail).
- Stage 3 (optional): Drupal-side LLM second-score; never in static app.
- Open questions for owner: formative-only vs scored/research stakes? offline-only
  pilot schools? P3-authored rubrics vs derived?

### EN upgrade: conditional Phase 5 (parked in LAYERS-PLAN §8) — after Greek pilot.

## Team & strategy (locked)
Twofold+1 (community tool + publications + isomerism/reactions platform).
LEARN-first: Greek pilot this year (LEARN → EXPLORE-lite → PRACTICE → PLAY),
EN only if accomplished. Team P1–P6 roles in README. Stats primary for research
(P2/P5/P6, EPAL vs Lyceum). AI: engineering accelerator with small reviewed
batches + browser gates; novelty lives in pedagogy + classroom evidence.

## Resume checklist for next session
1. `git log --oneline -5` + `git status` (expect clean at `cb2460c`).
2. Ask user: JSmol API findings? (`scriptWait("show moveto")` output shape,
   replay-after-`fSelectMol` behavior, model-loaded signal.)
3. Then build S1–S4 in order; browser-verify each.

## 2026-10-04 — S1–S4 implemented (no browser runtime here; click-through pending)

Built from the A1 verdict + code review, without waiting for S0 probes:

* S1 (`scenario-43.js`): `getPropertyAsString` branch deleted
  (scriptWait-only capture); strict numeric `moveto` grammar (letters other
  than e/E or non-numeric chars → `null`); import-time quarantine warns per
  step ("invalid 3D view discarded — re-capture with rotate off").
* S2 (`scenario-43.js` + 3-line guarded hook in `molview-43.js`
  `fFetchAndParse3D` → `window.fScenarioOn3DParsed`): per-step `applyToken`
  (rapid Prev/Next safe); custom camera at +400ms so the `fLoadMol3D` load
  batch wins; name-box click waits for 3D-parse completion (2s fallback);
  2D-only steps click immediately.
* S3 (`43.html` + `scenario-43.js`): `jmol_isReady` sets
  `window.JSmolReadyFlag`; deep-link boot waits (~12s fallback);
  `" compSecondSub*"` keys normalized on lookup/compare.
* Fixes: `zap` guard `!show2D` → `!show3D`; Exit restores menu `menu-open` +
  both viewers via transient clone (stored `show.*` untouched for Export).
* Docs: `didactic-scenario-plan.md` §8 closed, `CHANGELOG.md` Unreleased entry.

Verify in browser: all 3 modes, numbering, rule tables, menu grouping, one
scenario Save → Present → Next → Exit round-trip (custom camera survives,
highlights appear, exit restores menu-open + both viewers), Export/Import
round-trip incl. a poisoned-`moveto` file (warning + default view).

## 2026-10-04 (later) — ether/ester highlights + bond tweak + snapshot settings

All in `mulermoc-nom-43` set, uncommitted until the recap commit below.
No JS runtime here — static checks only (balance, grammar vs 64 data `moveto`s,
index-convention audits) + user browser click-throughs.

* Ether highlights (`molview-43.js`): COMMON alkyl clicks color C–C bonds green
  in 3D (new `fColorFragmentBonds3D`, batched single script); COMMON `αιθέρας`
  colors both C–O bonds (new `fGetEtherGroupFragment3D`); IUPAC alkoxy prefix
  highlights the full chain in 3D (was: attachment C only).
* Alkyl rule (generalized to esters): alkyl selections (COMMON alkyl, IUPAC
  alkoxy, ester alcohol part — CnH2n+1) highlight all C + connected H + C–C +
  C–H bonds in green on both viewers (`includeH` on `fHighlightAtomChain` /
  `fColorFragmentBonds3D`, ether-branch-local C–H in `fHighlightFG[3D]`);
  expanded 2D only, condensed/skeletal auto-no-op. `-ιο`/`αιθέρας` highlight
  bare C–O–C (no H) by design; ester triad untouched.
* Bond components (αν/εν/ιν): bonds-only highlight by default; new
  `Επισήμανση ατόμων δεσμών` checkbox (`#bondAtomsCheck`, default off) opts
  endpoint C atoms back in, with live re-apply (`molview` + `teaching-43.js`,
  row in `43.html`).
* Snapshots capture all settings: additive `styleHighlight`
  (`bondAtoms`, `numberingAtoms`, legacy-defaulted, no version bump);
  apply re-syncs `Έγχρωμα Σύμβολα` + atom/group radios from `style2D`;
  Present stashes author checkbox states, Exit restores them
  (`didactic-scenario-plan.md` §2).
* Exit fix: `fScenarioRestoreChrome()` clears inline `display` AND the
  `!important` `hide` class on all control bars + re-activates viewer buttons
  (`#radio2DMode`/`#controls3D` stayed hidden otherwise).
* Docs: CHANGELOG Unreleased entries, didactic-plan §2 notes.

Browser checklist for owner: expanded-mode alkyl C+H+bonds green (2D+3D),
bare C–O–C suffix, bonds-only αν/εν/ιν + checkbox, Save→Present→Exit with
flipped settings (applied in present, author states back on exit), legacy
scenario file loads with defaults.
