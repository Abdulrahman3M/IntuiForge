import assert from "node:assert/strict";
import { createHash, webcrypto } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createIntuiEngine } from "../packages/core/src/index.js";
import { validateArticle } from "../packages/article/src/index.js";
import { registerArticleRenderer, renderArticleStatic } from "../packages/article-renderer/src/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const imageBytes = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#dceeff"/></svg>');
const sri = `sha256-${createHash("sha256").update(imageBytes).digest("base64")}`;

class FakeNode {
  constructor(tagName = "div", namespaceURI = null) {
    this.tagName = tagName.toUpperCase(); this.localName = tagName; this.namespaceURI = namespaceURI;
    this.children = []; this.parentNode = null; this.attributes = new Map(); this.dataset = {};
    this.listeners = new Map(); this.value = ""; this.hidden = false; this.open = false;
  }
  set textContent(value) { this._text = String(value ?? ""); this.children = []; }
  get textContent() { return `${this._text ?? ""}${this.children.map((child) => child.textContent).join("")}`; }
  append(...nodes) { for (const node of nodes) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.push(node); } }
  appendChild(node) { this.append(node); return node; }
  prepend(...nodes) { for (const node of [...nodes].reverse()) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.unshift(node); } }
  removeChild(node) { const index = this.children.indexOf(node); if (index >= 0) this.children.splice(index, 1); node.parentNode = null; return node; }
  replaceChildren(...nodes) { for (const child of [...this.children]) this.removeChild(child); this.append(...nodes); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === "id") this.id = String(value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, listener) { const listeners = this.listeners.get(type) ?? new Set(); listeners.add(listener); this.listeners.set(type, listeners); }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  focus() { this.focused = true; }
  attachShadow() { this.shadowRoot = new FakeNode("#shadow-root"); return this.shadowRoot; }
  async dispatch(type, event = {}) {
    const dispatched = { type, target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...event };
    await Promise.all([...(this.listeners.get(type) ?? [])].map((listener) => listener(dispatched)));
    return dispatched;
  }
}

class FakeDocument {
  constructor() {
    this.baseURI = "http://127.0.0.1:4173/";
    const revoked = [];
    this.revoked = revoked;
    this.defaultView = {
      crypto: webcrypto,
      URL: class extends URL { static createObjectURL() { return "blob:p10-verified"; } static revokeObjectURL(value) { revoked.push(value); } },
      Blob: globalThis.Blob,
      fetch: async () => new Response(imageBytes, { status: 200, headers: { "Content-Type": "image/svg+xml" } }),
      navigator: { clipboard: { writeText: async (value) => { this.copied = value; } } },
    };
  }
  createElement(name) { const node = new FakeNode(name); node.ownerDocument = this; return node; }
  createElementNS(namespace, name) { const node = new FakeNode(name, namespace); node.ownerDocument = this; return node; }
}

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children ?? []) { const result = find(child, predicate); if (result) return result; }
  return undefined;
}

function articleFixture() {
  const article = JSON.parse(readFileSync(resolve(here, "fixtures", "p02", "valid", "minimal-article.json"), "utf8"));
  article.id = "p10-media-demo"; article.locale = "ar"; article.dir = "rtl"; article.metadata.supportedLocales = ["ar"];
  article.metadata.sources = [
    { id: "source-one", title: "Accessible Media Guide", publisher: "Example Lab", url: "https://example.org/media", license: "CC BY 4.0" },
    { id: "source-two", title: "Math Rendering Notes", publisher: "Example Lab" },
  ];
  article.assets = [
    { id: "scene", url: "/tests/browser/p10/scene.svg", type: "image/png", alt: "رسم توضيحي لمشهد علمي", license: "CC0-1.0", provenance: "author supplied", integrity: sri, width: 320, height: 180 },
    { id: "tone", url: "/tests/browser/p10/tone.wav", type: "audio/wav", alt: "نغمة اختبار قصيرة", license: "CC0-1.0", provenance: "author supplied", captions: { ar: "يبدأ الصوت ثم يتوقف." }, captionTracks: [{ assetId: "arabic-captions", locale: "ar", label: "العربية", kind: "captions" }] },
    { id: "clip", url: "/tests/browser/p10/clip.webm", type: "video/webm", alt: "مقطع اختبار مرئي", license: "CC0-1.0", provenance: "author supplied", captionTracks: [{ assetId: "arabic-captions", locale: "ar", label: "العربية", kind: "captions" }] },
    { id: "arabic-captions", url: "/tests/browser/p10/captions-ar.vtt", type: "text/vtt", alt: "ترجمة عربية للمقطع", license: "CC0-1.0", provenance: "author supplied" },
  ];
  article.sections = [{ id: "overview", heading: "وسائط ومراجع", blocks: [
    { id: "audio-example", type: "audio", content: "مقطع صوتي اختباري", props: { assetId: "tone", transcript: "هذا نص بديل للمقطع الصوتي." } },
    { id: "video-example", type: "video", content: "مقطع مرئي اختباري", props: { assetId: "clip", transcript: "يظهر مشهد بلون أزرق." } },
    { id: "annotated-scene", type: "figure", content: "الشكل 1: مشهد اختباري", props: { assetId: "scene", hotspots: [{ id: "hotspot-core", label: "المركز", description: "منطقة مركزية", x: 50, y: 50 }] } },
    { id: "math-example", type: "math", content: "\\frac{a}{b} + x_2^2", props: { display: "block" } },
    { id: "math-invalid", type: "math", content: "\\unknown{x}" },
    { id: "citation-one", type: "citation", content: "مرجع الوسائط", props: { sourceId: "source-one" } },
    { id: "citation-two", type: "citation", content: "مرجع الرياضيات", props: { sourceId: "source-two" } },
    { id: "code-example", type: "code", content: "const result = process.exit(1);", props: { language: "javascript" } },
  ] }];
  return article;
}

async function mountFixture(article, configureDocument = undefined) {
  const previousDocument = globalThis.document;
  const document = new FakeDocument(); globalThis.document = document;
  configureDocument?.(document);
  const engine = createIntuiEngine({ validateArticle }); registerArticleRenderer(engine);
  const container = new FakeNode("div"); const handle = engine.mount(container, article, { document });
  await handle.ready;
  return { article, container, document, engine, handle, restore() { globalThis.document = previousDocument; } };
}

test("MED-01/02 validate manifest caption tracks and provide accessible media with a real playback-rate control", async () => {
  const article = articleFixture();
  const validation = validateArticle(article);
  assert.equal(validation.ok, true, JSON.stringify(validation.errors));
  const missingTrack = structuredClone(article); missingTrack.assets[1].captionTracks[0].assetId = "missing-vtt";
  assert.ok(validateArticle(missingTrack).errors.some((error) => error.code === "UNKNOWN_CAPTION_TRACK_ASSET" && error.path === "/assets/1/captionTracks/0/assetId"));
  const wrongMime = structuredClone(article); wrongMime.assets[1].captionTracks[0].assetId = "scene";
  assert.ok(validateArticle(wrongMime).errors.some((error) => error.code === "INVALID_CAPTION_TRACK_TYPE"));

  const mounted = await mountFixture(article);
  try {
    const root = mounted.container.shadowRoot;
    const audio = find(root, (node) => node.tagName === "AUDIO");
    const video = find(root, (node) => node.tagName === "VIDEO");
    assert.ok(audio && video); assert.equal(audio.getAttribute("controls"), ""); assert.equal(video.getAttribute("preload"), "none");
    assert.equal(find(audio, (node) => node.tagName === "TRACK")?.getAttribute("srclang"), "ar");
    assert.match(root.textContent, /هذا نص بديل للمقطع الصوتي/);
    const speed = find(audio.parentNode, (node) => node.getAttribute("data-speed-menu-toggle") !== null);
    assert.equal(speed?.getAttribute("aria-label"), "سرعة التشغيل", "icon-only speed trigger has a descriptive accessible name");
    const speedOptions = find(audio.parentNode, (node) => node.getAttribute("role") === "group" && node.getAttribute("aria-label") === "خيارات سرعة التشغيل");
    await speed.dispatch("click"); assert.equal(speedOptions.hidden, false);
    const speedChoice = find(speedOptions, (node) => node.getAttribute("data-playback-rate") === "1.5");
    assert.ok(speedChoice); await speedChoice.dispatch("click"); assert.equal(audio.playbackRate, 1.5);
    await speed.dispatch("click");
    const keyboardTarget = find(speedOptions, (node) => node.getAttribute("data-playback-rate") === "1.5");
    await speedOptions.dispatch("keydown", { key: "Escape", target: keyboardTarget });
    assert.equal(speedOptions.hidden, true); assert.equal(speed.focused, true);
    await audio.dispatch("error");
    assert.match(find(audio.parentNode, (node) => node.tagName === "P" && node.getAttribute("role") === "status")?.textContent, /تعذّر تحميل/);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("MED-03 renders validated, keyboard-focusable hotspots, alternatives and a working zoom toggle", async () => {
  const article = articleFixture();
  const bad = structuredClone(article); bad.sections[0].blocks[2].props.hotspots[0].x = 120;
  const badValidation = validateArticle(bad);
  assert.ok(badValidation.errors.some((error) => error.code === "INVALID_HOTSPOT_POSITION"), JSON.stringify(badValidation.errors));
  const mounted = await mountFixture(article);
  try {
    const root = mounted.container.shadowRoot; const figure = find(root, (node) => node.id === "annotated-scene");
    const hotspot = find(figure, (node) => node.getAttribute("data-hotspot-id") === "hotspot-core");
    const zoom = find(figure, (node) => node.getAttribute("data-image-zoom") !== null);
    assert.ok(hotspot && hotspot.focused !== true); hotspot.focus(); assert.equal(hotspot.focused, true);
    await hotspot.dispatch("click"); assert.match(figure.textContent, /منطقة مركزية/);
    assert.ok(zoom); await zoom.dispatch("click"); assert.equal(zoom.getAttribute("aria-expanded"), "true");
    assert.equal(find(figure, (node) => node.tagName === "IMG")?.getAttribute("alt"), "رسم توضيحي لمشهد علمي");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("MED-04 citations number in first-use order, link to sources and provide backlinks", async () => {
  const article = articleFixture();
  const unknown = structuredClone(article); unknown.sections[0].blocks[5].props.sourceId = "not-declared";
  assert.ok(validateArticle(unknown).errors.some((error) => error.code === "UNKNOWN_CITATION_SOURCE"));
  const mounted = await mountFixture(article);
  try {
    const root = mounted.container.shadowRoot;
    assert.equal(find(root, (node) => node.getAttribute("href") === "#reference-source-one")?.textContent, "[1]");
    assert.equal(find(root, (node) => node.getAttribute("href") === "#reference-source-two")?.textContent, "[2]");
    const backlink = find(root, (node) => node.getAttribute("href") === "#citation-one");
    const reference = find(root, (node) => node.id === "reference-source-one");
    const citation = find(root, (node) => node.id === "citation-one");
    const citationLink = find(citation, (node) => node.getAttribute("href") === "#reference-source-one");
    assert.ok(backlink, "source entry links back to the first citation"); assert.ok(reference);
    const forward = await citationLink.dispatch("click");
    assert.equal(forward.defaultPrevented, true); assert.equal(reference.focused, true, "citation navigation focuses its reference target");
    const back = await backlink.dispatch("click");
    assert.equal(back.defaultPrevented, true); assert.equal(citation.focused, true, "the backlink focuses the original citation");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("MED-05 builds MathML from a bounded notation grammar and reports unsupported commands", async () => {
  const article = articleFixture(); const mounted = await mountFixture(article);
  try {
    const root = mounted.container.shadowRoot;
    const math = find(root, (node) => node.namespaceURI === "http://www.w3.org/1998/Math/MathML" && node.localName === "math");
    assert.ok(math); assert.ok(find(math, (node) => node.localName === "mfrac")); assert.equal(math.getAttribute("dir"), "ltr");
    const error = find(root, (node) => node.id === "math-invalid");
    assert.ok(find(error, (node) => node.getAttribute("role") === "status"));
    assert.match(find(error, (node) => node.tagName === "CODE")?.textContent, /\\unknown/);
    const staticHtml = renderArticleStatic(article);
    assert.match(staticHtml, /<math[^>]*xmlns="http:\/\/www\.w3\.org\/1998\/Math\/MathML"/);
    assert.doesNotMatch(staticHtml, /<script>bad\(\)<\/script>/);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("MED-06 tokenizes untrusted code as text and copies it only after explicit activation", async () => {
  const mounted = await mountFixture(articleFixture());
  try {
    const root = mounted.container.shadowRoot; const codeBlock = find(root, (node) => node.id === "code-example");
    assert.equal(find(codeBlock, (node) => node.tagName === "SCRIPT"), undefined);
    assert.equal(find(codeBlock, (node) => node.tagName === "CODE")?.textContent, "const result = process.exit(1);");
    assert.ok(find(codeBlock, (node) => node.tagName === "SPAN" && node.getAttribute("class")?.includes("token")));
    const copyButton = find(codeBlock, (node) => node.getAttribute("data-copy-code") !== null);
    assert.ok(copyButton); await copyButton.dispatch("click"); assert.equal(mounted.document.copied, "const result = process.exit(1);");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("MED-07 verifies supplied SRI before display, preserves local asset attribution and revokes temporary resources", async () => {
  const article = articleFixture(); const mounted = await mountFixture(article);
  try {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const root = mounted.container.shadowRoot; const image = find(root, (node) => node.tagName === "IMG");
    assert.equal(image.getAttribute("src"), "blob:p10-verified", `${image.getAttribute("data-integrity-state")}: ${find(root, (node) => node.getAttribute("role") === "status")?.textContent}`);
    assert.equal(image.getAttribute("data-integrity-state"), "verified");
    assert.equal(article.assets[0].url, "/tests/browser/p10/scene.svg");
    assert.equal(article.assets[0].license, "CC0-1.0"); assert.equal(article.assets[0].provenance, "author supplied");
    const staticHtml = renderArticleStatic(article);
    assert.doesNotMatch(staticHtml, /\/tests\/browser\/p10\/scene\.svg/, "static output must not bypass integrity verification");
    assert.match(staticHtml, /رسم توضيحي لمشهد علمي/, "static output retains the descriptive fallback");
    await mounted.handle.dispose(); assert.deepEqual(mounted.document.revoked, ["blob:p10-verified"]);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("MED-07 rejects an asset whose downloaded bytes do not match manifest integrity and keeps the text alternative", async () => {
  const article = articleFixture();
  const mounted = await mountFixture(article, (document) => { document.defaultView.fetch = async () => new Response("tampered bytes", { status: 200 }); });
  try {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const root = mounted.container.shadowRoot; const image = find(root, (node) => node.tagName === "IMG");
    assert.equal(image.getAttribute("data-integrity-state"), "failed"); assert.equal(image.getAttribute("src"), null);
    const status = find(image.parentNode.parentNode, (node) => node.getAttribute("role") === "status");
    assert.ok(status.textContent.includes(article.assets[0].alt), "failure keeps the media text alternative");
    assert.doesNotMatch(status.textContent, /https?:\/\//, "network exception details stay out of user-visible status text");
    assert.equal(image.getAttribute("alt"), "رسم توضيحي لمشهد علمي");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});
