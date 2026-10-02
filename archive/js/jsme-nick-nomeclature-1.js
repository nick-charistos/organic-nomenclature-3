let selectedMol
let jsmeNomeclatureApplet
let atomSymbols3DFlag = true

///////// INIT JSME //////
function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "400px", "200px");
    jsmeNomeclatureApplet.options("nozoom,depict,marker")

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#66ff66"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);



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
            myMolFormula = nameExamples[prop].formula;
            //format formula
            myMolFormula = myMolFormula.replace(/(\d+)/g, '<sub>$1</sub>'); // sub numbers
            myMolFormula = myMolFormula.replace("_", '&#9776;'); // triple bond
            myMolFormula = myMolFormula.replace(/(["="])/g, '&#9552;'); // double bond
            //add menu item
            myHTML += "<div id='" + prop + "' class='menuLi'> " + myMolFormula + "</div>"
        }
        $("#nomeclatureMenu").html(myHTML)
    }



    /// Menu funcionality
    $(".menuLi").on("click", function () {
        selectedMol = $(this).attr('id');

        $(".menuLi").removeClass("selectedLi");
        $(this).addClass("selectedLi");

        fLoadMol2D()
        fLoadMol3D()
        showAtomSymbols3D();

    });




    function fLoadMol2D() {
        let myMol2D = nameExamples[selectedMol].structure2D

        if (!myMol2D) { jsmeNomeclatureApplet.clear() }

        jsmeNomeclatureApplet.readMolFile(myMol2D);
        jsmeNomeclatureApplet.setMolecularAreaScale(1.8)
        fUpdateSVG()
    }

    function fUpdateSVG() {
        let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
        document.getElementById("jsmeNomeclatureSVG").innerHTML = mySVG;
    }

    function fLoadMol3D() {
        let myMol3D = nameExamples[selectedMol].file3D
        Jmol.script(jmolAppletNomeclature, "load " + myMol3D + ";  select all; center selected; script spt/init-2.spt;");
    }


    function showAtomSymbols3D() {
        if (atomSymbols3DFlag) {
            Jmol.script(jmolAppletNomeclature, "select all; labels %e;")
        } else {
            Jmol.script(jmolAppletNomeclature, "select all; labels off;")
        }
       
    
    }



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



})
