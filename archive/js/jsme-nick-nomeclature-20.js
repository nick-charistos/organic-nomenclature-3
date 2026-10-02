let selectedMol
let jsmeNomeclatureApplet
let atomSymbols3DFlag = true
let rotateFlag = false
let carbonHydrogens
let bondList, multiBondList
let mode2D = 'condensed'
let modeSuffix = ''
let molSnap
let highAtoms
let nameAnalysisMode
let carbons = 0
let myNumberingTimeout
let numbersSVGElements = []
let currNumberEl = 0
let namingRules
let ruleFlag = false
let ruleTableHighlight = 0
let ruleTableFlag = false
let vis3D = 'ballnstick'
let JmolSelection = "select none"

///////// INIT JSME //////
function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "450px", "195px", {
        'options': "nozoom,depict,marker",
        'depictbg': '#fff',
        'atombgsize': '0.6',
    });
    // jsmeNomeclatureApplet.options("nozoom,depict,marker")
    jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6)

     let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff","#ff8566", "#ff8566"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())
}




$(document).ready(function () {


    fInitData()
    fInitNomeclatureMenu()
    fInitTheory()
    fShowCreditLibs()

    // Add data (2D structure files ) to nameExamples object
    function fInitData() {
        for (let prop in nameExamples) {

            my2D = eval(prop + "_2D");
            my2D_Ε = eval(prop + "_2D_E");

            nameExamples[prop].structure2D = my2D
            nameExamples[prop].structure2D_Ε = my2D_Ε

            my3D = "mols/nomeclature/" + prop + "_3D.sdf"
            nameExamples[prop].file3D = my3D
        }


    }

    //// Create menu
    function fInitNomeclatureMenu() {
        let myHTML = " <div class='panelTitle' style=''> Παραδείγματα </div><div class='menuContainer' style=''>"

        for (let prop in nameExamples) {

            let myMolFormula = nameExamples[prop].formula;
            //format formula
            myMolFormula = myMolFormula.replace(/(\d+)/g, '<sub>$1</sub>'); // sub numbers

            myMolFormula = myMolFormula.replace(/(['='])/g, '<span class="bondSymbol large" >&#9552;</span>');
            // double bond
            myMolFormula = myMolFormula.replace(/(['_'])/g, '<span class="bondSymbol " style="" >&#9776;</span>'); // triple bond

            //add menu item
            myHTML += "<div id='" + prop + "' class='menuLi'> " + myMolFormula + "</div>"
        }
        myHTML += "</div>"
        $("#nomeclatureMenu").html(myHTML)
    }






    /// Menu funcionality: SELECT MOLECULE
    $(".menuLi").on("click", function () {
        selectedMol = $(this).attr('id');

        $(".menuLi").removeClass("selectedLi");
        $(this).addClass("selectedLi");

        fSelectMol()

    });


    function fSelectMol() {

        fInitProps()
        fClearHighlights()
        fLoadMol2D()
        fLoadMol3D()

        showAtomSymbols3D();
        rotate3D()
        fShowMolName()
        fShowNameAnalysis()
        fExplainNameComp()

        // getMolData() // debug
    }

    function fInitProps() {
        currNumberEl = 0
        clearInterval(myNumberingTimeout)
        nameAnalysisMode = 'none'
        carbons = 0
        ruleTableHighlight = 0
    }

    function fShowMolName() {
        molName = nameExamples[selectedMol].name
        $("#molName").html(molName)
        console.log(molName)
    }






    function fLoadMol2D() {

        switch (mode2D) {
            case 'condensed':
                myMol2D = nameExamples[selectedMol].structure2D
                break;
            case 'expanded':
                myMol2D = nameExamples[selectedMol].structure2D_Ε
                break;
            default:
                myMol2D = nameExamples[selectedMol].structure2D
        }



        if (!myMol2D) { jsmeNomeclatureApplet.clear() }

        jsmeNomeclatureApplet.readMolFile(myMol2D);
        jsmeNomeclatureApplet.setMolecularAreaScale(2.4)

        fAnalyseStructure()
        fAnalyseBonds()
        fUpdateSVG()

    }

    function fAnalyseBonds() {
        let bondsCount = jsmeNomeclatureApplet.totalNumberOfBonds();
        bondList = Array(bondsCount)
        multiBondList = []
        for (i = 1; i < bondsCount + 1; i++) {
            let currBond = jsmeNomeclatureApplet.getBond(0, i);
            bondOrder = currBond.order
            bondAtom1 = currBond.atoms[0]
            atomType1 = jsmeNomeclatureApplet.getAtom(0, bondAtom1).label
            bondAtom2 = currBond.atoms[1]
            atomType2 = jsmeNomeclatureApplet.getAtom(0, bondAtom2).label
            bondList[i - 1] = [bondAtom1, bondAtom2, bondOrder]
            if (bondOrder > 1 && atomType1 == atomType2 && atomType1 == 'C') {
                multiBondList.push(i)
            }
        }
    }

    function fAnalyseStructure() {
        carbons = 0
        let atomsCount = jsmeNomeclatureApplet.totalNumberOfAtoms();
        let atomTypeList = Array(atomsCount)
        for (i = 1; i < atomsCount + 1; i++) {
            atomTypeList[i - 1] = jsmeNomeclatureApplet.getAtom(0, i).label
        }

        let bondsCount = jsmeNomeclatureApplet.totalNumberOfBonds();
        let atomBondList = Array(atomsCount).fill(0)

        for (i = 1; i < bondsCount + 1; i++) {
            let currBond = jsmeNomeclatureApplet.getBond(0, i);

            bondOrder = currBond.order
            bondAtom1 = currBond.atoms[0]
            bondAtom2 = currBond.atoms[1]

            atomBondList[bondAtom1 - 1] = atomBondList[bondAtom1 - 1] + bondOrder
            atomBondList[bondAtom2 - 1] = atomBondList[bondAtom2 - 1] + bondOrder
        }
        // console.log('atoFmbondlist: ',bondList)

        for (i = 0; i < atomsCount; i++) {
            if (atomTypeList[i] == 'C') {
                carbonHydrogens[i] = 4 - atomBondList[i]
                carbons += 1
            } else {
                carbonHydrogens[i] = 0
            }
        }

        // console.log(carbonHydrogens)


    }

    function fAddHydrogens2SVG() {

        molSnap = Snap("#jsmeNomeclatureSVG svg")

        tmpTexts = molSnap.selectAll('text')
        tmpRects = molSnap.selectAll('rect')
        tmpBonds = molSnap.selectAll('line')
        for (i = 0; i < tmpBonds.length; i++) {

        }

        for (i = 0; i < tmpTexts.length; i++) {
            currText = tmpTexts[i].attr('text');
            currElement = molSnap.select("text:nth-of-type(" + (i + 1) + ")");

            if (currText === 'C') {
                currID = currText + (i + 1)

                currHydrogensCount = carbonHydrogens[i]
                switch (currHydrogensCount) {
                    case 0:
                        myLabel = 'C'
                        myNo = ''
                        break
                    case 1:
                        myLabel = 'CH'
                        myNo = ''
                        tmpRects[i + 1].attr({ width: 470 })
                        rectX = parseInt(tmpRects[i + 1].attr('x')) + 60
                        tmpRects[i + 1].attr({ x: rectX })
                        break
                    case 4:
                        myLabel = 'CH'
                        myNo = 4
                        break
                    default:
                        myLabel = 'CH'
                        myNo = currHydrogensCount
                        tmpRects[i + 1].attr({ width: 600 })
                        rectX = parseInt(tmpRects[i + 1].attr('x')) - 120
                        tmpRects[i + 1].attr({ x: rectX })
                        textX = parseInt(tmpTexts[i].attr('x')) - 160
                        tmpTexts[i].attr({ x: textX })
                }

                currString = tmpTexts[i].toString();
                newString = currString.replace((['>C</text>']), 'class="svgAtomLabel" id="' + currID + '"><tspan >' + myLabel + '<tspan dy="70" font-size=".8em">' + myNo + '</tspan></tspan></text>');
                newStringElement = Snap.parse(newString)
                tmpTexts[i].remove()
                molSnap.select("g").append(newStringElement)

            } else {
                currString = tmpTexts[i].toString();
                newStringElement = Snap.parse(currString)
                tmpTexts[i].remove()
                molSnap.select("g").append(newStringElement)
            }

        }


    }

    function fUpdateSVG() {

        let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
        $("#jsmeNomeclatureSVG").html(mySVG);
        if (mode2D == 'condensed') {
            // fAnalyseStructure()
            fAddHydrogens2SVG()
        }
        molSnap = Snap("#jsmeNomeclatureSVG svg")
        snapLogo = molSnap.select('polygon:last-of-type')
        snapLogo.remove()


    }

    function fLoadMol3D() {
        let myMol3D = nameExamples[selectedMol].file3D
        Jmol.script(jmolAppletNomeclature, "frank off;load " + myMol3D + ";  select all; center selected;" + nameExamples[selectedMol].moveto + "; script spt/init-3.spt;");
        fSetMolVis3D()
    }


    function showAtomSymbols3D() {
        if (atomSymbols3DFlag) {
            Jmol.script(jmolAppletNomeclature, "select all; labels %e;" + JmolSelection + ";")
        } else {
            Jmol.script(jmolAppletNomeclature, "select all; labels off;" + JmolSelection + ";")
        }

        if (nameAnalysisMode == 'comp1') {
            fShowNumbering3D()
        }
    }

    function rotate3D() {
        if (rotateFlag) {
            Jmol.script(jmolAppletNomeclature, "rotate spin 60;")
        } else {
            Jmol.script(jmolAppletNomeclature, "rotate  off;")
        }

    }

    $("#radio2DMode").on("click", ".radioCheckContainer", function () {
        currMode2DNo = $(this).parent().children(".radioCheckContainer").index(this);
        if (currMode2DNo == 0) {
            mode2D = 'condensed'
            modeSuffix = ''
        } else {
            mode2D = 'expanded'
            modeSuffix = '_E'
        }
        fLoadMol2D()

        switch (nameAnalysisMode) {
            case 'comp1':
                fClearHighlights()
                fShowNumbering()
                $("#ruleTheoryContainer").show()
                break
            case 'comp2':
                fHighlightMultiBonds()
                fHighlightMultiBonds3D()
                $("#ruleTheoryContainer").show()
                break
            case 'comp3':
                fHighlightFG()
                fHighlightFG3D()
                $("#ruleTheoryContainer").show()
                break
            case 'none':

                break
            default:

        }




        // getMolData() // debug

    });


    ///////////////  Name Analysis /////////////////

    function fInitTheory() {
        r0 = "Το όνομα μιας άκυκλης οργανικής ένωσης που έχει συνεχή ευθύγραμμη ανθρακική αλυσίδα (χωρίς διακλαδώσεις) προκύπτει από τον συνδυασμό τριών συνθετικών."
        r1 = "Το πρώτο συνθετικό δείχνει τον αριθμό των ατόμων άνθρακα της ανθρακικής αλυσίδας."
        r2 = "Το δεύτερο συνθετικό δείχνει το είδος των δεσμών μεταξύ των ατόμων άνθρακα (βαθμός κορεσμού της ένωσης)."
        r3 = "Το τρίτο συνθετικό δηλώνει την χημική τάξη που ανήκει η οργανική ένωση."

        r1Table = "   <div class='VFlex namingRuleTable rule1'>" +
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

        r2Table = "    <div class='VFlex namingRuleTable rule2'>" +
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

        r3Table = "    <div class='VFlex namingRuleTable rule3'>" +
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

        namingRules = {
            general: r0,
            rule1: r1,
            rule2: r2,
            rule3: r3,
            table1: r1Table,
            table2: r2Table,
            table3: r3Table,

        }
    }

    function fShowNameAnalysis() {
        comp1 = nameExamples[selectedMol].nameComponents[0]
        comp2 = nameExamples[selectedMol].nameComponents[1]
        comp3 = nameExamples[selectedMol].nameComponents[2]

        compBox = "<div class='nameCompBox' "
        compBox1 = compBox + " id='comp1' >" + comp1 + "</div>"
        compBox2 = compBox + " id='comp2' >" + comp2 + "</div>"
        compBox3 = compBox + " id='comp3' >" + comp3 + "</div>"

        nameCompContainer = "<div class='panelTitle '>Επεξήγηση ονομασίας </div><div class='ruleText' >" + namingRules.general + "</div><div class='nameCompContainer'>"
        nameCompContainer += compBox1
        nameCompContainer += "<div class='nameCompPlus' > + </div>"
        nameCompContainer += compBox2
        nameCompContainer += "<div class='nameCompPlus' > + </div>"
        nameCompContainer += compBox3
        nameCompContainer += "</div>"

        $("#nameAnalysisContainer").html(nameCompContainer)

    }

    function fClearHighlights() {
        clearInterval(myNumberingTimeout)
        currNumberEl = 0
        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.resetBondColors(0)
        Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color bonds none")
        removeEcho3D()
        showAtomSymbols3D()
        // ruleFlag = false
        $("#ruleTheoryContainer").hide()
        ruleTableHighlight = 0
        JmolSelection = 'select none;'

    }

    // first component
    $(document).on("click", "#comp1", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')
            fClearHighlights()
            fUpdateSVG()

        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')
            nameAnalysisMode = 'comp1'
            fShowNumbering()
            // fShowNumbering3D()
            $("#ruleTheoryContainer").show()
        }
        fExplainNameComp()

    })
    // second component
    $(document).on("click", "#comp2", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')


        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')
            nameAnalysisMode = 'comp2'
            showAtomSymbols3D()
            fHighlightMultiBonds()
            fHighlightMultiBonds3D()
            $("#ruleTheoryContainer").show()
        }
        fExplainNameComp()

    })

    // third component
    $(document).on("click", "#comp3", function () {
        fClearHighlights()
        fUpdateSVG()
        if ($(this).hasClass('selected')) {
            nameAnalysisMode = 'none'
            $(".nameCompBox").removeClass('selected')

        } else {
            $(".nameCompBox").removeClass('selected')
            $(this).addClass('selected')
            nameAnalysisMode = 'comp3'
            showAtomSymbols3D()
            fHighlightFG()
            fHighlightFG3D()
            $("#ruleTheoryContainer").show()
        }
        fExplainNameComp()

    })

    function fExplainNameComp() {

        switch (nameAnalysisMode) {
            case 'none':
                myText = 'Κάνε κλικ σε ένα συνθετικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;background-color:#fff;font-size:1rem;box-shadow:0 0 #fff;"
                myClass = ''
                ruleFlag = false
                break;
            case 'comp1':
                myText = 'Έχει ' + carbons + ' άτομα άνθρακα C'
                nStyle = ""
                myClass = ''
                ruleTableHighlight = carbons
                break;
            case 'comp2':
                switch (nameExamples[selectedMol].nameComponents[1]) {
                    case 'άν':
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                        break
                    case 'αν':
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                        break
                    case 'έν':
                        myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 2
                        break
                    case 'εν':
                        myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 2
                        break
                    case 'ίν':
                        myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 3
                        break
                    case 'ιν':
                        myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 3
                        break
                    case 'διέν':
                        myText = 'δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 4
                        break
                    case 'διεν':
                        myText = 'δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 4
                        break
                    default:
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        ruleTableHighlight = 1
                }
                myText = 'Έχει ' + myText
                nStyle = ""
                myClass = ''
                break;
            case 'comp3':
                myText = 'Ανήκει στη χημική τάξη ' + nameExamples[selectedMol].class
                nStyle = ""
                myClass = ''
                switch (nameExamples[selectedMol].class) {
                    case 'Υδρογονάνθρακες':
                        ruleTableHighlight = 1
                        break
                    case 'Αλκοόλες':
                        ruleTableHighlight = 2
                        break
                    case 'Αλδεϋδες':
                        ruleTableHighlight = 3
                        break
                    case 'Κετόνες':
                        ruleTableHighlight = 4
                        break
                    case 'Καρβοξυλικά οξέα':
                        ruleTableHighlight = 5
                        break
                    case 'Νιτρίλια':
                        ruleTableHighlight = 6
                        break
                }
                break;
            default:
                myText = 'Κάνε κλικ σε ένα συστατικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;"
                myClass = ''
        }
        fShowRule(nameAnalysisMode)
        myHTML = "<div class='explainText " + myClass + " ' style='" + nStyle + "'  >" + myText + "</div>"
        $("#nameAnalysisExplain").html(myHTML)


    }

    function fShowRule(theRule) {

        switch (theRule) {
            case 'comp1':
                ruleText = namingRules.rule1
                ruleTable = namingRules.table1
                ruleTitle = "Κανόνας 1<sup>ου</sup> συνθετικού"

                break;
            case 'comp2':
                ruleText = namingRules.rule2
                ruleTable = namingRules.table2
                ruleTitle = "Κανόνας 2<sup>ου</sup> συνθετικού "

                break;
            case 'comp3':
                ruleText = namingRules.rule3
                ruleTable = namingRules.table3
                ruleTitle = "Κανόνας 3<sup>ου</sup> συνθετικού "

                break;
            case 'none':
                ruleText = ""
                ruleTable = ""
                ruleTitle = ""

                break;
        }

        if (ruleFlag) {
            myStyle = 'display: block;'
            myClass = 'open'
        } else {
            myStyle = 'display:none;'
            myClass = 'closed'
        }

        myHTML = "<div class='ruleTheory' >"
        myHTML += "<div class='ruleTile " + myClass + "' id='ruleTitle'> " + ruleTitle + " </div>"
        myHTML += "<div id='ruleContainer' style='" + myStyle + "'>"
        myHTML += "<div class='ruleText' >" + ruleText + "</div>"
        myHTML += "<div class='ruleTable' >" + ruleTable + "</div>"
        myHTML += "</div>"
        myHTML += "</div>"



        $("#ruleTheoryContainer").html(myHTML)

        $(".ruleRow:nth-of-type(" + (ruleTableHighlight + 1) + ")").addClass("selected")

        // console.log('row ' + ruleTableHighlight )

    }

    $(document).on('click', '#ruleTitle', function () {
        $("#ruleContainer").slideToggle();
        ruleFlag = !ruleFlag
        if (ruleFlag) {
            $("#ruleTitle").addClass('open')
            $("#ruleTitle").removeClass('closed')
        } else {
            $("#ruleTitle").addClass('closed')
            $("#ruleTitle").removeClass('open')
        }

    })

    function fHighLightMainChain() {
        if (nameAnalysisMode == 'none') { return }

        highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]
        // if (highAtoms === undefined) { return }

        let highAtomsArg = ""
        for (let i = 0; i < highAtoms.length; i++) {
            //jsme highlight
            highAtomsArg += highAtoms[i] + ",9"
            if (i < highAtoms.length - 1) { highAtomsArg += "," }
        }
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);


        fUpdateSVG()

    }

    function fHighlightFG() {
        if (nameAnalysisMode == 'none') { return }

        highAtomsFG = nameExamples[selectedMol]['functionalGroup' + modeSuffix]
        if (highAtomsFG === undefined) { return }

        let highAtomsFGArg = ""
        for (let i = 0; i < highAtomsFG.length; i++) {
            //jsme highlight
            highAtomsFGArg += highAtomsFG[i] + ",9"
            if (i < highAtomsFG.length - 1) { highAtomsFGArg += "," }
        }
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

        highBonds = nameExamples[selectedMol]['functionalBonds' + modeSuffix]
        // if (highBonds === undefined) { return }
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",9"
            if (i < highBonds.length - 1) { highBondsArg += "," }
        }
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
        fUpdateSVG()
    }

    function fHighlightFG3D() {

        let highAtoms3D = nameExamples[selectedMol].functionalGroup3D
        if (highAtoms3D === undefined) { return }
        // console.log(highAtoms3D.length)

        if (highAtoms3D.length == 0) {
            Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off");
            return;
        }

        let highAtoms3DArg = "select"
        for (let i = 0; i < highAtoms3D.length; i++) {
            highAtoms3DArg += " atomno = " + highAtoms3D[i]
            if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }

        }

        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + ";color selectionHalos[Xff8566]; selectionHalos on; color bonds [xff8566]")

        JmolSelection = highAtoms3DArg

    }


    function fShowNumbering() {
        numbersSVGElements = []
        highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]
        if (nameAnalysisMode == 'none') { return }
        // add atom numbering
        molSnap = Snap("#jsmeNomeclatureSVG svg");
        switch (mode2D) {
            case 'condensed':
                numberOffset = [20, -280]
                break
            case 'expanded':
                numberOffset = [-120, -280]
                break
        }


        for (let i = 0; i < highAtoms.length; i++) {
            currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
            x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
            y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
            r = 160
            // <circle id='circle" + i + "' cx='" + (x - 20 + r / 2) + "'  cy='" + (y - 0 - r / 2) + "'  r='" + r + "' fill='#fff' stroke='#2cfff6f82' stroke-width='0'  />
            numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Roboto Condensed' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
            numbersSVGElements[i] = numberString
            // numberElement = Snap.parse(numberString)
            // molSnap.select("g").append(numberElement)
        }

        myNumberingTimeout = setInterval(fShowNumber, 400);
        // $("#debugSVG").html(molSnap.toString())
    }

    function fShowNumber() {
        // console.log(currNumberEl)
        fShowNumber3D(currNumberEl)
        numberElement = Snap.parse(numbersSVGElements[currNumberEl])
        molSnap.select("g").append(numberElement)
        currNumberEl += 1

        if (currNumberEl > numbersSVGElements.length) {
            currNumberEl = 0
            clearInterval(myNumberingTimeout)
        }

    }

    function fShowNumbering3D() {
        mainChainAtoms3D = nameExamples[selectedMol].mainChain3D
        for (i = 0; i < mainChainAtoms3D.length; i++) {
            fShowNumber3D(i)
        }

    }

    function removeEcho3D() {
        Jmol.script(jmolAppletNomeclature, " set echo  off;");
    }

    function fShowNumber3D(n) {

        myAtom = nameExamples[selectedMol].mainChain3D[n]
        if (typeof myAtom === "undefined" || myAtom === null) {
            return;
        }
        // myScript = "select atomno=" + myAtom + "; labels " + (n + 1) + " %e"
        myScript = " set echo theGroupEcho" + (n + 1) + "{atomno = " + myAtom + "}; set echo offset {-1.1 1.1 0}; font echo  36 sansSerif bold; color echo[x193F8F];  echo  " + (n + 1) + ";"
        Jmol.script(jmolAppletNomeclature, myScript)
    }


    function fHighlightMultiBonds() {
        fAnalyseBonds()
        console.log("bondList: ", bondList)
        if (nameAnalysisMode == 'none') { return }

        // highBonds = nameExamples[selectedMol]['multibonds' + modeSuffix]
        highBonds = multiBondList
        if (highBonds === undefined) { return }

        let highAtomsArg = ""
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",9"
            if (i < highBonds.length - 1) { highBondsArg += "," }

            highAtomsArg += bondList[highBonds[i] - 1][0] + ",9," + bondList[highBonds[i] - 1][1] + ",9"
            if (i < highBonds.length - 1) { highAtomsArg += "," }
        }

        // console.log(highBondsArg, highAtomsArg)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);


        fUpdateSVG()

    }

    function fHighlightMultiBonds3D() {
        // if (nameAnalysisMode == 'none') { return }
        highBonds3D = nameExamples[selectedMol].multibonds3D
        if (highBonds3D.length == 0) { return }

        let highAtoms3DArg = "select"
        for (i = 0; i < highBonds3D.length; i++) {
            highAtoms3DArg += " atomno=" + highBonds3D[i][0] + ",  atomno=" + highBonds3D[i][1]
            if (i < highBonds.length - 1) { highAtoms3DArg += "," }
            Jmol.script(jmolAppletNomeclature, "select atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1] + " ; color bond [xff8566]  ");
        }
        // console.log(highBonds3D, highAtoms3DArg)
        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + " ; color selectionHalos[Xff8566]; selectionHalos on  ");

        JmolSelection = highAtoms3DArg


    }


    function fSetMolVis3D(theVisModel) {
        if (theVisModel === undefined) {
            theVisModel = vis3D
        }

        switch (theVisModel) {
            case 'ballnstick':
                mySpt = ' select all and not _Xx;  spacefill 24%; wireframe 0.13;zoom 80;set labelFront off;' + JmolSelection
                break
            case 'spacefill':
                mySpt = ' select all and not _Xx;  spacefill 70%; wireframe off;zoom 65;set labelFront off;' + JmolSelection
                break
            case 'sticks':
                mySpt = ' select all and not _Xx;  spacefill off; wireframe 0.2; zoom 80; set labelFront on;' + JmolSelection
                break
        }
        Jmol.script(jmolAppletNomeclature, mySpt);

        switch (nameAnalysisMode) {
            case 'comp1':


                break
            case 'comp2':

                // fHighlightMultiBonds3D()

                break
            case 'comp3':

                // fHighlightFG3D()

                break
            case 'none':

                break
            default:

        }

    }



    //////////////  GUI: buttons, checkboxes, etc
    $("#atomSymbolsCheck").on("click", function () {
        atomSymbols3DFlag = !atomSymbols3DFlag;
        showAtomSymbols3D()
    })

    $("#rotateCheck").on("click", function () {
        rotateFlag = !rotateFlag;
        rotate3D()
    })



    $(".checkBoxContainer").on("click", function () {
        if ($(this).hasClass("unselectedCheck")) {

            $(this).removeClass("unselectedCheck")
            $(this).addClass("selectedCheck")
        } else {
            $(this).removeClass("selectedCheck")
            $(this).addClass("unselectedCheck")
        }
    })


    $(".radioCheckContainer").on("click", function () {
        // console.log("radio")
        if ($(this).hasClass("unselectedRadio")) {
            $(".radioCheckContainer").removeClass("selectedRadio");
            $(".radioCheckContainer").addClass("unselectedRadio");
            $(this).removeClass("unselectedRadio");
            $(this).addClass("selectedRadio");

        }

    });



    let dropState = false
    let selectedLabel


    menuItmes = ["Σφαίρες και Ράβδοι", "Σφαίρες", "Ράβδοι"]
    fCreateDropMenu(menuItmes)

    function fCreateDropMenu(myItems) {

        selectedLabel = myItems[0]
        myHTML = "<div id='dropLabel' class=' closed' >" + selectedLabel + "</div>"
        myHTML += "<div id='dropLiContainer' class='molvis closed' >"
        for (i = 0; i < myItems.length; i++) {
            myHTML += "<div id='dropLi" + i + "' class='dropLi'>" + myItems[i] + "</div>"
        }
        myHTML += "</div>"
        $("#dropMenu").html(myHTML)
        console.log(myHTML)
    }

    $('html').on('click', function () {
        $("#dropLiContainer").slideUp(100)
        $("#dropLabel").removeClass('open')
        $("#dropLabel").addClass('closed')
        dropState = false
    });

    $('#dropLabel').on('click', function (event) {
        event.stopPropagation();
    });

    $("#dropLabel").on('click', function () {
        dropState = !dropState
        $("#dropLiContainer").slideToggle(100)

        if (dropState) {
            $("#dropLabel").removeClass('closed')
            $("#dropLabel").addClass('open')
        } else {
            $("#dropLabel").removeClass('open')
            $("#dropLabel").addClass('closed')
        }

    })

    $(".dropLi").on('click', function () {
        selectedLabel = $(this).html()
        $("#dropLabel").html(selectedLabel)
        $("#dropLiContainer").slideToggle(100)
        dropState = false
        $("#dropLabel").removeClass('open')
        $("#dropLabel").addClass('closed')


    })

    $(".molvis .dropLi").on('click', function () {
        myID = $(this).attr('id')
        console.log(myID)
        switch (myID) {
            case 'dropLi0':
                vis3D = 'ballnstick'
                break
            case 'dropLi1':
                vis3D = 'spacefill'
                break
            case 'dropLi2':
                vis3D = 'sticks'
                break

        }
        fSetMolVis3D(vis3D)


    })




    function fShowCreditLibs() {
        myCredits = "<div class='creditsContainer'>"
        myCredits += "<div class=''>2D visualizations made with <strong>JSME</strong>: B. Bienfait and P. Ertl, J. Cheminform., 2013, 5, 24.</div>"
        myCredits += "<div> | </div>"
        myCredits += "<div class=''>3D visualizations made with <strong>JSmol</strong>: R. M. Hanson, J. Prilusky, Z. Renjian, T. Nakane and J. L. Sussman, Isr. J. Chem., 2013, 53, 207–216.</div> "
        myCredits += "</div>"

        $("#creditsLib").html(myCredits)

        myCredits = ""
        myCredits += "<div class='creditsContainer'>"
        myCredits += "<div class=''>Anastasia Theofanidou, Vasilis Koutalas, Nickolas Charistos </div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>Laboratory of Quantum and Computational Chemistry</div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>School of Chemistry</div>"
        myCredits += "<div>|</div>"
        myCredits += "<div class=''>AUTh 2024-25</div>"

        // myCredits += "<div class=''>2024</div>"
        myCredits += "</div>"
        $("#creditsUs").html(myCredits)

    }


    ////////////// DEBUG //////////////////

    let selectedAtom, selectedBond;

    function getMolData() {
        let myAtoms = jsmeNomeclatureApplet.totalNumberOfAtoms()
        let myBonds = jsmeNomeclatureApplet.totalNumberOfBonds()

        str1 = "<div>Άτομα: " + myAtoms + ", Δεσμοί: " + myBonds + "</div>";

        for (i = 1; i <= myAtoms; i++) {
            str1 += "<div class='crossMenuLi  atomNo'> Atom " + i + "</div>"
        }

        for (i = 1; i <= myBonds; i++) {
            str1 += "<div class='crossMenuLi bondNo'> Bond " + i + "</div>"
        }

        $("#debug").html(str1)
    }


    $("#debug").on("click", ".atomNo", function () {
        $(".atomNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeNomeclatureApplet.resetAtomColors(0)
        selectedAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
        fUpdateSVG()

    })

    $("#debug").on("click", ".bondNo", function () {
        $(".bondNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeNomeclatureApplet.resetBondColors(0)
        selectedBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
        fUpdateSVG()
        if (mode2D == 'condensed') {

            // fAnalyseStructure()
            fAddHydrogens2SVG()

        }
    })

    $("#debug").on("mouseover", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
        myAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, myAtom + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseover", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
        myBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, myBond + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",9");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",9");
        fUpdateSVG()

    })





})
