"use strict";
// js/state-44.js — shared AppState (T1 hardening, additive only).
// Centralizes the cross-file UI/state globals historically declared in
// mulermoc-nom-molview-44.js and driven from mulermoc-nom-scenario-44.js.
// Existing per-file `let` globals stay as aliases; new code should prefer
// fStateGet/fStateSet so PRACTICE/PLAY logging has a single source of truth.
window.AppState = {
  selectedMol: undefined,
  mode2D: "condensed",
  modeSuffix: "",
  mainChainMode: "algorithmic",
  etherNamingMode: "iupac",
  nameAnalysisMode: "none",
  selectedRule: undefined,
  vis3D: "ballnstick",
  rotateFlag: false,
  hydrogens3DFlag: true,
  atomSymbols3DFlag: true,
  svgAtomColors2DFlag: false,
  atomColorMode2D: "atom",
  nameBoxFlag: true,
  nameCrossFlag: false,
  nameSettingsFlag: true,
  narrateAnalysisFlag: false,
};

window.fStateGet = function (k, fb) {
  return typeof window.AppState[k] === "undefined" ? fb : window.AppState[k];
};

window.fStateSet = function (k, v) {
  window.AppState[k] = v;
};
