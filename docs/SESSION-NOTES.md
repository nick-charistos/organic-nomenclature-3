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
  byte-identical (verified). `index.html` → 48 at fork time, then reverted
  to 47 (commit `f28ecc1`: v48 stays off-live until verified); `*47*` is the
  live landing + fallback, `*46*` untouched. `ui-icons.js`/`mols/`/`scenarios/` stay
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
* Follow-up (same day): pinned viewers shrink via `--viewerPinnedWidth`
  (`:root`, default `400px`) as a `max-width` ceiling over the measured
  lock (CSS-only, no JS; fluid pipeline follows automatically). Retune =
  one line + hard refresh;   `min-width: 290px` floors absurd values.
* Follow-up (same day): pinned drawer fills the bar (CSS-only, `:has()` on
  the open drawer, no JS; open drawer scrolls internally; grow animation
  instant-tall + fade when pinned). Checklist add: 1-step drawer fills to
  bar bottom; 12-step drawer fills + scrolls internally; accordion follows;
  unpin restores slide-down.
* Correction (same day): owner rejected stretch — the bar must ALWAYS equal
  the container's height (stretch let tall drawer content grow it
  unboundedly). Fix: bar absolutely positioned (`top/bottom: 0` in a
  `relative` authorLayout, `margin-right: 540px` band on the container), so
  it can never drive layout height; drawer `:has()` fill rules compose
  inside it unchanged. CSS has no sibling-height cap — absolute is the
  deterministic mechanism. Checklist add: tall drawer → bar == container
  height, internal scroll, page doesn't grow; short content → bar short.
* Follow-up (same day): pinned bar now spans the FULL page height — docks
  into `#pageContainer` (`scenario-48.js` host changed from `#authorLayout`),
  absolute `top/bottom/right: 0`; `#pageContainer` pinned = centered
  `1600px + 540px` unit with `min-height` (so tall content extends the bar
  instead of stranding it); `#pageTitle` and `#creditsUs` (also
  `width: auto`) take `margin-right: 540px`; `#authorLayout` is a plain
  `relative` wrapper (scroll buttons/fade stay anchored; their 540/548px
  offsets remain valid). Assumption recorded: the footer is inside the
  span; drop the footer margin rule if the bar should stop above it.
  Checklist add: bar runs title-to-footer; title/footer text clear of it;
  tall content extends the bar; unpin pixel-identical.

## 2026-10-16 — end-of-day state (handoff)

* Commits today (v47): panel conditional rows + stepper tooltips, numbering
  bonds checkbox + independent atom/bond gates, CSS color-var rename.
  v48 (`99c55be` fork, `f28ecc1` index→47, `212b729` fluid viewers,
  `d0deb93` pin-dock, `a4e6742` pin refinements). Owner pushes (no
  credentials in the assistant environment).
* Live: `index.html` → v47. v48 = working copy, off-live.
* v48 browser verdicts still open: full-height pinned bar (title→footer,
  footer margin assumption), scroll cues feel, unpin pixel-identity,
  Save → Present → Exit with pin on/off, highlight survival after
  height-driven `setSize`. Then switch `index.html` → 48.
* Known standing exclusions: `docs/flowchart-mermaid.md` (binary noise);
  `css/jsme-nick-47.css` owner overflow tweak was committed separately by
  the owner (`f05bb4c`).
* Lessons: owner's codebase read first, verify second; Jmol scripts need
  one `;` per clause boundary; measure layout BEFORE restyling it.

## 2026-10-17 — authoring pin preference persists (v48 working copy)

* Owner request: pin the scenario bar, close authoring (✕/ESC), reopen via the
  `Σενάρια` tab → bar must come back pinned; presentation always hides it.
* `scenario-48.js` only (no localStorage, no schema/version bump): new
  session-scoped `MuLERMoCScenario.pinPref` (remembered authoring pin choice,
  never in step JSON). Pin button records intent before toggling; new
  `fScenarioApplyPinPref()` re-docks when the bar returns, guarded to authoring
  and `!present` (no-op on unpinned/missing bar/deep-link present). Called at
  the end of `fScenarioSetAuthoring(true)` and `fScenarioExitPresent()`;
  `fScenarioSetAuthoring(false)` keeps its forced unpin (layout) but leaves the
  preference untouched; `fScenarioPresentBegin` still force-unpins without
  clearing the preference (so Exit restores it).
* Static: braces/parens/brackets balanced (`scenario-48.js`); 2 call sites +
  definition + button verified. No node runtime here — browser click-through
  pending.
* Browser checklist for owner: pin → ✕ → reopen tab → still pinned; unpin →
  ✕ → reopen → still unpinned; pin → Play (present hidden) → Exit → pinned;
  deep-link `?scenario=…&present=1` → Exit → no bar/pin; reload → unpinned;
  no spurious "Pin unavailable here." toast; `body.scPinned` layout clean.
* Docs: CHANGELOG `[Unreleased]` bullet, didactic §3 pin paragraph revised.

## 2026-10-17 (cont.) — app-row centering via `safe center` (v48)

* Owner question: the first `.HFlex` child of `#mainAppContainer` carries inline
  `style="justify-content: center"`; where/why does it change and can it stay
  centered? Finding: only `fScenarioSetPinned()` changed it — set `flex-start`
  while pinned (`scenario-48.js`) with a comment: centered overflow in the
  pinned horizontal scroller traps the left edge (LTR `scrollLeft` can't go
  negative), so pinned columns were left-aligned; the unpin clear `""` also
  dropped the inline value (no `.HFlex` rule backfilled it), so unpin silently
  left-aligned too. No CSS rule touches it (pinned CSS only adds `flex-wrap:
  nowrap`).
* Fix (owner chose `safe center`): `mulermoc-nom-48.html:97` inline →
  `justify-content: safe center`; `fScenarioSetPinned()` no longer writes the
  row's `justify-content` (removed the `flex-start` set + both `""` clears; the
  `var row` stays for the pin-unavailable guard). JS now has zero
  `justifyContent` refs. Columns center when they fit; `safe` falls back to
  `start` only on overflow, so the left menu stays reachable and the scroll
  cues' end-states stay truthful. Unpin restores center (quirk fixed).
* Support: Chrome/Edge 115+, Firefox 63+, Safari 17.6+; unsupported browsers
  drop the declaration → left-align (acceptable).
* Static: braces/parens/brackets balanced; `justifyContent` count 0. Browser
  click-through pending.
* Browser checklist for owner: unpinned centered; pinned + wide (fits) centered
  with no cues; pinned + narrow (overflow) left-aligned with working `‹`/`›`
  and reachable menu; pin → unpin back to centered.
* Docs: CHANGELOG `[Unreleased]` bullet (above).

## 2026-10-17 (cont.) — pinned is the default authoring state (v48)

* Owner request (clarified): the scenario panel stays **closed on page load**,
  but the pin *state* defaults to pinned, so the first time the user opens the
  panel via the `Σενάρια` tab it comes back docked.
* Change: one token in `js/mulermoc-nom-scenario-48.js` —
  `MuLERMoCScenario.pinPref: false → true`. `authoring` stays `false` (panel
  closed at boot, nothing docks until the tab opens) and `pinned` stays `false`
  (critical: `fScenarioApplyPinPref()` early-returns when `pinned` is already
  true, so a `pinned: true` default would silently skip the actual dock).
* Flow: load → closed; open `Σενάρια` → `fScenarioSetAuthoring(true)` →
  `fScenarioApplyPinPref()` docks. Unpin → `pinPref=false` for the session;
  reload → pinned again.
* Chosen polish (a): keep the current open animation order (bar slides in at
  the overlay position, docks a frame later); a brief jump is acceptable.
* Static: single-token change, braces balanced. Browser click-through pending.
* Browser checklist for owner: fresh load shows only the `Σενάρια` tab (no bar,
  no dock); open tab → bar docks pinned; unpin → close → reopen → unpinned;
  reload → open → pinned; deep-link present unaffected.
* Docs: CHANGELOG `[Unreleased]` bullet revised, didactic §3 pin paragraph
  revised.

## 2026-10-17 (cont.) — pinned layout tuning, veil/Jmol retirements (owner styling)

* Owner's uncommitted styling pass folded in and documented (no JS change):
  pinned band **540px → 480px** (`#pageContainer` `calc(1600px + 480px)`;
  `#pageTitle`/`#creditsUs`/`#mainAppContainer` `margin-right` 480;
  `#scenarioAuthorBar` width/max-width 480) with the cue column following
  (`#scScrollRight` 548 → 488).
* `#scPin`: `border: 2px solid var(--veryLightBlue) !important` (was 1px
  transparent); `#scPin.active`: `background: var(--vibrantGreen)` + white
  (was `var(--darkEarth)` + white border).
* Pinned title row fills dark — `body.scPinned #scenarioPlayBarTitle {
  background: var(--darkBlue); margin-bottom: 10px; padding-top: 0 }`; base
  `.scTitleText`/title rules simplified (font-family, margins, padding,
  background, border, radius dropped).
* Pinned drawer fill `min-height` 60vh → **85vh** (`.scenarioDrawer.open` 80vh
  commented, fills via flex).
* **Fade veil retired**: `#scScrollFade` block + show rule commented in
  `css/mulermoc-nom-scenario-48.css`, div commented in `mulermoc-nom-48.html`.
* `css/jsme-nick-48.css`: `.JmolContainer { height: 240px }` commented →
  fluid container height (aligns with the v48 native `setSize` pipeline).
* Standing exclusion reconfirmed: `docs/flowchart-mermaid.md` was again
  zlib-corrupted in the working tree (HEAD is UTF-8 text); restored via
  `git checkout --`, kept out of the commit.
* Docs: CHANGELOG `[Unreleased]` "Pinned layout tuning" bullet + stale
  540px/548px/veil/85vh numbers corrected; didactic §3 band value updated.

## 2026-10-17 (cont.) — single-viewer max-height control (v48)

* Owner request: let the author cap how tall a **single** (lone) viewer may
  grow, per step. Owner decisions: default = **Auto** (cap the survivor at the
  both-visible height, so hiding the other viewer never resizes it); store an
  **absolute px** in step JSON; lower the 2D floor to **200**; control = an
  **enable checkbox + slider** in the Ρυθμίσεις panel; **apply in presentation
  too**.
* Reconciled control: **unchecked = Auto / both-visible height**, **checked =
  Manual px**; the slider `max` is the live full single-viewer height, so the
  full height is always reachable; `min 200`, `step 10`.
* `molview-48.js`: new live global `viewerMaxH` (px | `null`; never
  `localStorage`). `fViewerHeights2D3D(raw)` returns `out.full` (single-viewer
  height regardless of current visibility) and, when exactly one viewer shows
  and `!raw`, caps it at `viewerMaxH != null ? viewerMaxH : shareFor(2)`,
  clamped into `[floor, single share]`; `raw` skips the cap (slider ceiling).
  New `fViewerMaxHeightFull/Sync/FromUi/Init`. 2D floor **244 → 200** in both
  the engine and `#jsmeNomeclatureSVG`. `fInitViewerMaxHeight()` called at load
  (after `fInitViewerSettingsBtn`); `fToggleViewerSettings` syncs on open.
  Init re-binds on `DOMContentLoaded` if the panel isn't parsed yet and guards
  double-binding via `dataset.vmhBound`.
* `mulermoc-nom-48.html` + `jsme-nick-48.css`: new `#viewerMaxHeightSetting`
  row (`#viewerMaxHeightCheck` `.checkBoxContainer`, `#viewerMaxHeightRange`,
  `#viewerMaxHeightVal`); panel `.open` `max-height` 260 → 330px; slider/value
  styling (`.viewerHeightRange`, `.viewerHeightVal`).
* `scenario-48.js`: additive optional `show.viewerMaxHeight` (default `null`,
  no `scenarioVersion` bump) with `fScenarioValidViewerMaxHeight` (null/empty →
  `null`, clamp 200–800, invalid → `null`); validate warning for non-empty
  invalid input; captured via `fScenarioG("viewerMaxH")`; applied by
  `fScenarioApplyViewerMaxHeight(step)` in both `fScenarioApply` branches;
  `viewerMaxH` added to the author-settings stash/restore (re-fits viewers on
  Exit).
* Static: braces/parens/brackets balanced in both edited JS files (python
  counts). No `node` in this environment → no runtime `--check`; owner browser
  click-through pending.
* Browser checklist for owner: open Ρυθμίσεις (⚙); check the box → slider
  enables, drag → lone viewer caps live; uncheck → Auto restores the
  both-visible height; hide one viewer while capped → height respects the cap;
  Save the step → JSON `show.viewerMaxHeight` is the px; reload/import →
  control shows Manual+px; Present a capped step → viewer caps, Exit restores
  the author value; slider max equals the full single-viewer height.
* Docs: CHANGELOG `[Unreleased]` new "Single-viewer max height" section +
  floors 244→200 corrected; didactic schema/`show` notes updated.
* Owner edits folded into the same commit: `index.html` redirect 47 → **48**
  (v48 now live), and `css/jsme-nick-48.css` `.settingRow` `min-height`
  36 → **30px**. CHANGELOG `[Unreleased]` header/lead updated to "live".

## 2026-10-17 (cont.) — 2D/3D detail toggles moved into Ρυθμίσεις (v48)

* Owner request: `Έγχρωμα Σύμβολα` (2D) and `Σύμβολα ατόμων` (3D) are
  detail-level, so move them out of the always-visible control bars into the
  gear settings panel. Owner choices: merge the 2D checkbox into the existing
  `Χρωματισμός ατόμων 2D` row; grey the atom/group radios while coloring is
  off; give 3D a lone labeled row; make the panel scroll internally.
* `mulermoc-nom-48.html`: removed `#svgAtomColorCheck` from `#radio2DMode` and
  `#atomSymbolsCheck` from `#controls3D`; `#svgAtomColorCheck` now sits inside
  `#atomColorModeRow` (label + checkbox + `#atomColorMode` radios); new
  `#atomSymbolsSetting` row (`Σύμβολα ατόμων 3D:` + `#atomSymbolsCheck`).
  IDs unchanged (all handlers are ID-based). Bars now: 2D = mode radios +
  `Σύμβολα CHn`; 3D = `Υδρογόνα C-H` + style + `Περιστροφή`.
* `molview-48.js`: new `fSyncAtomColorModeDisabled()` →
  `$("#atomColorMode .atomColorModeRadio").toggleClass("disabledRadio", !svgAtomColors2DFlag)`
  (existing `.disabledRadio` = `opacity .35` + `pointer-events:none`).
* `teaching-48.js`: call it after the `svgAtomColors2DFlag = true` init and
  inside the `#svgAtomColorCheck` click handler.
* `scenario-48.js`: call it from `fScenarioSyncControlUi` so per-step apply
  restores the dim state. No schema change (`style2D.atomColors` /
  `view3D.atomSymbols` unchanged; `scenarioVersion` stays 1).
* `jsme-nick-48.css`: `#viewerSettingsPanel.open` → `max-height:
  min(70vh, 400px)` + `overflow-y:auto` (two extra rows). No bar CSS change
  needed (`radioCheckContainer` carries its own `margin-left:12px`).
* Static: html `<div>` parity 81/81; both IDs still single-occurrence; JS
  brace/paren counts balanced (teaching-48.js keeps its pre-existing +1 `)`
  in a string, unchanged by this edit). Browser click-through pending.
* Browser checklist for owner: open Ρυθμίσεις → `Έγχρωμα Σύμβολα` + atom/group
  radios in one row, `Σύμβολα ατόμων 3D` row present; uncheck coloring → radios
  grey/inert, recheck → active; 2D/3D bars keep their remaining controls;
  panel scrolls if tall; per-step Save/apply still stores/applies atomColors /
  atomSymbols; Present hides the panel but values apply.
* Docs: CHANGELOG `[Unreleased]` new "Ρυθμίσεις panel: 2D/3D detail toggles
  moved in" section; didactic `show.controls.2D/3D` notes updated.

## 2026-10-17 (cont.) — narrow-viewer fluid UI text (v48)

* Owner request: shrink the 2D/3D settings text when the panel gets narrow
  (<~420px), e.g. to 0.75rem. Owner choices: panel **and** the 2D/3D bars;
  targeted wrappers only (keep `.settingTitle`); smooth `clamp()` (no
  breakpoint cliff).
* Key correction: a **media query would be wrong** — `#viewerCol` is 290–620px
  and ~400px when the scenario bar is pinned, decoupled from viewport width.
  Used a **container query**: `#viewerCol { container-type: inline-size;
  container-name: viewer }`. Safe: `.panelTitle` is the nearer positioned
  ancestor so the settings panel's containing block / `top:100%` is unchanged;
  only inline-size is contained (block size — the resize pipeline's
  `offsetHeight`/`ResizeObserver` — untouched).
* `css/jsme-nick-48.css`: `clamp(0.75rem, ~2.1–2.2cqi, <current>)` on
  `#viewerCol .settingLabel`, `.radioCheckContainer`, `.checkBoxContainer`,
  `#dropLabel`, `.dropLi`, `.viewerHeightVal`. At the 620px max the clamps
  equal the current sizes (wide layout unchanged), easing to 0.75rem as the
  column narrows. Scoped to `#viewerCol` (menus + scenario bar share these
  classes and stay untouched); `.settingTitle` left at 0.938rem for hierarchy.
  No container units support → declarations ignored, base sizes kept.
* Static: CSS braces balanced (289/289). Browser click-through pending.
* Browser checklist for owner: drag the column to 290px and pin the bar
  (~400px) → settings/bar text eases toward 0.75rem, no wrapping/overflow at
  the wrappers; widen to 620px → back to current sizes; `.settingTitle`
  unchanged; the left/right menus and scenario bar text unaffected.
* Docs: CHANGELOG `[Unreleased]` new "Narrow-viewer fluid UI text" section.




## 2026-10-17 (cont.) — adaptive pinned viewer width (v48)

* Owner request: the viewers column took a fixed ~400px while the scenario bar
  is pinned. Wanted it to keep its original width on large screens and only
  shrink to fit when the screen is narrower than mainAppContainer + panel.
  Owner choices: **400px floor**; **CSS clamp via a pinned #pageContainer
  query container**.
* Math: row = #menuCol 230 + gap 10 + viewer + gap 10 + #analysisCol 350
  (600 + viewer); pinned #mainAppContainer reserves 480 → fit needs
  `viewer <= pageContainer - 1090`. The inline pre-dock flex-basis locked in
  `fScenarioSetPinned` (<=620) is the upper bound, so a `max-width` only ever
  shrinks it — original width is preserved on wide screens.
* `css/mulermoc-nom-scenario-48.css`: `body.scPinned #pageContainer {
  container-type: inline-size }` (safe — it is already position:relative and
  the only position:fixed element, #rotatePrompt, is a direct body child);
  `body.scPinned #viewerCol { max-width: clamp(var(--viewerPinnedWidth,
  400px), calc(100cqw - 1090px), 620px) }`. `100cqw` = page-container content
  width (excludes the scrollbar); 1090 = band 480 + menu 230 + gaps 20 +
  analysis 350 + slack.
* `css/jsme-nick-48.css`: `--viewerPinnedWidth` comment re-documented as the
  clamp **floor** (was a hard cap).
* No JS: resize handled natively; the existing #viewerCol and
  #mainAppContainer ResizeObservers follow through the fluid pipeline.
  Unpinned layout untouched.
* Static: CSS braces balanced (jsme-nick-48.css 289/289; scenario-48.css
  174/174). Browser click-through pending.
* Browser checklist for owner: dock the bar on a wide screen → viewer keeps
  its original width (~620); narrow toward ~1500px → eases 620→400; below
  that → pinned at 400 with scroll cues only if it still overflows; unpin →
  normal centered layout; resize while pinned updates smoothly.
* Docs: CHANGELOG `[Unreleased]` new "Adaptive pinned viewer width" section.

## 2026-10-17 (cont.) — main-chain "Από δεδομένα" bullet inactive without data (v48)

* Owner request: in Ρυθμίσεις, the `Υπολογισμός κύριας αλυσίδας:` "Από δεδομένα"
  bullet must be inactive when the molecule has no stored main-chain data.
  Owner choices: also inactive when **no molecule** is selected; include the
  highlight hardening.
* Root cause: `fUpdateChainModeButton` (molview-48.js) gated the bullet with
  `!!nameExamples[selectedMol]?.["mainChain"+suffix]`; `!![]` is `true`, so the
  ten molecules with all-empty `mainChain_*` arrays (8 ethers/esters +
  methyl_2_pentane/dimethyl_2_3_butane) still showed it active. Missing keys
  (14 small molecules lack `_Skeletal`) were already handled.
* `js/mulermoc-nom-molview-48.js`: `hasChainData` now requires a non-empty
  array; no selected molecule also counts as no data (bullet starts inactive).
  Init call added in the `$(document).ready` block (`teaching-48.js`).
  Hardened `fHighLightMainChain`, `fHighLightMainChainBonds` and the skeletal
  case of `fShowNumbering` to fall back to the algorithmic chain on
  missing/empty stored arrays (previously an empty array yielded an empty
  highlight).
* `js/mulermoc-nom-scenario-48.js`: `fScenarioSyncControlUi` now calls the
  guarded `fUpdateChainModeButton()` (after `fUpdateDiagr2DButton`) so the
  bullet + mode re-sync on per-step apply/exit.
* No CSS/HTML change; `.disabledRadio` (opacity .35 + pointer-events:none) and
  the click handler guard already cover the inactive state.
* Static: JS braces/parens balanced (teaching-48.js keeps its pre-existing +1
  `)` in a string: HEAD 739/740 → now 741/742). Browser click-through pending.
* Browser checklist for owner: select an ether (e.g. dimethylether) → "Από
  δεδομένα" greyed and unclickable, "Αλγοριθμικά" selected; select pentane →
  bullet active again; skeletal mode on a small molecule (e.g. ethane, no
  `_Skeletal`) → greyed; before any selection → greyed; per-step Save/apply and
  Present/Exit keep the bullet consistent with the loaded molecule.
* Docs: CHANGELOG `[Unreleased]` new "Main-chain \"Από δεδομένα\" bullet
  inactive without stored data" section.

## 2026-10-17 (cont.) — settings panel no longer clipped by the viewer column (v48)

* Owner report: the settings panel (`#viewerSettingsPanel`) is inside
  `#viewerCol`, which had `overflow: hidden` (used to enforce the column's
  `border-radius: 5px` on whichever viewer is visible). With no viewer visible
  the column collapses to the title bar and the clip cut the dropdown off.
* Chosen fix (owner approved "go recommended"): CSS only. `#viewerCol`
  `overflow: hidden` → `visible`; bottom rounding moved to the last visible bar
  — `#controls3D` always (last child when 3D visible) and
  `#viewerCol:has(#controls3D.hide) #radio2DMode` when 3D is hidden — each
  `border-bottom-{left,right}-radius: 4px` (column 5px radius − 1px border).
  Both viewers hidden → the column's own rounded background renders the corner.
* Rejected alternative (structural wrapper around the viewer area + JS update to
  `fViewerHeights2D3D`, which sums `#viewerCol`'s direct children as chrome):
  same visual result, more risk. The clip-preserving option was declined.
* Known residual: pinned mode — `#mainAppContainer { overflow-x: auto }`
  computes `overflow-y: auto`, so no-viewer **and** pinned can still clip; a
  viewer-visible pinned panel fits the row and is fine. Unpinned fixed.
* Static: CSS braces balanced (290/290). Browser click-through pending.
* Browser checklist for owner: hide both viewers (2D + 3D title buttons) → open
  the gear → panel fully visible, not cut off; bottom corners of the column
  stay rounded with 3D on, with only 2D on, and with neither; toggle viewers
  while the panel is open → panel stays usable; tooltips on the zoom/save/2D/3D
  buttons unchanged.
* Docs: CHANGELOG `[Unreleased]` new "Settings panel no longer clipped when the
  viewer column is short" section.
* Docs sync (all): README, `docs/LAYERS-PLAN.md`, `docs/PROJECT-PLAN.md`,
  `docs/PROJECT-PLAN-GR.md` and `docs/didactic-scenario-plan.md` updated to the
  **v48-live** baseline (`index.html` → v48) and the shipped v48 features
  (fluid viewers, authoring pin-dock, single-viewer max-height, settings-panel
  pass). Historical SESSION-NOTES entries left as dated records.

## 2026-10-19 — pinned author bar slide-in (v48)

* Owner report: unpinned, the scenario author bar slides in/out (Σενάρια tab,
  ✕/ESC, Present→Exit); pinned, it snaps instead of animating (both open and
  close — the earlier "close already animates" assumption proved wrong in the
  browser).
* Root cause: `body.scPinned #scenarioAuthorBar` forced `transform: none;
  visibility: visible; pointer-events: auto; transition: none;`
  (`css/mulermoc-nom-scenario-48.css`, ~1339-1358), killing the entrance
  slide. Also, `fScenarioSetAuthoring(true)` (`scenario-48.js` ~1803-1823)
  adds `.open` then docks via `fScenarioApplyPinPref()` in the same task, so
  the bar is first painted already docked-and-open → no transition start.
* Fix attempts (v48 only, in-repo) and outcome:
  1. CSS-only: dropped the four pinned state declarations (`transform:none;
     visibility:visible; pointer-events:auto; transition:none`) so pinned
     inherits the base `.open` slide. **Still snapped** — the reparent makes
     the CSS transition see no clean closed→open pair.
  2. Reflow + `requestAnimationFrame`, then nested double-`rAF`
     (`fScenarioApplyPinPref`: `remove .open` → `void offsetWidth` → rAF×2 add
     `.open`). **Still snapped** — reparenting + the `visibility:hidden` start
     frame defeat the CSS transition.
  3. **WORKING: Web Animations API.** New `fScenarioSlideBar(dir)` runs
     `bar.animate([{transform:'translateX(100%)'},{transform:'none'}],
     {duration:250, easing:'ease'})` on slide-in; reverse for slide-out with
     `fill:'forwards'` + `.cancel()` on finish (no flash). Imperative, so no
     before-frame/reparent dependency. `.open` is still the state authority;
     `fScenarioReduceMotion()` guards `prefers-reduced-motion`; no-WAAPI/old
     browsers fall through to CSS (pinned snaps).
* Wired (final, Option B): `fScenarioApplyPinPref()` → `fScenarioSlideBar(1)`
  (Σενάρια open, Present→Exit). Pinned close → `fScenarioSlideBar(-1, onDone)`
  where `onDone` unpins (`fScenarioSetPinned(false)`), hides
  (`fScenarioSyncAuthorUi(true)`) and tears the drawers down while the slide's
  `fill:forwards` holds the bar off-screen; when the helper returns `false`
  (no-WAAPI/reduced-motion) the close falls back to the original unpin-then-CSS
  path. Direct pin-button dock (`fScenarioSetPinned` via `#scPin`) stays
  instant; unpinned open/close is untouched.
* CSS: `body.scPinned #scenarioAuthorBar` keeps geometry/`border`/`max-height`/
  shadow and **`transition: none`** (so CSS never races WAAPI); `transform`/
  `visibility`/`pointer-events` stay dropped so `.open` controls them.
* Notes: the 540→480px / `top:50px`→full-height geometry jump is still never
  animated (only the transform slide). Edge case: on ultra-wide viewports
  (>~2080px) the closed `translateX(100%)` parks into the right margin, but
  `visibility: hidden` keeps it non-interactive.
* Browser checklist (VERIFIED by owner 2026-10-19): open Σενάρια with pin pref
  on → single slide-in; ✕/ESC / Present→Exit → single slide-out; pin-button
  toggle → instant dock, no double animation; reduced-motion → instant.
* APPLIED 2026-10-19 (WAAPI, Option B): `fScenarioSlideBar` + `fScenarioReduceMotion`
  added; open/close wired; CSS `transition: none` kept in the pinned block.
  `node --check` OK; CSS braces 176/176. Owner click-through ✔ 2026-10-19.
* Follow-up (owner): WAAPI slid in/out, but the pinned **close** played
  close→open→close. Root cause was NOT a transition race: the close path
  removed `.open` (`fScenarioSyncAuthorUi(true)`) and then the helper
  **re-added** it (`classList.add("open")`) to make the bar visible for the
  slide — a genuine remove/re-add state flip, so the bar reappeared (the
  "open") before the WAAPI slid it out again. A first patch (inline
  `transition:none`) could not help because the re-show was a real state change.
* Fix (Option B, `fScenarioSetAuthoring(false)` + `fScenarioSlideBar`): the
  pinned close now slides the still-**docked** bar out FIRST (it stays `.open`
  for the whole slide; pinned CSS `transition: none` → no race), and the
  `.open` removal + unpin + drawer teardown all run from a new `onDone` callback
  that fires while the animation's `fill:forwards` still holds the off-screen
  pose — so state flips happen off-screen and `.open` is removed exactly once.
  `fScenarioSlideBar(dir, onDone)` now returns `true` when it started (false →
  the close falls back to the original unpin-then-CSS path), sets inline
  `transition:none` before the `getAnimations()` flush, and no longer touches
  `.open` itself for the out case. Pinned open is unchanged (single `.open`
  add). Unpinned open/close untouched.

## 2026-10-19 — save-image buttons follow the 2D/3D ρυθμίσεις checkbox (v48)

* Owner request: in a step's settings, checking `2D ρυθμίσεις` / `3D ρυθμίσεις`
  should also surface the corresponding save-image button in playback.
* Root cause: `fScenarioChrome` (`scenario-48.js` ~1759) gated `#save2DBtn` /
  `#save3DBtn` on `show.save["2D"|"3D"]`, but **nothing writes `show.save`** —
  it only appears in the capture defaults / normalize (`:356`, `:489`, `:499`).
  The per-step drawer's only relevant checkboxes are `2D/3D ρυθμίσεις`, which
  write `show.controls`, so the save buttons never appeared in presentation.
* Fix: each save button now rides its control bar —
  `save2On = !!c2 || (show.save["2D"] === true && show2D)`, likewise 3D — shown
  whenever `show.controls["2D"|"3D"]` is checked (and that viewer visible),
  still honoring a legacy `show.save` as an OR. Both switched from
  `fScenarioHide` to the class-aware `fScenarioShowBar` (they sit in
  `fScenarioRestoreChrome`'s list, so a stale `hide` class from a no-viewer exit
  could otherwise suppress them). No schema change; `fScenarioUpdateStep`
  already preserves `show.controls`, so Update keeps working.
* Docs: didactic `show.save` note + CHANGELOG `[Unreleased]` subsection.

## 2026-10-19 — present step-text reserved in the viewer height fit (v48)

* Owner: single-viewer height (explicit via Ρυθμίσεις `Όριο ύψους μεμονωμένου
  viewer`) and the two-viewer auto-fit are fine; the gap is **presentation with
  two viewers** — the fit must also account for the `#scStepText` note card.
* Root cause: `fViewerHeights2D3D` (`molview-48.js` ~6370) subtracts the
  header, `#pageTitle` and `#creditsUs` but **not `#scStepText`** (the note card
  inserted after the h1, normal flow above the columns). With a note, viewers
  took the full height and the page scrolled.
* Fix: subtract the visible card's `offsetHeight` + computed top/bottom margins
  (`margin:-10px auto 20px auto` → net +10px). Authoring is unaffected (card is
  `display:none` → `offsetParent` null). Because the step apply fits the
  viewers *before* `fScenarioChrome` fills the new card, `fScenarioChrome` now
  re-runs `fResizeViewers()` (present-only) right after
  `fScenarioFillStepPanel`/`fScenarioHide("scStepText")`; the `offsetHeight`
  read forces the fresh layout. Width-driven re-fits stay on the `#viewerCol`
  observer (`fInitZoomObserver2D`). Note: `#scenarioPlayBar` is `position:fixed`
  (out of flow), so it adds nothing to the budget.
* Verified static (`node --check`); owner browser test pending (Present a note
  step with both viewers visible).

## 2026-10-19 — shared 240px viewer min-height floor (v48)

* Owner: with a long note the viewers (esp. 3D) shrank too far; add a minimum.
  Chosen: one shared floor, **240px** for both viewers; keep it a fixed
  constant (not a control).
* Change: `const VIEWER_MIN_H = 240` (`molview-48.js`, next to `viewerMaxH`)
  replaces the old literals — 2D `200` and 3D `120` — throughout
  `fViewerHeights2D3D` (`out.full`, the single-viewer `cap2`/`cap3` clamps, and
  the final `out.h2`/`out.h3`). The max-height control follows the floor too
  (`fViewerMaxHeightFull` ceiling, `fViewerMaxHeightSync`/`FromUi` clamps,
  `#viewerMaxHeightRange` `min` 200 → 240 in `mulermoc-nom-48.html`).
* CSS mirrors the floor so the applet box and DOM agree: `.JmolContainer`
  120 → 240 and `#jsmeNomeclatureSVG` 200 → 240 (`jsme-nick-48.css`).
* Behavior: a long present note can now push the page into scroll instead of
  shrinking the viewers below 240. The tiny-screen phone cap
  (`innerHeight < 430` → 30%) is unchanged and still acts as the final ceiling,
  so on very short/landscape-phone windows the effective minimum can be lower.
* Docs: CHANGELOG `[Unreleased]` "Shared 240px viewer min-height floor";
  didactic §3 floor note updated.

## 2026-10-19 — double-viewer height control (v48)

* Owner: add a second height control to Ρυθμίσεις, mirroring the single-viewer
  one — for the case where **two** viewers are shown. Unchecked = Auto (today's
  equal split); checked = a slider that sets BOTH viewers' height.
* Decisions: per-step (stored like `show.viewerMaxHeight`) and a **fixed
  400–800px** slider range. (Owner had earlier hand-tuned `VIEWER_MIN_H` 240 →
  200; the new control's 400 floor is independent of that shared floor.)
* `molview-48.js`: new live global `viewerBothH` (`null` = Auto) + constants
  `VIEWER_BOTH_MIN = 400` / `VIEWER_BOTH_MAX = 800`. `fViewerHeights2D3D` sets
  `cap2 = cap3 = clamp(viewerBothH, 400, 800)` when `n === 2 && !raw`; Auto
  leaves the split untouched, `raw` skips it. New `fViewerBothHeightSync` /
  `fViewerBothHeightFromUi` / `fInitViewerBothHeight` (bound at load and synced
  when the panel opens), parallel to the `fViewerMaxHeight*` trio.
* `mulermoc-nom-48.html`: new `#viewerBothHeightSetting` row (label `Ύψος δύο
  viewers:`, checkbox, `#viewerBothHeightRange` `min 400 max 800 step 10`,
  readout) reusing the existing classes — no CSS change.
* `scenario-48.js`: per-step `show.viewerBothHeight` — `fScenarioValidViewerBothHeight`
  (clamp 400–800, invalid → `null`), `fScenarioG("viewerBothH")` case, capture,
  default, normalize, validate warning; `fScenarioApplyViewerMaxHeight` also
  applies it + syncs the control (both apply sites); stash/restore around
  Present. No schema bump.
* Verify: `node --check` on both JS files (no browser runtime here); browser
  click-through pending — toggle the box with two viewers, drag the slider,
  Save a step, replay in Present, Exit (author setting restored), Export/Import.
* Docs: CHANGELOG `[Unreleased]` "Double-viewer height (Ρυθμίσεις control,
  per-step)"; didactic §3 `show.viewerBothHeight` bullet.

## 2026-10-19 (cont.) — double-viewer height: combined-total override (v48)

* Owner report: "did not see any change" + two requirements — the value is the
  **overall** (2D+3D combined) height, and the viewers must move live as the
  slider is dragged (like the single-viewer slider).
* Root cause: the first cut applied `viewerBothH` as a per-viewer **cap**
  (`out.h2 = min(max(each, floor), cap, phoneCap)`) — a cap can only **shrink**.
  With the auto split (`each`) already below 400px on common screens, the whole
  400–800 range was a no-op → "no change".
* Fix (`molview-48.js` `fViewerHeights2D3D`): in the two-visible Manual branch,
  **override** each viewer with `each2 = each3 = round(clamp(total, 400, 800) / 2)`
  (per-viewer `each2`/`each3` feed the final `out.h2`/`out.h3`); 400 → 200px
  each, 800 → 400px each. It now grows **and** shrinks; Auto is unchanged; the
  single-viewer path still uses its cap.
* Live adjust: `fViewerBothHeightFromUi` already ran `fResizeViewers()` on each
  `input`; the override makes that effective. Readout (`fViewerBothHeightSync`)
  now shows the **combined** height (Auto = `h2 + h3`, Manual = `viewerBothH`),
  `Npx` in both states.
* Label: `Ύψος δύο viewers:` → `Ύψος δύο viewers (σύνολο):`.
* CSS floor: `.JmolContainer` / `#jsmeNomeclatureSVG` `min-height` **240 → 200**
  to match the live `VIEWER_MIN_H`, so total 400 (= 200 each) is reachable
  instead of clipped by the DOM floor.
* Owner picked "align CSS to 200" (over keeping 240 with a 480 slider min).
* Verify: `node --check` both JS; browser click-through pending — with two
  viewers, check the box and drag: both resize live (0 → combined total), Save,
  replay in Present, Exit. Commit `v48: double-viewer height = combined total
  (override, live)`. Docs: CHANGELOG/Didactic corrected to "combined total,
  each = half".

## 2026-10-19 (cont.) — viewer floor 150 + CSS var sync (v48)

* Owner hand-tuned `VIEWER_MIN_H` **200 → 150** and `VIEWER_BOTH_MIN/MAX`
  **400/800 → 300/1000**, but reported the containers still bottomed out at
  200px.
* Root cause: `#nomeclature3D` is `<div id="nomeclature3D" class="JmolContainer">`
  and `#jsmeNomeclatureSVG` (inside `#jsmeNomeclatureDIV`) both carried
  `min-height: 200px` — set in the previous commit (`f1876c9`, 240 → 200).
  `min-height` beats the inline `height` that `fResizeViewers()` writes
  (`svg.style.height`, `Jmol.resizeApplet(...,{height})`, and the applet
  info-table div), so the JS floor change alone could never show.
* Fix (owner picked "drive CSS from the JS constant"):
  `css/jsme-nick-48.css` — `.JmolContainer` / `#jsmeNomeclatureSVG` now use
  `min-height: var(--viewerMinH, 150px)`, with `--viewerMinH: 150px` in `:root`
  as the no-JS fallback. `molview-48.js` pushes the constant once at load:
  `document.documentElement.style.setProperty("--viewerMinH", VIEWER_MIN_H + "px")`.
  The two can no longer drift (both prior mismatches — 240 vs 200, 200 vs 150 —
  came from hand-copied literals).
* Range: `#viewerBothHeightRange` static `min`/`max` → 300/1000 (the runtime
  `fViewerBothHeightSync` sets them from the constants; scenario clamp follows
  automatically). Comments updated (JS trio header + `fScenarioValidViewerBothHeight`;
  CHANGELOG/Didactic numbers → 300–1000, each 150/500, floor 150).
* Verify: `node --check` both JS; browser click-through — drag the combined
  slider to min (300 → 150px each) and confirm both containers actually reach
  150 (and that the JSmol 3D view renders at that size). Commit `v48: viewer
  min-height 150 via --viewerMinH (CSS driven by VIEWER_MIN_H)`.

## 2026-10-19 (cont.) — delete icons + confirm dialog (v48)

* Owner dropped three SVGs in `imgs/` (`delete-scenario-`, `close-panel-`,
  `clear-svgrepo-com.svg`) and asked to inline them in `ui-icons.js` and use
  them for the scenario-card `.scDelete`, `#scCloseBar`, and the step-row
  `Διαγραφή` action respectively; then flagged that scenario/step delete is
  **unrecoverable** and asked for a confirmation step.
* Icons inlined (source `imgs/*` are **gitignored**, so the art ships inline —
  same as `pin`/`saveImage`): `deleteScenario` + `closePanel` in the Illustrator
  `-9 -244 800 800` block (beside `columns1/2`/`formatClear`), `deleteStep` in
  the 512 block (beside `closeSmall`); `fill → currentColor`, 16px, dropped
  `<title>`/`id`/`enable-background`.
* Wiring: `.scDelete` → `fScenarioPaintIconBtn("deleteScenario")`; `#scCloseBar`
  → `closePanel` (mirror of the `#scPin` hydrate line, `✕` fallback); step-row
  def key `closeSmall` → `deleteStep` (key only — label/aria untouched, so the
  other versioned scenario files that still use `closeSmall` are unaffected).
  `#scCloseBar svg` added to the shared 16px rule.
* Danger hover: step delete gets a `delete` class; rule
  `#scenarioAuthorBar .scenarioDrawer .srow .scIconBtn.delete:hover` fills
  `var(--redAlert)` — id-qualified because a bare `.srow … .delete` selector
  loses to `#scenarioAuthorBar button:hover`. `--redAlert` (#b90000) added to
  `jsme-nick-48.css` `:root`.
* Confirm: `fScenarioConfirm` singleton modal (built like the toast) — backdrop +
  panel, safe-focused `Άκυρο`, red `Διαγραφή`, ESC (capture-phase, so the author
  bar stays open) + backdrop cancel. Scenario + step deletes route through it;
  message names the scenario title / step number; **always** confirms.
* Verify: `node --check` both JS; CSS braces balanced. **No browser runtime
  here** — click-through pending (both deletes prompt; Άκυρο/ESC/backdrop keep
  data; delete hover is red; the three icons render).
* Docs: CHANGELOG `[Unreleased]` "Scenario/step delete: dedicated icons + red
  danger hover + confirm dialog"; didactic §3 delete notes.
* Commit `v48: delete scenario/step icons + red danger hover + confirm dialog`.

## 2026-10-19 (cont.) — main-chain multiple-bond priority + alkene test molecules (v48)

* Owner added two alkene test structures from a contributor archive:
  `methyl_2_propene` (`CH2=C(CH3)CH3`, PubChem CID 8255) and
  `methyl_3_butene_1` (`CH2=CHCH(CH3)CH3`, CID 11239) — three MOL2D forms each,
  3D SDFs downloaded into `mols/nomeclature-moc2/`, stored `mainChain_*`
  arrays empty. Contributor archive (`archive/Giannis_Skendros/`) is now
  gitignored.
* Bug exposed by the stepper: `methyl_2_propene` showed **3** chains — the two
  C=C paths plus the saturated `CH3–C–CH3` path — because `fRankChainPool`
  filtered to the max-length tier and the legacy comparator only used
  multi-bonds after length/anchors.
* Rule (owner decision): rank multiple bonds first globally, even when a
  shorter chain has more: max CC multiple bonds (C=C + C≡C) → max C=C →
  longest chain → FG anchors. FG-anchor cover filter stays first; ties remain
  in the pool.
* Code (`core-48.js`): 2D/3D Step 7 comparator and `fRankChainPool` updated to
  the same order; `molview-48.js` comment now says multiple-bond-first. No
  orientation/numbering changes.
* Verify: static 2D all-variant regression — only `methyl_2_propene` pool
  changes (3 → 2, both C=C); no selected-chain changes; FG + multiple-bond
  examples (`penten_1_one_3`, `pentyn_4_one_2`, etc.) have one carbon path and
  are unchanged. Owner browser-tested the stepper (`methyl_2_propene` 2/2).
* Docs: CHANGELOG `[Unreleased]` subsection; README/PROJECT-PLANs/LAYERS/didactic
  synced to 71 keys and multiple-bond-first wording (historical 69 references
  left intact).
* Commit `v48: multiple-bond-first main-chain ranking + 2 alkene test molecules`.

## 2026-10-20 — v48 review: bounds, width cap, confirm a11y, doc sweep

* Review of the v48 file set + markdown docs (static; no browser runtime here).
* `scenario-48.js`: `fScenarioValidViewerMaxHeight` now clamps
  `VIEWER_MIN_H`–`VIEWER_MAX_H` (150–2000) instead of the hardcoded 200–800,
  so a slider value (150 or >800) is no longer silently rewritten on
  Save/apply; live apply still re-clamps to the real single-viewer share. The
  new `VIEWER_MAX_H` constant lives in `molview-48.js` as a sanity ceiling
  (the slider ceiling itself stays screen-derived).
* `scenario-48.js`: the confirm dialog removes a stale capture listener before
  re-arming, stores/restores focus to the triggering control, and labels the
  dialog via `aria-labelledby` (`#scConfirmMsg`).
* `css/mulermoc-nom-scenario-48.css`: `#scStepText` is now `width: 980px;
  max-width: 100%` — the empty default stays 980 while explicit
  `styleText.textWidthPx` values (up to 1200) take effect (previously capped by
  `max-width: 980px`). `mulermoc-nom-48.html`: single-height range no-JS
  fallback min 240 → 150.
* `core-48.js`: comment only — `oriented` (the unfiltered Step 7 pick used for
  ether/ester info) must not be used as the displayed chain; pool[0] is
  authoritative.
* `ui-icons.js`: dropped the unused `deleteScenario` key (the card has used
  `deleteStep` since `11685fb`; no version referenced it). `deleteStep` stays.
* Docs reconciled: README (v48 repo row, baseline/verification wording,
  double-viewer control, removed the fixed grouped-menu gap and the stale v45
  working-copy line); didactic (molview-48, 150–2000 message, deleteStep ×2,
  width wording, v48 status); PROJECT-PLAN/.GR (scenario-48 paths, v48
  headings, height wording); CHANGELOG (shared icon keys, deleteStep wiring +
  dropped key, min 150 / 150–2000, misc-UI bullets for the narrate icon and
  name-style active states).
* Checked: `node --check` on the five `*-48.js` files + `ui-icons.js`;
  `deleteScenario` → 0 references; CSS braces balanced.
* Verify (owner): browser click-through still pending for the confirm dialog
  (both deletes + Άκυρο/ESC/backdrop/focus return), single height 150 & 900
  round-trip, both height 300/1000, step width 1200, pin/unpin with both
  viewers (ResizeObserver warnings), narrow-viewport overflow.

## 2026-10-20 — v48 scenario UX: per-step Present, persistent drawer, Play from step 1

* `scenario-48.js`: every step row now has `.scPresentStep` (`screen` icon,
  dark-blue chrome) that calls top-level `fScenarioPresentBegin(scenId, idx)`.
  Card `Play ▶` calls it without an index; `startIdx` defaults to `0` and is
  clamped, so card Play always starts at step 1. The temporary start-at number
  input (`.scStartAt`) and `fScenarioClampStartInput`/`fScenarioSyncStartInput`
  are removed; the button-panel gap is back to 10px and the four actions stay
  on one row.
* `fScenarioPresentBegin` was hoisted out of `fScenarioBuildUi` (the row
  handler previously hit a `ReferenceError`); default start and the
  `#step=N` hash now follow `startIdx + 1`.
* Drawer persistence: authoring-off and Present no longer remove
  `.scenarioDrawer.open` / `.scList.active`; the CSS hidden-bar rule hides the
  drawer while the bar is away (`visibility:hidden` + `pointer-events:none`,
  delayed past the slide), so close → reopen and Play → Exit return to the
  same card and scroll. Steps/bar-gap clicks still close it. `fScenarioExitPresent`
  calls `fScenarioScrollDrawerToStep` (rAF + 120ms) to bring the presented row
  back into view.
* Step Delete moved to the row's top-right corner (transparent until hover, red
  hover); row actions are wired by class instead of positional button indices.
* Docs: didactic §3/§4, README scenario bullet, CHANGELOG entry. Static checks:
  `node --check`, CSS braces balanced, `git diff --check`. Headless integration:
  card Play at index 20 → 0, row Present → 10, drawer persistence + Exit scroll,
  no console errors. Owner browser click-through pending (row Present
  first/mid/last, card Play, drawer persistence, tooltip/Delete hover in the
  scrolling drawer).

## 2026-10-20 — v48 local alkene trial, locant/highlight fixes, name auto-fit

* New molecule `ethyl_3_dimethyl_2_5_hexene_2` (3-ethyl-2,5-dimethylhex-2-ene,
  C10H20, PubChem CID 56988951): empty `mainChain_*` arrays + 3D SDF
  `mols/nomeclature-moc2/ethyl_3_dimethyl_2_5_hexene_2_3D.sdf`; 72 keys total.
* Naming (`core-48.js`): internal double/triple-bond locant preserved for
  substituted hydrocarbons via a guarded `comp1No` fill; terminal names
  unchanged. New molecule names `3-αιθυλο-2,5-διμεθυλο-2-εξένιο`.
* Highlight (`molview-48.js`): `fGetHydrocarbonBranchHighlight[/3D]` gained an
  optional group slot; branch atoms are filtered by the locants in
  `nameComponentsList[slot*2]` and `fHighlightFG[/3D]` picks the slot from
  `FGno`. `comp0`/`comp1` (`3-`/`αιθυλο`) now highlights ethyl only;
  `comp2`/`comp3` (`-2,5-`/`διμεθυλο`) highlights the two methyls only
  (2D + 3D).
* Name auto-fit (`jsme-nick-48.css` + `molview-48.js` + `teaching-48.js`):
  `fFitNameComponents()` binary-searches `--nameCompScale` on
  `.nameCompContainer` (transitions disabled while measuring), floor 0.7, and
  toggles `.nameOverflow` (`overflow-x:auto`, `justify-content:flex-start`)
  when the floor still overflows. Re-runs on `fShowNameAnalysis`, box/cross
  toggles, box selection, and a debounced `#analysisCol` `ResizeObserver`.
* Checks: five `*-48.js` `node --check`; `git diff --check`; headless
  local-HTTP harness (new + long names, boxes/`+` toggles, forced 120px
  column, `comp0`/`comp2` highlight) — no JS errors; owner browser
  click-through pending.
* Docs synced to 72 keys (README/PROJECT-PLANs/LAYERS/didactic/CHANGELOG);
  historical 71 references left intact.

## 2026-10-21 — v49 fork + student (thesis-work) import: parent-chain fix + 73rd molecule + scenarios

* Forked `*48*` → `*49*` (html + 5 js + 2 css); only the 7 asset refs in
  `mulermoc-nom-49.html` changed. `js/ui-icons.js` shared (byte-identical).
  `index.html` flipped → v49 for release; v48 and earlier remain runnable.
* Source: MSc student's branch `yanisken9/organic-nomenclature-3@thesis-work`
  (tip `48ca292`), based on `f1ac038`; compared via the GitHub API against local
  `1ac7636`. **Kept local**: `fFitNameComponents` name auto-fit (0.7 scale floor
  + horizontal-scroll fallback — chosen over their floorless `fFitNameToWidth`),
  structural branch highlight. **Not imported**: the Namelecule product layer
  (theme, welcome/library, loading/error screen, `showStepNumbers`/
  `reserveTitleSpace`, mint/teal); the alkyl table was reimplemented locally
  with nested divs and the v49 palette.
* Core (`core-49.js`): ported the acyclic-alkane parent fix — new helpers
  `fIsAcyclicHydrocarbonGraph`/`fCarbonBranchLocants`/`fCompareLocantSets`;
  `fRankChainPool` gains connectivity/type args and, only when `bestMu===0` and
  the graph is connected acyclic all-C/H, keeps max branch count then lowest
  oriented branch locants; both 2D/3D call sites pass the arrays;
  `fOrientChainPath[/3D]` tier-3 now includes carbon-branch locants. The new
  alkane goes 6 → 4 candidate paths, all `3-αιθυλο-2,5-διμεθυλοεξάνιο`.
* Core (`core-49.js` `fGuessName`): adopted the explicit terminal locant —
  branched hydrocarbons with a single multiple-bond type always keep the bond
  locant in `comp1No` (incl. position 1): `3-μεθυλο-1-βουτένιο`; mixed en-yne
  keeps the double in `comp1No` and the triple in `comp3`.
* Data (`data_49.js`, **73 keys**): added `ethyl_3_dimethyl_2_5_hexane`
  (C10H22, PubChem CID 521421) + three 2D MOL forms +
  `mols/nomeclature-moc2/ethyl_3_dimethyl_2_5_hexane_3D.sdf` +
  `mols/new_molecules/` sources; stored `mainChain_*` filled for
  `methyl_2_propene`/`methyl_3_butene_1`/`ethyl_3_dimethyl_2_5_hexene_2`
  (activates "Από δεδομένα" for them); `methyl_2_propene` formula →
  `CH2=C(CH3)2`.
* Scenarios: imported `Αλκένια-Ονοματολογία_και_διακλαδώσεις.scenario.json`
  (22 steps) + `Αλκένια-Αιθένιο.scenario.json` (7 steps); numbered/English
  drafts and the old `ethene.scenario.json` skipped. All `selectedMol` keys
  verified against the 73-key set.
* Teaching (`teaching-49.js`/`molview-49.js`): reimplemented the alkyl reference
  table with nested `ruleRow` divs + `.ruleAlkyl` CSS (no table-specific
  stylesheet); branch locants (`compNumber1`/`compNumber2`) and branch names
  show it, all relevant paths reveal `#ruleTheoryContainer`; added missing
  `compBondType2`/`compEndNumber` rule cases (enyne `-ιν-` no longer renders an
  `undefined` tile/table); `fGetNameComponentLocants` splits comma/hyphen
  locants.
* Checks: JS syntax checked on changed `*-49.js` (esprima); CSS braces
  301/301, no leftover `alkylRuleTable`/`tr.selected`; 73/73 data keys and
  scenario refs; `git diff --check` only reports trailing whitespace inherited
  from the forked/imported files. Owner browser click-through pending.
* Repeatable import procedure documented in `docs/STUDENT-IMPORT.md`.

## 2026-10-21 — v50 presentation text position (top / left rail)

* Forked v49 byte-identically to `*-50` (`html`, data, core, molview,
  teaching, scenario, both CSS files); HTML refs and version headers updated;
  `index.html` initially → v50 (later restored to v49, see below).
* Added additive `styleText.position` (`"left"` or null = top; no schema bump)
  to capture/defaults/validation/update-preservation. New `Θέση: Πάνω /
  Αριστερά` select in the step note toolbar.
* Left mode: `#pageContainer.presenting.scTextLeft` becomes a 2-column grid at
  ≥1200px (`clamp(300px, 24vw, 420px)` rail + app); the note is a sticky,
  internally scrolling card (`max-height: calc(100vh - 80px)`); below 1200px
  it falls back to the top card. Width and 2-column settings apply to top mode
  only; left always renders one column.
* Viewer fit: `fViewerHeights2D3D` now skips the note-height subtraction only
  when the applied layout is the side-by-side grid (computed `display:grid`
  probe), and top↔left switches trigger `fResizeViewers()` after layout.
* Docs: initially README baseline/entry/file map/status, CHANGELOG `[v50]`,
  LAYERS, PROJECT-PLAN EN/GR, didactic schema/UX/status, archive README
  (then restored to v49 live / v50 parked at end of session).
* Checks: JS delimiter balance, CSS braces 201/201 scenario + 301/301 main,
  HTML refs resolve, Markdown links 0 missing. No browser runtime here;
  owner click-through pending (wide/narrow, menu steps, long notes,
  top↔left, 2D/3D refit).
* End of session: v50 parked (not live); `index.html` restored to
  `mulermoc-nom-49.html`; README, CHANGELOG, LAYERS, PROJECT-PLAN EN/GR,
  didactic plan, handoffs, and archive README updated to v49 live / v50
  parked. v50 files remain at root for later verification.

## 2026-10-22 — v50 side text rails (left/right) + persistent naming shell

* Text placement reworked from the left-only grid to a fourth flex item:
  `styleText.position` now accepts `"left"`/`"right"` (null = top); the note
  is inserted first/last inside `#mainAppContainer > .mainApp3Columns`, shares
  the 8px row gap, and returns to the top slot before `#mainAppContainer` for
  top/fallback/exit. Page max width `calc(1600px + clamp(300px, 24vw, 420px) +
  8px)` with matching menu/analysis clamps; rail width
  `clamp(300px, 24vw, 420px)`, sticky, internally scrolling, height capped to
  the tallest visible app column and `100vh - 80px`.
* `scenario-50.js`: `fScenarioSyncStepTextLayout()` reparents on apply/resize/
  exit; `fScenarioSyncStepTextHeight()` + `ResizeObserver` keep the cap in
  sync; `fViewerHeights2D3D()` skips the note-height subtraction only while a
  side layout is applied; top↔side switches refit viewers. Step toolbar now
  uses a `Θέση: Πάνω / Αριστερά / Δεξιά` icon dropdown.
* Persistent naming shell: `fDeselectMol()` clears `nameComponentsList` and
  calls `fShowNameAnalysis()` instead of emptying `#nameAnalysis`;
  `fShowNameAnalysis()` forces `compCount = 0` without a molecule and renders
  `.nameEmptyHint` (“Επιλέξτε μόριο για ανάλυση ονόματος”). The title/gear
  shell initializes on page ready after `fInitTheory()`. Presentation keeps
  the existing `show.nameSettings` gate for gear/panel/voice, but the title is
  always present; legacy `show.naming`/`show.nameClick` are untouched.
* `fScenarioApplyNamingChrome()` counts
  `.nameCompContainer .nameCompBox:not(.comp-hidden)` and hides the explain
  line at zero; menu-only hints reappear only after free browse renders boxes.
  `.nameEmptyHint` CSS added at `css/jsme-nick-50.css:410`.
* Checks (earlier in this session, not rerun for the docs pass): `node
  --check` on molview/teaching/scenario; CSS braces `213/213` scenario +
  `303/303` main; `index.html` still → v49; headless DOM smoke check showed the
  persistent naming shell. Owner browser click-through pending (rails both
  sides, wide/narrow, menu steps, long notes, refit, no-molecule placeholder,
  presentation `Name controls`).
* Docs sweep: README, CHANGELOG `[v50]`, LAYERS, PROJECT-PLAN EN/GR, didactic
  plan, archive README, and new `SESSION-HANDOFF-2026-10-22.md` synced to v49
  live / v50 parked. No commit.

## 2026-10-22 (cont.) — v50 promoted live; new default scenario

* Owner pointed `index.html` → `mulermoc-nom-50.html`; v50 is now the live
  baseline. v49 and earlier remain runnable at root.
* `js/mulermoc-nom-scenario-50.js`: `defaultScenarioUrl` now loads
  `scenarios/Αλκάνια-Αιθάνιο-τεστ.scenario.json` (7 steps; steps 5–7 use the
  left text rail with longer notes). The previous
  `scenarios/Αλκάνια-Αιθάνιο.scenario.json` stays on disk for explicit
  `?scenario=` links but is no longer the boot default.
* Docs resynced from v49 live / v50 parked to v50 live: README, CHANGELOG
  `[v50]`, LAYERS, PROJECT-PLAN EN/GR, didactic plan, archive README, and the
  2026-10-22 handoff; earlier handoff banners updated for the current baseline.
* No static checks rerun (standing docs-only/no-check instruction); JSON files
  exist and the new scenario was already parsed during inspection. No commit.
