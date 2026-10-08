# MuLERMoCs — Organic Nomenclature Learning Platform

A Greek-first interactive learning platform for organic nomenclature, built around molecular structure, naming logic, and multiple representations.

**Current working baseline:** v44 (released 2026-10-07; v43 frozen at tag `v43`)
**Main entry point:** [mulermoc-nom-44.html](mulermoc-nom-44.html)
**Core engine:** [js/mulermoc-nom-core-44.js](js/mulermoc-nom-core-44.js)
**Viewer layer:** [js/mulermoc-nom-molview-44.js](js/mulermoc-nom-molview-44.js)
**Teaching layer:** [js/mulermoc-nom-teaching-44.js](js/mulermoc-nom-teaching-44.js)
**Scenario module (new, off by default):** [js/mulermoc-nom-scenario-44.js](js/mulermoc-nom-scenario-44.js)
**Data set:** [js/jsme-nick-nomeclature-moc2-data_44.js](js/jsme-nick-nomeclature-moc2-data_44.js) — 64 molecules

---

## Two repositories (since 2026-10-02)

| Site | Serves | Status |
|---|---|---|
| [organic-nomenclature-2](https://nick-charistos.github.io/organic-nomenclature-2/) | v42 (`index.html` → `mulermoc-nom-42.html`) | frozen — emergency hotfixes only, never push feature work there |
| [organic-nomenclature-3](https://nick-charistos.github.io/organic-nomenclature-3/) | v44 (`index.html` → `mulermoc-nom-44.html`) | active — all new work happens here |

Runnable history via tags `v41`/`v42` (pushed to repo3). The old versioned file sets live on as a non-runnable museum in [archive/](archive/README.md).

---

## Recent work: ethers (v40)

- First ether molecules: `ethyl_methyl_ether` (CH3OCH2CH3) and `dimethylether` (CH3OCH3), classified into the `Αιθέρες` menu group.
- Systematic naming (alkoxy prefix + parent alkane, e.g. μεθοξυαιθάνιο) and common naming (e.g. αιθυλμεθυλαιθέρας), with an IUPAC/COMMON toggle in the name-explanation panel.
- Per-component highlight and numbering: alkoxy/alkyl clicks highlight and number only their own chain; `αιθέρας` highlights C-O-C.
- Tolerant 2D loading: molecules with a missing representation load the first available one and disable the corresponding mode radio instead of crashing.

---

## Recent work: esters + viewer/menu improvements (v41)

- First ester molecules: `ethanoic_methyl_ester` (CH3COOCH3) and `propanoic_methyl_ester` (CH3CH2COOCH3), with condensed, expanded and skeletal 2D data plus 3D SDFs. They run in algorithmic main-chain mode; stored `mainChain`/`moveto` data remains optional.
- Ester detection in 2D and 3D (`functionalGroupObj.ester`), two-fragment `esterInfo` analysis, and two-word Greek IUPAC naming (e.g. προπανοϊκός μεθυλεστέρας) with ester-aware euphony.
- Ester highlight/numbering: alcohol-fragment click numbers only the alcohol chain; ester-word click highlights the `O-C(=O)-O` triad in 2D and 3D.
- Viewer: `[2D][3D]` title-bar visibility toggles, `Επισήμανση ατόμων κατά την αρίθμηση` setting (on by default), 2D atom colors on by default.
- Menu: chemical-class taxonomy (`carbonylCompounds`, `esters`; hydroxy/amino acids folded into `carboxylicAcids`), flat `Όλα τα μόρια` grouping mode, rewritten rule-3 table with `data-row` keys.

---

## Shipped: branch highlighting (v43 working copy → carried into v44)

The alkyl-side-chain selection logic (incl. related expanded hydrogens) shipped in the v43 working copy and is carried into v44.

- Selected methyl and other hydrocarbon branches now highlight correctly in both the 2D JSME view and the 3D JSmol view.
- The branch fallback works even when the molecule includes additional functional groups, instead of only pure hydrocarbon cases.
- In expanded 2D mode, the carbon label and the attached hydrogen labels of the selected branch are color-synchronized so the branch remains visually coherent when highlighted.

---

## Project status

This project is currently a no-build web application built with JSME, JSmol, Snap.svg, and vanilla JavaScript. It already contains a working nomenclature engine and multiple representation modes, but it is still a legacy HTML-based implementation rather than a fully refactored product structure.

The next product iteration is being re-scoped around a clearer educational model:

- Greek-first interface
- homologous series as the primary navigation model
- rules as a secondary explanatory layer
- chemistry expansion in this order: branched molecules → ethers → esters

---

## Current stack

- **jQuery** 3.7.1
- **JSME** — 2D molecule editor/viewer
- **JSmol** — 3D molecule viewer
- **Snap.svg** — SVG manipulation
- **Web Speech API** — Greek TTS narration

---

## What exists now

### Supported baseline
- 2D molecular rendering via JSME
- 3D molecular rendering via JSmol
- Molecule menu grouped by homologous series by default
- Alternate rule-based molecule grouping
- Homologous-series groups ordered by increasing total carbon count
- Group switching preserves the selected molecule and opens its new group
- No molecule is selected when switching groups with no prior selection
- Methane is selected by default on page load
- Multiple representation modes:
  - condensed
  - expanded
  - skeletal
  - annotated skeletal
- Greek IUPAC name generation (incl. ether systematic + common names, two-word ester names)
- Name analysis and explanation panels (per-fragment highlight/numbering, IUPAC/COMMON toggle for ethers)
- Per-component name visibility (eye toggles: master switch + per-box eyes, stored per scenario step, narration-aware)
- Rule theory panel
- TTS narration in Greek
- PNG export for 2D and 3D views
- Responsive menu and settings controls
- Title-bar `[2D][3D]` visibility toggles + highlight-during-numbering setting
- 2D atom colors on by default
- Current molecule data set for the teaching application (64 molecules, incl. 2 ethers + 2 esters)

### Molecule grouping (v39, refined in v41–v43)

The menu classifies molecules through the existing structure-analysis
pipeline (`fAnalyseStructure()` and `fDetectMolType()`). Each molecule receives
a classification snapshot containing its functional groups, homologous-series
key, bond-series type, and total carbon count.

The default menu groups molecules by homologous series. Rule grouping and a
flat `Όλα τα μόρια` (all molecules) list are available as alternate modes
(defaults to the flat `all` mode; rule mode keeps its
pedagogical order). Chemical classes in v41 include `ethers`, `esters` and `carbonylCompounds`
(merged aldehydes/ketones); hydroxy/amino acids are folded into
`carboxylicAcids`. Remaining special series include keto acids, hydroxy
nitriles, and oxo carboxylic acids. Since v43, `Χημικές Τάξεις`
groups are also sorted by ascending carbon count (`fSortPropsByCarbonCount`;
see CHANGELOG [Unreleased]).

Within each homologous-series group, molecules are ordered by increasing total
number of carbon atoms. The optional `mainChain` data is not required for this
menu ordering.

### Current implementation architecture
The project uses a split-layer architecture:

- **Core logic**: analysis + naming
- **Viewer layer**: JSME / JSmol / Snap.svg integration
- **Teaching layer**: rule explanations, narration, UI wiring
- **Data layer**: molecule definitions and structural data

This makes the codebase a workable foundation for the restart and expansion.

---

## Restart and expansion plan

### Product principle
The next version should not be organized primarily around rule-by-rule teaching. Instead, the platform should be organized around:

- homologous series
- molecule browsing by family
- molecule detail view
- naming analysis
- optional rule explanations

### Immediate chemistry roadmap
1. **Branched molecules**
   - alkyl substituent recognition
   - multi-branch chain selection
   - corrected locant logic
   - validation examples

2. **Ethers** (v40, carried into v41)
    - detection and classification: done
    - systematic + common naming for saturated acyclic mono-ethers: done
    - per-component highlight/numbering + IUPAC/COMMON toggle: done
    - second example (`dimethylether`) added; stored chain data and `moveto` remain optional
    - remaining: unsaturated ether chains

3. **Esters** (detection/naming/highlight done since v41, carried into v43)
    - detection and classification (2D + 3D): done
    - two-fragment `esterInfo` analysis: done
    - two-word IUPAC naming (e.g. προπανοϊκός μεθυλεστέρας): done
    - per-fragment highlight/numbering + rule-table rows: done
    - first molecules (`ethanoic_methyl_ester`, `propanoic_methyl_ester` with condensed/expanded/skeletal + 3D): done
    - remaining: wider molecule coverage, unsaturated chains

### After the chemistry expansion
- add a first learning interaction layer
- add atom/bond click targets
- add one exploration mode
- then consider quiz features and research instrumentation

---

## Deferred scope

These remain explicitly out of the first restart milestone:

- full research-mode architecture
- participant/session logging
- quiz SPA
- condition locking
- CSV export
- transfer-test data set
- server-side classroom management
- rings and aromatics
- full reaction module

These belong to a later product phase.

---

## Key project documents

- [DEVELOPMENT-PLAN.md](docs/DEVELOPMENT-PLAN.md)
- [RESEARCH-PLAN.md](docs/RESEARCH-PLAN.md)
- [PROJECT-PLAN.md](docs/PROJECT-PLAN.md)
- [PROJECT-PLAN-GR.md](docs/PROJECT-PLAN-GR.md)
- [CHANGELOG.md](docs/CHANGELOG.md)
- [didactic-scenario-plan.md](docs/didactic-scenario-plan.md) — snapshot scenarios (v44)

These plans describe the research and product ambitions, but the current implementation should be treated as the working v44 baseline rather than as a fully finished research platform.

---

## Technical notes

### Important observations
- The workspace keeps one canonical versioned set per release at root (`*44*` now); older sets are frozen in [archive/](archive/README.md), runnable via tags `v41`/`v42`/`v43`.
- The project plans still describe older intended milestones and should be reconciled with the real v44 baseline.
- The chemistry engine should be validated before expanding into more complex categories.
- Ester detection/naming/highlight paths are implemented since v41; tertiary-amine R3N classification fixed in v44 via the bond-order N-table (browser verification pending).
- v43 added the didactic-scenario layer (`docs/didactic-scenario-plan.md`, `js/mulermoc-nom-scenario-43.js`, carried into v44 as `*-44.js`) without changing chemistry logic: tag-v43 `core-43` differed from `core-42` only by `let`-scoping hygiene plus two shared-state declarations (`esterInfo`, `alkylSubstituentNames`); `molview/teaching-43` diverged further in the working copy (MOL2D registry, 3D bond coloring, `all`-default grouping — see CHANGELOG [Unreleased]). v44 adds engine hardening (N-table, principal-FG rank, halogen N-way) + viewer hardening — see CHANGELOG [v44].

---

## Future goal

The target product is not only a naming tool, but a series-based chemistry learning environment that helps students explore:

- molecular family
- naming patterns
- structural logic
- representation transitions
- explanation by structure, not only by rules

This makes the platform more pedagogically coherent and more scalable than a strict rule-first interface.

---

## Vision (twofold+1)

1. **A useful tool for chemistry learning** with real impact in the community (teachers + students, Greek-first organic nomenclature).
2. **Ongoing research** about and from this project (learning + motivation effects, EPAL vs Lyceum school types, publications).
3. **Conditions for new developments** — technology + knowledge reusable for isomerism, chemical reactions, and beyond.

### Four layers (LEARN-first order)

All layers reuse the same v44 engine (analysis + 2D/3D viewers + naming panels), embedded as a static app in Drupal:

| # | Layer | Contract | State |
|---|---|---|---|
| 1 | **LEARN** | teacher-authored didactic scenarios (linear snapshots); presentation + self-paced learning; stored team scenarios | v44 scaffold (since v43; `js/mulermoc-nom-scenario-44.js`, off by default); exit restores full chrome (menu + both viewers); first stored scenario `scenarios/ethene.scenario.json`; next: scenario library verification with EPAL/Lyceum two-level notes |
| 2 | **EXPLORE** | current v42-style free browsing: left menu, all molecules of the database | working (64 mols); next: bounded EXPLORE-lite (~15 mols for LEARN scenarios incl. unsaturated ethers/esters) + menu search; full DB expansion is a standing content workstream |
| 3 | **PRACTICE** | exercises with corrective feedback until correct (3 types v1) | not started — see `docs/LAYERS-PLAN.md` |
| 4 | **PLAY** | gamified quizzes; responses + times logged for **research statistics** (primary) | not started — Drupal-owned auth/session/logging; app sends events; see `docs/LAYERS-PLAN.md` |

Details: `docs/LAYERS-PLAN.md` (layer contracts, exercise types v1, research logging schema v1, timeline, ownership).

### Scenario authoring flow (v44; built up over the v43 working copy)

Authoring hides behind the vertical `Σενάρια` handle (docked to the author bar, travels with it; presentation hides the whole unit). The bar is a global shell (`+ New` scenario capped at 3 empties, `Import` adds a card); each scenario card has its own Save/Steps/Export/Play panel plus an accordion drawer of steps. Authors pick molecules (or whole groups) per step — selecting a row in pick mode also picks it — tune per-step chrome in the drawer (2D/3D controls, naming controls, name interaction, component visibility, `Ταξινομήσεις Μένου` menu views; text is automatic, menu is derived from picks), and Save snapshots that may also be molecule-less (`menu`-only steps with an empty viewer). Notes support `<b>`/`<sup>`/`<sub>`. Present walks the per-step menus (flat, grouped collapsible, or switcher per `menuGroups`) from the applied step 1 under the `#pageContainer.presenting` CSS hook; Exit restores the full author chrome (menu + both viewers + all bars). Tag v43 had a simpler single-scenario flow. Details: `docs/didactic-scenario-plan.md`.

### Team

| Who | Role |
|---|---|
| P1 — supervisor (computational chemistry) | app code (hand-written + AI-assisted), engine ownership |
| P2 — Drupal / educational research / statistics / eye-tracking | Drupal embedding + scenario/quiz content types, logging API + storage, dashboards/CSV, research design |
| P3 — MSc student, chemistry teacher | scenarios, questions, exercises, quizzes design; small-class pilots (with P4) |
| P4 — undergrad chemistry | `.mol` + `.sdf` molecule production for the database (with P3) |
| P5 — MSc student, chemistry teacher | school research: learning + motivation effects, EPAL (vocational) vs general Lyceum |
| P6 — MSc graduate, chemistry teacher (v35 dissertation) | co-supervision, project memory, educational research |

### Architecture

- **Embedded static:** the chemistry app stays dependency-free static (JSME/JSmol/Snap.svg/jQuery, no build); Drupal embeds it and owns scenarios, exercises/quizzes, users/sessions, logging, and exports.
- **Stats primary for research:** response + time logs are designed for publication (pseudonymous participants, condition/layer flags, school-type covariate joined in Drupal — no PII in the static app).
- **Extensible:** scenario `menuSubset`, exercise `itemType`, log `domain` fields reserve `nomenclature | isomerism | reactions` — future domains without schema breaks.

---

## Repository status summary

- Working baseline: **v44** (released 2026-10-07; v43 frozen at tag `v43`, v42 frozen in repo2)
- Main focus: **LEARN pilot (stored scenarios) + bounded EXPLORE-lite**
- Near-term goal: **scenario library verification on v44**
- Product model: **LEARN narrative first, homologous series as database order**
- Rules: **secondary explanatory layer**
- Research layer: **active design (P2/P5/P6; schema v1 in `docs/LAYERS-PLAN.md`)**
- Future domains (+1): **isomerism, reactions — reserved, not in v1**
- English upgrade: **conditional Phase 5 after the Greek pilot** (see `docs/LAYERS-PLAN.md` §8); `lang` reserved in schema/events, not implemented


