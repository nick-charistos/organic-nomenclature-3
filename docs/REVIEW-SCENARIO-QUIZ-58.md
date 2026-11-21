# Review: scenario × quiz contract (v58 audit, read-only)

Date: 2026-11-16. Tree: v58 fork (byte-identical to v57 at fork; all
cites are `js/mulermoc-nom-*-58.js`). No code changed by this audit.

> **Status 2026-11-21 (`?v=58.48`):** this audit is the historical input to
> the implemented contract. The shipped schema is
> `step.quiz {kind, mode, modes, modeLabels, mol, prompt(legacy, unused),
> preSolved, types(deferred menu quizzes), startMode}` + `requireSolution`;
> `quizSnapshot` was retired (classic replay shows solved steps), and `modes`
> is the stored required set described in Q7/H1 of `docs/REVIEW-V58.md`.
> Later work supersedes the audit's Remove/read-only-list references: the
> master checkbox + binary tags (v58.31–34), switchable menu types (v58.37–38),
> step-scoped progress (v58.39) and the explicit start component with no
> Present auto-arm (v58.44) are the current contract. Editor split:
> menu-less molecule quizzes render real name tags (`quiz.mol` pinned);
> menu-carrying steps render component-type chips even with a selected
> molecule.

## Q1 — Step schema: nothing quiz-armed is stored
- `fScenarioCapture` (scenario-58.js:515) stores `nameAnalysisMode`
  (selected box mode), `selectedMol`, `mode2D`, chainIdx, style/show/audio/
  view3D/menuSubset/menuGroups — but NOT `MulerQuizTarget`, selection
  arrays, solved sets, tints, verdict, or prompt.
- `fScenarioUpdateStep` (6150) preserves only identity copy
  (n/title/note/styleText) + chrome permissions
  (`show.controls/nameSettings/naming/nameClick/nameEye`, menuGroups).
  "No schema change (scenarioVersion stays 1)" is asserted in comments.
- Consequence: a step captured mid-quiz remembers the *box*, never the
  *task*. Schema addition is required for any quiz step.

## Q2 — Apply path: box restored, task never
- `fScenarioApply` (1901): seeds `nameAnalysisMode` from the step, then
  `fSelectMol()` → `fShowNameAnalysis()` restores `.selected` + classic
  paint. No target restore, no selection restore, no solved restore.
- Net effect today: applying a step captured mid-quiz yields
  box-selected + target-null → exactly the reps-locked display
  (molview-58.js:1325) when select mode is armed, classic otherwise.
  Deterministic and safe, but it is amnesia, not continuity.
- `fScenarioGoAlignPick` touches menu picks only, never quiz state.
  Present navigation (Prev/Next/Play/deep links) "never touches picks".

## Q3 — Present-guard inventory (molview-58.js)
Select entry blocked: 1139 (`fToggleAtomSelect`). Pick paths dead:
2D click 5365, hover tick 2223 (+mousemove 5408), 3D callback 3020,
silent settle 5520 (`"skip"`), 3D-clear `live()` 5573, Esc 5447
(draft + Present guarded), double-tap via settle. Arming dead:
`fMulerQuizArmForBox` 4675, sticky re-arm 4555. Paint degraded:
`PushState` 5153 pushes component-only; `Push3D` 5261 skips;
merge 4962 is component-only; 3D picking script 3310 reports OFF.
`fMulerSelectRepsLocked` 1325 returns false in Present (Present has its
own guards; lock is an armed-mode concept).
Teaching layer: draft toast + hidden-box inert; arm path requires
`fMulerSelectActive()` (unreachable in Present) → classic + disarm.

## Q4 — nameClick chain in Present
- `show.nameClick=true` → boxes clickable (`locked` CSS class off,
  scenario-58.js:4025); `false` → clicks ignored, stored highlight +
  explanation still replay via `fScenarioClickNameBox` (1868: drops
  `.selected` first so the synthetic click takes the select branch;
  `__mulerQuizReplayBypass` guarantees no quiz-arm).
- In Present even an allowed box click can only classic-select:
  teaching handler → `ArmForBox` needs select-active → impossible →
  classic path + disarm. There is NO path from a Present box click to a
  live quiz today. Student mode needs an explicit exception here.

## Q5 — Step-change vs quiz state
- Molecule change: `PushState` drops selection contents + `fMulerQuizDisarm`
  (target cleared); sticky re-arm restores the quiz only if the restored
  box is quiz-capable + visible + unsolved (molview-58.js:4550ff).
- Same-molecule step: no disarm fires; a live target survives with
  molecule-level indices (safe), but a 2D-style change drops contents
  while keeping target + prompt (documented). Net: stepping today
  neither saves nor kills an armed quiz deterministically — the task
  is sticky by accident, not by contract.

## Q6 — Solved sets vs steps
- `__mulerQuizSolved` is keyed per-molecule, cleared on select toggle-off
  AND full reload; steps have no completion dimension. A solved box
  clicked in any step falls through to classic (never re-arms).
- Tints repaint on the show-analysis tail, which runs on every apply —
  including Present applies. Harmless today (nothing can be armed in
  Present, so no tints), but any student-mode exception must decide
  whether tints/progress show in Present. Recommend: yes, progress is
  lesson state; solved set stays per-molecule, completion ledger per
  (scenario-run, step).

## Q7 — Capture requirements for "save quiz as step"
Minimum viable `step.quiz`: `{ kind, mode, mol, prompt }` +
for snapshots `{ atoms, bonds, verdict }`. Sources, all live at box-click
time: `nameAnalysisMode` + `MulerQuizTarget` + `selectedMol` (+
`fMulerQuizPrompt` text, `MulerUserSelection` arrays, verdict text).
Authoring UX: capture button next to Update while a quiz is armed
(target live) or solved (snapshot); validate `preTgt.length` like the
arm gate so atom-less boxes stay classic-only.

## Q8 — Draft interplay
Capture blocked mid-draft (toast, scenario-58.js:515). Box clicks blocked
with toast (teaching). PresentBegin aborts minimizing runs. Draft entry
deactivates select mode + erases 3D paint. No step carries draft state.
Quiz steps need no new draft rules — drafts already trump everything.

## Q9 — Probe surface
No harness probe enters Present or scenario flows (mode-quiz and
explain-all run in authoring). Scenario quiz work needs new probes;
existing suite is unaffected unless shared functions change signature.

## Recommended schema (Stage B/C input, not implemented)
- `step.quiz = null | { kind: "nameComp"|"branch"|..., mode, prompt }`
  (live task; armed on apply when select mode armed, else recorded
  as the step's task for student mode).
- `step.quizSnapshot = null | { atoms, bonds, verdict }`
  (worked-example replay; paints without arming).
- Run ledger (not per-molecule solved set): per (scenario-run, step)
  completion. Reuse solved-set mechanics, new key.
- Student-mode exception (single chokepoint): allow picking in Present
  iff the current step has a live quiz task AND select-lite is armed by
  step apply — all existing Present guards stay for everything else.
