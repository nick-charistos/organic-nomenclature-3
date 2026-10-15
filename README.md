# MuLERMoCs — Organic Nomenclature Learning Platform

A Greek-first interactive learning platform for organic nomenclature, built around molecular structure, naming logic, and multiple representations. It is a no-build static web app (JSME, JSmol, Snap.svg, jQuery, vanilla JavaScript) intended to be embedded in Drupal.

Desinged and developed by Nickolas Charistos

**Current baseline:** v46 (scaffolded from v45; `index.html` → v46; ongoing work is the *v46 working copy* — see [CHANGELOG](docs/CHANGELOG.md) `[Unreleased]`)
**Entry point:** [index.html](index.html) → [mulermoc-nom-46.html](mulermoc-nom-46.html)

| Layer | File |
|---|---|
| Core engine (analysis + naming) | [js/mulermoc-nom-core-46.js](js/mulermoc-nom-core-46.js) |
| Viewer (JSME / JSmol / Snap.svg) | [js/mulermoc-nom-molview-46.js](js/mulermoc-nom-molview-46.js) |
| Teaching (rules, narration, UI wiring) | [js/mulermoc-nom-teaching-46.js](js/mulermoc-nom-teaching-46.js) |
| Scenario module (LEARN authoring + presentation) | [js/mulermoc-nom-scenario-46.js](js/mulermoc-nom-scenario-46.js) |
| Shared icon helper | [js/ui-icons.js](js/ui-icons.js) |
| Molecule data (69 molecules — 69 `nameExamples` keys) | [js/jsme-nick-nomeclature-moc2-data_46.js](js/jsme-nick-nomeclature-moc2-data_46.js) |
| Styles | [css/jsme-nick-46.css](css/jsme-nick-46.css), [css/mulermoc-nom-scenario-46.css](css/mulermoc-nom-scenario-46.css) |
| Stored scenarios | [scenarios/](scenarios/) (`Αλκάνια-Αιθάνιο.scenario.json`; Greek filenames stay URL-encoded in `?scenario=` links) |

---

## Repositories and versions

| Site | Serves | Status |
|---|---|---|
| [organic-nomenclature-2](https://nick-charistos.github.io/organic-nomenclature-2/) | v42 | frozen — emergency hotfixes only |
| [organic-nomenclature-3](https://nick-charistos.github.io/organic-nomenclature-3/) | v46 | active — all new work happens here |

Root holds the files of the current release (`*46*`; `mulermoc-nom-42/43/44/45.html` are kept alongside). Older file sets live in [archive/](archive/README.md) (non-runnable museum). Runnable history via git tags `v41`–`v44`.

Not tracked on GitHub (not needed to run): RDKit experiments, most of `imgs/` (only `image-svgrepo-Industrial-Sharp.svg` is kept; other icons are inlined/served by `js/ui-icons.js`), PDFs, `mols/branched/`, third-party libs served via CDN (see [.gitignore](.gitignore)).

---

## What works now (v46)

### Chemistry engine
- Greek IUPAC naming for alkanes/alkenes/alkynes, branched chains, halides, alcohols, aldehydes/ketones, carboxylic acids (incl. hydroxy/amino/oxo/keto), nitriles, amines, ethers (systematic + common names), esters (two-word names).
- v44 hardening (carried into v45): bond-order N-table (tertiary R3N fixed), principal-functional-group rank, halogen N-way handling.
- v45 2D naming rename (code-only, behavior-identical): MOL variables `<mol>_2D_Condensed/_2D_Expanded/_2D_Skeletal`, `mode2D` value `skeletal` (was misspelled `diagramatic`; legacy scenario files coerce on import), stored chain keys `mainChain_Condensed/_Expanded/_Skeletal`.
- v46 fork (mechanical copy of the v45 set, behavior-identical): 4 new molecules (2 ethers + 2 esters, 65 → 69 keys) + formate-ester engine fix (`methyl_methanoate` was mis-named as alkoxy-aldehyde); `*45*` stays runnable at root.
- Name analysis: per-fragment highlight and numbering in 2D and 3D, branch highlighting (incl. expanded hydrogens), rule-theory panel.

### Viewer and UI
- 2D (JSME) and 3D (JSmol) views; condensed, expanded, skeletal and annotated-skeletal modes; `[2D][3D]` visibility toggles; PNG export.
- Menu groups: homologous series (default sort by carbon count), chemical classes, rules, flat `Όλα τα μόρια`.
- Name panel: IUPAC/COMMON toggle, per-component eye toggles (hide name parts), Greek TTS narration that follows visibility.
- Tooltips share one navy skin (single copy in `css/jsme-nick-46.css`); scenario-bar/panel/step/toolbar buttons, type badge and drag handle converted from native `title`; all-Greek tooltip texts; geometry variants (button-panel bubbles above, save buttons left, `[2D]` left-aligned, edge buttons Save-left-aligned/Delete-right-aligned) for `overflow:hidden` parents.

### LEARN layer: didactic scenarios
- Authoring behind the `Σενάρια` handle: up to 3 scenarios, steps per scenario with per-step molecule/menu/chrome settings, rich step text (`B I sup sub`, size/width/columns), icon buttons, drag-reorder, step drawer, Import/Export JSON.
- `Go` previews align picks + viewer chrome to the step, so Go → tweak → `Update` round-trips keep the menu; Exit restores the full app chrome (viewers/bars per the exit step).
- Presentation mode (`#pageContainer.presenting`) walks the steps; Exit restores the full app chrome.
- Details: [docs/didactic-scenario-plan.md](docs/didactic-scenario-plan.md).

### Known gaps
- Unsaturated ethers/esters and wider ester coverage; rings and aromatics not supported.
- v45 working copy: 2D rename static-audited (braces balanced, zero legacy refs; two composite-key bugs caught and fixed in review); tooltip hover checks pending (owner); scenario exports still stamp `"app": "mulermoc-nom-44"` (informational only — validation ignores it).
- Stored scenario `Αλκάνια-Αιθάνιο.scenario.json` (7 steps: ethane walkthrough + alkane menu browsing + 3D alkane models) replaces the earlier `ethene*.scenario.json` drafts (which selected ethane while titled ethene); wider scenario library and EPAL/Lyceum two-level notes still to be written.
- Present grouped menus (`.scPresentGroup.open`) still carry the old dark fill while app group headers went light blue — re-mirror in the UI pass.

---

## Four layers (LEARN-first)

All layers reuse the same v46 engine, embedded as a static app in Drupal:

| # | Layer | Contract | State |
|---|---|---|---|
| 1 | **LEARN** | teacher-authored linear scenarios; presentation + self-paced learning | working scaffold (authoring + presentation); stored scenario `Αλκάνια-Αιθάνιο` |
| 2 | **EXPLORE** | free browsing of all molecules (left menu) | working (69 molecules); next: bounded EXPLORE-lite (~15 mols) + menu search |
| 3 | **PRACTICE** | exercises with corrective feedback (3 types v1) | not started — see [LAYERS-PLAN](docs/LAYERS-PLAN.md) |
| 4 | **PLAY** | gamified quizzes; responses + times logged for research statistics | not started — Drupal owns auth/session/logging; see [LAYERS-PLAN](docs/LAYERS-PLAN.md) |

Out of scope for now: quiz SPA, participant logging, CSV export, server-side classroom management, rings/aromatics, reactions, isomerism (reserved in schemas), English UI (conditional later phase).

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

- [CHANGELOG.md](docs/CHANGELOG.md) — authoritative history, incl. `[Unreleased]` v46 working copy
- [didactic-scenario-plan.md](docs/didactic-scenario-plan.md) — scenario schema and authoring flow
- [LAYERS-PLAN.md](docs/LAYERS-PLAN.md) — layer contracts, exercise types, research logging schema
- [DEVELOPMENT-PLAN.md](docs/DEVELOPMENT-PLAN.md), [PROJECT-PLAN.md](docs/PROJECT-PLAN.md), [PROJECT-PLAN-GR.md](docs/PROJECT-PLAN-GR.md) — product/research plans (may lag the code)
- [FLOWCHART.md](docs/FLOWCHART.md), [SESSION-NOTES.md](docs/SESSION-NOTES.md) — engine flow and working notes

---

## Status summary

- Baseline: **v46** (+ working copy); v45 runnable at root (`mulermoc-nom-45.html`), v44 runnable at root (`mulermoc-nom-44.html`), v43 frozen at tag `v43`, v42 frozen in repo2
- Focus: **LEARN pilot (stored scenarios) + bounded EXPLORE-lite**
- Near-term: **iso-/sec- alkyl prefix upgrade + scenario library verification on v46**
- Rules: secondary explanatory layer; homologous series = database order
- Research layer: active design (schema v1 in LAYERS-PLAN)
