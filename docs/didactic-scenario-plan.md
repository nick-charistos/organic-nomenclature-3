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
progress tracking, PubChem live lookup, server storage.

## 2. Snapshot schema (v1 JSON)

```json
{
  "scenarioVersion": 1,
  "app": "mulermoc-nom-43",
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
      "styleName": {"box": true, "cross": false, "etherNaming": "iupac", "panelOpen": true},
      "audio": {"narrate": false},
      "view3D": {"style": "ballnstick", "spin": false, "showH": true, "atomSymbols": true,
                 "moveto": "moveto 0.0 {...} ...;"},
      "externalLinks": {},
      "show": {
        "menu": false,
        "viewerButtons": false,
        "viewerSettings": false,
        "viewers": {"2D": true, "3D": true},
        "controls": {"2D": false, "3D": false},
        "save": {"2D": false, "3D": false},
        "naming": true,
        "nameSettings": false,
        "audio": false,
        "rule": false,
        "infoHost": false
      }
    }
  ]
}
```

State notes (grounded in v42):

* `selectedMol`, `mode2D/modeSuffix`, `mainChainMode`,
  `etherNamingMode`, `nameAnalysisMode`, `selectedRule` mirror
  `js/mulermoc-nom-molview-42.js:7-41`,
  `fSelectMol:489`, `fShowNameAnalysis:2723`,
  `fExplainNameComp:3124`.
* 2D style: `svgAtomColors2DFlag`, `atomColorMode2D`,
  `zigzagCheck` are stored; menu grouping mode is not (menu is
  hidden in playback).
* 3D style: JSmol style/spin/H/symbols are stored.
* 3D camera: `view3D.moveto` stores the verbatim JSmol `moveto`
  string captured via `show moveto`
  (`Jmol.getPropertyAsString(applet, "moveto")`, fallback
  `Jmol.scriptWait(applet, "show moveto")`). `null` means "use
  the data-file default" (`nameExamples[mol].moveto`, applied in
  `fLoadMol3D:2418-2429`). Capture with `rotate off`; apply
  after `load + center`, before `spt/init-3.spt`, then restore
  the `spin` flag. Validate prefix `moveto`, strip newlines.
* Never persist transient handles: SVG nodes, JSmol objects,
  `myNumberingTimeout`, TTS voices.
* `externalLinks` is a reserved passthrough for the future
  `PUBCHEM_HYBRID_PLAN.md` lookup; no lookup in v1.

Visibility rules:

* `show.viewers` is the representation mode: 2D-only, 3D-only,
  or both. A hidden viewer is not rendered at all (skip
  `fLoadMol2D` / `fLoadMol3D`, `display:none`), reusing the
  scope of `fToggleViewer2D:231` and `fToggleViewer3D:247`.
* `show.controls.2D` toggles `#radio2DMode`
  (`mulermoc-nom-42.html:194-230`: `Έγχρωμα Σύμβολα`,
  `Συνεπτυγμένος/Ανεπτυγμένος/Σκελετικός`, `Σύμβολα CHn`).
* `show.controls.3D` toggles `#controls3D` (`:241-274`:
  `Σύμβολα ατόμων`, `Υδρογόνα C-H`, `#dropMenu` style,
  `Περιστροφή`). Irrelevant when that viewer is hidden.
* `show.save` toggles `#save2DBtn` / `#save3DBtn`
  independently of `controls`. Default `false`.
* `#viewerVisBtns`, `#viewerSettingsPanel` +
  `#viewerSettingsBtnDiv`, and the left menu are always hidden
  in playback. Their values are still captured in the snapshot.
* `show.naming` / `show.rule` toggle the explanation and rule
  panels. `show.nameSettings` toggles the naming gear + panel;
  `show.audio` toggles narration buttons. Playback never
  auto-plays TTS.

## 3. Authoring UX

* Toolbar: `[Save step]` + `[Scenarios...]`.
* Step-list drawer: title/rename, reorder up/down, delete,
  jump-to; step numbers auto-renumber.
* Step editor: `[Use current 3D view]` re-captures `moveto`
  without re-saving the whole step; per-step badge shows
  "custom view" vs "default view".
* `fCaptureSnapshot()` reads the live state described above.

## 4. Playback UX + URL shape (frozen)

* Canonical URL:
  `mulermoc-nom-43.html?scenario=scenarios/esters-intro.json&present=1#step=3`
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
* `Prev [3/8] Next` bar with step title + note.
* Menu forced shut in playback; panels and control bars follow
  `show.*`.
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
  `show.save/audio/infoHost: false`) without overwriting the
  file — the user Exports to upgrade. Bump `scenarioVersion`
  only on breaking schema changes; additive optional fields use
  defaults and need no bump.

## 6. molInfo cleanup (deferred to v44)

The v40-v42 `molInfoBtn` / `molInfoPanel` is dead code
(`molInfoEnabled = false`, see
`js/mulermoc-nom-molview-42.js:32-33,309-321,2746-2784` and
`css/jsme-nick-42.css:330-358`).

Status in v43: **not deleted**. The scenario module instead injects
a minimal `<div id="molInfoPanelSlot">` host at runtime (hidden
unless `show.infoHost`), reserving the slot for the future PubChem
`externalLinksPanel`. Full deletion of the dead button/panel code
moves to v44 (canonical set), when `molview` is touched anyway.

* Legacy `#molInfo` in `functional-groups.html:80` is a
  different page and stays untouched (now in `archive/html/`).

## 7. v1 build status (v43 done, v44 next)

Done in v43 (`mulermoc-nom-43.html`, last suffixed copy):

1. ✅ `js/mulermoc-nom-scenario-43.js`:
   capture / validate / apply / export / import.
2. ✅ `mulermoc-nom-43.html`: includes the scenario module (toolbar,
   playback bar, import input, info-host slot are injected at
   runtime, keeping the html diff minimal).
3. ✅ Apply path through `fSelectMol -> fShowNameAnalysis ->
   fExplainNameComp -> fShowRule`; chrome hidden in playback.
4. ⏭️ `molInfo` deletion deferred to v44 (see section 6).
5. Browser tests: save/present/navigate/exit, export/import
   round-trip, corrupt/missing-molecule imports, hidden-chrome
   assertions (manual click-through pending).
6. ✅ CHANGELOG v43 entry (`index.html` → 43 in repo3 only).

Remaining: v44 canonical un-suffixed set, then quizzes/games on the
same reuse contract.

## 8. Open questions for development

* Where the PubChem host panel should live long-term.
* JSmol `moveto` timing on async `load` (callback/timeout plus
  stale-step guard like `fFetchAndParse3D`).
* v42 backport policy (repo2): frozen — emergency hotfixes only,
  never push feature work there (see `README.md` two-repos table).

Many issues will surface during development; adjust there.

## 9. LEARN v1.1 — stored library (2026-10-03)

LEARN is layer 1 of the twofold+1 vision (see `README.md`, `docs/LAYERS-PLAN.md`). v43 provides the player; v1.1 adds the library:

* **Stored scenarios** under `scenarios/*.json` (same-origin, validated v1 schema), listed by Drupal; URL shape unchanged (`?scenario=scenarios/<name>.json&present=1#step=N`); Import remains the offline/`file://` path.
* **First library (P3):** 3–5 scenarios (alkanes → alcohols → ethers → esters); each step keeps `selectedMol + show.*`; exit forces full chrome restore (menu `menu-open` + both viewers visible).
* **Two-level `note` convention:** `note` carries the teacher narrative; authoring guidance is EPAL-simple first line(s) / Lyceum-full extension (P3 authors, P5 uses for EPAL-vs-Lyceum comparison). Schema unchanged — convention only.
* **`moveto` curation:** capture with `rotate off`; prefer curated per-step cameras for the library over ad-hoc capture.
* **`externalLinks{}`** stays a reserved passthrough (+1: `isomerism | reactions` later, no lookup in v1).
* **Authoring docs:** Save → Export → Present → Exit flow (Exit restores menu + both viewers + all bars; in-memory steps kept).
