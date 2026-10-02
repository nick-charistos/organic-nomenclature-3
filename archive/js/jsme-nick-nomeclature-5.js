let selectedMol
let jsmeNomeclatureApplet
let atomSymbols3DFlag = true
let  carbonHydrogens
let mode2D = 'condensed'

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

        fLoadMol2D()
        fLoadMol3D()
        showAtomSymbols3D();

    });




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
        fUpdateSVG()

        if (mode2D == 'condensed') {
            fCalcHydrogens()
            fAddHydrogens2SVG()
        }
    }

    

    function fCalcHydrogens() {

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
            } else {
                carbonHydrogens[i] = 0
            }
        }

        // console.log(carbonHydrogens)


    }

    function fAddHydrogens2SVG() {
        let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
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

            }
           
        }


    }

    function fUpdateSVG() {
        let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
        $("#jsmeNomeclatureSVG").html(mySVG);
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


    }

    $("#radio2DMode").on("click", ".radioCheckContainer", function () {
        currMode2DNo = $(this).parent().children(".radioCheckContainer").index(this);
        if (currMode2DNo == 0) {
            mode2D = 'condensed'
        } else {
            mode2D = 'expanded'
        }
        fLoadMol2D()

    });


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






})
