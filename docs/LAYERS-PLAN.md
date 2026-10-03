# LAYERS-PLAN — LEARN → EXPLORE-lite → PRACTICE → PLAY

Source of truth for the four layers of the twofold+1 vision (see `README.md`):
1. a useful community tool, 2. ongoing research publications, 3. (+1) platform for isomerism/reactions and beyond.
Baseline: **v43** (`index.html` → `mulermoc-nom-43.html`, scenario scaffold, exit restores full chrome).
Hosting: **embedded static** — the chemistry app stays dependency-free static; Drupal owns scenarios, exercises/quizzes, users/sessions, logging, exports.

---

## 1. Layer contracts

| Layer | Entry | Chrome / behavior | Owner | Exit criteria |
|---|---|---|---|---|
| **LEARN** | `mulermoc-nom-43.html?scenario=scenarios/<name>.json&present=1#step=N` (hosted) or Import (offline/`file://`) | linear snapshots (`selectedMol + show.* + note`); menu hidden in present; Exit restores menu (`menu-open`) + both viewers + all bars; in-memory steps kept | P1 (player) + P3 (content) + P2-lite (listing) | teacher unfamiliar with code can Present + Exit in class |
| **EXPLORE** | `mulermoc-nom-43.html` (no params) | free browsing, left menu (series-first), all DB molecules | P1 (app) + P4→P3 (molecules) | menu search works; scenario-needed molecules present |
| **PRACTICE** | TBD (`?exercise=` + `itemType`) on the same engine | until-correct feedback loop, attempt counting; reuses `fSelectMol` + name-box click path | P1 + P3 (wording) + P2 (schema) | 3 types v1 usable in small-class pilots |
| **PLAY** | TBD (Drupal quiz session) | gamified items, score/streak/levels v1; events queued offline, synced to Drupal | P2 leads, P1 thin client; P5/P6 research | response+time log → CSV; EPAL-vs-Lyceum analysis possible |

`show.*`, `scenarioVersion: 1`, and validation policy are defined in `docs/didactic-scenario-plan.md`.
`externalLinks{}`, exercise `itemType`, and log `domain` reserve `nomenclature | isomerism | reactions`.
Scenario schema and log events reserve an optional `lang` field (`gr` default; no implementation until Phase 5).

---

## 2. LEARN v1.1 — stored library (first)

* 3–5 scenarios (alkanes → alcohols → ethers → esters) under `scenarios/*.json`.
* Two-level `note` convention: EPAL-simple first / Lyceum-full extension (P3 authors; P5 compares).
* Curated `moveto` per step (captured with rotate off).
* Authoring flow: Save → Export → Present → Exit (Exit = full restore).

## 3. EXPLORE-lite (bounded)

* Only molecules named by LEARN scenarios + known gaps (unsaturated ethers/esters); cap ~15.
* Per molecule: condensed + expanded + skeletal MOLs + 3D SDF + `mainChain`/`moveto` check + Greek name audit.
* Menu search/filter; carbon-count ordering preserved.
* Full DB expansion (100+) is a standing P4 workstream, not a phase gate.

## 4. PRACTICE v1 (3 exercise types max)

1. `name-from-structure` — given structure, type the Greek IUPAC name (normalized comparison: case/whitespace/euphony variants per P3 spec).
2. `structure-from-name` — given name, build/select structure (JSME check path).
3. `click-the-group` — click the functional-group atoms (needs `fAddAtomClickTargets`, deferred from v37 gaps).
* Until-correct loop with P3-worded feedback; attempts counted client-side, synced later.

## 5. PLAY + research logging v1 (research-primary)

* App: `researchMode` flag, event queue with offline retry; no PII in static app.
* Drupal (P2): auth/session (pseudonymous codes), storage, teacher view (secondary), researcher CSV export (primary).
* Event fields v1: `participant, session, layer, domain (=nomenclature), itemId, itemType, response, correct, attempts, tStart, tEnd, durationMs, mode2D, showViewers, schoolType (joined in Drupal)`.
* Design: EPAL (vocational) vs general Lyceum comparison on learning + motivation (P5 executes, P6 co-supervises, P2 stats); eye-tracking on a subsample only.
* Ethics/consent: P2/P5 responsibility; documented before any school data collection.

---

## 6. Timeline + ownership

| Phase | Work | Who | Time |
|---|---|---|---|
| 1 LEARN pilot | harden player (`moveto` guard, `zap` review), `scenarios/` + index, authoring docs; 3–5 scenarios | P1 + P3 (+ P2-lite) | 4–6 wk |
| 2 EXPLORE-lite | ~15 molecules + search | P4 → P3 → P1; P5/P6 protocol draft | 6–8 wk (overlaps Phase 1 tail) |
| 3 PRACTICE | 3 types v1 + feedback wording + schema | P1 + P3 + P2 | 6–10 wk |
| 4 PLAY + research | logging client + Drupal API/dashboard/CSV + EPAL-vs-Lyceum study | P2 leads, P1 supports; P5/P6 execute | 8–12 wk |

Total to 4-layer pilot: ~6–9 months with this team. LEARN-pilot usable this semester.

## 7. Open decisions

* Pupil pseudonym scheme (Drupal-generated codes?) — P2, blocks PLAY logging.
* PRACTICE normalization tolerance (accents, euphony variants) — P3 spec + P1.
* First `scenarios/` titles — P3 proposal (recommend starting from ethers/esters).
* Engine de-dup (`*-42`/`*-43` copies, `state.js`, `eval` removal) before PRACTICE to avoid building on fragile globals.

## 8. Phase 5 — English upgrade (conditional, after the Greek pilot)

Greek first this year (Phases 1–4 above). If accomplished, upgrade to a full English version for teachers and learners — same otterbein-style play: the best-in-class answer to one hard topic (multirepresentational nomenclature), spread via the submitted paper as launch vehicle.

* **E1 — `?lang=` infrastructure (~1 wk):** central `STRINGS` table (`gr` default, per-key fallback to GR so partial EN never blanks the UI); `?lang=en` flag persisted in scenario URLs (`?scenario=…&lang=en&present=1#step=N`); TTS voice pick per lang. One codebase — no `*-en.html` copy. No chemistry changes.
* **E2 — English name assembly (2–4 wk, the real work):** parallel `fGuessNameEN` path (no Greek euphony connector, English substituent conventions, common-name handling); validated molecule-by-molecule against the same 64-set; Greek output byte-identical after (regression gate). P1 + P4.
* **E3 — EN scenario library (parallel, P3):** 3–5 EN-authored scenarios (English classroom narratives, not translations), same schema + two-level notes.
* **E4 — Release as companion:** stable EN entry link + short teacher guide + citation to the submitted paper.
* **Entry criteria:** Greek LEARN pilot done + paper submitted + engine frozen. **Estimate:** ~6–10 weeks. **Owner:** P1 + P3 + P4; P2 aligns the paper to cite the EN link.
