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
