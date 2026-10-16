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

## 2026-10-04 (later) — per-step menu subsets (tagged `pre-menu-subset`)

Revert: `git revert` the feature commit (safe after push), or
`git reset --hard pre-menu-subset` (local only, never after push); legacy
behavior is also the data default (empty subset + `menu:false`).

* Authoring (`teaching-43.js` + `scenario-43.js` + CSS): Pick toggle in the
  menu title; row checkboxes + tri-state group boxes (guarded hooks only —
  row/group clicks ignore checkbox targets); live pick, per-step copy on
  Save, drawer Menu checkbox (default on iff pick non-empty); pick-mode off
  clears the pick with a toast; Export carries subsets, Import restores them.
* Playback: `fScenarioGo`/hash/deep-link apply the step filter (hidden rows +
  emptied groups, `menuCol` iff `show.menu`); menu stays browsable; grouping
  switch re-filters via the render hook; pick UI stripped in present.
* Validate: unknown molecules dropped with warnings; step molecule always
  auto-included (never a dead step). Exit removes the filter.
* Docs: `didactic-scenario-plan.md` §2/§4/§9, CHANGELOG entry.

Browser checklist for owner: pick molecules + a group → Save 2 steps with
different subsets → Present → per-step filtered browsable menus, tri-state
behavior, grouping switch mid-present, Menu-off step hides menuCol,
Exit restores full menu + pick UI state, Export/Import round-trip, legacy
file (no `menuSubset`) presents menu-free as before.

## 2026-10-04 (later) — present menu goes flat (supersedes filter above)

* `fScenarioRenderPresentMenu()` replaces row-hiding: flat per-step list,
  local 1..N counter (never the dataset-global numbering), no headers, no
  grouping switcher, no checkboxes; row clicks browse freely.
* Exit calls `fScenarioRestoreAuthorMenu()` (fresh `fInitNomeclatureMenu()` +
  re-mark selection) instead of un-hiding rows. `fScenarioApplyMenuFilter` /
  `fScenarioClearMenuFilter` deleted (no dangling refs).

Browser checklist for owner: menu step shows flat 1..N list; clicks browse;
Next keeps sequence; grouping switch unreachable in present by design;
Exit → full author menu back with pick UI intact.

## 2026-10-04 (later) — menu-only steps + pick/selection coupling (uncommitted)

* Capture with a pick but no selection saves (`selectedMol: null`,
  title `"menu"`, name mode/camera neutralized); needs pick non-empty,
  else the old "select a molecule…" toast (now "…or pick molecules").
* Present deselects first (`fDeselectMol`: empty viewers, no previous
  molecule lingering), then applies chrome + flat menu. Validation: null
  mol ok iff subset non-empty + `show.menu`; otherwise skipped with a warning.
* Coupling (authoring, pick mode only): row click selects + picks
  (`fScenarioPickOnSelect` guarded hook in teaching layer); unchecking
  the selected row/group box calls `fDeselectMol` (viewers empty).

Browser checklist for owner: pick mode → click row (selects + checks);
uncheck selected row (deselects, viewers empty); group uncheck with
selection inside (same); Save with pick + nothing selected → `"menu"`
step; Present menu-only step (flat menu, empty viewers); mixed
Next/Prev; Export/Import round-trip; legacy files unchanged.

## 2026-10-04 (later) — drawer chrome checkboxes (uncommitted)

* Per-step `Text, Menu, 2D controls, 3D controls, Name controls,
  Name interact` (`fScenarioRenderList`). Controls boxes disabled unless
  that step's viewer is visible (dimmed + tooltip); all four default
  unchecked. `Name interact` = new `show.nameClick` (absent = allowed;
  capture stores `false`): locked steps skip the auto-highlight
  (`fScenarioClickNameBox` guard incl. S2 gate + fallback) and block
  mouse clicks (`#nameAnalysisContainer.locked` + `pointer-events:none`).
  Exit clears the lock via the normal apply/chrome path.

Browser checklist for owner: new step → four unchecked; check 2D/3D
controls → bars appear in Present; viewer-off step → disabled boxes;
Name controls → gear appears; Name interact off → no box response and
no auto-highlight, on → as today; legacy file → clicks work;
Export/Import preserves flags.

## 2026-10-04 (later) — step-1 start trust (uncommitted, bug not reproduced)

* Symptom (unconfirmed): Present shows the live view instead of step 1.
  Prime suspect: accidental menu-only step 1 via unpick→deselect coupling
  (the menu-only branch skipped the molecule load, leaving viewers stale);
  second suspect: silent apply failure (`!ready`) with chrome flipped anyway.
* Fixes: drawer molecule badge per step (`selectedMol` or `menu-only`) +
  distinct menu-only Save toast (cause visible); Present/Go/hashchange
  honor `fScenarioApply`'s result — toast + abort instead of a stale view.

## 2026-10-04 (later) — menu-only deselect fix (uncommitted, owner found it)

* Menu-only apply called `fDeselectMol()` first: empty viewers, no previous
  molecule lingering; naming hint hidden for molecule-less steps even when
  interaction is allowed. Molecule steps unchanged (direct load, no flicker).

## 2026-10-04 (later) — authoring tab (uncommitted)

* `Σενάρια` right-edge tab (vertical text + ✎ + left tooltip) gates the
  author bar, drawer, and Pick checkbox (`authoring` flag, default off;
  scratch kept on toggle-off; tab hidden in present).

Browser checklist for owner: fresh load shows clean view + tab only;
toggle → bar/drawer; Pick only then; full Save→Present→Exit round-trip;
toggle off mid-pick (boxes gone, scratch kept); Present hides tab, Exit
restores it; narrow widths unaffected.

## 2026-10-04 (later) — authoring slide animation (uncommitted)

* Bar + drawer toggle via `.open` slide transitions (bar 0s, drawer
  .06s stagger; hidden = translated out + `visibility`/`pointer-events`
  safe; `prefers-reduced-motion` off switch). Inline `display` removed
  from both (it would beat the classes). Drawer no longer force-opens:
  Steps owns opening; hiding paths only remove `.open`.
* Follow-up hardening: sync + creation clear inline `display` every run,
  so classes stay the sole authority (no snap possible from stale markup).
* Owner panel restyle (same batch): navy 510px author panel with
  `Σενάριο Παρουσίασης` title header + light button panel, `Play ▶`
  (was `Present ▶`), matching drawer, `.stepNumber` badges, lightBlue
  `.sshow` checkboxes, `border-box` throughout, row separators from
  step 2 on.
* Author-bar buttons follow the `.settingsBtn` states (`transition`,
  darkEarth/white hover; stateful `#scList.active` = navy/white
  while the drawer is open, reset via the sync helper).

Browser checklist for owner: tab toggle slides bar; Steps slides drawer
staggered; toggle off / Present entry slides both out; tab slides/fades
out on Present entry (no `display:none` snap — hard-reload if it snaps,
then check OS reduce-motion); Exit restores bar only; reduced-motion;
no focus/keyboard traps; panel edges align flush right.

Browser checklist for owner: tab toggle slides bar; Steps slides drawer
staggered; toggle off / Present entry slides both out; tab slides/fades
out on Present entry (no `display:none` snap); Exit restores bar only;
reduced-motion; no focus/keyboard traps.

## 2026-10-04 (later) — stored control selections applied (uncommitted)

* New `fScenarioSyncControlUi()`: bars mirror restored globals (2D mode
  radios, color checkbox + atom/group radios, 3D checkboxes, dropdown
  label). Molecule path runs it post-load; menu-only assigns display
  prefs (no viewer load) and runs it too. Storage already complete.

Browser checklist for owner: set bars (e.g. expanded + sticks + no-spin
+ group colors) → Save → change everything live → Present shows step
values on bars and viewers; toggle a bar in present works from shown
state; menu-only step with bars on matches step values, viewers empty.

Browser checklist for owner: badge per row; menu-only save toast; break
nothing in normal Present/Prev/Next/Go/deep-link flows; if the stale-view
symptom recurs, report the badge + play-bar title vs viewers.

## 2026-10-05 — multi-scenario builder day-batch (uncommitted until recap commit)

All in `mulermoc-nom-43` set. No JS runtime here — static checks only
(braces/parens balanced, selector audits) + owner browser click-throughs.

* Multi-scenario architecture (`scenario-43.js`): `scenarios[]` +
  `activeId`/`presentId` + `seq`; `fScenarioActive/Get/SetActive/New/
  Delete/Present/PanelFor`; legacy `steps/title/index/menuPick` mirror
  the active card. Bar is a global shell (title + `+ New`/`Import`,
  Import adds a card); each `.scenarioPanel[data-scenario-id]` has its
  own Save/Steps/Export/Play panel (no Import) + in-flow drawer;
  per-card Export (v1 schema unchanged), delete + title rename.
* Single column + scroll: bar `nowrap`/`stretch`, panels `flex: 0 0 auto`
  (no-shrink — `overflow:hidden` had zeroed their min-size so they
  collapsed instead of scrolling), `#scenarioPanels` scrolls under 85vh.
* Accordion drawers (one open at a time); drawer header prefixed with
  the live scenario name (`.scStepsName`, `textContent`-escaped).
* Step rows: type-only badge (`molecule`/`menu` by `show.menu`, key in
  tooltip, `.is-menu` tint); step title gets `scStepTitle` class +
  persistent `Τίτλος βήματος` label above (placeholder alone was
  invisible — new steps pre-fill the title); `Text` checkbox removed
  (heading + text auto iff title or note; legacy `show.text` ignored);
  3D badge + per-step re-capture removed (JSmol `moveto` broken;
  schema/capture/validation kept for the fix).
* Notes: safe `<b>`/`<sup>`/`<sub>` subset via `fScenarioRenderNote()`
  (escape-all then whitelist, no attributes); both playback points
  (`#scStepText`, play-bar note); textarea stays raw.
* Tab-as-handle: first child of the bar (`40px`, `left:-40px`, `top:0`);
  bar closes fully off-screen (`translateX(100%)`, shadow off);
  authoring-off defers drawer/pick teardown past the slide
  (`skipDrawers`, 260ms). Owner CSS tweaks kept: bar `top:50px`,
  light panels, 2px borders, title fonts, `h1 margin-top` removed.
* Keys: `←`/`→` walk present steps (clamped, `preventDefault`),
  `ESC` exits via extracted `fScenarioExitPresent()` (shared with the
  Exit button); modifiers + typing focus ignored; key-hint tooltips on
  Prev/Next/Exit. Play-bar restyle (lightBlue, centered, Exit pinned
  right, snote rule retired).
* Docs: CHANGELOG Unreleased entries, didactic-plan §2/§3/§4/§9,
  README authoring flow; `fScenarioPositionDrawer()` retired (no-op).
* OPEN BUG (carried): tab-toggle close snaps (bar vanishes instantly)
  while the Play close glides — same class op, same rules, no
  interference found; compensation-snap + same-frame-churn theories
  both falsified by experiment. Next: console triplets
  (className + computed transform/transition before/mid/after, toggle
  vs Play) to see where they diverge; fallback is WAAPI-driven close.
  Repro: hard-reloaded, toggle-off only, drawers/picks vary.

Browser checklist for owner: New → 2+ panels → Save steps in each →
Steps accordion per drawer → Export per card → Import adds panel →
Play/Prev/Next/Exit per active → `?scenario&present` deep link;
toggle-off glide vs Play glide comparison for the open bug.

## 2026-10-05 (later) — polish batch-2 (builder UX details)

* Drawer follows the card (`fScenarioOpenDrawer()`): panel-background
  click or Save opens it (controls guarded out), Steps on the open card
  shuts everything; single shared path with the accordion.
* Badge housed in new `.scStepNumberWrap` under the step number
  (stray `</span>` removed); owner translated labels to `Μενού`/`Μόριο`.
* Positional `S1`/`S2`/… header counter (index-based, gap-free;
  internal ids untouched); `.is-empty` flags on card/count/Steps at 0
  steps (owner dimmed only the count, left card/button unstyled).
* New-step titles default to the live Greek IUPAC name (staleness
  guard: loaded molecule must match; key fallback, `"menu"` menu-only).
* OPEN BUG still carried (close snap, diagnostics + WAAPI fallback
  queued — see above).

## 2026-10-06 — presentation fixes (dup-HTML, menu hint, naming flash)

* `mulermoc-nom-43.html` dedup (committed `49aead3`): stray `>` + second
  `<head><body>` copy deleted (707 → 352 lines); single `pageContainer` /
  applet init. Root cause of `2D-only → 2D+3D` saving as 3D-only
  (duplicate IDs desynced `fScenarioViewerOn` capture from the clicked
  buttons). Owner verified fixed after hard reload.
* Menu-only `#nameAnalysisExplain` follows the lock (`scenario-43.js`,
  `teaching-43.js`): step-apply hide narrowed to `locked`-only, plus new
  guarded `fScenarioOnPresentBrowse()` on flat-menu clicks (free browse
  rebuilds boxes via `fSelectMol()` but the inline hide persisted).
  Interact-on shows the hint on entry + after browsing; locked stays
  hidden. Plan §2 wording updated; CHANGELOG entries added.
* Naming-controls no-flash (`scenario-43.js`): `fScenarioApply` forces
  `nameSettingsFlag = false` pre-load when `show.nameSettings !== true`
  in present, so the rebuilt panel renders closed (was: open then
  `fScenarioChrome` closed it with a visible fade).

Browser checklist for owner: menu-only interact-on (hint on entry +
after row click, clicks explain; locked hides); naming-off step entry
(gear/panel/voice off first frame, no fade; naming-on unchanged);
rapid Prev/Next on/off steps; Exit restores author panel.

## 2026-10-07 — naming-chrome reassert, CSS dedupes, empty cap, menu grouping

All in the v43 set. JS verified with `node --check` + brace balance; CSS by
selector-count/brace audits; browser click-throughs pending (owner).

* Naming gear leak on menu steps (`scenario-43.js`, `molview-43.js`):
  `fShowNameAnalysis()` rebuilds `#nameSettingsBtnDiv`/panel + voice buttons
  without the presentation hides, so free-browse row clicks resurrected the
  gear on steps with `Name controls` unchecked. Fix: `fScenarioChrome`'s
  naming block extracted verbatim into `fScenarioApplyNamingChrome()`
  (display-only, Export-safe); `fScenarioOnPresentBrowse()` delegates to it
  (now step-kind-agnostic) and a guarded tail hook in `fShowNameAnalysis()`
  re-asserts after every rebuild (browse + 2D/chain/ether switches).
* CSS dedupes (paste accidents, render-identical, pure deletions):
  `css/jsme-nick-43.css` 3845 → 1922 lines (exact 2×); `css/mulermoc-nom-
  scenario-43.css` 3226 → 810 lines (`[X][Y][X][Y]`, kept the X superset —
  zero non-blank lines lost, LF no-BOM preserved). Backups in the temp
  opencode dir. CHANGELOG entries added.
* Empty-scenario cap (`scenario-43.js` + CSS): `MuLERMoCScenario.
  maxEmptyScenarios = 3` — `scNew` locks with toast at cap, panel Delete
  locks only on the last remaining empty card (sole filled keeps
  delete-then-autocreate); synced in `fScenarioRenderOne()`; imports always
  land untouched.
* Per-step menu grouping, Ταξινομήσεις Μένου (`scenario-43.js` + CSS):
  additive `menuGroups` field (`molecules` default/flat, `chemclass`,
  `series`; coerce-on-import, no version bump), 3 drawer checkboxes on
  menu-step rows only (hidden on pure molecule steps), all-off valid →
  flat, preserved by Update. Present renders flat / single-grouped
  (carbon-count sorted, local numbering) / 2+ switcher (memory-only choice,
  molecules default when checked); rows stay browsable in all views.
* Accordion saga: groups started open-all → collapsed-by-default (selection's
  group open) → `slideToggle` inverted styling vs visibility → class-only
  toggle → final: main-app-identical accordion (open shuts rest, explicit
  slideUp/slideDown, selection preserved, `--baseColor` header + body
  chrome); switcher radios in one column.
* Presentation CSS hook: `#pageContainer.presenting` flipped by new
  `fScenarioSyncPresentClass()` (every apply + Exit + failed-start rollback);
  first override is a 350px present `.menuListContainer` (author: 150px).
* Docs: full sweep — didactic §§2–4 (schema, drawer, Update, cap, views,
  hook), README authoring paragraph, LAYERS-PLAN §2 line.

Browser checklist for owner: gear stays hidden after free-browse on
naming-off menu steps; grouped menus ( shut-by-default, selection's group
open, accordion + baseColor chrome, single-column switcher); empty-cap
lock/unlock cycle; 350px present menu list; Exit restores everything.

## 2026-10-07 — v44 released (`222ceab`…`905946e`, tag `v44`)

`index.html` → `mulermoc-nom-44.html`. `*43*` frozen; all fixes `*44*`-only.

* N-table rewrite (2D + 3D mirror): non-terminal N by bond-order counts —
  R3N → amine, R-NO2 → nitro incl. JSME charge-separated form; every branch
  sets taxonomy explicitly; terminal-N `default → amine`.
* Principal FG by priority rank (stable sort); `fgOrder` local copy (global
  splice leak fixed); stored-chain optional deref; aldehyde/ketone `[0]` +
  connectivity-array guard; N-way halogen prefixes (Greek-alphabetical,
  1/2-type byte-identical); per-group `di-/tri-`; `hydrocarbon` suffix
  fallback; cyclic early-out (console warn + deterministic fallback).
* Viewer: numbering `>=` + no-match `continue`, local 3D chain copy +
  `fShowNumber3D(n, chain)` param, `fUpdateSVG` null guards,
  `carbonHydrogens.fill(0)`, `JmolSelection` join contract, boot
  snapshot/restore in `finally`; `window.nameBoxFlag/Cross` single-source
  (teaching + molview + scenario).
* Docs: README + CHANGELOG v44; LAYERS-PLAN/didactic/PROJECT-PLAN(-GR)/
  banners reconciled to v44 (this batch).

Browser checklist for owner (pending): 64-mol classification diff v43 vs
v44; ether/ester/amine/nitro/halogen golden names (incl. multi-FG +
3-halogen synthetic); all 3 modes + numbering + rule tables + menu
grouping; one scenario Save → Present → Next → Exit + Export/Import incl.
legacy `"app": "mulermoc-nom-43"` file; Exit restores menu-open + both
viewers. Known deferred: ketone/alcohol/nitro locant thresholds (Greek
convention), rings/aromatics out of scope.

## v44 working copy — per-component name visibility (eye toggles, uncommitted)

All in the `*44*` set. JS verified with `node --check`; CSS brace-balanced;
browser click-throughs pending (owner).

* Master eye-edit switch in `#nameSettingsPanel` (`window.nameEyeEdit`,
  live-only, never stored) + per-box eye buttons above each name component
  (`fNameCompBox` wrap in `fShowNameAnalysis`; IUPAC + COMMON ether loops).
  Hidden boxes render `–` on `lightBlue` (`.comp-hidden`), ignore clicks
  (teaching guard + `.selected`-restore guard), and are skipped by stored
  highlight replay (`fScenarioClickNameBox`) and narration (`#readNameBtn`,
  `fSpeakNameWithPauses`); PNG shows dashes as displayed (DOM clone).
* Steps store `styleName.hidden` (comp ids) + `show.nameEye` (drawer
  checkbox `Ορατότητα συνθετικών`, default off, molecule steps only):
  checked steps keep live eye toggles in presentation (step data untouched);
  `Update` refreshes `hidden` from live, preserves `nameEye`; legacy files
  default to all-visible. Present stashes / Exit restores the author's live
  hidden set + edit mode (with guarded re-render).
* Presentation gate fix (`fNameEyeVisible`): in presentation the authoring
  master flag is ignored — unchecked steps never show per-box eyes even if
  the master was left on; authoring behavior unchanged.
* Docs: CHANGELOG [Unreleased] entry, didactic §§2–3 (schema, drawer, Update).

Browser checklist for owner: master switch → eyes appear → hide 2 boxes
→ Save step → Present (dashes, inert, no eyes) → Exit (author
hidden set back) → check `Ορατότητα συνθετικών` → Present (eyes live-toggle,
step data unmutated after Exit) → Export/Import round-trip + legacy v44
file (all visible) → TTS skips hidden → PNG shows dashes.
New-molecule reset: hide a box on mol A → select mol B (all visible,
eyes still up if master on) → Present a step with hidden comps (masked).
Exit interactivity: Present a `Διάδραση ονομασίας`-off step → Exit →
boxes clickable + explain line visible (leaked `.locked` cleared).
Hide-selected clears theory: select a box (theory + atoms) → eye-hide it →
theory hides, atoms clear, hint text; hiding a non-selected box changes nothing.
Zero-visible hides explain: hide all boxes → line hides; reveal one → line
returns; menu-only present steps keep their hint.
Presentation gate: master on → Present an unchecked step → no eyes; checked
step → eyes live; Exit → master position intact.
Layout + icons: `+` centered on box text (eyes off/on, boxed/unboxed, ester,
COMMON ether); eye artwork crisp at 14/18px; per-box tooltips readable over
the panel in both eye states; drawer `Ταξινομήσεις Μένου` set on one line
(report overflow if any).

## v44 working copy — follow-ups 2026-10-08 (uncommitted)

* Step heading number wrapped in `<span class="scStepNumberTitle">N.</span>`
  (`fScenarioFillStepPanel`; DOM-built via `textContent`, no injection
  surface; pill styling owner-side in `mulermoc-nom-scenario-44.css`).
* Master eye switch functional in presentation while the naming settings
  gear is shown (`fNameEyeVisible` returns the master; step entry seeds it
  from `show.nameEye`, i.e. the `Ορατότητα συνθετικών` checkbox sets the
  initial state; stash/restore still preserves the author's switch).
  Without the gear, eyes follow `show.nameEye` as before.
* `#narrateAnalysisToggle` carries `.active` when narration is on
  (render + click + control-UI mirror; styling owner-side).
* Eye-hiding the highlighted component now repaints the 2D SVG
  (`fUpdateSVG` after `fClearHighlights` — green + numbering vanish at once;
  3D already cleared directly). Hiding any other component keeps the live
  highlight.
* Present typography: `#scStepText` card style; `.compEye` lightBlue
  recolor. First stored scenario `scenarios/ethene.scenario.json`
  (5 steps, ethene walkthrough).

Browser checklist for owner (extends the list above): step titles show the
number pill; settings-on step → master lit iff visibility checked, click
toggles eyes live; narrate button highlights when on; hide the highlighted
box → 2D clears instantly; Present `scenarios/ethene.scenario.json`
via `?scenario=scenarios/ethene.scenario.json&present=1`.

## v44 working copy — follow-ups 2026-10-09 (uncommitted)

* Drawer toggle: Steps button toggles via `fScenarioToggleDrawer`
  (open → close + drop `.active`, else open-only accordion); button-bar
  gaps toggle too (action buttons excluded: Add opens-only, Export/Play
  inert). `e.stopPropagation` keeps the generic panel handler from
  force-reopening.
* Add scrolls to the new step: drawer pins to the last `.srow`
  (`scrollTop = scrollHeight`, rAF + 280ms pass for the `.open`
  transition; scroll-only, no focus steal).
* Disabled button freeze: generic `button:disabled(+:hover)` keeps base
  text; Steps/Play disabled share dark `baseColor`/white (no hover
  change); empty-panel Export disabled stays light `bgColor`, dimmed.
* Step drag reorder (`⠿` grip, HTML5 DnD; Up/Down fallback; scroll
  restore + grip focus); exit-viewer alignment (`fScenarioRestoreChrome(viewers)`
  + one-shot 3D reload after no-3D exits).
* Cleanup (staged): `.gitignore` + remove `RDKit/`, `imgs/*` (icons now
  inlined), `docs/*.pdf`, `mols/branched/`, `RESEARCH-PLAN.md`,
  `flowchart-mermaid.md`; `README.md` link + `README.pdf` dropped.
  No live references (verified via search).

Browser checklist for owner: bar-gap click toggles open/shut; Steps
toggles with `.active` sync; Add from open + closed drawer ends on the
new last row (6+ steps); empty-card Steps/Play hover stay dark, Export
stays light, no text change; drag a middle step up/down → numbering,
count, scroll and focus follow; exit a no-3D step → authoring stays
no-3D, re-show 3D reloads once then toggles instant.

## v44 working copy — methane startup patch 2026-10-09 (uncommitted)

* No-3D external-scenario bug: cold boot with no molecule ever loaded +
  2D-only first step (`?scenario=…&present=1`) corrupted JSmol for the rest
  of the session (applet never established a viewport before its first
  load-then-`zap`+hide). Reverted two ineffective working-copy attempts
  (scenario unhide-before-load + `resizeApplet` passes; scenario-scoped
  methane warm-up) — committed `2d6c2a4` attempt kept as-is.
* Adopted workaround: methane loads on page load again (`jsmeOnLoad` in
  `js/mulermoc-nom-molview-44.js`, direct `fSelectMol()` + best-effort menu
  marking instead of the old synthesized clicks). Landing page opens with
  methane selected.

Browser checklist for owner: cold load (empty profile) shows methane;
`?scenario=scenarios/ethene.scenario.json&present=1` from empty state →
step 1 2D-only → Next to 3D step renders intact; plain-load regression
(methane selected, both viewers live).

## 2026-10-11 — UI pass + Go alignment + doc sweep (committed)

UI restyle (owner-driven, assistant-reviewed; all `*44*`-only):

* Dead-color cleanup (`jsme-nick-44.css`): 8 unused `:root` vars + dead
  commented palette deleted; `darkBlue` → `baseColor`; dead `medBlue` ref
  removed; `--bodyBg: #faf7f5` page bg added. Palette now 9 live vars.
* Light-blue framing: `.panelTitle`/scenario title/menu + viewer frames →
  `lightBlue`; row `.selectedLi` → dark `baseColor`, group
  `.crossMenuLi.selectedLi` → `lightBlue`; tooltips (+arrows) → `darkEarth`;
  settings dropdowns → `veryLightBlue` + bottom rounding; `#viewerCol` full
  radius + `overflow: hidden` (gear/tooltip clipping watch).
* Title-button contract: single 2px `veryLightBlue` rim; active navy keeps
  the light rim (owner dropped the white-override); `:focus-visible` white
  ring. `#scPickToggle` aligned to the tokens (cream check, navy on-box,
  white focus, earth tooltip) but stays borderless — a chip border nested
  a second rectangle around the check box (introduced + fixed same day).
  Header New/Import take the same 2px rims; author-tab active → `baseColor`.
* Content tweaks: `explainText` hint `#fff → transparent`; `#scStepText`
  cream → `#fff`; step-number pill append commented out (title-only
  headings; span + pill CSS kept for revert). `ethene-2.scenario.json`:
  6 steps, all condensed, ethane-first menus.
* Known drift: `.scPresentGroup.open` still dark while
  `.crossMenuLi.selectedLi` went light — re-mirror in the UI pass.

Behavior fixes (`scenario-44.js`):

* Exit restores `viewerSettingsPanel` + `nameSettingsPanel` (gear dropdown
  stayed `display:none` after Exit; static HTML never rebuilds it).
* `fScenarioGoAlignPick`: authoring Go mirrors the step's menu into the
  live pick (subset steps restore + pick mode on; menu-less clears
  silently) — Go → tweak → Update keeps the menu. Present nav untouched.
* Row Go activates its card first (cross-card Go stepped the wrong card).
* Authoring Go reuses `fScenarioRestoreChrome(step.show.viewers)` — chrome
  hid nothing while `!present`, so panes/buttons/bars kept live states.
* Reported "3D without 3D settings in authoring" not reproduced on HEAD;
  audit shows the three bar-visibility writers pair correctly. Exit aligns
  with the exit step's viewers (not pre-Present state) — confirmed design.

Docs (this sweep): CHANGELOG `[Unreleased]` extended; didactic §§2/3/9
(schema `styleText`, Go alignment, merged header, pill note, exit
semantics); README/LAYERS-PLAN/PROJECT-PLAN(-GR)/DEVELOPMENT-PLAN counts
64 → 63 (verified: 63 `nameExamples` keys = 63 registry entries);
`scenarios/` lists `ethene` + `ethene-2`; ethene-selects-ethane recorded as
a content gap. Historical notes (SESSION-NOTES ≤2026-10-10, handoff,
v43 CHANGELOG section) left as written.

Browser checklist for owner: pick off/on/hover/focus beside 2D/3D/gear
chips (one family); Go menu/molecule-no-menu/molecule+menu steps (picks +
viewers follow); Go → Update keeps menu; Exit → gear opens; viewer-column
rounding vs dropdown/tooltip clipping; present Prev/Next untouched.

## 2026-10-12 — count correction 64, Greek scenario kept, Ottawa committed

* Molecule count corrected 63 → 64 in live docs (README, LAYERS-PLAN §8,
  PROJECT-PLAN(-GR) status + Module 1, DEVELOPMENT-PLAN banner, didactic §9).
  Verified: 64 top-level `nameExamples` keys in
  `js/jsme-nick-nomeclature-moc2-data_44.js` (methane … propanoic_methyl_ester).
  Counting rule: one molecule = one `nameExamples` key. The "63" in the
  2026-10-11 sweep note above was a miscount; left as written.
* Stored scenarios: `scenarios/ethene.scenario.json` + `scenarios/ethene-2.scenario.json`
  removed; `scenarios/Αλκάνια-Αιθάνιο.scenario.json` kept (7 steps, schema v1,
  `app: mulermoc-nom-44`: ethane walkthrough steps 1–5 + alkane menu browsing
  step 6 + 3D alkane models step 7; menu subsets methane→pentane; all
  `selectedMol`/`menuSubset` keys resolve against the 64-set (now 65 with
  `dimethyl_2_3_butane`); `moveto: null`
  throughout). Greek filenames stay URL-encoded in `?scenario=` links.
  README + LAYERS-PLAN §2 updated; CHANGELOG/handoff notes above left as written.
* `docs/PROJECT-PLAN.md` + `docs/PROJECT-PLAN-GR.md`: Ottawa (OrgChem101)
  comparison column committed as written (owner decision 2026-10-12).
* `docs/RESEARCH-PLAN.md` retained (2026-10-14 correction: the 2026-10-09
  deletion never landed — file exists, re-anchored to `docs/LAYERS-PLAN.md`
  §5, theory + RQ history); live research design is `docs/LAYERS-PLAN.md` §5
  + `docs/SESSION-HANDOFF-2026-10-10.md`.

## 2026-10-12 — default authoring preload S1 + empty S2

* `js/mulermoc-nom-scenario-44.js`: `MuLERMoCScenario.defaultScenarioUrl`
  (`scenarios/Αλκάνια-Αιθάνιο.scenario.json`); `fScenarioBoot` fetches +
  validates it when no `?scenario=` param — boot card reused as S1 (title +
  7 steps), `fScenarioNew("untitled-scenario", true)` added as S2, S1 set
  active, panels rebuilt. Deep links skip it; `file://`/404/invalid falls
  back silently to one empty card; bare `?present=1` presents preloaded S1.
  `node --check` clean; scenario JSON re-validated (7 steps, v1).
* Docs: CHANGELOG `[Unreleased]` preload section, didactic §9 preload line.

Browser checklist for owner: http(s) boot → tab shows S1 `Αλκάνια-Αιθάνιο`
(7 steps, active) + S2 empty, `+ New` unlocked; Present S1 → 7 steps → Exit
restores; `?scenario=…&present=1#step=3` loads once (no duplicate card);
`file://` boot → single empty card, no toast; Export S1 → Import round-trip.

## 2026-10-12 — present control bars survive a no-viewer exit

* Bug (owner report): 3D settings missing in presentation despite a checked
  `3D ρυθμίσεις` box, after exiting from a no-3D step and Playing again.
  Cause: dual hiding — toggles/`fScenarioRestoreChrome` add the `hide`
  class (`!important`) while `fScenarioChrome` cleared only inline display.
* Fix: `fScenarioShowBar(id, show)` helper (inline + class); used for
  `radio2DMode` + `controls3D` in `fScenarioChrome` (2D mirror fixed too).
  `node --check` clean; all authoring `fScenarioChrome` callers are followed
  by `fScenarioRestoreChrome(viewers)`, so author-hidden bars stay hidden.
* Docs: CHANGELOG `[Unreleased]` entry (this note).

Browser checklist for owner: the exact repro (3D-checked step → Exit from a
no-3D step → Play → `controls3D` visible); unchecked stays hidden; 2D mirror
(exit no-2D → replay 2D-checked step); authoring `[2D][3D]` toggles unaffected;
one full Save → Present → Next → Exit round-trip.

## 2026-10-13 — v45 file set + 2D naming rename + tooltip program

Scaffold: `*44*` copied to `*45*` (`mulermoc-nom-45.html` + `js/*-45.js` +
`css/*-45.css`, `index.html` → 45; `*44*` runnable at root). `*43*`/`*42*`/
`archive/` untouched.

* 2D naming rename (code-only, behavior-identical): `<mol>_2D` →
  `<mol>_2D_Condensed`, `<mol>_2D_E` → `<mol>_2D_Expanded`, `<mol>_diagr2D` →
  `<mol>_2D_Skeletal`; `MOL2D` `{std,exp,diagr}` → `{condensed,expanded,
  skeletal}`; `structure2D[_E|_D]` / `mainChain[_E|_diagr]` /
  `modeSuffix` values renamed to match; `mode2D "diagramatic"` → `"skeletal"`
  (`condensedZigZag` kept); new `fMainChainKeySuffix()` helper (molview);
  legacy `diagramatic` coerces on scenario import (warning, in-memory).
  Exports still stamp `"app": "mulermoc-nom-44"` (informational — validation
  ignores it).
* Static audit: braces balanced 44→45 on all five JS files; zero legacy
  identifiers outside the intentional coercion lines. Review caught 2 real
  bugs (double-prefixed `"mainChain_Condensed" + suffix` in
  `fHighLightMainChain`/`fUpdateChainModeButton`) — fixed before commit.
* Menu-only validation note silenced: valid menu-only steps no longer toast
  at boot/import (owner-verified on reload); genuinely-broken steps still warn.
* Tooltips: one shared navy skin (single copy, `baseColor`/`Roboto
  Condensed`/`0.75rem`/normal — owner restyle); scenario bar/panel/step/
  toolbar buttons + badge + drag handle converted from native `title`;
  `#scNew` unlock path restores (not strips) its hint; geometry variants
  (button-panel bubbles above, save buttons left, `[2D]` left-aligned,
  edge buttons Save-left-aligned/Delete-right-aligned) for
  `overflow:hidden` parents; all 14 tooltip/`aria-label` texts Greek.
* Docs: README/CHANGELOG baselines → v45; didactic §§ state notes + `mode2D`
  values + build status; DEVELOPMENT-PLAN pipeline/field names; LAYERS-PLAN
  baseline + layer entries.

Browser checklist for owner (extends all previous lists): cold boot shows
methane, no toast; all 3 modes per molecule incl. a skeletal-less one
(fallback); zigzag toggle; hover one tooltip per family (panel, eye, author
tab, pick, title row, panel, step row, toolbar, play bar, badge, grip, save,
[2D]/[3D]) for identical navy skin, no clipping, no double native tooltip;
`#scNew` bubble unlocked + locked; Import a v44 file with a skeletal step
(`diagramatic→skeletal` toast); one full Save → Present → Next → Exit.

## 2026-10-14 — 65th molecule (dimethyl_2_3_butane) + branched naming fix

* P4 inbox `mols/new_molecules/` (2,3-dimethylbutane, C6 branched alkane):
  filenames normalized to v45 case (`_Condensed/_Expanded/_Skeletal`);
  SDF copied to canonical `mols/nomeclature-moc2/dimethyl_2_3_butane_3D.sdf`
  (PubChem CID 6589, inbox original kept; loader `molview-45.js:491`
  unchanged). Data `data_45.js`: `nameExamples` entry (formula
  `CH3CH(CH3)CH(CH3)CH3`, empty `mainChain_*`/`mainChain3D` → algorithmic,
  no `moveto`) + 3 MOL vars + `reg()` line. 64 → 65 keys (VM-verified).
* MOL header strictness: first attempt prepended a SMILES title line on top
  of both KingDraw header lines (4 headers, counts at index 4 — breaks
  `fMakeAnnotatedSkeletal` `lines[3]` + risks `readMolFile`). Fixed to exact
  file bytes (V2000: exactly 3 header lines; SMILES deferred to a JSME
  extraction phase). Bonus find in the same edit: dropped `\n` after the
  Expanded first header line (would have fused two headers) — fixed.
* Engine fix (v45-only, `core-45.js` `fGuessName` hydrocarbon branch):
  `sideBranches[0]` single-slot dropped the second methyl
  (`2-μεθυλοβουτάνιο`; highlighting already found both via the v39.1 union
  path). Now groups branches by substituent name — comma-joined locants +
  `δι-/τρι-` prefix, Greek-alphabetical group order (halogen-path
  convention) through `comp0NumberList/TextList` fusion. Result
  `2,3-διμεθυλοβουτάνιο`; single-branch output byte-identical.
  Headless-verified (dimethyl_2_3_butane, methyl_2_pentane, butane, pentane,
  propane); `core-44.js` untouched by scope decision.
* Docs: README/LAYERS-PLAN-E2/PROJECT-PLAN(-GR)/didactic counts → 65;
  CHANGELOG `[Unreleased]` entries for molecule + fix.

Browser checklist for owner (delta): select `dimethyl_2_3_butane` in
Condensed/Expanded/Skeletal + 3D (SDF loads, viewport healthy); name boxes
show `2,3-διμεθυλοβουτάνιο`, highlight replay hits both methyls, narration
follows; one Save → Present → Next → Exit round-trip.

## 2026-10-15 — 66th–69th molecules + formate-ester fix (v46 working copy)

* Embedded `diethyl_ether` (CID 3283), `isopropyl_methyl_ether` (CID 11721),
  `methyl_methanoate` (CID 7865), `isopropyl_ethanoate` (CID 7915):
  `nameExamples` (consistent formulas, algorithmic empty chains) + 12 MOL
  `let` blocks (byte-exact vs `mols/new_molecules/`, VM round-trip verified)
  + 4 `reg()` lines → 65 → 69 keys, data diff purely additive.
  3D SDFs in both `mols/new_molecules/` and `mols/nomeclature-moc2/`
  (hash-matched).
* Engine fix (`core-46.js` 2D + 3D): formate esters mis-named as
  alkoxy-aldehydes (explicit formyl H skipped in valence → aldehyde bucket;
  ester pass only ate ketone O). New ether+aldehyde → ester pass (HCOOH
  precedent). `μεθανικός μεθυλεστέρας` all modes, 2D + 3D verified;
  full 69×3 headless regression: 0 changes in 195 pre-existing combos.
* Version move: v45 reverted to HEAD state (65 keys, pre-formate core —
  patch backup kept, no commit); v46 forked as mechanical `*45*` → `*46*`
  copy carrying the 69 keys + fix (`index.html` → 46, `*45*` runnable).
  Docs re-applied with v46 baseline. Next: iso-/sec- alkyl prefix upgrade
  on v46 (`προπυλ` → `ισοπροπυλ` slots).
* Browser checklist for owner (delta): the 4 new molecules in
  Condensed/Expanded/Skeletal + 3D; ester highlight/narration on
  `methyl_methanoate`; one Save → Present → Exit round-trip.

## 2026-10-15 (cont.) — iso prefixes + common euphony + ester highlight override (v46)

* Iso-alkyl upgrade (`core-46.js` + `molview-46.js`): branched fragments were
  named by carbon count only (`προπυλ` for isopropyl). New `isoAlkylNames`
  table + `fAlkylGroupName(len, attachC, kind)` shape check (attachment C with
  2+ carbon neighbors → branched; straight output byte-identical), wired into
  all four alkyl slots (ether systematic prefix, ether common stems, ester
  alcohol part, hydrocarbon branch names). COMMON box labels
  (`fGetEtherCommonParts`, own stem copy) routed through the same helper;
  `alkylBranchNouns` += `ισοπροπυλο: "ισοπροπύλιο"`. Result:
  `αιθανικός ισοπροπυλεστέρας`, common `Ισοπροπυλομεθυλαιθέρας`
  (existing alphabetical sort puts `ισοπροπυλ` first); `2-μεθοξυπροπάνιο`
  and `διαιθυλαιθέρας` unchanged. Table extensible to iso-/sec-/tert-butyl
  (no molecules yet). No 3D changes (names-only; highlight sets index-based).
* Common-ether euphony (`core-46.js` only): fused common name concatenated
  stems raw (`αιθυλμεθυλαιθέρας`). The systematic assembler already had the
  C+C → `ο` rule (`_joinEuphony`, with the `π/τ+δ → α` exception) — hoisted
  it to `fGuessName` top (pure move) and routed the asymmetric pair fusion
  through it; symmetric `δι-` path vowel-led, untouched. Result:
  `αιθυλομεθυλαιθέρας`, `Ισοπροπυλομεθυλαιθέρας`; COMMON chips stay bare
  stems; fused string only in "Κοινή ονομασία". Gate: exactly 6 changed
  lines (2 asymmetric ethers × 3 modes, common slot), systematics identical.
* Ester highlight override (`molview-46.js` only, `mainChainAtomsList`
  untouched): on `αιθανικός ισοπροπυλεστέρας`, `αιθ-` lit the isopropyl
  group (main-chain scorer is length-primary: 3-C alcohol beats 2-C acid;
  terminal anchor only orients) and `-αν-` lit every C–C single
  (`fHighlightSingleBondsCC/3D` molecule-wide; old esters masked both).
  New `fGetEsterAcidChain[3D]()` + `fIsSingleEster()` guard (sole-FG esters
  only): `αιθ-` reports acid length, highlights + numbers the acid chain;
  `-αν-` lights only acid C–C singles via optional atom-set filter
  (default stays wide). Formyl esters correctly light zero C–C bonds.
  Derivations verified 2D + 3D (3 modes × 3 esters); naming byte-identical.
* Gates this session: 69×3 naming vs baselines (only specified lines move),
  COMMON boxes for all 3 ethers, 3D classification snapshots identical,
  all `*-46.js` parse OK. `*-45*` files verified pristine (65/65, no fix).
* Browser checklist for owner (cumulative, still pending): 4 new molecules
  × Condensed/Expanded/Skeletal + 3D; iso/common names + narration;
  `αιθ-`/`-αν-` acid scoping on `αιθανικός ισοπροπυλεστέρας` (+ `ethanoic`
  regression); one Save → Present → Exit round-trip.
* Housekeeping: Temp patch `v46-embed-work.patch` is a stale fallback
  (predates fork) — live tree is truth. Baselines: `names_euph.txt` is the
  current 69×3 naming truth. No commits made (owner instruction).

## 2026-10-15 (later) — grey C–H bonds + MOL re-embed round + title-line fix

* Grey C–H bonds (`molview-46.js` only): new `fApplyCHBondColors2D()`,
  called from `fUpdateSVG()` right after `fApplyAtomColors2DToSVGLabels()`.
  Gate `svgAtomColors2DFlag && mode2D === "expanded"`; C–H pairs found via
  `bondList` + `allAtomsTypeList`, lines painted via `svgBondList` with
  `atomColors2D.H` (`#909090`, same as H labels). Fresh JSME SVG is black
  each rebuild (toggle-off needs no reset); green highlight backgrounds are
  separate attributes and win where applied; C–C `-αν-` highlight path only
  touches C–C, so no conflict. Static: braces/parens balanced.
  Browser checklist for owner: expanded + colors on → C–H grey / C–C black;
  toggle off → all black; condensed/skeletal unchanged; alkyl green still wins.
* Owner redrew 2D MOLs in ChemDraw (alignment + geometry). Re-embedded with
  the same convention as the first import: `dimethyl_2D_Condensed/_Expanded`
  (2 blocks), all 12 new-molecule blocks, 3 ester redraws, 2 iPr-Me-ether
  redraws — all in `data_46.js`; `*45*` + `data_45.js` untouched. Skeletal
  blocks needed no action (content-identical; trailing blank added for
  uniformity, inert).
* Missing-title root cause (the "esters do not load" episode): the first
  import dropped the filename title line, moving V2000 counts 3 → 2 — JSME
  read the first atom line as counts (NaN → 0 atoms → empty viewer +
  `fCalcMainChain: cyclic molecule` fallback, since `terminals == []`).
  Evidence: full 195-block audit in `data_46.js` showed exactly the 12 new
  blocks with atom lines at index 3; all old blocks (incl. dimethyl, whose
  KingDraw file carries its own title) were fine. Fix: titles restored +
  trailing blank after `M END`, mirroring working-block structure. Post-fix
  audit: 195/195 counts-at-[3] OK. CORRECTION: the v45 "no SMILES title"
  note misread V2000 — its 3 headers *include* the title; dropping it was a
  bug, not a rule.
* Two redraws landed short on H and were fixed at source pre-import:
  `dimethyl_Expanded` 18→20 atoms (two methine H's; pattern `[3,1,1,3,3,3]`,
  all valences 4) and `isopropyl_methyl_ether_Expanded` 14→15 atoms
  (central CH hydrogen; `[1,3,3,3]`, 10 H). An early "corrected" save of the
  ether file landed without the new H (stale buffer) — caught by recheck
  before import, fixed on second save.
* ChemDraw re-exports write CRLF (all redrawn files; masked at first by
  Python universal-newline reads). Embed normalizes to LF (no-CR asserted
  in `data_46.js`); working-copy `.mol` files keep CRLF on disk and
  `* text=auto eol=lf` normalizes them on commit.
* Owner browser-verified this round: both esters load with correct names,
  cyclic warning gone (hard reload; the stale-bundle + title bug are both
  closed by this). Remaining owner checks: dimethyl/ethers × 3 modes, C–H
  grey, zoom-50 3D framing, one Save → Present → Exit round-trip.
* Incidental find: `spt/init-3.spt` carries an owner 3D default `zoom 80→50`
  (shared init, all versions) — committed with this batch + CHANGELOG entry.
* Commit plan: single commit (docs + `index.html`→46 + v46 set + MOL/SDF data
  + dimethyl inbox MOLs + spt zoom), explicit file list, zero `*45*` /
  `data_45.js` paths; push `origin/main`.

## 2026-10-15 (later) — icons, zoom controls, tool-button merge

* Icon consolidation (`ui-icons.js` + `molview-46.js` only): 12 svg* consts →
  registry keys (`settings/speaker/mute/stop/playSm/nameBox/…/eyeState`),
  markup byte-identical (saved pre-image, compared post-move); molview keeps
  guarded aliases (`… || ""`), so teaching/scenario use sites are untouched
  (incl. teaching's single `svgStop` use). `playSm` avoids clobbering the
  512-viewBox scenario `play`. `*42–45*` frozen with local copies; shared-file
  addition inert for them. Static: no `const svg` left, balance clean.
  Full-repo audit: v46 runtime icons all in registry; the `'<svg xmlns…'`
  strings in molview are PNG-export machinery (not GUI icons); `imgs/` holds
  21 files but only `image-svgrepo-Industrial-Sharp.svg` is tracked/loaded —
  the other 20 are untracked source leftovers (zero references; owner keeps).
* Save-image inline (v46 only): `saveImage` registry key (path data
  byte-identical to file; ids/title stripped — renders twice per page);
  both save buttons → `[data-icon]` placeholder spans filled by a generic
  hydration in the viewer-settings init; CSS sizing extended to `svg`
  (24px, pixel-identical). `.svg` file stays for frozen pages.
* Zoom icons (`zoomIn`/`zoomOut`, Industrial-Sharp) added to registry for
  later use — paths byte-identical, no consumers yet.
* 2D zoom (`molview-46.js`): `molZoom2D` (default 2.0) applied by
  `fLoadMol2D` on both applets (replaces hardcoded 2.0);
  `fZoom2D(dir)` ×1.25, clamp 0.5–6.0, re-render + numbering replay
  (highlights are applet state and survive). −/+ buttons left of the 2D save
  button (registry icons, Greek tooltips). Reset-to-default on molecule load
  via `fInitProps` (named `MOL_ZOOM_DEFAULT/MIN/MAX`); mode/chain/zigzag
  switches call `fLoadMol2D` directly and keep zoom. `setMolecularAreaScale`
  is the sanctioned API (getter exists); `setSize`/CSS-transform rejected
  (viewport dims / Snap desync). JSME `zoom`-option default noted but
  buttons give determinism + touch + storable values.
* 2D zoom storage (`scenario-46.js`): additive `style2D.zoom` (legacy 2.0,
  no bump) — capture + Update free via `fScenarioCapture`, new
  `fScenarioValidZoom` (0.5–6.0 clamp) + `fScenarioG` whitelist case (without
  it capture would silently read 2.0 — caught in review); apply re-asserts
  after `fSelectMol` (pre-load assignment would be wiped by the reset) with
  scale + re-render so the §5 highlight replay paints zoomed; Present stashes
  / Exit restores author zoom (eye/hidden-stash pattern). Menu-only branch
  order verified (deselect → assign).
* 3D zoom (`molview-46.js` + `46.html` + CSS): `fZoom3D(dir)` sends
  owner-provided `zoomTo IN;`/`zoomTo OUT;` (guarded; fallback to relative
  `zoom` forms if console rejects). `#view3DTools` cluster mirrors 2D
  (zoom pair + save moved inside). Live-only by owner decision: JSmol `load`
  already resets framing per molecule; step cameras stay moveto's job —
  moveto capture/apply follow-up recorded as separate future work.
* Tool-button merge (v46 chrome): `#view2DTools`/`#view3DTools` + single
  `.viewerToolBtn` class replace `.saveImgBtn`/`.zoomBtn`/`#zoom2DBtns` and the
  hand-synced `right:36px`; `#save3DBtn` keeps own anchoring (stands alone);
  6 tooltip selectors retargeted + zoom buttons added to the left-middle
  clip-avoidance geometry (ID specificity wins, same pattern). Frozen CSS
  untouched. Balance clean; scenario save-button ids verified intact.
* Browser checklist for owner (cumulative v46): icon buttons everywhere
  (gears, narrate/read, box/cross/eye, comp eyes, save ×2, zoom ×4);
  2D zoom steps + clamp ends + reset-on-load + mode-switch keeps zoom +
  Save→Present→Exit zoom round-trip; 3D zoom steps + framing reset +
  console watch on `zoomTo`; dimethyl/ethers × modes; iso/common names;
  `αιθ-`/`-αν-` + ethanoic regression; full Save→Present→Exit.
* Not committed in this batch: `docs/flowchart-mermaid.md` shows M for a
  zero-line binary/metadata difference (untouched by this work) — left out.

## 2026-10-15 (later) — per-molecule SMILES at boot

* `fClassifyAllMolecules()` (`molview-46.js`) captures JSME SMILES for all 69
  molecules at page load into `nameExamples[key].smiles` (storage-only, no UI).
  Condensed source (matches historical title-line convention, avoids
  expanded explicit-H `[H]` artifacts); `getSmiles()` primary with
  `smiles()` fallback across JSME builds, try/catch → `null` (never a boot
  failure); zero marginal cost (in-memory conversion on the already-loaded
  structure inside the existing classification loop). Reserved as future
  canonical id (logging/search/display); consumers later.
* Browser checklist for owner: console shows 69/69 non-null (only
  condensed-less molecules may read null); spot-check methane `C` + one ester.

## 2026-10-15 (later) — v47 fork (main-chain stepper major upgrade)

* Mechanical `*46*` → `*47*` copy: `mulermoc-nom-47.html` + 5× `js/*-47.js`
  + 2× `css/*-47.css`; only the 7 asset references in `47.html` differ
  (14 diff lines; BOM + CRLF preserved via byte-level rewrite after a first
  attempt normalized them — caught in review). All other fork files
  byte-identical (diff 0). `index.html` → 46 stays (switch on owner
  browser-approval); `*46*` runnable at root, `*45*` untouched.
  `ui-icons.js`/`mols/`/`scenarios/` stay single shared copies.
* Parse audit: braces balanced everywhere; paren-count deltas in
  `core-47.js` (−4) / `teaching-47.js` (−1) are byte-identical to the `-46`
  originals (naive-counter artifact from parens in strings/comments).
* Docs baselines → v47 (README/LAYERS-PLAN/PROJECT-PLAN(-GR)/didactic/
  CHANGELOG new `[Unreleased]` v47 section; committed v46 history folded
  into a dated `[v46]` section).
* Incident (recovered, no loss): an external GoodSync analysis job
  (21:25 run) overwrote working-tree `README.md` with its state log.
  Committed history was clean (clobber landed post-commit); restored via
  `git checkout`, then applied the v47 baseline edit. No other tracked
  file affected (signature sweep clean). Owner action: check the sync job
  config so it stops writing into the repo.
* Next: stepper core — FG-aware longest-chain pool (principal-FG inclusion
  via `fgOrder`, halogens excluded, hydrocarbons fall back to longest tier),
  ranked + oriented per load per mode (2D + `candidatePaths3D` mirror);
  settings-panel `‹ n/N ›` stepper with reason line (length + FG coverage +
  substituents + per-chain name); rank-parallel 2D+3D stepping; index 0 =
  today's winner; validation bypassed while stepping; canonical restore on
  exit/molecule change. Step index not captured in scenario steps (EXPLORE
  aid). Substituent correctness per chain follows from the architecture:
  `fGetHydrocarbonSubstituentInfo`, branch highlight, numbering and
  `fGuessName` all derive live from `mainChainAtomsList`.

## 2026-10-15 (later) — stepper core + settings-panel UI (v47)

* Core (`core-47.js`, pure moves + additions, no logic edits to scoring/
  orientation): Rule A/B extracted to `fOrientChainPath[/3D]` (verified by
  diff: only the 4 intended rewrites differ, rest byte-identical moves);
  `terminalFgCarbons[/3D]` globalized; `fTopFgAnchorSet` + `fRankChainPool`
  added; Step 8d builds pools, Step 9 adopts pool[0]; all six fallback paths
  seed single-entry pools (+3D owner key for async freshness).
  Substitution/naming/highlight paths needed no changes (all chain-global
  driven — owner's dimethylbutane question answered yes by construction).
* UI (name-settings panel — moved there per owner, reset button + reason row
  cut): `‹ n/N ›` group interpolated into the panel template
  (`fChainStepperHTML`, live counter/disabled at build time so naming
  rebuilds stay truthful); `fRenderChainStepper` slimmed to label + prev/next
  (reset/reason/map deleted, zero dead refs). Generic `.stepBtn` CSS.
  Per-step refresh replays only the selected component (click sequence, no
  toggle, no narration); nothing selected → counter alone updates.
* Fixes after first browser test (owner: stepper showed N>1 but clicks froze
  everything, no errors): (1) brace slip in the orientation extraction left
  `fCalcMainChain[/3D]` nested and undefined at top level — 4-line repair,
  depth-trace verified (balance counters alone can't catch this class);
  (2) stepper showed N>1 but clicks changed nothing: `fGuessName()`
  internally re-runs `fCalcMainChain()`, silently rebuilding the pool and
  resetting each step to the winner — new optional
  `fGuessName(skipChainRecalc)` param (existing callers unchanged) used as
  `fGuessName(true)` by the stepper so naming runs on the swapped chain
  (also yields the per-chain name for the reason line and skips validation
  while stepping). Non-issue found in passing: the render `algo` gate reads
  correctly (`=== "undefined" ||` — no change needed).
* Alkoxy live-rule fix (owner: diethyl ether prefix highlight stuck on chain
  1 in 2D, swept correctly in 3D): `fGetEtherAlkoxyChain()` led with
  load-time `etherInfo` (static) while the 3D mirror derives the side live
  from the current chain. Rewrote 2D to lead with the same live rule (first
  O-bonded C off the current chain + carbon BFS), `etherInfo` kept as
  fallback. Winner-state parity verified by reading (naming untouched — core
  reads `etherInfo` directly); also repairs COMMON chips staying
  complementary while stepping.
* Behavior change per owner (stepper paints nothing by itself): `fApplyChainStep`
  no longer highlights the chain — it replays the *selected* component via
  the click sequence (`fClearHighlights` + `fUpdateSVG` + `fExplainNameComp`,
  no toggle, no narration), so explanation locants, highlight and numbering
  follow the new chain; with nothing selected only counter + reason update.
* Static: braces balanced (parens deltas match `-46` artifact); all refs
  verified (whitelist untouched — stepper reads pools directly).
* Browser checklist for owner (v47 only): dimethylbutane walk (expect 4+
  longest chains; each step's reason line with substituents + name);
  highlight/numbering follow every step in 2D; 3D follows when fresh;
  mode switch rebuilds pool; reset ⟲ restores winner; console watch for
  validation warnings (chemistry-vs-legacy disagreements = review signal);
  regression: all previously-verified names/highlights unchanged at
  index 0.

## 2026-10-15 (later) — walk index stored in step JSON + preserved across rebuilds

* `chainIdx` now stored per step (owner reversed the EXPLORE-only call):
  top-level additive field (default 0, no version bump) — whitelist case +
  silent capture on Save/Update (menu-only stores 0), `fScenarioValidChainIdx`
  + import warning, clamped to the live pool at apply; re-asserted after the
  step load with naming/boxes winner-based and highlight replay on the stored
  chain. No drawer UI. Exit keeps the exit step's chain (no author-chain
  stash — same contract as `selectedMol`).
* No separate 3D hook was needed: Step 9 adopts `pool[clamped idx]` on every
  rebuild, so the async 3D parse lands on the stored index by itself;
  S2 click replay then paints onto it. Same mechanism keeps the stepped chain
  across mode switches and naming recomputes (fresh loads via `fInitProps`
  still reset to pool[0]); 3D clamps locally without touching the shared
  index. Single-entry fallbacks collapse to 0.
* Browser checklist for owner (v47): stepped Save → Present shows stored
  chain + counter → per-step chains survive Next/Prev → 3D follows after
   parse → Exit lands on exit-step chain; legacy files behave as 0;
   Export/Import round-trip preserves `chainIdx`; invalid values warn + default.

## 2026-10-16 — name-settings panel conditional rows + stepper tooltip fixes (v47)

* Panel layout per molecule case (`molview-47.js` template + `jsme-nick-47.css`,
  `*47*`-only): `#nameSettingsPanel` is now a column of `#nameSettingsRowTop`
  (stepper alone, left) + `#nameSettingsRowMain` (`space-between`: `.nsLeft`
  stepper-or-radios / `.nsRight` buttons). Ether+stepper → two rows; stepper-only
  (non-ether) and radios-only (ether, no stepper) → single spread row; neither →
  buttons right as in frozen versions. `fRenderChainStepper()` collapses the top
  row or the inline left group when the stepper hides (button row never hides).
  Template rebuilt on every `fShowNameAnalysis`, so mode/molecule switches stay
  truthful. All ids preserved (ether handler + scenario chrome untouched).
* Stepper tooltips: `.stepBtn[data-tooltip]` bubble + arrow to `z-index: 400`
  (same level as save/zoom/settings bubbles) so the downward-opening bubble
  paints above the row below; `.stepBtn:disabled` gains `pointer-events: none`
  (`readNameBtn:disabled` precedent) — inactive `‹`/`›` shows no tooltip.
* Bundled pre-existing owner CSS tweaks in the same file (`.stepBtn` 22→18px,
  `#chainStepLabel` color → `#333`, `#chainStepperBox` background/padding
  removed) — already in the working tree before this batch, committed together.
* Static: braces balanced both files; frozen `*42–46*` untouched;
  `docs/flowchart-mermaid.md` binary diff left out of the commit (standing rule).
* Browser checklist for owner: stepper-only molecule (single row, stepper left);
  ether without stepper (radios left); ether with stepper (two rows);
  hover `‹`/`›` (bubble above the row below; none when disabled);
  panel open/close; one Save → Present → Exit round-trip.

## 2026-10-16 — numbering-bonds setting (v47)

* New viewer-settings checkbox `Επισήμανση δεσμών κατά την αρίθμηση`
  (`#highlightNumberingBondsCheck`, default on) in `mulermoc-nom-47.html`.
  Gates the C–C bond tint in the numbering path only (`compCarbonsCount`:
  2D ester-acid bonds + 3D `color bonds` tail) via `fShowNumberingBonds()` +
  opt-out `skipBonds` params on `fHighlightAtomChain[/3D]`; alkyl-rule callers
  (COMMON ether/ester, alkoxy) keep bonds unconditionally. Live re-apply on
  toggle with the chain component selected (bond-atoms pattern). Stored per
  step as additive `styleHighlight.numberingBonds` (legacy → on, no bump;
  validation merges with defaults) + Present stash / Exit restore.
* Static: braces balanced; frozen sets untouched.
* Browser checklist for owner: chain-component click with bonds on (visuals
  unchanged) → toggle off → re-click → atoms + numbers only, 2D + 3D →
  toggle on → bonds return; live toggle with selection active; Save →
  Present → Exit per-step value; legacy file behaves as on.
* Follow-up fix (same day): the 2D main-chain path painted atoms only
  (`fHighLightMainChain` had no bond call — pre-existing, not a regression),
  so 2D bonds never lit even with the setting on. It now paints every bond
  with both ends in the resolved chain set (any order, green `9`); sole
  caller is the numbering click path and stored/ stepped chains resolve
  inside, so all replays inherit it. Default-on now highlights bonds in
  both viewers.   Checklist add: unsaturated chain lights its multiple bond too.
* Follow-up fix 3 (same day, three faults): (1) toggling either numbering
  checkbox with a selection active did nothing visible (atoms box never had a
  live re-apply) — one combined handler on both settings now re-triggers the
  selected `compCarbonsCount` box (bond-atoms pattern). (2) 3D bonds stayed
  green with the bonds box unchecked — Jmol `color bonds none` inherits the
  atom color, so the omitted clause painted green anyway (this also explains
  the earlier "opposite" report: unchecked inherited green atoms while
  checked painted explicit grey); the off-state now paints explicit neutral
  grey `[X909090]`, never `none`. (3) atoms-off killed bonds too — all bond
  painting sat inside the atoms `if`; atoms and bonds now gate independently
  (`fHighLightMainChain` atoms-only again + new `fHighLightMainChainBonds`,
  `skipAtoms` 4th params on `fHighlightAtomChain[/3D]`, 3D halos follow the
  atoms half). Truth table (2D+3D): on/on green+green; on/off green atoms +
  neutral bonds; off/on default atoms + green bonds; off/off plain + numbers.
  Alkyl callers pass no new params (byte-identical behavior).
  Checklist add: all four checkbox states in 2D + 3D; live toggle both boxes.
* Follow-up fix 4 (same day, my bug): the rewrite above fused two Jmol
  commands — `_atomClause` missed its trailing `;`, wiring
  `…[X79dc6d] color bonds …` as one unparsable command, so 3D showed halos
  only (no green atoms, no green bonds, every state). One-character fix;
  audit confirms no other fused clause in the file. The full 3D state table
  needs a fresh browser pass.
* Follow-up fix 5 (same day, same class): atoms-off + bonds-on still left 3D
  bonds grey — with `_atomClause` empty the wire read `select … color bonds …`
  (fused again; the separator had come from the atom clause). The bond clause
  now carries its own leading `;`, so every boundary has exactly one.
* Follow-up fix 2 (same day): 3D numbering bonds were grey (`[X909090]`,
  reading as dimmed/off next to green atoms/halos) — now green (`[X79dc6d]`)
  when the setting is on (one token in `fHighlightAtomChain3D`; gate
  unchanged). Alkyl paths already overpaint green via `fColorFragmentBonds3D`,
  so their pixels are unchanged; stale "remains bond-free" comment corrected.
  Checklist add: bonds on → 3D atoms + bonds green; off → green atoms only.

## 2026-10-16 — CSS color naming (v47, behavior-identical)

* Renamed in `css/jsme-nick-47.css` + `css/mulermoc-nom-scenario-47.css` only:
  `--baseColor` → `--darkBlue`, `--guiColor` → `--vibrantGreen`,
  `--bgColor` → `--veryLightEarth`, `--lightGrayNick` → `--veryLightGray`.
  Values unchanged; zero old-name occurrences left in either file; frozen
  `*42–46*` + archive keep the old names. No JS/HTML references exist.
* Browser checklist for owner: one v47 load (any missing rename shows as
  unstyled chrome at once) + one Save → Present → Exit round-trip.

## 2026-10-16 — v48 fork (authoring pin-dock)

* Mechanical `*47*` → `*48*` copy: `mulermoc-nom-48.html` + 5× `js/*-48.js`
  + 2× `css/*-48.css`; only the 7 asset references in `48.html` differ
  (binary swap, BOM + CRLF preserved — this time all `js`/`css` sources are
  plain LF/no-BOM, only the html carries BOM/CRLF). All non-html fork files
  byte-identical (verified). `index.html` → 48; `*47*` runnable at root as
  the fallback, `*46*` untouched. `ui-icons.js`/`mols/`/`scenarios/` stay
  shared single copies.
* Parse audit: braces balanced everywhere (5 js + 2 css).
* Pre-fork owner tweak carried into the fork: `body` + `html, body`
  `overflow-x: hidden` → `auto` in `jsme-nick-47.css` (was uncommitted
  working-tree state; enables horizontal scroll for the docked layout).
* Docs baselines → v48 (README/LAYERS-PLAN/PROJECT-PLAN(-GR)/didactic/
  CHANGELOG new `[Unreleased]` v48 section; committed v47 history folded
  into a dated `[v47]` section).
* Next: pin-dock on `*48*` only — pin button, reparent-dock at the row's
  right end, viewer width locked to measured pixels, `scPinned` CSS,
  auto-unpin on Present/authoring-off, live-only flag. `*47*` stays the
  runnable fallback.

## 2026-10-16 — authoring pin-dock (v48)

* Pain: the open author bar (540px fixed overlay, right) hides the name
  panel, forcing close → tweak → reopen → Save round-trips.
* Fix (`scenario-48.js` + `mulermoc-nom-scenario-48.css`, `*48*`-only):
  `pin` button in the title row (registry `MuLERIcons.pin` from
  `imgs/pin-svgrepo-com.svg`, 16px/currentColor per file convention; emoji
  fallback kept in markup); `fScenarioSetPinned(on)` reparents the
  bar into `#authorLayout` (new thin wrapper, `*48*`-only; `#mainAppContainer`
  holds exactly the three columns, title `h1` moved above into
  `#pageContainer`, footer already below — both keep full width) as its
  last child (right end) and
  freezes `viewerCol` from a pre-dock read at measured pixels via inline
  flex (restored on unpin; measuring after the class toggle had locked
  stretched wide-screen pixels — order matters), so applets keep exact
  widths and the container itself scrolls
  (`flex:1/min-width:0/overflow-x:auto`, wrapper capped at `1600px + 540px`
  centered) instead of squeezing; the row's
  inline centered justification is forced left while pinned (unreachable
  left overflow otherwise). `body.scPinned` rules outrank
  `.open`/`.is-hidden`; tab hidden while pinned. Live-only flag; ✕/ESC and
  Present entry force-unpin (no auto-restore; author re-pins).
* Static: braces balanced; `*47*` verified untouched (byte-identical).
* Browser checklist for owner: pin → bar docks right of the name panel,
  horizontal scrollbar, columns keep widths, both applets healthy without
  reload; tweak name settings → Update saves live; unpin → overlay back;
  Present while pinned → clean present; Exit → overlay bar; ESC/✕ while
  pinned; narrow-window behavior.

## 2026-10-16 — fluid 2D via revived fResizeViewers (v48)

* Owner was right: no zoom-factor machinery needed for fit. Upstream JSME
  sanctions resize patterns (`JSME_resize.html`, `JSME_autoresize.html`;
  no-size construction = 100% of parent); `setSize` was already half in the
  tree (dead `fResizeViewers` + commented listener).
* `fResizeViewers` reworked (`molview-48.js`, `*48*`-only): 2D fits both
  applets to `viewerCol.clientWidth` (4px chrome gutter) + ratio height,
  then `fUpdateSVG` + numbering replay; 3D path kept, now guarded
  (`typeof Jmol` + try/catch — it runs live for the first time).
  Debounced `ResizeObserver` (~150ms, unchanged-width skip, no loop: box
  follows column) installed once in `jsmeOnLoad` after one initial fit;
  constructor stays `590×240`; zoom/storage untouched.
* Lesson logged: trust owner's codebase read first, verify second.
* Browser checklist for owner: drag-resize (settle-only rebuild, labels +
  numbering track, no jank); pin/unpin rescales; HIGHLIGHT-SURVIVAL VERDICT
  across setSize (fallback: re-fire selected component, narration-free);
  zoom ± then resize (user zoom intact); molecule switch mid-size;
  Save → Present → Exit.
* Follow-up (same day): owner console line `vh2=0 … visible2D=true` proved
  the helper blind to 2D — `#jsmeNomeclatureSVG` nests INSIDE
  `#jsmeNomeclatureDIV`, so the `viewerCol.children` loop could never match
  it (2D permanently on ratio fallback; the DIV also inflated chrome).
  Visibility now reads the overlay directly (the toggled unit); both hosts
  skipped in chrome. The debug line earned its keep. Awaiting owner
  re-check (`vh2>0`, larger `vh3`, JSmol-vs-container).
* Follow-up (same day): heights are container-derived now — new
  `fViewerHeights2D3D()` (viewport − page/column chrome, equal split,
  floors 244/120, phone cap ceiling; never reads viewer heights).
  `fResizeViewers` uses them for both applets (ratio formulas kept as
  hidden-viewer fallback); 3D height asserted on `resizeApplet` and the
  `jmolAppletNomeclature_appletinfotablediv` alike; container divs never
  sized explicitly. Observer tracks W+H (toggles, settings open).
  Checklist add: both-visible halves; hide 3D → 2D takes all and reverse;
  settings open shrinks viewers; short landscape cap; highlight re-check.
* Follow-up (same day): owner reported JSmol stuck below container height
  (202 vs 240 — the ratio fallback's fingerprint) and heights shrinking
  under the container. Response: (1) `MuLERmoCDebugResize` console flag (one
  `[resize]` line per run — helper values, fallbacks, applied sizes,
  visibility; owner pastes it back to close the loop); (2) 3D resize
  re-sent once on `jmol_isReady` (initial fit can predate applet
  readiness); infotablediv id confirmed by owner, no fallback needed;
  (3) dead-space top-up (`max` viewport/sibling share). Protocol: set the
  flag (no reload — window vars don't survive it), trigger any resize,
  paste the `[resize]` line.
* Follow-up (same day): owner reported the resized SVG keeps a small stale
  depiction (fixed by any zoom press; small CH4 on load too). Root cause:
  `setSize` resizes the box without re-fitting. Fix: extracted the zoom
  tail into `fReapplyZoomScale2D()` (scale + overlay + numbering, no value
  change, no narration; `fZoom2D` rewired through it behavior-identically)
  and called it in `fResizeViewers` after `setSize` — initial load included.
  Checklist add: resize refits immediately with no zoom press; fresh load
  shows full-size methane; zoom on top still works; highlight re-check.
