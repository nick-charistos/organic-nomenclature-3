# muler-harness (headless verification)

Playwright + installed Chrome probes for the MuLERMoC v56 working tree.
Run from the repo root. Requires node + Playwright (`npm i playwright-core`
once, anywhere on NODE_PATH or in this dir) and a Chrome binary.

Assumptions (edit the constant at the top of each probe if yours differ):
- repo served at `http://localhost:8901` via `server.js` below
- Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`
  (override per-file via the `executablePath` line if needed)

Scripts (all read-only against the app; screenshots land next to the script):

- `server.js [port]` — minimal static file server for the repo root
  (no-cache, correct MIME incl. `.sdf`). Start first, in the background:
  `node tools/muler-harness/server.js 8901`
- `probe-final.js` — end-to-end smoke: cold load, select mode on, pick an
  atom, pick a bond, Esc clears, mode switch invalidates. Prints state JSON.
- `probe-pick7.js <mol> <condensed|expanded|skeletal> "atom,N [s]" ...`
  — generic pick tester: `atom,3` clicks the 3rd text anchor (0-based),
  `bond,2` clicks the middle of bond index 2, trailing `s` = shift-click,
  `empty` = click empty canvas. Prints resulting selection after each step.
- `probe-shift.js` — shift-accumulate check on ethane.
- `probe-frag2.js` — compacted-label (e.g. COOH) whole-fragment pick.
- `audit.js <port> <query|- > <width> <out>` — tooltip clip audit:
  measures every `[data-tooltip]` bubble against overflow ancestors and the
  viewport; prints TOTAL / SPILL count + offending entries.

Conventions: selection state lives in `window.MulerUserSelection`;
all pick/render functions fail closed (return null / no-op on any gap).
