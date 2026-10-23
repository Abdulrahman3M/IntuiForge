const MATHML_NS = "http://www.w3.org/1998/Math/MathML";
const GREEK = Object.freeze({
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", theta: "θ", lambda: "λ", mu: "μ", pi: "π", rho: "ρ", sigma: "σ", tau: "τ", phi: "φ", omega: "ω",
  Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Pi: "Π", Sigma: "Σ", Phi: "Φ", Omega: "Ω",
});
const OPERATORS = Object.freeze({ times: "×", cdot: "⋅", le: "≤", leq: "≤", ge: "≥", geq: "≥", neq: "≠", pm: "±", infty: "∞", sum: "∑", int: "∫", to: "→", rightarrow: "→", leftarrow: "←", approx: "≈" });
const ALLOWED_PUNCTUATION = new Set("+-=*/().,[]|<>:;!%".split(""));

function mathNode(tag, value = undefined, children = undefined) {
  return { tag, ...(value === undefined ? {} : { value }), ...(children === undefined ? {} : { children }) };
}

/** Parse a deliberately bounded TeX-like subset into a MathML-shaped tree. */
export function parseMathNotation(source) {
  if (typeof source !== "string" || !source.trim()) throw new SyntaxError("Math notation is empty.");
  if (source.length > 4096) throw new SyntaxError("Math notation exceeds the 4096 character limit.");
  let cursor = 0;
  let nodeCount = 0;
  const make = (...args) => {
    nodeCount += 1;
    if (nodeCount > 512) throw new SyntaxError("Math notation exceeds the 512 node limit.");
    return mathNode(...args);
  };

  function readGroup() {
    if (source[cursor] !== "{") throw new SyntaxError("A math command requires a braced argument.");
    cursor += 1;
    const nodes = parseSequence(true);
    if (!nodes.length) throw new SyntaxError("Math groups cannot be empty.");
    return nodes.length === 1 ? nodes[0] : make("mrow", undefined, nodes);
  }

  function readTextGroup() {
    if (source[cursor] !== "{") throw new SyntaxError("\\text requires a braced argument.");
    cursor += 1;
    const start = cursor;
    while (cursor < source.length && source[cursor] !== "}") {
      if (source[cursor] === "{" || source[cursor] === "\\") throw new SyntaxError("\\text accepts plain text only.");
      cursor += 1;
    }
    if (source[cursor] !== "}") throw new SyntaxError("Unclosed math group.");
    const value = source.slice(start, cursor);
    cursor += 1;
    if (!value.trim()) throw new SyntaxError("Math text cannot be empty.");
    return make("mtext", value);
  }

  function readCommand() {
    cursor += 1;
    if (cursor >= source.length) throw new SyntaxError("Incomplete math command.");
    const commandMatch = /^[A-Za-z]+/.exec(source.slice(cursor));
    const command = commandMatch?.[0] ?? source[cursor++];
    if (commandMatch) cursor += command.length;
    if (command === "frac") return make("mfrac", undefined, [readGroup(), readGroup()]);
    if (command === "sqrt") return make("msqrt", undefined, [readGroup()]);
    if (command === "text") return readTextGroup();
    if (Object.hasOwn(GREEK, command)) return make("mi", GREEK[command]);
    if (Object.hasOwn(OPERATORS, command)) return make("mo", OPERATORS[command]);
    if (command === "," || command === ";" || command === " ") return make("mspace");
    throw new SyntaxError(`Unsupported math command \\${command}.`);
  }

  function readAtom() {
    const character = source[cursor];
    if (character === "\\") return readCommand();
    if (character === "{") return readGroup();
    if (character === "}" || character === undefined) throw new SyntaxError("Unexpected end of a math group.");
    if (/\d/.test(character)) {
      const match = /^\d+(?:\.\d+)?/.exec(source.slice(cursor))[0];
      cursor += match.length;
      return make("mn", match);
    }
    if (/[A-Za-z]/.test(character)) {
      const match = /^[A-Za-z]+/.exec(source.slice(cursor))[0];
      cursor += match.length;
      return make("mi", match);
    }
    if (ALLOWED_PUNCTUATION.has(character)) {
      cursor += 1;
      return make("mo", character);
    }
    throw new SyntaxError(`Unsupported math character "${character}".`);
  }

  function parseSequence(stopAtBrace = false) {
    const nodes = [];
    while (cursor < source.length) {
      const character = source[cursor];
      if (character === "}") {
        if (!stopAtBrace) throw new SyntaxError("Unmatched closing brace.");
        cursor += 1;
        return nodes;
      }
      if (/\s/.test(character)) { cursor += 1; continue; }
      let base = readAtom();
      let sub;
      let sup;
      while (source[cursor] === "_" || source[cursor] === "^") {
        const kind = source[cursor++];
        if (kind === "_" ? sub !== undefined : sup !== undefined) throw new SyntaxError("A math atom cannot repeat the same script.");
        const value = source[cursor] === "{" ? readGroup() : readAtom();
        if (kind === "_") sub = value; else sup = value;
      }
      if (sub && sup) base = make("msubsup", undefined, [base, sub, sup]);
      else if (sub) base = make("msub", undefined, [base, sub]);
      else if (sup) base = make("msup", undefined, [base, sup]);
      nodes.push(base);
    }
    if (stopAtBrace) throw new SyntaxError("Unclosed math group.");
    return nodes;
  }

  const children = parseSequence(false);
  if (!children.length) throw new SyntaxError("Math notation is empty.");
  return make("mrow", undefined, children);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function serializeMathNode(node) {
  const children = (node.children ?? []).map(serializeMathNode).join("");
  if (node.tag === "mspace") return '<mspace width="0.25em"/>';
  return `<${node.tag}>${node.value === undefined ? children : escapeHtml(node.value)}</${node.tag}>`;
}

export function mathNotationToMarkup(source, { display = "block" } = {}) {
  const ast = parseMathNotation(source);
  const mode = display === "inline" ? "inline" : "block";
  return `<math xmlns="${MATHML_NS}" display="${mode}" dir="ltr" aria-label="${escapeHtml(source)}"><semantics>${serializeMathNode(ast)}<annotation encoding="application/x-tex">${escapeHtml(source)}</annotation></semantics></math>`;
}

function createMathNode(document, node) {
  const element = document.createElementNS(MATHML_NS, node.tag);
  if (node.tag === "mspace") element.setAttribute("width", "0.25em");
  if (node.value !== undefined) element.textContent = node.value;
  for (const child of node.children ?? []) element.appendChild(createMathNode(document, child));
  return element;
}

export function createMathML(document, source, { display = "block" } = {}) {
  const ast = parseMathNotation(source);
  const math = document.createElementNS(MATHML_NS, "math");
  math.setAttribute("xmlns", MATHML_NS);
  math.setAttribute("display", display === "inline" ? "inline" : "block");
  math.setAttribute("dir", "ltr");
  math.setAttribute("aria-label", source);
  const semantics = document.createElementNS(MATHML_NS, "semantics");
  semantics.appendChild(createMathNode(document, ast));
  const annotation = document.createElementNS(MATHML_NS, "annotation");
  annotation.setAttribute("encoding", "application/x-tex"); annotation.textContent = source;
  semantics.appendChild(annotation); math.appendChild(semantics);
  return math;
}

const KEYWORDS = Object.freeze({
  javascript: new Set("const let var function return if else for while class new async await import from export default throw try catch true false null undefined this typeof".split(" ")),
  typescript: new Set("const let var function return if else for while class new async await import from export default throw try catch true false null undefined this type interface".split(" ")),
  python: new Set("def class return if elif else for while import from as raise try except finally True False None and or not in is lambda with async await".split(" ")),
  json: new Set("true false null".split(" ")),
  bash: new Set("if then else fi for in do done function export local readonly".split(" ")),
});

/** Split source into text tokens; the caller creates text nodes, never HTML. */
export function tokenizeCode(source, language = "text") {
  const text = String(source ?? "");
  const normalized = String(language ?? "text").toLowerCase();
  const keywords = KEYWORDS[normalized] ?? KEYWORDS[normalized === "js" ? "javascript" : normalized === "ts" ? "typescript" : normalized] ?? new Set();
  const pattern = /\s+|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|[^\s]/gy;
  const tokens = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    if (start > cursor) tokens.push({ type: "plain", text: text.slice(cursor, start) });
    const value = match[0];
    if (/^\s+$/.test(value)) { tokens.push({ type: "plain", text: value }); cursor = start + value.length; continue; }
    let type = "plain";
    if (/^(?:"|'|`)/.test(value)) type = "string";
    else if (/^(?:\/\/|#|\/\*)/.test(value)) type = "comment";
    else if (/^\d/.test(value)) type = "number";
    else if (keywords.has(value)) type = "keyword";
    tokens.push({ type, text: value });
    cursor = start + value.length;
  }
  if (cursor < text.length) tokens.push({ type: "plain", text: text.slice(cursor) });
  return tokens;
}

function appendText(document, parent, value) {
  if (typeof document.createTextNode === "function") parent.appendChild(document.createTextNode(value));
  else { const span = document.createElement("span"); span.textContent = value; parent.appendChild(span); }
}

export function createSafeCodeNode(document, source, language = "text") {
  const code = document.createElement("code");
  code.setAttribute("class", `language-${/^[a-z0-9+-]{1,32}$/i.test(language) ? language.toLowerCase() : "text"}`);
  for (const token of tokenizeCode(source, language)) {
    if (token.type === "plain") appendText(document, code, token.text);
    else {
      const span = document.createElement("span"); span.setAttribute("class", `if-code-token if-code-${token.type}`); span.textContent = token.text; code.appendChild(span);
    }
  }
  return code;
}

export function buildCitationPlan(article) {
  const sources = new Map((article.metadata?.sources ?? []).map((source) => [source.id, source]));
  const byBlockId = new Map();
  const byKey = new Map();
  const entries = [];
  const visit = (block) => {
    if (!block || typeof block !== "object") return;
    if (block.type === "citation" && (block.props?.sourceId || block.props?.note)) {
      const key = block.props?.sourceId ? `source:${block.props.sourceId}` : `note:${block.id}`;
      let entry = byKey.get(key);
      if (!entry) {
        entry = { id: block.props?.sourceId ? `reference-${block.props.sourceId}` : `footnote-${block.id}`, number: entries.length + 1, source: sources.get(block.props?.sourceId), sourceId: block.props?.sourceId, note: block.props?.note, blockIds: [], kind: block.props?.sourceId ? "source" : "note" };
        byKey.set(key, entry); entries.push(entry);
      } else if (block.props?.note && !entry.note) entry.note = block.props.note;
      entry.blockIds.push(block.id); byBlockId.set(block.id, entry);
    }
    for (const child of block.children ?? []) visit(child);
  };
  for (const section of article.sections ?? []) for (const block of section.blocks ?? []) visit(block);
  return { entries, byBlockId };
}

function toBase64(bytes, encode) {
  if (typeof encode !== "function") throw new Error("This browser cannot verify integrity metadata.");
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  return encode(binary);
}

const MAX_VERIFIED_ASSET_BYTES = 10 * 1024 * 1024;
const MAX_SVG_ASSET_BYTES = 1024 * 1024;
const SAFE_SVG_ELEMENTS = new Set(["svg", "g", "defs", "linearGradient", "stop", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon", "text", "tspan", "title", "desc"]);
const SAFE_SVG_ATTRIBUTES = new Set(["xmlns", "id", "class", "viewBox", "width", "height", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "d", "points", "fill", "fill-opacity", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-opacity", "opacity", "transform", "text-anchor", "font-size", "font-family", "role", "aria-label", "aria-labelledby", "offset", "stop-color", "stop-opacity"]);

async function readBoundedResponse(response, limit) {
  const declared = Number(response.headers?.get?.("content-length"));
  if (Number.isFinite(declared) && declared > limit) {
    try { await response.body?.cancel?.(); } catch { /* cancel failure cannot make an oversized body safe */ }
    throw new Error("Asset exceeds the supported size limit.");
  }
  if (response.body?.getReader) {
    const reader = response.body.getReader();
    const chunks = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > limit) {
          await reader.cancel();
          throw new Error("Asset exceeds the supported size limit.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock?.();
    }
    const output = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.byteLength; }
    return output;
  }
  if (!Number.isFinite(declared) || declared < 0 || typeof response.arrayBuffer !== "function") throw new Error("Browser cannot safely bound this asset response.");
  const buffer = await response.arrayBuffer();
  if (buffer.byteLength > limit) throw new Error("Asset exceeds the supported size limit.");
  return new Uint8Array(buffer);
}

function sanitizeSvg(bytes, view) {
  if (bytes.byteLength > MAX_SVG_ASSET_BYTES) throw new Error("SVG asset exceeds the supported size limit.");
  const Parser = view.DOMParser ?? globalThis.DOMParser;
  const Serializer = view.XMLSerializer ?? globalThis.XMLSerializer;
  if (!Parser || !Serializer) throw new Error("SVG sanitization is not supported in this browser.");
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(text)) throw new Error("SVG asset declarations are not supported.");
  const document = new Parser().parseFromString(text, "image/svg+xml");
  const root = document.documentElement;
  if (!root || root.localName !== "svg" || root.namespaceURI !== "http://www.w3.org/2000/svg" || document.querySelector("parsererror")) throw new Error("SVG asset is malformed.");
  const pending = [root];
  const nodes = [];
  const ids = new Set();
  while (pending.length) {
    const node = pending.pop();
    if (!SAFE_SVG_ELEMENTS.has(node.localName) || node.namespaceURI !== "http://www.w3.org/2000/svg") throw new Error("SVG asset contains unsupported markup.");
    nodes.push(node);
    const id = node.getAttribute("id");
    if (id) {
      if (!/^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/.test(id) || ids.has(id)) throw new Error("SVG asset contains an invalid or duplicate identifier.");
      ids.add(id);
    }
    for (const child of [...node.childNodes]) {
      if (child.nodeType === 1) pending.push(child);
      else if (child.nodeType !== 3 && child.nodeType !== 4) throw new Error("SVG asset contains unsupported content.");
    }
  }
  for (const node of nodes) {
    for (const attribute of [...node.attributes]) {
      const value = attribute.value;
      const internalReference = /^url\(#([A-Za-z][A-Za-z0-9_.:-]{0,127})\)$/.exec(value);
      if (!SAFE_SVG_ATTRIBUTES.has(attribute.name) || attribute.name.toLowerCase().startsWith("on") || /(?:javascript:|data:|[\u0000-\u001f])/i.test(value) || /url\s*\(/i.test(value) && (!internalReference || !ids.has(internalReference[1]))) throw new Error("SVG asset contains an unsafe attribute.");
      if (attribute.name === "xmlns" && value !== "http://www.w3.org/2000/svg") throw new Error("SVG namespace is invalid.");
    }
  }
  return new TextEncoder().encode(new Serializer().serializeToString(root));
}

/** Verify declared SRI and sanitize local SVG assets before display. */
export async function fetchVerifiedAsset(document, source, asset, signal) {
  const hasIntegrity = Boolean(asset?.integrity);
  const isSvg = asset?.type?.toLowerCase() === "image/svg+xml";
  if (!hasIntegrity && !isSvg) return { source, state: "not-required", revoke() {} };
  const view = document.defaultView ?? globalThis;
  const crypto = view.crypto ?? globalThis.crypto;
  const fetcher = view.fetch?.bind(view) ?? globalThis.fetch;
  const URLConstructor = view.URL ?? globalThis.URL;
  const algorithm = hasIntegrity ? /^sha(256|384|512)-/.exec(asset.integrity)?.[1] : undefined;
  if ((hasIntegrity && (!algorithm || !crypto?.subtle)) || typeof fetcher !== "function" || typeof URLConstructor?.createObjectURL !== "function" || typeof view.Blob !== "function") throw new Error("Asset verification is not supported in this browser.");
  const assetUrl = new URLConstructor(source, document.baseURI);
  if (!hasIntegrity && assetUrl.origin !== new URLConstructor(document.baseURI).origin) throw new Error("Cross-origin assets require integrity metadata.");
  const response = await fetcher(assetUrl.href, { credentials: "omit", referrerPolicy: "no-referrer", signal });
  if (!response?.ok) throw new Error(`Asset request failed (${response?.status ?? "unavailable"}).`);
  let bytes = await readBoundedResponse(response, MAX_VERIFIED_ASSET_BYTES);
  if (hasIntegrity) {
    const digest = new Uint8Array(await crypto.subtle.digest(`SHA-${algorithm}`, bytes));
    const actual = `sha${algorithm}-${toBase64(digest, view.btoa?.bind(view) ?? globalThis.btoa)}`;
    if (actual !== asset.integrity) throw new Error("The asset digest does not match its manifest integrity value.");
  }
  if (isSvg) bytes = sanitizeSvg(bytes, view);
  const objectUrl = URLConstructor.createObjectURL(new view.Blob([bytes], { type: asset.type }));
  return { source: objectUrl, state: hasIntegrity ? "verified" : "sanitized", revoke() { URLConstructor.revokeObjectURL(objectUrl); } };
}
