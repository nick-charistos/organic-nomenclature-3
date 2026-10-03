// nom-teaching-35.js
// Teaching / implementation layer.
// Contains ruleExamples, menu setup, credit display, and all jQuery event handlers.
// Depends on: data_35.js (nameExamples), nom-core-35.js (analysis), nom-molview-35.js (viewer).

// ── ruleExamples ──────────────────────────────────────────────────────────

let ruleExamples = {
  rule0: [1, 3, 7, 11, 14, 4, 8, 9, 2, 5, 6, 10, 12, 13],
  rule1: [15, 16, 17, 18],
  rule2: [19, 20, 21, 22, 23, 55, 56, 57],
  rule3: [24, 25, 26, 27, 28],
  rule4: [29, 30, 31, 32, 33],
  rule5: [34, 35, 36, 37],
  rule6: [38, 39, 40, 41, 42, 58, 59],
  rule7: [43, 44, 45, 46, 47],
  rule8: [48, 49, 50, 51, 52, 53, 54],
};

let moleculeGroupingMode = "chemclass";

const homologousSeriesLabels = {
  alkanes: "Αλκάνια",
  alkenes: "Αλκένια",
  alkadienes: "Αλκαδιένια",
  alkynes: "Αλκίνια",
  enynes: "Αλκενίνια",
  halogen: "Αλκυλαλογονίδια",
  alcohol: "Αλκοόλες",
  ether: "Αιθέρες",
  aldehyde: "Αλδεΰδες",
  ketone: "Κετόνες",
  carboxylicAcid: "Καρβοξυλικά οξέα",
  ester: "Εστέρες",
  nitro: "Νιτροενώσεις",
  cyanide: "Νιτρίλια",
  hydroxyNitriles: "Υδροξυνιτρίλια",
  amine: "Αμίνες",
  aminoAcids: "Αμινοξέα",
  oxoCarboxylicAcids: "Οξοκαρβοξυλικά οξέα",
  hydroxyAcids: "Υδροξυοξέα",
  ketoAcids: "Κετοξέα",
};

const chemicalClassLabels = {
  hydrocarbons: "Υδρογονάνθρακες",
  alkylHalides: "Αλκυλαλογονίδια",
  alcohols: "Αλκοόλες",
  ethers: "Αιθέρες",
  carbonylCompounds: "Καρβονυλικές Ενώσεις",
  carboxylicAcids: "Καρβοξυλικά Οξέα",
  esters: "Εστέρες",
  nitriles: "Νιτρίλια",
  amines: "Αμίνες",
  nitro: "Νιτροενώσεις",
  unclassified: "Μη ταξινομημένα",
};

// ── fInitTheory ───────────────────────────────────────────────────────────

function fInitTheory() {
  let r0, r1, r2, r3, r4, r1Table, r2Table, r3Table, r4Table;
  r0 =
    "Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα (χωρίς διακλαδώσεις) προκύπτει από τον συνδυασμό τριών συνθετικών.";
  r1 =
    "Το πρώτο συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας.";
  r2 =
    "Το δεύτερο συνθετικό δείχνει το είδος των δεσμών μεταξύ των ατόμων άνθρακα (βαθμός κορεσμού της ένωσης).";
  r3 =
    "Το τρίτο συνθετικό δηλώνει την χημική τάξη που ανήκει η οργανική ένωση.";
  r4 = "";

  r1Table = `
   <div class='VFlex namingRuleTable rule1'>
        <div class='HFlex ruleRow'>
                <div class='ruleCase ruleTableTitle'> Άτομα Άνθρακα </div>
              <div class=' ruleName ruleTableTitle'> 1<sup>o</sup> Συνθετικό </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c1">
            <div class='ruleCase'>1 C</div>
            <div class='ruleName'> Μεθ- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c2">
            <div class='ruleCase'>2 C</div>
            <div class='ruleName'> Αιθ- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c3">
            <div class='ruleCase'>3 C</div>
            <div class='ruleName'> Προπ- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c4">
            <div class='ruleCase'>4 C</div>
            <div class='ruleName'> Βουτ- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c5">
            <div class='ruleCase'>5 C</div>
            <div class='ruleName'> Πεντ- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c6">
            <div class='ruleCase'>6 C</div>
            <div class='ruleName'> Εξ- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r1-c7">
            <div class='ruleCase'>7 C</div>
            <div class='ruleName'> Επτ- </div>
        </div>
    </div>
    `;

  r2Table = `
    <div class='VFlex namingRuleTable rule2'>
        <div class='HFlex ruleRow'>
                <div class='ruleCase ruleTableTitle'> Είδος Δεσμών </div>
              <div class=' ruleName ruleTableTitle'> 2<sup>o</sup> Συνθετικό </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-single">
            <div class='ruleCase'>Απλοί δεσμοί</div>
            <div class='ruleName'> -αν- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-double">
            <div class='ruleCase'> 1 διπλός δεσμός </div>
            <div class='ruleName'> -εν- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-triple">
            <div class='ruleCase'> 1 τριπλός δεσμός </div>
            <div class='ruleName'> -ιν- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-didouble">
            <div class='ruleCase'> 2 διπλοί δεσμοί </div>
            <div class='ruleName'> -διεν- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-tridouble">
            <div class='ruleCase'> 3 διπλοί δεσμοί </div>
            <div class='ruleName'> -τριεν- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-ditriple">
            <div class='ruleCase'> 2 τριπλοί δεσμοί </div>
            <div class='ruleName'> -διιν- </div>
        </div>
        <div class='HFlex ruleRow' data-row="r2-double-triple">
            <div class='ruleCase'> 1 διπλός + 1 τριπλός</div>
            <div class='ruleName'> -ενιν- </div>
        </div>
    </div>
    `;

  r3Table = `
    <div class='VFlex namingRuleTable rule3'>
        <div class='HFlex ruleRow'>
                <div class='ruleCase ruleTableTitle'> Χημική Τάξη </div>
              <div class=' ruleName ruleTableTitle'> 3<sup>o</sup> Συνθετικό </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-hydrocarbons">
            <div class='ruleCase'>Υδρογονάνθρακες R-H</div>
            <div class='ruleName'> -ιο </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-alkyl-halides">
            <div class='ruleCase'>Αλκυλαλογονίδια R-Χ</div>
            <div class='ruleName'> -ιο </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-alcohols">
            <div class='ruleCase'> Αλκοόλες R-OH </div>
            <div class='ruleName'> -όλη </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-aldehydes">
            <div class='ruleCase'> Καρβονυλικές Ενώσεις - Αλδεϋδες R-CH=O </div>
            <div class='ruleName'> -άλη </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-ketones">
            <div class='ruleCase'> Καρβονυλικές Ενώσεις - Κετόνες R-C(=O)-R' </div>
            <div class='ruleName'> -όνη </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-carboxylic-acids">
            <div class='ruleCase'> Καρβοξυλικά οξέα R-COOH</div>
            <div class='ruleName'> -ικό οξύ </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-ethers">
            <div class='ruleCase'> Αιθέρες R-O-R' </div>
            <div class='ruleName'> -ιο <br> αιθέρας </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-esters">
            <div class='ruleCase'> Εστέρες R-COO-R' </div>
            <div class='ruleName'> -ικός … εστέρας </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-nitro">
            <div class='ruleCase'>Νιτροενώσεις R-NO<sub>2</sub></div>
            <div class='ruleName'> -ιο </div>
        </div>
        <div class='HFlex ruleRow' data-row="r3-nitriles">
            <div class='ruleCase'> Νιτρίλια R-CN </div>
            <div class='ruleName'> -νιτρίλιο </div>
        </div>
    </div>
    `;
  // NOTE: the r3-amino-acids row stays omitted (it was commented out in v41).

  r4Table = `
    <div class='VFlex namingRuleTable rule4'>
        <div class='HFlex ruleRow' data-row="r4-carboxylic">
            <div class='ruleCase'><span class='orderNo'>1.</span> Καρβοξυλομάδα </div>
            <div class='ruleName'> -COOH </div>
        </div>
        <div class='HFlex ruleRow' data-row="r4-alkoxycarbonyl">
            <div class='ruleCase'><span class='orderNo'>2.</span> Εστερομάδα  </div>
            <div class='ruleName'> -COOR </div>
        </div>
        <div class='HFlex ruleRow' data-row="r4-cyano">
            <div class='ruleCase'><span class='orderNo'>3.</span> Κυανομάδα </div>
            <div class='ruleName'> -CN </div>
        </div>
        <div class='HFlex ruleRow' data-row="r4-aldehyde">
            <div class='ruleCase'><span class='orderNo'>4.</span> Αλδεϋδομάδα </div>
            <div class='ruleName'> -CH=O </div>
        </div>
        <div class='HFlex ruleRow' data-row="r4-keto">
            <div class='ruleCase'><span class='orderNo'>5.</span> Κετονομάδα </div>
            <div class='ruleName'> C-C(=O)-C </div>
        </div>
        <div class='HFlex ruleRow' data-row="r4-hydroxy">
            <div class='ruleCase'><span class='orderNo'>6.</span> Υδροξυλομάδα</div>
            <div class='ruleName'> -OH </div>
        </div>
        <div class='HFlex ruleRow' data-row="r4-amino">
            <div class='ruleCase'><span class='orderNo'>7.</span> Αμινοομάδα</div>
            <div class='ruleName'> -ΝΗ<sub>2</sub> </div>
        </div>
    </div>
    `;

  let rulesTheory_1_8 = [
    "Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα προκύπτει από τον συνδυασμό τριών συνθετικών. Το 1<sup>ο</sup> Συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας. Το 2<sup>ο</sup> Συνθετικό δείχνει το είδος των δεσμών που υπάρχουν μεταξύ των ατόμων του άνθρακα. Το 3<sup>ο</sup> Συνθετικό δηλώνει την χημική τάξη που ανήκει.",
    "Η αρίθμηση της ανθρακικής αλυσίδας αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα ή στον Πολλαπλό Δεσμό. Όταν υπάρχει Χαρακτηριστική Ομάδα και Πολλαπλός Δεσμός τότε η αρίθμηση αρχίζει από το άκρο που είναι πλησιέστερα στην Χαρακτηριστική Ομάδα.",
    "Η θέση της Χαρακτηριστικής Ομάδας ή του Πολλαπλού Δεσμού καθορίζεται με έναν αριθμό που γράφεται στην αρχή του ονόματος της ένωσης.",
    "Αλδεϋδες (-CH=O), καρβοξυλικά οξέα (-COOH) και νιτρίλια (-CN) είναι Χαρακτηριστικές Ομάδες που βρίσκονται υποχρεωτικά στην άκρη της ανθρακικής αλυσίδας και η αρίθμηση αρχίζει από τον άνθρακα της Χαρακτηριστικής Ομάδας.",
    "Αν στην οργανική ένωση έχουμε Χαρακτηριστική Ομάδα και Πολλαπλό Δεσμό τότε η θέση του Πολλαπλού Δεσμού καθορίζεται πριν από το βασικό όνομα και η αρίθμηση για την Χαρακτηριστική Ομάδα πριν από το 3<sup>o</sup> συνθετικό που δηλώνει το όνομα της Χαρακτηριστικής Ομάδας",
    "Αν στην οργανική ένωση έχουμε διπλό δεσμό και τριπλό δεσμό που ισαπέχουν από τα δύο άκρα της ανθρακικής αλυσίδας, η αρίθμηση ξεκινά από το άκρο που είναι πλησιέστερα στον διπλό δεσμό.",
    "Οι δευτερεύουσες ομάδες αλογόνα (-Χ) και νιτροομάδα (-ΝΟ<sub>2</sub>) δεν δίνουν κατάληξη στο όνομα της ένωσης. Δηλώνονται ως πρόθεμα πριν το βασικό όνομα της ένωσης με την ανάλογη αρίθμηση.",
    "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες ίδιες Xαρακτηριστικές Ομάδες τότε πριν από το συνθετικό που δηλώνει την Χαρακτηριστική Ομάδα βάζουμε το πρόθεμα δι-, τρι-, κ.λ.π.",
    "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες διαφορετικές Χαρακτηριστικές Ομάδες τότε η ισχυρότερη ομάδα δίνει την κατάληξη στο όνομα της ένωσης και καθορίζει την αρίθμηση της ανθρακικής αλυσίδας.",
  ];

  namingRules = {
    general: r0,
    rule1: r1,
    rule2: r2,
    rule3: r3,
    rule4: r4,
    table1: r1Table,
    table2: r2Table,
    table3: r3Table,
    table4: r4Table,
    rulesTheory_1_8: rulesTheory_1_8,
  };
}

// ── fShowRuleTheory ───────────────────────────────────────────────────────

function fShowRuleTheory() {
  window.speechSynthesis.cancel();
  let ruleTitle, ruleTheory;
  ruleTitle = `${selectedRule + 1}<sup>ος</sup> Κανόνας`;
  ruleTheory = `<div class='panelTitle ruleTheoryTitle open'><button class='ruleTheoryToggleBtn' data-tooltip='Εμφάνιση/Απόκρυψη'></button>${ruleTitle}<button id='narrateBtn' class='narrateBtn' data-tooltip='Ανάγνωση κανόνα'>${svgPlay}</button></div><div class='ruleText'>${namingRules.rulesTheory_1_8[selectedRule]}</div>`;
  $("#ruleTheory").html(ruleTheory);
}

function fUpdateRuleTheoryVisibility() {
  const showRuleTheory = moleculeGroupingMode === "rule";
  $("#ruleTheory").toggle(showRuleTheory);
  if (!showRuleTheory) {
    $("#ruleTheory").empty();
  }
}

// ── fNarrateRule ──────────────────────────────────────────────────────────

function fNarrateRule() {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    $("#narrateBtn").html(svgPlay);
    return;
  }
  const rawText = namingRules.rulesTheory_1_8[selectedRule];
  const plainText = rawText
    .replace(/<[^>]*>/g, "")
    .replace(/\s*\(-[^)]*\)/g, "")
    .replace(/3o/g, "τρίτο")
    .replace(/δι-,?\s*τρι-,?/g, "δί, τρί")
    .replace(/κ\.λ\.π\.?/g, "και τα λοιπά");
  const utterance = new SpeechSynthesisUtterance(plainText);
  utterance.lang = "el-GR";
  utterance.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const greekVoices = voices.filter((v) => v.lang.startsWith("el"));
  const femaleNames = /eleni|nefeli|maria|sofia|female/i;
  const maleNames = /stefanos|nikos|kostas|giorgos|male/i;
  const femaleVoice =
    greekVoices.find((v) => femaleNames.test(v.name)) ||
    greekVoices.find((v) => !maleNames.test(v.name)) ||
    greekVoices[0];
  if (femaleVoice) utterance.voice = femaleVoice;
  utterance.onstart = function () {
    $("#narrateBtn").html(svgStop);
  };
  utterance.onend = function () {
    $("#narrateBtn").html(svgPlay);
  };
  utterance.onerror = function () {
    $("#narrateBtn").html(svgPlay);
  };
  window.speechSynthesis.speak(utterance);
}

// ── fSortPropsByCarbonCount ─────────────────────────────────────────────────
// Ascending total-carbon order, stable on data-file order, unclassified last.
// Shared by series-mode groups and the flat "all molecules" list.
function fSortPropsByCarbonCount(props) {
  return props
    .map((prop, originalIndex) => ({
      prop,
      originalIndex,
      carbonCount: nameExamples[prop].classification?.carbonCount,
    }))
    .sort((left, right) => {
      const leftCount = left.carbonCount;
      const rightCount = right.carbonCount;
      if (leftCount == null && rightCount == null) {
        return left.originalIndex - right.originalIndex;
      }
      if (leftCount == null) return 1;
      if (rightCount == null) return -1;
      return leftCount - rightCount || left.originalIndex - right.originalIndex;
    })
    .map(({ prop }) => prop);
}

// ── fInitNomeclatureMenu ──────────────────────────────────────────────────

function fInitNomeclatureMenu() {
  const names = Object.keys(nameExamples);
  const groups = {};
  const groupLabels = {};

  if (moleculeGroupingMode === "rule") {
    Object.keys(ruleExamples).forEach((ruleKey, ruleIndex) => {
      const key = `rule${ruleIndex}`;
      groups[key] = ruleExamples[ruleKey]
        .map((index) => names[index - 1])
        .filter(Boolean);
      groupLabels[key] = `${ruleIndex + 1}<sup>ος</sup> Κανόνας`;
    });
  } else if (moleculeGroupingMode !== "all") {
    names.forEach((name) => {
      const classification = nameExamples[name].classification;
      const key =
        moleculeGroupingMode === "chemclass"
          ? classification?.chemicalClass || "unclassified"
          : classification?.seriesKey || "unclassified";
      if (!groups[key]) groups[key] = [];
      groups[key].push(name);
      groupLabels[key] =
        (moleculeGroupingMode === "chemclass"
          ? chemicalClassLabels[key]
          : homologousSeriesLabels[key]) ||
        classification?.taxonomy ||
        "Μη ταξινομημένα";
    });
  }

  if (moleculeGroupingMode === "series") {
    Object.keys(groups).forEach((groupKey) => {
      groups[groupKey] = fSortPropsByCarbonCount(groups[groupKey]);
    });
  }

  let myHTML = `<div class='panelTitle'> Παραδείγματα </div>
    <div class='groupingMode' role='group' aria-label='Ομαδοποίηση μορίων'>
    <div class='radioCheckContainer ${moleculeGroupingMode === "chemclass" ? "selectedRadio" : "unselectedRadio"}' data-grouping-mode='chemclass'>Χημικές Τάξεις<span class='radioCheck'></span></div>
    <div class='radioCheckContainer ${moleculeGroupingMode === "series" ? "selectedRadio" : "unselectedRadio"}' data-grouping-mode='series'>Ομόλογες Σειρές<span class='radioCheck'></span></div>
    <div class='radioCheckContainer ${moleculeGroupingMode === "rule" ? "selectedRadio" : "unselectedRadio"}' data-grouping-mode='rule'>Κανόνες Ονοματολογίας<span class='radioCheck'></span></div>
    <div class='radioCheckContainer ${moleculeGroupingMode === "all" ? "selectedRadio" : "unselectedRadio"}' data-grouping-mode='all'>Όλα τα μόρια<span class='radioCheck'></span></div>
    </div><div class='menuNomeclature2Container'>`;

  if (moleculeGroupingMode === "all") {
    let counter = 0;
    fSortPropsByCarbonCount(names).forEach((prop) => {
      let myMolFormula = nameExamples[prop].formula.replace(
        /(\d+)/g,
        "<sub>$1</sub>",
      );
      myMolFormula = myMolFormula.replace(
        /(['='])/g,
        '<span class="bondSymbol large">&#9552;</span>',
      );
      myMolFormula = myMolFormula.replace(
        /(['_'])/g,
        '<span class="bondSymbol">&#9776;</span>',
      );
      counter++;
      myHTML += `<div id='${prop}' class='menuLi'><span class='menuLiCounter' >${counter}.</span><span class='menuLiFormula'> ${myMolFormula}</span></div>`;
    });
  }

  const groupOrder =
    moleculeGroupingMode === "series"
      ? [...Object.keys(homologousSeriesLabels), "unclassified"]
      : moleculeGroupingMode === "chemclass"
        ? Object.keys(chemicalClassLabels)
      : Object.keys(groups);

  groupOrder.forEach((groupKey) => {
    if (!groups[groupKey] || !groups[groupKey].length) return;
    myHTML += `<div class='crossMenuLi' data-group-key='${groupKey}'> ${groupLabels[groupKey]}</div>
      <div class='exmplContainer closed'><div class='menuListContainer'>`;
    groups[groupKey].forEach((prop) => {
      let myMolFormula = nameExamples[prop].formula.replace(
        /(\d+)/g,
        "<sub>$1</sub>",
      );
      myMolFormula = myMolFormula.replace(
        /(['='])/g,
        '<span class="bondSymbol large">&#9552;</span>',
      );
      myMolFormula = myMolFormula.replace(
        /(['_'])/g,
        '<span class="bondSymbol">&#9776;</span>',
      );
      myHTML += `<div id='${prop}' class='menuLi'> ${myMolFormula}</div>`;
    });
    myHTML += `</div></div>`;
  });

  myHTML += `</div>`;
  $("#nomeclature2Menu").html(myHTML);
  fUpdateRuleTheoryVisibility();
}

// ── showRadio ─────────────────────────────────────────────────────────────

function showRadio(myLi) {
  // NOTE (dead code — showRadio is never called): the original concatenation
  // split rows 2-3 into discarded expressions, so only row 1 ever reached
  // radioHtml. Assembled here as one template with all three rows, as intended.
  let radioHtml = `
    <div class='radioMenuContainer' style='padding:0;margin:0; border-top:0;'> <div class='radioGroupContainer VFlex ' style='display:none'>
    <div class='radioNoneContainer selectedRadio'> 1<sup>o</sup> μέλος: ν = <span class='n'></span><span class='radioCheck'></span></div>
    <div class='radioNoneContainer unselectedRadio'> 2<sup>o</sup> μέλος: ν = <span class='n'></span><span class='radioCheck'></span> </div>
    <div class='radioNoneContainer unselectedRadio'> 3<sup>o</sup> μέλος: ν = <span class='n'></span><span class='radioCheck'></span> </div></div></div>`;

  $(myLi).after(radioHtml);

  updateRadioNumbers(selectedHomoIndex);

  $(".radioGroupContainer").slideDown(300);
}

// ── fCreateDropMenu ───────────────────────────────────────────────────────

function fCreateDropMenu(myItems) {
  let selectedLabel = myItems[0];
  let myHTML = `<div id='dropLabel' class=' closed' >${selectedLabel}</div>
  <div id='dropLiContainer' class='molvis closed' >`;
  for (let i = 0; i < myItems.length; i++) {
    myHTML += `<div id='dropLi${i}' class='dropLi'>${myItems[i]}</div>`;
  }
  myHTML += `</div>`;
  $("#dropMenu").html(myHTML);
}

// ── fShowCreditLibs ───────────────────────────────────────────────────────

function fShowCreditLibs() {
  let myCredits = `
  <div class='creditsContainer'>
    <div class=''>2D visualizations made with <strong>JSME</strong>: B. Bienfait and P. Ertl, J. Cheminform., 2013, 5, 24.</div>
    <div> | </div>
    <div class=''>3D visualizations made with <strong>JSmol</strong>: R. M. Hanson, J. Prilusky, Z. Renjian, T. Nakane and J. L. Sussman, Isr. J. Chem., 2013, 53, 207–216.</div>
  </div>
  `;

  myCredits = `
  <div class='creditsContainer'>
    <div class=''>Αναστασία Θεοφανίδου, Βασίλης Κουταλάς, <a href='https://nicharis.webpages.auth.gr/' target='_blank'> Νικόλας Χαριστός </a></div>
  </div><div class='creditsContainer'>
    <div class=''>ΠΜΣ <a href='https://molmod-edu.chem.auth.gr/' target='_blank'>Μοριακός Σχεδιασμός και Μοντελοποίηση - Χημική Εκπαίδευση</a></div>
    <div>|</div>
    <div class=''>Τμήμα Χημείας</div>
    <div>|</div>
    <div class=''>ΑΠΘ 2025-26</div>
  </div>
  `;
  $("#creditsUs").html(myCredits);
}

// ── getMolData ────────────────────────────────────────────────────────────

function getMolData() {
  let atomsCount = jsmeNomeclatureApplet.totalNumberOfAtoms();
  let bondsCount = jsmeNomeclatureApplet.totalNumberOfBonds();

  let str1 = `<div>Άτομα: ${atomsCount}, Δεσμοί: ${bondsCount}</div>`;

  for (let i = 1; i <= atomsCount; i++) {
    str1 += `<div class='crossMenuLi  atomNo'> Atom ${i}</div>`;
  }

  for (let i = 1; i <= bondsCount; i++) {
    str1 += `<div class='crossMenuLi bondNo'> Bond ${i}</div>`;
  }

  $("#debug").html(str1);
}

// ── $(document).ready ─────────────────────────────────────────────────────

$(document).ready(function () {
  fInitData();
  fInitNamingProps();
  fInitTheory();
  fShowCreditLibs();

  $(document).on("click", "#narrateBtn", fNarrateRule);

  $(document).on("click", "#ruleTheory .ruleTheoryToggleBtn", function () {
    const $title = $(this).closest(".ruleTheoryTitle");
    $title.toggleClass("open closed");
    $title.next(".ruleText").slideToggle(200);
  });

  $(document).on("click", "#narrateAnalysisToggle", function () {
    narrateAnalysisFlag = !narrateAnalysisFlag;
    $(this)
      .html(narrateAnalysisFlag ? svgSpeaker : svgMute)
      .attr(
        "data-tooltip",
        narrateAnalysisFlag ? "Αφήγηση ενεργή" : "Αφήγηση ανενεργή",
      );
    // if (!narrateAnalysisFlag) {
    //   window.speechSynthesis.cancel();
    //   $("#readNameBtn").prop("disabled", true);
    // } else {
    //   $("#readNameBtn").prop("disabled", false);
    // }
  });

  $(document).on("click", "#readNameBtn", function () {
    if (!selectedMol || !nameExamples[selectedMol]) return;
    const text = currentMolName.replace(/<[^>]*>/g, "");
    fSpeakGreek(text);
  });

  // Ensure read button remains enabled/visible even if other scripts attempt to disable it
  $("#readNameBtn").prop("disabled", false);

  $(document).on("click", "#nameStyleBoxToggle", function () {
    nameBoxFlag = !nameBoxFlag;
    if (nameBoxFlag) {
      $(".nameCompBox ").removeClass("unboxed").addClass("boxed");
      $(this).html(svgNameBox).attr("data-tooltip", "Πλαίσια συνθετικών");
    } else {
      $(".nameCompBox ").removeClass("boxed").addClass("unboxed");
      $(this)
        .html(svgNameBoxOff)
        .attr("data-tooltip", "Χωρίς πλαίσια συνθετικών");
    }
  });

  $(document).on("click", "#nameStyleCrossToggle", function () {
    nameCrossFlag = !nameCrossFlag;
    if (nameCrossFlag) {
      $(".nameCompPlus ").removeClass("hide");
      $(this).html(svgNameCross).attr("data-tooltip", "Διαχωρισμένα συνθετικά");
    } else {
      $(".nameCompPlus ").addClass("hide");
      $(this).html(svgNameCrossOff).attr("data-tooltip", "Ενωμένα συνθετικά");
    }
  });

  // ---- Drop menu: init early so upstream errors don't prevent it loading ----
  let dropState = false;
  let selectedLabel;

  let menuItmes = ["Σφαίρες και Ράβδοι", "Χωροπληρωτικό", "Ράβδοι"];
  fCreateDropMenu(menuItmes);

  $("html").on("click", function () {
    $("#dropLiContainer").slideUp(100);
    $("#dropLabel").removeClass("open").addClass("closed");
    dropState = false;
  });

  $(document).on("click", "#dropLabel", function (event) {
    event.stopPropagation();
    dropState = !dropState;
    $("#dropLiContainer").slideToggle(100);
    if (dropState) {
      $(this).removeClass("closed").addClass("open");
    } else {
      $(this).removeClass("open").addClass("closed");
    }
  });

  $(document).on("click", ".dropLi", function () {
    selectedLabel = $(this).html();
    $("#dropLabel").html(selectedLabel);
    $("#dropLiContainer").slideUp(100);
    dropState = false;
    $("#dropLabel").removeClass("open").addClass("closed");
  });

  $(document).on("click", ".molvis .dropLi", function () {
    const myID = $(this).attr("id");
    switch (myID) {
      case "dropLi0":
        vis3D = "ballnstick";
        break;
      case "dropLi1":
        vis3D = "spacefill";
        break;
      case "dropLi2":
        vis3D = "sticks";
        break;
    }
    fSetMolVis3D(vis3D);
  });
  // ---- End drop menu early init ----

  // Add data (2D structure files ) to nameExamples object

  $("#zigzagCheck")
    .addClass("disabledCheck")
    .removeClass("selectedCheck")
    .addClass("unselectedCheck");

  $("#radio2DMode").on("click", ".mode2DOption", function () {
    if ($(this).hasClass("disabledRadio")) {
      return;
    }
    let currMode2DNo = $(this)
      .parent()
      .children(".radioCheckContainer")
      .index(this);
    switch (currMode2DNo) {
      case 0:
        mode2D = "condensed";
        modeSuffix = "";
        $("#zigzagCheck")
          .addClass("disabledCheck")
          .removeClass("selectedCheck")
          .addClass("unselectedCheck");
        break;
      case 1:
        mode2D = "expanded";
        modeSuffix = "_E";
        $("#zigzagCheck")
          .addClass("disabledCheck")
          .removeClass("selectedCheck")
          .addClass("unselectedCheck");
        break;
      case 2:
        mode2D = "diagramatic";
        modeSuffix = "_diagr2D";
        $("#zigzagCheck")
          .removeClass("disabledCheck")
          .removeClass("selectedCheck")
          .addClass("unselectedCheck");
        break;
    }

    fUpdateChainModeButton();
    if (!selectedMol || !nameExamples[selectedMol]) {
      return;
    }

    fLoadMol2D();
    currNumberEl = 0;
    fShowNameAnalysis();
  });

  $("#zigzagCheck").on("click", function () {
    if ($(this).hasClass("disabledCheck")) {
      return;
    }
    // Generic .checkBoxContainer handler fires after this and toggles the class,
    // so read the CURRENT class to determine what state we are moving TO.
    if ($(this).hasClass("unselectedCheck")) {
      mode2D = "condensedZigZag";
    } else {
      mode2D = "diagramatic";
    }
    modeSuffix = "_diagr2D";
    fUpdateChainModeButton();
    if (!selectedMol || !nameExamples[selectedMol]) {
      return;
    }
    fLoadMol2D();
    currNumberEl = 0;
    fShowNameAnalysis();
  });

  $("#radioChainMode").on("click", ".radioCheckContainer", function () {
    if ($(this).hasClass("disabledRadio")) {
      return;
    }
    const idx = $(this).parent().children(".radioCheckContainer").index(this);
    mainChainMode = idx === 1 ? "algorithmic" : "data";

    if (!selectedMol || !nameExamples[selectedMol]) {
      return;
    }

    fClearHighlights();
    fLoadMol2D();
    currNumberEl = 0;
    fShowNameAnalysis();
  });

  // Ether IUPAC/COMMON naming toggle (rendered in the name panel for ethers only).
  $(document).on("click", "#radioEtherNaming .etherNamingRadio", function () {
    if ($(this).hasClass("disabledRadio")) {
      return;
    }
    etherNamingMode = $(this).attr("data-naming-mode") === "common" ? "common" : "iupac";
    fUpdateEtherNamingButton();

    if (!selectedMol || !nameExamples[selectedMol]) {
      return;
    }

    nameAnalysisMode = "none";
    fClearHighlights();
    fUpdateSVG();
    currNumberEl = 0;
    fShowNameAnalysis();
  });

  $("#originalJSME").on("click", ".checkBoxContainer", function () {
    const enableOriginal = $("#originalJSMECheck").hasClass("unselectedCheck");
    if (enableOriginal) {
      $("#jsmeNomeclatureORGNL").addClass("hide");
      // $("#jsmeNomeclatureORGNL").removeClass("hide");
    } else {
      $("#jsmeNomeclatureORGNL").removeClass("hide");
      // $("#jsmeNomeclatureORGNL").addClass("hide");
    }
  });

  $("#viewFinalJSMESetting").on("click", ".checkBoxContainer", function () {
    const enableFinalJSME = $("#finalJSMECheck").hasClass("unselectedCheck");
    if (enableFinalJSME) {
      $("#jsmeNomeclatureSVG").slideToggle(200);
      // $("#jsmeNomeclatureSVG").addClass("hide");
      $("#radio2DMode").addClass("hide");
    } else {
      $("#jsmeNomeclatureSVG").slideToggle(200);
      // $("#jsmeNomeclatureSVG").removeClass("hide");
      $("#radio2DMode").removeClass("hide");
    }
  });

  $("#viewJSmolSetting").on("click", ".checkBoxContainer", function () {
    const enableJSmol = $("#viewJSmolCheck").hasClass("unselectedCheck");
    if (enableJSmol) {
      $("#nomeclature3D").slideToggle(200);
      // $("#nomeclature3D").addClass("hide");
      $("#controls3D").addClass("hide");
    } else {
      $("#nomeclature3D").slideToggle(200, function () {
        // if (window.jmolAppletNomeclature)
        Jmol.script(jmolAppletNomeclature, "refresh");
      });
      // $("#nomeclature3D").removeClass("hide");
      $("#controls3D").removeClass("hide");
      // Jmol.script(jmolAppletNomeclature, "refresh");
    }
  });

  /////////// Export PNG /////////////

  /////////// Export PNG /////////////

  ///////////////  Name Analysis /////////////////

  $(document).on("click", ".nameCompBox", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const lockScroll = () => window.scrollTo(scrollX, scrollY);
    window.addEventListener("scroll", lockScroll);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        window.removeEventListener("scroll", lockScroll),
      ),
    );
    fClearHighlights();
    fUpdateSVG();
    if ($(this).hasClass("selected")) {
      nameAnalysisMode = "none";
      $(".nameCompBox").removeClass("selected");
      fClearHighlights();
      fUpdateSVG();
      fExplainNameComp();
    } else {
      $(".nameCompBox").removeClass("selected");
      $(this).addClass("selected");

      switch ($(this).attr("id")) {
        case "comp0":
          nameAnalysisMode = "compNumber1";
          break;
        case "comp1":
          nameAnalysisMode = " compSecondSub1";
          break;
        case "comp2":
          nameAnalysisMode = "compNumber2";
          break;
        case "comp3":
          nameAnalysisMode = " compSecondSub2";
          break;
        case "comp4":
          nameAnalysisMode = "compBondPos";
          break;
        case "comp5":
          nameAnalysisMode = "compCarbonsCount";
          break;
        case "comp6":
          nameAnalysisMode = "compBondType";
          break;
        case "comp7":
          nameAnalysisMode = "compEndNumber";
          break;
        case "comp8":
          nameAnalysisMode = "compBondType2";
          break;
        case "comp9":
          nameAnalysisMode = "compSuffix";
          break;
        case "comp10":
          nameAnalysisMode =
            nameExamples[selectedMol]?.classification?.chemicalClass === "esters"
              ? "esterAlkyl"
              : "commonAlkyl1";
          break;
        case "comp11":
          nameAnalysisMode =
            nameExamples[selectedMol]?.classification?.chemicalClass === "esters"
              ? "esterEster"
              : "commonAlkyl2";
          break;
        case "comp12":
          nameAnalysisMode = "commonEther";
          break;
        default:
          nameAnalysisMode = "none";
          numberingFlag = false;
          break;
      }

      fExplainNameComp();
      if (narrateAnalysisFlag) {
        const explainText = $("#nameAnalysisExplain")
          .text()
          .replace(/\bC\b/g, "");
        fSpeakGreek(explainText);
      }
    }
  });

  $(document).on("click", "#ruleTitle", function () {
    $("#ruleContainer").slideToggle();
    ruleFlag = !ruleFlag;
    if (ruleFlag) {
      $("#ruleTitle").addClass("open");
      $("#ruleTitle").removeClass("closed");
    } else {
      $("#ruleTitle").addClass("closed");
      $("#ruleTitle").removeClass("open");
    }
  });

  /// Menu funcionality: SELECT MOLECULE
  $(document).on("click", ".menuLi", function () {
    selectedMol = $(this).attr("id");

    $(".menuLi").removeClass("selectedLi");
    $(this).addClass("selectedLi");

    fSelectMol();
  });

  /////////////// MENU ///////////////

  $(document).on(
    "click",
    ".menuNomeclature2Container .crossMenuLi",
    function () {
      // Toggle shut: clicking the open group closes it again.
      if (
        $(this).hasClass("selectedLi") &&
        $(this).next(".exmplContainer").hasClass("open")
      ) {
        fDeselectMol();
        $(this).removeClass("selectedLi");
        $(this).next(".exmplContainer").slideUp();
        $(this).next(".exmplContainer").removeClass("open").addClass("closed");
        // Rule mode: closing the group clears its theory (mirrors molecule deselect).
        if (moleculeGroupingMode === "rule") {
          selectedRule = undefined;
          window.speechSynthesis.cancel();
          $("#ruleTheory").empty();
        }
        return;
      }

      fDeselectMol();

      $(".crossMenuLi").removeClass("selectedLi");
      $(this).addClass("selectedLi");

      $(".exmplContainer.open").slideUp();
      $(this).next(".exmplContainer").slideDown();

      $(".exmplContainer").removeClass("open");
      $(this).next(".exmplContainer").removeClass("closed");
      $(this).next(".exmplContainer").addClass("open");

      if (moleculeGroupingMode === "rule") {
        selectedRule = $(this).parent().children(".crossMenuLi").index(this);
        fShowRuleTheory();
      }
    },
  );

  $(document).on("click", ".groupingMode [data-grouping-mode]", function () {
    const selectedMode = $(this).data("grouping-mode");
    if (selectedMode === moleculeGroupingMode) return;
    const previousMol = selectedMol;
    moleculeGroupingMode = selectedMode;
    fInitNomeclatureMenu();

    let $targetMol = $();
    if (previousMol) {
      $targetMol = $(".menuLi").filter(function () {
        return this.id === previousMol;
      }).first();
      if (!$targetMol.length) {
        $targetMol = $(".menuLi").first();
      }
    }

    if ($targetMol.length) {
      // Flat ("all") mode has no group headers — select the molecule directly.
      const $hdr = $targetMol.closest(".exmplContainer").prev(".crossMenuLi");
      if ($hdr.length) $hdr.trigger("click");
      $targetMol.trigger("click");
    }
  });

  //////////////////////////////////////////////////////////

  $("#atomSymbolsCheck").on("click", function () {
    atomSymbols3DFlag = !atomSymbols3DFlag;
    showAtomSymbols3D();
  });

  $("#hydrogensCheck").on("click", function () {
    hydrogens3DFlag = !hydrogens3DFlag;
    showHydrogens3D();
  });

  $("#rotateCheck").on("click", function () {
    rotateFlag = !rotateFlag;
    rotate3D();
  });

  svgAtomColors2DFlag = true
  // $("#svgAtomColorCheck").removeClass("selectedCheck").addClass("unselectedCheck");
  $("#jsmeNomeclatureSVG").removeClass("svgAtomsColorized");

  atomColorMode2D = "atom";
  localStorage.removeItem("atomColorMode2D");

  $("#atomColorMode .atomColorModeRadio")
    .removeClass("selectedRadio")
    .addClass("unselectedRadio");
  $(`#atomColorMode .atomColorModeRadio[data-color-mode='${atomColorMode2D}']`)
    .removeClass("unselectedRadio")
    .addClass("selectedRadio");

  $("#svgAtomColorCheck").on("click", function () {
    svgAtomColors2DFlag = !svgAtomColors2DFlag;
    $("#jsmeNomeclatureSVG").toggleClass(
      "svgAtomsColorized",
      svgAtomColors2DFlag,
    );
    fUpdateSVG();
    if (numberingFlag) {
      currNumberEl = 0;
      fShowNumbering(0);
    }
  });

  $("#atomColorMode").on("click", ".atomColorModeRadio", function () {
    const selectedMode = $(this).attr("data-color-mode");
    if (!selectedMode || selectedMode === atomColorMode2D) {
      return;
    }

    atomColorMode2D = selectedMode;
    localStorage.setItem("atomColorMode2D", atomColorMode2D);

    fUpdateSVG();
    if (numberingFlag) {
      currNumberEl = 0;
      fShowNumbering(0);
    }
  });

  $(".checkBoxContainer").on("click", function () {
    if ($(this).hasClass("unselectedCheck")) {
      $(this).removeClass("unselectedCheck");
      $(this).addClass("selectedCheck");
    } else {
      $(this).removeClass("selectedCheck");
      $(this).addClass("unselectedCheck");
    }
  });

  $(".radioCheckContainer").on("click", function () {
    if ($(this).hasClass("unselectedRadio")) {
      let group = $(this).parent().children(".radioCheckContainer");
      group.removeClass("selectedRadio").addClass("unselectedRadio");
      $(this).removeClass("unselectedRadio").addClass("selectedRadio");
    }
  });

  ////////////// DEBUG //////////////////

  let selectedAtom, selectedBond;

  $("#debug").on("click", ".atomNo", function () {
    $(".atomNo").removeClass("selectedLi");
    $(this).addClass("selectedLi");
    jsmeNomeclatureApplet.resetAtomColors(0);
    selectedAtom = $(this).parent().children(".atomNo").index(this) + 1;
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
    fUpdateSVG();
  });

  $("#debug").on("click", ".bondNo", function () {
    $(".bondNo").removeClass("selectedLi");
    $(this).addClass("selectedLi");
    jsmeNomeclatureApplet.resetBondColors(0);
    selectedBond = $(this).parent().children(".bondNo").index(this) + 1;
    jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
    fUpdateSVG();
    if (mode2D == "condensed") {
      fAddHydrogens2SVG();
    }
  });

  $("#debug").on("mouseover", ".atomNo", function () {
    jsmeNomeclatureApplet.resetAtomColors(0);
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
    let myAtom = $(this).parent().children(".atomNo").index(this) + 1;
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, myAtom + ",2");
    fUpdateSVG();
  });

  $("#debug").on("mouseover", ".bondNo", function () {
    jsmeNomeclatureApplet.resetBondColors(0);
    jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
    let myBond = $(this).parent().children(".bondNo").index(this) + 1;
    jsmeNomeclatureApplet.setBondBackgroundColors(0, myBond + ",2");
    fUpdateSVG();
  });

  $("#debug").on("mouseleave", ".atomNo", function () {
    jsmeNomeclatureApplet.resetAtomColors(0);
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
    fUpdateSVG();
  });

  $("#debug").on("mouseleave", ".bondNo", function () {
    jsmeNomeclatureApplet.resetBondColors(0);
    jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
    fUpdateSVG();
  });
});

