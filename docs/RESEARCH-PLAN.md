# Research Plan — MuLERMoCs-Anastasia
## Organic Nomenclature Interactive Learning Environment
## Created: 2026-05-02 | Status: PLANNING (re-anchored 2026-10-03 — see `docs/LAYERS-PLAN.md` §5)

**Team:** P1 (supervisor) + P2 (Drupal/research/stats/eye-tracking) + P3/P4 (content) + P5 (EPAL-vs-Lyceum school research) + P6 (co-supervision) — roles in `README.md`
**Institution:** Τμήμα Χημείας, ΑΠΘ

> **2026-10 note:** RQs below were written for rule-group navigation; the product is now LEARN-narrative + series-first with EPAL-vs-Lyceum motivation comparison. Logging schema v1 (research-primary, pseudonymous, teacher view secondary) lives in `docs/LAYERS-PLAN.md` §5; this doc keeps the theory (CTML/DeFT) and RQ history.

---

## Project Dual Purpose (+1)

1. **Educational application development** — Build useful interactive tools for chemistry students learning IUPAC organic nomenclature
2. **Educational research** — Use these applications as research instruments to investigate learning with multiple representations

---

## Theoretical Framework

### 1. Cognitive Theory of Multimedia Learning (CTML) — Mayer
Core predictions relevant to this project:
- **Multimedia principle**: Words + pictures produce better learning than words alone — predicts that 2D + name is better than name alone
- **Redundancy principle**: Adding a representation that carries the *same* information as an existing one can *hurt* learning (extra cognitive load, no new information) — directly tests whether 3D adds value over 2D
- **Split-attention effect**: When learners must mentally integrate two spatially separated representations, load increases — simultaneous 2D+3D may trigger this
- **Spatial contiguity principle**: Placing related representations close together reduces split-attention cost — the synchronized highlighting in the app is a direct implementation of this principle

The theoretical tension between multimedia principle and redundancy principle is the central question: does 3D carry *different* information from 2D (→ helps) or *redundant* information (→ hurts)?

### 2. DeFT Framework (Ainsworth, 1999, 2006)
Three functions of multiple representations in learning:

| Function | Description | App instantiation |
|---|---|---|
| **Complementary** | Each representation carries different information or supports different processes | Condensed (connectivity) + 3D (geometry/angles) carry different information |
| **Constraining** | Familiar representation helps interpret unfamiliar one | Condensed formula (textbook-familiar) constrains interpretation of skeletal formula |
| **Constructive** | Using both representations together builds deeper understanding neither alone provides | 2D + 3D synchronized highlighting during rule exploration |

DeFT also identifies **design parameters** that affect learning:
- Number of representations (2D only, 3D only, both)
- Form of each representation (condensed / expanded / skeletal)
- Relation between representations (synchronized vs independent)
- Learner control over representation (free switching vs fixed condition)

---

## Research Questions

### Primary RQs

**RQ1 — 2D vs 3D**
*Does learning IUPAC nomenclature component identification differ between 2D-only and 3D-only representations?*
- CTML prediction: depends on whether 3D carries additional spatial information that aids learning
- DeFT prediction: 3D is complementary for geometry but may not help for the symbolic naming task

**RQ2 — Which 2D representation?**
*Which 2D representation (condensed / expanded / skeletal) best supports component identification learning?*
- Note: condensed and expanded differ not just in detail level but in familiarity (students encounter condensed in textbooks first)
- Familiarity must be measured and controlled as a covariate
- DeFT constraining function predicts condensed → skeletal transfer is facilitated

**RQ3 — Simultaneous vs single representation**
*Does presenting 2D and 3D simultaneously facilitate or hinder learning compared to either alone?*
- CTML split-attention prediction: simultaneous hurts unless spatial contiguity is high
- DeFT constructive function prediction: simultaneous helps if representations carry complementary information
- Must be **between-subjects** design to avoid cross-condition contamination

**RQ4 — Learner strategies with multiple representations**
*How do learners use and combine multiple representations (text/name components, 2D, 3D) during interactive nomenclature tasks?*
- Primary method: eye-tracking (gaze transitions between AOIs)
- Secondary method: think-aloud protocol (verbal protocols)
- This is the most theoretically original question — learner *agency* over representations is underexplored in CTML/DeFT literature

### Secondary RQs (future / PhD scope)
- Does prior chemistry knowledge moderate the effect of representation type? (expertise reversal effect)
- Do learners who voluntarily switch representations during study outperform those who stay with one?
- Does the order of representation exposure matter (2D first then 3D vs reverse)?

---

## Methodology

### Participants
- Greek secondary or first-year university chemistry students
- Measure and report: prior chemistry knowledge, spatial ability (mental rotation test), age, gender
- Sample size: power analysis required per study; estimate n=30–40 per condition for between-subjects designs

### Design
- RQ1, RQ2, RQ3: **between-subjects** (each participant sees only one representation condition)
  - Rationale: once a student has learned with one representation, that learning contaminates performance with another
  - Counterbalanced within-subjects is possible only for *transfer* test across different molecule sets, not for the same molecules
- RQ4: **within-session observational** — no condition manipulation, observe natural usage patterns

### Instruments

**Independent variables (manipulated)**
- Representation condition: {2D-condensed | 2D-expanded | 2D-skeletal | 3D | 2D+3D simultaneous}
- Quiz scenario: {A | B | C | D | E} (see DEVELOPMENT-PLAN.md)
- Rule group: {0–8} (complexity level)

**Dependent variables (measured)**
- Learning performance: accuracy on retention test (delayed, 1 week post-session) and transfer test (unseen molecules)
- In-task performance: logged by app (accuracy, attempts, response time per component)
- Cognitive load: NASA-TLX or Paas 1-item subjective rating after each block
- Eye-tracking (where available): fixation duration per AOI, gaze transitions, first fixation latency

**Covariates**
- Prior knowledge: pre-test on organic nomenclature
- Spatial ability: Vandenberg & Kuse Mental Rotation Test (or abbreviated version)
- Representation familiarity: self-report (how often have you seen skeletal formulas before?)

### Procedure (per participant)
1. Informed consent + demographics
2. Spatial ability test + prior knowledge pre-test (15 min)
3. Calibration (eye-tracker, if used)
4. Study phase: assigned condition, work through rule-structured example set (30 min)
5. Immediate post-test (retention + transfer) (15 min)
6. Cognitive load ratings
7. [Optional] stimulated recall: watch own gaze replay, verbalize what they were thinking
8. Delayed retention test at 1 week (online, unmonitored)

### Eye-Tracking Protocol
- Equipment: Remote eye-tracker (Tobii Pro recommended) — **not** browser-based (WebGazer unreliable with dynamic SVG redraws)
- AOIs (stable across all molecules due to fixed 3-column layout):
  - `AOI_menu`: left menu column
  - `AOI_2D`: JSME SVG viewer
  - `AOI_3D`: JSmol viewer
  - `AOI_nameBoxes`: name component boxes
  - `AOI_explainText`: explanation text panel
  - `AOI_ruleTable`: reference table
- Key gaze measures:
  - **Fixation count and duration** per AOI (what students attend to)
  - **Transition matrix** between AOIs (how students integrate representations)
  - **First fixation** on name box vs molecule (do students start from the name or the structure?)
  - **Scanpath similarity** (do successful and unsuccessful students use different strategies?)
- Analysis: AOI-level summary statistics; transition entropy as a measure of integration behavior; compare scanpaths between high/low performers

### Think-Aloud Protocol (subset of participants)
- Concurrent think-aloud during study phase (adds ~20 min, reduces n needed for qualitative saturation)
- Screen + audio recording
- Transcription + coding scheme based on DeFT functions:
  - *Complementary use*: student explicitly references information only available in one representation
  - *Constraining use*: student uses familiar representation to interpret unfamiliar one
  - *Constructive use*: student draws a conclusion only possible by combining both
  - *Switching cost*: student expresses confusion or disorientation when moving between representations

---

## Study Distribution (MSc / PhD)

### MSc Student 1 — 2D Representation Comparison
- **RQ**: Which 2D representation (condensed / expanded / skeletal) best supports component identification?
- **Design**: 3-condition between-subjects (condensed vs expanded vs skeletal)
- **App requirement**: Representation locked at session start (research mode); app logs all interactions
- **Instruments**: Pre/post test, cognitive load scale, behavioral log
- **Eye-tracking**: Optional (add if equipment available)
- **Expected output**: 1 journal article (CERP or Journal of Chemical Education)

### MSc Student 2 — Simultaneous vs Single Representation
- **RQ**: Does simultaneous 2D+3D presentation facilitate or hinder learning vs 2D alone or 3D alone?
- **Design**: 3-condition between-subjects (2D-condensed only / 3D only / 2D+3D simultaneous)
- **App requirement**: Research mode with condition-locked viewer visibility; 3D viewer hidden in 2D-only condition
- **Instruments**: Pre/post test, retention test, cognitive load scale, behavioral log
- **Eye-tracking**: Strongly recommended — gaze transitions between 2D and 3D are the key measure
- **Expected output**: 1 journal article (Computers & Education or Learning and Instruction)

### PhD Candidate (future)
- **RQ**: How do learners use and combine multiple representations? What cognitive strategies predict learning outcomes?
- **Design**: Observational within RQ3 simultaneous condition; mixed-methods (eye-tracking + think-aloud + stimulated recall)
- **Additional studies**: Expertise reversal (novice vs intermediate chemistry students), longitudinal (does strategy change across sessions?)
- **Expected output**: 3–4 journal articles + thesis

---

## Required App Features for Research (must be in DEVELOPMENT-PLAN.md)

These must be designed into the quiz SPA **before** any data collection, not retrofitted:

1. **Research mode flag** (`researchMode = true`): set at session URL parameter or hidden admin panel
2. **Condition lock**: representation type set once at session start, cannot be changed by participant
3. **Complete event log**: every interaction (click, hover, representation switch, time on task) timestamped
4. **Participant ID field**: entered at session start, included in all log entries
5. **Session export**: researcher can download full JSON log or CSV at end of session
6. **Viewer visibility control**: 2D viewer, 3D viewer, or both can be shown/hidden per condition
7. **No feedback condition**: option to suppress correct/incorrect feedback during study phase (for retention test validity)
8. **Transfer test molecules**: a separate set of molecules not used during study phase (currently not in data_37.js — needs to be added)

---

## Key References (to develop)

**CTML:**
- Mayer, R.E. (2009). *Multimedia Learning* (2nd ed.). Cambridge University Press.
- Mayer, R.E. (2019). Thirty years of research on online learning. *Applied Cognitive Psychology*, 33(2), 152–159.

**DeFT:**
- Ainsworth, S. (1999). The functions of multiple representations. *Computers & Education*, 33(2–3), 131–152.
- Ainsworth, S. (2006). DeFT: A conceptual framework for considering learning with multiple representations. *Learning and Instruction*, 16(3), 183–198.

**Chemistry / molecular representations:**
- Wu, H.-K., & Shah, P. (2004). Exploring visuospatial thinking in chemistry learning. *Science Education*, 88(3), 465–492.
- Stull, A.T., & Mayer, R.E. (2007). Learning by doing versus learning by viewing. *Journal of Educational Psychology*, 99(4), 843–854.
- Rau, M.A. (2017). Conditions for the effectiveness of multiple visual representations in enhancing STEM learning. *Educational Psychology Review*, 29(4), 717–761.

**Eye-tracking in education:**
- van Gog, T., & Scheiter, K. (2010). Eye tracking as a tool to study and enhance multimedia learning. *Learning and Instruction*, 20(2), 95–99.
- Alemdag, E., & Cagiltay, K. (2018). A systematic review of eye tracking research on multimedia learning. *Computers & Education*, 125, 413–428.

---

## Open Research Design Questions
1. Should the delayed retention test be administered online (uncontrolled) or in-lab (controlled)?
2. For RQ4 think-aloud: concurrent vs retrospective protocol? (concurrent = more valid; retrospective = less disruptive to task)
3. What constitutes a valid transfer test for this domain — a structurally novel molecule, a novel rule application, or a different representation of a studied molecule?
4. Ethics approval scope: student population, data storage, GDPR compliance for logging (especially if server-side)
5. Should spatial ability be a covariate or a stratification variable for group assignment?

