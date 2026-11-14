// Quiz 1C live numberless verdicts. While picking, the line shows actionable
// hints with no chain-length leak and no pick positions: hetero > gap >
// more/fewer > wrong. Final: exact success, plus order/direction once the
// picked SET already equals the target set.
//
// Cases:
//   1. ethane — arm: prompt only, verdict hidden; first of two picks: live
//      "more" (visible, target armed); second pick: exact success.
//   1b. ethane expanded — alkyl-H click resolves to the parent carbon
//      (condensed-style unit picking); parent-C + second C exacts.
//   2. 2-methylpentane — pick a branch carbon (outside the chain, bonded
//      walk intact): live "more" (count), target still armed.
//   3. 2-methylpentane — hetero pick (oxygen): live hetero line.
//   4. 2-methylpentane — non-adjacent picks (C1 then C3): live gap line.
//   5. 2-methylpentane — whole chain backwards: direction feedback.
//   6. 2-methylpentane — whole chain scrambled: order feedback.
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
  async function armQuiz() {
    await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
    await p.waitForTimeout(300);
    await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
    await p.waitForTimeout(800);
  }
  async function state() {
    return await p.evaluate(() => {
      const el = document.getElementById("mulerQuizVerdict");
      return {
        prompt: ((document.getElementById("nameAnalysisExplain") || {}).textContent || "").trim(),
        verdict: el ? (el.textContent || "").trim() : "",
        hidden: !el || getComputedStyle(el).display === "none",
        target: window.MulerQuizTarget || null,
        sel: (window.MulerUserSelection && window.MulerUserSelection.atoms2D) || [],
      };
    });
  }
  const chain = async () => await p.evaluate(() => (typeof fMulerMainChainResolved === "function" ? fMulerMainChainResolved() : []).slice());
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
  const visibleLive = (s) => !s.hidden && s.verdict !== "";

  // Bond hover/click is disabled only while the main-chain quiz is armed.
  for (const mode of ["condensed", "expanded", "skeletal"]) {
    await open("ethane");
    if (mode !== "condensed") {
      await p.evaluate((name) => {
        const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
          .find((el) => el.textContent.trim().toLowerCase() === name);
        if (!option) throw new Error("Missing mode option " + name);
        option.click();
      }, mode);
      await p.waitForFunction((name) => mode2D === name, mode);
      await p.waitForTimeout(800);
    }
    await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
    await p.waitForTimeout(300);
    const points = await p.evaluate(() => {
      const geom = fMulerSelectGeom();
      const chain = fMulerMainChainResolved();
      const group = geom.groups.find((g) => {
        const bond = bondList[g.bond];
        return chain.includes(bond[0]) && chain.includes(bond[1]);
      });
      if (!group) throw new Error("Missing chain bond");
      const line = group.lines[0];
      const bond = { x: (line.x1 + line.x2) / 2, y: (line.y1 + line.y2) / 2 };
      const candidates = geom.anchors.concat(geom.verts);
      const atom = candidates.find((point) => {
        const pick = fMulerSelectPick(point.x, point.y);
        return pick && pick.kind === "atom" && chain.includes(pick.atom);
      });
      if (!atom || fMulerSelectPick(bond.x, bond.y).kind !== "bond") throw new Error("Missing distinct atom/bond hit");
      const matrix = document.querySelector("#jsmeNomeclatureSVG svg g").getScreenCTM();
      const screen = (point) => {
        const q = new DOMPoint(point.x, point.y).matrixTransform(matrix);
        return { x: q.x, y: q.y };
      };
      return { bond: screen(bond), atom: screen(atom) };
    });
    const move = async (pt) => { await p.mouse.move(pt.x, pt.y); await p.waitForTimeout(200); };
    const click = async (pt) => { await p.mouse.click(pt.x, pt.y); await p.waitForTimeout(300); };
    const selection = async () => await p.evaluate(() => ({
      atoms: window.MulerUserSelection.atoms2D.slice(),
      bonds: window.MulerUserSelection.bonds2D.slice(),
      target: window.MulerQuizTarget,
      hover: !!document.getElementById("mulerHoverRing")
    }));
    await move(points.bond);
    check((await selection()).hover, mode + ": free bond should hover");
    await click(points.bond);
    check((await selection()).bonds.length === 1, mode + ": free bond should select");
    await click(points.bond);
    await p.evaluate(() => document.getElementById("comp5").click());
    await p.waitForTimeout(300);
    await move(points.bond);
    check(!(await selection()).hover, mode + ": quiz bond should not hover before any picks");
    await click(points.bond);
    const empty = await selection();
    check(empty.target === "compCarbonsCount" && !empty.atoms.length && !empty.bonds.length,
      mode + ": quiz bond click must not select anything: " + JSON.stringify(empty));
    await move(points.atom);
    check((await selection()).hover, mode + ": quiz atom should hover");
    await click(points.atom);
    const before = await selection();
    check(before.target === "compCarbonsCount" && before.atoms.length === 1, mode + ": quiz atom should select");
    await move(points.bond);
    check(!(await selection()).hover, mode + ": quiz bond should not hover");
    await click(points.bond);
    const after = await selection();
    check(after.target === "compCarbonsCount" && !after.bonds.length &&
      JSON.stringify(after.atoms) === JSON.stringify(before.atoms), mode + ": quiz bond click must preserve picks: " + JSON.stringify(after));
    await p.evaluate(() => document.getElementById("comp5").click());
    await p.waitForTimeout(300);
    await move(points.bond);
    check((await selection()).hover, mode + ": bond hover should return after disarm");
    await click(points.bond);
    const free = await selection();
    check(!free.target && free.bonds.length === 1 && !free.atoms.length,
      mode + ": bond selection should return after disarm: " + JSON.stringify(free));
  }

  // 1. ethane: first pick is live "more", the second completes.
  await open("ethane");
  await armQuiz();
  let s = await state();
  check(s.prompt === "Select the main chain.", "ethane: prompt should be the quiz instruction, got " + JSON.stringify(s.prompt));
  check(hidden(s), "ethane: verdict must be hidden after arming, got " + JSON.stringify(s.verdict));
  check(s.target === "compCarbonsCount", "ethane: target should be armed, got " + JSON.stringify(s.target));
  let ch = await chain();
  check(ch.length === 2, "ethane: main chain should have 2 atoms, got " + JSON.stringify(ch));
  await clickAtom(ch[0]);
  s = await state();
  check(s.sel.length === 1, "ethane: first pick should select one atom, got " + JSON.stringify(s.sel));
  check(visibleLive(s), "ethane: partial pick must show a live hint, got " + JSON.stringify(s.verdict));
  check(/more carbon/i.test(s.verdict), "ethane: 1/2 picks should say more carbon atoms, got " + JSON.stringify(s.verdict));
  check(!/\d+\s*\/\s*\d+/.test(s.verdict), "ethane: live hint must not leak counts, got " + JSON.stringify(s.verdict));
  check(s.target === "compCarbonsCount", "ethane: partial pick must keep the quiz armed");
  await clickAtom(ch[1]);
  await p.waitForTimeout(400);
  await p.screenshot({ path: "quiz-green.png", clip: { x: 340, y: 140, width: 680, height: 320 } });
  s = await state();
  check(/Correct/.test(s.verdict) && !s.hidden, "ethane: exact should show the success line, got " + JSON.stringify(s.verdict));
  check(!s.target, "ethane: exact should clear the target");

  // 1b. ethane expanded: alkyl-H click resolves to the parent carbon.
  await open("ethane");
  await p.evaluate((name) => {
    const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
      .find((el) => el.textContent.trim().toLowerCase() === name);
    if (!option) throw new Error("Missing mode option " + name);
    option.click();
  }, "expanded");
  await p.waitForFunction(() => mode2D === "expanded", null);
  await p.waitForTimeout(800);
  await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
  await p.waitForTimeout(300);
  await p.evaluate(() => { try { document.getElementById("comp5").click(); } catch (e) {} });
  await p.waitForTimeout(800);
  ch = await chain();
  const hyd = await p.evaluate((chainArr) => {
    try {
      const parent = chainArr[0];
      for (let b = 0; b < bondList.length; b++) {
        if (!bondList[b]) continue;
        const [x, y] = [bondList[b][0], bondList[b][1]];
        if (x === parent && String(allAtomsTypeList[y - 1] || "").toUpperCase() === "H") return y;
        if (y === parent && String(allAtomsTypeList[x - 1] || "").toUpperCase() === "H") return x;
      }
      return null;
    } catch (e) { return null; }
  }, ch);
  check(!!hyd, "ethane expanded: no alkyl H found on the first chain carbon");
  if (hyd) {
    await clickAtom(hyd);
    s = await state();
    check(JSON.stringify(s.sel) === JSON.stringify([ch[0]]),
      "ethane expanded: H click should select the parent carbon, got " + JSON.stringify(s.sel));
    check(s.target === "compCarbonsCount", "ethane expanded: H redirect must keep the quiz armed");
  }
  await clickAtom(ch[1]);
  await p.waitForTimeout(400);
  s = await state();
  check(/Correct/.test(s.verdict) && !s.hidden, "ethane expanded: parent-C + C should exact, got " + JSON.stringify(s.verdict));
  check(!s.target, "ethane expanded: exact should clear the target");

  // 2. branch carbon outside the chain: live "more" (count), still armed.
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  check(ch.length === 5, "methyl_2_pentane: main chain should have 5 atoms, got " + JSON.stringify(ch));
  const branch = await p.evaluate((chainArr) => {
    const A = fMulerSelectAnchors();
    const inChain = {};
    chainArr.forEach((a) => { inChain[a] = true; });
    const hit = A.find((x) => {
      if (inChain[x.atom + 1]) return false;
      try {
        const t = String((typeof allAtomsTypeList !== "undefined" ? allAtomsTypeList[x.atom] : "") || "").toUpperCase();
        return t === "C";
      } catch (e) { return true; }
    });
    return hit ? hit.atom + 1 : null;
  }, ch);
  check(!!branch, "methyl_2_pentane: no branch carbon found outside the main chain");
  if (branch) {
    await clickAtom(branch);
    s = await state();
    check(s.sel.indexOf(branch) >= 0, "branch click should select the branch atom, got " + JSON.stringify(s.sel));
    check(visibleLive(s), "branch pick must show a live hint, got " + JSON.stringify(s.verdict));
    check(/more carbon/i.test(s.verdict), "branch carbon (1/5) should say more carbon atoms, got " + JSON.stringify(s.verdict));
    check(!/\d+\s*\/\s*\d+/.test(s.verdict), "live hint must not leak counts, got " + JSON.stringify(s.verdict));
    check(s.target === "compCarbonsCount", "branch pick must keep the quiz armed");
  }

  // 3. hetero pick (oxygen in butanoic acid): live hetero line, numberless.
  await open("butanoic_acid");
  await p.evaluate(() => {
    const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
      .find((el) => /^expanded$/i.test(el.textContent.trim()));
    if (!option) throw new Error("Missing expanded mode option");
    option.click();
  });
  await p.waitForFunction(() => mode2D === "expanded");
  await p.waitForTimeout(800);
  await armQuiz();
  const oxy = await p.evaluate(() => {
    try {
      const A = (typeof fMulerSelectAnchors === "function" ? fMulerSelectAnchors() : []);
      for (const a of A) {
        try {
          const t = String((typeof allAtomsTypeList !== "undefined" ? allAtomsTypeList[a.atom] : "") || "").toUpperCase();
          if (t && t !== "C" && t !== "H") return a.atom + 1;
        } catch (e) {}
      }
      return null;
    } catch (e) { return null; }
  });
  check(!!oxy, "butanoic_acid: no hetero anchor found");
  if (oxy) {
    await clickAtom(oxy);
    s = await state();
    check(visibleLive(s), "hetero pick must show a live hint, got " + JSON.stringify(s.verdict));
    check(/only carbon/i.test(s.verdict), "hetero pick should say only carbon atoms, got " + JSON.stringify(s.verdict));
    check(!/\d/.test(s.verdict), "hetero hint must not contain numbers, got " + JSON.stringify(s.verdict));
    check(s.target === "compCarbonsCount", "hetero pick must keep the quiz armed");
  }

  // 4. non-adjacent picks (C1 then C3, skip C2): live gap line, no positions.
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  await clickAtom(ch[0]);
  await clickAtom(ch[2]);
  s = await state();
  check(s.sel.length === 2, "gap case should have two picks, got " + JSON.stringify(s.sel));
  check(visibleLive(s), "non-adjacent picks must show a live hint, got " + JSON.stringify(s.verdict));
  check(/adjacent/i.test(s.verdict), "skipped-atom picks should say adjacent atoms, got " + JSON.stringify(s.verdict));
  check(!/\d/.test(s.verdict), "gap hint must not contain pick numbers, got " + JSON.stringify(s.verdict));

  // 5. whole chain backwards: direction is final feedback.
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  for (const a of ch.slice().reverse()) {
    const ok = await clickAtom(a);
    check(ok, "direction: missing anchor for atom " + a);
  }
  s = await state();
  check(/wrong direction/i.test(s.verdict) && !s.hidden, "full reverse should report direction, got " + JSON.stringify(s.verdict));

  // 6. whole chain scrambled: order is final feedback.
  await open("methyl_2_pentane");
  await armQuiz();
  ch = await chain();
  const scrambled = [ch[0], ch[2], ch[1], ch[3], ch[4]];
  for (const a of scrambled) {
    const ok = await clickAtom(a);
    check(ok, "order: missing anchor for atom " + a);
  }
  s = await state();
  check(/Wrong order/i.test(s.verdict) && !s.hidden, "scrambled full set should report order, got " + JSON.stringify(s.verdict));

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
