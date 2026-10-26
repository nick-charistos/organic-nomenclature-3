# Session handoff — 2026-10-25 — Rich note editor (preview selection mapping)

> **Status: NOT STARTED.** This file preserves the planning session for
> continuation on 2026-10-26. No code was changed for this feature yet.
> The working tree already contains the previously completed step-note image
> file-picker changes; do not discard them.

## 1. Current repository state

- Branch: `main`
- HEAD: `6e29bd5` — `v51: Snap-free live release + MuSVG parser fix`
- Live entry: `index.html` → `mulermoc-nom-51.html`
- Working tree is **dirty** with the image file-picker work:

| File | Existing change |
|---|---|
| `js/mulermoc-nom-scenario-51.js` | image file picker + URL image tool |
| `docs/CHANGELOG.md` | image-picker entry |
| `docs/SESSION-NOTES.md` | image-picker entry |
| `docs/Presentation-Step-Rich-Text-PLAN.md` | image-picker wording |
| `docs/didactic-scenario-plan.md` | image-picker wording |

Confirm with `git status --short` before editing. Do **not** use
`git reset --hard` or `git clean -fdx`.

## 2. Owner request (verbatim intent)

1. Implement selection mapping in preview so bold/italic work inline.
2. Simple/Rich [mode].
3. Block until user confirms.

The owner then said **“not sure”**, so the answers below remain provisional.
Resolve the open questions in §5 before implementing.

## 3. Current implementation (as of HEAD + image-picker work)

All line numbers refer to `js/mulermoc-nom-scenario-51.js` unless noted.

### Inline step-note editor

- Step drawer creates a plain `textarea.snote` at **3650**; `oninput`/`onchange`
  write `st.note` immediately (live).
- The inline toolbar is built by `fScenarioNoteContentBar(noteInput, st, opts)`
  at **2115**, attached at **3677**.
- The expand button opens `fScenarioOpenNoteEditor(st, noteInput, paintFormat,
  expandBtn)` at **2401**.

### Expanded modal

- `fScenarioNoteEditorBuild()` at **2352** creates a singleton `<dialog
  id="scNoteEditor">` with:
  - header (title + close button),
  - `div.scNoteEditorToolbar`,
  - one `textarea.scNoteEditorText`.
- `fScenarioOpenNoteEditor()` at **2401**:
  - rebuilds the toolbar with `fScenarioNoteContentBar`,
  - **live-syncs** modal textarea ↔ inline textarea (`syncInline`),
  - focuses the textarea at end.
- No preview pane, no Apply/Cancel, no footer. Close/Esc just closes.
- Modal CSS at `css/mulermoc-nom-scenario-51.css` **2134–2245**.
- Design docs currently promise “live sync; no preview/Apply/Cancel”.

### Note toolbar / helpers

- `fScenarioWrapNoteSelection` **1873** — wraps textarea selection with `<b>`,
  `<i>`, `<sup>`, `<sub>`, then moves caret after the close tag.
- `fScenarioMakeNoteList` **1890** — list builder (currently unused by the bar).
- `fScenarioCleanNote` **1914** — strips all tags from the whole note.
- `fScenarioInsertNoteSnippet` **1928** — inserts HTML at textarea selection.
- `fScenarioSetNoteFormat` **1947** — TXT/HTML conversion:
  - text→html: `\n` → `<br>`;
  - html→text: `MuLERMoCNote.toPlainText(value, "html", true)`.
- Image helpers: `fScenarioInsertNoteImage` **2039** (file picker),
  `fScenarioInsertNoteImageByUrl` **2046**, async reader above them.
- `fScenarioInsertNoteTable` **2080**, rule-table dropdown inside the content
  bar near **2250**.
- `fScenarioCheckNoteTags` **2102** — unbalanced-tag outline warning.
- The toolbar currently has a single `TXT`/`HTML` button whose label is the
  current format; no Simple/Rich mode concept.

### Rich render/sanitize layer (`js/mulermoc-nom-note-51.js`)

- `sanitizeNote` **294** — DOMPurify + curated tag/attr/class policy.
- `renderInto` **407** — sanitize + render; expands rule-table includes.
- `renderNote` **421** — used by `fScenarioRenderNote`.
- Public API export at **461** (`MuLERMoCNote`): `renderNote`, `renderInto`,
  `toPlainText`, `hasVisibleContent`, `registerAction`, `includes`.
- No editable-render/serialize helpers exist yet.
- Sanitizer is fail-closed: returns `null` if DOMPurify is missing.

### Data model

- `note` remains a string; `noteFormat` is `"text"` (default) or `"html"`.
- Defaults: **442**, **784**; validation/normalization: **867–871**.
- Presentation renders via `fScenarioRenderNote` → `MuLERMoCNote.renderNote`.
- No schema change is needed for this work.

## 4. Provisional decisions from the session

The owner answered a three-part question, then said “not sure”. Treat these as
the starting point, not locked.

1. **Preview location:** expanded `#scNoteEditor` modal.
2. **Simple/Rich:** replace the existing `TXT/HTML` toggle.
   - Simple = raw text textarea, `noteFormat: "text"`.
   - Rich = sanitized **contenteditable WYSIWYG** preview,
     `noteFormat: "html"`.
3. **Confirm:** staged Apply/Cancel in the modal; `st.note` changes only on
   Apply. Cancel discards.

## 5. Open questions to resolve before coding

1. **Raw HTML editing:** replacing TXT/HTML with WYSIWYG removes the current
   ability to edit HTML source. Is that acceptable, or should Rich keep an
   optional source pane/toggle?
2. **“Selection mapping” meaning:**
   - (a) contenteditable DOM-Range editing (selection is already in the
     preview); or
   - (b) true mapping from a read-only rendered preview back to source-string
     offsets, so B/I wrap the corresponding source substring.
   The provisional plan below assumes (a). Confirm if (b) is required, because
   (b) is substantially more complex (sanitizer may change structure, expands
   includes, wraps tables).
3. **Cancel/close with unsaved edits:** discard immediately (provisional), or
   ask “discard changes?” first?
4. **Inline toolbar:** should it stay live (provisional), or also become staged?
5. **Labels:** English `Simple` / `Rich` with Greek tooltips (provisional), or
   Greek labels?
6. **Lossy Rich→Simple:** toast warning, confirmation, or silent (provisional:
   silent because the whole modal is cancellable)?

## 6. Proposed implementation (assuming DOM-Range answer 2a)

### 6.1 Draft model and mode switch

- Add a note-editing context abstraction so the toolbar can target either the
  inline textarea or the modal draft/preview.
- Refactor these to take the context:
  - `fScenarioWrapNoteSelection`
  - `fScenarioCleanNote`
  - `fScenarioInsertNoteSnippet`
  - `fScenarioSetNoteFormat`
  - image/URL/table/component inserters
  - `fScenarioNoteContentBar`
- Replace the single format button with a `Simple` / `Rich` segmented control
  (`aria-pressed`, active state) in both inline and modal toolbars.
- Extract a pure converter:
  - Simple→Rich: keep current text→html behavior (`\n` → `<br>`).
  - Rich→Simple: `MuLERMoCNote.toPlainText(value, "html", true)`.
- Inline toolbar keeps live writes to `st`; modal toolbar writes only to
  `fScenarioNoteEditorState.draft`.

### 6.2 Modal UI

- Keep header/title/close and `dialog.showModal()`.
- Body:
  - `textarea.scNoteEditorText` for Simple;
  - `div.scNoteEditorPreview[contenteditable=true][role=textbox]` for Rich.
- Footer: `Άκυρο` + `Εφαρμογή`.
- Snapshot `{note, noteFormat}` on open; stop live-syncing the inline field.
- Apply:
  1. Rich: `MuLERMoCNote.sanitizeHtml(draft.note)`; block with toast if
     unavailable/invalid.
  2. Write `st.note` + `st.noteFormat`.
  3. Update inline textarea value and toolbar paint.
  4. Close.
- Cancel/Esc/close: discard draft, restore focus to expand button.
- Focus editing surface on open; keep the dialog focus trap.

### 6.3 Rich preview and selection mapping

Add to `js/mulermoc-nom-note-51.js`:

- `renderEditable(container, note)`:
  - reuse `renderInto` with `"html"`;
  - mark `.note-embed[data-note-include]` as `contenteditable="false"`.
- `serializeEditable(container)`:
  - clone the DOM;
  - replace embeds with `<div data-note-include="key"></div>`;
  - unwrap `.note-table-scroll`;
  - strip `contenteditable` attributes;
  - return HTML.
- `sanitizeHtml(note)`:
  - sanitize and return an HTML string (or `null`).

Modal behavior:

- Bold/italic/sup/sub operate on the preview DOM selection:
  - `document.execCommand` with `styleWithCSS=false`;
  - fallback to Range wrap/unwrap when `execCommand` fails.
- Handle ranged and collapsed selections; preserve selection after toggling.
- Sync preview → draft on `input` **without re-rendering** (preserve caret and
  native undo).
- Paste: sanitize pasted `text/html`; fall back to plain text.
- Insertions:
  - insert at caret via Range/`insertHTML`;
  - re-render only when inserting include/component placeholders;
  - image file picker pending state stores the active editing context.

### 6.4 CSS

`css/mulermoc-nom-scenario-51.css`:

- `.scNoteEditorBody` flex layout, `min-height: 0`.
- `.scNoteEditorPreview` scrollable, padded, `.mu-note` typography, focus ring.
- Footer button styles; Simple/Rich segmented control.
- Hide the inactive pane; keep the ≤700px full-screen modal rules.

### 6.5 Validation / fallbacks

- Rich Apply blocked if DOMPurify is unavailable (fail closed).
- Simple keeps the existing unbalanced-tag warning.
- Empty note is valid and clears the step note.
- Rule-table components must survive render → edit → serialize → Apply.

## 7. Files expected to change

| File | Work |
|---|---|
| `js/mulermoc-nom-scenario-51.js` | draft model, mode switch, modal body/footer, helpers refactor, selection mapping |
| `js/mulermoc-nom-note-51.js` | `renderEditable`, `serializeEditable`, `sanitizeHtml` |
| `css/mulermoc-nom-scenario-51.css` | preview pane, footer, mode control, responsive layout |
| `docs/CHANGELOG.md` | v51 entry |
| `docs/SESSION-NOTES.md` | session entry |
| `docs/Presentation-Step-Rich-Text-PLAN.md` | replace “live sync; no preview/Apply/Cancel” |
| `docs/didactic-scenario-plan.md` | Simple/Rich + staged modal wording |
| `README.md`, `docs/PROJECT-PLAN.md`, `docs/PROJECT-PLAN-GR.md` | remove live-sync / TXT-HTML wording if changed |

No new version/file set; v51 stays live.

## 8. Verification checklist

Static:

- `node --check js/mulermoc-nom-scenario-51.js`
- `node --check js/mulermoc-nom-note-51.js`
- CSS brace balance
- no broken v51 asset refs

Functional:

- Simple mode unchanged; inline B/I still wraps tags.
- Rich mode: select text in preview, B/I/sup/sub toggle inline.
- Apply commits note + format; inline textarea reflects it.
- Cancel/Esc/close leaves `st.note`/`st.noteFormat` untouched.
- Simple→Rich→Simple conversion works; cancel can discard conversion.
- Image file, URL image, table, and all five rule-table components insert in
  Rich mode and survive Apply.
- Paste of script/event-handler HTML is sanitized.
- Rule-table embeds remain placeholders in stored HTML.
- Focus returns to expand button; dialog focus trap still works.
- Empty note clears correctly.
- No console errors in Chrome and Firefox.

## 9. Suggested first commands tomorrow

```bash
cd /mnt/d/NICK/Projects/2023-EduProjects/Anastasia/MuLERMoCs-Anastasia
git status --short
git log --oneline -3
# then read this file + the note-editor sections in scenario-51.js
```

Before coding, get a clear answer to §5 questions 1–2; they determine whether
the work is a focused WYSIWYG modal or a much larger source-preview mapping
project.
