# Session handoff — 2026-10-25 — v51 Snap removal (fixed; v51 live)

> **Status: VERIFIED / v51 LIVE.** The Firefox crash was traced to an infinite
> loop in `MuSVG.parse()` and fixed on 2026-10-25. v51 is now live
> (`index.html` → `mulermoc-nom-51.html`). See section 10 for the root cause,
> fix, test results, and promotion. The pre-fix recovery instructions in
> sections 4–6 are historical and no longer apply.

## 1. Current repository state

- Branch: `main`
- Base commit: `1c81433` — `v51: add 18 molecules (alcohols/dienes/enynes) + docs`
- `index.html` now points to **v51**; v50 and earlier remain runnable.
- This change set is committed together with this document (Snap removal +
  `MuSVG.parse()` fix + v51 promotion + docs).
- The Snap removal is **v51-only**. v50, older runnable versions, archive files,
  and the Git-ignored root `snap/` were intentionally left untouched.

### Files modified by the Snap removal + promotion

| Path | Change |
|---|---|
| `js/mulermoc-nom-molview-51.js` | Added native `MuSVG`; replaced Snap calls; `molSnap` → `molSvg`; fixed `MuSVG.parse()` |
| `mulermoc-nom-51.html` | Removed the Snap `<script>` |
| `js/vendor/README.md` | Removed Snap row/hash |
| `js/vendor/snap/LICENSE.txt` | Deleted |
| `js/vendor/snap/snap.svg-0.5.1.min.js` | Deleted |
| `index.html` | Promoted v51 |
| `README.md` | v51 live and Snap-free |
| `docs/CHANGELOG.md` | v51 live, Snap removal, OOM/XML fix |
| `docs/PROJECT-PLAN.md` | v51 live status and `MuSVG` diagram |
| `docs/PROJECT-PLAN-GR.md` | v51 live status and `MuSVG` diagram |
| `docs/Presentation-Step-Rich-Text-PLAN.md` | v51 live, Snap phase, verification |
| `docs/LAYERS-PLAN.md` | v51 baseline and live URLs |
| `docs/didactic-scenario-plan.md` | v51 file/URL references |
| `docs/SESSION-NOTES.md` | Snap-removal + promotion session entries |

`js/jsme-nick-nomeclature-moc2-data_51.js`,
`js/mulermoc-nom-core-51.js`, and the 18 new SDFs were already committed in
`1c81433`.

## 2. Reported problem and resolution

- Owner reported Firefox tab crashes after the Snap removal.
- The crash is now characterized from the Firefox crash report:
  - URL: `mulermoc-nom-51.html`
  - Version: Firefox 158.0.1
  - `MozCrashReason: "out of memory: 0x0000000000000080 bytes requested"`
  - `JSOutOfMemory: Reported`
  - Process type: content
- Root cause: `MuSVG.parse()` used `document.importNode()`, which copies rather
  than removes the source node; the `while (doc.documentElement.firstChild)`
  loop never advanced.
- The earlier headless functional tests timed out for the same reason; the
  tool now parses generated markup with the tolerant HTML parser and moves nodes
  with `document.adoptNode()`.
- `node --check` passes on all v51 JS files. Chrome and Firefox matrices pass,
  except for two pre-existing skeletal JSmol errors that also occur on the Snap
  baseline.

## 3. What changed technically

`js/mulermoc-nom-molview-51.js`:

- Added a native `MuSVG` wrapper with:
  - `select`, `selectAll`
  - `attr` (`attr("text")` → `textContent`; `{text: ...}` → `textContent`)
  - `remove`, `append`
  - `.node`, `.toString()`
  - `MuSVG.parse()` → SVG-namespaced `DocumentFragment`
- Replaced `Snap(...)` / `Snap.parse(...)` calls.
- Renamed `molSnap` → `molSvg`; renamed `snapLogo`/`snapText` locals.
- Kept the existing Snap-shaped call flow to minimize behavioral changes.

`mulermoc-nom-51.html`:

- Removed:
  `<script src="js/vendor/snap/snap.svg-0.5.1.min.js"></script>`

`js/vendor/`:

- Removed `snap/`.
- Kept jQuery 4.0.0 and DOMPurify 3.4.17.

## 4. Rollback after promotion (historical stash instructions removed)

The pre-fix stash/reset instructions no longer apply. v51 is committed and live.

To roll back the promotion, prefer a revert commit so history stays intact:

```bash
cd /mnt/d/NICK/Projects/2023-EduProjects/Anastasia/MuLERMoCs-Anastasia
git log --oneline -5   # find the v51 promotion commit
git revert <promotion-commit>
```

v50 remains runnable at `mulermoc-nom-50.html`; no working-tree rewrite is
needed. Do **not** use `git reset --hard` or `git clean -fdx` on `main`.

## 5. Historical debugging steps (no longer needed)

The crash is resolved. The original investigation recorded the Firefox version,
URL, crash signature, and memory state; the decisive evidence was the crash
report’s `JSOutOfMemory` / `MozCrashReason: out of memory` entry, which led to
the `MuSVG.parse()` loop. The v51-with-Snap baseline at `1c81433` had the same
two pre-existing skeletal JSmol errors, so Snap removal was not the cause.

## 6. Historical retry strategy (superseded by the fix)

The incremental retry groups (`MuSVG` helper, update/logo removal, hydrogen
labels, compact labels, colors, numbering, nitro patches) are no longer needed.
The actual fix is the `MuSVG.parse()` HTML-parser + `adoptNode()` change
described in section 10.

## 7. Verification checklist (current state)

Firefox and Chromium:

- v51 loads without a crash.
- All 2D modes: condensed, expanded, skeletal, condensed zigzag.
- Representative molecules: alkanes, alkenes, alkynes, aromatics-free
  hydrocarbons, alcohols, dienes, enynes, ethers, esters, nitro, amines,
  halides, alkynes/allene, and the 18 new molecules.
- Mode switches, zoom, `fResizeViewers()`, and 2D/3D visibility changes.
- Condensed hydrogen labels and compact functional-group labels.
- Numbering replay.
- Atom colors on/off and C–H bond coloring.
- Highlighting and name-component highlighting.
- Nitrogen/nitro patches.
- Empty/missing representation handling.
- `grep` shows no Snap references in v51 HTML/JS/vendor.
- `node --check` passes on all v51 JS.
- v50 remains unchanged and runnable.
- `index.html` points to v51.
- Automated Chrome/Firefox matrix: passed (128/130; two pre-existing skeletal
  JSmol failures).
- Remaining manual coverage: 3D/highlights for the 18 new molecules, rich
  notes, authoring dialog, icon dropdown/skip icons, 2D/3D refit, JSmol
  local/CDN loader, and jQuery 4.

## 8. Known disposable test artifacts

The following may not survive a reboot and must not be relied on:

- `/tmp/opencode/molview51.before-snap-removal.js`
- `/tmp/opencode/node/`
- `/tmp/opencode/*.json`, DOM dumps, Chrome logs
- `C:\Temp\opencode-node\` test scripts/Node runtime
- temporary Chrome profiles under `C:\Temp\muler-*`

The pre-fix baseline for comparison is Git commit `1c81433`; the actual fix and
v51 promotion are in the follow-up commit together with this document.

## 9. Decision summary

- **Root cause:** `MuSVG.parse()` OOM infinite loop + XML parser error, not the
  98-molecule/core baseline and not an inherent Snap-removal problem.
- **Fix:** tolerant HTML parsing + `document.adoptNode()`; verified in Chrome
  and Firefox.
- **Release:** v51 is live (`index.html` → v51); v50 and earlier remain
  runnable.
- **Live impact:** v51 is now the public entry point; Snap is no longer loaded
  by v51.

## 10. Root cause and fix (2026-10-25 follow-up)

The original `MuSVG.parse()` parsed labels as XML and moved nodes with
`document.importNode()`. `importNode()` copies a node instead of removing it,
so the `while (doc.documentElement.firstChild)` loop never advanced and
allocated copies until the Firefox content process ran out of memory.

The Firefox crash report for `mulermoc-nom-51.html` (2026-10-25 17:38)
confirms this: `MozCrashReason: "out of memory: 0x0000000000000080 bytes
requested"` and `JSOutOfMemory: Reported`.

The XML DOMParser also logged `XML Parsing Error: not well-formed` for
malformed JSME label markup. Those calls returned `null`, but Firefox still
reported the parse error in the console.

Fix in `js/mulermoc-nom-molview-51.js`:

- Parse the generated markup with the tolerant HTML parser (`"text/html"`)
  instead of `"image/svg+xml"`.
- Move nodes with `document.adoptNode()` so the source node is removed and the
  loop terminates.

Verification completed:

- `node --check` passes on `js/mulermoc-nom-molview-51.js`.
- Chrome CDP: all 98 molecules in condensed mode plus the mode sample sweep.
  Only two pre-existing skeletal-mode JSmol failures remain
  (`butadiene_1_3`, `propadiene`); the same failures occur on the Snap baseline
  at commit `1c81433`.
- Firefox 158.0.1 headless via WebDriver BiDi: all 98 molecules in condensed
  mode plus the mode sample sweep. No XML parsing errors, no OOM, no runtime
  errors. The same two pre-existing skeletal JSmol failures remain.

The fix is committed with this document. The owner confirmed v51 works in
Firefox after the fix and promoted it live.
