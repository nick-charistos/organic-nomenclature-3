# Review — v58 (scenario quiz contract)

Date: 2026-11-18. Tree: `a9e598f` (`?v=58.10`) at review time. Status:
**resolved in `?v=58.11`** — see "Resolution" below; the findings are kept
verbatim as the record of what was wrong and why.
Scope: `11d5886` (fork) → `a9e598f`; the real delta is `72699c2`,
`29287c3`, `bf2aca5`, `a9e598f` + the new probe.

---

## Resolution (v58.11)

Agreed plan (D1–D8) implemented in one pass; probe rewritten and green.

| Item | Resolution |
|---|---|
| **H1** all-`.quizTodo` re-scopes the task | **Reframed**: the rule is the owner's 58.8 decision, so it was kept and made explicit. Steps now capture `quiz.modes` + `quiz.modeLabels` from their own molecule; `fMulerQuizTodoModes(required)` filters gate/tint/auto-arm; the drawer quiz row lists the components. Deferred menu steps still compute per picked molecule. Engine capability changes can no longer silently re-scope a lesson. |
| **H2** `Update` retargets/destroys the task | `fScenarioUpdateStep` keeps `old.quiz` (clone) whenever the capture had no quiz signal; the "quiz kept" note is appended to the update toast. Removal is an explicit `Remove` button in the quiz row (new `data-sc-role="quiz-remove"`). The destructive "disarmed Update" flow is retired. |
| **H3** probe red | Rewritten for the contract: `rowButton(p, …)`, `lang:"en"` steps, all-required gate via `solveAllTodos`, plus new sections (stored set, Remove, pre-pick gate, jump clamp, authored pre-solved restore). Green, `PAGEERRORS:[]`. Added to the harness README. |
| **M1** dead gate fallback | Removed; the todo set comes from the step and a `null` set never counts as done. |
| **M2** missing DOM = completed / fail-open | `fMulerQuizTodoModes` returns `null` (unknown) when the naming panel is absent; gate requires a known empty set; the Present guard's outer catch now returns *blocked*. |
| **M3** hot-path recomputation | The todo set is computed once per guard (single `fScenarioQuizTodo`), and the paint filter resolves the step once. No memo cache (not needed at these sizes). |
| **M4** empty `.freeComp` rule | Rule removed; the class is documented as a state marker. |
| **M5** `mode` unvalidated, dead `prompt`, snapshot docs | Unknown modes warn on import (forward-compatible: kept). `prompt` is no longer written. `quizSnapshot` retired wording reconciled in the plan doc; README/CHANGELOG describe the real schema. |
| **M6** quiz-intent leak | Cleared on Present exit and in the non-quiz teardown (entry already cleared it). |
| **M7** `preSolved` scope | Captured only for the step's required modes and omitted when empty. |
| **N1** menu step skippable before a pick | Gate blocks forward moves on a deferred step until a molecule is loaded. |
| **N2** forward jumps bypass the gate | `fScenarioGo` and the hash handler clamp to the next step; cold `?present=1#step=N` teacher links enter directly via `fScenarioPresentBegin`. |
| **N3** debounce/armed-once | Debounce keyed by `presentId#index|mode|mol` and moved after the solved-display branch. |
| New (found while testing) | **Esc on a quiz step exited the whole presentation** (scenario key handler), fighting the student-mode "clear picks" Esc. Quiz steps now swallow the presenter exit. Also: the solved display never repainted the tint classes (`.freeComp` missing) — `fMulerQuizShowSolved` now repaints. |
| Regression (58.8, found by the suite) | `probe-compact-main` was red from 58.8: the "fresh arm starts blank" reset ran in authoring and wiped the fragment→anchor normalization, so compacted-label main-chain picks armed empty (badge/paint/toggle/exact drift). The reset is now student-mode only; probe green. |
| Student hover (58.12, owner report) | `fMulerHoverTick` + its `mousemove` binder still had the pre-student-mode raw Present guard; the student-aware check sat below the tick's raw one and was dead. Both use `fMulerSelectPresentBlocked()` now. |
| 3D picking on later quiz steps (58.12, owner report) | Picking mode was only written by the 3D load tail (computed before the arm / while select is off) and by a reps-lock transition that never fires in Present. `fMulerSelectSync3DPicking` is idempotent and now runs from the repaint tail, disarm and `jmol_isReady`; load writers record the appended tail. Verified with `show picking`: `atom` on every quiz step, `off` on passive, 0 sends on idle repaints. |
| Solved 3D green erased by a 2D pick clear (58.13, owner report) | 3D cyan and classic green share the atom-color channel; `fMulerSelectClear` wiped it unconditionally while armed, and the v57 assumption ("green never reaches this path") is false in student mode. Now: wipe only when 3D picks existed, then re-assert the classic display (`fMulerRestoreClassic3D`, reward opt-in, no-op on a live target); toggle-to-empty restores too. Probe asserts wipe→green and no-pick-clear→no 3D script. |

Verification: `probe-scenario-quiz` (13 sections) green; `probe-quiz`,
`probe-final`, `probe-mode-quiz`, `probe-explain-all`, `probe-fg-quiz`,
`probe-loc-quiz`, `probe-bond-quiz`, `probe-branch-quiz`,
`probe-coverage56`, `probe-smoke56`, `probe-compact-main`, `probe-shift`,
`probe-skel-joints` green; `node --check` clean on the three changed JS
files. Owner-side browser matrix remains (drawer list/Remove, Esc, revisit,
menu arm, non-quiz step).

---

## Verification performed (and re-runnable)

| Check | Result |
|---|---|
| `node --check` on all 9 `js/*-58.js` | clean |
| `probe-final.js` | `failures: []`, no page errors |
| `probe-quiz.js` (main chain, authoring) | `failures: []`, no page errors |
| `probe-scenario-quiz.js` | **crashes** at line 736; after patching that one call: **25 failures** |
| Focused repros (Update retarget/wipe, todo sets, `preSolved` → Present) | reproduced (see H1/H2) |

How to re-run:

```
cd tools/muler-harness
node server.js 8901                     # background; needs node + Chrome
node probe-final.js
node probe-quiz.js
node probe-scenario-quiz.js
```

Harness assumptions (Chrome path, `MULER_BASE`, etc.) are in
`tools/muler-harness/README.md`. `probe-scenario-quiz.js` is missing from
that README (F11).

App behaviour was confirmed independently in the browser (auto-arm, menu
deferred arm, blank picks, post-solve unblock, practice arm, gate hold,
`preSolved` seeding, `freeComp`/`quizTodo` classes) — the mechanics work
as the 58.8 notes describe; it is the probe and parts of the contract
wording that are wrong.

---

## High

### H1. The all-`.quizTodo` rule silently re-scopes the authored task
`fMulerQuizTodoModes()` (`js/mulermoc-nom-molview-58.js:4574`) is a
**molecule-wide capability scan**, not step-aware. Live dumps:

```
ethane             todo = [compCarbonsCount, compBondType]
methyl_2_propene   todo = [compNumber1, compSecondSub1, compCarbonsCount, compBondPos, compBondType]
```

A step captured as "name the main chain" therefore requires **two**
quizzes on ethane and **five** on methyl_2_propene. `quiz.mode` survives
only as the *preferred first auto-arm*; completion, gate, tints and the
post-solve unlock all ignore it.

Repro (authoring `preSolved.ethane = ["compCarbonsCount"]`, then Present):

```
comp5 -> class "nameCompBox boxed freeComp"          (solved display)
comp6 -> class "nameCompBox boxed quizTodo selected" (armed)
target = "compBondType"
```

So a student entering a "chain" step is immediately re-quizzed on the
bond-type box.

The probe encoded the old single-mode contract ("solved gate must
advance"), which is one reason those assertions are red. This is not only
a probe problem: CHANGELOG, the audit schema (`step.quiz {kind, mode,
mol}`) and the plan doc all say the step carries *a* task.

**Recommendation:** persist the intended set with the step
(`quiz.modes: [...]`, captured as the resolved todo list, or `[mode]` for
single), and drive gate/tint/auto-arm from that stored set. Keep "all
capable comps" as an explicit authoring option (checkbox in the new
`data-sc-row="quiz"` row) rather than the default. *Resolution: the
all-capable set stayed the owner decision and is now what gets stored and
shown; see the Resolution table.*

### H2. `Update` mangles the authored quiz — both directions
Capture's "select-ON ⇒ make a quiz step" fallback
(`js/mulermoc-nom-scenario-58.js:663` ff.) also runs for an existing quiz
step, and `fScenarioUpdateStep` (`js/mulermoc-nom-scenario-58.js:6754`)
trusts it. Live repro:

```
BEFORE: select ON,  target null, step.quiz.mode = "compBondType"
AFTER  Update: mode = "compCarbonsCount"      <- silently retargeted (main-chain default)

BEFORE: select OFF, step.quiz.mode = "compBondType"
AFTER  Update: quiz = null                    <- deleted, only a toast
```

Editing a title on a quiz step either changes the task or destroys it,
depending on a mode the author is not thinking about. The probe's own
"disarmed Update should drop the quiz" assertion fails for this reason
(it got a freshly invented quiz), and the following "classic steps render
no quiz row" assertion fails downstream.

**Recommendation:** `Update` keeps `old.quiz` unless capture has an
*explicit* signal (live target / just-solved / an authoring control);
removal becomes explicit (e.g. uncheck a "quiz step" toggle) instead of
being inferred from select mode.

### H3. `probe-scenario-quiz.js` is red — the claimed coverage does not exist
1. **Crash:** `tools/muler-harness/probe-scenario-quiz.js:736` —
   `rowButton(preId, ".scUpdate")` is missing the page argument
   (`rowButton(p, scenId, cls)`). Section 10 (`preSolved`) never runs.
2. **Language:** `fScenarioDefaults` sets `lang: "gr"`, so every Present
   step's verdict is Greek while the probe asserts `/Correct/`. All
   Present assertions are blind.
3. **Stale contract:** single-mode gate expectations (H1), and the
   `preSolved` assertion expects `!target` where the implementation arms
   the remaining todo.

Patched-in-memory run: 25 failures, e.g.

```
solved gate must advance, got index 1
returning to a solved molecule should show solved display, got {"t":"compBondType"}
student exact should succeed, got "✓ Σωστό! Αυτή είναι η κύρια αλυσίδα."
authored solved state should restore as solved, got {"i":0,"t":"compBondType"}
```

**Recommendation:** fix the call, set `lang: "en"` on probe steps (or
match `/Σωστό|Correct/`), update gate expectations to the todo set (or to
the new stored `quiz.modes`), add the probe to the harness README.

---

## Medium

### M1. Dead fallback in the gate
`js/mulermoc-nom-scenario-58.js:2162`:
`done = (_todo.length === 0); if (!done && (!_todo || !_todo.length)) {...}`
— unreachable, since `!done` already implies `length > 0`. The comment's
"fallback when the todo helper has no DOM yet" never executes; the
no-helper case is handled only by the `else` branch.

### M2. Missing DOM reads as "step completed" (and the outer catch fails open)
`fMulerQuizTodoModes()` returns `[]` when `#nameAnalysis` has no boxes yet
→ the gate treats the step as done and `PresentBlocked` unlocks "free
exploration". Together with `js/mulermoc-nom-molview-58.js:1374`
(`catch { return false; }` = *unblocked*), the documented "fail-closed"
posture is not what the code does on errors / early DOM. Distinguish "no
DOM yet" (block) from "all solved".

### M3. `fMulerSelectPresentBlocked` is on hot paths and recomputes todos
Called from the hover tick, `PushState`, picking-script sync, silent
settle, etc. Each call can run a DOM query plus `fMulerQuizResolveTarget`
per box (twice: student task + todo + all-done). On a 5-box molecule
that is per-render / per-mousemove work with no memoization. Cache the
todo list, invalidate on paint/arm.

### M4. `.freeComp` is an empty CSS rule
`css/jsme-nick-58.css`: `nameCompBox.freeComp { /* background-color:
transparent; */ }` — a public class with no visual contract. Either give
it a real affordance ("pre-solved for you") or drop the rule and document
the class as probe-only.

### M5. `quiz.mode` is never validated; `prompt` is dead schema
`fScenarioValidate` only checks non-empty `mode`; a typo imports silently
and fails at runtime with "Quiz did not arm for this molecule".
`quiz.prompt` is always stored `""` and never read. `quizSnapshot` was
dropped, while `docs/REVIEW-SCENARIO-QUIZ-58.md` and
`docs/learning-activities-Plan.md` still present it as schema —
reconcile the docs so the file format has one story.

### M6. `__mulerQuizIntent` leaks out of Present
Written by every arm, including student/practice arms
(`js/mulermoc-nom-molview-58.js:4908`); cleared on Present **entry**
(`js/mulermoc-nom-scenario-58.js:5141`) but not on exit or in the non-quiz
teardown. After a lesson, a stale intent can silently turn the next
menu-only capture into a quiz step. Clear it in `fScenarioExitPresent`
and the non-quiz teardown.

### M7. `preSolved` captures more than the step
It snapshots **all** solved modes for the molecule at capture
(`js/mulermoc-nom-scenario-58.js:738`), including practice solves that
belong to other steps, and always stores `preSolved: {}` when empty.
Store only the step's modes; omit the key when empty.

---

## Low / nits

- Quiz badge text is hardcoded `"quiz"` while its tooltip is localized;
  the tooltip embeds the raw mode id (`compCarbonsCount`) — author-facing
  jargon.
- `fScenarioApplyQuiz` writes `step.show.naming/nameClick` during apply
  (a read path mutating the scenario object).
- `_todoList && _todoList.length !== undefined`
  (`js/mulermoc-nom-scenario-58.js:2320`) is always true for arrays.
- `MulerQuizTarget` check in `PresentBlocked` is redundant after
  `fScenarioStudentTask()`.
- `fMulerQuizPaintSolved` now resolves targets for solved boxes too
  (previously skipped) — small paint-path cost.
- Section numbering in `probe-scenario-quiz.js` is out of order (`2e`
  after `6c`, `10` last) — makes failure lists hard to map.

---

## What is good (keep)

- Single chokepoint `fMulerSelectPresentBlocked()` replacing 15 scattered
  Present guards — right shape, and all 15 sites were actually converted
  (pick, hover, Esc, settle, 3D-clear, push, merge, compact paint, seq
  badges, picking script, arm).
- `__mulerStudentArming` scoped with `try/finally` — no stuck global.
- Validation is genuinely defensive: malformed quiz objects drop to
  classic with warnings, forward-compatible `kind`, no version bump.
- The two bug-fix commits are correctly targeted: non-quiz Present
  teardown (stale armed select → tint stall / `fExplainNameComp` early
  return) and clearing `__mulerCompAtomArg/BondArg` in `fClearHighlights`
  (ghost green).
- Docs are strong: audit → plan → changelog → dated session notes with
  root causes. The 58.10 `data-sc-row`/`data-sc-role` refactor is a
  sensible no-ids design, and the probe uses roles with a text fallback.

---

## Follow-up checklist (suggested order)

- [x] **1. Fix `probe-scenario-quiz.js`** — rewritten (page arg, `lang:"en"`,
      todo-set expectations, new sections), green, added to the harness README.
- [x] **2. Decide single vs all-todo** — all-todo kept (owner decision),
      author intent stored as `quiz.modes`; gate/tint/auto-arm use it.
- [x] **3. Make `Update` non-destructive** — keeps the task; explicit Remove.
- [x] **4. Hygiene** — intent cleared on exit; `preSolved` scoped/omitted;
      mode validation warning; snapshot wording reconciled.
- [x] **5. Robustness/perf** — `null` todo on missing DOM; fail-closed outer
      catch; single todo computation; dead fallback removed.
- [x] **6. Cosmetic** — `.freeComp` rule removed; badge localized; probe
      sections reordered by the rewrite.
- [ ] **7. Owner-side browser matrix** — drawer list/Remove, Esc, revisit,
      menu arm, non-quiz step after quiz (unchanged from the original plan).

## Notes for whoever picks this up

- `probe-quiz.js` and `probe-final.js` are green on the live tree, so the
  v56/v57 authoring quiz path was not regressed by v58 — the risk is
  concentrated in scenario/Present code.
- `fScenarioDefaults` defaulting to `lang: "gr"` is also why hand-built
  scenarios in console experiments read as Greek — set `lang: "en"` when
  testing EN text.
- The probe asserts "disarmed Update drops the quiz", i.e. the destructive
  behaviour is currently *specified*; changing it (H2) means updating that
  assertion intentionally.
