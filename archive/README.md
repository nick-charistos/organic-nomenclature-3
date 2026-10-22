# Archive — frozen museum (non-runnable reference)

These files were moved here during the v43/v44 migration to stop
full-copy-per-version drift. They are **reference only**.

## Do not run files from here

Archived pages use root-relative asset paths (`js/`, `css/`,
`jsme/`, `imgs/`, `mols/`), so they break when opened from
`archive/`. To run an old version, restore it from its tag:

```bash
git checkout v41 -- mulermoc-nom-41.html js css   # inspect only
# or: git checkout v41   # full tree at v41 (working baseline, esters in v41 data)
git checkout v42          # working v42 baseline
```

Tags: `v41` = last v41-only commit (`e6a64c7`),
`v42` = last v42 code state (`c3353b0`),
`v43` = frozen v43 file set, `v44` = frozen v44 file set.

## Layout

* `archive/html/` — versioned entry points (`mulermoc-nom-35..41.html`,
  `mulermoc-nom-v_all-molecules-38.html`, `nomenclature*`,
  `nomenclature_moc2_1_*`) plus old standalone pages
  (`dropMenu-1.html`, `functional-groups.html`,
  `homologues-seires.html`, `nameing-tables.html`,
  `table-FG-order.html`).
* `archive/js/` — versioned layers (`mulermoc-nom-{core,molview,teaching}-35..41.js`,
  `mulermoc-nom-all-teaching-38.js`), versioned data
  (`jsme-nick-nomeclature-moc2-data_*.js`), and legacy engines.
* `archive/css/` — versioned styles (`jsme-nick-*.css` except the
  current one, which stays at `css/`).

## Policy (updated 2026-10-22; original plan in `docs/didactic-scenario-plan.md` §7 superseded)

* v43 was intended as the last suffixed copy, but v44–v50 were forked as
  suffixed sets too (`*44*`–`*50*` at root alongside `*42*`/`*43*`).
  Current baseline is v50 (`index.html` → `mulermoc-nom-50.html`, 80 molecules):
  side-text rails (left/right) + persistent naming shell + 7 additive alkynes,
  with `scenarios/Αλκάνια-Αιθάνιο-τεστ.scenario.json` as the default scenario.
  v49 and earlier remain runnable at root.
* Runnable history: `mulermoc-nom-42/43/44/45/46/47/48/49/50.html` at root + git tags
  `v41`–`v44`. This folder holds ≤v41 version files plus the imported
  `Giannis_Skendros/` data snapshots (non-runnable museum).
* Never edit archived version files (HTML/JS/CSS/data); README/import notes may
  be corrected for links/status.
