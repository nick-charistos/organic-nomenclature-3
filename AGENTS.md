# AGENTS.md — MuLERMoCs / Molwave

Project instructions for coding agents. Read this first, then the canonical
docs linked below. Keep this file short and current; it is not a second
changelog.

## What this is

Greek-first static web app for teaching organic nomenclature (JSME + JSmol +
vanilla JavaScript; no build step). The live entry point is `index.html` →
`mulermoc-nom-58.html`. Current live version: **v58.41** (2026-11-20).
Older versions v42–v57 remain runnable at the repo root but are **frozen**.

## Read first

- `README.md` — product/feature baseline.
- `docs/CHANGELOG.md` (`[v58]`) — versioned change record.
- `docs/SESSION-NOTES.md` — cross-machine resume pointer and dated entries.
- `docs/didactic-scenario-plan.md` — LEARN/scenario layer.
- `docs/REVIEW-V58.md`, `docs/REVIEW-SCENARIO-QUIZ-58.md` — accepted decisions.
- `tools/muler-harness/README.md` — probes, server, environment overrides.

## Live tree (v58)

- Page: `mulermoc-nom-58.html`
- Scripts: `js/mulermoc-nom-{tooltip,core,molview,teaching,note,scenario,iupac,lang,name-en}-58.js`
- Styles: `css/jsme-nick-58.css` (app/naming), `css/mulermoc-nom-scenario-58.css` (scenario UI)
- Data: `js/jsme-nick-nomeclature-moc2-data_58.js`
- Init: `spt/init-3-58.spt`; harness page: `zz-test-core58.html`
- Shared (not forked): `js/ui-icons.js`, `js/vendor/`, `jsme/`; JSmol is CDN-loaded
- Verification: `tools/muler-harness/`

## Versioning and forks

- Bump `?v=58.NN` on every CSS/JS `<link>`/`<script>` reference in
  `mulermoc-nom-58.html` when changing those assets. Docs-only changes do not
  need a version bump.
- Do **not** edit v57 or older files, and do not create a new version fork
  unless the user asks.
- Keep scenario/data schemas additive and backward-compatible unless an owner
  decision explicitly allows a break. Old scenario files must still import.
- When the live version changes, update this file’s “Current live version”
  line and live-tree paths in the same commit.

## Architecture map

- `core` — molecule registry, shared state, selection/naming entry.
- `molview` — naming panel, component states/eyes, 2D/3D viewers, drafts/saves.
- `teaching` — explanations, rule panel, narration.
- `note` — rich note editor.
- `scenario` — authoring drawer/step rows, Present mode, quiz contract,
  pinned bar.
- `iupac` — oracle/validation data.
- `lang` — GR/EN UI strings; add new keys here.
- `name-en` — English name assembly.

## Verification (risk-based)

Probes are acceptance/regression checks, **not** edit-time checks. Do not run
the full suite after every small edit; batch it at the end of a session or
batch. Always run the cheap checks below.

### Always (seconds)

- `node --check` on each JS file you changed.
- `git diff --check` (no trailing whitespace).
- Load the page and take a screenshot for CSS/layout changes.

### Targeted (when a feature is complete)

| Touched | Run |
|---|---|
| Docs only | `git diff --check`; no browser/probes |
| CSS/layout only | Visual check at desktop width (and narrow if relevant) |
| Scenario drawer/Present/quiz | `probe-scenario-quiz` |
| Explain overview | `probe-explain-all` |
| 2D picks/selection | `probe-final` + `probe-coverage56` |
| Naming quiz family | matching `probe-{quiz,fg-quiz,loc-quiz,bond-quiz,branch-quiz,mode-quiz}.js` |
| Shared core/molview/schema | all `*-58.js` checks + `probe-final` + `probe-scenario-quiz` |
| 3D picking | `probe-3d-pick` (may remain owner-side/manual) |

### Full lane (end of session/batch, before commit)

- `node --check` all `js/*-58.js`.
- `probe-scenario-quiz`, `probe-final`, `probe-explain-all`,
  `probe-coverage56`; add naming probes if that layer was touched.
- Report which checks ran in the session note/commit message. Never commit a
  red suite; fix or revert.

### Commands (PowerShell)

```powershell
# Start once per session, from the repo root, in the background.
node tools\muler-harness\server.js 8901

# Run one probe (from the repo root).
cd tools\muler-harness
$env:MULER_BASE = "http://localhost:8901"
node probe-scenario-quiz.js

# Back at the repo root: check all v58 scripts.
cd ..\..
Get-ChildItem js\*-58.js | ForEach-Object { node --check $_.FullName }
```

Chrome defaults to the path at the top of each probe; override with
`MULER_CHROME` if needed. Probes are read-only; screenshots are gitignored.
Do not weaken or delete a probe just to get a green run — fix the app or
update the probe deliberately, with the user’s agreement.

## Docs discipline

Update docs in the same commit as the change:

- `docs/CHANGELOG.md` — new `?v=58.NN` bullet under `[v58]`, and update the
  fork line's version.
- `docs/SESSION-NOTES.md` — top resume pointer (version + status) and a dated
  entry with what changed and what was verified.
- `README.md` — when user-facing behavior changes.
- Plan/review docs whose subject changed; update only their “current tree”
  version banners (historical entries keep their old version).

## Invariants and pitfalls

- CSS comments must be `/* ... */`. `//` is invalid and silently drops the
  following rule (this already happened to `body.scPinned #creditsUs`).
- Generated draft files (`fMolDraftDownload*`) must pass user text through
  `fMolDraftCommentSafe()` so `*/` cannot break the block header. Keep
  `JSON.stringify` for the record body.
- Keep the scenario probe contract stable: `data-sc-row` / `data-sc-role`
  hooks and settings-row order unless you deliberately update the probes.
- Comp eyes are three-state: shown → veiled → removed (`nameHiddenComps`,
  `nameGoneComps`, `styleName.gone`). Owner decision 2026-11-19: eyes remain
  usable on quiz steps as a teacher aid; hiding/removing a required comp
  removes it from the quiz todo set. Do not add a gate without asking.
- Quiz component editor (v58.31, polished v58.32–34, v58.39): one master
  checkbox (`data-sc-role="quiz-enabled"`) owns quiz existence (no
  Enable/Remove buttons). Tags are binary — selected = required
  (`quiz.modes`, unsolved), unselected/solved capable = pre-solved (derived
  `capable − required` at apply, never stored). Solved comps render as free
  tags; a required tag that becomes hidden/atom-less stays removable. The
  list starts collapsed (`_scQuizReqOpen`), and tag clicks update in place
  (never rebuild the step list). The gate label “Απαίτηση λύσης κουίζ για
  συνέχεια” is separate from the component-set header (“Συνθετικά κουίζ”).
  `Update` keeps the drawer-authored set/types and `preSolved`; a
  just-solved capture refreshes the solved baseline, and the primary mode is
  forced into the final pinned set.
- Quiz progress is step-scoped (v58.39): `scenario:<id>#<step>|molecule`.
  A comp solved/freed in one step must never satisfy another step; revisiting
  the same step keeps its own progress. Authoring capture uses the row scope
  with a molecule-only fallback for Go-less captures.
- Locants/positions depend on the main chain: while `compCarbonsCount` is a
  required (unsolved) task, number locants, bond positions, and group locants
  must be required too (drawer `chain-locked`; runtime union in
  `fScenarioQuizRequiredModes`). Free locants are legal only when the chain is
  free. Do not weaken this without asking.
- Menu quizzes are deferred tasks (`quiz.mol:""`): `quiz.types` selects which
  component types every picked molecule must solve. Any step carrying a menu
  is a menu quiz even when it also has a selected molecule; its editor uses
  type chips (never real name tags). Only a menu-less molecule step pins
  `quiz.mol` and renders the real `scQuizTag` components. Absent = legacy
  all-capable; non-empty = filtered capable set; empty/no-capable = empty task
  (gate passes, never all-capable). Zero-type drawer cascades are blocked;
  validation warns on invalid/empty types. Unselected types are
  pre-solved/free per molecule, and the authored `preSolved` set exempts
  specific comps. No name tags in the drawer — switchable quiz-type chips
  instead. Do not apply the pinned free-complement contract to legacy
  all-capable menu quizzes.
- Preserve Present/authoring state restoration (step stash/restore, Go
  preview, Exit restores chrome).
- Layout policy (v58.40): pinned authoring keeps the credits footer at/below
  the viewport bottom via a measured `#authorLayout` min-height, independent
  of the scenario drawer state; the app keeps its natural height and the gap
  is white space. Presentation keeps the header (navigation + Exit) but hides
  the footer; Exit restores it.
- Tooltips (v58.41): every `[data-tooltip]` is rendered by the fixed
  `#mulerTipLayer` in `js/mulermoc-nom-tooltip-58.js`, not by pseudo-elements.
  It flips/clamps inside the viewport and hides on scroll/resize/leave.
  Pseudo bubbles are suppressed only while the layer is active and remain the
  no-JS fallback; add new tooltips via `data-tooltip`, not new bubble CSS.
- Add UI text to `js/mulermoc-nom-lang-58.js`; legacy inline strings exist,
  so keep GR/EN parity and existing fallback behavior in new code. Greek
  values are UTF-8.
- Do not change chemistry/naming behavior unless the task asks for it; v58 is
  the compatibility baseline.
- Do not commit ignored artifacts (screenshots, `node_modules/`,
  `tools/muler-harness/package*.json`, compare outputs).
- If a CSS rule “does not apply”, verify it in the CSSOM before changing it —
  an invalid neighbor rule may have swallowed it.

## Commits and handoff

- Do **not** commit or push unless the user asks. At session end, propose the
  commit and wait for confirmation.
- Before committing: tree is coherent, version/docs synced, agreed checks
  green, `git status`/diff inspected.
- Stage only the intended files; do not blind-stage unrelated work.
- Prefer one coherent commit per batch unless the user asks otherwise.
  Message style: `v58.NN: short summary`, with a body listing the changes and
  the verification that ran.
- Never push unless explicitly asked.

## Ask before changing

- Quiz-eye behavior, chemistry/naming results, or a new version fork.
- Any schema-breaking change or removal of an existing probe hook.
- Large visual redesigns beyond the requested tweak.
