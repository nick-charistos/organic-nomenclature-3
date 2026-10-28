// mulermoc-nom-molview-52.js
// Molecule viewer layer — JSME (2D), JSmol (3D), native SVG DOM, jQuery.
// Reads analysis results from mulermoc-nom-core-52.js globals.
// Provides all display, highlighting, naming-panel, and save functions.

// ── Viewer / display globals ──────────────────────────────────────────────
let selectedMol;
let jsmeNomeclatureApplet;
let jsmeNomeclatureAppletORGNL;
let atomSymbols3DFlag = true;
let hydrogens3DFlag = true;
let rotateFlag = false;
let svgAtomColors2DFlag = false;
let atomColorMode2D = "atom";
let mode2D = "condensed";
let modeSuffix = "_2D_Condensed";
// 2D zoom state: JSME molecular-area scale. Default 2.0 = the long-standing
// hardcoded load value, so behavior is identical until the user zooms.
// fInitProps resets it on every molecule load (mode switches keep zoom);
// fLoadMol2D re-applies it on every load. Scenario steps capture it in
// style2D.zoom (legacy default 2.0) and re-assert it after the step load.
const MOL_ZOOM_DEFAULT = 2.0;
const MOL_ZOOM_MIN = 0.5;
const MOL_ZOOM_MAX = 6.0;
let molZoom2D = MOL_ZOOM_DEFAULT;
// Single-viewer max-height (v48): null = Auto (cap at the both-visible
// height, so toggling one viewer off never resizes the survivor); a number is
// an absolute px cap. Applied only when exactly one viewer is visible, in
// fViewerHeights2D3D. Set by the Ρυθμίσεις control and per scenario step
// (show.viewerMaxHeight); scenario owns persistence, this is the live value.
let viewerMaxH = null;
// Double-viewer height (v48): null = Auto (the equal split both viewers get
// today); a number is the COMBINED 2D+3D height when two viewers are visible —
// each viewer takes half. Applied only when exactly two viewers are visible,
// in fViewerHeights2D3D. Set by the Ρυθμίσεις control and per scenario step
// (show.viewerBothHeight); scenario owns persistence, this is the live value.
let viewerBothH = null;
// Manual double-viewer slider bounds (v48): the combined 2D+3D height is a
// fixed 300–1000px range regardless of the live single-viewer ceiling.
const VIEWER_BOTH_MIN = 300;
const VIEWER_BOTH_MAX = 1000;
// Manual single-viewer slider bounds (v52): a fixed 150–1000px range. The old
// screen-derived ceiling (live full height, taller on tall displays) is gone
// — predictable authoring on any screen; taller needs the "full" sentinel,
// which resolves live per playback screen instead of storing px.
const VIEWER_SINGLE_MAX = 1000;
// Sanity ceiling for stored single-viewer heights (show.viewerMaxHeight): the
// live slider ceiling is screen-derived and can exceed 1000 on tall displays,
// so scenario validation must not silently rewrite those values. Values applied
// live are still clamped to the real single-viewer share (fViewerHeights2D3D).
const VIEWER_MAX_H = 2000;
// Shared viewer min-height floor (v48): a single 150px minimum for BOTH
// viewers, so a long present note card can never squash them to an unusable
// size (the page scrolls instead). Mirrored by the CSS min-heights
// (.JmolContainer / #jsmeNomeclatureSVG) via the `--viewerMinH` custom
// property, which is set from this constant just below so the two can never
// drift; the CSS value is only a no-JS fallback.
const VIEWER_MIN_H = 150;
try {
  document.documentElement.style.setProperty("--viewerMinH", VIEWER_MIN_H + "px");
} catch (eMinH) { /* CSS custom property unavailable */ }
// B2 owned-shared viewer state: current MOL strings (fDeselectMol/fLoadMol2D).
let myMol2D = null;
let myMol3D = null;
let molSvg;

// ── MuSVG: minimal native SVG DOM helper (replaces the former SVG library) ──
const MuSVG = (function () {
  const SVG_NS = "http://www.w3.org/2000/svg";

  class SvgElement {
    constructor(node) {
      this.node = node;
    }

    select(selector) {
      return wrap(this.node.querySelector(selector));
    }

    selectAll(selector) {
      return Array.prototype.map.call(
        this.node.querySelectorAll(selector),
        function (node) { return wrap(node); },
      );
    }

    attr(name, value) {
      if (name && typeof name === "object") {
        for (const key in name) {
          this.attr(key, name[key]);
        }
        return this;
      }
      if (arguments.length > 1) {
        if (name === "text") {
          this.node.textContent = value;
        } else {
          this.node.setAttribute(name, value);
        }
        return this;
      }
      if (name === "text") {
        return this.node.textContent;
      }
      return this.node.getAttribute(name);
    }

    remove() {
      if (this.node && this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
      return this;
    }

    append(child) {
      const node = child && child.node ? child.node : child;
      if (node) {
        this.node.appendChild(node);
      }
      return this;
    }

    toString() {
      if (this.node.nodeType === 1) {
        return this.node.outerHTML;
      }
      if (this.node.childNodes) {
        return Array.prototype.map.call(
          this.node.childNodes,
          function (node) {
            return node.nodeType === 1 ? node.outerHTML : (node.textContent || "");
          },
        ).join("");
      }
      return String(this.node);
    }
  }

  function wrap(node) {
    return node ? new SvgElement(node) : null;
  }

  function MuSVG(target) {
    if (typeof target === "string") {
      return wrap(document.querySelector(target));
    }
    return wrap(target);
  }

  MuSVG.parse = function (markup) {
    if (!markup) {
      return null;
    }
    try {
      const doc = new DOMParser().parseFromString(
        '<svg xmlns="' + SVG_NS + '">' + markup + "</svg>",
        "text/html",
      );
      const svg = doc.querySelector("svg");
      if (!svg) {
        return null;
      }
      const fragment = document.createDocumentFragment();
      while (svg.firstChild) {
        fragment.appendChild(document.adoptNode(svg.firstChild));
      }
      return wrap(fragment);
    } catch (e) {
      return null;
    }
  };

  return MuSVG;
})();

let highAtoms;
let nameAnalysisMode;
let myNumberingTimeout;
let numberingFlag = false;
let numbersSVGElements = [];
let currNumberEl = 0;
let namingRules; // owned-shared: assigned once by teaching fInitTheory, read by fShowRule
let ruleFlag = false;
let ruleTableHighlight = null;
let ruleTableFlag = false;
let vis3D = "ballnstick";
let JmolSelection = "select none";
let selectedRule;
let nameSettingsFlag = true;
let narrateAnalysisFlag = false;
if (typeof window.nameBoxFlag === "undefined") window.nameBoxFlag = true;
if (typeof window.nameCrossFlag === "undefined") window.nameCrossFlag = false;
// Single source: all code reads/writes window.* directly (no local aliases,
// which desynced after toggles since primitives copy by value)
// Per-component name visibility (eye toggles): window.nameHiddenComps holds
// the hidden comp ids (e.g. ["comp5"]); window.nameEyeEdit is the live-only
// authoring edit mode (never stored in steps).
if (typeof window.nameHiddenComps === "undefined") window.nameHiddenComps = [];
if (typeof window.nameEyeEdit === "undefined") window.nameEyeEdit = false;
let mainChainMode = "algorithmic"; // 'data' | 'algorithmic'
let etherNamingMode = "iupac"; // 'iupac' | 'common' — ether naming variant toggle
let compactNumberingLabelMap = {};
const compactReverseOffsetScale = {
  HOOC: 0.8,
  OHC: 0.8,
};
const compactForwardOffsetScale = {
  HCOOH: 0.55,
  HCHO: 0.55,
};
const compactLabelWidths = {
  COOH: 900,
  HOOC: 900,
  HCOOH: 1000,
  HCHO: 850,
  CHO: 650,
  OHC: 650,
  CN: 520,
  NC: 520,
  NO2: 760,
  O2N: 760,
};

const compactRectRightEdgeAdjust = {
  OHC: 34,
};

const atomColors2D = {
  Cl: "#10e510",
  Br: "#a62929",
  S: "#FFC832",
  O: "#FF0D0D",
  N: "#3050F8",
  H: "#909090",
  C: "#222222",
};

// ── SVG icon aliases (single source: js/ui-icons.js) ────────────────────────
// ui-icons.js loads first (see mulermoc-nom-46.html); these lexical aliases
// keep every use site below unchanged. Guarded so a missing icon file degrades
// to empty buttons instead of breaking the module. Note: `playSm` is the
// 22-viewBox narration triangle, distinct from the 512-viewBox scenario `play`.
const svgSettings = (window.MuLERIcons && window.MuLERIcons.settings) || "";
const svgSpeaker = (window.MuLERIcons && window.MuLERIcons.speaker) || "";
const svgMute = (window.MuLERIcons && window.MuLERIcons.mute) || "";
const svgStop = (window.MuLERIcons && window.MuLERIcons.stop) || "";
const svgPlay = (window.MuLERIcons && window.MuLERIcons.playSm) || "";
const svgAudioDesc = (window.MuLERIcons && window.MuLERIcons.audioDescription) || "";
const svgNameBox = (window.MuLERIcons && window.MuLERIcons.nameBox) || "";
const svgNameBoxOff = (window.MuLERIcons && window.MuLERIcons.nameBoxOff) || "";
const svgNameCross = (window.MuLERIcons && window.MuLERIcons.nameCross) || "";
const svgNameCrossOff = (window.MuLERIcons && window.MuLERIcons.nameCrossOff) || "";
const svgEye = (window.MuLERIcons && window.MuLERIcons.eye) || "";
const svgEyeOff = (window.MuLERIcons && window.MuLERIcons.eyeOff) || "";
const svgEyeState = (window.MuLERIcons && window.MuLERIcons.eyeState) || "";

// Per-component name visibility helpers (eye toggles). Masking is applied at
// box-construction time in fShowNameAnalysis so every rebuild (mode switch,
// free-browse, scenario apply) honors the live hidden set automatically.
function fNameCompHidden(id) {
  try {
    var h = window.nameHiddenComps;
    return Array.isArray(h) && h.indexOf(id) >= 0;
  } catch (e) {
    return false;
  }
}

// Eye buttons show while the authoring master switch is on. In presentation
// the master switch stays functional whenever the step exposes the naming
// settings gear (show.nameSettings): it is seeded from show.nameEye on step
// entry and toggles the eyes live. Without the gear, eyes follow
// show.nameEye directly.
function fNameEyeVisible() {
  var _inPresent = false;
  try {
    _inPresent = (typeof MuLERMoCScenario !== "undefined" && MuLERMoCScenario.present === true);
  } catch (e) {
    /* scenario absent */
  }
  if (_inPresent) {
    try {
      if (typeof fScenarioPresent === "function") {
        var p = fScenarioPresent();
        var st = p && p.steps ? p.steps[p.index] : null;
        if (st && st.show && st.show.nameSettings === true) return window.nameEyeEdit === true;
        return !!(st && st.show && st.show.nameEye === true);
      }
    } catch (e) {
      /* scenario unavailable */
    }
    return false;
  }
  return window.nameEyeEdit === true;
}

// Wrapped name-component box: eye row above, box below. The eye row keeps
// a fixed-height slot whether eyes are shown or not, so every wrap has the
// same height and the outside "+" separators align uniformly (see CSS).
// Hidden boxes render
// a dash on a lightBlue fill (CSS .comp-hidden); the full text lives only in
// memory (never persisted). Euphony connectors stay as computed for the full
// name — neighbors of a dash box keep their connector letter.
function fNameCompBox(boxId, boxClass, displayComp) {
  var hidden = fNameCompHidden(boxId);
  var cls = boxClass + (hidden ? " comp-hidden" : "");
  var body = hidden ? "–" : displayComp;
  var eye = "";
  if (fNameEyeVisible()) {
    eye = "<button class='compEye" + (hidden ? " off-state" : "") + "' data-comp='" + boxId + "' data-tooltip='" + (hidden ? "Εμφάνιση συνθετικού" : "Απόκρυψη συνθετικού") + "'>" + (hidden ? svgEyeOff : svgEye) + "</button>";
  }
  return "<div class='nameCompWrap'><div class='nameCompEyeRow'>" + eye + "</div><div class='" + cls + "' id='" + boxId + "'>" + body + "</div></div>";
}

fInitViewerSettingsBtn();
fInitViewerMaxHeight();
fInitViewerBothHeight();

// ── jsmeOnLoad ────────────────────────────────────────────────────────────

function jsmeOnLoad() {
  jsmeNomeclatureApplet = new JSApplet.JSME(
    "jsmeNomeclature",
    "590px",
    "240px",
    {
      options: "depict, marker",
      depictbg: "#fff",
      atombgsize: "0.6",
    },
  );
  jsmeNomeclatureApplet.setAtomMolecularAreaFontSize(9);
  jsmeNomeclatureApplet.setMolecularAreaLineWidth(0.6);

  let bgAtom = [
    "#7ddfff",
    "#ffc37d",
    "#00ffff",
    "#ffcc66",
    "#ffff00",
    "#ff9999",
    "#33ccff",
    "#ff99ff",
    "#79dc6d",
    "#ff8566",
    "#66ff66",
    "#93bfff",
  ];
  jsmeNomeclatureApplet.setBackGroundColorPalette(bgAtom);

  carbonHydrogens = Array(jsmeNomeclatureApplet.totalNumberOfAtoms()).fill(0);

  jsmeNomeclatureAppletORGNL = new JSApplet.JSME(
    "jsmeNomeclatureORGNL",
    "590px",
    "240px",
    {
      options: "depict, marker",
      depictbg: "#fff",
      atombgsize: "0.6",
    },
  );
  jsmeNomeclatureAppletORGNL.setAtomMolecularAreaFontSize(9);
  jsmeNomeclatureAppletORGNL.setMolecularAreaLineWidth(0.6);

  // let bgAtom = ["#7ddfff", "#ffc37d", "#00ffff", "#ffcc66", "#ffff00", "#ff9999", "#33ccff", "#ff99ff", "#79dc6d", "#ff8566", "#66ff66", "#93bfff"];
  jsmeNomeclatureAppletORGNL.setBackGroundColorPalette(bgAtom);

  fInitData();
  fClassifyAllMolecules();
  fInitNomeclatureMenu();

  // carbonHydrogens = Array(jsmeNomeclatureAppletORGNL.totalNumberOfAtoms())

  // Methane on startup (JSmol viewport workaround): a cold boot with no
  // molecule ever loaded leaves the applet without a valid viewport, so a
  // 2D-only scenario step 1 (load-then-zap+hide as its first lifecycle)
  // corrupts all later 3D. One visible startup load primes it. Direct
  // fSelectMol (not synthesized clicks: teaching-layer handlers may not be
  // bound yet when JSME fires jsmeOnLoad); menu marking is best-effort.
  try {
    if (typeof nameExamples !== "undefined" && nameExamples.methane) {
      selectedMol = "methane";
      fSelectMol();
      try {
        var $startupRow = $("#methane");
        if ($startupRow && $startupRow.length) {
          $(".menuLi").removeClass("selectedLi");
          $startupRow.addClass("selectedLi");
          var $startupHdr = $startupRow.closest(".exmplContainer").prev(".crossMenuLi");
          if ($startupHdr && $startupHdr.length && !$startupHdr.hasClass("open")) {
            $startupHdr.trigger("click");
          }
        }
      } catch (eMenu) {
        /* viewers primed; menu marking best-effort */
      }
    }
  } catch (e) {
    /* startup selection best-effort */
  }

  // Fluid 2D: one initial fit to the real column width (constructor 590px is
  // the known-good first paint), then the debounced observer owns resizes.
  try { fResizeViewers(); } catch (eFit) { /* fit best-effort */ }
  try { fInitZoomObserver2D(); } catch (eObs) { /* observer best-effort */ }
  try { fInitNameFitObserver(); } catch (eObsN) { /* observer best-effort */ }
}

function fClassifyAllMolecules() {
  const previousMol = selectedMol;
  // Snapshot live analysis globals: the loop recomputes them per molecule,
  // so restore afterwards instead of leaving the last molecule's state behind
  const _coreSnapshot = {
    atomsCount, bondsCount, allAtomsTypeList, atomTypes, atomTypeObj,
    atomConnectivityList, atomValenceList, bondList, multiBondListCC,
    multiBondsObj, svgBondList, functionalGroupObj, molType, molTaxonomy,
    carbons, carbonHydrogens: carbonHydrogens.slice(),
  };

  try {
    for (const prop of Object.keys(nameExamples)) {
      const structure = nameExamples[prop].structure2D_Condensed;
      if (!structure) continue;

      jsmeNomeclatureApplet.readMolFile(structure);
      fAnalyseStructure();
      fDetectMolType();
      nameExamples[prop].classification = fGetMoleculeClassification();
      // Canonical SMILES per molecule (storage-only for now; future use as a
      // molecule id in logging/search/display). Condensed source matches the
      // historical title-line convention; in-memory conversion on the already
      // loaded structure, so no extra loop or perf cost. Miss → null, never
      // a boot failure.
      try {
        var _smiles = null;
        if (typeof jsmeNomeclatureApplet.getSmiles === "function") {
          _smiles = jsmeNomeclatureApplet.getSmiles();
        } else if (typeof jsmeNomeclatureApplet.smiles === "function") {
          _smiles = jsmeNomeclatureApplet.smiles();
        }
        nameExamples[prop].smiles = _smiles || null;
      } catch (eSmiles) {
        nameExamples[prop].smiles = null;
      }
    }
  } finally {
    // Direct rebinding: these are `let` globals (not globalThis props),
    // so restore each binding instead of Object.assign on globalThis
    atomsCount = _coreSnapshot.atomsCount;
    bondsCount = _coreSnapshot.bondsCount;
    allAtomsTypeList = _coreSnapshot.allAtomsTypeList;
    atomTypes = _coreSnapshot.atomTypes;
    atomTypeObj = _coreSnapshot.atomTypeObj;
    atomConnectivityList = _coreSnapshot.atomConnectivityList;
    atomValenceList = _coreSnapshot.atomValenceList;
    bondList = _coreSnapshot.bondList;
    multiBondListCC = _coreSnapshot.multiBondListCC;
    multiBondsObj = _coreSnapshot.multiBondsObj;
    svgBondList = _coreSnapshot.svgBondList;
    functionalGroupObj = _coreSnapshot.functionalGroupObj;
    molType = _coreSnapshot.molType;
    molTaxonomy = _coreSnapshot.molTaxonomy;
    carbons = _coreSnapshot.carbons;
    carbonHydrogens = _coreSnapshot.carbonHydrogens;
  }

  selectedMol = previousMol;
  if (previousMol && nameExamples[previousMol]?.structure2D_Condensed) {
    jsmeNomeclatureApplet.readMolFile(nameExamples[previousMol].structure2D_Condensed);
  } else {
    jsmeNomeclatureApplet.reset();
  }
}

//

// ── fToggleViewerSettings ────────────────────────────────────────────────

// Title-bar buttons: 2D / 3D visibility toggles into #viewerVisBtns (far left,
// bold text, same .active contract as the gear) + gear into #viewerSettingsBtnDiv.
// Uses existing `svgSettings` constant and the fToggleViewerSettings() handler.
function fInitViewerSettingsBtn() {
  const markup = `<button id='viewerSettingsBtn' class='settingsBtn' onclick='fToggleViewerSettings()' data-tooltip='Ρυθμίσεις'>${svgSettings}</button>`;
  const visMarkup = `<button id='view2DBtn' class='settingsBtn visBtn active' onclick='fToggleViewer2D()' data-tooltip='Εμφάνιση 2D'>2D</button><button id='view3DBtn' class='settingsBtn visBtn active' onclick='fToggleViewer3D()' data-tooltip='Εμφάνιση 3D'>3D</button>`;
  function insert() {
    try {
      const div = document.getElementById("viewerSettingsBtnDiv");
      if (div && !document.getElementById("viewerSettingsBtn")) {
        div.innerHTML = markup;
      }
      const bar = document.getElementById("viewerVisBtns");
      if (bar && !document.getElementById("view2DBtn")) {
        bar.insertAdjacentHTML("afterbegin", visMarkup);
      }
      // Static HTML icon placeholders (e.g. save-image buttons) hydrate here
      // from the js/ui-icons.js registry — single source, no <img> files.
      document.querySelectorAll("[data-icon]").forEach(function (el) {
        const key = el.getAttribute("data-icon");
        const icon = window.MuLERIcons && window.MuLERIcons[key];
        if (icon && !el.innerHTML) el.innerHTML = icon;
      });
    } catch (e) {
      // defensive - don't throw in init
      console.warn("viewerSettings init failed", e);
    }
  }
  insert();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insert);
  } else {
    // ensure insertion if scripts run after DOM ready
    setTimeout(insert, 0);
  }
}

// Title-bar 2D visibility toggle. Same .active contract as fToggleViewerSettings.
// Scope mirrors the (commented-out) viewFinalJSME checkbox: SVG + 2D mode radios.
function fToggleViewer2D() {
  var btn = document.getElementById("view2DBtn");
  var show = btn && btn.classList.contains("active");
  if (show) {
    if (btn) btn.classList.remove("active");
    $("#jsmeNomeclatureSVG").slideUp(200);
    $("#radio2DMode").addClass("hide");
  } else {
    if (btn) btn.classList.add("active");
    $("#jsmeNomeclatureSVG").slideDown(200);
    $("#radio2DMode").removeClass("hide");
  }
  // Auto readouts depend on which viewers are visible; resync once the
  // 200 ms show/hide animation has settled (the panel may be open).
  setTimeout(fViewerHeightControlsSync, 220);
}

// Title-bar 3D visibility toggle. Scope mirrors the (commented-out) viewJSmol
// checkbox: 3D applet + 3D controls, with JSmol refresh on re-show.
function fToggleViewer3D() {
  var btn = document.getElementById("view3DBtn");
  var show = btn && btn.classList.contains("active");
  if (show) {
    if (btn) btn.classList.remove("active");
    $("#nomeclature3D").slideUp(200);
    $("#controls3D").addClass("hide");
  } else {
    if (btn) btn.classList.add("active");
    $("#nomeclature3D").slideDown(200, function () {
      // Re-sync the applet viewport first: after display:none the cached
      // size stays tiny and refresh/center/zoom/load all render into it
      // (tiny molecule, upper-left; only write IMAGE looks right).
      try {
        var _ap = document.getElementById("nomeclature3D");
        var _w = (_ap && _ap.clientWidth) || 480;
        var _h = (_ap && _ap.clientHeight) || 240;
        if (typeof Jmol !== "undefined" && Jmol.resizeApplet &&
            typeof jmolAppletNomeclature !== "undefined") {
          Jmol.resizeApplet(jmolAppletNomeclature, { width: _w, height: _h });
        }
      } catch (eSize) {
        /* measure best-effort */
      }
      // One-shot reload after a no-3D presentation exit (flag set by
      // fScenarioExitPresent; the exit zapped the applet). Ordinary toggles
      // keep no model change and stay refresh-only/instant.
      var once = false;
      try {
        once = (typeof MuLERMoCScenario !== "undefined" &&
          MuLERMoCScenario.reload3DOnce === true);
        if (typeof MuLERMoCScenario !== "undefined") MuLERMoCScenario.reload3DOnce = false;
      } catch (eFlag) {
        once = false;
      }
      if (once) {
        try {
          if (typeof selectedMol !== "undefined" && selectedMol &&
              typeof nameExamples !== "undefined" && nameExamples[selectedMol]) {
            fLoadMol3D();
            if (typeof showAtomSymbols3D === "function") showAtomSymbols3D();
            if (typeof showHydrogens3D === "function") showHydrogens3D();
            if (typeof rotate3D === "function") rotate3D();
          }
        } catch (eLoad) {
          /* fall through to refresh */
        }
        // Delayed refresh: the SDF load above is async, so an immediate
        // refresh fires before the model lands. Re-render once settled.
        setTimeout(function () {
          try {
            Jmol.script(jmolAppletNomeclature, "refresh");
          } catch (eLate) {
            /* 3D unavailable */
          }
        }, 600);
        return;
      }
      Jmol.script(jmolAppletNomeclature, "refresh");
    });
    $("#controls3D").removeClass("hide");
  }
  setTimeout(fViewerHeightControlsSync, 220);
}

// Shared resync for the two viewer-height rows (panel may be open while a
// title-bar eye toggle hides/shows a viewer).
function fViewerHeightControlsSync() {
  try { fViewerMaxHeightSync(); } catch (eS) { /* slider sync best-effort */ }
  try { fViewerBothHeightSync(); } catch (eS2) { /* slider sync best-effort */ }
}

function fToggleViewerSettings() {
  var panel = document.getElementById("viewerSettingsPanel");
  var btn = document.getElementById("viewerSettingsBtn");
  var isOpen = panel.classList.contains("open");
  if (isOpen) {
    panel.classList.remove("open");
    btn.classList.remove("active");
  } else {
    panel.classList.add("open");
    btn.classList.add("active");
    try { fViewerMaxHeightSync(); } catch (eS) { /* slider sync best-effort */ }
    try { fViewerBothHeightSync(); } catch (eS2) { /* slider sync best-effort */ }
  }
}

document.addEventListener("click", function (e) {
  var panel = document.getElementById("viewerSettingsPanel");
  var btn = document.getElementById("viewerSettingsBtn");
  if (!panel || !btn) return;
  if (
    !panel.contains(e.target) &&
    e.target !== btn &&
    !btn.contains(e.target)
  ) {
    panel.classList.remove("open");
    btn.classList.remove("active");
  }
});

// ── single-viewer max-height control (v48) ───────────────────────────────
// Ρυθμίσεις row: a checkbox (unchecked = Auto, checked = Manual) plus a px
// slider. Auto caps a lone viewer at the both-visible height; Manual uses the
// slider value; "full" (the Full toggle) resolves per playback screen.
// Only the live global `viewerMaxH` is set here — scenario steps own
// persistence (show.viewerMaxHeight). fResizeViewers() recomputes.
//
// `fViewerMaxHeightFull` (below) no longer ceilings the slider — it documents
// the live full single-viewer height the "full" sentinel resolves to.
function fViewerMaxHeightFull() {
  try { return Math.max(VIEWER_MIN_H, Math.round(fViewerHeights2D3D(true).full || 0)); }
  catch (eF) { return VIEWER_MIN_H; }
}

function fViewerMaxHeightEnsureFullBtn() {
  var row = null;
  try { row = document.getElementById("viewerMaxHeightSetting"); } catch (eR) { /* no DOM */ }
  if (!row || document.getElementById("viewerMaxHeightFull")) return;
  var b = document.createElement("button");
  b.type = "button";
  b.id = "viewerMaxHeightFull";
  b.className = "viewerFullBtn";
  b.textContent = "Full";
  b.title = "Πλήρες ύψος οθόνης — προσαρμόζεται σε κάθε οθόνη προβολής";
  b.setAttribute("aria-label", "Πλήρες ύψος οθόνης — προσαρμόζεται σε κάθε οθόνη προβολής");
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fViewerMaxHeightToggleFull();
  });
  row.appendChild(b);
}

function fViewerMaxHeightToggleFull() {
  if (viewerMaxH === "full") {
    var rng = null;
    try { rng = document.getElementById("viewerMaxHeightRange"); } catch (eR) { /* no DOM */ }
    var v = rng ? parseInt(rng.value, 10) : NaN;
    if (isNaN(v)) v = VIEWER_SINGLE_MAX;
    if (v < VIEWER_MIN_H) v = VIEWER_MIN_H;
    if (v > VIEWER_SINGLE_MAX) v = VIEWER_SINGLE_MAX;
    viewerMaxH = v;
  } else {
    viewerMaxH = "full";
  }
  fViewerMaxHeightSync();
  try { fResizeViewers(); } catch (eR) { /* resize best-effort */ }
}

function fViewerMaxHeightSync() {
  var chk = document.getElementById("viewerMaxHeightCheck");
  var rng = document.getElementById("viewerMaxHeightRange");
  var val = document.getElementById("viewerMaxHeightVal");
  if (!chk || !rng) return;
  fViewerMaxHeightEnsureFullBtn();
  var full = viewerMaxH === "full";
  var manual = viewerMaxH != null;
  try {
    chk.classList.toggle("selectedCheck", manual);
    chk.classList.toggle("unselectedCheck", !manual);
  } catch (eC) { /* class toggle best-effort */ }
  var btn = null;
  try { btn = document.getElementById("viewerMaxHeightFull"); } catch (eB) { /* no DOM */ }
  if (btn) {
    try {
      btn.classList.toggle("active", full);
      btn.setAttribute("aria-pressed", full ? "true" : "false");
    } catch (eA) { /* button state best-effort */ }
  }
  // Fixed ceiling (v52): the slider no longer follows the screen height.
  rng.min = String(VIEWER_MIN_H);
  rng.max = String(VIEWER_SINGLE_MAX);
  rng.disabled = !manual || full;
  if (full) {
    // Park the slider at max while Full owns the value; the readout names it.
    rng.value = String(VIEWER_SINGLE_MAX);
    if (val) val.textContent = "Full";
    return;
  }
  var shown;
  if (manual) {
    shown = Math.round(viewerMaxH);
  } else {
    var vh = fViewerHeights2D3D();
    shown = Math.round(vh.h2 || vh.h3 || Math.round(fViewerMaxHeightFull() / 2));
  }
  if (shown < VIEWER_MIN_H) shown = VIEWER_MIN_H;
  if (shown > VIEWER_SINGLE_MAX) shown = VIEWER_SINGLE_MAX;
  rng.value = String(shown);
  if (val) val.textContent = shown + "px";
}

function fViewerMaxHeightFromUi() {
  var chk = document.getElementById("viewerMaxHeightCheck");
  var rng = document.getElementById("viewerMaxHeightRange");
  if (!chk || !rng) return;
  if (chk.classList.contains("selectedCheck")) {
    // The Full toggle owns the value while active — a checkbox tick from the
    // generic handler must not overwrite it with the parked slider value.
    if (viewerMaxH !== "full") {
      var v = parseInt(rng.value, 10);
      if (isNaN(v)) v = VIEWER_MIN_H;
      if (v < VIEWER_MIN_H) v = VIEWER_MIN_H;
      if (v > VIEWER_SINGLE_MAX) v = VIEWER_SINGLE_MAX;
      viewerMaxH = v;
    }
  } else {
    viewerMaxH = null;
  }
  fViewerMaxHeightSync();
  try { fResizeViewers(); } catch (eR) { /* resize best-effort */ }
}

function fInitViewerMaxHeight() {
  var chk = document.getElementById("viewerMaxHeightCheck");
  var rng = document.getElementById("viewerMaxHeightRange");
  if (!chk || !rng) {
    // Script may run before the static panel is parsed; retry once then bind.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fInitViewerMaxHeight);
    }
    return;
  }
  // The generic .checkBoxContainer handler toggles the class on the same
  // click; defer a tick so the post-toggle state is what we read.
  if (!chk.dataset.vmhBound) {
    chk.dataset.vmhBound = "1";
    chk.addEventListener("click", function () { setTimeout(fViewerMaxHeightFromUi, 0); });
  }
  if (rng && !rng.dataset.vmhBound) {
    rng.dataset.vmhBound = "1";
    rng.addEventListener("input", fViewerMaxHeightFromUi);
  }
  fViewerMaxHeightSync();
}

// ── double-viewer height control (v48) ───────────────────────────────────
// Ρυθμίσεις row: a checkbox (unchecked = Auto = the equal split both viewers
// get today, checked = Manual) plus a fixed slider (see VIEWER_BOTH_MIN/MAX).
// When two viewers are visible, Manual sets their COMBINED height — each
// viewer takes half. "full" (the Full toggle) fills the live viewport instead.
// Only the live global `viewerBothH` is set here — scenario steps own
// persistence (show.viewerBothHeight). fResizeViewers() recomputes.
function fViewerBothHeightEnsureFullBtn() {
  var row = null;
  try { row = document.getElementById("viewerBothHeightSetting"); } catch (eR) { /* no DOM */ }
  if (!row || document.getElementById("viewerBothHeightFull")) return;
  var b = document.createElement("button");
  b.type = "button";
  b.id = "viewerBothHeightFull";
  b.className = "viewerFullBtn";
  b.textContent = "Full";
  b.title = "Πλήρες ύψος οθόνης — προσαρμόζεται σε κάθε οθόνη προβολής";
  b.setAttribute("aria-label", "Πλήρες ύψος οθόνης — προσαρμόζεται σε κάθε οθόνη προβολής");
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", function (ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    fViewerBothHeightToggleFull();
  });
  row.appendChild(b);
}

function fViewerBothHeightToggleFull() {
  if (viewerBothH === "full") {
    var rng = null;
    try { rng = document.getElementById("viewerBothHeightRange"); } catch (eR) { /* no DOM */ }
    var v = rng ? parseInt(rng.value, 10) : NaN;
    if (isNaN(v)) v = VIEWER_BOTH_MAX;
    if (v < VIEWER_BOTH_MIN) v = VIEWER_BOTH_MIN;
    if (v > VIEWER_BOTH_MAX) v = VIEWER_BOTH_MAX;
    viewerBothH = v;
  } else {
    viewerBothH = "full";
  }
  fViewerBothHeightSync();
  try { fResizeViewers(); } catch (eR) { /* resize best-effort */ }
}

function fViewerBothHeightSync() {
  var chk = document.getElementById("viewerBothHeightCheck");
  var rng = document.getElementById("viewerBothHeightRange");
  var val = document.getElementById("viewerBothHeightVal");
  if (!chk || !rng) return;
  fViewerBothHeightEnsureFullBtn();
  var full = viewerBothH === "full";
  var manual = viewerBothH != null;
  try {
    chk.classList.toggle("selectedCheck", manual);
    chk.classList.toggle("unselectedCheck", !manual);
  } catch (eC) { /* class toggle best-effort */ }
  var btn = null;
  try { btn = document.getElementById("viewerBothHeightFull"); } catch (eB) { /* no DOM */ }
  if (btn) {
    try {
      btn.classList.toggle("active", full);
      btn.setAttribute("aria-pressed", full ? "true" : "false");
    } catch (eA) { /* button state best-effort */ }
  }
  rng.min = String(VIEWER_BOTH_MIN);
  rng.max = String(VIEWER_BOTH_MAX);
  rng.disabled = !manual || full;
  if (full) {
    rng.value = String(VIEWER_BOTH_MAX);
    if (val) val.textContent = "Full";
    return;
  }
  var shown;
  if (manual) {
    shown = Math.round(viewerBothH);
  } else {
    // Auto: the combined height the equal split currently yields (2D + 3D).
    var vh = fViewerHeights2D3D();
    shown = Math.round((vh.h2 || 0) + (vh.h3 || 0) || VIEWER_BOTH_MIN);
  }
  if (shown < VIEWER_BOTH_MIN) shown = VIEWER_BOTH_MIN;
  if (shown > VIEWER_BOTH_MAX) shown = VIEWER_BOTH_MAX;
  rng.value = String(shown);
  if (val) val.textContent = shown + "px";
}

function fViewerBothHeightFromUi() {
  var chk = document.getElementById("viewerBothHeightCheck");
  var rng = document.getElementById("viewerBothHeightRange");
  if (!chk || !rng) return;
  if (chk.classList.contains("selectedCheck")) {
    // The Full toggle owns the value while active — see single-viewer note.
    if (viewerBothH !== "full") {
      var v = parseInt(rng.value, 10);
      if (isNaN(v)) v = VIEWER_BOTH_MIN;
      if (v < VIEWER_BOTH_MIN) v = VIEWER_BOTH_MIN;
      if (v > VIEWER_BOTH_MAX) v = VIEWER_BOTH_MAX;
      viewerBothH = v;
    }
  } else {
    viewerBothH = null;
  }
  fViewerBothHeightSync();
  try { fResizeViewers(); } catch (eR) { /* resize best-effort */ }
}

function fInitViewerBothHeight() {
  var chk = document.getElementById("viewerBothHeightCheck");
  var rng = document.getElementById("viewerBothHeightRange");
  if (!chk || !rng) {
    // Script may run before the static panel is parsed; retry once then bind.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fInitViewerBothHeight);
    }
    return;
  }
  // The generic .checkBoxContainer handler toggles the class on the same
  // click; defer a tick so the post-toggle state is what we read.
  if (!chk.dataset.vbhBound) {
    chk.dataset.vbhBound = "1";
    chk.addEventListener("click", function () { setTimeout(fViewerBothHeightFromUi, 0); });
  }
  if (rng && !rng.dataset.vbhBound) {
    rng.dataset.vbhBound = "1";
    rng.addEventListener("input", fViewerBothHeightFromUi);
  }
  fViewerBothHeightSync();
}

// ── fToggleNameSettings ────────────────────────────────────────────────

// Initialize name settings button markup into #nameSettingsBtnDiv.
// Uses existing `svgSettings` constant and the fToggleNameSettings() handler.

function fToggleNameSettings() {
  nameSettingsFlag = !nameSettingsFlag;
  var panel = document.getElementById("nameSettingsPanel");
  var btn = document.getElementById("nameSettingsBtn");
  // var isOpen = panel.classList.contains('open')
  if (!nameSettingsFlag) {
    panel.classList.remove("open");
    btn.classList.remove("active");
  } else {
    panel.classList.add("open");
    btn.classList.add("active");
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
    const _m = (window.MOL2D && window.MOL2D[prop]) || {};
    const my2D_Condensed = _m.condensed !== undefined ? _m.condensed : null;
    const my2D_Expanded = _m.expanded !== undefined ? _m.expanded : null;
    const my2D_Skeletal = _m.skeletal !== undefined ? _m.skeletal : null;

    nameExamples[prop].structure2D_Condensed = my2D_Condensed;
    nameExamples[prop].structure2D_Expanded = my2D_Expanded;
    nameExamples[prop].structure2D_Skeletal = my2D_Skeletal;

    const my3D = "mols/nomeclature-moc2/" + prop + "_3D.sdf";
    nameExamples[prop].file3D = my3D;
  }
}

// ── fMakeAnnotatedSkeletal ────────────────────────────────────────────────
// Takes a V2000 skeletal MOL string and makes every carbon atom visible
// by replacing the 3-char atom-symbol field 'C  ' with '[C]'.
// JSME renders [C] atoms with a visible 'C' label, so fAddHydrogens2SVG
// can then annotate each with its hydrogen count.

function fMakeAnnotatedSkeletal(molStr) {
  if (!molStr) {
    return molStr;
  }
  const lines = molStr.split("\n");
  if (lines.length < 4) {
    return molStr;
  }
  const atomCount = parseInt(lines[3].substring(0, 3));
  if (isNaN(atomCount)) {
    return molStr;
  }
  for (let i = 4; i < 4 + atomCount && i < lines.length; i++) {
    if (lines[i].substring(31, 34) === "C  ") {
      lines[i] = lines[i].substring(0, 31) + "[C]" + lines[i].substring(34);
    }
  }
  return lines.join("\n");
}

// ── fUpdateChainModeButton ────────────────────────────────────────────────

function fUpdateChainModeButton() {
  const $dataBtn = $("#radioChainMode .radioCheckContainer").eq(0);
  // Stored chain keys use _Condensed/_Expanded/_Skeletal (see fMainChainKeySuffix).
  const chainKeySuffix = fMainChainKeySuffix();
  const _storedChain =
    selectedMol && nameExamples[selectedMol]
      ? nameExamples[selectedMol]["mainChain" + chainKeySuffix]
      : null;
  // No molecule selected, key missing, or an empty stored array (the ether/
  // ester and two branched-alkane placeholders) all mean "no stored data".
  const hasChainData = Array.isArray(_storedChain) && _storedChain.length > 0;
  if (hasChainData) {
    $dataBtn.removeClass("disabledRadio");
  } else {
    $dataBtn.addClass("disabledRadio");
    if (mainChainMode === "data") {
      mainChainMode = "algorithmic";
    }
  }
  // Always sync radio visuals to current mainChainMode
  const algoIdx = mainChainMode === "algorithmic" ? 1 : 0;
  $("#radioChainMode .radioCheckContainer")
    .removeClass("selectedRadio")
    .addClass("unselectedRadio");
  $("#radioChainMode .radioCheckContainer")
    .eq(algoIdx)
    .removeClass("unselectedRadio")
    .addClass("selectedRadio");
}

// ── fUpdateDiagr2DButton ──────────────────────────────────────────────────
// Generalised: disables any 2D mode radio whose representation is missing
// (condensed=eq(0), expanded=eq(1), skeletal=eq(2)) and falls
// back to the first available representation (condensed > expanded > skeletal).

function fUpdateDiagr2DButton() {
  const $modeBtns = $("#radio2DMode .radioCheckContainer");
  const $condBtn = $modeBtns.eq(0);
  const $expBtn = $modeBtns.eq(1);
  const $diagrBtn = $modeBtns.eq(2);
  const $zigzagCheck = $("#zigzagCheck");
  const ex = selectedMol ? nameExamples[selectedMol] : null;
  const hasCondensed2D = !selectedMol || !!ex?.structure2D_Condensed;
  const hasExpanded2D = !selectedMol || !!ex?.structure2D_Expanded;
  const hasSkeletal2D = !selectedMol || !!ex?.structure2D_Skeletal;
  $condBtn.toggleClass("disabledRadio", !hasCondensed2D);
  $expBtn.toggleClass("disabledRadio", !hasExpanded2D);
  $diagrBtn.toggleClass("disabledRadio", !hasSkeletal2D);

  const modeAvailable =
    mode2D === "condensed"
      ? hasCondensed2D
      : mode2D === "expanded"
        ? hasExpanded2D
        : hasSkeletal2D; // skeletal + condensedZigZag share structure2D_Skeletal
  if (selectedMol && !modeAvailable) {
    if (hasCondensed2D) {
      mode2D = "condensed";
      modeSuffix = "_2D_Condensed";
    } else if (hasExpanded2D) {
      mode2D = "expanded";
      modeSuffix = "_2D_Expanded";
    } else if (hasSkeletal2D) {
      mode2D = "skeletal";
      modeSuffix = "_2D_Skeletal";
    }
    const fallbackIdx =
      mode2D === "expanded" ? 1 : mode2D === "condensed" ? 0 : 2;
    $modeBtns.removeClass("selectedRadio").addClass("unselectedRadio");
    $modeBtns
      .eq(fallbackIdx)
      .removeClass("unselectedRadio")
      .addClass("selectedRadio");
  }

  if (hasSkeletal2D) {
    if (mode2D === "skeletal" || mode2D === "condensedZigZag") {
      // $zigzagCheck.show();
      $zigzagCheck.removeClass("disabledCheck");
      if (mode2D === "condensedZigZag") {
        $zigzagCheck.removeClass("unselectedCheck").addClass("selectedCheck");
      } else {
        $zigzagCheck.removeClass("selectedCheck").addClass("unselectedCheck");
      }
    } else {
      $zigzagCheck.addClass("disabledCheck");
      $zigzagCheck.removeClass("selectedCheck").addClass("unselectedCheck");
    }
  } else {
    $zigzagCheck.addClass("disabledCheck");
    $zigzagCheck.removeClass("selectedCheck").addClass("unselectedCheck");
  }
}

// ── fSyncAtomColorModeDisabled ────────────────────────────────────────────
// The 2D "Κατά άτομο / Κατά ομάδα" radios are only meaningful while colored
// symbols are on (#svgAtomColorCheck). Dim + inert them when the coloring
// toggle is off (same .disabledRadio convention as the 2D mode radios).

function fSyncAtomColorModeDisabled() {
  var on = typeof svgAtomColors2DFlag !== "undefined" ? svgAtomColors2DFlag : true;
  $("#atomColorMode .atomColorModeRadio").toggleClass("disabledRadio", !on);
}

// ── fSelectMol ────────────────────────────────────────────────────────────

function fSelectMol() {
  if (!selectedMol || !nameExamples[selectedMol]) {
    return;
  }

  fInitProps();
  fClearHighlights();
  fUpdateDiagr2DButton();
  fUpdateChainModeButton();
  fLoadMol2D();
  fLoadMol3D();
  fFetchAndParse3D();

  showAtomSymbols3D();
  showHydrogens3D();
  rotate3D();

  // fShowMolName()
  fShowNameAnalysis();

  getMolData();
}

// ── fDeselectMol ──────────────────────────────────────────────────────────

function fDeselectMol() {
  fInitProps();
  fClearHighlights();

  selectedMol = null;
  $(".menuLi").removeClass("selectedLi");

  myMol3D = null;
  Jmol.script(jmolAppletNomeclature, "zap");
  try {
    if (typeof MuLERMoCScenario !== "undefined") MuLERMoCScenario.reload3DOnce = false;
  } catch (eFlag) {
    /* flag best-effort */
  }

  myMol2D = null;
  if (jsmeNomeclatureApplet) jsmeNomeclatureApplet.reset();
  if (jsmeNomeclatureAppletORGNL) jsmeNomeclatureAppletORGNL.reset();
  fUpdateSVG();

  $("#molName").html("");
  nameComponentsList = [];
  fShowNameAnalysis();
  fUpdateDiagr2DButton();
  fUpdateChainModeButton();
}

// ── fInitProps ────────────────────────────────────────────────────────────

function fInitProps() {
  currNumberEl = 0;
  clearInterval(myNumberingTimeout);
  nameAnalysisMode = "none";
  // New-molecule reset: component visibility never leaks across molecules
  // (comp ids are slot-based, not molecule-based). Scenario steps re-assert
  // their stored hidden set after fSelectMol returns.
  window.nameHiddenComps = [];
  carbons = 0;
  ruleTableHighlight = null;
  // New-molecule reset: 2D zoom returns to default on every molecule load.
  // Mode/chain switches call fLoadMol2D directly (teaching layer) and keep
  // the live zoom for comparison. Scenario steps re-assert their stored zoom
  // after fSelectMol returns.
  molZoom2D = MOL_ZOOM_DEFAULT;
  // Stepper pools go stale with the molecule: fCalcMainChain rebuilds them on
  // the next load (index resets to 0 there). Guarded: core may be absent.
  try {
    if (typeof mainChainPool !== "undefined") { mainChainPool = []; mainChainPoolIdx = 0; }
    if (typeof mainChainPool3D !== "undefined") { mainChainPool3D = []; mainChainPool3DKey = null; }
  } catch (ePool) { /* core unavailable */ }
}

// ── fShowMolName ──────────────────────────────────────────────────────────

function fShowMolName() {
  if (!selectedMol || !nameExamples[selectedMol]) {
    $("#molName").html("");
    return;
  }

  let molName = currentMolName;
  $("#molName").html(molName);
}

// ── fLoadMol2D ────────────────────────────────────────────────────────────

function fLoadMol2D() {
  const selectedExample = nameExamples[selectedMol];
  if (!selectedExample) {
    myMol2D = null;
    jsmeNomeclatureApplet.clear();
    if (jsmeNomeclatureAppletORGNL) jsmeNomeclatureAppletORGNL.clear();
    return;
  }

  // Fall back to the first available representation if the requested
  // mode has no data (condensed > expanded > skeletal). Keeps globals
  // and radios in sync with what is actually loaded.
  const modeHasData =
    mode2D === "condensed"
      ? !!selectedExample.structure2D_Condensed
      : mode2D === "expanded"
        ? !!selectedExample.structure2D_Expanded
        : !!selectedExample.structure2D_Skeletal;
  if (!modeHasData) {
    if (selectedExample.structure2D_Condensed) {
      mode2D = "condensed";
      modeSuffix = "_2D_Condensed";
    } else if (selectedExample.structure2D_Expanded) {
      mode2D = "expanded";
      modeSuffix = "_2D_Expanded";
    } else if (selectedExample.structure2D_Skeletal) {
      mode2D = "skeletal";
      modeSuffix = "_2D_Skeletal";
    }
    const fallbackIdx =
      mode2D === "expanded" ? 1 : mode2D === "condensed" ? 0 : 2;
    $("#radio2DMode .radioCheckContainer")
      .removeClass("selectedRadio")
      .addClass("unselectedRadio");
    $("#radio2DMode .radioCheckContainer")
      .eq(fallbackIdx)
      .removeClass("unselectedRadio")
      .addClass("selectedRadio");
  }

  let rawMol2D;

  switch (mode2D) {
    case "condensed":
      rawMol2D = selectedExample.structure2D_Condensed;
      myMol2D = fMakeAnnotatedSkeletal(selectedExample.structure2D_Condensed);
      break;
    case "expanded":
      rawMol2D = selectedExample.structure2D_Expanded;
      myMol2D = fMakeAnnotatedSkeletal(selectedExample.structure2D_Expanded);
      break;
    case "skeletal":
      rawMol2D = selectedExample.structure2D_Skeletal;
      myMol2D = selectedExample.structure2D_Skeletal;
      break;
    case "condensedZigZag":
      rawMol2D = selectedExample.structure2D_Skeletal;
      myMol2D = fMakeAnnotatedSkeletal(selectedExample.structure2D_Skeletal);
      break;
    default:
      rawMol2D = selectedExample.structure2D_Condensed;
      myMol2D = selectedExample.structure2D_Condensed;
  }

  if (!myMol2D) {
    jsmeNomeclatureApplet.clear();
    if (jsmeNomeclatureAppletORGNL) jsmeNomeclatureAppletORGNL.clear();
    myMol2D = null;
    fUpdateSVG();
    return;
  }

  jsmeNomeclatureApplet.readMolFile(myMol2D);
  jsmeNomeclatureApplet.setMolecularAreaScale(molZoom2D);
  if (jsmeNomeclatureAppletORGNL && rawMol2D) {
    jsmeNomeclatureAppletORGNL.readMolFile(rawMol2D);
    jsmeNomeclatureAppletORGNL.setMolecularAreaScale(molZoom2D);
  }

  fAnalyseStructure();
  fDetectMolType();
  nameExamples[selectedMol].classification = fGetMoleculeClassification();
  fGuessName();
  fUpdateSVG();
  // Fresh pools were just built by fCalcMainChain — refresh the stepper UI.
  try { if (typeof fRenderChainStepper === "function") fRenderChainStepper(); } catch (eStep) { /* stepper unavailable */ }
}

// ── fReapplyZoomScale2D ─────────────────────────────────────────────────────
// Re-applies the live absolute zoom scale on both applets, then rebuilds the
// SVG overlay + replays numbering. Split out of fZoom2D so resizes can force
// the same re-fit: setSize alone resizes the box but leaves a stale small
// depiction (fixed by any zoom press) — re-applying the scale re-fits it.
// Highlight-safe (JSME background state survives scale changes: the zoom
// buttons prove it daily). No value change, no narration.
function fReapplyZoomScale2D() {
  if (!jsmeNomeclatureApplet) return;
  try {
    jsmeNomeclatureApplet.setMolecularAreaScale(molZoom2D);
    if (jsmeNomeclatureAppletORGNL) jsmeNomeclatureAppletORGNL.setMolecularAreaScale(molZoom2D);
  } catch (e) {
    /* applet unavailable */
  }
  fUpdateSVG();
  if (numberingFlag) {
    currNumberEl = 0;
    fShowNumbering(0);
  }
}

// ── fZoom2D ─────────────────────────────────────────────────────────────────
// Zoom in (dir > 0) / out (dir < 0) the 2D molecule view by one ×1.25 step,
// clamped to 0.5–6.0. Scale is applet state: re-render the SVG afterwards and
// replay numbering overlays (DOM-side, wiped by the rebuild) like the color
// toggle does. Highlights are JSME background state and survive.
function fZoom2D(dir) {
  if (!jsmeNomeclatureApplet) return;
  var next = molZoom2D * (dir > 0 ? 1.25 : 1 / 1.25);
  next = Math.min(MOL_ZOOM_MAX, Math.max(MOL_ZOOM_MIN, next));
  if (next === molZoom2D) return;
  molZoom2D = next;
  fReapplyZoomScale2D();
}

// ── fZoom3D ─────────────────────────────────────────────────────────────────
// Zoom in (dir > 0) / out (dir < 0) the 3D molecule view. Live-only aid:
// zoom is JSmol-side state (numbering echoes and selections survive), JSmol
// `load` resets the framing on every molecule switch, and per-step cameras
// remain moveto's job (capture/apply follow-up pending elsewhere).
function fZoom3D(dir) {
  try {
    if (typeof Jmol !== "undefined" && typeof jmolAppletNomeclature !== "undefined") {
      Jmol.script(jmolAppletNomeclature, dir > 0 ? "quit;zoomTo IN;" : "quit; zoomTo OUT;");
    }
  } catch (e) {
    /* JSmol unavailable */
  }
}

// ── fAddHydrogens2SVG ─────────────────────────────────────────────────────

function fAddHydrogens2SVG() {
  let tmpTexts, tmpRects, tmpBonds;
  let currText, currElement, currID, currHydrogensCount;
  let myLabel, myNo, rectX, textX, currString, newString, newStringElement;
  molSvg = MuSVG("#jsmeNomeclatureSVG svg");

  tmpTexts = molSvg.selectAll("text");
  tmpRects = molSvg.selectAll("rect");
  tmpBonds = molSvg.selectAll("line");
  for (let i = 0; i < tmpBonds.length; i++) {}

  for (let i = 0; i < tmpTexts.length; i++) {
    currText = tmpTexts[i].attr("text");
    currElement = molSvg.select("text:nth-of-type(" + (i + 1) + ")");

    if (currText === "C") {
      currID = currText + (i + 1);

      currHydrogensCount = carbonHydrogens[i];
      switch (currHydrogensCount) {
        case 0:
          myLabel = "C";
          myNo = "";
          break;
        case 1:
          myLabel = "CH";
          myNo = "";
          tmpRects[i + 1].attr({ width: 470 });
          rectX = parseInt(tmpRects[i + 1].attr("x")) + 60;
          tmpRects[i + 1].attr({ x: rectX });
          break;
        case 4:
          myLabel = "CH";
          myNo = 4;
          break;
        default:
          myLabel = "CH";
          myNo = currHydrogensCount;
          tmpRects[i + 1].attr({ width: 600 });
          rectX = parseInt(tmpRects[i + 1].attr("x")) - 120;
          tmpRects[i + 1].attr({ x: rectX });
          textX = parseInt(tmpTexts[i].attr("x")) - 160;
          tmpTexts[i].attr({ x: textX });
      }

      currString = tmpTexts[i].toString();
      const hydrogenTspan =
        myLabel === "CH"
          ? `<tspan class="svgHydrogenPart">H${myNo !== "" ? `<tspan dy="70" font-size=".8em">${myNo}</tspan>` : ""}</tspan>`
          : "";
      newString = currString.replace(
        [">C</text>"],
        `class="svgAtomLabel" id="${currID}"><tspan>C</tspan>${hydrogenTspan}</text>`,
      );
      newStringElement = MuSVG.parse(newString);
      if (!newStringElement) continue;
      tmpTexts[i].remove();
      molSvg.select("g").append(newStringElement);
    } else {
      currString = tmpTexts[i].toString();
      newStringElement = MuSVG.parse(currString);
      if (!newStringElement) continue;
      tmpTexts[i].remove();
      molSvg.select("g").append(newStringElement);
    }
  }
}

function fGetCompactedAtomSkipSet(includeCompactedAtoms = false) {
  const skipIndices = new Set();
  if (includeCompactedAtoms || mode2D !== "condensed" || !functionalGroupObj) {
    return skipIndices;
  }

  if (functionalGroupObj.hasOwnProperty("carboxylicAcid")) {
    const acidEntries = functionalGroupObj.carboxylicAcid.O || [];
    for (let i = 0; i < acidEntries.length; i++) {
      const entry = acidEntries[i];
      if (!Array.isArray(entry) || entry.length < 2) {
        continue;
      }
      skipIndices.add(entry[0]);
      skipIndices.add(entry[1]);
    }
  }
  if (functionalGroupObj.hasOwnProperty("aldehyde")) {
    const aldehydeEntries = functionalGroupObj.aldehyde.O || [];
    for (let i = 0; i < aldehydeEntries.length; i++) {
      const carbon = (atomConnectivityList[aldehydeEntries[i]] || [])[0];
      const ns = atomConnectivityList[carbon] || [];
      const methanal = ns.length === 1 && atomValenceList[carbon] === 2 && allAtomsTypeList[ns[0]] === "O";
      if (!methanal && !ns.some(n => allAtomsTypeList[n] === "C")) continue;
      skipIndices.add(aldehydeEntries[i]);
    }
  }
  if (functionalGroupObj.hasOwnProperty("cyanide")) {
    const cyanideEntries = functionalGroupObj.cyanide.N || [];
    for (let i = 0; i < cyanideEntries.length; i++) {
      skipIndices.add(cyanideEntries[i]);
    }
  }
  if (functionalGroupObj.hasOwnProperty("nitro")) {
    const nitroEntries = functionalGroupObj.nitro.N || [];
    for (let i = 0; i < nitroEntries.length; i++) {
      const nitrogenIdx = nitroEntries[i];
      if (!Array.isArray(atomConnectivityList[nitrogenIdx])) {
        continue;
      }
      for (let n = 0; n < atomConnectivityList[nitrogenIdx].length; n++) {
        const neighborIdx = atomConnectivityList[nitrogenIdx][n];
        if (allAtomsTypeList[neighborIdx] === "O") {
          skipIndices.add(neighborIdx);
        }
      }
    }
  }

  return skipIndices;
}

function fGetRenderedAtomTextMap(
  includeCompactedAtoms = false,
  includeHydrogens = false,
) {
  const atomTextMap = {};
  const textEls = molSvg.selectAll("text");
  const skipIndices = fGetCompactedAtomSkipSet(includeCompactedAtoms);

  let textIdx = 0;
  for (let atomIdx = 0; atomIdx < allAtomsTypeList.length; atomIdx++) {
    if (allAtomsTypeList[atomIdx] === "H" && !includeHydrogens) {
      continue;
    }
    if (skipIndices.has(atomIdx)) {
      continue;
    }
    if (textIdx >= textEls.length) {
      break;
    }
    atomTextMap[atomIdx] = textEls[textIdx];
    textIdx += 1;
  }
  return atomTextMap;
}

function fGetRenderedAtomRectMap(
  includeCompactedAtoms = false,
  includeHydrogens = false,
) {
  const atomRectMap = {};
  const rectEls = molSvg.selectAll("rect");
  const skipIndices = fGetCompactedAtomSkipSet(includeCompactedAtoms);
  let rectIdx = 1;

  for (let atomIdx = 0; atomIdx < allAtomsTypeList.length; atomIdx++) {
    if (allAtomsTypeList[atomIdx] === "H" && !includeHydrogens) {
      continue;
    }
    if (skipIndices.has(atomIdx)) {
      continue;
    }
    if (rectIdx >= rectEls.length) {
      break;
    }
    atomRectMap[atomIdx] = rectEls[rectIdx];
    rectIdx += 1;
  }

  return atomRectMap;
}

function fGetAttachedHydrogenIndices(atomIdx) {
  const hydrogenIndices = [];
  if (!Array.isArray(atomConnectivityList[atomIdx])) {
    return hydrogenIndices;
  }
  for (let i = 0; i < atomConnectivityList[atomIdx].length; i++) {
    const neighborIdx = atomConnectivityList[atomIdx][i];
    if (allAtomsTypeList[neighborIdx] === "H") {
      hydrogenIndices.push(neighborIdx);
    }
  }
  return hydrogenIndices;
}

function fFindBondIndexByAtoms(atomIdxA, atomIdxB) {
  const atomA = atomIdxA + 1;
  const atomB = atomIdxB + 1;
  for (let bondIdx = 0; bondIdx < bondList.length; bondIdx++) {
    if (!bondList[bondIdx]) {
      continue;
    }
    const bondAtom1 = bondList[bondIdx][0];
    const bondAtom2 = bondList[bondIdx][1];
    if (
      (bondAtom1 === atomA && bondAtom2 === atomB) ||
      (bondAtom1 === atomB && bondAtom2 === atomA)
    ) {
      return bondIdx;
    }
  }
  return -1;
}

function fRemoveBondLinesByBondIndex(bondIdx, lineEls) {
  if (bondIdx < 0 || !bondList[bondIdx]) {
    return;
  }
  const lineStart = svgBondList[bondIdx];
  const lineCount = bondList[bondIdx][2];
  for (let offset = 0; offset < lineCount; offset++) {
    const lineEl = lineEls[lineStart + offset - 1];
    if (lineEl) {
      lineEl.remove();
    }
  }
}

function fBuildTextAttrsFromElement(el) {
  let attrs = "";
  const attrNames = [
    "x",
    "y",
    "font-size",
    "font-family",
    "text-anchor",
    "fill",
    "stroke",
    "stroke-width",
    "class",
    "id",
  ];
  for (let i = 0; i < attrNames.length; i++) {
    const attrName = attrNames[i];
    const attrValue = el.node.getAttribute(attrName);
    if (attrValue) {
      attrs += " " + attrName + '="' + attrValue + '"';
    }
  }
  return attrs;
}

function fReplaceTextElementMarkup(el, markup, attrOverrides) {
  if (!el) {
    return null;
  }
  const x = el.node.getAttribute("x");
  const y = el.node.getAttribute("y");
  if (!x || !y) {
    return null;
  }
  let attrs = fBuildTextAttrsFromElement(el);
  if (attrOverrides) {
    for (const attrName in attrOverrides) {
      attrs = attrs.replace(new RegExp(" " + attrName + '="[^"]*"', "g"), "");
      attrs += " " + attrName + '="' + attrOverrides[attrName] + '"';
    }
  }
  const newString = `<text${attrs}>${markup}</text>`;
  let newEl;
  try {
    newEl = MuSVG.parse(newString);
  } catch (e) {
    return null;
  }
  const parentNode = el.node.parentNode;
  if (!parentNode || !newEl || !newEl.node) {
    return null;
  }

  const nextSibling = el.node.nextSibling;
  const fragmentNode = newEl.node;
  let insertedNode = null;

  while (fragmentNode.firstChild) {
    const childNode = fragmentNode.firstChild;
    parentNode.insertBefore(childNode, nextSibling);
    if (!insertedNode && childNode.nodeType === 1) {
      insertedNode = childNode;
    }
  }

  el.remove();
  return insertedNode ? MuSVG(insertedNode) : null;
}

function fShouldReverseCompactLabel(anchorEl, attachedEls) {
  if (!anchorEl || !attachedEls || attachedEls.length === 0) {
    return false;
  }
  const anchorX = parseFloat(anchorEl.node.getAttribute("x"));
  if (isNaN(anchorX)) {
    return false;
  }

  let attachedXSum = 0;
  let attachedCount = 0;
  for (let i = 0; i < attachedEls.length; i++) {
    if (!attachedEls[i]) {
      continue;
    }
    const attachedX = parseFloat(attachedEls[i].node.getAttribute("x"));
    if (isNaN(attachedX)) {
      continue;
    }
    attachedXSum += attachedX;
    attachedCount += 1;
  }
  if (attachedCount === 0) {
    return false;
  }

  return attachedXSum / attachedCount < anchorX;
}

function fGetReversedCompactLabelAttrs(anchorEl, labelKey) {
  if (!anchorEl) {
    return { "text-anchor": "end" };
  }
  const anchorX = parseFloat(anchorEl.node.getAttribute("x"));
  const fontSize = parseFloat(anchorEl.node.getAttribute("font-size"));
  const hasCustomScale = Object.prototype.hasOwnProperty.call(
    compactReverseOffsetScale,
    labelKey,
  );
  const offsetScale = hasCustomScale
    ? compactReverseOffsetScale[labelKey]
    : 0.8;
  const xShift = isNaN(fontSize) ? 120 : fontSize * offsetScale;
  if (isNaN(anchorX)) {
    return { "text-anchor": "end" };
  }
  return {
    "text-anchor": "end",
    x: String(anchorX + xShift),
  };
}

function fGetForwardCompactLabelAttrs(anchorEl, labelKey) {
  if (!anchorEl) {
    return null;
  }
  const anchorX = parseFloat(anchorEl.node.getAttribute("x"));
  const fontSize = parseFloat(anchorEl.node.getAttribute("font-size"));
  const hasCustomScale = Object.prototype.hasOwnProperty.call(
    compactForwardOffsetScale,
    labelKey,
  );
  if (!hasCustomScale || isNaN(anchorX)) {
    return null;
  }
  const offsetScale = compactForwardOffsetScale[labelKey];
  const xShift = isNaN(fontSize) ? 80 : fontSize * offsetScale;
  return {
    x: String(anchorX - xShift),
  };
}

function fGetReverseCompactRightEdge(anchorEl, labelKey, geometryHint) {
  const anchorX =
    geometryHint && typeof geometryHint.x === "number"
      ? geometryHint.x
      : parseFloat(
          anchorEl && anchorEl.node ? anchorEl.node.getAttribute("x") : NaN,
        );
  const fontSize = parseFloat(
    anchorEl && anchorEl.node ? anchorEl.node.getAttribute("font-size") : NaN,
  );
  if (isNaN(anchorX)) {
    return NaN;
  }

  const hasCustomScale = Object.prototype.hasOwnProperty.call(
    compactReverseOffsetScale,
    labelKey,
  );
  const offsetScale = hasCustomScale
    ? compactReverseOffsetScale[labelKey]
    : 0.8;
  const xShift = isNaN(fontSize) ? 120 : fontSize * offsetScale;
  return anchorX + xShift;
}

function fFindNearestHighlightCircle(anchorEl, geometryHint) {
  const anchorX =
    geometryHint && typeof geometryHint.x === "number"
      ? geometryHint.x
      : parseFloat(
          anchorEl && anchorEl.node ? anchorEl.node.getAttribute("x") : NaN,
        );
  const anchorY =
    geometryHint && typeof geometryHint.y === "number"
      ? geometryHint.y
      : parseFloat(
          anchorEl && anchorEl.node ? anchorEl.node.getAttribute("y") : NaN,
        );
  if (isNaN(anchorX) || isNaN(anchorY)) {
    return null;
  }

  const circleEls = molSvg.selectAll("circle");
  let nearestCircle = null;
  let nearestDistSq = Infinity;
  for (let i = 0; i < circleEls.length; i++) {
    const circleEl = circleEls[i];
    const cx = parseFloat(circleEl.attr("cx"));
    const cy = parseFloat(circleEl.attr("cy"));
    if (isNaN(cx) || isNaN(cy)) {
      continue;
    }
    const dx = cx - anchorX;
    const dy = cy - anchorY;
    const distSq = dx * dx + dy * dy;
    if (distSq < nearestDistSq) {
      nearestDistSq = distSq;
      nearestCircle = circleEl;
    }
  }
  return nearestCircle;
}

function fGetNodeAttr(el, attrName) {
  if (!el || !el.node || !attrName) {
    return "";
  }
  return el.node.getAttribute(attrName) || "";
}

function fBuildCompactGeometryHint(anchorEl, anchorRectEl) {
  const anchorX = parseFloat(
    anchorEl && anchorEl.node ? anchorEl.node.getAttribute("x") : NaN,
  );
  const anchorY = parseFloat(
    anchorEl && anchorEl.node ? anchorEl.node.getAttribute("y") : NaN,
  );
  const hint = {
    x: anchorX,
    y: anchorY,
    fill: fGetNodeAttr(anchorEl, "fill"),
  };

  const rectX = parseFloat(
    anchorRectEl && anchorRectEl.node ? anchorRectEl.attr("x") : NaN,
  );
  const rectWidth = parseFloat(
    anchorRectEl && anchorRectEl.node ? anchorRectEl.attr("width") : NaN,
  );
  if (!isNaN(rectX) && !isNaN(rectWidth)) {
    hint.rightEdge = rectX + rectWidth;
    hint.leftEdge = rectX;
  }

  const nearestCircle = fFindNearestHighlightCircle(anchorEl, hint);
  if (nearestCircle) {
    const circleX = parseFloat(nearestCircle.attr("cx"));
    const circleRadius = parseFloat(nearestCircle.attr("r"));
    if (!isNaN(circleX) && !isNaN(circleRadius)) {
      hint.circleRightEdge = circleX + circleRadius;
      hint.circleLeftEdge = circleX - circleRadius;
    }
  }

  return hint;
}

function fCreateCompactLabelRect(anchorEl, geometryHint) {
  if (!anchorEl || !anchorEl.node || !anchorEl.node.parentNode) {
    return null;
  }

  let rectX = NaN;
  let rectY = NaN;
  let rectWidth = NaN;
  let rectHeight = NaN;
  let fill = "";
  let stroke = "";
  let strokeWidth = "";

  const nearestCircle = fFindNearestHighlightCircle(anchorEl, geometryHint);
  if (nearestCircle) {
    const cx = parseFloat(nearestCircle.attr("cx"));
    const cy = parseFloat(nearestCircle.attr("cy"));
    const r = parseFloat(nearestCircle.attr("r"));
    if (!isNaN(cx) && !isNaN(cy) && !isNaN(r)) {
      rectX = cx - r;
      rectY = cy - r;
      rectWidth = r * 2;
      rectHeight = r * 2;
      fill = fGetNodeAttr(nearestCircle, "fill");
      stroke = fGetNodeAttr(nearestCircle, "stroke");
      strokeWidth = fGetNodeAttr(nearestCircle, "stroke-width");
    }
  }

  if (isNaN(rectX) || isNaN(rectY) || isNaN(rectWidth) || isNaN(rectHeight)) {
    if (!anchorEl.node.getBBox) {
      return null;
    }
    let textBBox;
    try {
      textBBox = anchorEl.node.getBBox();
    } catch (e) {
      return null;
    }
    const hintX =
      geometryHint && typeof geometryHint.x === "number"
        ? geometryHint.x
        : null;
    const hintY =
      geometryHint && typeof geometryHint.y === "number"
        ? geometryHint.y
        : null;
    rectX =
      hintX !== null
        ? hintX - Math.max(textBBox.width + 160, 260) / 2
        : textBBox.x - 80;
    rectY =
      hintY !== null
        ? hintY - Math.max(textBBox.height + 120, 260) / 2
        : textBBox.y - 60;
    rectWidth = Math.max(textBBox.width + 160, 260);
    rectHeight = Math.max(textBBox.height + 120, 260);
    fill =
      (geometryHint && geometryHint.fill) ||
      fGetNodeAttr(anchorEl, "fill") ||
      "rgb(121,220,109)";
  }

  let rectMarkup =
    '<rect x="' +
    rectX +
    '" y="' +
    rectY +
    '" width="' +
    rectWidth +
    '" height="' +
    rectHeight +
    '"';
  if (fill) {
    rectMarkup += ' fill="' + fill + '"';
  }
  if (stroke) {
    rectMarkup += ' stroke="' + stroke + '"';
  }
  if (strokeWidth) {
    rectMarkup += ' stroke-width="' + strokeWidth + '"';
  }
  rectMarkup += "></rect>";

  let newRect;
  try {
    newRect = MuSVG.parse(rectMarkup);
  } catch (e) {
    return null;
  }

  const parentNode = anchorEl.node.parentNode;
  if (!newRect || !newRect.node || !parentNode) {
    return null;
  }
  let insertedNode = null;
  const fragmentNode = newRect.node;
  while (fragmentNode.firstChild) {
    const childNode = fragmentNode.firstChild;
    parentNode.insertBefore(childNode, anchorEl.node);
    if (!insertedNode && childNode.nodeType === 1) {
      insertedNode = childNode;
    }
  }

  return insertedNode ? MuSVG(insertedNode) : null;
}

function fResizeCompactLabelRect(
  rectEl,
  anchorEl,
  labelKey,
  reverseLabel,
  geometryHint,
) {
  if (!anchorEl) {
    return;
  }

  // Methanal may have no highlight geometry at all; never invent a filled
  // rectangle from its normal dark text colour merely to size HCHO.
  if (labelKey === "HCHO" && !rectEl && !fFindNearestHighlightCircle(anchorEl, geometryHint)) return;
  const workingRectEl =
    rectEl || fCreateCompactLabelRect(anchorEl, geometryHint);
  if (!workingRectEl) {
    return;
  }

  const rectX = parseFloat(workingRectEl.attr("x"));
  const rectWidth = parseFloat(workingRectEl.attr("width"));
  const fontSize = parseFloat(anchorEl.node.getAttribute("font-size"));
  if (isNaN(rectX) || isNaN(rectWidth)) {
    return;
  }

  const widthOverride = compactLabelWidths[labelKey];
  const labelLength = String(labelKey || "").length;
  const targetWidth =
    typeof widthOverride === "number"
      ? widthOverride
      : isNaN(fontSize)
        ? Math.max(rectWidth, 450 + labelLength * 120)
        : Math.max(rectWidth, fontSize * (labelLength * 0.9 + 0.35));

  const rectAttrs = { width: targetWidth };
  const widthDelta = targetWidth - rectWidth;
  const hasForwardScale = Object.prototype.hasOwnProperty.call(
    compactForwardOffsetScale,
    labelKey,
  );
  const forwardShift =
    hasForwardScale && !reverseLabel
      ? isNaN(fontSize)
        ? 80
        : fontSize * compactForwardOffsetScale[labelKey]
      : 0;
  const reverseTextRightEdge = reverseLabel
    ? fGetReverseCompactRightEdge(anchorEl, labelKey, geometryHint)
    : NaN;
  const circleRightEdge =
    geometryHint && typeof geometryHint.circleRightEdge === "number"
      ? geometryHint.circleRightEdge
      : NaN;
  const hintedRightEdge =
    geometryHint && typeof geometryHint.rightEdge === "number"
      ? geometryHint.rightEdge
      : NaN;
  const targetRightEdge =
    labelKey === "OHC" && !isNaN(circleRightEdge)
      ? circleRightEdge
      : !isNaN(reverseTextRightEdge)
        ? reverseTextRightEdge
        : !isNaN(circleRightEdge)
          ? circleRightEdge
          : hintedRightEdge;
  const rightEdgeAdjust = Object.prototype.hasOwnProperty.call(
    compactRectRightEdgeAdjust,
    labelKey,
  )
    ? compactRectRightEdgeAdjust[labelKey]
    : 0;
  const adjustedRightEdge = !isNaN(targetRightEdge)
    ? targetRightEdge + rightEdgeAdjust
    : targetRightEdge;
  if (typeof widthOverride === "number") {
    if (reverseLabel) {
      if (!isNaN(adjustedRightEdge)) {
        rectAttrs.x = adjustedRightEdge - targetWidth;
      } else {
        rectAttrs.x = rectX - widthDelta;
      }
    } else if (forwardShift > 0) {
      rectAttrs.x = rectX - forwardShift;
    }
  } else if (reverseLabel) {
    if (!isNaN(adjustedRightEdge)) {
      rectAttrs.x = adjustedRightEdge - targetWidth;
    } else {
      rectAttrs.x = rectX - widthDelta;
    }
  } else if (forwardShift > 0) {
    rectAttrs.x = rectX - forwardShift;
  }
  workingRectEl.attr(rectAttrs);
}

function fCollectHighlightRectsNearText(textEls) {
  const collectedRects = [];
  const seenRects = new Set();
  const rectEls = molSvg.selectAll("rect");

  for (let i = 0; i < textEls.length; i++) {
    const textEl = textEls[i];
    if (!textEl || !textEl.node || !textEl.node.getBBox) {
      continue;
    }

    let textBBox;
    try {
      textBBox = textEl.node.getBBox();
    } catch (e) {
      continue;
    }

    const padX = Math.max(textBBox.width * 0.7, 160);
    const padY = Math.max(textBBox.height * 0.6, 120);
    const minX = textBBox.x - padX;
    const maxX = textBBox.x + textBBox.width + padX;
    const minY = textBBox.y - padY;
    const maxY = textBBox.y + textBBox.height + padY;

    for (let r = 0; r < rectEls.length; r++) {
      const rectEl = rectEls[r];
      if (!rectEl || !rectEl.node) {
        continue;
      }
      if (seenRects.has(rectEl.node)) {
        continue;
      }

      const rectX = parseFloat(rectEl.attr("x"));
      const rectY = parseFloat(rectEl.attr("y"));
      const rectWidth = parseFloat(rectEl.attr("width"));
      const rectHeight = parseFloat(rectEl.attr("height"));
      if (
        isNaN(rectX) ||
        isNaN(rectY) ||
        isNaN(rectWidth) ||
        isNaN(rectHeight)
      ) {
        continue;
      }

      const rectMaxX = rectX + rectWidth;
      const rectMaxY = rectY + rectHeight;
      const overlaps =
        rectMaxX >= minX && rectX <= maxX && rectMaxY >= minY && rectY <= maxY;
      if (!overlaps) {
        continue;
      }

      seenRects.add(rectEl.node);
      collectedRects.push(rectEl);
    }
  }

  return collectedRects;
}

function fGetCompactLabelNumberX(textEl, labelKey, defaultOffsetX) {
  if (!textEl || !textEl.node || !labelKey || !textEl.node.getBBox) {
    return parseInt(textEl.attr("x")) + defaultOffsetX;
  }

  let textBBox;
  try {
    textBBox = textEl.node.getBBox();
  } catch (e) {
    return parseInt(textEl.attr("x")) + defaultOffsetX;
  }

  const labelText = String(labelKey);
  if (labelText.length === 0) {
    return parseInt(textEl.attr("x")) + defaultOffsetX;
  }

  let anchorCharIdx = labelText.indexOf("C");
  if (anchorCharIdx < 0) {
    anchorCharIdx = labelText.indexOf("N");
  }
  if (anchorCharIdx < 0) {
    return parseInt(textEl.attr("x")) + defaultOffsetX;
  }

  const anchorLeftX =
    textBBox.x + textBBox.width * (anchorCharIdx / labelText.length);
  return Math.round(anchorLeftX + defaultOffsetX);
}

function fBuildCompactAtomTspan(text, fillColor, className) {
  let tspan = `<tspan${fillColor ? ` fill="${fillColor}"` : ""}${className ? ` class="${className}"` : ""}>${text}</tspan>`;
  return tspan;
}

function fGetCompactAtomFill() {
  for (let i = 0; i < arguments.length; i++) {
    const fill = fGetNodeAttr(arguments[i], "fill");
    if (fill) {
      return fill;
    }
  }
  return "";
}

function fGetHydrogenGroupParentSymbol(atomIdx) {
  if (
    !Array.isArray(allAtomsTypeList) ||
    !Array.isArray(atomConnectivityList)
  ) {
    return "";
  }
  if (
    typeof atomIdx !== "number" ||
    atomIdx < 0 ||
    allAtomsTypeList[atomIdx] !== "H"
  ) {
    return "";
  }
  if (!Array.isArray(atomConnectivityList[atomIdx])) {
    return "";
  }

  for (let i = 0; i < atomConnectivityList[atomIdx].length; i++) {
    const neighborIdx = atomConnectivityList[atomIdx][i];
    const neighborSymbol = allAtomsTypeList[neighborIdx];
    if (neighborSymbol === "O" || neighborSymbol === "N") {
      return neighborSymbol;
    }
  }

  return "";
}

function fGetAtomColor2D(symbol, colorContext) {
  if (!symbol || !atomColors2D) {
    return "";
  }
  const baseFill = Object.prototype.hasOwnProperty.call(atomColors2D, symbol)
    ? atomColors2D[symbol]
    : "";
  if (!baseFill) {
    return "";
  }

  if (symbol !== "H" || atomColorMode2D !== "group") {
    return baseFill;
  }

  const parentSymbol =
    colorContext && colorContext.parentSymbol ? colorContext.parentSymbol : "";
  if (parentSymbol === "O" || parentSymbol === "N") {
    return atomColors2D[parentSymbol] || baseFill;
  }

  const atomIdx =
    colorContext && typeof colorContext.atomIdx === "number"
      ? colorContext.atomIdx
      : -1;
  const attachedParentSymbol = fGetHydrogenGroupParentSymbol(atomIdx);
  if (attachedParentSymbol === "O" || attachedParentSymbol === "N") {
    return atomColors2D[attachedParentSymbol] || baseFill;
  }

  return baseFill;
}

function fGetDisplayAtomFill(symbol) {
  let colorContext = null;
  let fallbackStartIdx = 1;
  if (
    arguments.length > 1 &&
    arguments[1] &&
    typeof arguments[1] === "object" &&
    (Object.prototype.hasOwnProperty.call(arguments[1], "parentSymbol") ||
      Object.prototype.hasOwnProperty.call(arguments[1], "atomIdx"))
  ) {
    colorContext = arguments[1];
    fallbackStartIdx = 2;
  }

  if (svgAtomColors2DFlag) {
    const mappedFill = fGetAtomColor2D(symbol, colorContext);
    if (mappedFill) {
      return mappedFill;
    }
  }

  const fallbackEls = [];
  for (let i = fallbackStartIdx; i < arguments.length; i++) {
    fallbackEls.push(arguments[i]);
  }

  return fGetCompactAtomFill.apply(null, fallbackEls);
}

function fGetOwnTextFromSvgNode(node) {
  if (!node || !node.childNodes) {
    return "";
  }
  let ownText = "";
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (child.nodeType === 3) {
      ownText += child.nodeValue || "";
    }
  }
  return ownText.trim();
}

function fResolveAtomSymbolFromLabelNode(node) {
  if (!node) {
    return "";
  }
  if (node.classList && node.classList.contains("svgHydrogenPart")) {
    return "H";
  }
  const rawText = fGetOwnTextFromSvgNode(node);
  if (!rawText) {
    return "";
  }
  const symbolMatch = rawText.match(/^([A-Z][a-z]?)/);
  if (!symbolMatch) {
    return "";
  }
  const symbol = symbolMatch[1];
  return Object.prototype.hasOwnProperty.call(atomColors2D, symbol)
    ? symbol
    : "";
}

function fResolveParentSymbolForHydrogenTspan(tspanNode, fallbackParentSymbol) {
  if (!tspanNode || !tspanNode.parentElement) {
    return fallbackParentSymbol && fallbackParentSymbol !== "H"
      ? fallbackParentSymbol
      : "";
  }

  const className = String(tspanNode.getAttribute("class") || "");
  if (className.indexOf("svgOxygenAttachedHydrogen") !== -1) {
    return "O";
  }
  if (className.indexOf("svgCarbonAttachedHydrogen") !== -1) {
    return "C";
  }

  const siblingSpans = [];
  for (let i = 0; i < tspanNode.parentElement.childNodes.length; i++) {
    const child = tspanNode.parentElement.childNodes[i];
    if (!child || child.nodeType !== 1) {
      continue;
    }
    if (String(child.nodeName).toLowerCase() !== "tspan") {
      continue;
    }
    siblingSpans.push(child);
  }

  for (let i = 0; i < siblingSpans.length; i++) {
    const sibling = siblingSpans[i];
    if (sibling === tspanNode) {
      continue;
    }
    const siblingSymbol = fResolveAtomSymbolFromLabelNode(sibling);
    if (siblingSymbol && siblingSymbol !== "H") {
      return siblingSymbol;
    }
  }

  return fallbackParentSymbol && fallbackParentSymbol !== "H"
    ? fallbackParentSymbol
    : "";
}

function fBuildTextNodeAtomIndexMap() {
  const textNodeAtomIndexMap = new Map();
  if (!molSvg || !Array.isArray(allAtomsTypeList) || mode2D === "condensed") {
    return textNodeAtomIndexMap;
  }

  const atomTextMap = fGetRenderedAtomTextMap(true, true);
  for (const atomIdxKey in atomTextMap) {
    const atomTextEl = atomTextMap[atomIdxKey];
    if (!atomTextEl || !atomTextEl.node) {
      continue;
    }
    textNodeAtomIndexMap.set(atomTextEl.node, parseInt(atomIdxKey, 10));
  }

  return textNodeAtomIndexMap;
}

function fIsHighlightFillColor(fillValue) {
  if (!fillValue || typeof fillValue !== "string") {
    return false;
  }
  const normalized = fillValue.replace(/\s+/g, "").toLowerCase();
  if (normalized.indexOf("79dc6d") !== -1) {
    return true;
  }
  if (normalized.indexOf("121,220,109") !== -1) {
    return true;
  }
  return false;
}

function fBuildHighlightedTextNodeSet() {
  if (!molSvg) {
    return new Set();
  }

  const highlightedTextNodes = new Set();
  const highlightRects = [];
  const highlightCircles = [];

  const rectEls = molSvg.selectAll("rect");
  for (let i = 0; i < rectEls.length; i++) {
    const rectEl = rectEls[i];
    if (!rectEl || !rectEl.node) {
      continue;
    }
    const fillValue = String(rectEl.node.getAttribute("fill") || "");
    if (!fIsHighlightFillColor(fillValue)) {
      continue;
    }

    const x = parseFloat(rectEl.node.getAttribute("x"));
    const y = parseFloat(rectEl.node.getAttribute("y"));
    const width = parseFloat(rectEl.node.getAttribute("width"));
    const height = parseFloat(rectEl.node.getAttribute("height"));
    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
      continue;
    }
    highlightRects.push({ x: x, y: y, width: width, height: height });
  }

  const circleEls = molSvg.selectAll("circle");
  for (let i = 0; i < circleEls.length; i++) {
    const circleEl = circleEls[i];
    if (!circleEl || !circleEl.node) {
      continue;
    }
    const fillValue = String(circleEl.node.getAttribute("fill") || "");
    if (!fIsHighlightFillColor(fillValue)) {
      continue;
    }

    const cx = parseFloat(circleEl.node.getAttribute("cx"));
    const cy = parseFloat(circleEl.node.getAttribute("cy"));
    const r = parseFloat(circleEl.node.getAttribute("r"));
    if (isNaN(cx) || isNaN(cy) || isNaN(r)) {
      continue;
    }
    highlightCircles.push({ cx: cx, cy: cy, r: r });
  }

  if (highlightRects.length === 0 && highlightCircles.length === 0) {
    return highlightedTextNodes;
  }

  const textEls = molSvg.selectAll("text");
  for (let i = 0; i < textEls.length; i++) {
    const textEl = textEls[i];
    if (!textEl || !textEl.node) {
      continue;
    }

    const textId = String(fGetNodeAttr(textEl, "id") || "");
    if (textId.indexOf("number") === 0) {
      continue;
    }

    const textX = parseFloat(textEl.node.getAttribute("x"));
    const textY = parseFloat(textEl.node.getAttribute("y"));
    if (isNaN(textX) || isNaN(textY)) {
      continue;
    }

    let isHighlighted = false;

    for (let r = 0; r < highlightRects.length; r++) {
      const rect = highlightRects[r];
      if (
        textX >= rect.x &&
        textX <= rect.x + rect.width &&
        textY >= rect.y &&
        textY <= rect.y + rect.height
      ) {
        isHighlighted = true;
        break;
      }
    }

    if (!isHighlighted) {
      for (let c = 0; c < highlightCircles.length; c++) {
        const circle = highlightCircles[c];
        const dx = textX - circle.cx;
        const dy = textY - circle.cy;
        if (dx * dx + dy * dy <= circle.r * circle.r) {
          isHighlighted = true;
          break;
        }
      }
    }

    if (isHighlighted) {
      highlightedTextNodes.add(textEl.node);
    }
  }

  return highlightedTextNodes;
}

function fApplyAtomColors2DToSVGLabels() {
  if (!svgAtomColors2DFlag || !molSvg) {
    return;
  }

  const highlightedTextNodes = fBuildHighlightedTextNodeSet();
  const textNodeAtomIndexMap = fBuildTextNodeAtomIndexMap();

  const textEls = molSvg.selectAll("text");
  for (let i = 0; i < textEls.length; i++) {
    const textEl = textEls[i];
    if (!textEl || !textEl.node) {
      continue;
    }

    const textId = String(fGetNodeAttr(textEl, "id") || "");
    if (textId.indexOf("number") === 0) {
      continue;
    }

    const tspanNodes = textEl.node.querySelectorAll("tspan");
    if (highlightedTextNodes.has(textEl.node)) {
      textEl.attr({ fill: "#000" });
      for (let t = 0; t < tspanNodes.length; t++) {
        tspanNodes[t].setAttribute("fill", "#000");
      }
      continue;
    }

    if (tspanNodes.length === 0) {
      const symbol = fResolveAtomSymbolFromLabelNode(textEl.node);
      const mappedFill = symbol
        ? fGetAtomColor2D(symbol, {
            atomIdx: textNodeAtomIndexMap.has(textEl.node)
              ? textNodeAtomIndexMap.get(textEl.node)
              : -1,
            parentSymbol: symbol,
          })
        : "";
      if (mappedFill) {
        textEl.attr({ fill: mappedFill });
      }
      continue;
    }

    const parentSymbol = fResolveAtomSymbolFromLabelNode(textEl.node);
    const parentAtomIdx = textNodeAtomIndexMap.has(textEl.node)
      ? textNodeAtomIndexMap.get(textEl.node)
      : -1;
    for (let t = 0; t < tspanNodes.length; t++) {
      const tspanNode = tspanNodes[t];
      const symbol = fResolveAtomSymbolFromLabelNode(tspanNode);
      if (!symbol) {
        continue;
      }

      const effectiveParentSymbol =
        symbol === "H"
          ? fResolveParentSymbolForHydrogenTspan(tspanNode, parentSymbol)
          : parentSymbol;

      const mappedFill = fGetAtomColor2D(symbol, {
        atomIdx: parentAtomIdx,
        parentSymbol: effectiveParentSymbol,
      });
      if (mappedFill) {
        tspanNode.setAttribute("fill", mappedFill);
      }
    }
  }
}

// Grey C–H bonds in expanded mode when colored symbols are on, matching the
// grey H labels (atomColors2D.H). Display-only base coat inside fUpdateSVG:
// fresh JSME SVG lines are black, so toggle-off needs no reset; green
// highlight backgrounds are separate attributes and win where applied.
function fApplyCHBondColors2D() {
  if (!svgAtomColors2DFlag || !molSvg) {
    return;
  }
  if (mode2D !== "expanded") {
    return;
  }
  if (typeof bondList === "undefined" || typeof allAtomsTypeList === "undefined" ||
      typeof svgBondList === "undefined" || !atomColors2D || !atomColors2D.H) {
    return;
  }
  const lineEls = molSvg.selectAll("line");
  if (!lineEls || lineEls.length === 0) {
    return;
  }
  for (let b = 0; b < bondList.length; b++) {
    if (!bondList[b]) {
      continue;
    }
    const a1 = bondList[b][0]; // 1-based
    const a2 = bondList[b][1]; // 1-based
    const t1 = allAtomsTypeList[a1 - 1];
    const t2 = allAtomsTypeList[a2 - 1];
    if (!((t1 === "C" && t2 === "H") || (t1 === "H" && t2 === "C"))) {
      continue;
    }
    const lineStart = svgBondList[b];
    const lineCount = bondList[b][2] || 1;
    for (let offset = 0; offset < lineCount; offset++) {
      const lineEl = lineEls[lineStart + offset - 1];
      if (lineEl) {
        lineEl.attr({ stroke: atomColors2D.H });
      }
    }
  }
}

function fShouldReverseAldehydeLabel(
  anchorEl,
  oxygenEl,
  anchorIdx,
  oxygenIdx,
  atomTextMap,
) {
  if (!anchorEl || !oxygenEl) {
    return false;
  }

  const anchorX = parseFloat(anchorEl.node.getAttribute("x"));
  const oxygenX = parseFloat(oxygenEl.node.getAttribute("x"));
  if (!isNaN(anchorX) && !isNaN(oxygenX)) {
    const oxygenDx = oxygenX - anchorX;
    if (Math.abs(oxygenDx) > 30) {
      return oxygenDx < 0;
    }
  }

  if (!Array.isArray(atomConnectivityList[anchorIdx])) {
    return false;
  }
  for (let i = 0; i < atomConnectivityList[anchorIdx].length; i++) {
    const neighborIdx = atomConnectivityList[anchorIdx][i];
    if (neighborIdx === oxygenIdx) {
      continue;
    }
    const neighborEl = atomTextMap[neighborIdx];
    if (!neighborEl) {
      continue;
    }
    const neighborX = parseFloat(neighborEl.node.getAttribute("x"));
    if (isNaN(anchorX) || isNaN(neighborX)) {
      continue;
    }
    // The aldehyde H sits opposite the carbon-chain neighbor.
    return neighborX > anchorX;
  }

  return false;
}

function fCompactFunctionalGroups2D() {
  if (!functionalGroupObj) {
    return;
  }

  const atomTextMap = fGetRenderedAtomTextMap(true, true);
  const atomRectMap = fGetRenderedAtomRectMap(true, true);
  const textElsToRemove = [];
  const rectElsToRemove = [];
  const bondsToRemove = [];
  const replacements = [];

  if (functionalGroupObj.hasOwnProperty("carboxylicAcid")) {
    const acidEntries = functionalGroupObj.carboxylicAcid.O || [];
    for (let i = 0; i < acidEntries.length; i++) {
      const entry = acidEntries[i];
      if (!Array.isArray(entry) || entry.length < 2) {
        continue;
      }
      const ohIdx = entry[0];
      const carbonylOIdx = entry[1];
      const anchorIdx = Array.isArray(atomConnectivityList[ohIdx])
        ? atomConnectivityList[ohIdx][0]
        : -1;
      if (anchorIdx < 0) {
        continue;
      }

      const anchorEl = atomTextMap[anchorIdx];
      const ohEl = atomTextMap[ohIdx];
      const carbonylOEl = atomTextMap[carbonylOIdx];
      if (!anchorEl || !ohEl || !carbonylOEl) {
        continue;
      }

      const anchorRectEl = atomRectMap[anchorIdx];
      const ohRectEl = atomRectMap[ohIdx];
      const carbonylORectEl = atomRectMap[carbonylOIdx];

      textElsToRemove.push(ohEl, carbonylOEl);
      rectElsToRemove.push(ohRectEl, carbonylORectEl);
      const ohHydrogens = fGetAttachedHydrogenIndices(ohIdx);
      for (let hIdx = 0; hIdx < ohHydrogens.length; hIdx++) {
        const hydrogenAtomIdx = ohHydrogens[hIdx];
        const hydrogenEl = atomTextMap[hydrogenAtomIdx];
        const hydrogenRectEl = atomRectMap[hydrogenAtomIdx];
        if (hydrogenEl) {
          textElsToRemove.push(hydrogenEl);
        }
        if (hydrogenRectEl) {
          rectElsToRemove.push(hydrogenRectEl);
        }
        const hydrogenBondIdx = fFindBondIndexByAtoms(ohIdx, hydrogenAtomIdx);
        if (hydrogenBondIdx >= 0) {
          bondsToRemove.push(hydrogenBondIdx);
        }
      }
      bondsToRemove.push(
        fFindBondIndexByAtoms(anchorIdx, ohIdx),
        fFindBondIndexByAtoms(anchorIdx, carbonylOIdx),
      );
      const anchorNeighbors = Array.isArray(atomConnectivityList[anchorIdx])
        ? atomConnectivityList[anchorIdx]
        : [];
      let carbonNeighborCount = 0;
      for (let n = 0; n < anchorNeighbors.length; n++) {
        if (allAtomsTypeList[anchorNeighbors[n]] === "C") {
          carbonNeighborCount += 1;
        }
      }
      const isFormicAcid =
        carbonNeighborCount === 0 && carbonHydrogens[anchorIdx] === 1;
      const reverseAcid = isFormicAcid
        ? false
        : fShouldReverseCompactLabel(anchorEl, [ohEl, carbonylOEl]);
      const acidLabelKey = isFormicAcid
        ? "HCOOH"
        : reverseAcid
          ? "HOOC"
          : "COOH";
      const acidOFill = fGetDisplayAtomFill("O", carbonylOEl, ohEl, anchorEl);
      const acidMarkup = isFormicAcid
        ? fBuildCompactAtomTspan(
            "H",
            null,
            "svgHydrogenPart svgCarbonAttachedHydrogen",
          ) +
          fBuildCompactAtomTspan("C") +
          fBuildCompactAtomTspan("O", acidOFill) +
          fBuildCompactAtomTspan("O", acidOFill) +
          fBuildCompactAtomTspan(
            "H",
            null,
            "svgHydrogenPart svgOxygenAttachedHydrogen",
          )
        : reverseAcid
          ? fBuildCompactAtomTspan(
              "H",
              null,
              "svgHydrogenPart svgOxygenAttachedHydrogen",
            ) +
            fBuildCompactAtomTspan("O", acidOFill) +
            fBuildCompactAtomTspan("O", acidOFill) +
            fBuildCompactAtomTspan("C")
          : fBuildCompactAtomTspan("C") +
            fBuildCompactAtomTspan("O", acidOFill) +
            fBuildCompactAtomTspan("O", acidOFill) +
            fBuildCompactAtomTspan(
              "H",
              null,
              "svgHydrogenPart svgOxygenAttachedHydrogen",
            );
      const acidAttrs = reverseAcid
        ? fGetReversedCompactLabelAttrs(anchorEl, "HOOC")
        : fGetForwardCompactLabelAttrs(anchorEl, acidLabelKey);
      replacements.push({
        anchorIdx: anchorIdx,
        el: anchorEl,
        markup: acidMarkup,
        attrs: acidAttrs,
        rectEl: anchorRectEl,
        labelKey: acidLabelKey,
        reverseLabel: reverseAcid,
        geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
      });
    }
  }

  if (functionalGroupObj.hasOwnProperty("aldehyde")) {
    const aldehydeEntries = functionalGroupObj.aldehyde.O || [];
    for (let i = 0; i < aldehydeEntries.length; i++) {
      const oxygenIdx = aldehydeEntries[i];
      const anchorIdx = Array.isArray(atomConnectivityList[oxygenIdx])
        ? atomConnectivityList[oxygenIdx][0]
        : -1;
      if (anchorIdx < 0) {
        continue;
      }

      // Methanal has only O as a heavy neighbour: retain BOTH H in HCHO.
      const carbonNeighbours = atomConnectivityList[anchorIdx] || [];
      const isMethanal = carbonNeighbours.length === 1 && atomValenceList[anchorIdx] === 2 && allAtomsTypeList[carbonNeighbours[0]] === "O";
      if (!isMethanal && !carbonNeighbours.some(n => allAtomsTypeList[n] === "C")) continue;
      const anchorEl = atomTextMap[anchorIdx];
      const oxygenEl = atomTextMap[oxygenIdx];
      if (!anchorEl || !oxygenEl) {
        continue;
      }

      const anchorRectEl = atomRectMap[anchorIdx];
      const oxygenRectEl = atomRectMap[oxygenIdx];

      textElsToRemove.push(oxygenEl);
      rectElsToRemove.push(oxygenRectEl);
      const anchorHydrogens = fGetAttachedHydrogenIndices(anchorIdx);
      for (let hIdx = 0; hIdx < anchorHydrogens.length; hIdx++) {
        const hydrogenAtomIdx = anchorHydrogens[hIdx];
        const hydrogenEl = atomTextMap[hydrogenAtomIdx];
        const hydrogenRectEl = atomRectMap[hydrogenAtomIdx];
        if (hydrogenEl) {
          textElsToRemove.push(hydrogenEl);
        }
        if (hydrogenRectEl) {
          rectElsToRemove.push(hydrogenRectEl);
        }
        const hydrogenBondIdx = fFindBondIndexByAtoms(
          anchorIdx,
          hydrogenAtomIdx,
        );
        if (hydrogenBondIdx >= 0) {
          bondsToRemove.push(hydrogenBondIdx);
        }
      }
      bondsToRemove.push(fFindBondIndexByAtoms(anchorIdx, oxygenIdx));
      const reverseAldehyde = !isMethanal && fShouldReverseAldehydeLabel(
        anchorEl,
        oxygenEl,
        anchorIdx,
        oxygenIdx,
        atomTextMap,
      );
      const aldehydeOFill = fGetDisplayAtomFill("O", oxygenEl, anchorEl);
      const aldehydeMarkup = isMethanal
        ? fBuildCompactAtomTspan("H", null, "svgHydrogenPart svgCarbonAttachedHydrogen") +
          fBuildCompactAtomTspan("C") +
          fBuildCompactAtomTspan("H", null, "svgHydrogenPart svgCarbonAttachedHydrogen") +
          fBuildCompactAtomTspan("O", aldehydeOFill)
        : reverseAldehyde
        ? fBuildCompactAtomTspan("O", aldehydeOFill) +
          fBuildCompactAtomTspan(
            "H",
            null,
            "svgHydrogenPart svgCarbonAttachedHydrogen",
          ) +
          fBuildCompactAtomTspan("C")
        : fBuildCompactAtomTspan("C") +
          fBuildCompactAtomTspan(
            "H",
            null,
            "svgHydrogenPart svgCarbonAttachedHydrogen",
          ) +
          fBuildCompactAtomTspan("O", aldehydeOFill);
      replacements.push({
        anchorIdx: anchorIdx,
        el: anchorEl,
        markup: aldehydeMarkup,
        attrs: isMethanal
          ? fGetForwardCompactLabelAttrs(anchorEl, "HCHO")
          : reverseAldehyde
          ? fGetReversedCompactLabelAttrs(anchorEl, "OHC")
          : null,
        rectEl: anchorRectEl,
        labelKey: isMethanal ? "HCHO" : reverseAldehyde ? "OHC" : "CHO",
        reverseLabel: reverseAldehyde,
        geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
      });
    }
  }

  if (functionalGroupObj.hasOwnProperty("cyanide")) {
    const cyanideEntries = functionalGroupObj.cyanide.N || [];
    for (let i = 0; i < cyanideEntries.length; i++) {
      const nitrogenIdx = cyanideEntries[i];
      const anchorIdx = Array.isArray(atomConnectivityList[nitrogenIdx])
        ? atomConnectivityList[nitrogenIdx][0]
        : -1;
      if (anchorIdx < 0) {
        continue;
      }

      const anchorEl = atomTextMap[anchorIdx];
      const nitrogenEl = atomTextMap[nitrogenIdx];
      if (!anchorEl || !nitrogenEl) {
        continue;
      }

      const anchorRectEl = atomRectMap[anchorIdx];
      const nitrogenRectEl = atomRectMap[nitrogenIdx];
      textElsToRemove.push(nitrogenEl);
      rectElsToRemove.push(nitrogenRectEl);
      bondsToRemove.push(fFindBondIndexByAtoms(anchorIdx, nitrogenIdx));

      const reverseCyanide = fShouldReverseCompactLabel(anchorEl, [nitrogenEl]);
      const nitrogenFill = fGetDisplayAtomFill("N", nitrogenEl, anchorEl);
      const cyanideMarkup = reverseCyanide
        ? fBuildCompactAtomTspan("N", nitrogenFill) +
          fBuildCompactAtomTspan("C")
        : fBuildCompactAtomTspan("C") +
          fBuildCompactAtomTspan("N", nitrogenFill);

      replacements.push({
        anchorIdx: anchorIdx,
        el: anchorEl,
        markup: cyanideMarkup,
        attrs: reverseCyanide
          ? fGetReversedCompactLabelAttrs(anchorEl, "NC")
          : null,
        rectEl: anchorRectEl,
        labelKey: reverseCyanide ? "NC" : "CN",
        reverseLabel: reverseCyanide,
        geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
      });
    }
  }

  if (functionalGroupObj.hasOwnProperty("nitro")) {
    const nitroEntries = functionalGroupObj.nitro.N || [];
    for (let i = 0; i < nitroEntries.length; i++) {
      const nitrogenIdx = nitroEntries[i];
      if (!Array.isArray(atomConnectivityList[nitrogenIdx])) {
        continue;
      }

      const oxygenIndices = [];
      for (let n = 0; n < atomConnectivityList[nitrogenIdx].length; n++) {
        const neighborIdx = atomConnectivityList[nitrogenIdx][n];
        const neighborEl = allAtomsTypeList[neighborIdx];
        if (neighborEl === "O") {
          oxygenIndices.push(neighborIdx);
        }
      }
      if (oxygenIndices.length < 2) {
        continue;
      }

      const anchorIdx = nitrogenIdx;

      const anchorEl = atomTextMap[anchorIdx];
      const oxygenEl1 = atomTextMap[oxygenIndices[0]];
      const oxygenEl2 = atomTextMap[oxygenIndices[1]];
      if (!anchorEl || !oxygenEl1 || !oxygenEl2) {
        continue;
      }

      const anchorRectEl = atomRectMap[anchorIdx];
      const oxygenRectEl1 = atomRectMap[oxygenIndices[0]];
      const oxygenRectEl2 = atomRectMap[oxygenIndices[1]];
      textElsToRemove.push(oxygenEl1, oxygenEl2);
      rectElsToRemove.push(oxygenRectEl1, oxygenRectEl2);

      for (let o = 0; o < oxygenIndices.length; o++) {
        bondsToRemove.push(
          fFindBondIndexByAtoms(nitrogenIdx, oxygenIndices[o]),
        );
      }

      const reverseNitro = fShouldReverseCompactLabel(anchorEl, [
        oxygenEl1,
        oxygenEl2,
      ]);
      const oxygenFill = fGetDisplayAtomFill(
        "O",
        oxygenEl1,
        oxygenEl2,
        anchorEl,
      );
      const nitrogenFill = fGetDisplayAtomFill("N", anchorEl);
      const nitroMarkup = reverseNitro
        ? fBuildCompactAtomTspan("O", oxygenFill) +
          `<tspan dy="70" font-size=".8em"${oxygenFill ? ` fill="${oxygenFill}"` : ""}>2</tspan>` +
          `<tspan dy="-70"${nitrogenFill ? ` fill="${nitrogenFill}"` : ""}>N</tspan>`
        : fBuildCompactAtomTspan("N", nitrogenFill) +
          fBuildCompactAtomTspan("O", oxygenFill) +
          `<tspan dy="70" font-size=".8em"${oxygenFill ? ` fill="${oxygenFill}"` : ""}>2</tspan>`;

      replacements.push({
        anchorIdx: anchorIdx,
        el: anchorEl,
        markup: nitroMarkup,
        attrs: reverseNitro
          ? fGetReversedCompactLabelAttrs(anchorEl, "O2N")
          : null,
        rectEl: anchorRectEl,
        labelKey: reverseNitro ? "O2N" : "NO2",
        reverseLabel: reverseNitro,
        geometryHint: fBuildCompactGeometryHint(anchorEl, anchorRectEl),
      });
    }
  }

  const lineEls = molSvg.selectAll("line");
  for (let i = 0; i < bondsToRemove.length; i++) {
    fRemoveBondLinesByBondIndex(bondsToRemove[i], lineEls);
  }

  const nearbyRectEls = fCollectHighlightRectsNearText(textElsToRemove);
  for (let i = 0; i < nearbyRectEls.length; i++) {
    rectElsToRemove.push(nearbyRectEls[i]);
  }

  for (let i = 0; i < textElsToRemove.length; i++) {
    if (textElsToRemove[i]) {
      textElsToRemove[i].remove();
    }
  }

  for (let i = 0; i < rectElsToRemove.length; i++) {
    if (rectElsToRemove[i]) {
      rectElsToRemove[i].remove();
    }
  }

  for (let i = 0; i < replacements.length; i++) {
    const newTextEl = fReplaceTextElementMarkup(
      replacements[i].el,
      replacements[i].markup,
      replacements[i].attrs,
    );
    const rectEl =
      replacements[i].rectEl &&
      replacements[i].rectEl.node &&
      replacements[i].rectEl.node.parentNode
        ? replacements[i].rectEl
        : null;
    fResizeCompactLabelRect(
      rectEl,
      newTextEl,
      replacements[i].labelKey,
      replacements[i].reverseLabel,
      replacements[i].geometryHint,
    );
    if (newTextEl && replacements[i].anchorIdx >= 0) {
      compactNumberingLabelMap[replacements[i].anchorIdx] =
        replacements[i].labelKey;
    }
  }
}

// ── fMarkExpandedHydrogens ───────────────────────────────────────────────

function fWrapStandaloneHydrogenTextsAsTspan() {
  if (!molSvg) {
    return;
  }

  const textEls = molSvg.selectAll("text");
  for (let i = 0; i < textEls.length; i++) {
    const textEl = textEls[i];
    if (!textEl || !textEl.node) {
      continue;
    }
    if (textEl.node.children && textEl.node.children.length > 0) {
      continue;
    }

    const rawText = String(textEl.node.textContent || "").trim();

    if (rawText === "OH") {
      const oxygenFill = fGetDisplayAtomFill("O", textEl);
      const hydrogenFill = fGetDisplayAtomFill(
        "H",
        { parentSymbol: "O" },
        textEl,
      );
      fReplaceTextElementMarkup(
        textEl,
        `<tspan${oxygenFill ? ` fill="${oxygenFill}"` : ""}>O</tspan><tspan class="svgHydrogenPart"${hydrogenFill ? ` fill="${hydrogenFill}"` : ""}>H</tspan>`,
      );
      continue;
    }

    if (rawText === "HO" || rawText === "HO-") {
      const hydrogenFill = fGetDisplayAtomFill(
        "H",
        { parentSymbol: "O" },
        textEl,
      );
      const oxygenFill = fGetDisplayAtomFill("O", textEl);
      let markup =
        `<tspan class="svgHydrogenPart"${hydrogenFill ? ` fill="${hydrogenFill}"` : ""}>H</tspan>` +
        `<tspan${oxygenFill ? ` fill="${oxygenFill}"` : ""}>O</tspan>`;
      if (rawText === "HO-") {
        markup += `<tspan>-</tspan>`;
      }
      fReplaceTextElementMarkup(textEl, markup);
      continue;
    }

    if (rawText !== "H") {
      continue;
    }

    const existingClass = fGetNodeAttr(textEl, "class");
    const classOverride = existingClass
      ? existingClass.indexOf("svgHydrogenPart") === -1
        ? existingClass + " svgHydrogenPart"
        : existingClass
      : "svgHydrogenPart";
    const hydrogenFill = fGetDisplayAtomFill("H", textEl);

    fReplaceTextElementMarkup(
      textEl,
      `<tspan class="svgHydrogenPart"${hydrogenFill ? ` fill="${hydrogenFill}"` : ""}>H</tspan>`,
      { class: classOverride },
    );
  }
}

function fMarkExpandedHydrogens() {
  fWrapStandaloneHydrogenTextsAsTspan();
}

// ── fMolHasSpCarbon ────────────────────────────────────────────────────────
// True when the parsed 2D structure contains at least one sp-hybridised
// carbon: a carbon in a triple bond (C≡C or C≡N) or in cumulated double bonds
// (C=C=C, allene). Reads the core bond graph (bondList entries are
// [atom1, atom2, order] with 1-based atoms into allAtomsTypeList). No
// molecule selected or no analysed graph → false.

function fMolHasSpCarbon() {
  if (
    !selectedMol ||
    !Array.isArray(bondList) ||
    !Array.isArray(allAtomsTypeList)
  ) {
    return false;
  }
  const ccDoubleCount = {};
  for (let i = 0; i < bondList.length; i++) {
    const bond = bondList[i];
    if (!bond) continue;
    const atom1 = bond[0];
    const atom2 = bond[1];
    const order = bond[2];
    if (order === 3) {
      if (
        allAtomsTypeList[atom1 - 1] === "C" ||
        allAtomsTypeList[atom2 - 1] === "C"
      ) {
        return true;
      }
    } else if (order === 2) {
      if (
        allAtomsTypeList[atom1 - 1] === "C" &&
        allAtomsTypeList[atom2 - 1] === "C"
      ) {
        ccDoubleCount[atom1] = (ccDoubleCount[atom1] || 0) + 1;
        ccDoubleCount[atom2] = (ccDoubleCount[atom2] || 0) + 1;
      }
    }
  }
  for (const atomIdx in ccDoubleCount) {
    if (ccDoubleCount[atomIdx] >= 2) {
      return true;
    }
  }
  return false;
}

// ── fHideSkeletalSpCarbons ─────────────────────────────────────────────────
// In pure skeletal mode sp carbons are drawn as C labels with rounded
// backplates that mask the bond lines. Remove the paired label and backplate
// for any molecule carrying an sp carbon (alkynes, enynes, yne-carbonyls,
// nitriles, allenes); bonds, highlights and numbering stay intact.

function fHideSkeletalSpCarbons() {
  if (mode2D !== "skeletal" || !fMolHasSpCarbon()) {
    return;
  }
  const svg = document.querySelector("#jsmeNomeclatureSVG svg");
  if (!svg) {
    return;
  }
  svg.querySelectorAll("text").forEach(function (label) {
    if (label.textContent.trim() !== "C") {
      return;
    }
    const backplate = label.previousElementSibling;
    if (
      backplate &&
      backplate.localName === "rect" &&
      backplate.hasAttribute("rx")
    ) {
      backplate.remove();
    }
    label.remove();
  });
}

// ── fUpdateSVG ────────────────────────────────────────────────────────────

function fUpdateSVG() {
  if (!jsmeNomeclatureApplet) return;
  compactNumberingLabelMap = {};
  let mySVG = jsmeNomeclatureApplet.getMolecularAreaGraphicsString();
  // Fix JSME highlight malformation BEFORE HTML parsing
  // Bug 1: fill/stroke attributes corrupted for all highlighted atoms
  mySVG = mySVG.replace(
    /fill="([^"]*?) stroke=" ([^"]*)"="" stroke-width="([^"]*)"/g,
    'fill="$1" stroke="$2" stroke-width="$3"',
  );
  // Bug 2 (N-type: stroke-width absorbs atom label via literal >) is NOT sanitised
  // here — the absorbed content may contain double-quoted tspan attributes (e.g.
  // font-size="80%") which break any [^"]* regex on the raw string.  The DOM
  // representation leaves the stray '>' inside the attribute value, which
  // patchtheNitrogen detects via getAttribute('stroke-width').indexOf('>').
  $("#jsmeNomeclatureSVG").html(mySVG);
  if (mode2D == "condensed" || mode2D == "condensedZigZag") {
    fAddHydrogens2SVG();
  }
  molSvg = MuSVG("#jsmeNomeclatureSVG svg");
  if (!molSvg) {
    return; // empty SVG (molecule with missing representation): nothing to post-process
  }
  const jsmeLogo = molSvg.select("polygon:last-of-type");
  if (jsmeLogo) {
    jsmeLogo.remove();
  }
  if (mode2D === "expanded") {
    fMarkExpandedHydrogens();
  }
  if (mode2D === "condensed") {
    fCompactFunctionalGroups2D();
  }
  fHideSkeletalSpCarbons();
  patchtheNitrogen();
  fWrapStandaloneHydrogenTextsAsTspan();
  fApplyAtomColors2DToSVGLabels();
  fApplyCHBondColors2D();
  $("#jsmeNomeclatureSVG").toggleClass(
    "svgAtomsColorized",
    svgAtomColors2DFlag,
  );
}

// ── patchtheNitrogen ──────────────────────────────────────────────────────

function patchtheNitrogen() {
  if (!functionalGroupObj || !molSvg) {
    return;
  }

  ////// NH2 special case PATCH //////
  if (functionalGroupObj.hasOwnProperty("amine")) {
    molSvg.selectAll("text").forEach(function (el) {
      var labelText = String(el.attr("text") || "").trim();
      var rawText = (el.node.textContent || "").replace(/\s+/g, "");
      // JSME Bug 2: stroke-width absorbed the label → DOM value contains '>'
      var swAttr = el.node.getAttribute("stroke-width") || "";
      var hasBug2 = swAttr.indexOf(">") !== -1;
      var isTarget =
        labelText === "2" || rawText === "2" || rawText === "NH2" || hasBug2;
      if (!isTarget) {
        return;
      }
      // Rebuild from scratch — only use clean positional/style attributes.
      // Do NOT use el.toString(): it carries the malformed stroke-width into
      // the string, so the boundary regex matches inside the attribute value.
      var x = el.node.getAttribute("x");
      var y = el.node.getAttribute("y");
      if (!x || !y) {
        return;
      }
      var fontSize = el.node.getAttribute("font-size");
      var textAnchor = el.node.getAttribute("text-anchor");
      var fill = fGetDisplayAtomFill("N", el);
      var stroke = el.node.getAttribute("stroke");
      var strokeW = swAttr.replace(/>[\s\S]*$/, ""); // "11px>NH2" → "11px"
      var attrs = `x="${x}" y="${y}"`;
      if (fontSize) {
        attrs += ` font-size="${fontSize}"`;
      }
      if (textAnchor) {
        attrs += ` text-anchor="${textAnchor}"`;
      }
      if (fill) {
        attrs += ` fill="${fill}"`;
      }
      if (stroke && strokeW) {
        attrs += ` stroke="${stroke}" stroke-width="${strokeW}"`;
      }
      var hydrogenFill = fGetDisplayAtomFill("H", { parentSymbol: "N" }, el);
      var hydrogenFillAttr = hydrogenFill ? ` fill="${hydrogenFill}"` : "";
      var newString =
        `<text ${attrs}>N<tspan class="svgHydrogenPart"${hydrogenFillAttr}>H<tspan dy="70" font-size=".8em">2</tspan></tspan></text>`;
      var newEl;
      try {
        newEl = MuSVG.parse(newString);
      } catch (e) {
        return;
      }
      var parentNode = el.node.parentNode;
      var nextSibling = el.node.nextSibling;
      if (!parentNode || !newEl || !newEl.node) {
        return;
      }
      var fragmentNode = newEl.node;
      while (fragmentNode.firstChild) {
        parentNode.insertBefore(fragmentNode.firstChild, nextSibling);
      }
      el.remove();
    });
  }
  ////// NO2 special case PATCH //////
  if (functionalGroupObj.hasOwnProperty("nitro")) {
    molSvg.selectAll("text").forEach(function (el) {
      var txt = el.attr("text") || "";
      if (String(txt).trim() === "+") {
        el.attr({ text: "N+" });
      }
      if (String(txt).trim() === "-") {
        el.attr({ text: "O-" });
      }
    });
  }
}

// ── fLoadMol3D ────────────────────────────────────────────────────────────

function fLoadMol3D() {
  const selectedExample = nameExamples[selectedMol];
  if (!selectedExample) {
    return;
  }

  let myMol3D = selectedExample.file3D;
  let movetoCmd =
    selectedExample.hasOwnProperty("moveto") && selectedExample.moveto
      ? String(selectedExample.moveto).trim().replace(/;?\s*$/, "; ")
      : "";
  // Optional model framing, applied after init-3.spt's shared zoom 50.
  // Later user zoom and scenario camera commands retain control.
  // IMPORTANT: init-3.spt ends with `zoom 50`, so a data-file moveto must run
  // AFTER it (moveto encodes its own zoom/orientation); when moveto is
  // present the generic initialZoom3D is skipped to avoid overwriting it.
  const initialZoom = selectedExample.initialZoom3D;
  const zoomCmd = (!movetoCmd && Number.isFinite(initialZoom) && initialZoom > 0)
    ? "zoom " + initialZoom + ";"
    : "";
  Jmol.script(
    jmolAppletNomeclature,
    "frank off;load " +
      myMol3D +
      "; select all; center selected;" +
      "script spt/init-3.spt;" + zoomCmd + movetoCmd,
  );
  fSetMolVis3D();
  // A fresh load satisfies any pending one-shot exit reload (e.g. molecule
  // picked while 3D hidden after a no-3D exit: already loaded, reopen is instant).
  try {
    if (typeof MuLERMoCScenario !== "undefined") MuLERMoCScenario.reload3DOnce = false;
  } catch (eFlag) {
    /* flag best-effort */
  }
}

// ── fFetchAndParse3D ──────────────────────────────────────────────────────

function fFetchAndParse3D() {
  if (!selectedMol || !nameExamples[selectedMol]) {
    return;
  }
  const mol = selectedMol; // stale-mol guard
  const url = nameExamples[selectedMol].file3D;
  fetch(url)
    .then(function (r) {
      return r.text();
    })
    .then(function (text) {
      if (selectedMol !== mol) {
        return;
      } // user navigated away
      fParseSDF3D(text);
      fDetectMolType3D();
      fCalcMainChain3D();
      // S2 scenario gate (additive, guarded): notify the scenario layer so a
      // per-step name highlight applies after 3D analysis exists. No-op when
      // the scenario module is absent or no step is pending.
      try {
        if (typeof window.fScenarioOn3DParsed === "function") window.fScenarioOn3DParsed(mol);
      } catch (e) {
        /* scenario absent */
      }
    })
    .catch(function (e) {
      console.warn("[3D parse failed]", url, e);
    });
}

// ── showAtomSymbols3D ─────────────────────────────────────────────────────

function showAtomSymbols3D(restoreNumbering) {
  if (atomSymbols3DFlag) {
    Jmol.script(
      jmolAppletNomeclature,
      "select all; labels %e;" + JmolSelection + ";",
    );
  } else {
    Jmol.script(
      jmolAppletNomeclature,
      "select all; labels off;" + JmolSelection + ";",
    );
  }

  if (restoreNumbering !== false && nameAnalysisMode == "compCarbonsCount") {
    fShowNumbering3D();
  }
}

// ── showHydrogens3D ─────────────────────────────────────────────────────

function showHydrogens3D() {
  if (hydrogens3DFlag) {
    Jmol.script(jmolAppletNomeclature, "hide none;");
  } else {
    Jmol.script(
      jmolAppletNomeclature,
      "select _H and connected(_C); hide selected;" + JmolSelection + ";",
    );
  }

  if (nameAnalysisMode == "compCarbonsCount") {
    fShowNumbering3D();
  }
}

// ── rotate3D ─────────────────────────────────────────────────────────────

function rotate3D() {
  if (rotateFlag) {
    Jmol.script(jmolAppletNomeclature, "rotate spin 60;");
  } else {
    Jmol.script(jmolAppletNomeclature, "rotate  off;");
  }
}

// ── fGetNameBoxes ─────────────────────────────────────────────────────────

function fGetNameBoxes() {
  return Array.from(
    document.querySelectorAll(".nameCompContainer .nameCompBox"),
  )
    .map(function (el) {
      return {
        text: el.textContent.trim(),
        selected: el.classList.contains("selected"),
      };
    })
    .filter(function (b) {
      return b.text;
    });
}

// ── fDrawNameBoxes ────────────────────────────────────────────────────────

function fDrawNameBoxes(ctx, nameBoxes, canvasWidth, yTop) {
  if (!nameBoxes.length) return;
  let font = "bold 40px Arial, sans-serif";
  ctx.font = font;
  let pad = 18;
  let boxH = 60;
  let gap = -2; // boxes overlap border like CSS margin-right: -2px
  let totalW =
    nameBoxes.reduce(function (acc, b) {
      return acc + ctx.measureText(b.text).width + pad * 2;
    }, 0) +
    gap * (nameBoxes.length - 1);
  let x = Math.round((canvasWidth - totalW) / 2);
  let y = yTop + 10;
  nameBoxes.forEach(function (b) {
    let tw = ctx.measureText(b.text).width;
    let bw = Math.round(tw + pad * 2);
    ctx.fillStyle = b.selected ? "#5FAD56" : "#ffffff";
    ctx.fillRect(x, y, bw, boxH);
    ctx.strokeStyle = b.selected ? "#5FAD56" : "#dddddd";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, bw, boxH);
    ctx.fillStyle = b.selected ? "#ffffff" : "#000000";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(b.text, x + pad, y + boxH / 2);
    x += bw + gap;
  });
}

// ── fSave2DPng ────────────────────────────────────────────────────────────

window.fSave2DPng = function () {
  let svgEl = document.querySelector("#jsmeNomeclatureSVG svg");
  if (!svgEl) return;
  let nameBoxes = fGetNameBoxes();
  let bbox = svgEl.getBoundingClientRect();
  let srcWidth = bbox.width || 450;
  let srcHeight = bbox.height || 200;
  let width = 1200;
  let molHeight = Math.round(srcHeight * (width / srcWidth));
  let labelHeight = nameBoxes.length ? 90 : 0;

  let svgClone = svgEl.cloneNode(true);
  svgClone.setAttribute("width", srcWidth);
  svgClone.setAttribute("height", srcHeight);

  // Export uses a serialized standalone SVG blob, so page CSS selectors are
  // not available there. Inline unchecked atom-color mode directly.
  if (
    !document
      .querySelector("#jsmeNomeclatureSVG")
      ?.classList.contains("svgAtomsColorized")
  ) {
    svgClone
      .querySelectorAll(
        'text:not([id^="number"]), text:not([id^="number"]) tspan',
      )
      .forEach(function (el) {
        el.setAttribute("fill", "#000");
      });
  }

  // Defensive scrub: highlighted malformed labels may leak broken stroke-width
  // values (with absorbed tag text) into export serialization.
  svgClone.querySelectorAll("[stroke-width]").forEach(function (el) {
    let strokeWidthValue = el.getAttribute("stroke-width") || "";
    if (/[<>]|&(lt|gt);|tspan|stroke=/i.test(strokeWidthValue)) {
      let safeStrokeWidth = strokeWidthValue
        .split("&gt;")[0]
        .split(">")[0]
        .split("&lt;")[0]
        .split("<")[0]
        .trim();
      if (/^\d+(\.\d+)?(px)?$/i.test(safeStrokeWidth)) {
        el.setAttribute("stroke-width", safeStrokeWidth);
      } else {
        el.removeAttribute("stroke-width");
      }
      el.removeAttribute("stroke");
    }
  });

  let svgData = new XMLSerializer().serializeToString(svgClone);
  if (!svgData.includes('xmlns="http://www.w3.org/2000/svg"')) {
    svgData = svgData.replace(
      "<svg",
      '<svg xmlns="http://www.w3.org/2000/svg"',
    );
  }

  // Fix JSME bug: highlighted atom labels produce malformed XML.
  svgData = svgData.replace(
    /fill="([^"]*?)\s+stroke="\s*([^"]*?)"\s*=\s*"\s+stroke-width="([^"]*)"/g,
    'fill="$1" stroke="$2" stroke-width="$3"',
  );

  // Fix N-type highlight corruption: stroke-width can absorb escaped/literal
  // fragments (e.g. &gt;&lt;tspan&gt;...) and break SVG image decode.
  svgData = svgData.replace(/stroke-width="([^"]*)"/g, function (_m, value) {
    if (!/(?:&gt;|&lt;|>|<|tspan|stroke=)/i.test(value)) {
      return 'stroke-width="' + value + '"';
    }
    let safeValue = value
      .split("&gt;")[0]
      .split(">")[0]
      .split("&lt;")[0]
      .split("<")[0]
      .trim();
    if (!/^\d+(\.\d+)?(px)?$/i.test(safeValue)) {
      return "";
    }
    return 'stroke-width="' + safeValue + '"';
  });

  // Remove orphaned encoded tspan tags left inside attribute contexts.
  svgData = svgData.replace(/&lt;\/?tspan[^&]*?&gt;/gi, "");

  // Fix another JSME highlight corruption variant seen in <text> tags:
  //   ... fill="#000" black"="" stroke-width="11px" ...
  // Remove orphan attributes ending as: <token>"=""
  svgData = svgData.replace(
    /\s+[A-Za-z_:-][A-Za-z0-9_:\-\.]*"=""(?=\s|>)/g,
    "",
  );

  let svgDebugFlags = {
    hasMalformedFillStroke: /fill="[^"]*?\s+stroke="\s*[^"]*?"\s*=\s*"/i.test(
      svgData,
    ),
    hasCorruptStrokeWidth:
      /stroke-width="[^"]*(?:&gt;|&lt;|>|<|tspan|stroke=)/i.test(svgData),
    hasEncodedTspan: /&lt;\/?tspan/i.test(svgData),
    hasOrphanQuotedAttribute:
      /\s+[A-Za-z_:-][A-Za-z0-9_:\-\.]*"=""(?=\s|>)/.test(svgData),
  };

  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = molHeight + labelHeight;
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, molHeight);
    fDrawNameBoxes(ctx, nameBoxes, width, molHeight);
    canvas.toBlob(function (blob) {
      if (!blob) {
        console.error("2D PNG: toBlob returned null");
        return;
      }
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download =
        (currentMolName || selectedMol || "molecule").replace(/\s+/g, "_") +
        "_2D.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
  };
  img.onerror = function () {
    console.error("[2D PNG] SVG failed to load. SVG content:");
    console.error(svgData.slice(0, 4000));
    console.error("[2D PNG] Debug flags:", svgDebugFlags);
  };

  let svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  img.src = URL.createObjectURL(svgBlob);
};

// ── fSaveJmolPng ──────────────────────────────────────────────────────────

window.fSaveJmolPng = function () {
  let baseName = (currentMolName || selectedMol || "molecule").replace(
    /\s+/g,
    "_",
  );
  let safeLabel = (currentMolName || "").replace(/'/g, "");

  Jmol.script(
    jmolAppletNomeclature,
    "set echo  bottom center; color echo black; font echo 24 ; echo " +
      safeLabel +
      "|| ;" +
      "write IMAGE 1200 1200 PNG '" +
      baseName +
      "_3D.png';",
  );
  setTimeout(function () {
    Jmol.script(jmolAppletNomeclature, "set echo off;");
  }, 500);
};

var NAME_COMP_MIN_SCALE = 0.7;

function fFitNameComponents() {
  var container = document.querySelector("#nameAnalysis .nameCompContainer");
  if (!container) return;
  var parent = container.parentElement;
  if (!parent) return;
  var available = 0;
  try {
    available = Math.round(parent.clientWidth);
  } catch (eA) {
    available = 0;
  }
  if (!(available > 0)) return;
  container.classList.add("nameCompMeasuring");
  try {
    container.style.setProperty("--nameCompScale", "1");
    void container.offsetWidth;
    var natural = container.scrollWidth;
    if (!(natural > 0)) return;
    if (natural <= available) {
      parent.classList.remove("nameOverflow");
      return;
    }
    var lo = NAME_COMP_MIN_SCALE;
    var hi = 1;
    var best = NAME_COMP_MIN_SCALE;
    for (var i = 0; i < 9; i++) {
      var mid = (lo + hi) / 2;
      container.style.setProperty("--nameCompScale", String(mid));
      void container.offsetWidth;
      var w = container.scrollWidth;
      if (w <= available) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }
    container.style.setProperty("--nameCompScale", String(best));
    void container.offsetWidth;
    if (container.scrollWidth > available) {
      parent.classList.add("nameOverflow");
    } else {
      parent.classList.remove("nameOverflow");
    }
  } finally {
    container.classList.remove("nameCompMeasuring");
  }
}

// ── fShowNameAnalysis ─────────────────────────────────────────────────────

function fShowNameAnalysis() {
  let compCount, currComp, displayComp, compBox, nameCompContainer;
  compCount = selectedMol ? nameComponentsList.length : 0;

  const toggleIcon = narrateAnalysisFlag ? svgSpeaker : svgMute;
  const toggleTitle = narrateAnalysisFlag
    ? "Αφήγηση ενεργή"
    : "Αφήγηση ανενεργή";
  const narrateActiveClass = narrateAnalysisFlag ? " active" : "";
  const playDisabled = narrateAnalysisFlag ? "" : " disabled";

  const toggleNameStyleBox = window.nameBoxFlag ? svgNameBox : svgNameBoxOff;
  const boxClass = window.nameBoxFlag ? "nameCompBox boxed" : "nameCompBox unboxed";
  const boxTooltip = window.nameBoxFlag
    ? "Πλαίσια συνθετικών"
    : "Χωρίς πλαίσια συνθετικών";
  const boxActiveClass = window.nameBoxFlag ? " active" : "";

  const toggleNameStyleCross = window.nameCrossFlag ? svgNameCross : svgNameCrossOff;
  const crossClass = window.nameCrossFlag ? "nameCompPlus " : "nameCompPlus hide";
  const crossTooltip = window.nameCrossFlag
    ? "Διαχωρισμένα συνθετικά"
    : "Ενωμένα συνθετικά";
  const crossActiveClass = window.nameCrossFlag ? " active" : "";
  // Master eye-edit switch: single icon + .active highlight (live-only
  // authoring aid; never stored in steps).
  const toggleNameStyleEye = svgEyeState;
  const eyeActiveClass = window.nameEyeEdit === true ? " active" : "";

  const nameSettingClass = nameSettingsFlag ? "open" : "";
  const namesSettingsBtnActiveClass = nameSettingsFlag ? "active" : "";
  // Ether IUPAC/COMMON toggle (ethers only, name panel).
  const _isEtherNaming =
    !!selectedMol &&
    nameExamples[selectedMol]?.classification?.chemicalClass === "ethers";
  const _iupacCls = etherNamingMode === "iupac" ? "selectedRadio" : "unselectedRadio";
  const _commonCls = etherNamingMode === "common" ? "selectedRadio" : "unselectedRadio";
  const etherNamingToggle = _isEtherNaming
    ? `<div id='radioEtherNaming' class='HFlex' style='align-items:center;gap:0;margin-right:8px'><div class='radioCheckContainer etherNamingRadio ${_iupacCls}' data-naming-mode='iupac'>IUPAC<span class='radioCheck'></span></div><div class='radioCheckContainer etherNamingRadio ${_commonCls}' data-naming-mode='common'>Κοινή<span class='radioCheck'></span></div></div>`
    : "";
  // Panel layout per molecule case (no empty half-rows):
  // - ether + stepper: stepper on its own top row; radios left / buttons right below.
  // - stepper only (non-ether): single row, stepper left / buttons right.
  // - radios only (ether, no stepper): single row, radios left / buttons right.
  // - neither: single row, buttons right (as in frozen versions).
  const _stepperHTML = (typeof fChainStepperHTML === "function") ? fChainStepperHTML() : "";
  const _buttonsHTML = `<button id='narrateAnalysisToggle' class='narrateBtn${narrateActiveClass}' data-tooltip='${toggleTitle}'>${toggleIcon}</button><button id='readNameBtn' class='readNameBtn' data-tooltip='Εκφώνηση ονόματος' >${svgAudioDesc}</button><button id='nameStyleBoxToggle' class='nameStyleBox ${boxActiveClass}' data-tooltip='${boxTooltip}'>${toggleNameStyleBox}</button><button id='nameStyleCrossToggle' class='nameStyleCross ${crossActiveClass}' data-tooltip='${crossTooltip}'>${toggleNameStyleCross}</button><button id='nameStyleEyeToggle' class='nameStyleEye${eyeActiveClass}' data-tooltip='Ορατότητα συνθετικών'>${toggleNameStyleEye}</button>`;
  var _panelInner = "";
  if (_stepperHTML && etherNamingToggle) {
    _panelInner = `<div id='nameSettingsRowTop'>${_stepperHTML}</div><div id='nameSettingsRowMain'><div class='nsLeft'>${etherNamingToggle}</div><div class='nsRight'>${_buttonsHTML}</div></div>`;
  } else if (_stepperHTML) {
    _panelInner = `<div id='nameSettingsRowMain'><div class='nsLeft'>${_stepperHTML}</div><div class='nsRight'>${_buttonsHTML}</div></div>`;
  } else if (etherNamingToggle) {
    _panelInner = `<div id='nameSettingsRowMain'><div class='nsLeft'>${etherNamingToggle}</div><div class='nsRight'>${_buttonsHTML}</div></div>`;
  } else {
    _panelInner = `<div id='nameSettingsRowMain'><div class='nsRight'>${_buttonsHTML}</div></div>`;
  }

  nameCompContainer =
    `<div class='panelTitle'><span>Ονομασία</span><div id='nameSettingsBtnDiv'><button  id='nameSettingsBtn'  class='settingsBtn ${namesSettingsBtnActiveClass}'  onclick='fToggleNameSettings()'  data-tooltip='Ρυθμίσεις Ονομασίας' >${svgSettings} </button></div></div><div id='nameSettingsPanel' class='${nameSettingClass}'>${_panelInner}</div><div class='HFlex nameContainer' style='justify-content:center;'><div class='nameCompContainer'>`;

  if (!selectedMol) {
    nameCompContainer +=
      `<div class='nameEmptyHint'>Επιλέξτε μόριο για ανάλυση ονόματος</div>`;
  }

  // COMMON ether naming: render alkyl boxes + αιθέρας instead of IUPAC slots.
  const _commonParts = _isEtherNaming && etherNamingMode === "common" ? fGetEtherCommonParts() : null;
  if (_commonParts && _commonParts.parts) {
    const _labels = _commonParts.parts.map(function (p) { return p.label; });
    for (let ci = 0; ci < _labels.length; ci++) {
      currComp = _labels[ci];
      if (currComp == "" || currComp == undefined) {
        continue;
      }
      let displayComp = currComp;
      for (let n = ci + 1; n < _labels.length; n++) {
        const nextComp = _labels[n];
        if (!nextComp) continue;
        const lastCh = currComp[currComp.length - 1];
        const firstCh = nextComp[0];
        const _isGkConsonant = (ch) =>
          /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) &&
          !new Set([
            "α",
            "ε",
            "η",
            "ι",
            "ο",
            "υ",
            "ω",
            "ά",
            "έ",
            "ή",
            "ί",
            "ό",
            "ύ",
            "ώ",
          ]).has(ch);
        if (_isGkConsonant(lastCh) && _isGkConsonant(firstCh)) {
          const connector =
            (lastCh === "π" || lastCh === "τ" || lastCh === "ξ") && firstCh === "δ" ? "α" : "ο";
          displayComp = `${currComp}<span class='euphonyLetter'>${connector}</span>`;
        }
        break;
      }

      compBox = fNameCompBox("comp" + (10 + ci), boxClass, displayComp);
      if (ci < _labels.length - 1) {
        compBox += `<div class='${crossClass}' > + </div>`;
      }
      nameCompContainer += compBox;
    }
  } else {
  // Build the name component boxes with Greek euphony applied, and + signs in between

  for (let i = 0; i < compCount; i++) {
    currComp = nameComponentsList[i];
    if (currComp == "" || currComp == undefined) {
      continue;
    }

    // Apply Greek euphony: append connecting vowel to this component's display
    // if it ends with a consonant and the next non-empty component starts with one.
    // Esters are two words (προπανικός μεθυλεστέρας): no connector from the
    // acid part (slots <10) into the fused tail (slots 10+).
    const _isEsterWordBoundary = (typeof nameExamples !== "undefined" && selectedMol &&
      nameExamples[selectedMol]?.classification?.chemicalClass === "esters");
    // Next non-empty component drives both euphony and the trailing separator,
    // so no "+" (or space) ever renders after the last box.
    let _nextIdx = -1;
    for (let _m = i + 1; _m < compCount; _m++) {
      if (nameComponentsList[_m]) { _nextIdx = _m; break; }
    }
    let displayComp = currComp;
    for (let n = i + 1; n < compCount; n++) {
      const nextComp = nameComponentsList[n];
      if (!nextComp) continue;
      const lastCh = currComp[currComp.length - 1];
      const firstCh = nextComp[0];
      const _isGkConsonant = (ch) =>
        /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) &&
        !new Set([
          "α",
          "ε",
          "η",
          "ι",
          "ο",
          "υ",
          "ω",
          "ά",
          "έ",
          "ή",
          "ί",
          "ό",
          "ύ",
          "ώ",
        ]).has(ch);
      const _crossesEsterBoundary = _isEsterWordBoundary && (n >= 10 && i < 10);
      if (!_crossesEsterBoundary && _isGkConsonant(lastCh) && _isGkConsonant(firstCh)) {
        const connector =
          (lastCh === "π" || lastCh === "τ" || lastCh === "ξ") && firstCh === "δ" ? "α" : "ο";
        displayComp = `${currComp}<span class='euphonyLetter'>${connector}</span>`;
      }
      break;
    }

    compBox = fNameCompBox("comp" + i, boxClass, displayComp);
    // Locants are always their own component: the suffix slot (index 9)
    // fuses them only on the db+tb ketone/polyol paths ("-2,7-διόνη"), so
    // split that shape here at render time — locants first, suffix keeping
    // the slot id so every id-driven behavior (click mode, restore, hidden
    // sets, eye toggles) is unchanged. Data list, euphony boundaries and
    // the joined name are identical to the fused string.
    if (i === 9) {
      try {
        var _singleFG = (typeof functionalGroupsList !== "undefined" &&
          Array.isArray(functionalGroupsList) && functionalGroupsList.length === 1)
          ? functionalGroupsList[0] : null;
        // Both C=C and C≡C present (same globals the suffix explain path
        // already reads): only those two fusion sites ever merge locants
        // into the suffix slot.
        var _hasDB = false, _hasTB = false;
        try {
          _hasDB = !!(typeof multiBondsObj !== "undefined" && multiBondsObj &&
            multiBondsObj.CCd && multiBondsObj.CCd.length > 0);
          _hasTB = !!(typeof multiBondsObj !== "undefined" && multiBondsObj &&
            multiBondsObj.CCt && multiBondsObj.CCt.length > 0);
        } catch (eBonds) { _hasDB = false; _hasTB = false; }
        if ((_singleFG === "ketone" || _singleFG === "alcohol") && _hasDB && _hasTB) {
          var _sm = String(displayComp).match(/^(-\d[\d,]*-)([\u0370-\u03ff\u1f00-\u1fff]+)$/);
          if (_sm) {
            compBox = fNameCompBox("comp9loc", boxClass, _sm[1]);
            compBox += fNameCompBox("comp" + i, boxClass, _sm[2]);
          }
        }
      } catch (eSplit) { /* fused single box fallback */ }
    }
    // Branch labels are always their own components: slot 3 (comp0bText)
    // fuses the 2nd and later substituent groups ("ισοπροπυλο-4,5-διμεθυλο")
    // once three substituent types exist, so split it here at render time —
    // the first name keeps the comp3 slot id, locants take comp3loc and
    // later names comp3b (then comp3loc2/comp3b2, ...). Core list, euphony
    // and the joined name are unchanged: piece ends ("-", digit, vowel-end
    // name) never take a connector, and a fired euphony aborts the split.
    if (i === 3 && displayComp === currComp) {
      try {
        var _brp = fSplitBranchPieces(currComp);
        if (_brp) {
          var _brLast = _brp[_brp.length - 1];
          var _brNext = _nextIdx >= 0 ? String(nameComponentsList[_nextIdx]) : "";
          // Local copy of the Greek-consonant test: _isGkConsonant is scoped
          // to the euphony for-loop above and is not visible here.
          var _brIsGk = function (ch) {
            return /[\u0370-\u03ff\u1f00-\u1fff]/u.test(ch) &&
              !new Set([
                "α",
                "ε",
                "η",
                "ι",
                "ο",
                "υ",
                "ω",
                "ά",
                "έ",
                "ή",
                "ί",
                "ό",
                "ύ",
                "ώ",
              ]).has(ch);
          };
          var _brEuph = _brNext !== "" &&
            _brIsGk(_brLast[_brLast.length - 1]) && _brIsGk(_brNext[0]);
          if (!_brEuph) {
            var _brx = "";
            // Locants pieces carry dashes on both sides ("-6,6-"), unless the
            // piece leads the whole panel — then trailing dash only, like the
            // comp0 "3-" convention. (Unreachable while slot 3 is fused, since
            // fusion implies slots 0-2 exist; kept as the general rule.)
            var _brFirst = !(nameComponentsList[0] || nameComponentsList[1] || nameComponentsList[2]);
            for (var _bri = 0; _bri < _brp.length; _bri++) {
              var _brId, _brText;
              if (_bri % 2 === 0) {
                var _brNj = _bri / 2 + 1;
                _brId = _brNj === 1 ? "comp3" : "comp3b" + (_brNj === 2 ? "" : String(_brNj - 1));
                // Names stay bare: dashes live in locants boxes only, so the
                // locants piece supplies the junction dash on both sides.
                _brText = _brp[_bri];
              } else {
                var _brLj = (_bri + 1) / 2 + 1;
                _brId = "comp3loc" + (_brLj === 2 ? "" : String(_brLj - 1));
                _brText = (_brFirst ? "" : "-") + _brp[_bri] + "-";
              }
              if (_bri > 0) _brx += `<div class='${crossClass}' > + </div>`;
              _brx += fNameCompBox(_brId, boxClass, _brText);
            }
            compBox = _brx;
          }
        }
      } catch (eSplitB) { /* fused single box fallback */ }
    }
    if (_nextIdx >= 0) {
      // Esters: two-word name — blank space after ικός instead of +.
      if (_isEsterWordBoundary && i < 10 && _nextIdx >= 10) {
        compBox += `<div class='nameCompSpace'>&nbsp;</div>`;
      } else {
        compBox += `<div class='${crossClass}' > + </div>`;
      }
    }
    nameCompContainer += compBox;
  }
  } // end IUPAC boxes (else of COMMON render)

  // nameCompContainer += "</div><button id='readNameBtn' class='readNameBtn' data-tooltip='Ανάγνωση ονόματος'" + playDisabled + ">" + svgPlay + "</button></div>"

  $("#nameAnalysis").html(nameCompContainer);

  // Fix 3: the explain line follows box visibility — hidden when zero
  // components are visible, restored on reveal (toggle, so both directions
  // work; the presentation lock logic re-asserts afterwards).
  try {
    var _visBoxes = document.querySelectorAll(".nameCompContainer .nameCompBox:not(.comp-hidden)");
    $("#nameAnalysisExplain").toggle(_visBoxes.length > 0);
  } catch (e) {
    /* DOM unavailable */
  }

  // Restore .selected on the previously-selected box after HTML rebuild
  if (nameAnalysisMode !== "none") {
    const _modeToCompId = {
      compNumber1: "comp0",
      "compSecondSub1": "comp1",
      compNumber2: "comp2",
      "compSecondSub2": "comp3",
      compBondPos: "comp4",
      compCarbonsCount: "comp5",
      compBondType: "comp6",
      compEndNumber: "comp7",
      compBondType2: "comp8",
      compSuffix: "comp9",
      compSuffixLocants: "comp9loc",
      compBranchSub1: "comp3",
      compBranchLoc2: "comp3loc",
      compBranchSub2: "comp3b",
      commonAlkyl1: "comp10",
      commonAlkyl2: "comp11",
      commonEther: "comp12",
      esterAlkyl: "comp10",
      esterEster: "comp11",
    };
    const _selId = _modeToCompId[nameAnalysisMode] || fBranchPieceBoxId(nameAnalysisMode);
    // Hidden boxes stay inert: never restore .selected onto a dash box.
    if (_selId && $(`#${_selId}`).length && !fNameCompHidden(_selId)) {
      $(`#${_selId}`).addClass("selected");
    } else {
      nameAnalysisMode = "none";
    }
  }

  fExplainNameComp();

  // Scenario rebuild hook (additive, guarded): this rebuild recreates
  // #nameSettingsBtnDiv/#nameSettingsPanel + voice buttons without the
  // presentation hides, so re-assert the current present step's naming
  // chrome (same pattern as the fScenarioOn3DParsed hook below).
  try {
    if (typeof window.fScenarioApplyNamingChrome === "function") window.fScenarioApplyNamingChrome();
  } catch (e) {
    /* scenario absent */
  }
  fFitNameComponents();
}

// ── fClearHighlights ──────────────────────────────────────────────────────

function fClearHighlights() {
  clearInterval(myNumberingTimeout);
  currNumberEl = 0;
  if (!jsmeNomeclatureApplet) return;
  jsmeNomeclatureApplet.resetAtomColors(0);
  jsmeNomeclatureApplet.resetBondColors(0);
  Jmol.script(
    jmolAppletNomeclature,
    "select all;  selectionHalos off; color bonds none; color atoms none;",
  );
  showAtomSymbols3D(!fSequentialKetoneNumberingTarget());
  removeEcho3D();
  $("#ruleTheoryContainer").hide();
  $("#nameAnalysisExplain").html("");
  ruleTableHighlight = null;
  numberingAtomOverride = null;
  numberingAtomOverride3D = null;
  JmolSelection = "select none"; // no trailing ";": call sites join as "...;" + JmolSelection + ";"
}

// ── Secondary-group display names ─────────────────────────────────────────
// Greek nouns for secondary characteristic groups, shown in parentheses in
// fExplainNameComp messages. Vocabulary matches the r4 rule table.
const secondaryGroupNouns = {
  alcohol: "Υδροξύλιο",
  aldehyde: "Αλδεϋδομάδα",
  ketone: "Κετονομάδα",
  carboxylicAcid: "Καρβοξύλιο",
  cyanide: "Κυανομάδα",
  amine: "Αμινοομάδα",
  nitro: "Νιτροομάδα",
  ether: "Αλκοξυομάδα",
  ester: "Εστερομάδα",
};

const secondaryHalogenNouns = {
  Cl: "Χλώριο",
  Br: "Βρώμιο",
  F: "Φθόριο",
  I: "Ιώδιο",
};

const secondaryGroupPluralNouns = {
  alcohol: "Υδροξύλια",
  aldehyde: "Αλδεϋδομάδες",
  ketone: "Κετονομάδες",
  carboxylicAcid: "Καρβοξύλια",
  cyanide: "Κυανομάδες",
  amine: "Αμινοομάδες",
  nitro: "Νιτροομάδες",
  ether: "Αλκοξυομάδες",
  ester: "Εστερομάδες",
};

const alkylBranchNouns = {
  μεθυλο: "μεθύλιο",
  αιθυλο: "αιθύλιο",
  προπυλο: "προπύλιο",
  ισοπροπυλο: "ισοπροπύλιο",
  βουτυλο: "βουτύλιο",
  ισοβουτυλο: "ισοβουτύλιο",
  "sec-βουτυλο": "sec-βουτύλιο",
  "tert-βουτυλο": "tert-βουτύλιο",
  πεντυλο: "πεντύλιο",
  εξυλο: "εξύλιο",
  επτυλο: "επτύλιο",
  οκτυλο: "οκτύλιο",
};

// FG key -> rule-4 table row key. Returns null when the FG has no rule-4 row
// (nitro, halogens, ethers): no highlight instead of a wrong one.
const r4KeyForFG = {
  carboxylicAcid: "r4-carboxylic",
  ester: "r4-alkoxycarbonyl",
  cyanide: "r4-cyano",
  aldehyde: "r4-aldehyde",
  ketone: "r4-keto",
  alcohol: "r4-hydroxy",
  amine: "r4-amino",
};
function fRule4KeysForFGs(fgA, fgB) {
  return [fgA, fgB]
    .map(function (k) { return r4KeyForFG[k] || null; })
    .filter(function (k) { return !!k; });
}

// Resolve the [fgKey, heteroEl] instance behind FGno, using the same
// fgInstances ordering as fHighlightFG (FGno=1 → first name prefix).
// Returns null when FGno matches no functional group (e.g. alkyl branch).
function fGetFGInstance(FGno) {
  const fgKeys = Object.keys(functionalGroupObj).filter(function (k) {
    return k !== "hydrocarbon";
  });
  const fgInstances = [];
  for (let k = 0; k < fgKeys.length; k++) {
    const heteroEls = Object.keys(functionalGroupObj[fgKeys[k]]);
    for (let e = 0; e < heteroEls.length; e++) {
      fgInstances.push([fgKeys[k], heteroEls[e]]);
    }
  }
  const fgPriorityOrder2D = [
    "carboxylicAcid",
    "ester",
    "cyanide",
    "aldehyde",
    "ketone",
    "alcohol",
    "amine",
    "nitro",
    "ether",
  ];
  const halogenOrder2D = Object.keys(nameMainCompObj3.halogen.substitute);
  fgInstances.sort(function (a, b) {
    if (a[0] === "halogen" && b[0] === "halogen") {
      return halogenOrder2D.indexOf(a[1]) - halogenOrder2D.indexOf(b[1]);
    }
    return fgPriorityOrder2D.indexOf(b[0]) - fgPriorityOrder2D.indexOf(a[0]);
  });
  return fgInstances[FGno - 1] || null;
}

// " (Χλώριο)" suffix for explanation messages, or "" when FGno matches
// no functional group.
function fGetSecondaryGroupNounSuffix(FGno) {
  const inst = fGetFGInstance(FGno);
  if (!inst) {
    return "";
  }
  const noun =
    inst[0] === "halogen"
      ? secondaryHalogenNouns[inst[1]]
      : secondaryGroupNouns[inst[0]];
  return noun ? ` (${noun})` : "";
}

// " (Υδροξύλιο)" / " (Υδροξύλια)" suffix naming the principal (strongest)
// characteristic group, or "" when there is none. Halogens are always
// secondary, so they are skipped (defensive "Αλογόνο" fallback included).
function fGetPrincipalGroupNounSuffix(usePlural) {
  const fgPriorityOrder2D = [
    "carboxylicAcid",
    "ester",
    "cyanide",
    "aldehyde",
    "ketone",
    "alcohol",
    "amine",
    "nitro",
    "ether",
  ];
  const fgKeys = Object.keys(functionalGroupObj).filter(function (k) {
    return k !== "hydrocarbon" && k !== "halogen";
  });
  let principalKey = null;
  for (let i = 0; i < fgPriorityOrder2D.length; i++) {
    if (fgKeys.includes(fgPriorityOrder2D[i])) {
      principalKey = fgPriorityOrder2D[i];
      break;
    }
  }
  if (!principalKey) {
    if (Object.keys(functionalGroupObj).includes("halogen")) {
      return " (Αλογόνο)";
    }
    return "";
  }
  const noun = usePlural
    ? secondaryGroupPluralNouns[principalKey]
    : secondaryGroupNouns[principalKey];
  return noun ? ` (${noun})` : "";
}

// Alkyl branch noun (e.g. "μεθύλιο") for pure-hydrocarbon molecules with a
// side branch, or "" otherwise.
function fGetBranchDisplayName() {
  if (
    Object.keys(functionalGroupObj).length !== 1 ||
    !functionalGroupObj.hydrocarbon ||
    !Array.isArray(nameComponentsList) ||
    !nameComponentsList[1]
  ) {
    return "";
  }
  if (fGetHydrocarbonBranchHighlight().atoms.length === 0) {
    return "";
  }
  const prefix = String(nameComponentsList[1]);
  return alkylBranchNouns[prefix] || prefix;
}

// Multiplicative prefix (δι-, τρι-, …) on a substituent name component.
// Returns the count, or 0 when the component has no multiplier.
function fGetNameComponentMultiplier(comp) {
  const s = String(comp || "");
  const prefixes = [
    ["οκτα", 8],
    ["επτα", 7],
    ["εξα", 6],
    ["πεντα", 5],
    ["τετρα", 4],
    ["τρι", 3],
    ["δι", 2],
  ];
  for (let i = 0; i < prefixes.length; i++) {
    if (s.indexOf(prefixes[i][0]) === 0) return prefixes[i][1];
  }
  return 0;
}

// A numbering component such as "-2,5-" carries more than one locant.
function fIsMultiLocantComponent(comp) {
  return fGetNameComponentLocants(comp).length > 1;
}

// ── fExplainNameComp ──────────────────────────────────────────────────────

function fAlcoholOHNameComponent() {
  if (typeof functionalGroupObj === 'undefined' || !functionalGroupObj ||
      !functionalGroupObj.alcohol || !fSupportsAlkylBranchPrefixes()) return null;
  const branched = fGetHydrocarbonSubstituentInfo().length > 0;
  const db = multiBondsObj.CCd.length, tb = multiBondsObj.CCt.length;
  if (branched && db && tb) return 'compSuffix';
  if (db || tb) return db && tb ? null : 'compEndNumber';
  return branched ? 'compBondPos' : 'compNumber1';
}
function fAlcoholOHPositionText() {
  return functionalGroupObj.alcohol.O.length > 1
    ? ' Δηλώνει τις θέσεις των υδροξυλομάδων (–OH).'
    : ' Δηλώνει τη θέση της υδροξυλομάδας (–OH).';
}
// Split suffix locants ("-2,7-" beside "διόνη", db+tb ketones/polyols):
// true once the render has emitted the standalone locants box, which keeps
// the suffix slot id for the name itself. The suffix explanation then stays
// a class statement; positions move to the new compSuffixLocants mode.
function fSplitSuffixLocantsActive() {
  try {
    return !!(typeof document !== "undefined" && document.getElementById("comp9loc"));
  } catch (eD) { return false; }
}
// Split branch-label slot ("ισοπροπυλο-4,5-διμεθυλο" in comp0bText, slot 3):
// true once the render has emitted the standalone pieces. Pieces alternate
// name/locants/name; the first name keeps the comp3 slot id so every
// id-driven behavior for unfused molecules is unchanged.
function fSplitBranchPiecesActive() {
  try {
    return !!(typeof document !== "undefined" && document.getElementById("comp3loc"));
  } catch (eD) { return false; }
}
// Pure splitter for a fused branch-label slot. Returns the alternating
// pieces ([name, locants, name, ...]) or null when the slot is not fused.
// Names must be bare Greek-letter runs, locants bare digit runs — labels
// carrying their own dashes (sec-/tert-) stay a single fused box.
function fSplitBranchPieces(text) {
  var parts = String(text == null ? "" : text).split("-");
  if (parts.length < 3 || parts.length % 2 === 0) return null;
  var gk = "[\u0370-\u03ff\u1f00-\u1fff]";
  for (var k = 0; k < parts.length; k++) {
    if (parts[k] === "") return null;
    if (k % 2 === 0) {
      if (!new RegExp("^" + gk + "+$").test(parts[k])) return null;
    } else {
      if (!/^\d[\d,]*$/.test(parts[k])) return null;
    }
  }
  if (parts.join("-") !== String(text)) return null;
  return parts;
}
// k-th name group (1-based) inside slot 3, for per-piece explanation and
// highlight. Positional: slot-3 names follow the same alphabetical order in
// the fused string and in fGetHydrocarbonBranchGroup(2). Null (halogen-only
// or unmatched pieces) falls back to the slot-level sentences.
function fGetHydrocarbonBranchPiece(k) {
  var g = null;
  try { g = fGetHydrocarbonBranchGroup(2); } catch (eG) { g = null; }
  if (!g || !Array.isArray(g.names) || !Array.isArray(g.members)) return null;
  if (typeof k !== "number" || k < 1 || k > g.names.length) return null;
  var name = g.names[k - 1];
  var members = g.members.filter(function (b) { return b && b.name === name; });
  if (!members.length) return null;
  return { names: [name], members: members };
}
// Box id for a branch-piece mode ("compBranchSub1" -> "comp3",
// "compBranchLoc2" -> "comp3loc", "compBranchSub2" -> "comp3b",
// then "comp3loc2"/"comp3b2", ...). Null when the mode is not a piece mode.
function fBranchPieceBoxId(mode) {
  var m = /^compBranch(Sub|Loc)(\d+)$/.exec(String(mode == null ? "" : mode));
  if (!m) return null;
  var k = parseInt(m[2], 10);
  if (!(k >= 1)) return null;
  if (m[1] === "Sub") {
    if (k === 1) return "comp3";
    return "comp3b" + (k === 2 ? "" : String(k - 1));
  }
  if (k < 2) return null;
  return "comp3loc" + (k === 2 ? "" : String(k - 1));
}
function fBranchedSaturatedKetonePosition() {
  return typeof functionalGroupObj !== 'undefined' && functionalGroupObj &&
    functionalGroupObj.ketone && fSupportsAlkylBranchPrefixes() &&
    fIsAcyclicSaturatedMonoketoneGraph(atomConnectivityList, allAtomsTypeList, bondList) &&
    fGetHydrocarbonSubstituentInfo().length > 0;
}
// Keep the existing numbering policy elsewhere; animate explicit analysis
// of the new ketones and the ten carboxylic acids, not instant zoom/resize overlay restoration.
function fSequentialKetoneNumberingTarget() {
  return ['penten_2_yn_4_oic_acid', 'hexen_2_yn_4_dioic_acid',
    'methyl_2_propenoic_acid', 'ethyl_2_methyl_3_penten_2_yn_4_oic_acid',
    'ethyl_3_isopropyl_2_dimethyl_4_5_hexadien_2_4_dioic_acid',
    'ethyl_2_isopropyl_3_dimethyl_6_6_hepten_2_yn_4_dioic_acid',
    'methyl_2_propanoic_acid', 'dimethyl_2_2_propanoic_acid',
    'ethyl_2_methyl_3_pentanoic_acid',
    'ethyl_3_isopropyl_2_dimethyl_4_5_hexanoic_acid', 'pentanone_3', 'dimethyl_2_4_pentanone_3',
    'trimethyl_3_4_4_pentanone_2',
    'diethyl_4_5_dimethyl_2_6_heptanone_3',
    'penten_1_yn_4_one_3', 'dimethyl_4_5_hexen_5_yn_1_one_3',
    'methyl_6_hepten_3_dione_2_5', 'ethyl_3_methyl_4_octen_3_yn_5_dione_2_7',
    'isopropyl_4_dimethyl_3_6_octen_3_yn_7_dione_2_5'].includes(selectedMol);
}
function fShowAnalysisNumbering(time, overrideAtoms, overrideAtoms3D) {
  if (fSequentialKetoneNumberingTarget() && !Array.isArray(overrideAtoms)) {
    currNumberEl = 0;
    document.querySelectorAll('#jsmeNomeclatureSVG text[id^="number"]').forEach(el => el.remove());
    removeEcho3D();
    // Numbering policy: instant (time 0/missing), animated only for time > 0
    // (main-chain carbon-count component). The old-number cleanup above stays.
    fShowNumbering(time);
    return;
  }
  fShowNumbering(time, overrideAtoms, overrideAtoms3D);
}

function fExplainNameComp() {
  let myText, myClass, nStyle, countSubs, myCountText, myFG0, myFG1, myHTML;
  switch (nameAnalysisMode) {
    case "none":
      myText =
        "Κάνε κλικ σε ένα συνθετικό του ονόματος για να δεις την εξήγηση";
      nStyle =
        "color:#666; font-style:italic; font-weight:normal; border:0;background-color:transparent;font-size:1rem;box-shadow:0 0 #fff;";
      myClass = "";
      ruleFlag = false;
      numberingFlag = false;
      break;
    case "compNumber1":
      nStyle = "";
      myClass = "";
      const branchGroup_compNumber1 = fGetHydrocarbonBranchGroup(1);
      if (branchGroup_compNumber1) {
        myText = fHydrocarbonBranchExplanation(branchGroup_compNumber1, true);
        numberingFlag = true;
        fHighlightFG(1);
        fHighlightFG3D(1);
        fShowAnalysisNumbering(0);
        $("#ruleTheoryContainer").show();
        break;
      }
      if (nameComponentsList[1] !== null && nameComponentsList[1].length > 0) {
        if (
          nameComponentsList[3] !== null &&
          nameComponentsList[3].length > 0
        ) {
          myText = fIsMultiLocantComponent(nameComponentsList[0])
          ? ` Δηλώνει τις θέσεις της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(1)}.`
          : ` Δηλώνει τη θέση της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(1)}.`;
          fHighlightFG(1);
          fHighlightFG3D(1);
        } else {
          if (nameComponentsList[0].includes(",")) {
            countSubs = (nameComponentsList[0].match(/,/g) || []).length;
            switch (countSubs) {
              case 1:
                myCountText = " δύο ";
                break;
              case 2:
                myCountText = " τριών";
                break;
              default:
                myCountText = "";
            }

            myText = ` Δηλώνει τις θέσεις των ${myCountText} δευτερευουσών  Χαρακτηριστικών Ομάδών${fGetSecondaryGroupNounSuffix(1)}.`;
          } else {
            const branchPosName = fGetBranchDisplayName();
            if (branchPosName) {
              myText = ` Δηλώνει τη θέση της ανθρακικής διακλάδωσης (${branchPosName}).`;
            } else {
              myText = ` Δηλώνει τη θέση της δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(1)}.`;
            }
          }

          if (Object.keys(functionalGroupObj).length > 1) {
            fHighlightFG(1);
            fHighlightFG3D(1);
            myFG0 = functionalGroupsList[0];
            myFG1 = functionalGroupsList[1];
            ruleTableHighlight = fRule4KeysForFGs(myFG0, myFG1);
            $("#ruleTheoryContainer").show();
          } else {
            fHighlightFG();
            fHighlightFG3D();
          }
        }
      } else if (
        nameComponentsList[6] == "άν" ||
        nameComponentsList[6] == "αν"
      ) {
        if (nameComponentsList[0].includes(",")) {
          countSubs = (nameComponentsList[0].match(/,/g) || []).length;
          switch (countSubs) {
            case 1:
              myCountText = " δύο ";
              break;
            case 2:
              myCountText = " τριών";
              break;
            default:
              myCountText = "";
          }

          myText = ` Δηλώνει τις θέσεις των ${myCountText}  Χαρακτηριστικών Ομάδών${fGetPrincipalGroupNounSuffix(true)}.`;
        } else {
          myText = ` Δηλώνει τη θέση της Χαρακτηριστικής Ομάδας${fGetPrincipalGroupNounSuffix(false)}.`;
        }

        fHighlightFG();
        fHighlightFG3D();
      } else {
        switch (nameComponentsList[6]) {
          case "έν":
          case "εν":
            myText = " Δηλώνει τη θέση του διπλού δεσμού.";
            ruleTableHighlight = "r2-double";
            break;
          case "διέν":
          case "διεν":
            myText = " Δηλώνει τις θέσεις των διπλών δεσμών.";
            ruleTableHighlight = "r2-didouble";
            break;
          case "ίν":
          case "ιν":
            myText = " Δηλώνει τη θέση του τριπλού δεσμού.";
            ruleTableHighlight = "r2-triple";
            break;
          case "διίν":
          case "διιν":
            myText = " Δηλώνει τις θέσεις των τριπλών δεσμών.";

            ruleTableHighlight = "r2-ditriple";
            break;
          default:
          // myText = " Δηλώνει τη θέση του Πολλαπλού Δεσμού."
        }
        fHighlightMultiBonds(1);
        fHighlightMultiBonds3D(1);
        //
        $("#ruleTheoryContainer").show();
      }
      numberingFlag = true;
      fShowAnalysisNumbering(0);
      break;
    case "compSecondSub1":
      numberingFlag = false;
      nStyle = "";
      myClass = "";
      const branchGroup_compSecondSub1 = fGetHydrocarbonBranchGroup(1);
      if (branchGroup_compSecondSub1) {
        myText = fHydrocarbonBranchExplanation(branchGroup_compSecondSub1, false);
        numberingFlag = false;
        fHighlightFG(1);
        fHighlightFG3D(1);
        $("#ruleTheoryContainer").show();
        break;
      }
      if (
        functionalGroupsList.length === 1 &&
        functionalGroupsList[0] === "ether"
      ) {
        // IUPAC alkoxy prefix (e.g. μεθοξυ): highlight O + alkoxy fragment,
        // number the alkoxy chain only.
        myText = ` Δηλώνει το όνομα της αλκοξυομάδας${fGetSecondaryGroupNounSuffix(1)}.`;
        fHighlightFG(1);
        fHighlightFG3D(1);
        numberingFlag = true;
        fShowAnalysisNumbering(0, fGetEtherAlkoxyChain(), fGetEtherAlkoxyChain3D());
        $("#ruleTheoryContainer").show();
        break;
      }
      if (nameComponentsList[3] !== null && nameComponentsList[3].length > 0) {
        myText = fGetNameComponentMultiplier(nameComponentsList[1]) > 1
          ? ` Δηλώνει το πλήθος των δευτερευουσών Χαρακτηριστικών Ομάδων${fGetSecondaryGroupNounSuffix(1)}.`
          : ` Δηλώνει το όνομα  της πρώτης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(1)}.`;
        fHighlightFG(1);
        fHighlightFG3D(1);
      } else {
        if (Object.keys(functionalGroupObj).length > 1) {
          fHighlightFG(1);
          fHighlightFG3D(1);

          // Βρισκει τις υπαρχουσες ΧΟ και επιλέγει τη σειρά στον πινακα
          myFG0 = functionalGroupsList[0];
          myFG1 = functionalGroupsList[1];
          ruleTableHighlight = fRule4KeysForFGs(myFG0, myFG1);
          $("#ruleTheoryContainer").show();
        } else {
          fHighlightFG();
          fHighlightFG3D();
        }
        const branchSubName = fGetBranchDisplayName();
        if (branchSubName) {
          myText = ` Δηλώνει το όνομα της ανθρακικής διακλάδωσης (${branchSubName}).`;
        } else {
          myText = fGetNameComponentMultiplier(nameComponentsList[1]) > 1
            ? ` Δηλώνει το πλήθος των δευτερευουσών Χαρακτηριστικών Ομάδων${fGetSecondaryGroupNounSuffix(1)}.`
            : ` Δηλώνει το όνομα της δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(1)}.`;
        }
      }

      break;
    case "compNumber2":
      nStyle = "";
      myClass = "";
      const branchGroup_compNumber2 = fGetHydrocarbonBranchGroup(2);
      if (branchGroup_compNumber2) {
        myText = fHydrocarbonBranchExplanation(branchGroup_compNumber2, true);
        numberingFlag = true;
        fHighlightFG(2);
        fHighlightFG3D(2);
        fShowAnalysisNumbering(0);
        $("#ruleTheoryContainer").show();
        break;
      }
      myText = fIsMultiLocantComponent(nameComponentsList[2])
          ? ` Δηλώνει τις θέσεις της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(2)}.`
          : ` Δηλώνει τη θέση της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(2)}.`;
      numberingFlag = true;

      fHighlightFG(2);
      fHighlightFG3D(2);
      fShowAnalysisNumbering(0);
      break;
    case "compSecondSub2":
      nStyle = "";
      myClass = "";
      const branchGroup_compSecondSub2 = fGetHydrocarbonBranchGroup(2);
      if (branchGroup_compSecondSub2) {
        myText = fHydrocarbonBranchExplanation(branchGroup_compSecondSub2, false);
        numberingFlag = false;
        fHighlightFG(2);
        fHighlightFG3D(2);
        $("#ruleTheoryContainer").show();
        break;
      }
      myText = fGetNameComponentMultiplier(nameComponentsList[3]) > 1
          ? ` Δηλώνει το πλήθος των δευτερευουσών Χαρακτηριστικών Ομάδων${fGetSecondaryGroupNounSuffix(2)}.`
          : ` Δηλώνει το όνομα  της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(2)}.`;
      numberingFlag = false;
      fHighlightFG(2);
      fHighlightFG3D(2);
      break;
    case "compBondPos":
      nStyle = "";
      myClass = "";
      if (fBranchedSaturatedKetonePosition()) {
        myText = ' Δηλώνει τη θέση της καρβονυλομάδας (>C=O).';
        ruleTableHighlight = 'r3-ketones';
        fHighlightFG(); fHighlightFG3D();
        numberingFlag = true; fShowAnalysisNumbering(0);
        $('#ruleTheoryContainer').show();
        break;
      }
      if (fAlcoholOHNameComponent() === 'compBondPos') {
        myText = fAlcoholOHPositionText();
        ruleTableHighlight = "r3-alcohols";
        fHighlightFG(); fHighlightFG3D();
        numberingFlag = true; fShowAnalysisNumbering(0);
        $("#ruleTheoryContainer").show();
        break;
      }
      switch (nameComponentsList[6]) {
        case "έν":
        case "εν":
          myText = " Δηλώνει τη θέση του διπλού δεσμού.";
          ruleTableHighlight = "r2-double";
          break;
        case "ίν":
        case "ιν":
          myText = " Δηλώνει τη θέση του τριπλού δεσμού.";
          ruleTableHighlight = "r2-triple";
          break;
        case "διέν":
        case "διεν":
          myText = " Δηλώνει τις θέσεις των διπλών δεσμών.";
          ruleTableHighlight = "r2-didouble";
          break;
        default:
          myText = " Δηλώνει τη θέση του Πολλαπλού Δεσμού.";
      }
      fHighlightMultiBonds(1);
      fHighlightMultiBonds3D(1);
      numberingFlag = true;
      fShowAnalysisNumbering(0);
      $("#ruleTheoryContainer").show();
      break;
    case "compCarbonsCount":
      if (fIsSingleEster()) {
        // Ester acid-stem click (e.g. αιθ-): the name counts the ACID carbons,
        // so text + highlight + numbering follow the acid fragment, not the
        // longest chain (which may run through the alcohol part).
        myText = `Το οξύ-τμήμα του εστέρα έχει ${esterInfo.acidLen} άτομα άνθρακα C`;
        nStyle = "";
        myClass = "";
        ruleTableHighlight = `r1-c${esterInfo.acidLen}`;
        numberingFlag = true;
        var _acidChain = fGetEsterAcidChain();
        var _acidChain3D = fGetEsterAcidChain3D();
        // Numbering highlight, atoms and bonds gated independently
        // (either checkbox alone still paints its half).
        var _showA = false, _showB = true;
        try { _showA = $("#highlightNumberingCheck").hasClass("selectedCheck"); } catch (eA) { _showA = false; }
        try { _showB = (typeof fShowNumberingBonds === "function") ? fShowNumberingBonds() : true; } catch (eB2) { _showB = true; }
        if (_showA || _showB) {
          if (_acidChain && _acidChain.length > 0) fHighlightAtomChain(_acidChain, true, !_showB, !_showA);
          if (_acidChain3D && _acidChain3D.length > 0) fHighlightAtomChain3D(_acidChain3D, true, !_showB, !_showA);
        }
        fShowAnalysisNumbering(0, _acidChain, _acidChain3D);
        $("#ruleTheoryContainer").show();
        break;
      }
      myText = `Η κύρια αλυσίδα έχει ${mainChainAtomsList.length} άτομα άνθρακα C`;
      nStyle = "";
      myClass = "";
      ruleTableHighlight =
        `r1-c${Array.isArray(mainChainAtomsList) && mainChainAtomsList.length
          ? mainChainAtomsList.length
          : carbons}`;
      numberingFlag = true;
      // Numbering highlight, atoms and bonds gated independently
      // (either checkbox alone still paints its half).
      var _showA2 = false, _showB2 = true;
      try { _showA2 = $("#highlightNumberingCheck").hasClass("selectedCheck"); } catch (eA2) { _showA2 = false; }
      try { _showB2 = (typeof fShowNumberingBonds === "function") ? fShowNumberingBonds() : true; } catch (eB3) { _showB2 = true; }
      if (_showA2) fHighLightMainChain();
      if (_showB2) fHighLightMainChainBonds();
      if (_showA2 || _showB2) fHighlightAtomChain3D(mainChainAtoms3D, true, !_showB2, !_showA2);
      // Main-chain carbon-count component: the sole animated numbering reveal.
      fShowAnalysisNumbering(400);
      $("#ruleTheoryContainer").show();
      break;
    case "compBondType":
      switch (nameComponentsList[6]) {
        case "αν":
        case "άν":
          myText = "μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-single";
          break;
        case "εν":
        case "έν":
          myText = "έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-double";
          break;
        case "ίν":
        case "ιν":
          myText = "έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-triple";
          break;
        case "διέν":
        case "διεν":
          myText = "δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-didouble";
          break;
        default:
          myText = "μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-single";
      }
      myText = `Έχει ${myText}`;
      nStyle = "";
      myClass = "";
      numberingFlag = false;
      if (nameComponentsList[6] === "αν" || nameComponentsList[6] === "άν") {
        if (fIsSingleEster()) {
          // Ester -αν-: only the acid C–C single bond(s), not every C–C single
          // bond in the molecule (the alcohol part has its own boxes).
          fHighlightSingleBondsCC(fGetEsterAcidChain());
          fHighlightSingleBondsCC3D(fGetEsterAcidChain3D());
        } else {
          fHighlightSingleBondsCC();
          fHighlightSingleBondsCC3D();
        }
      } else {
        fHighlightMultiBonds(1);
        fHighlightMultiBonds3D(1);
      }
      $("#ruleTheoryContainer").show();
      break;
    case "compBondType2":
      switch (nameComponentsList[8]) {
        case "άν":
          myText = "μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-single";
          break;
        case "αν":
          myText = "μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-single";
          break;
        case "έν":
          myText = "έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-double";
          break;
        case "εν":
          myText = "έναν διπλό δεσμο μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-double";
          break;
        case "ίν":
          myText = "έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-triple";
          break;
        case "ιν":
          myText = "έναν τριπλό δεσμό μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-triple";
          break;
        case "διέν":
          myText = "δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-didouble";
          break;
        case "διεν":
          myText = "δύο διπλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-didouble";
          break;
        default:
          myText = "μόνο απλούς δεσμούς μεταξύ των ατόμων άνθρακα";
          ruleTableHighlight = "r2-single";
      }
      myText = `Έχει ${myText}`;
      nStyle = "";
      myClass = "";
      numberingFlag = false;
      fHighlightMultiBonds(2);
      fHighlightMultiBonds3D(2);
      $("#ruleTheoryContainer").show();
      break;
    case "compEndNumber":
      nStyle = "";
      myClass = "";
      if (functionalGroupsList.length === 1 && functionalGroupsList[0] === 'ketone' &&
          fIsAcyclicKetoneGraph(atomConnectivityList, allAtomsTypeList, bondList) &&
          !fIsAcyclicSaturatedMonoketoneGraph(atomConnectivityList, allAtomsTypeList, bondList) &&
          nameComponentsList[8].length === 0) {
        myText = ' Δηλώνει ' + (functionalGroupObj.ketone.O.length > 1 ? 'τις θέσεις των καρβονυλομάδων' : 'τη θέση της καρβονυλομάδας') + ' (>C=O).';
        ruleTableHighlight = 'r3-ketones';
        fHighlightFG(); fHighlightFG3D();
        numberingFlag = true; fShowAnalysisNumbering(0);
        $('#ruleTheoryContainer').show();
        break;
      }
      if (fAlcoholOHNameComponent() === 'compEndNumber' || nameComponentsList[8].length === 0) {
        fHighlightFG();
        fHighlightFG3D();
        myText = fAlcoholOHNameComponent() === 'compEndNumber' ? fAlcoholOHPositionText()
          : ` Δηλώνει τη θέση της  Χαρακτηριστικής Ομάδας${fGetPrincipalGroupNounSuffix(false)}.`;
      } else {
        myText = " Δηλώνει τη θέση του τριπλού δεσμού.";
        ruleTableHighlight = "r2-triple";
        fHighlightMultiBonds3D(2);
        fHighlightMultiBonds(2);
      }
      numberingFlag = true;
      fShowAnalysisNumbering(0);
      break;
    case "compSuffixLocants": {
      // Split-off suffix locants ("-2,7-" beside "διόνη"): positions only.
      // The class sentence stays on the suffix box (compSuffix mode).
      nStyle = "";
      myClass = "";
      const _locKetone = typeof functionalGroupsList !== "undefined" && functionalGroupsList &&
        functionalGroupsList.length === 1 && functionalGroupsList[0] === 'ketone' &&
        fIsAcyclicKetoneGraph(atomConnectivityList, allAtomsTypeList, bondList) &&
        multiBondsObj.CCd.length > 0 && multiBondsObj.CCt.length > 0;
      if (_locKetone) {
        const _locN = functionalGroupObj.ketone.O.length;
        myText = _locN > 1
          ? 'Δηλώνει τις θέσεις των ' + _locN + ' καρβονυλομάδων (>C=O).'
          : 'Δηλώνει τη θέση της καρβονυλομάδας (>C=O).';
        ruleTableHighlight = "r3-ketones";
      } else if (fAlcoholOHNameComponent() === 'compSuffix') {
        myText = fAlcoholOHPositionText().trim();
        ruleTableHighlight = 'r3-alcohols';
      } else {
        // Defensive: locants box without a split parent — class statement.
        myText = "Ανήκει στη Χημική Τάξη " + molTaxonomy + ".";
      }
      if (molTaxonomy != "Υδρογονάνθρακες") {
        if (Object.keys(functionalGroupObj).length > 1) {
          fHighlightFG(2);
          fHighlightFG3D(2);
        } else {
          fHighlightFG();
          fHighlightFG3D();
        }
      }
      numberingFlag = true;
      fShowAnalysisNumbering(0);
      $("#ruleTheoryContainer").show();
      break;
    }
    case "compSuffix":
      // myText = "Ανήκει στη χημική τάξη " + molTaxonomy;
      const chemicalClass =
        nameExamples[selectedMol]?.classification?.chemicalClass;

      const myChemClass = chemicalClassLabels[chemicalClass] || molTaxonomy;
      const _seriesKey = nameExamples[selectedMol]?.classification?.seriesKey;
      const _seriesLabel =
        (typeof homologousSeriesLabels !== "undefined" && _seriesKey && homologousSeriesLabels[_seriesKey]) || "";
      myText = `Ανήκει στη Χημική Τάξη ${myChemClass}`;
      if (_seriesLabel && _seriesLabel.toLocaleLowerCase("el") !== myChemClass.toLocaleLowerCase("el")) {
        myText += ` και στην Ομόλογη Σειρά ${_seriesLabel}.`;
      } else {
        myText += ".";
      }
      if (typeof currentMolCommonName !== "undefined" && currentMolCommonName) {
        myText += ` Κοινή ονομασία: ${currentMolCommonName}`;
      }
      nStyle = "";
      myClass = "";

      switch (myChemClass) {
        case "Υδρογονάνθρακες":
          ruleTableHighlight = "r3-hydrocarbons";
          break;
        case "Αλκυλαλογονίδια":
          ruleTableHighlight = "r3-alkyl-halides";
          break;
        case "Νιτροενώσεις":
          ruleTableHighlight = "r3-nitro";
          break;
        case "Αλκοόλες":
          ruleTableHighlight = "r3-alcohols";
          break;
        case "Αλδεΰδες":
          ruleTableHighlight = "r3-aldehydes";
          break;
        case "Κετόνες":
          ruleTableHighlight = "r3-ketones";
          break;
        case "Καρβονυλικές Ενώσεις":
          // Single row via series below (Αλδεϋδες=5 xor Κετόνες=6).
          break;
        case "Καρβοξυλικά Οξέα":
          ruleTableHighlight = "r3-carboxylic-acids";
          break;
        case "Νιτρίλια":
          ruleTableHighlight = "r3-nitriles";
          break;
        case "Αιθέρες":
          ruleTableHighlight = "r3-ethers";
          break;
        case "Εστέρες":
          ruleTableHighlight = "r3-esters";
          break;
      }
      if (chemicalClass === "carbonylCompounds") {
        if (_seriesKey === "aldehyde") ruleTableHighlight = "r3-aldehydes";
        else if (_seriesKey === "ketone") ruleTableHighlight = "r3-ketones";
      }
      const ketoneSuffixLocants = functionalGroupsList.length === 1 && functionalGroupsList[0] === 'ketone' &&
        fIsAcyclicKetoneGraph(atomConnectivityList, allAtomsTypeList, bondList) &&
        multiBondsObj.CCd.length > 0 && multiBondsObj.CCt.length > 0;
      numberingFlag = fAlcoholOHNameComponent() === 'compSuffix' || ketoneSuffixLocants;
      // Split suffix: the positions sentences live on the standalone
      // locants box (compSuffixLocants mode) — the suffix keeps the class
      // statement, the highlight, and no numbering.
      const _splitLoc = fSplitSuffixLocantsActive();
      if (_splitLoc) numberingFlag = false;
      if (!_splitLoc && ketoneSuffixLocants) myText += ' Δηλώνει ' + (functionalGroupObj.ketone.O.length > 1 ? 'τις θέσεις των καρβονυλομάδων' : 'τη θέση της καρβονυλομάδας') + ' (>C=O).';
      if (!_splitLoc && fAlcoholOHNameComponent() === 'compSuffix') {
        myText += fAlcoholOHPositionText();
      }
      if (molTaxonomy != "Υδρογονάνθρακες") {
        if (Object.keys(functionalGroupObj).length > 1) {
          fHighlightFG(2);
          fHighlightFG3D(2);
        } else {
          fHighlightFG();
          fHighlightFG3D();
        }
      }
      if (numberingFlag) fShowAnalysisNumbering(0);
      $("#ruleTheoryContainer").show();
      break;
    case "commonAlkyl1":
    case "commonAlkyl2": {
      // COMMON alkyl click: highlight that alkyl chain only (no O), number it.
      nStyle = "";
      myClass = "";
      const _parts = fGetEtherCommonParts();
      const _idx = nameAnalysisMode === "commonAlkyl1" ? 0 : 1;
      const _part = _parts && _parts.parts ? _parts.parts[_idx] : null;
      if (_parts && _parts.symmetric) {
        myText =
          _idx === 0
            ? "Δηλώνει το πρόθεμα δι- του συμμετρικού αιθέρα."
            : "Δηλώνει το αλκύλιο του συμμετρικού αιθέρα.";
      } else {
        myText =
          _idx === 0
            ? "Δηλώνει το πρώτο αλφαβητικά αλκύλιο του αιθέρα."
            : "Δηλώνει το δεύτερο αλφαβητικά αλκύλιο του αιθέρα.";
      }
      const _chain = _part && Array.isArray(_part.chain) ? _part.chain : null;
      const _chain3D = _part && Array.isArray(_part.chain3D) ? _part.chain3D : null;
      if (_chain && _chain.length > 0) {
        fHighlightAtomChain(_chain, true);
        fHighlightAtomChain3D(_chain3D);
        // 3D bonds are not covered by the halo path — color the alkyl C–C
        // and C–H bonds explicitly (both ends in the chain), like the ester triad.
        fColorFragmentBonds3D(_chain3D, true);
      }
      numberingFlag = true;
      fShowAnalysisNumbering(
        0,
        _part ? _part.numberChain : null,
        _part ? _part.numberChain3D : null,
      );
      break;
    }
    case "esterAlkyl": {
      // Ester alcohol-part click (e.g. μεθυλ): highlight O + alcohol chain, number it.
      nStyle = "";
      myClass = "";
      myText = "Δηλώνει το αλκυλο-τμήμα του εστέρα (από την αλκοόλη).";
      const _alcChain = fGetEsterAlcoholChain();
      const _alcChain3D = fGetEsterAlcoholChain3D();
      if (_alcChain && _alcChain.length > 0) {
        fHighlightAtomChain(_alcChain, true);
        fHighlightAtomChain3D(_alcChain3D);
        // Alkyl rule: alcohol-part C–C and C–H bonds go green explicitly.
        fColorFragmentBonds3D(_alcChain3D, true);
      }
      numberingFlag = true;
      fShowAnalysisNumbering(0, _alcChain, _alcChain3D);
      break;
    }
    case "esterEster":
      // Ester noun click (εστέρας): highlight triad O-C(=O)-O, no numbering.
      nStyle = "";
      myClass = "";
      myText = "Ανήκει στη χημική τάξη Εστέρες.";
      ruleTableHighlight = "r3-esters";
      fHighlightAtomChain(fGetEsterGroupFragment());
      fHighlightAtomChain3D(fGetEsterGroupFragment3D(), true);
      // 3D bonds: color each fragment bond explicitly (both ends in fragment),
      // mirroring the 2D both-ends logic. Ester-branch only — the shared
      // fHighlightAtomChain3D paints the same green, so this stays as the
      // explicit alkyl guarantee; main-chain numbering bonds follow the
      // numbering-bonds setting instead.
      var _estFrag3D = fGetEsterGroupFragment3D() || [];
      if (typeof bondList3D !== "undefined" && _estFrag3D.length > 0) {
        for (var _eb = 0; _eb < bondList3D.length; _eb++) {
          if (!bondList3D[_eb]) continue;
          if (
            _estFrag3D.indexOf(bondList3D[_eb][0]) >= 0 &&
            _estFrag3D.indexOf(bondList3D[_eb][1]) >= 0
          ) {
            Jmol.script(
              jmolAppletNomeclature,
              "select atomno=" + bondList3D[_eb][0] + ", atomno=" + bondList3D[_eb][1] + "; color bond [X79dc6d];",
            );
          }
        }
      }
      numberingFlag = false;
      $("#ruleTheoryContainer").show();
      break;
    case "commonEther":
      // COMMON αιθέρας click: highlight C-O-C, no numbering.
      nStyle = "";
      myClass = "";
      myText = "Ανήκει στη χημική τάξη Αιθέρες (κοινή ονομασία).";
      ruleTableHighlight = "r3-ethers";
      fHighlightFG();
      fHighlightFG3D();
      // 3D bonds are not covered by the halo path — color exactly the two
      // C–O bonds explicitly (both ends in the C-O-C fragment; no C–H by
      // design for the αιθέρας group), like the ester triad.
      fColorFragmentBonds3D(fGetEtherGroupFragment3D());
      numberingFlag = false;
      $("#ruleTheoryContainer").show();
      break;
    default: {
      // Split branch-label pieces (slot 3, comp0bText): per-piece scope — a
      // name piece explains/highlights that substituent, a locants piece
      // numbers. Anything else keeps the generic prompt below.
      const _bpx = /^compBranch(Sub|Loc)(\d+)$/.exec(nameAnalysisMode || "");
      if (_bpx) {
        nStyle = "";
        myClass = "";
        const _pk = parseInt(_bpx[2], 10);
        let _pg = null;
        try { _pg = fGetHydrocarbonBranchPiece(_pk); } catch (ePg) { _pg = null; }
        const _isLoc = _bpx[1] === "Loc";
        if (_pg) {
          myText = fHydrocarbonBranchExplanation(_pg, _isLoc);
          numberingFlag = _isLoc;
          fHighlightFG(2);
          fHighlightFG3D(2);
          if (_isLoc) fShowAnalysisNumbering(0);
          $("#ruleTheoryContainer").show();
        } else if (_isLoc) {
          myText = fIsMultiLocantComponent(nameComponentsList[2])
            ? ` Δηλώνει τις θέσεις της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(2)}.`
            : ` Δηλώνει τη θέση της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(2)}.`;
          numberingFlag = true;
          fHighlightFG(2);
          fHighlightFG3D(2);
          fShowAnalysisNumbering(0);
        } else {
          myText = fGetNameComponentMultiplier(nameComponentsList[3]) > 1
            ? ` Δηλώνει το πλήθος των δευτερευουσών Χαρακτηριστικών Ομάδων${fGetSecondaryGroupNounSuffix(2)}.`
            : ` Δηλώνει το όνομα  της δεύτερης αλφαβητικά δευτερεύουσας Χαρακτηριστικής Ομάδας${fGetSecondaryGroupNounSuffix(2)}.`;
          numberingFlag = false;
          fHighlightFG(2);
          fHighlightFG3D(2);
        }
        break;
      }
      myText =
        "Κάνε κλικ σε ένα συστατικό του ονόματος για να δεις την εξήγηση";
      nStyle = "color:#666; font-style:italic; font-weight:normal; border:0;";
      myClass = "";
    }
  }
  fShowRule(nameAnalysisMode);
  myHTML = `<div class='explainText ${myClass} ' style='${nStyle}'  >${myText}</div>`;
  $("#nameAnalysisExplain").html(myHTML);
  fFitNameComponents();
}

// ── fShowRule ─────────────────────────────────────────────────────────────

function fShowRule(theRule) {
  let ruleText, ruleTable, ruleTitle, myStyle, myClass, myHTML;
  let alkylRows = null;
  let alkoxyRow = null;
  if (theRule === fAlcoholOHNameComponent()) {
    theRule = 'compSuffix';
    ruleTableHighlight = 'r3-alcohols';
  }
  switch (theRule) {
    case "compNumber1":
    case "compNumber2": {
      const group = fGetHydrocarbonBranchGroup(theRule === "compNumber2" ? 2 : 1);
      if (group) {
        ruleText = namingRules.alkylRule;
        ruleTable = namingRules.alkylTable;
        ruleTitle = "Ονόματα αλκυλίων και προθέματα";
        alkylRows = group.names.map(function (name) { return "alkyl-" + name; });
      } else if (Object.keys(functionalGroupObj).length > 1) {
        ruleText = namingRules.rule4;
        ruleTable = namingRules.table4;
        ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων";
      } else {
        ruleText = namingRules.rule2;
        ruleTable = namingRules.table2;
        ruleTitle = "Κανόνας συνθετικού τύπου δεσμών";
      }
      break;
    }
    case "compSecondSub1":
    case "compSecondSub2": {
      const group = fGetHydrocarbonBranchGroup(theRule === "compSecondSub2" ? 2 : 1);
      if (group) {
        ruleText = namingRules.alkylRule;
        ruleTable = namingRules.alkylTable;
        ruleTitle = "Ονόματα αλκυλίων και προθέματα";
        alkylRows = group.names.map(function (name) { return "alkyl-" + name; });
      } else {
        ruleText = namingRules.rule4;
        ruleTable = namingRules.table4;
        ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων";
      }
      break;
    }
    case "compCarbonsCount":
      ruleText = namingRules.rule1;
      ruleTable = namingRules.table1;
      ruleTitle = "Κανόνας συνθετικού ανθρακικής αλυσίδας";
      break;
    case "compBondPos":
      if (fBranchedSaturatedKetonePosition()) {
        ruleText = namingRules.rule3; ruleTable = namingRules.table3;
        ruleTitle = "Κανόνας συνθετικού χημικής τάξης";
        break;
      }
    case "compBondType":
    case "compBondType2":
    case "compEndNumber":
      ruleText = namingRules.rule2;
      ruleTable = namingRules.table2;
      ruleTitle = "Κανόνας συνθετικού τύπου δεσμών";
      break;
    case "compSuffix":
    case "compSuffixLocants":
      ruleText = namingRules.rule3;
      ruleTable = namingRules.table3;
      ruleTitle = "Κανόνας συνθετικού χημικής τάξης";
      break;
    case "commonEther":
      ruleText = namingRules.rule3;
      ruleTable = namingRules.table3;
      ruleTitle = "Κανόνας συνθετικού χημικής τάξης";
      break;
    case "commonAlkyl1":
    case "commonAlkyl2":
    case "esterAlkyl":
      ruleText = "";
      ruleTable = "";
      ruleTitle = "";
      break;
    case "esterEster":
      ruleText = namingRules.rule3;
      ruleTable = namingRules.table3;
      ruleTitle = "Κανόνας συνθετικού χημικής τάξης";
      break;
    case "none":
      ruleText = "";
      ruleTable = "";
      ruleTitle = "";
      break;
    default: {
      // Split branch-label pieces: same alkyl rule/table as the slot-level
      // branch modes, with rows scoped to the clicked substituent.
      const _rbpx = /^compBranch(Sub|Loc)(\d+)$/.exec(theRule || "");
      if (_rbpx) {
        const _rpg = fGetHydrocarbonBranchPiece(parseInt(_rbpx[2], 10));
        if (_rpg) {
          ruleText = namingRules.alkylRule;
          ruleTable = namingRules.alkylTable;
          ruleTitle = "Ονόματα αλκυλίων και προθέματα";
          alkylRows = _rpg.names.map(function (name) { return "alkyl-" + name; });
        } else {
          ruleText = namingRules.rule4;
          ruleTable = namingRules.table4;
          ruleTitle = "Σειρά ισχύος Χαρακτηριστικών Ομάδων";
        }
        break;
      }
      ruleText = "";
      ruleTable = "";
      ruleTitle = "";
    }
  }

  if ((theRule === "compNumber1" || theRule === "compSecondSub1" ||
       theRule === "compNumber2" || theRule === "compSecondSub2" ||
       /^compBranch(Sub|Loc)\d+$/.test(theRule || "")) &&
      typeof selectedMol !== "undefined" && selectedMol &&
      Array.isArray(atomConnectivityList) && Array.isArray(allAtomsTypeList) && Array.isArray(bondList) &&
      typeof fIsAcyclicMonoetherGraph === "function" &&
      fIsAcyclicMonoetherGraph(atomConnectivityList, allAtomsTypeList, bondList)) {
    const etherGroups = fEtherPrefixGroups();
    const alkoxy = etherGroups.find(g => g.kind === "alkoxy");
    const slot = (theRule === "compSecondSub1" || theRule === "compNumber1") ? 1 : 2;
    const selectedGroups = slot === 1 ? etherGroups.slice(0, 1) : etherGroups.slice(1);
    if (alkoxy && selectedGroups.length === 1 && selectedGroups[0].kind === "alkoxy") {
      ruleText = namingRules.alkoxyRule;
      ruleTable = namingRules.alkoxyTable;
      ruleTitle = "Ονόματα αλκοξυομάδων και προθέματα";
      alkoxyRow = "alkoxy-" + alkoxy.name;
    }
  }
  const pilotRule = typeof fScenarioShowComponentRule === "function" &&
    fScenarioShowComponentRule(theRule);
  if (pilotRule) $("#ruleTheoryContainer").show();
  if (ruleFlag && !pilotRule) {
    myStyle = "display: block;";
    myClass = "open";
  } else {
    myStyle = "display:none;";
    myClass = "closed";
  }

  myHTML = `
  <div class='ruleTheory' >
  <div class='ruleTile ${myClass}' id='ruleTitle'> ${ruleTitle} </div>
  <div id='ruleContainer' style='${myStyle}'><div class='ruleText' >${ruleText}</div><div class='ruleTable' >${ruleTable}</div></div>
  </div>`;

  $("#ruleTheoryContainer").html(myHTML);

  if (alkylRows) {
    alkylRows.forEach(function (key) {
      $("#ruleContainer [data-row='" + key + "']").addClass("selected");
    });
  }
  if (alkoxyRow) {
    $("#ruleContainer [data-row='" + alkoxyRow + "']").addClass("selected");
  }

  // Key-based highlight: rows carry data-row="rN-key" (see fInitTheory tables).
  // Row order no longer matters — moves/additions need no code changes.
  if (typeof ruleTableHighlight === "string" && ruleTableHighlight) {
    $(`#ruleContainer [data-row="${ruleTableHighlight}"]`).addClass("selected");
  }
  if (Array.isArray(ruleTableHighlight)) {
    $("#ruleContainer .ruleText").addClass("hideTopRow");
    if (ruleTableHighlight[0]) {
      $(`#ruleContainer [data-row="${ruleTableHighlight[0]}"]`).addClass(
        "selected selectedB",
      );
    }
    if (ruleTableHighlight[1]) {
      $(`#ruleContainer [data-row="${ruleTableHighlight[1]}"]`).addClass(
        "selected selectedA",
      );
    }
  }
}

// ── fAdjustRuleContainerHeight ────────────────────────────────────────────

function fAdjustRuleContainerHeight() {
  let ruleElement, myTop, myBottom, ruleContainerHeight;
  ruleElement = document.querySelector(".ruleTable");
  if (!ruleFlag) {
    ruleElement.setAttribute("style", " max-height: none ");
  } else {
    myTop = document
      .querySelector("#ruleContainer .ruleTable")
      .getBoundingClientRect().top;
    myBottom = document
      .querySelector("#molRepColumn")
      .getBoundingClientRect().bottom;
    ruleContainerHeight = myBottom - myTop;
    ruleElement.setAttribute(
      "style",
      ` max-height:${ruleContainerHeight}px; overflow:auto; `,
    );
  }
}

// Stored main-chain keys use _Condensed/_Expanded/_Skeletal; modeSuffix
// carries the MOL _2D_* form, so chain lookups use this mapping.
function fMainChainKeySuffix() {
  return mode2D === "expanded"
    ? "_Expanded"
    : mode2D === "skeletal" || mode2D === "condensedZigZag"
      ? "_Skeletal"
      : "_Condensed";
}

// ── fHighLightMainChain ───────────────────────────────────────────────────

function fHighLightMainChain() {
  if (nameAnalysisMode == "none") {
    return;
  }

  const _storedChain = nameExamples[selectedMol]
    ? nameExamples[selectedMol]["mainChain" + fMainChainKeySuffix()]
    : null;
  highAtoms =
    mainChainMode === "algorithmic" ||
    !Array.isArray(_storedChain) ||
    _storedChain.length === 0
      ? mainChainAtomsList
      : _storedChain;

  let highAtomsArg = "";
  for (let i = 0; i < highAtoms.length; i++) {
    highAtomsArg += highAtoms[i] + ",9";
    if (i < highAtoms.length - 1) {
      highAtomsArg += ",";
    }
  }
  jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

  fUpdateSVG();
}

// ── fHighLightMainChainBonds ─────────────────────────────────────────────
// 2D companion to fHighLightMainChain: paints every bond with both ends in
// the same resolved chain (any order, green 9, 3D parity). Separate function
// so the numbering-bonds setting gates bonds independently of the atoms
// setting; the caller decides. Sole numbering-path use (via compCarbonsCount).
function fHighLightMainChainBonds() {
  if (nameAnalysisMode == "none") {
    return;
  }

  const _storedChain = nameExamples[selectedMol]
    ? nameExamples[selectedMol]["mainChain" + fMainChainKeySuffix()]
    : null;
  const _chain =
    mainChainMode === "algorithmic" ||
    !Array.isArray(_storedChain) ||
    _storedChain.length === 0
      ? mainChainAtomsList
      : _storedChain;
  if (!Array.isArray(_chain) || _chain.length === 0 || typeof bondList === "undefined") {
    return;
  }
  const _chainSet = new Set(_chain);
  const _bondArgs = [];
  for (let b = 0; b < bondList.length; b++) {
    if (!bondList[b]) continue;
    if (_chainSet.has(bondList[b][0]) && _chainSet.has(bondList[b][1])) {
      _bondArgs.push((b + 1) + ",9");
    }
  }
  if (_bondArgs.length > 0) jsmeNomeclatureApplet.setBondBackgroundColors(0, _bondArgs.join(","));

  fUpdateSVG();
}

// ── Main-chain stepper (v47, in the name-settings panel) ───────────────────────
// Compact block: fStepMainChain(dir) + fRenderChainStepper() (+ helpers).
// Walks the FG-aware multiple-bond-first pool (core mainChainPool, rank-parallel
// mainChainPool3D). Swaps the live chain globals and recomputes name +
// substituents per candidate WITHOUT disturbing teaching state
// (nameAnalysisMode, boxes, rule theory untouched — stepping only refreshes
// the selected component's highlight via the click sequence). Pool[0] is the
// adopted main chain; loading a molecule restores it. Algorithmic mode only;
// scenario steps capture the pool index (chainIdx, v47 additive) and
// re-assert it after the step load.

function fMainChainPoolLive() {
  return (typeof mainChainPool !== "undefined" && Array.isArray(mainChainPool)) ? mainChainPool : [];
}

function fChainStepper3DFresh() {
  try {
    return (typeof mainChainPool3D !== "undefined" && Array.isArray(mainChainPool3D) &&
      typeof mainChainPool3DKey !== "undefined" && typeof selectedMol !== "undefined" &&
      mainChainPool3DKey !== null && mainChainPool3DKey === selectedMol);
  } catch (e) { return false; }
}

function fApplyChainStep() {
  var pool = fMainChainPoolLive();
  if (pool.length === 0) return;
  var idx = (typeof mainChainPoolIdx === "number") ? mainChainPoolIdx : 0;
  if (idx < 0) idx = 0;
  if (idx > pool.length - 1) idx = pool.length - 1;
  mainChainPoolIdx = idx;
  mainChainAtomsList = pool[idx].chain.slice();
  // 3D rank-parallel, only when the 3D pool is fresh for this molecule
  // (3D parse is async; otherwise the current 3D view is left untouched —
  // the replayed component path below repaints 3D from the live chain).
  try {
    if (fChainStepper3DFresh() && idx < mainChainPool3D.length) {
      mainChainAtoms3D = mainChainPool3D[idx].chain.slice();
    }
  } catch (e3) { /* 3D unavailable */ }
  // Naming runs ON the swapped chain: the `true` flag skips fGuessName's
  // internal winner recompute (which would rebuild the pool, reset this step
  // and rename the winner — the trap that froze the stepper). Validation is
  // skipped with it, as intended while stepping.
  try { if (typeof fGuessName === "function") fGuessName(true); } catch (eN) { /* naming unavailable */ }
  // Refresh ONLY the selected component's highlight (or clear to deselect
  // visuals when nothing is selected): same clear + rebuild + explain sequence
  // as a name-box click, minus the selection toggle and narration. The
  // component's own path repaints explanation, highlight and numbering
  // against the new chain; with mode "none" nothing paints.
  try {
    if (typeof fClearHighlights === "function") fClearHighlights();
    if (typeof fUpdateSVG === "function") fUpdateSVG();
    if (typeof fExplainNameComp === "function") fExplainNameComp();
  } catch (eHl) { /* viewer unavailable */ }
  fRenderChainStepper();
}

function fStepMainChain(dir) {
  var pool = fMainChainPoolLive();
  if (pool.length === 0) return;
  if (typeof mainChainMode !== "undefined" && mainChainMode !== "algorithmic") return;
  if (typeof selectedMol === "undefined" || !selectedMol) return;
  var idx = (typeof mainChainPoolIdx === "number") ? mainChainPoolIdx : 0;
  var n = idx + dir;
  if (n < 0) n = 0;
  if (n > pool.length - 1) n = pool.length - 1;
  if (n === idx) { fRenderChainStepper(); return; }
  mainChainPoolIdx = n;
  fApplyChainStep();
}

function fRenderChainStepper() {
  var box = null, label = null, prev = null, next = null;
  try {
    box = document.getElementById("chainStepperBox");
    if (!box) return; // stepper markup absent — nothing to sync
    label = document.getElementById("chainStepLabel");
    prev = document.getElementById("chainPrevBtn");
    next = document.getElementById("chainNextBtn");
  } catch (eD) { return; }
  var pool = fMainChainPoolLive();
  var idx = (typeof mainChainPoolIdx === "number") ? mainChainPoolIdx : 0;
  var algo = (typeof mainChainMode === "undefined" || mainChainMode === "algorithmic");
  var okMol = false;
  try {
    okMol = (typeof selectedMol !== "undefined" && !!selectedMol &&
      typeof nameExamples !== "undefined" && !!nameExamples[selectedMol]);
  } catch (eM) { /* no molecule */ }
  // Visible only with 2+ chains; otherwise the whole box hides.
  // The dedicated top row follows the box (ether+stepper case) so no empty
  // row reserves space; inline in the main row (stepper-only case) only the
  // box hides — the button row must stay.
  var active = okMol && algo && pool.length > 1;
  try {
    box.style.display = active ? "" : "none";
    var _row = box.parentNode;
    if (_row && _row.id === "nameSettingsRowTop") _row.style.display = active ? "" : "none";
    else if (_row && _row.className && ((" " + _row.className + " ").indexOf(" nsLeft ") !== -1)) _row.style.display = active ? "" : "none";
  } catch (eS) { /* styling unavailable */ }
  if (!active || !label) return;
  if (idx < 0) idx = 0;
  if (idx > pool.length - 1) idx = pool.length - 1;
  label.textContent = (idx + 1) + "/" + pool.length;
  if (prev) prev.disabled = idx <= 0;
  if (next) next.disabled = idx >= pool.length - 1;
}

// Stepper group markup for the name-settings panel (rebuilt with it on every
// fShowNameAnalysis, so the counter/disabled states are always current).
// One container div (#chainStepperBox) holds everything for easy styling.
// The group renders only when there is something to step through (2+ chains,
// algorithmic mode, molecule loaded) — otherwise nothing lands in the DOM.
function fChainStepperHTML() {
  var pool = fMainChainPoolLive();
  var idx = (typeof mainChainPoolIdx === "number") ? mainChainPoolIdx : 0;
  var algo = (typeof mainChainMode === "undefined" || mainChainMode === "algorithmic");
  var okMol = false;
  try {
    okMol = (typeof selectedMol !== "undefined" && !!selectedMol &&
      typeof nameExamples !== "undefined" && !!nameExamples[selectedMol]);
  } catch (eM) { /* no molecule */ }
  if (!okMol || !algo || pool.length < 2) return "";
  if (idx < 0) idx = 0;
  if (idx > pool.length - 1) idx = pool.length - 1;
  var txt = (idx + 1) + "/" + pool.length;
  var disP = idx <= 0 ? " disabled" : "";
  var disN = idx >= pool.length - 1 ? " disabled" : "";
  var chevL = (window.MuLERIcons && window.MuLERIcons.chevronLeft) || "‹";
  var chevR = (window.MuLERIcons && window.MuLERIcons.chevronRight) || "›";
  return "<div id='chainStepperBox'><span class='settingLabel'>Κύρια αλυσίδα:</span>" +
    "<button id='chainPrevBtn' class='stepBtn' onclick='fStepMainChain(-1)' data-tooltip='Προηγούμενη αλυσίδα'" + disP + ">" + chevL + "</button>" +
    "<span id='chainStepLabel'>" + txt + "</span>" +
    "<button id='chainNextBtn' class='stepBtn' onclick='fStepMainChain(1)' data-tooltip='Επόμενη αλυσίδα'" + disN + ">" + chevR + "</button></div>";
}

// ── fGetHydrocarbonBranchHighlight ─────────────────────────────────────────

// Match the same Greek-alphabetical prefix groups used by fGuessName.
// Slot 2 represents all remaining groups, matching the fused comp2/comp3 boxes.
function fGetHydrocarbonBranchGroup(slot) {
  if (functionalGroupsList.length === 1 && functionalGroupsList[0] === 'ether') {
    const groups = fEtherPrefixGroups();
    const selected = slot === 2 ? groups.slice(1) : groups.slice(0, 1);
    const members = selected.filter(g => g.kind === 'alkyl').flatMap(g => g.members);
    return members.length ? {
      names: selected.filter(g => g.kind === 'alkyl').map(g => g.name),
      members: members
    } : null;
  }
  if (!functionalGroupObj || !fSupportsAlkylBranchPrefixes()) return null;
  const branches = fGetHydrocarbonSubstituentInfo();
  const names = [...new Set(branches.map(function (b) { return b.name; }))]
    .sort(function (a, b) { return a < b ? -1 : a > b ? 1 : 0; });
  const selected = slot === 2 ? names.slice(1) : names.slice(0, 1);
  const members = branches.filter(function (b) { return selected.includes(b.name); });
  return members.length ? { names: selected, members: members } : null;
}

function fHydrocarbonBranchSlot() {
  if (/^compBranch(Sub|Loc)\d+$/.test(nameAnalysisMode || "")) return 2;
  return nameAnalysisMode === "compNumber2" || nameAnalysisMode === "compSecondSub2" ? 2 : 1;
}

function fHydrocarbonBranchExplanation(group, positions) {
  const locants = [...new Set(group.members.map(function (b) { return b.locant; }))]
    .sort(function (a, b) { return a - b; }).join(", ");
  const names = group.names.map(function (name) { return alkylBranchNouns[name] || name; }).join(", ");
  if (group.names.length > 1) {
    const pairs = group.names.map(name => {
      const nums = group.members.filter(b => b.name === name).map(b => b.locant)
        .sort((a, b) => a - b).join(", ");
      return `${alkylBranchNouns[name] || name} στις θέσεις ${nums}`;
    }).join(" · ");
    return positions
      ? `Δηλώνει τη θέση ή τις θέσεις της πρώτης από τις υπόλοιπες ομάδες. Οι επόμενες θέσεις περιλαμβάνονται στο διπλανό συνθετικό (${pairs}).`
      : `Ομαδοποιημένο συνθετικό με τα ονόματα των υπόλοιπων διακλαδώσεων και τις ενδιάμεσες θέσεις τους (${pairs}).`;
  }
  if (positions) {
    return group.members.length === 1
      ? `Δηλώνει τη θέση ${locants} της ανθρακικής διακλάδωσης (${names}).`
      : `Δηλώνει τις θέσεις ${locants} των ανθρακικών διακλαδώσεων (${names}).`;
  }
  return group.members.length === 1
    ? `Δηλώνει το όνομα της ανθρακικής διακλάδωσης (${names}).`
    : `Δηλώνει το όνομα και το πλήθος (${group.members.length}) των ανθρακικών διακλαδώσεων (${names}).`;
}

function fGetNameComponentLocants(component) {
  if (component === null || component === undefined) return [];
  return String(component)
    .replace(/^-+|-+$/g, "")
    .split(/[,\-]+/)
    .map(function (n) {
      return parseInt(n, 10);
    })
    .filter(function (n) {
      return Number.isFinite(n) && n > 0;
    });
}

function fGetHydrocarbonBranchHighlight(slot) {
  if (!Array.isArray(mainChainAtomsList) || mainChainAtomsList.length === 0) {
    return { atoms: [], bonds: [] };
  }

  const mainSet = new Set(mainChainAtomsList.map((n) => n - 1));
  const _pieceM = /^compBranch(Sub|Loc)(\d+)$/.exec(typeof nameAnalysisMode !== "undefined" ? nameAnalysisMode : "");
  var group = slot ? fGetHydrocarbonBranchGroup(slot) : null;
  // Split branch-label pieces highlight only their own substituent; an
  // unmatched piece keeps the whole slot group (never an empty highlight).
  if (_pieceM && slot === 2) {
    let _pp = null;
    try { _pp = fGetHydrocarbonBranchPiece(parseInt(_pieceM[2], 10)); } catch (ePp) { _pp = null; }
    if (_pp && _pp.members.length) group = _pp;
  }
  // The "-2-" style locants box (compNumber2) highlights only the first of
  // the remaining groups — its explanation already scopes positions that
  // way ("της πρώτης από τις υπόλοιπες ομάδες"). Single-name slots are
  // unaffected; an unmatched shape keeps the whole slot group.
  if (!_pieceM && nameAnalysisMode === "compNumber2" && slot === 2 &&
      group && Array.isArray(group.names) && group.names.length > 1) {
    const _fm = group.members.filter(function (b) { return b && b.name === group.names[0]; });
    if (_fm.length) group = { names: [group.names[0]], members: _fm };
  }
  if (slot && !group) return { atoms: [], bonds: [] };
  const atoms = new Set();
  const bonds = new Set();

  for (let i = 0; i < atomsCount; i++) {
    if (allAtomsTypeList[i] !== "C" || mainSet.has(i)) continue;

    const neighbors = Array.isArray(atomConnectivityList[i])
      ? atomConnectivityList[i]
      : [];
    const parent = neighbors.find((nb) => mainSet.has(nb));
    if (parent === undefined) continue;

    const sideSet = new Set([i]);
    const stack = [i];
    while (stack.length > 0) {
      const node = stack.pop();
      const ns = Array.isArray(atomConnectivityList[node])
        ? atomConnectivityList[node]
        : [];
      for (let k = 0; k < ns.length; k++) {
        const nb = ns[k];
        if (nb === parent || allAtomsTypeList[nb] !== "C" || sideSet.has(nb))
          continue;
        sideSet.add(nb);
        stack.push(nb);
      }
    }

    // Match the attachment-rooted carbon graph at its live parent locant.
    // Equal-sized straight/branched groups must never cross-highlight.
    const locant = mainChainAtomsList.indexOf(parent + 1) + 1;
    const branch = group ? fDescribeCarbonBranches(mainChainAtomsList.map(n => n - 1),
      atomConnectivityList, allAtomsTypeList).find(d => d.attach === i) : null;
    if (group && !group.members.some(function (b) {
      return branch && b.locant === locant && b.signature === branch.signature;
    })) continue;

    for (const node of sideSet) {
      atoms.add(node + 1);
      const ns = Array.isArray(atomConnectivityList[node])
        ? atomConnectivityList[node]
        : [];
      for (let k = 0; k < ns.length; k++) {
        const nb = ns[k];
        if (!sideSet.has(nb)) continue;
        const a = node + 1;
        const b = nb + 1;
        for (let idx = 0; idx < bondList.length; idx++) {
          const bond = bondList[idx];
          if (!bond) continue;
          const sameBond =
            (bond[0] === a && bond[1] === b) ||
            (bond[0] === b && bond[1] === a);
          if (sameBond) {
            bonds.add(idx + 1);
            break;
          }
        }
      }
      // Expanded mode: H atoms are explicit — highlight H attached to branch
      // carbons together with their C–H bonds. atomConnectivityList skips
      // H bonds (see fAnalyseStructure), so scan bondList for C–H endpoints
      // instead. In condensed modes no H endpoints exist, so this is a
      // no-op there.
      for (let b = 0; b < bondList.length; b++) {
        if (!bondList[b]) continue;
        const ba1 = bondList[b][0];
        const ba2 = bondList[b][1];
        let hIdx = -1;
        if (ba1 === node + 1 && allAtomsTypeList[ba2 - 1] === "H") {
          hIdx = ba2;
        } else if (ba2 === node + 1 && allAtomsTypeList[ba1 - 1] === "H") {
          hIdx = ba1;
        }
        if (hIdx !== -1) {
          atoms.add(hIdx);
          bonds.add(b + 1);
        }
      }
    }
  }

  return { atoms: [...atoms], bonds: [...bonds] };
}

// ── fGetHydrocarbonBranchHighlight3D ──────────────────────────────────────

function fGetHydrocarbonBranchHighlight3D(slot) {
  if (!Array.isArray(mainChainAtoms3D) || mainChainAtoms3D.length === 0) {
    return { atoms: [], bonds: [] };
  }

  const mainSet = new Set(mainChainAtoms3D.map((n) => n - 1));
  const _pieceM3 = /^compBranch(Sub|Loc)(\d+)$/.exec(typeof nameAnalysisMode !== "undefined" ? nameAnalysisMode : "");
  var group = slot ? fGetHydrocarbonBranchGroup(slot) : null;
  // Same per-piece scope as the 2D twin (matched by locant+signature below).
  if (_pieceM3 && slot === 2) {
    let _pp3 = null;
    try { _pp3 = fGetHydrocarbonBranchPiece(parseInt(_pieceM3[2], 10)); } catch (ePp3) { _pp3 = null; }
    if (_pp3 && _pp3.members.length) group = _pp3;
  }
  // Same first-group scope for compNumber2 as the 2D twin.
  if (!_pieceM3 && nameAnalysisMode === "compNumber2" && slot === 2 &&
      group && Array.isArray(group.names) && group.names.length > 1) {
    const _fm3 = group.members.filter(function (b) { return b && b.name === group.names[0]; });
    if (_fm3.length) group = { names: [group.names[0]], members: _fm3 };
  }
  if (slot && !group) return { atoms: [], bonds: [] };
  const atoms = new Set();
  const bonds = new Set();

  for (let i = 0; i < allAtomsTypeList3D.length; i++) {
    if (allAtomsTypeList3D[i] !== "C" || mainSet.has(i)) continue;

    const neighbors = Array.isArray(atomConnectivityList3D[i])
      ? atomConnectivityList3D[i]
      : [];
    const parent = neighbors.find((nb) => mainSet.has(nb));
    if (parent === undefined) continue;

    const sideSet = new Set([i]);
    const stack = [i];
    while (stack.length > 0) {
      const node = stack.pop();
      const ns = Array.isArray(atomConnectivityList3D[node])
        ? atomConnectivityList3D[node]
        : [];
      for (let k = 0; k < ns.length; k++) {
        const nb = ns[k];
        if (nb === parent || allAtomsTypeList3D[nb] !== "C" || sideSet.has(nb))
          continue;
        sideSet.add(nb);
        stack.push(nb);
      }
    }

    // Match the attachment-rooted carbon graph at its live parent locant.
    // Equal-sized straight/branched groups must never cross-highlight.
    const locant = mainChainAtoms3D.indexOf(parent + 1) + 1;
    const branch = group ? fDescribeCarbonBranches(mainChainAtoms3D.map(n => n - 1),
      atomConnectivityList3D, allAtomsTypeList3D).find(d => d.attach === i) : null;
    if (group && !group.members.some(function (b) {
      return branch && b.locant === locant && b.signature === branch.signature;
    })) continue;

    for (const node of sideSet) {
      atoms.add(node + 1);
      const ns = Array.isArray(atomConnectivityList3D[node])
        ? atomConnectivityList3D[node]
        : [];
      for (let k = 0; k < ns.length; k++) {
        const nb = ns[k];
        if (!sideSet.has(nb)) continue;
        const a = node + 1;
        const b = nb + 1;
        for (let idx = 0; idx < bondList3D.length; idx++) {
          const bond = bondList3D[idx];
          if (!bond) continue;
          const sameBond =
            (bond[0] === a && bond[1] === b) ||
            (bond[0] === b && bond[1] === a);
          if (sameBond) {
            bonds.add(idx + 1);
            break;
          }
        }
      }
    }
  }

  return { atoms: [...atoms], bonds: [...bonds] };
}

// ── Ether helpers ─────────────────────────────────────────────────────────
// Alkoxy-side carbon (0-based) = ether-O neighbour NOT on the parent chain.
function fGetEtherAlkoxyC() {
  if (!functionalGroupObj || !functionalGroupObj.ether || !functionalGroupObj.ether.O) return null;
  const oIdx = functionalGroupObj.ether.O[0];
  if (oIdx === undefined || !Array.isArray(atomConnectivityList[oIdx])) return null;
  const nbrs = atomConnectivityList[oIdx].filter(function (n) {
    return allAtomsTypeList[n] === "C";
  });
  if (nbrs.length === 0) return null;
  if (Array.isArray(mainChainAtomsList)) {
    for (let i = 0; i < nbrs.length; i++) {
      if (mainChainAtomsList.indexOf(nbrs[i] + 1) < 0) return nbrs[i];
    }
  }
  if (typeof etherInfo !== "undefined" && etherInfo) return etherInfo.alkoxyAttachC;
  return nbrs.length > 1 ? nbrs[1] : nbrs[0];
}

// Ordered alkoxy chain (1-based JSME numbers), attachment C first.
// Live rule (mirrors fGetEtherAlkoxyChain3D): the alkoxy side is the FIRST
// O-bonded carbon NOT on the current main chain, BFS-expanded over the
// carbon-only graph — so the highlight sweeps when the stepper (or free
// browsing) moves the parent chain elsewhere. At the winner chain this picks
// the stored side in every realistic case (symmetric, ethyl/isopropyl/butyl
// methyl: the non-parent side is found regardless of neighbor order).
// Falls back to load-time etherInfo, then to fGetEtherAlkoxyC.
function fGetEtherAlkoxyChain() {
  if (typeof functionalGroupObj !== "undefined" && functionalGroupObj &&
      functionalGroupObj.ether && functionalGroupObj.ether.O) {
    var oIdx = functionalGroupObj.ether.O[0];
    if (oIdx !== undefined && Array.isArray(atomConnectivityList[oIdx])) {
      var nbrs = atomConnectivityList[oIdx].filter(function (n) {
        return allAtomsTypeList[n] === "C";
      });
      var att = null;
      if (Array.isArray(mainChainAtomsList)) {
        for (var i = 0; i < nbrs.length; i++) {
          if (mainChainAtomsList.indexOf(nbrs[i] + 1) < 0) { att = nbrs[i]; break; }
        }
      }
      if (att === null || att === undefined) att = nbrs.length > 1 ? nbrs[1] : nbrs[0];
      if (att !== null && att !== undefined) {
        var seen = {};
        var q = [att];
        seen[att] = true;
        while (q.length > 0) {
          var n = q.pop();
          var nbs = atomConnectivityList[n] || [];
          for (var k = 0; k < nbs.length; k++) {
            if (allAtomsTypeList[nbs[k]] === "C" && !seen[nbs[k]]) {
              seen[nbs[k]] = true;
              q.push(nbs[k]);
            }
          }
        }
        var rest = Object.keys(seen).map(function (x) { return parseInt(x); }).filter(function (c) { return c !== att; });
        return [att + 1].concat(rest.map(function (c) { return c + 1; }));
      }
    }
  }
  if (typeof etherInfo !== "undefined" && etherInfo && Array.isArray(etherInfo.alkoxyFrag)) {
    var att0 = etherInfo.alkoxyAttachC;
    var rest0 = etherInfo.alkoxyFrag.filter(function (c) { return c !== att0; });
    return [att0 + 1].concat(rest0.map(function (c) { return c + 1; }));
  }
  var alk = fGetEtherAlkoxyC();
  return alk !== null && alk !== undefined ? [alk + 1] : null;
}

// 3D mirror: alkoxy-side carbon (0-based SDF index).
function fGetEtherAlkoxyC3D() {
  if (!functionalGroupObj3D || !functionalGroupObj3D.ether || !functionalGroupObj3D.ether.O) return null;
  const oIdx = functionalGroupObj3D.ether.O[0];
  if (oIdx === undefined || !Array.isArray(atomConnectivityList3D[oIdx])) return null;
  const nbrs = atomConnectivityList3D[oIdx].filter(function (n) {
    return allAtomsTypeList3D[n] === "C";
  });
  if (nbrs.length === 0) return null;
  if (Array.isArray(mainChainAtoms3D)) {
    for (let i = 0; i < nbrs.length; i++) {
      if (mainChainAtoms3D.indexOf(nbrs[i] + 1) < 0) return nbrs[i];
    }
  }
  return nbrs.length > 1 ? nbrs[1] : nbrs[0];
}

// 3D mirror: ordered alkoxy chain (1-based SDF numbers), attachment C first.
function fGetEtherAlkoxyChain3D() {
  if (!functionalGroupObj3D || !functionalGroupObj3D.ether || !functionalGroupObj3D.ether.O) return null;
  const oIdx = functionalGroupObj3D.ether.O[0];
  if (oIdx === undefined || !Array.isArray(atomConnectivityList3D[oIdx])) return null;
  const att = fGetEtherAlkoxyC3D();
  if (att === null || att === undefined) return null;
  // BFS over 3D carbon-only graph from attachment
  const seen = {};
  const q = [att];
  seen[att] = true;
  while (q.length > 0) {
    const n = q.pop();
    const nbs = atomConnectivityList3D[n] || [];
    for (let i = 0; i < nbs.length; i++) {
      if (allAtomsTypeList3D[nbs[i]] === "C" && !seen[nbs[i]]) {
        seen[nbs[i]] = true;
        q.push(nbs[i]);
      }
    }
  }
  const rest = Object.keys(seen).map(function (x) { return parseInt(x); }).filter(function (c) { return c !== att; });
  return [att + 1].concat(rest.map(function (c) { return c + 1; }));
}

// 3D mirror: ether functional group C-O-C (1-based SDF numbers) — the bridging
// O plus its carbon neighbors. Used to color the two C–O bonds explicitly,
// since the halo path highlights atoms only.
function fGetEtherGroupFragment3D() {
  if (!functionalGroupObj3D || !functionalGroupObj3D.ether || !functionalGroupObj3D.ether.O) return null;
  const oIdx = functionalGroupObj3D.ether.O[0];
  if (oIdx === undefined || !Array.isArray(atomConnectivityList3D[oIdx])) return null;
  const frag = [oIdx + 1];
  const nbrs = atomConnectivityList3D[oIdx].filter(function (n) {
    return allAtomsTypeList3D[n] === "C";
  });
  for (let i = 0; i < nbrs.length; i++) {
    if (frag.indexOf(nbrs[i] + 1) < 0) frag.push(nbrs[i] + 1);
  }
  return frag.length > 1 ? frag : null;
}

// COMMON ether name parts: [{label, chain, chain3D, kind}] + suffix "αιθέρας".
// kind: "alkyl" (chain only, no O) or "ether" (C-O-C, no numbering).
// chain/chain3D: 1-based atom lists for highlight + numbering.
function fGetEtherCommonParts() {
  if (!selectedMol || !nameExamples[selectedMol]) return null;
  if (nameExamples[selectedMol].classification?.chemicalClass !== "ethers") return null;
  const parentLen = etherInfo ? etherInfo.parentLen : (Array.isArray(mainChainAtomsList) ? mainChainAtomsList.length : 0);
  const alkLen = (typeof etherInfo !== "undefined" && etherInfo && etherInfo.alkoxyLen) || 1;
  const _eI = (typeof etherInfo !== "undefined" && etherInfo) ? etherInfo : null;
  const stemFor = function (n, attachC, fragment) {
    const iso = (typeof fAlkylGroupName !== "undefined") ? fAlkylGroupName(n, attachC, "substituent", fragment) : null;
    const full = iso || ((typeof alkylSubstituentNames !== "undefined" && alkylSubstituentNames[n]) || (nameMainCompList1[n - 1] || ""));
    return String(full).replace(/ο$/, "");
  };
  const parentChain = _eI ? _eI.parentFrag.map(c=>c+1) : (mainChainAtomsList || []).slice();
  const alkoxyChain = fGetEtherAlkoxyChain() || [];
  const o3 = functionalGroupObj3D && functionalGroupObj3D.ether && functionalGroupObj3D.ether.O[0];
  const alk3 = fGetEtherAlkoxyC3D();
  const parentAttach3 = o3 == null ? null : (atomConnectivityList3D[o3] || []).find(c=>allAtomsTypeList3D[c]==='C' && c!==alk3);
  const parentChain3D = parentAttach3 == null ? [] : fCarbonFragment(parentAttach3,atomConnectivityList3D,allAtomsTypeList3D).map(c=>c+1);
  const alkoxyChain3D = fGetEtherAlkoxyChain3D() || [];
  const symmetric = (typeof etherInfo !== "undefined" && etherInfo) ? !!etherInfo.symmetric : parentLen === alkLen;
  if (symmetric) {
    const alkyl = stemFor(alkLen, _eI && _eI.alkoxyAttachC, _eI && _eI.alkoxyFrag);
    const both = parentChain.concat(alkoxyChain.filter(function (a) { return parentChain.indexOf(a) < 0; }));
    const both3D = parentChain3D.concat(alkoxyChain3D.filter(function (a) { return parentChain3D.indexOf(a) < 0; }));
    return {
      symmetric: true,
      parts: [
        { label: nameMultiPrefix[1] || "δι", chain: both, chain3D: both3D, kind: "alkyl", numberChain: parentChain, numberChain3D: parentChain3D },
        { label: alkyl, chain: both, chain3D: both3D, kind: "alkyl", numberChain: parentChain, numberChain3D: parentChain3D },
        { label: "αιθέρας", chain: "ether", chain3D: "ether", kind: "ether", numberChain: null, numberChain3D: null },
      ],
    };
  }
  const sP = stemFor(parentLen, _eI && _eI.parentAttachC, _eI && _eI.parentFrag), sA = stemFor(alkLen, _eI && _eI.alkoxyAttachC, _eI && _eI.alkoxyFrag);
  const mk = function (label, isParent) {
    return {
      label: label,
      chain: isParent ? parentChain : alkoxyChain,
      chain3D: isParent ? parentChain3D : alkoxyChain3D,
      kind: "alkyl",
      numberChain: isParent ? mainChainAtomsList.slice() : alkoxyChain,
      numberChain3D: isParent ? mainChainAtoms3D.slice() : alkoxyChain3D,
    };
  };
  const pair = [mk(sP, true), mk(sA, false)].sort(function (a, b) {
    return fEtherNameSortKey(a.label) < fEtherNameSortKey(b.label) ? -1 : fEtherNameSortKey(a.label) > fEtherNameSortKey(b.label) ? 1 : 0;
  });
  fEtherCommonLabels(pair.map(p=>p.label)).forEach((label,i)=>{pair[i].label=label;});
  pair.push({ label: "αιθέρας", chain: "ether", chain3D: "ether", kind: "ether", numberChain: null, numberChain3D: null });
  return { symmetric: false, parts: pair };
}

// ── Ester helpers ─────────────────────────────────────────────────────────
// Scope v41: saturated acyclic mono-esters R-C(=O)-O-R'.
// esterInfo (2D, from fCalcMainChain): {oDouble, oSingle, carbonylC,
// alcoholAttachC, acidFrag, alcoholFrag, acidLen, alcoholLen} — 0-based.

// Ordered alcohol chain (1-based JSME numbers), attachment C first.
function fGetEsterAlcoholChain() {
  if (typeof esterInfo !== "undefined" && esterInfo && Array.isArray(esterInfo.alcoholFrag)) {
    const att = esterInfo.alcoholAttachC;
    const rest = esterInfo.alcoholFrag.filter(function (c) { return c !== att; });
    return [att + 1].concat(rest.map(function (c) { return c + 1; }));
  }
  return null;
}

// 3D mirror: alcohol-side carbon (0-based SDF index).
function fGetEsterAlcoholC3D() {
  if (!functionalGroupObj3D || !functionalGroupObj3D.ester || !functionalGroupObj3D.ester.O) return null;
  const pair = functionalGroupObj3D.ester.O[0];
  if (!pair) return null;
  const ketoneO = pair[0], etherO = pair[1];
  const carbC = (Array.isArray(atomConnectivityList3D[ketoneO]) ? atomConnectivityList3D[ketoneO] : []).filter(function (n) {
    return allAtomsTypeList3D[n] === "C";
  })[0];
  const oNbrs = (Array.isArray(atomConnectivityList3D[etherO]) ? atomConnectivityList3D[etherO] : []).filter(function (n) {
    return allAtomsTypeList3D[n] === "C";
  });
  for (let i = 0; i < oNbrs.length; i++) {
    if (oNbrs[i] !== carbC) return oNbrs[i];
  }
  return null;
}

// 3D mirror: ordered alcohol chain (1-based SDF numbers), attachment C first.
function fGetEsterAlcoholChain3D() {
  const att = fGetEsterAlcoholC3D();
  if (att === null || att === undefined) return null;
  const seen = {};
  const q = [att];
  seen[att] = true;
  while (q.length > 0) {
    const n = q.pop();
    const nbs = atomConnectivityList3D[n] || [];
    for (let i = 0; i < nbs.length; i++) {
      if (allAtomsTypeList3D[nbs[i]] === "C" && !seen[nbs[i]]) {
        seen[nbs[i]] = true;
        q.push(nbs[i]);
      }
    }
  }
  const rest = Object.keys(seen).map(function (x) { return parseInt(x); }).filter(function (c) { return c !== att; });
  return [att + 1].concat(rest.map(function (c) { return c + 1; }));
}

// Ordered acid chain (1-based JSME numbers), carbonyl C first.
function fGetEsterAcidChain() {
  if (typeof esterInfo !== "undefined" && esterInfo && Array.isArray(esterInfo.acidFrag)) {
    const att = esterInfo.carbonylC;
    const rest = esterInfo.acidFrag.filter(function (c) { return c !== att; });
    return [att + 1].concat(rest.map(function (c) { return c + 1; }));
  }
  return null;
}

// 3D mirror: acid-side carbon (0-based SDF index) = C neighbor of the ketone O.
function fGetEsterAcidC3D() {
  if (!functionalGroupObj3D || !functionalGroupObj3D.ester || !functionalGroupObj3D.ester.O) return null;
  const pair = functionalGroupObj3D.ester.O[0];
  if (!pair) return null;
  const carbC = (Array.isArray(atomConnectivityList3D[pair[0]]) ? atomConnectivityList3D[pair[0]] : []).filter(function (n) {
    return allAtomsTypeList3D[n] === "C";
  })[0];
  return (carbC === undefined) ? null : carbC;
}

// 3D mirror: ordered acid chain (1-based SDF numbers), carbonyl C first.
function fGetEsterAcidChain3D() {
  const att = fGetEsterAcidC3D();
  if (att === null || att === undefined) return null;
  const seen = {};
  const q = [att];
  seen[att] = true;
  while (q.length > 0) {
    const n = q.pop();
    const nbs = atomConnectivityList3D[n] || [];
    for (let i = 0; i < nbs.length; i++) {
      if (allAtomsTypeList3D[nbs[i]] === "C" && !seen[nbs[i]]) {
        seen[nbs[i]] = true;
        q.push(nbs[i]);
      }
    }
  }
  const rest = Object.keys(seen).map(function (x) { return parseInt(x); }).filter(function (c) { return c !== att; });
  return [att + 1].concat(rest.map(function (c) { return c + 1; }));
}

// Sole-FG ester predicate: name + highlight overrides apply only when the
// ester is the single functional group (matches the fGuessName ester branch).
function fIsSingleEster() {
  return (typeof functionalGroupsList !== "undefined" && Array.isArray(functionalGroupsList) &&
    functionalGroupsList.length === 1 && functionalGroupsList[0] === "ester" &&
    typeof esterInfo !== "undefined" && esterInfo && Array.isArray(esterInfo.acidFrag));
}

// Ester triad O-C(=O)-O (1-based JSME numbers) for highlight (no numbering).
function fGetEsterTriad() {
  if (typeof esterInfo !== "undefined" && esterInfo && esterInfo.carbonylC !== undefined) {
    return [esterInfo.oDouble + 1, esterInfo.carbonylC + 1, esterInfo.oSingle + 1];
  }
  if (!functionalGroupObj || !functionalGroupObj.ester || !functionalGroupObj.ester.O) return null;
  const pair = functionalGroupObj.ester.O[0];
  if (!pair) return null;
  const carbC = (atomConnectivityList[pair[0]] || []).filter(function (n) {
    return allAtomsTypeList[n] === "C";
  })[0];
  if (carbC === undefined) return [pair[0] + 1, pair[1] + 1];
  return [pair[0] + 1, carbC + 1, pair[1] + 1];
}

// Ester functional group C(=O)-O-C (1-based JSME numbers): triad + alcohol C.
function fGetEsterGroupFragment() {
  const triad = fGetEsterTriad() || [];
  let alc = null;
  if (typeof esterInfo !== "undefined" && esterInfo && esterInfo.alcoholAttachC !== undefined) {
    alc = esterInfo.alcoholAttachC + 1;
  }
  if ((alc === null || alc === undefined) && functionalGroupObj && functionalGroupObj.ester && functionalGroupObj.ester.O) {
    const pair = functionalGroupObj.ester.O[0];
    if (pair) {
      const carbC = (atomConnectivityList[pair[0]] || []).filter(function (n) {
        return allAtomsTypeList[n] === "C";
      })[0];
      const oNbrs = (atomConnectivityList[pair[1]] || []).filter(function (n) {
        return allAtomsTypeList[n] === "C";
      });
      for (let i = 0; i < oNbrs.length; i++) {
        if (oNbrs[i] !== carbC) { alc = oNbrs[i] + 1; break; }
      }
    }
  }
  if (alc !== null && alc !== undefined && triad.indexOf(alc) < 0) triad.push(alc);
  return triad;
}

// 3D mirror: ester functional group (1-based SDF numbers).
function fGetEsterGroupFragment3D() {
  const triad = fGetEsterTriad3D() || [];
  const alc = fGetEsterAlcoholC3D();
  if (alc !== null && alc !== undefined && triad.indexOf(alc + 1) < 0) triad.push(alc + 1);
  return triad;
}

// 3D mirror: ester triad (1-based SDF numbers).
function fGetEsterTriad3D() {
  if (!functionalGroupObj3D || !functionalGroupObj3D.ester || !functionalGroupObj3D.ester.O) return null;
  const pair = functionalGroupObj3D.ester.O[0];
  if (!pair) return null;
  const carbC = (atomConnectivityList3D[pair[0]] || []).filter(function (n) {
    return allAtomsTypeList3D[n] === "C";
  })[0];
  if (carbC === undefined) return [pair[0] + 1, pair[1] + 1];
  return [pair[0] + 1, carbC + 1, pair[1] + 1];
}

// Sync IUPAC/COMMON toggle visuals (radios are rebuilt in fShowNameAnalysis).
function fUpdateEtherNamingButton() {
  const $btns = $("#radioEtherNaming .etherNamingRadio");
  if ($btns.length === 0) return;
  $btns.removeClass("selectedRadio").addClass("unselectedRadio");
  $btns
    .filter(`[data-naming-mode='${etherNamingMode}']`)
    .removeClass("unselectedRadio")
    .addClass("selectedRadio");
}

// Chain-only highlight (no heteroatom): atoms + bonds with both ends in the
// set. With includeH, attached H atoms join the atom set and C–H bonds join
// the bond set (alkyl rule: CnH2n+1 highlights C + H + C–C + C–H). Expanded
// mode only in practice — condensed/skeletal models carry no H atoms, so the
// H scan is a no-op there (same pattern as fGetHydrocarbonBranchHighlight).
function fHighlightAtomChain(chainAtoms, includeH, skipBonds, skipAtoms) {
  if (!Array.isArray(chainAtoms) || chainAtoms.length === 0) return;
  let atomSet = chainAtoms.slice();
  if (includeH && typeof bondList !== "undefined" && typeof allAtomsTypeList !== "undefined") {
    for (let b = 0; b < bondList.length; b++) {
      if (!bondList[b]) continue;
      const ba1 = bondList[b][0];
      const ba2 = bondList[b][1];
      if (chainAtoms.includes(ba1) && allAtomsTypeList[ba2 - 1] === "H") {
        if (!atomSet.includes(ba2)) atomSet.push(ba2);
      } else if (chainAtoms.includes(ba2) && allAtomsTypeList[ba1 - 1] === "H") {
        if (!atomSet.includes(ba1)) atomSet.push(ba1);
      }
    }
  }
  let atomArg = "";
  for (let i = 0; i < atomSet.length; i++) {
    atomArg += atomSet[i] + ",9";
    if (i < atomSet.length - 1) atomArg += ",";
  }
  jsmeNomeclatureApplet.setAtomBackgroundColors(0, atomArg);
  let bondArg = "";
  let first = true;
  for (let b = 0; b < bondList.length; b++) {
    if (!bondList[b]) continue;
    if (atomSet.includes(bondList[b][0]) && atomSet.includes(bondList[b][1])) {
      bondArg += (first ? "" : ",") + (b + 1) + ",9";
      first = false;
    }
  }
  // Numbering path may opt out of atoms and/or bonds independently
  // (settings); alkyl-rule callers always keep both (opts omitted → false).
  if (!skipAtoms) jsmeNomeclatureApplet.setAtomBackgroundColors(0, atomArg);
  if (bondArg && !skipBonds) jsmeNomeclatureApplet.setBondBackgroundColors(0, bondArg);
  fUpdateSVG();
}

function fHighlightAtomChain3D(chainAtoms3D, skipH, skipBonds, skipAtoms) {
  if (!Array.isArray(chainAtoms3D) || chainAtoms3D.length === 0) return;
  let arg = "select";
  for (let i = 0; i < chainAtoms3D.length; i++) {
    arg += " atomno=" + chainAtoms3D[i];
    if (i < chainAtoms3D.length - 1) arg += ",";
  }
  // skipH: halo exactly the listed atoms (ester group: alkyl C without its H).
  if (!skipH) arg += "; select connected(selected) and _H or selected;";
  // Numbering path may opt out of atoms and/or bonds independently
  // (settings); alkyl-rule callers always keep both (opts omitted → false).
  // Bonds are always explicit: green when on, neutral grey when off — plain
  // `none` would inherit the atom color and defeat the off state.
  // Halos belong to the atoms half: skipped together with the atoms.
  // NOTE: the bond clause carries its own leading `;` — when atoms are off
  // _atomClause is empty and the separator must still be there, otherwise
  // `select …` fuses with `color …` into one unparsable command.
  var _atomClause = skipAtoms
    ? ""
    : ";color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d]";
  Jmol.script(
    jmolAppletNomeclature,
    "select all; selectionHalos off; color atoms none; color bonds none;" + arg +
      _atomClause +
      (skipBonds ? ";color bonds [X909090];" : ";color bonds [X79dc6d];"),
  );
  JmolSelection = arg;
}

// Explicit 3D fragment-bond coloring (green): colors every bond with both
// ends in fragAtoms (1-based SDF numbers). With includeH, bonds from a
// fragment atom to a connected H are also colored (alkyl rule: CnH2n+1
// highlights C + H + C–C + C–H). The shared halo paths highlight atoms only,
// so COMMON ether/ester clicks and the IUPAC alkoxy prefix call this after
// their atom highlight — same pattern as the v42 ester triad fix, batched
// into one script to avoid Jmol queue races.
function fColorFragmentBonds3D(fragAtoms, includeH) {
  if (!Array.isArray(fragAtoms) || fragAtoms.length === 0) return;
  if (typeof bondList3D === "undefined" || typeof Jmol === "undefined") return;
  const wantH = !!includeH && typeof allAtomsTypeList3D !== "undefined";
  let script = "";
  for (let b = 0; b < bondList3D.length; b++) {
    if (!bondList3D[b]) continue;
    const in1 = fragAtoms.indexOf(bondList3D[b][0]) >= 0;
    const in2 = fragAtoms.indexOf(bondList3D[b][1]) >= 0;
    const hBond = wantH && ((in1 && allAtomsTypeList3D[bondList3D[b][1] - 1] === "H") ||
      (in2 && allAtomsTypeList3D[bondList3D[b][0] - 1] === "H"));
    if ((in1 && in2) || hBond) {
      script += "select atomno=" + bondList3D[b][0] + ", atomno=" + bondList3D[b][1] + "; color bond [X79dc6d];";
    }
  }
  if (script) {
    try {
      Jmol.script(jmolAppletNomeclature, script);
    } catch (e) {
      /* 3D unavailable */
    }
  }
}

// ── fHighlightFG ──────────────────────────────────────────────────────────

function fHighlightFG(FGno) {
  // Algorithmic: reads functionalGroupObj computed by fDetectMolType.
  // No static nameExamples.functionalGroup* data used.
  if (nameAnalysisMode == "none") {
    return;
  }

  const fgKeys = Object.keys(functionalGroupObj).filter(function (k) {
    return k !== "hydrocarbon";
  });
  const branch = fGetHydrocarbonBranchHighlight(fHydrocarbonBranchSlot());
  const allowBranchFallback = [
    "compNumber1",
    "compNumber2",
    "compSecondSub1",
    "compSecondSub2",
  ].includes(nameAnalysisMode) || /^compBranch(Sub|Loc)\d+$/.test(nameAnalysisMode || "");

  if (fgKeys.length === 0 || (allowBranchFallback &&
      (fSupportsAlkylBranchPrefixes() || fEtherPrefixGroups().length > 0) && branch.atoms.length > 0)) {
    if (!allowBranchFallback || branch.atoms.length === 0) {
      return;
    }

    let highAtomsFGArg = "";
    for (let i = 0; i < branch.atoms.length; i++) {
      highAtomsFGArg += branch.atoms[i] + ",9";
      if (i < branch.atoms.length - 1) {
        highAtomsFGArg += ",";
      }
    }
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

    let highBondsArg = "";
    for (let i = 0; i < branch.bonds.length; i++) {
      highBondsArg += branch.bonds[i] + ",9";
      if (i < branch.bonds.length - 1) {
        highBondsArg += ",";
      }
    }
    if (highBondsArg) {
      jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
    }
    fUpdateSVG();
    return;
  }

  // Build flat [fgKey, heteroEl] instances — one per distinct element type per FG key.
  // This lets FGno index correctly across multi-element FG types (e.g. halogen: {Br, Cl}).
  let fgInstances = [];
  for (let k = 0; k < fgKeys.length; k++) {
    const heteroEls = Object.keys(functionalGroupObj[fgKeys[k]]);
    for (let e = 0; e < heteroEls.length; e++) {
      fgInstances.push([fgKeys[k], heteroEls[e]]);
    }
  }
  // Sort: lower-priority FGs first, matching functionalGroupsList order (FGno=1 = first prefix).
  const fgPriorityOrder2D = [
    "carboxylicAcid",
    "ester",
    "cyanide",
    "aldehyde",
    "ketone",
    "alcohol",
    "amine",
    "nitro",
    "ether",
  ];
  const halogenOrder2D = Object.keys(nameMainCompObj3.halogen.substitute);
  fgInstances.sort(function (a, b) {
    if (a[0] === "halogen" && b[0] === "halogen") {
      return halogenOrder2D.indexOf(a[1]) - halogenOrder2D.indexOf(b[1]);
    }
    return fgPriorityOrder2D.indexOf(b[0]) - fgPriorityOrder2D.indexOf(a[0]);
  });

  let targetInstances = [];
  if (FGno === undefined) {
    targetInstances = fgInstances;
  } else {
    if (fgInstances[FGno - 1]) {
      targetInstances = [fgInstances[FGno - 1]];
    }
  }

  // If the selected component is a carbon side branch rather than a real functional group,
  // highlight the branch atoms even when other functional groups are present.
  if (
    allowBranchFallback &&
    branch.atoms.length > 0 &&
    targetInstances.length === 0
  ) {
    let highAtomsFGArg = "";
    for (let i = 0; i < branch.atoms.length; i++) {
      highAtomsFGArg += branch.atoms[i] + ",9";
      if (i < branch.atoms.length - 1) {
        highAtomsFGArg += ",";
      }
    }
    jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

    let highBondsArg = "";
    for (let i = 0; i < branch.bonds.length; i++) {
      highBondsArg += branch.bonds[i] + ",9";
      if (i < branch.bonds.length - 1) {
        highBondsArg += ",";
      }
    }
    if (highBondsArg) {
      jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
    }
    fUpdateSVG();
    return;
  }

  let highAtomsFG = [];

  for (let t = 0; t < targetInstances.length; t++) {
    const fgKey = targetInstances[t][0];
    const heteroEl = targetInstances[t][1];
    const heteroList = functionalGroupObj[fgKey][heteroEl]; // 0-based atom indices

    for (let i = 0; i < heteroList.length; i++) {
      const entry = heteroList[i];
      if (Array.isArray(entry)) {
        if (fgKey === "ester") {
          // Ester pair [oDouble, oSingle]: highlight triad O-C(=O)-O in every mode.
          const _esTriad = fGetEsterTriad() || [];
          for (let _ei = 0; _ei < _esTriad.length; _ei++) {
            if (!highAtomsFG.includes(_esTriad[_ei])) {
              highAtomsFG.push(_esTriad[_ei]);
            }
          }
          continue;
        }
        // carboxylicAcid: entry = [oh_idx, co_idx] both 0-based
        const ohIdx = entry[0],
          coIdx = entry[1];
        if (mode2D === "condensed") {
          if (Array.isArray(atomConnectivityList[ohIdx])) {
            const sharedC = atomConnectivityList[ohIdx][0];
            if (!highAtomsFG.includes(sharedC + 1)) {
              highAtomsFG.push(sharedC + 1);
            }
          }
          continue;
        }
        if (!highAtomsFG.includes(ohIdx + 1)) {
          highAtomsFG.push(ohIdx + 1);
        }
        if (!highAtomsFG.includes(coIdx + 1)) {
          highAtomsFG.push(coIdx + 1);
        }
        if (Array.isArray(atomConnectivityList[ohIdx])) {
          const sharedC = atomConnectivityList[ohIdx][0];
          if (!highAtomsFG.includes(sharedC + 1)) {
            highAtomsFG.push(sharedC + 1);
          }
        }
        // H on the -OH oxygen (present in expanded mode)
        for (let b = 0; b < bondList.length; b++) {
          if (!bondList[b]) {
            continue;
          }
          const ba1 = bondList[b][0],
            ba2 = bondList[b][1];
          let hIdx = -1;
          if (ba1 === ohIdx + 1 && allAtomsTypeList[ba2 - 1] === "H") {
            hIdx = ba2;
          } else if (ba2 === ohIdx + 1 && allAtomsTypeList[ba1 - 1] === "H") {
            hIdx = ba1;
          }
          if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) {
            highAtomsFG.push(hIdx);
          }
        }
      } else {
        const heteroIdx = entry; // 0-based
        if (fgKey === "alcohol" || fgKey === "amine") {
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
          // highlight H atoms bonded to the heteroatom (present in expanded mode)
          for (let b = 0; b < bondList.length; b++) {
            if (!bondList[b]) {
              continue;
            }
            const ba1 = bondList[b][0],
              ba2 = bondList[b][1];
            let hIdx = -1;
            if (ba1 === heteroIdx + 1 && allAtomsTypeList[ba2 - 1] === "H") {
              hIdx = ba2;
            } else if (
              ba2 === heteroIdx + 1 &&
              allAtomsTypeList[ba1 - 1] === "H"
            ) {
              hIdx = ba1;
            }
            if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) {
              highAtomsFG.push(hIdx);
            }
          }
        } else if (fgKey === "aldehyde") {
          // O + carbonyl C + aldehyde H on carbonyl C
          if (
            Array.isArray(atomConnectivityList[heteroIdx]) &&
            atomConnectivityList[heteroIdx].length > 0
          ) {
            const carbonylC = atomConnectivityList[heteroIdx][0]; // 0-based
            if (mode2D === "condensed") {
              if (!highAtomsFG.includes(carbonylC + 1)) {
                highAtomsFG.push(carbonylC + 1);
              }
              continue;
            }
            if (!highAtomsFG.includes(heteroIdx + 1)) {
              highAtomsFG.push(heteroIdx + 1);
            }
            if (!highAtomsFG.includes(carbonylC + 1)) {
              highAtomsFG.push(carbonylC + 1);
            }
            for (let b = 0; b < bondList.length; b++) {
              if (!bondList[b]) {
                continue;
              }
              const ba1 = bondList[b][0],
                ba2 = bondList[b][1];
              let hIdx = -1;
              if (ba1 === carbonylC + 1 && allAtomsTypeList[ba2 - 1] === "H") {
                hIdx = ba2;
              } else if (
                ba2 === carbonylC + 1 &&
                allAtomsTypeList[ba1 - 1] === "H"
              ) {
                hIdx = ba1;
              }
              if (hIdx !== -1 && !highAtomsFG.includes(hIdx)) {
                highAtomsFG.push(hIdx);
              }
            }
          }
        } else if (fgKey === "ketone") {
          // O + carbonyl C + C-neighbors of carbonyl C
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
          if (
            Array.isArray(atomConnectivityList[heteroIdx]) &&
            atomConnectivityList[heteroIdx].length > 0
          ) {
            const carbonylC = atomConnectivityList[heteroIdx][0]; // 0-based
            if (!highAtomsFG.includes(carbonylC + 1)) {
              highAtomsFG.push(carbonylC + 1);
            }
            if (Array.isArray(atomConnectivityList[carbonylC])) {
              for (let n = 0; n < atomConnectivityList[carbonylC].length; n++) {
                const neighbor = atomConnectivityList[carbonylC][n]; // 0-based
                if (
                  allAtomsTypeList[neighbor] === "C" &&
                  !highAtomsFG.includes(neighbor + 1)
                ) {
                  highAtomsFG.push(neighbor + 1);
                }
              }
            }
          }
        } else if (fgKey === "halogen") {
          // halogen atom only — no carbon neighbor
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
        } else if (fgKey === "cyanide") {
          if (
            Array.isArray(atomConnectivityList[heteroIdx]) &&
            atomConnectivityList[heteroIdx].length > 0
          ) {
            const cyanideAnchorC = atomConnectivityList[heteroIdx][0];
            if (mode2D === "condensed") {
              if (!highAtomsFG.includes(cyanideAnchorC + 1)) {
                highAtomsFG.push(cyanideAnchorC + 1);
              }
              continue;
            }
          }
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
          if (Array.isArray(atomConnectivityList[heteroIdx])) {
            for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
              const neighbor = atomConnectivityList[heteroIdx][n] + 1; // to 1-based
              if (!highAtomsFG.includes(neighbor)) {
                highAtomsFG.push(neighbor);
              }
            }
          }
        } else if (fgKey === "nitro") {
          // N + bonded O atoms only, no carbon
          if (mode2D === "condensed") {
            if (!highAtomsFG.includes(heteroIdx + 1)) {
              highAtomsFG.push(heteroIdx + 1);
            }
            continue;
          }
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
          if (Array.isArray(atomConnectivityList[heteroIdx])) {
            for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
              const neighbor = atomConnectivityList[heteroIdx][n]; // 0-based
              if (
                allAtomsTypeList[neighbor] === "O" &&
                !highAtomsFG.includes(neighbor + 1)
              ) {
                highAtomsFG.push(neighbor + 1);
              }
            }
          }
        } else if (fgKey === "ether") {
          // Ether R-O-R': whole (FGno undefined, suffix click) -> O + both Cs (C-O-C).
          // Prefix click (FGno defined, e.g. alkoxy) -> O + full alkoxy fragment (C-O for methoxy).
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
          const _ethNbrs = Array.isArray(atomConnectivityList[heteroIdx])
            ? atomConnectivityList[heteroIdx].filter(function (n) {
                return allAtomsTypeList[n] === "C";
              })
            : [];
          let _ethTargets = _ethNbrs;
          if (FGno !== undefined) {
            const _alkChain = fGetEtherAlkoxyChain();
            if (_alkChain && _alkChain.length > 0) {
              _ethTargets = _alkChain.map(function (a) { return a - 1; });
            } else {
              const _alk = fGetEtherAlkoxyC();
              if (_alk !== null && _alk !== undefined) _ethTargets = [_alk];
              else if (_ethNbrs.length > 1) _ethTargets = [_ethNbrs[1]];
            }
          }
          for (let _en = 0; _en < _ethTargets.length; _en++) {
            if (!highAtomsFG.includes(_ethTargets[_en] + 1)) {
              highAtomsFG.push(_ethTargets[_en] + 1);
            }
          }
          // Alkyl rule (prefix clicks only): attached H join the highlight.
          // The whole C-O-C group (suffix/αιθέρας click, FGno undefined)
          // stays H-free by design. Expanded mode has explicit H;
          // condensed/skeletal models carry none, so this is a no-op there.
          // The both-ends bond derivation below then picks up the C–H bonds
          // automatically.
          if (FGno !== undefined) {
            for (let _en = 0; _en < _ethTargets.length; _en++) {
              const _c1 = _ethTargets[_en] + 1;
              for (let _b = 0; _b < bondList.length; _b++) {
                if (!bondList[_b]) continue;
                const _ba1 = bondList[_b][0];
                const _ba2 = bondList[_b][1];
                if (_ba1 === _c1 && allAtomsTypeList[_ba2 - 1] === "H") {
                  if (!highAtomsFG.includes(_ba2)) highAtomsFG.push(_ba2);
                } else if (_ba2 === _c1 && allAtomsTypeList[_ba1 - 1] === "H") {
                  if (!highAtomsFG.includes(_ba1)) highAtomsFG.push(_ba1);
                }
              }
            }
          }
        } else {
          // cyanide, imine, CCamine, etc.
          if (!highAtomsFG.includes(heteroIdx + 1)) {
            highAtomsFG.push(heteroIdx + 1);
          }
          if (Array.isArray(atomConnectivityList[heteroIdx])) {
            for (let n = 0; n < atomConnectivityList[heteroIdx].length; n++) {
              const neighbor = atomConnectivityList[heteroIdx][n] + 1; // to 1-based
              if (!highAtomsFG.includes(neighbor)) {
                highAtomsFG.push(neighbor);
              }
            }
          }
        }
      }
    }
  }

  if (highAtomsFG.length === 0) {
    return;
  }

  let highAtomsFGArg = "";
  for (let i = 0; i < highAtomsFG.length; i++) {
    highAtomsFGArg += highAtomsFG[i] + ",9";
    if (i < highAtomsFG.length - 1) {
      highAtomsFGArg += ",";
    }
  }
  jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsFGArg);

  // Derive highlighted bonds: any bond with both endpoints highlighted
  let highBondsFG = [];
  for (let b = 0; b < bondList.length; b++) {
    if (!bondList[b]) {
      continue;
    }
    if (
      highAtomsFG.includes(bondList[b][0]) &&
      highAtomsFG.includes(bondList[b][1])
    ) {
      highBondsFG.push(b + 1);
    }
  }

  if (highBondsFG.length === 0) {
    fUpdateSVG();
    return;
  }

  let highBondsArg = "";
  for (let i = 0; i < highBondsFG.length; i++) {
    highBondsArg += highBondsFG[i] + ",9";
    if (i < highBondsFG.length - 1) {
      highBondsArg += ",";
    }
  }
  jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
  fUpdateSVG();
}

// ── fHighlightFG3D ────────────────────────────────────────────────────────

function fHighlightFG3D(FGno) {
  // Build atom list from computed functionalGroupObj3D (SDF 1-based indices).
  // FGno undefined  → all FG atoms (for suffix / single-FG display)
  // FGno 1 or 2     → atoms for the Nth functional group (for prefix position display)

  const fgKeys = Object.keys(functionalGroupObj3D).filter(function (k) {
    return k !== "hydrocarbon";
  });
  const branch = fGetHydrocarbonBranchHighlight3D(fHydrocarbonBranchSlot());
  const allowBranchFallback = [
    "compNumber1",
    "compNumber2",
    "compSecondSub1",
    "compSecondSub2",
  ].includes(nameAnalysisMode) || /^compBranch(Sub|Loc)\d+$/.test(nameAnalysisMode || "");

  let highAtoms3D = [];

  if (fgKeys.length === 0 || (allowBranchFallback &&
      (fSupportsAlkylBranchPrefixes() || fEtherPrefixGroups().length > 0) && branch.atoms.length > 0)) {
    if (!allowBranchFallback || branch.atoms.length === 0) {
      // pure hydrocarbon or no branch match — clear any existing highlight
      Jmol.script(
        jmolAppletNomeclature,
        "select all; selectionHalos off; color atoms none; color bonds none;",
      );
      return;
    }
    highAtoms3D = branch.atoms;
    let highAtoms3DArg = "select";
    for (let i = 0; i < highAtoms3D.length; i++) {
      highAtoms3DArg += " atomno=" + highAtoms3D[i];
      if (i < highAtoms3D.length - 1) {
        highAtoms3DArg += ",";
      }
    }
    highAtoms3DArg += "; select connected(selected) and _H or selected;";
    Jmol.script(
      jmolAppletNomeclature,
      "select all; selectionHalos off; color atoms none; color bonds none;" +
        highAtoms3DArg +
        ";color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];",
    );
    JmolSelection = highAtoms3DArg;
  } else {
    // Build flat [fgKey, heteroEl] instances — one per distinct element type per FG key.
    let fgInstances = [];
    for (let k = 0; k < fgKeys.length; k++) {
      const heteroEls = Object.keys(functionalGroupObj3D[fgKeys[k]]);
      for (let e = 0; e < heteroEls.length; e++) {
        fgInstances.push([fgKeys[k], heteroEls[e]]);
      }
    }

    // Sort: lower-priority FGs first, matching functionalGroupsList order (FGno=1 = first prefix).
    const fgPriorityOrder3D = [
      "carboxylicAcid",
      "ester",
      "cyanide",
      "aldehyde",
      "ketone",
      "alcohol",
      "amine",
      "nitro",
      "ether",
    ];
    // Stash for the IUPAC alkoxy-prefix bond post-pass (O + alkoxy chain,
    // 1-based): the halo script below colors atoms only.
    let _ethAlkoxyFrag3D = null;
    const halogenOrder3D = Object.keys(nameMainCompObj3.halogen.substitute);
    fgInstances.sort(function (a, b) {
      if (a[0] === "halogen" && b[0] === "halogen") {
        return halogenOrder3D.indexOf(a[1]) - halogenOrder3D.indexOf(b[1]);
      }
      return fgPriorityOrder3D.indexOf(b[0]) - fgPriorityOrder3D.indexOf(a[0]);
    });

    let targetInstances = [];
    if (FGno === undefined) {
      targetInstances = fgInstances;
    } else {
      if (fgInstances[FGno - 1]) {
        targetInstances = [fgInstances[FGno - 1]];
      }
    }

    // If the selected component is a carbon side branch rather than a real functional group,
    // highlight the branch atoms even when other functional groups are present.
    if (
      allowBranchFallback &&
      branch.atoms.length > 0 &&
      targetInstances.length === 0
    ) {
      highAtoms3D = branch.atoms;
      let highAtoms3DArg = "select";
      for (let i = 0; i < highAtoms3D.length; i++) {
        highAtoms3DArg += " atomno=" + highAtoms3D[i];
        if (i < highAtoms3D.length - 1) {
          highAtoms3DArg += ",";
        }
      }
      highAtoms3DArg += "; select connected(selected) and _H or selected;";
      Jmol.script(
        jmolAppletNomeclature,
        "select all; selectionHalos off; color atoms none; color bonds none;" +
          highAtoms3DArg +
          ";color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];",
      );
      JmolSelection = highAtoms3DArg;
      return;
    }

    for (let t = 0; t < targetInstances.length; t++) {
      const fgKey = targetInstances[t][0];
      const heteroEl = targetInstances[t][1];
      const heteroList = functionalGroupObj3D[fgKey][heteroEl]; // array of 0-based indices

      for (let i = 0; i < heteroList.length; i++) {
        const entry = heteroList[i];
        if (Array.isArray(entry)) {
          // carboxylicAcid: [oh_idx, co_idx] both 0-based
          const ohIdx = entry[0],
            coIdx = entry[1];
          highAtoms3D.push(ohIdx + 1); // to 1-based
          highAtoms3D.push(coIdx + 1);
          // also include the shared C
          if (Array.isArray(atomConnectivityList3D[ohIdx])) {
            const sharedC = atomConnectivityList3D[ohIdx][0];
            if (!highAtoms3D.includes(sharedC + 1)) {
              highAtoms3D.push(sharedC + 1);
            }
          }
          // H on the -OH oxygen
          for (let b = 0; b < bondList3D.length; b++) {
            if (!bondList3D[b]) {
              continue;
            }
            const ba1 = bondList3D[b][0],
              ba2 = bondList3D[b][1];
            let hIdx = -1;
            if (ba1 === ohIdx + 1 && allAtomsTypeList3D[ba2 - 1] === "H") {
              hIdx = ba2;
            } else if (
              ba2 === ohIdx + 1 &&
              allAtomsTypeList3D[ba1 - 1] === "H"
            ) {
              hIdx = ba1;
            }
            if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) {
              highAtoms3D.push(hIdx);
            }
          }
        } else {
          const heteroIdx = entry; // 0-based
          if (!highAtoms3D.includes(heteroIdx + 1)) {
            highAtoms3D.push(heteroIdx + 1);
          }
          if (fgKey === "alcohol" || fgKey === "amine") {
            // highlight H atoms bonded to the heteroatom
            for (let b = 0; b < bondList3D.length; b++) {
              if (!bondList3D[b]) {
                continue;
              }
              const ba1 = bondList3D[b][0],
                ba2 = bondList3D[b][1];
              let hIdx = -1;
              if (
                ba1 === heteroIdx + 1 &&
                allAtomsTypeList3D[ba2 - 1] === "H"
              ) {
                hIdx = ba2;
              } else if (
                ba2 === heteroIdx + 1 &&
                allAtomsTypeList3D[ba1 - 1] === "H"
              ) {
                hIdx = ba1;
              }
              if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) {
                highAtoms3D.push(hIdx);
              }
            }
          } else if (fgKey === "aldehyde") {
            // O + carbonyl C + aldehyde H on carbonyl C
            if (
              Array.isArray(atomConnectivityList3D[heteroIdx]) &&
              atomConnectivityList3D[heteroIdx].length > 0
            ) {
              const carbonylC = atomConnectivityList3D[heteroIdx][0]; // 0-based
              if (!highAtoms3D.includes(carbonylC + 1)) {
                highAtoms3D.push(carbonylC + 1);
              }
              for (let b = 0; b < bondList3D.length; b++) {
                if (!bondList3D[b]) {
                  continue;
                }
                const ba1 = bondList3D[b][0],
                  ba2 = bondList3D[b][1];
                let hIdx = -1;
                if (
                  ba1 === carbonylC + 1 &&
                  allAtomsTypeList3D[ba2 - 1] === "H"
                ) {
                  hIdx = ba2;
                } else if (
                  ba2 === carbonylC + 1 &&
                  allAtomsTypeList3D[ba1 - 1] === "H"
                ) {
                  hIdx = ba1;
                }
                if (hIdx !== -1 && !highAtoms3D.includes(hIdx)) {
                  highAtoms3D.push(hIdx);
                }
              }
            }
          } else if (fgKey === "ketone") {
            // O + carbonyl C + C-neighbors of carbonyl C
            if (
              Array.isArray(atomConnectivityList3D[heteroIdx]) &&
              atomConnectivityList3D[heteroIdx].length > 0
            ) {
              const carbonylC = atomConnectivityList3D[heteroIdx][0]; // 0-based
              if (!highAtoms3D.includes(carbonylC + 1)) {
                highAtoms3D.push(carbonylC + 1);
              }
              if (Array.isArray(atomConnectivityList3D[carbonylC])) {
                for (
                  let n = 0;
                  n < atomConnectivityList3D[carbonylC].length;
                  n++
                ) {
                  const neighbor = atomConnectivityList3D[carbonylC][n]; // 0-based
                  if (
                    allAtomsTypeList3D[neighbor] === "C" &&
                    !highAtoms3D.includes(neighbor + 1)
                  ) {
                    highAtoms3D.push(neighbor + 1);
                  }
                }
              }
            }
          } else if (fgKey === "halogen") {
            // halogen atom only — no carbon neighbor
          } else if (fgKey === "nitro") {
            // N + bonded O atoms only, no carbon
            if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
              for (
                let n = 0;
                n < atomConnectivityList3D[heteroIdx].length;
                n++
              ) {
                const neighbor = atomConnectivityList3D[heteroIdx][n]; // 0-based
                if (
                  allAtomsTypeList3D[neighbor] === "O" &&
                  !highAtoms3D.includes(neighbor + 1)
                ) {
                  highAtoms3D.push(neighbor + 1);
                }
              }
            }
          } else if (fgKey === "ether") {
            // Ether R-O-R': whole (FGno undefined) -> O + both Cs (C–O–C bonds
            // are colored by the commonEther case); prefix -> O + full alkoxy
            // chain, mirroring the 2D branch (fGetEtherAlkoxyChain).
            if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
              let _eth3Targets = atomConnectivityList3D[heteroIdx].filter(function (n) {
                return allAtomsTypeList3D[n] === "C";
              });
              if (FGno !== undefined) {
                const _alkChain3D = fGetEtherAlkoxyChain3D();
                if (_alkChain3D && _alkChain3D.length > 0) {
                  _eth3Targets = _alkChain3D.map(function (a) { return a - 1; });
                } else {
                  const _alk3 = fGetEtherAlkoxyC3D();
                  if (_alk3 !== null && _alk3 !== undefined) _eth3Targets = [_alk3];
                  else if (_eth3Targets.length > 1) _eth3Targets = [_eth3Targets[1]];
                }
                // stash O + alkoxy chain (1-based) for the bond post-pass below
                _ethAlkoxyFrag3D = [heteroIdx + 1].concat(_eth3Targets.map(function (c) { return c + 1; }));
              }
              for (let n = 0; n < _eth3Targets.length; n++) {
                const neighbor = _eth3Targets[n] + 1;
                if (!highAtoms3D.includes(neighbor)) {
                  highAtoms3D.push(neighbor);
                }
              }
              // Alkyl rule (prefix clicks only: FGno defined): halo H attached
              // to the highlighted carbons. The whole C-O-C group (suffix /
              // αιθέρας click, FGno undefined) stays H-free by design. The FG
              // halo script has no connected-H extension (unlike the chain
              // path), so add them explicitly here.
              if (FGno !== undefined && typeof bondList3D !== "undefined" && typeof allAtomsTypeList3D !== "undefined") {
                for (let _h = 0; _h < _eth3Targets.length; _h++) {
                  const _c1 = _eth3Targets[_h] + 1;
                  for (let _b = 0; _b < bondList3D.length; _b++) {
                    if (!bondList3D[_b]) continue;
                    const _ba1 = bondList3D[_b][0];
                    const _ba2 = bondList3D[_b][1];
                    if (_ba1 === _c1 && allAtomsTypeList3D[_ba2 - 1] === "H") {
                      if (!highAtoms3D.includes(_ba2)) highAtoms3D.push(_ba2);
                    } else if (_ba2 === _c1 && allAtomsTypeList3D[_ba1 - 1] === "H") {
                      if (!highAtoms3D.includes(_ba1)) highAtoms3D.push(_ba1);
                    }
                  }
                }
              }
            }
          } else {
            // cyanide, imine, CCamine, etc.
            if (Array.isArray(atomConnectivityList3D[heteroIdx])) {
              for (
                let n = 0;
                n < atomConnectivityList3D[heteroIdx].length;
                n++
              ) {
                const neighbor = atomConnectivityList3D[heteroIdx][n] + 1;
                if (!highAtoms3D.includes(neighbor)) {
                  highAtoms3D.push(neighbor);
                }
              }
            }
          }
        }
      }
    }

    if (highAtoms3D.length === 0) {
      Jmol.script(
        jmolAppletNomeclature,
        "select all; selectionHalos off; color atoms none; color bonds none;",
      );
      return;
    }

    let highAtoms3DArg = "select";
    for (let i = 0; i < highAtoms3D.length; i++) {
      highAtoms3DArg += " atomno=" + highAtoms3D[i];
      if (i < highAtoms3D.length - 1) {
        highAtoms3DArg += ",";
      }
    }

    // Merged into one script (vs. relying on the earlier fClearHighlights() call) to avoid a Jmol script-queue race.
    Jmol.script(
      jmolAppletNomeclature,
      "select all; selectionHalos off; color atoms none; color bonds none;" +
        highAtoms3DArg +
        ";color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];",
    );
    JmolSelection = highAtoms3DArg;
    // IUPAC alkoxy prefix: the halo script colors atoms only — color the
    // O–C + C–C + C–H bonds of the stashed O + alkoxy chain explicitly (green).
    if (_ethAlkoxyFrag3D) fColorFragmentBonds3D(_ethAlkoxyFrag3D, true);
  }
}

// Per-component numbering override (ethers): when set, fShowNumbering numbers
// the override atom list instead of the parent main chain. Cleared on next
// plain fShowNumbering(time) call and in fClearHighlights.
let numberingAtomOverride = null;
let numberingAtomOverride3D = null;

// ── fShowNumbering ────────────────────────────────────────────────────────

function fShowNumbering(time, overrideAtoms, overrideAtoms3D) {
  let numberOffset, currAtomTextElement, x, y, r, numberString;
  if (!numberingFlag) {
    return;
  }
  numberingAtomOverride = Array.isArray(overrideAtoms) ? overrideAtoms : null;
  numberingAtomOverride3D = Array.isArray(overrideAtoms3D) ? overrideAtoms3D : null;
  clearInterval(myNumberingTimeout);
  numbersSVGElements = [];

  molSvg = MuSVG("#jsmeNomeclatureSVG svg");
  switch (mode2D) {
    case "condensed":
      highAtoms =
        Array.isArray(numberingAtomOverride)
          ? numberingAtomOverride
          : mainChainMode === "algorithmic" ||
            !nameExamples[selectedMol]["mainChain_Condensed"]
            ? mainChainAtomsList
            : nameExamples[selectedMol]["mainChain_Condensed"];
      highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(
        function (atomNo) {
          return allAtomsTypeList[atomNo - 1] === "C";
        },
      );
      const condensedAtomTextMap = fGetRenderedAtomTextMap();
      numberOffset = [20, -280];
      for (let i = 0; i < highAtoms.length; i++) {
        currAtomTextElement = condensedAtomTextMap[highAtoms[i] - 1];
        if (!currAtomTextElement) {
          continue;
        }
        const compactLabelKey = compactNumberingLabelMap[highAtoms[i] - 1];
        x = compactLabelKey
          ? fGetCompactLabelNumberX(
              currAtomTextElement,
              compactLabelKey,
              numberOffset[0],
            )
          : parseInt(currAtomTextElement.attr("x")) + numberOffset[0];
        y = parseInt(currAtomTextElement.attr("y")) + +numberOffset[1];
        r = 220;
        numberString = `  <text id='number${i}' x='${x}' y='${y}' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>${i + 1}</text> `;
        numbersSVGElements[i] = numberString;
      }
      break;
    case "condensedZigZag":
      highAtoms =
        Array.isArray(numberingAtomOverride)
          ? numberingAtomOverride
          : mainChainMode === "algorithmic" ||
            !nameExamples[selectedMol]["mainChain_Condensed"]
            ? mainChainAtomsList
            : nameExamples[selectedMol]["mainChain_Condensed"];
      highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(
        function (atomNo) {
          return allAtomsTypeList[atomNo - 1] === "C";
        },
      );
      const condensedZigZagAtomTextMap = fGetRenderedAtomTextMap();
      numberOffset = [20, -280];
      for (let i = 0; i < highAtoms.length; i++) {
        currAtomTextElement = condensedZigZagAtomTextMap[highAtoms[i] - 1];
        if (!currAtomTextElement) {
          continue;
        }
        x = parseInt(currAtomTextElement.attr("x")) + numberOffset[0];
        y = parseInt(currAtomTextElement.attr("y")) + +numberOffset[1];
        r = 220;
        numberString = `  <text id='number${i}' x='${x}' y='${y}' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>${i + 1}</text> `;
        numbersSVGElements[i] = numberString;
      }
      break;
    case "expanded":
      highAtoms =
        Array.isArray(numberingAtomOverride)
          ? numberingAtomOverride
          : mainChainMode === "algorithmic" ||
            !nameExamples[selectedMol]["mainChain_Expanded"]
            ? mainChainAtomsList
            : nameExamples[selectedMol]["mainChain_Expanded"];
      highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(
        function (atomNo) {
          return allAtomsTypeList[atomNo - 1] === "C";
        },
      );
      const expandedAtomTextMap = fGetRenderedAtomTextMap(false, true);
      numberOffset = [-120, -280];
      for (let i = 0; i < highAtoms.length; i++) {
        currAtomTextElement = expandedAtomTextMap[highAtoms[i] - 1];
        if (!currAtomTextElement) {
          continue;
        }
        x = parseInt(currAtomTextElement.attr("x")) + numberOffset[0];
        y = parseInt(currAtomTextElement.attr("y")) + +numberOffset[1];
        r = 220;
        numberString = `  <text id='number${i}' x='${x}' y='${y}' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>${i + 1}</text> `;
        numbersSVGElements[i] = numberString;
      }
      break;

    case "skeletal":
      var _skel = nameExamples[selectedMol]
        ? nameExamples[selectedMol]["mainChain_Skeletal"]
        : null;
      highAtoms =
        Array.isArray(numberingAtomOverride)
          ? numberingAtomOverride
          : mainChainMode === "algorithmic" ||
            !Array.isArray(_skel) ||
            _skel.length === 0
            ? mainChainAtomsList
            : _skel;
      highAtoms = (Array.isArray(highAtoms) ? highAtoms : []).filter(
        function (atomNo) {
          return allAtomsTypeList[atomNo - 1] === "C";
        },
      );
      numberOffset = [-50, -180];
      for (let i = 0; i < highAtoms.length; i++) {
        let _foundBond = false;
        for (let b = 0; b < bondList.length; b++) {
          if (highAtoms[i] == bondList[b][0]) {
            currAtomTextElement = molSvg.select(
              "line:nth-of-type(" + svgBondList[b] + ")",
            );
            x = parseInt(currAtomTextElement.attr("x1")) + numberOffset[0];
            y = parseInt(currAtomTextElement.attr("y1")) + +numberOffset[1];

            _foundBond = true;
            break;
          } else {
            if (highAtoms[i] == bondList[b][1]) {
              currAtomTextElement = molSvg.select(
                "line:nth-of-type(" + svgBondList[b] + ")",
              );
              x = parseInt(currAtomTextElement.attr("x2")) + numberOffset[0];
              y = parseInt(currAtomTextElement.attr("y2")) + +numberOffset[1];
              _foundBond = true;
            }
          }
        }
        if (!_foundBond) {
          continue; // atom has no drawn bond: skip instead of reusing stale x/y
        }

        r = 220;
        numberString = `  <text id='number${i}' x='${x}' y='${y}' font-size='380px' font-weight='bold' font-family='Arial, sans-serif' fill='#193F8F' stroke='white' stroke-width='60px' paint-order='stroke'>${i + 1}</text> `;
        numbersSVGElements[i] = numberString;
      }
      break;
  }

  if (time === undefined || time === null) {
    time = 400;
  }
  if (time == 0) {
    for (let i = 0; i < numbersSVGElements.length; i++) {
      fShowNumber();
    }
  } else {
    myNumberingTimeout = setInterval(fShowNumber, time);
  }
}

// ── fShowNumber ───────────────────────────────────────────────────────────

function fShowNumber() {
  fShowNumber3D(currNumberEl);
  const numberElement = MuSVG.parse(numbersSVGElements[currNumberEl]);
  if (numberElement) {
    molSvg.select("g").append(numberElement);
  }
  currNumberEl += 1;

  if (currNumberEl >= numbersSVGElements.length) {
    currNumberEl = 0;
    clearInterval(myNumberingTimeout);
  }
}

// ── fShowNumbering3D ──────────────────────────────────────────────────────

function fShowNumbering3D() {
  const chain3D = Array.isArray(numberingAtomOverride3D)
    ? numberingAtomOverride3D
    : mainChainMode !== "algorithmic"
      ? nameExamples[selectedMol].mainChain3D
      : null;
  if (chain3D) {
    // Local copy: a step override must not leak into the global chain
    const _chain3D = chain3D.slice();
    for (let i = 0; i < _chain3D.length; i++) {
      fShowNumber3D(i, _chain3D);
    }
    return;
  } else if (mainChainMode !== "algorithmic") {
    mainChainAtoms3D = nameExamples[selectedMol].mainChain3D;
  }
  // algorithmic mode: mainChainAtoms3D already set by fCalcMainChain3D()

  for (let i = 0; i < mainChainAtoms3D.length; i++) {
    fShowNumber3D(i);
  }
}

// ── removeEcho3D ──────────────────────────────────────────────────────────

function removeEcho3D() {
  Jmol.script(jmolAppletNomeclature, " set echo  off;");
}

// ── fShowNumber3D ─────────────────────────────────────────────────────────

function fShowNumber3D(n, chain) {
  const _chain = Array.isArray(chain) ? chain : mainChainAtoms3D;
  let myAtom =
    Array.isArray(numberingAtomOverride3D)
      ? numberingAtomOverride3D[n]
      : mainChainMode === "algorithmic"
        ? _chain[n]
        : nameExamples[selectedMol].mainChain3D[n];

  if (typeof myAtom === "undefined" || myAtom === null) {
    return;
  }

  let id = "theGroupEcho" + (n + 1);
  let atom = "{atomno = " + myAtom + "}";
  let num = n + 1;
  let d = 0.01; // stroke thickness in Å (tune this)

  // Shadow echoes in 4 directions (black stroke)
  let s = "";
  s +=
    " set echo " +
    id +
    " " +
    atom +
    "; set echo offset {-1.1 1.1 3}; font echo 42 sansSerif bold; color echo[x193f8f]; echo " +
    num +
    ";";

  s +=
    " set echo " +
    id +
    "s1 " +
    atom +
    "; set echo offset {" +
    (-1.1 + d) +
    " " +
    (1.1 - d) +
    " 3}; font echo 42 sansSerif bold; color echo black; echo " +
    num +
    ";";

  Jmol.script(jmolAppletNomeclature, s);
}

// ── fHighlightMultiBonds ──────────────────────────────────────────────────

function fShowBondAtoms() {
  // Settings-panel option (default off): bond-component clicks (αν/εν/ιν)
  // highlight only the bonds; endpoint C atoms join only when enabled.
  try {
    return $("#bondAtomsCheck").hasClass("selectedCheck");
  } catch (e) {
    return false;
  }
}

function fShowNumberingBonds() {
  // Settings-panel option (default on): main-chain/acid-fragment numbering
  // clicks highlight the C–C bonds as well as the atoms.
  try {
    return $("#highlightNumberingBondsCheck").hasClass("selectedCheck");
  } catch (e) {
    return true;
  }
}

function fHighlightMultiBonds(bondCompPos) {
  let bondType, bondID;
  if (nameAnalysisMode == "none") {
    return;
  }
  if (multiBondListCC.length == 0) {
    return;
  }

  let highAtomsArg = "";
  let highBondsArg = "";
  if (bondCompPos == 1) {
    // one type of multiple bond
    if (multiBondsObj.CCd.length > 0) {
      bondType = 2; // double bond
    } else {
      bondType = 3; // triple bond
    }

    for (let i = 0; i < multiBondListCC.length; i++) {
      bondID = multiBondListCC[i];
      if (bondList[bondID - 1][2] !== bondType) {
        continue;
      } // skip if not the  bond type
      highBondsArg += multiBondListCC[i] + ",9";
      if (i < multiBondListCC.length - 1) {
        highBondsArg += ",";
      }

      highAtomsArg +=
        bondList[multiBondListCC[i] - 1][0] +
        ",9," +
        bondList[multiBondListCC[i] - 1][1] +
        ",9";
      if (i < multiBondListCC.length - 1) {
        highAtomsArg += ",";
      }
    }
  } else if (bondCompPos == 2) {
    // two types of multiple bonds -- highlight triple bonds
    for (let i = 0; i < multiBondListCC.length; i++) {
      bondID = multiBondListCC[i];
      if (bondList[bondID - 1][2] !== 3) {
        continue;
      } // skip if not triple bond
      highBondsArg += multiBondListCC[i] + ",9";
      if (i < multiBondListCC.length - 1) {
        highBondsArg += ",";
      }

      highAtomsArg +=
        bondList[multiBondListCC[i] - 1][0] +
        ",9," +
        bondList[multiBondListCC[i] - 1][1] +
        ",9";
      if (i < multiBondListCC.length - 1) {
        highAtomsArg += ",";
      }
    }
  }

  jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
  // Endpoint atoms only when the bond-atoms setting is on (default: bonds only).
  if (fShowBondAtoms()) jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);

  fUpdateSVG();
}

// ── fHighlightMultiBonds3D ────────────────────────────────────────────────

function fHighlightMultiBonds3D(bondCompPos) {
  // Uses SDF-derived *3D globals directly — no 2D-position-3D mapping needed.

  if (multiBondListCC3D.length === 0) {
    return;
  }

  let bondType;
  let bOrder;
  if (bondCompPos === 1) {
    bondType = multiBondsObj3D.CCd.length > 0 ? 2 : 3;
  } else {
    bondType = 3; // bondCompPos 2 always targets triple bonds
  }

  const highBonds3D = [];
  for (let i = 0; i < multiBondListCC3D.length; i++) {
    const bondID = multiBondListCC3D[i];
    if (bondList3D[bondID - 1][2] !== bondType) {
      continue;
    }
    const atom1 = bondList3D[bondID - 1][0]; // already SDF 1-based
    const atom2 = bondList3D[bondID - 1][1];
    highBonds3D.push([atom1, atom2]);
  }

  if (highBonds3D.length === 0) {
    return;
  }

  let highAtoms3DArg = "select";
  for (let i = 0; i < highBonds3D.length; i++) {
    highAtoms3DArg +=
      " atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1];
    if (i < highBonds3D.length - 1) {
      highAtoms3DArg += ",";
    }
    Jmol.script(
      jmolAppletNomeclature,
      "select atomno=" +
        highBonds3D[i][0] +
        ", atomno=" +
        highBonds3D[i][1] +
        "; color bond [X79dc6d];",
    );
  }

  Jmol.script(
    jmolAppletNomeclature,
    highAtoms3DArg +
      "; color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];",
  );
  if (!fShowBondAtoms()) {
    // Bonds-only mode: undo the atom halo — keep just the green bonds above.
    Jmol.script(
      jmolAppletNomeclature,
      "select all; selectionHalos off; color atoms none;",
    );
  } else {
    // Single bonds bridging two highlighted atoms inherit green from atom colors.
    // Reset them to CPK.
    const highAtomSet = new Set();
    for (let i = 0; i < highBonds3D.length; i++) {
      highAtomSet.add(highBonds3D[i][0]);
      highAtomSet.add(highBonds3D[i][1]);
    }
    for (let b = 0; b < bondList3D.length; b++) {
      if (!bondList3D[b]) {
        continue;
      }
      const ba1 = bondList3D[b][0],
        ba2 = bondList3D[b][1],
        bOrder = bondList3D[b][2];
      if (bOrder === 1 && highAtomSet.has(ba1) && highAtomSet.has(ba2)) {
        Jmol.script(
          jmolAppletNomeclature,
          "select atomno=" + ba1 + ", atomno=" + ba2 + "; color bond cpk;",
        );
      }
    }
  }

  JmolSelection = highAtoms3DArg;
}

// ── fHighlightSingleBondsCC ───────────────────────────────────────────────

function fHighlightSingleBondsCC(atomSetOrNull) {
  if (nameAnalysisMode === "none") {
    return;
  }

  // Optional scope: 1-based atom numbers (e.g. the ester acid chain). Both bond
  // ends must lie inside the set; omitted/null keeps the molecule-wide default.
  const _set = Array.isArray(atomSetOrNull) ? atomSetOrNull : null;
  let highAtomsArg = "";
  let highBondsArg = "";
  const bondArgs = [];
  const atomArgs = [];
  for (let i = 0; i < bondList.length; i++) {
    const bOrder = bondList[i][2];
    if (bOrder !== 1) {
      continue;
    }
    const a1 = bondList[i][0]; // 1-based
    const a2 = bondList[i][1]; // 1-based
    if (allAtomsTypeList[a1 - 1] !== "C" || allAtomsTypeList[a2 - 1] !== "C") {
      continue;
    }
    if (_set && (_set.indexOf(a1) < 0 || _set.indexOf(a2) < 0)) {
      continue;
    }
    bondArgs.push(i + 1 + ",9");
    atomArgs.push(a1 + ",9," + a2 + ",9");
  }
  if (bondArgs.length === 0) {
    return;
  }
  highBondsArg = bondArgs.join(",");
  highAtomsArg = atomArgs.join(",");

  jsmeNomeclatureApplet.setBondBackgroundColors(0, highBondsArg);
  // Endpoint atoms only when the bond-atoms setting is on (default: bonds only).
  if (fShowBondAtoms()) jsmeNomeclatureApplet.setAtomBackgroundColors(0, highAtomsArg);
  fUpdateSVG();
}

// ── fHighlightSingleBondsCC3D ─────────────────────────────────────────────

function fHighlightSingleBondsCC3D(atomSetOrNull) {
  if (!bondList3D || bondList3D.length === 0) {
    return;
  }

  const _set3D = Array.isArray(atomSetOrNull) ? atomSetOrNull : null;
  const highBonds3D = [];
  for (let i = 0; i < bondList3D.length; i++) {
    if (!bondList3D[i]) {
      continue;
    }
    const bOrder = bondList3D[i][2];
    if (bOrder !== 1) {
      continue;
    }
    const a1 = bondList3D[i][0]; // SDF 1-based
    const a2 = bondList3D[i][1];
    if (
      allAtomsTypeList3D[a1 - 1] !== "C" ||
      allAtomsTypeList3D[a2 - 1] !== "C"
    ) {
      continue;
    }
    if (_set3D && (_set3D.indexOf(a1) < 0 || _set3D.indexOf(a2) < 0)) {
      continue;
    }
    highBonds3D.push([a1, a2]);
  }
  if (highBonds3D.length === 0) {
    return;
  }

  let highAtoms3DArg = "select";
  for (let i = 0; i < highBonds3D.length; i++) {
    highAtoms3DArg +=
      " atomno=" + highBonds3D[i][0] + ", atomno=" + highBonds3D[i][1];
    if (i < highBonds3D.length - 1) {
      highAtoms3DArg += ",";
    }
    Jmol.script(
      jmolAppletNomeclature,
      "select atomno=" +
        highBonds3D[i][0] +
        ", atomno=" +
        highBonds3D[i][1] +
        "; color bond [X79dc6d];",
    );
  }
  Jmol.script(
    jmolAppletNomeclature,
    highAtoms3DArg +
      "; color selectionHalos[X79dc6d]; selectionHalos on; color atoms [X79dc6d];",
  );
  if (!fShowBondAtoms()) {
    // Bonds-only mode: undo the atom halo — keep just the green bonds above.
    Jmol.script(
      jmolAppletNomeclature,
      "select all; selectionHalos off; color atoms none;",
    );
  }

  JmolSelection = highAtoms3DArg;
}

// ── fSetMolVis3D ──────────────────────────────────────────────────────────

function fSetMolVis3D(theVisModel) {
  let mySpt;
  if (theVisModel === undefined) {
    theVisModel = vis3D;
  }

  switch (theVisModel) {
    case "ballnstick":
      mySpt =
        " select all and not _Xx;  spacefill 24%; wireframe 0.13;set labelFront off;" +
        JmolSelection;
      break;
    case "spacefill":
      mySpt =
        " select all and not _Xx;  spacefill 70%; wireframe off;set labelFront off;" +
        JmolSelection;
      break;
    case "sticks":
      mySpt =
        " select all and not _Xx;  spacefill off; wireframe 0.2;  set labelFront on;" +
        JmolSelection;
      break;
  }
  Jmol.script(jmolAppletNomeclature, mySpt);
}

// ── fViewerHeights2D3D ────────────────────────────────────────────────────
// Container-derived viewer heights (viewport-based, never the viewers' own
// heights — that would be circular). Total = viewport minus page chrome;
// column chrome = every visible viewerCol child except the two viewer
// hosts (generic, so per-step chrome toggles are honored). Visible viewers
// split the remainder equally; both viewers share the VIEWER_MIN_H floor
// (mirrors the CSS minimums), the phone landscape cap stays as ceiling.
// Returns {h2, h3} (0 = hidden).
function fViewerHeights2D3D(raw) {
  var out = { h2: 0, h3: 0, full: 0 };
  try {
    var total = window.innerHeight - 30; // header
    var h1 = document.getElementById("pageTitle");
    if (h1 && h1.offsetParent !== null) total -= h1.offsetHeight;
    var cred = document.getElementById("creditsUs");
    if (cred && cred.offsetParent !== null) total -= cred.offsetHeight;
    // Per-step note card (presentation only): when it stays in flow above the
    // app columns (top position), its full vertical footprint (incl. net
    // margins) must leave the viewer budget — otherwise a two-viewer present
    // step with a note overflows the page. Hidden in authoring → offsetParent
    // is null; in a side rail it is beside the app (see probe below).
    var stepTxt = document.getElementById("scStepText");
    var textIsSideRail = false;
    try {
      textIsSideRail = !!(stepTxt && stepTxt.parentElement &&
        stepTxt.parentElement.classList &&
        stepTxt.parentElement.classList.contains("mainApp3Columns"));
    } catch (eRail) { /* layout probe unavailable */ }
    // v50: in a side-rail layout the card is beside the app, not above it,
    // so its height must not be subtracted from the viewer budget.
    if (stepTxt && stepTxt.offsetParent !== null && !textIsSideRail) {
      var sTxtH = stepTxt.offsetHeight, sTxtMT = 0, sTxtMB = 0;
      try {
        var sTxtCs = window.getComputedStyle(stepTxt);
        sTxtMT = parseFloat(sTxtCs.marginTop) || 0;
        sTxtMB = parseFloat(sTxtCs.marginBottom) || 0;
      } catch (eSTxt) { /* computed style unavailable */ }
      total -= (sTxtH + sTxtMT + sTxtMB);
    }
    total -= 30; // page margins / gaps
    // Presentation navigation: the fixed play bar overlays the top of the
    // viewport without taking flow space, so carve it out of the budget
    // while presenting — "full" heights then clear the h1, the play bar,
    // and the credits footer on any playback screen.
    try {
      if (typeof MuLERMoCScenario !== "undefined" && MuLERMoCScenario && MuLERMoCScenario.present) {
        var pb = document.getElementById("scenarioPlayBar");
        if (pb && pb.offsetParent !== null && pb.offsetHeight > 0) total -= (pb.offsetHeight + 8);
      }
    } catch (ePb) { /* play-bar probe unavailable */ }
    var vc = document.getElementById("viewerCol");
    var chrome = 0;
    var show2D = false, show3D = false;
    if (vc) {
      // Visibility is read off the actually-toggled units: the nested SVG
      // overlay for 2D (it lives INSIDE jsmeNomeclatureDIV, so a children
      // loop over viewerCol could never see it — and the DIV itself never
      // hides) and the 3D container. Both hosts are skipped in chrome
      // accounting below (their heights are viewers, not chrome).
      try {
        var _svg2D = document.getElementById("jsmeNomeclatureSVG");
        if (_svg2D && _svg2D.offsetParent !== null) show2D = true;
      } catch (eV2) { /* overlay lookup unavailable */ }
      var kids = vc.children;
      for (var i = 0; i < kids.length; i++) {
        var k = kids[i];
        if (k.id === "jsmeNomeclatureDIV" || k.id === "nomeclature3D") {
          if (k.id === "nomeclature3D" && k.offsetParent !== null) show3D = true;
          continue;
        }
        if (k.offsetParent !== null && k.offsetHeight > 0) chrome += k.offsetHeight;
      }
    } else {
      show2D = true; show3D = true;
    }
    var n = (show2D ? 1 : 0) + (show3D ? 1 : 0);
    if (n === 0) return out;
    // Dead-space top-up: when a sibling column (menu/analysis content)
    // stretches the row taller than the viewport share, viewers split the
    // row-driven height instead — otherwise dead space sits under them.
    // Sibling heights never depend on viewer size: no circularity.
    var sibH = 0;
    try {
      var menu = document.getElementById("menuCol");
      if (menu && menu.offsetParent !== null) sibH = Math.max(sibH, menu.offsetHeight);
      var anal = document.getElementById("analysisCol");
      if (anal && anal.offsetParent !== null) sibH = Math.max(sibH, anal.offsetHeight);
    } catch (eSib) { /* sibling measuring unavailable */ }
    var shareFor = function (k) {
      var e = Math.floor((total - chrome) / k);
      var rowE = Math.floor((sibH - chrome) / k);
      return rowE > e ? rowE : e;
    };
    var each = shareFor(n);
    // Single-viewer full height (no cap), independent of how many are visible
    // right now — the slider ceiling in Ρυθμίσεις.
    var eachFull = shareFor(1);
    out.full = Math.max(
      show2D ? Math.max(eachFull, VIEWER_MIN_H) : 0,
      show3D ? Math.max(eachFull, VIEWER_MIN_H) : 0
    );
    var maxViewerH =
      window.innerHeight < 430 ? Math.floor(window.innerHeight * 0.3) : Infinity;
    // Single visible viewer: cap its height. Default (viewerMaxH == null) is
    // the both-visible share so hiding the other viewer never resizes the
    // survivor; an explicit px cap — or "full" for the whole single share —
    // overrides. The cap is clamped into
    // [floor, single share], so it can neither squash below the CSS minimum
    // nor exceed the space one viewer can actually take. `raw` skips the cap
    // (used to measure the full height for the slider ceiling).
    var cap2 = Infinity, cap3 = Infinity;
    // Double visible viewers: an explicit COMBINED total overrides the equal
    // split for BOTH — each viewer gets half the combined 2D+3D height (it can
    // grow or shrink; the page scrolls if the total no longer fits). Auto
    // (viewerBothH == null) keeps the split. The phone cap still trims.
    var each2 = each, each3 = each;
    if (!raw && n === 2 && viewerBothH != null) {
      // "full" fills the live viewport instead of a stored px total.
      var bothTotal = viewerBothH === "full"
        ? Math.round(total - chrome)
        : Math.round(viewerBothH);
      if (viewerBothH !== "full") {
        if (bothTotal < VIEWER_BOTH_MIN) bothTotal = VIEWER_BOTH_MIN;
        if (bothTotal > VIEWER_BOTH_MAX) bothTotal = VIEWER_BOTH_MAX;
      }
      each2 = each3 = Math.round(bothTotal / 2);
    } else if (n === 1 && !raw) {
      var autoCap = shareFor(2);
      if (show2D) {
        // "full" resolves to the whole single share: Infinity collapses to
        // single2 through the clamp below — never below the CSS minimum,
        // never beyond what one viewer can actually take.
        cap2 = viewerMaxH === "full" ? Infinity : (viewerMaxH != null ? viewerMaxH : autoCap);
        var single2 = Math.max(each, VIEWER_MIN_H);
        if (cap2 < VIEWER_MIN_H) cap2 = VIEWER_MIN_H;
        if (cap2 > single2) cap2 = single2;
      }
      if (show3D) {
        cap3 = viewerMaxH === "full" ? Infinity : (viewerMaxH != null ? viewerMaxH : autoCap);
        var single3 = Math.max(each, VIEWER_MIN_H);
        if (cap3 < VIEWER_MIN_H) cap3 = VIEWER_MIN_H;
        if (cap3 > single3) cap3 = single3;
      }
    }
    if (show2D) out.h2 = Math.min(Math.max(each2, VIEWER_MIN_H), cap2, maxViewerH);
    if (show3D) out.h3 = Math.min(Math.max(each3, VIEWER_MIN_H), cap3, maxViewerH);
  } catch (eH) { /* measuring unavailable */ }
  return out;
}

// ── fResizeViewers ────────────────────────────────────────────────────────
// Fluid viewers: widths follow the viewer column (native re-depict —
// coordinates correct by construction); heights are container-derived via
// fViewerHeights2D3D (viewport minus chrome, split equally, floors hold).
// Then rebuild the SVG overlay + replay numbering from the fresh graphics.
// Triggered by a debounced ResizeObserver on #viewerCol (installed in
// jsmeOnLoad); the old window-resize listener below stays retired. Zoom
// (molZoom2D, absolute, stored per step) composes on top, untouched — fit
// and framing are independent.
function fResizeViewers() {
  // 3D: fit the JSmol viewport to its container (unchanged behavior).
  var container = document.getElementById("nomeclature3D");
  var vh = fViewerHeights2D3D();
  if (container && container.clientWidth > 0) {
    var w3 = container.clientWidth;
    // Container-derived height (falls back to the old width ratio if the
    // helper yields nothing, e.g. hidden viewer).
    var h = vh.h3 > 0 ? vh.h3 : Math.round((w3 * 220) / 480);
    try {
      if (typeof Jmol !== "undefined" && typeof jmolAppletNomeclature !== "undefined") {
        Jmol.resizeApplet(jmolAppletNomeclature, { width: w3, height: h });
      }
    } catch (e3D) { /* 3D applet unavailable */ }
    // The applet info table div sets the visible 3D height: assert it to the
    // same value so API and DOM agree (guarded: JSmol version naming).
    try {
      var infoDiv = document.getElementById("jmolAppletNomeclature_appletinfotablediv");
      if (infoDiv) infoDiv.style.height = h + "px";
    } catch (eInfo) { /* JSmol internals unavailable */ }
  }
  // 2D fluid: fit the applets to the viewer column content width.
  var vc = document.getElementById("viewerCol");
  if (!vc) return;
  var vw = 0;
  try { vw = Math.round(vc.clientWidth); } catch (eV) { vw = 0; }
  if (!(vw > 0)) return;
  // Column chrome gutter (border + panel padding): the applet must never
  // overflow its column. Height is container-derived (falls back to the old
  // width ratio if the helper yields nothing).
  var aw = Math.max(vw - 4, 50);
  var svgH = vh.h2 > 0 ? vh.h2 : Math.round((aw * 200) / 450);
  // Diagnostics (owner console protocol): set window.MuLERmoCDebugResize
  // to true and watch for one [resize] line per run (off by default).
  try {
    if (typeof window !== "undefined" && window.MuLERmoCDebugResize) {
      var _vis2 = false, _vis3 = false;
      try {
        var _s2 = document.getElementById("jsmeNomeclatureSVG");
        _vis2 = !!(_s2 && _s2.offsetParent !== null);
        var _s3 = document.getElementById("nomeclature3D");
        _vis3 = !!(_s3 && _s3.offsetParent !== null);
      } catch (eVis) { /* visibility check unavailable */ }
      console.info("[resize] vh2=" + vh.h2 + " vh3=" + vh.h3 +
        " fallback2D=" + (!(vh.h2 > 0)) + " fallback3D=" + (!(vh.h3 > 0)) +
        " applied2D=" + aw + "x" + svgH + " visible2D=" + _vis2 +
        " visible3D=" + _vis3);
    }
  } catch (eDbg) { /* diagnostics unavailable */ }
  var svg = document.getElementById("jsmeNomeclatureSVG");
  if (svg) {
    svg.style.width = aw + "px";
    svg.style.height = svgH + "px";
    try {
      if (
        typeof jsmeNomeclatureApplet !== "undefined" &&
        jsmeNomeclatureApplet.setSize
      ) {
        jsmeNomeclatureApplet.setSize(aw, svgH);
      }
      if (
        typeof jsmeNomeclatureAppletORGNL !== "undefined" &&
        jsmeNomeclatureAppletORGNL.setSize
      ) {
        jsmeNomeclatureAppletORGNL.setSize(aw, svgH);
      }
    } catch (eS) { /* applet unavailable */ }
  }
  // Overlays derive from the applet graphics: re-apply the zoom scale (this
  // re-fits the depiction — setSize alone leaves it small/stale, as any zoom
  // press demonstrates), rebuild the overlay + replay numbering. Highlight
  // survival across setSize is a browser verdict (see checklist); if the
  // tint drops, re-fire the selected component via the click sequence
  // (fClearHighlights + fUpdateSVG + fExplainNameComp, no narration).
  try { if (typeof fReapplyZoomScale2D === "function") fReapplyZoomScale2D(); } catch (eZ) { /* zoom re-apply unavailable */ }
}

// Debounced ResizeObserver on the viewer column: window drags, pin/unpin,
// viewer toggles, settings open/close. Tracks width AND height; skips
// unchanged geometry; no loop (applet boxes follow the column, never the
// reverse). Replaces the retired window listener below.
var _zoomROTimer = null;
var _zoomROLastW = 0;
var _zoomROLastH = 0;
var _zoomRO = null;
function fInitZoomObserver2D() {
  try {
    if (_zoomRO || typeof ResizeObserver === "undefined") return;
    var vc = document.getElementById("viewerCol");
    if (!vc) return;
    var _geom = function () {
      var r = { w: 0, h: 0 };
      try {
        var b = vc.getBoundingClientRect();
        r.w = Math.round(b.width); r.h = Math.round(b.height);
      } catch (eG) { /* measuring unavailable */ }
      return r;
    };
    _zoomRO = new ResizeObserver(function () {
      try {
        var g = _geom();
        if (g.w === _zoomROLastW && g.h === _zoomROLastH) return;
        if (_zoomROTimer) clearTimeout(_zoomROTimer);
        _zoomROTimer = setTimeout(function () {
          _zoomROTimer = null;
          var g2 = _geom();
          if (!(g2.w > 0) || (g2.w === _zoomROLastW && g2.h === _zoomROLastH)) return;
          _zoomROLastW = g2.w; _zoomROLastH = g2.h;
          fResizeViewers();
        }, 150);
      } catch (eO) { /* observer unavailable */ }
    });
    try {
      var g0 = _geom();
      _zoomROLastW = g0.w; _zoomROLastH = g0.h;
    } catch (eI) { _zoomROLastW = 0; _zoomROLastH = 0; }
    _zoomRO.observe(vc);
  } catch (eZ) { /* observer unavailable */ }
}

var _nameFitROTimer = null;
var _nameFitROLastW = 0;
var _nameFitRO = null;
function fInitNameFitObserver() {
  try {
    if (_nameFitRO || typeof ResizeObserver === "undefined") return;
    var ac = document.getElementById("analysisCol");
    if (!ac) return;
    _nameFitRO = new ResizeObserver(function () {
      try {
        var w = Math.round(ac.getBoundingClientRect().width);
        if (w === _nameFitROLastW) return;
        if (_nameFitROTimer) clearTimeout(_nameFitROTimer);
        _nameFitROTimer = setTimeout(function () {
          _nameFitROTimer = null;
          var w2 = Math.round(ac.getBoundingClientRect().width);
          if (!(w2 > 0) || w2 === _nameFitROLastW) return;
          _nameFitROLastW = w2;
          fFitNameComponents();
        }, 150);
      } catch (eO) { /* observer unavailable */ }
    });
    try {
      _nameFitROLastW = Math.round(ac.getBoundingClientRect().width);
    } catch (eI) { _nameFitROLastW = 0; }
    _nameFitRO.observe(ac);
  } catch (eZ) { /* observer unavailable */ }
}

// Retired window-resize listener (superseded by the observer above):
// window.addEventListener('resize', function () {
//     clearTimeout(_resizeTimer)
//     _resizeTimer = setTimeout(fResizeViewers, 150)
// })

// JSmol-ready resend: the initial fit (jsmeOnLoad) can land before the 3D
// applet is live, silently dropping its resize (the usual suspect when the
// 3D height sticks at a stale value). Re-run once when JSmol reports ready
// via the page handshake (scenario deep links wait on the same flag).
var _resizeSentOn3DReady = false;
(function () {
  try {
    var _prevReady = (typeof jmol_isReady === "function") ? jmol_isReady : null;
    jmol_isReady = function (applet) {
      try { if (_prevReady) _prevReady(applet); } catch (eP) { /* handshake first */ }
      if (!_resizeSentOn3DReady) {
        _resizeSentOn3DReady = true;
        try { setTimeout(function () { fResizeViewers(); }, 300); } catch (eT) { /* timer unavailable */ }
      }
    };
  } catch (eW) { /* hook unavailable */ }
})();

