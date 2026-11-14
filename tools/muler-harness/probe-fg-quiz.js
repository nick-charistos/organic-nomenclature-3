// FG suffix quiz (v56 1C suffix phase): set-only, numberless, atoms-only.
// Cases:
//   1. ethanol — arm via comp9 (suffix): prompt only, verdict hidden; pick the
//      O anchor: exact success + green, target cleared, no sequence badges.
//   2. ethanol — pick a chain carbon first: live hint visible, numberless
//      (no hetero/gap lines for FG), target still armed; then O: wrong.
//   3. ethane (hydrocarbon -ιο) — comp9 click must NOT arm (classic path).
//   4. ethanol armed — bond click is ignored (no selection, target kept).
//   5. butanoic_acid — arm via comp9, one condensed COOH label click selects
//      the whole heavy fragment: exact success, no badges.
//   6. ethanal expanded — aldehyde H is in the target: H-first then the
//      remaining atoms exact (order-free), numberless throughout.
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
  async function armSelectAndBox(boxId) {
    await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
    await p.waitForTimeout(300);
    await p.evaluate((id) => { try { document.getElementById(id).click(); } catch (e) {} }, boxId);
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
        badges: document.querySelectorAll("[id^='mulerSelNum']").length,
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
  const hidden = (s) => s.hidden && s.verdict === "";
  const visibleLive = (s) => !s.hidden && s.verdict !== "";

  // 1. ethanol suffix: O pick completes the heavy set.
  await open("ethanol");
  await armSelectAndBox("comp9");
  let s = await state();
  check(s.target === "compSuffix", "ethanol: suffix click should arm compSuffix, got " + JSON.stringify(s.target));
  check(hidden(s), "ethanol: verdict must be hidden after arming, got " + JSON.stringify(s.verdict));
  check(/functional group that defines the chemical class/i.test(s.prompt),
    "ethanol: prompt must name the class-defining group, got " + JSON.stringify(s.prompt));
  const oxy = await p.evaluate(() => {
    try {
      const A = (typeof fMulerSelectAnchors === "function" ? fMulerSelectAnchors() : []);
      for (const a of A) {
        try {
          const t = String((typeof allAtomsTypeList !== "undefined" ? allAtomsTypeList[a.atom] : "") || "").toUpperCase();
          if (t === "O") return a.atom + 1;
        } catch (e) {}
      }
      return null;
    } catch (e) { return null; }
  });
  check(!!oxy, "ethanol: no oxygen anchor found");
  const tgt1 = await p.evaluate(() => (typeof fMulerSuffixResolved === "function" ? fMulerSuffixResolved() : []));
  check(JSON.stringify(tgt1) === JSON.stringify([oxy]), "ethanol: suffix target should be the oxygen only, got " + JSON.stringify(tgt1));
  if (oxy) await clickAtom(oxy);
  await p.waitForTimeout(400);
  s = await state();
  check(/Correct! This is the functional group/i.test(s.verdict) && !s.hidden, "ethanol: O pick should show the FG success line, got " + JSON.stringify(s.verdict));
  check(!s.target, "ethanol: exact should clear the target");
  check(s.badges === 0, "ethanol: FG quiz must stay numberless, got " + s.badges + " badges");

  // 2. ethanol: carbon first is a live hint, then O completes.
  await open("ethanol");
  await armSelectAndBox("comp9");
  const carbo = await p.evaluate((o) => {
    try {
      const A = (typeof fMulerSelectAnchors === "function" ? fMulerSelectAnchors() : []);
      const hit = A.find((x) => x.atom + 1 !== o && String(allAtomsTypeList[x.atom] || "").toUpperCase() === "C");
      return hit ? hit.atom + 1 : null;
    } catch (e) { return null; }
  }, oxy);
  check(!!carbo, "ethanol: no carbon anchor found");
  if (carbo) await clickAtom(carbo);
  s = await state();
  check(visibleLive(s), "ethanol: wrong-atom pick must show a live hint, got " + JSON.stringify(s.verdict));
  check(!/\d/.test(s.verdict), "ethanol: live hint must be numberless, got " + JSON.stringify(s.verdict));
  check(!/main chain/i.test(s.verdict) && !/carbon/i.test(s.verdict),
    "ethanol: FG live hint must not mention main chain/carbon, got " + JSON.stringify(s.verdict));
  check(s.target === "compSuffix", "ethanol: partial pick must keep the quiz armed");
  check(s.badges === 0, "ethanol: partial FG picks must stay numberless");
  if (oxy) await clickAtom(oxy);
  await p.waitForTimeout(400);
  s = await state();
  check(/functional group/i.test(s.verdict),
    "ethanol: carbon+oxygen wrong hint must name the group, got " + JSON.stringify(s.verdict));
  check(s.target === "compSuffix" && !/Correct/.test(s.verdict),
    "ethanol: carbon+oxygen is not the target set (wrong), got " + JSON.stringify(s));

  // 3. ethane hydrocarbon -ιο: no arm, classic path.
  await open("ethane");
  await armSelectAndBox("comp9");
  s = await state();
  check(!s.target, "ethane: hydrocarbon suffix must not arm a quiz, got " + JSON.stringify(s.target));

  // 4. bond click while FG armed: ignored, picks preserved.
  await open("ethanol");
  await armSelectAndBox("comp9");
  const pts = await p.evaluate(() => {
    try {
      const geom = fMulerSelectGeom();
      const g = (geom.groups || [])[0];
      if (!g) return null;
      const line = g.lines[0];
      const matrix = document.querySelector("#jsmeNomeclatureSVG svg g").getScreenCTM();
      const q = new DOMPoint((line.x1 + line.x2) / 2, (line.y1 + line.y2) / 2).matrixTransform(matrix);
      return { x: q.x, y: q.y };
    } catch (e) { return null; }
  });
  check(!!pts, "ethanol: no bond midpoint found");
  if (pts) {
    await p.mouse.click(pts.x, pts.y);
    await p.waitForTimeout(500);
  }
  s = await state();
  check(s.target === "compSuffix" && s.sel.length === 0, "ethanol: FG bond click must not select, got " + JSON.stringify(s));

  // 5. butanoic_acid: one condensed COOH label click takes the heavy fragment.
  await open("butanoic_acid");
  await armSelectAndBox("comp9");
  s = await state();
  check(s.target === "compSuffix", "butanoic_acid: suffix click should arm compSuffix, got " + JSON.stringify(s.target));
  const acidTgt = await p.evaluate(() => (typeof fMulerSuffixResolved === "function" ? fMulerSuffixResolved() : []));
  check(acidTgt.length === 3, "butanoic_acid: COOH heavy target should have 3 atoms, got " + JSON.stringify(acidTgt));
  const comp = await p.evaluate(() => {
    try {
      const c = (typeof fMulerSelectCompacted === "function" ? fMulerSelectCompacted() : [])[0];
      if (!c || !c.box) return null;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(c.box.x + c.box.w / 2, c.box.y + c.box.h / 2).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    } catch (e) { return null; }
  });
  check(!!comp, "butanoic_acid: no compact COOH label found");
  if (comp) {
    await p.mouse.click(comp[0], comp[1]);
    await p.waitForTimeout(600);
  }
  s = await state();
  check(/Correct! This is the functional group/i.test(s.verdict) && !s.hidden, "butanoic_acid: COOH fragment pick should succeed, got " + JSON.stringify(s.verdict));
  check(!s.target, "butanoic_acid: exact should clear the target");
  check(s.badges === 0, "butanoic_acid: FG quiz must stay numberless");

  // 6. ethanal expanded: the modeled aldehyde H is part of the target.
  await open("ethanal");
  await p.evaluate(() => {
    const option = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption"))
      .find((el) => /^expanded$/i.test(el.textContent.trim()));
    if (!option) throw new Error("Missing expanded mode option");
    option.click();
  });
  await p.waitForFunction(() => mode2D === "expanded");
  await p.waitForTimeout(800);
  await armSelectAndBox("comp9");
  s = await state();
  check(s.target === "compSuffix", "ethanal expanded: suffix click should arm compSuffix, got " + JSON.stringify(s.target));
  const tgtX = await p.evaluate(() => (typeof fMulerSuffixResolved === "function" ? fMulerSuffixResolved() : []));
  const types = await p.evaluate((atoms) => atoms.map((a) => String(allAtomsTypeList[a - 1]).toUpperCase()), tgtX);
  const h = tgtX.find((a, i) => types[i] === "H");
  check(tgtX.length === 3 && types.includes("C") && types.includes("O") && !!h,
    "ethanal expanded: target should be C+O+H, got " + JSON.stringify({ tgtX, types }));
  if (h) check(await clickAtom(h), "ethanal expanded: missing target H anchor");
  s = await state();
  check(s.target === "compSuffix" && s.sel.includes(h), "ethanal expanded: H-only pick must select H and keep the quiz armed");
  check(s.badges === 0, "ethanal expanded: partial FG picks must stay numberless");
  for (const atom of tgtX) {
    if (atom !== h) check(await clickAtom(atom), "ethanal expanded: missing target anchor " + atom);
  }
  await p.waitForTimeout(400);
  s = await state();
  check(/Correct! This is the functional group/i.test(s.verdict) && !s.hidden,
    "ethanal expanded: H-first target picks should succeed, got " + JSON.stringify(s.verdict));
  check(!s.target, "ethanal expanded: exact should clear the target");
  check(s.badges === 0, "ethanal expanded: FG quiz must stay numberless");

  console.log(JSON.stringify({ failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
