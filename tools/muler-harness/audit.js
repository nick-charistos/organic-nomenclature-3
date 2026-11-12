// Tooltip clip audit v2: authored-rule placement + canvas-measured widths.
const { chromium } = require("playwright-core");
(async () => {
  let [port, query, vw, out] = [process.argv[2] || "8901", process.argv[3] || "", process.argv[4] || "1500", process.argv[5] || "audit"];
  if (query === "-") query = "";
  const browser = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
  const page = await browser.newPage({ viewport: { width: parseInt(vw, 10), height: 900 } });
  await page.goto(`http://localhost:${port}/mulermoc-nom-55.html${query}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(14000);
  await page.evaluate((c) => { try { window.COLLAPSE = !!c; } catch (e) {} }, process.env.COLLAPSE === "1");
  // open the scenario bar + expand first step row so drawer controls are hoverable
  await page.evaluate(() => {
    try {
      const tab = document.getElementById("scenarioAuthorTab");
      if (tab) tab.click();
    } catch (e) {}
  });
  await page.waitForTimeout(1500);
  // open the drawer (Steps toggle) + expand the first step row via real clicks
  await page.evaluate(() => {
    try {
      const list = document.querySelector("#scenarioAuthorBar .scenarioPanel .scList");
      const drawer = document.querySelector("#scenarioAuthorBar .scenarioDrawer");
      if (list && drawer && !drawer.classList.contains("open")) list.click();
    } catch (e) {}
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    try {
      const num = document.querySelector("#scenarioAuthorBar .scenarioDrawer .srow.collapsed .scStepNumberWrap");
      if (num) num.click();
    } catch (e) {}
  });
  await page.waitForTimeout(1200);
  // open the first align dropdown (right-opening option bubbles) and, on
  // demand, collapse the menu rail (edge-anchored collapse tooltip)
  await page.evaluate(() => {
    try {
      const ab = document.querySelector("#scenarioAuthorBar .scenarioDrawer .scNoteAlignBtn");
      if (ab) ab.click();
    } catch (e) {}
    try {
      if ("COLLAPSE" in window && window.COLLAPSE) {
        const mc = document.getElementById("menuCollapseBtn");
        if (mc) mc.click();
      }
    } catch (e) {}
  });
  await page.waitForTimeout(800);
  const data = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    // authored geometry: last matching [data-tooltip] rule wins per property
    const sheets = [];
    for (const sh of document.styleSheets) {
      let rules = null;
      try { rules = sh.cssRules; } catch (e) { continue; }
      if (!rules) continue;
      for (const r of rules) {
        if (r.selectorText && r.selectorText.includes("[data-tooltip]") && (r.selectorText.includes("::after") || r.selectorText.includes("::before"))) sheets.push(r);
      }
    }
    const geoFor = (el, pseudo) => {
      const g = {};
      for (const r of sheets) {
        if (!r.selectorText.includes(pseudo)) continue;
        const sels = r.selectorText.split(",");
        for (let s of sels) {
          s = s.trim().replace(/::(after|before)$/, "");
          let ok = false;
          try { ok = el.matches(s); } catch (e) { ok = false; }
          if (ok) { for (const p of ["top", "left", "right", "bottom", "transform", "width", "max-width", "white-space", "position"]) { const v = r.style.getPropertyValue(p); if (v) g[p] = v; } break; }
        }
      }
      return g;
    };
    const res = [];
    const meas = document.createElement("canvas").getContext("2d");
    for (const el of document.querySelectorAll("[data-tooltip]")) {
      try { el.scrollIntoView({ block: "nearest", inline: "nearest" }); } catch (e) {}
      await wait(25);
      const r = el.getBoundingClientRect();
      const tag = el.tagName;
      const cls = el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className);
      const tip = el.getAttribute("data-tooltip") || "";
      if (r.width === 0 && r.height === 0) { res.push({ skip: true, reason: "hidden", cls, id: el.id || null, tip: tip.slice(0, 50) }); continue; }
      const cs = getComputedStyle(el, "::after");
      if (!cs || cs.content === "none" || cs.content === "normal") { res.push({ skip: true, reason: "no-bubble", cls, id: el.id || null, tip: tip.slice(0, 60) }); continue; }
      let font = cs.font; try { meas.font = font; } catch (e) {}
      const tw = meas.measureText(tip).width;
      const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      const g = geoFor(el, "::after");
      const nowrap = (g["white-space"] || cs.whiteSpace) === "nowrap";
      let bw = tw + pad + 2;
      const mwRaw = g["max-width"] || cs.maxWidth;
      if (!nowrap && mwRaw && mwRaw !== "none") { const m = parseFloat(mwRaw); if (m > 0 && bw > m) bw = m; }
      const btn = { x: r.left, y: r.top, w: r.width, h: r.height };
      const px = (v) => v && v.trim().endsWith("px") ? parseFloat(v) : null;
      let bx = null, by = null, anchor = "unknown:" + JSON.stringify({ top: g.top, left: g.left, right: g.right, bottom: g.bottom, transform: g.transform });
      const bh = 30;
      if (g.top && g.top.includes("calc(100%")) {
        by = btn.y + btn.h + 10;
        if (g.left === "50%" || (g.left && g.left.includes("50%"))) { bx = btn.x + btn.w / 2 - bw / 2; anchor = "below-center"; }
        else if (px(g.left) === 0) { bx = btn.x; anchor = "below-left"; }
        else if (px(g.right) === 0) { bx = btn.x + btn.w - bw; anchor = "below-right"; }
        else if (px(g.left) !== null) { bx = btn.x + px(g.left); anchor = "below-left-off"; }
        else if (px(g.right) !== null) { bx = btn.x + btn.w - px(g.right) - bw; anchor = "below-right-off"; }
      } else if (g.top === "50%") {
        by = btn.y + btn.h / 2 - bh / 2;
        if (g.right && g.right.includes("calc(100%")) { bx = btn.x - 10 - bw; anchor = "left-of"; }
        else if (g.left && g.left.includes("calc(100%")) { bx = btn.x + btn.w + 8; anchor = "right-of"; }
        else if (px(g.right) !== null) { bx = btn.x + btn.w - px(g.right) - bw; anchor = "mid-right"; }
      } else if (g.bottom && g.bottom.includes("calc(100%")) {
        by = btn.y - 10 - bh;
        if (g.left === "50%") { bx = btn.x + btn.w / 2 - bw / 2; anchor = "above-center"; }
        else if (px(g.left) === 0) { bx = btn.x; anchor = "above-left"; }
        else if (px(g.right) === 0) { bx = btn.x + btn.w - bw; anchor = "above-right"; }
      }
      const clips = [];
      let p = el.parentElement;
      while (p && p !== document.body) {
        const c = getComputedStyle(p);
        if (c.overflowX !== "visible" || c.overflowY !== "visible") { const pr = p.getBoundingClientRect(); clips.push({ sel: (p.id ? "#" + p.id : (p.className && typeof p.className === "string" && p.className ? "." + p.className.split(" ")[0] : p.tagName)), x: Math.round(pr.left), y: Math.round(pr.top), w: Math.round(pr.width), h: Math.round(pr.height) }); }
        p = p.parentElement;
      }
      res.push({ cls, id: el.id || null, tip: tip.slice(0, 70), btn: { x: Math.round(btn.x), y: Math.round(btn.y), w: Math.round(btn.w), h: Math.round(btn.h) }, bubble: bx === null ? null : { x: Math.round(bx), y: Math.round(by), w: Math.round(bw), h: bh }, anchor, clips: clips.slice(0, 4) });
    }
    return { vw: window.innerWidth, items: res };
  });
  // phase 2: open the big note editor modal, measure its toolbar bubbles
  const modal = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      const ab = document.querySelector("#scenarioAuthorBar .scenarioDrawer .srow:not(.collapsed) .scNoteAlignBtn")
        || document.querySelector("#scenarioAuthorBar .scenarioDrawer .scNoteAlignBtn");
      if (ab) ab.click();
    } catch (e) {}
    await wait(600);
    const menuDbg = Array.from(document.querySelectorAll(".scTextPosMenu")).map((m) => ({ open: m.classList.contains("open"), r: (() => { const b = m.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; })() }));
    try {
      const ex = document.querySelector("#scenarioAuthorBar .scenarioDrawer .srow:not(.collapsed) .scNoteExpandBtn");
      if (ex) ex.click();
    } catch (e) {}
    await wait(1200);
    const res = [];
    const meas = document.createElement("canvas").getContext("2d");
    const sheets = [];
    for (const sh of document.styleSheets) {
      let rules = null;
      try { rules = sh.cssRules; } catch (e) { continue; }
      if (!rules) continue;
      for (const r of rules) {
        if (r.selectorText && r.selectorText.includes("[data-tooltip]") && (r.selectorText.includes("::after") || r.selectorText.includes("::before"))) sheets.push(r);
      }
    }
    const geoFor = (el) => {
      const g = {};
      for (const r of sheets) {
        if (!r.selectorText.includes("::after")) continue;
        const sels = r.selectorText.split(",");
        for (let s of sels) {
          s = s.trim().replace(/::(after|before)$/, "");
          let ok = false;
          try { ok = el.matches(s); } catch (e) { ok = false; }
          if (ok) { for (const p of ["top", "left", "right", "bottom", "transform", "width", "max-width", "white-space", "position"]) { const v = r.style.getPropertyValue(p); if (v) g[p] = v; } break; }
        }
      }
      return g;
    };
    const scope = document.querySelector(".scNoteEditorModal, .scNoteModal, #scNoteBigEditor");
    const els = Array.from((scope || document).querySelectorAll(".scNoteEditorToolbar [data-tooltip], .scTextPosMenu.open .scTextPosOpt[data-tooltip]"));
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const cs = getComputedStyle(el, "::after");
      if (!cs || cs.content === "none" || cs.content === "normal") { res.push({ skip: true, reason: "no-bubble-modal", cls: String(el.className), id: el.id || null, tip: (el.getAttribute("data-tooltip") || "").slice(0, 60) }); continue; }
      const tip = el.getAttribute("data-tooltip") || "";
      let font = cs.font; try { meas.font = font; } catch (e) {}
      const tw = meas.measureText(tip).width;
      const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      const g = geoFor(el);
      const nowrap = (g["white-space"] || cs.whiteSpace) === "nowrap";
      let bw = tw + pad + 2;
      const mwRaw = g["max-width"] || cs.maxWidth;
      if (!nowrap && mwRaw && mwRaw !== "none") { const m = parseFloat(mwRaw); if (m > 0 && bw > m) bw = m; }
      const top = g.top || "", left = g.left || "", right = g.right || "", bottom = g.bottom || "";
      const rw = r.width, rh = r.height;
      let bx = null, by = null, anchor = "modal-unknown:" + JSON.stringify({ top, left, right, bottom });
      if (top.includes("calc(100%")) { by = r.y + rh + 10; if (left === "50%" || left.includes("50%")) { bx = r.x + rw / 2 - bw / 2; anchor = "modal-below-center"; } else if (parseFloat(left) === 0) { bx = r.x; anchor = "modal-below-left"; } else if (parseFloat(right) === 0) { bx = r.x + rw - bw; anchor = "modal-below-right"; } }
      else if (top === "50%") { by = r.y + rh / 2 - 15; if (String(left).includes("calc(100%")) { bx = r.x + rw + 8; anchor = "modal-right-of"; } }
      const clips = [];
      let p = el.parentElement;
      while (p && p !== document.body) { const c = getComputedStyle(p); if (c.overflowX !== "visible" || c.overflowY !== "visible") { const pr = p.getBoundingClientRect(); clips.push({ sel: (p.id ? "#" + p.id : "." + String(p.className).split(" ")[0]), x: Math.round(pr.left), y: Math.round(pr.top), w: Math.round(pr.width), h: Math.round(pr.height) }); } p = p.parentElement; }
      res.push({ cls: "MODAL " + String(el.className), id: el.id || null, tip: tip.slice(0, 70), btn: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, bubble: bx === null ? null : { x: Math.round(bx), y: Math.round(by), w: Math.round(bw), h: 30 }, anchor, clips: clips.slice(0, 4), modal: true });
    }
    return { vw: window.innerWidth, items: res, menus: (typeof menuDbg !== "undefined" ? menuDbg : []) };
  });
  data.items = data.items.concat(modal.items);
  console.log("MENUS " + JSON.stringify(modal.menus));
  const out2 = data.items.map((it) => {
    if (it.skip) return it;
    if (!it.bubble) return { ...it, verdict: "UNKNOWN-PLACE" };
    // button itself must be hoverable: center inside viewport + all clip ancestors
    const cx = it.btn.x + it.btn.w / 2, cy = it.btn.y + it.btn.h / 2;
    if (cx < 0 || cx > data.vw || cy < 0 || cy > 920) return { ...it, verdict: "SKIP", skip: true, reason: "btn-offscreen" };
    for (const c of it.clips) {
      if (cx < c.x || cx > c.x + c.w || cy < c.y || cy > c.y + c.h) return { ...it, verdict: "SKIP", skip: true, reason: "btn-clipped-by-" + c.sel };
    }
    const spills = [];
    const b = it.bubble;
    if (b.x < 0) spills.push(`viewport-left ${b.x}px`);
    if (b.x + b.w > data.vw) spills.push(`viewport-right ${b.x + b.w - data.vw}px`);
    for (const c of it.clips) {
      if (b.x < c.x) spills.push(`${c.sel}-left ${Math.round(b.x - c.x)}px`);
      if (b.x + b.w > c.x + c.w) spills.push(`${c.sel}-right ${Math.round(b.x + b.w - c.x - c.w)}px`);
      if (b.y < c.y) spills.push(`${c.sel}-top ${Math.round(b.y - c.y)}px`);
      if (b.y + b.h > c.y + c.h) spills.push(`${c.sel}-bottom ${Math.round(b.y + b.h - c.y - c.h)}px`);
    }
    return { ...it, verdict: spills.length ? "SPILL" : "ok", spill: spills };
  });
  const bad = out2.filter((v) => v.verdict !== "ok" && !v.skip);
  const nob = out2.filter((v) => v.skip);
  console.log(`TOTAL=${out2.length} CHECKED=${out2.length - nob.length} SPILL_OR_UNKNOWN=${bad.length} SKIPPED=${nob.length}`);
  const byClass = {};
  for (const v of bad) { const k = (v.cls || "?") + " :: " + (v.id || "") + " :: " + v.anchor + " :: " + (v.verdict === "UNKNOWN-PLACE" ? "UNKNOWN" : v.spill.join("|")); byClass[k] = (byClass[k] || 0) + 1; }
  for (const k of Object.keys(byClass)) console.log(`BAD x${byClass[k]} ${k}`);
  const noTypes = {};
  for (const v of nob) { const k = v.reason + " :: " + (v.cls || "?") + " :: " + (v.tip || "").slice(0, 40); noTypes[k] = (noTypes[k] || 0) + 1; }
  console.log("---SKIPPED---");
  for (const k of Object.keys(noTypes)) console.log(`SKIP x${noTypes[k]} ${k}`);
  require("fs").writeFileSync(out + ".json", JSON.stringify({ vw: data.vw, verdicts: out2 }, null, 1));
  await browser.close();
})().catch((e) => { console.error("AUDIT-FAIL " + e.message); process.exit(1); });
