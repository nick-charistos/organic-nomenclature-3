// Bond quiz (v56 1B bond phase): set-only numberless atom quizzes for the
// bonded atoms; bond clicks count their endpoint atoms. Chain-first redirect
// applies only to digit-led locant boxes; name/type boxes arm directly.
// Cases (EN, expanded):
//   1. butene_1 comp6 ("εν" type): direct arm, atom picks exact.
//   2. butene_1 bond line: selects the bond, exacts alone; bonds hover.
//   3. butyne_2 comp4 (digit locant): redirect, solve, auto-arm, exact.
//   4. butadiene_1_3 comp6 ("διέν"): reversed 4-atom pick exacts (set-only).
//   5. ethane comp6 ("αν"): all single C–C bonds exact via line click.
//   6. butene_1 wrong atom pick: bond-flavored numberless hint.
//   7. methyl_3_pentyn_4_ol_2 comp4 ("-4-" triple locant in an FG-position
//      box): unarmed names the triple bond (never hydroxyl); armed redirects
//      to chain, solves, auto-arms bond (not loc/fg), bond pick exacts.
//   8. ethyl_3_methyl_4_octen_3_yn_5_dione_2_7 comp4 ("-3-" double locant alpha
//      to a 2-keto): unarmed names the double bond (never carbonyls); armed
//      redirects to chain, auto-arms bond.
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

  async function open(mol) {
    await p.goto(BASE + "/mulermoc-nom-56.html?lang=en&mol=" + mol, { waitUntil: "load", timeout: 60000 });
    await waitReady(p, (typeof failures !== "undefined" ? failures : []));
  }
  async function toExpanded() {
    await p.evaluate(() => {
      const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
        .find((el) => /^expanded$/i.test(el.textContent.trim()));
      if (!option) throw new Error("Missing expanded mode option");
      option.click();
    });
    await p.waitForFunction(() => mode2D === "expanded", null);
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
        for (const id of ["comp4", "comp6", "comp7", "comp8", "comp9"]) {
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
        bonds: (window.MulerUserSelection && window.MulerUserSelection.bonds2D) || [],
        badges: document.querySelectorAll("[id^='mulerSelNum']").length,
        numbers: document.querySelectorAll("#jsmeNomeclatureSVG text[id^='number']").length,
        boxes,
      };
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
  async function clickBondMid(order) {
    const pt = await p.evaluate((ord) => {
      try {
        const geom = fMulerSelectGeom();
        const group = geom.groups.find((g) => {
          const bond = bondList[g.bond];
          return bond && bond[2] === ord;
        });
        if (!group) return null;
        const line = group.lines[0];
        const matrix = document.querySelector("#jsmeNomeclatureSVG svg g").getScreenCTM();
        const q = new DOMPoint((line.x1 + line.x2) / 2, (line.y1 + line.y2) / 2).matrixTransform(matrix);
        return { x: q.x, y: q.y };
      } catch (e) { return null; }
    }, order);
    if (!pt) return false;
    await p.mouse.click(pt.x, pt.y);
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

  // 1. butene_1 comp6 ("εν"): type box arms directly (no redirect).
  await open("butene_1");
  await toExpanded();
  check(await armSelectAndBox("comp6"), "butene_1: comp6 box should exist");
  let s = await state();
  check(s.target === "compBondType" && s.purpose === "bond" && !s.returnTo,
    "butene_1: type box should arm directly, got " + JSON.stringify({ target: s.target, returnTo: s.returnTo }));
  check(/appropriate bond/i.test(s.prompt) && /bond or its atoms/i.test(s.prompt),
    "butene_1: prompt must name the bond and both pick ways, got " + JSON.stringify(s.prompt));
  const tgt1 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
  check(tgt1.length === 2, "butene_1: target should have 2 atoms, got " + JSON.stringify(tgt1));
  for (const a of tgt1) {
    const ok = await clickAtom(a);
    check(ok, "butene_1: missing anchor for bond atom " + a);
  }
  await p.waitForTimeout(400);
  s = await state();
  check(/Correct! These are the atoms of the multiple bond/i.test(s.verdict) && !s.hidden,
    "butene_1: full pick should show the Bond success line, got " + JSON.stringify(s.verdict));
  check(!s.target && s.badges === 0, "butene_1: exact should clear the target, stay numberless");

  // 2. bond line click selects the bond and exacts alone; bonds hover.
  await open("butene_1");
  await toExpanded();
  await armSelectAndBox("comp6");
  const bpt = await p.evaluate(() => {
    try {
      const geom = fMulerSelectGeom();
      const group = geom.groups.find((g) => bondList[g.bond] && bondList[g.bond][2] === 2);
      const line = group.lines[0];
      const matrix = document.querySelector("#jsmeNomeclatureSVG svg g").getScreenCTM();
      const q = new DOMPoint((line.x1 + line.x2) / 2, (line.y1 + line.y2) / 2).matrixTransform(matrix);
      return { x: q.x, y: q.y };
    } catch (e) { return null; }
  });
  check(!!bpt, "butene_1: no double-bond midpoint found");
  if (bpt) {
    await p.mouse.move(bpt.x, bpt.y);
    await p.waitForTimeout(500);
  }
  const hov = await p.evaluate(() => !!document.getElementById("mulerHoverRing"));
  check(!!hov, "butene_1 bond: bond should hover in a bond quiz");
  check(await clickBondMid(2), "butene_1: bond click failed");
  s = await state();
  check((s.bonds || []).length === 0 && (s.sel || []).length === 0,
    "butene_1: exact bond pick should clear the selection, got " + JSON.stringify({ sel: s.sel, bonds: s.bonds }));
  await p.waitForTimeout(400);
  s = await state();
  check(/multiple bond/i.test(s.verdict) && !s.hidden, "butene_1: bond-line pick should exact alone, got " + JSON.stringify(s.verdict));
  check(!s.target, "butene_1: exact should clear the target");

  // 3. butyne_2 comp4 (digit locant): redirect, solve, auto-arm, exact.
  await open("butyne_2");
  await toExpanded();
  const has4 = await p.evaluate(() => !!document.getElementById("comp4"));
  check(has4, "butyne_2: comp4 triple-bond locant box should exist");
  if (has4) {
    await armSelectAndBox("comp4");
    s = await state();
    check(s.target === "compCarbonsCount" && s.returnTo === "compBondPos",
      "butyne_2: digit locant should redirect to chain, got " + JSON.stringify(s));
    await solveChain();
    s = await state();
    check(s.target === "compBondPos" && s.purpose === "bond", "butyne_2: chain exact should auto-arm bond, got " + JSON.stringify(s));
    check(hidden(s), "butyne_2: chain verdict should clear when the bond quiz opens");
    check(s.numbers > 0, "butyne_2: numbering aid should be visible, got " + s.numbers);
    const tgt3 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
    check(tgt3.length === 2, "butyne_2: triple target should have 2 atoms, got " + JSON.stringify(tgt3));
    check(await clickBondMid(3), "butyne_2: missing triple-bond midpoint");
    await p.waitForTimeout(400);
    s = await state();
    check(/multiple bond/i.test(s.verdict) && !s.hidden, "butyne_2: exact should show the Bond line, got " + JSON.stringify(s.verdict));
    check(!s.target, "butyne_2: exact should clear the target");
  }

  // 4. butadiene_1_3 comp6 ("διέν"): 4-atom set exacts in reverse order.
  await open("butadiene_1_3");
  await toExpanded();
  await armSelectAndBox("comp6");
  s = await state();
  check(s.target === "compBondType" && s.purpose === "bond", "butadiene_1_3: comp6 should arm a bond quiz, got " + JSON.stringify(s.target));
  const tgt4 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
  check(tgt4.length === 4, "butadiene_1_3: diene target should have 4 atoms, got " + JSON.stringify(tgt4));
  const rev4 = tgt4.slice().reverse();
  for (const a of rev4) {
    const ok = await clickAtom(a);
    check(ok, "butadiene_1_3: missing anchor for bond atom " + a);
  }
  await p.waitForTimeout(400);
  s = await state();
  check(/multiple bond/i.test(s.verdict) && !s.hidden, "butadiene_1_3: reversed full pick should exact (set-only), got " + JSON.stringify(s.verdict));
  check(!s.target, "butadiene_1_3: exact should clear the target");

  // 5. ethane comp6 ("αν"): all single C–C bonds exact via line click.
  await open("ethane");
  await toExpanded();
  await armSelectAndBox("comp6");
  s = await state();
  check(s.target === "compBondType" && s.purpose === "bond", "ethane: single-bond type should arm directly, got " + JSON.stringify(s.target));
  const tgt5 = await p.evaluate(() => (typeof fMulerSingleBondAtoms === "function" ? fMulerSingleBondAtoms() : []));
  check(tgt5.length === 2, "ethane: single-bond target should be the 2 carbons, got " + JSON.stringify(tgt5));
  check(await clickBondMid(1), "ethane: no single-bond midpoint found");
  await p.waitForTimeout(400);
  s = await state();
  check(/single bond/i.test(s.verdict) && !/multiple bond/i.test(s.verdict) && !s.hidden, "ethane: single-bond line pick should exact with single-bond wording, got " + JSON.stringify(s.verdict));
  check(!s.target, "ethane: exact should clear the target");

  // 6. butene_1 wrong atom pick: bond-flavored numberless hint.
  await open("butene_1");
  await toExpanded();
  await armSelectAndBox("comp6");
  s = await state();
  check(s.target === "compBondType", "butene_1 wrong-case: bond quiz should arm, got " + JSON.stringify(s.target));
  const tgt6 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
  const outsider = await p.evaluate((tgt) => {
    try {
      const A = (typeof fMulerSelectAnchors === "function" ? fMulerSelectAnchors() : []);
      const hit = A.find((x) => tgt.indexOf(x.atom + 1) < 0 && String(allAtomsTypeList[x.atom] || "").toUpperCase() === "C");
      return hit ? hit.atom + 1 : null;
    } catch (e) { return null; }
  }, tgt6);
  check(!!outsider, "butene_1: no outside carbon found");
  if (outsider) await clickAtom(outsider);
  s = await state();
  check(!/main chain/i.test(s.verdict) && /multiple bond/i.test(s.verdict),
    "butene_1: wrong hint must name the bond, not the chain, got " + JSON.stringify(s.verdict));
  check(!/\d/.test(s.verdict) && s.badges === 0, "butene_1: bond hints must stay numberless");

  // 7. methyl_3_pentyn_4_ol_2 comp4: triple-bond locant in an FG-position box.
  await open("methyl_3_pentyn_4_ol_2");
  await toExpanded();
  await p.evaluate(() => { try { document.getElementById("comp4").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  let s7 = await state();
  check(/triple bond/i.test(s7.prompt) && !/hydroxyl|hydroxy|–OH|carbonyl|\(>C=O\)/i.test(s7.prompt),
    "methyl_3_pentyn_4_ol_2: unarmed comp4 must name the triple bond, never the hydroxyl, got " + JSON.stringify(s7.prompt));
  await armSelectAndBox("comp4");
  s7 = await state();
  check(s7.target === "compCarbonsCount" && s7.returnTo === "compBondPos",
    "methyl_3_pentyn_4_ol_2: digit locant should redirect to chain, got " + JSON.stringify(s7));
  await solveChain();
  s7 = await state();
  check(s7.target === "compBondPos" && s7.purpose === "bond",
    "methyl_3_pentyn_4_ol_2: chain exact should auto-arm bond (not loc/fg), got " + JSON.stringify(s7));
  check(hidden(s7), "methyl_3_pentyn_4_ol_2: chain verdict should clear when the bond quiz opens");
  const tgt7 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
  check(tgt7.length === 2, "methyl_3_pentyn_4_ol_2: triple target should have 2 atoms, got " + JSON.stringify(tgt7));
  check(await clickBondMid(3), "methyl_3_pentyn_4_ol_2: missing triple-bond midpoint");
  await p.waitForTimeout(400);
  s7 = await state();
  check(/multiple bond/i.test(s7.verdict) && !s7.hidden, "methyl_3_pentyn_4_ol_2: exact should show the Bond line, got " + JSON.stringify(s7.verdict));
  check(!s7.target, "methyl_3_pentyn_4_ol_2: exact should clear the target");

  // 8. ethyl_3_methyl_4_octen_3_yn_5_dione_2_7 comp4: double-bond "-3-" next to
  //    a 2-keto (alpha-C over-match guard). Unarmed must name the double bond,
  //    never the carbonyls; armed must redirect to chain then auto-arm bond.
  await open("ethyl_3_methyl_4_octen_3_yn_5_dione_2_7");
  await toExpanded();
  await p.evaluate(() => { try { document.getElementById("comp4").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  let s8 = await state();
  check(/double bond/i.test(s8.prompt) && !/carbonyl|\(>C=O\)/i.test(s8.prompt),
    "dione en-yne: unarmed comp4 must name the double bond, never the carbonyls, got " + JSON.stringify(s8.prompt));
  await armSelectAndBox("comp4");
  s8 = await state();
  check(s8.target === "compCarbonsCount" && s8.returnTo === "compBondPos",
    "dione en-yne: digit locant should redirect to chain, got " + JSON.stringify(s8));
  await solveChain();
  s8 = await state();
  check(s8.target === "compBondPos" && s8.purpose === "bond",
    "dione en-yne: chain exact should auto-arm bond (not loc/fg), got " + JSON.stringify(s8));
  const tgt8 = await p.evaluate(() => (typeof fMulerQuizTargetSet === "function" ? fMulerQuizTargetSet() : []));
  check(tgt8.length >= 2, "dione en-yne: double-bond target should have >=2 atoms, got " + JSON.stringify(tgt8));
  check(await clickBondMid(2), "dione en-yne: missing double-bond midpoint");
  await p.waitForTimeout(400);
  s8 = await state();
  check(/multiple bond/i.test(s8.verdict) && !s8.hidden, "dione en-yne: exact should show the Bond line, got " + JSON.stringify(s8.verdict));
  check(!s8.target, "dione en-yne: exact should clear the target");

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
