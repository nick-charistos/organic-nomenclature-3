const { chromium } = require("playwright-core");
// probe-shift: shift-accumulate on ethene, now hard-fail + CTM-derived 2nd pick.
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
  p.on("pageerror", (e) => errs.push(String(e.message).slice(0, 120)));
  await p.goto(BASE + "/mulermoc-nom-56.html?mol=ethene", { waitUntil: "load", timeout: 60000 });
  try {
    await p.waitForFunction(() => {
      try { return !!document.querySelector("#jsmeNomeclatureSVG svg") && typeof fMulerSelectLineGroups === "function" && !!window.MulerUserSelection; }
      catch (e) { return false; }
    }, { timeout: 30000 });
  } catch (e) { failures.push("ready timeout"); }
  await p.waitForTimeout(800);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(400);
  // select bond via direct pick (midpoint of first line)
  const r = await p.evaluate(() => {
    try {
      const G = fMulerSelectLineGroups();
      const L = G[0].lines[0];
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint((L.x1 + L.x2) / 2, (L.y1 + L.y2) / 2).matrixTransform(g.getScreenCTM());
      return { x: q.x, y: q.y, bondIdx: G[0].bond };
    } catch (e) { return { ERR: String(e).slice(0, 100) }; }
  });
  check(!r.ERR && r.x, "no bond target, got " + JSON.stringify(r));
  if (!r.ERR) await p.mouse.click(r.x, r.y);
  await p.waitForTimeout(500);
  const afterFirst = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { b: s.bonds2D || [], a: s.atoms2D || [] }; } catch (e) { return {}; } });
  check(((afterFirst.b || []).length + (afterFirst.a || []).length) > 0, "first bond click should select, got " + JSON.stringify(afterFirst));
  await p.keyboard.down("Shift");
  // Second pick: a different bond group if present, else a second anchor — CTM-derived.
  const r2 = await p.evaluate(() => {
    try {
      const G = (typeof fMulerSelectLineGroups === "function") ? fMulerSelectLineGroups() : null;
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      let sx = null, sy = null;
      if (G && G.length > 1) {
        const L = G[1].lines[0];
        sx = (L.x1 + L.x2) / 2; sy = (L.y1 + L.y2) / 2;
      } else {
        const A = (typeof fMulerSelectAnchors === "function") ? fMulerSelectAnchors() : [];
        if (A && A.length > 1) { sx = A[1].x; sy = A[1].y; }
        else if (A && A.length) { sx = A[0].x + 200; sy = A[0].y; }
      }
      if (sx === null) return null;
      const q = new DOMPoint(sx, sy).matrixTransform(g.getScreenCTM());
      return [q.x, q.y];
    } catch (e) { return null; }
  });
  check(!!r2, "no shift target");
  if (r2) await p.mouse.click(r2[0], r2[1]);
  await p.waitForTimeout(500);
  await p.keyboard.up("Shift");
  const st = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D, b: s.bonds2D, g: s.groups, shiftSeen: window.__mulerSelShift }; } catch (e) { return {}; } });
  const total = ((st.a || []).length + (st.b || []).length);
  check(total >= 2, "shift-click should accumulate (>=2 picks), got " + JSON.stringify(st));
  console.log("STATE " + JSON.stringify(st));
  console.log("FAILURES " + JSON.stringify(failures));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
