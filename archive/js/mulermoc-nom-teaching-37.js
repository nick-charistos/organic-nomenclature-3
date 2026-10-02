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

// ── fInitTheory ───────────────────────────────────────────────────────────

function fInitTheory() {
  r0 =
    "Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα (χωρίς διακλαδώσεις) προκύπτει από τον συνδυασμό τριών συνθετικών.";
  r1 =
    "Το πρώτο συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας.";
  r2 =
    "Το δεύτερο συνθετικό δείχνει το είδος των δεσμών μεταξύ των ατόμων άνθρακα (βαθμός κορεσμού της ένωσης).";
  r3 =
    "Το τρίτο συνθετικό δηλώνει την χημική τάξη που ανήκει η οργανική ένωση.";
  r4 = "";

  r1Table =
    "   <div class='VFlex namingRuleTable rule1'>" +
    "        <div class='HFlex ruleRow'>" +
    "                <div class='ruleCase ruleTableTitle'> Άτομα Άνθρακα </div>" +
    "              <div class=' ruleName ruleTableTitle'> 1<sup>o</sup> Συνθετικό </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>1 C</div>" +
    "            <div class='ruleName'> Μεθ- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>2 C</div>" +
    "            <div class='ruleName'> Αιθ- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>3 C</div>" +
    "            <div class='ruleName'> Προπ- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>4 C</div>" +
    "            <div class='ruleName'> Βουτ- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>5 C</div>" +
    "            <div class='ruleName'> Πεντ- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>6 C</div>" +
    "            <div class='ruleName'> Εξ- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>7 C</div>" +
    "            <div class='ruleName'> Επτ- </div>" +
    "        </div>" +
    "    </div>";

  r2Table =
    "    <div class='VFlex namingRuleTable rule2'>" +
    "        <div class='HFlex ruleRow'>" +
    "                <div class='ruleCase ruleTableTitle'> Είδος Δεσμών </div>" +
    "              <div class=' ruleName ruleTableTitle'> 2<sup>o</sup> Συνθετικό </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>Απλοί δεσμοί</div>" +
    "            <div class='ruleName'> -αν- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> 1 διπλός δεσμός </div>" +
    "            <div class='ruleName'> -εν- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> 1 τριπλός δεσμός </div>" +
    "            <div class='ruleName'> -ιν- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> 2 διπλοί δεσμοί </div>" +
    "            <div class='ruleName'> -διεν- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> 3 διπλοί δεσμοί </div>" +
    "            <div class='ruleName'> -τριεν- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> 2 τριπλοί δεσμοί </div>" +
    "            <div class='ruleName'> -διιν- </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> 1 διπλός + 1 τριπλός</div>" +
    "            <div class='ruleName'> -ενιν- </div>" +
    "        </div>" +
    "    </div>";

  r3Table =
    "    <div class='VFlex namingRuleTable rule3'>" +
    "        <div class='HFlex ruleRow'>" +
    "                <div class='ruleCase ruleTableTitle'> Χημική Τάξη </div>" +
    "              <div class=' ruleName ruleTableTitle'> 3<sup>o</sup> Συνθετικό </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'>Υδρογονάνθρακας</div>" +
    "            <div class='ruleName'> -ιο </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> Αλκοόλη (-ΟΗ) </div>" +
    "            <div class='ruleName'> -όλη </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> Αλδεϋδη (-CH=O) </div>" +
    "            <div class='ruleName'> -άλη </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> Κετόνη (C-C(=O)-C) </div>" +
    "            <div class='ruleName'> -όνη </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> Καρβοξυλικό οξύ (-COOH)</div>" +
    "            <div class='ruleName'> -ικό οξύ </div>" +
    "        </div>" +
    "        <div class='HFlex ruleRow'>" +
    "            <div class='ruleCase'> Νιτρίλιο (-CN) </div>" +
    "            <div class='ruleName'> -νιτρίλιο </div>" +
    "        </div>" +
    "    </div>";

  r4Table = `
    <div class='VFlex namingRuleTable rule4'>
        <div class='HFlex ruleRow'>
            <div class='ruleCase'><span class='orderNo'>1.</span> Καρβοξύλιο </div>
            <div class='ruleName'> -COOH </div>
        </div>
        <div class='HFlex ruleRow'>
            <div class='ruleCase'><span class='orderNo'>2.</span> Κυανομάδα </div>
            <div class='ruleName'> -CN </div>
        </div>
        <div class='HFlex ruleRow'>
            <div class='ruleCase'><span class='orderNo'>3.</span> Αλδεϋδομάδα </div>
            <div class='ruleName'> -CH=O </div>
        </div>
        <div class='HFlex ruleRow'>
            <div class='ruleCase'><span class='orderNo'>4.</span> Κετονομάδα </div>
            <div class='ruleName'> C-C(=O)-C </div>
        </div>
        <div class='HFlex ruleRow'>
            <div class='ruleCase'><span class='orderNo'>5.</span> Υδροξύλιο</div>
            <div class='ruleName'> -OH </div>
        </div>
        <div class='HFlex ruleRow'>
            <div class='ruleCase'><span class='orderNo'>6.</span> Αμινοομάδα</div>
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
    "Όταν η οργανική ένωση διαθέτει 2 ή περισσότερες ίδιες Xαρακτηριστικές Ομάδες τότε πριν από το 3<sup>o</sup> συνθετικό βάζουμε το πρόθεμα δι-, τρι-, κ.λ.π.",
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
  ruleTitle = selectedRule + 1 + "<sup>ος</sup> Κανόνας";
  ruleTheory =
    "<div class='panelTitle ruleTheoryTitle open'>" +
    "<button class='ruleTheoryToggleBtn' data-tooltip='Εμφάνιση/Απόκρυψη'></button>" +
    ruleTitle +
    "<button id='narrateBtn' class='narrateBtn' data-tooltip='Ανάγνωση κανόνα'>" +
    svgPlay +
    "</button></div><div class='ruleText'>" +
    namingRules.rulesTheory_1_8[selectedRule] +
    "</div>";
  $("#ruleTheory").html(ruleTheory);
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

// ── fInitNomeclatureMenu ──────────────────────────────────────────────────

function fInitNomeclatureMenu() {
  let myHTML =
    "<div class='panelTitle' style=''> Παραδείγματα </div><div class='menuNomeclature2Container' style=''> ";
  let rule = 0;

  let myNamesArr = Object.getOwnPropertyNames(nameExamples);
  tmpTXT = "";
  for (j = 0; j < myNamesArr.length; j++) {
    tmpTXT += j + 1 + ": " + myNamesArr[j] + ", ";
  }

  for (let currRule in ruleExamples) {
    rule += 1;
    myRuleName = rule + "<sup>ος</sup> Κανόνας";
    myHTML += "<div  class='crossMenuLi'> " + myRuleName + "</div>";

    currExamples = ruleExamples[currRule];

    myHTML +=
      "<div class='exmplContainer closed' ><div class='menuListContainer'>";
    for (tmpExmpl = 0; tmpExmpl < currExamples.length; tmpExmpl++) {
      let prop = myNamesArr[currExamples[tmpExmpl] - 1];

      let myMolFormula = nameExamples[prop].formula;
      //format formula
      myMolFormula = myMolFormula.replace(/(\d+)/g, "<sub>$1</sub>"); // sub numbers

      myMolFormula = myMolFormula.replace(
        /(['='])/g,
        '<span class="bondSymbol large" >&#9552;</span>',
      );
      // double bond
      myMolFormula = myMolFormula.replace(
        /(['_'])/g,
        '<span class="bondSymbol " style="" >&#9776;</span>',
      ); // triple bond

      //add menu item
      myHTML +=
        "<div id='" + prop + "' class='menuLi'> " + myMolFormula + "</div>";
    }
    myHTML += "</div></div>";
  }
  myHTML += "</div>";
  $("#nomeclature2Menu").html(myHTML);
}

// ── showRadio ─────────────────────────────────────────────────────────────

function showRadio(myLi) {
  let radioHtml =
    "<div class='radioMenuContainer' style='padding:0;margin:0; border-top:0;'> <div class='radioGroupContainer VFlex ' style='display:none'>" +
    "    <div class='radioNoneContainer selectedRadio'> 1<sup>o</sup> μέλος: ν = <span class='n'>" +
    "</span><span";
  "            class='radioCheck'></span></div>" +
    "    <div class='radioNoneContainer unselectedRadio'> 2<sup>o</sup> μέλος: ν = <span class='n'>" +
    "</span><span";
  "            class='radioCheck'></span> </div>" +
    "    <div class='radioNoneContainer unselectedRadio'> 3<sup>o</sup> μέλος: ν = <span class='n'>" +
    "</span><span";
  "            class='radioCheck'></span> </div>" + "</div></div>";

  $(myLi).after(radioHtml);

  updateRadioNumbers(selectedHomoIndex);

  $(".radioGroupContainer").slideDown(300);
}

// ── fCreateDropMenu ───────────────────────────────────────────────────────

function fCreateDropMenu(myItems) {
  selectedLabel = myItems[0];
  myHTML = "<div id='dropLabel' class=' closed' >" + selectedLabel + "</div>";
  myHTML += "<div id='dropLiContainer' class='molvis closed' >";
  for (i = 0; i < myItems.length; i++) {
    myHTML +=
      "<div id='dropLi" + i + "' class='dropLi'>" + myItems[i] + "</div>";
  }
  myHTML += "</div>";
  $("#dropMenu").html(myHTML);
}

// ── fShowCreditLibs ───────────────────────────────────────────────────────

function fShowCreditLibs() {
  myCredits = "<div class='creditsContainer'>";
  myCredits +=
    "<div class=''>2D visualizations made with <strong>JSME</strong>: B. Bienfait and P. Ertl, J. Cheminform., 2013, 5, 24.</div>";
  myCredits += "<div> | </div>";
  myCredits +=
    "<div class=''>3D visualizations made with <strong>JSmol</strong>: R. M. Hanson, J. Prilusky, Z. Renjian, T. Nakane and J. L. Sussman, Isr. J. Chem., 2013, 53, 207–216.</div> ";
  myCredits += "</div>";

  myCredits = "";
  myCredits += "<div class='creditsContainer'>";
  myCredits +=
    "<div class=''>Αναστασία Θεοφανίδου, Βασίλης Κουταλάς, <a href='https://nicharis.webpages.auth.gr/' target='_blank'> Νικόλας Χαριστός </a></div>";
  myCredits += "<div>|</div>";
  myCredits += "<div class=''>Τμήμα Χημείας</div>";
  myCredits += "<div>|</div>";
  myCredits += "<div class=''>ΑΠΘ 2025-26</div>";
  myCredits += "</div>";
  $("#creditsUs").html(myCredits);
}

// ── getMolData ────────────────────────────────────────────────────────────

function getMolData() {
  let atomsCount = jsmeNomeclatureApplet.totalNumberOfAtoms();
  let bondsCount = jsmeNomeclatureApplet.totalNumberOfBonds();

  str1 = "<div>Άτομα: " + atomsCount + ", Δεσμοί: " + bondsCount + "</div>";

  for (i = 1; i <= atomsCount; i++) {
    str1 += "<div class='crossMenuLi  atomNo'> Atom " + i + "</div>";
  }

  for (i = 1; i <= bondsCount; i++) {
    str1 += "<div class='crossMenuLi bondNo'> Bond " + i + "</div>";
  }

  $("#debug").html(str1);
}

// ── $(document).ready ─────────────────────────────────────────────────────

$(document).ready(function () {
  fInitData();
  fInitNamingProps();
  fInitNomeclatureMenu();
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
    if (!narrateAnalysisFlag) {
      window.speechSynthesis.cancel();
      $("#readNameBtn").prop("disabled", true);
    } else {
      $("#readNameBtn").prop("disabled", false);
    }
  });

  $(document).on("click", "#readNameBtn", function () {
    if (!narrateAnalysisFlag || !selectedMol || !nameExamples[selectedMol])
      return;
    const text = currentMolName.replace(/<[^>]*>/g, "");
    fSpeakGreek(text);
  });

  // ---- Drop menu: init early so upstream errors don't prevent it loading ----
  let dropState = false;
  let selectedLabel;

  menuItmes = ["Σφαίρες και Ράβδοι", "Χωροπληρωτικό", "Ράβδοι"];
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

  $("#radio2DMode").on("click", ".radioCheckContainer", function () {
    currMode2DNo = $(this)
      .parent()
      .children(".radioCheckContainer")
      .index(this);
    switch (currMode2DNo) {
      case 0:
        mode2D = "condensed";
        modeSuffix = "";
        $("#zigzagCheck")
          .hide()
          .removeClass("selectedCheck")
          .addClass("unselectedCheck");
        break;
      case 1:
        mode2D = "expanded";
        modeSuffix = "_E";
        $("#zigzagCheck")
          .hide()
          .removeClass("selectedCheck")
          .addClass("unselectedCheck");
        break;
      case 2:
        mode2D = "diagramatic";
        modeSuffix = "_diagr2D";
        $("#zigzagCheck")
          .show()
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
    if ($(this).hasClass("disabledRadio")) { return; }
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
  $(".menuLi").on("click", function () {
    selectedMol = $(this).attr("id");

    $(".menuLi").removeClass("selectedLi");
    $(this).addClass("selectedLi");

    fSelectMol();
  });

  /////////////// MENU ///////////////

  $(".menuNomeclature2Container .crossMenuLi").on("click", function () {
    if ($(this).hasClass("selectedLi")) {
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

    selectedRule = $(this).parent().children(".crossMenuLi").index(this);

    fShowRuleTheory();
  });

  // Select first rule by default on load
  $(".menuNomeclature2Container .crossMenuLi").first().trigger("click");

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

  $("#svgHydrogenColorCheck").on("click", function () {
    svgHydrogensColorDimmed = !svgHydrogensColorDimmed;
    $("#jsmeNomeclatureSVG").toggleClass("svgHydrogensDimmed", svgHydrogensColorDimmed);
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
      let group = $(this)
        .closest(".radioGroupContainer")
        .find(".radioCheckContainer");
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
    myAtom = $(this).parent().children(".atomNo").index(this) + 1;
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, myAtom + ",2");
    fUpdateSVG();
  });

  $("#debug").on("mouseover", ".bondNo", function () {
    jsmeNomeclatureApplet.resetBondColors(0);
    jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
    myBond = $(this).parent().children(".bondNo").index(this) + 1;
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

