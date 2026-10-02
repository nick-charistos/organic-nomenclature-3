

let highLightFlag = 0;
let selectedMolIndex;
let atomSymbols3DFlag = 1;
let funGroupDataList = fGroupsSDF.split('$$$$\n');
let molDataList = moleculesSDF.split('$$$$\n');


function jsmeOnLoad() {
    jsmeFunApplet = new JSApplet.JSME("jsmeFunContainer", "400px", "200px");
    jsmeFunApplet.options("nozoom,depict,marker")


    jsmeMolApplet = new JSApplet.JSME("jsmeMolContainer", "400px", "200px");
    jsmeMolApplet.options("nozoom,depict,marker");

    let bgAtom = ["#7ddfff", "#ffc37d", "#cccccc", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#66ff66"];
    jsmeMolApplet.setBackGroundColorPalette(bgAtom);
    jsmeFunApplet.setBackGroundColorPalette(bgAtom);

}


function fSelectFGroup(selectedGroup) {

    let myFunGroup2D = funGroupDataList[selectedGroup]

    if (!myFunGroup2D) { jsmeFunApplet.clear() }

    jsmeFunApplet.readMolFile(myFunGroup2D);

    jsmeFunApplet.setMolecularAreaScale(2)



}



function fSelectFMol(selectedGroup) {

    jsmeMolApplet.readMolFile(molDataList[selectedGroup]);

    jsmeMolApplet.setMolecularAreaScale(2)


}


function fUpdateSVGs() {

    if (selectedMolIndex === undefined) { return }


    let mySVG = jsmeFunApplet.getMolecularAreaGraphicsString()
    document.getElementById("jsmeFunSVG").innerHTML = mySVG;

    let mymolSVG = jsmeMolApplet.getMolecularAreaGraphicsString()
    document.getElementById("jsmeMolSVG").innerHTML = mymolSVG

    theSnap = Snap("#jsmeFunSVG svg");
    myGrayBonds = funGroupGrayBonds[selectedMolIndex]
    for (i = 0; i < myGrayBonds.length; i++) {
        bondIndex = myGrayBonds[i] + 1

        freeBond = theSnap.select("line:nth-child(" + bondIndex + ")");

        freeBond.attr({ stroke: "#bbb" });
    }
    // console.log("--->", theSnap, freeBond)

    //////////// NH2 PAtch ///////////////

    if (selectedMolIndex === 8) {
        molSnap = Snap("#jsmeMolSVG svg")
        theBugEl = molSnap.select("text:nth-of-type(2)");

        // bugNode = theBugEl.innerSVG()

        // theBugEl.innerSVG("<tspan>NH</tspan><tspan baseline-shift='sub'>2</tspan>")

        theBugEl.attr({ strokeWidth: 0 });
        theBugEl.attr({ text: "NH2" });
       
        // theBugEl.attr({ innerHTML: "<span>NH<sub>2</sub></span>" });
        // console.log(molSnap, bugNode)

    }

    //////////// end NH2 PAtch ///////////////
}


function fLoadFunGroupl3D(selectedGroup) {
    let theMol = selectedGroup + 1
    Jmol.script(jmolAppletFun, "display all; model " + theMol + "; " + molFunMoveTo[selectedGroup] + "select 1." + theMol + "; center selected;  script spt/init-2.spt; select _Xx; spacefill 0;set bondmode OR; wireframe 0.08 ;color bonds [XEEEEEE]; select all and not _Xx;  sync jmolAppletMol ON;  set syncMouse ON;");
}



function fLoadMol3D(selectedGroup) {
    let theMol = selectedGroup + 1
    Jmol.script(jmolAppletMol, "display all;  model " + theMol + "; " + molFunMoveTo[selectedGroup] + " select 1." + theMol + "; center selected; script spt/init-2.spt; select all; sync jmolAppletFun ON;  set syncMouse ON;");
}

function showInfo(selectedGroup) {

    let moleculeClassInfo = moleculeClass[selectedGroup]
    $("#moleculeClassInfoDiv").html("<span class='panelTitleSpan' style='color:rgba(255,255,255,0.8)'>Χημική Τάξη  </span> " + moleculeClassInfo)



    let funInfo = funGroupNames[selectedGroup]
    $("#funInfo").html(funInfo)

    let molInfo = moleculesNames[selectedGroup] + " <span class='formula'  >" + moleculesFormula[selectedGroup] + "</span>"
    $("#molInfo").html(molInfo)


    document.getElementById("molInfo").innerHTML = document.getElementById("molInfo").innerHTML.replace(/(\d+)/g, '<sub>$1</sub>');

}



function highLightGroup() {
    if (highLightFlag) {

        // jsmeMolApplet.clearFontCache()
        // jsmeMolApplet.repaint()

        if (selectedMolIndex === undefined) { return }



        highAtoms = molFunGroupAtoms[selectedMolIndex]

        if (highAtoms === undefined) { return }

        let highAtomsArg = ""
        for (let i = 0; i < highAtoms.length; i++) {
            highAtomsArg += highAtoms[i] + ",1"
            if (i < highAtoms.length - 1) { highAtomsArg += "," }
        }
        jsmeMolApplet.setAtomBackgroundColors(0, highAtomsArg);



        highBonds = molFunGroupBonds[selectedMolIndex]
        let highBondsArg = ""
        for (let i = 0; i < highBonds.length; i++) {
            highBondsArg += highBonds[i] + ",1"
            if (i < highBonds.length - 1) { highBondsArg += "," }
        }
        jsmeMolApplet.setBondBackgroundColors(0, highBondsArg);
    } else {
        jsmeMolApplet.resetAtomColors(0)
        jsmeMolApplet.resetBondColors(0)
    }
    fUpdateSVGs();
}

function highLightGroup3D() {
    if (highLightFlag) {

        if (selectedMolIndex === undefined) { return }

        let highAtoms3D = molFunGroupAtoms3D[selectedMolIndex]

        // console.log(highAtoms3D.length)

        if (highAtoms3D.length == 0) {
            Jmol.script(jmolAppletMol, "select all; selectionHalos off");
            return;
        }

        let highAtoms3DArg = "select"
        for (let i = 0; i < highAtoms3D.length; i++) {
            highAtoms3DArg += " atomno = " + highAtoms3D[i]
            if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }

        }

        Jmol.script(jmolAppletMol, highAtoms3DArg + "; selectionHalos on")

    } else {
        Jmol.script(jmolAppletMol, "select all; selectionHalos off")

    }

}

function showAtomSymbols3D() {
    if (atomSymbols3DFlag) {
        Jmol.script(jmolAppletMol, "select all; labels %e;")
        Jmol.script(jmolAppletFun, "select all and not _Xx; labels %e;")



    } else {
        Jmol.script(jmolAppletMol, "select all; labels off;")
        Jmol.script(jmolAppletFun, "select all; labels off;")
    }

    highLightGroup3D();

}







$(document).ready(function () {




    $(".menuLi").on("click", function () {
        selectedMolIndex = $(this).parent().children(".menuLi").index(this);
        fSelectFGroup(selectedMolIndex);
        fSelectFMol(selectedMolIndex);
        fUpdateSVGs();
        fLoadMol3D(selectedMolIndex);
        fLoadFunGroupl3D(selectedMolIndex);

        highLightGroup();
        highLightGroup3D();
        showAtomSymbols3D();
        showInfo(selectedMolIndex);

        $(".menuLi").removeClass("selectedLi");
        $(this).addClass("selectedLi");
    });






    $("#highLightButton").on("click", function () {
        highLightFlag = !highLightFlag;
        highLightGroup();
        highLightGroup3D();

    });

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





});


