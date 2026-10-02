let selectedHomoIndex;
let jsmeHomoSeriesApplet;
let selectedHomoMolIndex = 0;
let selectedHomoName
let smiles
let inchiArr
let condensedFormula
var JSApplet = {};
JSApplet.Inchi = {};
let n0 = 1;
let currN = 1;

let highLightFlag = 0;
let atomSymbols3DFlag = 1;

function jsmeOnLoad() {
    jsmeHomoSeriesApplet = new JSApplet.JSME("jsmeHomoSeries", "400px", "200px");
    jsmeHomoSeriesApplet.options("nozoom,depict,marker")

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#66ff66"];
    jsmeHomoSeriesApplet.setBackGroundColorPalette(bgAtom);



}


function getMolData() {
    let myAtoms = jsmeHomoSeriesApplet.totalNumberOfAtoms()
    let myBonds = jsmeHomoSeriesApplet.totalNumberOfBonds()

    str1 = "<div>Άτομα: " + myAtoms + ", Δεσμοί: " + myBonds + "</div>";

    for (i = 1; i <= myAtoms; i++) {
        str1 += "<div class='crossMenuLi  atomNo'> Atom " + i + "</div>"
    }

    for (i = 1; i <= myBonds; i++) {
        str1 += "<div class='crossMenuLi bondNo'> Bond " + i + "</div>"
    }

    $("#debug").html(str1)
}


function fLoadHomo2D3D() {
    if (selectedHomoIndex === undefined) { return }
    fLoadHomo2D(selectedHomoIndex);

    // computeInchi(homoSeries[Object.keys(homoSeries)[selectedHomoIndex]].structures2D[selectedHomoMolIndex])
    // smiles = jsmeHomoSeriesApplet.smiles()
    fLoad3D(selectedHomoIndex);
    showAtomSymbols3D();
    highLightGroup();
    showHomoInfo(selectedHomoIndex);
    updateRadioNumbers(selectedHomoIndex);
    getMolData();
}





function computeInchi(mol) {

    return

    mol = mol.replace(/(\[+)/g, "")
    mol = mol.replace(/(\]+)/g, "")
        // console.log("themol", mol)
        ;
    var tmp_function_name = "__local_ff";
    JSApplet.Inchi[tmp_function_name] = function (inchi_result) {
        inchiArr = inchi_result
    };
    JSApplet.Inchi.computeInchi(mol, "JSApplet.Inchi." + tmp_function_name);
    delete JSApplet.Inchi[tmp_function_name];

    // console.log(inchiArr.key)

    $.get("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/inchikey/" + inchiArr.key + "/property/MolecularFormula/TXT", function (myCondForm) {
        myCondForm = myCondForm.split('\n')[0]
        let formattedformula = myCondForm.split('').map((currchar, i) => { //
            if (!isNaN(currchar)) { //
                if (myCondForm.split('')[i - 1] != "." && i != 0) { //
                    let currSub = "<sub>" + currchar + "</sub>"
                    return currSub
                } else {
                    return currchar
                }
            } else {
                return currchar //
            }
        })
        condensedFormula = formattedformula.join("")

        // console.log(condensedFormula)//

    });

}





function fLoadHomo2D(selectedHomo) {

    let myHomo = Object.keys(homoSeries)[selectedHomo]

    let myHomo2D = homoSeries[myHomo].structures2D[selectedHomoMolIndex]

    if (!myHomo2D) { jsmeHomoSeriesApplet.clear() }

    jsmeHomoSeriesApplet.readMolFile(myHomo2D);
    jsmeHomoSeriesApplet.setMolecularAreaScale(1.8)
    fUpdateSVG()
}

function fUpdateSVG() {
    let mySVG = jsmeHomoSeriesApplet.getMolecularAreaGraphicsString()
    document.getElementById("jsmeHomoSeriesSVG").innerHTML = mySVG;

}


function fLoad3D(selectedHomo) {
    let myHomo = Object.keys(homoSeries)[selectedHomo]

    let myHomo3Dsdf = "mols/homo/" + myHomo + "_3D.sdf"

    currMoveToIndex = 3 * selectedHomoIndex + selectedHomoMolIndex
    let theMol = selectedHomoMolIndex + 1
    Jmol.script(jmolAppletHomo, "load " + myHomo3Dsdf + ";  model " + theMol + ";  select 1." + theMol + "; Zoom 0;" + moveto[currMoveToIndex] + " ;center selected; script spt/init-2.spt; select all; ");



}


function showHomoInfo(selectedHomo) {


    selectedHomoName = homoSeries[Object.keys(homoSeries)[selectedHomo]].name;

    $("#selectedHomoName").html(selectedHomoName)

    let gmt = homoSeries[Object.keys(homoSeries)[selectedHomoIndex]].gmt;

    gmt = gmt.replace(/(\d+)/g, '<sub>$1</sub>');
    gmt = gmt.replace(/([ν])/g, '<sub>ν</sub>');
    gmt = gmt.replace(/([+])/g, '<sub>+</sub>');
    gmt = gmt.replace(/([-])/g, '<sub>-</sub>');

    n0 = homoSeries[Object.keys(homoSeries)[selectedHomo]].n0
    gmt += " , v &#8805; " + n0

    // let n0 = homoSeries[Object.keys(homoSeries)[selectedHomoIndex]].n0;
    currN = n0 + selectedHomoMolIndex;

    currMoveToIndex = 3 * selectedHomoIndex + selectedHomoMolIndex
    condensedFormula = mfs[currMoveToIndex];
    condensedFormula = condensedFormula.replace(/(\d+)/g, '<sub>$1</sub>');


    let gmtInfo = "<div class='infoLegend'>Γενικός Μοριακός Τύπος</div><div class='infoGMTFormula'>" + gmt + "</div><div id='currNInfo' class='infoLegend'>Μοριακός Τύπος για <span style = 'font-weight:bold'>ν = " + currN + "</span></div><div class='homo formula'>" + condensedFormula + "</div>"


    $("#infoGMT").html(gmtInfo)

    let expForm = homoSeries[Object.keys(homoSeries)[selectedHomo]].formula[selectedHomoMolIndex]
    expForm = expForm.replace(/(\d+)/g, '<sub>$1</sub>');
    expForm = expForm.replace("_", '&#9776;');

    let molInfo = "<div class=''><div class='infoMolName'>" + homoSeries[Object.keys(homoSeries)[selectedHomo]].members[selectedHomoMolIndex] + " </div></div>" + "<div class=''><div class='' style='flex-grow:2'><div class='homo formula'  >" + expForm + "</div></div>";
    $("#homoMolInfo").html(molInfo);

}


function updateCurrN() {
    $("#currNInfo").html("Μοριακός Τύπος για <span style = 'font-weight:bold'>ν = " + currN + "</span>")
    // $(".infoN").html("v &#8805; " + n0  )
}



function updateRadioNumbers(selectedHomo) {
    n0 = homoSeries[Object.keys(homoSeries)[selectedHomo]].n0
    currN = n0 + selectedHomoMolIndex;
    myRadioNumbers = $(".n")
    for (let i = 0; i < myRadioNumbers.length; i++) {
        myRadioNumbers[i].innerHTML = n0 + i
    }



}

function showAtomSymbols3D() {
    if (atomSymbols3DFlag) {
        Jmol.script(jmolAppletHomo, "select all; labels %e;")
    } else {
        Jmol.script(jmolAppletHomo, "select all; labels off;")
    }
    highLightGroup3D();

}


function highLightGroup() {
    if (highLightFlag) {



        if (selectedHomoMolIndex === undefined) { return }
        if (selectedHomoIndex < 1) { return }

        currMolIndex = 3 * selectedHomoIndex + selectedHomoMolIndex - 3

        highAtoms = homoHighlightAtoms2D[currMolIndex]

        console.log(highAtoms)

        if (highAtoms === undefined) { return }

        let highAtomsArg = ""
        for (let i = 0; i < highAtoms.length; i++) {
            highAtomsArg += highAtoms[i] + ",1"
            if (i < highAtoms.length - 1) { highAtomsArg += "," }
        }
        jsmeHomoSeriesApplet.setAtomBackgroundColors(0, highAtomsArg);

        highBonds = homoHighlightBonds2D[currMolIndex]
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",1"
            if (i < highBonds.length - 1) { highBondsArg += "," }
        }
        jsmeHomoSeriesApplet.setBondBackgroundColors(0, highBondsArg);
    } else {
        jsmeHomoSeriesApplet.resetAtomColors(0)
        jsmeHomoSeriesApplet.resetBondColors(0)
    }
    fUpdateSVG();
}

function highLightGroup3D() {
    if (highLightFlag) {

        if (selectedHomoIndex === undefined) { return }
        if (selectedHomoIndex < 1) { return }

        currMolIndex = 3 * selectedHomoIndex + selectedHomoMolIndex - 3

        let highAtoms3D = homoHighlightAtoms3D[currMolIndex]

        // console.log(highAtoms3D.length)

        if (highAtoms3D.length == 0) {
            Jmol.script(jmolAppletHomo, "select all; selectionHalos off");
            return;
        }

        let highAtoms3DArg = "select"
        for (let i = 0; i < highAtoms3D.length; i++) {
            highAtoms3DArg += " atomno = " + highAtoms3D[i]
            if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }

        }

        Jmol.script(jmolAppletHomo, highAtoms3DArg + "; selectionHalos on")

    } else {
        Jmol.script(jmolAppletHomo, "select all; selectionHalos off")

    }

}

function setHighlight(theHomo) {
    let highHTML = ""
    $("#highLightButton").removeClass("inactive")
    switch (theHomo) {
        case 0:
            // $("#highLightButton").removeClass("selectedCheck");
            $("#highLightButton").addClass("inactive")
            highHTML = "Επισήμανση Χαρακτηριστικής Ομάδας<span class='checkBox'></span>"
            break;
        case 1:
            highHTML = "Επισήμανση Διπλού Δεσμού<span class='checkBox'></span>"
            break;
        case 2:
            highHTML = "Επισήμανση Τριπλού Δεσμού<span class='checkBox'></span>"
            break;
        case 3:
            highHTML = "Επισήμανση Διπλών Δεσμών<span class='checkBox'></span>"
            break;
        default:
            highHTML = "Επισήμανση Χαρακτηριστικής Ομάδας<span class='checkBox'></span>"
    }

    $("#highLightButton").html(highHTML)
}

function fInitHomoMenu() {
    let myHTML = " <div class='panelTitle' style='font-size:1.25rem'> Ομόλογες Σειρές </div>"

    for (let prop in homoSeries) {
        myHomoName = homoSeries[prop].name;
        myHTML += "<div  class='crossMenuLi'> " + myHomoName + "</div>"
        $("#homoMenuContainer").html(myHTML)
    }
}

$(document).ready(function () {
    fInitHomoMenu()



    $(".crossMenuLi").on("click", function () {

        if ($(this).hasClass("selectedLi")) { return }

        selectedAtom = 0;
        selectedBond = 0;
        selectedHomoIndex = $(this).parent().children(".crossMenuLi").index(this);

        setHighlight(selectedHomoIndex)

        selectedHomoMolIndex = 0;
        fLoadHomo2D3D()
        updateCurrN()
        // $(".crossMenuLi").removeClass("selectedLi");
        let myOldSelectedLi = $(".selectedLi")

        $(this).addClass("selectedLi");
        let myLi = this;

        let myOpenMenu = $(".radioMenuContainer").not(this)
        if (document.getElementsByClassName("radioGroupContainer").length > 0) {

            $(".n").removeClass("n")

            myOpenMenu.slideUp(300, function () {

                myOpenMenu.detach();
                myOldSelectedLi.removeClass("selectedLi");
               
                
            })
            showRadio(myLi);

         

        } else {
            showRadio(myLi)
        }
   



    });

    function showRadio(myLi) {


        let radioHtml = "<div class='radioMenuContainer' style='padding:0;margin:0; border-top:0;'> <div class='radioGroupContainer VFlex ' style='display:none'>" +
            "    <div class='radioNoneContainer selectedRadio'> 1<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span" +
            "            class='radioCheck'></span></div>" +
            "    <div class='radioNoneContainer unselectedRadio'> 2<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span" +
            "            class='radioCheck'></span> </div>" +
            "    <div class='radioNoneContainer unselectedRadio'> 3<sup>o</sup> μέλος: ν = <span class='n'>" + "</span><span" +
            "            class='radioCheck'></span> </div>" +
            "</div></div>"



        $(myLi).after(radioHtml);

        updateRadioNumbers(selectedHomoIndex)

        $(".radioGroupContainer").slideDown(300)
    }




    $("#highLightButton").on("click", function () {
        if ($(this).hasClass("inactive")) { return }
        highLightFlag = !highLightFlag;
        highLightGroup();
        highLightGroup3D();

    });

    $("#atomSymbolsCheck").on("click", function () {
        atomSymbols3DFlag = !atomSymbols3DFlag;
        showAtomSymbols3D()

    })



    $(".checkBoxContainer").on("click", function () {
        if ($(this).hasClass("inactive")) { return }
        if ($(this).hasClass("unselectedCheck")) {
            $(this).removeClass("unselectedCheck")
            $(this).addClass("selectedCheck")
        } else {
            $(this).removeClass("selectedCheck")
            $(this).addClass("unselectedCheck")
        }
    })



    $("#homoMenuContainer").on("click", ".radioNoneContainer", function () {

        // console.log("radio")
        if ($(this).hasClass("unselectedRadio")) {
            $(".radioNoneContainer").removeClass("selectedRadio");
            $(".radioNoneContainer").addClass("unselectedRadio");
            $(this).removeClass("unselectedRadio");
            $(this).addClass("selectedRadio");

            selectedHomoMolIndex = $(this).parent().children(".radioNoneContainer").index(this);
            fLoadHomo2D3D();
            updateCurrN();
        }

    });

    let selectedAtom, selectedBond;

    $("#debug").on("click", ".atomNo", function () {
        $(".atomNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeHomoSeriesApplet.resetAtomColors(0)
        selectedAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeHomoSeriesApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        fUpdateSVG()
    })

    $("#debug").on("click", ".bondNo", function () {
        $(".bondNo").removeClass("selectedLi")
        $(this).addClass("selectedLi")
        jsmeHomoSeriesApplet.resetBondColors(0)
        selectedBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeHomoSeriesApplet.setBondBackgroundColors(0, selectedBond + ",1");
        fUpdateSVG()
    })

    $("#debug").on("mouseover", ".atomNo", function () {

        jsmeHomoSeriesApplet.resetAtomColors(0)
        jsmeHomoSeriesApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        myAtom = $(this).parent().children(".atomNo").index(this) + 1;
        jsmeHomoSeriesApplet.setAtomBackgroundColors(0, myAtom + ",2");
        fUpdateSVG()
    })

    $("#debug").on("mouseover", ".bondNo", function () {

        jsmeHomoSeriesApplet.resetBondColors(0)
        jsmeHomoSeriesApplet.setBondBackgroundColors(0, selectedBond + ",1");
        myBond = $(this).parent().children(".bondNo").index(this) + 1;
        jsmeHomoSeriesApplet.setBondBackgroundColors(0, myBond + ",2");
        fUpdateSVG()
    })

    $("#debug").on("mouseleave", ".atomNo", function () {

        jsmeHomoSeriesApplet.resetAtomColors(0)
        jsmeHomoSeriesApplet.setAtomBackgroundColors(0, selectedAtom + ",1");
        fUpdateSVG()
    })

    $("#debug").on("mouseleave", ".bondNo", function () {

        jsmeHomoSeriesApplet.resetBondColors(0)
        jsmeHomoSeriesApplet.setBondBackgroundColors(0, selectedBond + ",1");
        fUpdateSVG()
    })


});


