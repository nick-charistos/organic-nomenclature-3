# JSmol 3D Picking Plan (v56 → v57)

Status: implemented in v57 (`js/mulermoc-nom-molview-57.js`, LIVE via `index.html`); browser verification pending (no node/browser on the implementation machine).
Goal: click atom/bond in the 3D viewer → same selection state, paint discipline, and quiz verdicts as the 2D path.
Gate: ROADMAP 1A spike first — PASSED (owner-run: pickCallback fires for atoms with 0-based index and for bonds with index -3 + identity payload, given `set bondPicking true`; `show picked` empty; drag-rotate silent; bond clicks read-only).

## 1. Background — what exists

- 2D selection state: `window.MulerUserSelection` (`js/mulermoc-nom-molview-56.js:1257-1269`), fields `active, molKey, molName, atoms2D, bonds2D, atoms3D, bonds3D, groups`. 3D fields exist but are never filled.
- Epoch discipline: `fMulerSelectMolKey` (`:1278-1288`) is `mol|mode2D`; `fMulerSelectPushState` (`:4100-4156`) drops contents on key change, keeps quiz armed on same-molecule style switch, disarms on molecule change.
- 2D pick path: `fMulerSelectPick` + toggle `fMulerSelectToggle`, hover `fMulerHoverTick`, quiz H-fold `fMulerQuizHydrogenParent` (`:2209-2235`), purpose dispatch `fMulerQuizPurposeFor` (`:1217`), target set `fMulerQuizTargetSet` (`:3073`).
- 3D infra:
  - Applet `jmolAppletNomeclature` created inline in `mulermoc-nom-56.html:243-251`; guarded wrappers `fJSmolLive / fJSmolScript / fJSmolScriptWait / fJSmolScriptEcho / fJSmolGetPropertyAsArray` (`js/mulermoc-nom-molview-56.js:10643-10681`), fail-closed patch `fMulerSafeJSmol` (`:10690-10723`).
  - Loader `fLoadMol3D` (`:10731`); 3D painters `fHighlightAtomChain3D` (`:15448`), `fColorFragmentBonds3D` (`:15486`), all `__mulerExplainQuiet`-aware. Green = `selectionHalos[X79dc6d]`.
  - Init script `spt/init-3-56.spt:4` sets `picking OFF`, `hover off`. Any picking work must scope `set picking` to selection-armed sessions only and restore on exit/teardown.
- 2D↔3D map: chain-only translator `fTranslateChain2D3D` (`js/mulermoc-nom-core-56.js:2704-2743`) over cached heavy map `fBuildHeavyMap2D3D` with order-ignorant fallback. No general atom/bond map yet — spike must confirm or build it.
- Quiz: purpose map `MULER_SELECT_PURPOSE_BY_TARGET` (`js/mulermoc-nom-molview-56.js:1195`), resolvers `MULER_QUIZ_TARGET_RESOLVERS` (`:2365`), compare normalizes to 2D 1-based atom sets. 3D must normalize into the same sets, not a parallel comparator.
- Harness: `tools/muler-harness/README.md`, probes `probe-pick7.js`, `probe-quiz.js`, `probe-coverage56.js`. All read-only, CTM-derived clicks, `waitForFunction` ready gates.

## 2. Phase 1 — input spike (the gate)

Question: which pick readout does the bundled JSmol honor (local `JSmol.min.js` vs CDN, both `?libs=` modes)?

Try in order, log raw results, pick first reliable one:

1. `set pickCallback` — register a page callback, click atoms/bonds, log callback args.
2. `show picked` read-back — after click, `Jmol.scriptEcho(applet, "show picked")` or equivalent, parse `atomno=` / bond indices.
3. Click-ray fallback — `Jmol.getPropertyAsArray(applet, "picked", ...)` or atom-screen-coordinate query; map click x/y to nearest atom via projected coordinates.

Method:
- Scratch probe only (no UI, no state). Serve repo (`node tools/muler-harness/server.js 8901`), drive Chrome via Playwright, click 3–5 known atoms/bonds on 2–3 molecules (ethane, ethanol, butanone), log `{viewer:'3D', kind, index3D, raw}`.
- Also log: drag-vs-click behavior (does a rotate-drag emit a pick?), H picks (explicit H vs heavy parent), empty-canvas clicks, behavior while rotating/zoomed.
- Verify both `?libs=local` and `?libs=cdn`, plus applet-not-ready (CDN blocked) fail-closed path via `fJSmolLive`.

Deliverable: spike note (which path works, sample log, edge cases). STOP if none reliable.

## 3. Phase 2 — selection model + 3D paint

- Fill `atoms3D/bonds3D` in the existing `MulerUserSelection`; no second format. Same toggle semantics as 2D: plain click toggles, Shift accumulates, kinds exclusive (atoms XOR bonds), Esc/empty clears. Bond picks normalize to endpoint atoms at compare time (as 2D does).
- Click-vs-rotate: require movement threshold (e.g. down/up within N px and < T ms) before treating as pick; rotate-drag never selects, never clears.
- Paint through existing 3D painters only. Selection style visually distinct from green; proposal: cyan halo parallel to 2D `MULER_SELECT_CYAN`, component-wins on overlap, reset-first per channel (2D precedent: JSME bg sets accumulate). Respect `__mulerExplainQuiet` and Present (push component-only, state kept).
- Scope `set picking`/`hover`: enable only while `fMulerSelectActive()`, restore `picking OFF` on disarm/teardown/Present/draft. Draft applet untouched.
- H: default fold non-target H to heavy parent in armed quiz (2D precedent `fMulerQuizHydrogenParent`); target H (hydroxyl, aldehyde C-H) stays distinct; free selection keeps atomic picks. Confirm in spike.

## 4. Phase 3 — cross-viewer sync

- Generalize the map: full 2D↔3D heavy-atom bijection (reuse `fBuildHeavyMap2D3D` cache; extend beyond chain). H follows parent or is ignored per Phase 1 decision. Fail closed: no map → no mirror, 2D pick still valid.
- 2D pick mirrors to 3D and vice versa on every toggle. Style/molecule switch follows existing `PushState` epoch rule: same molecule keeps quiz armed (contents dropped, prompt re-asserted); molecule change disarms.
- Viewer reloads (resize, `fLoadMol3D`, stepper) repaint from state; no stale-cyan across switches (same reset discipline as 2D `resetAtomColors/resetBondColors` path).

## 5. Phase 4 — quiz integration (no new comparator)

- 3D picks feed `fMulerQuizTargetSet` after map normalization. All verdicts (`exact/direction/order/more/fewer/hetero/gap`), badges, walk validation, pool-wide multi-chain acceptance, and symmetric-direction oracle apply unchanged.
- Purpose dispatch (`fMulerQuizPurposeFor`) unchanged; bond-purpose quizzes accept 3D bond picks, atom-only quizzes ignore 3D bond clicks (same `ignore:true` contract as 2D).
- Reward replays classic green in both viewers (one-shot `__mulerQuizReward` pattern).

## 6. Phase 5 — verification

- `node --check` on touched files; `git diff --check` clean.
- New `probe-3d-pick.js`: atom/bond/empty/Esc/shift per molecule × condensed/expanded/skeletal + 3D, CTM-derived clicks, movement-threshold check (drag does not select), zero page errors. Extend to quiz exact/direction/order from 3D picks alone.
- Regression: `probe-quiz`, `probe-loc-quiz`, `probe-bond-quiz`, `probe-branch-quiz`, `probe-fg-quiz`, `probe-mode-quiz`, `probe-explain-all`, `probe-compact-main`, `probe-coverage56`, `probe-smoke56`, `zz-test-core56.html` (31/31 + 141 + 141).
- Screenshots: cyan-3D, green reward, overlap precedence.

## 7. Risks / owner calls

- JSmol picking API uncertainty — spike decides; drag/rotate disambiguation threshold needs owner feel.
- SPT `picking OFF` vs selection: confirm no scenario/Present path depends on picking staying off.
- H semantics in 3D (fold vs atomic) — propose fold-in-quiz, atomic-free (matches 2D).
- Present: authoring-only (current 2D rule) vs read-only quiz consumer later.
- Performance: 3D repaint batching (one script per toggle, avoid queue races as in `fColorFragmentBonds3D`).

## 8. Acceptance

- Click atom/bond in 3D → cyan + `atoms3D/bonds3D` updates; Shift accumulates; Esc/empty clears; rotate-drag does not select; molecule switch invalidates; quiz exact/direction/order achievable from 3D picks; unarmed clicks keep classic green behavior; `node --check` + harness matrix green.

## References

- `docs/ROADMAP.md:41-56` (1A spike), `:57-70` (1B), `:71-96` (1C), `:172-178` (verification standard).
- `docs/REVIEW-CORE-MOLVIEW-56.md:57-72` (v56 addendum), `:39-48` (open chemistry items, unchanged).
- `mulermoc-nom-56.html:243-251` (applet), `spt/init-3-56.spt`, `tools/muler-harness/README.md`.
