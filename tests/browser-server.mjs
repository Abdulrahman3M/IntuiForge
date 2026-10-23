import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const allowedRoots = [resolve(projectRoot, "tests", "browser"), resolve(projectRoot, "tests", "fixtures"), resolve(projectRoot, "packages")];
const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"], [".md", "text/markdown; charset=utf-8"], [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"], [".svg", "image/svg+xml"],
]);
const port = Number(process.env.INTUIFORGE_TEST_PORT || 4173);
const p10Webm = Buffer.from("GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwH/////////EU2bdKtNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHLTbuMU6uEElTDZ1OsggEY7AEAAAAAAABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmpSrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDIWVK5ryK4BAAAAAAAAP9eBAXPFiHVsflPCs9mYnIEAIrWcg3VuZIiBAIaFVl9WUDiDgQEj44OEHc1lAOCQsIGguoFamoECVbCEVbmBARJUw2fWc3OfY8CAZ8iZRaOHRU5DT0RFUkSHjExhdmY2My4xLjEwMnNzsWPAi2PFiHVsflPCs9mYZ8igRaOHRU5DT0RFUkSHk0xhdmM2My4xLjEwMiBsaWJ2cHgfQ7Z1QIzngQCj1IEAAIAwBgCdASqgAFoAAEcIhYWImYSIAgICdaoD+AP4AgbKk+CGqpNdxDqqTXcQ6qk13EOqpNdxDqqTXcQYAP7upj/+8Z50Fzf2Lv/d5sAYS/4QAKOxgQH0ALEDAAUQrAAYB0/4GoHzDQAAIALAAWAAsABYACwAFf/g/su38Wy6Y5nxDG4EKA==", "base64");

function buildP10Wav() {
  const sampleRate = 16000;
  const samples = sampleRate;
  const bytes = Buffer.alloc(44 + samples * 2);
  bytes.write("RIFF", 0); bytes.writeUInt32LE(bytes.length - 8, 4); bytes.write("WAVE", 8);
  bytes.write("fmt ", 12); bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22);
  bytes.writeUInt32LE(sampleRate, 24); bytes.writeUInt32LE(sampleRate * 2, 28); bytes.writeUInt16LE(2, 32); bytes.writeUInt16LE(16, 34);
  bytes.write("data", 36); bytes.writeUInt32LE(samples * 2, 40);
  for (let index = 0; index < samples; index += 1) bytes.writeInt16LE(Math.round(Math.sin(2 * Math.PI * 440 * index / sampleRate) * 7000), 44 + index * 2);
  return bytes;
}

function sendBinary(request, response, body, contentType) {
  const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range ?? "");
  const headers = { "Content-Type": contentType, "Accept-Ranges": "bytes", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (range) {
    const start = Number(range[1]); const end = Math.min(range[2] ? Number(range[2]) : body.length - 1, body.length - 1);
    if (start > end || start >= body.length) { response.writeHead(416, { "Content-Range": `bytes */${body.length}` }).end(); return; }
    const part = body.subarray(start, end + 1);
    response.writeHead(206, { ...headers, "Content-Length": part.length, "Content-Range": `bytes ${start}-${end}/${body.length}` });
    if (request.method === "HEAD") response.end(); else response.end(part);
    return;
  }
  response.writeHead(200, { ...headers, "Content-Length": body.length });
  if (request.method === "HEAD") response.end(); else response.end(body);
}

function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidate = resolve(projectRoot, `.${decoded}`);
  if (!allowedRoots.some((root) => candidate === root || candidate.startsWith(root + sep))) return null;
  return candidate;
}

const server = createServer(async (request, response) => {
  if (!new Set(["GET", "HEAD"]).has(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try { pathname = new URL(request.url, "http://127.0.0.1").pathname; } catch {
    response.writeHead(400).end();
    return;
  }
  if (pathname === "/favicon.ico") {
    response.writeHead(204).end();
    return;
  }
  if (pathname === "/tests/browser/p10/tone.wav") { sendBinary(request, response, buildP10Wav(), "audio/wav"); return; }
  if (pathname === "/tests/browser/p10/clip.webm") { sendBinary(request, response, p10Webm, "video/webm"); return; }
  let target;
  try { target = resolveRequest(pathname); } catch {
    response.writeHead(400).end();
    return;
  }
  if (!target) {
    response.writeHead(404).end();
    return;
  }
  try {
    const info = await stat(target);
    if (!info.isFile()) throw new Error("not-file");
    const body = await readFile(target);
    const csp = pathname === "/tests/browser/p13.html"
      ? "default-src 'self'; script-src 'self'; style-src 'self' 'nonce-p13-fixture'; style-src-attr 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
      : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; object-src 'none'; base-uri 'none'";
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(target)) || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
      "Content-Security-Policy": csp,
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") response.end(); else response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});

server.on("error", (error) => {
  process.stderr.write(`IntuiForge browser test server could not start: ${error.message}\n`);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`IntuiForge browser fixtures: http://127.0.0.1:${port}/tests/browser/p01.html, /tests/browser/p03.html, /tests/browser/p05.html, /tests/browser/p06.html, /tests/browser/p07.html, /tests/browser/p10.html, /tests/browser/p12-plain.html, /tests/browser/p12-framework.html, /tests/browser/p12-static.html, /tests/browser/p13.html, and /tests/browser/p14.html\n`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
