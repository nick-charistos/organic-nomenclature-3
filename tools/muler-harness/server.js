// Minimal static server for the MuLERMoC repo (no-cache, correct MIME).
// Run from anywhere: node tools/muler-harness/server.js [port]
// Serves the repo root (assumes this file lives at <repo>/tools/muler-harness/).
const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = path.normalize(path.join(__dirname, "..", ".."));
const CHROME = process.env.MULER_CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".sdf": "chemical/x-mdl-sdfile", ".mol": "chemical/x-mdl-molfile", ".spt": "text/plain", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf" };
const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/mulermoc-nom-55.html";
    const file = path.normalize(path.join(ROOT, urlPath));
    if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end("nf"); return; }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
      res.end(data);
    });
  } catch (e) { res.writeHead(500); res.end(); }
});
const port = parseInt(process.argv[2] || "8901", 10);
server.listen(port, () => console.log("serving " + ROOT + " on " + port));
