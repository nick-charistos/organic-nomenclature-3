// contact-sheet.js — renders every stored 2D form (v59 data) into SVG tiles and
// screenshots them in pages, so the owner can visually review the whole set.
// Output: %TEMP%/opencode/v59-contact/contact.html + page-NN.png
// Read-only against the app; uses only the data file and the harness build.

const vm = require("vm");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { chromium } = require("playwright-core");

const ROOT = path.join(__dirname, "..", "..");
const DATA = path.join(ROOT, "js", "jsme-nick-nomeclature-moc2-data_59.js");
const OUT = path.join(os.tmpdir(), "v59-contact");
const PER_PAGE = 9;
const CC = 1.17;

const sandbox = { console, window: {} };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(DATA, "utf8"), sandbox, { filename: "data-59.js" });
const M = vm.runInContext("window.MOL2D", sandbox);
const NE = vm.runInContext("nameExamples", sandbox);

function parse(text) {
  const L = String(text).split(/\r?\n/);
  let ci = -1;
  for (let i = 0; i < Math.min(L.length, 8); i++) if (/V2000/.test(L[i]) && /^\s*\d+\s+\d+/.test(L[i])) { ci = i; break; }
  if (ci < 0) return null;
  const nA = +L[ci].slice(0, 3), nB = +L[ci].slice(3, 6);
  const atoms = [], bonds = [];
  for (let i = 0; i < nA; i++) {
    const x = L[ci + 1 + i] || "";
    atoms.push({ x: +x.slice(0, 10), y: +x.slice(10, 20), el: (x.slice(31, 34) || "").trim() });
  }
  for (let i = 0; i < nB; i++) {
    const p = (L[ci + 1 + nA + i] || "").trim().split(/\s+/).map(Number);
    if (p.length >= 3) bonds.push([p[0], p[1], p[2]]);
  }
  return { atoms, bonds };
}

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function tile(key, form, text, w, h) {
  const m = parse(text);
  if (!m || !m.atoms.length) return `<div class="tile empty">no data</div>`;
  const xs = m.atoms.map((a) => a.x), ys = m.atoms.map((a) => a.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const pad = 26;
  const sx = (maxX - minX) || 1, sy = (maxY - minY) || 1;
  const k = Math.min((w - 2 * pad) / sx, (h - 2 * pad) / sy);
  const px = (x) => pad + (x - minX) * k + (w - 2 * pad - sx * k) / 2;
  const py = (y) => h - pad - (y - minY) * k - (h - 2 * pad - sy * k) / 2;
  const out = [];
  // overlap / length flags
  let flags = 0;
  const bondLen = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  for (let i = 0; i < m.atoms.length; i++) {
    for (let j = i + 1; j < m.atoms.length; j++) {
      if (bondLen(m.atoms[i], m.atoms[j]) < 0.40) flags++;
    }
  }
  for (const [a, b, o] of m.bonds) {
    const A = m.atoms[a - 1], B = m.atoms[b - 1];
    if (!A || !B) continue;
    const isHBond = A.el === "H" || B.el === "H";
    if (isHBond) {
      // Grey X–H bonds, matching the app's atomColors2D.H treatment.
      out.push(`<line x1="${px(A.x)}" y1="${py(A.y)}" x2="${px(B.x)}" y2="${py(B.y)}" stroke="#aaa" stroke-width="1.2"/>`);
      continue;
    }
    const d = bondLen(A, B);
    const bad = d > CC * 1.03 || d < CC * 0.97;
    if (bad) flags++;
    const x1 = px(A.x), y1 = py(A.y), x2 = px(B.x), y2 = py(B.y);
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const col = bad ? "#d00" : "#222";
    if (o === 1) out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.6"/>`);
    else {
      const off = o === 2 ? 2.6 : 3.2;
      for (let s = -1; s <= 1; s += 2) {
        if (o === 3 && s === 0) continue;
        out.push(`<line x1="${x1 + nx * off * s}" y1="${y1 + ny * off * s}" x2="${x2 + nx * off * s}" y2="${y2 + ny * off * s}" stroke="${col}" stroke-width="1.4"/>`);
      }
      if (o === 3) out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.4"/>`);
    }
  }
  // labels: everything except carbon in skeletal; carbon shown for condensed/expanded
  for (const a of m.atoms) {
    let label = "";
    if (a.el === "C") label = (form === "skeletal") ? "" : "C";
    else label = a.el;
    if (!label) continue;
    const x = px(a.x), y = py(a.y);
    if (label === "C") {
      out.push(`<circle cx="${x}" cy="${y}" r="9" fill="#fff"/>`);
    }
    out.push(`<text x="${x}" y="${y + 4}" font-size="12" font-family="Arial" text-anchor="middle" fill="${a.el === "H" ? "#666" : "#000"}">${esc(label)}</text>`);
  }
  const badge = flags ? `<span class="flag">${flags}</span>` : "";
  return `<div class="tile${flags ? " bad" : ""}"><div class="cap">${esc(form)}${badge}</div><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">${out.join("")}</svg></div>`;
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const keys = Object.keys(M);  const pages = [];
  let html = `<!doctype html><html><head><meta charset="utf-8"><style>
  body{margin:0;background:#faf9f5;font:12px system-ui,Arial;}
  .hdr{position:sticky;top:0;background:#fff;border-bottom:1px solid #ccc;padding:6px 10px;z-index:2}
  .mol{display:grid;grid-template-columns:150px 1fr 1fr 1fr;gap:4px;border-bottom:1px solid #e3e0d8;padding:4px 6px;align-items:stretch}
  .mname{font-weight:600;font-size:11px;overflow:hidden;display:flex;align-items:center}
  .tile{position:relative;background:#fff;border:1px solid #e3e0d8;border-radius:4px;height:150px}
  .tile.bad{border-color:#d00}
  .cap{position:absolute;top:2px;left:4px;color:#888;font-size:10px}
  .flag{color:#fff;background:#d00;border-radius:8px;padding:0 4px;margin-left:4px}
  svg{width:100%;height:100%}
  </style></head><body>`;
  let inPage = 0;
  const pageRanges = [];
  let pageStart = 0;
  keys.forEach((k, i) => {
    if (i % PER_PAGE === 0) {
      if (i > 0) pageRanges.push([pageStart, i]);
      pageStart = i;
    }
    const forms = ["condensed", "expanded", "skeletal"];
    html += `<div class="mol"><div class="mname">${esc(k)}</div>`;
    for (const f of forms) {
      const text = M[k][f];
      html += text ? tile(k, f, text, 300, 150) : `<div class="tile empty"><div class="cap">${f}</div>no data</div>`;
    }
    html += `</div>`;
  });
  pageRanges.push([pageStart, keys.length]);
  html += `</body></html>`;
  const htmlFile = path.join(OUT, "contact.html");
  fs.writeFileSync(htmlFile, html);
  fs.writeFileSync(path.join(OUT, "pages.json"), JSON.stringify(pageRanges));
  return { htmlFile, keys, pageRanges };
}

(async () => {
  const { htmlFile, keys, pageRanges } = main();
  const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const launch = {};
  try { if (fs.existsSync(CHROME)) launch.executablePath = CHROME; } catch (e) {}
  const b = await chromium.launch(launch);
  const p = await b.newPage({ viewport: { width: 1420, height: 1000 }, deviceScaleFactor: 1 });
  await p.goto("file:///" + htmlFile.replace(/\\/g, "/"), { waitUntil: "load" });
  const rects = await p.evaluate(() =>
    [...document.querySelectorAll(".mol")].map((e) => {
      const r = e.getBoundingClientRect();
      return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
    })
  );
  const outFiles = [];
  for (let i = 0; i < pageRanges.length; i++) {
    const [s, e] = pageRanges[i];
    const top = Math.max(0, rects[s].top - 2);
    const height = Math.min(rects[e - 1].bottom + 2 - top, 4000);
    const file = path.join(OUT, "page-" + String(i + 1).padStart(2, "0") + ".png");
    await p.screenshot({ path: file, fullPage: true, clip: { x: 0, y: top, width: 1420, height } });
    outFiles.push(file);
  }
  await b.close();
  console.log(JSON.stringify({ htmlFile, molecules: keys.length, pages: pageRanges.length, outFiles }, null, 1));
})().catch((e) => { console.error("FAIL " + e.message); process.exit(1); });
