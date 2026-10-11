# Session handoff — MuLERMoCs-Anastasia

**Date:** 2026-10-10  
**Purpose:** Resume project evaluation and research planning in a later session.  
**Session scope:** Read-only code/document review and strategic discussion; no application code was changed.

## 1. Project direction agreed in discussion

The project’s central goal is to develop and evaluate a four-layer educational framework:

1. **LEARN** — teacher-authored guided scenarios and worked examples.
2. **EXPLORE** — student-directed exploration of molecular examples and representations.
3. **PRACTICE** — retrieval tasks with corrective feedback.
4. **PLAY** — a later game-oriented learning layer, to be evaluated rather than added as decoration.

The intended research plan is to publish **2–3 papers**, beginning with an early paper on the LEARN–PRACTICE software and a small exploratory study, then a classroom study of learning outcomes and motivation. Four chemistry-teacher collaborators are available for development and school implementation. An English version is a possible later extension, not the immediate priority.

Strategic recommendation from the discussion: continue. The defensible contribution is not another broad English quiz bank; it is the learning framework and the way the tool links nomenclature reasoning to coordinated molecular representations and guided learning. A Greek-first implementation can be a purposeful context for developing and testing that contribution.

## 2. Suggested publication sequence

### Paper 1 — submit first: formative/process study

Position as a **design and learning-process study of LEARN–PRACTICE**, not an efficacy study. With a small, purposively selected student group, examine questions such as:

- Can students use the scenarios and tasks as intended?
- How do they use name components, rules, and 2D/3D structures while solving?
- What error patterns, usability barriers, or strategy differences emerge?
- Are the tasks, data collection, and measures feasible for a later classroom study?

Eye-tracking and think-aloud can support this study, but avoid overloading the protocol. Consider recording gaze during task performance and using a short, gaze-cued retrospective interview afterward; concurrent think-aloud can change the visual behavior being studied. Synchronize screen events, gaze, and interview prompts, and define stable areas of interest (AOIs) in advance. Treat the results as exploratory/process evidence, not proof that the software improves learning.

Relevant references found during discussion:

- Langner et al. (2025), defining AOIs in organic chemistry eye-tracking research: https://doi.org/10.1021/acs.jchemed.4c00830
- *An Integrated Approach to Characterizing Changes in Organic Chemistry Students’ Eye Movements* (2025): https://doi.org/10.1021/acs.jchemed.5c00849
- CONSORT guidance for pilot and feasibility studies: https://www.bmj.com/content/355/bmj.i5239

### Paper 2 — classroom learning and motivation study

Evaluate a defined LEARN–PRACTICE sequence in classroom implementation. Specify in advance:

- Primary learning outcomes, including transfer to previously unseen molecules.
- A suitable comparison condition if feasible (e.g. matched classes/sections or usual instruction).
- A motivation measure suitable for the learner population and language.
- Teacher implementation/fidelity procedures and analysis accounting for class-level variation.

A single-group pre/post study can describe classroom implementation and preliminary change, but by itself does not establish that the software caused the change. If making an effectiveness claim, select the design and recruitment target based on a power analysis. Avoid treating a small pilot sample as a powered effectiveness study.

### Possible Paper 3 — PLAY evaluation

Treat PLAY as a later, separate study. Compare it with PRACTICE on learning outcomes as well as engagement/motivation, and specify the learning mechanism being tested. It is not required for the first paper.

## 3. Immediate planning priorities

1. Align `docs/RESEARCH-PLAN.md` with the current LEARN–EXPLORE–PRACTICE–PLAY direction in `docs/LAYERS-PLAN.md`; the research plan preserves earlier representation-comparison questions and should be reconciled with the intended first study.
2. Stabilize and browser-verify v44 before collecting student data.
3. Fix the mismatch in `scenarios/ethene.scenario.json`: it is named for ethene, but its steps select ethane.
4. Reconcile the README’s stated 64 molecules with the code-review count of 63 named molecule entries; state clearly what is included in the count.
5. Audit the examples/names and the incomplete molecule data for intended pilot content. The review found incomplete main-chain data for several branched/ether/ester entries and no simple amine/imine examples, despite engine paths for those classes.
6. Define the paper-1 protocol and analysis before recruitment; determine participant selection and the rationale for the pilot sample from its feasibility/process aims.
7. Confirm institutional ethics approval, school permissions, consent/assent, and data handling before recruiting or recording students. Eye-tracking, screen/video, audio, and student response data require an agreed protection and access plan.
8. Assign collaborator roles: chemistry-content review, scenario co-design, classroom delivery, implementation observation, qualitative coding, and analysis. Use shared lesson/task instructions and independent coding checks where appropriate.

Two schedule-critical facts remain to confirm: **whether ethics approval is already in place** and **how many classes/sections can realistically participate this academic year**.

## 4. v44 review summary

Entry point is `index.html` → `mulermoc-nom-44.html`. The v44 set includes:

- `js/mulermoc-nom-core-44.js` — structure analysis, functional-group classification, main-chain selection, Greek naming.
- `js/mulermoc-nom-molview-44.js` — JSME/SVG and JSmol views, highlighting, numbering, export.
- `js/mulermoc-nom-teaching-44.js` — rule explanations, name-component interaction, narration, menus.
- `js/mulermoc-nom-scenario-44.js` — authoring, JSON import/export, and scenario presentation.

Strengths observed:

- A documented and commented naming pipeline with parallel 2D and 3D analysis paths.
- v44 fixes improve nitrogen classification, functional-group priority selection, multi-halogen output, and numbering/state robustness.
- Name-component selection links names to molecular fragments, numbering, explanations, rule tables, and optional Greek narration.
- Scenarios capture a rich display state and support teacher-authored sequences, molecule subsets, and presentation mode.
- The docs are unusually detailed for a developing educational project, especially `CHANGELOG.md`, `didactic-scenario-plan.md`, and `LAYERS-PLAN.md`.

Risks/limitations observed:

- The v44 changelog says browser verification is pending; scenario and 3D loading behavior needs end-to-end testing before classroom use.
- Many mutable globals are shared across modules, and analysis logic is duplicated between 2D and 3D paths.
- Some engine cases remain heuristic or out of scope; data coverage is narrower than the engine’s listed class support. Rings/aromatics are explicitly not supported.
- Accessibility needs work: Greek content is declared with `<html lang="en">`, several interactive controls are `div`s without clear keyboard/screen-reader semantics, and selection can rely on color.
- The interface depends on external CDN assets, which complicates offline use.

## 5. Similar projects discussed

- [Nomenclature101 — University of Ottawa](https://orgchem101.uottawa.ca/nom/en): extensive English/French customizable nomenclature quizzes, feedback, hints, and name/draw/functional-group learning objectives. Flynn et al. (2014): https://doi.org/10.1021/ed500353a
- [iOrgChem — Name Your Molecule](https://www.iorgchem.unito.it/index.php/en/exercises/nomenclature/name-your-molecule): draw a structure, propose a name, and compare the interpreted structure.
- [University of Calgary — Basic IUPAC Organic Nomenclature](https://www.chem.ucalgary.ca/courses/351/orgnom/index.html): structured content progression and practice drills.
- [ChemQuiz.net — Organic Nomenclature](https://chemquiz.net/org): configurable introductory practice.
- [Master Organic Chemistry nomenclature quizzes](https://www.masterorganicchemistry.com/organic-chemistry-practice-problems/organic-chemistry-nomenclature-quizzes): large topic-based practice collection.
- [ChemDoodle IUPAC naming demo](https://web.chemdoodle.com/demos/iupac-naming): structure-to-name and name-to-structure functionality.

These projects make a generic English quiz or naming service hard to differentiate. MuLERMoCs’ potential niche is the combination of Greek-first nomenclature instruction, component-level explanation, linked 2D/3D representation, narration, and teacher-authored scenarios, evaluated as a coherent framework.

## 6. Existing project documents to consult when resuming

- `README.md` — current baseline, layers, content scope, and team roles.
- `docs/CHANGELOG.md` — v44 changes and open browser-verification status.
- `docs/LAYERS-PLAN.md` — current layer contracts and planned research logging.
- `docs/didactic-scenario-plan.md` — scenario schema and player/authoring behavior.
- `docs/RESEARCH-PLAN.md` — theory and earlier research questions; reconcile with current framework.
- `docs/SESSION-NOTES.md` — technical working notes and known issues.
