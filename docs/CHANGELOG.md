# Changelog

All notable changes to the Οργανική Ονοματολογία MuLERMoC.

---

## [Unreleased] (v44 working copy)

### Per-component name visibility (eye toggles)

- Master eye-edit switch in `#nameSettingsPanel` (`#nameStyleEyeToggle`, live-only `window.nameEyeEdit`, never stored; single `eye-state-button` icon + `.active` highlight): reveals a small eye button above each name component (`js/mulermoc-nom-molview-44.js`, `js/mulermoc-nom-teaching-44.js`, `css/jsme-nick-44.css`). Eye artwork from the Industrial-Sharp set (`imgs/eye-*.svg`, inlined as consts with `currentColor` fills; uniform `-9 -244 800 800` viewBox).
- Hidden boxes render a dash on a `lightBlue` fill (`.comp-hidden`), stay inert (no highlight/explanation; stored highlight replay skips them), and masking applies at box-construction time so every rebuild honors it.
- Narration follows visibility (`#readNameBtn`, `fSpeakNameWithPauses`); PNG export shows the dash boxes as displayed (DOM clone, no code change).
- Scenario steps store `styleName.hidden` (comp ids) + `show.nameEye` (per-step drawer checkbox `Ορατότητα συνθετικών`, default off, molecule steps only): checked steps keep live eye toggles in presentation (step data untouched); unchecked steps render dashes with no toggles. `Update` refreshes `hidden` from the live view and preserves `nameEye`; legacy files default to all-visible. Present entry stashes / Exit restores the author's live hidden set + edit mode.
- New-molecule reset: selecting a molecule clears the hidden set (all visible); scenario steps re-assert their stored set after the load. In presentation, per-box eyes ignore the authoring master flag — unchecked steps never show eyes.
- Exit restores interactivity: `fScenarioApplyNamingChrome` actively clears a leaked `.locked` class + hidden explain line outside presentation (a locked present step no longer leaves boxes dead in authoring).
- Hiding the selected component clears its highlights + rule theory first (deselect mirror); hiding a non-selected box leaves the live selection untouched.
- Zero visible components hides the explain line (restored on reveal; menu-only present steps keep their hint by design). The non-present chrome hook applies the same verdict so it can't resurrect a hidden line on authoring rebuilds.

## [v44] — 2026-10-07 (index →44; v43 frozen at tag `v43`)

New parallel file set `mulermoc-nom-44.html` + `js/*-44.js` + `css/*-44.css`, copied from v43 (`index.html` → v44 since `905946e`; browser verification pending). All fixes below are `*44*`-only; `*43*` untouched.

### Engine (`js/mulermoc-nom-core-44.js`)
- N-table rewrite (2D `fDetectMolType` + 3D mirror): non-terminal N classified by bond-order counts instead of valence sum — tertiary amine R3N → amine (was: misclassified imine), R-NO2 → nitro incl. JSME charge-separated form (1 C-single + 1 O-single + 1 O-double; was: stale-group leak + crash); every branch sets taxonomy explicitly; terminal-N `default → amine` guard.
- Principal functional group by priority rank (`gFunctionalGroupsOrder`), not insertion order (stable sort; unranked buckets tie after ranked ones).
- `functionalGroupsOrder` no longer mutated per `fGuessName()` call (local `fgOrder` copy in multi-FG branch).
- Stored-chain override guarded (unknown molecule falls through to algorithmic chain instead of `TypeError`); aldehyde/ketone carbonyl index fixed (`[0]`, parity with 3D).
- Halogen prefixes generalized to N types (explicit Greek-alphabetical order; old reverse-iterate + 2-type patch dropped — 1/2-type output byte-identical, 3+ types no longer drop a halogen); polyfunctional `di-/tri-` accumulated per group (single-group output unchanged).
- Defensive suffix fallback (`hydrocarbon`) for buckets without a naming entry; cyclic C-skeleton early-out (console warning + deterministic fallback, 2D + 3D).

### Viewer (`js/mulermoc-nom-molview-44.js`)
- Numbering: `fShowNumber` off-by-one (`>=`), diagrammatic no-match `continue` (no stale coords), `fShowNumbering3D` no longer mutates global `mainChainAtoms3D` (local copy + optional chain param on `fShowNumber3D`).
- `fUpdateSVG` null guards (empty SVG / logo); `carbonHydrogens.fill(0)`; `JmolSelection` join contract normalized; `fClassifyAllMolecules` snapshots/restores core globals in `finally`.

### Deferred to a later phase (Greek-convention decision)
- Ketone/alcohol/nitro locant suppression thresholds (`butan-2-one` without `2-` etc.) kept as-is — Greek convention differs from English; revisit separately.

## [Unreleased] (v43 working copy — splits committed vs uncommitted 2026-10-06)

### Committed (hashes in git log)
- S1–S4 JSmol scenario repair (`js/mulermoc-nom-scenario-43.js`, `js/mulermoc-nom-molview-43.js`, `mulermoc-nom-43.html`): `scriptWait("show moveto")`-only capture (poisoned `getPropertyAsString` branch deleted), strict numeric `moveto` grammar with import-time quarantine (`moveto: null` + warning), per-step token gating the camera (+400ms) and the name-box click (on `fFetchAndParse3D` completion via `fScenarioOn3DParsed`, 2s fallback), `jmol_isReady` handshake (`window.JSmolReadyFlag`) for `?scenario&present` deep links, `" compSecondSub*"` mode-key normalization; `zap` guard fixed (`!show3D`); Exit restores full chrome (menu `menu-open` + both viewers) via a transient clone so stored `show.*` survives for Export. Closes `didactic-scenario-plan.md` §8 `moveto`-timing question.
- Fixed duplicated `mulermoc-nom-43.html` document (stray `>` + full second `<head><body>` copy, commit `49aead3`): single `pageContainer`, single JSmol applet init, single `</html>` — duplicate IDs had desynced viewer capture/apply/toggles (`2D-only → 2D+3D` saved as 3D-only).
- Vision twofold+1 with LEARN-first layers (LEARN → EXPLORE-lite → PRACTICE → PLAY); embedded static in Drupal; research-primary logging. See `README.md` and new `docs/LAYERS-PLAN.md` (contracts, exercise types v1, event schema v1, timeline, P1–P6 ownership).
- Scenario exit now restores full chrome (menu `menu-open` + both viewers + all bars) in `js/mulermoc-nom-scenario-43.js`.
- LEARN v1.1: stored `scenarios/` library plan + two-level EPAL/Lyceum `note` convention (`docs/didactic-scenario-plan.md` §9).
- EN upgrade recorded as conditional Phase 5 (`docs/LAYERS-PLAN.md` §8); `lang` reserved in schema/events, not implemented.

### Working copy (uncommitted batches — verify with `git status` before release)
- Deduped stylesheets (paste-accident copies, render-identical): `css/jsme-nick-43.css` 3845 → 1922 lines (exact 2× copy) and `css/mulermoc-nom-scenario-43.css` 3226 → 810 lines (`[X][Y][X][Y]` quadruplication; kept the X superset copy so no rule lost — verified zero non-blank lines dropped, braces balanced, LF no-BOM preserved).
- Presentation CSS hook: new `#pageContainer.presenting` class (flipped by `fScenarioSyncPresentClass()` on every step apply + Exit + failed-start rollback, so it self-heals across navigation and survives menu/name rebuilds); first override is a taller present-mode `.menuListContainer` (`max-height: 350px` vs the 150px author default) in `css/mulermoc-nom-scenario-43.css` — the pattern for future present-only styling without JS churn.
- Empty-scenario cap: `MuLERMoCScenario.maxEmptyScenarios = 3` (adjustable) — `scNew` locks with a toast while the cap is reached, and a panel's Delete locks when it is the last remaining card and empty (one empty card is always kept); synced in `fScenarioRenderOne()` so every mutation path stays consistent, imports always land untouched (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Per-step menu grouping (Ταξινομήσεις Μένου): new additive `menuGroups` step field (`molecules` default/flat fallback, `chemclass`, ` series`; no version bump) with 3 drawer checkboxes per menu-step row (pure molecule steps show none); presentation renders the picked subset flat, single-grouped (collapsible scenario-owned headers, carbon-count sorted, local numbering), or — when 2+ checked — with a present grouping switcher (default view = molecules when checked); free-browse rows keep working in all   views (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`, `docs/didactic-scenario-plan.md` §2). Classified present groups start shut (headers mirror `.crossMenuLi`, open header + body take its `--baseColor` selected chrome/border); the group holding the selected molecule renders open. Headers run a main-app-identical accordion (open shuts the rest, explicit slideUp/slideDown, selection preserved); the grouping switcher lays its radios in one column.
- Removed PubChem/molInfo placeholders (not in this phase): `molInfoBtn`/`molInfoPanel` dead code (`fToggleMolInfo`, `svgInfo`, panel/button builders) from `js/mulermoc-nom-molview-43.js`, molInfo CSS from `css/jsme-nick-43.css`, `molInfoPanelSlot` host + `externalLinks`/`show.infoHost` from `js/mulermoc-nom-scenario-43.js` (capture/defaults stripped; legacy files load with them silently ignored, `scenarioVersion` stays 1); deleted `docs/PUBCHEM_HYBRID_PLAN.md`; docs updated (`README.md`, `docs/LAYERS-PLAN.md`, `docs/didactic-scenario-plan.md` §1/§2/§5/§6/§7/§8/§9). v42 copies frozen untouched.
- Menu-only naming hint follows the lock: hidden only when `Name interact` is off; when interaction is on it shows on step entry and reappears after free-browse selection via new `fScenarioOnPresentBrowse()` (flat-menu click hook; `fExplainNameComp` only sets HTML, never display, so the step-apply hide persisted) (`js/mulermoc-nom-scenario-43.js`, `js/mulermoc-nom-teaching-43.js`, `docs/didactic-scenario-plan.md` §2).
- Naming-controls steps open without a flash: `fScenarioApply` forces `nameSettingsFlag = false` before `fSelectMol()` when `show.nameSettings !== true` in presentation, so the rebuilt `#nameSettingsPanel` renders closed on first paint instead of a visible open→close fade; `fScenarioChrome` remains the authority afterwards (`js/mulermoc-nom-scenario-43.js`).
- Naming chrome re-asserted after rebuilds: new `fScenarioApplyNamingChrome()` (extracted from `fScenarioChrome`, same logic, display-only) re-hides the naming gear/panel + voice buttons whenever `fShowNameAnalysis()` recreates them without the presentation hides — free-browse row clicks (via `fScenarioOnPresentBrowse()`, now step-kind-agnostic) and 2D/chain/ether control switches (guarded tail hook in `fShowNameAnalysis()`); fixes the gear reappearing on menu-type steps with `Name controls` unchecked (`js/mulermoc-nom-scenario-43.js`, `js/mulermoc-nom-molview-43.js`).
- Per-step Update button: each drawer step row gains `Update` (after `Go`) — `Go` previews the step, the author tweaks the live view, `Update` rewrites the stored view snapshot via new `fScenarioUpdateStep()` (reuses `fScenarioCapture()` guards/derivation; preserves step `title`/`note` + 4 chrome checkboxes `show.controls/nameSettings/nameClick`; refreshes molecule, 2D/3D modes + styles, naming selection/toggle/chrome visuals, `selectedRule`, highlight/audio settings, `moveto` camera, `menuSubset`/`show.menu`/`show.viewers`; toasts kind/subset changes; no schema bump, `scenarioVersion` stays 1) (`js/mulermoc-nom-scenario-43.js`, `docs/didactic-scenario-plan.md` §3).
- Empty scenario panels gate Steps/Export/Play: `fScenarioRenderOne()` sets `disabled` on `.scList`/`.scExport`/`.scPresent` at 0 steps (cleared on first save); Save step + Delete stay live; gated buttons render at 0.7 opacity with `not-allowed` cursor and no hover response (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`). Empty panels also never drop the drawer: `fScenarioOpenDrawer()` returns early at 0 steps (accordion still collapses the other cards; the clicked card activates but shows nothing until its first save).

- New steps default their title to the live Greek IUPAC name (`currentMolName` via `fScenarioG`, used only when the loaded molecule matches the capture; key fallback for adopted picks, `"menu"` for menu-only; imports unchanged) (`js/mulermoc-nom-scenario-43.js`).
- Step notes support a safe formatting subset: `<b>`, `<sup>`, `<sub>` (attributeless; everything else stays escaped, so no injection surface) in `#scStepText` + play-bar note via new `fScenarioRenderNote()`; authors type tags in the plain drawer textarea (placeholder hints it); tag-free notes render byte-identically, no schema change (`js/mulermoc-nom-scenario-43.js`, `docs/didactic-scenario-plan.md` §2).
- Multi-scenario authoring: `#scenarioAuthorBar` is now a global shell (`Σενάρια Παρουσίασης` title + `+ New` / `Import`, Import adds a panel) owning `#scenarioPanels`; each `.scenarioPanel[data-scenario-id]` has its own button panel (Save/Steps/Export/Play, no Import) + in-flow `.scenarioDrawer` (down/up via `.open`, no fixed positioning); explicit active card drives Save/pick/Present, per-card Export (v1 schema unchanged), delete + title rename, legacy singletons mirror the active card (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Step drawers drop down/up inside their own scenario panel (in-flow `.scenarioDrawer` via `.open`: `max-height` + fade, no fixed positioning; `fScenarioPositionDrawer()` retired to a no-op); accordion — opening one scenario's Steps closes the others; drawer follows the card via `fScenarioOpenDrawer()` (panel-background click or Save opens it, Steps on the open card shuts everything); panels never shrink (`flex: 0 0 auto`) so the `#scenarioPanels` list scrolls under the 85vh bar cap; single column enforced (`nowrap` + `stretch`) (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Step rows: type-only badge (`molecule`/`menu` driven by `show.menu`, molecule key + subset size in the tooltip, menu tint via `.is-menu`, housed in `.scStepNumberWrap` under the step number); scenario headers lead with a positional counter pill (`S1`, `S2`, … — index-based, gap-free across add/delete; internal ids untouched); empty scenarios (0 steps) flag `.is-empty` on the card, count pills, and Steps button; step title input gains `scStepTitle` class + persistent `Τίτλος βήματος` label above it; Steps header prefixed with the live scenario name; `Text` checkbox removed — heading + text show automatically iff the step carries title or note (legacy `show.text` ignored, self-healing); 3D custom-view badge + per-step re-capture button removed while JSmol `moveto` is broken (`view3D.moveto` schema/capture/validation kept, UI returns with the fix) (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Authoring handle docked to the bar: `#scenarioAuthorTab` is the bar's first child (`width:40px; left:-40px; top:0`), bar closes fully off-screen (`translateX(100%)`, shadow off) with only the handle visible; authoring-off defers drawer/pick teardown past the slide (`skipDrawers`) so the toggle frame carries only the bar animation; open: still under investigation (Play close glides, tab-toggle close snaps — console-triplet diagnostics pending, WAAPI fallback queued) (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Page `h1` top margin removed to tighten the title + step-text stack (`css/jsme-nick-43.css`).
- Obvious bar close: ✕ button in the scenario title bar (`#scCloseBar`), handle keeps its ✎ icon (highlighted via `.active` while open), ESC closes the bar when not typing or presenting (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Presentation keyboard controls: `←`/`→` walk steps (clamped at the ends, no wrap; `preventDefault` vs page scroll), `ESC` exits via the extracted `fScenarioExitPresent()` (shared with the Exit button); all keys ignore modifiers and typing focus; Prev/Next/Exit buttons carry key-hint tooltips (`js/mulermoc-nom-scenario-43.js`, `docs/didactic-scenario-plan.md` §4).
- Authoring mode behind a `Σενάρια` handle: the author bar, panels, and Pick checkbox stay hidden until the vertical tab (docked top-left of the bar, icon + tooltip) enables authoring; the bar slides as one rigid unit and presentation hides the whole unit via bar-level `.is-hidden` (all class-based, `prefers-reduced-motion` respected; classes are the sole visibility authority — no inline `display`); scratch (picks, steps) survives toggling. Author panel restyled (light 540px panel with title header, per-scenario cards with `Play ▶`, matching drawers, step-number badges, lightBlue drawer checkboxes, `border-box` throughout, row separators from step 2 on) (`js/mulermoc-nom-scenario-43.js`, `js/mulermoc-nom-teaching-43.js`, `css/mulermoc-nom-scenario-43.css`, `docs/didactic-scenario-plan.md` §3).
- Presentation applies the stored control selections to the bars: new `fScenarioSyncControlUi()` mirrors restored globals onto the 2D mode radios, atom-color checkbox + atom/group radios, 3D checkboxes, and style dropdown (all previously kept the author's live states); menu-only steps assign display prefs without loading so visible bars match and carry into flat-menu browsing. Storage was already complete — no schema change (`js/mulermoc-nom-scenario-43.js`).
- Presentation always starts from the applied step 1: `Present`, `Go`/Prev/Next, and hash jumps honor `fScenarioApply`'s result (toast + abort instead of a half-applied stale view). Step rows show a type badge (`molecule`/`menu`) and menu-only saves get their own toast, so an accidental molecule-less step 1 is visible at a glance (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`).
- Step drawer gains per-step chrome checkboxes (all default unchecked): `2D controls` / `3D controls` (write `show.controls`, disabled unless that step's viewer is visible) and `Name controls` (`show.nameSettings`: gear + panel + voice buttons) / `Name interact` (new `show.nameClick`: unchecked locks name-box mouse clicks via a `locked` class while the stored highlight + explanation still replay; explain line hides only when locked with no stored highlight; absent in legacy files = unlocked, no version bump) (`js/mulermoc-nom-scenario-43.js`, `css/mulermoc-nom-scenario-43.css`, `docs/didactic-scenario-plan.md` §2).
- Menu-only scenario steps: a picked set of 2+ with no molecule selected now saves (`selectedMol: null`, title `"menu"`); presentation deselects first (`fDeselectMol`, so no previous molecule lingers) and shows the flat pick menu; validation accepts them iff the subset is non-empty. Pick↔selection coupling in authoring: selecting a row in pick mode also picks it; unpicking the selected molecule (row or group box) deselects it via `fDeselectMol` (`js/mulermoc-nom-scenario-43.js`, `js/mulermoc-nom-teaching-43.js`, `docs/didactic-scenario-plan.md` §2).
- Per-step menu subsets for scenarios: authors tick molecules / whole tri-state groups via a Pick toggle in the menu title (live pick, per-step copy on Save; no Menu checkbox — menu derived: 2+ picks show it, single pick collapses to the step molecule with an "adopted" toast when nothing is selected, selection wins over a stray pick); presentation renders a simple flat menu per step (local 1..N numbering, no headers/switcher/checkboxes, rows browsable; unknown molecules dropped and step molecule auto-included with warnings, legacy files migrate on import with stored `show.menu` ignored, no version bump); Exit rebuilds the pristine author menu (`js/mulermoc-nom-scenario-43.js`, `js/mulermoc-nom-teaching-43.js`, `css/mulermoc-nom-scenario-43.css`, `docs/didactic-scenario-plan.md` §2/§4/§9).
- Χημικές Τάξεις menu groups now list molecules in ascending carbon order like the other classifications (`fSortPropsByCarbonCount` extended from series-only; rule mode keeps its pedagogical order) (`js/mulermoc-nom-teaching-43.js`).
- Ether/ester alkyl highlights follow the alkyl rule (CnH2n+1: all C + connected H + C–C/C–H bonds, green, both viewers): explicit 3D bond coloring via new `fColorFragmentBonds3D` (+ `fGetEtherGroupFragment3D` for C–O–C) and `includeH` on `fHighlightAtomChain`; IUPAC alkoxy prefix highlights the full chain in 3D (was: attachment C only); `-ιο`/`αιθέρας` highlights bare C–O–C (no H); 2D expanded mode included, condensed/skeletal auto-no-op (`js/mulermoc-nom-molview-43.js`).
- Scenario Exit force-restores all control bars (`#radio2DMode`, `#controls3D`, save buttons, viewers, menu): new `fScenarioRestoreChrome()` clears both inline `display` and the `!important` `hide` class left by viewer toggles, and re-activates the 2D/3D buttons so the next snapshot captures them truthfully (`js/mulermoc-nom-scenario-43.js`).
- Bond-component clicks (αν/εν/ιν) highlight bonds only by default; new `Επισήμανση ατόμων δεσμών` settings checkbox (`#bondAtomsCheck`, default off) opts endpoint C atoms back in, with live re-apply (`js/mulermoc-nom-molview-43.js`, `js/mulermoc-nom-teaching-43.js`, `mulermoc-nom-43.html`).
- Snapshots capture all applied settings: new additive `styleHighlight` group (`bondAtoms`, `numberingAtoms`; defaults for legacy files, no version bump); step apply also re-syncs the `Έγχρωμα Σύμβολα` checkbox and atom/group radios from `style2D` (render already followed the flag); Present stashes the author's live checkbox states and Exit restores them (`js/mulermoc-nom-scenario-43.js`, `docs/didactic-scenario-plan.md` §2).
- Scenario steps gain heading + text: per-step `title` replaces the page `#pageTitle` in presentation (restored on exit) and `note` renders as an educational paragraph in `#scStepText` below it (safe subset `<b>`/`<sup>`/`<sub>`; heading + text show automatically iff title/note present, legacy `show.text` ignored; drawer textarea, no visibility checkbox; `noteFormat` reserved). `#menuCol` hidden wholesale in presentation so content centers.

---

## [v43] — 2026-10-02

**Didactic scenarios scaffold — last suffixed copy**

- New parallel file set `mulermoc-nom-43.html` + `js/*-43.js` + `css/jsme-nick-43.css`, copied from v42 (path renames + `state-43.js`/`scenario-43.js` includes + `JSmolReadyFlag` handshake + `bondAtoms` UI). Tag-time `core-43` differed from `core-42` only by `let`-scoping hygiene plus `esterInfo`/`alkylSubstituentNames` declarations (no logic change); `molview/teaching/data/css-43` diverged further in the working copy (see [Unreleased]). Chemistry parity at tag: `43-no-params == 42`.
- New additive module `js/mulermoc-nom-scenario-43.js` (off by default): snapshot capture (molecule, 2D/3D modes, chain/naming modes, styles, audio flag, 3D `moveto` via `show moveto`), `scenarioVersion: 1` validation with legacy/future policy, apply through the standard `fSelectMol` + name-box click path, per-step `show.*` chrome matrix, memory + JSON file export/import (decision A), `?scenario=…&present=1` + `#step=N` playback URLs. See `docs/didactic-scenario-plan.md`.
- Museum moved to `archive/` (non-runnable reference); runnable history via tags `v41`/`v42`. v43 is the last suffixed copy; v44 introduces the canonical un-suffixed set.
- Repositories split: `organic-nomenclature-2` frozen serving v42 (`index.html` → `mulermoc-nom-42.html`); `organic-nomenclature-3` (this repo) serves v43 (`index.html` → `mulermoc-nom-43.html`). All new work happens here.

---

## [v42] — 2026-10-01

**v42 baseline: ester 3D + template literals + r4 row (scaffold from v41)**

- Scaffold v42 file set from v41 (`mulermoc-nom-42.html` + `js/*-42.js`); `index.html` redirected to v42 at the time.
- Ester noun click now highlights fragment bonds in 3D (ester-only).
- Convert HTML/SVG builders to template literals (v41-parity verified).
- Wire r4-alkoxycarbonyl row via `r4KeyForFG` ester mapping.
- Docs: v41 CHANGELOG entry + README baseline (esters, viewer/menu updates).

---

## [v41] — 2026-09-30

**Esters: naming + first molecules — plus viewer and menu improvements**

- Added the first two ester molecules, `ethanoic_methyl_ester` (CH3COOCH3) and `propanoic_methyl_ester` (CH3CH2COOCH3), with condensed, expanded (`_2D_E`) and skeletal (`_diagr2D`) representations plus 3D SDFs. They run in algorithmic main-chain mode; stored `mainChain`/`moveto` data remains optional.
- Ester detection in 2D and 3D: an ether oxygen adjacent to a carbonyl carbon (ketone oxygen) is reclassified as one ester group (`functionalGroupObj.ester = [ketoneO, etherO]`), replacing the buggy v40 2D-only path; full 3D mirror added.
- Two-fragment ester analysis: `fCalcMainChain[3D]` computes `esterInfo` (`oDouble, oSingle, carbonylC, alcoholAttachC, acidFrag, alcoholFrag`) via BFS on the carbon-only graph; the carbonyl carbon anchors and outranks acid (`terminal = 4`).
- Ester naming: two-word Greek IUPAC assembly, e.g. `προπανοϊκός μεθυλεστέρας` (acid stem from `acidLen` + `οϊκός`, fused tail `μεθυλ + εστέρας`), with ester-aware euphony (no connector across the acid|alcohol word boundary, blank space instead of `+`, no trailing `+` after the last box).
- Ester highlight/numbering: alcohol-chain click (`esterAlkyl`, comp10) highlights and numbers only the alcohol fragment; ester-word click (`esterEster`, comp11) highlights the `O-C(=O)-O` triad via `fGetEsterAlcoholChain/Triad/GroupFragment[3D]`; chain-only 3D halos via `skipH`.
- Teaching layer: new `Εστέρες (R-COO-R')` row in the rule-3 table, `Εστερομάδα` nouns, `r3` table rewritten around the chemical-class taxonomy (drops hydroxy/amino-acid rows); all rule tables carry `data-row` keys and numeric highlights map to keys (`r1-cN`, `r2-single|double|…`, `r3-esters`, …).
- Chemical-class taxonomy: `ester → esters`, `aldehyde|ketone → carbonylCompounds`, `hydroxyAcids + aminoAcids → carboxylicAcids`; menu labels updated (`Χημικές Τάξεις`, `Αιθέρες`, `Εστέρες`).
- Molecule menu: new flat `Όλα τα μόρια` grouping mode (all molecules sorted by carbon count via `fSortPropsByCarbonCount`); `crossMenuLi` items toggle shut and clear `selectedRule`/speech/`#ruleTheory` in rule mode.
- Viewer title bar: new `[2D][3D]` visibility toggle buttons (`#viewerVisBtns`, `fInitViewerSettingsBtn`, `fToggleViewer2D|3D`); legacy `viewFinalJSME`/`viewJSmol` settings commented out.
- Viewer settings: new `Επισήμανση ατόμων κατά την αρίθμηση` toggle (`#highlightNumberingCheck`, on by default) — main-chain atoms highlight while numbering runs; 2D atom colors on by default (`svgAtomColors2DFlag = true`, `#svgAtomColorCheck` selected).
- Molecule info button + panel (`molInfoBtn`/`molInfoPanel`, chemical class + series) added but disabled by default (`molInfoEnabled = false`).
- Note: the symmetric ether example `dimethylether` (CH3OCH3) was added to the v40 data set after the v40 entry below was written; v41 carries both ethers unchanged.
- Fix: ester name boxes no longer render a trailing `+`/space after the last component.

---

## [v40] — 2026-09-29

**Ethers: first molecule + systematic and common naming**

- Added the first ether molecule, `ethyl_methyl_ether` (CH3OCH2CH3), with condensed 2D data and 3D SDF. Missing expanded/skeletal representations no longer crash the viewer (see tolerant loading below).
- Tolerant 2D loading: `fInitData` accepts molecules with only a subset of representations; the mode radios for missing representations are disabled and the viewer falls back to the first available one (condensed > expanded > skeletal). `fLoadMol2D` never calls `readMolFile(null)`.
- Two-chain ether detection: `fCalcMainChain` splits R-O-R' into parent + alkoxy fragments via BFS on the carbon-only graph (`etherInfo`); both O-bonded carbons anchor and orient the parent chain.
- Systematic (IUPAC) naming: alkoxy prefix (`μεθοξυ-`, `αιθοξυ-`, …) + parent alkane (`-άνιο`), with locant omitted for parent chains under 3 carbons. Common name also generated (`αιθυλμεθυλαιθέρας`, symmetric `διαιθυλαιθέρας`).
- IUPAC/COMMON toggle in the name-explanation panel (ethers only). COMMON name renders as clickable boxes: each alkyl highlights and numbers only its own chain (chain-only, no bridging O); `αιθέρας` highlights C-O-C with no numbering. Alkyl explanations state Greek alphabetical order («πρώτο/δεύτερο αλφαβητικά αλκύλιο»).
- IUPAC prefix click (`μεθοξυ`) highlights O + alkoxy fragment (C-O) and numbers the alkoxy chain; suffix click highlights the whole C-O-C group. Switching IUPAC/COMMON clears all highlights.
- Teaching layer: new `Αιθέρες (R-O-R') → -ιο` row in the rule-3 table, `Αλκοξυομάδα → -O-` row in the rule-4 table, suffix highlight index 11, `Αλκοξυομάδα` nouns for explanations.
- Scope: saturated acyclic mono-ethers. Still open: expanded/skeletal MOLs + stored `mainChain` data for the ether, a symmetric ether example, unsaturated ether chains.

---

## [v39.1] — 2026-09-23

**Branch highlighting and expanded-hydrogen selection**

- Fixed the hydrocarbon branch highlight path so a selected alkyl side chain is highlighted correctly in both 2D and 3D views.
- Generalized the side-branch detection so it still works when the same molecule also contains other functional groups.
- Corrected the branch fallback so a carbon branch is treated as a valid highlight target even when no explicit FG entry matches the selected name component.
- In expanded 2D mode, the parent carbon and its attached hydrogen label nodes are now highlighted together, preserving the expected visual selection behavior for methyl and other alkyl branches.

---

## [v39] — 2026-09-23

**Molecule grouping and navigation**

- Homologous series are now the default molecule-menu grouping.
- Rule-based grouping remains available as an alternate menu mode.
- Molecules are classified through the existing structure-analysis pipeline,
  without requiring new metadata in the data file.
- Added special series classification for amino acids, hydroxy acids, keto
  acids, hydroxy nitriles, and oxo carboxylic acids.
- Homologous-series groups follow the declared `homologousSeriesLabels` order.
- Molecules within each homologous-series group are ordered by increasing total
  carbon count, with stable ordering for equal counts.
- Switching grouping modes preserves the selected molecule and opens its new
  group. With no selected molecule, all groups remain closed and no molecule is
  selected.
- Rule theory is hidden in homologous-series mode and shown in rule mode.
- Methane is selected and its group opened on initial page load.

## [v37] — 2026-04-16

**Major refactor:Algorithmic main chain (+ UI improvements)**

### Core logic
- **Tier 2b tie-breaker**: double bonds beat triple bonds in `fCalcMainChain` and `fCalcMainChain3D` (IUPAC rule 2b compliance)
- **Algorithmic main chain mode** (`mainChainMode = 'algorithmic'`): main chain now computed entirely by the algorithm by default; user can switch to `'data'` mode via the settings panel

### UI — settings panel
- Gear button (`#viewerSettingsBtn`) added to middle column `.panelTitle`; toggles animated dropdown (`#viewerSettingsPanel`) via `fToggleViewerSettings()`
- Outside-click listener closes the panel automatically
- Chain mode radio (Από δεδομένα / Αλγοριθμικά) moved inside settings panel, wrapped in `.radioGroupContainer` for correct deselection logic
- Tooltip on gear button: left-pointing (avoids clipping by right column), `z-index: 400`

### UI — teaching layer
- Mode-switch (2D ↔ chain view) now calls `fShowNameAnalysis()` — name component boxes refresh on every mode change
- `.selected` name component box preserved across rebuilds via `_modeToCompId` reverse lookup in `fShowNameAnalysis`

### UI — CSS (`jsme-nick-37.css`)
- Tap-target sizing: `.settingsBtn` padding `6px 8px`, `.settingRow` min-height `36px`, `.dropLi` min-height `36px` with flex align-center
- Unified UI text size: `.radioCheckContainer`, `.checkBoxContainer`, `#dropLabel`, `.dropLi` all set to `0.85rem`
- `#viewerCol` changed from `overflow: hidden` → `overflow: visible` — fixes dropdown and tooltip clipping

---

## [v36] — 2026-04-16

- Responsive viewer resizing: `fResizeViewers()` in `mulermoc-nom-molview-36.js`
  - Listens to `window resize` (debounced 150ms)
  - On small landscape screens (viewport height < 430px): caps each viewer at 30% of viewport height
  - Resizes JSmol applet and JSME SVG div together to keep aspect ratios
  - Triggers once on JSmol ready (`jmol_isReady` hook + 300ms delay)

---

## [v35] — 2026-04-16

**Major refactor: monolithic JS split into 4 files**

- `mulermoc-nom-core-35.js` (943 lines) — pure analysis engine, no DOM or jQuery
  - All analysis globals declared at top level
  - `fAnalyseStructure`, `fDetectMolType`, `fGuessName` (2D)
  - `fAnalyseStructure3D`, `fDetectMolType3D`, `fGuessName3D`, `fFetchAndParse3D` (3D, async SDF)
  - `fInitNamingProps`, `fInitProps`
- `mulermoc-nom-molview-35.js` (1325 lines) — viewer layer (JSME, JSmol, Snap.svg, jQuery)
  - `jsmeOnLoad`, `fInitData`, `fSelectMol`, `fLoadMol2D/3D`, `fUpdateSVG`
  - `fHighlightFG`, `fHighlightFG3D`, `fShowNumbering`, `fClearHighlights`
  - `fSave2DPng`, `fSaveJmolPng`, `fUpdateDiagr2DButton`
  - SVG icon constants: `svgSpeaker`, `svgMute`, `svgStop`, `svgPlay`
- `mulermoc-nom-teaching-35.js` (547 lines) — teaching layer
  - `fInitTheory`, rule text/tables, `$(document).ready` jQuery event handlers
  - `fSpeakGreek`, `fNarrateRule`, `fShowRuleTheory`, `fShowNameAnalysis`, `fExplainNameComp`
- `jsme-nick-nomeclature-moc2-data_35.js` (3846 lines) — all molecule data
  - `nameExamples` object: 59 molecules with `formula`, `mainChain`, `mainChain_E`, `mainChain3D`, `moveto`
  - 2D SMILES-like strings (`*_2D`, `*_2D_E`, `*_diagr2D`) and 3D SDF file paths

---

## [v34] — 2026-04-13

- (Version created; details carried from v33 refactor work — see v33 entry)

---

## [v33] — 2026-04-13 · `6140142`

**Major upgrade**

- 3D structure analysis: atom/bond highlighting in JSmol (`fHighlightFG3D()`)
- Minimal external data file (`jsme-nick-nomeclature-moc2-data_6.js`) — most properties now algorithmically generated
- All compound properties (FG detection, locants, substituents, unsaturation) algorithmic — only main chain remains data-driven (TBD)
- Fix: wrong halogen atom highlighted in 2D/3D for molecules with two different halogens (e.g. 2-βρωμο-3-χλωροβουτάνιο) — sort in `fHighlightFG`/`fHighlightFG3D` now uses canonical `nameMainCompObj3.halogen.substitute` key order as tiebreak

---

## [v32] — 2026 · `180e26f`

- TTS rule narration: `fNarrateRule()` reads selected rule aloud in Greek
- Greek TTS helper `fSpeakGreek(text)` — prefers female voice (Eleni/Nefeli/Maria/Sofia)
- Name analysis narration: toggle + play button (`#narrateAnalysisToggle`, `#readNameBtn`)
- SVG icon constants: `svgSpeaker`, `svgMute`, `svgStop`, `svgPlay` — no emoji dependency
- Audio button on by default at page load
- Chevron accordion symbol with animated rotation
- CSS-styled tooltips with delay (no native browser tooltip)
- Drop-down menu: SVG arrow (Android-safe), larger triangle, event delegation fix, close-on-select fix
- Fix: strip dashes from TTS narration (prevent reading as "minus")
- Fix: strip standalone "C" from carbon count narration
- Fix: typo καβροξυ → καρβοξυ in carboxylicAcid substitute

---

## [v31] — earlier · `d0666ce`

- 2D/3D PNG export with assembled name boxes (`fSave2DPng`, `fSaveJmolPng`)
- Increased PNG export size to 1200px
- Fix: guard against undefined `jsmeNomeclatureApplet` in `fDeselectMol`, `fUpdateSVG`, `fClearHighlights`
- Fix: JSME NH2 highlight SVG bug (stroke-width attribute swallowing tspan content)
- Fix: page jump when selecting name component
- Radio scoping, save button alignment, checkbox/radio styles, credits links
- Auto-select first molecule on page load
- Google Analytics tracking added

---

## [Initial] — earlier · `cb66337`

- Initial upload: organic nomenclature 2 page with assets

