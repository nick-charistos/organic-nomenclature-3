// nom-molview-35.js
// Molecule viewer layer — JSME (2D), JSmol (3D), Snap.svg, jQuery.
// Reads analysis results from nom-core-35.js globals.
// Provides all display, highlighting, naming-panel, and save functions.

// ── Viewer / display globals ──────────────────────────────────────────────
let selectedMol
let jsmeNomeclatureApplet
let atomSymbols3DFlag = true
let rotateFlag = false
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
let narrateAnalysisFlag = false

// ── SVG icon constants ────────────────────────────────────────────────────
const svgSpeaker = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/></svg>"
const svgMute   = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73l-1.27-1.27L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/></svg>"
const svgStop   = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M6 6h12v12H6z'/></svg>"
const svgPlay   = "<svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor' style='vertical-align:middle'><path d='M8 5v14l11-7z'/></svg>"

// ── jsmeOnLoad ────────────────────────────────────────────────────────────

function jsmeOnLoad() {
    jsmeNomeclatureApplet = new JSApplet.JSME("jsmeNomeclature", "450px", "200px", {
        'options': "nozoom,depict,marker",
        'depictbg': '#fff',
        'atombgsize': '0.6',
    });
    jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9)
    jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6)

    let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#79dc6d", "#ff8566", "#66ff66", "#93bfff"];
    jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

    carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms())
}

// ── fInitData ─────────────────────────────────────────────────────────────

function fInitData() {
    for (let prop in nameExamples) {

        my2D = eval(prop + "_2D");
        my2D_E = eval(prop + "_2D_E");
        try { my2D_D = eval(prop + "_diagr2D"); } catch(e) { my2D_D = null; }

        nameExamples[prop].structure2D = my2D
        nameExamples[prop].structure2D_E = my2D_E
        nameExamples[prop].structure2D_D = my2D_D

        my3D = "mols/nomeclature-moc2/" + prop + "_3D.sdf"
        nameExamples[prop].file3D = my3D
    }

}

// ── fUpdateDiagr2DButton ──────────────────────────────────────────────────

function fUpdateDiagr2DButton() {
    const $diagrBtn = $("#radio2DMode .radioCheckContainer").eq(2);
    const hasDiagr2D = selectedMol && !!nameExamples[selectedMol]?.structure2D_D;
    if (hasDiagr2D) {
        $diagrBtn.show();
    } else {
        $diagrBtn.hide();
        if (mode2D === 'diagramatic') {
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
    fLoadMol2D()
    fLoadMol3D()
    fFetchAndParse3D()

    showAtomSymbols3D();
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
    fUpdateSVG()

    $("#molName").html("")
    $("#nameAnalysis").html("")
    fUpdateDiagr2DButton()

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
        return
    }

    switch (mode2D) {
        case 'condensed':
            myMol2D = selectedExample.structure2D
            break;
        case 'expanded':
            myMol2D = selectedExample.structure2D_E
            break;
        case 'diagramatic':
            myMol2D = selectedExample.structure2D_D
            break;
        default:
            myMol2D = selectedExample.structure2D
    }

    if (!myMol2D) { jsmeNomeclatureApplet.clear() }

    jsmeNomeclatureApplet.readMolFile(myMol2D);
    jsmeNomeclatureApplet.setMolecularAreaScale(2.4)

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

// ── fUpdateSVG ────────────────────────────────────────────────────────────

function fUpdateSVG() {

    if (!jsmeNomeclatureApplet) return
    let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString()
    $("#jsmeNomeclatureSVG").html(mySVG);
    if (mode2D == 'condensed') {
        fAddHydrogens2SVG()
    }
    molSnap = Snap("#jsmeNomeclatureSVG svg")
    snapLogo = molSnap.select('polygon:last-of-type')
    snapLogo.remove()

}

// ── patchtheNitrogen ──────────────────────────────────────────────────────

function patchtheNitrogen() {
    ////// NH2 special case PATCH //////    
    if (functionalGroupObj.hasOwnProperty("amine")) {
        molSnap.selectAll('text').forEach(function (el) {
            var txt = el.attr('text') || '';
            if (String(txt).trim() === '2') {
                el.attr({ text: 'NH2' });
            }
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
    Jmol.script(jmolAppletNomeclature, "frank off;load " + myMol3D + ";  select all; center selected;" + selectedExample.moveto + "; script spt/init-3.spt;");
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
            console.log('[3D parsed]', mol, 'FG:', Object.keys(functionalGroupObj3D), 'CCd bonds:', multiBondsObj3D.CCd)
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
        console.log(svgData)
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
    nameCompContainer = "<div class='panelTitle'>Επεξήγηση ονομασίας<button id='narrateAnalysisToggle' class='narrateBtn' data-tooltip='" + toggleTitle + "'>" + toggleIcon + "</button></div>" +
        "<div class='HFlex' style='justify-content:center;'><div class='nameCompContainer'>"

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
            const _isGkConsonant = ch => /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) && !new Set(['α','ε','η','ι','ο','υ','ω','ά','έ','ή','ί','ό','ύ','ώ']).has(ch);
            if (_isGkConsonant(lastCh) && _isGkConsonant(firstCh)) {
                const connector = ((lastCh === 'π' || lastCh === 'τ') && firstCh === 'δ') ? 'α' : 'ο';
                displayComp = currComp + "<span class='euphonyLetter'>" + connector + "</span>"
            }
            break
        }

        compBox = "<div class='nameCompBox' " + "id='comp" + i + "' >" + displayComp + "</div>"
        if (i < compCount - 1) {
            compBox += "<div class='nameCompPlus' > + </div>"
        }
        nameCompContainer += compBox
    }

    nameCompContainer += "</div><button id='readNameBtn' class='readNameBtn' data-tooltip='Ανάγνωση ονόματος'" + playDisabled + ">" + svgPlay + "</button></div>"

    $("#nameAnalysis").html(nameCompContainer)
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
    console.log(nameAnalysisMode)
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
            fHighlightMultiBonds(1)
            fHighlightMultiBonds3D(1)
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
                    console.log(molTaxonomy)
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

    highAtoms = nameExamples[selectedMol]['mainChain' + modeSuffix]

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
                if (!highAtomsFG.includes(heteroIdx + 1)) { highAtomsFG.push(heteroIdx + 1) }
                if (fgKey === 'alcohol' || fgKey === 'amine') {
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
                } else if (fgKey === 'nitro') {
                    // N + bonded O atoms only, no carbon
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
        patchtheNitrogen()
        return
    }

    let highBondsArg = ""
    for (let i = 0; i < highBondsFG.length; i++) {
        highBondsArg += highBondsFG[i] + ",9"
        if (i < highBondsFG.length - 1) { highBondsArg += "," }
    }
    jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg)
    fUpdateSVG()
    patchtheNitrogen()

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
            highAtoms = nameExamples[selectedMol]['mainChain']
            numberOffset = [20, -280]
            for (let i = 0; i < highAtoms.length; i++) {
                currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
                x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                r = 220
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                numbersSVGElements[i] = numberString
            }
            break
        case 'expanded':
            highAtoms = nameExamples[selectedMol]['mainChain_E']
            numberOffset = [-120, -280]
            for (let i = 0; i < highAtoms.length; i++) {
                currAtomTextElement = molSnap.select("text:nth-of-type(" + (highAtoms[i]) + ")");
                x = parseInt(currAtomTextElement.attr('x')) + numberOffset[0]
                y = parseInt(currAtomTextElement.attr('y')) + + numberOffset[1]
                r = 220
                numberString = "  <text id='number" + i + "' x='" + x + "' y='" + y + "' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>" + (i + 1) + "</text> "
                numbersSVGElements[i] = numberString
            }
            break

        case 'diagramatic':
            highAtoms = nameExamples[selectedMol]['mainChain_diagr']
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

    mainChainAtoms3D = nameExamples[selectedMol].mainChain3D

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

    myAtom = nameExamples[selectedMol].mainChain3D[n]

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

    console.log('highBondsArg', highBondsArg, highAtomsArg)
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

let _resizeTimer
window.addEventListener('resize', function () {
    clearTimeout(_resizeTimer)
    _resizeTimer = setTimeout(fResizeViewers, 150)
})

var _jmol_isReady_orig = (typeof jmol_isReady === 'function') ? jmol_isReady : null
jmol_isReady = function (applet) {
    if (_jmol_isReady_orig) _jmol_isReady_orig(applet)
    setTimeout(fResizeViewers, 300)
}

