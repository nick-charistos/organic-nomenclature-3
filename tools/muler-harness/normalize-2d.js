// normalize-2d.js — v59 2D data upgrade, single-skeleton design.
//
// The condensed form is the one authoritative drawing (the school form). It is
// normalized to the 1.17 / 0.78 frame, then the expanded form is DERIVED from
// it with fGenExpandedMol, so every heavy atom keeps the condensed order,
// coordinates and orientation; only explicit H is added and S-groups are
// dropped. The skeletal form keeps its own v58 zigzag order (that form is
// intentionally different) and is only rescaled/repaired.
//
// Usage:
//   node tools/muler-harness/normalize-2d.js --check   (report only)
//   node tools/muler-harness/normalize-2d.js --write   (write data_59.js)
//
// Runs from any cwd; paths resolve from the repo root.

const vm = require("vm");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const CORE_FILE = path.join(ROOT, "js", "mulermoc-nom-core-59.js");
const SRC_DATA = path.join(ROOT, "js", "jsme-nick-nomeclature-moc2-data_58.js");
const OUT_DATA = path.join(ROOT, "js", "jsme-nick-nomeclature-moc2-data_59.js");
const ALKANES_FILE = path.join(__dirname, "data", "namelecule-alkanes-v1.json");
const REPORT_FILE = path.join(__dirname, "2d-upgrade-report.json");

const CC = 1.17;
const CH = 0.78;
const WRITE = process.argv.indexOf("--write") >= 0;

// ── sandbox ────────────────────────────────────────────────────────────────

function loadCore() {
  const sandbox = { console, window: {} };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(CORE_FILE, "utf8"), sandbox, { filename: "core-59.js" });
  vm.runInContext(fs.readFileSync(SRC_DATA, "utf8"), sandbox, { filename: "data-58.js" });
  const g = (expr) => vm.runInContext(expr, sandbox);
  return {
    parse: g("fParseMolV2000"),
    write: g("fWriteMolV2000"),
    lin: g("fLinearizeMol"),
    zig: g("fZigzagMol"),
    gen: g("fGenExpandedMol"),
    scaleMeta: g("fScaleMolMeta"),
    dropS: g("fDropMolSGroups"),
    valence: g("fMolEffectiveValence"),
    MOL: g("window.MOL2D"),
    NE: g("nameExamples"),
  };
}

// ── geometry helpers ───────────────────────────────────────────────────────

function heavyBonds(m) {
  const out = [];
  for (let i = 0; i < m.bonds.length; i++) {
    const b = m.bonds[i];
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B || A.el === "H" || B.el === "H") continue;
    out.push({ i, a: b[0], b: b[1], d: Math.hypot(A.x - B.x, A.y - B.y) });
  }
  return out;
}

function statsOf(m) {
  const ds = heavyBonds(m).map((x) => x.d).sort((x, y) => x - y);
  if (!ds.length) return { n: 0, med: 0, min: 0, max: 0 };
  return { n: ds.length, med: ds[Math.floor(ds.length / 2)], min: ds[0], max: ds[ds.length - 1] };
}

function hStats(m) {
  const ds = [];
  for (const b of m.bonds) {
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B) continue;
    if (A.el !== "H" && B.el !== "H") continue;
    ds.push(Math.hypot(A.x - B.x, A.y - B.y));
  }
  ds.sort((x, y) => x - y);
  return { n: ds.length, min: ds.length ? ds[0] : null, max: ds.length ? ds[ds.length - 1] : null };
}

function scaleMol(C, m, s) {
  for (const a of m.atoms) { a.x *= s; a.y *= s; }
  m.mLines = C.scaleMeta(m.mLines, s);
}

function normalizeH(m, target) {
  const parent = {};
  for (const b of m.bonds) {
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B) continue;
    if (A.el === "H" && B.el !== "H") parent[b[0]] = b[1];
    else if (B.el === "H" && A.el !== "H") parent[b[1]] = b[0];
  }
  for (const k of Object.keys(parent)) {
    const h = m.atoms[k - 1], p = m.atoms[parent[k] - 1];
    const d = Math.hypot(h.x - p.x, h.y - p.y);
    if (!(d > 1e-9)) continue;
    h.x = p.x + ((h.x - p.x) / d) * target;
    h.y = p.y + ((h.y - p.y) / d) * target;
  }
}

function adjAll(m) {
  const adj = Array.from({ length: m.atoms.length + 1 }, () => []);
  for (const b of m.bonds) {
    if (adj[b[0]] && adj[b[1]]) { adj[b[0]].push(b[1]); adj[b[1]].push(b[0]); }
  }
  return adj;
}

// Move a branch subtree so an out-of-frame bond lands exactly on CC. This is
// translation only: angles, orientation and branch sides are untouched.
function repairBonds(m, chain, target) {
  const adj = adjAll(m);
  const n = m.atoms.length;
  const lo = target * 0.97, hi = target * 1.03;
  const ch = new Set((Array.isArray(chain) ? chain : []).filter((x) => x >= 1 && x <= n));
  const dist = new Array(n + 1).fill(1e9);
  const q = [];
  if (ch.size) {
    for (const c of ch) { dist[c] = 0; q.push(c); }
  } else {
    for (let i = 1; i <= n; i++) {
      if (m.atoms[i - 1].el !== "H" && adj[i].length <= 1) { dist[i] = 0; q.push(i); }
    }
  }
  while (q.length) {
    const v = q.shift();
    for (const w of adj[v]) if (dist[w] > dist[v] + 1) { dist[w] = dist[v] + 1; q.push(w); }
  }
  let moved = 0;
  const skipped = [];
  for (let pass = 0; pass < 6; pass++) {
    let changed = false;
    for (const hb of heavyBonds(m)) {
      if (hb.d >= lo && hb.d <= hi) continue;
      if (ch.has(hb.a) && ch.has(hb.b)) { if (skipped.indexOf(hb.i + 1) < 0) skipped.push(hb.i + 1); continue; }
      let from = hb.a, to = hb.b;
      if (dist[to] < dist[from]) { from = hb.b; to = hb.a; }
      const seen = new Set([to]);
      const stack = [to];
      while (stack.length) {
        const v = stack.pop();
        for (const w of adj[v]) if (w !== from && !seen.has(w)) { seen.add(w); stack.push(w); }
      }
      const P = m.atoms[from - 1], Q = m.atoms[to - 1];
      const d = Math.hypot(Q.x - P.x, Q.y - P.y);
      if (!(d > 1e-9)) continue;
      const ux = (Q.x - P.x) / d, uy = (Q.y - P.y) / d;
      const dx = P.x + ux * target - Q.x, dy = P.y + uy * target - Q.y;
      let bad = false;
      for (const s of seen) {
        if (bad) break;
        const A = m.atoms[s - 1];
        const nx = A.x + dx, ny = A.y + dy;
        for (let j = 1; j <= n; j++) {
          if (seen.has(j) || j === from) continue;
          const B = m.atoms[j - 1];
          if (Math.hypot(nx - B.x, ny - B.y) < 0.55) { bad = true; break; }
        }
      }
      if (bad) { if (skipped.indexOf(hb.i + 1) < 0) skipped.push(hb.i + 1); continue; }
      for (const s of seen) { m.atoms[s - 1].x += dx; m.atoms[s - 1].y += dy; }
      moved++;
      changed = true;
    }
    if (!changed) break;
  }
  return { moved, skipped };
}

// ── school layout (branch backbones vertical) ────────────────────────────
// Rebuilds coordinates only (atom order untouched): horizontal main chain,
// every carbon branch root vertical, and inside a branch the deepest child
// continues straight so the branch backbone stays vertical. Side children go
// horizontal, alternating. Collisions are resolved by trying the other side
// before any diagonal. Used only for molecules that violate the rule.

function heavyChain(m, chain) {
  return (Array.isArray(chain) ? chain : []).filter((x) => m.atoms[x - 1] && m.atoms[x - 1].el !== "H");
}

function branchViolations(m, chain) {
  const chainArr = heavyChain(m, chain);
  const chainSet = new Set(chainArr);
  if (!chainArr.length) return [];
  const adj = adjAll(m);
  const out = [];
  for (let a = 1; a <= m.atoms.length; a++) {
    if (m.atoms[a - 1].el !== "C" || chainSet.has(a)) continue;
    const onChainNb = adj[a].find((w) => chainSet.has(w));
    if (onChainNb === undefined) continue;
    const dist = { [a]: 0 }, parent = {}, vis = new Set([onChainNb, a]);
    const q = [a];
    while (q.length) {
      const v = q.shift();
      for (const w of adj[v]) if (!vis.has(w)) { vis.add(w); parent[w] = v; dist[w] = dist[v] + 1; q.push(w); }
    }
    let far = a;
    for (const v of Object.keys(dist)) if (dist[v] > dist[far]) far = +v;
    const path = [];
    let x = far;
    while (x !== a) { path.push(x); x = parent[x]; }
    path.push(a);
    const xs = path.map((i) => m.atoms[i - 1].x);
    const dx = Math.max(...xs) - Math.min(...xs);
    if (dx > 0.6) out.push({ root: a, dx: +dx.toFixed(2), depth: dist[far] });
  }
  return out;
}

function schoolLayout(C, m, chain) {
  const CC = 1.17;
  const n = m.atoms.length;
  if (m.atoms.some((a) => a.el === "H")) return { ok: false, reason: "has-H" };
  const chainArr = heavyChain(m, chain);
  if (chainArr.length < 2) return { ok: false, reason: "chain" };
  const chainSet = new Set(chainArr);
  const adj = adjAll(m);
  const pos = new Array(n + 1).fill(null);
  const occupied = [];
  const free = (x, y) => {
    for (const o of occupied) if (Math.hypot(o.x - x, o.y - y) < CC * 0.9) return false;
    return true;
  };
  const put = (i, x, y) => { pos[i] = { x, y }; occupied.push(pos[i]); };
  chainArr.forEach((a, i) => put(a, i * CC, 0));

  const depthCache = {};
  const depth = (node, parent) => {
    const key = node + "|" + parent;
    if (depthCache[key] != null) return depthCache[key];
    let best = 0;
    for (const w of adj[node]) {
      if (w === parent || chainSet.has(w)) continue;
      best = Math.max(best, 1 + depth(w, node));
    }
    depthCache[key] = best;
    return best;
  };
  const rot = (d, deg) => {
    const r = (deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    return { x: d.x * c - d.y * s, y: d.x * s + d.y * c };
  };

  const placeSubtree = (node, parent, d) => {
    const kids = adj[node].filter((w) => w !== parent && !chainSet.has(w) && !pos[w]);
    kids.sort((a, b) => depth(b, node) - depth(a, node) || a - b);
    let first = true, sideSign = 1;
    for (const kid of kids) {
      const cands = first
        ? [d, rot(d, 90), rot(d, -90), { x: -d.x, y: -d.y }]
        : [rot(d, 90 * sideSign), rot(d, -90 * sideSign), d, { x: -d.x, y: -d.y }];
      if (!first) sideSign = -sideSign;
      let chosen = null;
      for (const cd of cands) {
        const x = pos[node].x + cd.x * CC, y = pos[node].y + cd.y * CC;
        if (free(x, y)) { chosen = { d: cd, x, y }; break; }
      }
      if (!chosen) return false;
      put(kid, chosen.x, chosen.y);
      first = false;
      if (!placeSubtree(kid, node, chosen.d)) return false;
    }
    return true;
  };

  let parity = 0;
  for (const c of chainArr) {
    const brs = adj[c].filter((w) => !chainSet.has(w) && !pos[w] && m.atoms[w - 1].el !== "H");
    brs.sort((a, b) => depth(b, c) - depth(a, c) || a - b);
    for (const r of brs) {
      const order = parity ? [1, -1] : [-1, 1];
      let placed = false;
      for (const side of order) {
        const x = pos[c].x, y = pos[c].y + side * CC;
        if (!free(x, y)) continue;
        put(r, x, y);
        if (placeSubtree(r, c, { x: 0, y: side })) { placed = true; parity ^= 1; break; }
        return { ok: false, reason: "subtree" };
      }
      if (!placed) return { ok: false, reason: "no-side" };
    }
  }
  for (let i = 1; i <= n; i++) if (m.atoms[i - 1].el !== "H" && !pos[i]) return { ok: false, reason: "unplaced" };
  for (let i = 1; i <= n; i++) if (pos[i]) { m.atoms[i - 1].x = pos[i].x; m.atoms[i - 1].y = pos[i].y; }
  // SBV label vectors are absolute; the old ones are stale after a re-layout.
  m.mLines = (m.mLines || []).filter((l) => !/^M\s+SBV\b/.test(String(l).trim()));
  return { ok: true };
}

// ── carbonyl school geometry ──────────────────────────────────────────────
// Acids: the two O atoms sit symmetrically at 60° above/below the chain axis
// (O=C-O = 120°). Aldehydes: the C=O continues the chain (CCC=O). Ketones and
// esters keep their 90° / bridging geometry. Runs on the condensed form; the
// expanded form inherits it by derivation.

function normAng(a) {
  while (a <= -Math.PI) a += 2 * Math.PI;
  while (a > Math.PI) a -= 2 * Math.PI;
  return a;
}

function angDiff(a, b) {
  return Math.abs(normAng(a - b));
}

function carbonylInfo(m, ci) {
  const nb = [];
  for (const b of m.bonds) {
    if (b[0] === ci) nb.push({ idx: b[1], o: b[2] });
    else if (b[1] === ci) nb.push({ idx: b[0], o: b[2] });
  }
  const dblO = nb.find((n) => m.atoms[n.idx - 1].el === "O" && n.o === 2);
  if (!dblO) return null;
  const singlesO = nb.filter((n) => m.atoms[n.idx - 1].el === "O" && n.o === 1);
  const heavy = nb.filter((n) => {
    const el = m.atoms[n.idx - 1].el;
    return el !== "O" && el !== "H";
  });
  if (singlesO.length) {
    const oh = singlesO[0];
    let deg = 0;
    for (const b of m.bonds) if (b[0] === oh.idx || b[1] === oh.idx) deg++;
    if (deg === 1 && heavy.length === 1) return { kind: "acid", dblO, oh, chain: heavy[0].idx };
    return null; // ester (single O bridges to another heavy atom)
  }
  if (heavy.length === 1) return { kind: "aldehyde", dblO, chain: heavy[0].idx };
  return null; // ketone
}

// Rotate a terminal group (root + everything bonded through it) around pivot
// so the root lands exactly on `target` (absolute angle, same bond length).
function rotateGroup(m, root, pivot, target) {
  const P = m.atoms[pivot - 1], R = m.atoms[root - 1];
  const len = Math.hypot(R.x - P.x, R.y - P.y);
  const cur = Math.atan2(R.y - P.y, R.x - P.x);
  const d = normAng(target - cur);
  const adj = adjAll(m);
  const seen = new Set([pivot, root]);
  const stack = [root];
  const group = [];
  while (stack.length) {
    const v = stack.pop();
    group.push(v);
    for (const w of adj[v]) if (!seen.has(w)) { seen.add(w); stack.push(w); }
  }
  const old = group.map((i) => ({ i, x: m.atoms[i - 1].x, y: m.atoms[i - 1].y }));
  const c = Math.cos(d), s = Math.sin(d);
  for (const idx of group) {
    const A = m.atoms[idx - 1];
    const dx = A.x - P.x, dy = A.y - P.y;
    A.x = P.x + dx * c - dy * s;
    A.y = P.y + dx * s + dy * c;
  }
  R.x = P.x + len * Math.cos(target);
  R.y = P.y + len * Math.sin(target);
  return { group, old };
}

function restoreGroup(m, old) {
  for (const o of old) { m.atoms[o.i - 1].x = o.x; m.atoms[o.i - 1].y = o.y; }
}

function groupCollides(m, group, pivot, thr) {
  const lim = (thr == null) ? 0.55 : thr;
  const g = new Set(group);
  for (const idx of group) {
    const A = m.atoms[idx - 1];
    for (let j = 1; j <= m.atoms.length; j++) {
      if (g.has(j) || j === pivot) continue;
      const B = m.atoms[j - 1];
      if (Math.hypot(A.x - B.x, A.y - B.y) < lim) return true;
    }
  }
  return false;
}

// A terminal branch sitting where a carbonyl O now needs to go: rotate it
// around its parent (bond length kept) to the clearest free angle.
function nudgeTerminalBlockers(m, group, pivot, targetPt, avoidPt) {
  const g = new Set(group);
  const blockers = [];
  for (let i = 1; i <= m.atoms.length; i++) {
    if (g.has(i) || i === pivot) continue;
    const A = m.atoms[i - 1];
    if (A.el === "H") continue;
    if (Math.hypot(A.x - targetPt.x, A.y - targetPt.y) < 0.75) blockers.push(i);
  }
  let moved = 0;
  for (const b of blockers) {
    let parent = 0, deg = 0;
    for (const bd of m.bonds) {
      if (bd[0] !== b && bd[1] !== b) continue;
      const o = bd[0] === b ? bd[1] : bd[0];
      if (m.atoms[o - 1].el !== "H") { deg++; parent = o; }
    }
    if (deg !== 1 || !parent) continue;
    const P = m.atoms[parent - 1], A = m.atoms[b - 1];
    const len = Math.hypot(A.x - P.x, A.y - P.y);
    let best = null, bestClear = -1;
    for (let k = 0; k < 12; k++) {
      const ang = (k * Math.PI) / 6;
      const x = P.x + len * Math.cos(ang), y = P.y + len * Math.sin(ang);
      if (Math.hypot(x - targetPt.x, y - targetPt.y) < 0.75) continue;
      if (avoidPt && Math.hypot(x - avoidPt.x, y - avoidPt.y) < 0.75) continue;
      let mc = 1e9;
      for (let i = 1; i <= m.atoms.length; i++) {
        if (i === parent || i === b) continue;
        if (m.atoms[i - 1].el === "H") continue;
        mc = Math.min(mc, Math.hypot(x - m.atoms[i - 1].x, y - m.atoms[i - 1].y));
      }
      if (mc > bestClear) { bestClear = mc; best = { x, y }; }
    }
    if (best && bestClear >= 1.0) { A.x = best.x; A.y = best.y; moved++; }
  }
  return moved;
}

function fixCarbonylGeometry(C, m) {
  const fixes = [];
  const failures = [];
  for (let ci = 1; ci <= m.atoms.length; ci++) {
    if (m.atoms[ci - 1].el !== "C") continue;
    const info = carbonylInfo(m, ci);
    if (!info) continue;
    const C0 = m.atoms[ci - 1];
    const chain = m.atoms[info.chain - 1];
    const theta = Math.atan2(chain.y - C0.y, chain.x - C0.x);
    if (info.kind === "acid") {
      const dbl = m.atoms[info.dblO.idx - 1], oh = m.atoms[info.oh.idx - 1];
      const aO0 = Math.atan2(dbl.y - C0.y, dbl.x - C0.x);
      const aH0 = Math.atan2(oh.y - C0.y, oh.x - C0.x);
      const t1 = normAng(theta + (2 * Math.PI) / 3);
      const t2 = normAng(theta - (2 * Math.PI) / 3);
      const optA = { to: t1, ho: t2, dev: angDiff(aO0, t1) + angDiff(aH0, t2) };
      const optB = { to: t2, ho: t1, dev: angDiff(aO0, t2) + angDiff(aH0, t1) };
      const pick = optA.dev <= optB.dev ? optA : optB;
      if (pick.dev < 0.10) continue;
      let ok = true;
      // Move the OH to its side of the pair (nudging a blocking branch if needed).
      if (angDiff(aH0, pick.ho) >= 0.10) {
        const res = rotateGroup(m, info.oh.idx, ci, pick.ho);
        if (groupCollides(m, res.group, ci, 0.70)) {
          const pt = m.atoms[info.oh.idx - 1];
          const nudged = nudgeTerminalBlockers(m, res.group, ci, pt, m.atoms[info.dblO.idx - 1]);
          if (!(nudged && !groupCollides(m, res.group, ci, 0.70)) && groupCollides(m, res.group, ci, 0.55)) {
            restoreGroup(m, res.old);
            ok = false;
          }
        }
        if (ok) fixes.push({ atom: ci, kind: "acid", moved: "OH", to: +((pick.ho * 180) / Math.PI).toFixed(1) });
      }
      // Then the double O, if it is not already on the other side.
      if (ok) {
        const dblNow = m.atoms[info.dblO.idx - 1];
        const aO1 = Math.atan2(dblNow.y - C0.y, dblNow.x - C0.x);
        if (angDiff(aO1, pick.to) >= 0.10) {
          const res = rotateGroup(m, info.dblO.idx, ci, pick.to);
          if (groupCollides(m, res.group, ci, 0.70)) {
            restoreGroup(m, res.old);
            ok = false;
          } else {
            fixes.push({ atom: ci, kind: "acid", moved: "=O", to: +((pick.to * 180) / Math.PI).toFixed(1) });
          }
        }
      }
      if (!ok) failures.push({ atom: ci, kind: "acid", reason: "collision" });
    } else if (info.kind === "aldehyde") {
      const dbl = m.atoms[info.dblO.idx - 1];
      const aO = Math.atan2(dbl.y - C0.y, dbl.x - C0.x);
      const target = normAng(theta + Math.PI);
      if (angDiff(aO, target) < 0.09) continue;
      const res = rotateGroup(m, info.dblO.idx, ci, target);
      if (!groupCollides(m, res.group, ci)) {
        fixes.push({ atom: ci, kind: "aldehyde", moved: "=O", to: +((target * 180) / Math.PI).toFixed(1) });
        continue;
      }
      restoreGroup(m, res.old);
      failures.push({ atom: ci, kind: "aldehyde", reason: "collision" });
    }
  }
  return { fixes, failures };
}

// Audit: acids O=C-O = 120° symmetric about the chain; aldehydes C-C=O = 180°.
function carbonylAudit(m) {
  const issues = [];
  for (let ci = 1; ci <= m.atoms.length; ci++) {
    if (m.atoms[ci - 1].el !== "C") continue;
    const info = carbonylInfo(m, ci);
    if (!info) continue;
    const C0 = m.atoms[ci - 1];
    const chain = m.atoms[info.chain - 1];
    const theta = Math.atan2(chain.y - C0.y, chain.x - C0.x);
    const dbl = m.atoms[info.dblO.idx - 1];
    const aO = Math.atan2(dbl.y - C0.y, dbl.x - C0.x);
    if (info.kind === "acid") {
      const oh = m.atoms[info.oh.idx - 1];
      const aH = Math.atan2(oh.y - C0.y, oh.x - C0.x);
      const t1 = normAng(theta + (2 * Math.PI) / 3), t2 = normAng(theta - (2 * Math.PI) / 3);
      const good = (angDiff(aO, t1) < 0.09 && angDiff(aH, t2) < 0.09) ||
        (angDiff(aO, t2) < 0.09 && angDiff(aH, t1) < 0.09);
      if (!good) issues.push("acid#" + ci + " " + ((aO * 180) / Math.PI).toFixed(0) + "/" + ((aH * 180) / Math.PI).toFixed(0));
    } else if (info.kind === "aldehyde") {
      if (angDiff(aO, normAng(theta + Math.PI)) >= 0.09) issues.push("aldehyde#" + ci + " " + ((aO * 180) / Math.PI).toFixed(0));
    }
  }
  return issues;
}

function deriveChain(m) {  const adj = adjAll(m);
  const isHeavy = (i) => m.atoms[i - 1] && m.atoms[i - 1].el !== "H";
  const heavy = [];
  for (let i = 1; i <= m.atoms.length; i++) if (isHeavy(i)) heavy.push(i);
  if (!heavy.length) return [];
  let best = [];
  for (const start of heavy) {
    if (adj[start].filter(isHeavy).length > 1) continue;
    const prev = {}, seen = new Set([start]), q = [start];
    while (q.length) {
      const v = q.shift();
      for (const w of adj[v]) if (isHeavy(w) && !seen.has(w)) { seen.add(w); prev[w] = v; q.push(w); }
    }
    let far = start, fd = 0;
    for (const v of seen) {
      let d = 0, x = v;
      while (x !== start && prev[x] !== undefined) { x = prev[x]; d++; }
      if (d > fd) { fd = d; far = v; }
    }
    const path = [];
    let x = far;
    while (x !== undefined) { path.push(x); if (x === start) break; x = prev[x]; }
    path.reverse();
    if (path.length > best.length) best = path;
  }
  if (!best.length) {
    const seen = new Set([heavy[0]]), q = [heavy[0]];
    while (q.length) {
      const v = q.shift();
      for (const w of adj[v]) if (isHeavy(w) && !seen.has(w)) { seen.add(w); q.push(w); }
    }
    best = [...seen];
  }
  return best;
}

// ── validation helpers ─────────────────────────────────────────────────────

function overlapPairs(m) {
  const bonded = new Set();
  for (const b of m.bonds) bonded.add(Math.min(b[0], b[1]) + "-" + Math.max(b[0], b[1]));
  const out = [];
  for (let i = 0; i < m.atoms.length; i++) {
    for (let j = i + 1; j < m.atoms.length; j++) {
      if (bonded.has((i + 1) + "-" + (j + 1))) continue;
      const d = Math.hypot(m.atoms[i].x - m.atoms[j].x, m.atoms[i].y - m.atoms[j].y);
      if (d < 0.38) out.push((i + 1) + m.atoms[i].el + "-" + (j + 1) + m.atoms[j].el + "@" + d.toFixed(2));
    }
  }
  return out;
}

function chargePairs(mLines) {
  const out = [];
  for (const line of mLines || []) {
    const tk = String(line).trim().split(/\s+/);
    if (tk[1] !== "CHG") continue;
    const n = parseInt(tk[2], 10) || 0;
    for (let i = 0; i < n; i++) out.push(parseInt(tk[3 + i * 2], 10) + ":" + parseInt(tk[4 + i * 2], 10));
  }
  return out.sort().join(",");
}

function sgroupAtoms(mLines) {
  const out = [];
  for (const line of mLines || []) {
    const tk = String(line).trim().split(/\s+/);
    if (tk[1] !== "SAL") continue;
    out.push(tk[2] + ":" + tk.slice(4).map(Number).sort((a, b) => a - b).join("."));
  }
  return out.sort().join(",");
}

function bondSig(m, heavyOnly) {
  const out = [];
  for (const b of m.bonds) {
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B) continue;
    if (heavyOnly && (A.el === "H" || B.el === "H")) continue;
    out.push(Math.min(b[0], b[1]) + "-" + Math.max(b[0], b[1]) + ":" + b[2]);
  }
  return out.sort().join(";");
}

function missingH(C, m) {
  const used = new Array(m.atoms.length).fill(0);
  for (const b of m.bonds) { used[b[0] - 1] += b[2]; used[b[1] - 1] += b[2]; }
  let total = 0;
  for (let i = 0; i < m.atoms.length; i++) {
    const el = m.atoms[i].el;
    if (el === "H") continue;
    const v = C.valence(el, m.atoms[i].chg || 0);
    if (v == null) continue;
    const miss = v - used[i];
    if (miss > 0) total += miss;
  }
  return total;
}

// The one invariant that matters: the expanded form is the condensed form plus
// H. Atom i (element + coordinates) and bond j (endpoints + order) of the
// expanded prefix must equal the condensed atom/bond exactly.
function verifyDerived(cond, exp) {
  const issues = [];
  if (exp.atoms.length < cond.atoms.length) return ["expanded-shorter"];
  for (let i = 0; i < cond.atoms.length; i++) {
    const a = cond.atoms[i];
    if (a.el === "H") continue; // the H layer is generated separately
    const b = exp.atoms[i];
    if (String(a.el) !== String(b.el)) { issues.push("atom-el#" + (i + 1)); break; }
    if (Math.abs(a.x - b.x) > 1e-9 || Math.abs(a.y - b.y) > 1e-9) { issues.push("atom-xy#" + (i + 1)); break; }
  }
  if (exp.bonds.length < cond.bonds.length) issues.push("expanded-fewer-bonds");
  else {
    for (let j = 0; j < cond.bonds.length; j++) {
      const a = cond.bonds[j], b = exp.bonds[j];
      if (a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2]) { issues.push("bond#" + (j + 1)); break; }
    }
  }
  return issues;
}

// ── normalization ──────────────────────────────────────────────────────────

function normalizeCondensed(C, text, chain) {
  const m = C.parse(text);
  if (!m) return { ok: false, reason: "parse" };
  if (!Array.isArray(chain) || !chain.length) chain = deriveChain(m);
  const before = statsOf(m);
  if (!before.n) {
    normalizeH(m, CH);
    const out = C.write(m.head, m.atoms, m.bonds, m);
    const om = C.parse(out);
    return { ok: true, text: out, chain, mode: "keep", scale: 1, before, after: om ? statsOf(om) : before, rep: { moved: 0, skipped: [] }, warn: [] };
  }
  const scale = CC / before.med;
  scaleMol(C, m, scale);
  normalizeH(m, CH);
  const rep = repairBonds(m, chain, CC);
  let after = statsOf(m);
  const warn = [];
  let mode = Math.abs(scale - 1) < 1e-9 ? "keep" : "scale";
  let fm = m, outText = null;
  if (after.max > CC * 1.03 || after.min < CC * 0.97) {
    const hasH = m.atoms.some((a) => a.el === "H");
    let done = false;
    if (!hasH) {
      const lin = C.lin(C.write(m.head, m.atoms, m.bonds, m), chain);
      if (lin) {
        const lm = C.parse(lin);
        const ls = lm ? statsOf(lm) : null;
        if (lm && ls && ls.max <= CC * 1.03 && ls.min >= CC * 0.97) {
          fm = lm;
          outText = lin;
          mode = "relayout";
          after = ls;
          done = true;
        }
      }
    }
    if (!done) warn.push("still-off");
  }
  if (!outText) outText = C.write(m.head, m.atoms, m.bonds, m);
  // Branch backbones must be vertical off the horizontal chain. Only molecules
  // that violate it are re-laid out (coordinates only, atom order kept).
  let school = null;
  const violBefore = branchViolations(fm, chain);
  if (violBefore.length) {
    const r = schoolLayout(C, fm, chain);
    if (r.ok) {
      outText = C.write(fm.head, fm.atoms, fm.bonds, fm);
      after = statsOf(fm);
      mode = "school";
      school = { applied: true, violations: violBefore.length };
    } else {
      school = { applied: false, reason: r.reason, violations: violBefore.length };
    }
  }
  // Terminal sp groups (C#N, terminal C#C) continue the chain linearly.
  const trip = linearizeTriples(C, fm);
  // School geometry for terminal carbonyls (condensed, and through derivation
  // the expanded form too).
  const carb = fixCarbonylGeometry(C, fm);
  if (carb.fixes.length || trip.fixes.length) {
    outText = C.write(fm.head, fm.atoms, fm.bonds, fm);
    after = statsOf(fm);
  }
  return { ok: true, text: outText, chain, mode, scale, before, after, rep, warn, carbonyl: carb, school, triple: trip };
}

function normalizeSkeletal(C, text, chain) {
  const m = C.parse(text);
  if (!m) return { ok: false, reason: "parse" };
  const before = statsOf(m);
  if (!before.n) return { ok: true, text, mode: "keep", before, after: before, rep: { moved: 0, skipped: [] } };
  const scale = CC / before.med;
  scaleMol(C, m, scale);
  normalizeH(m, CH);
  const rep = repairBonds(m, chain, CC);
  return { ok: true, text: C.write(m.head, m.atoms, m.bonds, m), mode: Math.abs(scale - 1) < 1e-9 ? "keep" : "scale", scale, before, after: statsOf(m), rep };
}

// Deterministic 120° fan for terminal methyls whose three H were squeezed by
// the collision fallback (e.g. a methyl in a crowded pocket). Only touches
// expanded H that are closer than 0.55; heavy atoms never move.
function fanBunchedMethylH(m) {
  const kids = {};
  for (const b of m.bonds) {
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B) continue;
    if (A.el === "H" && B.el !== "H") (kids[b[1]] = kids[b[1]] || []).push(b[0]);
    else if (B.el === "H" && A.el !== "H") (kids[b[0]] = kids[b[0]] || []).push(b[1]);
  }
  let moved = 0;
  for (const ps of Object.keys(kids)) {
    const p = +ps, hs = kids[ps];
    if (hs.length !== 3 || m.atoms[p - 1].el !== "C") continue;
    const H = hs.map((i) => m.atoms[i - 1]);
    let minD = 1e9;
    for (let i = 0; i < H.length; i++) {
      for (let j = i + 1; j < H.length; j++) {
        minD = Math.min(minD, Math.hypot(H[i].x - H[j].x, H[i].y - H[j].y));
      }
    }
    if (minD >= 0.55) continue;
    const nbrs = [];
    for (const b of m.bonds) {
      if (b[0] === p) { const o = m.atoms[b[1] - 1]; if (o.el !== "H") nbrs.push(o); }
      else if (b[1] === p) { const o = m.atoms[b[0] - 1]; if (o.el !== "H") nbrs.push(o); }
    }
    if (nbrs.length !== 1) continue;
    const P = m.atoms[p - 1], N = nbrs[0];
    const away = Math.atan2(P.y - N.y, P.x - N.x);
    const lens = H.map((h) => Math.hypot(h.x - P.x, h.y - P.y));
    const isHset = new Set(hs);
    const clearAt = (qx, qy) => {
      let md = 1e9;
      for (let i = 1; i <= m.atoms.length; i++) {
        if (i === p || isHset.has(i)) continue;
        const A = m.atoms[i - 1];
        const d = Math.hypot(qx - A.x, qy - A.y);
        if (d < md) md = d;
      }
      return md;
    };
    let best = null, bestClear = -1;
    for (let off = -Math.PI / 3; off <= Math.PI / 3 + 1e-9; off += Math.PI / 12) {
      const angles = [away + off - Math.PI / 3, away + off, away + off + Math.PI / 3];
      const pts = angles.map((a, i) => ({ x: P.x + lens[i] * Math.cos(a), y: P.y + lens[i] * Math.sin(a) }));
      let mc = 1e9;
      for (const q of pts) mc = Math.min(mc, clearAt(q.x, q.y));
      if (mc > bestClear) { bestClear = mc; best = pts; }
    }
    if (best && bestClear >= 0.35) {
      H.forEach((h, i) => { h.x = best[i].x; h.y = best[i].y; });
      moved++;
    }
  }
  return moved;
}

// ── orthogonal hydrogens + linear sp groups ───────────────────────────────

function bondOrderOf(m, a, b) {
  for (const x of m.bonds) {
    if ((x[0] === a && x[1] === b) || (x[0] === b && x[1] === a)) return x[2];
  }
  return 1;
}

// Snap every C–H / O–H bond to the 0/90/180/270 grid (expanded form only).
// Directions already used by heavy bonds are excluded, geminal H do not block
// each other, and a carbonyl/triple bond gets its opposite axis first (so the
// formyl H ends up collinear with the C=O and a terminal alkyne H with C#C).
function snapHBonds(C, m) {
  const target = 0.78;
  const adj = adjAll(m);
  const kids = {};
  for (const b of m.bonds) {
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B) continue;
    if (A.el === "H" && B.el !== "H") (kids[b[1]] = kids[b[1]] || []).push(b[0]);
    else if (B.el === "H" && A.el !== "H") (kids[b[0]] = kids[b[0]] || []).push(b[1]);
  }
  let moved = 0;
  for (const ps of Object.keys(kids)) {
    const p = +ps, P = m.atoms[p - 1];
    if (P.el !== "C" && P.el !== "O") continue;
    const hs = kids[ps];
    const heavyDirs = [];
    let pref = null;
    for (const w of adj[p]) {
      const W = m.atoms[w - 1];
      if (W.el === "H") continue;
      const ang = Math.atan2(W.y - P.y, W.x - P.x);
      const ord = bondOrderOf(m, p, w);
      heavyDirs.push({ ang, el: W.el, ord });
    }
    const dblO = heavyDirs.find((d) => d.el === "O" && d.ord === 2);
    const tri = heavyDirs.find((d) => d.ord === 3);
    if (dblO) pref = normAng(dblO.ang + Math.PI);
    else if (tri) pref = normAng(tri.ang + Math.PI);
    const clearAt = (qx, qy, self) => {
      let md = 1e9;
      for (let i = 1; i <= m.atoms.length; i++) {
        if (i === p || i === self) continue;
        const A = m.atoms[i - 1];
        const d = Math.hypot(qx - A.x, qy - A.y);
        if (d < md) md = d;
      }
      return md;
    };
    const cands = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
    const used = [];
    for (const h of hs) {
      let best = null, bestScore = -1;
      for (const strict of [true, false]) {
        for (const a of cands) {
          if (strict) {
            let blocked = false;
            for (const d of heavyDirs) if (angDiff(a, d.ang) < Math.PI / 4) { blocked = true; break; }
            if (blocked) continue;
          }
          if (used.some((u) => angDiff(a, u) < 0.01)) continue;
          const qx = P.x + target * Math.cos(a), qy = P.y + target * Math.sin(a);
          const clr = clearAt(qx, qy, h);
          let score = clr;
          if (pref != null && angDiff(a, pref) < 0.01) score += 1000;
          if (score > bestScore) { bestScore = score; best = { a, qx, qy, clr }; }
        }
        if (best && best.clr >= 0.38) break;
      }
      if (best && best.clr >= 0.38) {
        m.atoms[h - 1].x = best.qx;
        m.atoms[h - 1].y = best.qy;
        used.push(best.a);
        moved++;
      }
    }
  }
  return moved;
}

// Terminal sp atoms (nitrile N, terminal alkyne C) must continue the chain
// linearly: rotate them (and attached H) opposite the sp carbon's other bond.
function linearizeTriples(C, m) {
  const fixes = [], failures = [];
  const adj = adjAll(m);
  for (const b of m.bonds) {
    if (b[2] !== 3) continue;
    const ia = b[0], ib = b[1];
    const A = m.atoms[ia - 1], B = m.atoms[ib - 1];
    if (!A || !B || A.el === "H" || B.el === "H") continue;
    for (const [ti, spi] of [[ia, ib], [ib, ia]]) {
      if (!adj[ti] || !adj[spi]) continue;
      const heavNb = adj[ti].filter((w) => m.atoms[w - 1].el !== "H");
      if (heavNb.length !== 1) continue; // only a terminal sp atom
      const sub = adj[spi].filter((w) => w !== ti && m.atoms[w - 1].el !== "H");
      if (sub.length !== 1) continue;
      const T = m.atoms[ti - 1], SP = m.atoms[spi - 1], S = m.atoms[sub[0] - 1];
      const dx = SP.x - S.x, dy = SP.y - S.y;
      if (!(Math.hypot(dx, dy) > 1e-9)) continue;
      const tgt = Math.atan2(dy, dx);
      const cur = Math.atan2(T.y - SP.y, T.x - SP.x);
      if (angDiff(cur, tgt) < 0.09) continue;
      const res = rotateGroup(m, ti, spi, tgt);
      if (groupCollides(m, res.group, spi, 0.55)) {
        restoreGroup(m, res.old);
        failures.push({ atom: ti });
        continue;
      }
      fixes.push({ atom: ti });
    }
  }
  return { fixes, failures };
}

// Audit helper: terminal sp atoms must be collinear with the chain.
function tripleAudit(m) {
  const adj = adjAll(m);
  const issues = [];
  for (const b of m.bonds) {
    if (b[2] !== 3) continue;
    const ia = b[0], ib = b[1];
    const A = m.atoms[ia - 1], B = m.atoms[ib - 1];
    if (!A || !B || A.el === "H" || B.el === "H") continue;
    for (const [ti, spi] of [[ia, ib], [ib, ia]]) {
      if (!adj[ti] || !adj[spi]) continue;
      const heavNb = adj[ti].filter((w) => m.atoms[w - 1].el !== "H");
      if (heavNb.length !== 1) continue;
      const sub = adj[spi].filter((w) => w !== ti && m.atoms[w - 1].el !== "H");
      if (sub.length !== 1) continue;
      const T = m.atoms[ti - 1], SP = m.atoms[spi - 1], S = m.atoms[sub[0] - 1];
      const tgt = Math.atan2(SP.y - S.y, SP.x - S.x);
      const cur = Math.atan2(T.y - SP.y, T.x - SP.x);
      if (angDiff(cur, tgt) > 0.09) issues.push("sp#" + ti);
    }
  }
  return issues;
}

function hOrthoAudit(m) {
  const issues = [];
  for (const b of m.bonds) {
    const A = m.atoms[b[0] - 1], B = m.atoms[b[1] - 1];
    if (!A || !B) continue;
    const hIsA = A.el === "H";
    const h = hIsA ? A : (B.el === "H" ? B : null);
    const p = hIsA ? B : (B.el === "H" ? A : null);
    if (!h || !p) continue;
    if (p.el !== "C" && p.el !== "O") continue;
    const a = Math.atan2(h.y - p.y, h.x - p.x);
    const m90 = ((a * 180) / Math.PI % 90 + 90) % 90;
    const off = Math.min(m90, 90 - m90);
    if (off > 5) issues.push("H#" + (hIsA ? b[0] : b[1]));
  }
  return issues;
}

// ── data writer ────────────────────────────────────────────────────────────

function readNameExamplesBlock(text) {
  const start = text.indexOf("let nameExamples");
  if (start < 0) throw new Error("nameExamples not found");
  const objStart = text.indexOf("{", start);
  const end = text.indexOf("\n};", objStart);
  if (end < 0) throw new Error("nameExamples close not found");
  return text.slice(start, end);
}

function setChainArray(block, key, name, arr) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("(\\n  " + esc + ": \\{[\\s\\S]{0,1600}?\"?" + name + "\"?\\s*:\\s*)\\[[^\\]]*\\]");
  if (!re.test(block)) return { block, ok: false };
  return { block: block.replace(re, (m, pre) => pre + "[" + arr.join(", ") + "]"), ok: true };
}

function jsLit(s) { return JSON.stringify(s); }

function main() {
  const C = loadCore();
  const alkanes = JSON.parse(fs.readFileSync(ALKANES_FILE, "utf8"));
  const report = { generatedAt: new Date().toISOString(), design: "expanded = condensed + H", molecules: {}, summary: {}, problems: [] };
  const results = {};

  for (const key of Object.keys(C.MOL)) {
    const ne = C.NE[key] || {};
    const src = C.MOL[key] || {};
    if (!src.condensed) { report.problems.push({ key, reason: "no-condensed" }); continue; }
    const chainC = Array.isArray(ne.mainChain_Condensed) ? ne.mainChain_Condensed : [];
    const cond = normalizeCondensed(C, src.condensed, chainC);
    if (!cond.ok) { report.problems.push({ key, reason: cond.reason }); continue; }

    const expText0 = C.gen(cond.text);
    let expText = expText0;
    let exp = expText ? C.parse(expText) : null;
    if (exp) {
      const fanned = fanBunchedMethylH(exp);
      const snapped = snapHBonds(C, exp);
      if (fanned || snapped) {
        expText = C.write(exp.head, exp.atoms, exp.bonds, exp);
        exp = C.parse(expText);
      }
    }
    const condM = C.parse(cond.text);
    const issues = [];
    if (!exp) issues.push("expanded-gen-failed");
    else issues.push(...verifyDerived(condM, exp));

    const cStats = statsOf(condM);
    if (cStats.n && (cStats.max > CC * 1.03 || cStats.min < CC * 0.97)) issues.push("cond-bonds " + cStats.min.toFixed(3) + ".." + cStats.max.toFixed(3));
    if (exp) {
      if (missingH(C, exp)) issues.push("missing-h " + missingH(C, exp));
      const hs = hStats(exp);
      if (hs.n && (hs.max > CH * 1.03 || hs.min < CH * 0.97)) issues.push("h-bonds " + hs.min.toFixed(3) + ".." + hs.max.toFixed(3));
      const ov = overlapPairs(exp);
      if (ov.length) issues.push("overlap " + ov.join(" "));
      if (sgroupAtoms(exp.mLines).length) issues.push("expanded-has-sgroups");
      if (chargePairs(condM.mLines) !== chargePairs(exp.mLines)) issues.push("charges");
    }
    if (cond.warn && cond.warn.length) issues.push(...cond.warn.map((w) => "cond:" + w));
    if (cond.carbonyl && cond.carbonyl.failures.length) {
      issues.push("carbonyl-collision " + cond.carbonyl.failures.map((f) => f.kind + "#" + f.atom).join(","));
    }
    const carbIssues = carbonylAudit(condM);
    if (carbIssues.length) issues.push("carbonyl-geometry " + carbIssues.join(" "));
    const branchBad = branchViolations(condM, cond.chain);
    if (branchBad.length) issues.push("branch-vertical " + branchBad.map((b) => "#" + b.root + " dx" + b.dx).join(","));
    if (cond.school && !cond.school.applied) issues.push("school-layout:" + cond.school.reason);
    const spBad = tripleAudit(condM);
    if (spBad.length) issues.push("sp-linear " + spBad.join(","));
    if (cond.triple && cond.triple.failures.length) issues.push("sp-collision " + cond.triple.failures.map((f) => "#" + f.atom).join(","));
    if (exp) {
      const hOff = hOrthoAudit(exp);
      if (hOff.length) issues.push("h-ortho " + hOff.slice(0, 8).join(",") + (hOff.length > 8 ? "+" : ""));
    }

    // skeletal: own zigzag order, rescaled/repaired only
    let skel = null, skelIssues = [];
    if (src.skeletal) {
      const chainS = Array.isArray(ne.mainChain_Skeletal) ? ne.mainChain_Skeletal : [];
      skel = normalizeSkeletal(C, src.skeletal, chainS);
      if (!skel.ok) skelIssues.push(skel.reason);
      else {
        const sm = C.parse(skel.text);
        const ss = sm ? statsOf(sm) : null;
        if (!sm || !ss || ss.max > CC * 1.03 || ss.min < CC * 0.97) skelIssues.push("skel-bonds");
        if (sm) {
          const ov = overlapPairs(sm);
          if (ov.length) skelIssues.push("overlap " + ov.join(" "));
        }
      }
    }

    if (issues.length) report.problems.push({ key, form: "expanded", issues });
    if (skelIssues.length) report.problems.push({ key, form: "skeletal", issues: skelIssues });

    results[key] = {
      condensed: cond.text,
      expanded: expText,
      skeletal: skel && skel.ok ? skel.text : src.skeletal,
      chainCondensed: chainC,
      chainSkeletal: Array.isArray(ne.mainChain_Skeletal) ? ne.mainChain_Skeletal : []
    };
    report.molecules[key] = {
      condensed: { mode: cond.mode, scale: +cond.scale.toFixed(4), moved: cond.rep ? cond.rep.moved : 0 },
      expanded: { mode: exp ? "derived" : "failed" },
      skeletal: { mode: skel ? skel.mode : "keep" },
      carbonyl: { fixed: cond.carbonyl ? cond.carbonyl.fixes.length : 0, failures: cond.carbonyl ? cond.carbonyl.failures.length : 0 },
      issues
    };
  }

  // ── the six branched alkanes ─────────────────────────────────────────────
  const extraEntries = [];
  for (const key of Object.keys(alkanes)) {
    const rec = alkanes[key];
    const linC = C.lin(rec.structure2D_Condensed, rec.mainChain_Condensed);
    if (!linC) { report.problems.push({ key, reason: "alkane-linearize" }); continue; }
    const expText = C.gen(linC);
    const sk = C.zig(rec.structure2D_Condensed, rec.mainChain_Condensed);
    const issues = [];
    const cm = C.parse(linC), em = expText ? C.parse(expText) : null;
    if (!em) issues.push("expanded-gen-failed");
    else issues.push(...verifyDerived(cm, em));
    const cs = statsOf(cm);
    if (cs.max > CC * 1.03 || cs.min < CC * 0.97) issues.push("cond-bonds");
    if (em) {
      if (missingH(C, em)) issues.push("missing-h");
      const hs = hStats(em);
      if (hs.n && (hs.max > CH * 1.03 || hs.min < CH * 0.97)) issues.push("h-bonds");
      const ov = overlapPairs(em);
      if (ov.length) issues.push("overlap " + ov.join(" "));
    }
    const sm = sk ? C.parse(sk) : null;
    if (!sm) issues.push("skeletal");
    else {
      const ss = statsOf(sm);
      if (ss.max > CC * 1.03 || ss.min < CC * 0.97) issues.push("skel-bonds");
    }
    if (issues.length) report.problems.push({ key, form: "new", issues });
    results[key] = {
      condensed: linC,
      expanded: expText,
      skeletal: sk,
      chainCondensed: rec.mainChain_Condensed,
      chainSkeletal: rec.mainChain_Condensed
    };
    extraEntries.push({
      key,
      formula: rec.formula,
      mainChain_Condensed: rec.mainChain_Condensed,
      mainChain_Expanded: rec.mainChain_Condensed.slice(),
      mainChain_Skeletal: rec.mainChain_Condensed.slice(),
      mainChain3D: rec.mainChain3D
    });
    report.molecules[key] = { condensed: { mode: "new" }, expanded: { mode: "derived" }, skeletal: { mode: "new" }, issues };
  }

  // ── summary ──────────────────────────────────────────────────────────────
  const modes = {};
  let issueCount = 0;
  for (const key of Object.keys(report.molecules)) {
    const r = report.molecules[key];
    for (const f of ["condensed", "expanded", "skeletal"]) {
      if (!r[f]) continue;
      modes[r[f].mode] = (modes[r[f].mode] || 0) + 1;
    }
    issueCount += (r.issues || []).length;
  }
  report.summary = { molecules: Object.keys(results).length, modes, issueCount, problems: report.problems.length };

  // ── write data_59.js ─────────────────────────────────────────────────────
  const srcText = fs.readFileSync(SRC_DATA, "utf8");
  let block = readNameExamplesBlock(srcText);
  let chainWarn = [];
  for (const key of Object.keys(results)) {
    if (extraEntries.some((e) => e.key === key)) continue;
    const r = results[key];
    const res = setChainArray(block, key, "mainChain_Expanded", r.chainCondensed);
    block = res.block;
    if (!res.ok) chainWarn.push(key);
  }
  if (chainWarn.length) report.problems.push({ chainUpdate: "failed", keys: chainWarn });
  report.summary.problems = report.problems.length;

  const extraText = extraEntries.map((e) => {
    return "\n  " + e.key + ": {\n" +
      "    formula: " + JSON.stringify(e.formula) + ",\n" +
      "    mainChain_Condensed: " + JSON.stringify(e.mainChain_Condensed) + ",\n" +
      "    mainChain_Expanded: " + JSON.stringify(e.mainChain_Expanded) + ",\n" +
      "    mainChain_Skeletal: " + JSON.stringify(e.mainChain_Skeletal) + ",\n" +
      "    mainChain3D: " + JSON.stringify(e.mainChain3D) + "\n" +
      "  },";
  }).join("");

  const regLines = Object.keys(results).map((k) => {
    const f = results[k];
    return "window.MOL2D[" + JSON.stringify(k) + "] = {condensed: " + jsLit(f.condensed) +
      ", expanded: " + (f.expanded ? jsLit(f.expanded) : "null") + ", skeletal: " + (f.skeletal ? jsLit(f.skeletal) : "null") + "};";
  }).join("\n");

  const outText =
    block + extraText + "\n};\n\n" +
    "// ── MOL2D registry (v59) ──────────────────────────────────────────────\n" +
    "// Generated by tools/muler-harness/normalize-2d.js. One entry per molecule.\n" +
    "// Design rule: expanded = condensed heavy skeleton + explicit H (same\n" +
    "// atom order, coordinates and orientation; S-groups dropped).\n" +
    "window.MOL2D = window.MOL2D || {};\n" + regLines + "\n";

  report.dataBytes = outText.length;
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 1));
  if (WRITE) fs.writeFileSync(OUT_DATA, outText);
  console.log(JSON.stringify({ write: WRITE, summary: report.summary, dataBytes: outText.length, report: REPORT_FILE }, null, 1));
  if (report.problems.length) console.log("PROBLEMS:" + JSON.stringify(report.problems.slice(0, 20), null, 1));
}

main();
