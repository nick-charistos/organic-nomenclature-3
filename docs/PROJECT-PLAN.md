# MuLERMoCs — Project Plan
## Multiple-Level External Representations for Molecular Concepts
### Organic Chemistry Interactive Learning & Research Platform

**Principal Investigator:** N. Charistos, Department of Chemistry, ΑΠΘ
**Status:** Active development | v43 baseline (64 molecules, scenario scaffold; v42 frozen in repo2)
**Last updated:** 2026-10-03

> **2026-10 update:** vision is now twofold+1 (community tool + research publications + platform for isomerism/reactions) with four layers in LEARN-first order — LEARN → EXPLORE-lite → PRACTICE → PLAY. The static chemistry app is embedded in Drupal; logging is research-primary. Source of truth for layers: `docs/LAYERS-PLAN.md`. Team P1–P6 roles and timeline are defined there and in `README.md`. What follows below is the original plan text, kept for theory and history; version/count claims predating v43 are superseded.

---

## Vision

Build a theoretically grounded, research-instrumented interactive platform for organic chemistry learning — covering nomenclature, isomerism, and reactions — that serves both Greek chemistry students and the international chemistry education research community.

The platform generates Greek IUPAC names algorithmically, displays molecules in multiple representations (2D condensed, expanded, annotated skeletal, skeletal, 3D), and supports interactive quiz scenarios designed for both learning and research data collection.

---

## What Makes This Different

| Feature | Commercial tools | chemtube3d.com | MuLERMoCs |
|---|---|---|---|
| Algorithmic IUPAC naming | No | No | Yes |
| Multiple 2D representation modes | No | No | Yes |
| Synchronized 2D + 3D highlighting | No | No | Yes |
| Greek language | No | No | Yes |
| Research instrumentation (logging, condition lock) | No | No | Phased (schema v1 in `docs/LAYERS-PLAN.md`) |
| Quiz interaction scenarios | No | No | Phased (PRACTICE 3 types v1 → PLAY) |
| Quantum-accurate IRC trajectories (reactions) | No | Partial | Planned |

---

## Theoretical Framework

**CTML** (Mayer, 2009) — Cognitive Theory of Multimedia Learning
- Guides when multiple representations help vs. hurt learning
- Spatial contiguity principle → synchronized highlighting design

**DeFT** (Ainsworth, 1999, 2006) — Design, Functions, Tasks framework
- Three functions of multiple representations: complementary, constraining, constructive
- Constraining function → the representation fading sequence (core original contribution)

**The Representation Fading Sequence** *(original design principle)*
```
Condensed → Expanded → Annotated Skeletal → Pure Skeletal → 3D
CH₃CH₂OH    (explicit H)   (C visible on         (C implicit)    (spatial
(textbook)               zig-zag geometry)                       geometry)
```
Each step removes one scaffolding layer. Familiar representations constrain interpretation of unfamiliar ones. **Not previously proposed or tested in chemistry education literature.**

---

## Project Modules

```
┌─────────────────────────────────────────────────────────────────┐
│  MODULE 1: Organic Nomenclature          [ACTIVE — v37 stable]  │
├─────────────────────────────────────────────────────────────────┤
│  MODULE 2: Isomerism                     [PLANNED — Phase 3]    │
├─────────────────────────────────────────────────────────────────┤
│  MODULE 3: Organic Reactions             [PLANNED — Phase 4]    │
└─────────────────────────────────────────────────────────────────┘
         ↓ All modules share the same JS engine, viewers, and quiz infrastructure
```

---

## Module 1: Organic Nomenclature — Current State (v43; v37 text below kept for history)

### What exists
- **64 curated molecules** (v43; incl. 2 ethers + 2 esters) covering homologous-series menu groups (series-first, rules secondary)
- **Algorithmic IUPAC engine** — DFS main chain determination, 3-tier locant rules, Greek euphony; ester two-word naming + ether systematic/common toggle since v40/v41
- **5 representation modes** — condensed, expanded, annotated skeletal (partial), skeletal, 3D
- **Synchronized highlighting** — same atom/bond highlighted simultaneously in 2D and 3D
- **Teaching layer** — rule-based explanations, component name boxes, TTS narration in Greek
- **Didactic scenarios (v43)** — additive `scenario-43.js`: snapshot capture/validate/apply/export/import, `?scenario=&present=#step=` playback, exit restores full chrome
- **Technical validation** — algorithm verified against the curated set; tertiary-amine detection still needs explicit testing

### Known gaps to fill (immediate work)
- Annotated skeletal representation: `fMakeAnnotatedSkeletal()` — completes the fading sequence
- Atom click targets: `fAddAtomClickTargets()` — enables PRACTICE/PLAY exercises (deferred to Phase 3 per `docs/LAYERS-PLAN.md`)
- Branched molecule naming (alkyl substituents) — extends engine to full organic curriculum
- Ether naming — saturated acyclic mono-ethers done in v40 (systematic + common, `ethyl_methyl_ether` + `dimethylether`); remaining: unsaturated ether chains
- Ester naming — detection/naming/highlight done since v41 (`ethanoic_methyl_ester`, `propanoic_methyl_ester`); remaining: wider coverage, unsaturated chains

---

## Development Roadmap

### Phase 1 — Complete Nomenclature Tool + First Quiz Scenario
*Timeline: ~3 months*

- [ ] `fMakeAnnotatedSkeletal()` → annotated skeletal representation complete
- [ ] `fAddAtomClickTargets()` → atom/bond click infrastructure on 2D viewer
- [ ] JSmol click callback → atom/bond selection on 3D viewer
- [ ] Quiz Scenario A or D → one working click-based identification scenario
- [ ] Think-aloud pilot study → 6–8 students, one session each

**Deliverable:** Complete fading sequence + first interactive quiz scenario + pilot data

---

### Phase 2 — Full Quiz SPA + Research Mode + First MSc Studies
*Timeline: ~12 months*

- [ ] Full quiz SPA (`quiz-nom-1.html`) with all 5 scenarios:
  - **A** — Component identification: click atoms matching a named component
  - **B** — Name assembly: arrange shuffled tiles in correct order
  - **C** — Multiple choice: select correct name from 4 options
  - **D** — Reverse direction: given name component, identify atoms
  - **E** — Timed challenge: rapid-fire with countdown
- [ ] Session logging (`mulermoc-nom-log-1.js`) — per-attempt schema, localStorage, CSV export
- [ ] Research mode — condition lock, participant ID, no-feedback option, viewer visibility control
- [ ] Branched molecule naming (alkyl substituents)
- [x] Ether naming — saturated acyclic mono-ethers in v40 (systematic + common); symmetric example and unsaturated chains still open
- [ ] Expanded molecule database (target: 100+ molecules)
- [ ] Transfer-test molecule set (separate from study set — required for valid retention tests)
- [ ] Ethics approval (GDPR compliance for student interaction logging)
- [ ] **MSc Study 1** — Which 2D representation? (condensed vs expanded vs skeletal, between-subjects)
- [ ] **MSc Study 2** — Simultaneous vs single representation? (2D only vs 3D only vs 2D+3D)

**Deliverable:** Full research-instrumented quiz platform + first two MSc studies underway

---

### Phase 3 — Platform Expansion + PhD Research
*Timeline: ~24 months*

- [ ] Ester naming
- [ ] Extended molecule database (target: 150–200 molecules, full secondary school curriculum)
- [ ] **Error detection** quiz scenario — identify which name component is wrong
- [ ] **Comparison** and **classification** quiz scenarios
- [ ] Gamification layer (points, adaptive sequencing) — togglable, off in research mode
- [ ] **MSc Study 3** — Interaction type comparison (MC vs click vs build vs error detection)
- [ ] **PhD research** — eye-tracking + think-aloud, representation integration strategies
- [ ] Isomerism module — constitutional and stereoisomerism, E/Z, chirality (shared engine)
- [ ] **Dedicated Drupal platform** — mulermocs.chem.auth.gr (standalone site, ΑΠΘ Chemistry domain)
  - Teacher dashboard: molecule library, filter by class/rule/complexity
  - Teacher quiz builder: select molecules + lock representation condition
  - Generates shareable quiz link for students
  - Student interaction data exportable per session
  - User accounts, class management

**Deliverable:** Full platform live at mulermocs.chem.auth.gr + PhD program + 4–6 publications

---

### Phase 4 — Organic Reactions Module
*Timeline: 3–5 years*

- [ ] Reaction database: simple organic reactions (SN2, E2, addition to carbonyl, etc.)
- [ ] Gaussian IRC calculations → multi-frame trajectory files (offline, PI expertise)
- [ ] JSmol 3D reaction animation (curly arrows natively supported by JSmol)
- [ ] Hand-drawn SVG 2D mechanism diagrams + JSmol 3D synchronized
  *(model proven by chemtube3d.com, University of Liverpool)*
- [ ] Quiz scenarios for reactions (identify nucleophile, predict stereochemistry, select mechanism step)
- [ ] **Research: reaction mechanism learning** — does Gaussian-accurate IRC animation improve understanding vs. static arrow-pushing?

**Differentiator from chemtube3d.com:** Research instrumentation, quiz interaction scenarios, quantum-accurate IRC geometries, full curriculum integration (nomenclature → isomerism → reactions), Greek language.

---

## Research Program

### Three Independent Research Axes

```
Axis 1: REPRESENTATION TYPE          Axis 2: INTERACTION TYPE         Axis 3: GAMIFICATION
────────────────────────────         ─────────────────────────         ──────────────────────
RQ1: 2D vs 3D                        RQ5: Which interaction type       RQ6: Does gamification
RQ2: Which 2D representation?              leads to best retention?          improve outcomes?
RQ3: Simultaneous vs single?         MC → click → build → error        Points / badges /
RQ4: Learner strategies                    detection                    adaptive sequencing
     (eye-tracking)                  (testing effect / desirable       vs plain quiz
                                      difficulties predictions)
     MSc 1, MSc 2, PhD                     MSc 3 / PhD                      Future study
```

### Study Designs
- **RQ1, RQ2, RQ3:** Between-subjects (each participant sees only one representation condition)
- **RQ4:** Within-session observational — eye-tracking + think-aloud
- **RQ5:** Between-subjects (interaction type as condition)
- All studies: pre-test (prior knowledge + spatial ability) + immediate post-test + 1-week delayed retention

### Target Journals
| Study | Target journal |
|---|---|
| DBR tool paper | Chemistry Education Research and Practice (CERP) |
| RQ2 (which 2D?) | Journal of Chemical Education (JChemEd) |
| RQ3 (simultaneous vs single) | Computers & Education |
| RQ4 (eye-tracking strategies) | Learning and Instruction |
| RQ5 (interaction type) | CERP or JChemEd |
| Reactions module paper | JChemEd |

**Estimated output: 6–8 peer-reviewed publications over 5–7 years**

---

## Team & Roles

| Role | Contribution |
|---|---|
| **PI** (N. Charistos) | Engine development, molecule database, research design, Gaussian IRC calculations |
| **Drupal collaborator** | Platform integration, mulermocs.chem.auth.gr deployment, teacher quiz builder |
| **MSc Student 1** | RQ2 study (2D representation comparison) — thesis |
| **MSc Student 2** | RQ3 study (simultaneous vs single) — thesis |
| **PhD Candidate** | RQ4 (eye-tracking + think-aloud) + secondary RQs — dissertation |
| **MSc Student 3** (future) | RQ5 (interaction type) — thesis |

---

## First Publication: DBR Tool Paper

**Title (draft):** *"Designing for Multiple Representations in Organic Nomenclature Learning: A Design-Based Research Approach"*
**Target:** Chemistry Education Research and Practice (CERP)
**Length:** ~7,500 words

**Key contribution:** The representation fading sequence as a novel, DeFT-derived pedagogical design principle — not previously proposed or empirically tested in chemistry education.

**Prerequisites before submission:**
1. `fMakeAnnotatedSkeletal()` implemented *(completes fading sequence)*
2. One click-based quiz scenario working *(demonstrates research instrument)*
3. Think-aloud pilot data collected and coded *(qualitative evidence of tool use)*

**Timeline:** 3–4 months from pilot data collection to submission

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
│  jsme-nick-nomeclature-moc2-data_37.js                      │
│  58 molecules: MOL strings, main chain, 3D SDF paths        │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    CORE ENGINE                              │
│  mulermoc-nom-core-37.js  (pure JS, no DOM)                 │
│  fAnalyseStructure → fDetectMolType → fCalcMainChain        │
│  → fGuessName → Greek IUPAC name + component list          │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌──────────────────┬──────────────────┬───────────────────────┐
│   VIEWER LAYER   │  TEACHING LAYER  │     QUIZ LAYER        │
│  molview-37.js   │  teaching-37.js  │  (quiz-nom-1.js)      │
│  JSME (2D)       │  Rule text/tables│  5 scenarios          │
│  JSmol (3D)      │  TTS narration   │  Session logging      │
│  Snap.svg        │  Name boxes      │  Research mode        │
│  Highlighting    │  jQuery events   │  CSV export           │
└──────────────────┴──────────────────┴───────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                 PLATFORM LAYER (Phase 3)                    │
│  mulermocs.chem.auth.gr — Drupal                                │
│  Teacher quiz builder, molecule library, class management   │
└─────────────────────────────────────────────────────────────┘
```

---

## Immediate Next Steps

1. Implement `fMakeAnnotatedSkeletal()` in molview — completes the 5-step fading sequence
2. Implement `fAddAtomClickTargets()` — atom/bond click infrastructure
3. Build one click-based quiz scenario (Scenario A: click atoms matching a name component)
4. Run think-aloud pilot with 6–8 students
5. Write DBR tool paper — submit to CERP


 Representations for Molecular Concepts
