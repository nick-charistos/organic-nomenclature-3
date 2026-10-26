# v52 — Αναβαθμίσεις κειμένου βήματος και λειτουργικότητας

> **Προς:** Γιάννη (`yanisken9`)  
> **Από:** Nick / MuLERMoCs  
> **Κατάσταση:** v52 live (`index.html` → `mulermoc-nom-52.html`), 2026-10-26  
> **Σύγκριση:** κύριο app JS/data του `thesis-work` έναντι της τοπικής v52  
> **Εστίαση:** η αναβάθμιση του κειμένου βήματος (step text) και η νέα λειτουργικότητα γύρω από αυτό — όχι το Namelecule shell, τα lessons ή τα professor reports.

---

## 1. Σύνοψη

Η v52 κρατά τη λογική «ένα κείμενο ανά βήμα» και το ίδιο schema (`scenarioVersion: 1`, `noteFormat: "text" | "html"`), αλλά αλλάζει ριζικά τον τρόπο γραφής και παρουσίασης του κειμένου:

- Το inline κείμενο του βήματος είναι πλέον **WYSIWYG editor** μέσα στο drawer, με ζωντανή εγγραφή στο `st.note`.
- Το expand ανοίγει **modal editor** με WYSIWYG + **HTML source** και staged **Apply/Cancel**.
- Τα παλιά text notes αναβαθμίζονται **μόνο όταν τα επεξεργαστείς πραγματικά**.
- Η μορφοποίηση απέκτησε λίστες, μέγεθος ανά block, στοίχιση, εικόνες με dialog, δύο στήλες και θέση κειμένου (πάνω/αριστερά/δεξιά).
- Η παρουσίαση απέκτησε top card που ευθυγραμμίζεται με τις ορατές στήλες και side rail που τεντώνει στο ύψος της εφαρμογής.

Το αποτέλεσμα είναι ένα πιο «πραγματικό» rich-text βήμα, χωρίς αλλαγή στο JSON schema και χωρίς να χαλάσει η συμβατότητα με παλιά scenarios.

---

## 2. Τι βλέπει ο δάσκαλος/μαθητής

### 2.1 Inline κείμενο βήματος

- Το `snote` είναι `contenteditable` WYSIWYG, όχι textarea.
- Οι αλλαγές γράφονται ζωντανά στο `st.note` (δεν χρειάζεται Save μόνο για το κείμενο).
- Το ύψος είναι φραγμένο και το περιεχόμενο κάνει εσωτερικό scroll.
- Το expand κουμπί ανοίγει τον μεγάλο editor.
- Η inline γραμμή εργαλείων είναι ελαφριά: `B`, `I`, `x²`, `x₂`, clear, UL/OL, μέγεθος, στοίχιση, στήλες, θέση κειμένου.
- Οι βαριές ενέργειες (εικόνα, πίνακας, έτοιμο περιεχόμενο) ζουν **μόνο στο modal**, ώστε το drawer να μένει καθαρό.

### 2.2 Modal editor

- WYSIWYG και **HTML source** στην ίδια επιφάνεια.
- Το source toggle είναι icon button και δείχνει τη **τρέχουσα κατάσταση**:
  - `code` όταν είσαι σε HTML source,
  - `itemDetails` όταν είσαι σε WYSIWYG.
- Τα tooltips/aria περιγράφουν την **ενέργεια** του κλικ, όχι μόνο την κατάσταση.
- **Apply** γράφει το draft στο βήμα, **Cancel** το απορρίπτει.
- Αν υπάρχουν πραγματικές αλλαγές, το κλείσιμο ζητά επιβεβαίωση.
- Το Apply sanitizes ξανά και αποτυγχάνει κλειστά αν λείπει το DOMPurify.
- Μετά το Apply, το inline κείμενο ανανεώνεται.

### 2.3 Παλιά text notes

- Τα `noteFormat: "text"` δεν μετατρέπονται με το άνοιγμα.
- Η μετατροπή σε HTML γίνεται στην πρώτη πραγματική επεξεργασία.
- Το άνοιγμα/κλείσιμο ή μόνο το source toggle δεν αλλάζει το format και δεν προκαλεί false dirty prompt.

---

## 3. Μορφοποίηση και λειτουργίες

| Λειτουργία | Συμπεριφορά v52 |
|---|---|
| Λίστες | UL/OL, παραμένουν inline. Η στοίχιση εφαρμόζεται στο `ul`/`ol`, όχι στο μεμονωμένο `li`. |
| Κεντραρισμένες λίστες | `list-style-position: inside` ώστε bullets/numbers να κεντράρονται μαζί με το κείμενο. |
| Μέγεθος γραμματοσειράς | Per-block classes `note-fs-14/18/22/26`, όχι inline styles. |
| Στοίχιση | Per-block `note-align-left/center/right`, μόνο σε WYSIWYG. |
| Εικόνες | File picker + `<dialog>` με υποχρεωτικό alt και προαιρετικό width/height (`16–2000`). Το URL image tool έχει αφαιρεθεί. |
| Πίνακες | Μόνο από το modal toolbar. |
| Έτοιμο περιεχόμενο | Rule-table includes, μόνο από το modal. |
| Στήλες | 1↔2 στήλες ανά βήμα (`styleText.columns`). |
| Θέση κειμένου | Πάνω / Αριστερά / Δεξιά (`styleText.position`). |
| Source mode | Τα size/alignment απενεργοποιούνται· οι λίστες παραμένουν διαθέσιμες. |

Οι μορφοποιήσεις αποθηκεύονται ως allowlisted classes μέσα στο note HTML. Το sanitizer τις επιτρέπει, και το serialize/restore τις διατηρεί.

---

## 4. Λίστες και στοίχιση — τι διορθώθηκε

- Η στοίχιση επιλέγει το **container** της λίστας (`ul`/`ol`), όχι το `li`.
- Πολλαπλά επιλεγμένα items από την ίδια λίστα δεν δημιουργούν διπλό class.
- Μικτή επιλογή paragraph + λίστας εφαρμόζει τη στοίχιση και στα δύο.
- Παλιά `li.note-align-*` classes καθαρίζονται.
- Το μέγεθος γραμματοσειράς παραμένει ανά `li`/block.
- Στις κεντραρισμένες λίστες τα bullets/numbers δεν μένουν αριστερά· μπαίνουν στο inline flow και κεντράρονται με το κείμενο.

---

## 5. Παρουσίαση: top card και side rail

- Το top card του κειμένου μετρά την **ένωση των ορατών στηλών**:
  - menu (μόνο όταν το βήμα το εμφανίζει),
  - viewer,
  - analysis.
- Χρησιμοποιεί `--scStepTextFitWidth` / `--scStepTextFitLeft`, με fallback σε full width και ανώτατο όριο `1600px`.
- Αλλαγές menu/viewer/παραθύρου ξαναϋπολογίζουν το πλάτος.
- Οι viewers κάνουν refit όταν αλλάζει το πλάτος του card (γιατί μπορεί να αλλάξει το ύψος).
- Το side rail (Αριστερά/Δεξιά) είναι sticky, τεντώνει στο ύψος της εφαρμογής και κάνει εσωτερικό scroll.
- Κάτω από 1200px το side rail επιστρέφει σε top card.
- Το side rail είναι πάντα μία στήλη· η αποθηκευμένη επιλογή 2 στηλών επιστρέφει όταν το κείμενο πάει ξανά πάνω.

---

## 6. Toolbar και tooltips

- Το inline toolbar έχει compact spacing (`gap: 2px`) ώστε να μένει σε μία σειρά στο pinned πλάτος 480px.
- Το μεγάλο tooltip του expand ενσωματώνει πλέον και «κώδικας» και αγκυρώνει αριστερά, με wrap μέσα στο step row.
- Τα modal tooltips χρησιμοποιούν το ίδιο σκούρο skin με την υπόλοιπη εφαρμογή.
- Το font-size select και τα `.sshow` toggles απέκτησαν dark tooltips αντί για native browser tooltips.
- Τα `.sshow` toggles ομαδοποιήθηκαν σε `.scShowRow`.

---

## 7. Rule-table includes

Η v52 εκθέτει έξι predefined components:

- `rule-table:1`
- `rule-table:2`
- `rule-table:3`
- `rule-table:4`
- `rule-table:alkyl`
- `rule-table:alkoxy` **(νέο)**

Το `rule-table:alkoxy` προστέθηκε μαζί με το `alkoxyTable`/`alkoxyRule` και το `ruleAlkoxy` class allowlist. Όταν επιλέγεται alkoxy component σε αιθέρα, το rule panel γεμίζει με τον πίνακα αλκοξυομάδων και την αντίστοιχη γραμμή selected — με την ίδια collapsed-until-clicked συμπεριφορά όπως όλοι οι άλλοι πίνακες.

---

## 8. Τεχνικός χάρτης

| Περιοχή | Κύριο σημείο |
|---|---|
| Inline/modal note bar | `fScenarioNoteContentBar` (`js/mulermoc-nom-scenario-52.js`) |
| Modal editor | `fScenarioNoteEditorBuild/Open/Paint/SetRichView/Apply` |
| Rich lists/alignment | `fScenarioRichMakeList`, `fScenarioRichAlignTargets`, `fScenarioRichAlignBlocks`, `fScenarioRichClearAlign` |
| Sanitizer/render/serialize | `js/mulermoc-nom-note-52.js` |
| Rule includes | `RULE_INCLUDES` + `COMPONENT_CLASSES` στο `note-52.js` |
| Toolbar scope | `showLists` / `showInsert` / `showComponent` |
| Top card width | `fScenarioSyncStepTextWidth`, `--scStepTextFitWidth`, `--scStepTextFitLeft` |
| Side rail | CSS `@media (min-width:1200px)` + `styleText.position` |
| Lists centered | CSS `list-style-position: inside` για `ul/ol.note-align-center` |
| Alkoxy rule | `fBuildAlkoxyRuleTable`, `namingRules.alkoxyRule/alkoxyTable` |

### 8.1 Πώς μπορείς να τα επαναχρησιμοποιήσεις

- Κράτα το υπάρχον schema: `note: string` + `noteFormat: "text" | "html"`. Δεν χρειάζεται migration.
- Πάρε το `js/mulermoc-nom-note-52.js` (sanitizer/render/serialize/legacy conversion) και τα note-editor/toolbar helpers από το `scenario-52.js`.
- Πάρε τα αντίστοιχα CSS blocks (`snoteRich`, modal editor, toolbar, image dialog, list/alignment classes).
- Τα rule-table includes απαιτούν τα `namingRules` tables (`table1..4`, `alkylTable`, `alkoxyTable`) και το allowlist του `note-52.js`.
- Μπορείς να κρατήσεις το δικό σου Namelecule shell/lessons και να υιοθετήσεις μόνο το step-text/editor κομμάτι.

---

## 9. Τι ΔΕΝ μεταφέρθηκε από το thesis-work

Συνειδητά εκτός:

- Namelecule shell/theme/welcome/theory library/lessons.
- Scenario-specific pilot gating (`fScenarioShow*Rule`).
- MOL-only rendering και SVG overrides.
- Uniform 2D library frame / `fFit2DSVG` / `fScheduleNameFit` (η τοπική v52 χρήση `fFitNameComponents` παραμένει).
- Palette και numbering-size restyles.
- JSmol console/publication-verification commits.
- Αλλαγές σε `docs/` professor reports, scenarios και lessons του thesis-work.

Από το thesis-work κρατήθηκαν μόνο shared main-app δεδομένα/μηχανισμοί που χρειάζονται για τα νέα μόρια και την ονοματολογία (π.χ. ketone/aldehyde/ether graph guards, `HCHO`, ether branch groups, `fGetEtherCommonParts`, alkoxy table).

---

## 10. Επαλήθευση

Έχουν ελεγχθεί:

- `esprima` σε data/core· τα molview/teaching φορτώνονται στο πραγματικό app χωρίς JS exceptions.
- 126/126 `nameExamples` + 126 `MOL2D` keys, χωρίς missing registrations.
- Ονοματολογία και των 28 νέων μορίων.
- Σωστές κοινές ονομασίες αιθέρων, π.χ. `ισοβουτυλοϊσοπροπυλαιθέρας`.
- IUPAC locant/prefix και common alkyl clicks: 2D highlight + numbering.
- Methanal: `HCHO` label και σωστή εξήγηση αλδεΰδης.
- Alkoxy table: γεμίζει/επιλέγει σωστά, collapsed όπως οι άλλοι πίνακες.
- Cold page load και non-ether prefix clicks χωρίς σφάλματα.
- `git diff --check` clean.

Εκκρεμούν:

- Οπτικός έλεγχος 3D/JSmol highlights σε πραγματικό browser.
- Firefox/touch/screen-reader.
- Πραγματικό click-through σε σενάρια.

---

## 11. Τι θα ήταν χρήσιμο από εσένα

1. Επιβεβαίωση της σύμβασης connectors για `sec-`/`tert-` στις κοινές ονομασίες αιθέρων.
2. Έλεγχος αν θέλεις να κρατήσουμε τη δική μας συμπεριφορά rule panel (collapsed-until-clicked) και στα δικά σου lessons.
3. Έλεγχος των 7 νέων αιθέρων σε πραγματικό browser, ειδικά 3D highlight και locant clicks.
4. Οποιαδήποτε διαφορά βρεις στα ονόματα, στείλε μόρια + αναμενόμενο/πραγματικό όνομα για targeted fix.
