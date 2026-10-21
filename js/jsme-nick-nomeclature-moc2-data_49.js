let nameExamples = {
  methane: {
    formula: "CH4",
    mainChain_Condensed: [1],
    mainChain_Expanded: [1],
    mainChain3D: [1],
    moveto:
      "moveto 0.0 { 17 896 -444 35.17} 65.75 0.0 0.0 {0.000020000000000020002 0.0000199999999999978 0} 2.290012662678742 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  methanoicacid: {
    formula: "HCOOH",
    mainChain_Condensed: [1],
    mainChain_Expanded: [1],
    mainChain3D: [3],
    moveto:
      "moveto 0.0 { -7 8 -1000 146.49} 65.75 0.0 0.0 {-0.000020000000000042208 -0.000019999999999975594 0} 3.2159247919339533 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  ethane: {
    formula: "CH3CH3",
    mainChain_Condensed: [1, 2],
    mainChain_Expanded: [1, 2],
    mainChain3D: [1, 2],
    moveto:
      "moveto 0.0 { -994 113 11 18.79} 57.18 0.0 0.0 {0.000020000000000020002 0.0000199999999999978 0} 2.290012662678742 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  ethene: {
    formula: "CH2=CH2",
    mainChain_Condensed: [1, 2],
    mainChain_Expanded: [1, 2],
    mainChain3D: [1, 2],
    moveto:
      "moveto 0.0 {0 0 1 0} 86.96 0.0 0.0 {0.000016666666666701836 0 0} 2.7361211020872602 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  ethanal: {
    formula: "CH3CH=O",
    mainChain_Condensed: [1, 3],
    mainChain_Expanded: [2, 1],
    mainChain3D: [3, 2],
    moveto:
      "moveto 0.0 { 7 34 999 22.89} 100.0 0.0 0.0 {-0.6607714285714287 -0.07847142857142855 -0.00007142857142855872} 3.533159210104741 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  ethanenitrile: {
    formula: "CH3CN",
    mainChain_Condensed: [2, 1],
    mainChain_Expanded: [2, 1],
    mainChain3D: [3, 2],
    moveto:
      "moveto 0.0 { -999 -11 -30 133.25} 100.0 0.0 0.0 {0.10060000000000001 0 0} 3.4119 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propane: {
    formula: "CH3CH2CH3",
    mainChain_Condensed: [1, 2, 3],
    mainChain_Expanded: [2, 3, 4],
    mainChain3D: [2, 1, 3],
    moveto:
      "moveto 0.0 {0 0 1 0} 75.61 0.0 0.0 {4.0371746350005693e-17 0.050663636363636376 1.0092936587501423e-17} 3.384924315405361 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propene: {
    formula: "CH3CH=CH2",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [3, 2, 1],
    moveto:
      "moveto 0.0 { -2 1000 24 179.48} 65.75 0.0 0.0 {0.000016666666666701836 0 0} 2.7361211020872602 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propadiene: {
    formula: "CH2=C=CH2",
    mainChain_Condensed: [1, 2, 3],
    mainChain_Expanded: [1, 2, 3],
    mainChain3D: [2, 3, 1],
    moveto:
      "moveto 0.0 { 998 45 -40 90.39} 85.0 0.0 0.0 {0 0 0} 3.2125 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propionicacid: {
    formula: "CH3CH2COOH",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [5, 3, 4],
    moveto:
      "moveto 0.0 { -22 1000 14 176.44} 80.0 0.0 0.0 {0.5374909090909091 -0.18744545454545455 0.0006454545454545474} 4.189507676651848 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butane: {
    formula: "CH3CH2CH2CH3",
    mainChain_Condensed: [1, 2, 3, 4],
    mainChain_Expanded: [2, 3, 4, 5],
    mainChain3D: [3, 1, 2, 4],
    moveto:
      "moveto 0.0 { -997 53 47 84.63} 80.0 0.0 0.0 {0 -0.000028571428571449215 -0.0012142857142857075} 3.986991881610577 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butanal: {
    formula: "CH3CH2CH2CH=O",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [5, 3, 2, 4],
    moveto:
      "moveto 0.0 { 133 83 -988 20.71} 100.0 0.0 0.0 {-0.6192615384615386 0.14843076923076923 0.0009692307692307773} 4.353122046887492 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butanenitrile: {
    formula: "CH3CH2CH2CN",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [5, 3, 2, 4],
    moveto:
      "moveto 0.0 { -182 -190 -965 12.07} 100.25 0.0 0.0 {-0.9161166666666667 0.05558333333333333 0.0004583333333333397} 5.169826848992529 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  pentane: {
    formula: "CH3CH2CH2CH2CH3",
    mainChain_Condensed: [1, 2, 3, 4, 5],
    mainChain_Expanded: [1, 2, 3, 4, 5],
    mainChain3D: [5, 3, 1, 2, 4],
    moveto:
      "moveto 0.0 { 1000 10 -11 87.6} 80.0 0.0 0.0 {5.224578939412501e-17 0.03930000000000003 0.0017823529411764767} 4.626672223680974 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butene_1: {
    formula: "CH3CH2CH=CH2",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [4, 3, 1, 2],
    mainChain_Skeletal: [4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -60 -844 -532 175.79} 100.0 0.0 0.0 {0.20107500000000003 -0.06646666666666665 -0.022833333333333344} 4.05245318942261 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanol_1: {
    formula: "CH3CH2CH2OH",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [3, 2, 4],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 { -994 -74 -81 87.87} 100.0 0.0 0.0 {-0.38661666666666666 0.01949999999999999 0.06695833333333334} 3.9330918092815965 {0 0 0} 0 0 0 3.0 0.0 0.0; ",
  },

  penten_4_ol_2: {
    formula: "CH3CH(OH)CH2CH=CH2",
    mainChain_Condensed: [1, 2, 3, 4, 5],
    mainChain_Expanded: [1, 2, 3, 4, 5],
    mainChain3D: [4, 2, 3, 5, 6],
    mainChain_Skeletal: [1, 2, 4, 5, 6],
    moveto:
      "moveto 0.0 { -94 -306 -947 175.58} 100.0 0.0 0.0 {0.13626250000000004 -0.19146250000000004 -0.043137499999999995} 4.888075063189299 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  penten_1_one_3: {
    formula: "CH3CH2COCH=CH2",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [6, 5, 4, 2, 3],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.26767857142857143 0.23657857142857147 -0.0016714285714285744} 4.883273360596189 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butanol_1: {
    formula: "CH3CH2CH2CH2OH",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [4, 2, 3, 5],
    mainChain_Skeletal: [4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -6 8 1000 178.64} 100.0 0.0 0.0 {0.3884133333333333 -0.00525999999999999 -0.05360666666666667} 4.529751947519232 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  pentanone_2: {
    formula: "CH3CH2CH2COCH3",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [6, 5, 3, 2, 4],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -35 -92 -995 7.42} 100.0 0.0 0.0 {-0.3290937500000001 0.3106 0.0017499999999999998} 4.706893784752978 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butene_2: {
    formula: "CH3CH=CHCH3",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [4, 2, 1, 3],
    mainChain_Skeletal: [4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -49 998 25 174.81} 80.0 0.0 0.0 {-0.3290937500000001 0.3106 0.0017499999999999998} 4.706893784752978 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  pentadiene_1_3: {
    formula: "CH3CH=CHCH=CH2",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [5, 4, 3, 1, 2],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.20437692307692298 0.05618461538461538 0.00004615384615384192} 4.79304076501412 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propyne: {
    formula: "CH3C_CH",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [3, 2, 1],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {0.0873 -0.0002 0.0001} 3.4654000750419343 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanal: {
    formula: "CH3CH2CH=O",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [4, 2, 3],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 { -234 -972 -6 176.29} 100.0 0.0 0.0 {0.54952 0.11701 -0.0012599999999999972} 3.735341191078292 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butanoic_acid: {
    formula: "CH3CH2CH2COOH",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [6, 4, 3, 5],
    mainChain_Skeletal: [4, 3, 2, 1],
    moveto:
      "moveto 0.0 { 823 140 551 11.37} 100.0 0.0 0.0 {-0.6947142857142857 -0.1373714285714286 0.0004714285714285643} 4.884675116960927 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanenitrile: {
    formula: "CH3CH2C_N",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [4, 2, 3],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.8523555555555555 -0.020800000000000003 0.000044444444444427215} 4.4752938541461 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  pentanoic_acid: {
    formula: "CH3CH2CH2CH2COOH",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [7, 5, 3, 4, 6],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -7 17 1000 175.72} 100.0 0.0 0.0 {0.7673823529411764 -0.10584117647058826 -0.0010941176470588218} 5.541346185192858 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  pentanal: {
    formula: "CH3CH2CH2CH2CH=O",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [6, 4, 2, 3, 5],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -996 94 -5 179.86} 100.0 0.0 0.0 {-0.61283125 -0.13466250000000002 0.00013750000000000242} 4.826256094278101 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butene_3_ol_2: {
    formula: "CH2=CHCH(OH)CH3",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [3, 2, 4, 5],
    mainChain_Skeletal: [5, 3, 2, 1],
    moveto:
      "moveto 0.0 { 9 368 930 150.98} 100.0 0.0 0.0 {-0.08393846153846152 -0.24908461538461535 0.061176923076923066} 4.280578988777057 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  penten_2_ol_1: {
    formula: "CH3CH2CH=CHCH2OH",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [6, 5, 3, 2, 4],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -63 518 853 172.36} 100.0 0.0 0.0 {0.2935125000000001 -0.004893749999999988 0.02916875000000003} 5.059175863435337 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  pentyn_4_one_2: {
    formula: "HC_CCH2COCH3",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [2, 3, 5, 6, 4],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -408 -846 -344 178.29} 86.96 0.0 0.0 {-0.32399999999999995 -0.40674166666666667 0.00017500000000000848} 4.601720696521621 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propenoic_acid: {
    formula: "CH2=CHCOOH",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [4, 3, 5],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 { 25 -999 -32 179.92} 100.0 0.0 0.0 {0.36175555555555555 -0.15610000000000007 -0.00006666666666666667} 3.996410987871135 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propynal: {
    formula: "CH_CCH=O",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [2, 3, 4],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 { -125 992 33 176.85} 100.0 0.0 0.0 {0.30560000000000004 -0.18216666666666664 0.00008333333333333334} 3.791606078230683 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  penten_3_yne_1: {
    formula: "CH_CCH=CHCH3",
    mainChain_Condensed: [1, 2, 3, 4, 5],
    mainChain_Expanded: [1, 2, 3, 4, 5],
    mainChain3D: [5, 4, 3, 2, 1],
    mainChain_Skeletal: [1, 2, 3, 4, 5],
    moveto:
      "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {0 0 0} 4.69067850854243 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  hexen_1_yne_4: {
    formula: "CH3C_CCH2CH=CH2",
    mainChain_Condensed: [6, 5, 4, 3, 2, 1],
    mainChain_Expanded: [6, 5, 4, 3, 2, 1],
    mainChain3D: [5, 2, 1, 3, 6, 4],
    mainChain_Skeletal: [6, 5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { 995 -17 95 71.5} 100.0 0.0 0.0 {-0.025399999999999992 0.08172857142857143 -0.013678571428571444} 5.021484686572104 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  buten_1_yne_3: {
    formula: "CH_CCH=CH2",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [2, 1, 3, 4],
    mainChain_Skeletal: [4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -112 -991 -68 174.76} 100.0 0.0 0.0 {-0.30090000000000006 0.059224999999999986 0.00009999999999999999} 4.3545985799503875 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  hexen_2_yne_4: {
    formula: "CH3C_CCH=CHCH3",
    mainChain_Condensed: [6, 5, 4, 3, 2, 1],
    mainChain_Expanded: [6, 5, 4, 3, 2, 1],
    mainChain3D: [2, 1, 3, 5, 6, 4],
    mainChain_Skeletal: [6, 5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { 254 60 -965 13.45} 100.0 0.0 0.0 {0.16382142857142856 -0.08611428571428571 -0.00005714285714287464} 5.344100830590377 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  chlorobutane_1: {
    formula: "CH3CH2CH2CH2Cl",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [4, 2, 3, 5],
    mainChain_Skeletal: [4, 3, 2, 1],
    moveto:
      "moveto 0.0 { 748 92 -657 5.43} 132.25 0.0 0.0 {-0.6320928571428572 0.07022142857142856 -0.0014999999999999853} 5.321491144115054 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  bromopropane_2: {
    formula: "CH3CH(Br)CH3",
    mainChain_Condensed: [1, 2, 3],
    mainChain_Expanded: [1, 2, 3],
    mainChain3D: [4, 2, 3],
    mainChain_Skeletal: [4, 2, 1],
    moveto:
      "moveto 0.0 { -674 663 326 143.87} 100.0 0.0 0.0 {-0.5439636363636364 0.00012727272727271327 -0.019936363636363603} 4.389998932061536 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  bromo_4_butene_1: {
    formula: "CH2=CHCH2CH2Br",
    mainChain_Condensed: [1, 2, 3, 4],
    mainChain_Expanded: [1, 2, 3, 4],
    mainChain3D: [5, 4, 2, 3],
    mainChain_Skeletal: [1, 2, 3, 4],
    moveto:
      "moveto 0.0 { -98 -879 -467 177.78} 115.0 0.0 0.0 {0.42289166666666667 0.06189999999999997 0.0022750000000000084} 5.327011763850231 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  bromo_3_chloropentane_1: {
    formula: "CH3CH2CH(Br)CH2CH2Cl",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [6, 4, 3, 5, 7],
    mainChain_Skeletal: [6, 5, 3, 2, 1],
    moveto:
      "moveto 0.0 { -38 -980 -196 175.08} 115.0 0.0 0.0 {0.4578470588235295 0.33304117647058823 0.0710705882352941} 5.6706514010944264 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  bromo_2_chlorobutane_3: {
    formula: "CH3CH(Br)CH(Cl)CH3",
    mainChain_Condensed: [1, 2, 3, 4],
    mainChain_Expanded: [1, 2, 3, 4],
    mainChain3D: [5, 3, 4, 6],
    mainChain_Skeletal: [6, 4, 2, 1],
    moveto:
      "moveto 0.0 { -987 33 -157 110.6} 132.25 0.0 0.0 {0.2809357142857143 -0.5459142857142858 0.02150714285714288} 4.885284753863067 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanediol_1_2: {
    formula: "CH3CH(OH)CH2OH",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [4, 3, 5],
    mainChain_Skeletal: [4, 2, 1],
    moveto:
      "moveto 0.0 { -996 -78 52 48.13} 100.0 0.0 0.0 {-0.34616153846153846 0.16600769230769236 -0.015023076923076934} 3.989388932527346 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanedioic_acid: {
    formula: "HOOCCH2COOH",
    mainChain_Condensed: [2, 1, 5],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [6, 5, 7],
    mainChain_Skeletal: [2, 4, 5],
    moveto:
      "moveto 0.0 { 996 83 -9 9.63} 100.0 0.0 0.0 {0.0013181818181818143 0.3129818181818182 0.0017727272727272717} 4.396995191588708 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanetriol: {
    formula: "CH2(OH)CH(OH)CH2OH",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [5, 4, 6],
    mainChain_Skeletal: [2, 3, 5],
    moveto:
      "moveto 0.0 { 1000 8 4 59.4} 100.0 0.0 0.0 {-0.06002857142857147 0.21227857142857137 0.17838571428571426} 4.342661921737165 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  dichlorobutane_2_2: {
    formula: "CH3C(Cl)2CH2CH3",
    mainChain_Condensed: [1, 2, 3, 4],
    mainChain_Expanded: [1, 2, 3, 4],
    mainChain3D: [5, 3, 4, 6],
    mainChain_Skeletal: [1, 2, 5, 6],
    moveto:
      "moveto 0.0 { 242 970 2 9.89} 100.0 0.0 0.0 {0.2790142857142857 0.00020714285714286605 -0.4407} 4.160085917485747 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  trichloropentane_1_1_2: {
    formula: "CH3CH2CH2CH(Cl)CHCl2",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain3D: [7, 5, 4, 6, 8],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    moveto:
      "moveto 0.0 { -46 -108 993 178.15} 115.0 0.0 0.0 {1.0008411764705885 0.1231764705882353 -0.19661176470588237} 6.006412446865542 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  hydroxypropanoic_acid_2: {
    formula: "CH3CH(OH)COOH",
    mainChain_Condensed: [4, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [6, 4, 5],
    mainChain_Skeletal: [4, 2, 1],
    moveto:
      "moveto 0.0 { 959 279 -59 133.43} 100.0 0.0 0.0 {-0.33398333333333335 -0.3167499999999999 0.01656666666666667} 4.027161258321774 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  hydroxybutanenitrile_2: {
    formula: "CH3CH2CH(OH)CN",
    mainChain_Condensed: [5, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [6, 4, 3, 5],
    mainChain_Skeletal: [5, 3, 2, 1],
    moveto:
      "moveto 0.0 { -87 -278 -957 175.69} 115.0 0.0 0.0 {0.6581923076923077 -0.031615384615384656 0.0765153846153846} 4.633466587478547 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  Oxopropanoic_acid: {
    formula: "CH3COCOOH",
    mainChain_Condensed: [4, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [6, 4, 5],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 { 153 -987 52 179.04} 100.0 0.0 0.0 {0.32159 0.30856000000000006 0.0029900000000000013} 4.1796362556191315 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  aminobutanoic_acid_3: {
    formula: "CH3CH(NH2)CH2COOH",
    mainChain_Condensed: [5, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [7, 5, 4, 6],
    mainChain_Skeletal: [5, 4, 2, 1],
    moveto:
      "moveto 0.0 { 996 44 76 43.25} 100.0 0.0 0.0 {-0.45260624999999993 -0.11909375 0.118325} 4.631305652838745 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  hydroxypropanenitrile_2: {
    formula: "CH3CH(OH)CN",
    mainChain_Condensed: [4, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain3D: [5, 3, 4],
    mainChain_Skeletal: [3, 2, 1],
    moveto:
      "moveto 0.0 { -947 -233 -222 121.27} 115.0 0.0 0.0 {-0.5775 -0.23924000000000004 0.07578000000000001} 4.472712277014008 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  oxobutanoic_acid: {
    formula: "O=CHCH2CH2COOH",
    mainChain_Condensed: [5, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain3D: [6, 4, 5, 7],
    mainChain_Skeletal: [2, 3, 5, 6],
    moveto:
      "moveto 0.0 { 153 -987 52 179.04} 100.0 0.0 0.0 {0.11022307692307687 0.09013846153846156 -0.002015384615384622} 4.715473262911911 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  dihydroxybutanedioic_acid_2_3: {
    formula: "HOOCCH(OH)CH(OH)COOH",
    mainChain_Condensed: [8, 2, 1, 5],
    mainChain_Expanded: [6, 5, 2, 1],
    mainChain3D: [10, 8, 7, 9],
    mainChain_Skeletal: [5, 4, 3, 2],
    moveto:
      "moveto 0.0 { -96 -48 -994 179.82} 100.0 0.0 0.0 {0.00010624999999997442 0.07223125000000001 -0.013687499999999991} 4.739415414114579 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  ethanol: {
    formula: "CH3CH2OH",
    mainChain_Condensed: [2, 1],
    mainChain_Expanded: [2, 1],
    mainChain_Skeletal: [2, 1],
    mainChain3D: [2, 3],
    moveto:
      "moveto 0.0 { -56 994 -89 178.0} 115.0 0.0 0.0 {0.3654555555555556 -0.011722222222222214 0.08863333333333333} 3.2703980274730853 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  propanone: {
    formula: "CH3COCH3",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain_Skeletal: [3, 2, 1],
    mainChain3D: [3, 2, 4],
    moveto:
      "moveto 0.0 {0 0 1 0} 100.0 0.0 0.0 {-0.0001200000000000534 0.53408 -0.00015999999999999348} 3.5511800480774416 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  butanone: {
    formula: "CH3CH2COCH3",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain_Skeletal: [4, 3, 2, 1],
    mainChain3D: [5, 3, 2, 4],
    moveto:
      "moveto 0.0 { 872 -443 209 2.75} 100.0 0.0 0.0 {-0.1591384615384615 0.3527615384615385 -0.002230769230769233} 4.0313838970310725 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  nitroethane: {
    formula: "CH3CH2NO2",
    mainChain_Condensed: [2, 1],
    mainChain_Expanded: [2, 1],
    mainChain_Skeletal: [2, 1],
    mainChain3D: [4, 5],
    moveto:
      "moveto 0.0 { -266 -961 76 10.76} 100.0 0.0 0.0 {-0.80876 0.006739999999999981 -0.03645} 3.8825827699539825 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  nitropropane_2: {
    formula: "CH3CH(NO2)CH3",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain_Skeletal: [3, 2, 1],
    mainChain3D: [6, 4, 5],
    moveto:
      "moveto 0.0 { 436 401 -806 102.19} 100.0 0.0 0.0 {-0.7402 -0.0005846153846154739 -0.048838461538461594} 4.212636983059641 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  // Branched Hydrocarbones
  methyl_2_pentane: {
    formula: "CH3CH(CH3)CH2CH2CH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
    moveto: "moveto 0.0 { -993 107 40 170.04} 69.57 0.0 0.0 {0.018154999999999945 0.015150000000000045 0.04406499999999999} 4.830360556026081 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  dimethyl_2_3_butane: {
    formula: "CH3CH(CH3)CH(CH3)CH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
  },

  methyl_2_propene: {
    formula: "CH2=C(CH3)2",
    mainChain_Condensed: [3, 2, 1],
    mainChain_Expanded: [3, 2, 1],
    mainChain_Skeletal: [3, 2, 1],
    // PubChem CID 8255: 4=CH2, 1=C, 2/3=CH3.
    mainChain3D: [4, 1, 2],
  },

  methyl_3_butene_1: {
    formula: "CH2=CHCH(CH3)CH3",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain_Skeletal: [4, 3, 2, 1],
    // PubChem CID 11239: terminal CH2=5, alkene CH=4, branched CH=1.
    mainChain3D: [5, 4, 1, 2],
  },

  // Local trial: 3-ethyl-2,5-dimethylhex-2-ene; C1..C6 parent chain.
  ethyl_3_dimethyl_2_5_hexene_2: {
    formula: "CH3C(CH3)=C(CH2CH3)CH2CH(CH3)CH3",
    mainChain_Condensed: [1, 2, 3, 4, 5, 6],
    mainChain_Expanded: [1, 2, 3, 4, 5, 6],
    mainChain_Skeletal: [1, 2, 3, 4, 5, 6],
    // PubChem CID 56988951. Methyl C10/C7; ethyl C4-C8.
    mainChain3D: [9, 5, 3, 2, 1, 6],
  },

  // 3-ethyl-2,5-dimethylhexane; C1..C6 horizontal parent chain.
  ethyl_3_dimethyl_2_5_hexane: {
    formula: "CH3CH(CH3)CH(CH2CH3)CH2CH(CH3)CH3",
    mainChain_Condensed: [1, 2, 3, 4, 5, 6],
    mainChain_Expanded: [1, 2, 3, 4, 5, 6],
    mainChain_Skeletal: [1, 2, 3, 4, 5, 6],
    // PubChem CID 521421, graph-matched to the local 2D structure.
    mainChain3D: [6, 3, 1, 2, 4, 8],
  },

  //Ethers
  ethyl_methyl_ether: {
    formula: "CH3OCH2CH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
    // moveto: "moveto 0.0 { -993 107 40 170.04} 69.57 0.0 0.0 {0.018154999999999945 0.015150000000000045 0.04406499999999999} 4.830360556026081 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  dimethylether: {
    formula: "CH3OCH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
    // moveto: "moveto 0.0 { -993 107 40 170.04} 69.57 0.0 0.0 {0.018154999999999945 0.015150000000000045 0.04406499999999999} 4.830360556026081 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  diethyl_ether: {
    formula: "CH3CH2OCH2CH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
  },

  isopropyl_methyl_ether: {
    formula: "CH3OCH(CH3)CH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
  },

  //// ESTERS
  ethanoic_methyl_ester: {
    formula: "CH3COOCH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
    moveto: "moveto 0.0 { 23 -25 999 179.99} 69.57 0.0 0.0 {-0.06443636363636365 0.21650909090909093 -0.00010909090909091726} 3.8970839838672164 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },
  
  propanoic_methyl_ester: {
    formula: "CH3CH2COOCH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
    // moveto: "moveto 0.0 { -993 107 40 170.04} 69.57 0.0 0.0 {0.018154999999999945 0.015150000000000045 0.04406499999999999} 4.830360556026081 {0 0 0} 0 0 0 3.0 0.0 0.0;",
  },

  methyl_methanoate: {
    formula: "HCOOCH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
  },

  isopropyl_ethanoate: {
    formula: "CH3COOCH(CH3)CH3",
    mainChain_Condensed: [],
    mainChain_Expanded: [],
    mainChain_Skeletal: [],
    mainChain3D: [],
  },
};

let methane_2D_Condensed =
  "C\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  1  0  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "M  END\n" +
  "$$$$\n";

let ethane_2D_Condensed =
  "CC\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  2  1  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propane_2D_Condensed =
  "CCC\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butane_2D_Condensed =
  "CCCC\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let pentane_2D_Condensed =
  "CCCCC\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let ethene_2D_Condensed =
  "C=C\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  2  1  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propene_2D_Condensed =
  "CC=C\n" +
  "  ChemDraw02242415252D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propadiene_2D_Condensed =
  "C=C=C\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  2  3  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let ethanal_2D_Condensed =
  "CC=O\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  1  3  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butanal_2D_Condensed =
  "CCCC=O\n" +
  "  ChemDraw02242415252D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let methanoicacid_2D_Condensed =
  "C(=O)O\n" +
  "  ChemDraw02242415252D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.2062    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.7145   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.7145   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  1  3  1  0      \n" +
  "M  STY  1   1 SUP\n" +
  "M  SLB  1   1   1\n" +
  "M  SAL   1  3   1   2   3\n" +
  "M  SMT   1 HC^OOH\n" +
  "M  END\n" +
  "$$$$\n";

let propionicacid_2D_Condensed =
  "CCC(=O)O\n" +
  "  ChemDraw02062422462D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.0313   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.6188   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.0313    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.0313   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
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

let ethanenitrile_2D_Condensed =
  "CC#N\n" +
  "  ChemDraw02242415252D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  3  0      \n" +
  "M  STY  1   1 SUP\n" +
  "M  SLB  1   1   1\n" +
  "M  SAL   1  2   2   3\n" +
  "M  SBL   1  1   1\n" +
  "M  SMT   1 C^N\n" +
  "M  SBV   1   1   -0.8250    0.0000\n" +
  "M  END\n" +
  "$$$$\n";

let butanenitrile_2D_Condensed =
  "CCCC#N\n" +
  "  ChemDraw02242415252D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.7491    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.9241    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.0991    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.9241    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.7491    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  3  0      \n" +
  "M  STY  1   1 SUP\n" +
  "M  SLB  1   1   1\n" +
  "M  SAL   1  2   4   5\n" +
  "M  SBL   1  1   3\n" +
  "M  SMT   1 C^N\n" +
  "M  SBV   1   3   -1.0232    0.0000\n" +
  "M  END\n" +
  "$$$$\n" +
  "\n";

let methane_2D_Expanded =
  "C\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  1  3  1  0      \n" +
  "  1  4  1  0      \n" +
  "  1  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let ethane_2D_Expanded =
  "CC\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  2  4  1  0      \n" +
  "  2  5  1  0      \n" +
  "  1  6  1  0      \n" +
  "  1  7  1  0      \n" +
  "  1  8  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propane_2D_Expanded =
  "CCC\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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
  "  2  6  1  0      \n" +
  "  2  7  1  0      \n" +
  "  3  8  1  0      \n" +
  "  3  9  1  0      \n" +
  "  4 10  1  0      \n" +
  "  4 11  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butane_2D_Expanded =
  "CCCC\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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
  "  5  6  1  0      \n" +
  "  2  7  1  0      \n" +
  "  2  8  1  0      \n" +
  "  3  9  1  0      \n" +
  "  3 10  1  0      \n" +
  "  4 11  1  0      \n" +
  "  4 12  1  0      \n" +
  "  5 13  1  0      \n" +
  "  5 14  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let pentane_2D_Expanded =
  "CCCCC\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  " 17 16  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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
  "  5 15  1  0      \n" +
  "  5 16  1  0      \n" +
  "  5 17  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let ethene_2D_Expanded =
  "C=C\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  1  3  1  0      \n" +
  "  1  4  1  0      \n" +
  "  2  5  1  0      \n" +
  "  2  6  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propene_2D_Expanded =
  "CC=C\n" +
  "  ChemDraw02242415372D\n" +
  "\n" +
  "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  2  0      \n" +
  "  1  4  1  0      \n" +
  "  1  5  1  0      \n" +
  "  1  6  1  0      \n" +
  "  2  7  1  0      \n" +
  "  3  8  1  0      \n" +
  "  3  9  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propadiene_2D_Expanded =
  "C=C=C\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  2  3  2  0      \n" +
  "  1  4  1  0      \n" +
  "  1  5  1  0      \n" +
  "  3  6  1  0      \n" +
  "  3  7  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let ethanal_2D_Expanded =
  "CC=O\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  2  0      \n" +
  "  2  4  1  0      \n" +
  "  1  5  1  0      \n" +
  "  1  6  1  0      \n" +
  "  1  7  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butanal_2D_Expanded =
  "CCCC=O\n" +
  "  ChemDraw02242415372D\n" +
  "\n" +
  " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  2  0      \n" +
  "  1  6  1  0      \n" +
  "  1  7  1  0      \n" +
  "  1  8  1  0      \n" +
  "  2  9  1  0      \n" +
  "  2 10  1  0      \n" +
  "  3 11  1  0      \n" +
  "  3 12  1  0      \n" +
  "  4 13  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let methanoicacid_2D_Expanded =
  "C(=O)O\n" +
  "  ChemDraw02242415372D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.4125    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  1  3  1  0      \n" +
  "  1  4  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propionicacid_2D_Expanded =
  "CCC(=O)O\n" +
  "  ChemDraw02062422282D\n" +
  "\n" +
  " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  3  5  2  0      \n" +
  "  2  6  1  0      \n" +
  "  2  7  1  0      \n" +
  "  1  8  1  0      \n" +
  "  1  9  1  0      \n" +
  "  1 10  1  0      \n" +
  "M  END\n" +
  "$$$$\n" +
  "\n";

let ethanenitrile_2D_Expanded =
  "CC#N\n" +
  "  ChemDraw02242415372D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  1  3  1  0      \n" +
  "  1  4  1  0      \n" +
  "  1  5  1  0      \n" +
  "  2  6  3  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butanenitrile_2D_Expanded =
  "CCCC#N\n" +
  "  ChemDraw02242415372D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  3  0      \n" +
  "  1  6  1  0      \n" +
  "  1  7  1  0      \n" +
  "  1  8  1  0      \n" +
  "  2  9  1  0      \n" +
  "  2 10  1  0      \n" +
  "  3 11  1  0      \n" +
  "  3 12  1  0      \n" +
  "M  END\n" +
  "$$$$\n" +
  "\n";

let butene_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propanol_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let penten_4_ol_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  2  0      \n" +
  "  2  6  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let penten_1_one_3_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.7491    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.9241    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.0991    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.7259    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.7491    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.0991   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  2  0      \n" +
  "  3  6  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butanol_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let pentanone_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "  4  6  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butene_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  2  0      \n" +
  "  3  4  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let pentadiene_1_3_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  2  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propyne_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  3  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propanal_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let butanoic_acid_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.4438   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.6188   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.2062   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.0313   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanenitrile_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butene_3_ol_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  3  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propenoic_acid_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.0313   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.6188   -0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propynal_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  3  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let buten_1_yne_3_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  3  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let hexen_2_yne_4_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  3  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  2  0      \n" +
  "  5  6  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let penten_3_yne_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  3  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  2  0      \n" +
  "  4  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let chlorobutane_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let bromopropane_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.4125    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  2  4  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let bromo_4_butene_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let bromo_3_chloropentane_1_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let bromo_2_chlorobutane_3_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.4125    0.0000 Br  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.4125    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  2  5  1  0      \n" +
  "  3  6  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propanediol_1_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  2  4  1  0      \n" +
  "  3  5  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propanetriol_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanedioic_acid_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375   -0.7145    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let dichlorobutane_2_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.8250    0.0000 Cl  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  2  5  1  0      \n" +
  "  2  6  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let hydroxypropanoic_acid_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.0313    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.6188    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hydroxybutanenitrile_2_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let Oxopropanoic_acid_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.0313    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.6188    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let aminobutanoic_acid_3_2D_Condensed =
  "nomenclature_moc2-1.cdx\n" +
  "  ChemDraw03012409162D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.4438    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.6188    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.2062    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.6188   -0.7697    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.0313    0.0553    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentanoic_acid_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.7531   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.9281   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.1031   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.7219   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.3406   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentanal_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "  5  6  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let penten_2_ol_1_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  2  0      \n" +
  "  4  5  1  0      \n" +
  "  5  6  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let pentyn_4_one_2_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  3  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "  4  6  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let hexen_1_yne_4_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  3  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "  5  6  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let trichloropentane_1_1_2_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hydroxypropanenitrile_2_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let oxobutanoic_acid_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.4438    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.6188    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.2062    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.4438   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.0313    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let dihydroxybutanedioic_acid_2_3_2D_Condensed =
  "nomenclature_moc2-1b.cdx\n" +
  "  ChemDraw03272422322D\n" +
  "\n" +
  " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500   -0.6592    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.6500    0.7697    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0553    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butanone_2D_Condensed =
  "nomenclature_moc2-1c.sdf\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  3  5  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let ethanol_2D_Condensed =
  "nomenclature_moc2-1c.sdf\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "M  END\n" +
  "$$$$\n";

let propanone_2D_Condensed =
  "nomenclature_moc2-1c.sdf\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  2  4  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let nitroethane_2D_Condensed =
  "nomenclature_moc2-1c.sdf\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.0313   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.2062   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let nitropropane_2_2D_Condensed =
  "nomenclature_moc2-1c.sdf\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butene_1_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propanol_1_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let penten_4_ol_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let penten_1_one_3_2D_Skeletal =
  "nomenclature_moc2-2b.cdx\n" +
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

let butanol_1_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let pentanone_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let butene_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let pentadiene_1_3_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propyne_2D_Skeletal =
  "nomenclature_moc2-2b.cdx\n" +
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

let propanal_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let butanoic_acid_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propanenitrile_2D_Skeletal =
  "nomenclature_moc2-2b.cdx\n" +
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

let butene_3_ol_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propenoic_acid_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propynal_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let buten_1_yne_3_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let hexen_2_yne_4_2D_Skeletal =
  "nomenclature_moc2-2b.cdx\n" +
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

let penten_3_yne_1_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let chlorobutane_1_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let bromopropane_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let bromo_4_butene_1_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let bromo_3_chloropentane_1_2D_Skeletal =
  "nomenclature_moc2-2b.cdx\n" +
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

let bromo_2_chlorobutane_3_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propanediol_1_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propanedioic_acid_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let propanetriol_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let dichlorobutane_2_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let hydroxypropanoic_acid_2_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let hydroxybutanenitrile_2_2D_Skeletal =
  "nomenclature_moc2-2b.cdx\n" +
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

let Oxopropanoic_acid_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let aminobutanoic_acid_3_2D_Skeletal =
  "nomenclature_moc2-2.cdx\n" +
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

let pentanoic_acid_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let pentanal_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let penten_2_ol_1_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let pentyn_4_one_2_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
  "  ChemDraw03272423522D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.5526    0.7328    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.7557    0.5193    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0412    0.3057    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8381    0.0922    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.5526    0.5047    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8381   -0.7328    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  3  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "  4  6  2  0      \n" +
  "M  END\n" +
  "$$$$\n";

let hexen_1_yne_4_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let trichloropentane_1_1_2_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let hydroxypropanenitrile_2_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let oxobutanoic_acid_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let dihydroxybutanedioic_acid_2_3_2D_Skeletal =
  "nomenclature_moc2-2c.cdx\n" +
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

let ethanol_2D_Skeletal =
  "Untitled Document-2\n" +
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

let propanone_2D_Skeletal =
  "Untitled Document-2\n" +
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

let butanone_2D_Skeletal =
  "Untitled Document-2\n" +
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

let nitroethane_2D_Skeletal =
  "Untitled Document-2\n" +
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

let nitropropane_2_2D_Skeletal =
  "Untitled Document-2\n" +
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

let butene_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanol_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let penten_4_ol_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 15 14  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let penten_1_one_3_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butanol_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentanone_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butene_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentadiene_1_3_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propyne_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanal_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butanoic_acid_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanenitrile_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butene_3_ol_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propenoic_acid_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propynal_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let buten_1_yne_3_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hexen_2_yne_4_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let penten_3_yne_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let chlorobutane_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let bromopropane_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let bromo_4_butene_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let bromo_3_chloropentane_1_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 17 16  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let bromo_2_chlorobutane_3_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C  0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanediol_1_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanedioic_acid_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanetriol_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let dichlorobutane_2_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hydroxypropanoic_acid_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hydroxybutanenitrile_2_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let Oxopropanoic_acid_2D_Expanded =
  "Untitled Document-2\n" +
  "  ChemDraw03222400352D\n" +
  "\n" +
  "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let aminobutanoic_acid_3_2D_Expanded =
  "nomenclature_moc2-3.cdx\n" +
  "  ChemDraw03212423462D\n" +
  "\n" +
  " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentanoic_acid_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentanal_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let penten_2_ol_1_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 15 14  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let pentyn_4_one_2_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hexen_1_yne_4_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let trichloropentane_1_1_2_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 16 15  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.0625    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let hydroxypropanenitrile_2_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  "  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let oxobutanoic_acid_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let dihydroxybutanedioic_acid_2_3_2D_Expanded =
  "nomenclature_moc2-1b_2D.sdf\n" +
  "  ChemDraw03272422462D\n" +
  "\n" +
  " 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -2.0625    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.2375   -0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let ethanol_2D_Expanded =
  "nomenclature_moc2-3c_2D.cdx\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  "  8  7  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let butanone_2D_Expanded =
  "nomenclature_moc2-3c_2D.cdx\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let propanone_2D_Expanded =
  "nomenclature_moc2-3c_2D.cdx\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let nitroethane_2D_Expanded =
  "nomenclature_moc2-3c_2D.cdx\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  " 10  9  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.6188    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.2062    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let nitropropane_2_2D_Expanded =
  "nomenclature_moc2-3c_2D.cdx\n" +
  "  ChemDraw04102417352D\n" +
  "\n" +
  " 13 12  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.8250    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
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

let ethane_2D_Skeletal =
  "CC\n" +
  "JME 2024-04-29 Sun May 10 13:39:03 GMT+300 2026\n" +
  "\n" +
  "  2  1  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.3997    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0  0  0  0\n" +
  "M  END\n";

let propane_2D_Skeletal =
  "CCC\n" +
  "JME 2024-04-29 Sun May 10 13:32:08 GMT+300 2026\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    2.4249    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2124    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  2  1  1  0  0  0  0\n" +
  "  3  2  1  0  0  0  0\n" +
  "M  END\n" +
  "\n";

let butane_2D_Skeletal =
  "CCCC\n" +
  "JME 2024-04-29 Sun May 10 13:40:46 GMT+300 2026\n" +
  "\n" +
  "  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
  "    3.6373    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4249    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2124    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  2  1  1  0  0  0  0\n" +
  "  3  2  1  0  0  0  0\n" +
  "  4  3  1  0  0  0  0\n" +
  "M  END\n";

let pentane_2D_Skeletal =
  "CCCCC\n" +
  "JME 2024-04-29 Sun May 10 13:41:45 GMT+300 2026\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "    3.6373    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4249    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2124    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    4.8498    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  2  1  1  0  0  0  0\n" +
  "  3  2  1  0  0  0  0\n" +
  "  4  3  1  0  0  0  0\n" +
  "  1  5  1  0  0  0  0\n" +
  "M  END\n";

let ethene_2D_Skeletal =
  "C=C\n" +
  "JME 2024-04-29 Sun May 10 13:57:34 GMT+300 2026\n" +
  "\n" +
  "  2  1  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.4000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0  0  0  0\n" +
  "M  END\n";

let propene_2D_Skeletal =
  "CC=C\n" +
  "JME 2024-04-29 Sun May 10 20:06:43 GMT+300 2026\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    1.2124    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4248    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0  0  0  0\n" +
  "  1  3  1  0  0  0  0\n" +
  "M  END\n" +
  "\n";

let propadiene_2D_Skeletal =
  "C=C=C\n" +
  "JME 2024-04-29 Sun May 10 20:08:49 GMT+300 2026\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.4000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.8000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  2  1  2  0  0  0  0\n" +
  "  3  2  2  0  0  0  0\n" +
  "M  END\n";

let methanoicacid_2D_Skeletal =
  "OC=O\n" +
  "JME 2024-04-29 Sun May 10 20:11:33 GMT+300 2026\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    1.2124    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4248    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0  0  0  0\n" +
  "  1  3  1  0  0  0  0\n" +
  "M  END\n";

let ethanal_2D_Skeletal =
  "CC=O\n" +
  "JME 2024-04-29 Sun May 10 20:16:23 GMT+300 2026\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    1.2124    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4248    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  2  0  0  0  0\n" +
  "  1  3  1  0  0  0  0\n" +
  "M  END\n" +
  "\n";

let ethanenitrile_2D_Skeletal =
  "CC#N\n" +
  "JME 2024-04-29 Sun May 10 20:18:21 GMT+300 2026\n" +
  "\n" +
  "  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
  "    1.4000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.8000    0.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  3  0  0  0  0\n" +
  "  1  3  1  0  0  0  0\n" +
  "M  END\n";

let propionicacid_2D_Skeletal =
  "CCC(=O)O\n" +
  "JME 2024-04-29 Sun May 10 20:23:29 GMT+300 2026\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "    2.4249    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    3.6373    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4249    2.1000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2124    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0  0  0  0\n" +
  "  1  3  2  0  0  0  0\n" +
  "  1  4  1  0  0  0  0\n" +
  "  4  5  1  0  0  0  0\n" +
  "M  END\n" +
  "\n";

let butanal_2D_Skeletal =
  "CCCC=O\n" +
  "JME 2024-04-29 Sun May 10 20:26:14 GMT+300 2026\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "    3.6373    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4249    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    4.8498    0.7000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  2  1  1  0  0  0  0\n" +
  "  3  2  1  0  0  0  0\n" +
  "  4  3  1  0  0  0  0\n" +
  "  1  5  2  0  0  0  0\n" +
  "M  END\n";

let butanenitrile_2D_Skeletal =
  "CCCC#N\n" +
  "JME 2024-04-29 Sun May 10 20:27:35 GMT+300 2026\n" +
  "\n" +
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
  "    3.6373    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.4249    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.2125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000    0.7000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    4.8498    0.7000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  2  1  1  0  0  0  0\n" +
  "  3  2  1  0  0  0  0\n" +
  "  4  3  1  0  0  0  0\n" +
  "  1  5  3  0  0  0  0\n" +
  "M  END\n";

  //// Branced Molecules 23-09-26
  let methyl_2_pentane_2D_Condensed =
  "CCCC(C)C\n" +
  "  ChemDraw09232616462D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -1.6500   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.0000   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.8250   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.8250    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.6500   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  3  4  1  0      \n" +
  "  2  5  1  0      \n" +
  "  4  6  1  0      \n" +
  "M  END\n";

let methyl_2_pentane_2D_Expanded =
 "CCCC(C)C\n" +
	"  ChemDraw09282620572D\n" +
	"\n" +
	" 20 19  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.6500   -0.3713    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250   -0.3713    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000   -0.3713    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250   -0.3713    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250    0.4537    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500   -0.3713    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500    0.2475    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500   -0.9900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -2.2687   -0.3713    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250   -0.9900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000   -0.9900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.2475    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250   -0.9900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250    0.2475    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    2.2687   -0.3713    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500    0.2475    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500   -0.9900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.3332    0.4537    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.3168    0.4537    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250    0.9900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"  3  4  1  0      \n" +
	"  2  5  1  0      \n" +
	"  4  6  1  0      \n" +
	"  1  7  1  0      \n" +
	"  1  8  1  0      \n" +
	"  1  9  1  0      \n" +
	"  2 10  1  0      \n" +
	"  3 11  1  0      \n" +
	"  3 12  1  0      \n" +
	"  4 13  1  0      \n" +
	"  4 14  1  0      \n" +
	"  6 15  1  0      \n" +
	"  6 16  1  0      \n" +
	"  6 17  1  0      \n" +
	"  5 18  1  0      \n" +
	"  5 19  1  0      \n" +
	"  5 20  1  0      \n" +
	"M  END\n" +
	"\n";

let methyl_2_pentane_2D_Skeletal =
  "CCCC(C)C\n" +
  "  ChemDraw09232616482D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "   -0.7145    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "   -0.0000   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0      \n" +
  "  2  3  1  0      \n" +
  "  2  4  1  0      \n" +
  "  4  5  1  0      \n" +
  "  5  6  1  0      \n" +
  "M  END\n";

let dimethyl_2_3_butane_2D_Condensed =
  "dimethyl_2_3_butane_2D_Condensed.mol\n"+
  "  ChemDraw10152618512D\n"+
  "\n"+
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -1.2740   -0.0066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.4490    0.0026    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4490   -0.0026    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.2740   -0.0066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.4479   -0.8224    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4327    0.8224    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  3  4  1  0      \n"+
  "  2  5  1  0      \n"+
  "  3  6  1  0      \n"+
  "M  END\n"+
  "\n";

let dimethyl_2_3_butane_2D_Expanded =
  "dimethyl_2_3_butane_2D_Expanded.mol\n"+
  "  ChemDraw10152618582D\n"+
  "\n"+
  " 20 19  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -1.6988   -0.0089    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.5987    0.0033    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.5987   -0.0037    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6988   -0.0089    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.5972   -1.0968    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.5976    1.0964    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -2.5238   -0.0097    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6846    0.8161    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6923   -0.7790    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    2.5238    0.0108    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6972   -0.8338    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6949    0.7611    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.6065    1.9214    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.1725    1.0900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.3554    1.0954    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.5923   -1.9214    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.3672   -1.0932    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.1727   -1.0867    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.6009    0.8283    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.5943   -0.8287    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  3  4  1  0      \n"+
  "  2  5  1  0      \n"+
  "  3  6  1  0      \n"+
  "  1  7  1  0      \n"+
  "  1  8  1  0      \n"+
  "  1  9  1  0      \n"+
  "  4 10  1  0      \n"+
  "  4 11  1  0      \n"+
  "  4 12  1  0      \n"+
  "  6 13  1  0      \n"+
  "  6 14  1  0      \n"+
  "  6 15  1  0      \n"+
  "  5 16  1  0      \n"+
  "  5 17  1  0      \n"+
  "  5 18  1  0      \n"+
  "  2 19  1  0      \n"+
  "  3 20  1  0      \n"+
  "M  END\n"+
  "\n";

let dimethyl_2_3_butane_2D_Skeletal =
  "KingDraw KingDraw.mol\n" +
  "KingDraw2D\n" +
  "\n" +
  "  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
  "    0.8533   -3.1443    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.5288   -3.5343    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.2043   -3.1443    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.8798   -3.5343    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    1.5291   -4.3143    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "    2.2040   -2.3643    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
  "  1  2  1  0\n" +
  "  2  3  1  0\n" +
  "  3  4  1  0\n" +
  "  2  5  1  0\n" +
  "  3  6  1  0\n" +
  "M  END\n"+
  "\n";

let ethyl_methyl_ether_2D_Condensed = 
  "CCOC\n" +
	"  ChemDraw09292618412D\n" +
	"\n" +
	"  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.4125    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"  3  4  1  0      \n" +
	"M  END\n";

  let ethyl_methyl_ether_2D_Skeletal = "CCOC\n" +
	"  ChemDraw09292620182D\n" +
	"\n" +
	"  4  3  0  0  0  0  0  0  0  0999 V2000\n" +
	"    1.0717    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.3572    0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"  3  4  1  0      \n" +
	"M  END\n";

  let ethyl_methyl_ether_2D_Expanded = "CCOC\n" +
	"  ChemDraw09292620182D\n" +
	"\n" +
	" 12 11  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.4125    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.4125    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.4125   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"  3  4  1  0      \n" +
	"  1  5  1  0      \n" +
	"  1  6  1  0      \n" +
	"  3  7  1  0      \n" +
	"  3  8  1  0      \n" +
	"  4  9  1  0      \n" +
	"  4 10  1  0      \n" +
	"  4 11  1  0      \n" +
	"  1 12  1  0      \n" +
	"M  END\n" +
	"\n";

  let dimethylether_2D_Condensed = "COC\n" +
	"  ChemDraw09302610432D\n" +
	"\n" +
	"  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"M  END\n";

let dimethylether_2D_Expanded = "COC\n" +
	"  ChemDraw09302610492D\n" +
	"\n" +
	"  9  8  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"  1  4  1  0      \n" +
	"  1  5  1  0      \n" +
	"  1  6  1  0      \n" +
	"  3  7  1  0      \n" +
	"  3  8  1  0      \n" +
	"  3  9  1  0      \n" +
	"M  END\n";

  let dimethylether_2D_Skeletal = "COC\n" +
	"  ChemDraw09302610502D\n" +
	"\n" +
	"  3  2  0  0  0  0  0  0  0  0999 V2000\n" +
	"    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"M  END\n";

  

  let ethanoic_methyl_ester_2D_Condensed = "CC(=O)OC\n" +
	"  ChemDraw09302616322D\n" +
	"\n" +
	"  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.2375   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.4125   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.4125    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.4125   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  2  0      \n" +
	"  2  4  1  0      \n" +
	"  4  5  1  0      \n" +
	"M  END\n" +
	"\n";

 let ethanoic_methyl_ester_2D_Expanded = "ethanoic_methyl_ester.mol\n" +
	"  ChemDraw09302618232D\n" +
	"\n" +
	" 11 10  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.4125    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.4125    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.4125    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.2375   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    2.0625    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  2  0      \n" +
	"  2  4  1  0      \n" +
	"  4  5  1  0      \n" +
	"  1  6  1  0      \n" +
	"  1  7  1  0      \n" +
	"  1  8  1  0      \n" +
	"  5  9  1  0      \n" +
	"  5 10  1  0      \n" +
	"  5 11  1  0      \n" +
	"M  END\n";

  let ethanoic_methyl_ester_2D_Skeletal = "propanoic_methyl_ester_DIAG.mol\n" +
	"  ChemDraw09302618212D\n" +
	"\n" +
	"  5  4  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.0717   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.3572   -0.2063    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.3572    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.3572   -0.6187    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  2  0      \n" +
	"  2  4  1  0      \n" +
	"  4  5  1  0      \n" +
	"M  END\n" +
	"\n";

  let propanoic_methyl_ester_2D_Condensed = "CCC(=O)OC\n" +
	"  ChemDraw09302616402D\n" +
	"\n" +
	"  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -0.8250   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  2  0      \n" +
	"  2  4  1  0      \n" +
	"  4  5  1  0      \n" +
	"  1  6  1  0      \n" +
	"M  END\n";

  let propanoic_methyl_ester_2D_Skeletal = "propanoic_methyl_ester_Diag.mol\n" +
	"  ChemDraw09302618212D\n" +
	"\n" +
	"  6  5  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -1.4289   -0.2063    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.7145   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000   -0.2063    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.7145   -0.6187    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  1  0      \n" +
	"  3  4  2  0      \n" +
	"  3  5  1  0      \n" +
	"  5  6  1  0      \n" +
	"M  END\n";

  let propanoic_methyl_ester_2D_Expanded = "propanoic_methyl_ester_EXP.mol\n" +
	"  ChemDraw09302618182D\n" +
	"\n" +
	" 14 13  0  0  0  0  0  0  0  0999 V2000\n" +
	"   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.0000    0.8250    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    0.8250    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n" +
	"  1  2  1  0      \n" +
	"  2  3  2  0      \n" +
	"  2  4  1  0      \n" +
	"  4  5  1  0      \n" +
	"  1  6  1  0      \n" +
	"  1  7  1  0      \n" +
	"  1  8  1  0      \n" +
	"  6  9  1  0      \n" +
	"  6 10  1  0      \n" +
	"  6 11  1  0      \n" +
	"  5 12  1  0      \n" +
	"  5 13  1  0      \n" +
	"  5 14  1  0      \n" +
	"M  END\n";

  


let diethyl_ether_2D_Condensed =
  "diethyl_ether_2D_Condensed.mol\n"+
  "  ChemDraw10152617342D\n"+
  "\n"+
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n"+
  "    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  1  4  1  0      \n"+
  "  4  5  1  0      \n"+
  "M  END\n"+
  "\n";

let diethyl_ether_2D_Expanded =
  "diethyl_ether_2D_Expanded.mol\n"+
  "  ChemDraw10152617352D\n"+
  "\n"+
  " 15 14  0  0  0  0  0  0  0  0999 V2000\n"+
  "    0.0000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8250    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8250   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    2.4750    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6500    0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6500   -0.8250    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  1  4  1  0      \n"+
  "  4  5  1  0      \n"+
  "  4  6  1  0      \n"+
  "  4  7  1  0      \n"+
  "  5  8  1  0      \n"+
  "  5  9  1  0      \n"+
  "  5 10  1  0      \n"+
  "  2 11  1  0      \n"+
  "  2 12  1  0      \n"+
  "  3 13  1  0      \n"+
  "  3 14  1  0      \n"+
  "  3 15  1  0      \n"+
  "M  END\n"+
  "\n";

let diethyl_ether_2D_Skeletal =
  "diethyl_ether_2D_Skeletal.mol\n"+
  "  ChemDraw10152617362D\n"+
  "\n"+
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.0000   -0.2062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.7145    0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.4289   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  3  4  1  0      \n"+
  "  4  5  1  0      \n"+
  "M  END\n"+
  "\n";

let isopropyl_methyl_ether_2D_Condensed =
  "isopropyl_methyl_ether_2D_Condensed.mol\n"+
  "  ChemDraw10152619132D\n"+
  "\n"+
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.4125   -0.4139    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4125   -0.4111    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.2375   -0.4122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.2375   -0.4106    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4109    0.4139    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  1  3  1  0      \n"+
  "  2  4  1  0      \n"+
  "  2  5  1  0      \n"+
  "M  END\n"+
  "\n";

let isopropyl_methyl_ether_2D_Expanded =
  "isopropyl_methyl_ether_2D_Condensed.mol\n"+
  "  ChemDraw10152619242D\n"+
  "\n"+
  " 15 14  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.4125   -0.4147    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4125   -0.4119    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.2375   -0.4130    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.2375   -0.4114    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4109    0.4131    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.2337    0.2057    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.2346   -1.0318    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.8562   -0.4070    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4141   -1.0307    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.4160    1.0318    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.2079    0.4148    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.9884    0.4113    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.8562   -0.4106    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.2368    0.2073    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.2381   -1.0302    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  1  3  1  0      \n"+
  "  2  4  1  0      \n"+
  "  2  5  1  0      \n"+
  "  3  6  1  0      \n"+
  "  3  7  1  0      \n"+
  "  3  8  1  0      \n"+
  "  2  9  1  0      \n"+
  "  5 10  1  0      \n"+
  "  5 11  1  0      \n"+
  "  5 12  1  0      \n"+
  "  4 13  1  0      \n"+
  "  4 14  1  0      \n"+
  "  4 15  1  0      \n"+
  "M  END\n"+
  "\n";

let isopropyl_methyl_ether_2D_Skeletal =
  "isopropyl_methyl_ether_2D_Skeletal.mol\n"+
  "  ChemDraw10152617572D\n"+
  "\n"+
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -1.0717   -0.2063    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.3572   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.3572    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.0717   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  3  4  1  0      \n"+
  "  3  5  1  0      \n"+
  "M  END\n"+
  "\n";

let methyl_methanoate_2D_Condensed =
  "methyl_methanoate_2D_Condensed.mol\n"+
  "  ChemDraw10152618172D\n"+
  "\n"+
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.4454   -0.4056    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.3795   -0.3942    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.2251   -0.4033    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.2251   -0.4088    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.4462    0.4088    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  1  4  1  0      \n"+
  "  5  1  2  0      \n"+
  "M  END\n"+
  "\n";

let methyl_methanoate_2D_Expanded =
  "methyl_methanoate_2D_Expanded.mol\n"+
  "  ChemDraw10152618172D\n"+
  "\n"+
  "  8  7  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.8836   -0.0634    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.0110   -0.0524    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8832   -0.0621    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.7082   -0.0656    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8639    0.7983    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8881    0.7175    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8807   -0.7983    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.7082   -0.0710    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  1  4  1  0      \n"+
  "  5  1  2  0      \n"+
  "  3  6  1  0      \n"+
  "  3  7  1  0      \n"+
  "  3  8  1  0      \n"+
  "M  END\n"+
  "\n";

let methyl_methanoate_2D_Skeletal =
  "methyl_methanoate_2D_Skeletal.mol\n"+
  "  ChemDraw10152617552D\n"+
  "\n"+
  "  5  4  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.3572   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.3572   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.0717   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.0717   -0.6188    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.3572    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  1  4  1  0      \n"+
  "  5  1  2  0      \n"+
  "M  END\n"+
  "\n";

let isopropyl_ethanoate_2D_Condensed =
  "isopropyl_ethanoate_2D_Condensed.mol\n"+
  "  ChemDraw10152618092D\n"+
  "\n"+
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.0035   -0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8286   -0.4076    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.6535   -0.4076    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.8272    0.3209    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8285   -0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.6535   -0.4124    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.8284    0.4125    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  2  3  1  0      \n"+
  "  2  4  1  0      \n"+
  "  1  5  1  0      \n"+
  "  5  6  1  0      \n"+
  "  5  7  2  0      \n"+
  "M  END\n"+
  "\n";

let isopropyl_ethanoate_2D_Expanded =
  "isopropyl_ethanoate_2D_Expanded.mol\n"+
  "  ChemDraw10152618152D\n"+
  "\n"+
  " 17 16  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -1.1227   -0.5978    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -2.4444   -0.5881    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.0879   -0.6062    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.3444   -0.6023    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.3420   -1.4325    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.3423    0.6077    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    2.4444   -0.6021    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.1241    0.5020    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -3.2692   -0.6079    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -2.4435    0.2369    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -2.4437   -1.4130    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    3.2692   -0.6058    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    2.4461    0.2229    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    2.4427   -1.4269    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.3569    1.4325    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.5173    0.5933    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    2.1671    0.6011    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  1  2  1  0      \n"+
  "  1  3  1  0      \n"+
  "  3  4  1  0      \n"+
  "  4  5  1  0      \n"+
  "  4  6  1  0      \n"+
  "  4  7  1  0      \n"+
  "  1  8  2  0      \n"+
  "  2  9  1  0      \n"+
  "  2 10  1  0      \n"+
  "  2 11  1  0      \n"+
  "  7 12  1  0      \n"+
  "  7 13  1  0      \n"+
  "  7 14  1  0      \n"+
  "  6 15  1  0      \n"+
  "  6 16  1  0      \n"+
  "  6 17  1  0      \n"+
  "M  END\n"+
  "\n";

let isopropyl_ethanoate_2D_Skeletal =
  "isopropyl_ethanoate_2D_Skeletal.mol\n"+
  "  ChemDraw10152617502D\n"+
  "\n"+
  "  7  6  0  0  0  0  0  0  0  0999 V2000\n"+
  "   -0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.7145    0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "   -0.0000   -0.6188    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.7145   -0.2062    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    1.4289   -0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "    0.7145    0.6188    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n"+
  "  2  1  2  0      \n"+
  "  1  3  1  0      \n"+
  "  1  4  1  0      \n"+
  "  4  5  1  0      \n"+
  "  5  6  1  0      \n"+
  "  5  7  1  0      \n"+
  "M  END\n"+
  "\n";
// ── MOL2D registry (T3 hardening, additive) ──────────────────────────
// Replaces eval(prop + "_2D_Condensed" / "_2D_Expanded" / "_2D_Skeletal") in fInitData.
window.MOL2D = window.MOL2D || {};
(function () {
  function reg(prop, condensed, expanded, skeletal) {
    window.MOL2D[prop] = { condensed: condensed, expanded: expanded, skeletal: skeletal };
  }
const methyl_3_butene_1_2D_Condensed = "methyl_3_butene_1_2D_Condensed.mol\n  Namelecule        2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  2  5  1  0  0  0  0\nM  END\n";
const methyl_3_butene_1_2D_Expanded = "methyl_3_butene_1_2D_Expanded.mol\n  Namelecule        2D\n\n 15 14  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5350    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5350    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.8149    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.3650   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1950   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  2  5  1  0  0  0  0\n  1  6  1  0  0  0  0\n  1  7  1  0  0  0  0\n  1  8  1  0  0  0  0\n  2  9  1  0  0  0  0\n  3 10  1  0  0  0  0\n  4 11  1  0  0  0  0\n  4 12  1  0  0  0  0\n  5 13  1  0  0  0  0\n  5 14  1  0  0  0  0\n  5 15  1  0  0  0  0\nM  END\n";
const methyl_3_butene_1_2D_Skeletal = "methyl_3_butene_1_2D_Skeletal.mol\n  Namelecule        2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.7999    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5511    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2266    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244   -0.6222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  2  5  1  0  0  0  0\nM  END\n";
  reg("methyl_3_butene_1", methyl_3_butene_1_2D_Condensed, methyl_3_butene_1_2D_Expanded, methyl_3_butene_1_2D_Skeletal);
const methyl_2_propene_2D_Condensed = "KingDraw KingDraw.mol\nKingDraw2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  2  4  1  0\nM  END";
const methyl_2_propene_2D_Expanded = "KingDraw KingDraw.mol\nKingDraw2D\n\n 12 11  0  0  0  0  0  0  0  0999 V2000\n   -1.1701    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1701    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1701    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9502    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0350    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.8152    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800   -1.0350    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800   -1.0350    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1701    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9502    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1701   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  3  5  1  0\n  2  6  1  0\n  6  7  1  0\n  6  8  1  0\n  6  9  1  0\n  1 10  1  0\n  1 11  1  0\n  1 12  1  0\nM  END";
const methyl_2_propene_2D_Skeletal = "KingDraw KingDraw.mol\nKingDraw2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -0.7999    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5510    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1241   -0.6221    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  2  4  1  0\nM  END";
  reg("methyl_2_propene", methyl_2_propene_2D_Condensed, methyl_2_propene_2D_Expanded, methyl_2_propene_2D_Skeletal);
  const ethyl_3_dimethyl_2_5_hexene_2_2D_Condensed = "ethyl_3_dimethyl_2_5_hexene_2_2D_Condensed.mol\n  Namelecule        2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\nM  END\n";
  const ethyl_3_dimethyl_2_5_hexene_2_2D_Expanded = "ethyl_3_dimethyl_2_5_hexene_2_2D_Expanded.mol\n  Namelecule        2D\n\n 30 29  0  0  0  0  0  0  0  0999 V2000\n    2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7050    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9250    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9250   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7050    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9750   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5350   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1950    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3650    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1950    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3650    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5350   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9750   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\n  1 11  1  0  0  0  0\n  1 12  1  0  0  0  0\n  1 13  1  0  0  0  0\n  4 14  1  0  0  0  0\n  4 15  1  0  0  0  0\n  5 16  1  0  0  0  0\n  6 17  1  0  0  0  0\n  6 18  1  0  0  0  0\n  6 19  1  0  0  0  0\n  7 20  1  0  0  0  0\n  7 21  1  0  0  0  0\n  7 22  1  0  0  0  0\n  8 23  1  0  0  0  0\n  8 24  1  0  0  0  0\n  9 25  1  0  0  0  0\n  9 26  1  0  0  0  0\n  9 27  1  0  0  0  0\n 10 28  1  0  0  0  0\n 10 29  1  0  0  0  0\n 10 30  1  0  0  0  0\nM  END\n";
  const ethyl_3_dimethyl_2_5_hexene_2_2D_Skeletal = "ethyl_3_dimethyl_2_5_hexene_2_2D_Skeletal.mol\n  Namelecule        2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    3.3775    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7020    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3510    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6755    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7020   -0.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7020    1.5600    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6755    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  2  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\nM  END\n";
  reg("ethyl_3_dimethyl_2_5_hexene_2", ethyl_3_dimethyl_2_5_hexene_2_2D_Condensed, ethyl_3_dimethyl_2_5_hexene_2_2D_Expanded, ethyl_3_dimethyl_2_5_hexene_2_2D_Skeletal);
  const ethyl_3_dimethyl_2_5_hexane_2D_Condensed = "ethyl_3_dimethyl_2_5_hexane_2D_Condensed.mol\n  Namelecule        2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\nM  END\n";
  const ethyl_3_dimethyl_2_5_hexane_2D_Expanded = "ethyl_3_dimethyl_2_5_hexane_2D_Expanded.mol\n  Namelecule        2D\n\n 32 31  0  0  0  0  0  0  0  0999 V2000\n    2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.7050    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9250    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9250   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7050    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9750   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5350   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1950    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3650    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1950    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3650    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5350   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9750   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\n  1 11  1  0  0  0  0\n  1 12  1  0  0  0  0\n  1 13  1  0  0  0  0\n  4 14  1  0  0  0  0\n  4 15  1  0  0  0  0\n  5 16  1  0  0  0  0\n  6 17  1  0  0  0  0\n  6 18  1  0  0  0  0\n  6 19  1  0  0  0  0\n  7 20  1  0  0  0  0\n  7 21  1  0  0  0  0\n  7 22  1  0  0  0  0\n  8 23  1  0  0  0  0\n  8 24  1  0  0  0  0\n  9 25  1  0  0  0  0\n  9 26  1  0  0  0  0\n  9 27  1  0  0  0  0\n 10 28  1  0  0  0  0\n 10 29  1  0  0  0  0\n 10 30  1  0  0  0  0\n  2 31  1  0  0  0  0\n  3 32  1  0  0  0  0\nM  END\n";
  const ethyl_3_dimethyl_2_5_hexane_2D_Skeletal = "ethyl_3_dimethyl_2_5_hexane_2D_Skeletal.mol\n  Namelecule        2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    3.3775    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7020    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3510    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6755    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7020   -0.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7020    1.5600    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6755    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  2  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  8  9  1  0  0  0  0\n  5 10  1  0  0  0  0\nM  END\n";
  reg("ethyl_3_dimethyl_2_5_hexane", ethyl_3_dimethyl_2_5_hexane_2D_Condensed, ethyl_3_dimethyl_2_5_hexane_2D_Expanded, ethyl_3_dimethyl_2_5_hexane_2D_Skeletal);

  reg("methane", (typeof methane_2D_Condensed !== "undefined" ? methane_2D_Condensed : null), (typeof methane_2D_Expanded !== "undefined" ? methane_2D_Expanded : null), (typeof methane_2D_Skeletal !== "undefined" ? methane_2D_Skeletal : null));
  reg("methanoicacid", (typeof methanoicacid_2D_Condensed !== "undefined" ? methanoicacid_2D_Condensed : null), (typeof methanoicacid_2D_Expanded !== "undefined" ? methanoicacid_2D_Expanded : null), (typeof methanoicacid_2D_Skeletal !== "undefined" ? methanoicacid_2D_Skeletal : null));
  reg("ethane", (typeof ethane_2D_Condensed !== "undefined" ? ethane_2D_Condensed : null), (typeof ethane_2D_Expanded !== "undefined" ? ethane_2D_Expanded : null), (typeof ethane_2D_Skeletal !== "undefined" ? ethane_2D_Skeletal : null));
  reg("ethene", (typeof ethene_2D_Condensed !== "undefined" ? ethene_2D_Condensed : null), (typeof ethene_2D_Expanded !== "undefined" ? ethene_2D_Expanded : null), (typeof ethene_2D_Skeletal !== "undefined" ? ethene_2D_Skeletal : null));
  reg("ethanal", (typeof ethanal_2D_Condensed !== "undefined" ? ethanal_2D_Condensed : null), (typeof ethanal_2D_Expanded !== "undefined" ? ethanal_2D_Expanded : null), (typeof ethanal_2D_Skeletal !== "undefined" ? ethanal_2D_Skeletal : null));
  reg("ethanenitrile", (typeof ethanenitrile_2D_Condensed !== "undefined" ? ethanenitrile_2D_Condensed : null), (typeof ethanenitrile_2D_Expanded !== "undefined" ? ethanenitrile_2D_Expanded : null), (typeof ethanenitrile_2D_Skeletal !== "undefined" ? ethanenitrile_2D_Skeletal : null));
  reg("propane", (typeof propane_2D_Condensed !== "undefined" ? propane_2D_Condensed : null), (typeof propane_2D_Expanded !== "undefined" ? propane_2D_Expanded : null), (typeof propane_2D_Skeletal !== "undefined" ? propane_2D_Skeletal : null));
  reg("propene", (typeof propene_2D_Condensed !== "undefined" ? propene_2D_Condensed : null), (typeof propene_2D_Expanded !== "undefined" ? propene_2D_Expanded : null), (typeof propene_2D_Skeletal !== "undefined" ? propene_2D_Skeletal : null));
  reg("propadiene", (typeof propadiene_2D_Condensed !== "undefined" ? propadiene_2D_Condensed : null), (typeof propadiene_2D_Expanded !== "undefined" ? propadiene_2D_Expanded : null), (typeof propadiene_2D_Skeletal !== "undefined" ? propadiene_2D_Skeletal : null));
  reg("propionicacid", (typeof propionicacid_2D_Condensed !== "undefined" ? propionicacid_2D_Condensed : null), (typeof propionicacid_2D_Expanded !== "undefined" ? propionicacid_2D_Expanded : null), (typeof propionicacid_2D_Skeletal !== "undefined" ? propionicacid_2D_Skeletal : null));
  reg("butane", (typeof butane_2D_Condensed !== "undefined" ? butane_2D_Condensed : null), (typeof butane_2D_Expanded !== "undefined" ? butane_2D_Expanded : null), (typeof butane_2D_Skeletal !== "undefined" ? butane_2D_Skeletal : null));
  reg("butanal", (typeof butanal_2D_Condensed !== "undefined" ? butanal_2D_Condensed : null), (typeof butanal_2D_Expanded !== "undefined" ? butanal_2D_Expanded : null), (typeof butanal_2D_Skeletal !== "undefined" ? butanal_2D_Skeletal : null));
  reg("butanenitrile", (typeof butanenitrile_2D_Condensed !== "undefined" ? butanenitrile_2D_Condensed : null), (typeof butanenitrile_2D_Expanded !== "undefined" ? butanenitrile_2D_Expanded : null), (typeof butanenitrile_2D_Skeletal !== "undefined" ? butanenitrile_2D_Skeletal : null));
  reg("pentane", (typeof pentane_2D_Condensed !== "undefined" ? pentane_2D_Condensed : null), (typeof pentane_2D_Expanded !== "undefined" ? pentane_2D_Expanded : null), (typeof pentane_2D_Skeletal !== "undefined" ? pentane_2D_Skeletal : null));
  reg("butene_1", (typeof butene_1_2D_Condensed !== "undefined" ? butene_1_2D_Condensed : null), (typeof butene_1_2D_Expanded !== "undefined" ? butene_1_2D_Expanded : null), (typeof butene_1_2D_Skeletal !== "undefined" ? butene_1_2D_Skeletal : null));
  reg("propanol_1", (typeof propanol_1_2D_Condensed !== "undefined" ? propanol_1_2D_Condensed : null), (typeof propanol_1_2D_Expanded !== "undefined" ? propanol_1_2D_Expanded : null), (typeof propanol_1_2D_Skeletal !== "undefined" ? propanol_1_2D_Skeletal : null));
  reg("penten_4_ol_2", (typeof penten_4_ol_2_2D_Condensed !== "undefined" ? penten_4_ol_2_2D_Condensed : null), (typeof penten_4_ol_2_2D_Expanded !== "undefined" ? penten_4_ol_2_2D_Expanded : null), (typeof penten_4_ol_2_2D_Skeletal !== "undefined" ? penten_4_ol_2_2D_Skeletal : null));
  reg("penten_1_one_3", (typeof penten_1_one_3_2D_Condensed !== "undefined" ? penten_1_one_3_2D_Condensed : null), (typeof penten_1_one_3_2D_Expanded !== "undefined" ? penten_1_one_3_2D_Expanded : null), (typeof penten_1_one_3_2D_Skeletal !== "undefined" ? penten_1_one_3_2D_Skeletal : null));
  reg("butanol_1", (typeof butanol_1_2D_Condensed !== "undefined" ? butanol_1_2D_Condensed : null), (typeof butanol_1_2D_Expanded !== "undefined" ? butanol_1_2D_Expanded : null), (typeof butanol_1_2D_Skeletal !== "undefined" ? butanol_1_2D_Skeletal : null));
  reg("pentanone_2", (typeof pentanone_2_2D_Condensed !== "undefined" ? pentanone_2_2D_Condensed : null), (typeof pentanone_2_2D_Expanded !== "undefined" ? pentanone_2_2D_Expanded : null), (typeof pentanone_2_2D_Skeletal !== "undefined" ? pentanone_2_2D_Skeletal : null));
  reg("butene_2", (typeof butene_2_2D_Condensed !== "undefined" ? butene_2_2D_Condensed : null), (typeof butene_2_2D_Expanded !== "undefined" ? butene_2_2D_Expanded : null), (typeof butene_2_2D_Skeletal !== "undefined" ? butene_2_2D_Skeletal : null));
  reg("pentadiene_1_3", (typeof pentadiene_1_3_2D_Condensed !== "undefined" ? pentadiene_1_3_2D_Condensed : null), (typeof pentadiene_1_3_2D_Expanded !== "undefined" ? pentadiene_1_3_2D_Expanded : null), (typeof pentadiene_1_3_2D_Skeletal !== "undefined" ? pentadiene_1_3_2D_Skeletal : null));
  reg("propyne", (typeof propyne_2D_Condensed !== "undefined" ? propyne_2D_Condensed : null), (typeof propyne_2D_Expanded !== "undefined" ? propyne_2D_Expanded : null), (typeof propyne_2D_Skeletal !== "undefined" ? propyne_2D_Skeletal : null));
  reg("propanal", (typeof propanal_2D_Condensed !== "undefined" ? propanal_2D_Condensed : null), (typeof propanal_2D_Expanded !== "undefined" ? propanal_2D_Expanded : null), (typeof propanal_2D_Skeletal !== "undefined" ? propanal_2D_Skeletal : null));
  reg("butanoic_acid", (typeof butanoic_acid_2D_Condensed !== "undefined" ? butanoic_acid_2D_Condensed : null), (typeof butanoic_acid_2D_Expanded !== "undefined" ? butanoic_acid_2D_Expanded : null), (typeof butanoic_acid_2D_Skeletal !== "undefined" ? butanoic_acid_2D_Skeletal : null));
  reg("propanenitrile", (typeof propanenitrile_2D_Condensed !== "undefined" ? propanenitrile_2D_Condensed : null), (typeof propanenitrile_2D_Expanded !== "undefined" ? propanenitrile_2D_Expanded : null), (typeof propanenitrile_2D_Skeletal !== "undefined" ? propanenitrile_2D_Skeletal : null));
  reg("pentanoic_acid", (typeof pentanoic_acid_2D_Condensed !== "undefined" ? pentanoic_acid_2D_Condensed : null), (typeof pentanoic_acid_2D_Expanded !== "undefined" ? pentanoic_acid_2D_Expanded : null), (typeof pentanoic_acid_2D_Skeletal !== "undefined" ? pentanoic_acid_2D_Skeletal : null));
  reg("pentanal", (typeof pentanal_2D_Condensed !== "undefined" ? pentanal_2D_Condensed : null), (typeof pentanal_2D_Expanded !== "undefined" ? pentanal_2D_Expanded : null), (typeof pentanal_2D_Skeletal !== "undefined" ? pentanal_2D_Skeletal : null));
  reg("butene_3_ol_2", (typeof butene_3_ol_2_2D_Condensed !== "undefined" ? butene_3_ol_2_2D_Condensed : null), (typeof butene_3_ol_2_2D_Expanded !== "undefined" ? butene_3_ol_2_2D_Expanded : null), (typeof butene_3_ol_2_2D_Skeletal !== "undefined" ? butene_3_ol_2_2D_Skeletal : null));
  reg("penten_2_ol_1", (typeof penten_2_ol_1_2D_Condensed !== "undefined" ? penten_2_ol_1_2D_Condensed : null), (typeof penten_2_ol_1_2D_Expanded !== "undefined" ? penten_2_ol_1_2D_Expanded : null), (typeof penten_2_ol_1_2D_Skeletal !== "undefined" ? penten_2_ol_1_2D_Skeletal : null));
  reg("pentyn_4_one_2", (typeof pentyn_4_one_2_2D_Condensed !== "undefined" ? pentyn_4_one_2_2D_Condensed : null), (typeof pentyn_4_one_2_2D_Expanded !== "undefined" ? pentyn_4_one_2_2D_Expanded : null), (typeof pentyn_4_one_2_2D_Skeletal !== "undefined" ? pentyn_4_one_2_2D_Skeletal : null));
  reg("propenoic_acid", (typeof propenoic_acid_2D_Condensed !== "undefined" ? propenoic_acid_2D_Condensed : null), (typeof propenoic_acid_2D_Expanded !== "undefined" ? propenoic_acid_2D_Expanded : null), (typeof propenoic_acid_2D_Skeletal !== "undefined" ? propenoic_acid_2D_Skeletal : null));
  reg("propynal", (typeof propynal_2D_Condensed !== "undefined" ? propynal_2D_Condensed : null), (typeof propynal_2D_Expanded !== "undefined" ? propynal_2D_Expanded : null), (typeof propynal_2D_Skeletal !== "undefined" ? propynal_2D_Skeletal : null));
  reg("penten_3_yne_1", (typeof penten_3_yne_1_2D_Condensed !== "undefined" ? penten_3_yne_1_2D_Condensed : null), (typeof penten_3_yne_1_2D_Expanded !== "undefined" ? penten_3_yne_1_2D_Expanded : null), (typeof penten_3_yne_1_2D_Skeletal !== "undefined" ? penten_3_yne_1_2D_Skeletal : null));
  reg("hexen_1_yne_4", (typeof hexen_1_yne_4_2D_Condensed !== "undefined" ? hexen_1_yne_4_2D_Condensed : null), (typeof hexen_1_yne_4_2D_Expanded !== "undefined" ? hexen_1_yne_4_2D_Expanded : null), (typeof hexen_1_yne_4_2D_Skeletal !== "undefined" ? hexen_1_yne_4_2D_Skeletal : null));
  reg("buten_1_yne_3", (typeof buten_1_yne_3_2D_Condensed !== "undefined" ? buten_1_yne_3_2D_Condensed : null), (typeof buten_1_yne_3_2D_Expanded !== "undefined" ? buten_1_yne_3_2D_Expanded : null), (typeof buten_1_yne_3_2D_Skeletal !== "undefined" ? buten_1_yne_3_2D_Skeletal : null));
  reg("hexen_2_yne_4", (typeof hexen_2_yne_4_2D_Condensed !== "undefined" ? hexen_2_yne_4_2D_Condensed : null), (typeof hexen_2_yne_4_2D_Expanded !== "undefined" ? hexen_2_yne_4_2D_Expanded : null), (typeof hexen_2_yne_4_2D_Skeletal !== "undefined" ? hexen_2_yne_4_2D_Skeletal : null));
  reg("chlorobutane_1", (typeof chlorobutane_1_2D_Condensed !== "undefined" ? chlorobutane_1_2D_Condensed : null), (typeof chlorobutane_1_2D_Expanded !== "undefined" ? chlorobutane_1_2D_Expanded : null), (typeof chlorobutane_1_2D_Skeletal !== "undefined" ? chlorobutane_1_2D_Skeletal : null));
  reg("bromopropane_2", (typeof bromopropane_2_2D_Condensed !== "undefined" ? bromopropane_2_2D_Condensed : null), (typeof bromopropane_2_2D_Expanded !== "undefined" ? bromopropane_2_2D_Expanded : null), (typeof bromopropane_2_2D_Skeletal !== "undefined" ? bromopropane_2_2D_Skeletal : null));
  reg("bromo_4_butene_1", (typeof bromo_4_butene_1_2D_Condensed !== "undefined" ? bromo_4_butene_1_2D_Condensed : null), (typeof bromo_4_butene_1_2D_Expanded !== "undefined" ? bromo_4_butene_1_2D_Expanded : null), (typeof bromo_4_butene_1_2D_Skeletal !== "undefined" ? bromo_4_butene_1_2D_Skeletal : null));
  reg("bromo_3_chloropentane_1", (typeof bromo_3_chloropentane_1_2D_Condensed !== "undefined" ? bromo_3_chloropentane_1_2D_Condensed : null), (typeof bromo_3_chloropentane_1_2D_Expanded !== "undefined" ? bromo_3_chloropentane_1_2D_Expanded : null), (typeof bromo_3_chloropentane_1_2D_Skeletal !== "undefined" ? bromo_3_chloropentane_1_2D_Skeletal : null));
  reg("bromo_2_chlorobutane_3", (typeof bromo_2_chlorobutane_3_2D_Condensed !== "undefined" ? bromo_2_chlorobutane_3_2D_Condensed : null), (typeof bromo_2_chlorobutane_3_2D_Expanded !== "undefined" ? bromo_2_chlorobutane_3_2D_Expanded : null), (typeof bromo_2_chlorobutane_3_2D_Skeletal !== "undefined" ? bromo_2_chlorobutane_3_2D_Skeletal : null));
  reg("propanediol_1_2", (typeof propanediol_1_2_2D_Condensed !== "undefined" ? propanediol_1_2_2D_Condensed : null), (typeof propanediol_1_2_2D_Expanded !== "undefined" ? propanediol_1_2_2D_Expanded : null), (typeof propanediol_1_2_2D_Skeletal !== "undefined" ? propanediol_1_2_2D_Skeletal : null));
  reg("propanedioic_acid", (typeof propanedioic_acid_2D_Condensed !== "undefined" ? propanedioic_acid_2D_Condensed : null), (typeof propanedioic_acid_2D_Expanded !== "undefined" ? propanedioic_acid_2D_Expanded : null), (typeof propanedioic_acid_2D_Skeletal !== "undefined" ? propanedioic_acid_2D_Skeletal : null));
  reg("propanetriol", (typeof propanetriol_2D_Condensed !== "undefined" ? propanetriol_2D_Condensed : null), (typeof propanetriol_2D_Expanded !== "undefined" ? propanetriol_2D_Expanded : null), (typeof propanetriol_2D_Skeletal !== "undefined" ? propanetriol_2D_Skeletal : null));
  reg("dichlorobutane_2_2", (typeof dichlorobutane_2_2_2D_Condensed !== "undefined" ? dichlorobutane_2_2_2D_Condensed : null), (typeof dichlorobutane_2_2_2D_Expanded !== "undefined" ? dichlorobutane_2_2_2D_Expanded : null), (typeof dichlorobutane_2_2_2D_Skeletal !== "undefined" ? dichlorobutane_2_2_2D_Skeletal : null));
  reg("trichloropentane_1_1_2", (typeof trichloropentane_1_1_2_2D_Condensed !== "undefined" ? trichloropentane_1_1_2_2D_Condensed : null), (typeof trichloropentane_1_1_2_2D_Expanded !== "undefined" ? trichloropentane_1_1_2_2D_Expanded : null), (typeof trichloropentane_1_1_2_2D_Skeletal !== "undefined" ? trichloropentane_1_1_2_2D_Skeletal : null));
  reg("hydroxypropanoic_acid_2", (typeof hydroxypropanoic_acid_2_2D_Condensed !== "undefined" ? hydroxypropanoic_acid_2_2D_Condensed : null), (typeof hydroxypropanoic_acid_2_2D_Expanded !== "undefined" ? hydroxypropanoic_acid_2_2D_Expanded : null), (typeof hydroxypropanoic_acid_2_2D_Skeletal !== "undefined" ? hydroxypropanoic_acid_2_2D_Skeletal : null));
  reg("hydroxybutanenitrile_2", (typeof hydroxybutanenitrile_2_2D_Condensed !== "undefined" ? hydroxybutanenitrile_2_2D_Condensed : null), (typeof hydroxybutanenitrile_2_2D_Expanded !== "undefined" ? hydroxybutanenitrile_2_2D_Expanded : null), (typeof hydroxybutanenitrile_2_2D_Skeletal !== "undefined" ? hydroxybutanenitrile_2_2D_Skeletal : null));
  reg("Oxopropanoic_acid", (typeof Oxopropanoic_acid_2D_Condensed !== "undefined" ? Oxopropanoic_acid_2D_Condensed : null), (typeof Oxopropanoic_acid_2D_Expanded !== "undefined" ? Oxopropanoic_acid_2D_Expanded : null), (typeof Oxopropanoic_acid_2D_Skeletal !== "undefined" ? Oxopropanoic_acid_2D_Skeletal : null));
  reg("aminobutanoic_acid_3", (typeof aminobutanoic_acid_3_2D_Condensed !== "undefined" ? aminobutanoic_acid_3_2D_Condensed : null), (typeof aminobutanoic_acid_3_2D_Expanded !== "undefined" ? aminobutanoic_acid_3_2D_Expanded : null), (typeof aminobutanoic_acid_3_2D_Skeletal !== "undefined" ? aminobutanoic_acid_3_2D_Skeletal : null));
  reg("hydroxypropanenitrile_2", (typeof hydroxypropanenitrile_2_2D_Condensed !== "undefined" ? hydroxypropanenitrile_2_2D_Condensed : null), (typeof hydroxypropanenitrile_2_2D_Expanded !== "undefined" ? hydroxypropanenitrile_2_2D_Expanded : null), (typeof hydroxypropanenitrile_2_2D_Skeletal !== "undefined" ? hydroxypropanenitrile_2_2D_Skeletal : null));
  reg("oxobutanoic_acid", (typeof oxobutanoic_acid_2D_Condensed !== "undefined" ? oxobutanoic_acid_2D_Condensed : null), (typeof oxobutanoic_acid_2D_Expanded !== "undefined" ? oxobutanoic_acid_2D_Expanded : null), (typeof oxobutanoic_acid_2D_Skeletal !== "undefined" ? oxobutanoic_acid_2D_Skeletal : null));
  reg("dihydroxybutanedioic_acid_2_3", (typeof dihydroxybutanedioic_acid_2_3_2D_Condensed !== "undefined" ? dihydroxybutanedioic_acid_2_3_2D_Condensed : null), (typeof dihydroxybutanedioic_acid_2_3_2D_Expanded !== "undefined" ? dihydroxybutanedioic_acid_2_3_2D_Expanded : null), (typeof dihydroxybutanedioic_acid_2_3_2D_Skeletal !== "undefined" ? dihydroxybutanedioic_acid_2_3_2D_Skeletal : null));
  reg("ethanol", (typeof ethanol_2D_Condensed !== "undefined" ? ethanol_2D_Condensed : null), (typeof ethanol_2D_Expanded !== "undefined" ? ethanol_2D_Expanded : null), (typeof ethanol_2D_Skeletal !== "undefined" ? ethanol_2D_Skeletal : null));
  reg("propanone", (typeof propanone_2D_Condensed !== "undefined" ? propanone_2D_Condensed : null), (typeof propanone_2D_Expanded !== "undefined" ? propanone_2D_Expanded : null), (typeof propanone_2D_Skeletal !== "undefined" ? propanone_2D_Skeletal : null));
  reg("butanone", (typeof butanone_2D_Condensed !== "undefined" ? butanone_2D_Condensed : null), (typeof butanone_2D_Expanded !== "undefined" ? butanone_2D_Expanded : null), (typeof butanone_2D_Skeletal !== "undefined" ? butanone_2D_Skeletal : null));
  reg("nitroethane", (typeof nitroethane_2D_Condensed !== "undefined" ? nitroethane_2D_Condensed : null), (typeof nitroethane_2D_Expanded !== "undefined" ? nitroethane_2D_Expanded : null), (typeof nitroethane_2D_Skeletal !== "undefined" ? nitroethane_2D_Skeletal : null));
  reg("nitropropane_2", (typeof nitropropane_2_2D_Condensed !== "undefined" ? nitropropane_2_2D_Condensed : null), (typeof nitropropane_2_2D_Expanded !== "undefined" ? nitropropane_2_2D_Expanded : null), (typeof nitropropane_2_2D_Skeletal !== "undefined" ? nitropropane_2_2D_Skeletal : null));
  reg("methyl_2_pentane", (typeof methyl_2_pentane_2D_Condensed !== "undefined" ? methyl_2_pentane_2D_Condensed : null), (typeof methyl_2_pentane_2D_Expanded !== "undefined" ? methyl_2_pentane_2D_Expanded : null), (typeof methyl_2_pentane_2D_Skeletal !== "undefined" ? methyl_2_pentane_2D_Skeletal : null));
  reg("dimethyl_2_3_butane", (typeof dimethyl_2_3_butane_2D_Condensed !== "undefined" ? dimethyl_2_3_butane_2D_Condensed : null), (typeof dimethyl_2_3_butane_2D_Expanded !== "undefined" ? dimethyl_2_3_butane_2D_Expanded : null), (typeof dimethyl_2_3_butane_2D_Skeletal !== "undefined" ? dimethyl_2_3_butane_2D_Skeletal : null));
  reg("ethyl_methyl_ether", (typeof ethyl_methyl_ether_2D_Condensed !== "undefined" ? ethyl_methyl_ether_2D_Condensed : null), (typeof ethyl_methyl_ether_2D_Expanded !== "undefined" ? ethyl_methyl_ether_2D_Expanded : null), (typeof ethyl_methyl_ether_2D_Skeletal !== "undefined" ? ethyl_methyl_ether_2D_Skeletal : null));
  reg("dimethylether", (typeof dimethylether_2D_Condensed !== "undefined" ? dimethylether_2D_Condensed : null), (typeof dimethylether_2D_Expanded !== "undefined" ? dimethylether_2D_Expanded : null), (typeof dimethylether_2D_Skeletal !== "undefined" ? dimethylether_2D_Skeletal : null));
  reg("ethanoic_methyl_ester", (typeof ethanoic_methyl_ester_2D_Condensed !== "undefined" ? ethanoic_methyl_ester_2D_Condensed : null), (typeof ethanoic_methyl_ester_2D_Expanded !== "undefined" ? ethanoic_methyl_ester_2D_Expanded : null), (typeof ethanoic_methyl_ester_2D_Skeletal !== "undefined" ? ethanoic_methyl_ester_2D_Skeletal : null));
  reg("propanoic_methyl_ester", (typeof propanoic_methyl_ester_2D_Condensed !== "undefined" ? propanoic_methyl_ester_2D_Condensed : null), (typeof propanoic_methyl_ester_2D_Expanded !== "undefined" ? propanoic_methyl_ester_2D_Expanded : null), (typeof propanoic_methyl_ester_2D_Skeletal !== "undefined" ? propanoic_methyl_ester_2D_Skeletal : null));
  reg("diethyl_ether", (typeof diethyl_ether_2D_Condensed !== "undefined" ? diethyl_ether_2D_Condensed : null), (typeof diethyl_ether_2D_Expanded !== "undefined" ? diethyl_ether_2D_Expanded : null), (typeof diethyl_ether_2D_Skeletal !== "undefined" ? diethyl_ether_2D_Skeletal : null));
  reg("isopropyl_methyl_ether", (typeof isopropyl_methyl_ether_2D_Condensed !== "undefined" ? isopropyl_methyl_ether_2D_Condensed : null), (typeof isopropyl_methyl_ether_2D_Expanded !== "undefined" ? isopropyl_methyl_ether_2D_Expanded : null), (typeof isopropyl_methyl_ether_2D_Skeletal !== "undefined" ? isopropyl_methyl_ether_2D_Skeletal : null));
  reg("methyl_methanoate", (typeof methyl_methanoate_2D_Condensed !== "undefined" ? methyl_methanoate_2D_Condensed : null), (typeof methyl_methanoate_2D_Expanded !== "undefined" ? methyl_methanoate_2D_Expanded : null), (typeof methyl_methanoate_2D_Skeletal !== "undefined" ? methyl_methanoate_2D_Skeletal : null));
  reg("isopropyl_ethanoate", (typeof isopropyl_ethanoate_2D_Condensed !== "undefined" ? isopropyl_ethanoate_2D_Condensed : null), (typeof isopropyl_ethanoate_2D_Expanded !== "undefined" ? isopropyl_ethanoate_2D_Expanded : null), (typeof isopropyl_ethanoate_2D_Skeletal !== "undefined" ? isopropyl_ethanoate_2D_Skeletal : null));
})();
