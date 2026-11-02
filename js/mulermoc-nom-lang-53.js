// mulermoc-nom-lang-53.js
// E1: single-codebase ?lang= infrastructure (Greek default, EN fallback).
// Usage: mulermoc-nom-53.html?lang=en  (also persists to localStorage).
// Covers chrome + scenario/teaching tooltips; chemistry names via name-en-53.js,
// scenarios content stays author-language (gr default).

var MULER_STRINGS = {
  pageTitle: { gr: "Ονοματολογία Άκυκλων Οργανικών Ενώσεων", en: "Acyclic Organic Compounds Nomenclature" },
  menu: { gr: "☰ Μενού", en: "☰ Menu" },
  molecule: { gr: "Μόριο", en: "Molecule" },
  settings: { gr: "Ρυθμίσεις", en: "Settings" },
  chainCalc: { gr: "Υπολογισμός κύριας αλυσίδας:", en: "Main chain calculation:" },
  fromData: { gr: "Από δεδομένα", en: "From data" },
  algorithmic: { gr: "Αλγοριθμικά", en: "Algorithmic" },
  condensed: { gr: "Συνεπτυγμένος", en: "Condensed" },
  expanded: { gr: "Ανεπτυγμένος", en: "Expanded" },
  skeletal: { gr: "Σκελετικός", en: "Skeletal" },
  showOrig2D: { gr: "Εμφάνιση αρχικής 2D αναπαράστασης JSME:", en: "Show original JSME 2D depiction:" },
  hlAtoms: { gr: "Επισήμανση ατόμων κατά την αρίθμηση:", en: "Highlight atoms on numbering:" },
  hlBonds: { gr: "Επισήμανση δεσμών κατά την αρίθμηση:", en: "Highlight bonds on numbering:" },
  hlBondAtoms: { gr: "Επισήμανση ατόμων δεσμών:", en: "Highlight bond atoms:" },
  atomColor2D: { gr: "Χρωματισμός ατόμων 2D:", en: "2D atom coloring:" },
  byAtom: { gr: "Κατά άτομο", en: "By atom" },
  byGroup: { gr: "Κατά ομάδα", en: "By group" },
  atomSymbols3D: { gr: "Σύμβολα ατόμων 3D:", en: "3D atom symbols:" },
  maxHeight1: { gr: "Όριο ύψους μεμονωμένου viewer:", en: "Single viewer max height:" },
  bothHeight: { gr: "Ύψος δύο viewers (σύνολο):", en: "Two viewers height (total):" },
  naming: { gr: "Ονομασία", en: "Naming" },
  namingSettings: { gr: "Ρυθμίσεις Ονομασίας", en: "Naming settings" },
  fullName: { gr: "Πλήρες όνομα", en: "Full name" },
  readName: { gr: "Εκφώνηση ονόματος", en: "Read name aloud" },
  showBoxes: { gr: "Πλαίσια συνθετικών", en: "Component boxes" },
  hideBoxes: { gr: "Χωρίς πλαίσια συνθετικών", en: "No component boxes" },
  splitComps: { gr: "Διαχωρισμένα συνθετικά", en: "Split components" },
  joinedComps: { gr: "Ενωμένα συνθετικά", en: "Joined components" },
  compVisibility: { gr: "Ορατότητα συνθετικών", en: "Component visibility" },
  showComp: { gr: "Εμφάνιση συνθετικού", en: "Show component" },
  hideComp: { gr: "Απόκρυψη συνθετικού", en: "Hide component" },
  show2D: { gr: "Εμφάνιση 2D", en: "Show 2D" },
  show3D: { gr: "Εμφάνιση 3D", en: "Show 3D" },
  zoomIn: { gr: "Μεγέθυνση", en: "Zoom in" },
  zoomOut: { gr: "Σμίκρυνση", en: "Zoom out" },
  saveImage: { gr: "Αποθήκευση εικόνας", en: "Save image" },
  noMolHint: { gr: "Επιλέξτε μόριο για ανάλυση ονόματος", en: "Select a molecule for name analysis" },
  present: { gr: "Παρουσίαση", en: "Present" },
  presentFromStep: { gr: "Παρουσίαση από αυτό το βήμα", en: "Present from this step" },
  preview: { gr: "Προεπισκόπηση", en: "Preview" },
  exit: { gr: "Έξοδος", en: "Exit" },
  close: { gr: "Κλείσιμο (ESC)", en: "Close (ESC)" },
  cancel: { gr: "Άκυρο", en: "Cancel" },
  delete: { gr: "Διαγραφή", en: "Delete" },
  deleteStep: { gr: "Διαγραφή", en: "Delete step" },
  deleteScenario: { gr: "Διαγραφή σεναρίου", en: "Delete scenario" },
  updateStep: { gr: "Ενημέρωση βήματος από την τρέχουσα προβολή", en: "Update step from current view" },
  dupeStep: { gr: "Διπλασιασμός βήματος", en: "Duplicate step" },
  addStep: { gr: "Αποθήκευση προβολής ως βήμα", en: "Add step" },
  scenarios: { gr: "Σενάρια Παρουσίασης", en: "Presentation scenarios" },
  steps: { gr: "Βήματα", en: "Steps" },
  rule: { gr: "Κανόνας", en: "Rule" },
  insert: { gr: "Εισαγωγή", en: "Insert" },
  insertTable: { gr: "Εισαγωγή πίνακα", en: "Insert table" },
  presentFromStep1: { gr: "Έναρξη παρουσίασης από το βήμα 1", en: "Start presenting from step 1" },
  toggleSteps: { gr: "Εμφάνιση/Απόκρυψη βημάτων", en: "Show/hide steps" },
  downloadScenario: { gr: "Λήψη σεναρίου (JSON)", en: "Download scenario (JSON)" },
  uploadScenario: { gr: "Φόρτωση σεναρίου (JSON)", en: "Load scenario (JSON)" },
  newScenario: { gr: "Νέο κενό σενάριο", en: "New blank scenario" },
  scenarioAuthor: { gr: "Συγγραφέας σεναρίου (προαιρετικό)", en: "Scenario author (optional)" },
  prevStep: { gr: "Προηγούμενο βήμα", en: "Previous step" },
  nextStep: { gr: "Επόμενο βήμα", en: "Next step" },
  moveUp: { gr: "Επάνω", en: "Move up" },
  moveDown: { gr: "Κάτω", en: "Move down" },
  pinAside: { gr: "Καρφίτσωμα δίπλα στο περιεχόμενο", en: "Pin next to content" },
  examples: { gr: "Παραδείγματα", en: "Examples" },
  prevChain: { gr: "Προηγούμενη αλυσίδα", en: "Previous chain" },
  nextChain: { gr: "Επόμενη αλυσίδα", en: "Next chain" },
  mainChainShort: { gr: "Κύρια αλυσίδα:", en: "Main chain:" },
  readNameAlt: { gr: "Ανάγνωση ονόματος", en: "Read name aloud" },
  exitFullName: { gr: "Έξοδος από το πλήρες όνομα", en: "Exit full name" },
  exitBigEditor: { gr: "Έξοδος από τον μεγάλο επεξεργαστή", en: "Exit the large editor" },
  molInfo: { gr: "Πληροφορίες μορίου", en: "Molecule info" },
  molInfoSmiles: { gr: "SMILES:", en: "SMILES:" },
  molInfoIupac: { gr: "IUPAC (PubChem):", en: "IUPAC (PubChem):" },
  molInfoFetching: { gr: "Αναζήτηση…", en: "Looking up…" },
  molInfoMissing: { gr: "Χωρίς εγγραφή PubChem", en: "No PubChem record" },
  molInfoCopy: { gr: "Αντιγραφή SMILES", en: "Copy SMILES" },
  molInfoCopied: { gr: "Αντιγράφηκε", en: "Copied" },
  molInfoSystematic: { gr: "Συστηματική (PubChem):", en: "Systematic (PubChem):" },
  molInfoCommon: { gr: "Κοινή ονομασία (PubChem):", en: "Common name (PubChem):" },
  commonMatchTip: { gr: "Η κοινή ονομασία συμφωνεί με το PubChem — η συστηματική μορφή διαφέρει λόγω σχολικής σύμβασης", en: "Common name matches PubChem — systematic form differs by school convention" },
  imageDlg: { gr: "Εικόνα", en: "Image" },
  altText: { gr: "Εναλλακτική περιγραφή", en: "Alternative text" },
  widthPx: { gr: "Πλάτος (px)", en: "Width (px)" },
  heightPx: { gr: "Ύψος (px)", en: "Height (px)" },
  sizeAutoHint: { gr: "Κενό = αυτόματο. Προαιρετικά 16–2000 px.", en: "Blank = auto. Optionally 16–2000 px." },
  tableRows: { gr: "Γραμμές πίνακα (1–8)", en: "Table rows (1–8)" },
  tableCols: { gr: "Στήλες πίνακα (1–8)", en: "Table columns (1–8)" },
  bold: { gr: "Έντονα", en: "Bold" },
  italic: { gr: "Πλάγια", en: "Italic" },
  superscript: { gr: "Εκθέτης", en: "Superscript" },
  subscript: { gr: "Δείκτης", en: "Subscript" },
  clearFormat: { gr: "Καθαρισμός μορφοποίησης", en: "Clear formatting" },
  bulletList: { gr: "Λίστα με κουκκίδες", en: "Bulleted list" },
  numberedList: { gr: "Αριθμημένη λίστα", en: "Numbered list" },
  fontSizeSel: { gr: "Μέγεθος επιλεγμένου κειμένου", en: "Selected text size" },
  visualOnly: { gr: "Διαθέσιμο στην οπτική επεξεργασία", en: "Available in visual editing" },
  alignSel: { gr: "Στοίχιση επιλεγμένου κειμένου", en: "Align selected text" },
  alignLeft: { gr: "Αριστερά", en: "Left" },
  alignCenter: { gr: "Κέντρο", en: "Center" },
  alignRight: { gr: "Δεξιά", en: "Right" },
  alignMenu: { gr: "Στοίχιση κειμένου", en: "Text alignment" },
  posTop: { gr: "Πάνω", en: "Top" },
  posMenu: { gr: "Θέση κειμένου", en: "Text position" },
  imageFromFile: { gr: "Εικόνα από αρχείο (PNG/JPEG/GIF/WebP, ≤500 KB)", en: "Image from file (PNG/JPEG/GIF/WebP, ≤500 KB)" },
  readyContent: { gr: "Έτοιμο περιεχόμενο", en: "Predefined content" },
  toPlainText: { gr: "Μορφή HTML — κλικ για απλό κείμενο", en: "HTML view — click for plain text" },
  toHtml: { gr: "Απλό κείμενο — κλικ για HTML", en: "Plain text — click for HTML" },
  backToVisual: { gr: "Επιστροφή στην οπτική επεξεργασία", en: "Back to visual editing" },
  editHtmlSource: { gr: "Επεξεργασία HTML πηγής", en: "Edit HTML source" },
  teachingScenarios: { gr: "Σενάρια διδασκαλίας", en: "Teaching scenarios" },
  narrateOff: { gr: "Αφήγηση ανενεργή", en: "Narration off" },
  narrateOn: { gr: "Αφήγηση ενεργή", en: "Narration on" },
  bigEditor: { gr: "Μεγάλος επεξεργαστής — εικόνα, πίνακας, έτοιμο περιεχόμενο, κώδικας", en: "Large editor — image, table, predefined content, code" },
  textColsToggle: { gr: "Στήλες κειμένου: 1/2 (εναλλαγή)", en: "Text columns: 1/2 (toggle)" },
  stepText: { gr: "Κείμενο βήματος", en: "Step text" },
  text1Col: { gr: "Κείμενο σε 1 στήλη (εναλλαγή σε 2)", en: "Text in 1 column (switch to 2)" },
  text2Col: { gr: "Κείμενο σε 2 στήλες (εναλλαγή σε 1)", en: "Text in 2 columns (switch to 1)" },
  molGrouping: { gr: "Ομαδοποίηση μορίων", en: "Molecule grouping" },
  menuGrouping: { gr: "Ομαδοποίηση μενού", en: "Menu grouping" },
  fullHeight: { gr: "Πλήρες ύψος οθόνης — προσαρμόζεται σε κάθε οθόνη προβολής", en: "Full display height — adapts to each screen" },
  scenarioLabel: { gr: "Σενάριο παρουσίασης", en: "Presentation scenario" },
  authorShort: { gr: "Συγγραφέας σεναρίου", en: "Scenario author" },
  ruleNarrate: { gr: "Ανάγνωση κανόνα", en: "Read rule aloud" },
  showHide: { gr: "Εμφάνιση/Απόκρυψη", en: "Show/hide" },
  commonName: { gr: "Κοινή", en: "Common" },
  unclassified: { gr: "Μη ταξινομημένα", en: "Unclassified" },
  allMolecules: { gr: "Όλα τα μόρια", en: "All molecules" },
  chemClasses: { gr: "Χημικές Τάξεις", en: "Chemical classes" },
  homolSeries: { gr: "Ομόλογες Σειρές", en: "Homologous series" },
  nomenclatureRules: { gr: "Κανόνες Ονοματολογίας", en: "Nomenclature rules" },
  seriesAlkanes: { gr: "Αλκάνια", en: "Alkanes" },
  seriesAlkenes: { gr: "Αλκένια", en: "Alkenes" },
  seriesAlkadienes: { gr: "Αλκαδιένια", en: "Alkadienes" },
  seriesAlkynes: { gr: "Αλκίνια", en: "Alkynes" },
  seriesEnynes: { gr: "Αλκενίνια", en: "Enynes" },
  seriesHalogen: { gr: "Αλκυλαλογονίδια", en: "Alkyl halides" },
  seriesAlcohol: { gr: "Αλκοόλες", en: "Alcohols" },
  seriesEther: { gr: "Αιθέρες", en: "Ethers" },
  seriesAldehyde: { gr: "Αλδεΰδες", en: "Aldehydes" },
  seriesKetone: { gr: "Κετόνες", en: "Ketones" },
  seriesCarboxylicAcid: { gr: "Καρβοξυλικά οξέα", en: "Carboxylic acids" },
  seriesEster: { gr: "Εστέρες", en: "Esters" },
  seriesNitro: { gr: "Νιτροενώσεις", en: "Nitro compounds" },
  seriesCyanide: { gr: "Νιτρίλια", en: "Nitriles" },
  seriesHydroxyNitriles: { gr: "Υδροξυνιτρίλια", en: "Hydroxynitriles" },
  seriesAmine: { gr: "Αμίνες", en: "Amines" },
  seriesAminoAcids: { gr: "Αμινοξέα", en: "Amino acids" },
  seriesOxoCarboxylicAcids: { gr: "Οξοκαρβοξυλικά οξέα", en: "Oxocarboxylic acids" },
  seriesHydroxyAcids: { gr: "Υδροξυοξέα", en: "Hydroxy acids" },
  seriesKetoAcids: { gr: "Κετοξέα", en: "Keto acids" },
  classHydrocarbons: { gr: "Υδρογονάνθρακες", en: "Hydrocarbons" },
  classAlkylHalides: { gr: "Αλκυλαλογονίδια", en: "Alkyl halides" },
  classAlcohols: { gr: "Αλκοόλες", en: "Alcohols" },
  classEthers: { gr: "Αιθέρες", en: "Ethers" },
  classCarbonyl: { gr: "Καρβονυλικές Ενώσεις", en: "Carbonyl compounds" },
  classCarboxylicAcids: { gr: "Καρβοξυλικά Οξέα", en: "Carboxylic acids" },
  classEsters: { gr: "Εστέρες", en: "Esters" },
  classNitriles: { gr: "Νιτρίλια", en: "Nitriles" },
  classAmines: { gr: "Αμίνες", en: "Amines" },
  classNitro: { gr: "Νιτροενώσεις", en: "Nitro compounds" },
  toastPicOnly: { gr: "Αποδεκτές μόνο εικόνες PNG, JPEG, GIF ή WebP.", en: "Only PNG, JPEG, GIF or WebP images are accepted." },
  toastPicTooBig: { gr: "Η εικόνα είναι πολύ μεγάλη (όριο ~500 KB).", en: "The image is too large (limit ~500 KB)." },
  toastNoFileAPI: { gr: "Ο browser δεν υποστηρίζει ανάγνωση αρχείων εικόνας.", en: "This browser cannot read image files." },
  toastPicReadFail: { gr: "Αποτυχία ανάγνωσης της εικόνας.", en: "Failed to read the image." },
  toastAltRequired: { gr: "Η εναλλακτική περιγραφή εικόνας είναι υποχρεωτική.", en: "Alternative image text is required." },
  toastWidthInt: { gr: "Το πλάτος πρέπει να είναι ακέραιος 16–2000 px.", en: "Width must be an integer 16–2000 px." },
  toastHeightInt: { gr: "Το ύψος πρέπει να είναι ακέραιος 16–2000 px.", en: "Height must be an integer 16–2000 px." },
  confirmUnsaved: { gr: "Υπάρχουν μη αποθηκευμένες αλλαγές. Να απορριφθούν;", en: "There are unsaved changes. Discard them?" },
  toastRichStuck: { gr: "Η πλούσια προεπισκόπηση δεν είναι διαθέσιμη· παραμείνατε στην προβολή HTML.", en: "Rich preview unavailable; stayed in HTML view." },
  toastRichUseHtml: { gr: "Η πλούσια προεπισκόπηση δεν είναι διαθέσιμη· χρησιμοποιήστε την προβολή HTML.", en: "Rich preview unavailable; use HTML view." },
  toastSafeNoChange: { gr: "Η ασφαλής μορφοποίηση δεν είναι διαθέσιμη· η προεπισκόπηση δεν άλλαξε.", en: "Safe formatting unavailable; preview unchanged." },
  toastSafeAborted: { gr: "Η ασφαλής μορφοποίηση δεν είναι διαθέσιμη· η εφαρμογή ακυρώθηκε.", en: "Safe formatting unavailable; changes discarded." },
  etherCommonWord: { gr: "αιθέρας", en: "ether" },
  moleculesPlural: { gr: "Μόρια", en: "Molecules" },
  menuWord: { gr: "Μενού", en: "Menu" },
  scenariosShort: { gr: "Σενάρια", en: "Scenarios" },
  stepTitle: { gr: "Τίτλος βήματος", en: "Step title" },
  notePlaceholder: { gr: "Γράψτε το κείμενο του βήματος…", en: "Write the step text…" },
  htmlSource: { gr: "HTML πηγής", en: "Source HTML" },
  scenTitle: { gr: "Τίτλος σεναρίου", en: "Scenario title" },
  settings2D: { gr: "2D ρυθμίσεις", en: "2D settings" },
  settings3D: { gr: "3D ρυθμίσεις", en: "3D settings" },
  namingSettingsLower: { gr: "Ρυθμίσεις ονομασίας", en: "Naming settings" },
  nameInteract: { gr: "Διάδραση ονομασίας", en: "Name interaction" },
  menuGroupsTitle: { gr: "Ταξινομήσεις Μένου:", en: "Menu groupings:" },
  chSymbols: { gr: "Σύμβολα CH", en: "CH symbols" },
  hydrogens: { gr: "Υδρογόνα", en: "Hydrogens" },
  rotation: { gr: "Περιστροφή", en: "Rotation" },
  visBall: { gr: "Σφαίρες και Ράβδοι", en: "Ball and stick" },
  visSpace: { gr: "Χωροπληρωτικό", en: "Space filling" },
  visSticks: { gr: "Ράβδοι", en: "Sticks" },
  sizeDefault: { gr: "Μέγεθος", en: "Size" },
  size14: { gr: "Μικρό 14", en: "Small 14" },
  size18: { gr: "Κανονικό 18", en: "Normal 18" },
  size22: { gr: "Μεγάλο 22", en: "Large 22" },
  size26: { gr: "Πολύ μεγάλο 26", en: "Extra large 26" },
  clickHintName: { gr: "Κάνε κλικ σε ένα συνθετικό του ονόματος για να δεις την εξήγηση", en: "Click a name component to see its explanation" },
  clickHintComp: { gr: "Κάνε κλικ σε ένα συστατικό του ονόματος για να δεις την εξήγηση", en: "Click a name constituent to see its explanation" },
  toastPicDataTooBig: { gr: "Η εικόνα data URI είναι πολύ μεγάλη (όριο ~500 KB).", en: "The image data URI is too large (limit ~500 KB)." },
  applyBtn: { gr: "Εφαρμογή", en: "Apply" },
  richText: { gr: "Πλούσιο κείμενο", en: "Rich text" },
  stepLang: { gr: "Γλώσσα βήματος", en: "Step language" },
  enMismatchTip: { gr: "Η μηχανική ονομασία διαφέρει από την IUPAC του PubChem — εκκρεμεί ανθρώπινος έλεγχος", en: "Engine name differs from PubChem IUPAC — pending human review" },
  enNoOracleTip: { gr: "Δεν υπάρχουν δεδομένα PubChem/CIR για έλεγχο", en: "No PubChem/CIR data to validate against" },
  enNoErrorTip: { gr: "Αποτυχία ανάκτησης από oracle (δίκτυο) — χωρίς έλεγχο", en: "Oracle lookup failed (network) — not validated" },
  oracleNameTip: { gr: "Ονομασία από τον oracle του PubChem — εκκρεμεί ανθρώπινος έλεγχος", en: "Name from the PubChem oracle — pending human review" },
  greekFallbackTip: { gr: "Δεν υπάρχει αγγλική ονομασία από τη μηχανή — εμφανίζεται η ελληνική", en: "No engine English name — showing Greek" },
  confirmDelete: { gr: "Διαγραφή", en: "Delete" },
  unclosedTag: { gr: "Μη κλεισμένη ετικέτα — ελέγξτε τα <...>.", en: "Unclosed tag — check the <...>." },
  imgShort: { gr: "Εικ.", en: "Img" },
  tblShort: { gr: "Πίν.", en: "Tbl" },
  comp1Menu: { gr: "1ο συνθετικό", en: "1st component" },
  comp2Menu: { gr: "2ο συνθετικό", en: "2nd component" },
  comp3Menu: { gr: "3ο συνθετικό", en: "3rd component" },
  groupOrderMenu: { gr: "Σειρά ομάδων", en: "Group order" },
  alkylMenu: { gr: "Αλκύλια", en: "Alkyls" },
  alkoxyMenu: { gr: "Αλκοξυομάδες", en: "Alkoxy groups" },
  untitledDoc: { gr: "χωρίς τίτλο", en: "untitled" },
  stepCopy: { gr: "(αντίγραφο)", en: "(copy)" },
  imgUnavailable: { gr: "Εικόνα μη διαθέσιμη", en: "Image unavailable" }
};
// Dynamic labels keep a Greek prefix + variable tail; translate the prefix AND the tail.
var MULER_PREFIX_GR2EN = [
  ["Παρουσίαση από το βήμα ", "Present from step "],
  ["Θέση κειμένου: ", "Text position: "],
  ["Επιλογή μορίων για το στιγμιότυπο", "Select molecules for the snapshot"],
  ["Σύρετε για αναδιάταξη του βήματος ", "Drag to reorder step "],
  ["μόνο μενού (", "menu only ("],
  ["Βήματα (", "Steps ("],
  ["Κείμενο βήματος ", "Step text "]
];

function fMulerLang() {
  try {
    // Per-step override (scenario steps carry their creation language).
    // In-memory only: never persisted, cleared on present exit / reload.
    if (typeof window !== "undefined" && (window.__mulerStepLang === "en" || window.__mulerStepLang === "gr")) return window.__mulerStepLang;
    var m = /[?&]lang=(en|gr)\b/.exec(location.search || "");
    if (m) {
      try { localStorage.setItem("mulerLang", m[1]); } catch (e) {}
      return m[1];
    }
    var s = null;
    try { s = localStorage.getItem("mulerLang"); } catch (e) {}
    return s === "en" ? "en" : "gr";
  } catch (e) {
    return "gr";
  }
}

function fMulerT(key) {
  var lang = fMulerLang();
  var e = MULER_STRINGS[key];
  if (!e) return "";
  if (lang === "en") return e.en || e.gr;
  return e.gr;
}

function fApplyMulerLangPilot() {
  if (fMulerLang() !== "en") return;
  try { fMulerPaintStaticChrome(); } catch (e) {}
  if (typeof MutationObserver !== "undefined") fMulerObserveTooltips();
  console.log("[LANG] applied EN (strings + tooltips/aria observer), lang=en");
}

// Static chrome painter — idempotent, language-agnostic (fMulerT resolves
// the effective language, incl. the per-step override). Called at boot and
// on every step-language change.
function fMulerPaintStaticChrome() {
  var lang = "gr";
  try { lang = fMulerLang(); } catch (e) {}
  try { document.documentElement.lang = lang === "en" ? "en" : "el"; } catch (e) {}
  // Keep document.title in sync for EN tabs/bookmarks.
  try { document.title = fMulerT("pageTitle"); } catch (e) {}
  var set = function (sel, txt) {
    try {
      var el = document.querySelector(sel);
      if (el && txt) el.textContent = txt;
    } catch (e) {}
  };
  var setTip = function (sel, txt) {
    try {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) els[i].setAttribute("data-tooltip", txt);
    } catch (e) {}
  };
  set("#pageTitle", fMulerT("pageTitle"));
  set("#menuToggle", fMulerT("menu"));
  set("#viewerCol .panelTitle > span", fMulerT("molecule"));
  set("#viewerSettingsPanel .settingTitle", fMulerT("settings"));
  set("#radioChainMode .settingLabel", fMulerT("chainCalc"));
  try {
    var labels = document.querySelectorAll("#viewerSettingsPanel .settingLabel");
    // positional: 1 showOrig2D, 2 hlAtoms, 3 hlBonds, 4 hlBondAtoms, 5 atomColor2D, 6 atomSymbols3D, 7 maxHeight1, 8 bothHeight
    var map = ["chainCalc", "showOrig2D", "hlAtoms", "hlBonds", "hlBondAtoms", "atomColor2D", "atomSymbols3D", "maxHeight1", "bothHeight"];
    for (var li = 0; li < labels.length && li < map.length; li++) {
      var t = fMulerT(map[li]);
      if (t && labels[li].firstChild) labels[li].firstChild.textContent = t + " ";
      else if (t) labels[li].textContent = t + " ";
    }
  } catch (e) {}
  try {
    var radios = document.querySelectorAll("#radioChainMode .radioCheckContainer");
    if (radios[0] && radios[0].firstChild) radios[0].firstChild.textContent = fMulerT("fromData") + " ";
    if (radios[1] && radios[1].firstChild) radios[1].firstChild.textContent = fMulerT("algorithmic") + " ";
  } catch (e) {}
  try {
    var modes = document.querySelectorAll("#radio2DMode .mode2DOption");
    if (modes[0] && modes[0].firstChild) modes[0].firstChild.textContent = fMulerT("condensed") + " ";
    if (modes[1] && modes[1].firstChild) modes[1].firstChild.textContent = fMulerT("expanded") + " ";
    if (modes[2] && modes[2].firstChild) modes[2].firstChild.textContent = fMulerT("skeletal") + " ";
  } catch (e) {}
  try {
    var zz = document.getElementById("zigzagCheck");
    if (zz) zz.innerHTML = (lang === "en" ? "CH<sub>n</sub> symbols" : "Σύμβολα CH<sub>n</sub>") + '<span class="checkBox"></span>';
  } catch (e) {}
  try {
    var cands = document.querySelectorAll("#atomColorMode .atomColorModeRadio");
    if (cands[0] && cands[0].firstChild) cands[0].firstChild.textContent = fMulerT("byAtom") + " ";
    if (cands[1] && cands[1].firstChild) cands[1].firstChild.textContent = fMulerT("byGroup") + " ";
  } catch (e) {}
  setTip("#zoomOutBtn", fMulerT("zoomOut") + " 2D");
  setTip("#zoomInBtn", fMulerT("zoomIn") + " 2D");
  setTip("#save2DBtn", fMulerT("saveImage") + " 2D");
  setTip("#zoomOut3DBtn", fMulerT("zoomOut") + " 3D");
  setTip("#zoomIn3DBtn", fMulerT("zoomIn") + " 3D");
  setTip("#save3DBtn", fMulerT("saveImage") + " 3D");
  setTip("#view2DBtn", fMulerT("show2D"));
  setTip("#view3DBtn", fMulerT("show3D"));
  setTip("#viewerSettingsBtn", fMulerT("settings"));
  setTip("#nameSettingsBtn", fMulerT("namingSettings"));
  setTip("#readNameBtn", fMulerT("readName"));
  // scenario/teaching tooltips (best-effort; bars render lazily)
  setTip("#scExit", fMulerT("exit") + " (ESC)");
  setTip("#scCloseBar", fMulerT("close"));
  setTip("#scScrollLeft", fMulerT("preview") + " <-");
  setTip("#scScrollRight", fMulerT("preview") + " ->");
  setTip(".scPresentStep", fMulerT("presentFromStep"));
  setTip(".scUpdate", fMulerT("updateStep"));
  setTip(".scDupe", fMulerT("dupeStep"));
  setTip(".scSave", fMulerT("addStep"));
  setTip(".scDelete", fMulerT("deleteScenario"));
  setTip(".delete", fMulerT("deleteStep"));
  setTip("#scPrev", fMulerT("prevStep"));
  setTip("#scNext", fMulerT("nextStep"));
  setTip("#scPresent", fMulerT("presentFromStep1"));
  setTip(".scList", fMulerT("toggleSteps"));
  setTip(".scExport", fMulerT("downloadScenario"));
  setTip(".scImport", fMulerT("uploadScenario"));
  setTip(".scNew", fMulerT("newScenario"));
  setTip(".scenarioAuthor", fMulerT("scenarioAuthor"));
  setTip("#chainPrevBtn", fMulerT("prevChain"));
  setTip("#chainNextBtn", fMulerT("nextChain"));
}

// Step-language refresh: re-renders all language-dependent chrome in the
// effective language. Skipped when nothing changed (same painted language),
// so same-language step navigation costs nothing and loses no UI state.
function fMulerRefreshStepChrome() {
  var eff = "gr";
  try { eff = (typeof fMulerLang === "function") ? fMulerLang() : "gr"; } catch (e) {}
  try {
    if (typeof window !== "undefined" && window.__mulerPaintedLang === eff) return;
  } catch (e) {}
  try { if (typeof fMulerPaintStaticChrome === "function") fMulerPaintStaticChrome(); } catch (e) {}
  try { if (typeof fScenarioRepaintStaticChrome === "function") fScenarioRepaintStaticChrome(); } catch (e) {}
  try {
    // Present mode owns #nomeclature2Menu (author menu rebuild would clobber
    // it): re-render the present menu, preserving the grouping switcher.
    var _inPresent = false;
    try { _inPresent = !!(typeof MuLERMoCScenario !== "undefined" && MuLERMoCScenario.present); } catch (eP) {}
    if (_inPresent && typeof fScenarioRenderPresentMenu === "function") {
      var _pv = null;
      try {
        var _sel = document.querySelector(".scPresentGrouping [data-pgroup].selectedRadio");
        _pv = _sel ? _sel.getAttribute("data-pgroup") : null;
      } catch (eV) {}
      fScenarioRenderPresentMenu(_pv);
    } else if (typeof fInitNomeclatureMenu === "function") {
      // Authoring menu rebuild (e.g. language toggle): capture scroll and
      // selection visuals first, then restore them without reloading the
      // molecule. A silent boot default (methane, never clicked) stays clean.
      var _menuScroll = null, _hadRowSel = false, _hadHdrSel = false;
      try {
        var _sc = document.querySelector(".menuNomeclature2Container") || document.getElementById("menuDrawer");
        _menuScroll = _sc ? _sc.scrollTop : null;
        _hadRowSel = !!document.querySelector(".menuLi.selectedLi");
        _hadHdrSel = !!document.querySelector(".crossMenuLi.selectedLi");
      } catch (eSc) { _menuScroll = null; }
      fInitNomeclatureMenu();
      try { if (typeof fRestoreMenuSelection === "function") fRestoreMenuSelection(_menuScroll, _hadRowSel, _hadHdrSel); } catch (eRs) { /* best-effort */ }
    }
  } catch (e) {}
  try { if (typeof fShowNameAnalysis === "function") fShowNameAnalysis(); } catch (e) {}
  try {
    // Drawer panels: skip while the author is typing inside (draft guard),
    // preserve open drawers across the rebuild.
    var inDrawer = false;
    try { inDrawer = !!(document.activeElement && document.activeElement.closest && document.activeElement.closest(".scenarioDrawer")); } catch (eD) {}
    if (!inDrawer && typeof fScenarioRenderList === "function") {
      var openIds = [];
      try {
        document.querySelectorAll(".scenarioDrawer.open").forEach(function (d) {
          var p = d.closest ? d.closest(".scenarioPanel") : null;
          var id = p && p.getAttribute ? p.getAttribute("data-scenario-id") : null;
          if (id) openIds.push(id);
        });
      } catch (eO) {}
      fScenarioRenderList();
      try {
        openIds.forEach(function (id) { if (typeof fScenarioOpenDrawer === "function") fScenarioOpenDrawer(id); });
      } catch (eR) {}
    }
  } catch (e) {}
  try { window.__mulerPaintedLang = eff; } catch (e2) {}
  try { if (typeof fMulerTranslateTips === "function") fMulerTranslateTips(document); } catch (e3) {}
}

// Value-based tooltip translation for lazily-rendered scenario/note chrome:
// any element whose data-tooltip exactly matches a Greek STRINGS value gets
// the English text, regardless of selectors. Runs once + on DOM mutations.
var __mulerTipObserver = null;
function fMulerGr2En() {
  var byGr = {};
  try {
    for (var k in MULER_STRINGS) byGr[MULER_STRINGS[k].gr] = MULER_STRINGS[k].en || MULER_STRINGS[k].gr;
  } catch (e) {}
  return byGr;
}
// Prefix + variable tail for tooltips/labels built at render time.
// EN branch never depends on the observer: strings are chosen at build.
function fMulerPre(grPre, enPre, tail) {
  try {
    if (typeof fMulerLang === "function" && fMulerLang() === "en") return enPre + fMulerTranslateTail(tail);
  } catch (e) {}
  return grPre + tail;
}
// 3D style menu labels, language-resolved at build (indices stay stable).
function fVisStyleLabels() {
  try {
    if (typeof fMulerLang === "function" && fMulerLang() === "en")
      return { ballnstick: fMulerT("visBall"), spacefill: fMulerT("visSpace"), sticks: fMulerT("visSticks") };
  } catch (e) {}
  return { ballnstick: "Σφαίρες και Ράβδοι", spacefill: "Χωροπληρωτικό", sticks: "Ράβδοι" };
}
function fMulerTranslateTail(tail) {
  var byGr = fMulerGr2En();
  var t = String(tail == null ? "" : tail);
  var key = t.trim();
  if (key && byGr[key]) return t.replace(key, byGr[key]);
  return t;
}
function fMulerApplyPrefix(el, attr) {
  try {
    var t = el.getAttribute(attr);
    if (!t) return;
    for (var i = 0; i < MULER_PREFIX_GR2EN.length; i++) {
      var gr = MULER_PREFIX_GR2EN[i][0], en = MULER_PREFIX_GR2EN[i][1];
      if (t === gr || t.indexOf(gr) === 0) {
        // leave already-English values alone; translate the variable tail too
        if (t.indexOf(en) !== 0) el.setAttribute(attr, en + fMulerTranslateTail(t.slice(gr.length)));
        break;
      }
    }
  } catch (e) {}
}
function fMulerTranslateTips(root) {
  try {
    if (fMulerLang() !== "en") return;
    var byGr = fMulerGr2En();
    var els = (root || document).querySelectorAll("[data-tooltip],[aria-label],[title]");
    for (var i = 0; i < els.length; i++) {
      var t = els[i].getAttribute("data-tooltip");
      if (t && byGr[t]) { if (els[i].getAttribute("data-tooltip") !== byGr[t]) els[i].setAttribute("data-tooltip", byGr[t]); }
      else if (t) fMulerApplyPrefix(els[i], "data-tooltip");
      var al = els[i].getAttribute("aria-label");
      if (al && byGr[al]) { if (els[i].getAttribute("aria-label") !== byGr[al]) els[i].setAttribute("aria-label", byGr[al]); }
      else if (al) fMulerApplyPrefix(els[i], "aria-label");
      var ti = els[i].getAttribute("title");
      if (ti && byGr[ti] && els[i].getAttribute("title") !== byGr[ti]) els[i].setAttribute("title", byGr[ti]);
    }
    // input placeholders (step title, note editor, HTML source)
    try {
      var phs = (root || document).querySelectorAll("[placeholder],[data-placeholder]");
      for (var p = 0; p < phs.length; p++) {
        var ph = phs[p].getAttribute("placeholder");
        if (ph && byGr[ph] && phs[p].getAttribute("placeholder") !== byGr[ph]) phs[p].setAttribute("placeholder", byGr[ph]);
        var dh = phs[p].getAttribute("data-placeholder");
        if (dh && byGr[dh] && phs[p].getAttribute("data-placeholder") !== byGr[dh]) phs[p].setAttribute("data-placeholder", byGr[dh]);
      }
    } catch (ePh) {}
    // dialog/bar/menu text nodes (labels carry inputs; match per text node)
    var sels = ["#scNoteImageTitle", ".scNoteImageHint", ".scNoteImageBtn", ".scNoteImageField",
      "#chainStepperBox .settingLabel", ".scTitleText", ".nameEmptyHint",
      "#viewerCol .panelTitle > span", "#nameAnalysis .panelTitle > span", "#nomeclature2Menu > .panelTitle",
      ".radioCheckContainer", ".crossMenuLi[data-group-key]", ".scConfirmNo", ".scConfirmYes",
      "#scenarioToast", ".nameStyleExpand",
      ".sshow", ".scTabText", ".scStepTitleLabel", ".scMolBadge",
      ".scNoteFontSize option", "#dropLabel", ".dropLi",
      "#hydrogensCheck", "#rotateCheck",
      "#nameAnalysisExplain .explainText", ".scNoteEditorTitle"];
    for (var s = 0; s < sels.length; s++) {
      var nodes;
      try { nodes = (root || document).querySelectorAll(sels[s]); } catch (e) { continue; }
      for (var j = 0; j < nodes.length; j++) {
        // rule-group headers keep Greek numerals ("3ος Κανόνας") -> EN "Rule 3" (navigation only)
        try {
          if (nodes[j].matches && nodes[j].matches(".crossMenuLi[data-group-key]")) {
            var full = String(nodes[j].textContent || "").trim();
            var rm = /^(\d+)\s*ος\s+Κανόνας$/i.exec(full);
            if (rm && !/^Rule\s+\d+$/i.test(full)) {
              var keep = [];
              for (var cn = 0; cn < nodes[j].childNodes.length; cn++) keep.push(nodes[j].childNodes[cn]);
              nodes[j].textContent = "";
              nodes[j].appendChild(document.createTextNode("Rule " + rm[1]));
              continue;
            }
          }
        } catch (eRule) {}
        var ch = nodes[j].childNodes;
        for (var c = 0; c < ch.length; c++) {
          if (ch[c].nodeType === 3) {
            var txt = ch[c].nodeValue;
            var key = String(txt || "").trim();
            if (key && byGr[key] && txt.indexOf(byGr[key]) < 0) ch[c].nodeValue = txt.replace(key, byGr[key]);
          }
        }
      }
    }
  } catch (e) {}
}
// Inline GR/EN template picker for generated didactic text (explanations,
// rule panel, theory). Greek default byte-identical; EN when ?lang=en.
function fTX(gr, en) {
  try { if (typeof fMulerLang === "function" && fMulerLang() === "en") return en; } catch (e) {}
  return gr;
}
function fMulerIsEN() {
  try { return typeof fMulerLang === "function" && fMulerLang() === "en"; } catch (e) { return false; }
}
// Static GR→EN pairs for rule/theory/table HTML (exact fragments, applied
// longest-first so full sentences win over their inner fragments).
// Chemistry tokens (formulas, prefixes, locants) are never listed: they stay.
var RULE_GR2EN = [
  ["Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα (χωρίς διακλαδώσεις) προκύπτει από τον συνδυασμό τριών συνθετικών.", "The name of an acyclic organic compound with a continuous straight carbon chain (no branches) comes from combining three components."],
  ["Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα προκύπτει από τον συνδυασμό τριών συνθετικών. Το 1<sup>ο</sup> Συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας. Το 2<sup>ο</sup> Συνθετικό δείχνει το είδος των δεσμών που υπάρχουν μεταξύ των ατόμων του άνθρακα. Το 3<sup>ο</sup> Συνθετικό δηλώνει την χημική τάξη που ανήκει.", "The name of an acyclic organic compound with a continuous straight carbon chain comes from combining three components. The 1st component indicates the number of carbon atoms in the carbon chain. The 2nd component indicates the kind of bonds between the carbon atoms. The 3rd component declares the chemical class."],
  ["Η αρίθμηση της ανθρακικής αλυσίδας αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα ή στον Πολλαπλό Δεσμό. Όταν υπάρχει Χαρακτηριστική Ομάδα και Πολλαπλός Δεσμός τότε η αρίθμηση αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα.", "Numbering of the carbon chain starts from the end closest to the characteristic group or the multiple bond. When both are present, numbering starts from the end closest to the characteristic group."],
  ["Η θέση της Χαρακτηριστικής Ομάδας ή του Πολλαπλού Δεσμού καθορίζεται με έναν αριθμό που γράφεται στην αρχή του ονόματος της ένωσης.", "The position of the characteristic group or the multiple bond is set by a number written at the start of the compound name."],
  ["Αλδεϋδες (-CH=O), καρβοξυλικά οξέα (-COOH) και νιτρίλια (-CN) είναι Χαρακτηριστικές Ομάδες που βρίσκονται υποχρεωτικά στην άκρη της ανθρακικής αλυσίδας και η αρίθμηση αρχίζει από τον άνθρακα της Χαρακτηριστικής Ομάδας.", "Aldehydes (-CH=O), carboxylic acids (-COOH) and nitriles (-CN) are characteristic groups always at the end of the carbon chain, and numbering starts from the characteristic-group carbon."],
  ["Αν στην οργανική ένωση έχουμε Χαρακτηριστική Ομάδα και Πολλαπλό Δεσμό τότε η θέση του Πολλαπλού Δεσμού καθορίζεται πριν από το βασικό όνομα και η αρίθμηση για την Χαρακτηριστική Ομάδα πριν από το 3<sup>o</sup> συνθετικό που δηλώνει το όνομα της Χαρακτηριστικής Ομάδας", "If the compound has both a characteristic group and a multiple bond, the multiple-bond position is set before the parent name and the characteristic-group numbering before the 3rd component naming the characteristic group"],
  ["Αν στην οργανική ένωση έχουμε διπλό δεσμό και τριπλό δεσμό που ισαπέχουν από τα δύο άκρα της ανθρακικής αλυσίδας, η αρίθμηση ξεκινά από το άκρο που είναι πλησιέστερα στον διπλό δεσμό.", "If a double and a triple bond are equidistant from the two chain ends, numbering starts from the end closest to the double bond."],
  ["Οι δευτερεύουσες ομάδες αλογόνα (-Χ) και νιτροομάδα (-ΝΟ<sub>2</sub>) δεν δίνουν κατάληξη στο όνομα της ένωσης. Δηλώνονται ως πρόθεμα πριν το βασικό όνομα της ένωσης με την ανάλογη αρίθμηση.", "Secondary halogen (-X) and nitro (-NO2) groups give no suffix to the compound name. They appear as a prefix before the parent name with the corresponding numbering."],
  ["Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες ίδιες Xαρακτηριστικές Ομάδες τότε πριν από το συνθετικό που δηλώνει την Χαρακτηριστική Ομάδα βάζουμε το πρόθεμα δι-, τρι-, κ.λ.π.", "When the compound has 2 or more identical characteristic groups, the prefixes di-, tri-, etc. go before the component naming the characteristic group."],
  ["Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες διαφορετικές Χαρακτηριστικές Ομάδες τότε η ισχυρότερη ομάδα δίνει την κατάληξη στο όνομα της ένωσης και καθορίζει την αρίθμηση της ανθρακικής αλυσίδας.", "When the compound has 2 or more different characteristic groups, the strongest group gives the name suffix and sets the chain numbering."],
  ["Το πρώτο συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας.", "The first component indicates the number of carbon atoms in the carbon chain."],
  ["Το δεύτερο συνθετικό δείχνει το είδος των δεσμών μεταξύ των ατόμων άνθρακα (βαθμός κορεσμού της ένωσης).", "The second component indicates the kind of bonds between the carbon atoms (degree of saturation)."],
  ["Το τρίτο συνθετικό δηλώνει την χημική τάξη που ανήκει η οργανική ένωση.", "The third component declares the chemical class of the organic compound."],
  ["Τα αλκύλια προκύπτουν τυπικά με αφαίρεση ενός ατόμου Η από αλκάνιο. Για το πρόθεμα της διακλάδωσης, το μεθύλιο γίνεται μεθυλο-, το αιθύλιο αιθυλο- κ.ο.κ. Η παύλα αριστερά στον τύπο δείχνει τον δεσμό με την κύρια αλυσίδα, όχι αρνητικό φορτίο.", "Alkyl groups formally derive from removing one H atom from an alkane. For the branch prefix, methyl becomes methyl-, ethyl becomes ethyl-, and so on. The dash on the left marks the bond to the main chain, not a negative charge."],
  ["Η αλκοξυομάδα έχει τη μορφή –O–R, όπου R είναι αλκύλιο, και συνδέεται με την κύρια αλυσίδα μέσω του Ο. Το πρόθεμα ονομάζει ολόκληρη την αλκοξυομάδα, μαζί με το Ο. Η παύλα αριστερά δείχνει δεσμό σύνδεσης και όχι αρνητικό φορτίο. Τα προποξυ- και βουτοξυ- του πίνακα αφορούν ευθύγραμμα αλκύλια, ενώ το ισοπροποξυ- διατηρεί τη σχολική ονομασία της εφαρμογής.", "An alkoxy group has the form –O–R, where R is an alkyl, and connects to the main chain through O. The prefix names the whole alkoxy group, including the O. The left dash marks a connecting bond, not a negative charge. The propoxy- and butoxy- rows cover straight-chain alkyls, while isopropoxy- keeps the school naming of the app."],
  ["Τα ισο-, sec- και tert- εμφανίζονται εδώ ως συνήθεις ονομασίες, μαζί με τις αντίστοιχες συστηματικές.", "iso-, sec- and tert- appear here as common names, alongside their systematic equivalents."],
  ["Ονόματα αλκυλίων και προθέματα", "Alkyl names and prefixes"],
  ["Ονόματα αλκοξυομάδων και προθέματα", "Alkoxy group names and prefixes"],
  ["Σειρά ισχύος Χαρακτηριστικών Ομάδων", "Characteristic group priority order"],
  ["Κανόνας συνθετικού ανθρακικής αλυσίδας", "Carbon chain component rule"],
  ["Κανόνας συνθετικού τύπου δεσμών", "Bond type component rule"],
  ["Κανόνας συνθετικού χημικής τάξης", "Chemical class component rule"],
  ["Άτομα Άνθρακα", "Carbon atoms"],
  ["1<sup>o</sup> Συνθετικό", "1st component"],
  ["2<sup>o</sup> Συνθετικό", "2nd component"],
  ["3<sup>o</sup> Συνθετικό", "3rd component"],
  ["Είδος Δεσμών", "Bond type"],
  ["Χημική Τάξη", "Chemical class"],
  ["Δομή / σύνδεση", "Structure / linkage"],
  ["Αλκύλιο / πρόθεμα", "Alkyl / prefix"],
  ["Αλκοξυομάδα / πρόθεμα", "Alkoxy group / prefix"],
  ["Απλοί δεσμοί", "Single bonds"],
  ["1 διπλός δεσμός", "1 double bond"],
  ["1 τριπλός δεσμός", "1 triple bond"],
  ["2 διπλοί δεσμοί", "2 double bonds"],
  ["3 διπλοί δεσμοί", "3 double bonds"],
  ["2 τριπλοί δεσμοί", "2 triple bonds"],
  ["1 διπλός + 1 τριπλός", "1 double + 1 triple"],
  ["Υδρογονάνθρακες R-H", "Hydrocarbons R-H"],
  ["Αλκυλαλογονίδια R-Χ", "Alkyl halides R-X"],
  ["Αλκοόλες R-OH", "Alcohols R-OH"],
  ["Καρβονυλικές Ενώσεις - Αλδεϋδες R-CH=O", "Carbonyl compounds - Aldehydes R-CH=O"],
  ["Καρβονυλικές Ενώσεις - Κετόνες R-C(=O)-R'", "Carbonyl compounds - Ketones R-C(=O)-R'"],
  ["Καρβοξυλικά οξέα R-COOH", "Carboxylic acids R-COOH"],
  ["Αιθέρες R-O-R'", "Ethers R-O-R'"],
  ["Εστέρες R-COO-R'", "Esters R-COO-R'"],
  ["Νιτροενώσεις R-NO<sub>2</sub>", "Nitro compounds R-NO2"],
  ["Νιτρίλια R-CN", "Nitriles R-CN"],
  [" -ΝΗ<sub>2</sub> ", "-NH<sub>2</sub>"],
  [" Μεθ- ", " Meth- "],
  [" Αιθ- ", " Eth- "],
  [" Προπ- ", " Prop- "],
  [" Βουτ- ", " But- "],
  [" Πεντ- ", " Pent- "],
  [" Εξ- ", " Hex- "],
  [" Επτ- ", " Hept- "],
  [" -αν- ", " -an- "],
  [" -εν- ", " -en- "],
  [" -ιν- ", " -yn- "],
  [" -διεν- ", " -dien- "],
  [" -τριεν- ", " -trien- "],
  [" -διιν- ", " -diyn- "],
  [" -ενιν- ", " -enyn- "],
  [" -ιο <br> αιθέρας ", " -e <br> ether "],
  [" -ιο ", " -e "],
  [" -όλη ", "-ol"],
  [" -άλη ", "-al"],
  [" -όνη ", "-one"],
  [" -ικό οξύ ", "-oic acid"],
  [" -νιτρίλιο ", "-nitrile"],
  [" -ικός … εστέρας ", "-anoate … ester"],
  ["Καρβοξυλομάδα", "Carboxyl group"],
  ["Εστερομάδα", "Ester group"],
  ["Κυανομάδα", "Cyano group"],
  ["Αλδεϋδομάδα", "Aldehyde group"],
  ["Κετονομάδα", "Keto group"],
  ["Υδροξυλομάδα", "Hydroxyl group"],
  ["Αμινοομάδα", "Amino group"],
  ["Μεθύλιο", "Methyl"],
  ["Αιθύλιο", "Ethyl"],
  ["Προπύλιο (n-)", "Propyl (n-)"],
  ["Ισοπροπύλιο", "Isopropyl"],
  ["Βουτύλιο (n-)", "Butyl (n-)"],
  ["Ισοβουτύλιο", "Isobutyl"],
  ["sec-Βουτύλιο", "sec-Butyl"],
  ["tert-Βουτύλιο", "tert-Butyl"],
  ["Μεθοξυομάδα", "Methoxy group"],
  ["Αιθοξυομάδα", "Ethoxy group"],
  ["Προποξυομάδα", "Propoxy group"],
  ["Ισοπροποξυομάδα", "Isopropoxy group"],
  ["Βουτοξυομάδα", "Butoxy group"]
];
try { RULE_GR2EN.sort(function (a, b) { return b[0].length - a[0].length; }); } catch (e) {}
// Translate static rule/theory/table HTML in EN mode; Greek untouched otherwise.
function fTranslateRuleHTML(html) {
  try {
    if (typeof fMulerLang === "function" && fMulerLang() !== "en") return html;
    var out = String(html == null ? "" : html);
    for (var i = 0; i < RULE_GR2EN.length; i++) {
      if (RULE_GR2EN[i][0] && out.indexOf(RULE_GR2EN[i][0]) >= 0) out = out.split(RULE_GR2EN[i][0]).join(RULE_GR2EN[i][1]);
    }
    return out;
  } catch (e) { return html; }
}
// "3ος Κανόνας" panel title → "Rule 3".
function fRuleTheoryTitleEN(n) {
  try { if (typeof fMulerLang === "function" && fMulerLang() === "en") return "Rule " + n; } catch (e) {}
  return n + "<sup>ος</sup> Κανόνας";
}
function fMulerTByGr(grText) {  // translate an exact Greek UI string to EN when lang=en; else return as-is
  try {
    if (typeof fMulerLang === "function" && fMulerLang() === "en" && typeof MULER_STRINGS === "object") {
      for (var k in MULER_STRINGS) { if (MULER_STRINGS[k].gr === grText) return MULER_STRINGS[k].en || grText; }
    }
  } catch (e) {}
  return grText;
}
function fMulerObserveTooltips() {
  try {
    fMulerTranslateTips(document);
    if (__mulerTipObserver) return;
    __mulerTipObserver = new MutationObserver(function () {
      // debounced: boot does thousands of DOM ops; scan at most ~4x/sec
      if (typeof window !== "undefined" && window.__mulerTipScheduled) return;
      try { window.__mulerTipScheduled = true; } catch (e) {}
      setTimeout(function () {
        try { window.__mulerTipScheduled = false; } catch (e) {}
        fMulerTranslateTips(document);
      }, 250);
    });
    __mulerTipObserver.observe(document.body, { attributes: true, attributeFilter: ["data-tooltip", "aria-label", "title", "placeholder", "data-placeholder"], childList: true, characterData: true, subtree: true });
  } catch (e) {}
}

// Full-chrome TTS: language-aware voice pick; Greek default preserved.
// Call fSpeakMuler(nameENorGR) from read/narrate buttons when lang=en.
function fPickEnglishVoice(voices) {
  var list = Array.isArray(voices) ? voices : [];
  var en = list.filter(function (v) { return v && typeof v.lang === "string" && v.lang.indexOf("en") === 0; });
  if (!en.length) return undefined;
  var female = /samantha|zira|google uk english female|female/i;
  return en.find(function (v) { return female.test(v.name); }) ||
    en.find(function (v) { return /US/i.test(v.lang); }) ||
    en[0];
}

function fSpeakMuler(text) {
  try { window.speechSynthesis.cancel(); } catch (e) {}
  var lang = "gr";
  try { lang = fMulerLang(); } catch (e) {}
  var clean = String(text || "").replace(/<[^>]*>/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return;
  var u = new SpeechSynthesisUtterance(clean);
  var voices = [];
  try { voices = window.speechSynthesis.getVoices(); } catch (e) {}
  if (lang === "en") {
    u.lang = "en-US"; u.rate = 0.9;
    var v = fPickEnglishVoice(voices);
    if (v) u.voice = v;
  } else {
    u.lang = "el-GR"; u.rate = 0.9;
    try {
      if (typeof fPickGreekVoice === "function") {
        var g = fPickGreekVoice(voices);
        if (g) u.voice = g;
      }
    } catch (e) {}
  }
  try { window.speechSynthesis.speak(u); } catch (e) {}
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", fApplyMulerLangPilot);
  document.addEventListener("DOMContentLoaded", fWireENTTS);
  document.addEventListener("DOMContentLoaded", fMulerWireToggle);
}

// Header EN/GR switch: explicit target language (clicking the active side
// is a no-op); preserves scenario/query state + selected molecule, reloads.
function fMulerToggleLang(target) {
  var to = "en";
  try {
    if (target === "en" || target === "gr") to = target;
    else to = (typeof fMulerLang === "function" && fMulerLang() === "gr") ? "en" : "gr";
  } catch (e) { to = "en"; }
  try {
    var cur = null;
    try { cur = (typeof fMulerLang === "function") ? fMulerLang() : null; } catch (eC) {}
    if (cur && cur === to) return;
  } catch (e) {}
  try { try { localStorage.setItem("mulerLang", to); } catch (eS) {} } catch (e) {}
  try {
    var u = new URL(window.location.href);
    u.searchParams.set("lang", to);
    // Keep the selected molecule across the reload (deep-linkable, too),
    // unless a scenario owns the selection.
    try {
      var hasSc = !!u.searchParams.get("scenario");
      var presenting = !!(typeof MuLERMoCScenario !== "undefined" && MuLERMoCScenario.present);
      // Carry ?mol= only for explicitly chosen molecules (row click, deep
      // link, scenario step) — never the silent methane boot default.
      var sel = null;
      try { sel = (window.__mulerUserPickedMol && typeof selectedMol !== "undefined") ? selectedMol : null; } catch (eS) { sel = null; }
      if (!hasSc && !presenting && sel && typeof nameExamples !== "undefined" && nameExamples[sel]) {
        u.searchParams.set("mol", sel);
      } else {
        u.searchParams.delete("mol");
      }
    } catch (eM) {}
    // Keep the menu grouping mode across the reload (non-default rides as
    // ?grouping=, default stays clean — same convention as ?mol=).
    try {
      var _gm = null;
      try { _gm = moleculeGroupingMode; } catch (eG) { _gm = null; }
      if (_gm === "chemclass" || _gm === "series" || _gm === "rule") u.searchParams.set("grouping", _gm);
      else u.searchParams.delete("grouping");
    } catch (eG2) {}
    window.location.href = u.toString();
    return;
  } catch (e) {}
  try {
    var h = String(window.location.href);
    if (/[?&]lang=(en|gr)\b/.test(h)) h = h.replace(/([?&]lang=)(en|gr)/, "$1" + to);
    else h = h + (h.indexOf("?") >= 0 ? "&" : "?") + "lang=" + to;
    // legacy path: same mol-carry rule as above, without URL API
    try {
      var _hasSc = /[?&]scenario=/.test(h);
      var _sel = null;
      try { _sel = (window.__mulerUserPickedMol && typeof selectedMol !== "undefined") ? selectedMol : null; } catch (eS2) { _sel = null; }
      var _ok = !_hasSc && _sel && typeof nameExamples !== "undefined" && nameExamples[_sel];
      h = h.replace(/[?&]mol=[^&]*/g, "");
      if (_ok) h += (h.indexOf("?") >= 0 ? "&" : "?") + "mol=" + encodeURIComponent(_sel);
      // Same grouping rule as above (legacy path, without URL API).
      try {
        var _gm2 = null;
        try { _gm2 = moleculeGroupingMode; } catch (eG3) { _gm2 = null; }
        h = h.replace(/[?&]grouping=[^&]*/g, "");
        if (_gm2 === "chemclass" || _gm2 === "series" || _gm2 === "rule") h += (h.indexOf("?") >= 0 ? "&" : "?") + "grouping=" + _gm2;
      } catch (eG4) {}
    } catch (eM2) {}
    window.location.href = h;
  } catch (e2) {}
}
function fMulerPaintToggle() {
  try {
    var cur = "gr";
    try { cur = (typeof fMulerLang === "function") ? fMulerLang() : "gr"; } catch (e) {}
    var opts = document.querySelectorAll("#langSwitch .langButtonClass");
    for (var i = 0; i < opts.length; i++) {
      var on = opts[i].getAttribute("data-lang") === cur;
      if (on) opts[i].classList.add("selected");
      else opts[i].classList.remove("selected");
      opts[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
    // legacy single-button hook (no longer rendered, kept harmless)
    var btn = document.getElementById("langToggle");
    if (btn) btn.setAttribute("aria-pressed", cur === "en" ? "true" : "false");
  } catch (e) {}
}
function fMulerWireToggle() {
  try {
    var opts = document.querySelectorAll("#langSwitch .langButtonClass");
    if (!opts || !opts.length) {
      var legacy = document.getElementById("langToggle");
      if (!legacy) return;
      fMulerPaintToggle();
      legacy.addEventListener("click", function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        fMulerToggleLang();
      });
      return;
    }
    fMulerPaintToggle();
    for (var i = 0; i < opts.length; i++) {
      (function (el) {
        el.addEventListener("click", function (ev) {
          if (ev && ev.preventDefault) ev.preventDefault();
          fMulerToggleLang(el.getAttribute("data-lang"));
        });
      })(opts[i]);
    }
  } catch (e) {}
}

// Wire EN narration: when lang=en, capture read/narrate clicks and speak
// the visible English name instead of the Greek TTS path. Greek default untouched.
function fWireENTTS() {
  try {
    document.addEventListener("click", function (ev) {
      var lang = "gr";
      try { lang = fMulerLang(); } catch (e) {}
      if (lang !== "en") return;
      var t = ev && ev.target && ev.target.closest ? ev.target.closest("#readNameBtn,#narrateAnalysisToggle") : null;
      if (!t) return;
      var txt = "";
      try {
        var boxes = document.querySelectorAll(".nameCompContainer .nameCompBox");
        if (boxes && boxes.length) {
          var parts = [];
          for (var i = 0; i < boxes.length; i++) {
            var s = (boxes[i].textContent || "").trim();
            if (s) parts.push(s);
          }
          txt = parts.join(" ");
        }
      } catch (e) {}
      if (!txt) {
        try {
          var el = document.querySelector(".nameCompContainer");
          txt = el ? el.textContent : "";
        } catch (e) {}
      }
      if (!txt) return;
      ev.preventDefault();
      ev.stopPropagation();
      fSpeakMuler(txt);
    }, true);
  } catch (e) {}
}
