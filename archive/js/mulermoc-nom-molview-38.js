// nom-molview-35.js
// Molecule viewer layer — JSME (2D), JSmol (3D), Snap.svg, jQuery.
// Reads analysis results from nom-core-35.js globals.
// Provides all display, highlighting, naming-panel, and save functions.

// ── Viewer / display globals ──────────────────────────────────────────────
let selectedMol
let jsmeNomeclatureApplet
let jsmeNomeclatureAppletORGNL
let atomSymbols3DFlag = true
let hydrogens3DFlag = true
let rotateFlag = false
let svgAtomColors2DFlag = false
let atomColorMode2D = 'atom'
let mode2D = 'condensed'
let modeSuffix = ''
let molSnap
let highAtoms
let nameAnalysisMode
let myNumberingTimeout
let numberingFlag = false
let numbersSVGElements = []
let currNumberEl = 0
let namingRules
let ruleFlag = false
let ruleTableHighlight = 0
let ruleTableFlag = false
let vis3D = 'ballnstick'
let JmolSelection = "select none"
let selectedRule
let nameSettingsFlag = true
let narrateAnalysisFlag = false
if (typeof window.nameBoxFlag === 'undefined') window.nameBoxFlag = true;
if (typeof window.nameCrossFlag === 'undefined') window.nameCrossFlag = false;
// keep local aliases for existing code that references plain identifiers
var nameBoxFlag = window.nameBoxFlag;
var nameCrossFlag = window.nameCrossFlag;
let mainChainMode = 'algorithmic'  // 'data' | 'algorithmic'
let compactNumberingLabelMap = {}
const compactReverseOffsetScale = {
    HOOC: 0.8,
    OHC: 0.8,
}
const compactForwardOffsetScale = {
    HCOOH: 0.55,
}
const compactLabelWidths = {
    COOH: 900,
    HOOC: 900,
    HCOOH: 1000,
    CHO: 650,
    OHC: 650,
    CN: 520,
    NC: 520,
    NO2: 760,
    O2N: 760,
}

const compactRectRightEdgeAdjust = {
    OHC: 34,
}

const atomColors2D = {
    Cl: '#10e510',
    Br: '#a62929',
    S: '#FFC832',
    O: '#FF0D0D',
    N: '#3050F8',
    H: '#909090',
    C: '#222222',

}

// ── SVG icon constants ────────────────────────────────────────────────────
const svgSettings = "<svg viewBox='0 0 22 22' width='18' height='18' fill='currentColor' > <path d='M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54a7.02 7.02 0 0 0-1.62.94l-2.39-.96a.47.47 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.36 1.04.67 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7.02 7.02 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 0 1 8.4 12 3.6 3.6 0 0 1 12 8.4a3.6 3.6 0 0 1 3.6 3.6 3.6 3.6 0 0 1-3.6 3.6z' transform='translate(-1 -1)' /> </svg>"

const svgSpeaker = "<svg viewBox='0 0 22 22' width='18' height='18' fill='currentColor' style='vertical-align:middle'><path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/></svg>"
const svgMute = "<svg viewBox='0 0 22 22' width='18' height='18' fill='currentColor' style='vertical-align:middle'><path d='M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-1.27-1.27L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/></svg>"
const svgStop = "<svg viewBox='0 0 22 22' width='18' height='18' fill='currentColor' style='vertical-align:middle'><path d='M6 6h12v12H6z'/></svg>"
const svgPlay = "<svg viewBox='0 0 22 22' width='18' height='18' fill='currentColor' style='vertical-align:middle'><path d='M8 5v14l11-7z'/></svg>"
const svgNameBox = "<svg viewBox='0 0 22 22' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align:middle' xmlns='http://www.w3.org/2000/svg'><path style='stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:stroke markers fill' d='M4 4h16v16H4z' transform='translate(-1 -1)'/><path d='M9.62 12.91h4.76m-6.347 3.173 3.39-7.457c.183-.404.275-.606.402-.668a.397.397 0 0 1 .35 0c.127.062.22.264.403.668l3.39 7.457' stroke='currentColor' style='stroke-width:1.65;stroke-dasharray:none' transform='translate(-1 -1)'/></svg>"
const svgNameBoxOff = "<svg viewBox='0 0 22 22' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align:middle'  id='svgNameBoxOff' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'> <defs id='defs1' /> <rect x='3' y='3' width='16' height='16' id='rect1' style='stroke=currentColor; stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:stroke markers fill;opacity:0.2' /> <path d='M 8.6195557,11.909077 H 13.380445 M 7.0325918,15.083004 10.422104,7.6260622 c 0.183613,-0.403896 0.27542,-0.6058446 0.402616,-0.6684983 0.110533,-0.054444 0.240026,-0.054444 0.350561,0 0.127194,0.062657 0.219001,0.2646023 0.40261,0.6684983 l 3.389517,7.4569418' stroke='currentColor' stroke-width='1.65' stroke-linecap='round' stroke-linejoin='round' id='pathA' style='stroke-width:2;stroke-dasharray:none' /> </svg> "

const svgNameCross = "<svg viewBox='0 0 22 22' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align:middle' xmlns='http://www.w3.org/2000/svg'><path d='M5.923 33.4v-2.8a.654.654 45 0 0-.654-.653H2.5a.654.654 45 0 1-.654-.654v-.409a.654.654 135 0 1 .654-.654h2.77a.654.654 135 0 0 .653-.653v-2.77a.654.654 135 0 1 .654-.653h.429a.654.654 45 0 1 .654.654v2.769a.654.654 45 0 0 .653.653h2.77a.654.654 45 0 1 .653.654v.409a.654.654 135 0 1-.654.654H8.313a.654.654 135 0 0-.653.654v2.8a.654.654 135 0 1-.654.653h-.43a.654.654 45 0 1-.653-.654Z' style='font-size:20.9238px;line-height:125%;font-family:Arial;letter-spacing:0;word-spacing:0;fill:currentColor;stroke:none;stroke-width:1.65;stroke-miterlimit:0;stroke-dasharray:none;paint-order:stroke markers fill' aria-label='+' transform='translate(4.209 -18.104)' stroke='none'/><path d='M-2.556 11.91h4.76m-6.347 3.173 3.39-7.457c.183-.404.275-.606.402-.668a.397.397 0 0 1 .35 0c.128.062.22.264.403.668l3.39 7.457M19.795 11.91h4.761m-6.348 3.173 3.39-7.457c.183-.404.275-.606.402-.668a.397.397 0 0 1 .351 0c.127.062.219.264.403.668l3.39 7.457' stroke='currentColor' style='opacity:0.6;stroke-width:1.65;stroke-dasharray:none'/></svg>"

const svgNameCrossOff = "<svg viewBox='0 0 22 22' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align:middle' xmlns='http://www.w3.org/2000/svg'><path d='M3.494 11.91h4.76m-6.347 3.173 3.39-7.457c.183-.404.275-.606.402-.668a.397.397 0 0 1 .35 0c.128.062.22.264.403.668l3.39 7.457M13.745 11.91h4.761m-6.348 3.173 3.39-7.457c.183-.404.275-.606.402-.668a.397.397 0 0 1 .351 0c.127.062.219.264.403.668l3.39 7.457' stroke='currentColor' style='stroke-width:1.65;stroke-dasharray:none'/></svg>"

fInitViewerSettingsBtn();

// ── jsmeOnLoad ────────────────────────────────────────────────────────────

function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "590px", "240px", {
        'options': "depict, marker",
        'depictbg': '#fff',
        'atombgsize': '0.6',
    });
    jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6)

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#79dc6d", "#ff8566", "#66ff66", "#93bfff"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())

    jsmeNomeclatureAppletORGNL = new JSApplet.JSME("jsmeNomeclatureORGNL", "590px", "240px", {
        'options': "depict, marker",
        'depictbg': '#fff',
        'atombgsize': '0.6',
    });
    jsmeNomeclatureAppletORGNL.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureAppletORGNL.setMolecularAreaLineWidth(0.6)

    // let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#79dc6d", "#ff8566", "#66ff66", "#93bfff"];
    jsmeNomeclatureAppletORGNL.setBackGroundColorPalette(bgAtom);

    // carbonHydrogens = Array(jsmeNomeclatureAppletORGNL.totalNumberOfAtoms())

    // Auto-select first molecule once both applets are ready.
    $(".menuLi").first().trigger("click");

}

// 

// ── fToggleViewerSettings ────────────────────────────────────────────────

// Initialize viewer settings button markup into #viewerSettingsBtnDiv.
// Uses existing `svgSettings` constant and the fToggleViewerSettings() handler.
function fInitViewerSettingsBtn() {
    const markup = "<button id='viewerSettingsBtn' class='settingsBtn' onclick='fToggleViewerSettings()' data-tooltip='Ρυθμίσεις'>" + svgSettings + "</button>";
    function insert() {
        try {
            const div = document.getElementById('viewerSettingsBtnDiv');
            if (div && !document.getElementById('viewerSettingsBtn')) {
                div.innerHTML = markup;
            }
        } catch (e) {
            // defensive - don't throw in init
            console.warn('viewerSettings init failed', e);
        }
    }
    insert();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insert);
    } else {
        // ensure insertion if scripts run after DOM ready
        setTimeout(insert, 0);
    }
}

function fToggleViewerSettings() {
    var panel = document.getElementById('viewerSettingsPanel')
    var btn = document.getElementById('viewerSettingsBtn')
    var isOpen = panel.classList.contains('open')
    if (isOpen) {
        panel.classList.remove('open')
        btn.classList.remove('active')
    } else {
        panel.classList.add('open')
        btn.classList.add('active')
    }
}

document.addEventListener('click', function (e) {
    var panel = document.getElementById('viewerSettingsPanel')
    var btn = document.getElementById('viewerSettingsBtn')
    if (!panel || !btn) return
    if (!panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        panel.classList.remove('open')
        btn.classList.remove('active')
    }
})

// ── fToggleNameSettings ────────────────────────────────────────────────

// Initialize name settings button markup into #nameSettingsBtnDiv.
// Uses existing `svgSettings` constant and the fToggleNameSettings() handler.

function fToggleNameSettings() {
    nameSettingsFlag = !nameSettingsFlag
    var panel = document.getElementById('nameSettingsPanel')
    var btn = document.getElementById('nameSettingsBtn')
    // var isOpen = panel.classList.contains('open')
    if (!nameSettingsFlag) {
        panel.classList.remove('open')
        btn.classList.remove('active')
    } else {
        panel.classList.add('open')
        btn.classList.add('active')
    }
}

// document.addEventListener('click', function (e) {
//     var panel = document.getElementById('nameSettingsPanel')
//     var btn = document.getElementById('nameSettingsBtn')
//     if (!panel || !btn) return
//     if (!panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
//         panel.classList.remove('open')
//         btn.classList.remove('active')
//     }
// })

// ── fInitData ─────────────────────────────────────────────────────────────

function fInitData() {
    for (let prop in nameExamples) {

        my2D = eval(prop + "_2D");
        my2D_E = eval(prop + "_2D_E");
        try { my2D_D = eval(prop + "_diagr2D"); } catch (e) { my2D_D = null; }

        nameExamples[prop].structure2D = my2D
        nameExamples[prop].structure2D_E = my2D_E
        nameExamples[prop].structure2D_D = my2D_D

        my3D = "mols/nomeclature-moc2/" + prop + "_3D.sdf"
        nameExamples[prop].file3D = my3D
    }

}

// ── fMakeAnnotatedSkeletal ────────────────────────────────────────────────
// Takes a V2000 skeletal MOL string and makes every carbon atom visible
// by replacing the 3-char atom-symbol field 'C  ' with '[C]'.
// JSME renders [C] atoms with a visible 'C' label, so fAddHydrogens2SVG
// can then annotate each with its hydrogen count.

function fMakeAnnotatedSkeletal(molStr) {
    if (!molStr) { return molStr }
    const lines = molStr.split('\n')
    if (lines.length < 4) { return molStr }
    const atomCount = parseInt(lines[3].substring(0, 3))
    if (isNaN(atomCount)) { return molStr }
    for (let i = 4; i < 4 + atomCount && i < lines.length; i++) {
        if (lines[i].substring(31, 34) === 'C  ') {
            lines[i] = lines[i].substring(0, 31) + '[C]' + lines[i].substring(34)
        }
    }
    return lines.join('\n')
}

// ── fUpdateChainModeButton ────────────────────────────────────────────────

function fUpdateChainModeButton() {
    const $dataBtn = $("#radioChainMode .radioCheckContainer").eq(0);
    // modeSuffix is '_diagr2D' for diagramatic but the data key is 'mainChain_diagr'
    const chainKeySuffix = (mode2D === 'diagramatic' || mode2D === 'condensedZigZag') ? '_diagr'
        : (mode2D === 'expanded') ? '_E' : '';
    const hasChainData = !selectedMol || !!(nameExamples[selectedMol]?.['mainChain' + chainKeySuffix]);
    if (hasChainData) {
        $dataBtn.removeClass('disabledRadio');
    } else {
        $dataBtn.addClass('disabledRadio');
        if (mainChainMode === 'data') { mainChainMode = 'algorithmic'; }
    }
    // Always sync radio visuals to current mainChainMode
    const algoIdx = mainChainMode === 'algorithmic' ? 1 : 0;
    $("#radioChainMode .radioCheckContainer").removeClass("selectedRadio").addClass("unselectedRadio");
    $("#radioChainMode .radioCheckContainer").eq(algoIdx).removeClass("unselectedRadio").addClass("selectedRadio");
}

// ── fUpdateDiagr2DButton ──────────────────────────────────────────────────

function fUpdateDiagr2DButton() {
    const $diagrBtn = $("#radio2DMode .radioCheckContainer").eq(2);
    const $zigzagCheck = $("#zigzagCheck");
    const hasDiagr2D = !selectedMol || !!nameExamples[selectedMol]?.structure2D_D;
    if (hasDiagr2D) {
        $diagrBtn.removeClass('disabledRadio');
        if (mode2D === 'diagramatic' || mode2D === 'condensedZigZag') {
            // $zigzagCheck.show();
            $zigzagCheck.removeClass('disabledCheck');
            if (mode2D === 'condensedZigZag') {
                $zigzagCheck.removeClass('unselectedCheck').addClass('selectedCheck');
            } else {
                $zigzagCheck.removeClass('selectedCheck').addClass('unselectedCheck');
            }
        }
    } else {
        $diagrBtn.addClass('disabledRadio');
        $zigzagCheck.addClass('disabledCheck');
        $zigzagCheck.removeClass('selectedCheck').addClass('unselectedCheck');
        if (mode2D === 'diagramatic' || mode2D === 'condensedZigZag') {
            mode2D = 'condensed';
            modeSuffix = '';
            $("#radio2DMode .radioCheckContainer").removeClass("selectedRadio").addClass("unselectedRadio");
            $("#radio2DMode .radioCheckContainer").eq(0).removeClass("unselectedRadio").addClass("selectedRadio");
        }
    }
}

// ── fSelectMol ────────────────────────────────────────────────────────────

function fSelectMol() {

    if (!selectedMol || !nameExamples[selectedMol]) { return }

    fInitProps()
    fClearHighlights()
    fUpdateDiagr2DButton()
    fUpdateChainModeButton()
    fLoadMol2D()
    fLoadMol3D()
    fFetchAndParse3D()

    showAtomSymbols3D();
    showHydrogens3D();
    rotate3D()

    // fShowMolName()
    fShowNameAnalysis()

    getMolData()
}

// ── fDeselectMol ──────────────────────────────────────────────────────────

function fDeselectMol() {
    fInitProps()
    fClearHighlights()

    selectedMol = null;
    $(".menuLi").removeClass("selectedLi");

    myMol3D = null;
    Jmol.script(jmolAppletNomeclature, "zap");

    myMol2D = null;
    if (jsmeNomeclatureApplet) jsmeNomeclatureApplet.reset()
    if (jsmeNomeclatureAppletORGNL) jsmeNomeclatureAppletORGNL.reset()
    fUpdateSVG()

    $("#molName").html("")
    $("#nameAnalysis").html("")
    fUpdateDiagr2DButton()
    fUpdateChainModeButton()

}

// ── fInitProps ────────────────────────────────────────────────────────────

function fInitProps() {
    currNumberEl = 0
    clearInterval(myNumberingTimeout)
    nameAnalysisMode = 'none'
    carbons = 0
    ruleTableHighlight = 0
}

// ── fShowMolName ──────────────────────────────────────────────────────────

function fShowMolName() {
    if (!selectedMol || !nameExamples[selectedMol]) {
        $("#molName").html("")
        return
    }

    molName = currentMolName
    $("#molName").html(molName)
}

// ── fLoadMol2D ────────────────────────────────────────────────────────────

function fLoadMol2D() {

    const selectedExample = nameExamples[selectedMol]
    if (!selectedExample) {
        myMol2D = null
        jsmeNomeclatureApplet.clear()
        if (jsmeNomeclatureAppletORGNL) jsmeNomeclatureAppletORGNL.clear()
        return
    }

    let rawMol2D

    switch (mode2D) {
        case 'condensed':
            rawMol2D = selectedExample.structure2D
            myMol2D = fMakeAnnotatedSkeletal(selectedExample.structure2D)
            break;
        case 'expanded':
            rawMol2D = selectedExample.structure2D_E
            myMol2D = fMakeAnnotatedSkeletal(selectedExample.structure2D_E)
            break;
        case 'diagramatic':
            rawMol2D = selectedExample.structure2D_D
            myMol2D = selectedExample.structure2D_D
            break;
        case 'condensedZigZag':
            rawMol2D = selectedExample.structure2D_D
            myMol2D = fMakeAnnotatedSkeletal(selectedExample.structure2D_D)
            break;
        default:
            rawMol2D = selectedExample.structure2D
            myMol2D = selectedExample.structure2D
    }

    if (!myMol2D) { jsmeNomeclatureApplet.clear() }

    jsmeNomeclatureApplet.readMolFile(myMol2D);
    jsmeNomeclatureApplet.setMolecularAreaScale(2.4)
    if (jsmeNomeclatureAppletORGNL && rawMol2D) {
        jsmeNomeclatureAppletORGNL.readMolFile(rawMol2D)
        jsmeNomeclatureAppletORGNL.setMolecularAreaScale(2.4)
    }

    fAnalyseStructure()
    fDetectMolType()
    fGuessName()
    fUpdateSVG()

}

// ── fAddHydrogens2SVG ─────────────────────────────────────────────────────

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
            const hydrogenTspan = (myLabel === 'CH')
                ? '<tspan class="svgHydrogenPart">H' + (myNo !== '' ? '<tspan dy="70" font-size=".8em">' + myNo + '</tspan>' : '') + '</tspan>'
                : '';
            newString = currString.replace((['>C</text>']), 'class="svgAtomLabel" id="' + currID + '"><tspan>C</tspan>' + hydrogenTspan + '</text>');
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

function fGetCompactedAtomSkipSet(includeCompactedAtoms = false) {
    const skipIndices = new Set()
    if (includeCompactedAtoms || mode2D !== 'condensed' || !functionalGroupObj) {
        return skipIndices
    }

    if (functionalGroupObj.hasOwnProperty('carboxylicAcid')) {
        const acidEntries = functionalGroupObj.carboxylicAcid.O || []
        for (let i = 0; i < acidEntries.length; i++) {
            const entry = acidEntries[i]
            if (!Array.isArray(entry) || entry.length < 2) { continue }
            skipIndices.add(entry[0])
            skipIndices.add(entry[1])
        }
    }
    if (functionalGroupObj.hasOwnProperty('aldehyde')) {
        const aldehydeEntries = functionalGroupObj.aldehyde.O || []
        for (let i = 0; i < aldehydeEntries.length; i++) {
            skipIndices.add(aldehydeEntries[i])
        }
    }
    if (functionalGroupObj.hasOwnProperty('cyanide')) {
        const cyanideEntries = functionalGroupObj.cyanide.N || []
        for (let i = 0; i < cyanideEntries.length; i++) {
            skipIndices.add(cyanideEntries[i])
        }
    }
    if (functionalGroupObj.hasOwnProperty('nitro')) {
        const nitroEntries = functionalGroupObj.nitro.N || []
        for (let i = 0; i < nitroEntries.length; i++) {
            const nitrogenIdx = nitroEntries[i]
            if (!Array.isArray(atomConnectivityList[nitrogenIdx])) { continue }
            for (let n = 0; n < atomConnectivityList[nitrogenIdx].length; n++) {
                const neighborIdx = atomConnectivityList[nitrogenIdx][n]
                if (allAtomsTypeList[neighborIdx] === 'O') {
                    skipIndices.add(neighborIdx)
                }
            }
        }
    }

    return skipIndices
}

function fGetRenderedAtomTextMap(includeCompactedAtoms = false, includeHydrogens = false) {
    const atomTextMap = {}
    const textEls = molSnap.selectAll('text')
    const skipIndices = fGetCompactedAtomSkipSet(includeCompactedAtoms)

    let textIdx = 0
    for (let atomIdx = 0; atomIdx < allAtomsTypeList.length; atomIdx++) {
        if (allAtomsTypeList[atomIdx] === 'H' && !includeHydrogens) { continue }
        if (skipIndices.has(atomIdx)) { continue }
        if (textIdx >= textEls.length) { break }
        atomTextMap[atomIdx] = textEls[textIdx]
        textIdx += 1
    }
    return atomTextMap
}

function fGetRenderedAtomRectMap(includeCompactedAtoms = false, includeHydrogens = false) {
    const atomRectMap = {}
    const rectEls = molSnap.selectAll('rect')
    const skipIndices = fGetCompactedAtomSkipSet(includeCompactedAtoms)
    let rectIdx = 1

    for (let atomIdx = 0; atomIdx < allAtomsTypeList.length; atomIdx++) {
        if (allAtomsTypeList[atomIdx] === 'H' && !includeHydrogens) { continue }
        if (skipIndices.has(atomIdx)) { continue }
        if (rectIdx >= rectEls.length) { break }
        atomRectMap[atomIdx] = rectEls[rectIdx]
        rectIdx += 1
    }

    return atomRectMap
}

function fGetAttachedHydrogenIndices(atomIdx) {
    const hydrogenIndices = []
    if (!Array.isArray(atomConnectivityList[atomIdx])) { return hydrogenIndices }
    for (let i = 0; i < atomConnectivityList[atomIdx].length; i++) {
        const neighborIdx = atomConnectivityList[atomIdx][i]
        if (allAtomsTypeList[neighborIdx] === 'H') {
            hydrogenIndices.push(neighborIdx)
        }
    }
    return hydrogenIndices
}

function fFindBondIndexByAtoms(atomIdxA, atomIdxB) {
    const atomA = atomIdxA + 1
    const atomB = atomIdxB + 1
    for (let bondIdx = 0; bondIdx < bondList.length; bondIdx++) {
        if (!bondList[bondIdx]) { continue }
        const bondAtom1 = bondList[bondIdx][0]
        const bondAtom2 = bondList[bondIdx][1]
        if ((bondAtom1 === atomA && bondAtom2 === atomB) || (bondAtom1 === atomB && bondAtom2 === atomA)) {
            return bondIdx
        }
    }
    return -1
}

function fRemoveBondLinesByBondIndex(bondIdx, lineEls) {
    if (bondIdx < 0 || !bondList[bondIdx]) { return }
    const lineStart = svgBondList[bondIdx]
    const lineCount = bondList[bondIdx][2]
    for (let offset = 0; offset < lineCount; offset++) {
        const lineEl = lineEls[lineStart + offset - 1]
        if (lineEl) { lineEl.remove() }
    }
}

function fBuildTextAttrsFromElement(el) {
    let attrs = ''
    const attrNames = ['x', 'y', 'font-size', 'font-family', 'text-anchor', 'fill', 'stroke', 'stroke-width', 'class', 'id']
    for (let i = 0; i < attrNames.length; i++) {
        const attrName = attrNames[i]
        const attrValue = el.node.getAttribute(attrName)
        if (attrValue) {
            attrs += ' ' + attrName + '="' + attrValue + '"'
        }
    }
    return attrs
}

function fReplaceTextElementMarkup(el, markup, attrOverrides) {
    if (!el) { return null }
    const x = el.node.getAttribute('x')
    const y = el.node.getAttribute('y')
    if (!x || !y) { return null }
    let attrs = fBuildTextAttrsFromElement(el)
    if (attrOverrides) {
        for (const attrName in attrOverrides) {
            attrs = attrs.replace(new RegExp(' ' + attrName + '="[^"]*"', 'g'), '')
            attrs += ' ' + attrName + '="' + attrOverrides[attrName] + '"'
        }
    }
    const newString = '<text' + attrs + '>' + markup + '</text>'
    let newEl
    try {
        newEl = Snap.parse(newString)
    } catch (e) {
        return null
    }
    const parentNode = el.node.parentNode
    if (!parentNode || !newEl || !newEl.node) { return null }

    const nextSibling = el.node.nextSibling
    const fragmentNode = newEl.node
    let insertedNode = null

    while (fragmentNode.firstChild) {
        const childNode = fragmentNode.firstChild
        parentNode.insertBefore(childNode, nextSibling)
        if (!insertedNode && childNode.nodeType === 1) {
            insertedNode = childNode
        }
    }

    el.remove()
    return insertedNode ? Snap(insertedNode) : null
}

function fShouldReverseCompactLabel(anchorEl, attachedEls) {
    if (!anchorEl || !attachedEls || attachedEls.length === 0) { return false }
    const anchorX = parseFloat(anchorEl.node.getAttribute('x'))
    if (isNaN(anchorX)) { return false }

    let attachedXSum = 0
    let attachedCount = 0
    for (let i = 0; i < attachedEls.length; i++) {
        if (!attachedEls[i]) { continue }
        const attachedX = parseFloat(attachedEls[i].node.getAttribute('x'))
        if (isNaN(attachedX)) { continue }
        attachedXSum += attachedX
        attachedCount += 1
    }
    if (attachedCount === 0) { return false }

    return (attachedXSum / attachedCount) < anchorX
}

function fGetReversedCompactLabelAttrs(anchorEl, labelKey) {
    if (!anchorEl) { return { 'text-anchor': 'end' } }
    const anchorX = parseFloat(anchorEl.node.getAttribute('x'))
    const fontSize = parseFloat(anchorEl.node.getAttribute('font-size'))
    const hasCustomScale = Object.prototype.hasOwnProperty.call(compactReverseOffsetScale, labelKey)
    const offsetScale = hasCustomScale ? compactReverseOffsetScale[labelKey] : 0.8
    const xShift = isNaN(fontSize) ? 120 : (fontSize * offsetScale)
    if (isNaN(anchorX)) {
        return { 'text-anchor': 'end' }
    }
    return {
        'text-anchor': 'end',
        'x': String(anchorX + xShift),
    }
}

function fGetForwardCompactLabelAttrs(anchorEl, labelKey) {
    if (!anchorEl) { return null }
    const anchorX = parseFloat(anchorEl.node.getAttribute('x'))
    const fontSize = parseFloat(anchorEl.node.getAttribute('font-size'))
    const hasCustomScale = Object.prototype.hasOwnProperty.call(compactForwardOffsetScale, labelKey)
    if (!hasCustomScale || isNaN(anchorX)) { return null }
    const offsetScale = compactForwardOffsetScale[labelKey]
    const xShift = isNaN(fontSize) ? 80 : (fontSize * offsetScale)
    return {
        'x': String(anchorX - xShift),
    }
}

function fGetReverseCompactRightEdge(anchorEl, labelKey, geometryHint) {
    const anchorX = geometryHint && typeof geometryHint.x === 'number'
        ? geometryHint.x
        : parseFloat(anchorEl && anchorEl.node ? anchorEl.node.getAttribute('x') : NaN)
    const fontSize = parseFloat(anchorEl && anchorEl.node ? anchorEl.node.getAttribute('font-size') : NaN)
    if (isNaN(anchorX)) { return NaN }

    const hasCustomScale = Object.prototype.hasOwnProperty.call(compactReverseOffsetScale, labelKey)
    const offsetScale = hasCustomScale ? compactReverseOffsetScale[labelKey] : 0.8
    const xShift = isNaN(fontSize) ? 120 : (fontSize * offsetScale)
    return anchorX + xShift
}

function fFindNearestHighlightCircle(anchorEl, geometryHint) {
    const anchorX = geometryHint && typeof geometryHint.x === 'number'
        ? geometryHint.x
        : parseFloat(anchorEl && anchorEl.node ? anchorEl.node.getAttribute('x') : NaN)
    const anchorY = geometryHint && typeof geometryHint.y === 'number'
        ? geometryHint.y
        : parseFloat(anchorEl && anchorEl.node ? anchorEl.node.getAttribute('y') : NaN)
    if (isNaN(anchorX) || isNaN(anchorY)) { return null }

    const circleEls = molSnap.selectAll('circle')
    let nearestCircle = null
    let nearestDistSq = Infinity
    for (let i = 0; i < circleEls.length; i++) {
        const circleEl = circleEls[i]
        const cx = parseFloat(circleEl.attr('cx'))
        const cy = parseFloat(circleEl.attr('cy'))
        if (isNaN(cx) || isNaN(cy)) { continue }
        const dx = cx - anchorX
        const dy = cy - anchorY
        const distSq = (dx * dx) + (dy * dy)
        if (distSq < nearestDistSq) {
            nearestDistSq = distSq
            nearestCircle = circleEl
        }
    }
    return nearestCircle
}

function fGetNodeAttr(el, attrName) {
    if (!el || !el.node || !attrName) { return '' }
    return el.node.getAttribute(attrName) || ''
}

function fBuildCompactGeometryHint(anchorEl, anchorRectEl) {
    const anchorX = parseFloat(anchorEl && anchorEl.node ? anchorEl.node.getAttribute('x') : NaN)
    const anchorY = parseFloat(anchorEl && anchorEl.node ? anchorEl.node.getAttribute('y') : NaN)
    const hint = {
        x: anchorX,
        y: anchorY,
        fill: fGetNodeAttr(anchorEl, 'fill'),
    }

    const rectX = parseFloat(anchorRectEl && anchorRectEl.node ? anchorRectEl.attr('x') : NaN)
    const rectWidth = parseFloat(anchorRectEl && anchorRectEl.node ? anchorRectEl.attr('width') : NaN)
    if (!isNaN(rectX) && !isNaN(rectWidth)) {
        hint.rightEdge = rectX + rectWidth
        hint.leftEdge = rectX
    }

    const nearestCircle = fFindNearestHighlightCircle(anchorEl, hint)
    if (nearestCircle) {
        const circleX = parseFloat(nearestCircle.attr('cx'))
        const circleRadius = parseFloat(nearestCircle.attr('r'))
        if (!isNaN(circleX) && !isNaN(circleRadius)) {
            hint.circleRightEdge = circleX + circleRadius
            hint.circleLeftEdge = circleX - circleRadius
        }
    }

    return hint
}

function fCreateCompactLabelRect(anchorEl, geometryHint) {
    if (!anchorEl || !anchorEl.node || !anchorEl.node.parentNode) { return null }

    let rectX = NaN
    let rectY = NaN
    let rectWidth = NaN
    let rectHeight = NaN
    let fill = ''
    let stroke = ''
    let strokeWidth = ''

    const nearestCircle = fFindNearestHighlightCircle(anchorEl, geometryHint)
    if (nearestCircle) {
        const cx = parseFloat(nearestCircle.attr('cx'))
        const cy = parseFloat(nearestCircle.attr('cy'))
        const r = parseFloat(nearestCircle.attr('r'))
        if (!isNaN(cx) && !isNaN(cy) && !isNaN(r)) {
            rectX = cx - r
            rectY = cy - r
            rectWidth = r * 2
            rectHeight = r * 2
            fill = fGetNodeAttr(nearestCircle, 'fill')
            stroke = fGetNodeAttr(nearestCircle, 'stroke')
            strokeWidth = fGetNodeAttr(nearestCircle, 'stroke-width')
        }
    }

    if (isNaN(rectX) || isNaN(rectY) || isNaN(rectWidth) || isNaN(rectHeight)) {
        if (!anchorEl.node.getBBox) { return null }
        let textBBox
        try {
            textBBox = anchorEl.node.getBBox()
        } catch (e) {
            return null
        }
        const hintX = geometryHint && typeof geometryHint.x === 'number' ? geometryHint.x : null
        const hintY = geometryHint && typeof geometryHint.y === 'number' ? geometryHint.y : null
        rectX = (hintX !== null ? hintX - (Math.max(textBBox.width + 160, 260) / 2) : textBBox.x - 80)
        rectY = (hintY !== null ? hintY - (Math.max(textBBox.height + 120, 260) / 2) : textBBox.y - 60)
        rectWidth = Math.max(textBBox.width + 160, 260)
        rectHeight = Math.max(textBBox.height + 120, 260)
        fill = (geometryHint && geometryHint.fill) || fGetNodeAttr(anchorEl, 'fill') || 'rgb(121,220,109)'
    }

    let rectMarkup = '<rect x="' + rectX + '" y="' + rectY + '" width="' + rectWidth + '" height="' + rectHeight + '"'
    if (fill) { rectMarkup += ' fill="' + fill + '"' }
    if (stroke) { rectMarkup += ' stroke="' + stroke + '"' }
    if (strokeWidth) { rectMarkup += ' stroke-width="' + strokeWidth + '"' }
    rectMarkup += '></rect>'

    let newRect
    try {
        newRect = Snap.parse(rectMarkup)
    } catch (e) {
        return null
    }

    const parentNode = anchorEl.node.parentNode
    if (!newRect || !newRect.node || !parentNode) { return null }
    let insertedNode = null
    const fragmentNode = newRect.node
    while (fragmentNode.firstChild) {
        const childNode = fragmentNode.firstChild
        parentNode.insertBefore(childNode, anchorEl.node)
        if (!insertedNode && childNode.nodeType === 1) {
            insertedNode = childNode
        }
    }

    return insertedNode ? Snap(insertedNode) : null
}

function fResizeCompactLabelRect(rectEl, anchorEl, labelKey, reverseLabel, geometryHint) {
    if (!anchorEl) { return }

    const workingRectEl = rectEl || fCreateCompactLabelRect(anchorEl, geometryHint)
    if (!workingRectEl) { return }

    const rectX = parseFloat(workingRectEl.attr('x'))
    const rectWidth = parseFloat(workingRectEl.attr('width'))
    const fontSize = parseFloat(anchorEl.node.getAttribute('font-size'))
    if (isNaN(rectX) || isNaN(rectWidth)) { return }

    const widthOverride = compactLabelWidths[labelKey]
    const labelLength = String(labelKey || '').length
    const targetWidth = (typeof widthOverride === 'number')
        ? widthOverride
        : (isNaN(fontSize)
            ? Math.max(rectWidth, 450 + (labelLength * 120))
            : Math.max(rectWidth, fontSize * ((labelLength * 0.9) + 0.35)))

    const rectAttrs = { width: targetWidth }
    const widthDelta = targetWidth - rectWidth
    const hasForwardScale = Object.prototype.hasOwnProperty.call(compactForwardOffsetScale, labelKey)
    const forwardShift = (hasForwardScale && !reverseLabel)
        ? (isNaN(fontSize) ? 80 : (fontSize * compactForwardOffsetScale[labelKey]))
        : 0
    const reverseTextRightEdge = reverseLabel
        ? fGetReverseCompactRightEdge(anchorEl, labelKey, geometryHint)
        : NaN
    const circleRightEdge = geometryHint && typeof geometryHint.circleRightEdge === 'number'
        ? geometryHint.circleRightEdge
        : NaN
    const hintedRightEdge = geometryHint && typeof geometryHint.rightEdge === 'number'
        ? geometryHint.rightEdge
        : NaN
    const targetRightEdge = (labelKey === 'OHC' && !isNaN(circleRightEdge))
        ? circleRightEdge
        : (!isNaN(reverseTextRightEdge)
            ? reverseTextRightEdge
            : (!isNaN(circleRightEdge)
                ? circleRightEdge
                : hintedRightEdge))
    const rightEdgeAdjust = Object.prototype.hasOwnProperty.call(compactRectRightEdgeAdjust, labelKey)
        ? compactRectRightEdgeAdjust[labelKey]
        : 0
    const adjustedRightEdge = !isNaN(targetRightEdge)
        ? targetRightEdge + rightEdgeAdjust
        : targetRightEdge
    if (typeof widthOverride === 'number') {
        if (reverseLabel) {
            if (!isNaN(adjustedRightEdge)) {
                rectAttrs.x = adjustedRightEdge - targetWidth
            } else {
                rectAttrs.x = rectX - widthDelta
            }
        } else if (forwardShift > 0) {
            rectAttrs.x = rectX - forwardShift
        }
    } else if (reverseLabel) {
        if (!isNaN(adjustedRightEdge)) {
            rectAttrs.x = adjustedRightEdge - targetWidth
        } else {
            rectAttrs.x = rectX - widthDelta
        }
    } else if (forwardShift > 0) {
        rectAttrs.x = rectX - forwardShift
    }
    workingRectEl.attr(rectAttrs)
}

function fCollectHighlightRectsNearText(textEls) {
    const collectedRects = []
    const seenRects = new Set()
    const rectEls = molSnap.selectAll('rect')

    for (let i = 0; i < textEls.length; i++) {
        const textEl = textEls[i]
        if (!textEl || !textEl.node || !textEl.node.getBBox) { continue }

        let textBBox
        try {
            textBBox = textEl.node.getBBox()
        } catch (e) {
            continue
        }

        const padX = Math.max(textBBox.width * 0.7, 160)
        const padY = Math.max(textBBox.height * 0.6, 120)
        const minX = textBBox.x - padX
        const maxX = textBBox.x + textBBox.width + padX
        const minY = textBBox.y - padY
        const maxY = textBBox.y + textBBox.height + padY

        for (let r = 0; r < rectEls.length; r++) {
            const rectEl = rectEls[r]
            if (!rectEl || !rectEl.node) { continue }
            if (seenRects.has(rectEl.node)) { continue }

            const rectX = parseFloat(rectEl.attr('x'))
            const rectY = parseFloat(rectEl.attr('y'))
            const rectWidth = parseFloat(rectEl.attr('width'))
            const rectHeight = parseFloat(rectEl.attr('height'))
            if (isNaN(rectX) || isNaN(rectY) || isNaN(rectWidth) || isNaN(rectHeight)) { continue }

            const rectMaxX = rectX + rectWidth
            const rectMaxY = rectY + rectHeight
            const overlaps = rectMaxX >= minX && rectX <= maxX && rectMaxY >= minY && rectY <= maxY
            if (!overlaps) { continue }

            seenRects.add(rectEl.node)
            collectedRects.push(rectEl)
        }
    }

    return collectedRects
}

function fGetCompactLabelNumberX(textEl, labelKey, defaultOffsetX) {
    if (!textEl || !textEl.node || !labelKey || !textEl.node.getBBox) {
        return parseInt(textEl.attr('x')) + defaultOffsetX
    }

    let textBBox
    try {
        textBBox = textEl.node.getBBox()
    } catch (e) {
        return parseInt(textEl.attr('x')) + defaultOffsetX
    }

    const labelText = String(labelKey)
    if (labelText.length === 0) {
        return parseInt(textEl.attr('x')) + defaultOffsetX
    }

    let anchorCharIdx = labelText.indexOf('C')
    if (anchorCharIdx < 0) {
        anchorCharIdx = labelText.indexOf('N')
    }
    if (anchorCharIdx < 0) {
        return parseInt(textEl.attr('x')) + defaultOffsetX
    }

    const anchorLeftX = textBBox.x + (textBBox.width * (anchorCharIdx / labelText.length))
    return Math.round(anchorLeftX + defaultOffsetX)
}

function fBuildCompactAtomTspan(text, fillColor, className) {
    let tspan = '<tspan'
    if (fillColor) {
        tspan += ' fill="' + fillColor + '"'
    }
    if (className) {
        tspan += ' class="' + className + '"'
    }
    tspan += '>' + text + '</tspan>'
    return tspan
}

function fGetCompactAtomFill() {
    for (let i = 0; i < arguments.length; i++) {
        const fill = fGetNodeAttr(arguments[i], 'fill')
        if (fill) { return fill }
    }
    return ''
}

function fGetHydrogenGroupParentSymbol(atomIdx) {
    if (!Array.isArray(allAtomsTypeList) || !Array.isArray(atomConnectivityList)) { return '' }
    if (typeof atomIdx !== 'number' || atomIdx < 0 || allAtomsTypeList[atomIdx] !== 'H') { return '' }
    if (!Array.isArray(atomConnectivityList[atomIdx])) { return '' }

    for (let i = 0; i < atomConnectivityList[atomIdx].length; i++) {
        const neighborIdx = atomConnectivityList[atomIdx][i]
        const neighborSymbol = allAtomsTypeList[neighborIdx]
        if (neighborSymbol === 'O' || neighborSymbol === 'N') {
            return neighborSymbol
        }
    }

    return ''
}

function fGetAtomColor2D(symbol, colorContext) {
    if (!symbol || !atomColors2D) { return '' }
    const baseFill = Object.prototype.hasOwnProperty.call(atomColors2D, symbol) ? atomColors2D[symbol] : ''
    if (!baseFill) { return '' }

    if (symbol !== 'H' || atomColorMode2D !== 'group') {
        return baseFill
    }

    const parentSymbol = colorContext && colorContext.parentSymbol ? colorContext.parentSymbol : ''
    if (parentSymbol === 'O' || parentSymbol === 'N') {
        return atomColors2D[parentSymbol] || baseFill
    }

    const atomIdx = colorContext && typeof colorContext.atomIdx === 'number' ? colorContext.atomIdx : -1
    const attachedParentSymbol = fGetHydrogenGroupParentSymbol(atomIdx)
    if (attachedParentSymbol === 'O' || attachedParentSymbol === 'N') {
        return atomColors2D[attachedParentSymbol] || baseFill
    }

    return baseFill
}

function fGetDisplayAtomFill(symbol) {
    let colorContext = null
    let fallbackStartIdx = 1
    if (arguments.length > 1 && arguments[1] && typeof arguments[1] === 'object' &&
        (Object.prototype.hasOwnProperty.call(arguments[1], 'parentSymbol') || Object.prototype.hasOwnProperty.call(arguments[1], 'atomIdx'))) {
        colorContext = arguments[1]
        fallbackStartIdx = 2
    }

    if (svgAtomColors2DFlag) {
        const mappedFill = fGetAtomColor2D(symbol, colorContext)
        if (mappedFill) { return mappedFill }
    }

    const fallbackEls = []
    for (let i = fallbackStartIdx; i < arguments.length; i++) {
        fallbackEls.push(arguments[i])
    }

    return fGetCompactAtomFill.apply(null, fallbackEls)
}

function fGetOwnTextFromSvgNode(node) {
    if (!node || !node.childNodes) { return '' }
    let ownText = ''
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i]
        if (child.nodeType === 3) {
            ownText += child.nodeValue || ''
        }
    }
    return ownText.trim()
}

function fResolveAtomSymbolFromLabelNode(node) {
    if (!node) { return '' }
    if (node.classList && node.classList.contains('svgHydrogenPart')) {
        return 'H'
    }
    const rawText = fGetOwnTextFromSvgNode(node)
    if (!rawText) { return '' }
    const symbolMatch = rawText.match(/^([A-Z][a-z]?)/)
    if (!symbolMatch) { return '' }
    const symbol = symbolMatch[1]
    return Object.prototype.hasOwnProperty.call(atomColors2D, symbol) ? symbol : ''
}

function fResolveParentSymbolForHydrogenTspan(tspanNode, fallbackParentSymbol) {
    if (!tspanNode || !tspanNode.parentElement) {
        return (fallbackParentSymbol && fallbackParentSymbol !== 'H') ? fallbackParentSymbol : ''
    }

    const className = String(tspanNode.getAttribute('class') || '')
    if (className.indexOf('svgOxygenAttachedHydrogen') !== -1) {
        return 'O'
    }
    if (className.indexOf('svgCarbonAttachedHydrogen') !== -1) {
        return 'C'
    }

    const siblingSpans = []
    for (let i = 0; i < tspanNode.parentElement.childNodes.length; i++) {
        const child = tspanNode.parentElement.childNodes[i]
        if (!child || child.nodeType !== 1) { continue }
        if (String(child.nodeName).toLowerCase() !== 'tspan') { continue }
        siblingSpans.push(child)
    }

    for (let i = 0; i < siblingSpans.length; i++) {
        const sibling = siblingSpans[i]
        if (sibling === tspanNode) { continue }
        const siblingSymbol = fResolveAtomSymbolFromLabelNode(sibling)
        if (siblingSymbol && siblingSymbol !== 'H') {
            return siblingSymbol
        }
    }

    return (fallbackParentSymbol && fallbackParentSymbol !== 'H') ? fallbackParentSymbol : ''
}

function fBuildTextNodeAtomIndexMap() {
    const textNodeAtomIndexMap = new Map()
    if (!molSnap || !Array.isArray(allAtomsTypeList) || mode2D === 'condensed') {
        return textNodeAtomIndexMap
    }

    const atomTextMap = fGetRenderedAtomTextMap(true, true)
    for (const atomIdxKey in atomTextMap) {
        const atomTextEl = atomTextMap[atomIdxKey]
        if (!atomTextEl || !atomTextEl.node) { continue }
        textNodeAtomIndexMap.set(atomTextEl.node, parseInt(atomIdxKey, 10))
    }

    return textNodeAtomIndexMap
}

function fIsHighlightFillColor(fillValue) {
    if (!fillValue || typeof fillValue !== 'string') { return false }
    const normalized = fillValue.replace(/\s+/g, '').toLowerCase()
    if (normalized.indexOf('79dc6d') !== -1) { return true }
    if (normalized.indexOf('121,220,109') !== -1) { return true }
    return false
}

function fBuildHighlightedTextNodeSet() {
    if (!molSnap) { return new Set() }

    const highlightedTextNodes = new Set()
    const highlightRects = []
    const highlightCircles = []

    const rectEls = molSnap.selectAll('rect')
    for (let i = 0; i < rectEls.length; i++) {
        const rectEl = rectEls[i]
        if (!rectEl || !rectEl.node) { continue }
        const fillValue = String(rectEl.node.getAttribute('fill') || '')
        if (!fIsHighlightFillColor(fillValue)) { continue }

        const x = parseFloat(rectEl.node.getAttribute('x'))
        const y = parseFloat(rectEl.node.getAttribute('y'))
        const width = parseFloat(rectEl.node.getAttribute('width'))
        const height = parseFloat(rectEl.node.getAttribute('height'))
        if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) { continue }
        highlightRects.push({ x: x, y: y, width: width, height: height })
    }

    const circleEls = molSnap.selectAll('circle')
    for (let i = 0; i < circleEls.length; i++) {
        const circleEl = circleEls[i]
        if (!circleEl || !circleEl.node) { continue }
        const fillValue = String(circleEl.node.getAttribute('fill') || '')
        if (!fIsHighlightFillColor(fillValue)) { continue }

        const cx = parseFloat(circleEl.node.getAttribute('cx'))
        const cy = parseFloat(circleEl.node.getAttribute('cy'))
        const r = parseFloat(circleEl.node.getAttribute('r'))
        if (isNaN(cx) || isNaN(cy) || isNaN(r)) { continue }
        highlightCircles.push({ cx: cx, cy: cy, r: r })
    }

    if (highlightRects.length === 0 && highlightCircles.length === 0) {
        return highlightedTextNodes
    }

    const textEls = molSnap.selectAll('text')
    for (let i = 0; i < textEls.length; i++) {
        const textEl = textEls[i]
        if (!textEl || !textEl.node) { continue }

        const textId = String(fGetNodeAttr(textEl, 'id') || '')
        if (textId.indexOf('number') === 0) { continue }

        const textX = parseFloat(textEl.node.getAttribute('x'))
        const textY = parseFloat(textEl.node.getAttribute('y'))
        if (isNaN(textX) || isNaN(textY)) { continue }

        let isHighlighted = false

        for (let r = 0; r < highlightRects.length; r++) {
            const rect = highlightRects[r]
            if (textX >= rect.x && textX <= (rect.x + rect.width) &&
                textY >= rect.y && textY <= (rect.y + rect.height)) {
                isHighlighted = true
                break
            }
        }

        if (!isHighlighted) {
            for (let c = 0; c < highlightCircles.length; c++) {
                const circle = highlightCircles[c]
                const dx = textX - circle.cx
                const dy = textY - circle.cy
                if ((dx * dx) + (dy * dy) <= (circle.r * circle.r)) {
                    isHighlighted = true
                    break
                }
            }
        }

        if (isHighlighted) {
            highlightedTextNodes.add(textEl.node)
        }
    }

    return highlightedTextNodes
}

function fApplyAtomColors2DToSVGLabels() {
    if (!svgAtomColors2DFlag || !molSnap) { return }

    const highlightedTextNodes = fBuildHighlightedTextNodeSet()
    const textNodeAtomIndexMap = fBuildTextNodeAtomIndexMap()

    const textEls = molSnap.selectAll('text')
    for (let i = 0; i < textEls.length; i++) {
        const textEl = textEls[i]
        if (!textEl || !textEl.node) { continue }

        const textId = String(fGetNodeAttr(textEl, 'id') || '')
        if (textId.indexOf('number') === 0) { continue }

        const tspanNodes = textEl.node.querySelectorAll('tspan')
        if (highlightedTextNodes.has(textEl.node)) {
            textEl.attr({ fill: '#000' })
            for (let t = 0; t < tspanNodes.length; t++) {
                tspanNodes[t].setAttribute('fill', '#000')
            }
            continue
        }

        if (tspanNodes.length === 0) {
            const symbol = fResolveAtomSymbolFromLabelNode(textEl.node)
            const mappedFill = symbol
                ? fGetAtomColor2D(symbol, {
                    atomIdx: textNodeAtomIndexMap.has(textEl.node) ? textNodeAtomIndexMap.get(textEl.node) : -1,
                    parentSymbol: symbol,
                })
                : ''
            if (mappedFill) {
                textEl.attr({ fill: mappedFill })
            }
            continue
        }

        const parentSymbol = fResolveAtomSymbolFromLabelNode(textEl.node)
        const parentAtomIdx = textNodeAtomIndexMap.has(textEl.node) ? textNodeAtomIndexMap.get(textEl.node) : -1
        for (let t = 0; t < tspanNodes.length; t++) {
            const tspanNode = tspanNodes[t]
            const symbol = fResolveAtomSymbolFromLabelNode(tspanNode)
            if (!symbol) { continue }

            const effectiveParentSymbol = (symbol === 'H')
                ? fResolveParentSymbolForHydrogenTspan(tspanNode, parentSymbol)
                : parentSymbol

            const mappedFill = fGetAtomColor2D(symbol, {
                atomIdx: parentAtomIdx,
                parentSymbol: effectiveParentSymbol,
            })
            if (mappedFill) {
                tspanNode.setAttribute('fill', mappedFill)
            }
        }
    }
}

function fShouldReverseAldehydeLabel(anchorEl, oxygenEl, anchorIdx, oxygenIdx, atomTextMap) {
    if (!anchorEl || !oxygenEl) { return false }

    const anchorX = parseFloat(anchorEl.node.getAttribute('x'))
    const oxygenX = parseFloat(oxygenEl.node.getAttribute('x'))
    if (!isNaN(anchorX) && !isNaN(oxygenX)) {
        const oxygenDx = oxygenX - anchorX
        if (Math.abs(oxygenDx) > 30) {
            return oxygenDx < 0
        }
    }

    if (!Array.isArray(atomConnectivityList[anchorIdx])) { return false }
    for (let i = 0; i < atomConnectivityList[anchorIdx].length; i++) {
        const neighborIdx = atomConnectivityList[anchorIdx][i]
        if (neighborIdx === oxygenIdx) { continue }
        const neighborEl = atomTextMap[neighborIdx]
        if (!neighborEl) { continue }
        const neighborX = parseFloat(neighborEl.node.getAttribute('x'))
        if (isNaN(anchorX) || isNaN(neighborX)) { continue }
        // The aldehyde H sits opposite the carbon-chain neighbor.
        return neighborX > anchorX
    }

    return false
}

function fCompactFunctionalGroups2D() {
    if (!functionalGroupObj) { return }

    const atomTextMap = fGetRenderedAtomTextMap(true, true)
    const atomRectMap = fGetRenderedAtomRectMap(true, true)
    const textElsToRemove = []
    const rectElsToRemove = []
    const bondsToRemove = []
    const replacements = []

    if (functionalGroupObj.hasOwnProperty('carboxylicAcid')) {
        const acidEntries = functionalGroupObj.carboxylicAcid.O || []
        for (let i = 0; i < acidEntries.length; i++) {
            const entry = acidEntries[i]
            if (!Array.isArray(entry) || entry.length < 2) { continue }
            const ohIdx = entry[0]
            const carbonylOIdx = entry[1]
            const anchorIdx = Array.isArray(atomConnectivityList[ohIdx]) ? atomConnectivityList[ohIdx][0] : -1
            if (anchorIdx < 0) { continue }

            const anchorEl = atomTextMap[anchorIdx]
            const ohEl = atomTextMap[ohIdx]
            const carbonylOEl = atomTextMap[carbonylOIdx]
            if (!anchorEl || !ohEl || !carbonylOEl) { continue }

            const anchorRectEl = atomRectMap[anchorIdx]
            const ohRectEl = atomRectMap[ohIdx]
            const carbonylORectEl = atomRectMap[carbonylOIdx]

            textElsToRemove.push(ohEl, carbonylOEl)
            rectElsToRemove.push(ohRectEl, carbonylORectEl)
            const ohHydrogens = fGetAttachedHydrogenIndices(ohIdx)
            for (let hIdx = 0; hIdx < ohHydrogens.length; hIdx++) {
                const hydrogenAtomIdx = ohHydrogens[hIdx]
                const hydrogenEl = atomTextMap[hydrogenAtomIdx]
                const hydrogenRectEl = atomRectMap[hydrogenAtomIdx]
                if (hydrogenEl) { textElsToRemove.push(hydrogenEl) }
                if (hydrogenRectEl) { rectElsToRemove.push(hydrogenRectEl) }
                const hydrogenBondIdx = fFindBondIndexByAtoms(ohIdx, hydrogenAtomIdx)
                if (hydrogenBondIdx >= 0) { bondsToRemove.push(hydrogenBondIdx) }
            }
            bondsToRemove.push(
                fFindBondIndexByAtoms(anchorIdx, ohIdx),
                fFindBondIndexByAtoms(anchorIdx, carbonylOIdx)
            )
            const anchorNeighbors = Array.isArray(atomConnectivityList[anchorIdx]) ? atomConnectivityList[anchorIdx] : []
            let carbonNeighborCount = 0
            for (let n = 0; n < anchorNeighbors.length; n++) {
                if (allAtomsTypeList[anchorNeighbors[n]] === 'C') {
                    carbonNeighborCount += 1
                }
            }
            const isFormicAcid = carbonNeighborCount === 0 && carbonHydrogens[anchorIdx] === 1
            const reverseAcid = isFormicAcid ? false : fShouldReverseCompactLabel(anchorEl, [ohEl, carbonylOEl])
            const acidLabelKey = isFormicAcid ? 'HCOOH' : (reverseAcid ? 'HOOC' : 'COOH')
            const acidOFill = fGetDisplayAtomFill('O', carbonylOEl, ohEl, anchorEl)
            const acidMarkup = isFormicAcid
                ? (fBuildCompactAtomTspan('H', null, 'svgHydrogenPart svgCarbonAttachedHydrogen') +
                    fBuildCompactAtomTspan('C') +
                    fBuildCompactAtomTspan('O', acidOFill) +
                    fBuildCompactAtomTspan('O', acidOFill) +
                    fBuildCompactAtomTspan('H', null, 'svgHydrogenPart svgOxygenAttachedHydrogen')
                )
                : (reverseAcid
                    ? (
                        fBuildCompactAtomTspan('H', null, 'svgHydrogenPart svgOxygenAttachedHydrogen') +
                        fBuildCompactAtomTspan('O', acidOFill) +
                        fBuildCompactAtomTspan('O', acidOFill) +
                        fBuildCompactAtomTspan('C')
                    )
                    : (
                        fBuildCompactAtomTspan('C') +
                        fBuildCompactAtomTspan('O', acidOFill) +
                        fBuildCompactAtomTspan('O', acidOFill) +
                        fBuildCompactAtomTspan('H', null, 'svgHydrogenPart svgOxygenAttachedHydrogen')
                    ))
            const acidAttrs = reverseAcid
                ? fGetReversedCompactLabelAttrs(anchorEl, 'HOOC')
                : fGetForwardCompactLabelAttrs(anchorEl, acidLabelKey)
            replacements.push({
                anchorIdx: anchorIdx,
                el: anchorEl,
                markup: acidMarkup,
                attrs: acidAttrs,
                rectEl: anchorRectEl,
                labelKey: acidLabelKey,
                reverseLabel: reverseAcid,
                geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
            })
        }
    }

    if (functionalGroupObj.hasOwnProperty('aldehyde')) {
        const aldehydeEntries = functionalGroupObj.aldehyde.O || []
        for (let i = 0; i < aldehydeEntries.length; i++) {
            const oxygenIdx = aldehydeEntries[i]
            const anchorIdx = Array.isArray(atomConnectivityList[oxygenIdx]) ? atomConnectivityList[oxygenIdx][0] : -1
            if (anchorIdx < 0) { continue }

            const anchorEl = atomTextMap[anchorIdx]
            const oxygenEl = atomTextMap[oxygenIdx]
            if (!anchorEl || !oxygenEl) { continue }

            const anchorRectEl = atomRectMap[anchorIdx]
            const oxygenRectEl = atomRectMap[oxygenIdx]

            textElsToRemove.push(oxygenEl)
            rectElsToRemove.push(oxygenRectEl)
            const anchorHydrogens = fGetAttachedHydrogenIndices(anchorIdx)
            for (let hIdx = 0; hIdx < anchorHydrogens.length; hIdx++) {
                const hydrogenAtomIdx = anchorHydrogens[hIdx]
                const hydrogenEl = atomTextMap[hydrogenAtomIdx]
                const hydrogenRectEl = atomRectMap[hydrogenAtomIdx]
                if (hydrogenEl) { textElsToRemove.push(hydrogenEl) }
                if (hydrogenRectEl) { rectElsToRemove.push(hydrogenRectEl) }
                const hydrogenBondIdx = fFindBondIndexByAtoms(anchorIdx, hydrogenAtomIdx)
                if (hydrogenBondIdx >= 0) { bondsToRemove.push(hydrogenBondIdx) }
            }
            bondsToRemove.push(fFindBondIndexByAtoms(anchorIdx, oxygenIdx))
            const reverseAldehyde = fShouldReverseAldehydeLabel(anchorEl, oxygenEl, anchorIdx, oxygenIdx, atomTextMap)
            const aldehydeOFill = fGetDisplayAtomFill('O', oxygenEl, anchorEl)
            const aldehydeMarkup = reverseAldehyde
                ? (
                    fBuildCompactAtomTspan('O', aldehydeOFill) +
                    fBuildCompactAtomTspan('H', null, 'svgHydrogenPart svgCarbonAttachedHydrogen') +
                    fBuildCompactAtomTspan('C')
                )
                : (
                    fBuildCompactAtomTspan('C') +
                    fBuildCompactAtomTspan('H', null, 'svgHydrogenPart svgCarbonAttachedHydrogen') +
                    fBuildCompactAtomTspan('O', aldehydeOFill)
                )
            replacements.push({
                anchorIdx: anchorIdx,
                el: anchorEl,
                markup: aldehydeMarkup,
                attrs: reverseAldehyde ? fGetReversedCompactLabelAttrs(anchorEl, 'OHC') : null,
                rectEl: anchorRectEl,
                labelKey: reverseAldehyde ? 'OHC' : 'CHO',
                reverseLabel: reverseAldehyde,
                geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
            })
        }
    }

    if (functionalGroupObj.hasOwnProperty('cyanide')) {
        const cyanideEntries = functionalGroupObj.cyanide.N || []
        for (let i = 0; i < cyanideEntries.length; i++) {
            const nitrogenIdx = cyanideEntries[i]
            const anchorIdx = Array.isArray(atomConnectivityList[nitrogenIdx]) ? atomConnectivityList[nitrogenIdx][0] : -1
            if (anchorIdx < 0) { continue }

            const anchorEl = atomTextMap[anchorIdx]
            const nitrogenEl = atomTextMap[nitrogenIdx]
            if (!anchorEl || !nitrogenEl) { continue }

            const anchorRectEl = atomRectMap[anchorIdx]
            const nitrogenRectEl = atomRectMap[nitrogenIdx]
            textElsToRemove.push(nitrogenEl)
            rectElsToRemove.push(nitrogenRectEl)
            bondsToRemove.push(fFindBondIndexByAtoms(anchorIdx, nitrogenIdx))

            const reverseCyanide = fShouldReverseCompactLabel(anchorEl, [nitrogenEl])
            const nitrogenFill = fGetDisplayAtomFill('N', nitrogenEl, anchorEl)
            const cyanideMarkup = reverseCyanide
                ? (
                    fBuildCompactAtomTspan('N', nitrogenFill) +
                    fBuildCompactAtomTspan('C')
                )
                : (
                    fBuildCompactAtomTspan('C') +
                    fBuildCompactAtomTspan('N', nitrogenFill)
                )

            replacements.push({
                anchorIdx: anchorIdx,
                el: anchorEl,
                markup: cyanideMarkup,
                attrs: reverseCyanide ? fGetReversedCompactLabelAttrs(anchorEl, 'NC') : null,
                rectEl: anchorRectEl,
                labelKey: reverseCyanide ? 'NC' : 'CN',
                reverseLabel: reverseCyanide,
                geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
            })
        }
    }

    if (functionalGroupObj.hasOwnProperty('nitro')) {
        const nitroEntries = functionalGroupObj.nitro.N || []
        for (let i = 0; i < nitroEntries.length; i++) {
            const nitrogenIdx = nitroEntries[i]
            if (!Array.isArray(atomConnectivityList[nitrogenIdx])) { continue }

            const oxygenIndices = []
            for (let n = 0; n < atomConnectivityList[nitrogenIdx].length; n++) {
                const neighborIdx = atomConnectivityList[nitrogenIdx][n]
                const neighborEl = allAtomsTypeList[neighborIdx]
                if (neighborEl === 'O') {
                    oxygenIndices.push(neighborIdx)
                }
            }
            if (oxygenIndices.length < 2) { continue }

            const anchorIdx = nitrogenIdx

            const anchorEl = atomTextMap[anchorIdx]
            const oxygenEl1 = atomTextMap[oxygenIndices[0]]
            const oxygenEl2 = atomTextMap[oxygenIndices[1]]
            if (!anchorEl || !oxygenEl1 || !oxygenEl2) { continue }

            const anchorRectEl = atomRectMap[anchorIdx]
            const oxygenRectEl1 = atomRectMap[oxygenIndices[0]]
            const oxygenRectEl2 = atomRectMap[oxygenIndices[1]]
            textElsToRemove.push(oxygenEl1, oxygenEl2)
            rectElsToRemove.push(oxygenRectEl1, oxygenRectEl2)

            for (let o = 0; o < oxygenIndices.length; o++) {
                bondsToRemove.push(fFindBondIndexByAtoms(nitrogenIdx, oxygenIndices[o]))
            }

            const reverseNitro = fShouldReverseCompactLabel(anchorEl, [oxygenEl1, oxygenEl2])
            const oxygenFill = fGetDisplayAtomFill('O', oxygenEl1, oxygenEl2, anchorEl)
            const nitrogenFill = fGetDisplayAtomFill('N', anchorEl)
            const nitroMarkup = reverseNitro
                ? (
                    fBuildCompactAtomTspan('O', oxygenFill) +
                    '<tspan dy="70" font-size=".8em"' + (oxygenFill ? (' fill="' + oxygenFill + '"') : '') + '>2</tspan>' +
                    '<tspan dy="-70"' + (nitrogenFill ? (' fill="' + nitrogenFill + '"') : '') + '>N</tspan>'
                )
                : (
                    fBuildCompactAtomTspan('N', nitrogenFill) +
                    fBuildCompactAtomTspan('O', oxygenFill) +
                    '<tspan dy="70" font-size=".8em"' + (oxygenFill ? (' fill="' + oxygenFill + '"') : '') + '>2</tspan>'
                )

            replacements.push({
                anchorIdx: anchorIdx,
                el: anchorEl,
                markup: nitroMarkup,
                attrs: reverseNitro ? fGetReversedCompactLabelAttrs(anchorEl, 'O2N') : null,
                rectEl: anchorRectEl,
                labelKey: reverseNitro ? 'O2N' : 'NO2',
                reverseLabel: reverseNitro,
                geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
            })
        }
    }

    const lineEls = molSnap.selectAll('line')
    for (let i = 0; i < bondsToRemove.length; i++) {
        fRemoveBondLinesByBondIndex(bondsToRemove[i], lineEls)
    }

    const nearbyRectEls = fCollectHighlightRectsNearText(textElsToRemove)
    for (let i = 0; i < nearbyRectEls.length; i++) {
        rectElsToRemove.push(nearbyRectEls[i])
    }

    for (let i = 0; i < textElsToRemove.length; i++) {
        if (textElsToRemove[i]) { textElsToRemove[i].remove() }
    }

    for (let i = 0; i < rectElsToRemove.length; i++) {
        if (rectElsToRemove[i]) { rectElsToRemove[i].remove() }
    }

    for (let i = 0; i < replacements.length; i++) {
        const newTextEl = fReplaceTextElementMarkup(replacements[i].el, replacements[i].markup, replacements[i].attrs)
        const rectEl = (replacements[i].rectEl && replacements[i].rectEl.node && replacements[i].rectEl.node.parentNode)
            ? replacements[i].rectEl
            : null
        fResizeCompactLabelRect(rectEl, newTextEl, replacements[i].labelKey, replacements[i].reverseLabel, replacements[i].geometryHint)
        if (newTextEl && replacements[i].anchorIdx >= 0) {
            compactNumberingLabelMap[replacements[i].anchorIdx] = replacements[i].labelKey
        }
    }
}

// ── fMarkExpandedHydrogens ───────────────────────────────────────────────

function fWrapStandaloneHydrogenTextsAsTspan() {
    if (!molSnap) { return }

    const textEls = molSnap.selectAll('text')
    for (let i = 0; i < textEls.length; i++) {
        const textEl = textEls[i]
        if (!textEl || !textEl.node) { continue }
        if (textEl.node.children && textEl.node.children.length > 0) { continue }

        const rawText = String(textEl.node.textContent || '').trim()

        if (rawText === 'OH') {
            const oxygenFill = fGetDisplayAtomFill('O', textEl)
            const hydrogenFill = fGetDisplayAtomFill('H', { parentSymbol: 'O' }, textEl)
            fReplaceTextElementMarkup(
                textEl,
                '<tspan' + (oxygenFill ? (' fill="' + oxygenFill + '"') : '') + '>O</tspan>' +
                '<tspan class="svgHydrogenPart"' + (hydrogenFill ? (' fill="' + hydrogenFill + '"') : '') + '>H</tspan>'
            )
            continue
        }

        if (rawText === 'HO' || rawText === 'HO-') {
            const hydrogenFill = fGetDisplayAtomFill('H', { parentSymbol: 'O' }, textEl)
            const oxygenFill = fGetDisplayAtomFill('O', textEl)
            let markup = '<tspan class="svgHydrogenPart"' + (hydrogenFill ? (' fill="' + hydrogenFill + '"') : '') + '>H</tspan>' +
                '<tspan' + (oxygenFill ? (' fill="' + oxygenFill + '"') : '') + '>O</tspan>'
            if (rawText === 'HO-') {
                markup += '<tspan>-</tspan>'
            }
            fReplaceTextElementMarkup(textEl, markup)
            continue
        }

        if (rawText !== 'H') { continue }

        const existingClass = fGetNodeAttr(textEl, 'class')
        const classOverride = existingClass
            ? (existingClass.indexOf('svgHydrogenPart') === -1 ? existingClass + ' svgHydrogenPart' : existingClass)
            : 'svgHydrogenPart'
        const hydrogenFill = fGetDisplayAtomFill('H', textEl)

        fReplaceTextElementMarkup(
            textEl,
            '<tspan class="svgHydrogenPart"' + (hydrogenFill ? (' fill="' + hydrogenFill + '"') : '') + '>H</tspan>',
            { 'class': classOverride }
        )
    }
}

function fMarkExpandedHydrogens() {
    fWrapStandaloneHydrogenTextsAsTspan()
}

// ── fUpdateSVG ────────────────────────────────────────────────────────────

function fUpdateSVG() {

    if (!jsmeNomeclatureApplet) return
    compactNumberingLabelMap = {}
    let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
    // Fix JSME highlight malformation BEFORE HTML parsing
    // Bug 1: fill/stroke attributes corrupted for all highlighted atoms
    mySVG = mySVG.replace(
        /fill="([^"]*?) stroke=" ([^"]*)"="" stroke-width="([^"]*)"/g,
        'fill="$1" stroke="$2" stroke-width="$3"'
    )
    // Bug 2 (N-type: stroke-width absorbs atom label via literal >) is NOT sanitised
    // here — the absorbed content may contain double-quoted tspan attributes (e.g.
    // font-size="80%") which break any [^"]* regex on the raw string.  The DOM
    // representation leaves the stray '>' inside the attribute value, which
    // patchtheNitrogen detects via getAttribute('stroke-width').indexOf('>').
    $("#jsmeNomeclatureSVG").html(mySVG);
    if (mode2D == 'condensed' || mode2D == 'condensedZigZag') {
        fAddHydrogens2SVG()
    }
    molSnap = Snap("#jsmeNomeclatureSVG svg")
    snapLogo = molSnap.select('polygon:last-of-type')
    snapLogo.remove()
    if (mode2D === 'expanded') {
        fMarkExpandedHydrogens()
    }
    if (mode2D === 'condensed') {
        fCompactFunctionalGroups2D()
    }
    patchtheNitrogen()
    fWrapStandaloneHydrogenTextsAsTspan()
    fApplyAtomColors2DToSVGLabels()
    $("#jsmeNomeclatureSVG").toggleClass("svgAtomsColorized", svgAtomColors2DFlag)

}

// ── patchtheNitrogen ──────────────────────────────────────────────────────

function patchtheNitrogen() {
    if (!functionalGroupObj || !molSnap) { return }

    ////// NH2 special case PATCH //////    
    if (functionalGroupObj.hasOwnProperty("amine")) {
        molSnap.selectAll('text').forEach(function (el) {
            var snapText = String(el.attr('text') || '').trim();
            var rawText = (el.node.textContent || '').replace(/\s+/g, '');
            // JSME Bug 2: stroke-width absorbed the label → DOM value contains '>'
            var swAttr = el.node.getAttribute('stroke-width') || '';
            var hasBug2 = swAttr.indexOf('>') !== -1;
            var isTarget = (snapText === '2' || rawText === '2' || rawText === 'NH2' || hasBug2);
            if (!isTarget) { return; }
            // Rebuild from scratch — only use clean positional/style attributes.
            // Do NOT use el.toString(): it carries the malformed stroke-width into
            // the string, so the boundary regex matches inside the attribute value.
            var x = el.node.getAttribute('x');
            var y = el.node.getAttribute('y');
            if (!x || !y) { return; }
            var fontSize = el.node.getAttribute('font-size');
            var textAnchor = el.node.getAttribute('text-anchor');
            var fill = fGetDisplayAtomFill('N', el);
            var stroke = el.node.getAttribute('stroke');
            var strokeW = swAttr.replace(/>[\s\S]*$/, '');  // "11px>NH2" → "11px"
            var attrs = 'x="' + x + '" y="' + y + '"';
            if (fontSize) { attrs += ' font-size="' + fontSize + '"'; }
            if (textAnchor) { attrs += ' text-anchor="' + textAnchor + '"'; }
            if (fill) { attrs += ' fill="' + fill + '"'; }
            if (stroke && strokeW) { attrs += ' stroke="' + stroke + '" stroke-width="' + strokeW + '"'; }
            var hydrogenFill = fGetDisplayAtomFill('H', { parentSymbol: 'N' }, el);
            var hydrogenFillAttr = hydrogenFill ? (' fill="' + hydrogenFill + '"') : '';
            var newString = '<text ' + attrs + '>N<tspan class="svgHydrogenPart"' + hydrogenFillAttr + '>H<tspan dy="70" font-size=".8em">2</tspan></tspan></text>';
            var newEl;
            try { newEl = Snap.parse(newString); } catch (e) { return; }
            var parentNode = el.node.parentNode;
            var nextSibling = el.node.nextSibling;
            if (!parentNode || !newEl || !newEl.node) { return; }
            var fragmentNode = newEl.node;
            while (fragmentNode.firstChild) {
                parentNode.insertBefore(fragmentNode.firstChild, nextSibling);
            }
            el.remove();
        });
    }
    ////// NO2 special case PATCH //////    
    if (functionalGroupObj.hasOwnProperty("nitro")) {
        molSnap.selectAll('text').forEach(function (el) {
            var txt = el.attr('text') || '';
            if (String(txt).trim() === '+') {
                el.attr({ text: 'N+' });
            }
            if (String(txt).trim() === '-') {
                el.attr({ text: 'O-' });
            }
        });
    }
}

// ── fLoadMol3D ────────────────────────────────────────────────────────────

function fLoadMol3D() {
    const selectedExample = nameExamples[selectedMol]
    if (!selectedExample) { return }

    let myMol3D = selectedExample.file3D
    let movetoCmd = (selectedExample.hasOwnProperty('moveto') && selectedExample.moveto) ? (selectedExample.moveto + "; ") : ""
    Jmol.script(
        jmolAppletNomeclature,
        "frank off;load " + myMol3D + ";  select all; center selected;" + movetoCmd + "script spt/init-3.spt;"
    );
    fSetMolVis3D()
}

// ── fFetchAndParse3D ──────────────────────────────────────────────────────

function fFetchAndParse3D() {
    if (!selectedMol || !nameExamples[selectedMol]) { return }
    const mol = selectedMol  // stale-mol guard
    const url = nameExamples[selectedMol].file3D
    fetch(url)
        .then(function (r) { return r.text() })
        .then(function (text) {
            if (selectedMol !== mol) { return }  // user navigated away
            fParseSDF3D(text)
            fDetectMolType3D()
            fCalcMainChain3D()
            // console.log('[3D parsed]', mol, 'FG:', Object.keys(functionalGroupObj3D), 'CCd bonds:', multiBondsObj3D.CCd)
        })
        .catch(function (e) { console.warn('[3D parse failed]', url, e) })
}

// ── showAtomSymbols3D ─────────────────────────────────────────────────────

function showAtomSymbols3D() {
    if (atomSymbols3DFlag) {
        Jmol.script(jmolAppletNomeclature, "select all; labels %e;" + JmolSelection + ";")
    } else {
        Jmol.script(jmolAppletNomeclature, "select all; labels off;" + JmolSelection + ";")
    }

    if (nameAnalysisMode == 'compCarbonsCount') {
        fShowNumbering3D()
    }
}

// ── showHydrogens3D ─────────────────────────────────────────────────────

function showHydrogens3D() {
    if (hydrogens3DFlag) {
        Jmol.script(jmolAppletNomeclature, "hide none;")
    } else {
        Jmol.script(jmolAppletNomeclature, "select _H and connected(_C); hide selected;" + JmolSelection + ";")
    }

    if (nameAnalysisMode == 'compCarbonsCount') {
        fShowNumbering3D()
    }
}

// ── rotate3D ─────────────────────────────────────────────────────────────

function rotate3D() {
    if (rotateFlag) {
        Jmol.script(jmolAppletNomeclature, "rotate spin 60;")
    } else {
        Jmol.script(jmolAppletNomeclature, "rotate  off;")
    }

}

// ── fGetNameBoxes ─────────────────────────────────────────────────────────

function fGetNameBoxes() {
    return Array.from(document.querySelectorAll('.nameCompContainer .nameCompBox'))
        .map(function (el) { return { text: el.textContent.trim(), selected: el.classList.contains('selected') } })
        .filter(function (b) { return b.text })
}

// ── fDrawNameBoxes ────────────────────────────────────────────────────────

function fDrawNameBoxes(ctx, nameBoxes, canvasWidth, yTop) {
    if (!nameBoxes.length) return
    let font = 'bold 40px Arial, sans-serif'
    ctx.font = font
    let pad = 18
    let boxH = 60
    let gap = -2  // boxes overlap border like CSS margin-right: -2px
    let totalW = nameBoxes.reduce(function (acc, b) {
        return acc + ctx.measureText(b.text).width + pad * 2
    }, 0) + gap * (nameBoxes.length - 1)
    let x = Math.round((canvasWidth - totalW) / 2)
    let y = yTop + 10
    nameBoxes.forEach(function (b) {
        let tw = ctx.measureText(b.text).width
        let bw = Math.round(tw + pad * 2)
        ctx.fillStyle = b.selected ? '#5FAD56' : '#ffffff'
        ctx.fillRect(x, y, bw, boxH)
        ctx.strokeStyle = b.selected ? '#5FAD56' : '#dddddd'
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, bw, boxH)
        ctx.fillStyle = b.selected ? '#ffffff' : '#000000'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(b.text, x + pad, y + boxH / 2)
        x += bw + gap
    })
}

// ── fSave2DPng ────────────────────────────────────────────────────────────

window.fSave2DPng = function () {
    let svgEl = document.querySelector("#jsmeNomeclatureSVG svg")
    if (!svgEl) return
    let nameBoxes = fGetNameBoxes()
    let bbox = svgEl.getBoundingClientRect()
    let srcWidth = bbox.width || 450
    let srcHeight = bbox.height || 200
    let width = 1200
    let molHeight = Math.round(srcHeight * (width / srcWidth))
    let labelHeight = nameBoxes.length ? 90 : 0

    let svgClone = svgEl.cloneNode(true)
    svgClone.setAttribute('width', srcWidth)
    svgClone.setAttribute('height', srcHeight)

    // Export uses a serialized standalone SVG blob, so page CSS selectors are
    // not available there. Inline unchecked atom-color mode directly.
    if (!document.querySelector("#jsmeNomeclatureSVG")?.classList.contains("svgAtomsColorized")) {
        svgClone.querySelectorAll('text:not([id^="number"]), text:not([id^="number"]) tspan').forEach(function (el) {
            el.setAttribute('fill', '#000')
        })
    }

    let svgData = new XMLSerializer().serializeToString(svgClone)
    if (!svgData.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgData = svgData.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
    }

    // Fix JSME bug: highlighted atom labels produce malformed XML:
    // fill="rgb(X,X,X) stroke=" black"="" stroke-width="11px"
    // →  fill="rgb(X,X,X)" stroke="black" stroke-width="11px"
    svgData = svgData.replace(
        /fill="([^"]*?) stroke=" ([^"]*)"="" stroke-width="([^"]*)"/g,
        'fill="$1" stroke="$2" stroke-width="$3"'
    )
    // Fix JSME N-type highlight bug (e.g. NH2): XMLSerializer escapes > as &gt; inside
    // the attribute value, producing: stroke-width="11px&gt;&lt;tspan&gt;...garbage..." sub"="">
    // →  stroke-width="11px">
    svgData = svgData.replace(
        /stroke-width="(\d+px?)&gt;[^"]*" [^>]*>/g,
        'stroke-width="$1">'
    )

    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = molHeight + labelHeight
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let img = new Image()
    img.onload = function () {
        ctx.drawImage(img, 0, 0, width, molHeight)
        fDrawNameBoxes(ctx, nameBoxes, width, molHeight)
        canvas.toBlob(function (blob) {
            if (!blob) { console.error('2D PNG: toBlob returned null'); return }
            let a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = (currentMolName || selectedMol || 'molecule').replace(/\s+/g, '_') + '_2D.png'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(a.href)
        })
    }
    img.onerror = function () {
        console.error('[2D PNG] SVG failed to load. SVG content:')
        // console.log(svgData)
    }

    let svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    img.src = URL.createObjectURL(svgBlob)
}

// ── fSaveJmolPng ──────────────────────────────────────────────────────────

window.fSaveJmolPng = function () {
    let baseName = (currentMolName || selectedMol || 'molecule').replace(/\s+/g, '_')
    let safeLabel = (currentMolName || '').replace(/'/g, '')

    Jmol.script(jmolAppletNomeclature,
        "set echo  bottom center; color echo black; font echo 24 ; echo " + safeLabel + "|| ;" +
        "write IMAGE 1200 1200 PNG '" + baseName + "_3D.png';"
    )
    setTimeout(function () {
        Jmol.script(jmolAppletNomeclature, "set echo off;")
    }, 500)
}

// ── fShowNameAnalysis ─────────────────────────────────────────────────────

function fShowNameAnalysis() {

    compCount = nameComponentsList.length;

    const toggleIcon = narrateAnalysisFlag ? svgSpeaker : svgMute
    const toggleTitle = narrateAnalysisFlag ? 'Αφήγηση ενεργή' : 'Αφήγηση ανενεργή'
    const playDisabled = narrateAnalysisFlag ? '' : ' disabled'

    const toggleNameStyleBox = nameBoxFlag ? svgNameBox : svgNameBoxOff
    const boxClass = nameBoxFlag ? 'nameCompBox boxed' : 'nameCompBox unboxed'
    const boxTooltip = nameBoxFlag ? 'Πλαίσια συνθετικών' : 'Χωρίς πλαίσια συνθετικών'

    const toggleNameStyleCross = nameCrossFlag ? svgNameCross : svgNameCrossOff
    const crossClass = nameCrossFlag ? 'nameCompPlus' : 'nameCompPlus hide'
    const crossTooltip = nameCrossFlag ? 'Διαχωρισμένα συνθετικά' :'Ενωμένα συνθετικά' 

    const nameSettingClass = nameSettingsFlag ? 'open' : ''
    const namesSettingsBtnActiveClass = nameSettingsFlag ? 'active' : ''

    nameCompContainer = "<div class='panelTitle'><span>Επεξήγηση ονομασίας</span><div id='nameSettingsBtnDiv'><button  id='nameSettingsBtn'  class='settingsBtn " + namesSettingsBtnActiveClass + "'  onclick='fToggleNameSettings()'  data-tooltip='Ρυθμίσεις Ονομασίας' >" + svgSettings  +" </button></div></div>" +
        "<div id='nameSettingsPanel' class='" + nameSettingClass + "'><button id='narrateAnalysisToggle' class='narrateBtn' data-tooltip='" + toggleTitle + "'>" + toggleIcon + "</button><button id='readNameBtn' class='readNameBtn' data-tooltip='Εκφώνηση ονόματος' >" + svgPlay + "</button><button id='nameStyleBoxToggle' class='nameStyleBox' data-tooltip='" + boxTooltip + "'>" + toggleNameStyleBox + "</button><button id='nameStyleCrossToggle' class='nameStyleCross' data-tooltip='" + crossTooltip + "'>" + toggleNameStyleCross + "</button></div>" +
        "<div class='HFlex nameContainer' style='justify-content:center;'><div class='nameCompContainer'>"

    // Build the name component boxes with Greek euphony applied, and + signs in between 

    for (i = 0; i < compCount; i++) {
        currComp = nameComponentsList[i]
        if (currComp == "" || currComp == undefined) { continue }

        // Apply Greek euphony: append connecting vowel to this component's display
        // if it ends with a consonant and the next non-empty component starts with one
        let displayComp = currComp
        for (let n = i + 1; n < compCount; n++) {
            const nextComp = nameComponentsList[n]
            if (!nextComp) continue
            const lastCh = currComp[currComp.length - 1]
            const firstCh = nextComp[0]
            const _isGkConsonant = ch => /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) && !new Set(['α', 'ε', 'η', 'ι', 'ο', 'υ', 'ω', 'ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ']).has(ch);
            if (_isGkConsonant(lastCh) && _isGkConsonant(firstCh)) {
                const connector = ((lastCh === 'π' || lastCh === 'τ') && firstCh === 'δ') ? 'α' : 'ο';
                displayComp = currComp + "<span class='euphonyLetter'>" + connector + "</span>"
            }
            break
        }

        compBox = "<div class='" + boxClass + "' " + "id='comp" + i + "' >" + displayComp + "</div>"
        if (i < compCount - 1) {
            compBox += "<div class='" + crossClass + "' > + </div>"
        }
        nameCompContainer += compBox
    }

    // nameCompContainer += "</div><button id='readNameBtn' class='readNameBtn' data-tooltip='Ανάγνωση ονόματος'" + playDisabled + ">" + svgPlay + "</button></div>"

    $("#nameAnalysis").html(nameCompContainer)

    // Restore .selected on the previously-selected box after HTML rebuild
    if (nameAnalysisMode !== 'none') {
        const _modeToCompId = {
            'compNumber1': 'comp0',
            ' compSecondSub1': 'comp1',
            'compNumber2': 'comp2',
            ' compSecondSub2': 'comp3',
            'compBondPos': 'comp4',
            'compCarbonsCount': 'comp5',
            'compBondType': 'comp6',
            'compEndNumber': 'comp7',
            'compBondType2': 'comp8',
            'compSuffix': 'comp9'
        }
        const _selId = _modeToCompId[nameAnalysisMode]
        if (_selId && $('#' + _selId).length) {
            $('#' + _selId).addClass('selected')
        } else {
            nameAnalysisMode = 'none'
        }
    }

    fExplainNameComp()

}

// ── fClearHighlights ──────────────────────────────────────────────────────

function fClearHighlights() {
    clearInterval(myNumberingTimeout)
    currNumberEl = 0
    if (!jsmeNomeclatureApplet) return
    jsmeNomeclatureApplet.resetAtomColors(0)
    jsmeNomeclatureApplet.resetBondColors(0)
    Jmol.script(jmolAppletNomeclature, "select all;  selectionHalos off; color bonds none; color atoms none;")
    showAtomSymbols3D()
    removeEcho3D()
    $("#ruleTheoryContainer").hide()
    $("#nameAnalysisExplain").html('')
    ruleTableHighlight = 0
    JmolSelection = 'select none;'

}

// ── fExplainNameComp ──────────────────────────────────────────────────────

function fExplainNameComp() {
    // console.log(nameAnalysisMode)
    switch (nameAnalysisMode) {
        case 'none':
            myText = 'Κάνε κλικ σε ένα συνθετικό του ονόματος για να δεις την εξήγηση'
            nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;background-color:#fff;font-size:1rem;box-shadow:0 0 #fff;"
            myClass = ''
            ruleFlag = false
            numberingFlag = false
            break;
        case 'compNumber1':

            nStyle = ""
            myClass = ''
            if (nameComponentsList[1] !== null && nameComponentsList[1].length > 0) {
                if (nameComponentsList[3] !== null && nameComponentsList[3].length > 0) {
                    myText = " Δηλώνει τη θέση της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
                    fHighlightFG(1)
                    fHighlightFG3D(1)
                } else {
                    if (nameComponentsList[0].includes(',')) {
                        countSubs = (nameComponentsList[0].match(/,/g) || []).length;
                        switch (countSubs) {
                            case 1:
                                myCountText = " δύο "
                                break;
                            case 2:
                                myCountText = " τριών"
                                break;
                            default:
                                myCountText = ""
                        }

                        myText = " Δηλώνει τις θέσεις των " + myCountText + " δευτερευουσών  Χαρακτηριστικών Ομάδών."
                    } else {
                        myText = " Δηλώνει τη θέση της δευτερεύουσας Χαρακτηριστικής Ομάδας."
                    }

                    if (Object.keys(functionalGroupObj).length > 1) {
                        fHighlightFG(1)
                        fHighlightFG3D(1)
                        myFG0 = functionalGroupsList[0]
                        myFG1 = functionalGroupsList[1]
                        ruleTableHighlight = [gFunctionalGroupsOrder.indexOf(myFG0), gFunctionalGroupsOrder.indexOf(myFG1)];
                        $("#ruleTheoryContainer").show()
                    } else {
                        fHighlightFG()
                        fHighlightFG3D()
                    }
                }

            } else if (nameComponentsList[6] == "άν" || nameComponentsList[6] == "αν") {
                if (nameComponentsList[0].includes(',')) {
                    countSubs = (nameComponentsList[0].match(/,/g) || []).length;
                    switch (countSubs) {
                        case 1:
                            myCountText = " δύο "
                            break;
                        case 2:
                            myCountText = " τριών"
                            break;
                        default:
                            myCountText = ""
                    }

                    myText = " Δηλώνει τις θέσεις των " + myCountText + "  Χαρακτηριστικών Ομάδών."
                } else {
                    myText = " Δηλώνει τη θέση της Χαρακτηριστικής Ομάδας."
                }

                fHighlightFG()
                fHighlightFG3D()
            } else {
                switch (nameComponentsList[6]) {
                    case 'έν':
                    case 'εν':
                        myText = " Δηλώνει τη θέση του διπλού δεσμού."
                        ruleTableHighlight = 2;
                        break
                    case 'διέν':
                    case 'διεν':
                        myText = " Δηλώνει τις θέσεις των διπλών δεσμών."
                        ruleTableHighlight = 4;
                        break
                    case 'ίν':
                    case 'ιν':
                        myText = " Δηλώνει τη θέση του τριπλού δεσμού."
                        ruleTableHighlight = 3;
                        break
                    case 'διίν':
                    case 'διιν':
                        myText = " Δηλώνει τις θέσεις των τριπλών δεσμών."

                        ruleTableHighlight = 6;
                        break
                    default:
                    // myText = " Δηλώνει τη θέση του Πολλαπλού Δεσμού."
                }
                fHighlightMultiBonds(1)
                fHighlightMultiBonds3D(1)
                // 
                $("#ruleTheoryContainer").show()

            }
            numberingFlag = true
            fShowNumbering(0)
            break;
        case ' compSecondSub1':
            numberingFlag = false
            nStyle = ""
            myClass = ''
            if (nameComponentsList[3] !== null && nameComponentsList[3].length > 0) {
                myText = " Δηλώνει το όνομα  της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
                fHighlightFG(1)
                fHighlightFG3D(1)
            } else {
                if (Object.keys(functionalGroupObj).length > 1) {
                    fHighlightFG(1)
                    fHighlightFG3D(1)

                    // Βρισκει τις υπαρχουσες ΧΟ και επιλέγει τη σειρά στον πινακα
                    myFG0 = functionalGroupsList[0]
                    myFG1 = functionalGroupsList[1]
                    ruleTableHighlight = [gFunctionalGroupsOrder.indexOf(myFG0), gFunctionalGroupsOrder.indexOf(myFG1)];
                    $("#ruleTheoryContainer").show()
                } else {
                    fHighlightFG()
                    fHighlightFG3D()
                }
                myText = " Δηλώνει το όνομα της δευτερεύουσας Χαρακτηριστικής Ομάδας."
            }

            break
        case 'compNumber2':
            nStyle = ""
            myClass = ''
            myText = " Δηλώνει τη θέση της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
            numberingFlag = true

            fHighlightFG(2)
            fHighlightFG3D(2)
            fShowNumbering(0)
            break;
        case ' compSecondSub2':
            nStyle = ""
            myClass = ''
            myText = " Δηλώνει το όνομα  της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας."
            numberingFlag = false
            fHighlightFG(2)
            fHighlightFG3D(2)
            break;
        case 'compBondPos':
            nStyle = ""
            myClass = ''
            switch (nameComponentsList[6]) {
                case 'έν':
                case 'εν':
                    myText = " Δηλώνει τη θέση του διπλού δεσμού."
                    ruleTableHighlight = 2
                    break
                case 'ίν':
                case 'ιν':
                    myText = " Δηλώνει τη θέση του τριπλού δεσμού."
                    ruleTableHighlight = 3
                    break
                default:
                    myText = " Δηλώνει τη θέση του Πολλαπλού Δεσμού."
            }
            fHighlightMultiBonds(1)
            fHighlightMultiBonds3D(1)
            numberingFlag = true
            fShowNumbering(0)
            $("#ruleTheoryContainer").show()
            break
        case 'compCarbonsCount':
            myText = 'Έχει ' + carbons + ' άτομα άνθρακα C'
            nStyle = ""
            myClass = ''
            ruleTableHighlight = carbons
            numberingFlag = true
            fShowNumbering()
            $("#ruleTheoryContainer").show()
            break;
        case 'compBondType':
            switch (nameComponentsList[6]) {
                case 'αν':
                case 'άν':
                    myText = 'μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα'
                    ruleTableHighlight = 1
                    break
                case 'εν':
                case 'έν':
                    myText = 'έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα'
                    ruleTableHighlight = 2
                    break
                case 'ίν':
                case 'ιν':
                    myText = 'έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα'
                    ruleTableHighlight = 3
                    break
                case 'διέν':
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
            numberingFlag = false
            if (nameComponentsList[6] === 'αν' || nameComponentsList[6] === 'άν') {
                fHighlightSingleBondsCC()
                fHighlightSingleBondsCC3D()
            } else {
                fHighlightMultiBonds(1)
                fHighlightMultiBonds3D(1)
            }
            $("#ruleTheoryContainer").show()
            break;
        case 'compBondType2':
            switch (nameComponentsList[8]) {
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
            numberingFlag = false
            fHighlightMultiBonds(2)
            fHighlightMultiBonds3D(2)
            $("#ruleTheoryContainer").show()
            break;
        case 'compEndNumber':
            nStyle = ""
            myClass = ''
            if (nameComponentsList[8].length === 0) {
                fHighlightFG()
                fHighlightFG3D()
                myText = " Δηλώνει τη θέση της  Χαρακτηριστικής Ομάδας."
            } else {
                myText = " Δηλώνει τη θέση του τριπλού δεσμού."
                fHighlightMultiBonds3D(2)
                fHighlightMultiBonds(2)
            }
            numberingFlag = true
            fShowNumbering(0)
            break
        case 'compSuffix':
            myText = 'Ανήκει στη χημική τάξη ' + molTaxonomy
            nStyle = ""
            myClass = ''

            switch (molTaxonomy) {
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
                case 'Καροξυλικά οξέα':
                    ruleTableHighlight = 5
                    // console.log(molTaxonomy)
                    break
                case 'Νιτρίλια':
                    ruleTableHighlight = 6
                    break
            }
            numberingFlag = false
            if (molTaxonomy != "Υδρογονάνθρακες") {
                if (Object.keys(functionalGroupObj).length > 1) {
                    fHighlightFG(2)
                    fHighlightFG3D(2)
                } else {
                    fHighlightFG()
                    fHighlightFG3D()
                }
            }
            $("#ruleTheoryContainer").show()
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

// ── fShowRule ─────────────────────────────────────────────────────────────

function fShowRule(theRule) {

    switch (theRule) {
        case 'compNumber1':
            if (Object.keys(functionalGroupObj).length > 1) {
                ruleText = namingRules.rule4
                ruleTable = namingRules.table4
                ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων"
            } else {
                ruleText = namingRules.rule2
                ruleTable = namingRules.table2
                ruleTitle = "Κανόνας συνθετικού τύπου δεσμών"
            }
            break;
        case ' compSecondSub1':
            ruleText = namingRules.rule4
            ruleTable = namingRules.table4
            ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων"
            break;
        case 'compCarbonsCount':
            ruleText = namingRules.rule1
            ruleTable = namingRules.table1
            ruleTitle = "Κανόνας συνθετικού ανθρακικής αλυσίδας"
            break;
        case 'compBondPos':
        case 'compBondType':
            ruleText = namingRules.rule2
            ruleTable = namingRules.table2
            ruleTitle = "Κανόνας συνθετικού τύπου δεσμών"
            break;
        case 'compSuffix':
            ruleText = namingRules.rule3
            ruleTable = namingRules.table3
            ruleTitle = "Κανόνας συνθετικού χημικής τάξης"
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

    if (Number.isInteger(ruleTableHighlight)) {
        $(".ruleRow:nth-of-type(" + (ruleTableHighlight + 1) + ")").addClass("selected")
    }
    if (Array.isArray(ruleTableHighlight)) {
        $("#ruleContainer .ruleText").addClass("hideTopRow")
        $(".ruleRow:nth-of-type(" + (ruleTableHighlight[0] + 1) + ")").addClass("selected selectedB")
        $(".ruleRow:nth-of-type(" + (ruleTableHighlight[1] + 1) + ")").addClass("selected selectedA")
    }
}

// ── fAdjustRuleContainerHeight ────────────────────────────────────────────

function fAdjustRuleContainerHeight() {
    ruleElement = document.querySelector('.ruleTable');
    if (!ruleFlag) {
        ruleElement.setAttribute("style", " max-height: none ");
    } else {
        myTop = document.querySelector('#ruleContainer .ruleTable').getBoundingClientRect().top;
        myBottom = document.querySelector('#molRepColumn').getBoundingClientRect().bottom;
        ruleContainerHeight = myBottom - myTop;
        ruleElement.setAttribute("style", " max-height:" + ruleContainerHeight + "px; overflow:auto; ");
    }

}

// ── fHighLightMainChain ───────────────────────────────────────────────────

function fHighLightMainChain() {
    if (nameAnalysisMode == 'none') { return }

    highAtoms = (mainChainMode === 'algorithmic' || !nameExamples[selectedMol]['mainChain' + modeSuffix])
        ? mainChainAtomsList
        : nameExamples[selectedMol]['mainChain' + modeSuffix]

    let highAtomsArg = ""
    for (let i = 0; i < highAtoms.length; i++) {
        highAtomsArg += highAtoms[i] + ",9"
        if (i < highAtoms.length - 1) { highAtomsArg += "," }
    }
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

    fUpdateSVG()

}

// ── fHighlightFG ──────────────────────────────────────────────────────────

function fHighlightFG(FGno) {
    // Algorithmic: reads functionalGroupObj computed by fDetectMolType.
    // No static nameExamples.functionalGroup* data used.
    if (nameAnalysisMode == 'none') { return }

    const fgKeys = Object.keys(functionalGroupObj)
        .filter(function (k) { return k !== 'hydrocarbon' })

    if (fgKeys.length === 0) { return }

    // Build flat [fgKey, heteroEl] instances — one per distinct element type per FG key.
    // This lets FGno index correctly across multi-element FG types (e.g. halogen: {Br, Cl}).
    let fgInstances = []
    for (let k = 0; k < fgKeys.length; k++) {
        const heteroEls = Object.keys(functionalGroupObj[fgKeys[k]])
        for (let e = 0; e < heteroEls.length; e++) {
            fgInstances.push([fgKeys[k], heteroEls[e]])
        }
    }
    // Sort: lower-priority FGs first, matching functionalGroupsList order (FGno=1 = first prefix).
    const fgPriorityOrder2D = ['carboxylicAcid', 'cyanide', 'aldehyde', 'ketone', 'alcohol', 'amine', 'nitro']
    const halogenOrder2D = Object.keys(nameMainCompObj3.halogen.substitute)
    fgInstances.sort(function (a, b) {
        if (a[0] === 'halogen' && b[0] === 'halogen') {
            return halogenOrder2D.indexOf(a[1]) - halogenOrder2D.indexOf(b[1])
        }
        return fgPriorityOrder2D.indexOf(b[0]) - fgPriorityOrder2D.indexOf(a[0])
    })

    let targetInstances = []
    if (FGno === undefined) {
        targetInstances = fgInstances
    } else {
        if (fgInstances[FGno - 1]) { targetInstances = [fgInstances[FGno - 1]] }
    }

    let highAtomsFG = []

    for (let t = 0; t < targetInstances.length; t++) {
        const fgKey = targetInstances[t][0]
        const heteroEl = targetInstances[t][1]
        const heteroList = functionalGroupObj[fgKey][heteroEl]  // 0-based atom indices

        for (let i = 0; i < heteroList.length; i++) {
            const entry = heteroList[i]
            if (Array.isArray(entry)) {
                // carboxylicAcid: entry = [oh_idx, co_idx] both 0-based
                const ohIdx = entry[0], coIdx = entry[1]
                if (mode2D === 'condensed') {
                    if (Array.isArray(atomConnectivityList[ohIdx])) {
                        const sharedC = atomConnectivityList[ohIdx][0]
                        if (!highAtomsFG.includes(sharedC + 1)) { highAtomsFG.push(sharedC + 1) }
                    }
                    continue
                }
                if (!highAtomsFG.includes(ohIdx + 1)) { highAtomsFG.push(ohIdx + 1) }
                if (!highAtomsFG.includes(coIdx + 1)) { highAtomsFG.push(coIdx + 1) }
                if (Array.isArray(atomConnectivityList[ohIdx])) {
                    const sharedC = atomConnectivityList[ohIdx][0]
                    if (!highAtomsFG.includes(sharedC + 1)) { highAtomsFG.push(sharedC + 1) }
                }
                // H on the -OH oxygen (present in expanded mode)
                for (let b = 0; b < bondList.length; b++) {
                    if (!bondList[b]) { continue }
                    const ba1 = bondList[b][0], ba2 = bondList[b][1]
                    let hIdx = -1
                    if (ba1 === ohIdx + 1 && allAtomsTypeList[ba2 - 1] === 'H') { hIdx = ba2 }
                    else if (ba2 === ohIdx + 1 && allAtomsTypeList[ba1 - 1] === 'H') { hIdx = ba1 }
                    if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) { highAtomsFG.push(hIdx) }
                }
            } else {
                const heteroIdx = entry  // 0-based
                if (fgKey === 'alcohol' || fgKey === 'amine') {
                    if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                    // highlight H atoms bonded to the heteroatom (present in expanded mode)
                    for (let b = 0; b < bondList.length; b++) {
                        if (!bondList[b]) { continue }
                        const ba1 = bondList[b][0], ba2 = bondList[b][1]
                        let hIdx = -1
                        if (ba1 === heteroIdx + 1 && allAtomsTypeList[ba2 - 1] === 'H') { hIdx = ba2 }
                        else if (ba2 === heteroIdx + 1 && allAtomsTypeList[ba1 - 1] === 'H') { hIdx = ba1 }
                        if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) { highAtomsFG.push(hIdx) }
                    }
                } else if (fgKey === 'aldehyde') {
                    // O + carbonyl C + aldehyde H on carbonyl C
                    if (Array.isArray(atomConnectivityList[heteroIdx]) && atomConnectivityList[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList[heteroIdx][0]  // 0-based
                        if (mode2D === 'condensed') {
                            if (!highAtomsFG.includes(carbonylC + 1)) { highAtomsFG.push(carbonylC + 1) }
                            continue
                        }
                        if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                        if (!highAtomsFG.includes(carbonylC + 1)) { highAtomsFG.push(carbonylC + 1) }
                        for (let b = 0; b < bondList.length; b++) {
                            if (!bondList[b]) { continue }
                            const ba1 = bondList[b][0], ba2 = bondList[b][1]
                            let hIdx = -1
                            if (ba1 === carbonylC + 1 && allAtomsTypeList[ba2 - 1] === 'H') { hIdx = ba2 }
                            else if (ba2 === carbonylC + 1 && allAtomsTypeList[ba1 - 1] === 'H') { hIdx = ba1 }
                            if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) { highAtomsFG.push(hIdx) }
                        }
                    }
                } else if (fgKey === 'ketone') {
                    // O + carbonyl C + C-neighbors of carbonyl C
                    if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                    if (Array.isArray(atomConnectivityList[heteroIdx]) && atomConnectivityList[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList[heteroIdx][0]  // 0-based
                        if (!highAtomsFG.includes(carbonylC + 1)) { highAtomsFG.push(carbonylC + 1) }
                        if (Array.isArray(atomConnectivityList[carbonylC])) {
                            for (let n = 0; n < atomConnectivityList[carbonylC].length; n++) {
                                const neighbor = atomConnectivityList[carbonylC][n]  // 0-based
                                if (allAtomsTypeList[neighbor] === 'C' && !highAtomsFG.includes(neighbor + 1)) {
                                    highAtomsFG.push(neighbor + 1)
                                }
                            }
                        }
                    }
                } else if (fgKey === 'halogen') {
                    // halogen atom only — no carbon neighbor
                    if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                } else if (fgKey === 'cyanide') {
                    if (Array.isArray(atomConnectivityList[heteroIdx]) && atomConnectivityList[heteroIdx].length > 0) {
                        const cyanideAnchorC = atomConnectivityList[heteroIdx][0]
                        if (mode2D === 'condensed') {
                            if (!highAtomsFG.includes(cyanideAnchorC + 1)) { highAtomsFG.push(cyanideAnchorC + 1) }
                            continue
                        }
                    }
                    if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                    if (Array.isArray(atomConnectivityList[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList[heteroIdx][n] + 1  // to 1-based
                            if (!highAtomsFG.includes(neighbor)) { highAtomsFG.push(neighbor) }
                        }
                    }
                } else if (fgKey === 'nitro') {
                    // N + bonded O atoms only, no carbon
                    if (mode2D === 'condensed') {
                        if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                        continue
                    }
                    if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                    if (Array.isArray(atomConnectivityList[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList[heteroIdx][n]  // 0-based
                            if (allAtomsTypeList[neighbor] === 'O' && !highAtomsFG.includes(neighbor + 1)) {
                                highAtomsFG.push(neighbor + 1)
                            }
                        }
                    }
                } else {
                    // cyanide, imine, ether, CCamine, etc.
                    if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                    if (Array.isArray(atomConnectivityList[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList[heteroIdx][n] + 1  // to 1-based
                            if (!highAtomsFG.includes(neighbor)) { highAtomsFG.push(neighbor) }
                        }
                    }
                }
            }
        }
    }

    if (highAtomsFG.length === 0) { return }

    let highAtomsFGArg = ""
    for (let i = 0; i < highAtomsFG.length; i++) {
        highAtomsFGArg += highAtomsFG[i] + ",9"
        if (i < highAtomsFG.length - 1) { highAtomsFGArg += "," }
    }
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg)

    // Derive highlighted bonds: any bond with both endpoints highlighted
    let highBondsFG = []
    for (let b = 0; b < bondList.length; b++) {
        if (!bondList[b]) { continue }
        if (highAtomsFG.includes(bondList[b][0]) && highAtomsFG.includes(bondList[b][1])) {
            highBondsFG.push(b + 1)
        }
    }

    if (highBondsFG.length === 0) {
        fUpdateSVG()
        return
    }

    let highBondsArg = ""
    for (let i = 0; i < highBondsFG.length; i++) {
        highBondsArg += highBondsFG[i] + ",9"
        if (i < highBondsFG.length - 1) { highBondsArg += "," }
    }
    jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg)
    fUpdateSVG()

}

// ── fHighlightFG3D ────────────────────────────────────────────────────────

function fHighlightFG3D(FGno) {
    // Build atom list from computed functionalGroupObj3D (SDF 1-based indices).
    // FGno undefined  → all FG atoms (for suffix / single-FG display)
    // FGno 1 or 2     → atoms for the Nth functional group (for prefix position display)

    const fgKeys = Object.keys(functionalGroupObj3D)
        .filter(function (k) { return k !== 'hydrocarbon' })

    let highAtoms3D = []

    if (fgKeys.length === 0) {
        // pure hydrocarbon — clear any existing highlight
        Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color atoms none; color bonds none;")
        return
    }

    // Build flat [fgKey, heteroEl] instances — one per distinct element type per FG key.
    let fgInstances = []
    for (let k = 0; k < fgKeys.length; k++) {
        const heteroEls = Object.keys(functionalGroupObj3D[fgKeys[k]])
        for (let e = 0; e < heteroEls.length; e++) {
            fgInstances.push([fgKeys[k], heteroEls[e]])
        }
    }
    // Sort: lower-priority FGs first, matching functionalGroupsList order (FGno=1 = first prefix).
    const fgPriorityOrder3D = ['carboxylicAcid', 'cyanide', 'aldehyde', 'ketone', 'alcohol', 'amine', 'nitro']
    const halogenOrder3D = Object.keys(nameMainCompObj3.halogen.substitute)
    fgInstances.sort(function (a, b) {
        if (a[0] === 'halogen' && b[0] === 'halogen') {
            return halogenOrder3D.indexOf(a[1]) - halogenOrder3D.indexOf(b[1])
        }
        return fgPriorityOrder3D.indexOf(b[0]) - fgPriorityOrder3D.indexOf(a[0])
    })

    let targetInstances = []
    if (FGno === undefined) {
        targetInstances = fgInstances
    } else {
        if (fgInstances[FGno - 1]) { targetInstances = [fgInstances[FGno - 1]] }
    }

    for (let t = 0; t < targetInstances.length; t++) {
        const fgKey = targetInstances[t][0]
        const heteroEl = targetInstances[t][1]
        const heteroList = functionalGroupObj3D[fgKey][heteroEl]  // array of 0-based indices

        for (let i = 0; i < heteroList.length; i++) {
            const entry = heteroList[i]
            if (Array.isArray(entry)) {
                // carboxylicAcid: [oh_idx, co_idx] both 0-based
                const ohIdx = entry[0], coIdx = entry[1]
                highAtoms3D.push(ohIdx + 1)  // to 1-based
                highAtoms3D.push(coIdx + 1)
                // also include the shared C
                if (Array.isArray(atomConnectivityList3D[ohIdx])) {
                    const sharedC = atomConnectivityList3D[ohIdx][0]
                    if (!highAtoms3D.includes(sharedC + 1)) { highAtoms3D.push(sharedC + 1) }
                }
                // H on the -OH oxygen
                for (let b = 0; b < bondList3D.length; b++) {
                    if (!bondList3D[b]) { continue }
                    const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1]
                    let hIdx = -1
                    if (ba1 === ohIdx + 1 && allAtomsTypeList3D[ba2 - 1] === 'H') { hIdx = ba2 }
                    else if (ba2 === ohIdx + 1 && allAtomsTypeList3D[ba1 - 1] === 'H') { hIdx = ba1 }
                    if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) { highAtoms3D.push(hIdx) }
                }
            } else {
                const heteroIdx = entry  // 0-based
                if (!highAtoms3D.includes(heteroIdx + 1)) { highAtoms3D.push(heteroIdx + 1) }
                if (fgKey === 'alcohol' || fgKey === 'amine') {
                    // highlight H atoms bonded to the heteroatom
                    for (let b = 0; b < bondList3D.length; b++) {
                        if (!bondList3D[b]) { continue }
                        const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1]
                        let hIdx = -1
                        if (ba1 === heteroIdx + 1 && allAtomsTypeList3D[ba2 - 1] === 'H') { hIdx = ba2 }
                        else if (ba2 === heteroIdx + 1 && allAtomsTypeList3D[ba1 - 1] === 'H') { hIdx = ba1 }
                        if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) { highAtoms3D.push(hIdx) }
                    }
                } else if (fgKey === 'aldehyde') {
                    // O + carbonyl C + aldehyde H on carbonyl C
                    if (Array.isArray(atomConnectivityList3D[heteroIdx]) && atomConnectivityList3D[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList3D[heteroIdx][0]  // 0-based
                        if (!highAtoms3D.includes(carbonylC + 1)) { highAtoms3D.push(carbonylC + 1) }
                        for (let b = 0; b < bondList3D.length; b++) {
                            if (!bondList3D[b]) { continue }
                            const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1]
                            let hIdx = -1
                            if (ba1 === carbonylC + 1 && allAtomsTypeList3D[ba2 - 1] === 'H') { hIdx = ba2 }
                            else if (ba2 === carbonylC + 1 && allAtomsTypeList3D[ba1 - 1] === 'H') { hIdx = ba1 }
                            if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) { highAtoms3D.push(hIdx) }
                        }
                    }
                } else if (fgKey === 'ketone') {
                    // O + carbonyl C + C-neighbors of carbonyl C
                    if (Array.isArray(atomConnectivityList3D[heteroIdx]) && atomConnectivityList3D[heteroIdx].length > 0) {
                        const carbonylC = atomConnectivityList3D[heteroIdx][0]  // 0-based
                        if (!highAtoms3D.includes(carbonylC + 1)) { highAtoms3D.push(carbonylC + 1) }
                        if (Array.isArray(atomConnectivityList3D[carbonylC])) {
                            for (let n = 0; n < atomConnectivityList3D[carbonylC].length; n++) {
                                const neighbor = atomConnectivityList3D[carbonylC][n]  // 0-based
                                if (allAtomsTypeList3D[neighbor] === 'C' && !highAtoms3D.includes(neighbor + 1)) {
                                    highAtoms3D.push(neighbor + 1)
                                }
                            }
                        }
                    }
                } else if (fgKey === 'halogen') {
                    // halogen atom only — no carbon neighbor
                } else if (fgKey === 'nitro') {
                    // N + bonded O atoms only, no carbon
                    if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList3D[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList3D[heteroIdx][n]  // 0-based
                            if (allAtomsTypeList3D[neighbor] === 'O' && !highAtoms3D.includes(neighbor + 1)) {
                                highAtoms3D.push(neighbor + 1)
                            }
                        }
                    }
                } else {
                    // cyanide, imine, ether, CCamine, etc.
                    if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
                        for (let n = 0; n < atomConnectivityList3D[heteroIdx].length; n++) {
                            const neighbor = atomConnectivityList3D[heteroIdx][n] + 1
                            if (!highAtoms3D.includes(neighbor)) { highAtoms3D.push(neighbor) }
                        }
                    }
                }
            }
        }
    }

    if (highAtoms3D.length === 0) {
        Jmol.script(jmolAppletNomeclature, "select all; selectionHalos off; color atoms none; color bonds none;")
        return
    }

    let highAtoms3DArg = "select"
    for (let i = 0; i < highAtoms3D.length; i++) {
        highAtoms3DArg += " atomno=" + highAtoms3D[i]
        if (i < highAtoms3D.length - 1) { highAtoms3DArg += "," }
    }

    Jmol.script(jmolAppletNomeclature, highAtoms3DArg + ";color selectionHalos[X79dc6d]; selectionHalos on; color bonds [X79dc6d]; color atoms [X79dc6d];")
    JmolSelection = highAtoms3DArg
}

// ── fShowNumbering ────────────────────────────────────────────────────────

function fShowNumbering(time) {

    if (!numberingFlag) { return }
    clearInterval(myNumberingTimeout)
    numbersSVGElements = []

    molSnap = Snap("#jsmeNomeclatureSVG svg");
    switch (mode2D) {
        case 'condensed':
            highAtoms = (mainChainMode === 'algorithmic' || !nameExamples[selectedMol]['mainChain'])
                ? mainChainAtomsList
                : nameExamples[selectedMol]['mainChain']
            highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(function (atomNo) { return allAtomsTypeList[atomNo - 1] === 'C' })
            const condensedAtomTextMap = fGetRenderedAtomTextMap()
            numberOffset = [20, -280]
            for (let i = 0; i < highAtoms.length; i++) {
                currAtomTextElement = condensedAtomTextMap[highAtoms[i] - 1]
                if (!currAtomTextElement) { continue }
                const compactLabelKey = compactNumberingLabelMap[highAtoms[i] - 1]
                x = compactLabelKey
                    ? fGetCompactLabelNumberX(currAtomTextElement, compactLabelKey, numberOffset[0])
                    : parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                r = 220
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                numbersSVGElements[i] = numberString
            }
            break
        case 'condensedZigZag':
            highAtoms = (mainChainMode === 'algorithmic' || !nameExamples[selectedMol]['mainChain'])
                ? mainChainAtomsList
                : nameExamples[selectedMol]['mainChain']
            highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(function (atomNo) { return allAtomsTypeList[atomNo - 1] === 'C' })
            const condensedZigZagAtomTextMap = fGetRenderedAtomTextMap()
            numberOffset = [20, -280]
            for (let i = 0; i < highAtoms.length; i++) {
                currAtomTextElement = condensedZigZagAtomTextMap[highAtoms[i] - 1]
                if (!currAtomTextElement) { continue }
                x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                r = 220
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                numbersSVGElements[i] = numberString
            }
            break
        case 'expanded':
            highAtoms = (mainChainMode === 'algorithmic' || !nameExamples[selectedMol]['mainChain_E'])
                ? mainChainAtomsList
                : nameExamples[selectedMol]['mainChain_E']
            highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(function (atomNo) { return allAtomsTypeList[atomNo - 1] === 'C' })
            const expandedAtomTextMap = fGetRenderedAtomTextMap(false, true)
            numberOffset = [-120, -280]
            for (let i = 0; i < highAtoms.length; i++) {
                currAtomTextElement = expandedAtomTextMap[highAtoms[i] - 1]
                if (!currAtomTextElement) { continue }
                x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                r = 220
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                numbersSVGElements[i] = numberString
            }
            break

        case 'diagramatic':
            highAtoms = (mainChainMode === 'algorithmic' || !nameExamples[selectedMol]['mainChain_diagr'])
                ? mainChainAtomsList
                : nameExamples[selectedMol]['mainChain_diagr']
            highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(function (atomNo) { return allAtomsTypeList[atomNo - 1] === 'C' })
            numberOffset = [-50, -180]
            for (let i = 0; i < highAtoms.length; i++) {
                for (b = 0; b < bondList.length; b++) {
                    if (highAtoms[i] == bondList[b][0]) {

                        currAtomTextElement = molSnap.select("line:nth-of-type(" + svgBondList[b] + ")");
                        x = parseInt(currAtomTextElement.attr('x1')) + numberOffset[0]
                        y = parseInt(currAtomTextElement.attr('y1')) + + numberOffset[1]

                        break;
                    } else {
                        if (highAtoms[i] == bondList[b][1]) {

                            currAtomTextElement = molSnap.select("line:nth-of-type(" + svgBondList[b] + ")");
                            x = parseInt(currAtomTextElement.attr('x2')) + numberOffset[0]
                            y = parseInt(currAtomTextElement.attr('y2')) + + numberOffset[1]

                        }
                    }
                }

                r = 220
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                numbersSVGElements[i] = numberString
            }
            break
    }

    if (time === undefined) {
        time = 400
        myNumberingTimeout = setInterval(fShowNumber, time);
    } else if (time == 0) {
        for (let i = 0; i < numbersSVGElements.length; i++) {
            fShowNumber()
        }

    }
}

// ── fShowNumber ───────────────────────────────────────────────────────────

function fShowNumber() {

    fShowNumber3D(currNumberEl)
    numberElement = Snap.parse(numbersSVGElements[currNumberEl])
    molSnap.select("g").append(numberElement)
    currNumberEl += 1

    if (currNumberEl > numbersSVGElements.length) {
        currNumberEl = 0
        clearInterval(myNumberingTimeout)
    }

}

// ── fShowNumbering3D ──────────────────────────────────────────────────────

function fShowNumbering3D() {

    if (mainChainMode !== 'algorithmic') {
        mainChainAtoms3D = nameExamples[selectedMol].mainChain3D
    }
    // algorithmic mode: mainChainAtoms3D already set by fCalcMainChain3D()

    for (i = 0; i < mainChainAtoms3D.length; i++) {
        fShowNumber3D(i)
    }

}

// ── removeEcho3D ──────────────────────────────────────────────────────────

function removeEcho3D() {
    Jmol.script(jmolAppletNomeclature, " set echo  off;");
}

// ── fShowNumber3D ─────────────────────────────────────────────────────────

function fShowNumber3D(n) {

    myAtom = mainChainMode === 'algorithmic'
        ? mainChainAtoms3D[n]
        : nameExamples[selectedMol].mainChain3D[n]

    if (typeof myAtom === "undefined" || myAtom === null) {
        return;
    }

    let id = "theGroupEcho" + (n + 1)
    let atom = "{atomno = " + myAtom + "}"
    let num = (n + 1)
    let d = 0.01  // stroke thickness in Å (tune this)

    // Shadow echoes in 4 directions (black stroke)
    let s = ""
    s += " set echo " + id + " " + atom + "; set echo offset {-1.1 1.1 3}; font echo 42 sansSerif bold; color echo[x193f8f]; echo " + num + ";"

    s += " set echo " + id + "s1 " + atom + "; set echo offset {" + (-1.1 + d) + " " + (1.1 - d) + " 3}; font echo 42 sansSerif bold; color echo black; echo " + num + ";"

    Jmol.script(jmolAppletNomeclature, s)
}

// ── fHighlightMultiBonds ──────────────────────────────────────────────────

function fHighlightMultiBonds(bondCompPos) {

    if (nameAnalysisMode == 'none') { return }
    if (multiBondListCC.length == 0) { return }

    let highAtomsArg = ""
    let highBondsArg = ""
    if (bondCompPos == 1) {  // one type of multiple bond
        if (multiBondsObj.CCd.length > 0) {
            bondType = 2 // double bond     
        } else {
            bondType = 3 // triple bond
        }

        for (let i = 0; i < multiBondListCC.length; i++) {
            bondID = multiBondListCC[i]
            if (bondList[bondID - 1][2] !== bondType) { continue } // skip if not the  bond type
            highBondsArg += multiBondListCC[i] + ",9"
            if (i < multiBondListCC.length - 1) { highBondsArg += "," }

            highAtomsArg += bondList[multiBondListCC[i] - 1][0] + ",9," + bondList[multiBondListCC[i] - 1][1] + ",9"
            if (i < multiBondListCC.length - 1) { highAtomsArg += "," }
        }
    } else if (bondCompPos == 2) { // two types of multiple bonds -- highlight triple bonds
        for (let i = 0; i < multiBondListCC.length; i++) {
            bondID = multiBondListCC[i]
            if (bondList[bondID - 1][2] !== 3) { continue } // skip if not triple bond
            highBondsArg += multiBondListCC[i] + ",9"
            if (i < multiBondListCC.length - 1) { highBondsArg += "," }

            highAtomsArg += bondList[multiBondListCC[i] - 1][0] + ",9," + bondList[multiBondListCC[i] - 1][1] + ",9"
            if (i < multiBondListCC.length - 1) { highAtomsArg += "," }
        }

    }

    // console.log('highBondsArg', highBondsArg, highAtomsArg)
    jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

    fUpdateSVG()

}

// ── fHighlightMultiBonds3D ────────────────────────────────────────────────

function fHighlightMultiBonds3D(bondCompPos) {
    // Uses SDF-derived *3D globals directly — no 2D-position-3D mapping needed.

    if (multiBondListCC3D.length === 0) { return }

    let bondType
    if (bondCompPos === 1) {
        bondType = multiBondsObj3D.CCd.length > 0 ? 2 : 3
    } else {
        bondType = 3  // bondCompPos 2 always targets triple bonds
    }

    const highBonds3D = []
    for (let i = 0; i < multiBondListCC3D.length; i++) {
        const bondID = multiBondListCC3D[i]
        if (bondList3D[bondID - 1][2] !== bondType) { continue }
        const atom1 = bondList3D[bondID - 1][0]  // already SDF 1-based
        const atom2 = bondList3D[bondID - 1][1]
        highBonds3D.push([atom1, atom2])
    }

    if (highBonds3D.length === 0) { return }

    let highAtoms3DArg = "select"
    for (let i = 0; i < highBonds3D.length; i++) {
        highAtoms3DArg += " atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1]
        if (i < highBonds3D.length - 1) { highAtoms3DArg += "," }
        Jmol.script(jmolAppletNomeclature, "select atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1] + "; color bond [X79dc6d];")
    }

    Jmol.script(jmolAppletNomeclature, highAtoms3DArg + "; color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];")

    // Single bonds bridging two highlighted atoms inherit green from atom colors.
    // Reset them to CPK.
    const highAtomSet = new Set()
    for (let i = 0; i < highBonds3D.length; i++) {
        highAtomSet.add(highBonds3D[i][0])
        highAtomSet.add(highBonds3D[i][1])
    }
    for (let b = 0; b < bondList3D.length; b++) {
        if (!bondList3D[b]) { continue }
        const ba1 = bondList3D[b][0], ba2 = bondList3D[b][1], bOrder = bondList3D[b][2]
        if (bOrder === 1 && highAtomSet.has(ba1) && highAtomSet.has(ba2)) {
            Jmol.script(jmolAppletNomeclature, "select atomno=" + ba1 + ", atomno=" + ba2 + "; color bond cpk;")
        }
    }

    JmolSelection = highAtoms3DArg
}

// ── fHighlightSingleBondsCC ───────────────────────────────────────────────

function fHighlightSingleBondsCC() {
    if (nameAnalysisMode === 'none') { return }

    let highAtomsArg = ''
    let highBondsArg = ''
    const bondArgs = []
    const atomArgs = []
    for (let i = 0; i < bondList.length; i++) {
        const bOrder = bondList[i][2]
        if (bOrder !== 1) { continue }
        const a1 = bondList[i][0]   // 1-based
        const a2 = bondList[i][1]   // 1-based
        if (allAtomsTypeList[a1 - 1] !== 'C' || allAtomsTypeList[a2 - 1] !== 'C') { continue }
        bondArgs.push((i + 1) + ',9')
        atomArgs.push(a1 + ',9,' + a2 + ',9')
    }
    if (bondArgs.length === 0) { return }
    highBondsArg = bondArgs.join(',')
    highAtomsArg = atomArgs.join(',')

    jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg)
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg)
    fUpdateSVG()
}

// ── fHighlightSingleBondsCC3D ─────────────────────────────────────────────

function fHighlightSingleBondsCC3D() {
    if (!bondList3D || bondList3D.length === 0) { return }

    const highBonds3D = []
    for (let i = 0; i < bondList3D.length; i++) {
        if (!bondList3D[i]) { continue }
        const bOrder = bondList3D[i][2]
        if (bOrder !== 1) { continue }
        const a1 = bondList3D[i][0]   // SDF 1-based
        const a2 = bondList3D[i][1]
        if (allAtomsTypeList3D[a1 - 1] !== 'C' || allAtomsTypeList3D[a2 - 1] !== 'C') { continue }
        highBonds3D.push([a1, a2])
    }
    if (highBonds3D.length === 0) { return }

    let highAtoms3DArg = 'select'
    for (let i = 0; i < highBonds3D.length; i++) {
        highAtoms3DArg += ' atomno=' + highBonds3D[i][0] + ', atomno=' + highBonds3D[i][1]
        if (i < highBonds3D.length - 1) { highAtoms3DArg += ',' }
        Jmol.script(jmolAppletNomeclature, 'select atomno=' + highBonds3D[i][0] + ', atomno=' + highBonds3D[i][1] + '; color bond [X79dc6d];')
    }
    Jmol.script(jmolAppletNomeclature, highAtoms3DArg + '; color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];')

    JmolSelection = highAtoms3DArg
}

// ── fSetMolVis3D ──────────────────────────────────────────────────────────

function fSetMolVis3D(theVisModel) {
    if (theVisModel === undefined) {
        theVisModel = vis3D
    }

    switch (theVisModel) {
        case 'ballnstick':
            mySpt = ' select all and not _Xx;  spacefill 24%; wireframe 0.13;set labelFront off;' + JmolSelection
            break
        case 'spacefill':
            mySpt = ' select all and not _Xx;  spacefill 70%; wireframe off;set labelFront off;' + JmolSelection
            break
        case 'sticks':
            mySpt = ' select all and not _Xx;  spacefill off; wireframe 0.2;  set labelFront on;' + JmolSelection
            break
    }
    Jmol.script(jmolAppletNomeclature, mySpt);

}

// ── fResizeViewers ────────────────────────────────────────────────────────
function fResizeViewers() {
    const container = document.getElementById('nomeclature3D')
    if (!container) return
    const w = container.clientWidth

    // On small landscape screens (phone landscape, vh < 430px) cap each viewer
    // at 30% of the viewport height so both fit without overflowing the screen.
    const maxViewerH = window.innerHeight < 430
        ? Math.floor(window.innerHeight * 0.30)
        : Infinity

    const h = Math.min(Math.round(w * 220 / 480), maxViewerH)
    if (typeof jmolAppletNomeclature !== 'undefined') {
        Jmol.resizeApplet(jmolAppletNomeclature, { width: w, height: h })
    }
    const svg = document.getElementById('jsmeNomeclatureSVG')
    if (svg) {
        const svgH = Math.min(Math.round(w * 200 / 450), maxViewerH)
        svg.style.width = w + 'px'
        svg.style.height = svgH + 'px'
        if (typeof jsmeNomeclatureApplet !== 'undefined' && jsmeNomeclatureApplet.setSize) {
            jsmeNomeclatureApplet.setSize(w, svgH)
        }
    }
}

// let _resizeTimer
// window.addEventListener('resize', function () {
//     clearTimeout(_resizeTimer)
//     _resizeTimer = setTimeout(fResizeViewers, 150)
// })

// var _jmol_isReady_orig = (typeof jmol_isReady === 'function') ? jmol_isReady : null
// jmol_isReady = function (applet) {
//     if (_jmol_isReady_orig) _jmol_isReady_orig(applet)
//     setTimeout(fResizeViewers, 300)
// }

