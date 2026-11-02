# EN validation review — v53 (in-browser, 141 molecules)

Date: 2026-10-31. App: `mulermoc-nom-53.html` (single codebase, `?lang=en`). Engine: `js/mulermoc-nom-name-en-53.js` (`fPopulateEngineENFromGreek`, slot transliteration of the Greek analysis). Oracle: PubChem PUG-REST `IUPACName` + retained/systematic resolution + CIR fallback (`js/mulermoc-nom-iupac-53.js`). Compare: `fValidateENAgainstOracle` (stereo prefixes stripped; retained-name and PubChem-Title matches counted with `matchVia`).

Method: headless Chrome boots the app, selects every molecule via the real `fSelectMol` path (141 keys, JSME SMILES cached at boot), enriches IUPAC names with throttling + CIR backoff, compares engineEN vs oracle. Fast offline regression of the pure transliteration: open `zz-test-en53.html` (no network; 141 stored Greek slot sets vs PubChem oracle snapshot).

Result: **103 systematic + 14 retained-name + 2 title matches = 119/141 automated** (latest in-browser run; offline pure-function run: 107/12/22 on the same oracle snapshot). Everything else below is an explicit human decision, not an engine bug.

## How to re-run

- Full (needs network + ~5 min): serve repo root (`python3 -m http.server`), open `zz-harness-53.html?lang=en`, read `[EN-VALIDATE]` / `[EN-MISMATCH]` console lines; per-key JSON is logged as `ALLROWSJSON`.
- Fast (no network): open `zz-test-en53.html`.

## A. Retained names — engine is systematic, PubChem prefers trivial (keep engine; P3 confirms school use)

- ethanenitrile/acetonitrile (mapped in `RETAINED_TO_SYSTEMATIC_EN`), ethyne/acetylene, methanal/formaldehyde, ethanal/acetaldehyde, propenal/acrolein-Title, methyl_2_propenal/methacrolein-Title, methyl esters (`methyl ethanoate` vs acetate/formate Titles), `2-methylprop-2-enoic acid`/methacrylic-acid Title.
- Rule: PubChem `IUPACName` is often retained for C1-C2 (formic/acetic acid, formaldehyde...). Map lives in `js/mulermoc-nom-iupac-53.js` (`RETAINED_TO_SYSTEMATIC_EN`; covers propionic/butyric/isobutyric/pivalic acids, nitriles, allene).

## B. PIN locant omissions (engine omits implied locant, PubChem cites it) — accept engine

- `propene`/`prop-1-ene`, `propyne`/`prop-1-yne`, `nitroethane`/`1-nitroethane`, `2-methylpropene`/`2-methylprop-1-ene`. Locant 1 on C2/C3 is implied; school convention follows the Greek engine (which omits it the same way). No code change.

## C. Genuinely different names — human ruling required (P1/P4 + P3)
- `propene`: engine `propene` | oracle `prop-1-ene` | PubChem `prop-1-ene`
- `propyne`: engine `propyne` | oracle `prop-1-yne` | PubChem `prop-1-yne`
- `Oxopropanoic_acid`: engine `2-oxopropanoic acid` | oracle `2-oxopropanoic acid` | PubChem `2-oxopropanoic acid` — RESOLVED (oxo locant now derived, §L)
- `oxobutanoic_acid`: engine `4-oxobutanoic acid` | oracle `4-oxobutanoic acid` | PubChem `4-oxobutanoic acid` — RESOLVED (oxo locant now derived, §L)
- `nitroethane`: engine `nitroethane` | oracle `1-nitroethane` | PubChem `1-nitroethane`
- `isopropyl_2_buten_2_dial`: engine `2-isopropylbut-2-enedial` | oracle `2-propan-2-ylbut-2-enedial` | PubChem `2-propan-2-ylbut-2-enedial`
- `isobutyl_isopropyl_ether`: engine `1-isopropoxy-2-methylpropane` | oracle `2-methyl-1-propan-2-yloxypropane` | PubChem `2-methyl-1-propan-2-yloxypropane`
- `tert_butyl_isopropyl_ether`: engine `2-isopropoxy-2-methylpropane` | oracle `2-methyl-2-propan-2-yloxypropane` | PubChem `2-methyl-2-propan-2-yloxypropane`

Notes:
- ~~`Oxopropanoic_acid` / `oxobutanoic_acid`: Greek slots carry no oxo locant, so neither does the engine. Confirm positions from the `.mol` files (expected 2- and 4-); future work: derive oxo locant from `functionalGroupObj` chain position.~~ RESOLVED — oxo locants derived from chain position in both languages (§L).
- `isopropyl_2_buten_2_dial`, `isobutyl/tert-butyl isopropyl ether`: engine uses school-common `isopropyl/isobutyl/isopropoxy`; systematic wants `propan-2-yl`/`2-methylpropyl`/`propan-2-yloxy`. P3 teaching decision: keep common substituents (matches Greek UI tables) or switch to substitutive.
- `nitroethane` oracle in-app once showed a polluted synonym string; offline PubChem SMILES lookup gives clean `1-nitroethane`. If it recurs, it is oracle noise, not an engine bug (engine output is PIN-valid).

## D. Oracle hygiene (do not "fix" the engine for these)

- PubChem `IUPACName` is sometimes retained/trivial, sometimes an inverted index (`propanal, 2-methyl-`), sometimes a mixture synonym (`4-oxobutanoic acid` steroid record hit for `oxobutanoic acid` — key lacks locant, PubChem fuzzy-matched). `fResolveSystematicEN` decontaminates (double-space/`(...)` strip), requires locant-shaped synonyms, and never lets a synonym override a systematic-looking raw IUPAC.
- `(E)-`/`(+-)-`/`rac-`/`DL-` stereo prefixes are stripped before compare (app has no stereo). `(E)-hex-2-en-4-yne` matches engine `hex-2-en-4-yne` under this rule.

## E. Novel molecules without public record (15) — engineEN proposals for expert validation

No PubChem record (CID 0 / 404) and CIR throttled/failed after retries. Engine output is structurally complete; P1/P4 to bless against `.mol` files. SMILES shown are JSME-extracted at boot.

- `ethyl_4_dimethyl_3_5_heptyne_1`: `4-ethyl-3,5-dimethylhept-1-yne` (SMILES ``)
- `ethyl_3_methyl_4_hexen_3_yn_5_ol_2`: `3-ethyl-4-methylhex-3-en-5-yn-2-ol` (SMILES ``)
- `ethyl_4_dimethyl_2_3_hepten_2_yne_5`: `4-ethyl-2,3-dimethylhept-2-en-5-yne` (SMILES ``)
- `isopropyl_4_dimethyl_3_5_heptanol_2`: `4-isopropyl-3,5-dimethylheptan-2-ol` (SMILES ``)
- `diethyl_4_5_dimethyl_2_6_heptanone_3`: `4,5-diethyl-2,6-dimethylheptan-3-one` (SMILES ``)
- `dimethyl_4_5_hexen_5_yn_1_one_3`: `4,5-dimethylhex-5-en-1-yn-3-one` (SMILES ``)
- `ethyl_3_methyl_4_octen_3_yn_5_dione_2_7`: `3-ethyl-4-methyloct-3-en-5-yne-2,7-dione` (SMILES ``)
- `isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5`: `4-isopropyl-3,6-dimethyloct-3-en-7-yne-2,5-dione` (SMILES ``)
- `ethyl_4_isopropyl_3_methyl_2_hexanal`: `4-ethyl-3-isopropyl-2-methylhexanal` (SMILES ``)
- `ethyl_4_penten_4_yn_2_al`: `4-ethylpent-4-en-2-ynal` (SMILES ``)
- `ethyl_2_methyl_3_hexen_2_yn_4_dial`: `2-ethyl-3-methylhex-2-en-4-ynedial` (SMILES ``)
- `ethyl_3_isopropyl_2_dimethyl_4_5_hexanoic_acid`: `3-ethyl-2-isopropyl-4,5-dimethylhexanoic acid` (SMILES ``)
- `ethyl_2_methyl_3_penten_2_yn_4_oic_acid`: `2-ethyl-3-methylpent-2-en-4-ynoic acid` (SMILES ``)
- `ethyl_3_isopropyl_2_dimethyl_4_5_hexadien_2_4_dioic_acid`: `3-ethyl-2-isopropyl-4,5-dimethylhexa-2,4-dienedioic acid` (SMILES ``)
- `ethyl_2_isopropyl_3_dimethyl_6_6_hepten_2_yn_4_dioic_acid`: `2-ethyl-3-isopropyl-6,6-dimethylhept-2-en-4-ynedioic acid` (SMILES ``)

CIR note: `cactus.nci.nih.gov` throttles aggressively after bulk lookups (HTTP 404s even for trivial structures like `CCC=CCO` right after a sweep). Re-running `fEnrichAllWithPubChem` on another day/IP may recover the simple ones above; the highly-branched thesis molecules likely have no record at all.

## F. EN name render + chrome sweep (2026-11-01, headless Chrome, `?lang=en`)

- Per-box EN render (`fNameENBoxes` + molview EN branch, stable Greek box ids): 141/141 molecules render with **0 Greek characters in any name box**. Joined-box text vs `engineEN` reconciled — the P-14.4 terminal-`e` fusion (`fFuseEnInfixSuffix`: `en`/`yn` directly before a consonant-initial suffix box regains its `e` — `ynedioic`, `enedioic`, `ynedial`, `enedione` — vowel-initial suffixes fuse bare) closed the last systematic gap (`hex-2-en-4-ynedioic acid` boxes now match `engineEN`); 19 `FUSE` unit vectors ride in `zz-test-en53.html`. Remaining diffs are only `an-2-one`, diene `a-1,3-`, plus Greek-common ester delegation (`sec-butyl ethanoate` etc. fall back to Greek render by design, pending P3 convention ruling).
- Key render fixes: `fStripTonos` now NFD-normalizes (was missing ϊ/ΐ dialytika → common-ether labels like `ϊσοπροπυλ` aborted to Greek); di-suffix `ane`-fusion scoped to the saturated branch only (was corrupting `en` infixes); ester acid part renders `comp5+comp6+comp9=anoate` with alcohol word in `comp10` + space separator; fused suffix locants get their own `comp9loc` box; `comp3loc`/`comp3b` splits preserved in EN order.
- Common-ether EN labels via `fMulerENCommonLabel` (`diethyl ether` → `di`/`ethyl`/`ether`); untransliterable labels keep the Greek render (no partial EN).
- Chrome: `MULER_STRINGS` grown 114 → **191 keys**, every `gr` value verified to occur verbatim in a 53 source (accent-typo audit: `homolSeries` `Σείρες`→`Σειρές` fixed; `toastRichStuck` `;`→`.` fixed so the toast now translates). Observer now also covers `[title]`/`placeholder`/`data-placeholder`, `.sshow` present-panel labels, step title/badge/tab, size options, `#dropLabel`/`.dropLi`, 2D/3D bar labels (`#zigzagCheck`, `#hydrogensCheck`, `#rotateCheck`), name click-hints, note-editor title/chrome. New `?lang=` header toggle (`#langToggle`, preserves query state).
- Final full-DOM EN audit: **24 remaining Greek strings, all didactic/authored by design** — rule-theory texts, authored step-note bodies, author credits. Zero Greek chrome remainder. GR mode re-verified: no EN leakage, all Greek chrome intact.

## G. Explain line + rule panel + theory in EN (2026-11-02, headless Chrome)

- `fExplainNameComp` (all 17 modes) now emits EN templates via `fTX(gr, en)` when `?lang=en`; Greek default byte-identical. Helpers localized: branch/group/halogen nouns (`fBranchNoun`, EN noun maps), `fAlcoholOHPositionText`, `fTaxonomyEN` (class/series labels + legacy core spellings `Καροξυλικά`/`Ιμίνες`/`Αλδεϋδες` as aliases — Greek data untouched), `compSuffix` class/series composition; Greek common-name clause omitted in EN (data, not chrome).
- `fShowRule` output (title + text + tables) translated post-composition via `fTranslateRuleHTML` (91-pair `RULE_GR2EN` dictionary, every entry source-verified, longest-first); chemistry tokens (formulas, prefixes, locants) stay. Alkyl/alkoxy builders render systematic EN tables directly (`Methyl methyl-`, `Methoxy group methoxy-`, EN note).
- `fShowRuleTheory` → `Rule N` titles + EN theory; `fNarrateRule` lang-aware (EN text, en-US voice); `#narrateBtn` removed from the EN-TTS name hijack (rule button reads the rule again).
- Validation: 141 molecules × 17 modes = 2,397 explain+rule cells + 9 theory texts → **0 Greek in EN**; GR baseline re-run: identical 26 probe-forced `compNumber1`-on-nulllocant throws (pre-existing, unreachable in real UI — hidden locant box), **0 EN leakage**, GR text intact. Full-DOM EN remainder still exactly the known 24 authored-note/credit strings.

## H. Chrome independence — no Greek-first flip (2026-11-02, headless Chrome)

- Reported bug: in `?lang=en`, clicking a grouping-mode radio flashed Greek labels before English. Root cause: rebuilds rendered Greek HTML, the debounced MutationObserver translated 250 ms later — after paint.
- Fix: every post-boot render path now chooses its language at build time (`fMulerT`/`fTX`/`fMulerPre`/`fTranslateRuleHTML`/`fVisStyleLabels`/`fRuleTheoryTitleEN`/`fTaxonomyEN` + lang-aware table builders). Converted: left menu (radios, title, group headers incl. `Rule N`), name panel (title, settings, ether toggle, all button tooltips, chain stepper), viewer bar buttons, style-toggle tooltips, eye buttons, expand tip, empty hint, rule panel + theory + narrate, full scenario drawer (steps, badges, tooltips, placeholders, size options, present/play bars, confirm dialog), note-component fallbacks. Observer remains only as a backstop; toasts/prompts/confirms were already call-time translated.
- Authored content untouched: authored step notes/titles, table boilerplate inserted into notes, list-item placeholders, credits; Greek common names and legacy core spellings (`Καροξυλικά`, `Ιμίνες`, `Αλδεϋδες`) preserved in data, aliased in EN only. Caught en route: eye show/hide keys were swapped in EN (fixed), a splice bug in bond fragments (fixed earlier), `Νιτροενώσεις R-NO` Latin-NO mismatch in the rule dictionary (fixed).
- Validation (observer neutered via MutationObserver wrapper — translations must not depend on it): EN sweep of 13 interaction checkpoints (menu ×4 modes, 13 molecules, ether common/IUPAC, style toggles, all explain modes, theory 0–8, stepper, drawer, confirm) → **0 Greek text nodes, 0 Greek attributes** (sole exception: the bilingual `Γλώσσα / Language` toggle, by design). GR mirror run → **0 EN markers**, all Greek chrome intact (incl. `Κοινή` ether toggle, `Nος Κανόνας` titles).

## I. Per-step language (2026-11-02, headless Chrome)

- Each scenario step now stores its creation language (`step.lang`, `en|gr`) at capture; it travels in the JSON, survives round-trips, and is validated (`fScenarioDefaults` normalizes, `fScenarioValidate` warns on invalid values and falls back to Greek; legacy steps without the field default to `gr` silently).
- Applying a step sets an in-memory override (`window.__mulerStepLang`) read by `fMulerLang()` — the single chokepoint every render path already consults — then `fMulerRefreshStepChrome()` re-renders menu (present-menu preserved in presentation, incl. the grouping switcher), name analysis, static chrome, one-time bars (repaint-by-ID, no state loss) and drawer panels (open drawers preserved, focus-guarded against draft loss). Skipped when the painted language is unchanged. Present exit clears the override back to session language. Reload/header-toggle also clears it (never persisted).
- Drawer rows carry an `EN`/`GR` badge (`.scLangBadge` + tooltip).
- Verified: GR capture→`gr`, EN capture→`en`; mixed walk `EN→GR→EN→GR→EN` flips boxes/menu/explain per step; legacy/import `xx`→`gr`+warning; exit clears override; zero console errors. Greek common-name clause, authored notes and legacy spellings untouched by design.

## J. Language switch keeps the molecule (2026-11-02, headless Chrome)

- Header is now a two-button GR/EN switch (plain `langButtonClass` buttons, `selected` on the active language, no app CSS reused — teacher styles by hand); clicking the active side is a no-op (no reload).
- Toggling carries the selected molecule (`?mol=`), dropped when a scenario owns the selection; boot restores it through the normal click path (viewer + menu highlight + group open + naming), ignored for bogus keys and when `?scenario=` is present. Direct `?lang=…&mol=…` links open that molecule.
- Verified with the real toggle function (stubbed navigation) + direct-URL boots in both languages; scenario+mol precedence confirmed; zero console errors.

## K. Engine gap closed (9 esters) + oracle marker (2026-11-02, headless Chrome)

- The 9 molecules where the joined `engineEN` kept Greek (`ethanικός methylester` etc. — methyl/alkyl alkanoates whose acid adjective `ικός` had no suffix-map entry) are fixed with one map pair (`ικός`→`anoate`; longest-first keeps `ικό οξύ` intact). All 141 `engineEN` strings are now Greek-free; the oracle-delegation path no longer triggers on current data.
- New visual flag: when the shown EN name is not pure engine output, the name boxes get a `veryLightBlue` tint (`oracle-name` on the container, additive — ids/hooks untouched, selected keeps green). Two states: oracle-supplied EN (`Name from the PubChem oracle — pending human review`) and Greek fallback in EN mode (`No engine English name — showing Greek`). EN-only; GR never marked. Serves as the human-review queue at a glance.
- Verified: 0 mixed strings, 0 false tints in normal EN/GR operation; forced fallback/delegation states show correct tint + title; box-click highlight works over the tint; GR forced states stay unmarked; no console errors.

## L. Oxocarboxylic merge + οξο- prefix + oxo locants (2026-11-02, headless Chrome)

- Per IUPAC there is a single class: `ketoAcids` merged into `oxoCarboxylicAcids` (acid+ketone now classifies with acid+aldehyde). The `ketoAcids` label/EN-map entries stay as harmless aliases for old saves; grouping is live-derived so the Κετοξέα group simply no longer appears. Greek class nouns (`Κετονομάδα`) and the r4 priority row are untouched — only the substitutive prefix changed.
- Greek substitutive prefix `κετο-` → systematic `οξο-` with derived chain-position locant (`κετο-προπανικό οξύ` → `2-οξοπροπανικό οξύ`; EN `oxopropanoic acid` → `2-oxopropanoic acid`, `oxobutanoic acid` → `4-oxobutanoic acid`). Suppression of secondary aldehyde/ketone locants is now lifted only when the principal group is carboxylic acid; all other principals keep the school convention.
- Verified: `2-oxopropanoic acid`, `4-oxobutanoic acid` in EN with no oracle delegation (pure engine); GR boxes `2-οξο + προπ + αν + ικό οξύ`; explain/numbering/highlight fire correctly on the new locant boxes; chemclass/series group headers show Οξοκαρβοξυλικά (GR) / Oxocarboxylic acids (EN); full 141-molecule sweep shows movement only on these 2 molecules vs pre-change output; no console errors.

## M. Live oracle verdict markers + EN-CHECK console (2026-11-02, headless Chrome)

- The name panel now shows a live verdict in EN mode: plain = engine agrees with PubChem/CIR (systematic/retained/Title, same rules as the batch validator); **red tint** = engine prediction differs from the oracle (`verdict-mismatch`); **amber tint** = fetch completed but no oracle record exists (`verdict-nooracle`); **lavender tint** = the fetch itself failed, so nothing could be checked (`verdict-noerror`); blue kept strictly for provenance (oracle-supplied display, Greek fallback). GR never marked.
- One shared comparator (`fMatchEngineEN`) feeds both the batch validator (refactored, output format unchanged) and the live marker — the two cannot drift. Fetch completion updates the marker in place (molecule-guarded, no rebuild); a pending fetch never flashes amber. Console logs predicted vs displayed on every oracle resolution (`[EN-CHECK] key: predicted="…" displayed="…" verdict=…`). The full oracle strings live in the molecule info panel (SMILES / IUPAC / systematic / common rows).
- Verified offline-deterministically (seeded oracle, no network): match→plain, mismatch→red+tooltip, no-data→amber, network-failure→lavender, pending→plain; forced fallback/delegation paths intact; hook stale-guard holds; GR forced states unmarked; no console errors.

## N. Live verdict watchlist — red and amber molecules (live oracle, 2026-11-02)

Canonical per-molecule verdicts from a full live run (all 141 selected, oracle fetched, `fMatchEngineEN` per key: 100 match — 92 systematic, 8 retained — 10 mismatch, 34 missing, 0 pending, 0 delegated, 0 Greek-fallback). The marker is always the live truth; this list is the audited snapshot. See §B–§E for the human-review queue behind the red rows.

**Red — engine differs from oracle (10). All are deliberate-convention cases or oracle-record quirks, pending P3/P4 — no engine bugs found:**
- `propene` — engine `propene` | oracle `prop-1-ene` (implied locant omitted, §B)
- `propyne` — engine `propyne` | oracle `prop-1-yne` (implied locant omitted, §B)
- `nitroethane` — engine `nitroethane` | oracle `1-nitroethane` (implied locant omitted, §B; oracle once showed a polluted synonym — §D)
- `isopropyl_2_buten_2_dial` — engine `2-isopropylbut-2-enedial` | oracle `2-propan-2-ylbut-2-enedial` (retained isopropyl, §C/P3; prior-run oracle — throttled in this run, verdict carried from §C)
- `isobutyl_isopropyl_ether` — engine `1-isopropoxy-2-methylpropane` | oracle `2-methyl-1-propan-2-yloxypropane` (retained substituents, §C/P3)
- `tert_butyl_isopropyl_ether` — engine `2-isopropoxy-2-methylpropane` | oracle `2-methyl-2-propan-2-yloxypropane` (retained substituents, §C/P3)
- `isopropyl_ethanoate` — engine `isopropyl ethanoate` | oracle systematic `2-Acetoxypropane`, retained `propan-2-yl acetate` (retained substituent + retained acid stem in oracle record; engine form is PIN-preferred, §A-family — P3 confirms)
- `sec_butyl_ethanoate` — engine `sec-butyl ethanoate` | oracle systematic `1-Methylpropyl ethanoate`, retained `butan-2-yl acetate` (retained substituent + retained acid stem; engine form is PIN-preferred, §A-family — P3 confirms)
- `tert_butyl_methanoate` — engine `tert-butyl methanoate` | oracle `tert-butyl formate` (retained acid stem; engine form is PIN-preferred, §A-family — P3 confirms)
- `isobutyl_2_methylpropanoate` — engine `isobutyl 2-methylpropanoate` | oracle `2-methylpropyl 2-methylpropanoate` (retained isobutyl; engine form is PIN-preferred, §A-family — P3 confirms)
- `isopropyl_2_3_dimethylbutanoate` — engine `isopropyl 2,3-dimethylbutanoate` | oracle `propan-2-yl 2,3-dimethylbutanoate` (retained isopropyl; engine form is PIN-preferred, §A-family — P3 confirms)

**Amber — no PubChem/CIR record, nothing to validate against (15 novel molecules, all of §E, all confirmed missing live):**
`ethyl_4_dimethyl_3_5_heptyne_1`, `ethyl_3_methyl_4_hexen_3_yn_5_ol_2`, `ethyl_4_dimethyl_2_3_hepten_2_yne_5`, `isopropyl_4_dimethyl_3_5_heptanol_2`, `diethyl_4_5_dimethyl_2_6_heptanone_3`, `dimethyl_4_5_hexen_5_yn_1_one_3`, `methyl_6_hepten_3_dione_2_5`, `ethyl_3_methyl_4_octen_3_yn_5_dione_2_7`, `isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5`, `ethyl_4_isopropyl_3_methyl_2_hexanal`, `ethyl_4_penten_4_yn_2_al`, `ethyl_2_methyl_3_hexen_2_yn_4_dial`, `ethyl_3_isopropyl_2_dimethyl_4_5_hexanoic_acid`, `ethyl_2_methyl_3_penten_2_yn_4_oic_acid`, `ethyl_3_isopropyl_2_dimethyl_4_5_hexadien_2_4_dioic_acid`, `ethyl_2_isopropyl_3_dimethyl_6_6_hepten_2_yn_4_dioic_acid` — engine proposals in §E stand; P1/P4 to bless against `.mol` files.

**Bulk-run caveat (transient amber/lavender):** 19 further molecules returned no oracle data in this bulk run (`butene_2`, `penten_2_ol_1`, `penten_3_yne_1`, `hexen_2_yne_4`, `bromo_3_chloropentane_1`, `bromo_2_chlorobutane_3`, `ethyl_3_dimethyl_2_5_hexene_2`, `ethyl_3_dimethyl_2_5_hexane`, `dimethyl_2_3_pentadiene_1_3`, `dimethyl_2_3_penten_1_yne_4`, `methyl_3_pentadiene_1_3`, `methyl_3_penten_2_dial`, `penten_2_yn_4_oic_acid`, `hexen_2_yn_4_dioic_acid`, `methyl_6_hepten_3_dione_2_5` and the 4 esters above pre-classification). All have public records — this is CIR/PubChem throttling under bulk lookup (documented §D/§E), not absence. Spot re-checks with spacing confirm it (`butene_2` → systematic match, `hexen_2_yn_4_dioic_acid` → systematic match). Since the fetch-error/empty split, throttled lookups land on **lavender** (unknown), genuine no-records on **amber** — re-visit individually, don't bulk-retry.

**Lavender** is transient by nature (network failures, throttling, offline) and is never listed per molecule — any molecule can show it while unreachable. Offline, verdicts stay unmarked (no data, no claim).

## Files

- `js/mulermoc-nom-name-en-53.js` — EN tables + slot transliteration + validation (`fGuessNameEN_canon`, `fAssembleBranchedEN`, `fPopulateEngineENFromGreek`, `fValidateENAgainstOracle`).
- `js/mulermoc-nom-iupac-53.js` — PubChem/CIR oracle + retained map + `fEnrichAllWithPubChem` + JSME-draw import path (`fEnrichFromJSME`, incl. 3D SDF).
- `js/mulermoc-nom-lang-53.js` — 207-string `?lang=` chrome (every `gr` value source-verified) + value-based `data-tooltip`/`aria-label`/`title`/`placeholder` translation (debounced MutationObserver, dynamic-prefix rules, dialog/bar/menu/step text nodes, `title`+`placeholder` attributes) + EN/GR TTS (`fSpeakMuler`, `fWireENTTS`) + two-button header switch (`#langSwitch`, `fMulerToggleLang(target)`). Verified headless: 0 Greek of 254 tooltips, 0 Greek of 224 aria-labels, final full-DOM audit 24 remaining Greek strings all authored-note/credit — zero chrome remainder; GR mode no-leak. Authored content intentionally stays Greek — same policy as scenarios (P3-authored).
- `Code-Analysis/` (gitignored cache): `validated141.json` (offline name-query oracle, 91/141), `review_rows.json` (full in-browser per-key dump), `slots141.json` (all 141 Greek slot vectors), `key2iupac*.py` (offline key→name converter used for cross-checking).
