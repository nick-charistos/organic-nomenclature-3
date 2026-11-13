# Chemistry review — `core-56.js` and `molview-56.js` (v56)

Date: 2026-11-13. Scope: all chemistry in [js/mulermoc-nom-core-56.js](../js/mulermoc-nom-core-56.js) (structure analysis, group detection, main-chain choice, numbering, naming, 3D mirror) and the chemistry paths of [js/mulermoc-nom-molview-56.js](../js/mulermoc-nom-molview-56.js) (draft sandbox, condensed-formula renderer, systematic Greek substituent variants, quiz chain comparison). UI, highlighting and layout code in molview was not reviewed.

Status: items 1–7 and the orientation items O1–O2 below are **fixed** in this change set. Everything under "Open / recommended" is documented but not changed.

## Verification

Regression page: [zz-test-core56.html](../zz-test-core56.html) (serve the repo root, e.g. `python -m http.server 8099`, open the page; title becomes `CORE56-DONE PASS|FAIL`, full JSON in `#out`).

- All 141 stored molecules: Greek name, English name, slot list, functional groups and main chain compared before/after, plus the 3D mirror (`fParseSDF3D` → `fDetectMolType3D` → `fCalcMainChain3D`) for all 141 stored SDFs. **0 differences** against `HEAD`.
- 31 drawn probes (SMILES → MOL → the draft path `fAnalyseStructure` / `fDetectMolType` / `fGuessName` + EN transliteration), each with an expected English name or an expected decline. **31/31 pass.**
- Not run: `node --check` (no Node on the review machine; the page loads and executes both files in Chrome), the interactive Chrome harness in `tools/muler-harness/`.
- Expanded ethane: browser clicks on three hydrogens attached to one carbon verified individual selection and paint, quiz rejection of H as carbon, and successful carbon-only quiz completion.

## Fixed

| # | Problem | Where | Before → after |
|---|---|---|---|
| 1 | Locants sorted as text (`[10,2]`) | `fGuessName`: double/triple-bond locants, nitro, alcohol/ketone, multi-FG | `10,2-dodecadiene` → `2,10-dodecadiene` (`dodeca-10,2-diene` → `dodeca-2,10-diene`) |
| 2 | Halogens silently dropped when another group is present | `fGuessName` multi-FG branch (local `fgOrder` had no halogen) | `ClCCO` named `ethanol` → `2-chloroethanol`; halogens are now substituent prefixes with their own locants |
| 3 | Locants of different substituent types shared one accumulator | multi-FG loop | one entry per substituent type, alphabetical by substituent name, each with its own locants (serine-like: `2-amino-3-hydroxypropanoic acid`) |
| 4a | Principal alcohol/ketone locant never emitted with other groups | multi-FG branch | `1-hydroxypentanone` → `5-hydroxypentan-2-one` (same length thresholds as the single-group path) |
| 4b | Wrong accent rule: `_principalEntry` used the first-inserted key, not the principal group | `fGuessName` | principal group (by `gFunctionalGroupsOrder`) now decides; removes `αιθάνόλη`-type double accents |
| 4c | Crash when amine/nitro was the principal group (`.O` undefined) | multi-FG branch | declines (`unsupported principal group`) |
| 4d | A C-C multiple bond in a multi-FG molecule lost its locant (`comp0` overwritten) | multi-FG branch | declines; none of the stored molecules combine the two |
| 5 | Unsupported groups/elements fell through to a hydrocarbon name of the carbon skeleton | `fGuessName` entry | whitelist (`gNamableElements`, `gNamableSingleGroups`, `gNamablePrincipalGroups`, `gNamablePrefixGroups`); everything else calls `fDeclineNaming`. `CCCN=O` was `propanal`, `CCS` was `ethane`, `CNC` was `methane`, `CCC=N` was `propane`, amines were `propaneamine` (wrong for 2-propanamine and the English form) |
| 6 | Polynitro lost its multiplier | nitro path | `1,3-nitropropane` → `1,3-dinitropropane` (empty prefix for one group, so mononitro is byte-identical) |
| 7a | Terminal `=O` on N classified as ketone/aldehyde | `fDetectMolType`, `fDetectMolType3D` | O on a nitro N is skipped (belongs to the nitro group); O on any other N → `unsupported` → decline. Pentavalent `O=N(=O)R` now named as nitro |
| 7b | Nitro detection accepted any N with ≥2 O (nitrate ester, N-oxide) | N branch of both detectors; `fIsNitroNitrogen` | nitro = exactly one C and two O on N |
| 7c | Nitro N anchor taken from `connList[N][0]`, which is an O when the O bond comes first (drawn from the O side → bogus `nitro off main chain` decline or wrong anchor) | new `fAnchorCarbonOf`, used in Step 5 (2D and 3D) and the nitro/multi-FG naming sites | `O=[N+]([O-])CCC[N+](=O)[O-]` and `[N+](=O)([O-])CCO` now name correctly |
| O1 | All alcohol/ketone/amine carbons counted as "principal" in the lowest-locant tiers | `fCalcMainChain` / `fCalcMainChain3D` Step 5 | only the senior of the three is principal; a junior one (OH beside C=O) is a prefix. `4-hydroxypentan-2-one`, not `2-hydroxypentan-4-one` |
| O2 | Ester (priority 4) outranked carboxylic acid (3) when choosing C1 | Step 5, 2D and 3D | acid 4, ester 3 (matches the header comment and `gFunctionalGroupsOrder`) |

Behavioural note: some structures that previously produced a **wrong** name now **decline** (amines, imines, nitroso, S/P compounds, hydroxy-ethers, esters mixed with other groups, multi-FG + C=C). For drafts this shows the existing "Engine failed — check the drawing" toast; stored molecules are unaffected. This follows the engine's fail-closed contract (v54.23: "a wrong locant is worse than no name").

Expanded-mode hydrogen selections remain hydrogen selections in the quiz as well as in the viewer; they do not count as their attached carbon. The earlier proposed H-fold was reverted.

## Open / recommended (not changed)

1. **Alphabetical order in core uses raw string compare** (`fGuessName` branch/halogen/nitro merge, `fCarbonBranchAlphabeticalKey`). `sec-`/`tert-` (Latin) sort before every Greek name, and the merged halogen/nitro groups sort with the `δι`/`τρι` multiplier included. molview's `fGRSubstSortKey` is correct; core should share it so the view and engine cannot disagree.
2. **Chain selection is unsaturation-first, then length** (pre-2013 convention). Probably intentional for the Greek curriculum, but it is not the 2013 rule (P-44.3: length first). Document it as a teaching decision. The all-or-nothing FG filter in `fRankChainPool` has no "maximum number of principal groups" fallback.
3. **Substituent tier ignores multiplicity** (`getSubstituentLocantSet` iterates `Object.keys(anchorCarbons)`, so geminal `2,2` counts as `2`). Later tiers rescue the cases checked; fragile.
4. **2D/3D drift.** The 3D Tier-4 alphabetical tie-break covers fewer graph types than 2D, and ~800 lines are duplicated. `fMatchNumberedMainChain3D` mostly hides this by mapping from the 2D chain. `fParseSDF3D` splits bond lines on whitespace, which breaks at ≥100 atoms (fixed-width columns merge).
5. **Terminal-group count prefix is capped at `δι`** for ≥3 groups (single-FG cyanide/aldehyde/acid and multi-FG principal). Three terminal groups cannot all be on a chain end, so this is a branch case that should decline.
6. **Cyclic input** is only guarded at the draft entry (`fMolDraftHasRing`); `fCalcMainChain` still falls back to listing all carbons if a ring reaches it another way.
7. **Hetero anchors elsewhere** (e.g. molview highlight code) may still assume `atomConnectivityList[n][0]` is carbon for a nitro N; only the core sites were changed.
8. **Amines are now out of scope** (decline). If wanted, add them next to alcohol/ketone with locants and an EN `-amine` suffix (the current EN transliteration produced `propaneamine`).

## What was found correct

- Lowest-locant tier order (suffix group → multiple bonds → double before triple → prefixes → alphabetical), `fCompareLocantSets` (first point of difference, not sums).
- Ester and carboxylic-acid pairing in `fDetectMolType` for the supported scope; formate and lactone guards in `fIsAcyclicSaturatedMonoesterGraph`.
- Condensed-formula renderer (`fMolDraftRenderNode` / `fMolDraftExpandedFormula`): standard valence, acid/aldehyde/nitrile/ester forms.
- `ALKYL_SYS_NUMBERING` and `GR_SYST_SUBST` are consistent with each other.
