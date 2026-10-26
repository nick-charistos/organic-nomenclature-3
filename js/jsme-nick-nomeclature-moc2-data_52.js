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

  // Alkynes added 2026-10-22 (data only; 3D camera intentionally untouched).
  ethyne: {
    formula: "CH_CH",
    mainChain_Condensed: [1, 2],
    mainChain_Expanded: [1, 2],
    mainChain_Skeletal: [1, 2],
    mainChain3D: [1, 2],
  },

  butyne_1: {
    formula: "CH3CH2C_CH",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain_Skeletal: [4, 3, 2, 1],
    mainChain3D: [4, 3, 1, 2],
  },

  butyne_2: {
    formula: "CH3C_CCH3",
    mainChain_Condensed: [1, 2, 3, 4],
    mainChain_Expanded: [1, 2, 3, 4],
    mainChain_Skeletal: [1, 2, 3, 4],
    mainChain3D: [1, 3, 4, 2],
  },

  methyl_3_butyne_1: {
    formula: "CH_CCH(CH3)CH3",
    mainChain_Condensed: [4, 3, 2, 1],
    mainChain_Expanded: [4, 3, 2, 1],
    mainChain_Skeletal: [4, 3, 2, 1],
    mainChain3D: [5, 4, 1, 2],
  },

  methyl_3_pentyne_1: {
    formula: "CH_CCH(CH3)CH2CH3",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    mainChain3D: [6, 5, 1, 2, 4],
  },

  methyl_4_pentyne_2: {
    formula: "CH3C_CCH(CH3)CH3",
    mainChain_Condensed: [5, 4, 3, 2, 1],
    mainChain_Expanded: [5, 4, 3, 2, 1],
    mainChain_Skeletal: [5, 4, 3, 2, 1],
    mainChain3D: [6, 5, 4, 1, 2],
  },

  ethyl_4_dimethyl_3_5_heptyne_1: {
    formula: "CH_CCH(CH3)CH(CH2CH3)CH(CH3)CH2CH3",
    mainChain_Condensed: [1, 2, 3, 4, 5, 6, 7],
    mainChain_Expanded: [1, 2, 3, 4, 5, 6, 7],
    mainChain_Skeletal: [1, 2, 3, 4, 5, 6, 7],
    mainChain3D: [1, 2, 3, 4, 5, 6, 7],
  },

  butadiene_1_2: {"formula": "CH2=C=CHCH3", "mainChain_Condensed": [1, 2, 3, 4], "mainChain_Expanded": [1, 2, 3, 4], "mainChain_Skeletal": [1, 2, 3, 4], "mainChain3D": [1, 2, 3, 4]},


  butadiene_1_3: {"formula": "CH2=CHCH=CH2", "mainChain_Condensed": [1, 2, 3, 4], "mainChain_Expanded": [1, 2, 3, 4], "mainChain_Skeletal": [1, 2, 3, 4], "mainChain3D": [3, 1, 2, 4]},


  butanol_2: {"formula": "CH3CH2CH(OH)CH3", "mainChain_Condensed": [1, 2, 3, 4], "mainChain_Expanded": [1, 2, 3, 4], "mainChain_Skeletal": [1, 2, 3, 4], "mainChain3D": [4, 2, 3, 5]},

  dimethyl_2_2_pentanol_3: {"formula": "CH3CH2CH(OH)C(CH3)2CH3", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [5, 2, 3, 4, 8]},

  dimethyl_2_3_pentadiene_1_3: {"formula": "CH2=C(CH3)C(CH3)=CHCH3", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [7, 2, 1, 4, 6]},


  dimethyl_2_3_penten_1_yne_4: {"formula": "CH_CCH(CH3)C(CH3)=CH2", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [5, 2, 1, 6, 7]},

  ethyl_3_dimethyl_4_5_hexadiene_1_4: {"formula": "CH2=CHCH(CH2CH3)C(CH3)=C(CH3)CH3", "mainChain_Condensed": [1, 2, 3, 4, 5, 6], "mainChain_Expanded": [1, 2, 3, 4, 5, 6], "mainChain_Skeletal": [1, 2, 3, 4, 5, 6], "mainChain3D": [10, 5, 1, 2, 4, 8]},


  ethyl_3_methyl_4_hexen_3_yn_5_ol_2: {"formula": "CH_CC(CH3)=C(CH2CH3)CH(OH)CH3", "mainChain_Condensed": [1, 2, 3, 4, 5, 6], "mainChain_Expanded": [1, 2, 3, 4, 5, 6], "mainChain_Skeletal": [1, 2, 3, 4, 5, 6], "mainChain3D": [1, 2, 3, 4, 5, 6], "initialZoom3D": 65},

  ethyl_4_dimethyl_2_3_hepten_2_yne_5: {"formula": "CH3C_CCH(CH2CH3)C(CH3)=C(CH3)CH3", "mainChain_Condensed": [1, 2, 3, 4, 5, 6, 7], "mainChain_Expanded": [1, 2, 3, 4, 5, 6, 7], "mainChain_Skeletal": [1, 2, 3, 4, 5, 6, 7], "mainChain3D": [1, 2, 3, 4, 5, 6, 7]},


  isopropyl_4_dimethyl_3_5_heptanol_2: {"initialZoom3D": 65, "formula": "CH3CH2CH(CH3)CH(CH(CH3)2)CH(CH3)CH(OH)CH3", "mainChain_Condensed": [1, 2, 3, 4, 5, 6, 7], "mainChain_Expanded": [1, 2, 3, 4, 5, 6, 7], "mainChain_Skeletal": [1, 2, 3, 4, 5, 6, 7], "mainChain3D": [1, 2, 3, 4, 5, 6, 7]},

  methyl_2_buten_1_yne_3: {"formula": "CH_CC(CH3)=CH2", "mainChain_Condensed": [1, 2, 3, 4], "mainChain_Expanded": [1, 2, 3, 4], "mainChain_Skeletal": [1, 2, 3, 4], "mainChain3D": [3, 2, 4, 5]},

  methyl_2_propanediol_1_2: {"formula": "CH3C(CH3)(OH)CH2OH", "mainChain_Condensed": [1, 2, 3], "mainChain_Expanded": [1, 2, 3], "mainChain_Skeletal": [1, 2, 3], "mainChain3D": [4, 3, 5]},

  methyl_3_buten_3_ol_2: {"formula": "CH2=C(CH3)CH(OH)CH3", "mainChain_Condensed": [1, 2, 3, 4], "mainChain_Expanded": [1, 2, 3, 4], "mainChain_Skeletal": [1, 2, 3, 4], "mainChain3D": [4, 2, 3, 6]},

  methyl_3_pentadiene_1_3: {"formula": "CH2=CHC(CH3)=CHCH3", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [6, 5, 1, 2, 4]},


  methyl_3_pentyn_4_ol_2: {"formula": "CH_CCH(CH3)CH(OH)CH3", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [5, 3, 2, 6, 7]},

  methyl_4_pentanol_2: {"formula": "CH3CH(CH3)CH2CH(OH)CH3", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [7, 4, 3, 2, 5]},

  methyl_4_penten_4_yn_2_ol_1: {"formula": "CH2=C(CH3)C_CCH2OH", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [4, 7, 5, 2, 6]},

  pentadiene_1_4: {"formula": "CH2=CHCH2CH=CH2", "mainChain_Condensed": [1, 2, 3, 4, 5], "mainChain_Expanded": [1, 2, 3, 4, 5], "mainChain_Skeletal": [1, 2, 3, 4, 5], "mainChain3D": [4, 2, 1, 3, 5]},



  pentanone_3: {
  "formula": "CH3CH2COCH2CH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain3D": [
    5,
    2,
    4,
    3,
    6
  ]
},

  dimethyl_2_4_pentanone_3: {
  "formula": "CH3CH(CH3)COCH(CH3)CH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain3D": [
    5,
    2,
    4,
    3,
    7
  ]
},

  trimethyl_3_4_4_pentanone_2: {
  "formula": "CH3C(CH3)2CH(CH3)COCH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain3D": [
    9,
    8,
    3,
    2,
    4
  ]
},

  diethyl_4_5_dimethyl_2_6_heptanone_3: {
  "initialZoom3D": 60,
  "formula": "CH3CH(CH3)CH(CH2CH3)CH(CH2CH3)COCH(CH3)CH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "mainChain3D": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ]
},

  penten_1_yn_4_one_3: {
  "formula": "HC≡CCOCH=CH2",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain3D": [
    4,
    2,
    3,
    5,
    6
  ]
},

  dimethyl_4_5_hexen_5_yn_1_one_3: {
  "formula": "CH2=C(CH3)CH(CH3)COC≡CH",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "mainChain3D": [
    1,
    2,
    3,
    4,
    5,
    6
  ]
},

  methyl_6_hepten_3_dione_2_5: {
  "formula": "CH3CH(CH3)COCH=CHCOCH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ],
  "mainChain3D": [
    10,
    9,
    8,
    7,
    6,
    3,
    4
  ]
},

  ethyl_3_methyl_4_octen_3_yn_5_dione_2_7: {
  "formula": "CH3COC≡CC(CH3)=C(CH2CH3)COCH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "mainChain3D": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ]
},

  isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5: {
  "formula": "HC≡CCH(CH3)COC(CH(CH3)2)=C(CH3)COCH3",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ],
  "mainChain3D": [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ]
},

  methanal: {
    "formula": "HCHO",
    "mainChain_Condensed": [
        1
    ],
    "mainChain_Expanded": [
        1
    ],
    "mainChain_Skeletal": [
        1
    ],
    "mainChain3D": [
        2
    ]
},

  propenal: {
  "formula": "CH2=CHCHO",
  "mainChain_Condensed": [
    1,
    2,
    3
  ],
  "mainChain_Expanded": [
    1,
    2,
    3
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3
  ],
  "mainChain3D": [
    3,
    2,
    4
  ]
},

  methyl_2_propenal: {
  "formula": "CH2=C(CH3)CHO",
  "mainChain_Condensed": [
    1,
    2,
    3
  ],
  "mainChain_Expanded": [
    1,
    2,
    3
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3
  ],
  "mainChain3D": [
    4,
    2,
    5
  ]
},

  methyl_2_propanal: {
    "formula": "CH3CH(CH3)CH=O",
    "mainChain_Condensed": [
        1,
        2,
        3
    ],
    "mainChain_Expanded": [
        1,
        2,
        3
    ],
    "mainChain_Skeletal": [
        1,
        2,
        3
    ],
    "mainChain3D": [
        5,
        2,
        3
    ]
},

  dimethyl_2_3_butanal: {
    "formula": "CH3CH(CH3)CH(CH3)CH=O",
    "mainChain_Condensed": [
        1,
        2,
        3,
        4
    ],
    "mainChain_Expanded": [
        1,
        2,
        3,
        4
    ],
    "mainChain_Skeletal": [
        1,
        2,
        3,
        4
    ],
    "mainChain3D": [
        7,
        3,
        2,
        4
    ]
},

  ethyl_2_methyl_3_pentanal: {
    "formula": "CH3CH2CH(CH3)CH(CH2CH3)CH=O",
    "mainChain_Condensed": [
        1,
        2,
        3,
        4,
        5
    ],
    "mainChain_Expanded": [
        1,
        2,
        3,
        4,
        5
    ],
    "mainChain_Skeletal": [
        1,
        2,
        3,
        4,
        5
    ],
    "mainChain3D": [
        7,
        3,
        2,
        4,
        8
    ]
},

  ethyl_4_isopropyl_3_methyl_2_hexanal: {
    "initialZoom3D": 60,
    "formula": "CH3CH2CH(CH2CH3)CH[CH(CH3)2]CH(CH3)CH=O",
    "mainChain_Condensed": [
        1,
        2,
        3,
        4,
        5,
        6
    ],
    "mainChain_Expanded": [
        1,
        2,
        3,
        4,
        5,
        6
    ],
    "mainChain_Skeletal": [
        1,
        2,
        3,
        4,
        5,
        6
    ],
    "mainChain3D": [
        1,
        2,
        3,
        4,
        5,
        6
    ]
},

  ethyl_4_penten_4_yn_2_al: {
  "formula": "CH2=C(CH2CH3)C≡CCHO",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain3D": [
    1,
    2,
    3,
    4,
    5
  ]
},

  propanedial: {
  "formula": "OHCCH2CHO",
  "mainChain_Condensed": [
    1,
    2,
    3
  ],
  "mainChain_Expanded": [
    1,
    2,
    3
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3
  ],
  "mainChain3D": [
    4,
    3,
    5
  ]
},

  methyl_3_penten_2_dial: {
  "formula": "OHCCH2C(CH3)=CHCHO",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5
  ],
  "mainChain3D": [
    8,
    6,
    3,
    4,
    7
  ]
},

  isopropyl_2_buten_2_dial: {
  "formula": "OHCCH=C[CH(CH3)2]CHO",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4
  ],
  "mainChain3D": [
    8,
    4,
    7,
    9
  ]
},

  ethyl_2_methyl_3_hexen_2_yn_4_dial: {
  "formula": "OHCC≡CC(CH3)=C(CH2CH3)CHO",
  "mainChain_Condensed": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "mainChain_Expanded": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "mainChain_Skeletal": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "mainChain3D": [
    1,
    2,
    3,
    4,
    5,
    6
  ]
},

  methyl_propyl_ether: {
    "formula": "CH3CH2CH2OCH3",
    "mainChain_Condensed": [
      1,
      2,
      3
    ],
    "mainChain_Expanded": [
      1,
      2,
      3
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3
    ],
    "mainChain3D": [
      3,
      2,
      4
    ]
  },

  ethyl_propyl_ether: {
    "formula": "CH3CH2CH2OCH2CH3",
    "mainChain_Condensed": [
      1,
      2,
      3
    ],
    "mainChain_Expanded": [
      1,
      2,
      3
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3
    ],
    "mainChain3D": [
      3,
      2,
      5
    ]
  },

  ethyl_isopropyl_ether: {
    "formula": "(CH3)2CHOCH2CH3",
    "mainChain_Condensed": [
      1,
      2,
      3
    ],
    "mainChain_Expanded": [
      1,
      2,
      3
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3
    ],
    "mainChain3D": [
      3,
      2,
      4
    ]
  },

  butyl_methyl_ether: {
    "formula": "CH3CH2CH2CH2OCH3",
    "mainChain_Condensed": [
      1,
      2,
      3,
      4
    ],
    "mainChain_Expanded": [
      1,
      2,
      3,
      4
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3,
      4
    ],
    "mainChain3D": [
      4,
      2,
      3,
      5
    ]
  },

  isobutyl_isopropyl_ether: {
    "formula": "(CH3)2CHCH2OCH(CH3)2",
    "mainChain_Condensed": [
      1,
      2,
      3
    ],
    "mainChain_Expanded": [
      1,
      2,
      3
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3
    ],
    "mainChain3D": [
      3,
      2,
      5
    ]
  },

  ethyl_sec_butyl_ether: {
    "formula": "CH3CH2CH(CH3)OCH2CH3",
    "mainChain_Condensed": [
      1,
      2,
      3,
      4
    ],
    "mainChain_Expanded": [
      1,
      2,
      3,
      4
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3,
      4
    ],
    "mainChain3D": [
      4,
      2,
      3,
      5
    ]
  },

  tert_butyl_isopropyl_ether: {
    "formula": "(CH3)3COCH(CH3)2",
    "mainChain_Condensed": [
      1,
      2,
      3
    ],
    "mainChain_Expanded": [
      1,
      2,
      3
    ],
    "mainChain_Skeletal": [
      1,
      2,
      3
    ],
    "mainChain3D": [
      4,
      2,
      5
    ]
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
  // Ethyne source MOLs. All four atoms of the expanded form are collinear.
  const ethyne_2D_Condensed = "ethyne_2D_Condensed.mol\n  Namelecule        2D\n\n  2  1  0  0  0  0  0  0  0  0999 V2000\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0  0  0  0\nM  END\n";
  const ethyne_2D_Expanded = "ethyne_2D_Expanded.mol\n  Namelecule        2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.3650    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3650    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0  0  0  0\n  1  3  1  0  0  0  0\n  2  4  1  0  0  0  0\nM  END\n";
  const ethyne_2D_Skeletal = "ethyne_2D_Skeletal.mol\n  Namelecule        2D\n\n  2  1  0  0  0  0  0  0  0  0999 V2000\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0  0  0  0\nM  END\n";
  reg("ethyne", ethyne_2D_Condensed, ethyne_2D_Expanded, ethyne_2D_Skeletal);

  // Large alkyne: parent1..7, methyl8/11 and ethyl9/10.
  const ethyl_4_dimethyl_3_5_heptyne_1_2D_Condensed = "ethyl_4_dimethyl_3_5_heptyne_1_2D_Condensed.mol\n  Namelecule        2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  4  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  5 11  1  0  0  0  0\nM  END\n";
  const ethyl_4_dimethyl_3_5_heptyne_1_2D_Expanded = "ethyl_4_dimethyl_3_5_heptyne_1_2D_Expanded.mol\n  Namelecule        2D\n\n 31 30  0  0  0  0  0  0  0  0999 V2000\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9500   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  4  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  5 11  1  0  0  0  0\n  1 12  1  0  0  0  0\n  3 13  1  0  0  0  0\n  4 14  1  0  0  0  0\n  5 15  1  0  0  0  0\n  6 16  1  0  0  0  0\n  6 17  1  0  0  0  0\n  7 18  1  0  0  0  0\n  7 19  1  0  0  0  0\n  7 20  1  0  0  0  0\n  8 21  1  0  0  0  0\n  8 22  1  0  0  0  0\n  8 23  1  0  0  0  0\n  9 24  1  0  0  0  0\n  9 25  1  0  0  0  0\n 10 26  1  0  0  0  0\n 10 27  1  0  0  0  0\n 10 28  1  0  0  0  0\n 11 29  1  0  0  0  0\n 11 30  1  0  0  0  0\n 11 31  1  0  0  0  0\nM  END\n";
  const ethyl_4_dimethyl_3_5_heptyne_1_2D_Skeletal = "ethyl_4_dimethyl_3_5_heptyne_1_2D_Skeletal.mol\n  Namelecule        2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n    2.1310    0.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4555    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1045    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5710    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2465    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9220    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800   -0.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1045    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    1.5600    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5710   -0.7800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  1  0  0  0  0\n  6  7  1  0  0  0  0\n  3  8  1  0  0  0  0\n  4  9  1  0  0  0  0\n  9 10  1  0  0  0  0\n  5 11  1  0  0  0  0\nM  END\n";
  reg("ethyl_4_dimethyl_3_5_heptyne_1", ethyl_4_dimethyl_3_5_heptyne_1_2D_Condensed, ethyl_4_dimethyl_3_5_heptyne_1_2D_Expanded, ethyl_4_dimethyl_3_5_heptyne_1_2D_Skeletal);
  // Internal triple at2; methylat4. Linear four-carbon sp neighborhood.
  const methyl_4_pentyne_2_2D_Condensed = "methyl_4_pentyne_2_2D_Condensed.mol\n  Namelecule        2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  4  5  1  0  0  0  0\n  2  6  1  0  0  0  0\nM  END\n";
  const methyl_4_pentyne_2_2D_Expanded = "methyl_4_pentyne_2_2D_Expanded.mol\n  Namelecule        2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.8149    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  4  5  1  0  0  0  0\n  2  6  1  0  0  0  0\n  1  7  1  0  0  0  0\n  1  8  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2 10  1  0  0  0  0\n  5 11  1  0  0  0  0\n  5 12  1  0  0  0  0\n  5 13  1  0  0  0  0\n  6 14  1  0  0  0  0\n  6 15  1  0  0  0  0\n  6 16  1  0  0  0  0\nM  END\n";
  const methyl_4_pentyne_2_2D_Skeletal = "methyl_4_pentyne_2_2D_Skeletal.mol\n  Namelecule        2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -1.4754    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7999    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5511    0.9378    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2266    1.3278    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7999   -0.6222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  4  5  1  0  0  0  0\n  2  6  1  0  0  0  0\nM  END\n";
  reg("methyl_4_pentyne_2", methyl_4_pentyne_2_2D_Condensed, methyl_4_pentyne_2_2D_Expanded, methyl_4_pentyne_2_2D_Skeletal);
  // Five-carbon parent, methyl at3; retain the linear sp segment.
  const methyl_3_pentyne_1_2D_Condensed = "methyl_3_pentyne_1_2D_Condensed.mol\n  Namelecule        2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  3  0  0  0  0\n  3  6  1  0  0  0  0\nM  END\n";
  const methyl_3_pentyne_1_2D_Expanded = "methyl_3_pentyne_1_2D_Expanded.mol\n  Namelecule        2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.8149    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  3  0  0  0  0\n  3  6  1  0  0  0  0\n  1  7  1  0  0  0  0\n  1  8  1  0  0  0  0\n  1  9  1  0  0  0  0\n  2 10  1  0  0  0  0\n  2 11  1  0  0  0  0\n  3 12  1  0  0  0  0\n  5 13  1  0  0  0  0\n  6 14  1  0  0  0  0\n  6 15  1  0  0  0  0\n  6 16  1  0  0  0  0\nM  END\n";
  const methyl_3_pentyne_1_2D_Skeletal = "methyl_3_pentyne_1_2D_Skeletal.mol\n  Namelecule        2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -1.4754    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7999    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5511    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2266    0.9378    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244   -0.6222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  1  0  0  0  0\n  4  5  3  0  0  0  0\n  3  6  1  0  0  0  0\nM  END\n";
  reg("methyl_3_pentyne_1", methyl_3_pentyne_1_2D_Condensed, methyl_3_pentyne_1_2D_Expanded, methyl_3_pentyne_1_2D_Skeletal);
  // Branched alkyne drawings follow the corresponding approved alkene layout.
  const methyl_3_butyne_1_2D_Condensed = "methyl_3_butyne_1_2D_Condensed.mol\n  Namelecule        2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  2  5  1  0  0  0  0\nM  END\n";
  const methyl_3_butyne_1_2D_Expanded = "methyl_3_butyne_1_2D_Expanded.mol\n  Namelecule        2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.1351    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.0349    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5350    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -0.6449    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.9151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5350    0.1351    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.8149    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.3650   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1950   -1.0349    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  2  5  1  0  0  0  0\n  1  6  1  0  0  0  0\n  1  7  1  0  0  0  0\n  1  8  1  0  0  0  0\n  2  9  1  0  0  0  0\n  4 10  1  0  0  0  0\n  5 11  1  0  0  0  0\n  5 12  1  0  0  0  0\n  5 13  1  0  0  0  0\nM  END\n";
  const methyl_3_butyne_1_2D_Skeletal = "methyl_3_butyne_1_2D_Skeletal.mol\n  Namelecule        2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.7999    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244    0.1578    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5511    0.5478    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2266    0.9378    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1244   -0.6222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  2  5  1  0  0  0  0\nM  END\n";
  reg("methyl_3_butyne_1", methyl_3_butyne_1_2D_Condensed, methyl_3_butyne_1_2D_Expanded, methyl_3_butyne_1_2D_Skeletal);
  // 2-butyne: both sp centers and their carbon neighbors are collinear.
  const butyne_2_2D_Condensed = "butyne_2_2D_Condensed.mol\n  Namelecule        2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  3  0  0  0  0\n  3  4  1  0  0  0  0\nM  END\n";
  const butyne_2_2D_Expanded = "butyne_2_2D_Expanded.mol\n  Namelecule        2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5350    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5350    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  3  0  0  0  0\n  3  4  1  0  0  0  0\n  1  5  1  0  0  0  0\n  1  6  1  0  0  0  0\n  1  7  1  0  0  0  0\n  4  8  1  0  0  0  0\n  4  9  1  0  0  0  0\n  4 10  1  0  0  0  0\nM  END\n";
  const butyne_2_2D_Skeletal = "butyne_2_2D_Skeletal.mol\n  Namelecule        2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3900    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  3  0  0  0  0\n  3  4  1  0  0  0  0\nM  END\n";
  reg("butyne_2", butyne_2_2D_Condensed, butyne_2_2D_Expanded, butyne_2_2D_Skeletal);
  // Local 2D drawings; sp carbons remain collinear in the skeletal form.
  const butyne_1_2D_Condensed = "butyne_1_2D_Condensed.mol\n  Namelecule        2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\nM  END\n";
  const butyne_1_2D_Expanded = "butyne_1_2D_Expanded.mol\n  Namelecule        2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5350    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5350    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\n  1  5  1  0  0  0  0\n  1  6  1  0  0  0  0\n  1  7  1  0  0  0  0\n  2  8  1  0  0  0  0\n  2  9  1  0  0  0  0\n  4 10  1  0  0  0  0\nM  END\n";
  const butyne_1_2D_Skeletal = "butyne_1_2D_Skeletal.mol\n  Namelecule        2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.4555    0.3900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  3  0  0  0  0\nM  END\n";
  reg("butyne_1", butyne_1_2D_Condensed, butyne_1_2D_Expanded, butyne_1_2D_Skeletal);

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

const butadiene_1_2_2D_Condensed = "butadiene_1_2_2D_Condensed\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  2  0\n  3  4  1  0\nM  END\n";

const butadiene_1_2_2D_Expanded = "butadiene_1_2_2D_Expanded\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  2  0\n  3  4  1  0\n  1  5  1  0\n  1  6  1  0\n  3  7  1  0\n  4  8  1  0\n  4  9  1  0\n  4 10  1  0\nM  END\n";

const butadiene_1_2_2D_Skeletal = "butadiene_1_2_2D_Skeletal\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.6163    0.1992    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4915   -0.1228    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6333   -0.4448    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4746    0.3684    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  2  0\n  3  4  1  0\nM  END\n";

const butadiene_1_3_2D_Condensed = "butadiene_1_3_2D_Condensed\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\nM  END\n";

const butadiene_1_3_2D_Expanded = "butadiene_1_3_2D_Expanded\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  1  5  1  0\n  1  6  1  0\n  2  7  1  0\n  3  8  1  0\n  4  9  1  0\n  4 10  1  0\nM  END\n";

const butadiene_1_3_2D_Skeletal = "butadiene_1_3_2D_Skeletal\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -1.5441   -0.1065    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4675    0.3516    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4675   -0.3516    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5441    0.1065    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\nM  END\n";

let butanol_2_2D_Condensed = "butanol_2_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  5  1  0\nM  END\n";

let butanol_2_2D_Expanded = "butanol_2_2D_Expanded\n     RDKit          2D\n\n 15 14  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  5  1  0\n  1  6  1  0\n  1  7  1  0\n  1  8  1  0\n  2  9  1  0\n  3 10  1  0\n  3 11  1  0\n  4 12  1  0\n  4 13  1  0\n  4 14  1  0\n  5 15  1  0\nM  END\n";

let butanol_2_2D_Skeletal = "butanol_2_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    1.5478   -0.5745    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4422   -0.1915    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4422   -0.9574    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5478   -0.5745    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2211    0.9574    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  5  1  0\nM  END\n";

let dimethyl_2_2_pentanol_3_2D_Condensed = "dimethyl_2_2_pentanol_3_2D_Condensed\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  2  7  1  0\n  3  8  1  0\nM  END\n";

let dimethyl_2_2_pentanol_3_2D_Expanded = "dimethyl_2_2_pentanol_3_2D_Expanded\n     RDKit          2D\n\n 24 23  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  2  7  1  0\n  3  8  1  0\n  1  9  1  0\n  1 10  1  0\n  1 11  1  0\n  3 12  1  0\n  4 13  1  0\n  4 14  1  0\n  5 15  1  0\n  5 16  1  0\n  5 17  1  0\n  6 18  1  0\n  6 19  1  0\n  6 20  1  0\n  7 21  1  0\n  7 22  1  0\n  7 23  1  0\n  8 24  1  0\nM  END\n";

let dimethyl_2_2_pentanol_3_2D_Skeletal = "dimethyl_2_2_pentanol_3_2D_Skeletal\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n    2.0265   -0.1556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.4294    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.1556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.4294    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -0.1556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2612    1.3256    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7653    1.3256    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.3256    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  2  7  1  0\n  3  8  1  0\nM  END\n";

const dimethyl_2_3_pentadiene_1_3_2D_Condensed = "dimethyl_2_3_pentadiene_1_3_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  2  6  1  0\n  3  7  1  0\nM  END\n";

const dimethyl_2_3_pentadiene_1_3_2D_Expanded = "dimethyl_2_3_pentadiene_1_3_2D_Expanded\n     RDKit          2D\n\n 19 18  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.3900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  2  6  1  0\n  3  7  1  0\n  1  8  1  0\n  1  9  1  0\n  4 10  1  0\n  5 11  1  0\n  5 12  1  0\n  5 13  1  0\n  6 14  1  0\n  6 15  1  0\n  6 16  1  0\n  7 17  1  0\n  7 18  1  0\n  7 19  1  0\nM  END\n";

const dimethyl_2_3_pentadiene_1_3_2D_Skeletal = "dimethyl_2_3_pentadiene_1_3_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -1.7550    1.0133    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5851    1.0132    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7550    1.0133    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550   -1.0132    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850   -1.0133    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  2  6  1  0\n  3  7  1  0\nM  END\n";

const dimethyl_2_3_penten_1_yne_4_2D_Condensed = "dimethyl_2_3_penten_1_yne_4_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  2  6  1  0\n  3  7  1  0\nM  END\n";

const dimethyl_2_3_penten_1_yne_4_2D_Expanded = "dimethyl_2_3_penten_1_yne_4_2D_Expanded\n     RDKit          2D\n\n 17 16  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  2  6  1  0\n  3  7  1  0\n  1  8  1  0\n  1  9  1  0\n  3 10  1  0\n  5 11  1  0\n  6 12  1  0\n  6 13  1  0\n  6 14  1  0\n  7 15  1  0\n  7 16  1  0\n  7 17  1  0\nM  END\n";

const dimethyl_2_3_penten_1_yne_4_2D_Skeletal = "dimethyl_2_3_penten_1_yne_4_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    1.2161    1.3404    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9950    0.1915    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.1106   -0.1915    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9950    0.5745    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8794    1.3404    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.8794   -0.5745    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3317   -1.3404    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  2  6  1  0\n  3  7  1  0\nM  END\n";

const ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Condensed = "ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Condensed\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  2  0\n  5  6  1  0\n  3  7  1  0\n  7  8  1  0\n  4  9  1  0\n  5 10  1  0\nM  END\n";

const ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Expanded = "ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Expanded\n     RDKit          2D\n\n 28 27  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.8500   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.8500    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    6.6300    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.7300   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.9000    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  2  0\n  5  6  1  0\n  3  7  1  0\n  7  8  1  0\n  4  9  1  0\n  5 10  1  0\n  1 11  1  0\n  1 12  1  0\n  2 13  1  0\n  3 14  1  0\n  6 15  1  0\n  6 16  1  0\n  6 17  1  0\n  7 18  1  0\n  7 19  1  0\n  8 20  1  0\n  8 21  1  0\n  8 22  1  0\n  9 23  1  0\n  9 24  1  0\n  9 25  1  0\n 10 26  1  0\n 10 27  1  0\n 10 28  1  0\nM  END\n";

const ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Skeletal = "ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Skeletal\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n   -1.4624    1.5199    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2923    1.5199    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2926    0.5066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2925   -0.5066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4624   -0.5066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0476   -1.5198    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4626    0.5065    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0476   -0.5067    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2925   -1.5199    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0474    0.5066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  2  0\n  5  6  1  0\n  3  7  1  0\n  7  8  1  0\n  4  9  1  0\n  5 10  1  0\nM  END\n";

let ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Condensed = "ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Condensed\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  3  0\n  3  7  1  0\n  7  8  1  0\n  4  9  1  0\n  2 10  1  0\nM  END\n";

let ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Expanded = "ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Expanded\n     RDKit          2D\n\n 24 23  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6300    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  3  0\n  3  7  1  0\n  7  8  1  0\n  4  9  1  0\n  2 10  1  0\n  1 11  1  0\n  1 12  1  0\n  1 13  1  0\n  2 14  1  0\n  6 15  1  0\n  7 16  1  0\n  7 17  1  0\n  8 18  1  0\n  8 19  1  0\n  8 20  1  0\n  9 21  1  0\n  9 22  1  0\n  9 23  1  0\n 10 24  1  0\nM  END\n";

let ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Skeletal = "ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Skeletal\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    2.5500    0.2325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.6105   -0.4649    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5368    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4026   -0.6974    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4763   -0.2325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5500    0.2325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4026    1.1623    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.3421    1.8596    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2684   -1.8596    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.7447   -1.6272    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  3  0\n  3  7  1  0\n  7  8  1  0\n  4  9  1  0\n  2 10  1  0\nM  END\n";

const ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Condensed = "ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Condensed\n     RDKit          2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  1  0\n  5  6  3  0\n  6  7  1  0\n  2  8  1  0\n  3  9  1  0\n  4 10  1  0\n 10 11  1  0\nM  END\n";

const ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Expanded = "ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Expanded\n     RDKit          2D\n\n 29 28  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.8000    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  1  0\n  5  6  3  0\n  6  7  1  0\n  2  8  1  0\n  3  9  1  0\n  4 10  1  0\n 10 11  1  0\n  1 12  1  0\n  1 13  1  0\n  1 14  1  0\n  4 15  1  0\n  7 16  1  0\n  7 17  1  0\n  7 18  1  0\n  8 19  1  0\n  8 20  1  0\n  8 21  1  0\n  9 22  1  0\n  9 23  1  0\n  9 24  1  0\n 10 25  1  0\n 10 26  1  0\n 11 27  1  0\n 11 28  1  0\n 11 29  1  0\nM  END\n";

const ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Skeletal = "ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Skeletal\n     RDKit          2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n    2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -1.0132    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -1.0132    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.9250    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.9250   -2.0265    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850   -2.0265    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.0132    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5850    2.0265    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  1  0\n  5  6  3  0\n  6  7  1  0\n  2  8  1  0\n  3  9  1  0\n  4 10  1  0\n 10 11  1  0\nM  END\n";

let isopropyl_4_dimethyl_3_5_heptanol_2_2D_Condensed = "isopropyl_4_dimethyl_3_5_heptanol_2_2D_Condensed\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  3  8  1  0\n  5  9  1  0\n  4 10  1  0\n 10 11  1  0\n 10 12  1  0\n  2 13  1  0\nM  END\n";

let isopropyl_4_dimethyl_3_5_heptanol_2_2D_Expanded = "isopropyl_4_dimethyl_3_5_heptanol_2_2D_Expanded\n     RDKit          2D\n\n 39 38  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.8000    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.9000   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    4.2900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    3.5100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    3.5100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  3  8  1  0\n  5  9  1  0\n  4 10  1  0\n 10 11  1  0\n 10 12  1  0\n  2 13  1  0\n  1 14  1  0\n  1 15  1  0\n  1 16  1  0\n  2 17  1  0\n  3 18  1  0\n  4 19  1  0\n  5 20  1  0\n  6 21  1  0\n  6 22  1  0\n  7 23  1  0\n  7 24  1  0\n  7 25  1  0\n  8 26  1  0\n  8 27  1  0\n  8 28  1  0\n  9 29  1  0\n  9 30  1  0\n  9 31  1  0\n 10 32  1  0\n 11 33  1  0\n 11 34  1  0\n 11 35  1  0\n 12 36  1  0\n 12 37  1  0\n 12 38  1  0\n 13 39  1  0\nM  END\n";

let isopropyl_4_dimethyl_3_5_heptanol_2_2D_Skeletal = "isopropyl_4_dimethyl_3_5_heptanol_2_2D_Skeletal\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n    3.0397   -0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.0397   -0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  3  8  1  0\n  5  9  1  0\n  4 10  1  0\n 10 11  1  0\n 10 12  1  0\n  2 13  1  0\nM  END\n";

const methyl_2_buten_1_yne_3_2D_Condensed = "methyl_2_buten_1_yne_3_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  3  0\n  2  5  1  0\nM  END\n";

const methyl_2_buten_1_yne_3_2D_Expanded = "methyl_2_buten_1_yne_3_2D_Expanded\n     RDKit          2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  3  0\n  2  5  1  0\n  1  6  1  0\n  1  7  1  0\n  4  8  1  0\n  5  9  1  0\n  5 10  1  0\n  5 11  1  0\nM  END\n";

const methyl_2_buten_1_yne_3_2D_Skeletal = "methyl_2_buten_1_yne_3_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    1.5478    0.9574    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6633    0.1915    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4422    0.5745    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5478    0.9574    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8844   -0.9574    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  3  0\n  2  5  1  0\nM  END\n";

let methyl_2_propanediol_1_2_2D_Condensed = "methyl_2_propanediol_1_2_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  5  1  0\n  2  6  1  0\nM  END\n";

let methyl_2_propanediol_1_2_2D_Expanded = "methyl_2_propanediol_1_2_2D_Expanded\n     RDKit          2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  5  1  0\n  2  6  1  0\n  1  7  1  0\n  1  8  1  0\n  3  9  1  0\n  3 10  1  0\n  3 11  1  0\n  4 12  1  0\n  4 13  1  0\n  4 14  1  0\n  5 15  1  0\n  6 16  1  0\nM  END\n";

let methyl_2_propanediol_1_2_2D_Skeletal = "methyl_2_propanediol_1_2_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n    0.5066    0.7406    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066    0.1556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199    0.7406    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.2587   -0.7406    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199    0.1556    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2454   -0.7406    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  5  1  0\n  2  6  1  0\nM  END\n";

let methyl_3_buten_3_ol_2_2D_Condensed = "methyl_3_buten_3_ol_2_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  3  5  1  0\n  2  6  1  0\nM  END\n";

let methyl_3_buten_3_ol_2_2D_Expanded = "methyl_3_buten_3_ol_2_2D_Expanded\n     RDKit          2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  3  5  1  0\n  2  6  1  0\n  1  7  1  0\n  1  8  1  0\n  1  9  1  0\n  2 10  1  0\n  4 11  1  0\n  4 12  1  0\n  5 13  1  0\n  5 14  1  0\n  5 15  1  0\n  6 16  1  0\nM  END\n";

let methyl_3_buten_3_ol_2_2D_Skeletal = "methyl_3_buten_3_ol_2_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n    1.5478    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4422   -0.3830    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4422    0.3830    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5478   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2211    1.5319    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2211   -1.5319    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  3  5  1  0\n  2  6  1  0\nM  END\n";

const methyl_3_pentadiene_1_3_2D_Condensed = "methyl_3_pentadiene_1_3_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  3  6  1  0\nM  END\n";

const methyl_3_pentadiene_1_3_2D_Expanded = "methyl_3_pentadiene_1_3_2D_Expanded\n     RDKit          2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  3  6  1  0\n  1  7  1  0\n  1  8  1  0\n  2  9  1  0\n  4 10  1  0\n  5 11  1  0\n  5 12  1  0\n  5 13  1  0\n  6 14  1  0\n  6 15  1  0\n  6 16  1  0\nM  END\n";

const methyl_3_pentadiene_1_3_2D_Skeletal = "methyl_3_pentadiene_1_3_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n    1.7550    0.6755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -0.3377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000   -0.3377    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850    0.6755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7550    0.6755    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5850   -1.3510    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  3  6  1  0\nM  END\n";

let methyl_3_pentyn_4_ol_2_2D_Condensed = "methyl_3_pentyn_4_ol_2_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  3  6  1  0\n  2  7  1  0\nM  END\n";

let methyl_3_pentyn_4_ol_2_2D_Expanded = "methyl_3_pentyn_4_ol_2_2D_Expanded\n     RDKit          2D\n\n 17 16  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  3  6  1  0\n  2  7  1  0\n  1  8  1  0\n  1  9  1  0\n  1 10  1  0\n  2 11  1  0\n  3 12  1  0\n  5 13  1  0\n  6 14  1  0\n  6 15  1  0\n  6 16  1  0\n  7 17  1  0\nM  END\n";

let methyl_3_pentyn_4_ol_2_2D_Skeletal = "methyl_3_pentyn_4_ol_2_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    2.1092   -0.1405    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.9735   -0.4215    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.1622    0.4215    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9735    0.1405    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.1092   -0.1405    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4867    1.5456    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.6490   -1.5456    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  3  6  1  0\n  2  7  1  0\nM  END\n";

let methyl_4_pentanol_2_2D_Condensed = "methyl_4_pentanol_2_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  4  6  1  0\n  2  7  1  0\nM  END\n";

let methyl_4_pentanol_2_2D_Expanded = "methyl_4_pentanol_2_2D_Expanded\n     RDKit          2D\n\n 21 20  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  4  6  1  0\n  2  7  1  0\n  1  8  1  0\n  1  9  1  0\n  1 10  1  0\n  2 11  1  0\n  3 12  1  0\n  3 13  1  0\n  4 14  1  0\n  5 15  1  0\n  5 16  1  0\n  5 17  1  0\n  6 18  1  0\n  6 19  1  0\n  6 20  1  0\n  7 21  1  0\nM  END\n";

let methyl_4_pentanol_2_2D_Skeletal = "methyl_4_pentanol_2_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    2.0265   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  4  6  1  0\n  2  7  1  0\nM  END\n";

let methyl_4_penten_4_yn_2_ol_1_2D_Condensed = "methyl_4_penten_4_yn_2_ol_1_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  3  0\n  3  4  1  0\n  4  5  2  0\n  4  6  1  0\n  1  7  1  0\nM  END\n";

let methyl_4_penten_4_yn_2_ol_1_2D_Expanded = "methyl_4_penten_4_yn_2_ol_1_2D_Expanded\n     RDKit          2D\n\n 15 14  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  3  0\n  3  4  1  0\n  4  5  2  0\n  4  6  1  0\n  1  7  1  0\n  1  8  1  0\n  1  9  1  0\n  5 10  1  0\n  5 11  1  0\n  6 12  1  0\n  6 13  1  0\n  6 14  1  0\n  7 15  1  0\nM  END\n";

let methyl_4_penten_4_yn_2_ol_1_2D_Skeletal = "methyl_4_penten_4_yn_2_ol_1_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    1.7036    0.9836    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5679    0.7026    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5679    0.4215    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7036    0.1405    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5149    0.9836    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0281   -0.9836    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5149    0.1405    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  3  0\n  3  4  1  0\n  4  5  2  0\n  4  6  1  0\n  1  7  1  0\nM  END\n";

const pentadiene_1_4_2D_Condensed = "pentadiene_1_4_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  2  0\nM  END\n";

const pentadiene_1_4_2D_Expanded = "pentadiene_1_4_2D_Expanded\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  2  0\n  1  6  1  0\n  1  7  1  0\n  2  8  1  0\n  3  9  1  0\n  3 10  1  0\n  4 11  1  0\n  5 12  1  0\n  5 13  1  0\nM  END\n";

const pentadiene_1_4_2D_Skeletal = "pentadiene_1_4_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -2.0265   -0.2340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.3510    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.2340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.3510    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265   -0.2340    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  2  0\nM  END\n";

  reg("butadiene_1_2", butadiene_1_2_2D_Condensed, butadiene_1_2_2D_Expanded, butadiene_1_2_2D_Skeletal);
  reg("butadiene_1_3", butadiene_1_3_2D_Condensed, butadiene_1_3_2D_Expanded, butadiene_1_3_2D_Skeletal);
  reg("butanol_2", butanol_2_2D_Condensed, butanol_2_2D_Expanded, butanol_2_2D_Skeletal);
  reg("dimethyl_2_2_pentanol_3", dimethyl_2_2_pentanol_3_2D_Condensed, dimethyl_2_2_pentanol_3_2D_Expanded, dimethyl_2_2_pentanol_3_2D_Skeletal);
  reg("dimethyl_2_3_pentadiene_1_3", dimethyl_2_3_pentadiene_1_3_2D_Condensed, dimethyl_2_3_pentadiene_1_3_2D_Expanded, dimethyl_2_3_pentadiene_1_3_2D_Skeletal);
  reg("dimethyl_2_3_penten_1_yne_4", dimethyl_2_3_penten_1_yne_4_2D_Condensed, dimethyl_2_3_penten_1_yne_4_2D_Expanded, dimethyl_2_3_penten_1_yne_4_2D_Skeletal);
  reg("ethyl_3_dimethyl_4_5_hexadiene_1_4", ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Condensed, ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Expanded, ethyl_3_dimethyl_4_5_hexadiene_1_4_2D_Skeletal);
  reg("ethyl_3_methyl_4_hexen_3_yn_5_ol_2", ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Condensed, ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Expanded, ethyl_3_methyl_4_hexen_3_yn_5_ol_2_2D_Skeletal);
  reg("ethyl_4_dimethyl_2_3_hepten_2_yne_5", ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Condensed, ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Expanded, ethyl_4_dimethyl_2_3_hepten_2_yne_5_2D_Skeletal);
  reg("isopropyl_4_dimethyl_3_5_heptanol_2", isopropyl_4_dimethyl_3_5_heptanol_2_2D_Condensed, isopropyl_4_dimethyl_3_5_heptanol_2_2D_Expanded, isopropyl_4_dimethyl_3_5_heptanol_2_2D_Skeletal);
  reg("methyl_2_buten_1_yne_3", methyl_2_buten_1_yne_3_2D_Condensed, methyl_2_buten_1_yne_3_2D_Expanded, methyl_2_buten_1_yne_3_2D_Skeletal);
  reg("methyl_2_propanediol_1_2", methyl_2_propanediol_1_2_2D_Condensed, methyl_2_propanediol_1_2_2D_Expanded, methyl_2_propanediol_1_2_2D_Skeletal);
  reg("methyl_3_buten_3_ol_2", methyl_3_buten_3_ol_2_2D_Condensed, methyl_3_buten_3_ol_2_2D_Expanded, methyl_3_buten_3_ol_2_2D_Skeletal);
  reg("methyl_3_pentadiene_1_3", methyl_3_pentadiene_1_3_2D_Condensed, methyl_3_pentadiene_1_3_2D_Expanded, methyl_3_pentadiene_1_3_2D_Skeletal);
  reg("methyl_3_pentyn_4_ol_2", methyl_3_pentyn_4_ol_2_2D_Condensed, methyl_3_pentyn_4_ol_2_2D_Expanded, methyl_3_pentyn_4_ol_2_2D_Skeletal);
  reg("methyl_4_pentanol_2", methyl_4_pentanol_2_2D_Condensed, methyl_4_pentanol_2_2D_Expanded, methyl_4_pentanol_2_2D_Skeletal);
  reg("methyl_4_penten_4_yn_2_ol_1", methyl_4_penten_4_yn_2_ol_1_2D_Condensed, methyl_4_penten_4_yn_2_ol_1_2D_Expanded, methyl_4_penten_4_yn_2_ol_1_2D_Skeletal);
  reg("pentadiene_1_4", pentadiene_1_4_2D_Condensed, pentadiene_1_4_2D_Expanded, pentadiene_1_4_2D_Skeletal);

})();

let pentanone_3_2D_Condensed = "pentanone_3_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  2  0\nM  END\n";
let pentanone_3_2D_Expanded = "pentanone_3_2D_Expanded\n     RDKit          2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  2  0\n  1  7  1  0\n  1  8  1  0\n  1  9  1  0\n  2 10  1  0\n  2 11  1  0\n  4 12  1  0\n  4 13  1  0\n  5 14  1  0\n  5 15  1  0\n  5 16  1  0\nM  END\n";
let pentanone_3_2D_Skeletal = "pentanone_3_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n    2.0265   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  2  0\nM  END\n";
window.MOL2D["pentanone_3"] = {condensed: pentanone_3_2D_Condensed, expanded: pentanone_3_2D_Expanded, skeletal: pentanone_3_2D_Skeletal};
let dimethyl_2_4_pentanone_3_2D_Condensed = "dimethyl_2_4_pentanone_3_2D_Condensed\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  4  7  1  0\n  3  8  2  0\nM  END\n";
let dimethyl_2_4_pentanone_3_2D_Expanded = "dimethyl_2_4_pentanone_3_2D_Expanded\n     RDKit          2D\n\n 22 21  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  4  7  1  0\n  3  8  2  0\n  1  9  1  0\n  1 10  1  0\n  1 11  1  0\n  2 12  1  0\n  4 13  1  0\n  5 14  1  0\n  5 15  1  0\n  5 16  1  0\n  6 17  1  0\n  6 18  1  0\n  6 19  1  0\n  7 20  1  0\n  7 21  1  0\n  7 22  1  0\nM  END\n";
let dimethyl_2_4_pentanone_3_2D_Skeletal = "dimethyl_2_4_pentanone_3_2D_Skeletal\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n    2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.4625    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  4  7  1  0\n  3  8  2  0\nM  END\n";
window.MOL2D["dimethyl_2_4_pentanone_3"] = {condensed: dimethyl_2_4_pentanone_3_2D_Condensed, expanded: dimethyl_2_4_pentanone_3_2D_Expanded, skeletal: dimethyl_2_4_pentanone_3_2D_Skeletal};
let trimethyl_3_4_4_pentanone_2_2D_Condensed = "trimethyl_3_4_4_pentanone_2_2D_Condensed\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160   -3.0713    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  4  7  1  0\n  4  8  1  0\n  2  9  2  0\nM  END\n";
let trimethyl_3_4_4_pentanone_2_2D_Expanded = "trimethyl_3_4_4_pentanone_2_2D_Expanded\n     RDKit          2D\n\n 25 24  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -4.0950    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -4.8750    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900   -4.0950    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -4.0950    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  4  7  1  0\n  4  8  1  0\n  2  9  2  0\n  1 10  1  0\n  1 11  1  0\n  1 12  1  0\n  3 13  1  0\n  5 14  1  0\n  5 15  1  0\n  5 16  1  0\n  6 17  1  0\n  6 18  1  0\n  6 19  1  0\n  7 20  1  0\n  7 21  1  0\n  7 22  1  0\n  8 23  1  0\n  8 24  1  0\n  8 25  1  0\nM  END\n";
let trimethyl_3_4_4_pentanone_2_2D_Skeletal = "trimethyl_3_4_4_pentanone_2_2D_Skeletal\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n    2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7653   -1.1888    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2612   -1.1888    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -1.4625    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  4  7  1  0\n  4  8  1  0\n  2  9  2  0\nM  END\n";
window.MOL2D["trimethyl_3_4_4_pentanone_2"] = {condensed: trimethyl_3_4_4_pentanone_2_2D_Condensed, expanded: trimethyl_3_4_4_pentanone_2_2D_Expanded, skeletal: trimethyl_3_4_4_pentanone_2_2D_Skeletal};
let diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Condensed = "diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Condensed\n     RDKit          2D\n\n 14 13  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  -11.2320    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    2.6325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    2.6325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  2  8  1  0\n  4  9  1  0\n  9 10  1  0\n  5 11  1  0\n 11 12  1  0\n  6 13  1  0\n  3 14  2  0\nM  END\n";
let diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Expanded = "diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Expanded\n     RDKit          2D\n\n 40 39  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.8000    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    4.2900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    3.5100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.7300    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    4.2900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    3.5100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.9000   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6300    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.0700    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  2  8  1  0\n  4  9  1  0\n  9 10  1  0\n  5 11  1  0\n 11 12  1  0\n  6 13  1  0\n  3 14  2  0\n  1 15  1  0\n  1 16  1  0\n  1 17  1  0\n  2 18  1  0\n  4 19  1  0\n  5 20  1  0\n  6 21  1  0\n  7 22  1  0\n  7 23  1  0\n  7 24  1  0\n  8 25  1  0\n  8 26  1  0\n  8 27  1  0\n  9 28  1  0\n  9 29  1  0\n 10 30  1  0\n 10 31  1  0\n 10 32  1  0\n 11 33  1  0\n 11 34  1  0\n 12 35  1  0\n 12 36  1  0\n 12 37  1  0\n 13 38  1  0\n 13 39  1  0\n 13 40  1  0\nM  END\n";
let diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Skeletal = "diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Skeletal\n     RDKit          2D\n\n 14 13  0  0  0  0  0  0  0  0999 V2000\n    3.0397    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.0397    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -2.0475    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    2.0475    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    1.4625    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  2  8  1  0\n  4  9  1  0\n  9 10  1  0\n  5 11  1  0\n 11 12  1  0\n  6 13  1  0\n  3 14  2  0\nM  END\n";
window.MOL2D["diethyl_4_5_dimethyl_2_6_heptanone_3"] = {condensed: diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Condensed, expanded: diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Expanded, skeletal: diethyl_4_5_dimethyl_2_6_heptanone_3_2D_Skeletal};
let penten_1_yn_4_one_3_2D_Condensed = "penten_1_yn_4_one_3_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  3  6  2  0\nM  END\n";
let penten_1_yn_4_one_3_2D_Expanded = "penten_1_yn_4_one_3_2D_Expanded\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  3  6  2  0\n  1  7  1  0\n  1  8  1  0\n  2  9  1  0\n  5 10  1  0\nM  END\n";
let penten_1_yn_4_one_3_2D_Skeletal = "penten_1_yn_4_one_3_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n    2.0588   -0.1220    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0457   -0.7070    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0323   -0.1222    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9808   -0.7072    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9940   -1.2923    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0323    1.0478    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  2  3  1  0\n  3  4  1  0\n  4  5  3  0\n  3  6  2  0\nM  END\n";
window.MOL2D["penten_1_yn_4_one_3"] = {condensed: penten_1_yn_4_one_3_2D_Condensed, expanded: penten_1_yn_4_one_3_2D_Expanded, skeletal: penten_1_yn_4_one_3_2D_Skeletal};
let dimethyl_4_5_hexen_5_yn_1_one_3_2D_Condensed = "dimethyl_4_5_hexen_5_yn_1_one_3_2D_Condensed\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  2  0\n  4  7  1  0\n  5  8  1  0\n  3  9  2  0\nM  END\n";
let dimethyl_4_5_hexen_5_yn_1_one_3_2D_Expanded = "dimethyl_4_5_hexen_5_yn_1_one_3_2D_Expanded\n     RDKit          2D\n\n 19 18  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.9000    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  2  0\n  4  7  1  0\n  5  8  1  0\n  3  9  2  0\n  1 10  1  0\n  4 11  1  0\n  6 12  1  0\n  6 13  1  0\n  7 14  1  0\n  7 15  1  0\n  7 16  1  0\n  8 17  1  0\n  8 18  1  0\n  8 19  1  0\nM  END\n";
let dimethyl_4_5_hexen_5_yn_1_one_3_2D_Skeletal = "dimethyl_4_5_hexen_5_yn_1_one_3_2D_Skeletal\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n    2.4884    0.8762    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.4752    0.2912    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4619   -0.2938    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5513    0.2912    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5646   -0.2937    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5779    0.2912    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5513    1.4613    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5646   -1.4638    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4619   -1.4638    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  3  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  2  0\n  4  7  1  0\n  5  8  1  0\n  3  9  2  0\nM  END\n";
window.MOL2D["dimethyl_4_5_hexen_5_yn_1_one_3"] = {condensed: dimethyl_4_5_hexen_5_yn_1_one_3_2D_Condensed, expanded: dimethyl_4_5_hexen_5_yn_1_one_3_2D_Expanded, skeletal: dimethyl_4_5_hexen_5_yn_1_one_3_2D_Skeletal};
let methyl_6_hepten_3_dione_2_5_2D_Condensed = "methyl_6_hepten_3_dione_2_5_2D_Condensed\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  -11.2320    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  6  8  1  0\n  2  9  2  0\n  5 10  2  0\nM  END\n";
let methyl_6_hepten_3_dione_2_5_2D_Expanded = "methyl_6_hepten_3_dione_2_5_2D_Expanded\n     RDKit          2D\n\n 22 21  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.8000    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.0700   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  6  8  1  0\n  2  9  2  0\n  5 10  2  0\n  1 11  1  0\n  1 12  1  0\n  1 13  1  0\n  3 14  1  0\n  4 15  1  0\n  6 16  1  0\n  7 17  1  0\n  7 18  1  0\n  7 19  1  0\n  8 20  1  0\n  8 21  1  0\n  8 22  1  0\nM  END\n";
let methyl_6_hepten_3_dione_2_5_2D_Skeletal = "methyl_6_hepten_3_dione_2_5_2D_Skeletal\n     RDKit          2D\n\n 10  9  0  0  0  0  0  0  0  0999 V2000\n    3.0397    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.0397    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265   -1.4625    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    1.4625    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  6  8  1  0\n  2  9  2  0\n  5 10  2  0\nM  END\n";
window.MOL2D["methyl_6_hepten_3_dione_2_5"] = {condensed: methyl_6_hepten_3_dione_2_5_2D_Condensed, expanded: methyl_6_hepten_3_dione_2_5_2D_Expanded, skeletal: methyl_6_hepten_3_dione_2_5_2D_Skeletal};
let ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Condensed = "ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Condensed\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  -11.2320    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  -13.1040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  -11.2320    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  3  0\n  6  7  1  0\n  7  8  1  0\n  3  9  1  0\n  9 10  1  0\n  4 11  1  0\n  2 12  2  0\n  7 13  2  0\nM  END\n";
let ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Expanded = "ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Expanded\n     RDKit          2D\n\n 27 26  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -8.1900    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -8.1900   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -8.1900    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -8.9700    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  3  0\n  6  7  1  0\n  7  8  1  0\n  3  9  1  0\n  9 10  1  0\n  4 11  1  0\n  2 12  2  0\n  7 13  2  0\n  1 14  1  0\n  1 15  1  0\n  1 16  1  0\n  8 17  1  0\n  8 18  1  0\n  8 19  1  0\n  9 20  1  0\n  9 21  1  0\n 10 22  1  0\n 10 23  1  0\n 10 24  1  0\n 11 25  1  0\n 11 26  1  0\n 11 27  1  0\nM  END\n";
let ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Skeletal = "ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Skeletal\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n    3.5584   -0.2088    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5451   -0.7938    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5319   -0.2088    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5186   -0.7937    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4947   -0.2088    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5078    0.3764    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5210    0.9613    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5343    0.3764    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5319    0.9613    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5451    1.5462    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5186   -1.9637    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5451   -1.9638    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5211    2.1313    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  3  0\n  6  7  1  0\n  7  8  1  0\n  3  9  1  0\n  9 10  1  0\n  4 11  1  0\n  2 12  2  0\n  7 13  2  0\nM  END\n";
window.MOL2D["ethyl_3_methyl_4_octen_3_yn_5_dione_2_7"] = {condensed: ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Condensed, expanded: ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Expanded, skeletal: ethyl_3_methyl_4_octen_3_yn_5_dione_2_7_2D_Skeletal};
let isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Condensed = "isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Condensed\n     RDKit          2D\n\n 15 14  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  -11.2320    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n  -13.1040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -9.3600   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.7440    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.8720    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.4880    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  7  8  3  0\n  3  9  1  0\n  6 10  1  0\n  4 11  1  0\n 11 12  1  0\n 11 13  1  0\n  2 14  2  0\n  5 15  2  0\nM  END\n";
let isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Expanded = "isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Expanded\n     RDKit          2D\n\n 33 32  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -8.1900    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    4.6800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -8.9700    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.0700   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    5.4600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    4.6800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300    4.6800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  7  8  3  0\n  3  9  1  0\n  6 10  1  0\n  4 11  1  0\n 11 12  1  0\n 11 13  1  0\n  2 14  2  0\n  5 15  2  0\n  1 16  1  0\n  1 17  1  0\n  1 18  1  0\n  6 19  1  0\n  8 20  1  0\n  9 21  1  0\n  9 22  1  0\n  9 23  1  0\n 10 24  1  0\n 10 25  1  0\n 10 26  1  0\n 11 27  1  0\n 12 28  1  0\n 12 29  1  0\n 12 30  1  0\n 13 31  1  0\n 13 32  1  0\n 13 33  1  0\nM  END\n";
let isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Skeletal = "isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Skeletal\n     RDKit          2D\n\n 15 14  0  0  0  0  0  0  0  0999 V2000\n    3.5824    0.5420    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5692   -0.0430    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5560    0.5419    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5427   -0.0431    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4706    0.5418    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4838   -0.0432    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.4971    0.5419    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5103    1.1268    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5559    1.7119    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4837   -1.2132    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5427   -1.2131    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4705   -1.7981    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5560   -1.7981    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5693   -1.2131    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4705    1.7119    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  2  0\n  4  5  1  0\n  5  6  1  0\n  6  7  1  0\n  7  8  3  0\n  3  9  1  0\n  6 10  1  0\n  4 11  1  0\n 11 12  1  0\n 11 13  1  0\n  2 14  2  0\n  5 15  2  0\nM  END\n";
window.MOL2D["isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5"] = {condensed: isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Condensed, expanded: isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Expanded, skeletal: isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5_2D_Skeletal};
let methanal_2D_Condensed = "methanal_2D_Condensed\n     RDKit          2D\n\n  2  1  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\nM  END\n";
let methanal_2D_Expanded = "methanal_2D_Expanded\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\n  1  3  1  0\n  1  4  1  0\nM  END\n";
let methanal_2D_Skeletal = "methanal_2D_Skeletal\n     RDKit          2D\n\n  2  1  0  0  0  0  0  0  0  0999 V2000\n   -0.5066   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5066    0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0\nM  END\n";
window.MOL2D["methanal"] = {condensed: methanal_2D_Condensed, expanded: methanal_2D_Expanded, skeletal: methanal_2D_Skeletal};
let propenal_2D_Condensed = "propenal_2D_Condensed\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  1  4  2  0\nM  END\n";
let propenal_2D_Expanded = "propenal_2D_Expanded\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  1  4  2  0\n  1  5  1  0\n  2  6  1  0\n  3  7  1  0\n  3  8  1  0\nM  END\n";
let propenal_2D_Skeletal = "propenal_2D_Skeletal\n     RDKit          2D\n\n  4  3  0  0  0  0  0  0  0  0999 V2000\n    0.5066    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199   -0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  1  4  2  0\nM  END\n";
window.MOL2D["propenal"] = {condensed: propenal_2D_Condensed, expanded: propenal_2D_Expanded, skeletal: propenal_2D_Skeletal};
let methyl_2_propenal_2D_Condensed = "methyl_2_propenal_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  2  4  1  0\n  1  5  2  0\nM  END\n";
let methyl_2_propenal_2D_Expanded = "methyl_2_propenal_2D_Expanded\n     RDKit          2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  2  4  1  0\n  1  5  2  0\n  1  6  1  0\n  3  7  1  0\n  3  8  1  0\n  4  9  1  0\n  4 10  1  0\n  4 11  1  0\nM  END\n";
let methyl_2_propenal_2D_Skeletal = "methyl_2_propenal_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    0.5066    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199    0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  2  4  1  0\n  1  5  2  0\nM  END\n";
window.MOL2D["methyl_2_propenal"] = {condensed: methyl_2_propenal_2D_Condensed, expanded: methyl_2_propenal_2D_Expanded, skeletal: methyl_2_propenal_2D_Skeletal};
let methyl_2_propanal_2D_Condensed = "methyl_2_propanal_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  5  2  0\nM  END\n";
let methyl_2_propanal_2D_Expanded = "methyl_2_propanal_2D_Expanded\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  5  2  0\n  1  6  1  0\n  2  7  1  0\n  3  8  1  0\n  3  9  1  0\n  3 10  1  0\n  4 11  1  0\n  4 12  1  0\n  4 13  1  0\nM  END\n";
let methyl_2_propanal_2D_Skeletal = "methyl_2_propanal_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    0.5066    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199    0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  5  2  0\nM  END\n";
window.MOL2D["methyl_2_propanal"] = {condensed: methyl_2_propanal_2D_Condensed, expanded: methyl_2_propanal_2D_Expanded, skeletal: methyl_2_propanal_2D_Skeletal};
let dimethyl_2_3_butanal_2D_Condensed = "dimethyl_2_3_butanal_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  5  1  0\n  3  6  1  0\n  1  7  2  0\nM  END\n";
let dimethyl_2_3_butanal_2D_Expanded = "dimethyl_2_3_butanal_2D_Expanded\n     RDKit          2D\n\n 19 18  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  5  1  0\n  3  6  1  0\n  1  7  2  0\n  1  8  1  0\n  2  9  1  0\n  3 10  1  0\n  4 11  1  0\n  4 12  1  0\n  4 13  1  0\n  5 14  1  0\n  5 15  1  0\n  5 16  1  0\n  6 17  1  0\n  6 18  1  0\n  6 19  1  0\nM  END\n";
let dimethyl_2_3_butanal_2D_Skeletal = "dimethyl_2_3_butanal_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n    1.1055    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.3830    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8844    0.3830    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9900   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2211   -1.5319    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.6633    1.5319    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9900   -0.7659    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  5  1  0\n  3  6  1  0\n  1  7  2  0\nM  END\n";
window.MOL2D["dimethyl_2_3_butanal"] = {condensed: dimethyl_2_3_butanal_2D_Condensed, expanded: dimethyl_2_3_butanal_2D_Expanded, skeletal: dimethyl_2_3_butanal_2D_Skeletal};
let ethyl_2_methyl_3_pentanal_2D_Condensed = "ethyl_2_methyl_3_pentanal_2D_Condensed\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  6  7  1  0\n  3  8  1  0\n  1  9  2  0\nM  END\n";
let ethyl_2_methyl_3_pentanal_2D_Expanded = "ethyl_2_methyl_3_pentanal_2D_Expanded\n     RDKit          2D\n\n 25 24  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  6  7  1  0\n  3  8  1  0\n  1  9  2  0\n  1 10  1  0\n  2 11  1  0\n  3 12  1  0\n  4 13  1  0\n  4 14  1  0\n  5 15  1  0\n  5 16  1  0\n  5 17  1  0\n  6 18  1  0\n  6 19  1  0\n  7 20  1  0\n  7 21  1  0\n  7 22  1  0\n  8 23  1  0\n  8 24  1  0\n  8 25  1  0\nM  END\n";
let ethyl_2_methyl_3_pentanal_2D_Skeletal = "ethyl_2_methyl_3_pentanal_2D_Skeletal\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n    1.5199    0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5066   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066    0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5331    0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5066   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5331   -0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  2  6  1  0\n  6  7  1  0\n  3  8  1  0\n  1  9  2  0\nM  END\n";
window.MOL2D["ethyl_2_methyl_3_pentanal"] = {condensed: ethyl_2_methyl_3_pentanal_2D_Condensed, expanded: ethyl_2_methyl_3_pentanal_2D_Expanded, skeletal: ethyl_2_methyl_3_pentanal_2D_Skeletal};
let ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Condensed = "ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Condensed\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  2  7  1  0\n  3  8  1  0\n  8  9  1  0\n  8 10  1  0\n  4 11  1  0\n 11 12  1  0\n  1 13  2  0\nM  END\n";
let ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Expanded = "ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Expanded\n     RDKit          2D\n\n 37 36  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -6.6300    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  2  7  1  0\n  3  8  1  0\n  8  9  1  0\n  8 10  1  0\n  4 11  1  0\n 11 12  1  0\n  1 13  2  0\n  1 14  1  0\n  2 15  1  0\n  3 16  1  0\n  4 17  1  0\n  5 18  1  0\n  5 19  1  0\n  6 20  1  0\n  6 21  1  0\n  6 22  1  0\n  7 23  1  0\n  7 24  1  0\n  7 25  1  0\n  8 26  1  0\n  9 27  1  0\n  9 28  1  0\n  9 29  1  0\n 10 30  1  0\n 10 31  1  0\n 10 32  1  0\n 11 33  1  0\n 11 34  1  0\n 12 35  1  0\n 12 36  1  0\n 12 37  1  0\nM  END\n";
let ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Skeletal = "ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Skeletal\n     RDKit          2D\n\n 13 12  0  0  0  0  0  0  0  0999 V2000\n    2.0802   -0.1162    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0066   -0.5811    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0671    0.1162    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0066   -0.3487    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9460    0.3487    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.0197   -0.1162    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8724   -1.7434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2013    1.2785    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.2750    1.7434    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7381    1.9759    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1408   -1.5110    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.2144   -1.9759    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.0197   -0.8136    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  4  5  1  0\n  5  6  1  0\n  2  7  1  0\n  3  8  1  0\n  8  9  1  0\n  8 10  1  0\n  4 11  1  0\n 11 12  1  0\n  1 13  2  0\nM  END\n";
window.MOL2D["ethyl_4_isopropyl_3_methyl_2_hexanal"] = {condensed: ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Condensed, expanded: ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Expanded, skeletal: ethyl_4_isopropyl_3_methyl_2_hexanal_2D_Skeletal};
let ethyl_4_penten_4_yn_2_al_2D_Condensed = "ethyl_4_penten_4_yn_2_al_2D_Condensed\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  3  0\n  3  4  1  0\n  4  5  2  0\n  4  6  1  0\n  6  7  1  0\n  1  8  2  0\nM  END\n";
let ethyl_4_penten_4_yn_2_al_2D_Expanded = "ethyl_4_penten_4_yn_2_al_2D_Expanded\n     RDKit          2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.7300   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.4600   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  3  0\n  3  4  1  0\n  4  5  2  0\n  4  6  1  0\n  6  7  1  0\n  1  8  2  0\n  1  9  1  0\n  5 10  1  0\n  5 11  1  0\n  6 12  1  0\n  6 13  1  0\n  7 14  1  0\n  7 15  1  0\n  7 16  1  0\nM  END\n";
let ethyl_4_penten_4_yn_2_al_2D_Skeletal = "ethyl_4_penten_4_yn_2_al_2D_Skeletal\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n    2.0281    1.1241    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.8924    0.8431    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.2434    0.5620    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.3791    0.2810    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.1904    1.1241    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.7036   -0.8431    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8394   -1.1241    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.8394    0.2810    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  3  0\n  3  4  1  0\n  4  5  2  0\n  4  6  1  0\n  6  7  1  0\n  1  8  2  0\nM  END\n";
window.MOL2D["ethyl_4_penten_4_yn_2_al"] = {condensed: ethyl_4_penten_4_yn_2_al_2D_Condensed, expanded: ethyl_4_penten_4_yn_2_al_2D_Expanded, skeletal: ethyl_4_penten_4_yn_2_al_2D_Skeletal};
let propanedial_2D_Condensed = "propanedial_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  4  2  0\n  3  5  2  0\nM  END\n";
let propanedial_2D_Expanded = "propanedial_2D_Expanded\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  4  2  0\n  3  5  2  0\n  1  6  1  0\n  2  7  1  0\n  2  8  1  0\n  3  9  1  0\nM  END\n";
let propanedial_2D_Skeletal = "propanedial_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n    0.5066   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199   -0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199    0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  4  2  0\n  3  5  2  0\nM  END\n";
window.MOL2D["propanedial"] = {condensed: propanedial_2D_Condensed, expanded: propanedial_2D_Expanded, skeletal: propanedial_2D_Skeletal};
let methyl_3_penten_2_dial_2D_Condensed = "methyl_3_penten_2_dial_2D_Condensed\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  1  7  2  0\n  5  8  2  0\nM  END\n";
let methyl_3_penten_2_dial_2D_Expanded = "methyl_3_penten_2_dial_2D_Expanded\n     RDKit          2D\n\n 16 15  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  1  7  2  0\n  5  8  2  0\n  1  9  1  0\n  2 10  1  0\n  4 11  1  0\n  4 12  1  0\n  5 13  1  0\n  6 14  1  0\n  6 15  1  0\n  6 16  1  0\nM  END\n";
let methyl_3_penten_2_dial_2D_Skeletal = "methyl_3_penten_2_dial_2D_Skeletal\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n    1.5199   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5066   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5331   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.5066    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5331   -0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5331    0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  1  0\n  3  6  1  0\n  1  7  2  0\n  5  8  2  0\nM  END\n";
window.MOL2D["methyl_3_penten_2_dial"] = {condensed: methyl_3_penten_2_dial_2D_Condensed, expanded: methyl_3_penten_2_dial_2D_Expanded, skeletal: methyl_3_penten_2_dial_2D_Skeletal};
let isopropyl_2_buten_2_dial_2D_Condensed = "isopropyl_2_buten_2_dial_2D_Condensed\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -2.6325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000   -2.6325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080   -2.6325    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  2  5  1  0\n  5  6  1  0\n  5  7  1  0\n  1  8  2  0\n  4  9  2  0\nM  END\n";
let isopropyl_2_buten_2_dial_2D_Expanded = "isopropyl_2_buten_2_dial_2D_Expanded\n     RDKit          2D\n\n 19 18  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000   -3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.5100    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -4.2900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -4.2900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -2.7300    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800   -3.5100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -4.2900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.7300    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -3.5100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  2  5  1  0\n  5  6  1  0\n  5  7  1  0\n  1  8  2  0\n  4  9  2  0\n  1 10  1  0\n  3 11  1  0\n  4 12  1  0\n  5 13  1  0\n  6 14  1  0\n  6 15  1  0\n  6 16  1  0\n  7 17  1  0\n  7 18  1  0\n  7 19  1  0\nM  END\n";
let isopropyl_2_buten_2_dial_2D_Skeletal = "isopropyl_2_buten_2_dial_2D_Skeletal\n     RDKit          2D\n\n  9  8  0  0  0  0  0  0  0  0999 V2000\n    1.5478    0.7659    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.4422    0.3830    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.4422    1.1489    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5478    0.7659    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.2211   -0.7659    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8844   -1.1489    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1055   -1.5319    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.4322    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.4322    1.5319    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  2  5  1  0\n  5  6  1  0\n  5  7  1  0\n  1  8  2  0\n  4  9  2  0\nM  END\n";
window.MOL2D["isopropyl_2_buten_2_dial"] = {condensed: isopropyl_2_buten_2_dial_2D_Condensed, expanded: isopropyl_2_buten_2_dial_2D_Expanded, skeletal: isopropyl_2_buten_2_dial_2D_Skeletal};
let ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Condensed = "ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Condensed\n     RDKit          2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2120    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.6160    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.4040   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080   -1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.8080    1.7550    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -7.0200    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  3  0\n  5  6  1  0\n  2  7  1  0\n  7  8  1  0\n  3  9  1  0\n  1 10  2  0\n  6 11  2  0\nM  END\n";
let ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Expanded = "ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Expanded\n     RDKit          2D\n\n 21 20  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.6800    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -5.8500   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -1.5600    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200   -2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5600    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  3  0\n  5  6  1  0\n  2  7  1  0\n  7  8  1  0\n  3  9  1  0\n  1 10  2  0\n  6 11  2  0\n  1 12  1  0\n  6 13  1  0\n  7 14  1  0\n  7 15  1  0\n  8 16  1  0\n  8 17  1  0\n  8 18  1  0\n  9 19  1  0\n  9 20  1  0\n  9 21  1  0\nM  END\n";
let ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Skeletal = "ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Skeletal\n     RDKit          2D\n\n 11 10  0  0  0  0  0  0  0  0999 V2000\n    2.6808    0.2211    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5319    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7659    0.8844    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3830    0.6633    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5319    0.4422    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.6808    0.2211    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1489   -1.1055    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.9149   -1.9900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1489    1.9900    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.4468   -0.6633    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.4468    1.1055    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  2  0\n  3  4  1  0\n  4  5  3  0\n  5  6  1  0\n  2  7  1  0\n  7  8  1  0\n  3  9  1  0\n  1 10  2  0\n  6 11  2  0\nM  END\n";
window.MOL2D["ethyl_2_methyl_3_hexen_2_yn_4_dial"] = {condensed: ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Condensed, expanded: ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Expanded, skeletal: ethyl_2_methyl_3_hexen_2_yn_4_dial_2D_Skeletal};
let methyl_propyl_ether_2D_Condensed = "methyl_propyl_ether_2D_Condensed\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  5  1  0\n  5  4  1  0\nM  END\n";
let methyl_propyl_ether_2D_Expanded = "methyl_propyl_ether_2D_Expanded\n     RDKit          2D\n\n 15 14  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  5  1  0\n  5  4  1  0\n  1  6  1  0\n  1  7  1  0\n  2  8  1  0\n  2  9  1  0\n  3 10  1  0\n  3 11  1  0\n  3 12  1  0\n  4 13  1  0\n  4 14  1  0\n  4 15  1  0\nM  END\n";
let methyl_propyl_ether_2D_Skeletal = "methyl_propyl_ether_2D_Skeletal\n     RDKit          2D\n\n  5  4  0  0  0  0  0  0  0  0999 V2000\n   -0.5066    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5066    0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  5  1  0\n  5  4  1  0\nM  END\n";
window.MOL2D["methyl_propyl_ether"] = {condensed: methyl_propyl_ether_2D_Condensed, expanded: methyl_propyl_ether_2D_Expanded, skeletal: methyl_propyl_ether_2D_Skeletal};
let ethyl_propyl_ether_2D_Condensed = "ethyl_propyl_ether_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  6  1  0\n  6  4  1  0\n  4  5  1  0\nM  END\n";
let ethyl_propyl_ether_2D_Expanded = "ethyl_propyl_ether_2D_Expanded\n     RDKit          2D\n\n 18 17  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  6  1  0\n  6  4  1  0\n  4  5  1  0\n  1  7  1  0\n  1  8  1  0\n  2  9  1  0\n  2 10  1  0\n  3 11  1  0\n  3 12  1  0\n  3 13  1  0\n  4 14  1  0\n  4 15  1  0\n  5 16  1  0\n  5 17  1  0\n  5 18  1  0\nM  END\n";
let ethyl_propyl_ether_2D_Skeletal = "ethyl_propyl_ether_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -1.0132    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  1  6  1  0\n  6  4  1  0\n  4  5  1  0\nM  END\n";
window.MOL2D["ethyl_propyl_ether"] = {condensed: ethyl_propyl_ether_2D_Condensed, expanded: ethyl_propyl_ether_2D_Expanded, skeletal: ethyl_propyl_ether_2D_Skeletal};
let ethyl_isopropyl_ether_2D_Condensed = "ethyl_isopropyl_ether_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  6  1  0\n  6  4  1  0\n  4  5  1  0\nM  END\n";
let ethyl_isopropyl_ether_2D_Expanded = "ethyl_isopropyl_ether_2D_Expanded\n     RDKit          2D\n\n 18 17  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  6  1  0\n  6  4  1  0\n  4  5  1  0\n  1  7  1  0\n  1  8  1  0\n  1  9  1  0\n  2 10  1  0\n  3 11  1  0\n  3 12  1  0\n  3 13  1  0\n  4 14  1  0\n  4 15  1  0\n  5 16  1  0\n  5 17  1  0\n  5 18  1  0\nM  END\n";
let ethyl_isopropyl_ether_2D_Skeletal = "ethyl_isopropyl_ether_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -1.0132   -0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    0.8775    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.8775    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  6  1  0\n  6  4  1  0\n  4  5  1  0\nM  END\n";
window.MOL2D["ethyl_isopropyl_ether"] = {condensed: ethyl_isopropyl_ether_2D_Condensed, expanded: ethyl_isopropyl_ether_2D_Expanded, skeletal: ethyl_isopropyl_ether_2D_Skeletal};
let butyl_methyl_ether_2D_Condensed = "butyl_methyl_ether_2D_Condensed\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  1  6  1  0\n  6  5  1  0\nM  END\n";
let butyl_methyl_ether_2D_Expanded = "butyl_methyl_ether_2D_Expanded\n     RDKit          2D\n\n 18 17  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  1  6  1  0\n  6  5  1  0\n  1  7  1  0\n  1  8  1  0\n  2  9  1  0\n  2 10  1  0\n  3 11  1  0\n  3 12  1  0\n  4 13  1  0\n  4 14  1  0\n  4 15  1  0\n  5 16  1  0\n  5 17  1  0\n  5 18  1  0\nM  END\n";
let butyl_methyl_ether_2D_Skeletal = "butyl_methyl_ether_2D_Skeletal\n     RDKit          2D\n\n  6  5  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132    0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.5850    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132    0.5850    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  1  6  1  0\n  6  5  1  0\nM  END\n";
window.MOL2D["butyl_methyl_ether"] = {condensed: butyl_methyl_ether_2D_Condensed, expanded: butyl_methyl_ether_2D_Expanded, skeletal: butyl_methyl_ether_2D_Skeletal};
let isobutyl_isopropyl_ether_2D_Condensed = "isobutyl_isopropyl_ether_2D_Condensed\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  8  1  0\n  8  5  1  0\n  5  6  1  0\n  5  7  1  0\nM  END\n";
let isobutyl_isopropyl_ether_2D_Expanded = "isobutyl_isopropyl_ether_2D_Expanded\n     RDKit          2D\n\n 24 23  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700   -1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.3900   -1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  8  1  0\n  8  5  1  0\n  5  6  1  0\n  5  7  1  0\n  1  9  1  0\n  1 10  1  0\n  2 11  1  0\n  3 12  1  0\n  3 13  1  0\n  3 14  1  0\n  4 15  1  0\n  4 16  1  0\n  4 17  1  0\n  5 18  1  0\n  6 19  1  0\n  6 20  1  0\n  6 21  1  0\n  7 22  1  0\n  7 23  1  0\n  7 24  1  0\nM  END\n";
let isobutyl_isopropyl_ether_2D_Skeletal = "isobutyl_isopropyl_ether_2D_Skeletal\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.5066    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.5199   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.5331    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5331   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5199    1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.5066   -0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  1  8  1  0\n  8  5  1  0\n  5  6  1  0\n  5  7  1  0\nM  END\n";
window.MOL2D["isobutyl_isopropyl_ether"] = {condensed: isobutyl_isopropyl_ether_2D_Condensed, expanded: isobutyl_isopropyl_ether_2D_Expanded, skeletal: isobutyl_isopropyl_ether_2D_Skeletal};
let ethyl_sec_butyl_ether_2D_Condensed = "ethyl_sec_butyl_ether_2D_Condensed\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  7  1  0\n  7  5  1  0\n  5  6  1  0\nM  END\n";
let ethyl_sec_butyl_ether_2D_Expanded = "ethyl_sec_butyl_ether_2D_Expanded\n     RDKit          2D\n\n 21 20  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -3.1200    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  7  1  0\n  7  5  1  0\n  5  6  1  0\n  1  8  1  0\n  1  9  1  0\n  1 10  1  0\n  2 11  1  0\n  3 12  1  0\n  3 13  1  0\n  4 14  1  0\n  4 15  1  0\n  4 16  1  0\n  5 17  1  0\n  5 18  1  0\n  6 19  1  0\n  6 20  1  0\n  6 21  1  0\nM  END\n";
let ethyl_sec_butyl_ether_2D_Skeletal = "ethyl_sec_butyl_ether_2D_Skeletal\n     RDKit          2D\n\n  7  6  0  0  0  0  0  0  0  0999 V2000\n   -1.0132   -1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0265    1.4625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0132   -0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0265    0.2925    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    0.2925    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  3  4  1  0\n  2  7  1  0\n  7  5  1  0\n  5  6  1  0\nM  END\n";
window.MOL2D["ethyl_sec_butyl_ether"] = {condensed: ethyl_sec_butyl_ether_2D_Condensed, expanded: ethyl_sec_butyl_ether_2D_Expanded, skeletal: ethyl_sec_butyl_ether_2D_Skeletal};
let tert_butyl_isopropyl_ether_2D_Condensed = "tert_butyl_isopropyl_ether_2D_Condensed\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  2  8  1  0\n  8  5  1  0\n  5  6  1  0\n  5  7  1  0\nM  END\n";
let tert_butyl_isopropyl_ether_2D_Expanded = "tert_butyl_isopropyl_ether_2D_Expanded\n     RDKit          2D\n\n 24 23  0  0  0  0  0  0  0  0999 V2000\n   -0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.0000    2.3400    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.1700    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.1700    1.1700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000    3.1200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.7800    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    0.7800    2.3400    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.1700    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.9500    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    2.3400   -0.7800    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5600    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.1200    0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    0.3900    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    3.5100    1.9500    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n    4.2900    1.1700    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  2  8  1  0\n  8  5  1  0\n  5  6  1  0\n  5  7  1  0\n  1  9  1  0\n  1 10  1  0\n  1 11  1  0\n  3 12  1  0\n  3 13  1  0\n  3 14  1  0\n  4 15  1  0\n  4 16  1  0\n  4 17  1  0\n  5 18  1  0\n  6 19  1  0\n  6 20  1  0\n  6 21  1  0\n  7 22  1  0\n  7 23  1  0\n  7 24  1  0\nM  END\n";
let tert_butyl_isopropyl_ether_2D_Skeletal = "tert_butyl_isopropyl_ether_2D_Skeletal\n     RDKit          2D\n\n  8  7  0  0  0  0  0  0  0  0999 V2000\n   -0.1917   -0.8610    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -0.9438    0.0353    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -2.0960   -0.1679    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n   -1.3439    1.1347    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0827    0.0353    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.0960    0.6203    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.0827   -1.1347    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    0.0695    0.6203    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0\n  2  3  1  0\n  2  4  1  0\n  2  8  1  0\n  8  5  1  0\n  5  6  1  0\n  5  7  1  0\nM  END\n";
window.MOL2D["tert_butyl_isopropyl_ether"] = {condensed: tert_butyl_isopropyl_ether_2D_Condensed, expanded: tert_butyl_isopropyl_ether_2D_Expanded, skeletal: tert_butyl_isopropyl_ether_2D_Skeletal};
