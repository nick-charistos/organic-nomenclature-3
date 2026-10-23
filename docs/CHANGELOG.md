# Changelog

All notable changes to the Οργανική Ονοματολογία MuLERMoC.

---

## [v50] (presentation text rails left/right + persistent naming shell; live, `index.html` → v50)

New parallel file set `mulermoc-nom-50.html` + `js/*-50.js` + `css/*-50.css`, forked from v49 (the HTML row class was renamed `.HFlex` → `.mainApp3Columns`, inline styles moved to CSS, and the 7 asset refs updated). Adds per-step presentation text placement and a persistent naming shell; the chemistry engine is unchanged, and the molecule data was unchanged at fork time (a later additive update in this version adds 7 alkynes, 73 → 80 keys — see the 2026-10-22 entry below). v50 is now live: `index.html` points to `mulermoc-nom-50.html`; v49 remains runnable at root. Browser click-through is still pending (see Checks).

### Default scenario
- `MuLERMoCScenario.defaultScenarioUrl` now points to `scenarios/Αλκάνια-Αιθάνιο-τεστ.scenario.json` (7 steps; steps 5–7 place the note in a left rail with longer text). The previous `scenarios/Αλκάνια-Αιθάνιο.scenario.json` stays on disk for explicit `?scenario=` deep links but is no longer preloaded.

### Per-step text placement (`scenario-50.js`, `scenario-50.css`)
- Additive `styleText.position`: `null`/missing = **Πάνω** (current top card), `"left"` or `"right"` = sticky side reading rail. No schema-version bump; invalid values coerce to top, Export stays minimal, Update preserves the choice, and legacy scenarios load unchanged.
- Step drawer gets an icon dropdown `Θέση: Πάνω / Αριστερά / Δεξιά` beside the existing columns/size/width controls.
- Side layout at ≥1200px: `#scStepText` becomes a **fourth flex item** inside `#mainAppContainer > .mainApp3Columns`, inserted first for `left` and last for `right`, so it shares the row's 8px gap. `#pageContainer`/`#mainAppContainer` widen to `calc(1600px + clamp(300px, 24vw, 420px) + 8px)`; menu/analysis widths use matching clamps. Below 1200px the card returns to the top slot before `#mainAppContainer`.
- The rail is sticky (`top: 50px`, clear of the fixed play bar) and internally scrolling, width `clamp(300px, 24vw, 420px)`, with height capped to the tallest visible app column and the viewport (`min(column height, 100vh - 80px)`), resynced by `ResizeObserver` and window resize. The row switches to `align-items: flex-start` while a rail is active, so the cap measures the app columns rather than a rail-stretched row. Title and credits still span the page.
- Side rails always render one column; a stored 2-column choice returns when the step is placed back on top. The stored `textWidthPx` also applies to top mode only (an inline 980px width would overflow the rail).
- `fViewerHeights2D3D()` skips subtracting the note-card height only while the side layout is actually applied (parent-class probe, so narrow-screen fallback still subtracts). Top↔left/right switches request an `fResizeViewers()` refit after placement settles.
- New rail/class/dropdown styling in `css/mulermoc-nom-scenario-50.css`; version/path comments refreshed in the copied JS/CSS headers.

### Persistent naming shell (`molview-50.js`, `teaching-50.js`, `jsme-nick-50.css`)
- `fDeselectMol()` now clears `nameComponentsList` and calls `fShowNameAnalysis()` instead of emptying `#nameAnalysis`; with no molecule selected, `compCount` is forced to 0 and the container renders a muted `.nameEmptyHint` (“Επιλέξτε μόριο για ανάλυση ονόματος”).
- The naming shell (title + gear + settings panel) renders on page ready via `fShowNameAnalysis()` after `fInitTheory()`, so it is present before any molecule is loaded. The settings panel still opens/closes on demand.
- The shell is always available in full-app/authoring/no-molecule states. In presentation, `show.nameSettings` keeps its existing gate: unchecked still hides the gear + panel + voice buttons, but the `Ονομασία` title remains (legacy `show.naming`/`show.nameClick` untouched).
- `fScenarioApplyNamingChrome` counts actual visible boxes (`.nameCompContainer .nameCompBox:not(.comp-hidden)`) and hides the explain line at zero; a menu-only step's hint only returns after free browse has rendered boxes, so no dead hint points at an empty naming row.
- `.nameEmptyHint` styling lives in `css/jsme-nick-50.css` (full-width, muted italic placeholder).

### Checks
- Static: `node --check` on `molview-50.js`/`teaching-50.js`/`scenario-50.js`; CSS brace balance at the initial check `214/214` scenario + `305/305` main (the scenario file is now `217/217` after the play-bar CSS/icon, `#scPos`, and presentation-title additions); all v50 HTML asset refs resolve. At check time `index.html` still pointed to v49; it now points to v50. Headless DOM smoke check confirmed the persistent `panelTitle`/gear shell renders; the no-molecule placeholder was not browser-validated because the headless applet left component data empty. Static checks were not rerun after the default-scenario and status edits.
- Owner browser click-through pending (wide/narrow, top/left/right switching, menu steps, long notes, 2D/3D refit, no-molecule placeholder, `Name controls` behavior).

### 2026-10-22 — Additive alkyne data + skeletal C labels (still v50)
- Added the 7 missing alkynes to `js/jsme-nick-nomeclature-moc2-data_50.js` (73 → 80 keys): `ethyne`, `butyne_1`, `butyne_2`, `methyl_3_butyne_1`, `methyl_3_pentyne_1`, `methyl_4_pentyne_2`, `ethyl_4_dimethyl_3_5_heptyne_1`. Each gets the three embedded 2D MOL forms plus `mols/nomeclature-moc2/<key>_3D.sdf`; existing 73 entries and their order are unchanged.
- Added `fHideAlkyneSkeletalCarbons()` to `js/mulermoc-nom-molview-50.js`, called from `fUpdateSVG()` before `patchtheNitrogen()`. In `skeletal` mode for `seriesKey === "alkynes"` it removed the `C` label and its rounded backplate; bonds, highlights and numbering untouched. (Superseded the same day — see the generalised entry below.)
- 3D intentionally untouched: no `initialZoom3D`, no `moveto` camera on the new entries, no `spt/init-3.spt` or `fLoadMol3D` change. The large alkyne uses the current v50 default 3D scale/orientation; framing is deferred to a later 3D pass.
- Not imported: remote `fFit2DSVG`, color remapping, name-fitting and scenario changes.

### 2026-10-22 — Skeletal C labels hidden for any sp carbon (still v50)
- `fHideAlkyneSkeletalCarbons()` renamed to `fHideSkeletalSpCarbons()` (`js/mulermoc-nom-molview-50.js`, called from `fUpdateSVG()`). The trigger no longer keys on `seriesKey === "alkynes"`, which skipped every molecule carrying a hetero group: enynes (`seriesKey "enynes"`: `penten_3_yne_1`, `hexen_1_yne_4`, `buten_1_yne_3`, `hexen_2_yne_4`), the yne-ketone/aldehyde (`pentyn_4_one_2`, `propynal`), nitriles and the allene all still showed bare `C` labels in `skeletal` mode.
- New `fMolHasSpCarbon()` reads the parsed core graph (`bondList` + `allAtomsTypeList`): true when a carbon has a triple bond (`C≡C` or `C≡N`) or cumulated double bonds (`C=C=C`, allene). In `skeletal` mode the `C` label and its rounded backplate are removed whenever that holds; plain alkanes/alkenes/alcohols etc. are untouched, so the label removal is a no-op there. Bonds, highlights and numbering unchanged.
- Browser click-through pending for the newly covered cases (enynes, yne-ketone/aldehyde, nitrile, allene) alongside the rest of the v50 checks.

### 2026-10-23 — Owner CSS tweak (still v50)

- `css/mulermoc-nom-scenario-50.css` (commit `845208f`): the scenario play bar is now white with `--darkBlue` text and a `--lightBlue` bottom border (was `--lightBlue` with white text); `#authorLayout` gains a base `0 10px` margin and the pinned margin becomes `0 2px 0 10px`.
- Kept intentionally: the v49 confirm-dialog hover edit in `css/mulermoc-nom-scenario-49.css` (shipped in `24a5ae9`) is the only intentional change to an earlier runnable version; earlier versions are otherwise untouched.
- Checks: the owner's manual check on 2026-10-23 found `214/214` scenario + `305/305` main; the scenario file is now `217/217` after the play-bar icon/`#scPos` additions and the presentation-title fix. Browser click-through still pending.

### 2026-10-23 — Play-bar prev/next icons (still v50)

- `js/ui-icons.js`: added `arrowLeft`/`arrowRight` (from `imgs/arrow-left|right-svgrepo-com.svg`; 22px, `fill` → `currentColor`, viewBox/transform kept, inlined because `imgs/` is gitignored).
- `js/mulermoc-nom-scenario-50.js`: `#scPrev`/`#scNext` are painted with the arrows via `fScenarioPaintIconBtn`, with aria-labels; the `◀`/`▶` text remains the fallback when `ui-icons.js` is unavailable.
- `css/mulermoc-nom-scenario-50.css` (same commit): play-bar/steps borders switch `--darkEarth` → `--lightBlue` (plus the `scList`/`scPresent` hover borders) and a dark `#scenarioPlayBarNextPrevContainer button` rule is added.

### 2026-10-23 — Play-bar Exit spacing (still v50)

- `css/mulermoc-nom-scenario-50.css` (commit `c730ea6`): `#scExit` right offset `10px` → `20px` and `font-size: 1rem`.

### 2026-10-23 — Post-review fixes (still v50)

- `css/mulermoc-nom-scenario-50.css`: side-rail sticky `top` `10px` → `50px` (clears the fixed play bar); rail-active rows use `align-items: flex-start` so the JS height cap measures the app columns instead of a rail-stretched row; `#pageTitle` is forced visible in presentation so the ≤999px landscape h1 hide no longer drops the step title or tucks the top text card under the play bar; UTF-8 BOM removed. The same change also includes the `#scPos` play-bar readout styling and whitespace cleanup.
- `js/mulermoc-nom-scenario-50.js`: `fScenarioSyncStepTextLayout()` now owns the `scTextLeft`/`scTextRight` classes (cleared on the <1200px fallback, Exit, and resize); `fScenarioApplyStepFontSize()` keeps only the refit-on-switch check.
- Docs: v50 canonical URL corrected to `-50`; arrow icons documented as 22px; HTML-copy wording fixed; commit lists and brace counts refreshed.
- Checks: CSS braces `217/217` scenario + `305/305` main; no JS runtime in the review environment, so the two guarded class-toggle edits are static-only verified. Headless 900×700 landscape presentation shows the step title and the top text card below the play bar; full browser click-through still pending.

---

## [v49] (student thesis-work import + alkyl reference table/locant fixes; previous live, `index.html` → v49 before v50)

New parallel file set `mulermoc-nom-49.html` + `js/*-49.js` + `css/*-49.css`, forked from v48 (the html copy changes only the 7 asset refs; the JS/data/CSS files were then edited as described below). Folds in the MSc student's `thesis-work` upgrades (fork `yanisken9/organic-nomenclature-3`, tip `48ca292`): the generic main-chain parent-selection fix, the explicit-`1` unsaturation-locant convention, one new molecule, the alkene lesson scenarios, and an adapted alkyl reference table shown for branch/locant components. Namelecule product-layer files are deliberately **not** imported (see below). At release, `index.html` redirected to v49; v50 now supersedes it, and `*48*` and earlier remain runnable at root.

### Main-chain parent selection for acyclic alkanes (`core-49.js`)
- New graph helpers `fIsAcyclicHydrocarbonGraph`, `fCarbonBranchLocants`, `fCompareLocantSets` (0-based graph indices, 1-based locants; first-differing-locant compare, never sums).
- `fRankChainPool(paths, req, scoreFn, orientFn, connList, typeList)`: after the existing eligible/multiple-bond/length/FG-anchor tier, **only when `bestMu === 0` and the graph is a connected acyclic all-C/H structure**, keep the candidates with the most carbon branches, then the lowest oriented branch-locant set; all graph-equivalent ties retained.
- `fOrientChainPath` / `fOrientChainPath3D`: carbon-branch locants join the tier-3 detachable-prefix set for those graphs. Both `fRankChainPool` call sites pass the 2D/3D connectivity/type arrays.
- Effect: `ethyl_3_dimethyl_2_5_hexane` offered 6 candidate paths (some producing `4-αιθυλο…`); now 4 equivalent paths, all `3-αιθυλο-2,5-διμεθυλοεξάνιο`. Multiple-bond/FG/ring/heteroatom molecules keep their existing ranking.

### Explicit terminal unsaturation locant (`core-49.js` `fGuessName`)
- Branched hydrocarbons with a single multiple-bond type now always keep the bond locant in `comp1No`, **including position 1** (teaching convention): `3-μεθυλο-1-βουτένιο` (was `3-μεθυλοβουτένιο`). Mixed en-yne keeps the double locant in `comp1No` and the triple in `comp3`. Consistent with the existing haloalkene behavior (`4-βρωμο-1-βουτενιο`).

### Data (`data_49.js` → 73 keys)
- New `ethyl_3_dimethyl_2_5_hexane` (C10H22, PubChem CID 521421): three embedded 2D MOL forms + `mols/nomeclature-moc2/ethyl_3_dimethyl_2_5_hexane_3D.sdf` + `mols/new_molecules/` sources.
- Stored `mainChain_*` filled for `methyl_2_propene`, `methyl_3_butene_1`, `ethyl_3_dimethyl_2_5_hexene_2` (this activates the "Από δεδομένα" bullet for them, per the v48 non-empty-array rule); `methyl_2_propene` formula normalized to `CH2=C(CH3)2`.

### Scenarios
- Imported `Αλκένια-Ονοματολογία_και_διακλαδώσεις.scenario.json` (22 steps) and `Αλκένια-Αιθένιο.scenario.json` (7 steps) from the student's set. The numbered/English lesson drafts and the old `ethene.scenario.json` were not imported.

### Deliberately not imported
- Namelecule product layer (`css/namelecule-*.css`, `design/*`, `assets/*`, `AGENTS.md`, welcome/library, theory library, loading/error screen, `showStepNumbers`/`reserveTitleSpace`, mint/teal theme). The alkyl table was reimplemented locally with nested divs and the existing palette (see below), not copied with the product layer.
- Their `fFitNameToWidth` / `--nl-name-scale` name fitter — v48's `fFitNameComponents` (0.7 scale floor + horizontal-scroll fallback) is kept as the better (legible, floored) behavior.
- Their text-parsing branch highlight/explain — v48's structural highlight is kept.

### Alkyl reference table + locant rule-table fixes
- Converted the alkyl reference table from a `<table>` to the shared nested `ruleRow` divs, so it uses the existing rule-table palette and `.ruleRow.selected` highlight instead of a separate table stylesheet.
- Branch locants (`compNumber1` / `compNumber2`) now select the alkyl table as well as branch names; the branch early-return paths reveal the rule panel instead of leaving `#ruleTheoryContainer` hidden.
- Added the missing `compBondType2` / `compEndNumber` rule cases, fixing the `undefined` rule tile/table on enyne `-ιν-` selections.
- `fGetNameComponentLocants` now splits comma- and hyphen-joined locants, covering the extra-group `comp0b` form.

### Checks
- JS syntax checked on the changed `*-49.js` files (esprima); CSS braces balanced (301/301); no leftover `alkylRuleTable`/`tr.selected`/`table-layout` selectors; every scenario `selectedMol` key exists in the 73-key set; 73/73 data keys and `reg()` calls. Owner browser click-through pending.

---

## [v48] (fluid viewers + authoring pin-dock + single/double-viewer height; live, `index.html` → v48)

New parallel file set `mulermoc-nom-48.html` + `js/*-48.js` + `css/*-48.css`, copied byte-identically from v47 (only the 7 asset refs in the html differ). `index.html` now redirects to v48 (owner flipped it live); `*47*`/`*46*` remain runnable at root, untouched. All work below is `*48*`-only (plus the shared `js/ui-icons.js` icon keys `pin`, `closePanel`, `deleteStep`). Pre-fork owner tweak carried over: `body`/`html` `overflow-x` handling in the v47 stylesheet.

### v48 review fixes (code + docs)

- **Naming** (`core-48.js` `fGuessName`): mixed en-yne **with** an alkyl branch now keeps an internal double-bond locant in `comp1No` (the branch locants overwrite `comp0`; the triple locant was already in `comp3`). A terminal double bond (locant set all `1`) stays unlocanted, matching the single-type hydrocarbon path. The haloalkene path is unchanged and intentionally retains the double-bond locant even at position 1 (owner-confirmed: `bromo_4_butene_1` → `4-βρωμο-1-βουτενιο`).
- **Present-start failure** (`scenario-48.js` `fScenarioPresentBegin`): when `fScenarioApply` cannot start the step, the stashed author settings are restored and the URL is reset to the bare path (the `#step=` marker and `?scenario/?present` query are cleared), so a retry cannot re-stash partially applied state.
- **Confirm dialog a11y** (`scenario-48.js`): `fScenarioConfirm` now traps Tab inside the panel and marks the rest of `body` `inert` while open (tab trap is the fallback where `inert` is unsupported); focus restore unchanged.
- **Viewer-height controls** (`molview-48.js`): both Auto readouts resync after a title-bar 2D/3D toggle (220 ms, after the slide), and the single-viewer slider `max` is now `min(live full height, VIEWER_MAX_H)`; the live value is clamped to the same ceiling.
- **Docs/comments**: `didactic-scenario-plan.md` sample now uses the exported `"app": "mulermoc-nom-44"`, documents `viewerBothHeight`, and states that `chainIdx` **is** captured (the stale "stepper walk index never stored" note and the matching `molview-48.js` comment are corrected). Several stale `-44`/`-45` header comments, the pinned `540px`→`480px` band comment, and an orphan `deleteScenario` icon comment were refreshed; a few `-44`/`-45`/`-46` references remain in comments only (no runtime effect).
- **Known limitations (not changed in this pass)**: `fGetNameComponentLocants` splits only on commas while `comp0b` joins extra alkyl groups with `-`, so slot-1 branch highlight/explanation (`compNumber2`/`compSecondSub2`) sees only the first locant when 3+ distinct alkyl groups exist; `fGetNameComponentMultiplier` uses a leading `δι-/τρι-/…` heuristic, so a single substituent whose name starts that way (e.g. τριφθορομεθυλο) can be described as a count; no bundled molecule exercises mixed en-yne **with** an alkyl branch (existing `hexen_1_yne_4`/`hexen_2_yne_4` are unbranched), so the new `comp1No` path is inspection-verified only.
- **Checks**: `git diff --check` clean; CSS braces and static refs re-checked. `node --check` is unavailable in this environment; owner browser click-through pending.

### Local alkene trial molecule + locant/highlight fixes + name auto-fit

- **New data** (`js/jsme-nick-nomeclature-moc2-data_48.js` + `mols/nomeclature-moc2/ethyl_3_dimethyl_2_5_hexene_2_3D.sdf`): added `ethyl_3_dimethyl_2_5_hexene_2` (3-ethyl-2,5-dimethylhex-2-ene, `C10H20`, PubChem CID 56988951) with three 2D MOL forms and a 3D SDF; stored `mainChain_*` arrays are empty → algorithmic (72 total `nameExamples` keys).
- **Naming fix** (`core-48.js` `fGuessName`): substituted hydrocarbons with an internal double/triple bond dropped the bond locant because the substituent locants overwrote the `comp0` bond prefix. A guarded `comp1No` fill now preserves the locant only when a single bond type is present and its locant set is not all `1`; terminal alkene names stay unchanged (e.g. `2-μεθυλοπροπένιο`, `3-μεθυλοβουτένιο`). The new molecule now renders `3-αιθυλο-2,5-διμεθυλο-2-εξένιο`.
- **Highlight fix** (`molview-48.js` `fGetHydrocarbonBranchHighlight[/3D]` + `fHighlightFG[/3D]`): clicking an alkyl name/number component highlighted every side branch. The helpers now accept a group slot and filter side branches by the locants in `nameComponentsList[slot*2]`; `FGno`/name-component mode selects the slot (`comp0/1` → first alphabetically, `comp2/3` → second). For the trial molecule `3-`/`αιθυλο` highlights only the ethyl branch and `-2,5-`/`διμεθυλο` only the two methyls, in 2D and 3D.
- **Branch explanation fix** (`molview-48.js` `fExplainNameComp`): on branched hydrocarbons the alkyl number/name components now explain the alkyl branch instead of a generic secondary functional group. The branch check runs before the `nameComponentsList[3]` (second substituent group) test, and `compNumber2`/`compSecondSub2` gain the same per-slot (`fGetBranchDisplayName(1)`) branch text. Singular components keep the position/name wording (`Δηλώνει τη θέση…` / `Δηλώνει το όνομα…`), while multiple locants (`-2,5-`) switch numbering components to `Δηλώνει τις θέσεις…` and multiplier prefixes (`δι-/τρι-/τετρα-…`) switch substituent name components to `Δηλώνει το πλήθος των…` (alkyl branches and secondary characteristic groups, 2D/3D).
- **Name auto-fit** (`css/jsme-nick-48.css` + `molview-48.js` + `teaching-48.js`): the name component row could exceed `#analysisCol`. `fFitNameComponents()` binary-searches a `--nameCompScale` on `.nameCompContainer` (boxes and `+` signs scale; transitions disabled while measuring) and toggles a `.nameOverflow` horizontal-scroll fallback (`justify-content: flex-start`) at the `0.7` scale floor. Re-runs after every `fShowNameAnalysis`, box/cross toggles, name-box selection, and on a debounced `#analysisCol` `ResizeObserver`.
- Checks: headless local-HTTP harness (long names, boxes/`+` toggles, 120px column, `comp0`/`comp2` highlight) passes with no JS errors; `node --check` on the five `*-48.js` files; `git diff --check` clean. Owner browser click-through pending.
- Docs synced to 72 keys; the 71-key entry below remains historical.

### Main-chain multiple-bond priority + alkene test molecules

- **Ranking** (`mulermoc-nom-core-48.js`): Step 7 and `fRankChainPool` now choose terminal-to-terminal paths by max CC multiple bonds (C=C + C≡C) → max C=C → longest chain → most FG anchors. The FG-anchor cover filter remains first (top-priority FG anchors), and all chains tied on the winning tier stay in the stepper pool. Orientation/numbering (`fOrientChainPath[/3D]`) is unchanged, preserving stored-data/FG behavior.
- **New data** (`js/jsme-nick-nomeclature-moc2-data_48.js` + `mols/nomeclature-moc2/`): added `methyl_2_propene` (`CH2=C(CH3)CH3`, PubChem CID 8255) and `methyl_3_butene_1` (`CH2=CHCH(CH3)CH3`, CID 11239) with three 2D MOL forms each and 3D SDFs; stored `mainChain_*` arrays are empty → algorithmic (71 total `nameExamples` keys).
- **Result**: `methyl_2_propene` stepper now offers **2** chains (both contain C=C; the saturated `CH3–C–CH3` path is gone); `methyl_3_butene_1` remains 2. Static regression over all 2D representations: only `methyl_2_propene` pool changes (3 → 2), no selected-chain changes; FG + multiple-bond molecules (`penten_1_one_3`, `pentyn_4_one_2`, etc.) have a single carbon path and are unchanged. Owner browser-tested the stepper.
- **Repo**: `archive/Giannis_Skendros/` ignored via `.gitignore` (contributor archive, not published).
- Docs synced to 71 keys; historical 69-molecule references left unchanged.

### Scenario/step delete: dedicated icons + red danger hover + confirm dialog

- **Icons** (shared `js/ui-icons.js` + `scenario-48.js`): three new registry keys originally added — `deleteScenario` (`imgs/delete-scenario-svgrepo-com.svg`, Illustrator `-9 -244 800 800` set, beside `columns1/2`), `closePanel` (`imgs/close-panel-svgrepo-com.svg`, same set), `deleteStep` (`imgs/clear-svgrepo-com.svg`, `0 0 512 512`, beside `closeSmall`) — all `fill → currentColor`, 16px, source `<title>`/ids/`enable-background` stripped. The `imgs/*` SVGs are **gitignored** (`.gitignore:69`), so the art ships **inlined** in `ui-icons.js` exactly like `pin`/`saveImage`. Wiring: the scenario-card `.scDelete` is painted icon-only via `fScenarioPaintIconBtn(…, "deleteStep", "Διαγραφή σεναρίου")` (icon-only helper; the `✕`/tooltip stays as the no-registry fallback; the card briefly used the `deleteScenario` key before the owner's icon tweak, `11685fb`, and that key was dropped in review as unused); `#scCloseBar` gets `closePanel` (mirror of the `#scPin` hydration — registry-first, `✕` fallback, onclick untouched); the step-row `Διαγραφή` action switches its icon key `closeSmall` → `deleteStep` (key only — label/aria unchanged). `#scCloseBar svg` joins the shared 16px sizing rule. `--redAlert: #b90000` added to `jsme-nick-48.css` `:root` (used by the danger hover and the dialog).
- **Red danger hover** (`scenario-48.js` + `mulermoc-nom-scenario-48.css`): the step-row delete button takes a `delete` class; new `#scenarioAuthorBar .scenarioDrawer .srow .scIconBtn.delete:hover { background/border-color: var(--redAlert); color: #fff }` — **id-qualified** so it out-specifies the generic `#scenarioAuthorBar button:hover` (`(1,5,1)` beats `(1,1,1)`; a bare `.srow … .delete` selector would lose). Mirrors the existing `#scenarioAuthorBar .scPresent.scIconBtn:hover` override pattern.
- **Confirm before delete** (`scenario-48.js` + `mulermoc-nom-scenario-48.css`): both destructive deletes (scenario card, step row) now route through a small modal — `fScenarioConfirm(msg, onYes, yesLabel)` builds a singleton `#scenarioConfirm` (lazy, like `#scenarioToast`) fixed backdrop (z-index **700**, above the toast at 600) with a `role="dialog"` `aria-modal` panel: message + `Άκυρο` + a red `Διαγραφή`. **Άκυρο** gets the initial focus (safe default); ESC (capture-phase listener, so it cancels the dialog and does **not** also close the author bar via the document keydown at `:2468`) / backdrop click / `Άκυρο` cancel; `Διαγραφή` closes then runs the delete. Scenario message names the card (`Διαγραφή σεναρίου «title»; Τα βήματά του θα χαθούν.`, title fallback `«χωρίς τίτλο»`), step message the number (`Διαγραφή βήματος N;`). **Always** confirms (even a step-less card). No schema change.

### Scenario authoring: per-step Present + persistent drawer

- **Per-step Present** (`scenario-48.js` + `css/mulermoc-nom-scenario-48.css`): each step row carries a `.scPresentStep` button (`screen` registry icon, dark-blue chrome) between Go and Update. It calls `fScenarioPresentBegin(scenId, idx)` with the row's 0-based index, so playback can start mid-scenario; the card's `Play ▶` calls the same helper without an index, which defaults/clamps to step 1. `fScenarioPresentBegin` moves to top level (it was nested inside `fScenarioBuildUi`), defaults `startIdx = 0`, clamps it to the step range, and writes `#step=<start + 1>`. The temporary start-at step number input and its clamp/sync helpers are removed; row Present is the targeted entry point and card Play is always step 1. Button-panel gap is back to `10px`, keeping the four actions on one row.
- **Drawer state survives authoring hide and Play → Exit** (`scenario-48.js` + CSS): authoring-off and present entry no longer strip `.scenarioDrawer.open` or `.scList.active`; a CSS rule hides the still-open drawer while `#scenarioAuthorBar` is closed or presenting (`visibility:hidden` + `pointer-events:none`, delayed to ride out the bar slide), so close → reopen and Play → Exit return to the same card and scroll position. The Steps button and bar-gap click still close it deliberately. After Exit, `fScenarioScrollDrawerToStep` scrolls only that drawer to the presented row (`requestAnimationFrame` + a 120ms second pass, since the pin-dock reflow can settle late).
- **Step Delete at the row corner** (`scenario-48.js` + CSS): the step-row Διαγραφή moves to the row's top-right corner as a transparent close affordance (red on hover). Row action wiring is now class-bound (`.scGo`, `.scPresentStep`, `.scUpdate`, `.scDupe`, `.scUp`, `.scDown`, `.delete`) instead of positional `button:not(.scNoteBtn)` indices, so adding Present cannot shift the other handlers.
- **Checks**: `node --check`, balanced CSS braces, `git diff --check`; headless integration: card Play at index 20 starts at index 0, row Present starts at index 10, drawer stays open and Exit scrolls to the presented row, no console errors. Owner browser click-through pending.

### Authoring pin-dock (scenario bar beside the app)

- **Pin-dock (current design)** (`scenario-48.js` + `mulermoc-nom-scenario-48.css` + `mulermoc-nom-48.html` + shared `js/ui-icons.js`): pin button (`#scPin`, registry `MuLERIcons.pin` from `imgs/pin-svgrepo-com.svg`, emoji fallback) in the scenario title row; pinned, `fScenarioSetPinned()` reparents the bar into `#pageContainer` (absolute, `top/bottom/right: 0`, so it always equals the page container's height from title zone to footer and can never drive layout height). Structure: `#pageTitle` above, `#authorLayout` (thin `relative` wrapper, renamed `#panelContainer` → `#mainAppContainer` holding exactly the three app columns), `#creditsUs` footer; pinned, `#pageContainer` is a centered `1600px + 480px` unit (`min-height`, not fixed height), `#pageTitle` and `#creditsUs` (also `width: auto`) yield the 480px band via right margin, and `#mainAppContainer` is the horizontal scroller. The viewer is frozen from a **pre-dock** width read (measuring after the class toggle locked stretched wide-screen pixels — order matters); the row keeps its inline `justify-content: safe center`; edge tab hidden, pin button lit; bar look: 10px navy border, no shadow, square corners. Live-only `MuLERMoCScenario.pinned` flag (never in step JSON); authoring-off (✕/ESC) and Present entry force-unpin (Exit returns to the overlay bar).
- **Pinned viewer width knob** (CSS only): `--viewerPinnedWidth` (`:root` in `jsme-nick-48.css`, default `400px`) consumed as a `max-width` ceiling over the inline measured lock — wide viewers shrink to the tuned value, narrow ones never forced wider; `min-width: 290px` / `max-width: 620px` bounds hold; the fluid pipeline follows with no JS change. Retune: one `:root` line + hard refresh.
- **Pin preference persists across close/reopen** (`scenario-48.js` only): new session-scoped `MuLERMoCScenario.pinPref` records the author's pin choice (set by the pin button; never in step JSON, no `localStorage`). Internal forced unpins (✕/ESC authoring-off, Present entry) leave the preference untouched, so `fScenarioApplyPinPref()` re-docks the bar when authoring reopens via the `Σενάρια` tab and on Present → Exit; presentation itself always hides the bar (unchanged). A deep-link present (`?scenario=…&present=1`, authoring off) exits with no bar/pin. The scenario panel still starts **closed** on page load; the preference **defaults to pinned**, so the first `Σενάρια` open docks the bar (only `pinPref` defaults true — `pinned` stays false so the dock is actually applied on open). A session unpin is remembered until reload, which restores the pinned default.
- **Row centering via `safe center`** (`48.html` + `scenario-48.js`): the app row (`#mainAppContainer > .HFlex`) now carries inline `justify-content: safe center` instead of `center`, and `fScenarioSetPinned()` no longer rewrites the row's `justify-content` (the old `flex-start`-while-pinned workaround and its unpin clear are removed). The columns stay centered when they fit and auto-left-align only when pinned content overflows the horizontal scroller, so the left menu column stays scroll-reachable; `fScenarioSyncScroller()`'s end-states stay truthful. Also fixes unpin not restoring center (the clear previously dropped the inline value). `safe` fallback: Chrome/Edge 115+, Firefox 63+, Safari 17.6+; older browsers drop the declaration and left-align.
- **Pinned drawer fill** (CSS only): the accordion-open card becomes a flex column claiming leftover bar height (`:has()`, no JS; `min-height: 85vh`) and the open drawer scrolls internally; grow animation is instant-tall + fade when pinned, slide-down kept unpinned.
- **Pinned scroll cues** (`48.html` + `scenario-48.js/css`): the container's native bottom scrollbar sits below the fold (a native top bar is impossible; `direction`/`rotate` hacks rejected — they threaten Snap coordinate mapping), so edge `‹ ›` buttons (viewport-anchored `top: 40vh`, shown only when pinned AND overflowing, end-disabled, 0.8-viewport smooth steps, reduced-motion aware, registry chevrons with text fallback), a branded scrollbar thumb, and a managed `tabindex` carry discoverability; `fScenarioSyncScroller()` owns the states (pin toggles, passive scroll, container observer, post-pin re-check). (Edge fade veil retired — see tuning bullet.)
- **Pinned bar slide via WAAPI** (`scenario-48.js` + `mulermoc-nom-scenario-48.css`): opening Σενάρια with the pin preference on (and Present → Exit) **snapped** the docked bar instead of sliding it in. Root cause: docking **reparents** the bar into `#pageContainer` and `.open` lands in the same task, so the CSS `transform` transition never sees a clean closed→open pair (reparenting suppresses it) — CSS-only attempts (dropping the pinned `transition:none`/`transform:none` overrides, then a reflow + single/double-`requestAnimationFrame` nudge) still snapped. Fix: the motion is driven imperatively by the **Web Animations API** — `fScenarioSlideBar(dir, onDone)` runs `bar.animate([{transform:'translateX(100%)'},{transform:'none'}], {duration:250, easing:'ease'})` (reverse for out, `fill:'forwards'` + `.cancel()` on finish), which no reparent/timing can suppress. `.open` stays the state authority (visibility + final transform); `body.scPinned #scenarioAuthorBar` keeps `transition: none` (so CSS never races WAAPI) plus the geometry/`border`/`max-height`/shadow (transform/visibility/pointer-events still dropped so `.open` controls them). **Open** (`fScenarioApplyPinPref`) adds `.open` once → slide-in. **Close** (pinned) slides the still-docked bar out *first* (staying `.open`), then unpins + hides + tears down from `onDone` while `fill:forwards` holds the off-screen pose — this avoids the remove-then-re-add of `.open` that previously flashed close→open→close; the helper returns `false` under reduced-motion/no-WAAPI so the close falls back to the original unpin-then-CSS path. The direct pin-button dock stays instant. Unpinned open/close is untouched (still the CSS overlay slide).
- **Pinned layout tuning (owner styling)** (`scenario-48.css` + `jsme-nick-48.css` + `mulermoc-nom-48.html`): pinned band narrowed **540px → 480px** (`#pageContainer` `calc(1600px + 480px)`; `#pageTitle`/`#creditsUs`/`#mainAppContainer` `margin-right: 480px`; `#scenarioAuthorBar` `width`/`max-width: 480px`) and the cue column offset follows (`#scScrollRight` `548px → 488px`). `#scPin` takes a `2px solid var(--veryLightBlue)` border (was 1px transparent) and `#scPin.active` fills `var(--vibrantGreen)`/white (was `var(--darkEarth)` + white border). Pinned title row fills dark — new `body.scPinned #scenarioPlayBarTitle { background: var(--darkBlue); margin-bottom: 10px; padding-top: 0 }` — and the base `.scTitleText`/title rules are simplified (font-family, margins, padding, background, border, radius dropped). Open pinned drawer card `min-height` 60vh → **85vh** (`.scenarioDrawer.open` 80vh commented, fills via flex). **Fade veil retired**: `#scScrollFade` block + its show rule commented in CSS and the div commented in `mulermoc-nom-48.html`. `css/jsme-nick-48.css` `.JmolContainer { height: 240px }` commented so the 3D container height is fluid (follows the v48 native `setSize` pipeline).

### Adaptive pinned viewer width (CSS `clamp`, no JS)

- **Problem**: while docked, `body.scPinned #viewerCol { max-width: var(--viewerPinnedWidth, 400px) }` forced the viewer to ≤400px on **every** screen — wasting width on large monitors (the row `#menuCol` 230 + gaps 20 + viewer + `#analysisCol` 350 plus the 480px band has ample room) while common 1366–1440 laptops still overflowed and showed the scroll cues.
- **Change** (`mulermoc-nom-scenario-48.css` + `jsme-nick-48.css`): the pinned `#pageContainer` becomes an inline-size query container (`container-type: inline-size`; safe — it is already `position:relative` and the only `position:fixed` element, `#rotatePrompt`, is a direct `body` child). The pinned viewer cap becomes fluid:
  `body.scPinned #viewerCol { max-width: clamp(var(--viewerPinnedWidth, 400px), calc(100cqw - 1090px), 620px) }`.
  The inline pre-dock flex-basis measured in `fScenarioSetPinned` remains the upper bound (620px), so the viewer keeps its **original** width when the screen has room; it eases down only as needed so the row plus the 480px band fits, with `--viewerPinnedWidth` (now documented as the clamp **floor**, default 400px) as the minimum. `100cqw` = page-container content width (already excludes the scrollbar); `1090px` = band 480 + menu 230 + gaps 20 + analysis 350 + border/rounding slack.
- **No JS**: resize is handled natively and the existing `#viewerCol` ResizeObserver (fluid viewers) and `#mainAppContainer` ResizeObserver (scroll cues) follow through the verified pipeline. Unpinned layout is untouched. Behavior: viewport ≳1730px → original width; ~1500–1730px → eases 620→400; below → pinned at 400 with cues if it still overflows.

### Main-chain "Από δεδομένα" bullet inactive without stored data

- **Bug** (`molview-48.js` `fUpdateChainModeButton`): the "Από δεδομένα" bullet of the `Υπολογισμός κύριας αλυσίδας:` row was gated with `!!nameExamples[selectedMol]?.["mainChain" + suffix]`, and `!![]` is `true` — so molecules with **empty** stored chain arrays still showed the option active. (Missing **keys** were already handled; empty arrays were not.) Found in ten molecules in `jsme-nick-nomeclature-moc2-data_48.js`: the ethers/esters (`dimethylether`, `ethyl_methyl_ether`, `diethyl_ether`, `isopropyl_methyl_ether`, `ethanoic_methyl_ester`, `propanoic_methyl_ester`, `methyl_methanoate`, `isopropyl_ethanoate`) plus the placeholders `methyl_2_pentane`/`dimethyl_2_3_butane`, all `mainChain_*: []`.
- **Fix**: `hasChainData` now requires a **non-empty array** (and treats **no selected molecule** as no data, so the bullet starts inactive on load). Empty/missing → `disabledRadio` (`.disabledRadio`: `opacity:.35` + `pointer-events:none`, already guarded by the click handler) and `mainChainMode` auto-falls back from `data` to `algorithmic` (pre-existing `else` branch). An init call in the `$(document).ready` block (`teaching-48.js`) sets the landing state.
- **Scenario sync**: `fScenarioSyncControlUi` (`scenario-48.js`) now calls the guarded `fUpdateChainModeButton()` (after the `fUpdateDiagr2DButton()` pass, so `mode2D` is resolved) — mirrors `fSyncAtomColorModeDisabled()` added last commit; runs at both `fScenarioApply` call sites, so a step applied with `mainChainMode: "data"` on a no-data molecule re-syncs the bullet and the mode.
- **Consistency hardening** (`molview-48.js`): `fHighLightMainChain`, `fHighLightMainChainBonds` and the skeletal case of `fShowNumbering` used the same truthiness test, so an empty stored chain was treated as valid and produced an **empty** highlight. They now fall back to the algorithmic chain when the stored array is missing/empty.
- No CSS/HTML change; `scenarioVersion` unchanged (live-only UI state).

### Save-image buttons follow the 2D/3D ρυθμίσεις checkbox (per-step)

- **Bug** (`scenario-48.js` `fScenarioChrome`): in playback `#save2DBtn`/`#save3DBtn` were gated on `show.save["2D"/"3D"]`, but **no authoring UI writes `show.save`** (the per-step drawer only carries the `2D/3D ρυθμίσεις` checkboxes, which write `show.controls`), so the save-image buttons never appeared even with a checked ρυθμίσεις bar.
- **Fix**: the two buttons now ride their control bar — shown whenever `show.controls["2D"/"3D"]` is checked (and that viewer visible) — driven by the class-aware `fScenarioShowBar` (a stale `hide` class from a no-viewer exit could otherwise defeat the inline-display restore). A stored `show.save` stays an independent OR trigger for legacy files. No schema change; "Update" already preserves `show.controls`. (v48 files only.)

### Present step-text reserved in the viewer height fit

- **Bug** (`molview-48.js` `fViewerHeights2D3D`): the viewer budget subtracted the header, `#pageTitle` and `#creditsUs` but **not `#scStepText`** — the per-step note card, a normal-flow sibling above the app columns. So in presentation, a two-viewer step carrying a note sized the viewers to the full height and the note pushed the page into scroll.
- **Fix**: subtract the visible step-text card's full footprint (its `offsetHeight` plus computed top/bottom margins; `margin: -10px auto 20px auto` → net + 10px) from `total`, so the equal split (and the single-viewer Όριο ύψους ceiling) leaves room for the note. Authoring is untouched (`#scStepText` is `display:none` → `offsetParent` null). (`scenario-48.js` `fScenarioChrome`): the step apply fits the viewers *before* `fScenarioChrome` writes the new card, so a re-fit now runs right after `fScenarioFillStepPanel`/`fScenarioHide("scStepText")` while presenting — `offsetHeight` forces the fresh layout. Width-driven re-fits still come from the `#viewerCol` observer.

### Shared 240px viewer min-height floor

- **Change** (`molview-48.js` + `jsme-nick-48.css` + `mulermoc-nom-48.html`): the two viewer floors (**2D 200 / 3D 120**) are unified into a single **240px** minimum, `const VIEWER_MIN_H`, applied in `fViewerHeights2D3D` (the `out.full` / single-viewer cap math and the final `h2`/`h3` clamps). With a long present note card the viewers now stop at 240px instead of the old 120px 3D floor; the page scrolls rather than squashing them further. The CSS min-heights mirror it (`.JmolContainer`, `#jsmeNomeclatureSVG` → 240px) so the applet box and DOM agree. The max-height control follows the same floor (`fViewerMaxHeightFull` ceiling, `#viewerMaxHeightRange` `min`). The tiny-screen phone cap (`innerHeight < 430` → 30%) is unchanged and still wins as the final ceiling. (Live value later tuned down by the owner to **150**, and the CSS floor is now driven by the JS constant via the `--viewerMinH` variable — see "Double-viewer height".)

### Double-viewer height (Ρυθμίσεις control, per-step)

- **Control** (`mulermoc-nom-48.html` + `molview-48.js`): new `#viewerBothHeightSetting` row in the viewer-settings panel — label `Ύψος δύο viewers (σύνολο):` + `#viewerBothHeightCheck` (generic `.checkBoxContainer`, unchecked by default) + `#viewerBothHeightRange` (fixed `min 300`, `max 1000`, `step 10`) + `#viewerBothHeightVal` readout. **Unchecked = Auto** (the equal split both viewers get today), **checked = Manual**. The number is the **combined 2D+3D height**; each viewer takes half. `fViewerBothHeightSync()` mirrors state into the control (Auto shows the current combined height), `fViewerBothHeightFromUi()` writes the live global and re-fits on every slider `input`, `fInitViewerBothHeight()` binds (deferred-tick read of the generic checkbox toggle; re-binds on `DOMContentLoaded` if the panel isn't parsed yet) — parallel to the single-viewer max-height trio. Reuses the existing `.settingRow`/`.viewerHeightRange`/`.viewerHeightVal` classes.
- **Engine** (`molview-48.js`): new live global `viewerBothH` (px | `null` = Auto; never `localStorage`) plus constants `VIEWER_BOTH_MIN = 300` / `VIEWER_BOTH_MAX = 1000`. When **two** viewers are visible and `!raw`, `fViewerHeights2D3D` **overrides** each viewer's height with `round(clamp(viewerBothH, 300, 1000) / 2)` (so 300 → 150px each, 1000 → 500px each) — an override, not a cap, so the viewers both grow and shrink as the slider moves (`cap` math could only shrink, which is why the first cut appeared to do nothing when the auto split was already below the slider). Auto (`viewerBothH == null`) leaves the equal split byte-for-byte unchanged; `raw` skips it. The phone cap still trims. Independent of the single-viewer cap — each governs its own visibility case.
- **Floor alignment** (`css/jsme-nick-48.css` + `molview-48.js`): the viewer CSS `min-height` (`.JmolContainer` / `#jsmeNomeclatureSVG`) is now `min-height: var(--viewerMinH, 150px)`, and `molview-48.js` pushes the live `VIEWER_MIN_H` (150) into `--viewerMinH` at load — so the DOM floor follows the single JS constant instead of a hand-copied literal (which had drifted: 240 vs 200, then 200 vs 150). The bottom of the combined range (300 → 150px each) is therefore actually reachable instead of being clipped by the DOM floor.
- **Scenario** (`scenario-48.js`): per-step `show.viewerBothHeight` (additive, no schema change). `fScenarioValidViewerBothHeight` (null/empty → `null`; `parseInt`, clamp the combined 300–1000; invalid → `null`), captured via `fScenarioG("viewerBothH")`, defaulted/normalized in `fScenarioDefaults`, warned in `fScenarioValidate` on non-empty invalid input. `fScenarioApplyViewerMaxHeight` (called at both apply sites) now also sets `viewerBothH` and syncs the control; the value is stashed/restored around Present via `fScenarioStashAuthorSettings`/`fScenarioRestoreAuthorSettings`.

### Single-viewer max height (Ρυθμίσεις control, per-step)

- **Control** (`mulermoc-nom-48.html` + `jsme-nick-48.css` + `molview-48.js`): new `#viewerMaxHeightSetting` row in the viewer-settings panel — label `Όριο ύψους μεμονωμένου viewer:` + `#viewerMaxHeightCheck` (generic `.checkBoxContainer`, unchecked by default) + `#viewerMaxHeightRange` (`min 150`, dynamic `max`, `step 10`) + `#viewerMaxHeightVal` readout. **Unchecked = Auto**, **checked = Manual**. `fViewerMaxHeightSync()` mirrors state into the control, `fViewerMaxHeightFromUi()` writes the live global, `fInitViewerMaxHeight()` binds (deferred-tick read of the generic checkbox toggle; re-binds on `DOMContentLoaded` if the panel isn't parsed yet), `fViewerMaxHeightFull()` returns the dynamic ceiling (`max(VIEWER_MIN_H, fViewerHeights2D3D(true).full)`). The panel's `.open` now scrolls internally (`overflow-y:auto`, `max-height: min(70vh, 400px)`) so added rows never clip.
- **Engine** (`molview-48.js`): new live global `viewerMaxH` (px | `null` = Auto; never `localStorage`). `fViewerHeights2D3D(raw)` now also returns `full` (single-viewer height, independent of current visibility) and, when **one** viewer is visible and `!raw`, caps the survivor at Auto = `shareFor(2)` (both-visible height, so hiding the other viewer never resizes it) or the explicit `viewerMaxH`, clamped into `[floor, single share]`. `raw` skips the cap (the slider-ceiling measurement). The 2D CSS floor drops **244 → 200px** (`#jsmeNomeclatureSVG`), matching the engine's 2D floor (3D stays 120).
- **Persistence** (`scenario-48.js` + `molview-48.js`): additive optional `show.viewerMaxHeight` (number px | `null`; default `null`, no `scenarioVersion` bump). `fScenarioValidViewerMaxHeight(v)` (null/empty → `null`, `parseInt`, clamp **150–2000** (`VIEWER_MIN_H`–`VIEWER_MAX_H`), invalid → `null`) with a validate-time warning for non-empty invalid input. Captured via `fScenarioG("viewerMaxH")` on Save/Update; applied by `fScenarioApplyViewerMaxHeight(step)` in **both** `fScenarioApply` branches (menu-only + full) — sets `viewerMaxH`, `fResizeViewers()`, then syncs the control — and **in presentation too**. Present entry stashes the author's live `viewerMaxH` and Exit restores it (`fScenarioStashAuthorSettings`/`fScenarioRestoreAuthorSettings`), re-fitting the viewers.

### Ρυθμίσεις panel: 2D/3D detail toggles moved in

- **Moved into the gear panel** (`mulermoc-nom-48.html` + `jsme-nick-48.css` + `molview-48.js` + `teaching-48.js` + `scenario-48.js`): `Έγχρωμα Σύμβολα` (`#svgAtomColorCheck`) leaves the 2D bar and merges into the existing `Χρωματισμός ατόμων 2D` row (on/off checkbox + the atom/group radios); `Σύμβολα ατόμων` (`#atomSymbolsCheck`) leaves the 3D bar into a new `Σύμβολα ατόμων 3D` row. IDs are unchanged, so every ID-based handler, per-step `style2D.atomColors`/`view3D.atomSymbols` capture/apply, and `fScenarioSyncControlUi` are untouched (no schema change). New `fSyncAtomColorModeDisabled()` dims and `pointer-events:none`s the `Κατά άτομο / Κατά ομάδα` radios while `Έγχρωμα Σύμβολα` is off (reusing the existing `.disabledRadio` convention), synced on load, on toggle, and on per-step apply. `#viewerSettingsPanel.open` scrolls internally so the two extra rows never clip. The two bars keep their remaining controls (2D: mode radios + `Σύμβολα CHn`; 3D: `Υδρογόνα C-H` + style + `Περιστροφή`).

### Narrow-viewer fluid UI text (container query, `jsme-nick-48.css`)

- **Container query instead of a media query** (`jsme-nick-48.css`): the viewer column (`#viewerCol`, 290–620px; ~400px pinned) is decoupled from viewport width, so a viewport media query would never fire in the pinned case. `#viewerCol` becomes a query container (`container-type: inline-size; container-name: viewer`); its containing-block behaviour is unchanged (`.panelTitle` is nearer/positioned, so the settings panel's `top:100%` anchoring holds) and height containment is untouched (resize pipeline unaffected). The settings/control text now eases via `clamp(0.75rem, ~2.1–2.2cqi, <current>)` on `.settingLabel`, the panel/bars' `.radioCheckContainer`/`.checkBoxContainer`, `#dropLabel`/`.dropLi`, and `.viewerHeightVal` — at the 620px max the clamps land on the current sizes (wide layout unchanged), easing to a **0.75rem floor** as the column/pinned width shrinks. Scoped to `#viewerCol` (left/right menus and the scenario bar, which share these classes, are untouched); `.settingTitle` keeps its size for hierarchy. Browsers without container units ignore the declarations → base sizes (no breakage).

### Settings panel no longer clipped when the viewer column is short

- **Bug** (`jsme-nick-48.css`): `#viewerCol` had `overflow: hidden` solely to clip its children to the column's `border-radius: 5px`. The settings dropdown (`#viewerSettingsPanel`) is `position: absolute; top: 100%` inside `.panelTitle` (the column's first child), so it renders **below** the column's content box. With both viewers hidden (`fToggleViewer2D`/`fToggleViewer3D`) the column collapses to just the title bar and the clip cut the panel off.
- **Fix** (CSS only): `#viewerCol` `overflow: hidden` → `visible`, and the column's bottom rounding is enforced on the **last visible bar** instead of by clipping — `#controls3D` (always last when 3D is visible) and `#radio2DMode` when `#controls3D` is hidden (`#viewerCol:has(#controls3D.hide) #radio2DMode`), each with `border-bottom-{left,right}-radius: 4px` (= the column's `5px` radius minus its `1px` border). With no viewer visible the column's own rounded background/border renders the corners. The tooltips that were positioned to respect the old clip are unchanged (they were already placed inward).
- **Caveat**: in pinned mode `#mainAppContainer { overflow-x: auto }` computes `overflow-y: auto`, a second clip ancestor; the no-viewer **and** pinned combination can still clip/scroll there (a viewer-visible pinned panel fits the row and is unaffected). Unpinned is fully fixed.

### Fluid viewers — responsive foundation (`molview-48.js` + `jsme-nick-48.css`)

- **Fluid 2D**: revived `fResizeViewers` fits both JSME applets to the viewer column width via native `setSize` (re-depict; coordinates correct by construction — no zoom-factor machinery; upstream JSME sanctions resize/autoresize patterns), then `fReapplyZoomScale2D()` re-fits the depiction (`setSize` alone left a small stale molecule until any zoom press; also fixed the small methane on load) and rebuilds the Snap overlay + replays numbering. Highlights survive. Debounced `ResizeObserver` on `#viewerCol` (~150ms; width **and** height; replaces the retired window listener); one initial fit at `jsmeOnLoad`; constructor stays `590×240`; zoom (`molZoom2D`, stored per step) composes on top untouched. `#viewerCol` bounds: `max-width: 620px` (the old `width: 620px` was dead code under `flex-basis: 0`), `min-width: 290px`.
- **Container-derived heights**: `fViewerHeights2D3D()` (viewport minus page chrome and measured column chrome, visible viewers split equally, CSS-minimum floors 200/120, phone-landscape cap as ceiling, sibling-column dead-space top-up — never the viewers' own heights, avoiding circularity) replaces the width-ratio formulas; 3D asserts the same height on `Jmol.resizeApplet` and `#jmolAppletNomeclature_appletinfotablediv`; container divs never take explicit heights. Visibility is read off the actually-toggled units (the nested `#jsmeNomeclatureSVG` lives *inside* `#jsmeNomeclatureDIV`, invisible to a `viewerCol.children` loop — found via the debug line).
- **Diagnostics + robustness**: `window.MuLERmoCDebugResize` flag → one `[resize]` console line per run (helper values, fallback usage, applied sizes, visibility; window vars don't survive reload — set it, then trigger a resize); 3D resize re-sent once via the `jmol_isReady` handshake (the initial fit can land before the applet is live); 3D path guarded (`typeof Jmol` + try/catch).

### Misc UI polish (v48)

- **Narrate icon** (`js/mulermoc-nom-molview-48.js` + shared `js/ui-icons.js`): `#readNameBtn` now renders the `audioDescription` registry glyph (`svgAudioDesc`) instead of `svgPlay`.
- **Name-style toggles** (`css/jsme-nick-48.css` + `js/mulermoc-nom-teaching-48.js`): the box/cross/eye/narrate buttons shrink to 20px with a 2px border, and the box/cross toggles add/remove `.active` on click (dark-blue fill, very-light-gray border) so their state reads like the eye toggle.

---

## [v47] — 2026-10-16 (`index.html` → 47; v46 frozen, runnable at root)

New parallel file set `mulermoc-nom-47.html` + `js/*-47.js` + `css/*-47.css`, copied from v46 (`index.html` → `mulermoc-nom-47.html`; `*46*`/`*45*` runnable at root, untouched). All stepper work below is `*47*`-only.

### Main-chain stepper (FG-aware longest-chain pool, rank-parallel 2D+3D)

- Core (`core-47.js`): Rule A/B orientation extracted verbatim into `fOrientChainPath[/3D]` (shared with the pool builder); new `fTopFgAnchorSet` (top `gFunctionalGroupsOrder` FG's anchor carbons; halogen/hydrocarbon unranked, ether recorded without requirement) + `fRankChainPool` (FG-cover filter → max-length tier → legacy comparator, stable sort → per-entry orientation). Pools persisted as `mainChainPool[/3D]` (+3D owner key); Step 9 adopts the live walk index (fresh loads land on pool[0]; same-molecule rebuilds keep the stepped chain). All fallbacks seed single-entry pools; `terminalFgCarbons[/3D]` globalized.
- Step index stored in step JSON: additive top-level `chainIdx` (default 0, no version bump) — silent capture on Save/Update, validated on import (invalid → 0 with warning, clamped to the live pool at apply), re-asserted after the step load with naming/boxes winner-based and highlight replay on the stored chain; 3D follows via the shared index at parse time (no separate hook needed). Exit keeps the exit step's chain (no author-chain stash, same contract as `selectedMol`).
- Stepper UI (name-settings panel, `molview-47.js` + `jsme-nick-47.css`): `‹ n/N ›` group in one `#chainStepperBox` container div, interpolated into the panel template left of the narrate toggle with live counter/disabled states (truthful across naming rebuilds); renders only with 2+ chains (algorithmic mode, molecule loaded). Owner-styled caption label under the box. No reset button, no reason row (owner cut). Per step swaps the live chain globals, recomputes name/substituents, then refreshes only the selected component via the click sequence (`fClearHighlights` + rebuild + `fExplainNameComp`, no toggle, no narration); with nothing selected the counter alone updates. Validation bypassed while stepping; algorithmic mode only; walk index survives same-molecule rebuilds (mode switches, naming recomputes adopt the stepped chain — only fresh molecule loads reset to pool[0]); rank-parallel 3D only when the 3D pool is fresh (async parse), else 2D-only.
- Stepper UI layout per molecule case (name-settings panel, `molview-47.js` + `jsme-nick-47.css`): the panel is now a column of two spread rows (`#nameSettingsRowTop` + `#nameSettingsRowMain` with `.nsLeft`/`.nsRight` groups) — ether + stepper renders the stepper alone on top with radios left / buttons right below; stepper-only (non-ether) and radios-only (ether, no stepper) share one row left/right; neither keeps buttons right as in frozen versions. No empty half-rows; single-row cases emit no extra row. `fRenderChainStepper()` collapses the top row or the inline left group when the stepper hides. Stepper tooltips (`‹`/`›`) render above the row below (`z-index: 400`, same level as save/zoom/settings bubbles); disabled stepper buttons take    `pointer-events: none` (same convention as `readNameBtn:disabled`), so no tooltip shows on an inactive step.
- Numbering-bonds setting (viewer settings, `molview-47.js` + `teaching-47.js` + `mulermoc-nom-47.html` + `scenario-47.js`): new `Επισήμανση δεσμών κατά την αρίθμηση` checkbox (`#highlightNumberingBondsCheck`, default on) next to the atoms toggle — main-chain/acid-fragment numbering clicks highlight the C–C bonds only when enabled (atoms + numbers unaffected). Wired via `fShowNumberingBonds()` + opt-out `skipBonds` params on `fHighlightAtomChain[/3D]` (alkyl-rule callers keep bonds always on);    toggling with the chain component selected re-applies live (bond-atoms pattern). Stored per step as additive `styleHighlight.numberingBonds` (legacy → on, no version bump), with Present stash / Exit restore. Follow-up fix: the 2D main-chain path (`fHighLightMainChain`) painted atoms only, so 2D bonds never lit — it now also paints every bond with both ends in the resolved chain (any order, green `9`, 3D parity), under the same setting, so default-on truly highlights bonds in both viewers. Follow-up fix 2: 3D numbering bonds were grey (`[X909090]`, reading as dimmed/off next to green atoms) — now green (`[X79dc6d]`) like the atoms when checked; alkyl paths already overpainted green via `fColorFragmentBonds3D`, so their pixels are unchanged. Follow-up fix 3: atoms and bonds gate independently (previously bonds hid under the atoms `if`, so atoms-off killed bonds too) — `fHighLightMainChain[/Bonds]` split in 2D, `skipAtoms` 4th params on `fHighlightAtomChain[/3D]`; the 3D off-state paints explicit neutral grey (plain `none` inherits the atom color in Jmol, which had made unchecked bonds render green); one combined live re-apply covers both checkboxes.
- CSS color naming (behavior-identical, `*47*` stylesheets only): `--baseColor` → `--darkBlue`, `--guiColor` → `--vibrantGreen`, `--bgColor` → `--veryLightEarth`, `--lightGrayNick` → `--veryLightGray` (values unchanged; frozen `*42–46*` + archive keep the old names).

---

## [v46] — 2026-10-15 (`index.html` → 46; v45 frozen, runnable at root)

Earlier entries below were written against `*44*` paths; the same behaviors now ship in the `*45*` set (mechanical copy + the rename below). v45 is frozen at 65 keys with its pre-formate core; v46 is a mechanical `*45*` → `*46*` copy carrying the 4 molecules + formate fix below.

### MOL re-embed round: redrawn geometry + title-line fix (v46-only data)

- Owner redrew the 2D MOLs in ChemDraw (alignment + new geometry): all 12 new-molecule blocks (`diethyl_ether`, `isopropyl_methyl_ether`, `methyl_methanoate`, `isopropyl_ethanoate` × Condensed/Expanded/Skeletal) plus `dimethyl_2_3_butane` Condensed/Expanded re-embedded in `js/jsme-nick-nomeclature-moc2-data_46.js` (LF-normalized; `*45*` files and `data_45.js` untouched).
- Root-cause fix (2026-10-15): the first import had dropped the filename title line, shifting the V2000 counts line from index 3 → 2 — JSME parsed 0 atoms (empty viewer + `fCalcMainChain: cyclic molecule` console fallback). Titles restored; full 195-block audit passes (counts at index 3 everywhere). CORRECTION to the earlier "no SMILES title" note below: V2000's 3 header lines *include* the title — dropping it was a mistake, not a rule.
- Two redraws landed short on hydrogens and were fixed at source before import: `dimethyl_2_3_butane_2D_Expanded` (18→20 atoms, the two methine H's) and `isopropyl_methyl_ether_2D_Expanded` (14→15 atoms, the central CH hydrogen). Per-carbon H/valence gates pass (`[3,1,1,3,3,3]` and `[1,3,3,3]`).
- ChemDraw re-exports write CRLF; the embed normalizes to LF (asserted no-CR in `data_46.js`). Working-copy `.mol` files keep CRLF on disk; `* text=auto eol=lf` normalizes them on commit.
- Owner browser-verified: both esters load (`μεθανικός μεθυλεστέρας`, `αιθανικός ισοπροπυλεστέρας`), warning gone.

### Grey C–H bonds in expanded mode (v46-only viewer)

- New `fApplyCHBondColors2D()` (`js/mulermoc-nom-molview-46.js`, called from `fUpdateSVG()` after the atom-color pass): when `Έγχρωμα Σύμβολα` is on and `mode2D === "expanded"`, C–H bond lines take `atomColors2D.H` (`#909090`, same as the H labels). Fresh JSME SVG is black each rebuild so toggle-off needs no reset; green highlight backgrounds are separate attributes and win where applied. Condensed/skeletal untouched (no explicit H lines). Browser check pending.

### 3D default zoom 80 → 50 (`spt/init-3.spt`)

- Shared JSmol init script now opens at `zoom 50` (was 80). Applies to all versions loading 3D (owner change, committed with this batch).

### Icon consolidation into `js/ui-icons.js` (v46-only consumers)

- All 12 molview SVG consts (`settings/speaker/mute/stop/playSm/nameBox/…/eyeState`) moved to the shared registry, markup byte-identical; `molview-46.js` keeps guarded lexical aliases so every use site (`teaching-46`, `scenario-46` included) works unchanged. `playSm` naming avoids the existing 512-viewBox scenario `play` icon. `*42–45*` sets keep local copies (frozen).
- Save-image icon (`saveImage`, from `imgs/image-svgrepo-Industrial-Sharp.svg`, ids stripped) inlined for v46: both save buttons use registry-filled placeholders + a generic `[data-icon]` hydration; the `.svg` file stays on disk for the frozen pages.
- `zoomIn`/`zoomOut` (Industrial-Sharp) added to the registry for later use.

### 2D zoom controls (v46-only)

- New `molZoom2D` state (default 2.0, the long-standing load value) applied by `fLoadMol2D` on both JSME applets; `fZoom2D(dir)` steps ×1.25 clamped 0.5–6.0, then re-renders + replays numbering. −/+ buttons docked left of the 2D save button.
- Zoom resets to default on every molecule load (`fInitProps`); mode/chain switches keep it for comparison.
- Steps capture additive `style2D.zoom` (legacy → 2.0, no version bump): Save/Update carry it, apply re-asserts it after the step load, Present entry stashes / Exit restores the author's live zoom (same pattern as the eye/hidden stash).

### 3D zoom controls (v46-only, live-only)

- New `fZoom3D(dir)` sending owner-provided `zoomTo IN;` / `zoomTo OUT;` to JSmol (guarded); −/+ buttons in a `#view3DTools` cluster symmetric with 2D. No state, no capture: JSmol `load` resets framing per molecule, and per-step cameras remain moveto's job (capture/apply follow-up pending, out of scope here).

### Viewer tool-button merge (v46-only chrome)

- 2D zoom pair + save share one `#view2DTools` container and one `.viewerToolBtn` class (3D: `#view3DTools` + reclassed save); the hand-synced `right:36px` offset and duplicated CSS are gone, zoom buttons join the save-button tooltip clip-avoidance geometry. Pixel-identical layout.

### Per-molecule SMILES at boot (v46-only, storage-only)

- `fClassifyAllMolecules()` now also reads `getSmiles()` (with `smiles()` fallback) off the already-loaded condensed structure and stores it on `nameExamples[key].smiles` — no new loop, no extra `readMolFile`, no perf cost, miss → `null` (never a boot failure). No UI and no logging changes yet; reserved as a future canonical molecule id (research logging, menu search, mol-info display).

### Four new molecules (66th–69th: 2 ethers + 2 esters)

- New `nameExamples` keys `diethyl_ether` (`CH3CH2OCH2CH3`), `isopropyl_methyl_ether` (`CH3OCH(CH3)2`), `methyl_methanoate` (`HCOOCH3`), `isopropyl_ethanoate` (`CH3COOCH(CH3)2`) — all `mainChain_*`/`mainChain3D` empty → algorithmic chain, no `moveto` yet — in `js/jsme-nick-nomeclature-moc2-data_46.js` (65 → 69 keys).
- New 2D MOLs `<key>_2D_Condensed/_Expanded/_Skeletal` (exact `mols/new_molecules/` file bytes, v45 case; V2000 3-header rule, no SMILES title) + 4 `reg()` lines; 3D `mols/nomeclature-moc2/<key>_3D.sdf` (PubChem CIDs 3283/11721/7865/7915, inbox copies kept). Menu grouping automatic via engine.
- Headless-verified all 3 modes: `αιθοξυαιθάνιο` / `διαιθυλαιθέρας`, `2-μεθοξυπροπάνιο` / `μεθυλπροπυλαιθέρας`, `μεθανικός μεθυλεστέρας`, `αιθανικός προπυλεστέρας`; full 69×3 regression: 0 name changes among the 195 pre-existing combos. Browser name-box/highlight check pending.

### Formate-ester engine fix (v46 carries it; v45 core untouched)

- Bug: `methyl_methanoate` named `1-αλκοξυμεθάνάλη` — the formyl carbonyl C (explicit H in KingDraw MOLs is skipped in `atomValenceList`, so valence 3) was classified `aldehyde`, and the ester reclassification only consumed `ketone` O. Same latent issue in 3D (`fDetectMolType3D`).
- Fix (`js/mulermoc-nom-core-46.js`): new ether+aldehyde → ester pass in `fDetectMolType`/`fDetectMolType3D`, mirroring the HCOOH alcohol+aldehyde acid check — an aldehyde O whose C neighbors the ether O (`O=C(H)-O`) is by definition a formate ester. Now `μεθανικός μεθυλεστέρας`. No false positives possible (a free aldehyde C never bonds an ether O); real aldehydes (e.g. ethanal) verified unchanged.
- Known nit carried: `isopropyl_methyl_ether_2D_Expanded.mol` counts `17 14` vs PubChem 3D `15 14` (C4H10O = 15 atoms correct) — embedded as-is, 2D review pending.

### Iso-alkyl prefix upgrade (v46-only engine + COMMON labels)

- Bug: branched alkyl fragments were named by carbon count only — isopropyl rendered `προπυλ` (`αιθανικός προπυλεστέρας`, common `μεθυλπροπυλαιθέρας`).
- Fix (`js/mulermoc-nom-core-46.js`): new `isoAlkylNames` table + `fAlkylGroupName(len, attachC, kind)` shape check (attachment C with 2+ carbon neighbors → branched; straight output byte-identical), wired into all four alkyl slots — ether systematic prefix, ether common stems, ester alcohol part, hydrocarbon branch names. COMMON box labels (`js/mulermoc-nom-molview-46.js` `fGetEtherCommonParts`, which carries its own stem copy) routed through the same helper; `alkylBranchNouns` gains `ισοπροπυλο: "ισοπροπύλιο"`. Table extensible to iso-/sec-/tert-butyl (no molecules yet).
- Now `αιθανικός ισοπροπυλεστέρας`, common boxes `ισοπροπυλ + μεθυλ + αιθέρας` (existing alphabetical sort puts `ισοπροπυλ` first); systematic `2-μεθοξυπροπάνιο` and symmetric `διαιθυλαιθέρας` unchanged. Names-only change — 3D highlight sets untouched. Headless 69×3 gate: exactly 6 changed lines (2 isopropyl molecules × 3 modes), COMMON boxes verified for all 3 ethers, 3D classification snapshot identical. Browser name-box/highlight check pending.

### Common-ether euphony: connecting ο on consonant+consonant joints

- Bug: the fused common name concatenated alkyl stems raw — `αιθυλμεθυλαιθέρας`, `ισοπροπυλμεθυλαιθέρας` — while the systematic assembler (`_joinEuphony`) has always inserted connecting `ο` on C+C joints (e.g. `αιθαν+νιτρίλιο → αιθανονιτρίλιο`).
- Fix (`js/mulermoc-nom-core-46.js`): hoisted `_gkVowels`/`_isGkConsonant`/`_joinEuphony` to `fGuessName` top (same scope/values, pure move) and routed the asymmetric common fusion (`_pair + αιθέρας`) through it; the symmetric `δι-` path is vowel-led and provably unaffected. COMMON chips stay bare stems (morpheme boxes); only the fused "Κοινή ονομασία" string gains the vowel.
- Now `αιθυλομεθυλαιθέρας`, `ισοπροπυλομεθυλαιθέρας`; `διαιθυλαιθέρας` and every systematic name unchanged. Headless 69×3 gate: exactly 6 changed lines (2 asymmetric ethers × 3 modes, common slot only), COMMON boxes + 3D snapshot identical. Browser check pending.

### Ester highlight override: acid fragment for αιθ-/−αν− clicks (v46-only)

- Bug: on `αιθανικός ισοπροπυλεστέρας`, the `αιθ-` box highlighted the isopropyl group and `-αν-` lit every C–C single bond. Root causes: the main-chain scorer is length-primary, so the 3-C alcohol fragment beat the 2-C acid fragment (`terminalFgCarbons` only orients); and `fHighlightSingleBondsCC/3D` is molecule-wide by design. Older esters masked both (acid fragment happened to be longest / sole C–C bond).
- Fix (`js/mulermoc-nom-molview-46.js`, `mainChainAtomsList` untouched): new `fGetEsterAcidChain[3D]()` + `fIsSingleEster()` guard (sole-FG esters only). `αιθ-` click now reports acid length (`r1-c{acidLen}`), highlights + numbers the acid chain; `-αν-` lights only acid C–C singles via an optional atom-set filter on the existing highlight functions (default stays molecule-wide). Formyl esters correctly light zero C–C bonds.
- Headless-verified derivations (2D + 3D, all 3 modes × 3 esters); naming output byte-identical (core untouched). Browser click-through pending.

### New molecule: dimethyl_2_3_butane (65th, branched alkane)

- New `nameExamples` key `dimethyl_2_3_butane` (2,3-dimethylbutane, `CH3CH(CH3)CH(CH3)CH3`; `mainChain_*`/`mainChain3D` empty → algorithmic chain, no `moveto` yet) in `js/jsme-nick-nomeclature-moc2-data_45.js` (64 → 65 keys).
- New 2D MOLs `dimethyl_2_3_butane_2D_Condensed/_Expanded/_Skeletal` (exact `mols/new_molecules/` file bytes, filenames normalized to v45 case; no SMILES title line — V2000 demands exactly 3 header lines, SMILES later via JSME) + `reg()` line; 3D `mols/nomeclature-moc2/dimethyl_2_3_butane_3D.sdf` (PubChem CID 6589 copy, inbox original kept). Menu grouping automatic via engine.

### Branched-alkane naming: multiple identical substituents (v45-only engine fix)

- Bug: `dimethyl_2_3_butane` named `2-μεθυλοβουτάνιο` — `fGuessName()` (`js/mulermoc-nom-core-45.js`) took only `sideBranches[0]`, dropping the second methyl (highlighting already found both via the v39.1 union path). Single-branch molecules (e.g. `methyl_2_pentane`) were unaffected.
- Fix: group `fGetHydrocarbonSubstituentInfo()` branches by substituent name — comma-joined locants + `δι-/τρι-` count prefix (`nameMultiPrefix`), groups in Greek-alphabetical order (halogen-path convention), fed through the existing `comp0NumberList/TextList` fusion. Now `2,3-διμεθυλοβουτάνιο`; single-branch output byte-identical. Headless-verified (`dimethyl_2_3_butane`, `methyl_2_pentane`, `butane`, `pentane`, `propane`); browser name-box/highlight check pending.

### v45 file set + 2D naming rename (code-only, behavior-identical)

- New parallel file set `mulermoc-nom-45.html` + `js/*-45.js` + `css/*-45.css`, copied from v44 (`index.html` → v45; `*44*` runnable at root, `*42*`/`*43*`/archive untouched).
- Meaningful 2D representation names: MOL variables `<mol>_2D` → `<mol>_2D_Condensed`, `<mol>_2D_E` → `<mol>_2D_Expanded`, `<mol>_diagr2D` → `<mol>_2D_Skeletal`; `MOL2D` registry `{std, exp, diagr}` → `{condensed, expanded, skeletal}`; `nameExamples` fields `structure2D[_E|_D]` → `structure2D_[Condensed|Expanded|Skeletal]`, `mainChain[_E|_diagr]` → `mainChain_[Condensed|Expanded|Skeletal]`; `modeSuffix` values `""`/`"_E"`/`"_diagr2D"` → `"_2D_Condensed"`/`"_2D_Expanded"`/`"_2D_Skeletal"`; new `fMainChainKeySuffix()` helper for chain lookups (molview).
- Misspelled `mode2D` value `diagramatic` → `skeletal` (core/molview/teaching/scenario); `condensedZigZag` kept as-is. Legacy scenario files with `diagramatic` coerce on import (`fScenarioValidate`, warning + in-memory migration, same pattern as the `moveto` quarantine). No schema change (`scenarioVersion` stays 1).
- Static audit: braces balanced 44→45 on all five JS files; zero legacy identifiers outside the intentional coercion lines; two composite-key bugs (`"mainChain_Condensed" + suffix` double-prefix in `fHighLightMainChain`/`fUpdateChainModeButton`) caught and fixed in review. Known nit: scenario exports still stamp `"app": "mulermoc-nom-44"` (informational only — validation ignores it).

### Menu-only validation note silenced (boot/import)

- Valid menu-only steps no longer push the informational `"Step N: menu-only step (no molecule)."` warning, so the default S1 preload boots silently; the genuinely-broken case (no molecule *and* no subset → step skipped) still warns, and the save-time `"Saved menu-only step"` confirmation is unchanged. Owner-verified on reload.

### Shared tooltip skin + scenario-bar coverage + Greek tooltips

- One shared skin (single copy in `css/jsme-nick-45.css`): navy `baseColor` bubble (owner restyle), white `Roboto Condensed` `0.75rem` normal text; arrows follow the skin (eye/author-tab/pick arrows fixed to match). Geometry stays per family: button-panel bubbles above (panel `overflow:hidden` clips below-bubbles when the drawer is shut), save buttons left (`#viewerCol` clipping), `[2D]` left-aligned, edge buttons Save-left-aligned/Delete-right-aligned (panel-side clipping); `position: relative` anchors added (no visual change).
- Scenario buttons converted from native `title` to `data-tooltip`: title row, play bar, panel, step rows (Go=`Προεπισκόπηση`/Update/Duplicate/Up/Down/Delete), note toolbar, type badge, drag handle; `#scNew` unlock path restores (not strips) its hint. Inputs keep native `title` (`::after` cannot render on form controls).
- All tooltip/`aria-label` texts Greek (14 strings; molecule keys stay Latin identifiers; visible button labels out of scope). Owner hover checks pending.

### Default authoring preload (S1 + empty S2)

- Authoring boots with two cards: S1 preloaded from `scenarios/Αλκάνια-Αιθάνιο.scenario.json` (`MuLERMoCScenario.defaultScenarioUrl`, fetched + `fScenarioValidate`d, warnings toasted; the empty boot card is reused as S1 so ids stay stable) and S2 a fresh empty `untitled-scenario` (1 filled + 1 empty keeps `+ New` unlocked under `maxEmptyScenarios = 3`). S1 is the active card. `?scenario=` deep links skip the preload; `file://` fetch failure falls back silently to today's single empty card (Import remains the offline path); bare `?present=1` presents the preloaded S1, else keeps the "needs ?scenario=" toast. No schema change (`scenarioVersion` stays 1).

### Present control bars survive a no-viewer exit (stale `hide` class)

- Bug: exiting from a step with no 3D viewer, then Playing again, lost the `controls3D` bar even when the step's `3D ρυθμίσεις` checkbox was checked (same latent issue for `radio2DMode` after a no-2D exit). Cause: two hiding mechanisms — the viewer toggles / `fScenarioRestoreChrome` add the `hide` class (`display:none !important`) while `fScenarioChrome` (via `fScenarioHide`) cleared only inline `display`, so the stale class survived step entry and `!important` won.
- Fix (`js/mulermoc-nom-scenario-44.js`): new `fScenarioShowBar(id, show)` helper drives both inline display and the `hide` class; `fScenarioChrome` uses it for `radio2DMode` + `controls3D`, so a checked bar is always available in presentation. Authoring callers are all followed by `fScenarioRestoreChrome(viewers)`, which re-applies viewer-based hiding — author-toggled bars stay as left.

### Per-component name visibility (eye toggles)

- Master eye-edit switch in `#nameSettingsPanel` (`#nameStyleEyeToggle`, live-only `window.nameEyeEdit`, never stored; single `eye-state-button` icon + `.active` highlight): reveals a small eye button above each name component (`js/mulermoc-nom-molview-44.js`, `js/mulermoc-nom-teaching-44.js`, `css/jsme-nick-44.css`). Eye artwork from the Industrial-Sharp set (`imgs/eye-*.svg`, inlined as consts with `currentColor` fills; uniform `-9 -244 800 800` viewBox).
- Hidden boxes render a dash on a `lightBlue` fill (`.comp-hidden`), stay inert (no highlight/explanation; stored highlight replay skips them), and masking applies at box-construction time so every rebuild honors it.
- Narration follows visibility (`#readNameBtn`, `fSpeakNameWithPauses`); PNG export shows the dash boxes as displayed (DOM clone, no code change).
- Scenario steps store `styleName.hidden` (comp ids) + `show.nameEye` (per-step drawer checkbox `Ορατότητα συνθετικών`, default off, molecule steps only): checked steps keep live eye toggles in presentation (step data untouched); unchecked steps render dashes with no toggles. `Update` refreshes `hidden` from the live view and preserves `nameEye`; legacy files default to all-visible. Present entry stashes / Exit restores the author's live hidden set + edit mode.
- New-molecule reset: selecting a molecule clears the hidden set (all visible); scenario steps re-assert their stored set after the load. In presentation, per-box eyes follow the master switch while the naming settings gear is shown (master seeded from `show.nameEye` on step entry, so `Ορατότητα συνθετικών` sets the initial on/off and the switch toggles live); without the gear, eyes follow `show.nameEye` directly and the authoring master flag is ignored.
- Exit restores interactivity: `fScenarioApplyNamingChrome` actively clears a leaked `.locked` class + hidden explain line outside presentation (a locked present step no longer leaves boxes dead in authoring).
- Hiding the selected component clears its highlights + rule theory first (deselect mirror) and repaints the 2D SVG (`fUpdateSVG` — applet color reset alone left the stale green + numbering painted); hiding a non-selected box leaves the live selection untouched.
- Narration toggle carries `.active` when on (`#narrateAnalysisToggle`: render-time class in `fShowNameAnalysis`, click-time toggle, control-UI mirror — same convention as `#nameStyleEyeToggle`; styling owner-side).
- Zero visible components hides the explain line (restored on reveal; menu-only present steps keep their hint by design). The non-present chrome hook applies the same verdict so it can't resurrect a hidden line on authoring rebuilds.
- Eye tooltips paint above the naming panel (z-index over the panel buttons). Stacking constraint: nothing on `.compEye` may create a stacking context (no `z-index`, no `opacity`/`filter` — off-state dims via `color`), or tooltips sink behind the panel again.
- Layout contract: fixed-height eye slot above each box (never collapse it), `+`/space separators outside the wrap and bottom-aligned to the fixed-height box. Step drawers render the `Ταξινομήσεις Μένου` set (title + 3 checkboxes) on one nowrap line; `.compEye` buttons are flat white and borderless.
- Step heading number in its own span: `#pageTitle` renders `<span class="scStepNumberTitle">N.</span> Title` (DOM-built, no space inside the span; untitled steps and Exit restore the plain app title). Pill styling in `css/mulermoc-nom-scenario-44.css` (owner-side). NOTE 2026-10-11: the pill append is currently commented out (`fScenarioFillStepPanel`), so headings render title-only; span construction + pill CSS kept for an easy revert.
- Present typography pass: `#scStepText` as a centered card (justified) in `css/mulermoc-nom-scenario-44.css` (card max-width now 980px via `styleText.textWidthPx` default, was 600px); `.compEye` recolored to `lightBlue` (off-state `veryLightBlue`) in `css/jsme-nick-44.css`.
- First stored scenario (SUPERSEDED 2026-10-12, files removed): `scenarios/ethene.scenario.json` (5-step walkthrough; step 5 enables naming settings + interaction + visibility). NOTE: file title is ethene but all steps currently select ethane (content gap, see Known gaps in README). Second stored scenario: `scenarios/ethene-2.scenario.json` (6 steps, all condensed 2D, ethane throughout, ethane-first menu order on the menu steps). Both replaced by `scenarios/Αλκάνια-Αιθάνιο.scenario.json` (7 steps); this entry kept as history.
- Docs-only: future state-machine note (derived `fScenarioGetState()`, `quiz-author`/`quiz-present` reserved; no code change — see `docs/LAYERS-PLAN.md` §7, `docs/didactic-scenario-plan.md` §10).
- Step text toolbar (T1): per-step `B I sup sub`, clean; whole-text size via per-step `Size (px)` input `styleText.fontSizePx` (12–28, empty = 18px) and width via `Width (px)` input `styleText.textWidthPx` (320–1200, empty = 980px card default, was 600px) and 1↔2 column toggle `styleText.columns` (toolbar icon button before clean, default 1; `scCols2` class, `break-inside` lists, ≤700px collapse). Allowlist in `fScenarioRenderNote` extended (attributeless, escape-first unchanged; `<ul>`/`<ol>`/`<small>`/`<big>` still render legacy notes, toolbar no longer inserts them); unbalanced-tag hint. Duplicate step (F1): `⧉` deep-clones after with ` (αντίγραφο)` title suffix; renumber gap-free. No schema change (`scenarioVersion` stays 1).
- Scenario icon buttons: new shared `js/ui-icons.js` (`window.MuLERIcons`, version-independent for future quiz layers); 12 buttons icon-only (Save/add-task-list, Steps/list+count badge, Export/download-list, Play/screen, +New/library-new, Import/upload, Go/play, Update/reset, Duplicate/copy, Up/Down arrows, Delete/close-small) with `title`+`aria-label` kept; bar buttons icon+text. Icon refresh: revised columns1/columns2 geometry + formatClear icon on the toolbar clean button (text `✕` fallback kept). No schema change.
- Step drag reorder (authoring, desktop HTML5 DnD): dedicated `⠿` grip per `.srow` (span, keeps the step-action button index stable); row stays non-draggable otherwise so inputs keep working; drop reuses the splice + `fScenarioRenumber` path; scroll position restored and moved grip focused. Up/Down buttons remain the touch/keyboard fallback. No schema change.
- Drawer toggle: Steps button toggles (`fScenarioToggleDrawer`); clicking the button-bar gaps toggles too (action buttons keep their clicks: Add opens-only, Export/Play inert to the panel). Generic panel-background clicks still open-only.
- Add scrolls to the new step: after Save, the drawer scroller pins to the last `.srow` (rAF + 280ms delayed pass for the `.open` transition; scroll-only, no focus steal).
- Disabled button freeze (`css/mulermoc-nom-scenario-44.css`): all `button:disabled(+:hover)` keep base text (no white-on-hover); Steps/Play disabled stay dark `baseColor` with white text (shared appearance, no hover change); empty-panel Export disabled stays light (`bgColor`, dimmed). Fixes the disabled Play flashing `guiColor`/`bgColor` via `.scPresent.scIconBtn:hover`.
- Exit-viewer alignment: `fScenarioRestoreChrome(viewers)` + exit keeps the exit step's stored viewers (a no-3D exit returns to a no-3D authoring view); one-shot 3D reload (`MuLERMoCScenario.reload3DOnce`) after a no-3D exit zaps the applet — ordinary toggles stay refresh-only.
- Methane on startup (no-3D external-scenario bug patch): `jsmeOnLoad` (`js/mulermoc-nom-molview-44.js`) loads methane on page load again (direct `fSelectMol()`, menu marking best-effort). A cold boot with no molecule ever loaded left the JSmol applet without a valid viewport, so an external scenario with a 2D-only first step (`?scenario=…&present=1`) corrupted all later 3D; one visible startup load primes it. Landing page opens with methane selected.
- CSS dead-color cleanup (`css/jsme-nick-44.css`): removed unused `:root` vars (`cyanNick`, `cyanDarkNick`, `darkBlueNick`, `orangeNick`, `orange2Nick`, `darkGrayNick`, `test`, `highlightColor2`) + dead commented palette; `darkBlue` consolidated into `baseColor` (value-identical); dead `medBlue` ref removed. New `--bodyBg: #faf7f5` page background. Remaining palette: `lightGrayNick/lightBlue/veryLightBlue/darkEarth/lightEarth/baseColor/guiColor/bgColor/bodyBg` (all live).
- Merged scenario header: `#scenarioGlobalBar` retired — `+ New`/`Import` live left in the dark `#scenarioPlayBarTitle` row (title center, `✕` in-flow right; ids preserved so wiring + empty-cap sync untouched). All `#scenarioGlobalBar` CSS deleted; header buttons use the cream/base/earth button language.
- Hint + card transparency: `explainText` hint state (`nameAnalysisMode none`) `background-color:#fff → transparent` (`molview-44.js`); `#scStepText` cream → `#fff` on the warm page; `.compEye`/`.ruleTile` `#fff → transparent`; `#menuToggle` medBlue line deleted.
- Light-blue framing pass (owner styling, `css/jsme-nick-44.css` + `css/mulermoc-nom-scenario-44.css`): `.panelTitle`/scenario title/menu + viewer frames → `lightBlue`; selection hues swapped (row `.selectedLi` → dark `baseColor`, group `.crossMenuLi.selectedLi` → `lightBlue`); all tooltips (+ arrows) → `darkEarth`; settings dropdowns → `veryLightBlue` + bottom rounding; `#viewerCol` full 5px radius + `overflow: hidden` (watch gear/tooltip clipping at the column edge); `.menuLiCounter`/rule tiles follow `baseColor`. Known drift: `.scPresentGroup.open` still carries the old dark fill while its model (`.crossMenuLi.selectedLi`) went light — re-mirror or restyle in the UI pass.
- Title-button border contract (`view2DBtn`/`view3DBtn`/gear `.settingsBtn`): single 2px `veryLightBlue` rim (was 1px earth); active keeps the light rim on navy; `:focus-visible` white ring + offset (no more UA-outline doubling). `#scPickToggle` aligned to the same tokens (cream check, navy on-box, white focus, earth tooltip) but stays borderless — a chip border nested a second rectangle around the check box (fixed the same day).
- Exit settings-panel restore: `fScenarioRestoreChrome` id-list gains `viewerSettingsPanel` + `nameSettingsPanel` — the viewer gear dropdown previously stayed `display:none` after Exit (present hides it inline; static HTML never rebuilds it).
- Go/Jump pick alignment (authoring, `fScenarioGoAlignPick`): after a successful preview the live pick mirrors the step — subset-carrying steps (menu-only or molecule+menu) restore picks with pick mode on; menu-less molecule steps clear silently (bypasses the toggle's clear-toast). Go → tweak → Update round-trips now keep the menu (previously lost it: capture reads live picks). Present navigation (Prev/Next/Play/deep links) never touches picks. Unknown subset keys filtered with a toast.
- Row Go activates its card first (`fScenarioSetActive(scenId)`): Go previously applied the active card's step even from another card's row, while Update/Dupe/Up/Down/Delete all honor the row card.
- Go viewer-chrome alignment (authoring): `fScenarioGo` reuses `fScenarioRestoreChrome(step.show.viewers)` after apply — `fScenarioChrome` hides nothing while `!present`, so panes + `[2D][3D]` actives + control bars kept the live states (e.g. 3D up on a 2D-only step). Exit already had this; Go was missing it. Present path skips it (chrome owns that).

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

