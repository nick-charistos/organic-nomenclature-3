const { chromium } = require("playwright-core");
// probe-final: atom pick -> hover -> empty-clear -> mode-invalidate. Hard-fail.
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
  await p.goto(BASE + "/mulermoc-nom-56.html?mol=sec_butyl_ethanoate", { waitUntil: "load", timeout: 60000 });
  try {
    await p.waitForFunction(() => {
      try { return !!document.querySelector("#jsmeNomeclatureSVG svg") && typeof fMulerSelectAnchors === "function" && !!window.MulerUserSelection; }
      catch (e) { return false; }
    }, { timeout: 30000 });
  } catch (e) { failures.push("ready timeout"); }
  await p.waitForTimeout(800);
  await p.evaluate(() => { try { document.getElementById("selectAtomsBtn").click(); } catch (e) {} });
  await p.waitForTimeout(300);
  // click first atom label center (CTM-derived)
  await p.evaluate(() => {
    try {
      const A = fMulerSelectAnchors();
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const q = new DOMPoint(A[0].x, A[0].y).matrixTransform(g.getScreenCTM());
      window.__t = [q.x, q.y];
    } catch (e) {}
  });
  await p.waitForTimeout(200);
  const t = await p.evaluate(() => window.__t);
  check(!!t, "no anchor screen point");
  if (t) await p.mouse.click(t[0], t[1]);
  await p.waitForTimeout(800);
  try {
    const clip = await p.evaluate(() => {
      try {
        const A = fMulerSelectAnchors();
        const svg = document.querySelector("#jsmeNomeclatureSVG svg");
        const g = svg.getElementsByTagName("g")[0];
        const q = new DOMPoint(A[0].x, A[0].y).matrixTransform(g.getScreenCTM());
        return { x: Math.max(0, q.x - 340), y: Math.max(0, q.y - 160), width: 680, height: 320 };
      } catch (e) { return { x: 340, y: 140, width: 680, height: 320 }; }
    });
    await p.screenshot({ path: "sel-atom.png", clip });
  } catch (e) {}
  const s1 = await p.evaluate(() => {
    const s = window.MulerUserSelection || {};
    let fill = null;
    try {
      const rm = fGetRenderedAtomRectMap(true, (typeof mode2D !== "undefined" && mode2D === "expanded"));
      const a = ((s.atoms2D || [])[0] || 0) - 1;
      const el = rm ? rm[a] : null;
      const nd = el && el.node ? el.node : null;
      fill = nd ? nd.getAttribute("fill") : null;
    } catch (e) {}
    return { a: s.atoms2D || [], fill, wrapped: !!window.__mulerBgWrapped, seq: !!document.getElementById("mulerSelNum0") };
  });
  check(s1.a.length === 1, "atom pick should select exactly one, got " + JSON.stringify(s1));
  check(!!s1.wrapped, "bg channel wrapper should be installed");
  check(!!s1.seq, "sequence badge mulerSelNum0 should render");
  // hover preview: move back over the picked label, ring should appear
  if (t) await p.mouse.move(t[0], t[1]);
  await p.waitForTimeout(500);
  const hov = await p.evaluate(() => { const l = document.getElementById("mulerHoverRing"); return { ring: !!l, kids: l ? l.querySelectorAll("*").length : 0 }; });
  check(!!hov.ring, "hover ring should appear on picked label");
  // click empty area: derive an off-molecule point from the SVG viewBox, not a hard coord
  await p.evaluate(() => {
    try {
      const svg = document.querySelector("#jsmeNomeclatureSVG svg");
      const g = svg.getElementsByTagName("g")[0];
      const vb = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
      const ex = vb ? vb.x + 40 : 300, ey = vb ? vb.y + vb.height - 40 : 4600;
      const q = new DOMPoint(ex, ey).matrixTransform(g.getScreenCTM());
      window.__t = [q.x, q.y];
    } catch (e) {}
  });
  const t2 = await p.evaluate(() => window.__t);
  if (t2) await p.mouse.click(t2[0], t2[1]);
  await p.waitForTimeout(800);
  const s2 = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], wrapped: !!window.__mulerBgWrapped }; } catch (e) { return {}; } });
  check((s2.a || []).length === 0, "empty-canvas click should clear, got " + JSON.stringify(s2));
  // switch mode -> should invalidate
  await p.evaluate(() => { try { const o = Array.from(document.querySelectorAll("#radio2DMode .mode2DOption")).find((x) => /ανεπτυγ/i.test(x.textContent || "")); if (o) o.click(); } catch (e) {} });
  await p.waitForTimeout(2500);
  const s3 = await p.evaluate(() => { try { const s = window.MulerUserSelection || {}; return { a: s.atoms2D || [], mode: (typeof mode2D !== "undefined" ? mode2D : "?"), compAtom: window.__mulerCompAtomArg, compBond: window.__mulerCompBondArg }; } catch (e) { return {}; } });
  check((s3.a || []).length === 0, "mode switch should drop contents, got " + JSON.stringify(s3));
  console.log(JSON.stringify({ s1, hov, s2, s3, failures }, null, 1));
  console.log("PAGEERRORS:" + JSON.stringify(errs));
  await b.close();
  if (failures.length || errs.length) process.exitCode = 1;
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
