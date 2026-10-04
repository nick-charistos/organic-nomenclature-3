// mulermoc-nom-scenario-43.js
// Didactic scenarios — linear snapshot sequences (v43, additive module).
// Drives the existing v43 layers (core/molview/teaching) through their
// public entry points; modifies no v42/v43 layer logic.
// Disabled by default: without ?scenario / ?present / #step the page
// behaves exactly like v42 (43-no-params == 42).

var MuLERMoCScenario = {
  SUPPORTED_VERSION: 1,
  steps: [],
  index: 0,
  title: "untitled-scenario",
  present: false,
  ready: false,
  applyToken: 0, // S2: bumped per fScenarioApply; stale async follow-ups abort
  pending3D: null, // S2: {token, mol, step, done} — name click waits for 3D parse
  authorSettings: null, // pre-Present checkbox states, restored on Exit
  menuPickMode: false, // authoring: show pick checkboxes in the left menu
  menuPick: [], // authoring scratch: picked molecule keys (per-step copy on Save)
  authoring: false, // authoring mode: bar + drawer + pick UI (off by default)
};

// nameAnalysisMode -> name-box id (reverse of the .nameCompBox click map
// in mulermoc-nom-teaching-43.js). comp10/11 depend on chemical class;
// verified after triggering, mismatch falls back to "none".
var fScenarioModeToCompId = {
  compNumber1: "comp0",
  " compSecondSub1": "comp1",
  compNumber2: "comp2",
  " compSecondSub2": "comp3",
  compBondPos: "comp4",
  compCarbonsCount: "comp5",
  compBondType: "comp6",
  compEndNumber: "comp7",
  compBondType2: "comp8",
  compSuffix: "comp9",
  commonAlkyl1: "comp10",
  esterAlkyl: "comp10",
  commonAlkyl2: "comp11",
  esterEster: "comp11",
  commonEther: "comp12",
};

// S3: legacy engine modes carry a leading space (" compSecondSub1/2",
// see mulermoc-nom-teaching-43.js). Normalize before comparing or looking up
// so capture → apply → click survives trimming on either side.
function fScenarioNormMode(m) {
  return String(m == null ? "none" : m).replace(/^\s+|\s+$/g, "");
}

function fScenarioCompIdFor(mode) {
  if (Object.prototype.hasOwnProperty.call(fScenarioModeToCompId, mode)) {
    return fScenarioModeToCompId[mode];
  }
  var n = fScenarioNormMode(mode);
  for (var k in fScenarioModeToCompId) {
    if (Object.prototype.hasOwnProperty.call(fScenarioModeToCompId, k) &&
        fScenarioNormMode(k) === n) {
      return fScenarioModeToCompId[k];
    }
  }
  return null;
}

function fScenarioG(name, fallback) {
  // Eval-free live-state reader (T3 hardening). Explicit whitelist over the
  // cross-file globals declared in mulermoc-nom-core/molview-43.js; unknown
  // names yield the fallback (same contract as the old eval version).
  try {
    switch (name) {
      case "selectedMol": return typeof selectedMol !== "undefined" ? selectedMol : fallback;
      case "mode2D": return typeof mode2D !== "undefined" ? mode2D : fallback;
      case "mainChainMode": return typeof mainChainMode !== "undefined" ? mainChainMode : fallback;
      case "etherNamingMode": return typeof etherNamingMode !== "undefined" ? etherNamingMode : fallback;
      case "nameAnalysisMode": return typeof nameAnalysisMode !== "undefined" ? nameAnalysisMode : fallback;
      case "svgAtomColors2DFlag": return typeof svgAtomColors2DFlag !== "undefined" ? svgAtomColors2DFlag : fallback;
      case "atomColorMode2D": return typeof atomColorMode2D !== "undefined" ? atomColorMode2D : fallback;
      case "nameSettingsFlag": return typeof nameSettingsFlag !== "undefined" ? nameSettingsFlag : fallback;
      case "narrateAnalysisFlag": return typeof narrateAnalysisFlag !== "undefined" ? narrateAnalysisFlag : fallback;
      case "vis3D": return typeof vis3D !== "undefined" ? vis3D : fallback;
      case "rotateFlag": return typeof rotateFlag !== "undefined" ? rotateFlag : fallback;
      case "hydrogens3DFlag": return typeof hydrogens3DFlag !== "undefined" ? hydrogens3DFlag : fallback;
      case "atomSymbols3DFlag": return typeof atomSymbols3DFlag !== "undefined" ? atomSymbols3DFlag : fallback;
      default: return fallback;
    }
  } catch (e) {
    return fallback;
  }
}

function fScenarioToast(msg) {
  var t = document.getElementById("scenarioToast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(function () {
    t.classList.remove("show");
  }, 2600);
}

// ── readiness: wait for JSME applet + data + entry points ──────────────
function fScenarioWhenReady(cb) {
  var tries = 0;
  (function poll() {
    tries++;
    try {
      if (
        typeof nameExamples !== "undefined" &&
        nameExamples.methane &&
        typeof fSelectMol === "function" &&
        typeof jsmeNomeclatureApplet !== "undefined" &&
        jsmeNomeclatureApplet
      ) {
        MuLERMoCScenario.ready = true;
        cb();
        return;
      }
    } catch (e) {
      /* keep polling */
    }
    if (tries < 200) {
      setTimeout(poll, 150);
    } else {
      fScenarioToast("Scenario: app did not become ready (JSME/data).");
    }
  })();
}

// ── 3D camera via `show moveto` (S1: scriptWait-only) ────────────────────
// The old Jmol.getPropertyAsString(applet, "show moveto") branch is gone on
// purpose: the property API answered with a `getProperty ERROR … Options
// include: …` dump starting with `moveto\t"` that passed the old prefix
// check and poisoned stored steps ("always loads the default").
// scriptWait("show moveto") returns the real script output ("" when 3D is
// unavailable). Capture with `rotate off` — a spinning view drifts.
function fScenarioGetMoveto() {
  try {
    if (typeof Jmol === "undefined" || typeof Jmol.scriptWait === "undefined" ||
        typeof jmolAppletNomeclature === "undefined") return null;
    var w = String(Jmol.scriptWait(jmolAppletNomeclature, "show moveto") || "").trim();
    var line = w.split("\n").filter(function (l) {
      return /^moveto\b/i.test(l.trim());
    })[0];
    if (line) return line.trim();
  } catch (e) {
    /* 3D unavailable */
  }
  return null;
}

// Strict moveto grammar (S1). A real camera line is `moveto` followed only by
// numbers, whitespace, braces, signs, decimal points, exponent markers and an
// optional trailing `;` — e.g. `moveto 0.0 { 17 896 -444 35.17} 65.75 …`.
// The poisoned `getProperty ERROR …` dump contains other letters, so any
// letter besides e/E (scientific notation like 4.03e-17) or any character
// outside the numeric charset rejects the line → null (default view).
function fScenarioValidMoveto(s) {
  if (typeof s !== "string") return null;
  var line = s.trim().split("\n")[0].trim();
  if (!/^moveto\b/i.test(line) || line.length > 2048) return null;
  var body = line.replace(/^moveto\b/i, "").trim().replace(/;$/, "").trim();
  if (!body || !/^[\d\s.\-+{}eE]+$/.test(body)) return null;
  if (/[a-df-zA-DF-Z]/.test(body)) return null; // letters other than e/E
  var nums = body.match(/-?\d(\.\d+)?([eE][+\-]?\d+)?/g) || [];
  if (nums.length < 5) return null; // not a real camera vector
  return line;
}

// ── capture ────────────────────────────────────────────────────────────
function fScenarioViewerOn(kind) {
  // kind: "2D" | "3D" — mirrors fToggleViewer2D/3D scope.
  if (kind === "2D") {
    var b = document.getElementById("view2DBtn");
    if (b) return b.classList.contains("active");
    return !document.getElementById("jsmeNomeclatureSVG") ||
      document.getElementById("jsmeNomeclatureSVG").style.display !== "none";
  }
  var b3 = document.getElementById("view3DBtn");
  if (b3) return b3.classList.contains("active");
  return true;
}

function fScenarioCapture() {
  if (!MuLERMoCScenario.ready) {
    fScenarioToast("Scenario: app not ready yet.");
    return null;
  }
  var mol = fScenarioG("selectedMol", null);
  if (!mol || typeof nameExamples === "undefined" || !nameExamples[mol]) mol = null;
  var pick = MuLERMoCScenario.menuPick.slice();
  // Menu-only snapshot: a picked set with no molecule selected. Molecule
  // state (name mode, camera) is meaningless without a molecule.
  var menuOnly = !mol && pick.length > 0;
  if (!mol && !menuOnly) {
    fScenarioToast("Scenario: select a molecule or pick molecules first.");
    return null;
  }
  var spin = !!fScenarioG("rotateFlag", false);
  var moveto = !menuOnly && fScenarioViewerOn("3D") ? fScenarioGetMoveto() : null;
  var step = {
    n: MuLERMoCScenario.steps.length + 1,
    title: mol || "menu",
    note: "",
    selectedMol: mol,
    mode2D: fScenarioG("mode2D", "condensed"),
    mainChainMode: fScenarioG("mainChainMode", "algorithmic"),
    etherNamingMode: fScenarioG("etherNamingMode", "iupac"),
    nameAnalysisMode: menuOnly ? "none" : fScenarioG("nameAnalysisMode", "none"),
    selectedRule: typeof selectedRule === "number" ? selectedRule : null,
    style2D: {
      atomColors: !!fScenarioG("svgAtomColors2DFlag", false),
      colorMode: fScenarioG("atomColorMode2D", "atom"),
      zigzag: fScenarioG("mode2D", "") === "condensedZigZag",
    },
    styleName: {
      box: !!(typeof nameBoxFlag !== "undefined" ? nameBoxFlag : window.nameBoxFlag),
      cross: !!(typeof nameCrossFlag !== "undefined" ? nameCrossFlag : window.nameCrossFlag),
      etherNaming: fScenarioG("etherNamingMode", "iupac"),
      panelOpen: !!fScenarioG("nameSettingsFlag", true),
    },
    styleHighlight: {
      bondAtoms: fScenarioCheck("bondAtomsCheck", false),
      numberingAtoms: fScenarioCheck("highlightNumberingCheck", true),
    },
    audio: { narrate: !!fScenarioG("narrateAnalysisFlag", false) },
    view3D: {
      style: fScenarioG("vis3D", "ballnstick"),
      spin: spin,
      showH: !!fScenarioG("hydrogens3DFlag", true),
      atomSymbols: !!fScenarioG("atomSymbols3DFlag", true),
      moveto: moveto,
    },
    externalLinks: {},
    menuSubset: MuLERMoCScenario.menuPick.slice(),
    show: {
      menu: MuLERMoCScenario.menuPick.length > 0,
      viewerButtons: false,
      viewerSettings: false,
      viewers: { "2D": fScenarioViewerOn("2D"), "3D": fScenarioViewerOn("3D") },
      controls: { "2D": false, "3D": false },
      save: { "2D": false, "3D": false },
      naming: true,
      nameSettings: false,
      nameClick: false,
      audio: false,
      rule: false,
      text: true,
      infoHost: false,
    },
  };
  if (spin) fScenarioToast("Note: 3D spin is on — stored view may drift.");
  return step;
}

// ── validation (version policy) ────────────────────────────────────────
function fScenarioDefaults(step, i) {
  var d = {
    n: i + 1,
    title: step.selectedMol || "step " + (i + 1),
    note: "",
    mode2D: "condensed",
    mainChainMode: "algorithmic",
    etherNamingMode: "iupac",
    nameAnalysisMode: "none",
    selectedRule: null,
    style2D: { atomColors: false, colorMode: "atom", zigzag: false },
    styleName: { box: true, cross: false, etherNaming: "iupac", panelOpen: true },
    styleHighlight: { bondAtoms: false, numberingAtoms: true },
    audio: { narrate: false },
    menuSubset: [],
    view3D: { style: "ballnstick", spin: false, showH: true, atomSymbols: true, moveto: null },
    externalLinks: {},
    show: {
      menu: false, viewerButtons: false, viewerSettings: false,
      viewers: { "2D": true, "3D": true },
      controls: { "2D": false, "3D": false },
      save: { "2D": false, "3D": false },
      naming: true, nameSettings: false, audio: false, rule: false, text: true, infoHost: false,
    },
  };
  var out = Object.assign({}, d, step);
  ["style2D", "styleName", "styleHighlight", "audio", "view3D", "show", "externalLinks"].forEach(function (k) {
    out[k] = Object.assign({}, d[k], step[k] || {});
  });
  out.show.viewers = Object.assign({}, d.show.viewers, (step.show || {}).viewers || {});
  out.show.controls = Object.assign({}, d.show.controls, (step.show || {}).controls || {});
  out.show.save = Object.assign({}, d.show.save, (step.show || {}).save || {});
  // arrays copy by value, not by reference (steps stay independent)
  out.menuSubset = Array.isArray(step.menuSubset) ? step.menuSubset.slice() : [];
  out.n = i + 1;
  return out;
}

function fScenarioValidate(obj) {
  var warnings = [];
  if (!obj || typeof obj !== "object") return { ok: false, warnings: ["Not a scenario object."] };
  var v = obj.scenarioVersion;
  if (typeof v === "undefined") {
    warnings.push("Legacy file (no scenarioVersion) — migrated in memory; Export to upgrade.");
  } else if (v > MuLERMoCScenario.SUPPORTED_VERSION) {
    return { ok: false, warnings: ["File needs a newer app (scenarioVersion " + v + ")."] };
  }
  if (!Array.isArray(obj.steps) || !obj.steps.length) {
    return { ok: false, warnings: ["Scenario has no steps."] };
  }
  var steps = [];
  obj.steps.forEach(function (s, i) {
    var hasMol = !!(s && s.selectedMol && typeof nameExamples !== "undefined" && nameExamples[s.selectedMol]);
    if (s && s.selectedMol && !hasMol) {
      warnings.push("Step " + (i + 1) + ": unknown molecule '" + s.selectedMol + "' — skipped.");
      return;
    }
    var st = fScenarioDefaults(s, steps.length);
    var rawMoveto = st.view3D && st.view3D.moveto ? st.view3D.moveto : null;
    st.view3D.moveto = fScenarioValidMoveto(st.view3D.moveto);
    if (rawMoveto && !st.view3D.moveto) {
      warnings.push("Step " + (i + 1) + ": invalid 3D view discarded (default used) — re-capture with rotate off.");
    }
    // menu subset: drop unknown molecules, always keep the step's own
    // molecule (a step outside its subset would be a dead step)
    var kept = [];
    (st.menuSubset || []).forEach(function (m) {
      if (m && typeof nameExamples !== "undefined" && nameExamples[m]) {
        if (kept.indexOf(m) < 0) kept.push(m);
      } else {
        warnings.push("Step " + (i + 1) + ": menu subset drops unknown molecule '" + m + "'.");
      }
    });
    if (kept.indexOf(st.selectedMol) < 0 && hasMol) {
      kept.unshift(st.selectedMol);
      warnings.push("Step " + (i + 1) + ": its molecule added to the menu subset.");
    }
    if (!hasMol) {
      // Menu-only step (selectedMol null): needs a browsable subset.
      if (!kept.length || !(st.show && st.show.menu === true)) {
        warnings.push("Step " + (i + 1) + ": no molecule and no menu subset — skipped.");
        return;
      }
      warnings.push("Step " + (i + 1) + ": menu-only step (no molecule).");
    }
    st.menuSubset = kept;
    steps.push(st);
  });
  if (!steps.length) return { ok: false, warnings: warnings.concat(["No valid steps left."]) };
  return { ok: true, steps: steps, title: obj.title || obj.scenario || "scenario", warnings: warnings };
}

// ── apply ──────────────────────────────────────────────────────────────
function fScenarioSetCheck(id, on, selectedCls, unselectedCls) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove(on ? unselectedCls : selectedCls);
  el.classList.add(on ? selectedCls : unselectedCls);
}

// Control-bar visuals mirror the restored globals: radios, checkboxes and
// the style dropdown are click-driven UI that fScenarioApply would otherwise
// leave showing the author's live states in presentation. All lookups are
// guarded; zigzag/disabled states come from fUpdateDiagr2DButton.
function fScenarioSyncControlUi() {
  try {
    if (typeof fUpdateDiagr2DButton === "function") fUpdateDiagr2DButton();
  } catch (e) {
    /* controls unavailable */
  }
  try {
    var m2d = typeof mode2D !== "undefined" ? mode2D : "condensed";
    var idx = m2d === "expanded" ? 1 : (m2d === "diagramatic" || m2d === "condensedZigZag") ? 2 : 0;
    var btns = document.querySelectorAll("#radio2DMode .mode2DOption");
    for (var k = 0; k < btns.length; k++) {
      if (btns[k].classList.contains("disabledRadio")) continue;
      btns[k].classList.remove(k === idx ? "unselectedRadio" : "selectedRadio");
      btns[k].classList.add(k === idx ? "selectedRadio" : "unselectedRadio");
    }
  } catch (e) {
    /* controls unavailable */
  }
  try {
    if (typeof atomSymbols3DFlag !== "undefined") fScenarioSetCheck("atomSymbolsCheck", !!atomSymbols3DFlag, "selectedCheck", "unselectedCheck");
    if (typeof hydrogens3DFlag !== "undefined") fScenarioSetCheck("hydrogensCheck", !!hydrogens3DFlag, "selectedCheck", "unselectedCheck");
    if (typeof rotateFlag !== "undefined") fScenarioSetCheck("rotateCheck", !!rotateFlag, "selectedCheck", "unselectedCheck");
  } catch (e) {
    /* controls unavailable */
  }
  // 2D color controls mirror the restored globals (the SVG class itself
  // re-syncs from the flag in fUpdateSVG).
  try {
    if (typeof svgAtomColors2DFlag !== "undefined") fScenarioSetCheck("svgAtomColorCheck", !!svgAtomColors2DFlag, "selectedCheck", "unselectedCheck");
    if (typeof atomColorMode2D !== "undefined") {
      var _cmBtns = document.querySelectorAll("#atomColorMode .atomColorModeRadio");
      for (var _ci = 0; _ci < _cmBtns.length; _ci++) {
        var _on = _cmBtns[_ci].getAttribute("data-color-mode") === atomColorMode2D;
        _cmBtns[_ci].classList.remove(_on ? "unselectedRadio" : "selectedRadio");
        _cmBtns[_ci].classList.add(_on ? "selectedRadio" : "unselectedRadio");
      }
    }
  } catch (e) {
    /* controls unavailable */
  }
  try {
    // Same labels as fCreateDropMenu (teaching layer).
    var visLabels = { ballnstick: "Σφαίρες και Ράβδοι", spacefill: "Χωροπληρωτικό", sticks: "Ράβδοι" };
    var dl = document.getElementById("dropLabel");
    if (dl && typeof vis3D !== "undefined" && visLabels[vis3D]) dl.innerHTML = visLabels[vis3D];
  } catch (e) {
    /* controls unavailable */
  }
}

// Checkbox settings live only as DOM classes (no JS global) — capture them
// literally; a missing element falls back to the UI default.
function fScenarioCheck(id, fallback) {
  try {
    var el = document.getElementById(id);
    if (!el) return !!fallback;
    return el.classList.contains("selectedCheck");
  } catch (e) {
    return !!fallback;
  }
}

// Author checkbox states (highlight options) stashed on Present entry so Exit
// can restore the author's working settings instead of the step's values.
function fScenarioStashAuthorSettings() {
  MuLERMoCScenario.authorSettings = {
    bondAtoms: fScenarioCheck("bondAtomsCheck", false),
    numberingAtoms: fScenarioCheck("highlightNumberingCheck", true),
  };
}

function fScenarioRestoreAuthorSettings() {
  var a = MuLERMoCScenario.authorSettings;
  if (!a) return;
  fScenarioSetCheck("bondAtomsCheck", !!a.bondAtoms, "selectedCheck", "unselectedCheck");
  fScenarioSetCheck("highlightNumberingCheck", a.numberingAtoms !== false, "selectedCheck", "unselectedCheck");
  MuLERMoCScenario.authorSettings = null;
}

// ── menu subset pick (per-step LEARN menus) ──────────────────────────────
// Authors tick molecules (and whole groups) in the left menu; each step stores
// its own copy (`menuSubset`) and presentation shows a filtered, browsable
// menu when that step's `show.menu` is true. Off by default: empty pick +
// menu:false reproduces legacy behavior exactly.
function fScenarioPickHas(mol) {
  return MuLERMoCScenario.menuPick.indexOf(mol) >= 0;
}

function fScenarioSetPick(mol, on) {
  if (!mol) return;
  var i = MuLERMoCScenario.menuPick.indexOf(mol);
  if (on && i < 0) MuLERMoCScenario.menuPick.push(mol);
  if (!on && i >= 0) MuLERMoCScenario.menuPick.splice(i, 1);
  fScenarioPaintPickUi();
}

function fScenarioSetGroupPick(groupKey, on) {
  try {
    var hdr = document.querySelector('.crossMenuLi[data-group-key="' + groupKey + '"]');
    if (!hdr) return;
    var box = hdr.nextElementSibling;
    if (!box) return;
    var rows = box.querySelectorAll(".menuLi");
    for (var r = 0; r < rows.length; r++) {
      var mol = rows[r].id;
      if (!mol) continue;
      var i = MuLERMoCScenario.menuPick.indexOf(mol);
      if (on && i < 0) MuLERMoCScenario.menuPick.push(mol);
      if (!on && i >= 0) MuLERMoCScenario.menuPick.splice(i, 1);
    }
  } catch (e) {
    /* menu unavailable */
  }
  fScenarioPaintPickUi();
}

// In pick mode, selecting a molecule also picks it for the snapshot menu
// (called from the teaching-layer row click via a guarded hook).
function fScenarioPickOnSelect(mol) {
  if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring || !MuLERMoCScenario.menuPickMode || !mol) return;
  if (!fScenarioPickHas(mol)) fScenarioSetPick(mol, true);
}

// Unpicking the selected molecule also deselects it (viewers go empty via
// the standard path). Guarded: molview always defines it in the app.
function fScenarioDeselectIfUnpicked() {
  try {
    if (typeof selectedMol !== "undefined" && selectedMol &&
        !fScenarioPickHas(selectedMol) &&
        typeof fDeselectMol === "function") {
      fDeselectMol();
    }
  } catch (e) {
    /* selection unavailable */
  }
}

// (Re)paints the pick UI after every menu rebuild. Author mode: toggle button
// + checkboxes (tri-state group boxes). Present mode: no checkboxes — apply
// the current step's filter instead (covers grouping switches mid-present).
function fScenarioPaintPickUi() {
  try {
    var menu = document.getElementById("nomeclature2Menu");
    if (!menu) return;
    var title = menu.querySelector(".panelTitle");
    // pick-mode toggle button (authoring mode only)
    var btn = document.getElementById("scPickToggle");
    if (!MuLERMoCScenario.present && MuLERMoCScenario.authoring) {
      if (!btn && title) {
        btn = document.createElement("button");
        btn.id = "scPickToggle";
        btn.type = "button";
        btn.className = "checkBoxContainer unselectedCheck";
        btn.innerHTML = '&nbsp;<span class="checkBox"></span><span class="scPickCount" hidden></span>';
        title.appendChild(btn);
      }
      if (btn) {
        btn.classList.remove("is-hidden");
        btn.style.display = "";
        var n = MuLERMoCScenario.menuPick.length;
        var on = !!MuLERMoCScenario.menuPickMode;
        btn.classList.remove("active");
        btn.classList.toggle("selectedCheck", on);
        btn.classList.toggle("unselectedCheck", !on);
        btn.setAttribute("aria-checked", on ? "true" : "false");
        btn.removeAttribute("title");
        btn.setAttribute("data-tooltip", "Επιλογή μορίων για το στιγμιότυπο" + (n ? " (" + n + ")" : ""));
        var badge = btn.querySelector(".scPickCount");
        if (badge) {
          badge.textContent = n ? String(n) : "";
          if (n) badge.removeAttribute("hidden");
          else badge.setAttribute("hidden", "");
        }
      }
    } else if (btn) {
      btn.classList.add("is-hidden");
    }
    // strip stale boxes (rebuilt menu), then paint or render
    var stale = menu.querySelectorAll(".scPickBox, .scGroupBox");
    for (var s = 0; s < stale.length; s++) stale[s].remove();
    if (MuLERMoCScenario.present) {
      fScenarioRenderPresentMenu();
      return;
    }
    if (!MuLERMoCScenario.menuPickMode) return;
    var rows = menu.querySelectorAll(".menuLi");
    for (var r = 0; r < rows.length; r++) {
      if (!rows[r].id) continue;
      var box = document.createElement("input");
      box.type = "checkbox";
      box.className = "scPickBox";
      box.title = "Include in snapshot menu";
      box.setAttribute("data-mol", rows[r].id);
      box.checked = fScenarioPickHas(rows[r].id);
      rows[r].insertBefore(box, rows[r].firstChild);
    }
    var hdrs = menu.querySelectorAll(".crossMenuLi");
    for (var h = 0; h < hdrs.length; h++) {
      var gbox = document.createElement("input");
      gbox.type = "checkbox";
      gbox.className = "scGroupBox";
      gbox.title = "Include whole group";
      gbox.setAttribute("data-group", hdrs[h].getAttribute("data-group-key") || "");
      var gboxEl = hdrs[h].nextElementSibling;
      var members = gboxEl ? gboxEl.querySelectorAll(".menuLi") : [];
      var picked = 0, total = 0;
      for (var m = 0; m < members.length; m++) {
        if (!members[m].id) continue;
        total++;
        if (fScenarioPickHas(members[m].id)) picked++;
      }
      gbox.checked = total > 0 && picked === total;
      gbox.indeterminate = picked > 0 && picked < total;
      hdrs[h].insertBefore(gbox, hdrs[h].firstChild);
    }
  } catch (e) {
    /* menu unavailable */
  }
}

// Current step's subset when presentation shows the menu, else null.
function fScenarioStepSubset() {
  var st = MuLERMoCScenario.steps[MuLERMoCScenario.index];
  if (!MuLERMoCScenario.present || !st || !st.show || st.show.menu !== true) return null;
  return Array.isArray(st.menuSubset) ? st.menuSubset : [];
}

// Flat present menu for subset steps: a simple per-step molecule list with
// LOCAL numbering (1..N of the shown subset) — never the global dataset
// numbering. No group headers, no grouping switcher, no pick checkboxes.
// Rows keep id + .menuLi so selection marking and click-to-browse work
// unchanged. Rebuilt on every present navigation; Exit rebuilds the author
// menu instead (see exit handler).
function fScenarioRenderPresentMenu() {
  var subset = fScenarioStepSubset();
  if (!subset) return;
  try {
    var menu = document.getElementById("nomeclature2Menu");
    if (!menu || typeof nameExamples === "undefined") return;
    var html = "<div class='panelTitle'> Παραδείγματα </div><div class='menuNomeclature2Container'><div class='menuListContainer'>";
    for (var i = 0; i < subset.length; i++) {
      var prop = subset[i];
      if (!prop || !nameExamples[prop]) continue;
      var formula = String(nameExamples[prop].formula || prop)
        .replace(/(\d+)/g, "<sub>$1</sub>")
        .replace(/(['='])/g, '<span class="bondSymbol large">&#9552;</span>')
        .replace(/(['_'])/g, '<span class="bondSymbol">&#9776;</span>');
      var sel = prop === selectedMol ? " selectedLi" : "";
      html += "<div id='" + prop + "' class='menuLi" + sel + "'><span class='menuLiCounter'>" + (i + 1) + ".</span><span class='menuLiFormula'> " + formula + "</span></div>";
    }
    html += "</div></div>";
    menu.innerHTML = html;
  } catch (e) {
    /* menu unavailable */
  }
}

// Pristine author menu after Exit: presentation replaced the menu DOM with
// the flat subset list, so rebuild it (grouping mode was never touched).
// Re-marks the current molecule; the render hook repaints pick UI.
function fScenarioRestoreAuthorMenu() {
  try {
    if (typeof fInitNomeclatureMenu === "function") fInitNomeclatureMenu();
  } catch (e) {
    /* menu unavailable */
  }
  try {
    if (selectedMol) {
      var rows = document.querySelectorAll("#nomeclature2Menu .menuLi");
      for (var r = 0; r < rows.length; r++) {
        rows[r].classList.toggle("selectedLi", rows[r].id === selectedMol);
      }
    }
  } catch (e) {
    /* menu unavailable */
  }
}

// S2: 3D-parse gate. Called from fFetchAndParse3D completion (molview,
// guarded) so the per-step name highlight runs after 3D analysis exists for
// this molecule. A 2s fallback timer in fScenarioApply covers 3D-hidden steps,
// fetch failures, or a missing hook — whichever fires first wins, stale tokens
// abort.
function fScenarioOn3DParsed(mol) {
  var p = MuLERMoCScenario.pending3D;
  if (!p || p.done || p.mol !== mol) return;
  if (p.token !== MuLERMoCScenario.applyToken) return;
  p.done = true;
  fScenarioClickNameBox(p.step, p.token);
}

function fScenarioClickNameBox(step, token) {
  if (typeof token === "number" && token !== MuLERMoCScenario.applyToken) return; // stale
  if (!step || !step.nameAnalysisMode ||
      fScenarioNormMode(step.nameAnalysisMode) === "none") return;
  // Locked interaction: no auto-highlight in presentation.
  if (MuLERMoCScenario.present && step.show && step.show.nameClick === false) return;
  var compId = fScenarioCompIdFor(step.nameAnalysisMode);
  var box = compId && document.getElementById(compId);
  if (!box) return;
  $(box).trigger("click");
  if (fScenarioNormMode(nameAnalysisMode) !== fScenarioNormMode(step.nameAnalysisMode)) {
    nameAnalysisMode = "none";
    $(".nameCompBox").removeClass("selected");
    fClearHighlights();
    fUpdateSVG();
    fExplainNameComp();
  }
}

function fScenarioApply(step) {
  if (!MuLERMoCScenario.ready || !step) return false;
  try {
    window.speechSynthesis && window.speechSynthesis.cancel();
  } catch (e) {
    /* no TTS */
  }
  // Menu-only step (no molecule): deselect first so no previous molecule
  // lingers, then apply chrome + the flat pick menu below.
  if (!step.selectedMol) {
    var menuTok = ++MuLERMoCScenario.applyToken;
    MuLERMoCScenario.pending3D = null;
    try {
      if (typeof fDeselectMol === "function") fDeselectMol();
    } catch (e) {
      /* fall through to chrome */
    }
    // Display prefs become live (visuals only, no viewer load) so visible
    // bars match the step and carry into flat-menu browsing.
    mode2D = step.mode2D;
    modeSuffix = mode2D === "expanded" ? "_E" : mode2D === "condensed" ? "" : "_diagr2D";
    if (step.style2D.zigzag) mode2D = "condensedZigZag";
    atomSymbols3DFlag = !!step.view3D.atomSymbols;
    hydrogens3DFlag = !!step.view3D.showH;
    vis3D = step.view3D.style;
    rotateFlag = !!step.view3D.spin;
    svgAtomColors2DFlag = !!step.style2D.atomColors;
    atomColorMode2D = step.style2D.colorMode;
    fScenarioSyncControlUi();
    // author's live selectedRule untouched on menu-only steps
    fScenarioChrome(step.show);
    return true;
  }
  // 1. state globals (same scope as molview/teaching layers)
  selectedMol = step.selectedMol;
  mode2D = step.mode2D;
  modeSuffix = mode2D === "expanded" ? "_E" : mode2D === "condensed" ? "" : "_diagr2D";
  if (step.style2D.zigzag) mode2D = "condensedZigZag";
  mainChainMode = step.mainChainMode;
  etherNamingMode = step.etherNamingMode;
  atomSymbols3DFlag = !!step.view3D.atomSymbols;
  hydrogens3DFlag = !!step.view3D.showH;
  vis3D = step.view3D.style;
  svgAtomColors2DFlag = !!step.style2D.atomColors;
  atomColorMode2D = step.style2D.colorMode;
  try {
    localStorage.setItem("atomColorMode2D", atomColorMode2D);
  } catch (e) {
    /* private mode */
  }
  window.nameBoxFlag = !!step.styleName.box;
  nameBoxFlag = window.nameBoxFlag;
  window.nameCrossFlag = !!step.styleName.cross;
  nameCrossFlag = window.nameCrossFlag;
  narrateAnalysisFlag = !!step.audio.narrate;
  nameSettingsFlag = !!step.styleName.panelOpen;
  // Highlight checkboxes (DOM-class-only settings): restore per step so the
  // highlight readers observe snapshot values. Missing group → UI defaults.
  var _sh = step.styleHighlight || {};
  fScenarioSetCheck("bondAtomsCheck", !!_sh.bondAtoms, "selectedCheck", "unselectedCheck");
  fScenarioSetCheck("highlightNumberingCheck", _sh.numberingAtoms !== false, "selectedCheck", "unselectedCheck");
  if (typeof step.selectedRule === "number") selectedRule = step.selectedRule;
  // S2: per-step token — every async follow-up below aborts when a newer
  // step takes over (rapid Prev/Next, hash jumps).
  var token = ++MuLERMoCScenario.applyToken;
  MuLERMoCScenario.pending3D = null;
  // spin off during the jump, restored after the gated moveto
  var wantSpin = !!step.view3D.spin;
  rotateFlag = false;

  // 2. menu selection marker (menu itself may be hidden)
  try {
    $(".menuLi").removeClass("selectedLi");
    $("#" + CSS.escape(step.selectedMol)).addClass("selectedLi");
  } catch (e) {
    /* menu not rendered in this grouping */
  }

  // 3. load molecule through the standard path
  fSelectMol();
  rotate3D();
  // 3b. control bars mirror the restored globals (bars keep live states
  // otherwise); runs after the load so representation fallbacks are final.
  fScenarioSyncControlUi();

  // 4. custom 3D camera, gated behind the fLoadMol3D load batch (S2): the
  // data-file `moveto + script init` queued by fLoadMol3D wins, then the
  // per-step camera applies on top. Without a custom view, spin restores now.
  if (step.show.viewers["3D"] && step.view3D.moveto) {
    (function (tok, mv) {
      setTimeout(function () {
        if (tok !== MuLERMoCScenario.applyToken) return; // stale
        try {
          Jmol.script(jmolAppletNomeclature, mv);
        } catch (e) {
          /* 3D unavailable */
        }
        if (tok === MuLERMoCScenario.applyToken) {
          rotateFlag = wantSpin;
          rotate3D();
        }
      }, 400);
    })(token, step.view3D.moveto);
  } else {
    rotateFlag = wantSpin;
    rotate3D();
  }

  // 5. name highlight via the standard click path, gated on 3D analysis (S2):
  // with a visible 3D viewer the click waits for fScenarioOn3DParsed (or the
  // fallback timer); 2D-only steps click immediately.
  if (step.nameAnalysisMode && fScenarioNormMode(step.nameAnalysisMode) !== "none") {
    if (step.show.viewers["3D"]) {
      MuLERMoCScenario.pending3D = { token: token, mol: step.selectedMol, step: step, done: false };
      (function (tok) {
        setTimeout(function () {
          var p = MuLERMoCScenario.pending3D;
          if (tok !== MuLERMoCScenario.applyToken || !p || p.done || p.token !== tok) return;
          p.done = true;
          fScenarioClickNameBox(p.step, tok);
        }, 2000);
      })(token);
    } else {
      fScenarioClickNameBox(step, token);
    }
  }

  // 6. rule area
  try {
    if (step.show.rule) {
      $("#ruleTheoryContainer").show();
      if (typeof step.selectedRule === "number" && typeof fShowRuleTheory === "function") {
        fShowRuleTheory();
        $("#ruleTheory").show();
      }
    } else {
      $("#ruleTheoryContainer").hide();
    }
  } catch (e) {
    /* rule DOM unavailable */
  }

  // 7. chrome per show.*
  fScenarioChrome(step.show);
  return true;
}

function fScenarioHide(id, hide) {
  var el = document.getElementById(id);
  if (el) el.style.display = hide ? "none" : "";
}

// Full-chrome restore for Exit: clears BOTH the inline display set by
// fScenarioHide and the `hide` class set by the app's own viewer toggles
// (fToggleViewer2D/3D add it to the control bars; `.hide` is
// `display:none !important`, so inline restore alone cannot bring those bars
// back). Re-activates the viewer buttons to match the forced both-visible
// state, so the next snapshot capture reads them truthfully.
function fScenarioRestoreChrome() {
  var ids = [
    "radio2DMode", "controls3D", "save2DBtn", "save3DBtn",
    "jsmeNomeclatureDIV", "jsmeNomeclatureSVG", "nomeclature3D",
    "menuCol", "viewerVisBtns", "viewerSettingsBtnDiv",
    "nameAnalysisContainer",
  ];
  ids.forEach(function (id) {
    try {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.display = "";
      if (el.classList) el.classList.remove("hide");
    } catch (e) {
      /* no DOM */
    }
  });
  ["view2DBtn", "view3DBtn"].forEach(function (id) {
    try {
      var btn = document.getElementById(id);
      if (btn && btn.classList) btn.classList.add("active");
    } catch (e) {
      /* no DOM */
    }
  });
}

function showTextOn(step) {
  return !step || !step.show || step.show.text !== false;
}

function fScenarioFillStepPanel(step) {
  var h1 = document.getElementById("pageTitle");
  var p = document.getElementById("scStepText");
  if (!h1 || !p) return;
  var appTitle = MuLERMoCScenario.appTitle || h1.textContent || "";
  // plain text only (textContent escapes markup); rich noteFormat reserved for later
  if (MuLERMoCScenario.present && step && step.n && showTextOn(step)) {
    h1.textContent = step.title ? step.n + ". " + step.title : appTitle;
    p.textContent = step.note || "";
  } else {
    h1.textContent = appTitle;
    p.textContent = "";
  }
}

function fScenarioChrome(show) {
  show = show || {};
  var present = MuLERMoCScenario.present;
  // viewers: hidden viewer is not rendered (mirrors fToggleViewer2D/3D scope)
  var show2D = !show.viewers || show.viewers["2D"] !== false;
  var show3D = !show.viewers || show.viewers["3D"] !== false;
  ["jsmeNomeclatureDIV", "jsmeNomeclatureSVG"].forEach(function (id) {
    fScenarioHide(id, !show2D);
  });
  fScenarioHide("nomeclature3D", !show3D);
  // A hidden 3D viewer keeps no model (mirrors fToggleViewer3D scope); hiding
  // 2D must not clear the 3D model.
  if (!show3D && typeof Jmol !== "undefined") {
    try {
      Jmol.script(jmolAppletNomeclature, "zap");
    } catch (e) {
      /* 3D unavailable */
    }
  }
  // control bars + save buttons
  var c2 = show.controls && show.controls["2D"] === true && show2D;
  var c3 = show.controls && show.controls["3D"] === true && show3D;
  fScenarioHide("radio2DMode", present && !c2);
  fScenarioHide("controls3D", present && !c3);
  fScenarioHide("save2DBtn", present && !(show.save && show.save["2D"] === true && show2D));
  fScenarioHide("save3DBtn", present && !(show.save && show.save["3D"] === true && show3D));
  // title-bar chrome: always hidden in presentation
  fScenarioHide("viewerVisBtns", present);
  fScenarioHide("viewerSettingsBtnDiv", present);
  fScenarioHide("viewerSettingsPanel", present);
  // menu column: hidden wholesale in presentation, unless this step carries
  // a menu subset to browse (flex row recenters the rest when hidden)
  var _menuStep = MuLERMoCScenario.steps[MuLERMoCScenario.index];
  var _menuOn = present && _menuStep && _menuStep.show && _menuStep.show.menu === true;
  fScenarioHide("menuCol", present && !_menuOn);
  // pick UI never appears in presentation (paint strips it on rebuilds too)
  if (present) {
    try {
      var _pt = document.getElementById("scPickToggle");
      if (_pt) _pt.classList.add("is-hidden");
      var _pb = document.querySelectorAll("#nomeclature2Menu .scPickBox, #nomeclature2Menu .scGroupBox");
      for (var _pi = 0; _pi < _pb.length; _pi++) _pb[_pi].remove();
    } catch (e) {
      /* menu unavailable */
    }
  }
  // naming panel + settings + audio
  fScenarioHide("nameAnalysisContainer", present && show.naming === false);
  // locked name interaction: boxes ignore mouse clicks in presentation
  // (programmatic clicks are skipped in fScenarioClickNameBox above);
  // the click-hint line stays hidden too (nothing clickable remains)
  var locked = !!(present && show.nameClick === false);
  try {
    var _nc = document.getElementById("nameAnalysisContainer");
    if (_nc) _nc.classList.toggle("locked", locked);
  } catch (e) {
    /* naming DOM unavailable */
  }
  fScenarioHide("nameAnalysisExplain", locked);
  // Menu-only steps have no naming to explain: hide the hint line even when
  // interaction is allowed (same lookup pattern as the menu step above).
  try {
    var _molStep = MuLERMoCScenario.steps[MuLERMoCScenario.index];
    if (present && (!_molStep || !_molStep.selectedMol)) {
      fScenarioHide("nameAnalysisExplain", true);
    }
  } catch (e) {
    /* steps unavailable */
  }
  // per-step heading (page h1) + text div below it (title/note, plain text)
  fScenarioFillStepPanel(MuLERMoCScenario.steps[MuLERMoCScenario.index]);
  fScenarioHide("scStepText", !present || show.text === false);
  var ns = !(present && show.nameSettings !== true);
  fScenarioHide("nameSettingsBtnDiv", present && !ns);
  var panel = document.getElementById("nameSettingsPanel");
  if (panel && present && !ns) panel.classList.remove("open");
  // voice buttons: visible with audio on, or with the naming controls
  var audioOn = !(present && show.audio !== true && show.nameSettings !== true);
  ["narrateAnalysisToggle", "readNameBtn"].forEach(function (id) {
    fScenarioHide(id, !audioOn);
  });
  // minimal info host for future PubChem links
  var host = document.getElementById("molInfoPanelSlot");
  if (host) host.style.display = present && show.infoHost === true ? "" : "none";
  // own UI: author bar + drawer follow authoring mode; the edge tab
  // hides only in presentation (see fScenarioSyncAuthorUi)
  fScenarioSyncAuthorUi();
  var pb = document.getElementById("scenarioPlayBar");
  if (pb) pb.style.display = present ? "" : "none";
}

// ── authoring mode (right-edge tab) ────────────────────────────────────
// The author bar, drawer and pick UI live behind authoring mode (off by
// default, so the plain page is a clean explorer). The tab itself stays
// visible whenever not presenting; scratch (menuPick, steps) is kept when
// authoring turns off — only the UI hides and pick mode disengages.
function fScenarioSetAuthoring(on) {
  MuLERMoCScenario.authoring = !!on;
  if (!MuLERMoCScenario.authoring) {
    MuLERMoCScenario.menuPickMode = false;
    var dr = document.getElementById("scenarioDrawer");
    if (dr) dr.classList.remove("open");
  }
  fScenarioSyncAuthorUi();
  fScenarioPaintPickUi();
}

// Author bar + drawer follow authoring && !present; the tab hides in
// presentation (clean stage) and shows otherwise.
function fScenarioSyncAuthorUi() {
  var showBar = MuLERMoCScenario.authoring && !MuLERMoCScenario.present;
  var tb = document.getElementById("scenarioAuthorBar");
  if (tb) {
    // Classes are the sole visibility authority (inline display would
    // beat them and snap instead of animating).
    tb.style.display = "";
    tb.classList.toggle("open", showBar);
  }
  // Drawer: never force-open here (Steps button owns that); slide it out
  // whenever the bar goes away.
  if (!showBar) {
    var dr = document.getElementById("scenarioDrawer");
    if (dr) {
      dr.style.display = "";
      dr.classList.remove("open");
    }
  }
  var tab = document.getElementById("scenarioAuthorTab");
  if (tab) {
    tab.classList.toggle("active", !!MuLERMoCScenario.authoring);
    if (MuLERMoCScenario.present) tab.classList.add("is-hidden");
    else tab.classList.remove("is-hidden");
  }
}

// ── file export / import (memory + file, decision A) ────────────────────
function fScenarioExport() {
  var data = {
    scenarioVersion: MuLERMoCScenario.SUPPORTED_VERSION,
    app: "mulermoc-nom-43",
    scenario: MuLERMoCScenario.title,
    title: MuLERMoCScenario.title,
    steps: MuLERMoCScenario.steps,
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = String(MuLERMoCScenario.title || "scenario").replace(/\s+/g, "_") + ".scenario.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 500);
}

function fScenarioImportFile(file) {
  var r = new FileReader();
  r.onload = function () {
    try {
      var res = fScenarioValidate(JSON.parse(r.result));
      res.warnings.forEach(fScenarioToast);
      if (!res.ok) return;
      MuLERMoCScenario.steps = res.steps;
      MuLERMoCScenario.title = res.title;
      MuLERMoCScenario.index = 0;
      fScenarioRenderList();
      fScenarioToast("Imported " + res.steps.length + " steps.");
    } catch (e) {
      fScenarioToast("Import failed: invalid JSON.");
    }
  };
  r.readAsText(file);
}

// ── UI (scenario chrome lives in css/mulermoc-nom-scenario-43.css) ─────────
function fScenarioBuildUi() {
  if (!document.getElementById("scenarioToast")) {
    var t = document.createElement("div");
    t.id = "scenarioToast";
    document.body.appendChild(t);
  }
  // minimal info host for future PubChem links (hidden unless show.infoHost)
  if (!document.getElementById("molInfoPanelSlot")) {
    var host = document.createElement("div");
    host.id = "molInfoPanelSlot";
    host.style.display = "none";
    host.innerHTML = "<div class='molInfoRow'>Εξωτερικοί σύνδεσμοι: <b>—</b> (PubChem: μελλοντικά)</div>";
    var anchor = document.getElementById("nameAnalysis") || document.getElementById("nameAnalysisContainer");
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(host, anchor.nextSibling);
    else document.body.appendChild(host);
  }
  // per-step educational text below the page title (heading = #pageTitle itself)
  if (!document.getElementById("scStepText")) {
    var textDiv = document.createElement("div");
    textDiv.id = "scStepText";
    textDiv.style.display = "none";
    var h1 = document.getElementById("pageTitle");
    if (h1 && h1.parentNode) h1.parentNode.insertBefore(textDiv, h1.nextSibling);
    else document.body.appendChild(textDiv);
  }
  if (!document.getElementById("scenarioAuthorBar")) {
    var bar = document.createElement("div");
    bar.id = "scenarioAuthorBar";
    // Closed by default via CSS (no .open); the tab reveals it.
    // Inline display is never used here: it would beat the animation classes.
    bar.style.display = "";
    bar.innerHTML =
    "<div id='scenarioPlayBarTitle' >Σενάριο Παρουσίασης</div>" +
    "<div id='scenarioPlayBarButtonPanel'>" +
      "<input type='text' id='scenarioTitle' value='untitled-scenario' title='Scenario title'>" +
      "<button id='scSave' title='Save current view as step'>Save step</button>" +
      "<button id='scList' title='Show/hide step list'>Steps (<span id='scCount'>0</span>)</button>" +
      "<button id='scExport' title='Download scenario JSON'>Export</button>" +
      "<button id='scImport' title='Import scenario JSON'>Import</button>" +
      "<button id='scPresent' title='Open presentation at step 1'>Play ▶</button>" +
      "<input type='file' id='scFile' accept='.json,application/json' style='display:none'>" +
      "</div>";
    document.body.appendChild(bar);
    document.getElementById("scSave").onclick = function () {
      var st = fScenarioCapture();
      if (!st) return;
      MuLERMoCScenario.steps.push(st);
      MuLERMoCScenario.title = document.getElementById("scenarioTitle").value || "untitled-scenario";
      fScenarioRenderList();
      fScenarioToast(!st.selectedMol ? "Saved menu-only step " + st.n + " (no molecule selected)." : "Saved step " + st.n + ".");
    };
    document.getElementById("scList").onclick = function () {
      var d = document.getElementById("scenarioDrawer");
      if (d) d.classList.toggle("open");
    };
    document.getElementById("scExport").onclick = fScenarioExport;
    document.getElementById("scImport").onclick = function () {
      document.getElementById("scFile").click();
    };
    document.getElementById("scFile").onchange = function (e) {
      if (e.target.files[0]) fScenarioImportFile(e.target.files[0]);
      e.target.value = "";
    };
    document.getElementById("scPresent").onclick = function () {
      if (!MuLERMoCScenario.steps.length) {
        fScenarioToast("Save at least one step first.");
        return;
      }
      try {
        history.replaceState(null, "", "#step=1");
      } catch (e) {
        /* file:// */
      }
      // in-place present (no reload: memory + file keeps steps in this page)
      fScenarioStashAuthorSettings();
      MuLERMoCScenario.present = true;
      MuLERMoCScenario.index = 0;
      var applied = false;
      try {
        applied = !!fScenarioApply(MuLERMoCScenario.steps[0]);
      } catch (e) {
        applied = false;
      }
      if (!applied) {
        MuLERMoCScenario.present = false;
        fScenarioToast("Could not start presentation at step 1.");
        return;
      }
      fScenarioPlayUi();
      fScenarioRenderPresentMenu();
    };
    var dr = document.createElement("div");
    dr.id = "scenarioDrawer";
    // Closed by default via CSS (no .open); Steps reveals it.
    // Inline display is never used here: it would beat the animation classes.
    dr.style.display = "";
    dr.innerHTML = "<div><b>Steps</b> <span style='opacity:.6'>(in-memory + file)</span></div><div id='scSteps'></div>";
    document.body.appendChild(dr);
    // Right-edge authoring tab: vertical label + pencil, reveals the bar.
    if (!document.getElementById("scenarioAuthorTab")) {
      var tab = document.createElement("button");
      tab.id = "scenarioAuthorTab";
      tab.type = "button";
      tab.setAttribute("data-tooltip", "Σενάρια διδασκαλίας");
      tab.innerHTML = '<span class="scTabIcon">✎</span><span class="scTabText">Σενάρια</span>';
      tab.onclick = function () {
        fScenarioSetAuthoring(!MuLERMoCScenario.authoring);
      };
      document.body.appendChild(tab);
    }
    fScenarioSyncAuthorUi();
    // menu-subset pick wiring (delegated: the menu DOM rebuilds on every
    // grouping switch; row/group clicks are guarded in the teaching layer)
    $(document).on("click", "#scPickToggle", function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
      if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
      MuLERMoCScenario.menuPickMode = !MuLERMoCScenario.menuPickMode;
      if (!MuLERMoCScenario.menuPickMode && MuLERMoCScenario.menuPick.length) {
        MuLERMoCScenario.menuPick = [];
        fScenarioToast("Menu pick cleared.");
      }
      fScenarioPaintPickUi();
    });
    $(document).on("click", "#nomeclature2Menu .scPickBox, #nomeclature2Menu .scGroupBox", function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
    });
    $(document).on("change", "#nomeclature2Menu .scPickBox", function () {
      if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
      fScenarioSetPick($(this).attr("data-mol"), this.checked);
      if (!this.checked) fScenarioDeselectIfUnpicked();
    });
    $(document).on("change", "#nomeclature2Menu .scGroupBox", function () {
      if (MuLERMoCScenario.present || !MuLERMoCScenario.authoring) return;
      fScenarioSetGroupPick($(this).attr("data-group"), this.checked);
      if (!this.checked) fScenarioDeselectIfUnpicked();
    });
  }
  if (!document.getElementById("scenarioPlayBar")) {
    var pb = document.createElement("div");
    pb.id = "scenarioPlayBar";
    pb.style.display = "none";
    pb.innerHTML =
      "<button id='scPrev'>◀</button><span id='scPos'>1/1</span><button id='scNext'>▶</button>" +
      "<b id='scStepTitle'></b><span class='snote' id='scStepNote'></span>" +
      "<span style='flex:1'></span><button id='scExit'>Exit ✕</button>";
    document.body.appendChild(pb);
    document.getElementById("scPrev").onclick = function () {
      fScenarioGo(MuLERMoCScenario.index - 1);
    };
    document.getElementById("scNext").onclick = function () {
      fScenarioGo(MuLERMoCScenario.index + 1);
    };
    document.getElementById("scExit").onclick = function () {
      // exit in place (keeps in-memory steps): restore full chrome (menu
      // menu-open + both viewers + all bars) via a transient clone — the
      // stored step keeps its authored show.* for a later Export.
      MuLERMoCScenario.present = false;
      MuLERMoCScenario.pending3D = null;
      try {
        history.replaceState(null, "", location.pathname);
      } catch (e) {
        /* file:// */
      }
      try {
        var drawer = document.getElementById("menuDrawer");
        if (drawer) {
          drawer.classList.remove("menu-closed");
          drawer.classList.add("menu-open");
        }
      } catch (e) {
        /* no drawer */
      }
      var st = MuLERMoCScenario.steps[MuLERMoCScenario.index];
      if (st) {
        var s;
        try {
          s = JSON.parse(JSON.stringify(st));
        } catch (e) {
          s = st;
        }
        s.show = s.show || {};
        s.show.viewers = { "2D": true, "3D": true };
        fScenarioApply(s);
        // exit restores full chrome (bars beaten by `hide` class or inline
        // display all come back; viewer buttons re-activated) ...
        fScenarioRestoreChrome();
        // ... the pristine author menu (present replaced it with the flat
        // subset list, so rebuild; the render hook repaints pick UI) ...
        fScenarioRestoreAuthorMenu();
        // ... and the author's own checkbox settings, not the step's
        fScenarioRestoreAuthorSettings();
      } else {
        fScenarioChrome(null);
        fScenarioRestoreChrome();
        fScenarioRestoreAuthorMenu();
      }
    };
  }
}

function fScenarioRenderList() {
  var box = document.getElementById("scSteps");
  var cnt = document.getElementById("scCount");
  if (!box) return;
  if (cnt) cnt.textContent = MuLERMoCScenario.steps.length;
  box.innerHTML = "";
  MuLERMoCScenario.steps.forEach(function (st, i) {
    var row = document.createElement("div");
    row.className = "srow";
    var badge = st.view3D.moveto ? "3D✓" : "3D–";
    row.innerHTML =
      "<span class='stepNumber'>" + st.n + "</span><input type='text' value=''><span title='3D custom view'>" + badge + "</span>" +
      "<button title='Jump'>Go</button><button title='Up'>↑</button><button title='Down'>↓</button>" +
      "<button title='Re-capture 3D view'>3D</button><button title='Delete'>✕</button>";
    // Step molecule at a glance: key, or menu-only when no molecule is stored.
    var molBadge = document.createElement("span");
    molBadge.className = "scMolBadge";
    molBadge.title = "Step molecule";
    molBadge.textContent = st.selectedMol || "menu-only";
    row.insertBefore(molBadge, row.firstChild.nextSibling);
    var titleInput = row.querySelector("input");
    titleInput.value = st.title || "";
    titleInput.onchange = function () {
      st.title = titleInput.value;
    };
    var noteInput = document.createElement("textarea");
    noteInput.className = "snote";
    noteInput.placeholder = "Educational text (plain text)";
    noteInput.value = st.note || "";
    noteInput.onchange = function () {
      st.note = noteInput.value;
    };
    row.appendChild(noteInput);
    var textLabel = document.createElement("label");
    textLabel.className = "sshow";
    var textCheck = document.createElement("input");
    textCheck.type = "checkbox";
    textCheck.checked = !st.show || st.show.text !== false;
    textCheck.onchange = function () {
      st.show = st.show || {};
      st.show.text = textCheck.checked;
    };
    textLabel.appendChild(textCheck);
    textLabel.appendChild(document.createTextNode(" Text"));
    row.appendChild(textLabel);
    var menuLabel = document.createElement("label");
    menuLabel.className = "sshow";
    menuLabel.title = "Show the menu in presentation, filtered to this step's picked molecules";
    var menuCheck = document.createElement("input");
    menuCheck.type = "checkbox";
    menuCheck.checked = !!(st.show && st.show.menu === true);
    menuCheck.onchange = function () {
      st.show = st.show || {};
      st.show.menu = menuCheck.checked;
    };
    menuLabel.appendChild(menuCheck);
    menuLabel.appendChild(document.createTextNode(" Menu"));
    row.appendChild(menuLabel);
    // Viewer control bars (authored per step; enabled only when that step's
    // viewer is visible — viewers are set live via [2D][3D] before saving).
    [["2D controls", "2D"], ["3D controls", "3D"]].forEach(function (pair) {
      var label = document.createElement("label");
      label.className = "sshow";
      var kind = pair[1];
      var viewerOn = !st.show || !st.show.viewers || st.show.viewers[kind] !== false;
      var ctlCheck = document.createElement("input");
      ctlCheck.type = "checkbox";
      ctlCheck.checked = !!(st.show && st.show.controls && st.show.controls[kind] === true);
      ctlCheck.disabled = !viewerOn;
      if (!viewerOn) {
        label.classList.add("disabled");
        label.title = "Needs the " + kind + " viewer visible in this step (toggle [" + kind + "] before saving)";
      }
      ctlCheck.onchange = function () {
        st.show = st.show || {};
        st.show.controls = st.show.controls || {};
        st.show.controls[kind] = ctlCheck.checked;
      };
      label.appendChild(ctlCheck);
      label.appendChild(document.createTextNode(" " + pair[0]));
      row.appendChild(label);
    });
    // Naming gear + panel.
    var nameCtlLabel = document.createElement("label");
    nameCtlLabel.className = "sshow";
    nameCtlLabel.title = "Show the naming settings gear + panel in presentation";
    var nameCtlCheck = document.createElement("input");
    nameCtlCheck.type = "checkbox";
    nameCtlCheck.checked = !!(st.show && st.show.nameSettings === true);
    nameCtlCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameSettings = nameCtlCheck.checked;
    };
    nameCtlLabel.appendChild(nameCtlCheck);
    nameCtlLabel.appendChild(document.createTextNode(" Name controls"));
    row.appendChild(nameCtlLabel);
    // Name-box interaction (clicks + auto-highlight). Absent = allowed
    // (legacy files); capture stores explicit false for new steps.
    var nameClickLabel = document.createElement("label");
    nameClickLabel.className = "sshow";
    nameClickLabel.title = "Allow clicking the name boxes in presentation";
    var nameClickCheck = document.createElement("input");
    nameClickCheck.type = "checkbox";
    nameClickCheck.checked = !!(st.show && st.show.nameClick === true);
    nameClickCheck.onchange = function () {
      st.show = st.show || {};
      st.show.nameClick = nameClickCheck.checked;
    };
    nameClickLabel.appendChild(nameClickCheck);
    nameClickLabel.appendChild(document.createTextNode(" Name interact"));
    row.appendChild(nameClickLabel);
    var btns = row.querySelectorAll("button");
    btns[0].onclick = function () {
      fScenarioGo(i);
    };
    btns[1].onclick = function () {
      if (i === 0) return;
      MuLERMoCScenario.steps.splice(i - 1, 0, MuLERMoCScenario.steps.splice(i, 1)[0]);
      fScenarioRenumber();
    };
    btns[2].onclick = function () {
      if (i >= MuLERMoCScenario.steps.length - 1) return;
      MuLERMoCScenario.steps.splice(i + 1, 0, MuLERMoCScenario.steps.splice(i, 1)[0]);
      fScenarioRenumber();
    };
    btns[3].onclick = function () {
      var m = fScenarioViewerOn("3D") ? fScenarioGetMoveto() : null;
      st.view3D.moveto = m;
      fScenarioRenderList();
      fScenarioToast(m ? "3D view updated (custom)." : "No 3D view captured (default).");
    };
    btns[4].onclick = function () {
      MuLERMoCScenario.steps.splice(i, 1);
      fScenarioRenumber();
    };
    box.appendChild(row);
  });
}

function fScenarioRenumber() {
  MuLERMoCScenario.steps.forEach(function (st, i) {
    st.n = i + 1;
  });
  if (MuLERMoCScenario.index >= MuLERMoCScenario.steps.length) {
    MuLERMoCScenario.index = Math.max(0, MuLERMoCScenario.steps.length - 1);
  }
  fScenarioRenderList();
}

function fScenarioPlayUi() {
  var st = MuLERMoCScenario.steps[MuLERMoCScenario.index];
  var pos = document.getElementById("scPos");
  if (pos) pos.textContent = MuLERMoCScenario.steps.length ? MuLERMoCScenario.index + 1 + "/" + MuLERMoCScenario.steps.length : "0/0";
  var ti = document.getElementById("scStepTitle");
  if (ti) ti.textContent = st ? st.n + ". " + (st.title || "") : "";
  var no = document.getElementById("scStepNote");
  if (no) no.textContent = st && st.note ? st.note : "";
}

function fScenarioGo(i) {
  if (!MuLERMoCScenario.steps.length) return;
  if (i < 0) i = 0;
  if (i >= MuLERMoCScenario.steps.length) i = MuLERMoCScenario.steps.length - 1;
  MuLERMoCScenario.index = i;
  try {
    history.replaceState(null, "", "#step=" + (i + 1));
  } catch (e) {
    /* file:// */
  }
  // Fail loud: never show a half-applied step as if it worked.
  var ok = false;
  try {
    ok = !!fScenarioApply(MuLERMoCScenario.steps[i]);
  } catch (e) {
    ok = false;
  }
  if (!ok) {
    fScenarioToast("Could not apply step " + (i + 1) + ".");
    return;
  }
  fScenarioPlayUi();
  fScenarioRenderPresentMenu();
}

// S3: JSmol readiness wait for deep links. The applet fires the page's
// jmol_isReady (sets window.JSmolReadyFlag); cold ?scenario&present loads
// wait for it before the first fScenarioGo so the camera survives. Falls
// through after ~12s — the S2 gated moveto + parse fallbacks still apply.
function fScenarioWhenJSmolReady(cb) {
  var tries = 0;
  (function poll() {
    tries++;
    try {
      if (window.JSmolReadyFlag === true) {
        cb();
        return;
      }
    } catch (e) {
      /* no window */
    }
    if (tries < 80) {
      setTimeout(poll, 150);
    } else {
      cb();
    }
  })();
}

// ── URL: ?scenario=…&present=1 + #step=N ────────────────────────────────
function fScenarioParseUrl() {
  var q = {};
  try {
    location.search.replace(/^\?/, "").split("&").forEach(function (p) {
      var kv = p.split("=");
      if (kv[0]) q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
  } catch (e) {
    /* file:// */
  }
  var step = 1;
  try {
    var m = /step=(\d+)/.exec(location.hash);
    if (m) step = Math.max(1, parseInt(m[1], 10));
  } catch (e) {
    /* no hash */
  }
  return { scenario: q.scenario || null, present: q.present === "1", step: step };
}

function fScenarioBoot() {
  fScenarioBuildUi();
  // stash the app title; present mode replaces #pageTitle per step, exit restores it
  try {
    var _h = document.getElementById("pageTitle");
    if (_h) MuLERMoCScenario.appTitle = _h.textContent;
  } catch (e) {
    /* no DOM */
  }
  var url = fScenarioParseUrl();
  MuLERMoCScenario.present = url.present;
  fScenarioWhenReady(function () {
    if (url.scenario) {
      // same-origin scenarios/*.json only (validated)
      if (/\.\./.test(url.scenario) || !/\.json$/i.test(url.scenario) || /^https?:/i.test(url.scenario)) {
        fScenarioToast("Blocked scenario URL (same-origin .json only).");
        return;
      }
      fetch(url.scenario)
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (obj) {
          var res = fScenarioValidate(obj);
          res.warnings.forEach(fScenarioToast);
          if (!res.ok) return;
          MuLERMoCScenario.steps = res.steps;
          MuLERMoCScenario.title = res.title;
          fScenarioRenderList();
          fScenarioWhenJSmolReady(function () {
            fScenarioStashAuthorSettings();
            fScenarioGo(Math.min(url.step, res.steps.length) - 1);
          });
        })
        .catch(function (e) {
          fScenarioToast("Could not load scenario (needs http(s); use Import on file://).");
        });
    } else if (url.present) {
      fScenarioToast("Present mode needs ?scenario=… or imported steps.");
    }
  });
  window.addEventListener("hashchange", function () {
    if (!MuLERMoCScenario.present || !MuLERMoCScenario.steps.length) return;
    var m = /step=(\d+)/.exec(location.hash);
    if (m) {
      var i = Math.max(1, parseInt(m[1], 10)) - 1;
      if (i !== MuLERMoCScenario.index) {
        MuLERMoCScenario.index = Math.min(i, MuLERMoCScenario.steps.length - 1);
        var hok = false;
        try {
          hok = !!fScenarioApply(MuLERMoCScenario.steps[MuLERMoCScenario.index]);
        } catch (e) {
          hok = false;
        }
        if (!hok) {
          fScenarioToast("Could not apply step " + (MuLERMoCScenario.index + 1) + ".");
          return;
        }
        fScenarioPlayUi();
        fScenarioRenderPresentMenu();
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fScenarioBoot);
} else {
  fScenarioBoot();
}
