let selectedMol
let jsmeNomeclatureApplet
let atomSymbols3DFlag = true
let carbonHydrogens
let mode2D = 'condensed'
let modeSuffix = ''
let molSnap
let highAtoms
let nameAnalysisMode
let carbons = 0
let myNumberingTimeout
let numbersSVGElements = []
let currNumberEl = 0

///////// INIT JSME //////
function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "400px", "200px");
    jsmeNomeclatureApplet.options("nozoom,depict,marker")
    jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6)

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#66ff66"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())
}




$(document).ready(function () {


    fInitData()
    fInitNomeclatureMenu()


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
        let myHTML = " <div class='panelTitle' style='font-size:1.25rem'> Παραδείγματα </div>"

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
        fLoadMol2D()
        fLoadMol3D()

        showAtomSymbols3D();
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
        fUpdateSVG()

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
        console.log(atomBondList)

        for (i = 1; i < bondsCount + 1; i++) {
            let currBond = jsmeNomeclatureApplet.getBond(0, i);

            bontOrder = currBond.order
            bondAtom1 = currBond.atoms[0]
            bondAtom2 = currBond.atoms[1]

            atomBondList[bondAtom1 - 1] = atomBondList[bondAtom1 - 1] + bontOrder
            atomBondList[bondAtom2 - 1] = atomBondList[bondAtom2 - 1] + bontOrder
        }


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

    }

    function fLoadMol3D() {
        let myMol3D = nameExamples[selectedMol].file3D
        Jmol.script(jmolAppletNomeclature, "load " + myMol3D + ";  select all; center selected;" + nameExamples[selectedMol].moveto + "; script spt/init-2.spt;");
    }


    function showAtomSymbols3D() {
        if (atomSymbols3DFlag) {
            Jmol.script(jmolAppletNomeclature, "select all; labels %e;")
        } else {
            Jmol.script(jmolAppletNomeclature, "select all; labels off;")
        }

        if (nameAnalysisMode == 'comp1' ) {
            fShowNumbering3D()
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
                break
            case 'comp2':
                fHighlightMultiBonds()
                fHighlightMultiBonds3D()
                break
            case 'comp3':
                fHighlightFG()
                fHighlightFG3D()
                break
            case 'none':

                break
            default:

        }




        // getMolData() // debug

    });


    ///////////////  Name Analysis /////////////////
    function fShowNameAnalysis() {
        comp1 = nameExamples[selectedMol].nameComponents[0]
        comp2 = nameExamples[selectedMol].nameComponents[1]
        comp3 = nameExamples[selectedMol].nameComponents[2]

        compBox = "<div class='nameCompBox' "
        compBox1 = compBox + " id='comp1' >" + comp1 + "</div>"
        compBox2 = compBox + " id='comp2' >" + comp2 + "</div>"
        compBox3 = compBox + " id='comp3' >" + comp3 + "</div>"

        nameCompContainer = "<div class='panelTitle '>Επεξήγηση ονομασίας </div><div class='nameCompContainer'>"
        nameCompContainer += compBox1
        nameCompContainer += compBox2
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
        showAtomSymbols3D()

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
           
        }
        fExplainNameComp()

    })

    function fExplainNameComp() {
        switch (nameAnalysisMode) {
            case 'none':
                myText = 'Κάνε κλικ σε ένα συστατικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;"
                break;
            case 'comp1':
                myText = 'Επειδή έχει ' + carbons + ' άτομα άνθρακα C'
                nStyle = ""
                break;
            case 'comp2':
                switch (nameExamples[selectedMol].nameComponents[1]) {
                    case 'άν':
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        break
                    case 'έν':
                        myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                        break
                    case 'ίν':
                        myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                        break
                    case 'διέν':
                        myText = 'δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                        break
                    default:
                        myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                }
                myText = 'Επειδή έχει ' + myText
                nStyle = ""
                break;
            case 'comp3':
                myText = 'Επειδή  ανήκει στην ομόλογη σειρά ' + nameExamples[selectedMol].class
                nStyle = ""
                break;
            default:
                myText = 'Κάνε κλικ σε ένα συστατικό του ονόματος για να δεις την εξήγηση'
                nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;"
        }

        myHTML = "<div class='explainText' style='" + nStyle + "'  >" + myText + "</div>"
        $("#nameAnalysisExplain").html(myHTML)
    }

    function fHighLightMainChain() {
        if (nameAnalysisMode == 'none') { return }

        highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]
        // if (highAtoms === undefined) { return }

        let highAtomsArg = ""
        for (let i = 0; i < highAtoms.length; i++) {
            //jsme highlight
            highAtomsArg += highAtoms[i] + ",1"
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
            highAtomsFGArg += highAtomsFG[i] + ",1"
            if (i < highAtomsFG.length - 1) { highAtomsFGArg += "," }
        }
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

        highBonds = nameExamples[selectedMol]['functionalBonds' + modeSuffix]
        // if (highBonds === undefined) { return }
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",1"
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

        Jmol.script(jmolAppletNomeclature, highAtoms3DArg + "; selectionHalos on")



    }


    function fShowNumbering() {
        numbersSVGElements = []
        highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]
        if (nameAnalysisMode == 'none') { return }
        // add atom numbering
        molSnap = Snap("#jsmeNomeclatureSVG svg");
        switch (mode2D) {
            case 'condensed':
                numberOffset = [20, -290]
                break
            case 'expanded':
                numberOffset = [-120, -290]
                break    
        }
        

        for (let i = 0; i < highAtoms.length; i++) {
            currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
            x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
            y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
            r = 160
            numberString = " <circle id='circle" + i + "' cx='" + (x+r/2) + "'  cy='" + (y-20-r/2)  + "'  r='" + r + "' fill='rgb(33, 158, 188)'  /> <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='280px' font-weight='bold' font-family='Roboto Condensed' fill='rgb(255, 255, 255)'>" + (i + 1) + "</text> "
            numbersSVGElements[i] = numberString
            // numberElement = Snap.parse(numberString)
            // molSnap.select("g").append(numberElement)
        }

        myNumberingTimeout = setInterval(fShowNumber,  600 );
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



    function fShowNumber3D(n) {

       myAtom = nameExamples[selectedMol].mainChain3D[n] 
       
        myScript = "select atomno=" + myAtom +"; label %e"+(n+1)
        Jmol.script(jmolAppletNomeclature, myScript)
    }


    function fHighlightMultiBonds() {
        if (nameAnalysisMode == 'none') { return }

        highBonds = nameExamples[selectedMol]['multibonds' + modeSuffix]
        if (highBonds === undefined) { return }


        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",1"
            if (i < highBonds.length - 1) { highBondsArg += "," }
        }
        jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);

        fUpdateSVG()

    }

    function fHighlightMultiBonds3D() {
        // if (nameAnalysisMode == 'none') { return }
        highBonds3D = nameExamples[selectedMol].multibonds3D
        // console.log(highBonds3D.length)
        // if (highBonds3D.length = 0) {return}
        for ( i = 0 ; i < highBonds3D.length; i++) {
            // console.log(highBonds3D[i][0], highBonds3D[i][1])
            Jmol.script(jmolAppletNomeclature, "select atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1] + " ; color bond [x7ddfff]  ");
        }

    }



    //////////////  GUI: buttons, checkboxes, etc
    $("#atomSymbolsCheck").on("click", function () {
        atomSymbols3DFlag = !atomSymbols3DFlag;
        showAtomSymbols3D()
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
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        fUpdateSVG()

    })

    $("#debug").on("click", ".bondNo", function () {
        $(".bondNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeNomeclatureApplet.resetBondColors(0)
        selectedBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",1");
        fUpdateSVG()
        if (mode2D == 'condensed') {

            // fAnalyseStructure()
            fAddHydrogens2SVG()

        }
    })

    $("#debug").on("mouseover", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        myAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, myAtom + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseover", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",1");
        myBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeNomeclatureApplet.setBondBackgroundColors(0, myBond + ",2");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".atomNo", function () {

        jsmeNomeclatureApplet.resetAtomColors(0)
        jsmeNomeclatureApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        fUpdateSVG()

    })

    $("#debug").on("mouseleave", ".bondNo", function () {

        jsmeNomeclatureApplet.resetBondColors(0)
        jsmeNomeclatureApplet.setBondBackgroundColors(0, selectedBond + ",1");
        fUpdateSVG()

    })





})
