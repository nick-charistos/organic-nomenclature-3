# Learning activities plan — 2D↔3D molecular translation

## Rationale
Students can name skeletal stubs and condensed labels without ever picturing
their 3D content (implicit H, tetrahedral carbons, whole alkyl branches).
The v57 picking machinery links minimal 2D signs to full 3D referents by
direct manipulation — click a stub/label, see what it *is*. These activities
turn that link into guided tasks. No chemistry-engine changes; everything
builds on settled infrastructure (mirror map, H-rank pairing, paint
completion, branch groups, quiz compare + numberless hints, reps lock,
solved sets).

## Core rule (owner decision)
- **Find-tasks → expansion.** Identifying/selecting a group (branch, label,
  fragment) selects the whole unit in state (pattern: condensed-fragment
  delegation) — one click is the whole answer, verdict agrees.
- **Count-tasks → atomic.** Predicting/counting per atom keeps single-atom
  state with paint-only completion (current behavior).
Both semantics already implementable; the activity (or step) chooses.

## Activity families
### 0. Name-component quizzes (shipped, v56/v57) — "select atoms of name components"
Click a name box → quiz arms → pick the atoms/bonds in 2D and/or 3D →
live numberless hints → exact replays the classic green reward. Covers main
chain (walk + direction/order, sequence badges/echoes), FG suffix, locants
(chain-first redirect), bond type/position, branches (heavy-only targets).
Solved boxes fall back to classic and lock the reps; progress is
per-molecule, fresh round on select toggle-off. This is the template: every
new activity reuses arm → compare → hint → reward → solved.

### A. Same-atom hunting (2D↔3D identification)
Click the highlighted atom in one viewer, find it in the other — Hs included
via rank pairing, both directions. Pure mirror task; validates translation
both ways. Find-task (expansion irrelevant — single atoms).

### B. Condensed-label unpacking (implicit made explicit)
Click a condensed label (CH3, COOH, …): count heavies + Hs in the lit 3D
group. Find-task for the unit (fragment delegation), then count-task on the
revealed atoms.

### C. Skeletal-to-3D branch building
1. Click the stub → whole 3D branch lights. *How many C? How many H?*
   (find-task → expansion, single click exacts.)
2. Click branch carbons one by one in 2D — *predict new Hs per pick*
   (pick-sequence numbers trace the order in both viewers). Count-task →
   atomic state + completion paint.
3. Two branches: attribute each 3D blob to its 2D stub *before* clicking
   (hover preview, no paint commitment), then one click expands + scores.

### D. Reverse attribution (3D→2D)
Click a 3D blob, find the stub/label in 2D. Same machinery, opposite
direction; completes the translation loop with C.

### E. Symmetry tasks
Methyl Hs interchangeable by definition — "any methyl H" tasks are
well-posed and turn the rank-ordering caveat into a non-issue.

## Build plan
- **Stage 0 — scenario quiz contract (v58, done, live-verified).** Steps
  carry quiz tasks (`step.quiz {kind, mode, modes, modeLabels, mol,
  preSolved}` + `requireSolution`, default on). Capture precedence: live
  target → just-solved → shown comp (if resolvable) → main-chain default (if
  resolvable) → classic; any menu-carrying step stores a deferred task
  (`mol: ""`) so the quiz follows every picked molecule. The required
  component set is captured with the step (`modes`, author labels) and
  filtered through `fMulerQuizTodoModes(required)` for gate/tint/auto-arm;
  deferred steps compute it per picked molecule. `Update` keeps an authored
  task unless the capture carries a quiz signal — removal is the drawer's
  explicit Remove action, and the quiz row lists the stored components with
  their semantic labels. Present auto-arms with fresh picks (primary else
  first required); done = every required `.quizTodo` solved. Author/run-solved
  capable boxes get `.freeComp` (normal classic, marker only) and never block
  the gate. Non-quiz steps tear down student mode (no tint stall). Esc on a
  quiz step clears picks (it no longer exits Present). Quiz intent
  (`__mulerQuizIntent {mode, mol}`) bridges menu-building teardown. Forward
  jumps land on the next step and menu steps gate until a molecule is picked,
  so a gated step cannot be skipped. This *is* the activity shell for
  name-component quizzes — new activity types plug the same path
  (kind/resolver/prompt/pick-unit).
- **Stage 1 — activity shell.** Prompt mode arming branch/group targets
  (reuse target-resolver family; new activity purpose or reuse `branch`);
  verdict through existing compare + numberless hints; exact replays
  completion paint as the reward. Per-activity (or per-step) expansion/atomic
  switch. Reuse solved-set pattern for within-activity progress.
- **Stage 2 — sequencing.** Multi-step flows (identify → count →
  attribute), step prompts, per-step verdicts, chain-first-style auto-advance
  where tasks depend on each other.
- **Stage 3 — integration.** Scenario-step authoring, Present-mode
  compatibility (reps lock + Present guards already compose), explanation
  panel texts (GR/EN), probe coverage per activity (headless-2D parts;
  3D parts manual until the Playwright-Firefox load issue is solved).
- **Verification.** Manual matrix per activity (both viewers) + probe
  extensions; `node --check`; docs entries.

## Open decisions (owner)
1. Where activities live: standalone mode vs scenario steps vs name-box
   boxes (a box per activity reuses arm/prompt/solved for free).
2. Attempt limits / scoring, if any.
3. Which family to build first (recommendation: C, highest pedagogical
   value per line of new code — mostly shell around existing resolvers).
