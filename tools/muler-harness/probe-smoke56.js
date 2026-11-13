const { chromium } = require("playwright-core");
// v56 smoke: load + button + picks + mode-invalidate. Hard-fail on any miss.
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.MULER_BASE || "http://localhost:8901";
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };
(async () => {
  const launchOpts = {};
  try { const fs = require("fs"); if (fs.existsSync(CHROME)) launchOpts.executablePath = CHROME; } catch (e) {}
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 150)));
  const out = {};
  async function waitReady() {
    try {
      await p.waitForFunction(() => {
        try {
          return !!document.querySelector("#jsmeNomeclatureSVG svg") &&
            typeof fMulerSelectAnchors === "function" &&
            !!window.MulerUserSelection;
        } catch (e) { return false; }
      }, { timeout: 30000 });
    } catch (e) { failures.push("app-ready timeout: " + String(e && e.message || e).slice(0, 120)); }
    await p.waitForTimeout(800);
  }
  // 1. v56 loads, button first in title bar, tooltip + icon present
  await p.goto(BASE + "/mulermoc-nom-56.html?lang=en", { waitUntil: "load", timeout: 60000 });
  await waitReady();
  out.button = await p.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("#viewerSettingsBtnDiv .settingsBtn")).map((x) => x.id);
    const sb = document.getElementById("selectAtomsBtn");
    return { first: btns[0], tip: sb ? sb.getAttribute("data-tooltip") : null, hasIcon: !!(sb && sb.innerHTML.indexOf("svg") >= 0), cls: sb ? sb.className : null };
  });
  check(out.button.first === "selectAtomsBtn", "select button should be first, got " + JSON.stringify(out.button));
  check(!!out.button.tip, "select button needs data-tooltip");
  check(!!out.button.hasIcon, "select button needs inline svg icon");
  // 2. condensed pick works, halo rendered under content (CTM-derived, no hard coords)
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => {
    try {
      const G = (typeof fMulerSelectLineGroups === "function") ? fMulerSelectLineGroups() : null;
      if (!G || !G.length) return null;
      const L = G[0].lines[0];
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint((L.x1 + L.x2) / 2, (L.y1 + L.y2) / 2).matrixTransform(g.getScreenCTM());
      return [Math.round(q.x), Math.round(q.y)];
    } catch (e) { return null; }
  });
  check(!!r, "no bond midpoint for smoke pick");
  if (r) {
    await p.mouse.click(r[0], r[1]);
    await p.waitForTimeout(500);
  }
  out.afterBond = await p.evaluate(() => {
    try {
      const s = window.MulerUserSelection || { atoms2D: [], bonds2D: [] };
      return { s: (s.atoms2D || []).concat(s.bonds2D || []), halo: !!document.querySelector("#jsmeNomeclatureSVG path[data-muler-sel], #jsmeNomeclatureSVG .mulerSelHalo") };
    } catch (e) { return { err: 1 }; }
  });
  check(out.afterBond.s && out.afterBond.s.length > 0, "condensed bond pick should select, got " + JSON.stringify(out.afterBond));
  // 3. compacted pick via geometry center (no hardcoded screen coords)
  await p.goto(BASE + "/mulermoc-nom-56.html?mol=butanoic_acid", { waitUntil: "load", timeout: 60000 });
  await waitReady();
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  const comp = await p.evaluate(() => { const c = (typeof fMulerSelectCompacted === "function") ? fMulerSelectCompacted() : null; return c && c[0] ? { n: c.length, tip: c[0].tip } : { n: (c || []).length }; });
  if (comp && comp.n) {
    const sc = await p.evaluate(() => {
      try {
        const C = fMulerSelectCompacted();
        const c0 = C[0];
        const B = (typeof fMulerSelectCompactBoxes === "function") ? fMulerSelectCompactBoxes(c0) : null;
        const bx = B && (B.textBox || B.box) ? (B.textBox || B.box) : null;
        if (!bx) return null;
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const q = new DOMPoint(bx.x + bx.w / 2, bx.y + bx.h / 2).matrixTransform(g.getScreenCTM());
        return [Math.round(q.x), Math.round(q.y)];
      } catch (e) { return null; }
    });
    check(!!sc, "no compacted center for smoke pick");
    if (sc) { await p.mouse.click(sc[0], sc[1]); await p.waitForTimeout(500); }
  }
  out.compact = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], halo: !!document.querySelector("#jsmeNomeclatureSVG path[data-muler-sel], #jsmeNomeclatureSVG .mulerSelHalo") }; } catch (e) { return {}; } });
  check(out.compact.a && out.compact.a.length > 0, "compacted pick should select, got " + JSON.stringify(out.compact));
  // 4. mode switch invalidates
  await p.evaluate(() => { try { const o = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption")).find((x) => /ανεπτυγ/i.test(x.textContent || "")); if (o) o.click(); } catch (e) {} });
  await p.waitForTimeout(2500);
  out.afterMode = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], haloGone: !document.querySelector("#jsmeNomeclatureSVG path[data-muler-sel], #jsmeNomeclatureSVG .mulerSelHalo") }; } catch (e) { return {}; } });
  check(out.afterMode.a && out.afterMode.a.length === 0, "mode switch should drop contents, got " + JSON.stringify(out.afterMode));
  console.log(JSON.stringify({ button: out.button, afterBond: out.afterBond, compact: out.compact, afterMode: out.afterMode, failures }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
