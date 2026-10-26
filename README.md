# MuLERMoCs — Organic Nomenclature Learning Platform

A Greek-first interactive learning platform for organic nomenclature, built around molecular structure, naming logic, and multiple representations. It is a no-build static web app (JSME, JSmol, jQuery, vanilla JavaScript; live v52 is Snap-free and adds the unified rich note editor) intended to be embedded in Drupal.

Designed and developed by Nickolas Charistos

**Current baseline:** v52 is live (`index.html` → v52) — **126 molecules**, the unified rich note editor (inline WYSIWYG, modal WYSIWYG + HTML source, lazy legacy-text upgrade, staged Apply/Cancel); it retains safe rich HTML notes (DOMPurify), rule-table components, the compact icon toolbar, and a Snap-free native `MuSVG` 2D overlay. The default preloaded scenario is `Αλκάνια-Αιθάνιο-τεστ`. See [docs/Presentation-Step-Rich-Text-PLAN.md](docs/Presentation-Step-Rich-Text-PLAN.md).
**Previous version:** v51 remains runnable at root (`mulermoc-nom-51.html`), along with v50…v42. v51 introduced safe rich notes and the Snap-free viewer; v52 adds the unified inline/modal rich editor.
**Entry point:** [index.html](index.html) → [mulermoc-nom-52.html](mulermoc-nom-52.html) (live); `mulermoc-nom-51.html` and earlier versions `mulermoc-nom-50.html`…`-42.html` runnable alongside

| Layer | File |
|---|---|
| Core engine (analysis + naming) | [js/mulermoc-nom-core-52.js](js/mulermoc-nom-core-52.js) |
| Viewer (JSME / JSmol / native SVG) | [js/mulermoc-nom-molview-52.js](js/mulermoc-nom-molview-52.js) |
| Teaching (rules, narration, UI wiring) | [js/mulermoc-nom-teaching-52.js](js/mulermoc-nom-teaching-52.js) |
| Scenario module (LEARN authoring + presentation) | [js/mulermoc-nom-scenario-52.js](js/mulermoc-nom-scenario-52.js) |
| Shared icon helper | [js/ui-icons.js](js/ui-icons.js) |
| Molecule data (126 molecules — 126 `nameExamples` keys) | [js/jsme-nick-nomeclature-moc2-data_52.js](js/jsme-nick-nomeclature-moc2-data_52.js) |
| Styles | [css/jsme-nick-52.css](css/jsme-nick-52.css), [css/mulermoc-nom-scenario-52.css](css/mulermoc-nom-scenario-52.css) |
| Stored scenarios | [scenarios/](scenarios/) (`Αλκάνια-Αιθάνιο-τεστ` default, `Αλκάνια-Αιθάνιο` legacy retained, `Αλκένια-Αιθένιο`, `Αλκένια-Ονοματολογία_και_διακλαδώσεις`; Greek filenames stay URL-encoded in `?scenario=` links) |

---

## Repositories and versions

| Site | Serves | Status |
|---|---|---|
| [organic-nomenclature-2](https://nick-charistos.github.io/organic-nomenclature-2/) | v42 | frozen — emergency hotfixes only |
| [organic-nomenclature-3](https://nick-charistos.github.io/organic-nomenclature-3/) | v52 live | active — all new work happens here |

Root holds the files of the current live set (`*52*`; `mulermoc-nom-51.html` and `mulermoc-nom-50.html` plus `mulermoc-nom-42/43/44/45/46/47/48/49.html` are kept runnable alongside). Older file sets live in [archive/](archive/README.md) (non-runnable museum). Runnable history via git tags `v41`–`v44`.

Not tracked on GitHub (not needed to run): RDKit experiments, most of `imgs/` (only `image-svgrepo-Industrial-Sharp.svg` is kept; other icons are inlined/served by `js/ui-icons.js`), PDFs, `mols/branched/`, and the large JSmol runtime. Small security- or compatibility-critical libraries are vendored under `js/vendor/`; the rest are served via CDN (see [.gitignore](.gitignore)).

---

## What works now (v52 live — unified rich note editor, 126 molecules, Snap-free viewer)

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
- **Presentation text rails + naming shell (v50, retained in v52 live):** each step can place its note **Πάνω** (default), **Αριστερά**, or **Δεξιά**; side modes render as a sticky, internally scrolling 300–420px fourth-column reading rail beside the app on screens ≥1200px, with automatic top fallback below that. Rails always use one column; the stored width/columns return when the step is placed back on top. The naming panel also keeps its title/gear shell available (with a no-molecule placeholder), while presentation `Name controls` still hides gear/panel/voice when unchecked.
- **Ρυθμίσεις pass (v48):** the 2D/3D detail toggles (`Έγχρωμα Σύμβολα`, `Σύμβολα ατόμων`) are consolidated into the gear panel; the `Από δεδομένα` main-chain bullet is disabled when the molecule has no stored chain data.
- Menu groups: homologous series (default sort by carbon count), chemical classes, rules, flat `Όλα τα μόρια`.
- Name panel: IUPAC/COMMON toggle, per-component eye toggles (hide name parts), Greek TTS narration that follows visibility.
- Tooltips share one navy skin (single copy in `css/jsme-nick-52.css`); scenario-bar/panel/step/toolbar buttons, type badge and drag handle converted from native `title`; all-Greek tooltip texts; geometry variants (button-panel bubbles above, save buttons left, `[2D]` left-aligned, edge buttons Save-left-aligned/Delete-right-aligned) for `overflow:hidden` parents.

### LEARN layer: didactic scenarios
- Authoring behind the `Σενάρια` handle: up to 3 scenarios, steps per scenario with per-step molecule/menu/chrome settings, rich step text (`B I sup sub`, lists, per-block font size/alignment, columns; v50 adds top/left/right placement + the persistent naming shell), icon buttons, drag-reorder, step drawer (state survives close and Present → Exit), per-step Present (`▶` starts at that step; card Play always at step 1), Import/Export JSON.
- `Go` previews align picks + viewer chrome to the step, so Go → tweak → `Update` round-trips keep the menu; Exit restores the full app chrome (viewers/bars per the exit step).
- Presentation mode (`#pageContainer.presenting`) walks the steps; Exit restores the full app chrome.
- Details: [docs/didactic-scenario-plan.md](docs/didactic-scenario-plan.md).
- **v52 unified rich note editor (live):** the inline drawer is a compact WYSIWYG editor with live writes, and the expanded modal has one WYSIWYG editor plus a **WYSIWYG / HTML** source toggle (no Simple/Rich modes). `B I U sup sub` map to the live DOM selection, paste is sanitized, and modal changes are staged behind Apply/Cancel with a dirty-close confirm. New notes default to HTML; legacy text notes render safely and upgrade on first edit. Rule-table includes round-trip as placeholders, rendered embeds are non-editable, and Apply fails closed without DOMPurify. The v51 safe rich-note renderer, six rule-table components (including alkoxy), compact inline toolbar, and icon-only step actions are retained. The 2026-10-26 refinement adds UL/OL lists, a per-block font-size dropdown, left/center/right alignment, an image sizing dialog (alt required; optional width/height), a presentation top card that spans the visible app columns (capped at 1600px), and a side rail that stretches to the app row with internal scrolling. The URL image tool is removed; `styleText.textWidthPx` is parsed but no longer applied. UL/OL stay in the inline toolbar; image, table, and predefined-content inserts are modal-only.
- **v51 data (retained):** 98 `nameExamples` keys; added 18 molecules (9 alcohols, 6 dienes, 3 enynes), 54 embedded 2D forms and 18 runtime 3D SDFs. Alcohol-aware chain ranking and fragment-aware isopropyl/propyl branch naming are included, but branch prefixes remain limited to pure acyclic hydrocarbons and acyclic alcohols; other homologous series still need the generic branch/FG-profile refactor.
- **v52 data (live):** 98 → 126 `nameExamples` keys; added 9 ketones/diones/ynones, 12 aldehydes/dials and 7 monoethers, each with three embedded 2D forms and a runtime 3D SDF. Core adds acyclic aldehyde/ketone/monoether graph guards and ketone-locant preservation; viewer adds methanal `HCHO` handling and sequential ketone numbering; teaching adds the alkoxy reference table alongside the existing alkyl table.

### Known gaps
- Unsaturated ethers/esters and wider ester coverage; rings and aromatics not supported.
- v48: browser click-through pending for the confirm dialog, both height controls, pin/unpin, the per-alkyl-group highlight, and long-name auto-fit (`docs/SESSION-NOTES.md`); scenario exports still stamp `"app": "mulermoc-nom-44"` (informational only — validation ignores it).
- v49: browser click-through pending for the acyclic-alkane parent-chain fix (new + existing alkanes), the explicit terminal-`1` locant change (`3-μεθυλο-1-βουτένιο`), the 73rd molecule + 3D SDF, the imported scenarios, the alkyl table on branch/locant components, and the enyne `-ιν-` rule tile.
- v49: carbon-branch orientation compares locant sets only; alphabetical priority for carbon substituents (as already done for halogen/nitro) is not yet applied, so a future mixed ethyl/methyl alkane with tied locant sets could orient arbitrarily (not exercised by the current 126 molecules).
- v50: browser click-through pending for the side text rails (left/right, wide/narrow fallback, menu steps, long notes, top↔side switching, 2D/3D refit), the no-molecule naming placeholder, and presentation naming-chrome behavior, plus the v49 items above. Also pending: the 7 alkynes added post-live (73 → 80 keys) and the skeletal `C`-label removal for any sp carbon — alkynes, enynes, yne-ketone/aldehyde, nitriles, allene (2D only; 3D framing deferred).
- v52: the unified rich note editor (inline WYSIWYG, modal WYSIWYG + HTML source, lazy legacy-text upgrade), WYSIWYG selection mapping, staged Apply/Cancel, dirty-close confirm, and modal-only image/table/predefined inserts (UL/OL inline) are live. Headless Chrome smoke tests passed; Firefox, touch devices, and real-scenario click-through remain pending. The v51 safe rich-note renderer, rule-table components, the 126-molecule data set, and the native `MuSVG` Snap replacement remain live. The `MuSVG.parse()` OOM/XML crash is fixed; Chrome and Firefox automated matrices pass, with the two pre-existing skeletal JSmol failures (`butadiene_1_3`, `propadiene`) still open. The earlier jsdom suite (95 sanitizer + 38 scenario-integration checks) predates later changes and needs updating before reuse. Remaining manual coverage: rich-note editing in real scenarios (including the new lists, per-block size/alignment, image dialog, top-card column alignment, and side-rail behavior), 3D views and highlights for the 18 v51 + 28 v52 additions, the icon dropdown/skip icons, 2D/3D refit, the JSmol local/CDN loader, and jQuery 4; extending branch prefixes to acids/amines/halides/mixed functional groups remains open.
- Stored scenarios: `Αλκάνια-Αιθάνιο-τεστ.scenario.json` is the default (7 steps: ethane walkthrough + alkane menu browsing + 3D alkane models; steps 5–7 place the note in a left rail with longer text), while the previous `Αλκάνια-Αιθάνιο.scenario.json` is retained on disk for explicit `?scenario=` links but is no longer preloaded; plus the imported `Αλκένια-Αιθένιο` (7) and `Αλκένια-Ονοματολογία_και_διακλαδώσεις` (22); wider scenario library and EPAL/Lyceum two-level notes still to be written.

---

## Four layers (LEARN-first)

All layers reuse the same v52 engine (v51 is the previous runnable copy), embedded as a static app in Drupal:

| # | Layer | Contract | State |
|---|---|---|---|
| 1 | **LEARN** | teacher-authored linear scenarios; presentation + self-paced learning | working scaffold (authoring + presentation); stored scenarios `Αλκάνια-Αιθάνιο-τεστ` (default), `Αλκάνια-Αιθάνιο` (legacy), `Αλκένια-Αιθένιο`, `Αλκένια-Ονοματολογία_και_διακλαδώσεις` |
| 2 | **EXPLORE** | free browsing of all molecules (left menu) | working (126 molecules); next: bounded EXPLORE-lite (~15 mols) + menu search |
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

- [CHANGELOG.md](docs/CHANGELOG.md) — authoritative history (v52 live); [STUDENT-IMPORT.md](docs/STUDENT-IMPORT.md) — recurring `thesis-work` import procedure
- [didactic-scenario-plan.md](docs/didactic-scenario-plan.md) — scenario schema and authoring flow
- [LAYERS-PLAN.md](docs/LAYERS-PLAN.md) — layer contracts, exercise types, research logging schema
- [DEVELOPMENT-PLAN.md](docs/DEVELOPMENT-PLAN.md), [PROJECT-PLAN.md](docs/PROJECT-PLAN.md), [PROJECT-PLAN-GR.md](docs/PROJECT-PLAN-GR.md) — product/research plans (may lag the code)
- [THESIS-WORK-V52-STEP-TEXT.md](docs/THESIS-WORK-V52-STEP-TEXT.md) — v52 step-text/authoring feature brief for the thesis-work line
- [FLOWCHART.md](docs/FLOWCHART.md), [SESSION-NOTES.md](docs/SESSION-NOTES.md) — engine flow and working notes; [SESSION-HANDOFF-2026-10-26-RICH-NOTE-EDITOR-V52.md](docs/SESSION-HANDOFF-2026-10-26-RICH-NOTE-EDITOR-V52.md) — v52 rich note editor handoff; [SESSION-HANDOFF-2026-10-25-SNAP-REMOVAL.md](docs/SESSION-HANDOFF-2026-10-25-SNAP-REMOVAL.md) — v51 Snap-removal root cause, fix, and verification

---

## Status summary

- Baseline: **v52 live** (`index.html` → v52; unified inline/modal rich note editor with WYSIWYG + HTML source and staged Apply/Cancel, 126 molecules, Snap-free native `MuSVG`; default scenario `Αλκάνια-Αιθάνιο-τεστ`); v51/v50/v49/v48/v47/v46/v45/v44 runnable at root (`mulermoc-nom-51/50/49/48/47/46/45/44.html`), v43 frozen at tag `v43`, v42 frozen in repo2
- Previous live: **v51** (`mulermoc-nom-51.html`; safe rich notes, rule-table components, content-only authoring dialog, Snap-free viewer)
- Focus: **LEARN pilot (stored scenarios) + bounded EXPLORE-lite**
- Near-term: **finish v52 manual coverage (rich note editor in real scenarios, Firefox/touch, 3D + highlights for the 18 v51 molecules, icon toolbar, 2D/3D refit, JSmol loader, jQuery 4); fix the two pre-existing skeletal JSmol failures; then generic branch prefixes beyond hydrocarbon/acyclic alcohol; v51/v50/v49 backlog verification; scenario library verification; bounded EXPLORE-lite (~15 mols + menu search)**
- Rules: secondary explanatory layer; homologous series = database order
- Research layer: active design (schema v1 in LAYERS-PLAN)
