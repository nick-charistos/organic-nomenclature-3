# Session handoff — 2026-10-15 (v46 batches 1+2 — batch 2 pending commit)

Owner instruction in force: **commit batch 2** (single commit, explicit file
list, zero `*45*`/`data_45.js` paths) and push to `origin/main`.
Batch 1 committed as `441be87` (push pending — no credentials in that
environment). Pre-batch-2 HEAD = `441be87`.

## Version map

- **v45 = pristine HEAD state.** 65 regs / 65 keys, pre-formate core, runnable
  at root (`mulermoc-nom-45.html`). Verified: all `*-45.js` parse OK.
  `*-45*` tracked files are byte-identical to HEAD.
- **v46 = working copy.** Mechanical `*45*` → `*46*` fork carrying:
  66th–69th molecules (`diethyl_ether` CID 3283, `isopropyl_methyl_ether`
  CID 11721, `methyl_methanoate` CID 7865, `isopropyl_ethanoate` CID 7915;
  69 regs / 69 keys, MOL strings byte-exact vs `mols/new_molecules/`),
  formate-ester fix (2D + 3D), iso-alkyl prefixes, common-ether euphony,
  ester highlight override. `index.html` → `mulermoc-nom-46.html`.
  Docs re-applied with v46 baseline (counts 69).
- New files (untracked): `mulermoc-nom-46.html`, `js/*-46.js` (5),
  `css/*-46.css` (2), 12× 2D MOL + 8× 3D SDF under `mols/` (inbox +
  `mols/nomeclature-moc2/` runtime copies, hash-matched).
- Modified tracked files: `index.html` (→46, owner-approved), `README.md`,
  `docs/CHANGELOG.md`, `docs/LAYERS-PLAN.md`, `docs/PROJECT-PLAN.md`,
  `docs/PROJECT-PLAN-GR.md`, `docs/SESSION-NOTES.md`,
  `docs/didactic-scenario-plan.md`, 2× `mols/new_molecules/dimethyl_*.mol`
  (ChemDraw redraws), `spt/init-3.spt` (default `zoom 80→50`, owner change).
- Post-handoff working-copy additions (all in `*46*` / `data_46.js` only,
  `*45*` + `data_45.js` verified untouched):
  - Grey C–H bonds (`molview-46.js` `fApplyCHBondColors2D`, expanded +
    colored-symbols gate; braces balanced).
  - MOL re-embeds: 12 new-molecule blocks (alignment redraws), 3 ester
    redraws, 2 dimethyl redraws (+1 skeletal trailing blank, inert).
  - Missing-title fix: first import had dropped MOL title lines (counts
    index 3→2 → JSME 0 atoms → `cyclic molecule` fallback); titles restored,
    195/195 counts-at-[3] audit passes. Corrects the old "no SMILES title" note.
  - Pre-import H gates: dimethyl expanded 18→20 (methine H's),
    iPr-Me-ether expanded 14→15 (central CH hydrogen); stale first save of
    the ether file caught by recheck.
  - ChemDraw CRLF normalized to LF on embed (no-CR asserted); working `.mol`
    files normalize via `eol=lf` on commit.
- Batch-2 additions (uncommitted working tree on top of `441be87`; v46 +
  shared `ui-icons.js` only, `*45*` untouched):
  - Icon consolidation: 12 svg* consts → `ui-icons.js` registry
    (`playSm` avoids scenario `play`); guarded aliases in `molview-46.js`.
  - `saveImage` inlined for v46 (registry + `[data-icon]` hydration + CSS);
    `zoomIn`/`zoomOut` added for later use. `.svg` file kept (frozen pages).
  - 2D zoom: `molZoom2D` (default 2.0) + `fZoom2D` (×1.25, 0.5–6.0) + −/+
    buttons left of 2D save; reset-on-molecule-load; `style2D.zoom` stored
    (legacy 2.0), Present stash / Exit restore.
  - 3D zoom: `fZoom3D` (`zoomTo IN/OUT`, live-only) + `#view3DTools` cluster.
  - Tool-button merge: `#view2DTools`/`#view3DTools` + `.viewerToolBtn`
    replace `.saveImgBtn`/`.zoomBtn`; zoom buttons join tooltip
    clip-avoidance geometry. Layout pixel-identical.
  - Per-molecule SMILES at boot into `nameExamples[key].smiles`
    (storage-only; `getSmiles()` + `smiles()` fallback, condensed source).
- Stale fallback: `C:\Users\nick\AppData\Local\Temp\opencode\v46-embed-work.patch`
  predates the fork — live tree is truth.

## What was verified headlessly (all passing, session 2026-10-15)

- 69×3 naming vs `names_euph.txt` (current truth): only specified lines move
  (`αιθανικός ισοπροπυλεστέρας`, `Ισοπροπυλομεθυλαιθέρας`,
  `αιθυλομεθυλαιθέρας`, `μεθανικός μεθυλεστέρας`); full pre-existing set
  byte-identical across the iso/euphony changes (195-combo gates).
- COMMON box labels for all 3 ethers; 3D classification snapshots identical;
  ester acid derivations 2D + 3D (3 modes × 3 esters: chains + bond counts).
- All `*-45.js` and `*-46.js` parse OK, braces balanced.

## Browser checklist (owner)

- DONE 2026-10-15: both esters load with correct names
  (`μεθανικός μεθυλεστέρας`, `αιθανικός ισοπροπυλεστέρας`), cyclic warning gone.
- Still pending: dimethyl/ethers × Condensed/Expanded/Skeletal + 3D;
  iso/common names in boxes + narration; `αιθ-`/`-αν-` acid scoping +
  `ethanoic_methyl_ester` regression; C–H grey (expanded + colors on/off);
  zoom-50 3D framing after the spt change; icon buttons everywhere (gears,
  narrate/read, box/cross/eye, comp eyes, save ×2, zoom ×4); 2D zoom steps +
  clamp ends + reset-on-load + mode-switch keeps zoom + Save→Present→Exit
  zoom round-trip; 3D zoom steps + framing reset + console watch on `zoomTo`;
  one Save → Present → Exit round-trip on v46; SMILES console check (69/69
  non-null, methane `C` spot-check).

## Resume tooling (`C:\Users\nick\AppData\Local\Temp\opencode\`)

- `verify_set.js [45|46]` — parse + reg/key counts + formate-fix flag.
- `regress_all45.js <out> [45|46]` — full naming dump; diff against
  `names_euph.txt` (truth), `names_v46.txt` (pre-iso), `names_after.txt`
  (pre-euphony… note: `names_iso.txt` = post-iso, `names_euph.txt` = latest).
- `verify_3d45.js [45|46]`, `verify_common46.js`, `verify_esterhl46.js`.
- Patch/replay scripts: `embed_new_mols.py`, `fork_v46.py`,
  `patch_formate_ester.py`, `patch_iso_core46.py`, `patch_iso_molview46.py`,
  `patch_euphony46.py`, `patch_ester_hl46.py`, `redocs_v46.py`, `bump_docs_69.py`.

## Open items / known nits

- ~~`isopropyl_methyl_ether_2D_Expanded.mol` counts `17 14` vs PubChem 3D
  `15 14`~~ — RESOLVED 2026-10-15: redrawn file is 15/14 (central CH
  hydrogen restored), re-embedded, audited.
- Scenario exports still stamp `"app": "mulermoc-nom-44"` (informational).
- CHANGELOG body still cites `*44*` paths under the old disclaimer (pre-existing).
- No `v45`/`v46` git tags exist (tags stop at `v44`).
