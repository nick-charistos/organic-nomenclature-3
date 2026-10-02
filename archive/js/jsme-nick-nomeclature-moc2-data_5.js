
let ruleExamples = {

    rule1: [1, 2, 3, 4],
    rule2: [5, 6, 7, 8, 9, 41, 42, 43],
    rule3: [10, 11, 12, 13, 14],
    rule4: [15, 16, 17, 18, 19],
    rule5: [20, 21, 22, 23],
    rule6: [24, 25, 26, 27, 28, 44, 45],
    rule7: [29, 30, 31, 32, 33],
    rule8: [34, 35, 36, 37, 38, 39, 40],

}

let nameExamples = {

    butene_1: {
        name: "1-βουτένιο",
        nameComponents: ["1", "βουτ", "έν", "ιο"],
        formula: "CH3CH2CH=CH2",
        class: "Υδρογονάνθρακες",
        mainChain: [4, 3, 2, 1],
        multibonds: [3],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [3],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [3, 4],
        mainChain3D: [4, 3, 1, 2],
        mainChain_diagr: [4, 3, 2, 1],
        multibonds_diagr: [3],
        moveto: "moveto 0.0 { -60 -844 -532 175.79} 100.0 0.0 0.0 {0.20107500000000003 -0.06646666666666665 -0.022833333333333344} 4.05245318942261 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propanol_1: {
        name: "1-προπανόλη",
        nameComponents: ["1", "προπ", "αν", "όλη"],
        formula: "CH3CH2CH2ΟΗ",
        class: "Αλκοόλες",
        mainChain: [3, 2, 1],
        multibonds: [],
        functionalGroup: [4],
        functionalBonds: [],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [4],
        functionalBonds_E: [],
        functionalGroup3D: [1, 12],
        multibonds3D: [],
        mainChain3D: [3, 2, 4],
        mainChain_diagr: [3, 2, 1],
        functionalGroup_diagr: [4],
        moveto: "moveto 0.0 { -994 -74 -81 87.87} 100.0 0.0 0.0 {-0.38661666666666666 0.01949999999999999 0.06695833333333334} 3.9330918092815965 {0 0 0} 0 0 0 3.0 0.0 0.0; ",
    },

    penten_4_ol_2: {
        name: "4-πεντεν-2-όλη",
        nameComponents: ["4", "πεντεν", "2", "όλη"],
        formula: "CH3CH(OH)CH2CH=CH2",
        class: "Αλκοόλες",
        mainChain: [1, 2, 3, 4, 5],
        multibonds: [4],
        functionalGroup: [6],
        functionalBonds: [],
        mainChain_E: [1, 2, 3, 4, 5],
        multibonds_E: [4],
        functionalGroup_E: [6],
        functionalBonds_E: [],
        functionalGroup3D: [1, 14],
        multibonds3D: [5, 6],
        mainChain3D: [4, 2, 3, 5, 6],
        mainChain_diagr: [1, 2, 4, 5, 6],
        functionalGroup_diagr: [3],
        multibonds_diagr: [5],
        moveto: "moveto 0.0 { -94 -306 -947 175.58} 100.0 0.0 0.0 {0.13626250000000004 -0.19146250000000004 -0.043137499999999995} 4.888075063189299 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    penten_1_one_3: {
        name: "1-πεντεν-3-όνη",
        nameComponents: ["1", "πεντεν", "3", "όνη"],
        formula: "CH3CH2COCH=CH2",
        class: "Κετόνες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [4],
        functionalGroup: [2, 3, 4, 6],
        functionalBonds: [2, 3, 5],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [4],
        functionalGroup_E: [2, 3, 4, 6],
        functionalBonds_E: [2, 3, 5],
        functionalGroup3D: [1, 2, 4, 5],
        multibonds3D: [5, 6],
        mainChain3D: [6, 5, 4, 2, 3],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [2, 3, 4, 6],
        functionalBonds_diagr: [2, 3, 5],
        multibonds_diagr: [4],
        moveto: "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.26767857142857143 0.23657857142857147 -0.0016714285714285744} 4.883273360596189 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    butanol_1: {
        name: "1-βουτανόλη",
        nameComponents: ["1", "βουτ", "αν", "όλη"],
        formula: "CH3CH2CH2CH2OH",
        class: "Αλκοόλες",
        mainChain: [4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [5],
        functionalBonds: [],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [5],
        functionalBonds_E: [],
        functionalGroup3D: [1, 15],
        multibonds3D: [],
        mainChain3D: [4, 2, 3, 5],
        mainChain_diagr: [4, 3, 2, 1],
        functionalGroup_diagr: [5],
        moveto: "moveto 0.0 { -6 8 1000 178.64} 100.0 0.0 0.0 {0.3884133333333333 -0.00525999999999999 -0.05360666666666667} 4.529751947519232 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    pentanone_2: {
        name: "2-πεντανόνη",
        nameComponents: ["2", "πεντ", "αν", "όνη"],
        formula: "CH3CH2CH2COCH3",
        class: "Κετόνες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [5, 4, 3, 6],
        functionalBonds: [3, 4, 5],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [5, 4, 3, 6],
        functionalBonds_E: [3, 4, 5],
        functionalGroup3D: [6, 5, 3, 1],
        multibonds3D: [6, 5, 3, 1],
        mainChain3D: [6, 5, 3, 2, 4],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [5, 4, 3, 6],
        functionalBonds_diagr: [3, 4, 5],
        moveto: "moveto 0.0 { -35 -92 -995 7.42} 100.0 0.0 0.0 {-0.3290937500000001 0.3106 0.0017499999999999998} 4.706893784752978 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    butene_2: {
        name: "2-βουτένιο",
        nameComponents: ["2", "βουτ", "έν", "ιο"],
        formula: "CH3CH=CHCH3",
        class: "Υδρογονάνθρακες",
        mainChain: [4, 3, 2, 1],
        multibonds: [2],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [2],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [2, 1],
        mainChain3D: [4, 2, 1, 3],
        mainChain_diagr: [4, 3, 2, 1],
        multibonds_diagr: [2],
        moveto: "moveto 0.0 { -484 -349 -802 8.47} 100.0 0.0 0.0 {-0.3290937500000001 0.3106 0.0017499999999999998} 4.706893784752978 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    pentadiene_1_3: {
        name: "1,3-πενταδιένιο",
        nameComponents: ["1,3", "πεντ(α)", "διέν", "ιο"],
        formula: "CH3CH=CHCH=CH2",
        class: "Υδρογονάνθρακες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [2, 4],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [2, 4],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [[1, 3], [4, 5]],
        mainChain3D: [5, 4, 3, 1, 2],
        mainChain_diagr: [5, 4, 3, 2, 1],
        multibonds_diagr: [2, 4],
        moveto: "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.20437692307692298 0.05618461538461538 0.00004615384615384192} 4.79304076501412 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propyne: {
        name: "προπίνιο",
        nameComponents: ["προπ", "ιν", "ιο"],
        formula: "CH3C_CH",
        class: "Υδρογονάνθρακες",
        mainChain: [3, 2, 1],
        multibonds: [2],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [3, 2, 1],
        multibonds_E: [2],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [2, 3],
        mainChain3D: [3, 2, 1],
        mainChain_diagr: [3, 2, 1],
        multibonds_diagr: [2],
        moveto: "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {0.0873 -0.0002 0.0001} 3.4654000750419343 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propanal: {
        name: "προπανάλη",
        nameComponents: ["προπ", "αν", "άλη"],
        formula: "CH3CH2CH=O",
        class: "Αλδεϋδες",
        mainChain: [3, 2, 1],
        multibonds: [],
        functionalGroup: [3, 4],
        functionalBonds: [3],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [3, 4],
        functionalBonds_E: [3],
        functionalGroup3D: [4, 1],
        multibonds3D: [],
        mainChain3D: [4, 2, 3],
        mainChain_diagr: [3, 2, 1],
        functionalGroup_diagr: [3, 4],
        functionalBonds_diagr: [3],
        moveto: "moveto 0.0 { -234 -972 -6 176.29} 100.0 0.0 0.0 {0.54952 0.11701 -0.0012599999999999972} 3.735341191078292 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    butanoic_acid: {
        name: "βουτανικό οξύ",
        nameComponents: ["βουτ", "αν", "ικό οξύ"],
        formula: "CH3CH2CH2COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [4, 5, 6],
        functionalBonds: [4, 5],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [4, 5, 6],
        functionalBonds_E: [4, 5],
        functionalGroup3D: [6, 2, 1, 14],
        multibonds3D: [],
        mainChain3D: [6, 4, 3, 5],
        mainChain_diagr: [4, 3, 2, 1],
        functionalGroup_diagr: [4, 5, 6],
        functionalBonds_diagr: [4, 5],
        moveto: "moveto 0.0 { 823 140 551 11.37} 100.0 0.0 0.0 {-0.6947142857142857 -0.1373714285714286 0.0004714285714285643} 4.884675116960927 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propanenitrile: {
        name: "προπανονιτρίλιο",
        nameComponents: ["προπ", "αν(ο)", "νιτρίλιο"],
        formula: "CH3CH2CΝ",
        class: "Νιτρίλια",
        mainChain: [3, 2, 1],
        multibonds: [],
        functionalGroup: [3, 4],
        functionalBonds: [3],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [3, 4],
        functionalBonds_E: [3],
        functionalGroup3D: [1, 4],
        multibonds3D: [],
        mainChain3D: [4, 2, 3],
        mainChain_diagr: [3, 2, 1],
        functionalGroup_diagr: [3, 4],
        functionalBonds_diagr: [3],
        moveto: "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.8523555555555555 -0.020800000000000003 0.000044444444444427215} 4.4752938541461 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    pentanoic_acid: {
        name: "πεντανικό οξύ",
        nameComponents: ["πεντ", "αν", "ικό οξύ"],
        formula: "CH3CH2CH2CH2COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [5, 6, 7],
        functionalBonds: [5, 6],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [5, 6, 7],
        functionalBonds_E: [5, 6],
        functionalGroup3D: [7, 2, 1, 17],
        multibonds3D: [],
        mainChain3D: [7, 5, 3, 4, 6],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [5, 6, 7],
        functionalBonds_diagr: [5, 6],
        moveto: "moveto 0.0 { -7 17 1000 175.72} 100.0 0.0 0.0 {0.7673823529411764 -0.10584117647058826 -0.0010941176470588218} 5.541346185192858 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    pentanal: {
        name: "πεντανάλη",
        nameComponents: ["πεντ", "αν", "άλη"],
        formula: "CH3CH2CH2CH2CH=O",
        class: "Αλδεύδες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [5, 6],
        functionalBonds: [5],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [5, 6, 7],
        functionalBonds_E: [5, 6],
        functionalGroup3D: [6, 1, 16],
        multibonds3D: [],
        mainChain3D: [6, 4, 2, 3, 5],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [5, 6],
        functionalBonds_diagr: [5],
        moveto: "moveto 0.0 { -996 94 -5 179.86} 100.0 0.0 0.0 {-0.61283125 -0.13466250000000002 0.00013750000000000242} 4.826256094278101 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    butene_3_ol_2: {
        name: "3-βουτεν-2-όλη",
        nameComponents: ["3", "βουτ", "εν", "2", "όλη"],
        formula: "CH2=CHCH(OH)CH3",
        class: "Αλκοόλες",
        mainChain: [4, 3, 2, 1],
        multibonds: [1],
        functionalGroup: [5],
        functionalBonds: [],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [1],
        functionalGroup_E: [5],
        functionalBonds_E: [],
        functionalGroup3D: [1, 11],
        multibonds3D: [4, 5],
        mainChain3D: [3, 2, 4, 5],
        mainChain_diagr: [5, 3, 2, 1],
        multibonds_diagr: [1],
        functionalGroup_diagr: [4],
        moveto: "moveto 0.0 { 9 368 930 150.98} 100.0 0.0 0.0 {-0.08393846153846152 -0.24908461538461535 0.061176923076923066} 4.280578988777057 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    penten_2_ol_1: {
        name: "2-πεντεν-1-όλη",
        nameComponents: ["2", "πεντ", "εν", "1", "όλη"],
        formula: "CH3CH2CH=CHCH2OH",
        class: "Αλκοόλες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [3],
        functionalGroup: [6],
        functionalBonds: [],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [3],
        functionalGroup_E: [6],
        functionalBonds_E: [],
        functionalGroup3D: [1, 16],
        multibonds3D: [3, 5],
        mainChain3D: [6, 5, 3, 2, 4],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [6],
        multibonds_diagr: [3],
        moveto: "moveto 0.0 { -63 518 853 172.36} 100.0 0.0 0.0 {0.2935125000000001 -0.004893749999999988 0.02916875000000003} 5.059175863435337 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    pentyn_4_one_2: {
        name: "4-πεντιν-2-όνη",
        nameComponents: ["4", "πεντ", "ιν", "2", "όνη"],
        formula: "HC_CCH2COCH3",
        class: "Κετόνες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [1],
        functionalGroup: [3, 4, 5, 6],
        functionalBonds: [3, 4, 5],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [1],
        functionalGroup_E: [3, 4, 5, 6],
        functionalBonds_E: [3, 4, 5],
        functionalGroup3D: [5, 3, 2, 1],
        multibonds3D: [6, 5],
        mainChain3D: [2, 3, 5, 6, 4],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [3, 4, 5, 6],
        functionalBonds_diagr: [3, 4, 5],
        multibonds_diagr: [2],
        moveto: "moveto 0.0 { -408 -846 -344 178.29} 86.96 0.0 0.0 {-0.32399999999999995 -0.40674166666666667 0.00017500000000000848} 4.601720696521621 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propenoic_acid: {
        name: "προπενικό οξύ",
        nameComponents: ["προπ", "εν", "ικό οξύ"],
        formula: "CH2=CHCΟΟΗ",
        class: "Καρβοξυλικά οξέα",
        mainChain: [3, 2, 1],
        multibonds: [1],
        functionalGroup: [3, 4, 5],
        functionalBonds: [3, 4],
        mainChain_E: [3, 2, 1],
        multibonds_E: [1],
        functionalGroup_E: [3, 4, 5],
        functionalBonds_E: [3, 4],
        functionalGroup3D: [4, 2, 1, 9],
        multibonds3D: [3, 5],
        mainChain3D: [4, 3, 5],
        mainChain_diagr: [3, 2, 1],
        multibonds_diagr: [1],
        functionalGroup_diagr: [3, 4, 5],
        functionalBonds_diagr: [3, 4],
        moveto: "moveto 0.0 { 25 -999 -32 179.92} 100.0 0.0 0.0 {0.36175555555555555 -0.15610000000000007 -0.00006666666666666667} 3.996410987871135 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propynal: {
        name: "προπινάλη",
        nameComponents: ["προπ", "ιν", "άλη"],
        formula: "CH_CCH=O",
        class: "Αλδεϋδες",
        mainChain: [3, 2, 1],
        multibonds: [1],
        functionalGroup: [3, 4],
        functionalBonds: [3],
        mainChain_E: [3, 2, 1],
        multibonds_E: [1],
        functionalGroup_E: [3, 4, 6],
        functionalBonds_E: [3, 5],
        functionalGroup3D: [2, 1, 5],
        multibonds3D: [3, 4],
        mainChain3D: [2, 3, 4],
        mainChain_diagr: [3, 2, 1],
        multibonds_diagr: [1],
        functionalGroup_diagr: [3, 4],
        functionalBonds_diagr: [3],
        moveto: "moveto 0.0 { -125 992 33 176.85} 100.0 0.0 0.0 {0.30560000000000004 -0.18216666666666664 0.00008333333333333334} 3.791606078230683 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    penten_3_yne_1: {
        name: "3-πεντεν-1-ίνιο",
        nameComponents: ["3", "πεντ", "εν", "1", "ίν", "ιο"],
        formula: "CH_CCH=CHCH3",
        class: "Υδρογονάνθρακες",
        mainChain: [1, 2, 3, 4, 5],
        multibonds: [1, 3],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [1, 2, 3, 4, 5],
        multibonds_E: [1, 3],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [[2, 3], [5, 4]],
        mainChain3D: [5, 4, 3, 2, 1],
        mainChain_diagr: [1, 2, 3, 4, 5],
        multibonds_diagr: [1, 3],
        moveto: "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {0 0 0} 4.69067850854243 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    hexen_1_yne_4: {
        name: "1-εξεν-4-ίνιο",
        nameComponents: ["1", "εξ", "εν", "4", "ίν", "ιο"],
        formula: "CH3C_CCH2CH=CH2",
        class: "Υδρογονάνθρακας",
        mainChain: [6, 5, 4, 3, 2, 1],
        multibonds: [2, 5],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [6, 5, 4, 3, 2, 1],
        multibonds_E: [2, 5],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [[5, 2], [6, 3]],
        mainChain3D: [5, 2, 1, 3, 6, 4],
        mainChain_diagr: [6, 5, 4, 3, 2, 1],
        multibonds_diagr: [2, 5],
        moveto: "moveto 0.0 { 995 -17 95 71.5} 100.0 0.0 0.0 {-0.025399999999999992 0.08172857142857143 -0.013678571428571444} 5.021484686572104 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    buten_1_yne_3: {
        name: "1-βουτεν-3-ίνιο",
        nameComponents: ["1", "βουτ", "εν", "3", "ιν", "ίο"],
        formula: "CH_CCH=CH2",
        class: "Υδρογονάνθρακες",
        mainChain: [4, 3, 2, 1],
        multibonds: [1, 3],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [1, 3],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [[1, 2], [3, 4]],
        mainChain3D: [2, 1, 3, 4],
        mainChain_diagr: [4, 3, 2, 1],
        multibonds_diagr: [1, 3],
        moveto: "moveto 0.0 { -112 -991 -68 174.76} 100.0 0.0 0.0 {-0.30090000000000006 0.059224999999999986 0.00009999999999999999} 4.3545985799503875 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    hexen_2_yne_4: {
        name: "2-εξεν-4-ίνιο",
        nameComponents: ["2", "εξ", "εν", "4", "'ιν", "ιο"],
        formula: "CH3C_CCH=CHCH3",
        class: "Υδρογονάνθρακες",
        mainChain: [6, 5, 4, 3, 2, 1],
        multibonds: [2, 4],
        functionalGroup: [],
        functionalBonds: [],
        mainChain_E: [6, 5, 4, 3, 2, 1],
        multibonds_E: [2, 4],
        functionalGroup_E: [],
        functionalBonds_E: [],
        functionalGroup3D: [],
        multibonds3D: [[6, 5], [3, 1]],
        mainChain3D: [2, 1, 3, 5, 6, 4],
        mainChain_diagr: [6, 5, 4, 3, 2, 1],
        multibonds_diagr: [2, 4],
        moveto: "moveto 0.0 { 254 60 -965 13.45} 100.0 0.0 0.0 {0.16382142857142856 -0.08611428571428571 -0.00005714285714287464} 5.344100830590377 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    chlorobutane_1: {
        name: "1-χλωροβουτάνιο",
        nameComponents: ["1", "χλωρο", "βουτ", "άν", "ιο"],
        formula: "CH3CH2CH2CH2Cl",
        class: "Υδρογονάνθρακες",
        mainChain: [4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [5],
        functionalBonds: [],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [5],
        functionalBonds_E: [],
        functionalGroup3D: [1],
        multibonds3D: [],
        mainChain3D: [4, 2, 3, 5],
        mainChain_diagr: [4, 3, 2, 1],
        functionalGroup_diagr: [5],
        moveto: "moveto 0.0 { 748 92 -657 5.43} 132.25 0.0 0.0 {-0.6320928571428572 0.07022142857142856 -0.0014999999999999853} 5.321491144115054 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    bromopropane_2: {
        name: "2-βρωμοπροπάνιο",
        nameComponents: ["2", "βρωμο", "προπ", "άν", "ιο"],
        formula: "CH3CH(Br)CH3",
        class: "Υδρογονάνθρακες",
        mainChain: [1, 2, 3],
        multibonds: [],
        functionalGroup: [4],
        functionalBonds: [],
        mainChain_E: [1, 2, 3],
        multibonds_E: [],
        functionalGroup_E: [4],
        functionalBonds_E: [],
        functionalGroup3D: [1],
        multibonds3D: [],
        mainChain3D: [4, 2, 3],
        mainChain_diagr: [4, 2, 1],
        functionalGroup_diagr: [3],
        moveto: "moveto 0.0 { -674 663 326 143.87} 100.0 0.0 0.0 {-0.5439636363636364 0.00012727272727271327 -0.019936363636363603} 4.389998932061536 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    bromo_4_butene_1: {
        name: "4-βρωμο-1-βουτένιο",
        nameComponents: ["4-βρωμο", "1-βουτ", "έν", "ιο"],
        formula: "CH2=CHCH2CH2Br",
        class: "Υδρογονάνθρακες",
        mainChain: [1, 2, 3, 4],
        multibonds: [1],
        functionalGroup: [5],
        functionalBonds: [],
        mainChain_E: [1, 2, 3, 4],
        multibonds_E: [1],
        functionalGroup_E: [5],
        functionalBonds_E: [],
        functionalGroup3D: [1],
        multibonds3D: [4, 5],
        mainChain3D: [5, 4, 2, 3],
        mainChain_diagr: [1, 2, 3, 4],
        multibonds_diagr: [1],
        functionalGroup_diagr: [5],
        moveto: "moveto 0.0 { -98 -879 -467 177.78} 115.0 0.0 0.0 {0.42289166666666667 0.06189999999999997 0.0022750000000000084} 5.327011763850231 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    bromo_3_chloropentane_1: {
        name: "3-βρωμο-1-χλωροπεντάνιο",
        nameComponents: ["3-βρωμο", "1-χλωρο", "πεντ", "άν", "ιο"],
        formula: "CH3CH2CH(Br)CH2CH2Cl",
        class: "Υδρογονάνθρακες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [[7], [6]],
        functionalBonds: [],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[7], [6]],
        functionalBonds_E: [],
        functionalGroup3D: [[1], [2]],
        multibonds3D: [],
        mainChain3D: [6, 4, 3, 5, 7],
        mainChain_diagr: [6, 5, 3, 2, 1],
        functionalGroup_diagr: [[4], [7]],
        functionalBonds_diagr: [],
        moveto: "moveto 0.0 { -38 -980 -196 175.08} 115.0 0.0 0.0 {0.4578470588235295 0.33304117647058823 0.0710705882352941} 5.6706514010944264 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    bromo_2_chlorobutane_3: {
        name: "2-βρωμο-3-χλωροβουτάνιο",
        nameComponents: ["2-βρωμο", "3-χλωρο", "βουτ", "άν", "ιο"],
        formula: "CH3CH(Br)CH(Cl)CH3",
        class: "Υδρογονάνθρακες",
        mainChain: [1, 2, 3, 4],
        multibonds: [],
        functionalGroup: [[5], [6]],
        functionalBonds: [],
        mainChain_E: [1, 2, 3, 4],
        multibonds_E: [],
        functionalGroup_E: [[6], [5]],
        functionalBonds_E: [],
        functionalGroup3D: [[1], [2]],
        multibonds3D: [],
        mainChain3D: [5, 3, 4, 6],
        mainChain_diagr: [6, 4, 2, 1],
        functionalGroup_diagr: [[5], [3]],
        moveto: "moveto 0.0 { -987 33 -157 110.6} 132.25 0.0 0.0 {0.2809357142857143 -0.5459142857142858 0.02150714285714288} 4.885284753863067 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propanediol_1_2: {
        name: "1,2-προπανοδιόλη",
        nameComponents: ["1,2", "προπ", "αν(ο)", "διόλη"],
        formula: "CH3CH(OH)CH2OH",
        class: "Αλκοόλες",
        mainChain: [3, 2, 1],
        multibonds: [],
        functionalGroup: [4, 5],
        functionalBonds: [],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [4, 5],
        functionalBonds_E: [],
        functionalGroup3D: [1, 12, 2, 13],
        multibonds3D: [],
        mainChain3D: [4, 3, 5],
        mainChain_diagr: [4, 2, 1],
        functionalGroup_diagr: [3, 5],
        moveto: "moveto 0.0 { -996 -78 52 48.13} 100.0 0.0 0.0 {-0.34616153846153846 0.16600769230769236 -0.015023076923076934} 3.989388932527346 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propanedioic_acid: {
        name: "προπανοδιικό οξύ",
        nameComponents: ["προπ", "αν(ο)", "διικό οξύ"],
        formula: "HOOCCH2COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [2, 1, 5],
        multibonds: [],
        functionalGroup: [2, 3, 4, 5, 6, 7],
        functionalBonds: [2, 3, 5, 6],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [3, 4, 7, 5, 6, 1],
        functionalBonds_E: [3, 4, 5, 6],
        functionalGroup3D: [6, 3, 1, 10, 7, 4, 2, 11],
        multibonds3D: [6, 3, 4, 10, 7, 4, 2, 11],
        mainChain3D: [6, 5, 7],
        mainChain_diagr: [2, 4, 5],
        functionalGroup_diagr: [1, 2, 3, 5, 6, 7],
        functionalBonds_diagr: [1, 2, 5, 6],
        moveto: "moveto 0.0 { 996 83 -9 9.63} 100.0 0.0 0.0 {0.0013181818181818143 0.3129818181818182 0.0017727272727272717} 4.396995191588708 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    propanetriol: {
        name: "1,2,3-προπανοτριόλη",
        nameComponents: ["1,2,3", "προπ", "αν(ο)", "τριόλη"],
        formula: "CH2(OH)CH(OH)CH2OH",
        class: "Αλκοόλες",
        mainChain: [3, 2, 1],
        multibonds: [],
        functionalGroup: [4, 5, 6],
        functionalBonds: [],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [4, 5, 6],
        functionalBonds_E: [],
        functionalGroup3D: [3, 14, 1, 12, 2, 13],
        multibonds3D: [],
        mainChain3D: [5, 4, 6],
        mainChain_diagr: [2, 3, 5],
        functionalGroup_diagr: [1, 4, 6],
        moveto: "moveto 0.0 { 1000 8 4 59.4} 100.0 0.0 0.0 {-0.06002857142857147 0.21227857142857137 0.17838571428571426} 4.342661921737165 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    dichlorobutane_2_2: {
        name: "2,2-διχλωροβουτάνιο",
        nameComponents: ["2,2-διχλωρο", "βουτ", "άν", "ιο"],
        formula: "CH3C(Cl)2CH2CH3",
        class: "Υδρογονάνθρακες",
        mainChain: [1, 2, 3, 4],
        multibonds: [],
        functionalGroup: [5, 6],
        functionalBonds: [],
        mainChain_E: [1, 2, 3, 4],
        multibonds_E: [],
        functionalGroup_E: [5, 6],
        functionalBonds_E: [],
        functionalGroup3D: [1, 2],
        multibonds3D: [],
        mainChain3D: [5, 3, 4, 6],
        mainChain_diagr: [1, 2, 5, 6],
        functionalGroup_diagr: [3, 4],
        moveto: "moveto 0.0 { 242 970 2 9.89} 100.0 0.0 0.0 {0.2790142857142857 0.00020714285714286605 -0.4407} 4.160085917485747 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    trichloropentane_1_1_2: {
        name: "1,1,2-τριχλωροπεντάνιο",
        nameComponents: ["1,1,2", "τριχλωρο", "πεντ", "άν", "ιο"],
        formula: "CH3CH2CH2CH(Cl)CHCl2",
        class: "Υδρογονάνθρακες",
        mainChain: [5, 4, 3, 2, 1],
        multibonds: [],
        functionalGroup: [6, 7, 8],
        functionalBonds: [],
        mainChain_E: [5, 4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [6, 7, 8],
        functionalBonds_E: [],
        functionalGroup3D: [1, 3, 2],
        multibonds3D: [],
        mainChain3D: [7, 5, 4, 6, 8],
        mainChain_diagr: [5, 4, 3, 2, 1],
        functionalGroup_diagr: [6, 7, 8],
        moveto: "moveto 0.0 { -46 -108 993 178.15} 115.0 0.0 0.0 {1.0008411764705885 0.1231764705882353 -0.19661176470588237} 6.006412446865542 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    hydroxypropanoic_acid_2: {
        name: "2-υδροξυπροπανικό οξύ",
        nameComponents: ["2-υδροξυ", "προπ", "αν", "ικό οξύ"],
        formula: "CH3CH(OH)COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [4, 2, 1],
        multibonds: [],
        functionalGroup: [[3], [4, 5, 6]],
        functionalBonds: [[0], [4, 5]],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[5], [4, 3, 10]],
        functionalBonds_E: [[0], [3, 9]],
        functionalGroup3D: [[1, 11], [6, 3, 2, 12]],
        multibonds3D: [],
        mainChain3D: [6, 4, 5],
        mainChain_diagr: [4, 2, 1],
        functionalGroup_diagr: [[3], [4, 5, 6]],
        functionalBonds_diagr: [[0], [4, 5]],
        moveto: "moveto 0.0 { 959 279 -59 133.43} 100.0 0.0 0.0 {-0.33398333333333335 -0.3167499999999999 0.01656666666666667} 4.027161258321774 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    hydroxybutanenitrile_2: {
        name: "2-υδροξυβουτανονιτρίλιο",
        nameComponents: ["2-υδροξυ", "βουτ", "αν(ο)", "νιτρίλιο"],
        formula: "CH3CH2CH(OH)CN",
        class: "Νιτρίλια",
        mainChain: [5, 3, 2, 1],
        multibonds: [],
        functionalGroup: [[4], [5, 6]],
        functionalBonds: [[0], [5]],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[5], [4, 6]],
        functionalBonds_E: [[0], [5]],
        functionalGroup3D: [[1, 13], [6, 2]],
        multibonds3D: [],
        mainChain3D: [6, 4, 3, 5],
        mainChain_diagr: [5, 3, 2, 1],
        functionalGroup_diagr: [[4], [5, 6]],
        functionalBonds_diagr: [[0], [5]],
        moveto: "moveto 0.0 { -87 -278 -957 175.69} 115.0 0.0 0.0 {0.6581923076923077 -0.031615384615384656 0.0765153846153846} 4.633466587478547 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    Oxopropanoic_acid: {
        name: "κετοπροπανικό οξύ",
        nameComponents: ["κετο", "προπ", "αν", "ικό οξύ"],
        formula: "CH3COCOOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [4, 2, 1],
        multibonds: [],
        functionalGroup: [[1, 2, 3, 4], [4, 5, 6]],
        functionalBonds: [[1, 2, 3], [4, 5]],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[1, 2, 3, 5], [3, 4, 9]],
        functionalBonds_E: [[1, 2, 4], [3, 8]],
        functionalGroup3D: [[5, 4, 6, 2], [6, 3, 1, 10]],
        multibonds3D: [],
        mainChain3D: [6, 4, 5],
        mainChain_diagr: [3, 2, 1],
        functionalGroup_diagr: [[1, 2, 3, 6], [3, 4, 5]],
        functionalBonds_diagr: [[1, 2, 5], [4, 3]],
        moveto: "moveto 0.0 { 153 -987 52 179.04} 100.0 0.0 0.0 {0.32159 0.30856000000000006 0.0029900000000000013} 4.1796362556191315 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    aminobutanoic_acid_3: {
        name: "3-αμινοβουτανικό οξύ",
        nameComponents: ["3-αμινο", "βουτ", "αν", "ικό οξύ"],
        formula: "CH3CH(NH2)CH2COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [5, 3, 2, 1],
        multibonds: [],
        functionalGroup: [[4], [5, 6, 7]],
        functionalBonds: [[], [5, 6]],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[9], [4, 5, 6]],
        functionalBonds_E: [[], [4, 5]],
        functionalGroup3D: [[3, 14, 15], [7,2,1,16]],
        multibonds3D: [],
        mainChain3D: [7, 5, 4, 6],
        mainChain_diagr: [5, 4, 2, 1],
        functionalGroup_diagr: [[3], [5, 6, 7]],
        functionalBonds_diagr: [[], [5, 6]],
        moveto: "moveto 0.0 { 996 44 76 43.25} 100.0 0.0 0.0 {-0.45260624999999993 -0.11909375 0.118325} 4.631305652838745 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    hydroxypropanenitrile_2: {
        name: "2-υδροξυπροπανονιτρίλιο",
        nameComponents: ["2-υδροξυ", "προπ", "αν(ο)", "νιτρίλιο"],
        formula: "CH3CH(OH)CN",
        class: "Νιτρίλια",
        mainChain: [4, 2, 1],
        multibonds: [],
        functionalGroup: [[3], [4,5]],
        functionalBonds: [[], [4]],
        mainChain_E: [3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[5], [3,4]],
        functionalBonds_E: [[], [3]],
        functionalGroup3D: [[1,10], [5,2]],
        multibonds3D: [],
        mainChain3D: [5, 3, 4],
        mainChain_diagr: [3, 2, 1],
        functionalGroup_diagr: [[4], [3,5]],
        functionalBonds_diagr: [[], [4]],
        moveto: "moveto 0.0 { -947 -233 -222 121.27} 115.0 0.0 0.0 {-0.5775 -0.23924000000000004 0.07578000000000001} 4.472712277014008 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    oxobutanoic_acid: {
        name: "οξοβουτανικό οξύ",
        nameComponents: ["οξο", "βουτ", "αν", "ικό οξύ"],
        formula: "O=CHCH2CH2COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [5, 3, 2, 1,],
        multibonds: [],
        functionalGroup: [ [1, 4], [5, 6, 7]],
        functionalBonds: [[3], [5, 6]],
        mainChain_E: [4, 3, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[1, 7, 12,], [4, 5, 6]],
        functionalBonds_E: [[6, 11], [4, 5]],
        functionalGroup3D: [[7, 3, 12] ,[6, 2, 1, 13] ],
        multibonds3D: [],
        mainChain3D: [6, 4, 5, 7],
        mainChain_diagr: [2, 3, 5, 6],
        functionalGroup_diagr: [[6, 7] ,[1, 2, 4] ],
        functionalBonds_diagr: [[6], [1, 3]],
        moveto: "moveto 0.0 { 153 -987 52 179.04} 100.0 0.0 0.0 {0.11022307692307687 0.09013846153846156 -0.002015384615384622} 4.715473262911911 {0 0 0} 0 0 0 3.0 0.0 0.0;"

    },

    dihydroxybutanedioic_acid_2_3: {
        name: "2,3-διυδροξυβουτανοδιικό οξύ",
        nameComponents: ["2,3-διυδροξυ", "βουτ", "αν(ο)", "διικό οξύ"],
        formula: "HOOCCH(OH)CH(OH)COOH",
        class: "Καρβοξυλικά οξέα",
        mainChain: [8, 2, 1, 5],
        multibonds: [],
        functionalGroup: [[4, 3], [8, 9, 10, 5, 6, 7] ],
        functionalBonds: [[],[5, 6, 8, 9]],
        mainChain_E: [6, 5, 2, 1],
        multibonds_E: [],
        functionalGroup_E: [[9,10], [1,3,4, 6, 7, 8] ],
        functionalBonds_E: [[],[2,3, 6, 7]],
        functionalGroup3D: [[1,2,13,14],[9, 5, 3, 15, 10, 6, 4, 16]],
        multibonds3D: [],
        mainChain3D: [10, 8, 7, 9],
        mainChain_diagr: [5, 4, 3, 2],
        functionalGroup_diagr: [[7,8], [1,2,6, 5, 9, 10] ],
        functionalBonds_diagr: [[],[1,5, 8, 9]],
        moveto: "moveto 0.0 { -96 -48 -994 179.82} 100.0 0.0 0.0 {0.00010624999999997442 0.07223125000000001 -0.013687499999999991} 4.739415414114579 {0 0 0} 0 0 0 3.0 0.0 0.0;",
    },

    ethanol: {
        name: "αιθανόλη",
        nameComponents: ["αιθ", "αν", "όλη"],
        formula: "CH3CΗ2OH",
        class: "Αλκοόλες",
        mainChain: [2, 1],
        mainChain_E: [2, 1],
        mainChain_diagr: [2, 1],
        mainChain3D: [2, 3],
        functionalGroup: [3],
        functionalGroup_E: [3],
        functionalGroup_diagr: [3],
        functionalGroup3D: [1, 9],
        moveto: "moveto 0.0 { -56 994 -89 178.0} 115.0 0.0 0.0 {0.3654555555555556 -0.011722222222222214 0.08863333333333333} 3.2703980274730853 {0 0 0} 0 0 0 3.0 0.0 0.0;"
    },

    propanone: {
        name: "προπανόνη",
        nameComponents: ["προπ", "αν", "όνη"],
        formula: "CH3COCH3",
        class: "Κετόνες",
        mainChain: [3, 2, 1],
        mainChain_E: [3, 2, 1],
        mainChain_diagr: [3, 2, 1],
        mainChain3D: [3, 2, 4],
        functionalGroup: [1, 2, 3, 4],
        functionalGroup_E: [1, 2, 3, 10],
        functionalGroup_diagr: [1, 2, 3, 4],
        functionalGroup3D: [1, 2, 3, 4],
        functionalBonds: [1, 2, 3],
        functionalBonds_E: [1, 2, 9],
        functionalBonds_diagr: [1, 2, 3],
        moveto: "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.0001200000000000534 0.53408 -0.00015999999999999348} 3.5511800480774416 {0 0 0} 0 0 0 3.0 0.0 0.0;"
    },

    butanone: {
        name: "βουτανόνη",
        nameComponents: ["βουτ", "αν", "όνη"],
        formula: "CH3CH2COCH3",
        class: "Κετόνες",
        mainChain: [4, 3, 2, 1],
        mainChain_E: [4, 3, 2, 1],
        mainChain_diagr: [4, 3, 2, 1],
        mainChain3D: [5, 3, 2, 4],
        functionalGroup: [2, 3, 4, 5],
        functionalGroup_E: [2, 3, 4, 13],
        functionalGroup_diagr: [2, 3, 4, 5],
        functionalGroup3D: [1, 2, 3, 5],
        functionalBonds: [2, 3, 4],
        functionalBonds_E: [2, 3, 13],
        functionalBonds_diagr: [2, 3, 4],
        moveto: "moveto 0.0 { 872 -443 209 2.75} 100.0 0.0 0.0 {-0.1591384615384615 0.3527615384615385 -0.002230769230769233} 4.0313838970310725 {0 0 0} 0 0 0 3.0 0.0 0.0;"
    },

    nitroethane: {
        name: "νιτροαιθάνιο",
        nameComponents: ["νιτρο", "αιθ", "αν", "ιο"],
        formula: "CH3CH2ΝΟ2",
        class: "υδρογονάνθρακες",
        mainChain: [2, 1],
        mainChain_E: [2, 1],
        mainChain_diagr: [2, 1],
        mainChain3D: [4, 5],
        functionalGroup: [3, 4, 5],
        functionalGroup_E: [8, 9, 10],
        functionalGroup_diagr: [3, 4, 5],
        functionalGroup3D: [3, 2, 1],
        functionalBonds: [3, 4],
        functionalBonds_E: [8, 9],
        functionalBonds_diagr: [3, 4],
        moveto: "moveto 0.0 { -266 -961 76 10.76} 100.0 0.0 0.0 {-0.80876 0.006739999999999981 -0.03645} 3.8825827699539825 {0 0 0} 0 0 0 3.0 0.0 0.0;"
    },

    nitropropane_2: {
        name: "2-νιτροπροπάνιο",
        nameComponents: ["2-νιτρο", "προπ", "αν", "ιο"],
        formula: "CH3CH(ΝΟ2)CH3",
        class: "υδρογονάνθρακες",
        mainChain: [3, 2, 1],
        mainChain_E: [3, 2, 1],
        mainChain_diagr: [3, 2, 1],
        mainChain3D: [6, 4, 5],
        functionalGroup: [4, 5, 6],
        functionalGroup_E: [11, 12, 13],
        functionalGroup_diagr: [4, 5, 6],
        functionalGroup3D: [3, 2, 1],
        functionalBonds: [4, 5],
        functionalBonds_E: [11, 12],
        functionalBonds_diagr: [4, 5],
        moveto: "moveto 0.0 { 436 401 -806 102.19} 100.0 0.0 0.0 {-0.7402 -0.0005846153846154739 -0.048838461538461594} 4.212636983059641 {0 0 0} 0 0 0 3.0 0.0 0.0;"
    },

}

let butene_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanol_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_4_ol_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  2  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_1_one_3_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7491    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.9241    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0991    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7259    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7491    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0991   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  3  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanol_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentanone_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butene_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  3  4  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentadiene_1_3_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propyne_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanal_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanoic_acid_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4438   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.6188   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.2062   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   4   5   6\n" +
    "M  SBL   1  1   3\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   3   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let propanenitrile_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  3  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  2   3   4\n" +
    "M  SBL   1  1   2\n" +
    "M  SMT   1 C^N\n" +
    "M  SBV   1   2   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let butene_3_ol_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propenoic_acid_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0313   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.2062   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.6188   -0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  3  5  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   3   4   5\n" +
    "M  SBL   1  1   2\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   2   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let propynal_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let buten_1_yne_3_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hexen_2_yne_4_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -2.0625    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  5  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_3_yne_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let chlorobutane_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromopropane_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_4_butene_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_3_chloropentane_1_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.4125    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_2_chlorobutane_3_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.4125    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.4125    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  3  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanediol_1_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanetriol_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  1  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  3  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanedioic_acid_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "    0.0000    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  2  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  5  7  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   2   3   4\n" +
    "M  SBL   1  1   1\n" +
    "M  SMT   1 CO^OH\n" +
    "M  SBV   1   1   -0.8250    0.0000\n" +
    "M  STY  1   2 SUP\n" +
    "M  SLB  1   2   2\n" +
    "M  SAL   2  3   5   6   7\n" +
    "M  SBL   2  1   4\n" +
    "M  SMT   2 ^COOH\n" +
    "M  SBV   2   4    0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let dichlorobutane_2_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  2  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxypropanoic_acid_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0313    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.2062    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.2062   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.6188    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   4   5   6\n" +
    "M  SBL   1  1   3\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   3   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let hydroxybutanenitrile_2_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  3  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  2   5   6\n" +
    "M  SBL   1  1   4\n" +
    "M  SMT   1 C^N\n" +
    "M  SBV   1   4   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let Oxopropanoic_acid_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0313    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.2062    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.2062   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.6188    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   4   5   6\n" +
    "M  SBL   1  1   3\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   3   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let aminobutanoic_acid_3_2D = "nomenclature_moc2-1.cdx\n" +
    "  ChemDraw03012409162D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4438    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.6188    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.2062    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.6188   -0.7697    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.0553    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  5  7  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   5   6   7\n" +
    "M  SBL   1  1   4\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   4   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let pentanoic_acid_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7531   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.9281   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.1031   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7219   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.3406   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7531    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7531   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  5  7  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   5   6   7\n" +
    "M  SBL   1  1   4\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   4   -0.6188    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let pentanal_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_2_ol_1_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentyn_4_one_2_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hexen_1_yne_4_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let trichloropentane_1_1_2_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxypropanenitrile_2_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  3  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  2   4   5\n" +
    "M  SBL   1  1   3\n" +
    "M  SMT   1 CN\n" +
    "M  SBV   1   3   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let oxobutanoic_acid_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4438    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.6188    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.2062    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.4438   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  1  4  2  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  5  7  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   5   6   7\n" +
    "M  SBL   1  1   4\n" +
    "M  SMT   1 COOH\n" +
    "M  SBV   1   4   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let dihydroxybutanedioic_acid_2_3_2D = "nomenclature_moc2-1b.cdx\n" +
    "  ChemDraw03272422322D\n" +
    "\n" +
    " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.4125    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0553    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  1  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  5  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  8  9  2  0      \n" +
    "  8 10  1  0      \n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   5   6   7\n" +
    "M  SBL   1  1   4\n" +
    "M  SMT   1 ^COOH\n" +
    "M  SBV   1   4    0.8250    0.0000\n" +
    "M  STY  1   2 SUP\n" +
    "M  SLB  1   2   2\n" +
    "M  SAL   2  3   8   9  10\n" +
    "M  SBL   2  1   7\n" +
    "M  SMT   2 COOH\n" +
    "M  SBV   2   7   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let butanone_2D = "nomenclature_moc2-1c.sdf\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let ethanol_2D = "nomenclature_moc2-1c.sdf\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanone_2D = "nomenclature_moc2-1c.sdf\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let nitroethane_2D = "nomenclature_moc2-1c.sdf\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0313   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.2062   -0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.6188   -0.0000    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.7145    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  3  5  1  0      \n" +
    "M  CHG  2   3   1   5  -1\n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   3   4   5\n" +
    "M  SBL   1  1   2\n" +
    "M  SMT   1 N^O2\n" +
    "M  SBV   1   2   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let nitropropane_2_2D = "nomenclature_moc2-1c.sdf\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.6188    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.6188    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.6188    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.2062    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.6188    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "M  CHG  2   4   1   6  -1\n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   4   5   6\n" +
    "M  SBL   1  1   3\n" +
    "M  SMT   1 NO2\n" +
    "M  SBV   1   3    0.0000    0.8250\n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let butene_1_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanol_1_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_4_ol_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_1_one_3_diagr2D = "nomenclature_moc2-2b.cdx\n" +
    "  ChemDraw03242419422D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0000    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  3  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanol_1_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentanone_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butene_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  3  4  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentadiene_1_3_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propyne_diagr2D = "nomenclature_moc2-2b.cdx\n" +
    "  ChemDraw03242419422D\n" +
    "\n" +
    "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanal_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanoic_acid_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanenitrile_diagr2D = "nomenclature_moc2-2b.cdx\n" +
    "  ChemDraw03242419422D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.4125    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  3  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butene_3_ol_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propenoic_acid_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propynal_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let buten_1_yne_3_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hexen_2_yne_4_diagr2D = "nomenclature_moc2-2b.cdx\n" +
    "  ChemDraw03242419422D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  5  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_3_yne_1_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let chlorobutane_1_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.2062    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromopropane_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "    0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.6188    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_4_butene_1_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.2062    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_3_chloropentane_1_diagr2D = "nomenclature_moc2-2b.cdx\n" +
    "  ChemDraw03242419422D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.6188    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862   -0.6188    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  6  7  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_2_chlorobutane_3_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "    1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -1.0313    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    1.0313    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanediol_1_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanedioic_acid_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "    0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.4289   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanetriol_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "    1.4289   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.4289   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let dichlorobutane_2_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717   -0.5635    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.1510    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0553    0.5635    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7697    0.5635    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.5635    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.1510    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxypropanoic_acid_2_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxybutanenitrile_2_diagr2D = "nomenclature_moc2-2b.cdx\n" +
    "  ChemDraw03242419422D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  3  0      \n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let Oxopropanoic_acid_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  2  0      \n" +
    "  2  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let aminobutanoic_acid_3_diagr2D = "nomenclature_moc2-2.cdx\n" +
    "  ChemDraw03012409172D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145    0.6188    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4289   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  2  0      \n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let pentanoic_acid_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentanal_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862    0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_2_ol_1_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862    0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentyn_4_one_2_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.5526    0.7328    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7557    0.5193    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0412    0.3057    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8381    0.0922    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.5526    0.5047    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8381   -0.7328    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hexen_1_yne_4_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.9098    0.3203    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.1129    0.1068    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3160   -0.1068    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4809   -0.3203    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.1953    0.0922    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.9098   -0.3203    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let trichloropentane_1_1_2_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862    0.2062    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -1.0313    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    1.0313    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxypropanenitrile_2_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  3  5  3  0      \n" +
    "M  END\n" +
    "$$$$\n";

let oxobutanoic_acid_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "    1.7862    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.7862    0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  2  0      \n" +
    "  3  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  6  7  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let dihydroxybutanedioic_acid_2_3_diagr2D = "nomenclature_moc2-2c.cdx\n" +
    "  ChemDraw03272423522D\n" +
    "\n" +
    " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.7862   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.0717    1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572   -1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.7862    0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717   -1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  2  6  2  0      \n" +
    "  3  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "  5  9  1  0      \n" +
    "  5 10  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let ethanol_diagr2D = "Untitled Document-2\n" +
    "  ChemDraw04102419402D\n" +
    "\n" +
    "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.6545    0.2461    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0026   -0.2528    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.6545    0.2528    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanone_diagr2D = "Untitled Document-2\n" +
    "  ChemDraw04102419402D\n" +
    "\n" +
    "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.7145    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanone_diagr2D = "Untitled Document-2\n" +
    "  ChemDraw04102419402D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let nitroethane_diagr2D = "Untitled Document-2\n" +
    "  ChemDraw04102419402D\n" +
    "\n" +
    "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.3572    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572    0.2062    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.3572   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0717    0.6188    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  3  5  1  0      \n" +
    "M  CHG  2   3   1   5  -1\n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   3   4   5\n" +
    "M  SBL   1  1   2\n" +
    "M  SMT   1 NO2\n" +
    "M  SBV   1   2   -0.7145    0.4125\n" +
    "M  END\n" +
    "$$$$\n";

let nitropropane_2_diagr2D = "Untitled Document-2\n" +
    "  ChemDraw04102419402D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.7145    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145    0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -0.8250    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "M  CHG  2   4   1   6  -1\n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   4   5   6\n" +
    "M  SBL   1  1   3\n" +
    "M  SMT   1 NO2\n" +
    "M  SBV   1   3    0.0000    0.8250\n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let butene_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanol_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_4_ol_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 15 14  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  2  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  3 12  1  0      \n" +
    "  4 13  1  0      \n" +
    "  5 14  1  0      \n" +
    "  5 15  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_1_one_3_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  3  6  2  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  2 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "  5 13  1  0      \n" +
    "  5 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanol_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  3 12  1  0      \n" +
    "  4 13  1  0      \n" +
    "  4 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentanone_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  2 11  1  0      \n" +
    "  3 12  1  0      \n" +
    "  3 13  1  0      \n" +
    "  5 14  1  0      \n" +
    "  5 15  1  0      \n" +
    "  5 16  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butene_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  3  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  4 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentadiene_1_3_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  2  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  5 12  1  0      \n" +
    "  5 13  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propyne_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  1  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanal_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanoic_acid_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "  3  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  1 11  1  0      \n" +
    "  1 12  1  0      \n" +
    "  1 13  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanenitrile_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  3  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butene_3_ol_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  4 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propenoic_acid_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  3  5  1  0      \n" +
    "  2  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propynal_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  1  5  1  0      \n" +
    "  3  6  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let buten_1_yne_3_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.4125    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  1  5  1  0      \n" +
    "  3  6  1  0      \n" +
    "  4  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hexen_2_yne_4_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.8875    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.8875    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  5  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  4 10  1  0      \n" +
    "  5 11  1  0      \n" +
    "  6 12  1  0      \n" +
    "  6 13  1  0      \n" +
    "  6 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_3_yne_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 [H]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  4  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "  5  9  1  0      \n" +
    "  5 10  1  0      \n" +
    "  5 11  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let chlorobutane_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  3 12  1  0      \n" +
    "  4 13  1  0      \n" +
    "  4 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromopropane_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_4_butene_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  2  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_3_chloropentane_1_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 17 16  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "  5  8  1  0      \n" +
    "  5  9  1  0      \n" +
    "  4 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  3 12  1  0      \n" +
    "  2 13  1  0      \n" +
    "  2 14  1  0      \n" +
    "  1 15  1  0      \n" +
    "  1 16  1  0      \n" +
    "  1 17  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let bromo_2_chlorobutane_3_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  2  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "  4 13  1  0      \n" +
    "  4 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanediol_1_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanedioic_acid_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  1  5  2  0      \n" +
    "  1  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanetriol_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  1  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  3  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let dichlorobutane_2_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  2  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "  4 13  1  0      \n" +
    "  4 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxypropanoic_acid_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  3 10  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxybutanenitrile_2_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  3  5  1  0      \n" +
    "  4  6  3  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  2 11  1  0      \n" +
    "  3 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let Oxopropanoic_acid_2D_E = "Untitled Document-2\n" +
    "  ChemDraw03222400352D\n" +
    "\n" +
    "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  2  5  2  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let aminobutanoic_acid_3_2D_E = "nomenclature_moc2-3.cdx\n" +
    "  ChemDraw03212423462D\n" +
    "\n" +
    " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "  3  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  1 11  1  0      \n" +
    "  1 12  1  0      \n" +
    "  1 13  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentanoic_acid_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  2  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  1 10  1  0      \n" +
    "  2 11  1  0      \n" +
    "  2 12  1  0      \n" +
    "  3 13  1  0      \n" +
    "  3 14  1  0      \n" +
    "  4 15  1  0      \n" +
    "  4 16  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentanal_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  5  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "  4  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  2 12  1  0      \n" +
    "  2 13  1  0      \n" +
    "  1 14  1  0      \n" +
    "  1 15  1  0      \n" +
    "  1 16  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let penten_2_ol_1_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 15 14  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  2  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  1  0      \n" +
    "  5  8  1  0      \n" +
    "  4  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  2 11  1  0      \n" +
    "  2 12  1  0      \n" +
    "  1 13  1  0      \n" +
    "  1 14  1  0      \n" +
    "  1 15  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let pentyn_4_one_2_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  3  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  4  6  2  0      \n" +
    "  3  7  1  0      \n" +
    "  3  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "  5 10  1  0      \n" +
    "  5 11  1  0      \n" +
    "  5 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hexen_1_yne_4_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.8875    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.8875    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  3  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  2  0      \n" +
    "  6  7  1  0      \n" +
    "  6  8  1  0      \n" +
    "  5  9  1  0      \n" +
    "  4 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  1 12  1  0      \n" +
    "  1 13  1  0      \n" +
    "  1 14  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let trichloropentane_1_1_2_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  5  7  1  0      \n" +
    "  4  8  1  0      \n" +
    "  4  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  3 11  1  0      \n" +
    "  2 12  1  0      \n" +
    "  2 13  1  0      \n" +
    "  1 14  1  0      \n" +
    "  1 15  1  0      \n" +
    "  1 16  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let hydroxypropanenitrile_2_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  3  0      \n" +
    "  2  5  1  0      \n" +
    "  2  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "  1  9  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let oxobutanoic_acid_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  4  5  2  0      \n" +
    "  4  6  1  0      \n" +
    "  1  7  2  0      \n" +
    "  3  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  2 11  1  0      \n" +
    "  1 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let dihydroxybutanedioic_acid_2_3_2D_E = "nomenclature_moc2-1b_2D.sdf\n" +
    "  ChemDraw03272422462D\n" +
    "\n" +
    " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  1  3  2  0      \n" +
    "  1  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  5  6  1  0      \n" +
    "  6  7  2  0      \n" +
    "  6  8  1  0      \n" +
    "  5  9  1  0      \n" +
    "  2 10  1  0      \n" +
    "  5 11  1  0      \n" +
    "  2 12  1  0      \n" +
    "M  END\n" +
    "$$$$\n" +
    "\n";

let ethanol_2D_E = "nomenclature_moc2-3c_2D.cdx\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  2  4  1  0      \n" +
    "  2  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  1  8  1  0      \n" +
    "M  END\n" +
    "$$$$\n";

let butanone_2D_E = "nomenclature_moc2-3c_2D.cdx\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.4125   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  3  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  1  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  2  9  1  0      \n" +
    "  4 10  1  0      \n" +
    "  4 11  1  0      \n" +
    "  4 12  1  0      \n" +
    "  3 13  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let propanone_2D_E = "nomenclature_moc2-3c_2D.cdx\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  1  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  3  7  1  0      \n" +
    "  3  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  2 10  2  0      \n" +
    "M  END\n" +
    "$$$$\n";

let nitroethane_2D_E = "nomenclature_moc2-3c_2D.cdx\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.6188    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.2062    0.0000    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.6188   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.4438    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.6188    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.2062    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.2062   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.0313    0.0000    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.4438    0.7145    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  1  3  1  0      \n" +
    "  1  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  2  6  1  0      \n" +
    "  2  7  1  0      \n" +
    "  2  8  1  0      \n" +
    "  8  9  2  0      \n" +
    "  8 10  1  0      \n" +
    "M  CHG  2   8   1  10  -1\n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3   8   9  10\n" +
    "M  SBL   1  1   7\n" +
    "M  SMT   1 N^O2\n" +
    "M  SBV   1   7   -0.8250    0.0000\n" +
    "M  END\n" +
    "$$$$\n";

let nitropropane_2_2D_E = "nomenclature_moc2-3c_2D.cdx\n" +
    "  ChemDraw04102417352D\n" +
    "\n" +
    " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
    "   -0.8250    0.2062    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    0.2062    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    0.2062    0.0000 [C]   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250   -0.6188    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -1.6500    0.2062    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.8250    1.0313    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000    1.0313    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250    1.0313    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    1.6500    0.2062    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.8250   -0.6188    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.0000   -0.6188    0.0000 N   0  3  0  0  0  0  0  0  0  0  0  0\n" +
    "   -0.7145   -1.0313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
    "    0.7145   -1.0313    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0\n" +
    "  1  2  1  0      \n" +
    "  2  3  1  0      \n" +
    "  1  4  1  0      \n" +
    "  1  5  1  0      \n" +
    "  1  6  1  0      \n" +
    "  2  7  1  0      \n" +
    "  3  8  1  0      \n" +
    "  3  9  1  0      \n" +
    "  3 10  1  0      \n" +
    "  2 11  1  0      \n" +
    " 11 12  2  0      \n" +
    " 11 13  1  0      \n" +
    "M  CHG  2  11   1  13  -1\n" +
    "M  STY  1   1 SUP\n" +
    "M  SLB  1   1   1\n" +
    "M  SAL   1  3  11  12  13\n" +
    "M  SBL   1  1  10\n" +
    "M  SMT   1 NO2\n" +
    "M  SBV   1  10    0.0000    0.8250\n" +
    "M  END\n" +
    "$$$$\n";

