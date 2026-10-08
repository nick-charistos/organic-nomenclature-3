# Didactic Scenarios — plan

Brief proposal for teacher-authored, linear snapshot sequences
for classroom presentation and student self-learning.

## 1. Goal / non-goals

Goal: let an author save the current SPA state as a snapshot,
collect several snapshots, and play them as a numbered linear
sequence of steps.

* Presentation hides the left menu; naming and rule panels are
  optional per step.
* v1 persistence is a hand-editable JSON text file (export /
  import, reusable). No backend in v1.
* Future: Drupal-hosted scenarios with logged-teacher authoring
  (see `PROJECT-PLAN.md` Phase 3). v1 reserves fields but does
  not implement it.

Non-goals for v1: branching scenarios, quiz scoring, student
progress tracking, server storage.
(Removed 2026-10-06: PubChem/external-links placeholders — not in this phase.)

## 2. Snapshot schema (v1 JSON)

> **Note:** the file below is one scenario card.
> The author bar holds multiple cards (`scenarios[]`, explicit active card,
> per-card Save/Steps/Export/Play); Export writes one card per file in this
> shape. Working-copy field notes: there is no Menu checkbox (menu is derived
> from picks), no `Text` checkbox (heading + text show automatically iff the
> step carries title or note — legacy `show.text` is ignored/self-healing),
> and `styleHighlight` is additive (`bondAtoms`, `numberingAtoms`).
> `menuGroups` is additive (`molecules` default = flat list, `chemclass` /
> `series` classify the picked subset; unknown values coerce out, missing or
> empty falls back to flat — no version bump).

```json
{
  "scenarioVersion": 1,
  "app": "mulermoc-nom-44",
  "scenario": "esters-intro",
  "title": "...",
  "steps": [
    {
      "n": 1,
      "title": "...",
      "note": "optional teacher text",
      "selectedMol": "propanoic_methyl_ester",
      "mode2D": "condensed",
      "mainChainMode": "algorithmic",
      "etherNamingMode": "iupac",
      "nameAnalysisMode": "esterAlkyl",
      "selectedRule": null,
      "style2D": {"atomColors": true, "colorMode": "atom", "zigzag": false},
      "styleName": {"box": true, "cross": false, "etherNaming": "iupac", "panelOpen": true, "hidden": ["comp5"]},
      "styleHighlight": {"bondAtoms": false, "numberingAtoms": true},
      "menuSubset": ["methane", "ethane"],
      "menuGroups": ["molecules"],
      "audio": {"narrate": false},
      "view3D": {"style": "ballnstick", "spin": false, "showH": true, "atomSymbols": true,
                 "moveto": "moveto 0.0 {...} ...;"},
      "show": {
        "menu": true,
        "viewerButtons": false,
        "viewerSettings": false,
        "viewers": {"2D": true, "3D": true},
        "controls": {"2D": false, "3D": false},
        "save": {"2D": false, "3D": false},
        "naming": true,
        "nameSettings": false,
        "nameClick": false,
        "nameEye": false,
        "audio": false,
        "rule": false,
        "text": true   // LEGACY, ignored in working copy: heading + text show automatically iff title/note present
      }
    }
  ]
}
```

State notes (grounded in v44; v42–v43 identical unless noted):

* `selectedMol`, `mode2D/modeSuffix`, `mainChainMode`,
  `etherNamingMode`, `nameAnalysisMode`, `selectedRule` mirror
  `js/mulermoc-nom-molview-44.js` (`fSelectMol`, `fShowNameAnalysis`,
  `fExplainNameComp`). (Older revisions cited `molview-42.js` line numbers;
  line refs are fragile — prefer function names.)
* 2D style: `svgAtomColors2DFlag`, `atomColorMode2D`,
  `zigzagCheck` are stored; menu grouping mode is not (menu is
  hidden in playback). The legacy original-JSME pane toggle is not
  stored either.
* Highlight options: `styleHighlight` stores the DOM-class-only checkboxes
  `bondAtomsCheck` (bond-component atom highlight, default off) and
  `highlightNumberingCheck` (default on); apply restores the classes before
  `fSelectMol` since highlight readers query them live; legacy files without
  the group get defaults (additive, no version bump). Present entry stashes
  the author's live states; Exit restores them (not the step's values).
  Apply also re-syncs the `Έγχρωμα Σύμβολα` checkbox and atom/group radios
  from `style2D` (the SVG class already re-syncs from the flag in
  `fUpdateSVG`); Exit force-restores all control bars via
  `fScenarioRestoreChrome()` (inline `display` + `hide` class + viewer
  buttons), since class-based hides beat inline restore.
* 3D style: JSmol style/spin/H/symbols are stored.
* 3D camera: `view3D.moveto` stores the verbatim JSmol `moveto`
  string captured via `Jmol.scriptWait(applet, "show moveto")`-only
  (S1 repair 2026-10-04: the `getPropertyAsString(applet, "moveto")`
  branch poisoned stored steps and is deleted). `null` means "use
  the data-file default" (`nameExamples[mol].moveto`, applied in
  `fLoadMol3D`). Capture with `rotate off`; apply
  after `load + center`, before `spt/init-3.spt`, then restore
  the `spin` flag. Validate prefix `moveto`, strict numeric grammar, strip newlines.
* Never persist transient handles: SVG nodes, JSmol objects,
  `myNumberingTimeout`, TTS voices.
  (Removed 2026-10-06: `externalLinks` reserved passthrough — not in this phase;
  legacy files carrying it load with it silently stripped.)

Visibility rules:

* `show.viewers` is the representation mode: 2D-only, 3D-only,
  or both. A hidden viewer is not rendered at all (skip
  `fLoadMol2D` / `fLoadMol3D`, `display:none`), reusing the
  scope of `fToggleViewer2D` and `fToggleViewer3D`.
* `show.controls.2D` toggles `#radio2DMode`
  (`mulermoc-nom-44.html`: `Έγχρωμα Σύμβολα`,
  `Συνεπτυγμένος/Ανεπτυγμένος/Σκελετικός`, `Σύμβολα CHn`).
  Per-step drawer checkbox `2D controls` (default unchecked; disabled
  unless the step's 2D viewer is visible). On apply the bar visuals
  (mode radios, color checkbox + atom/group radios, CHn box) mirror the
  step's stored values via `fScenarioSyncControlUi()`, not the live states.
* `show.controls.3D` toggles `#controls3D`:
  `Σύμβολα ατόμων`, `Υδρογόνα C-H`, `#dropMenu` style,
  `Περιστροφή`). Irrelevant when that viewer is hidden.
  Per-step drawer checkbox `3D controls` (default unchecked; disabled
  unless the step's 3D viewer is visible). On apply the bar visuals
  (3D checkboxes, style dropdown label) mirror the step's stored values.
* `show.save` toggles `#save2DBtn` / `#save3DBtn`
  independently of `controls`. Default `false`.
* `#viewerVisBtns`, `#viewerSettingsPanel` +
  `#viewerSettingsBtnDiv` are always hidden in playback; the left menu
  is hidden unless the step carries a menu subset (`show.menu`, see
  section 3). Captured values still land in the snapshot either way.
* Per-step menu subsets (`menuSubset: [...]`, molecule keys): the live pick
  at Save time (author ticks rows / whole tri-state groups in pick mode,
  or just clicks rows — selecting a molecule in pick mode also picks it,
  and unpicking the selected molecule deselects it). No Menu checkbox:
  the menu is derived — 2+ picks show the flat menu (the step molecule is
  auto-included with a warning), a single pick collapses to the step
  molecule (adopted with a toast when nothing is selected; selection wins
  over a stray pick), and validation drops unknown molecules with a
   warning. Legacy files migrate on import (stored `show.menu` ignored).
* Per-step menu grouping (`menuGroups: [...]`, Ταξινομήσεις Μένου drawer
  checkboxes per step row: `Μόρια` default-checked, `Χημικές Τάξεις`,
  `Ομόλογες Σειρές`; presentation-only, author menu unchanged):
  `molecules`/empty renders the flat list; a single classified mode groups
  the picked subset (collapsible headers, carbon-count order, local
  numbering); 2+ checked modes show a present grouping switcher (memory-only
  choice, default = molecules when checked). Rows stay browsable in all
  views; unknown values coerce out, legacy files default to flat
  (`scenarioVersion` stays 1). Classified groups start shut (headers mirror
  the app `.crossMenuLi`, open header + body take its `--baseColor`
  selected chrome/border); the group holding the selected molecule renders
  open. Headers run a main-app-identical accordion (open shuts the rest,
  explicit slideUp/slideDown, selection preserved); the switcher lays its
  radios in one column.
* Menu-only steps (`selectedMol: null`): a picked set of 2+ with no molecule
  selected still saves (title `"menu"`); presentation deselects first
  (empty viewers, no previous molecule lingering) and shows the flat pick
  menu. The naming hint line hides only when interaction is locked
  (`Name interact` off); when interaction is on it stays visible and
  reappears on free-browse selection (the browsed molecule's boxes are
   clickable with guidance). Every rebuild re-asserts the step's naming
   chrome (`fScenarioApplyNamingChrome`: gear/panel + voice stay hidden
   when their boxes are unchecked). Accepted iff the subset is non-empty.
* `show.naming` / `show.rule` toggle the explanation and rule
  panels. `show.nameSettings` toggles the naming gear + panel
  (per-step drawer checkbox `Name controls`, default unchecked; the
  voice buttons follow it too);
  `show.nameClick` gates name-box interaction only (per-step drawer checkbox
  `Name interact`, default unchecked: locked boxes ignore mouse clicks via
  a `locked` class, but the stored `nameAnalysisMode` highlight +
  explanation always replay; the explain line hides only when locked with
  no stored highlight; absent in legacy files = allowed).
  `show.audio` toggles narration buttons. Playback never
  auto-plays TTS.
* Per-component visibility: `styleName.hidden` lists hidden comp ids
  (e.g. `["comp5"]`); hidden boxes render a dash on a `lightBlue` fill,
  ignore clicks, and are skipped by narration and stored-highlight replay
  (PNG shows them as displayed). Authors toggle boxes via the master
  eye-edit switch in `#nameSettingsPanel` (live-only, never stored) +
  per-box eye buttons; Save/Update captures the set. `show.nameEye`
  gates live per-box eye toggles in presentation (per-step drawer
  checkbox `Ορατότητα συνθετικών`, default unchecked, molecule steps
  only; absent in legacy files = no toggles). `Update` refreshes
  `hidden` from the live view and preserves `nameEye`; Present stashes
  / Exit restores the author's live hidden set + edit mode.
* `title` is the step heading: in presentation it replaces the
  page `#pageTitle` (`N. title`); on exit the app title is
  restored. `note` is the educational paragraph in `#scStepText`
  directly below the title (simple-HTML subset: everything escaped
  except attributeless `<b>`, `<sup>`, `<sub>`;
  `noteFormat: "text"` reserved for further rich text). Heading +
  text show automatically iff the step carries a title or note;
  clear both for a silent visual step (app title kept). Author
  mode always shows the app title and hides the text div (text is
  written in the drawer textarea).

## 3. Authoring UX

* Authoring mode (off by default): the vertical `Σενάρια` handle
  (✎ pencil, docked flush to the author bar's top-left corner, `40px`,
  first child, travels with the bar, highlighted while open),
  reveals the panel stack. Closing: handle toggle, ✕ in the title
  bar, or ESC (never while typing or presenting); hiding disengages
  pick mode but keeps picks and steps. The Pick checkbox appears only
  while authoring. Presentation hides the whole unit.
* Global shell (`#scenarioAuthorBar`): title + `+ New` (empty scenario
  card; locks with a toast while `maxEmptyScenarios = 3` empties exist) +
  `Import` (each import adds a card, always lands untouched). Single column,
  panels scroll under the `85vh` cap, never shrink. One empty card is
  always kept: a panel's Delete locks when it is the last remaining card
  and empty (a sole filled card keeps delete-then-autocreate).
* Scenario cards (`.scenarioPanel[data-scenario-id]`, explicit active
  card): per-card title rename, step count, delete; button panel
  (`Save step`, `Steps`, `Export`, `Play ▶` — no Import); in-flow
  drawer (down/up via `.open`, accordion: one open at a time,
  drawer follows the active card — panel click or Save opens it).
* Step rows: number + type badge (`molecule`/`menu`, key in tooltip)
  stacked in `.scStepNumberWrap`, step title (`Τίτλος βήματος` label
  above the field, defaults to the live Greek IUPAC name at Save —
  key fallback, `"menu"` for menu-only), per-step educational text
  (`note` textarea, `<b>`/`<sup>`/`<sub>` allowed), per-step chrome
   checkboxes (`2D controls`, `3D controls`, `Name controls`,
   `Name interact`, `Ορατότητα συνθετικών`, plus `Ταξινομήσεις Μένου` (`Μόρια` default-checked,
  `Χημικές Τάξεις`, `Ομόλογες Σειρές` — presentation-only menu views,
  shown only on menu-carrying steps, all-off valid → flat fallback;
  see §2) — see §2; no `Text`/`Menu`: text is automatic, menu
  is derived), `Go` (preview/apply the step in authoring), `Update`
  (rewrite the step's stored view snapshot from the current live view:
  Go → tweak molecule, 2D/3D modes + styles, naming clicks/toggles,
   camera, pick → Update; preserves `title`/`note` + the 4 chrome
   checkboxes + `show.nameEye` + `menuGroups`, refreshes everything visual incl. `nameAnalysisMode`,
   `styleName.hidden` (from the live eye toggles),
  `menuSubset`/`show.menu`/`show.viewers`; toasts kind/subset changes),
  reorder up/down, delete, jump-to; step numbers
  auto-renumber. Steps header carries the live scenario name.
   Headers lead with a positional counter (`S1`, `S2`, …); empty
   scenarios (0 steps) flag `.is-empty` on card, count, and Steps button,
   disable Steps/Export/Play (`disabled`, dimmed 0.7, no hover — Save step
   stays live, Delete stays live except on the last remaining empty card,
   first save re-enables), and never drop the drawer
   (the clicked card still activates, other drawers still collapse).
   The Steps button carries the dark `baseColor` chrome.
* 3D camera: `moveto` is captured at Save time (no per-step UI while
  JSmol `moveto` is broken; returns with the fix).
* `fCaptureSnapshot()` reads the live state described above.

## 4. Playback UX + URL shape (frozen)

* Canonical URL:
  `mulermoc-nom-44.html?scenario=scenarios/esters-intro.json&present=1#step=3`
* `?scenario=path.json`: which file. v1 allows same-origin
  `scenarios/*.json` only (reject `..`, non-`.json`,
  cross-origin). Fetched over `http(s)`; `file://` users must
  use the Import button instead (`fetch()` of local files is
  blocked by the browser).
* `?present=1`: playback chrome (hide menu, viewer
  buttons/settings, apply `show.*`). Absent = author preview
  with chrome and step list visible.
* `#step=N`: 1-based step in the hash so Prev/Next can use
  `history.replaceState` without a full reload (JSME/JSmol init
  is expensive). Missing/invalid/clamped to 1/last with notice.
* `Prev [3/8] Next` bar with step title + note; keyboard: `←`/`→`
  walk steps (clamped, no wrap), `ESC` exits. Keys ignore modifiers
  and typing focus; JSmol arrow-rotate under applet focus is a known
  overlap (mouse-drag is the normal rotate path).
* Each step sets the page heading (`#pageTitle` ← `N. title`)
  and the educational text div below it (`#scStepText` ← `note`,
  simple-HTML subset), automatically iff the step carries a title or
  note — otherwise the app title is kept and nothing shows. The
  PlayBar pill keeps only the one-line title/note as a progress
  indicator (same subset rendering).
* `#menuCol` is hidden wholesale in presentation so the remaining
  columns center on the page; exit restores it. Exception: a step with
  `show.menu` shows its `menuSubset` with local
  1..N numbering (never the dataset-global counter) — flat list by default,
  single-grouped collapsible view for one classified `menuGroups` mode, or
  a present grouping switcher for 2+ modes (see §2); no pick checkboxes;
  rows stay clickable for free
  browsing. `#pageContainer.presenting` scopes present-only CSS (flipped
  on every step apply + Exit; first override: taller `.menuListContainer`,
  350px vs the 150px author default). Exit rebuilds the pristine author menu instead.
* Menu forced shut in playback unless the step carries 2+ picks;
  panels and control bars follow `show.*`.
* Student self-learning uses the same playback without a teacher.
* Import-button flow is the primary v1 path (works offline from
  USB); `?scenario=` links are for hosted/classroom-server use
  and future Drupal.

## 5. File format + validation + storage decision

* v1 storage: memory-only plus file (decision A). Steps live in
  a JS variable; `Export .json` downloads a Blob (same pattern
  as `fSave2DPng`), `Import .json` reads via file input. Reload
  without export loses unsaved steps by design.
* Follow-up (not v1): `localStorage` scratch draft
  (`mulermoc.scenario.draft.v1`) with resume/discard UI for
  crash-safe authoring.
* Unknown `selectedMol` renders a skipped-step notice.
* Missing 2D representation falls back via the existing
  `fUpdateDiagr2DButton` logic (condensed > expanded > skeletal).
* Corrupt JSON is rejected with a readable error; valid prefix
  steps are never half-applied.
* Version policy (`validateScenario()`, `SUPPORTED_VERSION = 1`):
  missing `scenarioVersion` = v0 legacy, best-effort apply with
  "legacy file" warning; `> 1` = refuse ("needs a newer app");
  `== 1` = apply; `< 1` = in-memory `migrateScenario()`
  filling defaults (`moveto: null`,
  `show.save/audio: false`) without overwriting the
  file — the user Exports to upgrade. Removed fields (`externalLinks`,
  `show.infoHost`) are stripped silently. Bump `scenarioVersion`
  only on breaking schema changes; additive optional fields use
  defaults and need no bump.

## 6. molInfo / PubChem removal (done 2026-10-06 — not in this phase)

Removed from the v43 set (carried into v44): `molInfoBtn` / `molInfoPanel` dead code
(`molInfoEnabled = false`) in `js/mulermoc-nom-molview-43.js`
(`fToggleMolInfo`, `svgInfo`, panel/button builders) + molInfo CSS in
`css/jsme-nick-43.css` + `molInfoPanelSlot` host + `externalLinks` /
`show.infoHost` in `js/mulermoc-nom-scenario-43.js` (capture/defaults
stripped; legacy files load with them silently ignored, no version bump).
`docs/PUBCHEM_HYBRID_PLAN.md` deleted.

Kept untouched: v42 copies (`molview-42.js`, `jsme-nick-42.css` — frozen),
`archive/**` (museum), `mols/**/*.sdf` (`PUBCHEM_*` source-data tags).

* Legacy `#molInfo` in `functional-groups.html:80` is a
  different page and stays untouched (now in `archive/html/`).

## 7. v1 build status (v43 done, v44 current)

Done in v43 (`mulermoc-nom-43.html`, last suffixed copy; carried into v44 unchanged unless noted in `CHANGELOG.md [v44]`):

1. ✅ `js/mulermoc-nom-scenario-43.js`:
   capture / validate / apply / export / import.
2. ✅ `mulermoc-nom-43.html`: includes the scenario module + `css/mulermoc-nom-scenario-43.css`
   (toolbar, playback bar, import input are injected at
   runtime; all scenario chrome formats live in the stylesheet, not in JS).
3. ✅ Apply path through `fSelectMol -> fShowNameAnalysis ->
   fExplainNameComp -> fShowRule`; chrome hidden in playback.
4. ✅ `molInfo`/PubChem placeholders removed from v43 (see section 6).
5. Browser tests: save/present/navigate/exit, export/import
   round-trip, corrupt/missing-molecule imports, hidden-chrome
   assertions (manual click-through pending).
6. ✅ CHANGELOG v43 entry (`index.html` → 43 in repo3 only).

Remaining: v44 is the current file set (`*44*` copy of v43 + engine/viewer hardening, see `CHANGELOG.md [v44]`; `index.html` → 44; scenario exports write `"app": "mulermoc-nom-44"` and import accepts `"mulermoc-nom-43"` legacy files); then quizzes/games on the
same reuse contract.

## 8. Open questions for development (moveto timing closed 2026-10-04)

* ~~Where the PubChem host panel should live long-term.~~ (removed 2026-10-06 — not in this phase; plan file deleted)
* ~~JSmol `moveto` timing on async `load`~~ — **closed by S1–S4 repair:**
  S1 capture is `scriptWait("show moveto")`-only (the `getPropertyAsString`
  branch poisoned stored steps and is deleted) with a strict numeric grammar
  + import-time quarantine (`moveto: null` + warning); S2 gates the per-step
  camera (+400ms, per-step token) and the name-box click (on
  `fFetchAndParse3D` completion via `fScenarioOn3DParsed`, 2s fallback) so the
  `fLoadMol3D` load batch wins; S3 waits for `jmol_isReady`
  (`window.JSmolReadyFlag`, ~12s fallback) on `?scenario&present` deep links
  and normalizes the legacy `" compSecondSub*"` mode keys. Capture and curate
  with `rotate off`.
* v42 backport policy (repo2): frozen — emergency hotfixes only,
  never push feature work there (see `README.md` two-repos table).

Many issues will surface during development; adjust there.

## 9. LEARN v1.1 — stored library (2026-10-03)

LEARN is layer 1 of the twofold+1 vision (see `README.md`, `docs/LAYERS-PLAN.md`). v44 provides the player (v43 frozen at tag `v43`); v1.1 adds the library:

* **Stored scenarios** under `scenarios/*.json` (same-origin, validated v1 schema), listed by Drupal; URL shape unchanged (`?scenario=scenarios/<name>.json&present=1#step=N`); Import remains the offline/`file://` path.
* **First library (P3):** 3–5 scenarios (alkanes → alcohols → ethers → esters); each step keeps `selectedMol + show.*`; exit forces full chrome restore (menu `menu-open` + both viewers visible).
* **Per-step menu subsets (EXPLORE-lite enforcement):** steps may carry a browsable `menuSubset` (tri-state group pick in authoring; menu derived — 2+ picks show it, single pick collapses to the step molecule); a scenario can walk students through an expanding universe (3 alkanes → +alcohols → +ether) instead of the full 64-molecule menu.
* **Two-level `note` convention:** `note` carries the teacher narrative; authoring guidance is EPAL-simple first line(s) / Lyceum-full extension (P3 authors, P5 uses for EPAL-vs-Lyceum comparison). Schema unchanged — convention only.
* **`moveto` curation:** capture with `rotate off`; prefer curated per-step cameras for the library over ad-hoc capture.
* **Authoring docs:** Save → Export → Present → Exit flow (Exit restores menu + both viewers + all bars; in-memory steps kept).
