(function (root) {
  "use strict";

  var TEXT = "text";
  var HTML = "html";

  var NOTE_TAGS = [
    "p", "br", "strong", "b", "em", "i", "u", "s", "sup", "sub", "small", "big",
    "code", "a", "span", "div", "blockquote", "ul", "ol", "li", "figure",
    "figcaption", "img", "hr", "table", "caption", "thead", "tbody", "tfoot",
    "tr", "th", "td", "button"
  ];

  var NOTE_ATTRS = [
    "class", "title", "href", "target", "rel", "src", "alt", "width", "height",
    "loading", "decoding", "referrerpolicy", "colspan", "rowspan", "scope",
    "type", "data-note-action", "data-note-arg", "data-note-include", "aria-label"
  ];

  var NOTE_CLASSES = {
    "note--tip": 1,
    "note--warn": 1,
    "note--definition": 1,
    "note--example": 1,
    "note--formula": 1,
    "note--center": 1,
    "note--muted": 1,
    "note-table": 1,
    "note-table-scroll": 1,
    "note-figure": 1,
    "note-img": 1,
    "note-img-missing": 1,
    "note-btn": 1,
    "note-btn--unavailable": 1,
    "note-embed": 1,
    "note-embed--rule": 1,
    "note-embed--missing": 1,
    "note-fs-14": 1,
    "note-fs-18": 1,
    "note-fs-22": 1,
    "note-fs-26": 1,
    "note-align-left": 1,
    "note-align-center": 1,
    "note-align-right": 1
  };

  var COMPONENT_TAGS = [
    "div", "span", "strong", "b", "small", "sub", "sup", "br", "p"
  ];

  var COMPONENT_ATTRS = ["class", "data-row"];

  var COMPONENT_CLASSES = {
    VFlex: 1,
    HFlex: 1,
    namingRuleTable: 1,
    rule1: 1,
    rule2: 1,
    rule3: 1,
    rule4: 1,
    ruleAlkyl: 1,
    ruleAlkoxy: 1,
    ruleRow: 1,
    ruleCase: 1,
    ruleName: 1,
    ruleTableTitle: 1,
    orderNo: 1,
    alkylFormula: 1,
    alkylPrefix: 1,
    alkylRuleNote: 1
  };

  var RULE_INCLUDES = {
    "rule-table:1": "table1",
    "rule-table:2": "table2",
    "rule-table:3": "table3",
    "rule-table:4": "table4",
    "rule-table:alkyl": "alkylTable",
    "rule-table:alkoxy": "alkoxyTable"
  };

  var actions = Object.create(null);
  var actionsBound = false;

  function normalizeFormat(format) {
    return format === HTML ? HTML : TEXT;
  }

  function purify() {
    var p = root.DOMPurify;
    return p && typeof p.sanitize === "function" ? p : null;
  }

  function legacyTextMarkup(note) {
    var div = root.document.createElement("div");
    div.textContent = note || "";
    return div.innerHTML.replace(
      /&lt;(\/?)(b|i|u|sup|sub|ul|ol|li|small|big)&gt;/gi,
      function (m, slash, tag) { return "<" + slash + tag.toLowerCase() + ">"; }
    );
  }

  function legacyRenderInto(container, note) {
    container.innerHTML = legacyTextMarkup(note);
  }

  function legacyTextToHtml(note) {
    return legacyTextMarkup(note).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");
  }

  function textFromNote(note, format, preserveBreaks) {
    var value = String(note || "");
    if (!value) return "";
    var doc = null;
    try {
      if (root.DOMParser) doc = new root.DOMParser().parseFromString(value, "text/html");
    } catch (e) {
      doc = null;
    }
    if (doc && doc.body) {
      if (format === HTML) {
        var imgs = doc.body.querySelectorAll("img");
        for (var im = 0; im < imgs.length; im++) {
          var alt = String(imgs[im].getAttribute("alt") || "").trim();
          imgs[im].replaceWith(doc.createTextNode(alt ? (preserveBreaks ? "[" + alt + "]" : alt) : ""));
        }
        var incs = doc.body.querySelectorAll("[data-note-include]");
        for (var inc = 0; inc < incs.length; inc++) {
          var key = String(incs[inc].getAttribute("data-note-include") || "").trim();
          incs[inc].replaceWith(doc.createTextNode(key ? "[Συστατικό: " + key + "]" : ""));
        }
      }
      var sep = preserveBreaks ? "\n" : " ";
      var brs = doc.body.querySelectorAll("br");
      for (var i = 0; i < brs.length; i++) brs[i].replaceWith(doc.createTextNode(sep));
      var blocks = doc.body.querySelectorAll("p,div,li,tr,td,th,blockquote,figure,figcaption,ul,ol,table,caption");
      for (var j = 0; j < blocks.length; j++) blocks[j].appendChild(doc.createTextNode(sep));
      value = doc.body.textContent || "";
    } else {
      value = value.replace(/<[^>]*>/g, "");
    }
    if (preserveBreaks) {
      return value.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    }
    return value.replace(/\s+/g, " ").trim();
  }

  function toPlainText(note, format, preserveBreaks) {
    return textFromNote(note, normalizeFormat(format), !!preserveBreaks);
  }

  function hasVisibleContent(note, format) {
    var value = String(note || "");
    if (!value.trim()) return false;
    if (textFromNote(value, normalizeFormat(format), false)) return true;
    return /<img\b/i.test(value) || /data-note-include\s*=/i.test(value) || /<hr\b/i.test(value);
  }

  function sanitizeClassList(el, allowed) {
    if (!el.classList) return;
    var keep = [];
    for (var i = 0; i < el.classList.length; i++) {
      var token = el.classList[i];
      if (allowed[token]) keep.push(token);
    }
    if (keep.length) el.className = keep.join(" ");
    else el.removeAttribute("class");
  }

  function validateHref(value) {
    var href = String(value || "").trim();
    if (!href) return null;
    if (/[\u0000-\u001f\u007f]/.test(href)) return null;
    if (href.indexOf("//") === 0) return null;
    var lower = href.toLowerCase();
    if (/^(javascript|vbscript|data|file|blob):/.test(lower)) return null;
    if (/^https?:/i.test(href)) return href;
    if (/^(mailto|tel):/i.test(href)) return href;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return null;
    return href;
  }

  function validateImageSrc(value) {
    var src = String(value || "").trim();
    if (!src) return null;
    if (/[\u0000-\u001f\u007f]/.test(src)) return null;
    if (src.indexOf("//") === 0) return null;
    if (/^data:/i.test(src)) {
      if (!/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(src)) return null;
      if (src.length > 700000) return null;
      return src;
    }
    if (/^https:\/\//i.test(src)) return src;
    if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return null;
    return src;
  }

  function imageFallbackText(img) {
    return (img && img.getAttribute && img.getAttribute("alt")) || "Εικόνα μη διαθέσιμη";
  }

  function makeMissingImage(img) {
    var span = root.document.createElement("span");
    span.className = "note-img-missing";
    span.textContent = imageFallbackText(img);
    return span;
  }

  function validateImageDimension(value) {
    var raw = String(value || "").trim();
    if (!raw) return null;
    if (!/^\d+$/.test(raw)) return null;
    var n = parseInt(raw, 10);
    if (isNaN(n) || n < 16 || n > 2000) return null;
    return String(n);
  }

  function cleanNoteFragment(fragment, options) {
    var opts = options || {};
    var nodes = fragment.querySelectorAll ? fragment.querySelectorAll("*") : [];
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var tag = el.tagName.toLowerCase();
      sanitizeClassList(el, NOTE_CLASSES);
      ["id", "style"].forEach(function (a) { el.removeAttribute(a); });
      for (var k = el.attributes.length - 1; k >= 0; k--) {
        var name = el.attributes[k].name.toLowerCase();
        if (name.indexOf("on") === 0) {
          el.removeAttribute(el.attributes[k].name);
          continue;
        }
        if (name.indexOf("data-") === 0 && name !== "data-note-include" && name !== "data-note-action" && name !== "data-note-arg") {
          el.removeAttribute(el.attributes[k].name);
          continue;
        }
        if (name.indexOf("aria-") === 0 && !(name === "aria-label" && tag === "button")) {
          el.removeAttribute(el.attributes[k].name);
        }
      }
      if (tag !== "div") el.removeAttribute("data-note-include");
      if (tag !== "button") {
        el.removeAttribute("data-note-action");
        el.removeAttribute("data-note-arg");
        el.classList.remove("note-btn");
      }
      if (tag === "a") {
        var href = validateHref(el.getAttribute("href"));
        if (!href) {
          el.removeAttribute("href");
          el.removeAttribute("target");
          el.removeAttribute("rel");
        } else {
          el.setAttribute("href", href);
          if (/^https?:/i.test(href)) {
            el.setAttribute("target", "_blank");
            el.setAttribute("rel", "noopener noreferrer");
          } else {
            el.removeAttribute("target");
            el.removeAttribute("rel");
          }
        }
      }
      if (tag === "img") {
        var src = validateImageSrc(el.getAttribute("src"));
        if (!src) {
          var missing = makeMissingImage(el);
          el.parentNode.replaceChild(missing, el);
          continue;
        }
        el.setAttribute("src", src);
        el.setAttribute("loading", "lazy");
        el.setAttribute("decoding", "async");
        if (/^https:\/\//i.test(src)) el.setAttribute("referrerpolicy", "no-referrer");
        else el.removeAttribute("referrerpolicy");
        ["width", "height"].forEach(function (attr) {
          if (!el.hasAttribute(attr)) return;
          var dimension = validateImageDimension(el.getAttribute(attr));
          if (dimension) el.setAttribute(attr, dimension);
          else el.removeAttribute(attr);
        });
        if (!el.classList.contains("note-img")) el.classList.add("note-img");
      }
      if (tag === "button") {
        var action = String(el.getAttribute("data-note-action") || "").trim();
        if (!/^[a-z][a-z0-9-]{1,40}$/.test(action)) {
          while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
          el.parentNode.removeChild(el);
          continue;
        }
        if (!el.getAttribute("type")) el.setAttribute("type", "button");
        if (!actions[action]) {
          el.classList.add("note-btn--unavailable");
          el.setAttribute("aria-disabled", "true");
        }
      }
      if (tag === "div" && el.hasAttribute("data-note-include")) {
        var key = String(el.getAttribute("data-note-include") || "").trim();
        if (!RULE_INCLUDES[key]) el.removeAttribute("data-note-include");
      }
      if (el.hasAttribute("aria-label") && el.tagName.toLowerCase() !== "button") {
        el.removeAttribute("aria-label");
      }
    }
    var scrolls = fragment.querySelectorAll ? fragment.querySelectorAll(".note-table-scroll") : [];
    for (var s = scrolls.length - 1; s >= 0; s--) {
      var sc = scrolls[s];
      if (!sc.parentNode) continue;
      while (sc.firstChild) sc.parentNode.insertBefore(sc.firstChild, sc);
      sc.parentNode.removeChild(sc);
    }
    var tables = fragment.querySelectorAll ? fragment.querySelectorAll("table") : [];
    var tableList = [];
    for (var t = 0; t < tables.length; t++) tableList.push(tables[t]);
    tableList.forEach(function (table) {
      if (!table.classList.contains("note-table")) table.classList.add("note-table");
      if (opts.wrapTables === false || !table.parentNode) return;
      var wrap = root.document.createElement("div");
      wrap.className = "note-table-scroll";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
    if (opts.stripActions) {
      var actionNodes = fragment.querySelectorAll ? fragment.querySelectorAll("[data-note-action]") : [];
      for (var a = actionNodes.length - 1; a >= 0; a--) {
        var node = actionNodes[a];
        while (node.firstChild) node.parentNode.insertBefore(node.firstChild, node);
        node.parentNode.removeChild(node);
      }
    }
    return fragment;
  }

  function sanitizeNote(note, options) {
    var p = purify();
    if (!p) return null;
    var opts = options || {};
    var cfg = {
      ALLOWED_TAGS: NOTE_TAGS.slice(),
      ALLOWED_ATTR: NOTE_ATTRS.slice(),
      ALLOW_DATA_ATTR: true,
      ALLOW_ARIA_ATTR: true,
      FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "textarea", "select", "option", "svg", "math", "video", "audio", "source", "track", "canvas"],
      FORBID_ATTR: ["style", "id", "srcdoc"],
      KEEP_CONTENT: true,
      RETURN_DOM_FRAGMENT: true
    };
    var fragment = null;
    try {
      fragment = p.sanitize(String(note || ""), cfg);
    } catch (e) {
      return null;
    }
    if (!fragment || !fragment.querySelectorAll) return null;
    try {
      cleanNoteFragment(fragment, opts);
      if (opts.expandIncludes !== false) expandIncludes(fragment);
    } catch (e2) {
      return null;
    }
    return fragment;
  }

  function sanitizeHtml(note) {
    var fragment = sanitizeNote(note, { expandIncludes: false, wrapTables: false });
    if (!fragment) return null;
    var div = root.document.createElement("div");
    div.appendChild(fragment);
    return div.innerHTML;
  }

  function sanitizeComponent(html) {
    var p = purify();
    if (!p) return null;
    var fragment = null;
    try {
      fragment = p.sanitize(String(html || ""), {
        ALLOWED_TAGS: COMPONENT_TAGS.slice(),
        ALLOWED_ATTR: COMPONENT_ATTRS.slice(),
        ALLOW_DATA_ATTR: true,
        ALLOW_ARIA_ATTR: false,
        KEEP_CONTENT: true,
        RETURN_DOM_FRAGMENT: true
      });
    } catch (e) {
      return null;
    }
    if (!fragment || !fragment.querySelectorAll) return null;
    try {
      var nodes = fragment.querySelectorAll("*");
      for (var i = 0; i < nodes.length; i++) {
        sanitizeClassList(nodes[i], COMPONENT_CLASSES);
        for (var k = nodes[i].attributes.length - 1; k >= 0; k--) {
          var name = nodes[i].attributes[k].name.toLowerCase();
          if (name.indexOf("on") === 0) {
            nodes[i].removeAttribute(nodes[i].attributes[k].name);
            continue;
          }
          if (name.indexOf("data-") === 0 && !(name === "data-row" && nodes[i].tagName.toLowerCase() === "div")) {
            nodes[i].removeAttribute(nodes[i].attributes[k].name);
          }
        }
      }
    } catch (e2) {
      return null;
    }
    return fragment;
  }

  function resolveInclude(key) {
    var ruleKey = RULE_INCLUDES[key];
    if (!ruleKey) return null;
    var rules = null;
    try {
      rules = typeof namingRules !== "undefined" ? namingRules : null;
    } catch (e) {
      rules = null;
    }
    if (!rules) {
      try { rules = root.namingRules || null; } catch (e2) { rules = null; }
    }
    return rules && rules[ruleKey] ? rules[ruleKey] : null;
  }

  function expandIncludes(fragment) {
    var placeholders = fragment.querySelectorAll ? fragment.querySelectorAll("[data-note-include]") : [];
    var list = [];
    for (var i = 0; i < placeholders.length; i++) list.push(placeholders[i]);
    list.forEach(function (ph) {
      var key = String(ph.getAttribute("data-note-include") || "").trim();
      var wrap = root.document.createElement("div");
      wrap.className = "note-embed note-embed--rule";
      wrap.setAttribute("data-note-include", key);
      var html = resolveInclude(key);
      var component = html ? sanitizeComponent(html) : null;
      if (component) {
        wrap.appendChild(component);
      } else {
        wrap.className = "note-embed note-embed--missing";
        wrap.textContent = "Συστατικό μη διαθέσιμο: " + key;
      }
      if (ph.parentNode) ph.parentNode.replaceChild(wrap, ph);
    });
  }

  function bindImageFallback(container) {
    if (!container || container.getAttribute("data-note-img-bound") === "1") return;
    container.setAttribute("data-note-img-bound", "1");
    container.addEventListener("error", function (ev) {
      var img = ev.target;
      if (!img || !img.tagName || img.tagName.toLowerCase() !== "img") return;
      if (img.parentNode) img.parentNode.replaceChild(makeMissingImage(img), img);
    }, true);
  }

  function renderInto(container, note, format, options) {
    if (!container) return;
    var opts = options || {};
    var isHtml = normalizeFormat(format) === HTML;
    var fragment = isHtml ? sanitizeNote(note, opts) : null;
    container.classList.toggle("note-html", isHtml && !!fragment);
    if (fragment) {
      container.innerHTML = "";
      container.appendChild(fragment);
    } else {
      legacyRenderInto(container, note);
    }
    if (!opts.skipImageFallback) bindImageFallback(container);
  }

  function renderEditable(container, note) {
    if (!container) return false;
    if (!purify()) return false;
    renderInto(container, note, HTML, { skipImageFallback: true });
    if (!container.classList || !container.classList.contains("note-html")) return false;
    container.setAttribute("contenteditable", "true");
    container.setAttribute("role", "textbox");
    container.setAttribute("aria-multiline", "true");
    container.setAttribute("spellcheck", "true");
    if (!container.classList.contains("mu-note")) container.classList.add("mu-note");
    var embeds = container.querySelectorAll ? container.querySelectorAll("[data-note-include]") : [];
    for (var i = 0; i < embeds.length; i++) {
      embeds[i].setAttribute("contenteditable", "false");
    }
    return true;
  }

  function serializeEditable(container) {
    if (!container) return "";
    var clone = container.cloneNode(true);
    var embeds = clone.querySelectorAll ? clone.querySelectorAll("[data-note-include]") : [];
    for (var i = embeds.length - 1; i >= 0; i--) {
      var el = embeds[i];
      var key = String(el.getAttribute("data-note-include") || "").trim();
      var ph = root.document.createElement("div");
      if (key) ph.setAttribute("data-note-include", key);
      if (el.parentNode) el.parentNode.replaceChild(ph, el);
    }
    var scrolls = clone.querySelectorAll ? clone.querySelectorAll(".note-table-scroll") : [];
    for (var s = scrolls.length - 1; s >= 0; s--) {
      var sc = scrolls[s];
      if (!sc.parentNode) continue;
      while (sc.firstChild) sc.parentNode.insertBefore(sc.firstChild, sc);
      sc.parentNode.removeChild(sc);
    }
    var editableNodes = clone.querySelectorAll ? clone.querySelectorAll("[contenteditable]") : [];
    for (var e = 0; e < editableNodes.length; e++) editableNodes[e].removeAttribute("contenteditable");
    var boundNodes = clone.querySelectorAll ? clone.querySelectorAll("[data-note-img-bound]") : [];
    for (var b = 0; b < boundNodes.length; b++) boundNodes[b].removeAttribute("data-note-img-bound");
    if (clone.removeAttribute) {
      clone.removeAttribute("contenteditable");
      clone.removeAttribute("role");
      clone.removeAttribute("aria-multiline");
      clone.removeAttribute("spellcheck");
    }
    return clone.innerHTML;
  }

  function renderNote(card, note, format) {
    if (!card) return;
    renderInto(card, note, format);
    if (!card.classList) return;
    if (normalizeFormat(format) === HTML && card.classList.contains("note-html")) {
      card.classList.add("mu-note");
    } else {
      card.classList.remove("mu-note");
    }
  }

  function registerAction(name, handler) {
    if (!/^[a-z][a-z0-9-]{1,40}$/.test(String(name || ""))) return false;
    if (typeof handler !== "function") return false;
    actions[name] = handler;
    return true;
  }

  function bindActions() {
    if (actionsBound) return;
    actionsBound = true;
    root.document.addEventListener("click", function (ev) {
      var btn = ev.target && ev.target.closest ? ev.target.closest("[data-note-action]") : null;
      if (!btn) return;
      var name = btn.getAttribute("data-note-action");
      if (!name) return;
      ev.preventDefault();
      var handler = actions[name];
      if (!handler) {
        try { if (typeof fScenarioToast === "function") fScenarioToast("Η ενέργεια δεν είναι διαθέσιμη."); } catch (e) { /* toast best-effort */ }
        return;
      }
      try {
        handler(btn.getAttribute("data-note-arg"), ev);
      } catch (e2) {
        try { if (typeof fScenarioToast === "function") fScenarioToast("Η ενέργεια απέτυχε."); } catch (e3) { /* toast best-effort */ }
      }
    });
  }

  root.MuLERMoCNote = {
    TEXT: TEXT,
    HTML: HTML,
    normalizeFormat: normalizeFormat,
    isAvailable: function () { return !!purify(); },
    hasVisibleContent: hasVisibleContent,
    toPlainText: toPlainText,
    renderNote: renderNote,
    renderInto: renderInto,
    legacyTextToHtml: legacyTextToHtml,
    sanitizeHtml: sanitizeHtml,
    renderEditable: renderEditable,
    serializeEditable: serializeEditable,
    registerAction: registerAction,
    includes: Object.keys(RULE_INCLUDES)
  };

  bindActions();
})(typeof window !== "undefined" ? window : this);
