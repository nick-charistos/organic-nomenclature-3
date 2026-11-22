# MolWave — Organic Nomenclature Learning Platform

> **Name:** **MolWave** is the product brand; **MuLERMoCs** (*Multiple-Level External Representations for Molecular Concepts*) is retained as the research-framework codename for methods continuity. (`Namelecule` is a separate variant by Yiannis, not the product name.)

A Greek-first interactive learning platform for organic nomenclature, built around molecular structure, naming logic, and multiple representations. It is a no-build static web app (JSME, JSmol, jQuery, vanilla JavaScript; live v59 adds a normalized 2D dataset (147 molecules, one 1.17/0.78 frame, valence-complete expanded forms) over the v58 scenario quiz steps — student mode, multi-component completion, deferred menu quizzes — over the v57 3D atom/bond picking, the v55 tiered draft 3D, the v54 molecule edit/create drafts, the v53 full English UI + molecule-naming layer and the Snap-free v52 base, Greek default preserved) intended to be embedded in Drupal.

Designed and developed by Nickolas Charistos

**Product lockup:** `MolWave • Organic Nomenclature` (header and credits footer); the browser tab title is localized to Greek or English.

**Current baseline:** v59 is live (`index.html` → v59) — **147 molecules** plus author-created customs, full English version (`?lang=en`, Greek default; per-step scenario language, molecule-carrying switch) over the v52 base: unified rich note editor (inline WYSIWYG, modal WYSIWYG + HTML source, lazy legacy-text upgrade, staged Apply/Cancel); safe rich HTML notes (DOMPurify), rule-table components, compact icon toolbar, Snap-free native `MuSVG` 2D overlay. New in v58: scenario quiz steps (`step.quiz {kind, mode, modes, modeLabels, mol, preSolved}` + `requireSolution`) — Present arms only the author-selected `startMode`, otherwise waits for the student to choose a component; each step stores its required name components and completes when they are all solved, author pre-solved components behave classically (`.freeComp`), menu steps defer the quiz to every picked molecule with switchable component types, and editing a step never drops the task (master checkbox + binary component tags in the drawer, no Remove button). New in v57: 3D atom/bond picking via JSmol `pickCallback`; v56 added 2D atom/bond selection. New in v55: tiered draft 3D (PubChem → JSmol remote → local UFF minimize) with Accept on any tier. New in v54: molecule Edit/New drafts with engine + PubChem preview (GR + predicted EN), per-name correctness verdicts, Accept into custom molecules with generated 2D variants and per-molecule save. The main JSME applet stays in depict mode (2D highlight pipeline); drafts live in a dedicated edit applet. The default preloaded scenario is `Αλκάνια-Αιθάνιο-τεστ`. See [docs/CHANGELOG.md](docs/CHANGELOG.md) [v52].
**Authoring line:** v59 is the live authoring line — see [docs/CHANGELOG.md](docs/CHANGELOG.md) (`[v59]`), [docs/learning-activities-Plan.md](docs/learning-activities-Plan.md) and [docs/archive/plans/STAGE2-AUTHORING-54.md](docs/archive/plans/STAGE2-AUTHORING-54.md). Open: 2B author correction, exercise types.
**Previous version:** v57 remains runnable at root (`mulermoc-nom-57.html`), along with v56…v42.
**Entry point:** [index.html](index.html) → [mulermoc-nom-59.html](mulermoc-nom-59.html) (live); `mulermoc-nom-57.html` and earlier versions `mulermoc-nom-56.html`…`-42.html` runnable alongside

## English version (v53 shipped; carried through v59 — Greek default preserved)

- Preview: `mulermoc-nom-59.html?lang=en` (Greek without the flag). Single codebase, per-key EN fallback.
- Chrome: `js/mulermoc-nom-lang-59.js` (the `?lang=` table, every Greek value source-verified + value-based `data-tooltip`/`aria-label`/`title`/`placeholder` translation with debounced MutationObserver, dynamic-prefix rules, present-panel/step-title/badge/tab/size-option/2D-3D-bar text nodes, EN TTS `fSpeakMuler`/`fWireENTTS`, two-button header switch carrying the selected molecule (`?mol=`); verified headless at the v53 baseline: zero chrome remainder, GR mode no-leak). EN renders directly at build time (no Greek-first flip; verified observer-neutered); GR default byte-identical.
- Didactic EN: `nameAnalysisExplain` all 17 modes + rule panel (titles/texts/tables via 91-pair `RULE_GR2EN`) + 9 theory texts + alkyl/alkoxy systematic tables + EN rule narration; v53 validation 141×17+9 with 0 Greek in EN, GR throw-parity and zero EN leakage — see `docs/archive/reviews/REVIEW-EN-53.md` §G.
- Chemistry: `js/mulermoc-nom-name-en-59.js` (straight-chain + branched `fAssembleBranchedEN`, ether `fEtherSystematicEN`, ester `fEsterSystematicEN`, slot transliteration `fPopulateEngineENFromGreek` hooked in `fSelectMol`); oracle `js/mulermoc-nom-iupac-59.js` (PubChem `IUPACName` verbatim + `RETAINED_TO_SYSTEMATIC_EN` map + synonyms, `needsHumanCheck` on retained≠systematic; e.g. `formic→methanoic`, `methyl acetate→methyl ethanoate`).
- Validation (v53 baseline): in-browser full run 119/141 automated agreement (103 systematic + 14 retained-name + 2 PubChem-Title matches via `fValidateENAgainstOracle`; stereo prefixes stripped); offline pure-function run 107/141 on the same oracle snapshot. Remainder is an explicit human queue — see [docs/archive/reviews/REVIEW-EN-53.md](docs/archive/reviews/REVIEW-EN-53.md) (retained names, PIN locant omissions, oxo locants, common-vs-systematic substituents, 15 novel molecules without public record + engineEN proposals). No v59 EN oracle re-run is recorded yet; the v53 harness pages no longer exist.
- Scenarios stay author-language; new EN scenarios to be authored by teachers/MSc students. Each step stores its creation language and renders in it (mixed-language scenarios supported); the header toggle keeps the selected molecule (`?mol=`). Short guide: [docs/TEACHER-GUIDE-EN.md](docs/TEACHER-GUIDE-EN.md).

| Layer | File |
|---|---|
| Core engine (analysis + naming) | [js/mulermoc-nom-core-59.js](js/mulermoc-nom-core-59.js) |
| Viewer (JSME / JSmol / native SVG) | [js/mulermoc-nom-molview-59.js](js/mulermoc-nom-molview-59.js) |
| Teaching (rules, narration, UI wiring) | [js/mulermoc-nom-teaching-59.js](js/mulermoc-nom-teaching-59.js) |
| Scenario module (LEARN authoring + presentation) | [js/mulermoc-nom-scenario-59.js](js/mulermoc-nom-scenario-59.js) |
| EN chrome + naming + oracle | [js/mulermoc-nom-lang-59.js](js/mulermoc-nom-lang-59.js), [js/mulermoc-nom-name-en-59.js](js/mulermoc-nom-name-en-59.js), [js/mulermoc-nom-iupac-59.js](js/mulermoc-nom-iupac-59.js) |
| Shared icon helper | [js/ui-icons.js](js/ui-icons.js) |
| Molecule data (147 molecules — 147 `nameExamples` keys) | [js/jsme-nick-nomeclature-moc2-data_59.js](js/jsme-nick-nomeclature-moc2-data_59.js) |
| Styles | [css/jsme-nick-59.css](css/jsme-nick-59.css), [css/mulermoc-nom-scenario-59.css](css/mulermoc-nom-scenario-59.css) |
| Stored scenarios | [scenarios/](scenarios/) (`Αλκάνια-Αιθάνιο-τεστ` default, `Αλκάνια-Αιθάνιο` legacy retained, `Αλκένια-Αιθένιο`, `Αλκένια-Ονοματολογία_και_διακλαδώσεις`; Greek filenames stay URL-encoded in `?scenario=` links) |

---

## Repositories and versions

| Site | Serves | Status |
|---|---|---|
| [organic-nomenclature-2](https://nick-charistos.github.io/organic-nomenclature-2/) | v42 | frozen — emergency hotfixes only |
| [organic-nomenclature-3](https://nick-charistos.github.io/organic-nomenclature-3/) | v59 live | active — all new work happens here |

Root holds the files of the current live set (`*58*`; `mulermoc-nom-57.html` back through `mulermoc-nom-42.html` are kept runnable alongside). Older file sets live in [archive/](archive/README.md) (non-runnable museum). Runnable history via git tags `v41`–`v44`.

Not tracked on GitHub (not needed to run): RDKit experiments, most of `imgs/` (only `image-svgrepo-Industrial-Sharp.svg` is kept; other icons are inlined/served by `js/ui-icons.js`), PDFs, `mols/branched/`, and the large JSmol runtime. Small security- or compatibility-critical libraries are vendored under `js/vendor/`; the rest are served via CDN (see [.gitignore](.gitignore)).

---

## What works now (v59 live — scenario quiz steps over v57 3D picking, v55 tiered draft 3D, v54 draft flow, v53 English layer and the v52 base, 147 molecules, Snap-free viewer)

### Chemistry engine
- Greek IUPAC naming for alkanes/alkenes/alkynes, branched chains, halides, alcohols, aldehydes/ketones, carboxylic acids (incl. hydroxy/amino/oxo/keto), nitriles, amines, ethers (systematic + common names), esters (two-word names).
- Main-chain selection ranks candidates by multiple bonds first (`C=C/C≡C`, then `C=C`, then length) while retaining top-priority FG-anchor coverage; for saturated acyclic hydrocarbons, tied parents then rank by most carbon branches, then lowest branch locants (v49).
- v44 hardening (carried into v45): bond-order N-table (tertiary R3N fixed), principal-functional-group rank, halogen N-way handling.
- v45 2D naming rename (code-only, behavior-identical): MOL variables `<mol>_2D_Condensed/_2D_Expanded/_2D_Skeletal`, `mode2D` value `skeletal` (was misspelled `diagramatic`; legacy scenario files coerce on import), stored chain keys `mainChain_Condensed/_Expanded/_Skeletal`.
- v46 fork (mechanical copy of the v45 set, behavior-identical): 4 new molecules (2 ethers + 2 esters, 65 → 69 keys) + formate-ester engine fix (`methyl_methanoate` was mis-named as alkoxy-aldehyde); `*45*` stays runnable at root.
- Name analysis: per-fragment highlight and numbering in 2D and 3D, per-alkyl-group branch highlighting (incl. expanded hydrogens), rule-theory panel; long names auto-fit the analysis column (`--nameCompScale`, floor + horizontal-scroll fallback). **v59.10:** the 2D/3D control rows use native form controls and the menu grouping uses native radios; **v59.09:** portrait authoring is an in-flow accordion above the footer (collapsed title by default); the dev notice appears only in New/Edit drafts; **v59.08:** the portrait menu header centers its pick checkbox and hamburger and hides the Menu text; **v59.07:** the mobile authoring handle is icon-only (56px) and the pinned panel fits the viewport; **v59.06:** opening a collapsed authoring step previews it (same path as Go); the condensed/expanded bond hover stops at the label boxes; the authoring handle uses the presentation-line icon. **v59.05:** the 2D/3D user-selection highlight uses the orchid quiz accent (2D fill `--orchidLight`, 3D fill `--orchidDefault`, hover ring/bond and numbers `--orchidDark`, white 2D number outline) instead of cyan.

### Viewer and UI
- 2D (JSME) and 3D (JSmol) views; condensed, expanded, skeletal and annotated-skeletal modes; `[2D][3D]` visibility toggles; PNG export.
- **Fluid viewers (v48):** both viewers fit the viewer column via native `setSize` (container-derived heights, debounced `ResizeObserver`); a **single max-height** control and a **combined 2D+3D height** control for the two-viewer case (Full | specific px) live in Ρυθμίσεις and are stored per scenario step. **v58.43:** the redundant Auto/Manual checkboxes are gone — each row is label + `Full` button + slider + px readout. The slider is inactive while Full is selected and active for a specific height; the px readout is hidden while Full is active and appears only for a specific height. Full shows the effective responsive height; the enabled slider stores its specific height. Heights never exceed viewer width (ratio ≥ 1) and run off a scroll-stable viewport on mobile; collapsing the menu rail shares its width viewer/naming. **v58.22:** full heights clamp to the measured viewer-column top, so both viewers + both settings bars fit authoring and Present layouts.
- **Authoring pin-dock (v48; v58.23–25, v58.40):** the scenario bar docks beside the app (scoped horizontal scroll with edge cues); the pinned viewer width is adaptive (`clamp`, keeps its original width when the screen has room, eases to a 400px floor); viewer-column UI text scales fluidly via a container query. The pinned bar is capped above the credits footer (footer-limited: 10px border merge; viewport-limited: 8px gap). **v58.40:** pinned authoring reserves a viewport-tall `#authorLayout`, so the footer starts at/below the viewport bottom regardless of the scenario drawer state; the app keeps its natural height, the extra area is white space, and the footer is reached by scrolling.
- **Presentation text rails + naming shell (v50, retained in v52 live):** each step can place its note **Πάνω** (default), **Αριστερά**, or **Δεξιά**; side modes render as a sticky, internally scrolling 300–420px fourth-column reading rail beside the app on screens ≥1200px, with automatic top fallback below that. Rails always use one column; the stored width/columns return when the step is placed back on top. The naming panel also keeps its title/gear shell available (with a no-molecule placeholder), while presentation `Name controls` still hides gear/panel/voice when unchecked.
- **Ρυθμίσεις pass (v48):** the 2D/3D detail toggles (`Έγχρωμα Σύμβολα`, `Σύμβολα ατόμων`) are consolidated into the gear panel; the `Από δεδομένα` main-chain bullet is disabled when the molecule has no stored chain data.
- Menu groups: homologous series (default sort by carbon count), chemical classes, rules, flat `Όλα τα μόρια`; the menu column collapses to an icon rail (state persisted, never stored in steps).
- Name panel: IUPAC/COMMON toggle, per-component visibility with a three-state eye (shown → veiled dash → removed; 14px state icons, removed comps drop from narration/overview/quiz todo), per-component click explanations plus an Explain-all overview table (one row per visible component; rows follow the eye state), Greek + English TTS narration (name, component explanations, rules) that follows visibility. Eyes are a teacher/presentation aid — they remain usable on quiz steps (owner decision 2026-11-19; hiding a required comp removes it from the todo set).
- **Molecule draft collaboration (v58.19–20):** the draft preview collects Submitted by / Proposed name / Comments, stores them on the accepted custom record and in the generated `MULERMOC_*_data.js` header/JSON; oracle rows split into source/name spans (`.draftOCSource` / `.draftOCName`).
- Tooltips share one navy skin (single copy in `css/jsme-nick-58.css`); scenario-bar/panel/step/toolbar buttons, type badge and drag handle converted from native `title`; all-Greek tooltip texts; geometry variants (button-panel bubbles above, save buttons left, `[2D]` left-aligned, edge buttons Save-left-aligned/Delete-right-aligned) for `overflow:hidden` parents. **v58.41:** a single fixed `#mulerTipLayer` (`js/mulermoc-nom-tooltip-58.js`) renders every `[data-tooltip]`, flips above/below, clamps to the viewport and cannot be clipped by the drawer/panel/bar overflow; the old pseudo bubbles remain as the no-JS fallback.

### LEARN layer: didactic scenarios
- Authoring behind the `Σενάρια` handle: up to 3 scenarios, steps per scenario with per-step molecule/menu/chrome settings, rich step text (`B I sup sub`, lists, per-block font size/alignment, columns; v50 adds top/left/right placement + the persistent naming shell), icon buttons, drag-reorder, step drawer (state survives close and Present → Exit), per-step Present (`▶` starts at that step; card Play always at step 1), Import/Export JSON. **v58 row layout:** each step row has a grid head (drag grip top-left, collapse/delete top-right, number/badges rail over a full-width title + icon-action row) above a text block (note toolbar + editor) and a settings block (each row starts with a bold inline section title — Viewers → Naming → Menu → Quiz — and carries a dotted separator, stable `data-sc-row`/`data-sc-role` hooks and no trailing rule on the last row). **Quiz editor:** one master checkbox owns quiz existence; name tags are binary (selected = required, unselected/solved = pre-solved), the component list starts collapsed. Any step carrying a menu is a menu quiz — even with a selected molecule — and uses switchable component-type chips (unselected types are free per picked molecule); real name tags appear only on menu-less molecule steps. Each step’s quiz progress is independent; the chain rule locks locants/bond positions/group locants while the main chain is required. **v58.44:** the quiz row adds a **Start component** select (None by default; options = required comps) and marks the chosen tag. Present no longer auto-arms: it arms only that author-chosen component, otherwise it shows the start prompt (`.scQuizStartPrompt`) and waits for the student to pick one; the gate holds until the required set is solved. Select mode alone no longer creates a quiz — the master checkbox or an armed/solved capture does. A menu step updated without picks is pinned back to its molecule, and the drawer chooses name tags vs type chips from the step shape (not the stored marker), so stale type chips cannot appear. **v58.46:** quiz tags store the real name-component fragments (eth/an/ol), not generic type names; non-live steps use the per-molecule label cache and self-heal after one Go/render. **Add step** opens the new row and scrolls it into view only when necessary.
- `Go` previews align picks + viewer chrome to the step, so Go → tweak → `Update` round-trips keep the menu; Exit restores the full app chrome (viewers/bars per the exit step).
- Presentation mode (`#pageContainer.presenting`) walks the steps; the header (navigation + Exit) stays visible, the credits footer is hidden while presenting and returns on Exit, and the 3D rotate button follows the step's `view3D.spin` state (v58.21, toolbar button since v58.50).
- Details: [docs/didactic-scenario-plan.md](docs/didactic-scenario-plan.md).
- **v52 unified rich note editor (live):** the inline drawer is a compact WYSIWYG editor with live writes, and the expanded modal has one WYSIWYG editor plus a **WYSIWYG / HTML** source toggle (no Simple/Rich modes). `B I U sup sub` map to the live DOM selection, paste is sanitized, and modal changes are staged behind Apply/Cancel with a dirty-close confirm. New notes default to HTML; legacy text notes render safely and upgrade on first edit. Rule-table includes round-trip as placeholders, rendered embeds are non-editable, and Apply fails closed without DOMPurify. The v51 safe rich-note renderer, six rule-table components (including alkoxy), compact inline toolbar, and icon-only step actions are retained. The 2026-10-26 refinement adds UL/OL lists, a per-block font-size dropdown, left/center/right alignment, an image sizing dialog (alt required; optional width/height), a presentation top card that spans the visible app columns (capped at 1600px), and a side rail that stretches to the app row with internal scrolling. The URL image tool is removed; `styleText.textWidthPx` is parsed but no longer applied. UL/OL stay in the inline toolbar; image, table, and predefined-content inserts are modal-only.
- **v51 data (retained):** 98 `nameExamples` keys; added 18 molecules (9 alcohols, 6 dienes, 3 enynes), 54 embedded 2D forms and 18 runtime 3D SDFs. Alcohol-aware chain ranking and fragment-aware isopropyl/propyl branch naming are included, but branch prefixes remain limited to pure acyclic hydrocarbons and acyclic alcohols; other homologous series still need the generic branch/FG-profile refactor.
- **v52 data:** 98 → 136 `nameExamples` keys, plus 5 thesis-work esters → **141**; added 9 ketones/diones/ynones, 12 aldehydes/dials, 7 monoethers, 10 carboxylic acids (4 saturated mono, 4 unsaturated mono/di, 2 enynoic) and 5 saturated acyclic monoesters, each with three embedded 2D forms and a runtime 3D SDF. Core adds acyclic aldehyde/ketone/monoether/acid/ester graph guards and ketone-locant preservation; viewer adds methanal `HCHO` handling, sequential ketone/acid numbering and the ester acid-parent chain; teaching adds the alkoxy reference table alongside the existing alkyl table.

### Known gaps
- Unsaturated ethers/esters and wider ester coverage; rings and aromatics not supported.
- v48: browser click-through pending for the confirm dialog, both height controls, pin/unpin, the per-alkyl-group highlight, and long-name auto-fit (`docs/SESSION-NOTES.md`); scenario exports still stamp `"app": "mulermoc-nom-44"` (informational only — validation ignores it).
- v49: browser click-through pending for the acyclic-alkane parent-chain fix (new + existing alkanes), the explicit terminal-`1` locant change (`3-μεθυλο-1-βουτένιο`), the 73rd molecule + 3D SDF, the imported scenarios, the alkyl table on branch/locant components, and the enyne `-ιν-` rule tile.
- v49: carbon-branch orientation compares locant sets only; alphabetical priority for carbon substituents (as already done for halogen/nitro) is not yet applied, so a future mixed ethyl/methyl alkane with tied locant sets could orient arbitrarily (not exercised by the current 147 molecules).
- v50: browser click-through pending for the side text rails (left/right, wide/narrow fallback, menu steps, long notes, top↔side switching, 2D/3D refit), the no-molecule naming placeholder, and presentation naming-chrome behavior, plus the v49 items above. Also pending: the 7 alkynes added post-live (73 → 80 keys) and the skeletal `C`-label removal for any sp carbon — alkynes, enynes, yne-ketone/aldehyde, nitriles, allene (2D only; 3D framing deferred).
- v52: the unified rich note editor (inline WYSIWYG, modal WYSIWYG + HTML source, lazy legacy-text upgrade), WYSIWYG selection mapping, staged Apply/Cancel, dirty-close confirm, and modal-only image/table/predefined inserts (UL/OL inline) are live. Headless Chrome smoke tests passed; Firefox, touch devices, and real-scenario click-through remain pending. The v51 safe rich-note renderer, rule-table components, the 141-molecule data set, and the native `MuSVG` Snap replacement remain live. The `MuSVG.parse()` OOM/XML crash is fixed; Chrome and Firefox automated matrices pass, with the two pre-existing skeletal JSmol failures (`butadiene_1_3`, `propadiene`) still open. The earlier jsdom suite (95 sanitizer + 38 scenario-integration checks) predates later changes and needs updating before reuse. Remaining manual coverage: rich-note editing in real scenarios (including the new lists, per-block size/alignment, image dialog, top-card column alignment, and side-rail behavior), 3D views and highlights for the 18 v51 + 38 v52 additions, the icon dropdown/skip icons, 2D/3D refit, the JSmol local/CDN loader, and jQuery 4; extending branch prefixes to amines/halides/mixed functional groups remains open.
- Stored scenarios: `Αλκάνια-Αιθάνιο-τεστ.scenario.json` is the default (7 steps: ethane walkthrough + alkane menu browsing + 3D alkane models; steps 5–7 place the note in a left rail with longer text), while the previous `Αλκάνια-Αιθάνιο.scenario.json` is retained on disk for explicit `?scenario=` links but is no longer preloaded; plus the imported `Αλκένια-Αιθένιο` (7) and `Αλκένια-Ονοματολογία_και_διακλαδώσεις` (22); wider scenario library and EPAL/Lyceum two-level notes still to be written.

---

## Four layers (LEARN-first)

All layers reuse the same v58 engine (v57/v54/v52/v51 are previous runnable copies), embedded as a static app in Drupal:

| # | Layer | Contract | State |
|---|---|---|---|
| 1 | **LEARN** | teacher-authored linear scenarios; presentation + self-paced learning | working scaffold (authoring + presentation); stored scenarios `Αλκάνια-Αιθάνιο-τεστ` (default), `Αλκάνια-Αιθάνιο` (legacy), `Αλκένια-Αιθένιο`, `Αλκένια-Ονοματολογία_και_διακλαδώσεις` |
| 2 | **EXPLORE** | free browsing of all molecules (left menu) | working (147 molecules); next: bounded EXPLORE-lite (~15 mols) + menu search |
| 3 | **PRACTICE** | exercises with corrective feedback (3 types v1) | not started — see [LAYERS-PLAN](docs/LAYERS-PLAN.md) |
| 4 | **PLAY** | gamified quizzes; responses + times logged for research statistics | not started — Drupal owns auth/session/logging; see [LAYERS-PLAN](docs/LAYERS-PLAN.md) |

Out of scope for now: quiz SPA, participant logging, CSV export, server-side classroom management, rings/aromatics, reactions, isomerism (reserved in schemas).

---

## Vision (twofold+1)

1. **A useful tool for chemistry learning** with real impact (teachers + students, Greek-first organic nomenclature).
2. **Ongoing research** about and from this project (learning + motivation effects, EPAL vs Lyceum, publications).
3. **Conditions for new developments** — technology and knowledge reusable for isomerism, reactions, and beyond.

### Architecture
- **Embedded static:** the chemistry app stays dependency-free static (no build); Drupal embeds it and owns scenarios, exercises/quizzes, users/sessions, logging, and exports.
- **Stats primary for research:** response + time logs designed for publication (pseudonymous participants, condition/layer flags; no PII in the static app).
- **Extensible:** scenario `menuSubset`, exercise `itemType`, log `domain` fields reserve `nomenclature | isomerism | reactions`.

### Team

| Who | Role |
|---|---|
| P1 — supervisor (computational chemistry) | app code (hand-written + AI-assisted), engine ownership |
| P2 — Drupal / educational research / statistics / eye-tracking | Drupal embedding, logging API, dashboards/CSV, research design |
| P3 — MSc student, chemistry teacher | scenarios, questions, exercises, quizzes; small-class pilots (with P4) |
| P4 — undergrad chemistry | `.mol`/`.sdf` molecule production (with P3) |
| P5 — MSc student, chemistry teacher | school research: learning + motivation, EPAL vs Lyceum |
| P6 — MSc graduate, chemistry teacher | co-supervision, project memory, educational research |

---

## Documents

- [docs/README.md](docs/README.md) — documentation index (current vs archive)
- [CHANGELOG.md](docs/CHANGELOG.md) — authoritative history (v59 live); [SESSION-NOTES.md](docs/SESSION-NOTES.md) — resume pointer and recent working notes
- [didactic-scenario-plan.md](docs/didactic-scenario-plan.md) — scenario schema and authoring flow; [learning-activities-Plan.md](docs/learning-activities-Plan.md) — scenario quiz contract + activity families
- [LAYERS-PLAN.md](docs/LAYERS-PLAN.md) — layer contracts, exercise types, research logging schema
- [REVIEW-V58.md](docs/REVIEW-V58.md), [REVIEW-SCENARIO-QUIZ-58.md](docs/REVIEW-SCENARIO-QUIZ-58.md) — accepted quiz/scenario decisions
- [PROJECT-PLAN.md](docs/PROJECT-PLAN.md), [PROJECT-PLAN-GR.md](docs/PROJECT-PLAN-GR.md), [RESEARCH-PLAN.md](docs/RESEARCH-PLAN.md) — product/research plans
- [NAMING-FLOWCHART.md](docs/NAMING-FLOWCHART.md), [NAMING-FLOWCHART-DETAILED.md](docs/NAMING-FLOWCHART-DETAILED.md) — naming algorithm walkthroughs; [CHEM-LIBRARIES.md](docs/CHEM-LIBRARIES.md) — library survey; [TEACHER-GUIDE-EN.md](docs/TEACHER-GUIDE-EN.md) — English teacher guide
- [docs/archive/](docs/archive/README.md) — superseded plans, handoffs, reviews and thesis/import records (historical only)

---

## Status summary

- Baseline: **v59 live** (`index.html` → v59; scenario quiz steps — student mode, all-quizTodo completion, deferred menu quizzes — over v57 3D atom/bond picking, v55 tiered draft 3D, v54 molecule Edit/New drafts, the v53 full English `?lang=en` layer and the v52 base, 147 molecules, Snap-free native `MuSVG`; default scenario `Αλκάνια-Αιθάνιο-τεστ`); v57/v56/v54/v53/v52/v51/v50/v49/v48/v47/v46/v45/v44 runnable at root, v43 frozen at tag `v43`, v42 frozen in repo2
- Previous live: **v57** (`mulermoc-nom-57.html`; 3D atom/bond picking via JSmol `pickCallback`, quiz progress tints, reps lock)
- Focus: **LEARN pilot (stored scenarios) + bounded EXPLORE-lite**
- Near-term: **finish v52 manual coverage (rich note editor in real scenarios, Firefox/touch, 3D + highlights for the 18 v51 molecules, icon toolbar, 2D/3D refit, JSmol loader, jQuery 4); fix the two pre-existing skeletal JSmol failures; then generic branch prefixes beyond hydrocarbon/acyclic alcohol; v51/v50/v49 backlog verification; scenario library verification; bounded EXPLORE-lite (~15 mols + menu search)**
- Rules: secondary explanatory layer; homologous series = database order
- Research layer: active design (schema v1 in LAYERS-PLAN)
