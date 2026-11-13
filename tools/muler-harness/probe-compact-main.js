// v56 compact-label selection in a main-chain context.
// Free selection keeps the whole fragment; main-chain selection resolves a
// carbon-anchored label to the anchor carbon only. NOx/SOx stay fragments.
const { chromium } = require("playwright-core");

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

(async () => {
  const b = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 200)));

  async function open(mol) {
    await p.goto("http://localhost:8901/mulermoc-nom-56.html?mol=" + mol, { waitUntil: "load", timeout: 60000 });
    await p.waitForTimeout(14000);
    await p.evaluate(() => document.getElementById("selectAtomsBtn").click());
    await p.waitForTimeout(250);
  }
  async function pointForComp() {
    return await p.evaluate(() => {
      const c = fMulerSelectCompacted()[0];
      if (!c) return null;
      const bx = c.box;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(bx.x + bx.w / 2, bx.y + bx.h / 2).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    });
  }
  async function pointForAtom(atom0) {
    return await p.evaluate((a) => {
      const A = fMulerSelectAnchors().find((x) => x.atom === a);
      if (!A) return null;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(A.x, A.y).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    }, atom0);
  }
  async function state() {
    return await p.evaluate(() => {
      const s = window.MulerUserSelection || {};
      const c = fMulerSelectCompacted()[0] || null;
      const rect = c ? fMulerSelectCompactRect(c.anchor) : null;
      const path = c ? document.querySelector('#jsmeNomeclatureSVG path[data-muler-compact-sel="' + (c.anchor + 1) + '"]') : null;
      const ellipses = [];
      document.querySelectorAll("#jsmeNomeclatureSVG ellipse").forEach((n) => {
        const f = String(n.getAttribute("fill") || "").toLowerCase();
        if (f.indexOf("22d3ee") >= 0 || f.indexOf("34,211,238") >= 0) {
          ellipses.push({ display: n.getAttribute("display"), computed: getComputedStyle(n).display });
        }
      });
      const badge = document.getElementById("mulerSelNum0");
      const pbox = path && path.getBBox ? path.getBBox() : null;
      return {
        atoms: s.atoms2D || [],
        target: window.MulerQuizTarget || null,
        rectFill: rect ? rect.getAttribute("fill") : null,
        rectWhitened: !!(rect && rect.getAttribute("data-muler-compact-white") === "1"),
        compactPath: !!path,
        compactPathCount: document.querySelectorAll("#jsmeNomeclatureSVG path[data-muler-compact-sel]").length,
        compactPathBox: pbox ? { x: pbox.x, y: pbox.y, w: pbox.width, h: pbox.height } : null,
        ellipses,
        badge: badge ? { x: parseFloat(badge.getAttribute("x")), y: parseFloat(badge.getAttribute("y")) } : null,
        verdict: (document.getElementById("mulerQuizVerdict") || {}).textContent || "",
        comp: c ? {
          anchor: c.anchor,
          members: c.members,
          symbol: c.symbol,
          box: c.box,
          textBox: c.textBox,
          atomBox: c.atomBox
        } : null
      };
    });
  }

  await open("butanoic_acid");

  // Free selection keeps the legacy whole-fragment behavior.
  let pt = await pointForComp();
  check(!!pt, "butanoic acid compact label missing");
  await p.mouse.click(pt[0], pt[1]);
  await p.waitForTimeout(700);
  const free = await state();
  check(JSON.stringify(free.atoms) === JSON.stringify([4, 5, 6]), "free compact click should select [4,5,6], got " + JSON.stringify(free.atoms));
  check(free.rectFill === "rgb(34,211,238)" || free.rectFill === "#22d3ee", "free fragment should paint the full backplate cyan");
  check(!free.compactPath, "free fragment must not create the carbon-only path");
  const freePick = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    return fMulerSelectPick(c.box.x + c.box.w / 2, c.box.y + c.box.h / 2);
  });
  check(freePick && freePick.kind === "fragment", "free compact hit should return a fragment");
  // Free selection keeps the pre-v56 glyph-run hit area: a point in the wider
  // backplate but clear of the text (and its 14-unit pick margin) must not
  // resolve to the fragment, or the backplate would steal adjacent picks.
  const freeEdge = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    if (!c || !c.box || !c.textBox) return null;
    const b = c.box, t = c.textBox, m = 20;
    const pts = [
      { x: b.x + 5, y: b.y + b.h / 2 },
      { x: b.x + b.w - 5, y: b.y + b.h / 2 },
      { x: b.x + b.w / 2, y: b.y + 3 },
      { x: b.x + b.w / 2, y: b.y + b.h - 3 }
    ];
    for (const pt of pts) {
      const inText = pt.x >= t.x - m && pt.x <= t.x + t.w + m && pt.y >= t.y - m && pt.y <= t.y + t.h + m;
      if (inText) continue;
      const out = fMulerSelectPick(pt.x, pt.y);
      return { pt, kind: out ? out.kind : null };
    }
    return null;
  });
  if (freeEdge) check(freeEdge.kind !== "fragment", "free selection must keep the glyph-run hit area, got " + JSON.stringify(freeEdge));

  // Main-chain purpose: existing fragment collapses to the carbon atom.
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(700);
  const armed = await state();
  check(armed.target === "compCarbonsCount", "main-chain target should arm");
  check(JSON.stringify(armed.atoms) === JSON.stringify([4]), "arming should normalize compact carbon to [4], got " + JSON.stringify(armed.atoms));
  check(armed.rectFill === "white", "carbon-only selection should restore the backplate to white");
  check(armed.compactPath, "carbon-only selection should create a C-sized path");
  check(!!armed.compactPathBox && armed.compactPathBox.w < 300,
    "carbon-only path should cover the glyph, not the whole label, got " + JSON.stringify(armed.compactPathBox));
  check(armed.ellipses.some((x) => x.display === "none"), "the oversized native anchor ellipse should be hidden");
  check(!!armed.badge, "carbon-only pick should have a sequence badge");
  if (armed.comp && armed.badge) {
    const bc = armed.comp.atomBox.x + armed.comp.atomBox.w / 2;
    check(Math.abs(armed.badge.x - bc) < 20, "sequence badge should sit under the carbon glyph");
  }
  const mainPick = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    return fMulerSelectPick(c.box.x + c.box.w / 2, c.box.y + c.box.h / 2);
  });
  check(mainPick && mainPick.kind === "atom" && mainPick.atom === 4 && mainPick.compactAnchor,
    "main-chain compact hit should return compacted atom 4");
  const edgePick = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    return fMulerSelectPick(c.box.x + c.box.w - 5, c.box.y + c.box.h / 2);
  });
  check(edgePick && edgePick.kind === "atom" && edgePick.atom === 4,
    "the whole compacted backplate should resolve to the carbon in main-chain purpose");

  // Hover must preview the carbon, not the whole COOH box.
  pt = await pointForComp();
  await p.mouse.move(pt[0], pt[1]);
  await p.waitForTimeout(450);
  const hover = await p.evaluate(() => {
    const r = document.querySelector("#mulerHoverRing rect");
    return r ? { w: parseFloat(r.getAttribute("width")), h: parseFloat(r.getAttribute("height")) } : null;
  });
  check(!!hover && hover.w < 400, "hover ring should target the carbon glyph, got " + JSON.stringify(hover));

  // Toggle off and back on, then complete the chain exactly.
  await p.mouse.click(pt[0], pt[1]);
  await p.waitForTimeout(500);
  const toggledOff = await state();
  check(toggledOff.atoms.length === 0, "re-click should clear the compacted carbon");
  check(!toggledOff.compactPath && toggledOff.compactPathCount === 0, "clear must drop the C-only path");
  check(!toggledOff.rectWhitened, "clear/re-render must drop the paint marker");
  await p.mouse.click(pt[0], pt[1]);
  await p.waitForTimeout(500);
  for (const a of [2, 1, 0]) {
    const ap = await pointForAtom(a);
    check(!!ap, "missing anchor for atom " + a);
    if (!ap) break;
    await p.mouse.click(ap[0], ap[1]);
    await p.waitForTimeout(500);
  }
  await p.waitForTimeout(700);
  const exact = await state();
  check(/Σωστ|Correct/.test(exact.verdict), "compacted main chain should be exact, got " + exact.verdict);
  check(!exact.target, "exact should clear the quiz target");

  // HCOOH has its carbon in the middle of the user-visible label.
  await open("methanoicacid");
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(600);
  const hpt = await pointForComp();
  const hPick = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    return fMulerSelectPick(c.box.x + c.box.w / 2, c.box.y + c.box.h / 2);
  });
  check(hPick && hPick.kind === "atom" && hPick.atom === 1, "HCOOH should resolve to its carbon atom 1");
  await p.mouse.click(hpt[0], hpt[1]);
  await p.waitForTimeout(700);
  const hDone = await state();
  check(/Σωστ|Correct/.test(hDone.verdict), "single-carbon HCOOH main chain should be exact");

  // Methanal can render without any highlight backplate (no rect/circle); the
  // C-only paint must still draw the glyph-sized path from state alone.
  await open("methanal");
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(600);
  const methPaint = await p.evaluate(() => {
    const s = fMulerSelectState();
    s.atoms2D = [1]; s.bonds2D = []; s.groups = [];
    fMulerSelectRepaint();
    fUpdateSVG();
    const c = fMulerSelectCompacted()[0] || null;
    const path = document.querySelector('#jsmeNomeclatureSVG path[data-muler-compact-sel="1"]');
    let pathBox = null;
    try { const b = path.getBBox(); pathBox = { w: b.width, h: b.height }; } catch (e) { pathBox = null; }
    return {
      hasComp: !!c,
      hasRect: !!(c && c.rectEl),
      hasPath: !!path,
      pathBox,
      atomBox: c ? c.atomBox : null
    };
  });
  check(methPaint.hasComp, "methanal compact label missing");
  check(methPaint.hasPath, "methanal carbon-only selection must paint the C path (backplate optional), got " + JSON.stringify(methPaint));
  if (methPaint.hasPath && methPaint.atomBox && methPaint.pathBox) {
    check(methPaint.pathBox.w < methPaint.atomBox.w + 40,
      "methanal C path should cover the glyph, got " + JSON.stringify(methPaint.pathBox));
  }
  // Clean slate, then the natural flow: one click on HCHO = exact.
  await p.evaluate(() => { fMulerSelectClear(); fMulerSelectRepaint(); fUpdateSVG(); });
  await p.waitForTimeout(300);
  const mpt = await pointForComp();
  await p.mouse.click(mpt[0], mpt[1]);
  await p.waitForTimeout(700);
  const mDone = await state();
  check(/Σωστ|Correct/.test(mDone.verdict), "single-carbon methanal main chain should be exact");

  // CN is carbon-anchored too; the remaining methyl carbon completes it.
  await open("ethanenitrile");
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(600);
  const cpt = await pointForComp();
  const cPick = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    return fMulerSelectPick(c.box.x + c.box.w / 2, c.box.y + c.box.h / 2);
  });
  check(cPick && cPick.kind === "atom" && cPick.atom === 2, "CN should resolve to nitrile carbon atom 2");
  await p.mouse.click(cpt[0], cpt[1]);
  await p.waitForTimeout(500);
  const methyl = await pointForAtom(0);
  if (methyl) {
    await p.mouse.click(methyl[0], methyl[1]);
    await p.waitForTimeout(700);
  }
  const cDone = await state();
  check(/Σωστ|Correct/.test(cDone.verdict), "CN main-chain picks should complete exactly");

  // NO2 is N-anchored: main-chain purpose must not turn it into N-only.
  await open("nitroethane");
  await p.evaluate(() => document.getElementById("comp5").click());
  await p.waitForTimeout(600);
  const npt = await pointForComp();
  check(!!npt, "nitro compact label missing");
  const nitroPick = await p.evaluate(() => {
    const c = fMulerSelectCompacted()[0];
    return { pick: fMulerSelectPick(c.box.x + c.box.w / 2, c.box.y + c.box.h / 2), comp: c };
  });
  check(nitroPick.pick && nitroPick.pick.kind === "fragment", "NO2 must keep fragment hit semantics");
  check(nitroPick.comp && String(nitroPick.comp.symbol).toUpperCase() !== "C", "NO2 anchor must not be carbon");
  if (npt) {
    await p.mouse.click(npt[0], npt[1]);
    await p.waitForTimeout(700);
    const nitro = await state();
    check(nitro.atoms.length > 1, "NO2 main-chain click should keep the whole fragment");
  }

  console.log(JSON.stringify({ free, armed, hover, exact, failures, errs }, null, 1));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL", e); process.exit(1); });
