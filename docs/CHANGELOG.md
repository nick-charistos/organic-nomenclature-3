# Changelog

All notable changes to the Οργανική Ονοματολογία MuLERMoC.

---

## [Unreleased] (v48 working copy — fluid viewers + authoring pin-dock; off-live, `index.html` stays on v47)

New parallel file set `mulermoc-nom-48.html` + `js/*-48.js` + `css/*-48.css`, copied byte-identically from v47 (only the 7 asset refs in the html differ). `index.html` deliberately stays on v47 until v48 is browser-verified; `*47*`/`*46*` runnable at root, untouched. All work below is `*48*`-only (plus the shared `js/ui-icons.js` `pin` key). Pre-fork owner tweak carried over: `body`/`html` `overflow-x` handling in the v47 stylesheet.

### Authoring pin-dock (scenario bar beside the app)

- **Pin-dock (current design)** (`scenario-48.js` + `mulermoc-nom-scenario-48.css` + `mulermoc-nom-48.html` + shared `js/ui-icons.js`): pin button (`#scPin`, registry `MuLERIcons.pin` from `imgs/pin-svgrepo-com.svg`, emoji fallback) in the scenario title row; pinned, `fScenarioSetPinned()` reparents the bar into `#pageContainer` (absolute, `top/bottom/right: 0`, so it always equals the page container's height from title zone to footer and can never drive layout height). Structure: `#pageTitle` above, `#authorLayout` (thin `relative` wrapper, renamed `#panelContainer` → `#mainAppContainer` holding exactly the three app columns), `#creditsUs` footer; pinned, `#pageContainer` is a centered `1600px + 540px` unit (`min-height`, not fixed height), `#pageTitle` and `#creditsUs` (also `width: auto`) yield the 540px band via right margin, and `#mainAppContainer` is the horizontal scroller. The viewer is frozen from a **pre-dock** width read (measuring after the class toggle locked stretched wide-screen pixels — order matters); the row's inline centered justification is forced left while pinned; edge tab hidden, pin button lit; bar look: 10px navy border, no shadow, square corners. Live-only `MuLERMoCScenario.pinned` flag (never in step JSON); authoring-off (✕/ESC) and Present entry force-unpin (Exit returns to the overlay bar).
- **Pinned viewer width knob** (CSS only): `--viewerPinnedWidth` (`:root` in `jsme-nick-48.css`, default `400px`) consumed as a `max-width` ceiling over the inline measured lock — wide viewers shrink to the tuned value, narrow ones never forced wider; `min-width: 290px` / `max-width: 620px` bounds hold; the fluid pipeline follows with no JS change. Retune: one `:root` line + hard refresh.
- **Pinned drawer fill** (CSS only): the accordion-open card becomes a flex column claiming leftover bar height (`:has()`, no JS) and the open drawer scrolls internally; grow animation is instant-tall + fade when pinned, slide-down kept unpinned.
- **Pinned scroll cues** (`48.html` + `scenario-48.js/css`): the container's native bottom scrollbar sits below the fold (a native top bar is impossible; `direction`/`rotate` hacks rejected — they threaten Snap coordinate mapping), so edge `‹ ›` buttons (viewport-anchored `top: 40vh`, shown only when pinned AND overflowing, end-disabled, 0.8-viewport smooth steps, reduced-motion aware, registry chevrons with text fallback), a clipped-edge fade veil, a branded scrollbar thumb, and a managed `tabindex` carry discoverability; `fScenarioSyncScroller()` owns the states (pin toggles, passive scroll, container observer, post-pin re-check).

### Fluid viewers — responsive foundation (`molview-48.js` + `jsme-nick-48.css`)

- **Fluid 2D**: revived `fResizeViewers` fits both JSME applets to the viewer column width via native `setSize` (re-depict; coordinates correct by construction — no zoom-factor machinery; upstream JSME sanctions resize/autoresize patterns), then `fReapplyZoomScale2D()` re-fits the depiction (`setSize` alone left a small stale molecule until any zoom press; also fixed the small methane on load) and rebuilds the Snap overlay + replays numbering. Highlights survive. Debounced `ResizeObserver` on `#viewerCol` (~150ms; width **and** height; replaces the retired window listener); one initial fit at `jsmeOnLoad`; constructor stays `590×240`; zoom (`molZoom2D`, stored per step) composes on top untouched. `#viewerCol` bounds: `max-width: 620px` (the old `width: 620px` was dead code under `flex-basis: 0`), `min-width: 290px`.
- **Container-derived heights**: `fViewerHeights2D3D()` (viewport minus page chrome and measured column chrome, visible viewers split equally, CSS-minimum floors 244/120, phone-landscape cap as ceiling, sibling-column dead-space top-up — never the viewers' own heights, avoiding circularity) replaces the width-ratio formulas; 3D asserts the same height on `Jmol.resizeApplet` and `#jmolAppletNomeclature_appletinfotablediv`; container divs never take explicit heights. Visibility is read off the actually-toggled units (the nested `#jsmeNomeclatureSVG` lives *inside* `#jsmeNomeclatureDIV`, invisible to a `viewerCol.children` loop — found via the debug line).
- **Diagnostics + robustness**: `window.MuLERmoCDebugResize` flag → one `[resize]` console line per run (helper values, fallback usage, applied sizes, visibility; window vars don't survive reload — set it, then trigger a resize); 3D resize re-sent once via the `jmol_isReady` handshake (the initial fit can land before the applet is live); 3D path guarded (`typeof Jmol` + try/catch).

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

