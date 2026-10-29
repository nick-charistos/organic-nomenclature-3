# Thesis esters — ported 2026-10-30 (viewer display fixes pending)

Source: `yianni/thesis-work` @ `3f046ad` (`thesis-work` branch).
Our baseline before this change: v52 live, 136 `nameExamples` keys.
This change: **data + core + acid-parent count ported; 4 viewer display fixes
pending; JSME split-mode fix included**.

## What was added

- `js/jsme-nick-nomeclature-moc2-data_52.js`: 5 saturated acyclic monoesters
  (136 → 141 keys, order preserved, existing 136 untouched):
  - `sec_butyl_ethanoate` — `CH3COOCH(CH3)CH2CH3`, 3D `[7,8]`
  - `butyl_propanoate` — `CH3CH2COOCH2CH2CH2CH3`, 3D `[8,7,9]`
  - `tert_butyl_methanoate` — `HCOOC(CH3)3`, 3D `[7]`
  - `isobutyl_2_methylpropanoate` — `(CH3)2CHCOOCH2CH(CH3)2`, 3D `[8,5,9]`
  - `isopropyl_2_3_dimethylbutanoate` — `CH3CH(CH3)CH(CH3)COOCH(CH3)2`, 3D `[1,2,3,4]`
  - Each: 3 embedded 2D MOLs (current orthogonal expanded forms from
    thesis-work) + `window.MOL2D` registration in our `let`/`window.MOL2D`
    style. No `moveto` (shared `init-3.spt` zoom 50 default applies).
- `mols/nomeclature-moc2/*_3D.sdf` (5, byte-identical to thesis-work).
- Header comments removed; functional notes kept inline (named parent vs
  fragment, depict constraint at `jsmeOnLoad`).
- `js/mulermoc-nom-core-52.js` — ported guard
  `fIsAcyclicSaturatedMonoesterGraph` + 6 integration sites.
- `js/mulermoc-nom-molview-52.js` — ported acid
  parent-chain helpers + `compCarbonsCount` conditional text/highlight.
  Still pending: 4 display fixes.
- `js/mulermoc-nom-teaching-52.js` — no port (diverged variant).

## What is NOT ported yet (needs your sign-off)

1. **Core naming: PORTED 2026-10-30** — `fIsAcyclicSaturatedMonoesterGraph` +
   `fSupportsAlkylBranchPrefixes` ester branch + 2× `fOrientChainPath` tiers +
   `fOrientChainPath3D` + `fRankChainPool` tie-break + `fGuessName` acidLen.
   Remaining: browser naming pass on the 5 new esters + 136-molecule regression.
2. **Viewer display** (`molview-52.js`): `fRemainingImplicitCarbonHydrogens`,
   skeletal acid-left, `fFormylHydrogenLeftMol` + condensed HC label,
   `fHideEsterSkeletalCarbonHydrogens`. Current v52 viewer renders the 5 new
   esters without these; compare and decide port vs keep-current.
3. **Teaching**: nothing to port (diverged Namelecule variant; our alkoxy table
   + ester toggle already cover esters once core lands).

## How to review

- `git diff --stat`, `git diff -- js/...data_52.js | grep '^+'` for the 5 keys.
- `node --check` on data/core/molview/teaching.
- Browser: free-browse the 5 new esters in condensed/expanded/skeletal + 3D;
  confirm menu grouping/sorting lists them; click name components and compare
  against thesis-work screenshots/reports (`docs/ESTERS-*-20261029.md`,
  professor `main-esters-update` report).
- After sign-off: full naming/highlight/numbering matrix +
  CHANGELOG/docs + version bump if needed.
- 2026-10-30 JSME split-mode fix (same tree): main applet back to
  `"depict, marker"` (depiction pipeline required by `fUpdateSVG`
  highlight reads); ORGNL stays full-edit for future inputs.

## References (thesis-work)

- `docs/ESTERS-DISPLAY-20261029.md` (4 approved display fixes)
- `docs/ESTERS-ORTHOGONAL-MOL-20261029.md` (expanded MOL convention)
- `docs/professor-20261029/main-esters-update` (professor report)
- Core SHA `d2138418…`, 9 esters total (4 old + 5 new), 141 molecules.
