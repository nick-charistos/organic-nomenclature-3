# muler-harness (headless verification)

Playwright + installed Chrome probes for the MuLERMoC v56 working tree.
Run from the repo root. Requires node + Playwright (`npm i playwright-core`
once, anywhere on NODE_PATH or in this dir) and a Chrome binary.

Assumptions (edit the constant at the top of each probe if yours differ):
- repo served at `http://localhost:8901` via `server.js` below
  (override via `MULER_BASE`, e.g. `MULER_BASE=http://localhost:8902`);
- Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`
  (override via `MULER_CHROME`; if the path does not exist the probe lets
  Playwright resolve the browser on its own).
- Cold-load waits use `waitForFunction` on the JSME SVG + selection API
  (30 s timeout) + short settle, not fixed 14 s sleeps.

Scripts are read-only against the app; screenshots land in the current
working directory.

- `server.js [port]` — minimal static file server for the repo root
  (no-cache, correct MIME incl. `.sdf`). Start first, in the background:
  `node tools/muler-harness/server.js 8901`
- `probe-final.js` — end-to-end smoke: cold load, atom pick, hover preview,
  empty-canvas clear, and mode-switch invalidation. Prints state JSON.
- `probe-pick7.js <mol> <condensed|expanded|skeletal> "atom,N [s]" ...`
  — generic pick tester: `atom,3` clicks the 3rd text anchor (0-based),
  `bond,2` clicks the middle of bond index 2, trailing `s` = shift-click,
  `empty` = click empty canvas. Prints resulting selection after each step.
- `probe-shift.js` — shift-accumulate check on ethane (CTM-derived 2nd pick, asserts accumulation).
- `probe-quiz.js` — main-chain quiz: checks bond hover/click suppression without losing atom picks in condensed, expanded and skeletal modes, plus normal bond behavior outside the quiz; checks live numberless hints, exact success, reverse direction and scrambled order; screenshot `quiz-green.png`.
- `probe-fg-quiz.js` — FG suffix quiz (set-only, numberless, atoms-only): ethanol O pick exacts with no badges, carbon-first gives a numberless non-hetero/non-gap hint, hydrocarbon -ιο never arms, bond clicks are ignored while armed, condensed COOH label click takes the heavy fragment, and expanded ethanal accepts its explicit aldehyde H.
- `probe-loc-quiz.js` — locant-box quiz (shared FG task, purpose "loc", chain-first prerequisite): EN pentanone_2/comp4 and GR pentanone_2/comp0 redirect to chain, then auto-arm loc with numbering aid and a cleared chain verdict; full picks exact; dione comp7 completes the same cycle.
- `probe-bond-quiz.js` — bond quiz (number locants redirect to chain; type boxes arm directly): butene_1 comp6 double-bond atoms exact, bond-line pick exacts alone, bonds hover in quiz; butyne_2 comp4 locant redirects, solves, auto-arms triple and exacts on a bond click; methyl_3_pentyn_4_ol_2 comp4 triple locant in an FG-position box (unarmed names the triple bond, never hydroxyl; armed redirects, auto-arms bond); ethyl_3_methyl_4_octen_3_yn_5_dione_2_7 comp4 double locant alpha to a 2-keto (same bond-not-FG contract); butadiene_1_3 reversed 4-atom set; ethane "αν" all-singles exact with single-bond wording (never "multiple bond"); wrong picks give bond-flavored numberless hints.
- `probe-branch-quiz.js` — branch quiz (locants redirect to chain; name boxes arm directly; name = short prompt, locant = long "indicated position" prompt; numbering aid on locants only): hydrocarbon and ester-alkyl behavior; systematic ether alkoxy boxes arm O + alkoxy chain (2-ethoxypropane name direct, locant via chain); all six branch boxes of ethyl_4_isopropyl_3_methyl_2_hexanal in traditional and systematic naming with independently checked targets and rewards; Greek condensed selection, wrong picks, representation and active-chain changes; acid, ketone, alcohol, ester and ether branches; FG, bond and alkoxy precedence, ambiguous-piece fallback, and molecule switching.
- `probe-mode-quiz.js` — selection-mode 2D-style switches: an armed quiz must keep the viewer clean (0 green shapes), keep the target/prompt/comp5 selection and drop the picked atoms; picking the chain in the new style then shows the success line + green; a post-exact switch stays clean; with select mode off the classic component highlight still paints and survives a switch.
- `probe-explain-all.js` — explain-all overview under selection mode: open/close cycles build exactly one table with per-component cells (no nested tables, no green paint), close restores the quiz prompt (or clears the panel), a style switch rebuilds cleanly with the quiz target kept, and an exact verdict keeps the table while painting green.
- `probe-frag2.js` — compacted-label (e.g. COOH) whole-fragment pick (free selection):
  CTM-derived center click, asserts whole-fragment on first click and
  toggle-clear on re-click; hard-fail on miss or page error.
- `probe-coverage56.js` — gap coverage: multiple H picks on one carbon in expanded mode (free picks stay atomic; armed-quiz H clicks redirect to the parent carbon with toggle symmetry and H-completed chains still exact), in-page
  molecule-switch sticky re-arm (contents cleared, stays armed, quiz re-armed + prompt restored when comp5 sticks; condensed carbon-only anchor pick on the post-switch molecule),
  `allowSelect` gating (hide entry when off, uncheck-while-active exits),
  Present block (toggle no-op + CSS hides the entry). Hard-fail.
- `probe-compact-main.js` — main-chain versus free compacted-label semantics: COOH/HCOOH/CN resolve to the anchor carbon under a main-chain target, NO2 stays a fragment, free selection stays a fragment; checks C-only paint, hover box, badge, exact reward, the free-mode backplate edge, clear/marker restore and methanal (no highlight geometry).
- `probe-skel-joints.js` — skeletal vertex→atom assignment: for 16 molecules across aldehydes, ketones, acids, ester, alkene, alkyne, nitrile and nitro, asserts every vertex pick is an endpoint of all its incident bonds, no offset multi-line end is left unmerged, and every carbonyl carbon's incident-bond line endpoints (the old "click the carbon, get the oxygen" spot) select the carbon. Guards the C=O offset-end merge in `fMulerSelectVertices`.
- `audit.js <port> <query|- > <width> <out>` — tooltip clip audit:
  measures every `[data-tooltip]` bubble against overflow ancestors and the
  viewport; prints TOTAL / SPILL count + offending entries.

Conventions: selection state lives in `window.MulerUserSelection`;
all pick/render functions fail closed (return null / no-op on any gap).
