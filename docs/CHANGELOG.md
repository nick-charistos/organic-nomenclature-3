# Changelog

All notable changes to the Οργανική Ονοματολογία MuLERMoC.

---

## [v43] — 2026-10-02

**Didactic scenarios scaffold — last suffixed copy**

- New parallel file set `mulermoc-nom-43.html` + `js/*-43.js` + `css/jsme-nick-43.css`, copied verbatim from v42 (only path renames + one script include). `core/molview/teaching/data/css-43` are byte-identical to v42, so `43-no-params == 42`.
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

