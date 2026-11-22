# Session plan — data phase (2026-11-07)

Follow-up to the 2026-11-05/06 display+oracle work. Topic: molecule data at scale
(141 → ~1000). (Planned 2026-11-06, carried over from the local plan file.)

## Homework: boot timing (run in console on the live page)

```js
(function(){
  var t0 = performance.now();
  // re-run proxies: time one classify + one JSME SMILES round-trip, extrapolate
  var a = performance.now();
  fClassifyAllMolecules();
  var classify = performance.now() - a;
  var ex = nameExamples[selectedMol];
  var b = performance.now();
  jsmeNomeclatureApplet.readMolFile(ex.structure2D_Condensed);
  var smi = (jsmeNomeclatureApplet.getSmiles || jsmeNomeclatureApplet.smiles).call(jsmeNomeclatureApplet);
  var jsme = performance.now() - b;
  fSelectMol();
  return "classifyAll=" + classify.toFixed(0) + "ms jsmeOne=" + jsme.toFixed(1) + "ms" +
    " => x1000 ~= " + ((classify / 141 * 1000 / 1000).toFixed(1)) + "s + " + ((jsme * 1000 / 1000).toFixed(1)) + "s" +
    " | pageLoad=" + (t0 ? (performance.now() - t0).toFixed(0) + "ms-harness" : "?");
})();
```

Bring the numbers. They decide task 4.

## Decisions already taken (do not reopen)

- Transport stays `<script>` `.js` (JSON payload inside): `file://` schools + Drupal
  embed kill `fetch("*.json")`. Documented rationale; needs a DATA-FORMAT note.
- Per-molecule `.js` for authoring (diffs, per-student assignment, drop-in collection).
- Vars frozen at CC=1.0 / CH=0.5 / MINSEP=0.4 until a headless re-check says otherwise.

## Task list (in order)

1. **Manifest pattern.** One `data_custom_registry.js` listing custom files; per-molecule
   files untouched. Kills manual `<script>` registration.
2. **Closed school freeze.** Tag `141 + customs`; default preloaded scenario; switch off
   Edit/New (drawing master switch) + authoring tab. Docs + checklist, no data work.
   Note: per-select engine analysis stays (highlights are runtime, not storable);
   stored oracle snapshots already skip refetch (PubChem; OC too after the fix below).
3. **Consistency fixes.**
   - Fork-accepted customs don't set `openclaturaDone` (update path does) → info panel
     refetches OC needlessly. One line.
   - Custom files get no shape validation on load → warn-on-load for corrupt student files.
4. **Scaling — only if homework numbers demand it.**
   - Deploy combiner: JSON-per-molecule authoring folder → built single `data_custom.js`
     (committed output). Authors get JSON, app keeps script tags.
   - Lazy classification: menu labels from stored fields (formula/names, no engine);
     engine runs on select, not boot.
   - Scenario packs: split customs by lesson/topic, load on demand (`menuSubset`
     already supports per-step menus). Never preload SDFs (runtime/on-demand, as today).
5. **Deferred (explicitly not this session).** Yannis 127-form uniform-policy sync
   (0.6188/0.3094 vs 1.17-based); collision-aware placement follow-ups; custom renderer.

## Open questions for owner

- Student volume: how many draft files per collection round? (decides task 4 urgency)
- Closed freeze: which scenario preloads by default? Which version tag name?
- Accept the two task-3 fixes as specified?
