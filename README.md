# MuLERMoCs — Organic Nomenclature Learning Platform

A Greek-first interactive learning platform for organic nomenclature, built around molecular structure, naming logic, and multiple representations. It is a no-build static web app (JSME, JSmol, Snap.svg, jQuery, vanilla JavaScript) intended to be embedded in Drupal.

Desinged and developed by Nickolas Charistos

**Current baseline:** v49 is live (`index.html` → v49) — MSc-student `thesis-work` import: acyclic-alkane parent-chain fix, explicit terminal unsaturation locant, 73rd molecule, alkene lesson scenarios, plus the alkyl reference table/locant rule-table fixes (see [CHANGELOG](docs/CHANGELOG.md)). Browser click-through of the v49 learner/authoring additions is still pending.
**Entry point:** [index.html](index.html) → [mulermoc-nom-49.html](mulermoc-nom-49.html) (live); previous versions `mulermoc-nom-48.html`…`-42.html` runnable alongside

| Layer | File |
|---|---|
| Core engine (analysis + naming) | [js/mulermoc-nom-core-49.js](js/mulermoc-nom-core-49.js) |
| Viewer (JSME / JSmol / Snap.svg) | [js/mulermoc-nom-molview-49.js](js/mulermoc-nom-molview-49.js) |
| Teaching (rules, narration, UI wiring) | [js/mulermoc-nom-teaching-49.js](js/mulermoc-nom-teaching-49.js) |
| Scenario module (LEARN authoring + presentation) | [js/mulermoc-nom-scenario-49.js](js/mulermoc-nom-scenario-49.js) |
| Shared icon helper | [js/ui-icons.js](js/ui-icons.js) |
| Molecule data (73 molecules — 73 `nameExamples` keys) | [js/jsme-nick-nomeclature-moc2-data_49.js](js/jsme-nick-nomeclature-moc2-data_49.js) |
| Styles | [css/jsme-nick-49.css](css/jsme-nick-49.css), [css/mulermoc-nom-scenario-49.css](css/mulermoc-nom-scenario-49.css) |
| Stored scenarios | [scenarios/](scenarios/) (`Αλκάνια-Αιθάνιο`, `Αλκένια-Αιθένιο`, `Αλκένια-Ονοματολογία_και_διακλαδώσεις`; Greek filenames stay URL-encoded in `?scenario=` links) |

---

## Repositories and versions

| Site | Serves | Status |
|---|---|---|
| [organic-nomenclature-2](https://nick-charistos.github.io/organic-nomenclature-2/) | v42 | frozen — emergency hotfixes only |
| [organic-nomenclature-3](https://nick-charistos.github.io/organic-nomenclature-3/) | v49 live | active — all new work happens here |

Root holds the files of the current live set (`*49*`; `mulermoc-nom-42/43/44/45/46/47/48.html` are kept runnable alongside). Older file sets live in [archive/](archive/README.md) (non-runnable museum). Runnable history via git tags `v41`–`v44`.

Not tracked on GitHub (not needed to run): RDKit experiments, most of `imgs/` (only `image-svgrepo-Industrial-Sharp.svg` is kept; other icons are inlined/served by `js/ui-icons.js`), PDFs, `mols/branched/`, third-party libs served via CDN (see [.gitignore](.gitignore)).

---

## What works now (v49 live — student import, alkyl reference table, scenario presentation)

### Chemistry engine
- Greek IUPAC naming for alkanes/alkenes/alkynes, branched chains, halides, alcohols, aldehydes/ketones, carboxylic acids (incl. hydroxy/amino/oxo/keto), nitriles, amines, ethers (systematic + common names), esters (two-word names).
- Main-chain selection ranks candidates by multiple bonds first (`C=C/C≡C`, then `C=C`, then length) while retaining top-priority FG-anchor coverage; for saturated acyclic hydrocarbons, tied parents then rank by most carbon branches, then lowest branch locants (v49).
- v44 hardening (carried into v45): bond-order N-table (tertiary R3N fixed), principal-functional-group rank, halogen N-way handling.
- v45 2D naming rename (code-only, behavior-identical): MOL variables `<mol>_2D_Condensed/_2D_Expanded/_2D_Skeletal`, `mode2D` value `skeletal` (was misspelled `diagramatic`; legacy scenario files coerce on import), stored chain keys `mainChain_Condensed/_Expanded/_Skeletal`.
- v46 fork (mechanical copy of the v45 set, behavior-identical): 4 new molecules (2 ethers + 2 esters, 65 → 69 keys) + formate-ester engine fix (`methyl_methanoate` was mis-named as alkoxy-aldehyde); `*45*` stays runnable at root.
- Name analysis: per-fragment highlight and numbering in 2D and 3D, per-alkyl-group branch highlighting (incl. expanded hydrogens), rule-theory panel; long names auto-fit the analysis column (`--nameCompScale`, floor + horizontal-scroll fallback).

### Viewer and UI
- 2D (JSME) and 3D (JSmol) views; condensed, expanded, skeletal and annotated-skeletal modes; `[2D][3D]` visibility toggles; PNG export.
- **Fluid viewers (v48):** both viewers fit the viewer column via native `setSize` (container-derived heights, debounced `ResizeObserver`); a **single max-height** control and a **combined 2D+3D height** control for the two-viewer case (Auto | manual px) live in Ρυθμίσεις and are stored per scenario step.
- **Authoring pin-dock (v48):** the scenario bar docks full-height beside the app (scoped horizontal scroll with edge cues); the pinned viewer width is adaptive (`clamp`, keeps its original width when the screen has room, eases to a 400px floor); viewer-column UI text scales fluidly via a container query.
- **Ρυθμίσεις pass (v48):** the 2D/3D detail toggles (`Έγχρωμα Σύμβολα`, `Σύμβολα ατόμων`) are consolidated into the gear panel; the `Από δεδομένα` main-chain bullet is disabled when the molecule has no stored chain data.
- Menu groups: homologous series (default sort by carbon count), chemical classes, rules, flat `Όλα τα μόρια`.
- Name panel: IUPAC/COMMON toggle, per-component eye toggles (hide name parts), Greek TTS narration that follows visibility.
- Tooltips share one navy skin (single copy in `css/jsme-nick-49.css`); scenario-bar/panel/step/toolbar buttons, type badge and drag handle converted from native `title`; all-Greek tooltip texts; geometry variants (button-panel bubbles above, save buttons left, `[2D]` left-aligned, edge buttons Save-left-aligned/Delete-right-aligned) for `overflow:hidden` parents.

### LEARN layer: didactic scenarios
- Authoring behind the `Σενάρια` handle: up to 3 scenarios, steps per scenario with per-step molecule/menu/chrome settings, rich step text (`B I sup sub`, size/width/columns), icon buttons, drag-reorder, step drawer (state survives close and Present → Exit), per-step Present (`▶` starts at that step; card Play always at step 1), Import/Export JSON.
- `Go` previews align picks + viewer chrome to the step, so Go → tweak → `Update` round-trips keep the menu; Exit restores the full app chrome (viewers/bars per the exit step).
- Presentation mode (`#pageContainer.presenting`) walks the steps; Exit restores the full app chrome.
- Details: [docs/didactic-scenario-plan.md](docs/didactic-scenario-plan.md).

### Known gaps
- Unsaturated ethers/esters and wider ester coverage; rings and aromatics not supported.
- v48: browser click-through pending for the confirm dialog, both height controls, pin/unpin, the per-alkyl-group highlight, and long-name auto-fit (`docs/SESSION-NOTES.md`); scenario exports still stamp `"app": "mulermoc-nom-44"` (informational only — validation ignores it).
- v49: browser click-through pending for the acyclic-alkane parent-chain fix (new + existing alkanes), the explicit terminal-`1` locant change (`3-μεθυλο-1-βουτένιο`), the 73rd molecule + 3D SDF, the imported scenarios, the alkyl table on branch/locant components, and the enyne `-ιν-` rule tile.
- v49: carbon-branch orientation compares locant sets only; alphabetical priority for carbon substituents (as already done for halogen/nitro) is not yet applied, so a future mixed ethyl/methyl alkane with tied locant sets could orient arbitrarily (not exercised by the current 73 molecules).
- Stored scenarios: `Αλκάνια-Αιθάνιο.scenario.json` (7 steps: ethane walkthrough + alkane menu browsing + 3D alkane models; replaces the earlier `ethene*.scenario.json` drafts, which selected ethane while titled ethene), plus the imported `Αλκένια-Αιθένιο` (7) and `Αλκένια-Ονοματολογία_και_διακλαδώσεις` (22); wider scenario library and EPAL/Lyceum two-level notes still to be written.

---

## Four layers (LEARN-first)

All layers reuse the same v49 engine, embedded as a static app in Drupal:

| # | Layer | Contract | State |
|---|---|---|---|
| 1 | **LEARN** | teacher-authored linear scenarios; presentation + self-paced learning | working scaffold (authoring + presentation); stored scenario `Αλκάνια-Αιθάνιο` |
| 2 | **EXPLORE** | free browsing of all molecules (left menu) | working (73 molecules); next: bounded EXPLORE-lite (~15 mols) + menu search |
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

- [CHANGELOG.md](docs/CHANGELOG.md) — authoritative history (v49 live); [STUDENT-IMPORT.md](docs/STUDENT-IMPORT.md) — recurring `thesis-work` import procedure
- [didactic-scenario-plan.md](docs/didactic-scenario-plan.md) — scenario schema and authoring flow
- [LAYERS-PLAN.md](docs/LAYERS-PLAN.md) — layer contracts, exercise types, research logging schema
- [DEVELOPMENT-PLAN.md](docs/DEVELOPMENT-PLAN.md), [PROJECT-PLAN.md](docs/PROJECT-PLAN.md), [PROJECT-PLAN-GR.md](docs/PROJECT-PLAN-GR.md) — product/research plans (may lag the code)
- [FLOWCHART.md](docs/FLOWCHART.md), [SESSION-NOTES.md](docs/SESSION-NOTES.md) — engine flow and working notes

---

## Status summary

- Baseline: **v49 live** (`index.html` → v49; student-thread import — parent-chain fix + 73rd molecule + scenarios + alkyl rule table/locant fixes); v48/v47/v46/v45/v44 runnable at root (`mulermoc-nom-48/47/46/45/44.html`), v43 frozen at tag `v43`, v42 frozen in repo2
- Focus: **LEARN pilot (stored scenarios) + bounded EXPLORE-lite**
- Near-term: **v49 browser verification (parent-chain fix, `3-μεθυλο-1-βουτένιο` locant, 73rd molecule/3D, imported scenarios, alkyl table/locants, enyne `-ιν-`); scenario library verification; bounded EXPLORE-lite (~15 mols + menu search)**
- Rules: secondary explanatory layer; homologous series = database order
- Research layer: active design (schema v1 in LAYERS-PLAN)
