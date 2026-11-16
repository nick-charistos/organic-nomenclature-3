// probe-3d-pick: 3D picking end-to-end on v57 (atoms, bonds, mirror,
// double-tap deselect, quiz exact from 3D picks, model unchanged).
// Hard-fail + env config (probe-pick7 conventions). No hard screen coords:
// an N x N grid over #nomeclature3D is swept; picks are attributed from a
// wrapped __mulerPickCb log, mirrors are checked against an independent
// probe-side toggle model, and quiz phases re-click discovered spots.
//
// Phases per molecule (ethane, ethanol: free sweep; butene_1: sweep + bond quiz):
//   free sweep (Esc between clicks): every click must toggle exactly the
//     logged pick (probe-side model), mirrors must match, SMILES unchanged.
//   re-click first atom spot -> toggles off (2D mirror too).
//   double-tap a silent spot (300ms) -> clears everything; single tap -> nothing.
//   Esc clears. Ethane: main-chain quiz exact from two discovered carbon spots.
//   Butene_1: bond quiz exact from a discovered bond-line spot (skip if grid
//     missed the C=C line; fail if NO bond pick was logged at all).
const { chromium } = require("playwright-core");
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.MULER_BASE || "http://localhost:8901";
const PAGE = "/mulermoc-nom-57.html?lang=en&mol=";
const failures = [];
const warnings = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };
const warn = (msg) => { warnings.push(msg); };

async function waitReady(p) {
  try {
    await p.waitForFunction(() => {
      try {
        return !!document.querySelector("#jsmeNomeclatureSVG svg") &&
          typeof window.MulerUserSelection !== "undefined" &&
          typeof fJSmolLive === "function" && fJSmolLive() &&
          typeof jmolAppletNomeclature !== "undefined" && !!jmolAppletNomeclature;
      } catch (e) { return false; }
    }, { timeout: 60000 });
  } catch (e) { failures.push("ready timeout (3D applet not live)"); }
  try { await p.waitForTimeout(1000); } catch (e) {}
}

async function modelCount(p) {
  return await p.evaluate(() => {
    try {
      var t = Jmol.scriptEcho(jmolAppletNomeclature, "write MOL");
      if (!t || t.length < 50) return 0;
      if (typeof fParseMolV2000 !== "function") return -1;
      var pr = fParseMolV2000(t);
      if (!pr || !pr.atoms) return 0;
      var h = 0;
      for (var i = 0; i < pr.atoms.length; i++) { if (pr.atoms[i] && pr.atoms[i].el !== "H") h++; }
      return h;
    } catch (e) { return 0; }
  });
}

async function openMol(p, mol) {
  await p.goto(BASE + PAGE + mol, { waitUntil: "load", timeout: 60000 });
  await waitReady(p);
  // Headless cold boot can leave the applet modeless (pending resend fired
  // once, too early, with no retry): recover through the app's own loader
  // and gate the sweep on a parsed model. A sweep on an empty model would
  // pass vacuously, so fail loudly instead.
  // One explicit load (covers a skipped page-load one), then a patient poll
  // with NO further loads: rapid re-loads cancel the in-flight one and the
  // model can never settle. Fail loudly if nothing arrives.
  let n = 0;
  for (let i = 0; i < 4; i++) {
    n = await modelCount(p);
    if (n > 0) break;
    await p.waitForTimeout(2000);
  }
  if (!(n > 0)) {
    await p.evaluate(() => { try { if (typeof fLoadMol3D === "function") fLoadMol3D(); } catch (e) {} });
    for (let i = 0; i < 30 && !(n > 0); i++) {
      await p.waitForTimeout(2000);
      n = await modelCount(p);
    }
  }
  check(n > 0, mol + ": 3D model never loaded (applet empty after ~70s)");
  await p.evaluate(() => {
    try {
      window.__mulerPickLog = [];
      var prev = window.__mulerPickCb;
      window.__mulerPickCb = function () {
        try {
          var a = Array.prototype.slice.call(arguments).map(function (x) { try { return String(x); } catch (e) { return "?"; } });
          window.__mulerPickLog.push(a);
        } catch (e) {}
        return prev.apply(this, arguments);
      };
    } catch (e) {}
  });
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(500);
  const on = await p.evaluate(() => { try { return !!(window.MulerUserSelection && window.MulerUserSelection.active); } catch (e) { return false; } });
  check(on === true, "select mode did not arm for " + mol);
}

async function state(p) {
  return await p.evaluate(() => {
    try {
      var s = window.MulerUserSelection || {};
      var el = document.getElementById("mulerQuizVerdict");
      return {
        a2: (s.atoms2D || []).slice(), b2: (s.bonds2D || []).slice(),
        a3: (s.atoms3D || []).slice(), b3: (s.bonds3D || []).slice(),
        target: window.MulerQuizTarget || null,
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
      };
    } catch (e) { return { err: 1 }; }
  });
}

async function takeLog(p) {
  return await p.evaluate(() => { try { var l = window.__mulerPickLog || []; window.__mulerPickLog = []; return l; } catch (e) { return []; } });
}

async function raw3D(p) {
  return await p.evaluate(() => {
    try {
      return {
        t3: (typeof allAtomsTypeList3D !== "undefined" && allAtomsTypeList3D) ? allAtomsTypeList3D.slice() : null,
        b3: (typeof bondList3D !== "undefined" && bondList3D) ? bondList3D.map(function (b) { return b ? b.slice() : null; }) : null,
        t2: (typeof allAtomsTypeList !== "undefined" && allAtomsTypeList) ? allAtomsTypeList.slice() : null,
      };
    } catch (e) { return null; }
  });
}

async function modelSig(p) {
  return await p.evaluate(() => {
    try {
      var t = Jmol.scriptEcho(jmolAppletNomeclature, "write MOL");
      if (!t) return null;
      if (typeof fParseMolV2000 !== "function") return "rawlen:" + t.length;
      var pr = fParseMolV2000(t);
      if (!pr || !pr.atoms) return "rawlen:" + t.length;
      return pr.atoms.map(function (a) { return a.el; }).sort().join(",");
    } catch (e) { return "ERR:" + String(e && e.message || e).slice(0, 80); }
  });
}

async function gridPts(p, n) {
  return await p.evaluate((nn) => {
    try {
      var h = document.getElementById("nomeclature3D");
      var r = h.getBoundingClientRect();
      var pts = [];
      for (var iy = 0; iy < nn; iy++) for (var ix = 0; ix < nn; ix++) {
        pts.push([Math.round(r.x + r.width * (0.08 + 0.84 * ix / (nn - 1))), Math.round(r.y + r.height * (0.08 + 0.84 * iy / (nn - 1)))]);
      }
      return pts;
    } catch (e) { return []; }
  }, n);
}

async function clickPt(p, pt, ms) {
  await p.mouse.click(Math.round(pt[0]), Math.round(pt[1]));
  await p.waitForTimeout(ms || 700);
}

async function escClear(p) {
  // Synthetic document keydown: p.keyboard can be swallowed when the JSmol
  // canvas holds focus; the handler under test lives on document.
  await p.evaluate(() => {
    try { document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })); } catch (e) {}
  });
  await p.waitForTimeout(400);
}

function srt(a) { return (a || []).slice().sort(function (x, y) { return x - y; }); }
function sameSet(a, b) { return JSON.stringify(srt(a)) === JSON.stringify(srt(b)); }

// Independent probe-side toggle model (free mode: no H fold; H handling is
// asserted separately via the mirror check, which uses the app map fns only
// for index translation, not for logic).
function pickFromLogEntry(e) {
  // e = [htmlName, strInfo, idx, map] all stringified; idx -1 = echo.
  try {
    var idx = parseInt(e[2], 10);
    if (idx >= 0) return { kind: "atom", a: idx + 1 };
    if (idx === -3 && typeof e[1] === "string") {
      var arr = JSON.parse(e[1]);
      if (arr && arr.length >= 2) {
        var mh = String(arr[1]).match(/#(\d+)/g) || [];
        if (mh.length >= 2) return { kind: "bondInfo", e1: parseInt(mh[0].slice(1), 10), e2: parseInt(mh[1].slice(1), 10), head: arr[1] };
      }
      return { kind: "bondUnparsed" };
    }
  } catch (ex) {}
  return null;
}

(async () => {
  const b = await chromium.launch(await (async () => { try { const fs = require("fs"); if (fs.existsSync(CHROME)) return { executablePath: CHROME }; } catch (e) {} return {}; })());
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  for (const mol of ["ethane", "ethanol", "butene_1"]) {
    const N = 7;
    await openMol(p, mol);
    const raw = await raw3D(p);
    check(raw && raw.t3 && raw.b3, mol + ": 3D globals missing");
    const sig0 = await modelSig(p);
    check(sig0 && sig0.indexOf("ERR") !== 0, mol + ": model read-back failed: " + sig0);
    let expA = [], expB = [];
    const spots = []; // {pt, log, st}
    const pts = await gridPts(p, N);
    check(pts.length === N * N, mol + ": grid failed");

    // Headless JSmol can deliver picks late; settle each point (log entry or
    // state change) before snapshotting so late callbacks can't pollute the
    // next point. State change without any log entry is a hard fail (it
    // would mean untracked selection mutation).
    async function settleClick(pt, pre) {
      const t0 = Date.now();
      for (;;) {
        const lg = await takeLog(p);
        if (lg.length) return { log: lg, late: false };
        const st = await state(p);
        if (JSON.stringify([st.a3, st.b3]) !== JSON.stringify([pre.a3, pre.b3])) return { log: [], late: true, st: st };
        if (Date.now() - t0 > 3000) return { log: [], late: false, st: st };
        await p.waitForTimeout(250);
      }
    }

    for (const pt of pts) {
      await escClear(p);
      expA = []; expB = [];
      await takeLog(p);
      const pre = await state(p);
      const elTag = await p.evaluate((x, y) => {
        try { var el = document.elementFromPoint(x, y); return el ? (el.tagName + "#" + (el.id || "")) : "none"; }
        catch (e) { return "err"; }
      }, pt);
      check(/CANVAS/.test(elTag || ""), mol + " click target not the 3D canvas at " + JSON.stringify(pt) + ": " + elTag);
      await clickPt(p, pt);
      const settled = await settleClick(pt, pre);
      const lg = settled.log;
      check(!(settled.late && lg.length === 0), mol + " state changed with no logged pick at " + JSON.stringify(pt) + " (untracked mutation)");
      const st = settled.st || await state(p);
      // update probe-side model from the logged picks
      for (const e of lg) {
        const pk = pickFromLogEntry(e);
        if (!pk) continue;
        if (pk.kind === "atom") {
          if (expB.length) { expA = [pk.a]; expB = []; }
          else { const ix = expA.indexOf(pk.a); if (ix >= 0) expA.splice(ix, 1); else expA.push(pk.a); }
        } else if (pk.kind === "bondInfo") {
          // resolve bond index probe-side from endpoints in raw.b3
          let bi = -1;
          for (let i = 0; i < raw.b3.length; i++) {
            const bl = raw.b3[i];
            if (!bl) continue;
            if ((bl[0] === pk.e1 && bl[1] === pk.e2) || (bl[0] === pk.e2 && bl[1] === pk.e1)) { bi = i + 1; break; }
          }
          check(bi > 0, mol + ": bond pick endpoints not in bondList3D: " + pk.e1 + "," + pk.e2);
          if (bi > 0) {
            if (expA.length) { expA = []; expB = [bi]; }
            else { const jx = expB.indexOf(bi); if (jx >= 0) expB.splice(jx, 1); else expB.push(bi); }
          }
        } else if (pk.kind === "bondUnparsed") {
          check(false, mol + ": bond callback unparsable: " + JSON.stringify(e).slice(0, 120));
        }
      }
      check(sameSet(st.a3, expA), mol + " 3D atoms mismatch at " + JSON.stringify(pt) + ": got " + JSON.stringify(st.a3) + " want " + JSON.stringify(expA) + " log " + JSON.stringify(lg).slice(0, 160));
      check(sameSet(st.b3, expB), mol + " 3D bonds mismatch at " + JSON.stringify(pt) + ": got " + JSON.stringify(st.b3) + " want " + JSON.stringify(expB));
      // mirror: every picked 3D atom's 2D counterpart (H via heavy parent) is present, and nothing extra.
      const mir = await p.evaluate(() => {
        try {
          var s = window.MulerUserSelection || {};
          var want2 = [], wantB2 = [];
          var pushU = function (arr, v) { if (v > 0 && arr.indexOf(v) < 0) arr.push(v); };
          for (var i = 0; i < (s.atoms3D || []).length; i++) {
            (function (a3) {
              var isH = false;
              try { isH = String(allAtomsTypeList3D[a3 - 1] || "").toUpperCase() === "H"; } catch (eH) {}
              if (isH) {
                for (var q = 0; q < bondList3D.length; q++) {
                  var bl = bondList3D[q]; if (!bl) continue;
                  var pp = (bl[0] === a3) ? bl[1] : ((bl[1] === a3) ? bl[0] : -1);
                  if (pp > 0) { pushU(want2, fMulerMap3D2D(pp)); break; }
                }
              } else pushU(want2, fMulerMap3D2D(a3));
            })(s.atoms3D[i]);
          }
          for (var j = 0; j < (s.bonds3D || []).length; j++) {
            (function (b3) {
              var bl = bondList3D[b3 - 1]; if (!bl) return;
              var m1 = fMulerMap3D2D(bl[0]), m2 = fMulerMap3D2D(bl[1]);
              if (m1 > 0 && m2 > 0) { var bi = fFindBondIndexByAtoms(m1 - 1, m2 - 1); if (bi >= 0) pushU(wantB2, bi + 1); }
            })(s.bonds3D[j]);
          }
          return {
            want2: want2, wantB2: wantB2,
            got2: (s.atoms2D || []).slice(), gotB2: (s.bonds2D || []).slice(),
            quizArmed: !!window.MulerQuizTarget,
          };
        } catch (e) { return { err: String(e && e.message || e).slice(0, 120) }; }
      });
      if (mir.err) { check(false, mol + " mirror eval failed: " + mir.err); }
      else {
        // free mode: no H fold, so mirror sets must match exactly (quizArmed false here).
        check(sameSet(mir.got2, mir.want2), mol + " 2D mirror mismatch at " + JSON.stringify(pt) + ": got " + JSON.stringify(mir.got2) + " want " + JSON.stringify(mir.want2));
        check(sameSet(mir.gotB2, mir.wantB2), mol + " 2D bond mirror mismatch at " + JSON.stringify(pt));
      }
      spots.push({ pt: pt, log: lg, st: JSON.parse(JSON.stringify(st)) });
    }

    const atomSpots = spots.filter((s) => (s.st.a3 || []).length === 1 && (s.st.b3 || []).length === 0);
    const bondSpots = spots.filter((s) => (s.st.b3 || []).length === 1 && (s.st.a3 || []).length === 0);
    const silentSpots = spots.filter((s) => (s.st.a3 || []).length === 0 && (s.st.b3 || []).length === 0 && (s.log || []).length === 0);
    check(atomSpots.length > 0, mol + ": no atom pick in sweep");
    if (mol === "butene_1") check(bondSpots.length > 0, mol + ": no bond pick in sweep (bondPicking broken?)");
    else if (bondSpots.length === 0) warn(mol + ": sweep hit no bond lines");
    if (mol === "ethanol") {
      const oHit = spots.some((s) => (s.st.a3 || []).some((a) => raw.t3[a - 1] === "O"));
      check(oHit, mol + ": no hetero (O) pick in sweep");
    }

    // re-click toggles off (first atom spot), 2D mirror included
    if (atomSpots.length) {
      await escClear(p);
      await clickPt(p, atomSpots[0].pt);
      let st1 = await state(p);
      check(st1.a3.length === 1, mol + ": re-pick failed: " + JSON.stringify(st1.a3));
      await clickPt(p, atomSpots[0].pt);
      st1 = await state(p);
      check(st1.a3.length === 0 && st1.b3.length === 0, mol + ": re-click should clear 3D: " + JSON.stringify(st1));
      check(st1.a2.length === 0 && st1.b2.length === 0, mol + ": re-click should clear 2D mirror: " + JSON.stringify(st1));
    }

    // double silent tap clears; single does not
    if (silentSpots.length) {
      await escClear(p);
      if (atomSpots.length) { await clickPt(p, atomSpots[0].pt); }
      let st0 = await state(p);
      check(st0.a3.length === 1, mol + ": setup pick failed");
      await clickPt(p, silentSpots[0].pt, 300);
      let stMid = await state(p);
      check(stMid.a3.length === 1, mol + ": single silent tap must not clear: " + JSON.stringify(stMid.a3));
      await clickPt(p, silentSpots[0].pt, 300);
      let st2 = await state(p);
      check(st2.a3.length === 0 && st2.b3.length === 0 && st2.a2.length === 0 && st2.b2.length === 0,
        mol + ": double silent tap should clear: " + JSON.stringify([st2.a3, st2.b3, st2.a2, st2.b2]));
    } else warn(mol + ": no silent spot recorded, double-tap test skipped");

    // Esc clears
    if (atomSpots.length) {
      await clickPt(p, atomSpots[0].pt);
      await escClear(p);
      const stE = await state(p);
      check(stE.a3.length === 0 && stE.b3.length === 0, mol + ": Esc should clear");
    }

    // model unchanged
    const sig1 = await modelSig(p);
    check(sig0 === sig1, mol + ": model changed: " + sig0 + " -> " + sig1);

    // --- quiz phases ---
    if (mol === "ethane") {
      // main-chain exact from two discovered carbon spots
      const carbons = {};
      for (const s of atomSpots) {
        const a = s.st.a3[0];
        if (raw.t3[a - 1] === "H") continue;
        if (!carbons[a]) carbons[a] = s.pt;
      }
      const keys = Object.keys(carbons);
      check(keys.length >= 2, mol + ": need 2 distinct carbon spots, got " + keys.length);
      if (keys.length >= 2) {
        await escClear(p);
        await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
        await p.waitForTimeout(800);
        let tg = await state(p);
        check(tg.target === "compCarbonsCount", mol + ": comp5 should arm main-chain quiz, got " + tg.target);
        await clickPt(p, carbons[keys[0]]);
        await clickPt(p, carbons[keys[1]]);
        const fin = await state(p);
        check(fin.target === null && /Correct/.test(fin.verdict || "") && !fin.hidden,
          mol + ": chain exact from 3D failed: " + JSON.stringify({ t: fin.target, v: (fin.verdict || "").slice(0, 80) }));
        // v57 reps lock: solved display (comp5 selected, no live target) must
        // ignore 3D picks entirely (total no-op, stateless).
        await clickPt(p, carbons[keys[0]]);
        const locked = await state(p);
        check(locked.a3.length === 0 && locked.b3.length === 0 && locked.a2.length === 0 && locked.b2.length === 0,
          mol + ": solved display must lock reps (3D pick ignored): " + JSON.stringify([locked.a3, locked.b3, locked.a2, locked.b2]));
        // Deselecting the solved box returns to free picking (nothing
        // selected, no target) — the same spot must pick again.
        await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
        await p.waitForTimeout(800);
        await clickPt(p, carbons[keys[0]]);
        const free = await state(p);
        check(free.a3.length === 1 && free.a2.length === 1,
          mol + ": deselecting solved box should restore free picking: " + JSON.stringify([free.a3, free.a2]));
        await escClear(p);
      }
    }
    if (mol === "butene_1") {
      // bond quiz exact from a discovered bond-line spot
      await escClear(p);
      await p.evaluate(() => { try { document.getElementById("comp6").click(); } catch (e) {} });
      await p.waitForTimeout(800);
      let tg = await state(p);
      if (tg.target !== "compBondType") {
        warn(mol + ": comp6 did not arm bond quiz (target=" + tg.target + "), bond-exact skipped");
      } else if (!bondSpots.length) {
        warn(mol + ": no bond-line spot discovered, bond-exact skipped");
      } else {
        let done = false;
        for (const s of bondSpots) {
          await escClear(p);
          await clickPt(p, s.pt);
          const fin = await state(p);
          if (fin.target === null && /Correct/.test(fin.verdict || "")) { done = true; break; }
        }
        check(done, mol + ": no discovered bond spot exacted the C=C quiz (grid may have missed the double-bond line)");
      }
    }
  }

  console.log(JSON.stringify({ failures, warnings }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  try { await b.close(); } catch (e) {}
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); try { process.exit(1); } catch (e2) {} });
