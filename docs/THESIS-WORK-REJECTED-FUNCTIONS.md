# v52 — Functions not adopted from `thesis-work`, and why

> **To:** Yannis (`yanisken9`)
> **From:** Nick / MuLERMoCs
> **Date:** 2026-10-28
> **Subject:** v52 acid extension — what we took, what we left out, and why
> **Committed tip reviewed:** `aae82c8` (`thesis-work`, 2026-10-28)

## What we adopted (for context)

All chemistry needed for the 10 new acids went in verbatim:

- Core: `fIsAcyclicSaturatedMonoacidGraph`, `fIsAcyclicUnsaturatedAcidGraph`,
  `fSupportsAcyclicAcidGraph` + 8 integration sites (branch-prefix gate with
  off-parent-unsaturation refusal, locant tiers, diacid `forcedC1` tie,
  alphabetical ties, `fRankChainPool`, C3 locant exception). Our
  `mulermoc-nom-core-52.js` is now byte-identical to yours for these regions.
- Data: 10 records + 30 embedded MOLs + 10 runtime SDFs (hashes match yours).
- Viewer: only `fSequentialKetoneNumberingTarget` extended with the 10 keys.

Everything below was deliberately left out. None of this is a judgment on the
quality of your work — each item conflicts with a local v52 contract or has a
blast radius far beyond the 10 new molecules. For each item I note what would
be needed to reconsider it.

---

## 1. `fSkeletalLayoutMol` + `fApplySkeletalLayout` (+ `turn`, `bounds`, `cross`, `crosses`, `atomBondDistance`, `safeRepair`)

**What it does:** takes a stored V2000 skeletal MOL, rotates the whole molecule
so the numbered parent lies flat left-to-right, and straightens bent degree-2
sp carbons by swinging one separable side. Returns a transient display copy;
source MOLs are never rewritten.

**Why rejected:** it is a runtime re-geometry layer over all ~133 skeletal
forms, not a depictor. It preserves input bond lengths verbatim and never
re-idealizes angles except the single sp case, so it cannot produce
ChemDraw/RDKit-Depictor-grade layouts — but it can silently change the geometry
of every validated molecule on screen. Our contract is: the authored MOL
(ChemDraw/KingDraw → RDKit sanitization → horizontal-chain convention →
provenance → Firefox check) is the source of truth, and the viewer never moves
atoms. If skeletal uniformity is ever revisited, it should be an **offline
re-authoring trial** (RDKit Depictor or JSME-from-SMILES, before/after diff,
full-library review) — not a per-load rotation hook.

## 2. `fGetUniform2DLibraryFrame` + `fFit2DSVG`

**What it does:** scans the whole `window.MOL2D` inventory for the largest
molecule, derives a common frame, and refits every SVG (lines/labels/paths)
into its box on resize/zoom.

**Why rejected:** two owners of the same scale. JSME's
`setMolecularAreaScale(molZoom2D)` plus the manual zoom buttons already own
molecule size; adding a library-wide frame plus an always-on SVG refit makes
sizes jump unpredictably and re-touches all 377 forms for zero chemistry gain.
The viewer refits only to avoid clipping, never to re-idealize.

## 3. Global 2D scale/font targets (`data-namelecule-2d-scale="1.15"`, `data-namelecule-2d-font-size="22"`)

**What it does:** enlarges the common 2D font (15% scale, then a 22px target
with shrink-to-fit fallback).

**Why rejected:** same reason as (2), one level up. A global font target
overrides the author's zoom choice and breaks size comparability between
methane and C13 structures across screens. Short names keep their size here;
long names use the local fitter (see 4).

## 4. `fFitNameToWidth` + `fScheduleNameFit` (replacing `fFitNameComponents`)

**What it does:** keeps the one-line chemical name fitted via `--nl-name-scale`
with a compact-padding mode, scheduled through ResizeObserver + `fonts.ready`.

**Why rejected:** functionally the same goal as our `fFitNameComponents`
(0.7 floor + horizontal-scroll fallback), but a different contract
(`--nl-name-scale`, tight padding, observer loop). Adopting it means
re-validating every long name in the library for no new chemistry. We keep the
local fitter that the v48–v52 line was verified against.

## 5. `fPadExpandedCarboxylLabels` (+ condensed-gap mask change in `fAddHydrogens2SVG`)

**What it does:** enlarges JSME's white label masks behind carboxyl C / carbonyl
O (6% of font size, from rendered bounds), and narrows the Condensed mask to
the C glyph so vertical C–C bonds visually reconnect.

**Why rejected:** presentation-only changes with library-wide reach (all 15
acids' Expanded forms, plus mask logic shared with non-acids). The 10 new
acids render acceptably with the existing masks; the 11 old acids' masks are
validated bytes we do not want to retouch inside a molecule import. Welcome as
a separate, screenshot-pair trial if you want to propose it.

## 6. Old-acid Expanded MOL rewrites (horizontal O–H, 11 molecules)

**What it does:** rewrites stored Expanded MOLs so every COOH shows an explicit
horizontal O–H, both directions outward.

**Why rejected:** it changes validated source bytes of existing molecules
outside the additive-import rule (new molecules only; old bytes immutable).
The new acids ship with your geometry as-supplied. Rewriting the old 11 is a
standalone proposal with its own review, not part of this import.

## 7. Split acid-prefix boxes (`fSeparateAcidPrefixBoxes`, `fAcidPrefixBoxGroups`, `compAcidNumber3`/`compAcidSub3`, pilot rule gating)

**What it does:** shows `[3-][αιθυλο][-2-]…` as separately clickable boxes on
the 3 most branched acids, gated by a page flag, plus scenario pilot gating of
rule panels.

**Why rejected:** a display-contract change (name → boxes mapping) active only
behind a Main-only flag, plus a rule-panel behavior change
(collapsed-until-clicked is our verified contract). The names, components and
highlights are identical without it. If you want it, propose it as a UI-only
change with click/numbering/eye-toggle coverage, decoupled from molecule
imports.

## 8. Namelecule product layer (`design/`, `react-preview/`, theory badges, `AGENTS.md`, welcome/library, scenario gating, professor reports)

**Why rejected:** standing policy since v49 (`docs/STUDENT-IMPORT.md`):
import student chemistry (molecules, engine, scenarios); keep the local product
line (name fit, branch highlight/explain); do not import the Namelecule shell.
No chemistry depends on it.

---

## Open questions for you

1. C3 exception: for unsaturated acids with branches and a ≤3-carbon parent we
   keep the multiple-bond locant (e.g. `2-προπενικό`). Confirm this matches
   your school convention.
2. `sec-`/`tert-` connector convention in ether common names — still the
   `…ο-` form we kept?
3. If you want any item of §1–§7 reconsidered, which one first, and can you
   send it as an isolated proposal (before/after bytes + screenshots) rather
   than bundled with molecules?

Pending on our side: real-browser naming/highlight/JSmol click-through for the
10 acids (no JS runtime in the import environment) — documented as pending in
`docs/CHANGELOG.md`.
