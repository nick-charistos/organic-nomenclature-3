# Presentation Step Rich Text — v51 Plan

Status: rich-text implementation complete and **v51 is live**; the content-only
authoring note dialog and compact icon toolbar are in place. Snap.svg has been
removed from v51 in favour of the native `MuSVG` helper. The `MuSVG.parse()`
OOM/XML crash was fixed on 2026-10-25; Chrome and Firefox automated matrices
pass, with the two pre-existing skeletal JSmol failures still open. `index.html`
now points to v51; v50 remains runnable.
Scope: v51 release set live; v50 remains runnable at root
Related: `didactic-scenario-plan.md`, `CHANGELOG.md`, `LAYERS-PLAN.md`

---

## 1. Goal

Upgrade the presentation step note (`snote`, rendered into `#scStepText`) from the
current escape-first simple-HTML subset to a safe, curated rich-text format that
can carry:

- paragraphs, emphasis, lists, links, tables, figures, images
- a fixed vocabulary of note styles (`note-*` classes)
- predefined app structures, starting with all naming-rule tables
- a forward-compatible extension point for note buttons that drive the main app
  (no public actions in v1)

Also give authoring a larger note editor: an **expand** control opens a
content-only modal dialog that live-syncs with the inline note. Presentation
keeps the v50 top/left/right rails; there is no separate wide/focus mode.

Non-goals for v51:

- no Drupal integration yet
- no arbitrary scripts, inline event handlers, inline CSS, iframes, or inline SVG
- no public note action buttons until real scenario needs define them
- no scenario schema version bump (`scenarioVersion` stays 1)
- no presentation wide or reading-focus mode (removed before browser test)

---

## 2. Locked decisions

1. **v51 release set.** Forked from v50 without modifying the v50 files.
2. **Superseded 2026-10-25:** v51 was promoted live after verification;
   `index.html` now points to `mulermoc-nom-51.html` and v50 remains runnable.
3. **DOMPurify** is the sanitizer; loaded locally, fail closed to the legacy
   renderer if unavailable.
4. **Authoring note editor:** expand opens a content-only modal dialog; inline
   layout controls stay in the inline toolbar. No preview/Apply/Cancel; the
   modal and inline textarea live-sync. Presentation has no wide/focus controls.
5. **Actions:** build the registry/delegated-handler extension point now, ship
   zero public actions.
6. **Components:** all rule tables first — `table1`, `table2`, `table3`,
   `table4`, `alkylTable`.
7. **Images:** `<img>` only; no inline SVG. Relative/same-origin, `https:`, and
   `data:image/*` sources with security and size checks.
8. **Snap.svg removal** — completed 2026-10-25 with the native `MuSVG` helper;
   `js/vendor/snap/` and the v51 Snap script are gone.
9. **Small libs vendored; JSmol stays CDN for the public build** (local copy for
   Drupal/offline).

---

## 3. v51 file set

Forked from v50:

- `mulermoc-nom-51.html`
- `js/mulermoc-nom-core-51.js`
- `js/mulermoc-nom-molview-51.js`
- `js/mulermoc-nom-teaching-51.js`
- `js/mulermoc-nom-scenario-51.js`
- `js/jsme-nick-nomeclature-moc2-data_51.js`
- `css/jsme-nick-51.css`
- `css/mulermoc-nom-scenario-51.css`

New:

- `js/mulermoc-nom-note-51.js` — sanitizer, rich rendering, components, action
  registry, image error handling
- `js/vendor/dompurify/dompurify-3.4.17.min.js` + license
- `js/vendor/jquery/jquery-4.0.0.min.js` + license (fallback candidate 3.7.1)
- `js/vendor/README.md` (versions, update procedure, hashes)

The v50 files and earlier versions remain untouched; `index.html` was promoted
to v51 on 2026-10-25.

---

## 4. Dependencies and hosting

| Library | Public GitHub Pages | Drupal / offline | Notes |
|---|---|---|---|
| JSmol | CDN (rolling) | local `JSmol.min.js` + `j2s/` | Update local to 16.4.23; keep `j2s/` out of Git |
| jQuery | vendored 4.0.0 | vendored 4.0.0 | Test jQuery 4; fall back to 3.7.1 if regressions |
| DOMPurify | vendored 3.4.17 | vendored 3.4.17 | Security-critical; fail closed |
| JSME | local | local | unchanged |

### 4.1 Hosting policy

- The public demo keeps JSmol on the official CDN because it is large and
  actively updated.
- Drupal/offline deployments use local JSmol. The local copy must match the CDN
  version at release time; verify `j2s/Jmol.properties`.
- jQuery and DOMPurify are small enough to vendor.
- `LIBS_MODE` (`cdn` | `local`) is only needed for JSmol after the small libs are
  vendored. Add a `?libs=local` test override if useful.
- Do not commit the 38 MB `j2s/` runtime by default. Deploy it with Drupal or a
  controlled static asset host.

### 4.2 Versions and integrity

Known current versions at plan time:

- jQuery 4.0.0 (released 2026-01-18; 3.7.1 is the fallback)
- DOMPurify 3.4.17
- JSmol 16.4.23 (CDN, 2026-08-24); local was 16.1.47

Vendored files are committed under `js/vendor/`, so the app does not depend on
their CDNs. Hashes of the committed files (SHA-512, base64):

- jQuery 4.0.0:
  `8LENNbXmzI/Gbj+OwXmqR6V4QaUAw0/porPzy1+dQoJqC0JPHedWoe0DDOTL2uHA5XXJyIsPtiMHH86pVlay6A==`
- DOMPurify 3.4.17:
  `2wT0W6vojz3cJuLoa/DxrPVQRinkfRjFWMWIDK4NghTqObEhpem1nEkeK0d9ZE+/hyvfMNuJZlfxM4LsRgeoSA==`

CDN SRI values can differ if the CDN re-encodes a response; verify the exact
artifact before using one. JSmol has no stable SRI because the official URL is
rolling.

### 4.3 jQuery 4 compatibility spike

Before committing to jQuery 4.0.0 in v51:

- run `node --check` on all app JS
- smoke-test menu browsing, molecule loading, 2D/3D rendering, naming analysis,
  scenario authoring, drag/reorder, Import/Export, Present/Exit
- check that no removed/deprecated jQuery API is used (`.bind`, `.delegate`,
  `$.isArray`, `$.parseJSON`, etc.)
- if anything regresses, pin jQuery 3.7.1 in v51 and defer jQuery 4 to a
  dedicated dependency pass

---

## 5. Note model and schema

`note` remains a string. Add an additive per-step field:

```json
{
  "note": "<p>...</p>",
  "noteFormat": "html"
}
```

- Missing/`"text"` → legacy renderer (escape-first simple subset, current
  whitespace behaviour).
- `"html"` → curated rich-text renderer (DOMPurify).
- Import/Export, Duplicate, Update, and validation must preserve `noteFormat`.
- New rich notes are opt-in per step. Simple text notes keep working unchanged.
- `styleText` remains the place for presentation options. v51 stores no
  wide/focus state; the authoring dialog is runtime-only.

---

## 6. Security model

1. Never trust stored JSON. Sanitize on import and on render.
2. Use DOMPurify with an explicit configuration, not defaults:
   - explicit `ALLOWED_TAGS` only (no `USE_PROFILES`; the profile would widen
     the allowlist)
   - explicit `ALLOWED_ATTR`
   - `ALLOW_DATA_ATTR: true` is immediately followed by a post-clean pass that
     keeps only `data-note-include`, `data-note-action`, `data-note-arg`
   - forbid `style` and `id`
   - class values are validated in the post-clean pass: only `note-*` and the
     fixed component classes are kept
   - links: allow `http`, `https`, `mailto`, `tel`, and relative URLs; add
     `rel="noopener noreferrer"` to external links
   - images: validate `src` per policy in section 8
3. Sanitize both the authored note HTML and any expanded component HTML.
4. Fail closed: if DOMPurify is not available or throws, render the note as
   escaped text. Never fall back to raw `innerHTML`.
5. No inline event handlers, `javascript:` URLs, `<script>`, `<style>`,
   `<iframe>`, `<object>`, `<embed>`, `<form>`, or `<input>`.
6. Add XSS fixtures as a manual/static test checklist:
   - `<script>alert(1)</script>`
   - `<img src=x onerror=alert(1)>`
   - `<a href="javascript:alert(1)">`
   - `<svg><script>...</script></svg>`
   - `class="hide"` / `id="pageContainer"` (must be stripped or not allowed)
   - malformed/unclosed tags

---

## 7. Content vocabulary

Allowed elements (initial):

- inline: `p`, `br`, `strong`, `b`, `em`, `i`, `u`, `s`, `sup`, `sub`, `small`,
  `big`, `code`, `a`, `span`
- block: `div` (limited), `blockquote`, `ul`, `ol`, `li`, `figure`,
  `figcaption`, `img`, `hr`
- tables: `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`
  with `colspan`/`rowspan`

Allowed classes (fixed vocabulary):

- `note--tip`, `note--warn`, `note--definition`, `note--example`, `note--formula`
- `note--center`, `note--muted` (optional)
- `note-table`, `note-figure`, `note-img`, `note-btn`
- component/embed wrappers: `note-embed`, `note-embed--rule`

No arbitrary classes. No inline styles. Styling lives in
`css/mulermoc-nom-scenario-51.css` (or the v51 main CSS where shared).

Whitespace:

- Legacy/`text` notes keep `white-space: pre-wrap`.
- HTML notes use paragraph/block flow. Add a `note-html` class to `#scStepText`
  while rendering an HTML note; use normal block flow but preserve deliberate
  `<br>` line breaks. Authoring should insert blocks/`<br>` for rich notes.
- Tables get horizontal scrolling inside the side rail; images use
  `max-width: 100%; height: auto`.

---

## 8. Images

Use `<img>` only; no inline `<svg>`.

Allowed attributes:

- `src`, `alt`, `title`, `loading`, `decoding`, numeric `width`/`height`,
  `class="note-img"` / `note--center`
- authoring helper must require `alt`; the file picker embeds the selected
  image as a capped data URI, while the URL helper keeps relative/`https:`
  sources available

Source policy:

- relative and same-origin paths: default
- `https:` external: allowed with a privacy warning; add
  `referrerpolicy="no-referrer"` and `loading="lazy"`
- `data:image/(png|jpeg|gif|webp);base64,...`: allowed for portable
  scenarios, capped at ~500 KB per image (700,000 characters); SVG data URIs
  are rejected. No aggregate per-scenario cap is enforced in v51.
- block `http:`, `file:`, `javascript:`, `blob:`, and protocol-relative URLs

Rendering:

- post-render listener adds an “image unavailable” placeholder on load error
  (cannot use inline `onerror`)
- CSS: `#scStepText img { max-width: 100%; height: auto; }`
- future assets live under `imgs/notes/` or a scenario asset folder

---

## 9. Predefined components (rule tables)

`namingRules` is a trusted JS object of HTML templates built by `fInitTheory`
(`js/mulermoc-nom-teaching-50.js`). Do not copy its HTML into scenario JSON.
Reference it through a small component registry.

Syntax:

```html
<div data-note-include="rule-table:3"></div>
<div data-note-include="rule-table:alkyl"></div>
```

v1 keys:

- `rule-table:1`
- `rule-table:2`
- `rule-table:3`
- `rule-table:4`
- `rule-table:alkyl`

Rendering:

1. Sanitize the note, keeping `data-note-include`.
2. Walk include placeholders.
3. Resolve the key from the trusted registry.
4. Sanitize the component HTML with the component allowlist (app rule classes).
5. Replace the placeholder with a `.note-embed.note-embed--rule` wrapper.
6. If a key is missing, render a visible fallback marker and warn in authoring.

CSS:

- audit which rule-table styles are scoped under `#ruleTheory` in
  `css/jsme-nick-50.css`; add the needed scoped rules for `.note-embed` in v51
- ensure tables scroll in the side rail and do not break the two-column note
- static display only; no `data-row` interaction in v1

Authoring:

- icon-only “predefined content” dropdown lists the five rule-table keys
- no raw token typing required
- no separate preview dialog; use the step preview/Go or Present for rendered
  output

---

## 10. Action registry (future-facing, zero public actions)

Contract:

```html
<button type="button" class="note-btn"
        data-note-action="action-name"
        data-note-arg="value">Label</button>
```

Implementation now:

- `MuLERMoCNote.registerAction(name, handler)` registry
- delegated click listener for `[data-note-action]`
- strict action-name and payload validation
- handlers call scenario-safe wrappers, never raw eval
- allow `button`, `type`, `data-note-*`, `aria-label` in the sanitizer
- no authoring “insert action” UI until at least one action exists

Future candidates (not shipped): `load-mol`, `mode-2d`, `viewer`, `rule`,
`goto-step`, `highlight-name`, `narrate`, `reset-view`.

Semantics: actions that change the molecule temporarily depart from the stored
step; Prev/Next re-applies the step. Document this when actions are added.

---

## 11. Presentation UX

- Presentation keeps the v50 top/left/right note placement; no new wide or
  reading-focus controls are part of v51.
- Notes remain display-only in presentation. Authoring helpers (expand,
  inserts, formatting) live outside the sanitized HTML and are not shown while
  presenting.
- The inline authoring toolbar is the only note-control surface; the expand
  dialog is an authoring tool, not a presentation mode.

---

## 12. Authoring UX

Keep the textarea, add helpers:

- format switch/indicator (`text` vs `html`)
- B/I/sup/sub formatting plus clear
- image inserts from a local file picker or URL, plus table inserts
- icon-only rule-table dropdown (`addPredefinedItem`)
- expand button opening the content-only modal editor; live sync, no
  preview/Apply/Cancel, Esc/close returns focus to the expand button
- image file picker (PNG/JPEG/GIF/WebP, ≤500 KB) plus URL insert and optional data-URI paste/import
- warnings for large data URIs, external images, unknown components
- unbalanced-tag hint retained/adapted

Rich notes should be practical for P3 without hand-writing complex tables.

---

## 13. Integration points

`js/mulermoc-nom-scenario-51.js`:

- `fScenarioRenderNote` delegates to `MuLERMoCNote.renderNote` when available;
  otherwise legacy renderer
- `showNoteOn` must treat images/components as content (not “empty”)
- play bar (`fScenarioPlayUi` / `#scStepNote`) renders **plain text only**, not
  tables/images
- `fScenarioValidate`, Import/Export, Duplicate, Update preserve `noteFormat`
- the authoring expand control and modal live-sync live outside the authored HTML

HTML:

- load DOMPurify before the note module
- load `js/mulermoc-nom-note-51.js` after the scenario module, before boot
- new dialog markup can be created by JS to keep the HTML small

---

## 14. Snap.svg removal (completed 2026-10-25)

Audit result: Snap was used only in `js/mulermoc-nom-molview-51.js`; about 43
calls, with no Snap-specific animation/matrix/path features.

Implemented native `MuSVG` helper:

- `select`, `selectAll`, `parse`, `attr`, `remove`, `append`, `.node`,
  `.toString()`
- special cases: `attr("text")` → textContent; `{text: ...}` → textContent;
  `toString()` → `outerHTML`; `parse` → `DocumentFragment` with `.firstChild`
- return `null` when the root SVG is absent

Migration completed:

1. Added `MuSVG` and replaced all Snap calls; renamed the live wrapper to
   `molSvg`.
2. Removed the Snap `<script>` tag and deleted `js/vendor/snap/`.
3. Removed Snap from `js/vendor/README.md` and the dependency/hash tables.
4. Verified the v51 page loads in headless Chrome without JS exceptions; the
   generated 2D SVG is present and color-class state is applied.

Rollback: the phase is a separate commit; revert it without touching the
rich-text feature or v50.

---

## 15. Implementation phases

1. **Plan doc + v51 fork** — this document, file copy, asset refs; the fork
   started on v50 and was promoted live on 2026-10-25.
2. **Dependencies** — vendor DOMPurify/jQuery, update local JSmol, add vendor
   README/.gitignore exception; jQuery 4 compatibility spike.
3. **Sanitizer + schema** — note module, `noteFormat`, legacy fallback,
   import/render sanitize, fail-closed.
4. **Rich content** — links/images/tables/figures/classes; CSS; play-bar plain
   text; `showNoteOn` fix.
5. **Components** — five rule-table keys, icon-only insert dropdown.
6. **Actions** — registry + delegated handler, zero public actions.
7. **Authoring UX** — flattened inline toolbar, content-only expand dialog,
   live sync, icon-only step actions.
8. **Snap removal** — completed 2026-10-25 (`MuSVG` + 2D smoke pass);
   `MuSVG.parse()` OOM/XML fix applied after the Firefox crash.
9. **Verification/docs** — static checks, Chrome/Firefox matrices,
   CHANGELOG/README; v51 promoted live.

---

## 16. Verification checklist

Static:

- `node --check` on all v51 JS
- CSS brace balance
- all v51 HTML asset refs resolve
- no Snap references after the removal phase
- no `50` asset refs in v51 files

Security:

- XSS fixtures from section 6
- class/id/style stripping
- image URI policy and data-URI caps
- unknown component fallback
- DOMPurify missing → escaped text

Functional/browser:

- legacy text notes byte-identical
- HTML note: paragraphs, lists, links, images, tables
- side rail tables/images; top card
- play-bar note plain text
- rule-table components render and scroll
- authoring expand dialog live-syncs with the inline textarea; Esc/close
  restores focus and leaves the step live
- inline toolbar keeps layout controls and the icon-only rule-table dropdown
  after expanding; `Go` uses the skip icon
- all 98 molecules in all 2D modes after Snap removal
- v50 remains runnable and unchanged

Completed 2026-10-25 (Snap removal + v51 live):

- Removed the v51 Snap script and `js/vendor/snap/`; v50/older versions
  remain runnable and unchanged.
- Fixed the `MuSVG.parse()` OOM infinite loop (`importNode()` → tolerant
  HTML parsing + `adoptNode()`); the XML parsing error is gone.
- `node --check` passes on the v51 JS after the `MuSVG` migration.
- Chrome CDP: 98 molecules in condensed mode + mode sample sweep (128/130);
  Firefox 158.0.1 headless WebDriver BiDi: same 128/130, zero XML/OOM/runtime
  errors. The two failures are pre-existing skeletal JSmol errors
  (`butadiene_1_3`, `propadiene`) and also occur on the Snap baseline.
- Owner promoted v51 live: `index.html` → `mulermoc-nom-51.html`.
- Remaining manual coverage: 3D/highlights for the 18 new molecules, rich
  notes, the authoring dialog, the icon dropdown/skip icons, 2D/3D refit, the
  JSmol local/CDN loader, and jQuery 4.

Completed 2026-10-24:

- `node --check` on all v51 JS (portable Node 22 in `/tmp`), CSS braces
  `305/305` + `275/275`, local HTML refs resolve, no duplicate ids.
- Earlier Node 22 + jsdom 26 + vendored DOMPurify/jQuery suite: 95/95
  sanitizer assertions + 38/38 scenario-integration checks passed before the
  presentation wide/focus controls were removed. Those tests still reference
  the removed `openFocus`/wide APIs and need updating before reuse.
- Fixed: strict `ALLOWED_TAGS` (drop `USE_PROFILES`), block/`<br>` spacing in
  plain text, URL control-character rejection, fail-closed post-clean,
  image-alt/component text preservation, and title-only steps no longer render
  an empty note body.
- Removed the presentation wide/focus controls; added the authoring expand
  dialog, flattened inline toolbar, icon-only rule-table dropdown, and skip
  icon for `Go`.

---

## 17. Decision log

| Date | Decision |
|---|---|
| 2026-10-24 | v51 fork; `index.html` stays v50 (superseded 2026-10-25 by live promotion) |
| 2026-10-24 | DOMPurify, curated HTML, no scripts |
| 2026-10-24 | authoring modal editor; no presentation wide/focus mode |
| 2026-10-24 | action registry now, zero public actions |
| 2026-10-24 | all rule tables as components first |
| 2026-10-24 | `<img>` only, no inline SVG |
| 2026-10-24 | local/vendored small libs; JSmol CDN public/local Drupal |
| 2026-10-24 | remove Snap.svg in the final v51 phase |
| 2026-10-25 | Snap.svg removed from v51 via native `MuSVG`; v50/older untouched |
| 2026-10-24 | compact icon toolbar + `addPredefinedItem` dropdown + skip icon for `Go` |
| 2026-10-25 | `MuSVG.parse()` OOM/XML fixed; v51 promoted live, `index.html` → 51 |
