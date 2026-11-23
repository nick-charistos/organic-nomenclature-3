# AGENTS.md — MuLERMoCs / Molwave

Project instructions for coding agents. Read this first, then the canonical
docs linked below. Keep this file short and current; it is not a second
changelog.

## What this is

Greek-first static web app for teaching organic nomenclature (JSME + JSmol +
vanilla JavaScript; no build step). The live entry point is `index.html` →
`mulermoc-nom-59.html`. Current live version: **v59.10** (2026-11-22).
Older versions v42–v58 remain runnable at the repo root but are **frozen**.

## Working mode (owner preference, 2026-11-22)

Speed over ceremony. Unless the owner explicitly asks, do **not**:

- run probes or long verification suites;
- create screenshots or other test images;
- update docs, changelogs, session notes, README or version banners;
- commit or push.

Make the requested edit, use `node --check` only as a quick syntax guard when
needed, and report what changed. The owner verifies manually. This section
overrides the verification and commit rules elsewhere in this file.

Substantive answers end with a short **Opinion / Recommendation** section.
Skip it only for trivial status replies, confirmations or pure execution
reports.

## Read first

- `README.md` — product/feature baseline.
- `docs/README.md` — current-doc index (`docs/archive/` is historical only).
- `docs/CHANGELOG.md` (`[v59]`) — versioned change record.
- `docs/SESSION-NOTES.md` — cross-machine resume pointer and dated entries.
- `docs/didactic-scenario-plan.md` — LEARN/scenario layer.
- `docs/REVIEW-V58.md`, `docs/REVIEW-SCENARIO-QUIZ-58.md` — accepted decisions.
- `tools/muler-harness/README.md` — probes, server, environment overrides.

## Live tree (v59)

- Page: `mulermoc-nom-59.html`
- Scripts: `js/mulermoc-nom-{tooltip,core,molview,teaching,note,scenario,iupac,lang,name-en}-59.js`
- Styles: `css/jsme-nick-59.css` (app/naming), `css/mulermoc-nom-scenario-59.css` (scenario UI)
- Data: `js/jsme-nick-nomeclature-moc2-data_59.js` (147 molecules)
- Init: `spt/init-3-59.spt`; harness page: `zz-test-core59.html`
- Shared (not forked): `js/ui-icons.js`, `js/vendor/`, `jsme/`; JSmol is CDN-loaded
- Verification: `tools/muler-harness/`

## Versioning and forks

- Bump `?v=59.NN` on every CSS/JS `<link>`/`<script>` reference in
  `mulermoc-nom-59.html` when changing those assets. Docs-only changes do not
  need a version bump.
- Do **not** edit v58 or older files, and do not create a new version fork
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

## Verification (milestone-first)

Probes are milestone acceptance/regression checks, **not** edit-time checks.
Run them when a batch changes observable behavior, chemistry/naming,
scenario/quiz logic, schema, or shared core/molview behavior — and run them
**once on the frozen tree at the end of the batch**, not after each edit.
Do **not** run probes for docs, copy/i18n, CSS/layout/skin, icons, tooltip
placement, or small UI-control changes; use the visual check instead.

### Always (seconds)

- `node --check` on each JS file you changed.
- `git diff --check` (no trailing whitespace).
- Load the page and take a screenshot for CSS/layout changes.

### Quick lane (default while iterating)

| Touched | Run |
|---|---|
| Docs only | `git diff --check`; no browser/probes |
| CSS/layout/skin only | Visual check at desktop width (and narrow if relevant) |
| Copy/i18n only | Visual check of the affected screen |
| UI control, no logic change | `node --check` + a targeted headless check of that control |

### Milestone lane (once, when a behavior batch is complete)

| Touched | Run |
|---|---|
| Scenario drawer/Present/quiz | `probe-scenario-quiz` |
| Explain overview | `probe-explain-all` |
| 2D picks/selection | `probe-final` + `probe-coverage56` |
| Naming quiz family | matching `probe-{quiz,fg-quiz,loc-quiz,bond-quiz,branch-quiz,mode-quiz}.js` |
| Shared core/molview/schema | all `*-59.js` checks + `probe-final` + `probe-scenario-quiz` |
| 3D picking | `probe-3d-pick` (may remain owner-side/manual) |

### Run-once rules

- Run the milestone lane once, on the final tree at the end of the batch.
- If code changes after a green run, rerun only the probe covering that layer.
- A docs/CSS/UI-only follow-up after a green run does **not** invalidate it.
- Never run the same probe twice on an unchanged tree.
- Report which probes ran; never commit a red suite — fix or revert.

### Full lane (major advance / release only)

For a new version that ships behavior changes, or when the owner asks:
`node --check` all `js/*-59.js`, then `probe-scenario-quiz`, `probe-final`,
`probe-explain-all`, `probe-coverage56` (add naming probes if that layer was
touched). Not for CSS/UI-only batches.

### Commands (PowerShell)

```powershell
# Start once per session, from the repo root, in the background.
node tools\muler-harness\server.js 8901

# Run one probe (from the repo root).
cd tools\muler-harness
$env:MULER_BASE = "http://localhost:8901"
node probe-scenario-quiz.js

# Back at the repo root: check all v59 scripts.
cd ..\..
Get-ChildItem js\*-59.js | ForEach-Object { node --check $_.FullName }
```

Chrome defaults to the path at the top of each probe; override with
`MULER_CHROME` if needed. Probes are read-only; screenshots are gitignored.
Do not weaken or delete a probe just to get a green run — fix the app or
update the probe deliberately, with the user’s agreement.

## Docs discipline

Update docs in the same commit as the change:

- `docs/CHANGELOG.md` — new `?v=59.NN` bullet under `[v59]`, and update the
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
- Quiz component editor (v58.31, polished v58.32–34, v58.39; settings-only
  v59.04): one master checkbox (`data-sc-role="quiz-enabled"`) owns quiz
  existence (no Enable/Remove buttons). Tags are binary — selected = required
  (`quiz.modes`), unselected capable = free (derived `capable − required` at
  apply, never stored). **Every capable tag toggles**, regardless of what the
  author has solved in free mode; the live solve state never affects the tag
  display, the capture or Present. A required tag that becomes hidden/atom-less
  stays removable. The list starts collapsed (`_scQuizReqOpen`), and tag clicks
  update in place (never rebuild the step list). The gate label “Απαίτηση
  λύσης κουίζ για συνέχεια” is separate from the component-set header
  (“Συνθετικά κουίζ”). `Update` keeps the drawer-authored set/types; a solved
  capture never rewrites the required set and never stores `preSolved` (legacy
  `preSolved` is ignored), and the primary mode is forced into the final
  pinned set.
- Quiz steps are settings-only (v59.04): the author's live solve state never
  edits a step or seeds Present. Capture starts from every capable component
  (the author untags the free ones); the step-scoped progress keys
  (`scenario:<id>#<step>|molecule`) keep the same molecule in different steps/
  representations independent — a solution from one step never satisfies
  another.
- Quiz start (v58.44; prompt wrapper v58.51): Present never auto-arms.
  `quiz.startMode` is set only by the drawer Start component select (None
  default; options = required comps; the chosen tag gets `.is-start`). It is
  armed on entry only when still required and capable; otherwise the step stays
  idle with the `.scQuizStartPrompt` modifier on a single `div.scQuizPrompt` in
  `#nameAnalysisExplain`. The gate holds until the required todo is solved even
  if nothing was armed. Capture never sets `startMode`, select mode alone never
  creates a quiz, and legacy steps have no start. Keep the start in sync when
  tags change (removing it clears it).
- Deferred quiz markers (v58.44): `quiz.mol:""` is valid only on a
  menu-carrying step. `fScenarioQuizPinMolecule()` pins it to `selectedMol`,
  drops the menu-only `types`, and materializes capable `modes` when the step
  molecule is live; it runs on load, drawer render, Update and Present apply.
  The drawer's menu-vs-name-tag choice uses the step shape
  (`!selectedMol` or `menuSubset.length > 1`) exactly like the master
  checkbox — never `quiz.mol`. A menu-less molecule step must never render
  menu type chips; do not weaken this repair. Multi-pick and menu-only steps
  keep their type chips.
- Quiz labels (v58.46): `quiz.modeLabels` stores the **real name-component
  text** (eth/an/ol), never generic mode/type names (“main chain”, “bond
  type”). Use `fScenarioQuizModeLabelsFor()` for every label write; it prefers
  live name boxes, then a per-molecule cache, then old labels, then the type
  fallback. Non-live stored/orphan tags must show fragments, not type names.
- Page title (v58.49): the header MolWave lockup is the accessible h1
  (`role="heading" aria-level="1"`). Keep the empty `#pageTitle` node — Present
  still writes the step title into it. Authoring hides it only while empty
  (`#pageContainer:not(.presenting) #pageTitle:empty`); do not remove the node.
- 2D data frame (v59.00): every stored form uses heavy bonds = 1.17 and H
  bonds = 0.78. **The expanded form is derived from the condensed form** — it
  keeps the condensed's heavy atom order, coordinates and orientation and only
  adds explicit H (O–H/N–H; NH₂ is two separate H atoms at H–N–H ≈ 120°), drops
  S-groups and opens nitro as N⁺(–O⁻)(=O). `mainChain_Expanded` equals
  `mainChain_Condensed`. Never give the expanded form its own skeleton or
  orientation; S-groups are display-only, so their hidden atoms
  (`COOH`, `CN`, `N^O2`) keep the same coordinates and are drawn explicitly in
  expanded. Condensed/skeletal keep their school abbreviations. X–H bond lines
  (C–H, O–H, N–H …) use the grey `atomColors2D.H`. Carbonyl school geometry:
  terminal acids put both O at ±60° from the chain (O=C–O = 120°), terminal
  aldehydes put the C=O collinear (`CCC=O`); ketones keep 90°, esters keep the
  bridging O. Carbon branch backbones run vertically off the horizontal chain
  (branch root directly above/below its chain atom; the branch's deepest path
  continues straight; side children horizontal). Expanded C–H and O–H bonds are
  orthogonal (0/90/180/270); terminal sp groups (C≡N, terminal C≡C) continue
  the chain linearly; formate H–C=O is linear (H opposite the C=O). Regenerate
  with `tools/muler-harness/normalize-2d.js` and re-run its audit.
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
  pre-solved/free per molecule; legacy `preSolved` is ignored. No name tags in
  the drawer — switchable quiz-type chips
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
  `#mulerTipLayer` in `js/mulermoc-nom-tooltip-59.js`, not by pseudo-elements.
  It flips/clamps inside the viewport and hides on scroll/resize/leave.
  Pseudo bubbles are suppressed only while the layer is active and remain the
  no-JS fallback; add new tooltips via `data-tooltip`, not new bubble CSS.
- Add step (v58.42): the new last row is expanded and revealed in the
  `.scenarioDrawer` scrollport only when needed; tall rows align their head,
  mostly-visible rows do not jump. Keep this behaviour when touching `.scSave`.
- Viewer-height rows (v58.43): two states only — the `Full` button (built in
  JS, in the old checkbox slot before the slider) or a specific px height
  (slider). The slider is disabled while Full is active and enabled for a
  specific height; no Auto/Manual checkbox, no `Full`/`Auto` text. The px
  readout is hidden while Full is active and shows `Npx` only for a specific
  height. Full shows the effective height implicitly and the lit
  `aria-pressed` button marks the mode. The range input has a flat skin (no
  thumb shadow, no track border). Legacy `null` still loads/renders but the UI
  never writes it.
- Add UI text to `js/mulermoc-nom-lang-59.js`; legacy inline strings exist,
  so keep GR/EN parity and existing fallback behavior in new code. Greek
  values are UTF-8.
- Do not change chemistry/naming behavior unless the task asks for it; v59 keeps
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
  Message style: `v59.NN: short summary`, with a body listing the changes and
  the verification that ran.
- Never push unless explicitly asked.

## Ask before changing

- Quiz-eye behavior, chemistry/naming results, or a new version fork.
- Any schema-breaking change or removal of an existing probe hook.
- Large visual redesigns beyond the requested tweak.
