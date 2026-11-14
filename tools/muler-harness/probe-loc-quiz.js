// Locant-box quiz (v56 1C locant phase): compBondPos / compNumber1 /
// compEndNumber / compSuffixLocants arm the shared FG task (purpose "loc",
// set-only, numberless, atoms-only) with position-flavored strings — gated on
// a solved main chain (redirect → solve → auto-arm with numbering aid).
// The FG locant renders per language: EN 2-πεντανόνη in comp4 (compBondPos),
// GR in comp0 (compNumber1).
// Cases (EN unless noted):
//   1. pentanone_2 comp4 unsolved: redirect to chain + "first" prompt.
//   2. solving the chain auto-arms loc (position prompt, chain verdict cleared,
//      numbering aid visible); full FG pick exacts with Loc success.
//   3. GR pentanone_2 comp0: redirect (GR prompt), solve, auto loc (GR
//      strings), full pick exacts.
//   4. dione comp7: redirect, chain solve, auto loc, full pick exacts.
//   5. switching molecules disarms the locant quiz.
const { chromium } = require("playwright-core");
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.MULER_BASE || "http://localhost:8901";
async function waitReady(p, failures) {
  try {
    await p.waitForFunction(() => { try { return !!document.querySelector("#jsmeNomeclatureSVG svg") && typeof fMulerSelectAnchors === "function" && !!window.MulerUserSelection; } catch (e) { return false; } }, { timeout: 30000 });
  } catch (e) { try { failures.push("ready timeout"); } catch (e2) {} }
  try { await p.waitForTimeout(800); } catch (e) {}
}

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  const b = await chromium.launch(await (async () => { try { const fs = require("fs"); if (fs.existsSync(CHROME)) return { executablePath: CHROME }; } catch (e) {} return {}; })());
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));

  async function open(mol, lang) {
    const q = "?lang=" + (lang || "en") + "&mol=" + mol;
    await p.goto(BASE + "/mulermoc-nom-56.html" + q, { waitUntil: "load", timeout: 60000 });
    await waitReady(p, (typeof failures !== "undefined" ? failures : []));
  }
  async function toExpanded() {
    await p.evaluate(() => {
      const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
        .find((el) => /^(expanded|ανεπτυγμένος)$/i.test(el.textContent.trim()));
      if (!option) throw new Error("Missing expanded mode option");
      option.click();
    });
    await p.waitForFunction(() => mode2D === "expanded");
    await p.waitForTimeout(800);
  }
  async function armSelectAndBox(boxId) {
    const has = await p.evaluate((id) => !!document.getElementById(id), boxId);
    if (!has) return false;
    await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
    await p.waitForTimeout(300);
    await p.evaluate((id) => { try { document.getElementById(id).click(); } catch (e) {} }, boxId);
    await p.waitForTimeout(800);
    return true;
  }
  async function state() {
    return await p.evaluate(() => {
      const el = document.getElementById("mulerQuizVerdict");
      const boxes = {};
      try {
        for (const id of ["comp0", "comp4", "comp7", "comp9loc"]) {
          const b = document.getElementById(id);
          boxes[id] = b ? (b.textContent || "").trim().slice(0, 24) : null;
        }
      } catch (e) {}
      return {
        prompt: ((document.getElementById("nameAnalysisExplain") || {}).textContent || "").trim(),
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
        target: window.MulerQuizTarget || null,
        returnTo: window.__mulerQuizReturnTo || null,
        purpose: (typeof fMulerSelectPurpose === "function" ? fMulerSelectPurpose() : "?"),
        solved: fMulerChainSolved(),
        sel: (window.MulerUserSelection && window.MulerUserSelection.atoms2D) || [],
        badges: document.querySelectorAll("[id^='mulerSelNum']").length,
        numbers: document.querySelectorAll("#jsmeNomeclatureSVG text[id^='number']").length,
        boxes,
      };
    });
  }
  async function diag() {
    return await p.evaluate(() => {
      try {
        return {
          fgList: (typeof functionalGroupsList !== "undefined" ? functionalGroupsList : null),
          n4: (typeof nameComponentsList !== "undefined" && nameComponentsList ? nameComponentsList[4] : null),
          n0: (typeof nameComponentsList !== "undefined" && nameComponentsList ? nameComponentsList[0] : null),
          n7: (typeof nameComponentsList !== "undefined" && nameComponentsList ? nameComponentsList[7] : null),
          n8: (typeof nameComponentsList !== "undefined" && nameComponentsList ? nameComponentsList[8] : null),
          bondPosResolved: (typeof fMulerBondPosResolved === "function" ? fMulerBondPosResolved() : null),
          number1Resolved: (typeof fMulerNumber1Resolved === "function" ? fMulerNumber1Resolved() : null),
          endResolved: (typeof fMulerEndNumberResolved === "function" ? fMulerEndNumberResolved() : null),
        };
      } catch (e) { return { err: String(e.message).slice(0, 120) }; }
    });
  }
  async function clickAtom(atom1) {
    const sc = await p.evaluate((a1) => {
      try {
        const A = fMulerSelectAnchors().find((x) => x.atom === a1 - 1);
        if (!A) return null;
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const q = new DOMPoint(A.x, A.y).matrixTransform(g.getScreenCTM());
        return [q.x, q.y];
      } catch (e) { return null; }
    }, atom1);
    if (!sc) return false;
    await p.mouse.click(sc[0], sc[1]);
    await p.waitForTimeout(500);
    return true;
  }
  const hidden = (s) => s.hidden && s.verdict === "";
  async function solveChain() {
    const ch = await p.evaluate(() => (typeof fMulerMainChainResolved === "function" ? fMulerMainChainResolved() : []));
    check(ch.length > 0, "chain should resolve, got " + JSON.stringify(ch));
    for (const a of ch) {
      const ok = await clickAtom(a);
      check(ok, "missing anchor for chain atom " + a);
    }
    await p.waitForTimeout(400);
    return ch;
  }

  // 1-2. EN pentanone_2 comp4: redirect, solve, auto loc, exact.
  await open("pentanone_2", "en");
  await toExpanded();
  const d1 = await diag();
  check(((d1.bondPosResolved) || []).length > 0, "pentanone_2 EN: bondPos resolver should be non-empty, got " + JSON.stringify(d1));
  check(await armSelectAndBox("comp4"), "pentanone_2 EN: comp4 box should exist");
  let s = await state();
  check(s.boxes.comp4 && /2/.test(s.boxes.comp4), "pentanone_2 EN: comp4 should hold the locant, got " + JSON.stringify(s.boxes));
  check(s.target === "compCarbonsCount" && s.returnTo === "compBondPos",
    "pentanone_2 EN: unsolved locant click should redirect to chain, got " + JSON.stringify(s));
  check(/Select the main chain first/i.test(s.prompt), "pentanone_2 EN: prompt must ask for the chain first, got " + JSON.stringify(s.prompt));
  await solveChain();
  s = await state();
  check(s.solved, "pentanone_2 EN: chain exact should mark the molecule solved");
  check(s.target === "compBondPos", "pentanone_2 EN: chain exact should auto-arm loc, got " + JSON.stringify(s.target));
  check(/indicated position/i.test(s.prompt), "pentanone_2 EN: auto-armed prompt must be position-flavored, got " + JSON.stringify(s.prompt));
  check(hidden(s), "pentanone_2 EN: chain verdict should clear when the locant quiz opens");
  check(s.numbers > 0, "pentanone_2 EN: numbering aid should be visible, got " + s.numbers);
  const tgt1 = await p.evaluate(() => (typeof fMulerBondPosResolved === "function" ? fMulerBondPosResolved() : []));
  for (const a of tgt1) {
    const ok = await clickAtom(a);
    check(ok, "pentanone_2 EN: missing anchor for loc target atom " + a);
  }
  await p.waitForTimeout(400);
  s = await state();
  check(/Correct! These are the atoms of the functional group/i.test(s.verdict) && !s.hidden,
    "pentanone_2 EN: full pick should show the Loc success line, got " + JSON.stringify(s.verdict));
  check(!s.target, "pentanone_2 EN: exact should clear the target");
  check(s.badges === 0, "pentanone_2 EN: loc quiz must stay numberless");

  // 3. GR pentanone_2 comp0: same flow with GR strings.
  await open("pentanone_2", "gr");
  await toExpanded();
  const dGR = await diag();
  s = await state();
  check(s.boxes.comp0 && /2/.test(s.boxes.comp0), "pentanone_2 GR: comp0 should hold the locant, got " + JSON.stringify(s.boxes) + " diag=" + JSON.stringify(dGR));
  check(await armSelectAndBox("comp0"), "pentanone_2 GR: comp0 box should exist");
  s = await state();
  check(s.target === "compCarbonsCount" && s.returnTo === "compNumber1",
    "pentanone_2 GR: unsolved locant click should redirect to chain, got " + JSON.stringify(s));
  check(/πρώτα την κύρια αλυσίδα/i.test(s.prompt), "pentanone_2 GR: prompt must ask for the chain first, got " + JSON.stringify(s.prompt));
  await solveChain();
  s = await state();
  check(s.target === "compNumber1", "pentanone_2 GR: chain exact should auto-arm loc, got " + JSON.stringify(s.target));
  check(/υποδεικνυόμενη θέση/i.test(s.prompt), "pentanone_2 GR: auto-armed prompt must be position-flavored, got " + JSON.stringify(s.prompt));
  const tgtGR = await p.evaluate(() => (typeof fMulerNumber1Resolved === "function" ? fMulerNumber1Resolved() : []));
  check(tgtGR.length > 0, "pentanone_2 GR: number1 resolver should be non-empty, got " + JSON.stringify(tgtGR));
  for (const a of tgtGR) {
    const ok = await clickAtom(a);
    check(ok, "pentanone_2 GR: missing anchor for loc target atom " + a);
  }
  await p.waitForTimeout(400);
  s = await state();
  check(/υποδεικνυόμενη θέση/i.test(s.verdict) && !s.hidden,
    "pentanone_2 GR: full pick should show the Loc success line, got " + JSON.stringify(s.verdict));
  check(!s.target, "pentanone_2 GR: exact should clear the target");

  // 4. dione suffix locants: redirect, solve, auto loc, exact.
  await open("methyl_6_hepten_3_dione_2_5", "en");
  await toExpanded();
  const has7 = await p.evaluate(() => !!document.getElementById("comp7"));
  check(has7, "dione: comp7 suffix-locant box should exist");
  if (has7) {
    await armSelectAndBox("comp7");
    s = await state();
    check(s.target === "compCarbonsCount" && s.returnTo === "compEndNumber",
      "dione: unsolved locant click should redirect to chain, got " + JSON.stringify(s));
    await solveChain();
    s = await state();
    check(s.target === "compEndNumber", "dione: chain exact should auto-arm loc, got " + JSON.stringify(s.target));
    check(/indicated position/i.test(s.prompt), "dione: auto-armed prompt must be position-flavored, got " + JSON.stringify(s.prompt));
    check(s.numbers > 0, "dione: numbering aid should be visible, got " + s.numbers);
    const tgt3 = await p.evaluate(() => fMulerQuizTargetSet());
    check(tgt3.length > 0, "dione: locant target should not be empty");
    for (const a of tgt3) {
      const ok = await clickAtom(a);
      check(ok, "dione: missing anchor for loc target atom " + a);
    }
    await p.waitForTimeout(400);
    s = await state();
    check(/Correct! These are the atoms of the functional group/i.test(s.verdict) && !s.hidden,
      "dione: full pick should show the Loc success line, got " + JSON.stringify(s.verdict));
    check(!s.target, "dione: exact should clear the target");
    check(s.badges === 0, "dione: loc quiz must stay numberless");
  }

  // 5. sticky distinction across molecules: loc selection drops, chain stays.
  await open("pentanone_2", "en");
  await toExpanded();
  await armSelectAndBox("comp5");
  let ch5 = await p.evaluate(() => (typeof fMulerMainChainResolved === "function" ? fMulerMainChainResolved() : []));
  for (const a of ch5) await clickAtom(a);
  await p.waitForTimeout(400);
  let s5 = await state();
  check(s5.solved, "pentanone_2 EN: chain should solve, got " + JSON.stringify(s5));
  await p.evaluate(() => { try { document.getElementById("comp4").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  s5 = await state();
  check(s5.target === "compBondPos", "pentanone_2 EN: solved locant click should arm loc, got " + JSON.stringify(s5.target));
  const switched = await p.evaluate(() => {
    try {
      const row = document.querySelector("#nomeclature2Menu .menuLi#ethane");
      if (!row || selectedMol === row.id) return false;
      row.click();
      return true;
    } catch (e) { return false; }
  });
  check(!!switched, "could not switch molecule in-page");
  if (switched) await p.waitForFunction(() => selectedMol === "ethane", null, { timeout: 10000 });
  await p.waitForTimeout(2200);
  s5 = await state();
  check(!s5.target, "molecule switch should disarm the loc quiz, got " + JSON.stringify(s5));
  const noSelBox = await p.evaluate(() => {
    try { return document.querySelectorAll("#nameAnalysis .nameCompBox.selected").length; } catch (e) { return -1; }
  });
  check(noSelBox === 0, "molecule switch should drop the locant selection, got " + noSelBox + " selected boxes");
  check(s5.purpose !== "loc", "molecule switch should clear the loc purpose, got " + JSON.stringify(s5));

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
