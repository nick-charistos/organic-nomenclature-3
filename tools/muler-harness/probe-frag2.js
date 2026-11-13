const { chromium } = require("playwright-core");
// probe-frag2: compacted-label (COOH) whole-fragment pick, hard-fail + CTM clicks.
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
  await p.goto(BASE + "/mulermoc-nom-56.html?mol=butanoic_acid", { waitUntil: "load", timeout: 60000 });
  try {
    await p.waitForFunction(() => {
      try { return !!document.querySelector("#jsmeNomeclatureSVG svg") && typeof fMulerSelectCompacted === "function" && !!window.MulerUserSelection; }
      catch (e) { return false; }
    }, { timeout: 30000 });
  } catch (e) { failures.push("ready timeout"); }
  await p.waitForTimeout(800);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  async function compactCenter() {
    return await p.evaluate(() => {
      try {
        const C = (typeof fMulerSelectCompacted === "function") ? fMulerSelectCompacted() : null;
        if (!C || !C.length) return null;
        const B = (typeof fMulerSelectCompactBoxes === "function") ? fMulerSelectCompactBoxes(C[0]) : null;
        const bx = B && (B.textBox || B.box) ? (B.textBox || B.box) : null;
        if (!bx) return null;
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const q = new DOMPoint(bx.x + bx.w / 2, bx.y + bx.h / 2).matrixTransform(g.getScreenCTM());
        return [Math.round(q.x), Math.round(q.y)];
      } catch (e) { return null; }
    });
  }
  const sc = await compactCenter();
  check(!!sc, "no compacted center to click");
  if (sc) await p.mouse.click(sc[0], sc[1]);
  await p.waitForTimeout(800);
  try { await p.screenshot({ path: "acid-frag2.png", clip: { x: 340, y: 100, width: 680, height: 360 } }); } catch (e) {}
  const s1 = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], g: (s.groups || []).map((x) => x.members) }; } catch (e) { return {}; } });
  check((s1.a || []).length > 1, "free compacted click should select the whole fragment, got " + JSON.stringify(s1));
  const sc2 = await compactCenter();
  if (sc2) await p.mouse.click(sc2[0], sc2[1]);
  await p.waitForTimeout(800);
  const s2 = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [] }; } catch (e) { return {}; } });
  check((s2.a || []).length === 0, "re-click should toggle-clear the fragment, got " + JSON.stringify(s2));
  console.log("AFTER-CLICK:" + JSON.stringify(s1));
  console.log("AFTER-RECLICK:" + JSON.stringify(s2));
  console.log("FAILURES:" + JSON.stringify(failures));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
