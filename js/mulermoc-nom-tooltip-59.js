// v58.41: one viewport-aware tooltip layer for every [data-tooltip].
// Pseudo-element bubbles are clipped by overflow ancestors (the scenario
// drawer's scrollport, panels, pinned bar) and have no collision handling.
// This layer lives on <body> position:fixed, flips above/below the anchor,
// clamps to the viewport, and hides on scroll/resize/leave. The pseudo
// bubbles stay in the stylesheets as a no-JS fallback; html.mulerTipLayer
// suppresses them once this file is active.
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__mulerTipLayerInit) return;
  window.__mulerTipLayerInit = true;

  var DELAY = 450;
  var tip = null;
  var current = null;
  var timer = null;

  function ensureTip() {
    if (tip && tip.parentNode) return tip;
    tip = document.getElementById("mulerTipLayer");
    if (!tip) {
      tip = document.createElement("div");
      tip.id = "mulerTipLayer";
      tip.setAttribute("role", "tooltip");
      tip.setAttribute("aria-hidden", "true");
      document.body.appendChild(tip);
    }
    return tip;
  }

  function closestTip(node) {
    while (node && node !== document) {
      if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute("data-tooltip")) return node;
      node = node.parentNode;
    }
    return null;
  }

  function hideTip() {
    if (timer) { clearTimeout(timer); timer = null; }
    current = null;
    if (tip) {
      tip.classList.remove("on");
      tip.setAttribute("aria-hidden", "true");
    }
  }

  function place(el) {
    var text = el.getAttribute("data-tooltip");
    if (!text) return;
    ensureTip();
    tip.textContent = text;
    tip.setAttribute("aria-hidden", "false");
    tip.classList.remove("on");
    // Keep layout measurable while invisible; no flash at 0,0.
    tip.style.left = "0px";
    tip.style.top = "0px";
    tip.setAttribute("data-side", "below");
    var tr = tip.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    var vw = window.innerWidth || document.documentElement.clientWidth || 0;
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    var gap = 10;
    var margin = 8;
    var below = vh - r.bottom - gap;
    var above = r.top - gap;
    var side = (below >= tr.height || below >= above) ? "below" : "above";
    var top = side === "below" ? (r.bottom + gap) : (r.top - gap - tr.height);
    if (top < margin) top = margin;
    if (top + tr.height > vh - margin) top = vh - margin - tr.height;
    var left = r.left + r.width / 2 - tr.width / 2;
    if (left < margin) left = margin;
    if (left + tr.width > vw - margin) left = vw - margin - tr.width;
    tip.style.left = Math.round(left) + "px";
    tip.style.top = Math.round(top) + "px";
    var ax = r.left + r.width / 2 - left;
    ax = Math.max(10, Math.min(tr.width - 10, ax));
    tip.style.setProperty("--tip-arrow-x", Math.round(ax) + "px");
    tip.setAttribute("data-side", side);
    tip.classList.add("on");
  }

  function schedule(el) {
    if (!el) return;
    if (current === el && tip && tip.classList.contains("on")) return;
    if (timer) { clearTimeout(timer); timer = null; }
    current = el;
    timer = setTimeout(function () {
      timer = null;
      if (current === el && el.isConnected) place(el);
    }, DELAY);
  }

  function init() {
    // Activate suppression of the old pseudo-elements only after the layer
    // is installed, so a JS failure leaves the CSS-only tooltips working.
    try { document.documentElement.classList.add("mulerTipLayer"); } catch (e) {}
    ensureTip();

    document.addEventListener("mouseover", function (ev) {
      var el = closestTip(ev.target);
      if (!el) return;
      if (current === el) return;
      schedule(el);
    }, true);

    document.addEventListener("mouseout", function (ev) {
      if (!current) return;
      var to = ev.relatedTarget;
      if (to && current.contains && current.contains(to)) return;
      hideTip();
    }, true);

    document.addEventListener("focusin", function (ev) {
      var el = closestTip(ev.target);
      if (el) schedule(el);
    }, true);
    document.addEventListener("focusout", function () { hideTip(); }, true);

    document.addEventListener("pointerdown", hideTip, true);
    window.addEventListener("scroll", hideTip, true);
    window.addEventListener("resize", hideTip);
    window.addEventListener("blur", hideTip);
    document.addEventListener("keydown", function (ev) {
      if (ev && (ev.key === "Escape" || ev.key === "Esc")) hideTip();
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
