# New molecules → upgrading the naming algorithm

> **Current tree:** v59.25 (`mulermoc-nom-59.html`, `?v=59.25`). This plan covers
> the authoring→engine feedback loop introduced in v59.23 and the order in which
> the remaining naming-scope gaps should be closed.

## 1. Why this exists

The naming engine is correctly **fail-closed**: `fDeclineNaming()` throws
`[NOM-DECLINE]` instead of guessing a name for a structure it cannot express
(`js/mulermoc-nom-core-59.js`). That is the right contract for teaching, but it
used to make the same structures impossible to *store*, so the engine could
never be extended against real test cases: you could not keep the molecule that
exposed the gap.

v59.23 separates the two concerns:

- **naming** stays fail-closed — no name is invented, no wrong name is stored;
- **authoring** accepts the structure as an **engine test molecule** and records
  a precise diagnostic trace in the custom record.

The accepted record is the test fixture: draw → Submit → Accept → save/export.
`Export JSON` is the canonical handoff (`format: "mulermoc-molecule"`,
`schemaVersion: 2` — a **provisional** flat payload; the frozen corpus record is
**v3**, see `docs/MOLECULE-DATA-ROADMAP.md`: all four mol blocks, `provenance`,
`oracle`, `naming.rule` and a regenerable engine-stamped `derived` block); the
legacy `MULERMOC_*.js` save still works with the current script loader. Either
way the molecule sits in the menu with its formula, and its record says exactly
which guard rejected it and which atoms/groups triggered it.

## 2. What used to block (the 18 decline guards)

All 18 live in `fGuessName()` (`core-59`). Grouped by what the engine cannot
express:

| Group | Guards | Missing capability |
|---|---|---|
| Off-chain multiple bonds | `C-C double bond off main chain`, `C-C triple bond off main chain` | unsaturated branch names (`-ενυλ`, `-ινυλ`) and their locants |
| Off-chain groups | `halogen off main chain`, `nitro off main chain`, `alcohol O off main chain`, `ketone O off main chain`, `<group> O off main chain` | locants for groups on branch carbons |
| Multi-FG locants | `multi-FG halogen off main chain`, `multi-FG substituent off main chain` | one merged locant list across types |
| Multi-FG layout | `multi-FG with C-C multiple bond` | a slot layout carrying group locants **and** bond locants |
| Principal groups | `unsupported principal group`, `unsupported substituent group`, `unsupported group` | amine/amide/thiol/ether-as-principal tables |
| Elements | `unsupported element` | S, P, Si, B … hetero prefixes/suffixes |
| Halogen type | `unsupported halogen` | elements outside F/Cl/Br/I on the halogen path |
| Decorated nitro | `decorated nitro with parent multi-bond` | branch-nitro + multi-bond interaction |

These reasons are the engine's own strings, so the corpus is directly
groupable by `naming.reason`.

## 3. The v59.23 contract

`fMolDraftSandboxAnalyse()` (`molview-59`) now distinguishes three outcomes:

| Outcome | Trigger | Effect |
|---|---|---|
| named | `fGuessName` returns a name | normal path, unchanged |
| **unsupported** | `fGuessName` throws a `mulerDecline` error | accepted as a test molecule; diagnostics stored |
| failed | unparseable drawing / ring / unexpected throw | still blocked, old toasts |

On the unsupported path:

- Submit shows the warning toast + status line
  «Εκτός κάλυψης μηχανής — μόριο δοκιμής: <reason>»;
- the preview replaces the name rows with the diagnostics block (reason, guard
  location, feature list, chain/branch counts); PubChem/OpenClatura rows stay
  visible but carry a neutral “·” instead of a fake match glyph;
- `nameComponentsList` is cleared before the record is built, so no stale
  name/components from the previous molecule leak in;
- Greek→EN transliteration and oracle auto-verdicts are skipped (there is no
  prediction to validate);
- Accept writes `grName: ""` plus the `naming` block, and toasts
  «Αποθηκεύτηκε ως μόριο δοκιμής…»;
- selecting the molecule later shows a note in the name panel
  («Μόριο δοκιμής — δεν έχει καταγραφεί ελληνική ονομασία.») with a
  `<details>` view of the stored diagnostics;
- the generated data-file header says
  `Naming: UNSUPPORTED by the engine — <reason> (<call site>)`.

## 4. Record schema (additive)

Absent `naming` = a normally named molecule, so every existing record and file
is unaffected. `rule` is optional and defaults to `school-pre2013`; it exists so
a future second rule era can record its own decline without a schema change.
Per-variant diagnostics are deferred until that era exists — today `naming`
stays molecule-level (owner, 2026-11-26).

Chain/name/component/classification data are **engine output** and belong in the
regenerable `derived` block of the v3 record, not in the stored record body
(`docs/MOLECULE-DATA-ROADMAP.md`). The decline trace below is different: it is an
observation about a specific engine version and cannot be recomputed once the
engine learns the case, so it **is** stored.

```json
"grName": "",
"slots": [],
"naming": {
  "status": "unsupported",
  "rule": "school-pre2013",
  "reason": "C-C triple bond off main chain",
  "callSite": "mulermoc-nom-core-59.js:3841",
  "frame": "at fGuessName (…/mulermoc-nom-core-59.js?v=59.23:3841:15)",
  "at": "2026-11-26T08:29:34.202Z",
  "features": [ … ],
  "snapshot": { … }
}
```

### `features[]` (structural findings, conservative — no heuristics)

| `code` | Fields | Meaning |
|---|---|---|
| `element` | `element`, `atoms[]` | element outside C,H,N,O,F,Cl,Br,I (1-based atom numbers) |
| `group` | `group` | detected functional group the slots cannot express |
| `group-off-chain` | `group`, `element`, `atoms[]` | namable hetero group with atoms off the main chain (halogen/nitro/alcohol-O/ketone-O/… ) |
| `group-principal` | `group` | functional group not in the principal-group table |
| `group-substituent` | `group` | group not in the prefix/substituent table |
| `multi-fg` | `groups[]` | more than one functional group (layout gap) |
| `halogen-type` | `element`, `atoms[]` | halogen outside F/Cl/Br/I |
| `nitro-multibond` | `nitroAtoms[]`, `doubleBonds[]`, `tripleBonds[]` | nitro together with a C-C multiple bond |
| `bond-off-chain` | `order` (2/3), `bond`, `atoms[2]`, `onChain[2]` | C=C / C≡C with an atom off the main chain |

Together these cover all 18 decline guards; a guard may emit more than one
feature (for example multi-FG + off-chain group).

### `snapshot` (engine state at the guard)

`atoms`, `bonds`, `elements` (counts), `groups` (live `functionalGroupsList`),
`mainChain` (1-based numbers), `mainChainLength`, `branchCarbons`,
`multiBondsCC {double[], triple[]}` (1-based bond numbers), `mainChainMode`,
`molType`.

`callSite` is parsed from the throw stack and normalized to
`file:line`, so it survives later edits without anyone maintaining a table of
guard line numbers. `frame` keeps the full stack line (with the asset version).

## 5. Where the code lives

| Piece | Location |
|---|---|
| Decline trace (`fNamingCallSite`, `fNamingFeatureAudit`, `fNamingDeclineSnapshot`, `fDeclineNaming`) | `js/mulermoc-nom-core-59.js` (~2333) |
| Decline → `{ok, unsupported, decline}` | `fMolDraftSandboxAnalyse` (`molview-59` ~8150) |
| Provisional label + preview block + shared diagnostic lines | `fMolDraftUnsupportedName`, `fMolDraftUnsupportedHTML`, `fMolDraftUnsupportedLines` |
| Submit/Accept handling + unsupported 3D bypass | `fMolDraftSubmit` / `fMolDraftAccept` |
| JSON export | `fMolDraftJsonRecord`, `fMolDraftDownloadJson`, `fMolDraftExportJsonAll` |
| Panel note | `fShowNameAnalysis` |
| File header note | `fMolDraftDownloadSingle` / `fMolDraftDownloadBundle` |
| GR/EN strings | `js/mulermoc-nom-lang-59.js` (`namingUnsupported*`, `submitUnsupported*`, `namingDiag*`) |

## 6. Test-corpus workflow

1. Draw the structure (New molecule draft).
2. **Submit** — if the engine declines, the toast says so; the preview shows
   the reason, the guard line and the offending atoms/bonds.
3. **Accept** — stored in the session with `naming` populated. Test molecules
   do not need a 3D model; the 3D gate is bypassed for them.
4. **Export JSON** for handoff/archival (`<key>.json`, or a JSON bundle for
   several). The legacy **Save new molecules** action still writes
   `MULERMOC_*.js` for the current script loader.
5. For the legacy JS path: drop the file next to the data file and register
   `<script src="js/MULERMOC_<name>_data.js?v=59.NN"></script>`.
6. The molecule appears in the menu (formula label) and can be re-selected
   while the engine is being extended.
7. When the engine learns the case, re-open **Edit** → Submit → Update. A named
   result writes `grName`/`slots` and the update path **deletes** `prev.naming`,
   so the record becomes a normal named molecule. The panel note disappears on
   its own (it only renders while `nameComponentsList` is empty).

Keep the corpus files small and separate from the shipped data file until the
case is understood; they are test fixtures, not curriculum content.

## 7. Suggested upgrade order

Ordered by (a) how many real student molecules a gap blocks and (b) how local
the engine change is.

1. **Principal groups (amine, then amide/thiol).** Add the missing
   principal-group entries and suffix layout. Small, self-contained; unlocks
   simple amine-only molecules first (currently `unsupported principal group
   amine`).
2. **Off-chain halogen / nitro / alcohol-O / ketone-O.** The layout already has
   substituent slots; this needs a *branch locant* convention on the branch
   name (the decorated-branch machinery from v54.23 is the natural host).
3. **Off-chain C=C / C≡C.** Same locant work plus the `-ενυλ` / `-ινυλ`
   branch forms; also removes `decorated nitro with parent multi-bond`.
4. **Multi-FG + multiple bond layout.** Needs one more slot pair (bond locants
   beside group locants); do after 1–3 so the layout is touched once.
5. **Elements (S, P, Si, B).** Prefix/suffix tables and valence handling;
   largest scientific surface, smallest immediate student demand.

Each step is accepted when:

- the stored corpus entries with that `reason` name correctly;
- `probe-*` naming families stay green;
- existing stored molecules are byte-identical (no re-generation needed unless
  a slot layout changes — then re-Accept the affected customs).

## 8. What is still blocked (deliberately)

- **Rings** — `submitRing`, out of scope for the acyclic curriculum.
- **Unparseable drawings** — the MOL must be readable before anything is stored.
- **3D gate** — bypassed for `naming.status === "unsupported"` test molecules;
  normal molecules still require `sdf3D` before Accept.
- **Auto-linearize** — if `fLinearizeMol` cannot build a carbon chain at all
  (no carbon), Submit aborts; turning auto-linearize off bypasses it.

## 9. Regression safety

- No triple bond / no unsupported feature ⇒ the generator and all naming paths
  are byte-identical; only the throw now carries extra fields.
- `naming` is written only on the unsupported path; `undefined` drops the key
  from JSON, so named records are byte-stable.
- Normal Submit/Accept flows take exactly the same branches (`_unsupported`
  false everywhere).
- The diagnostics are pure reads of already-computed globals (no new atom
  walking beyond the carbon branch list), so they cannot alter engine state.

## 10. Open decisions

- Should the menu badge the test molecules (e.g. a small “⚠” next to the
  formula) so authors do not mistake them for curriculum content?
- Keep the corpus inside `js/` (loads on every boot) or move it to
  `tools/muler-harness/data/` and import only for engine work? The record
  format is the same either way.

## 11. Verification (v59.23)

`node --check` on all `js/*-59.js`, `git diff --check`, a headless check of the
decline trace (reason / call site / features / snapshot populate), the JSON
export shape and the unsupported-record 3D bypass. `probe-final` and
`probe-scenario-quiz` are green; the owner verifies the live flows
(Submit/Accept/export/select of an unsupported structure).
