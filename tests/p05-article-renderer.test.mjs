import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createIntuiEngine } from "../packages/core/src/index.js";
import { validateArticle } from "../packages/article/src/index.js";
import { registerArticleRenderer, renderArticleStatic } from "@intuiforge/engine/article-renderer";

const here = dirname(fileURLToPath(import.meta.url));

class FakeNode {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.dataset = {};
    this.listeners = new Map();
    this.classNames = new Set();
    this.classList = { add: (...names) => names.forEach((name) => this.classNames.add(name)) };
    this.value = "";
    this.hidden = false;
    this.open = false;
  }
  set textContent(value) { this._text = String(value ?? ""); this.children = []; }
  get textContent() { return `${this._text ?? ""}${this.children.map((child) => child.textContent).join("")}`; }
  append(...nodes) { for (const node of nodes) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.push(node); } }
  appendChild(node) { this.append(node); return node; }
  prepend(...nodes) { for (const node of [...nodes].reverse()) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.unshift(node); } }
  removeChild(node) { const index = this.children.indexOf(node); if (index >= 0) this.children.splice(index, 1); node.parentNode = null; return node; }
  replaceChildren(...nodes) { for (const child of [...this.children]) this.removeChild(child); this.append(...nodes); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === "id") this.id = String(value); if (name === "dir") this.dir = String(value); if (name === "lang") this.lang = String(value); if (name === "type") this.type = String(value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, listener) { const listeners = this.listeners.get(type) ?? new Set(); listeners.add(listener); this.listeners.set(type, listeners); }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  focus() { this.focused = true; }
  dispatch(type, event = {}) { for (const listener of this.listeners.get(type) ?? []) listener({ type, target: this, preventDefault() {}, ...event }); }
  attachShadow() { this.shadowRoot = new FakeNode("#shadow-root"); return this.shadowRoot; }
}

class FakeDocument {
  createElement(name) { const node = new FakeNode(name); node.ownerDocument = this; return node; }
}

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children ?? []) { const result = find(child, predicate); if (result) return result; }
  return undefined;
}

function articleFixture() {
  const article = JSON.parse(readFileSync(resolve(here, "fixtures", "p02", "valid", "minimal-article.json"), "utf8"));
  article.id = "portable-demo";
  article.locale = "ar";
  article.dir = "rtl";
  article.metadata.supportedLocales = ["ar"];
  article.title = "مقال تفاعلي مستقل";
  article.initialState = {
    temperature: { type: "number", value: 20, min: 0, max: 100, step: 1 },
    detailsOpen: { type: "boolean", value: false },
    activeTab: { type: "enum", value: "first-panel", values: ["first-panel", "second-panel"] },
  };
  article.sections = [
    {
      id: "overview", heading: "نظرة عامة", blocks: [
        { id: "unsafe-looking-text", type: "paragraph", content: "نص حرفي <em>لا يتحول إلى عنصر HTML</em>، مع [رابط إلى المنهج](#methods)." },
        { id: "temperature-slider", type: "slider", content: "الحرارة", props: { min: 0, max: 100, step: 1 }, bindings: { value: "temperature" }, events: { change: { action: "setState", variable: "temperature", valueFrom: "event.value" } } },
        { id: "temperature-reading", type: "metric", props: { label: "الحرارة", unit: "°C" }, bindings: { value: "temperature" } },
        { id: "conditional-note", type: "conditional", props: { condition: { op: "gt", a: { ref: "temperature" }, b: 40 } }, children: [{ id: "conditional-copy", type: "paragraph", content: "معلومة مشروطة" }] },
        { id: "article-tabs", type: "tabs", bindings: { selected: "activeTab" }, children: [
          { id: "first-panel", type: "group", props: { label: "الأول" }, children: [{ id: "first-copy", type: "paragraph", content: "محتوى التبويب الأول" }] },
          { id: "second-panel", type: "group", props: { label: "الثاني" }, children: [{ id: "second-copy", type: "paragraph", content: "محتوى التبويب الثاني" }] },
        ] },
        { id: "details-toggle", type: "button", content: "تبديل التفاصيل", events: { click: { action: "toggle", variable: "detailsOpen" } } },
        { id: "details-panel", type: "accordion", content: "تفاصيل إضافية", bindings: { open: "detailsOpen" }, children: [{ id: "details-copy", type: "paragraph", content: "شرح التفاصيل" }] },
        { id: "legacy-plot", type: "legacyViz", props: { description: "مخطط وصفي", spec: { version: 1, type: "step-guide", title: "Guide", description: "A validated legacy visualization.", data: { steps: [{ title: "One", text: "First step" }] } } }, bindings: { highlightValue: "temperature" } },
      ],
    },
    { id: "methods", heading: "المنهج", blocks: [{ id: "methods-copy", type: "paragraph", content: "قسم ثانٍ ذو رابط ثابت." }] },
  ];
  return article;
}

async function mountFixture(article, adapter, environment = {}) {
  const previousDocument = globalThis.document;
  const document = new FakeDocument();
  globalThis.document = document;
  const engine = createIntuiEngine({ validateArticle });
  if (adapter) engine.registerAdapter(adapter);
  registerArticleRenderer(engine, { theme: "light" });
  const container = new FakeNode("div");
  const handle = engine.mount(container, article, environment);
  const result = await handle.ready;
  return {
    container, document, engine, handle, result,
    restore() { globalThis.document = previousDocument; },
  };
}

test("DOC-01/02/04 compose validated prose, semantic sections, TOC, stable anchors and adapter output in an isolated host", async () => {
  let adapterCalls = 0;
  const mounted = await mountFixture(articleFixture(), {
    id: "org.intuiforge.richviz", version: "0.5.0", capabilities: ["visualization"],
    render(container, spec) { adapterCalls += 1; container.textContent = spec.description; return { dispose() {} }; },
  });
  try {
    assert.deepEqual(mounted.result, { status: "ready" });
    const root = mounted.container.shadowRoot;
    assert.equal(find(root, (node) => node.id === "portable-demo")?.getAttribute("dir"), "rtl");
    assert.equal(find(root, (node) => node.tagName === "H1")?.textContent, "مقال تفاعلي مستقل");
    assert.equal(find(root, (node) => node.id === "methods")?.tagName, "SECTION");
    assert.equal(find(root, (node) => node.getAttribute("href") === "#methods")?.tagName, "A");
    assert.equal(find(root, (node) => node.tagName === "EM"), undefined, "article text must not be parsed as HTML");
    assert.equal(find(root, (node) => node.tagName === "A" && node.textContent === "رابط إلى المنهج")?.getAttribute("href"), "#methods");
    assert.match(root.textContent, /نص حرفي <em>لا يتحول إلى عنصر HTML<\/em>/);
    assert.equal(adapterCalls, 1);
    assert.equal(mounted.container.children.length, 0, "renderer must not replace or style host light-DOM content");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("DOC-03/06 share P04 state across slider, metric, conditional, adapter bindings, and accessible nested tabs", async () => {
  const adapterBindings = [];
  const adapterDisposals = [];
  const mounted = await mountFixture(articleFixture(), {
    id: "org.intuiforge.richviz", version: "0.5.0", capabilities: ["visualization"],
    render(container, spec, options) {
      adapterBindings.push(options.bindings.highlightValue);
      container.textContent = spec.description;
      return { dispose() { adapterDisposals.push(true); } };
    },
  });
  try {
    assert.deepEqual(mounted.result, { status: "ready" });
    const root = mounted.container.shadowRoot;
    const sliderBlock = find(root, (node) => node.id === "temperature-slider");
    const slider = find(sliderBlock, (node) => node.tagName === "INPUT");
    const metric = find(root, (node) => node.id === "temperature-reading");
    const conditional = find(root, (node) => node.id === "conditional-note");
    const tabList = find(root, (node) => node.getAttribute("role") === "tablist");
    const tabs = tabList.children;
    const secondTab = tabs.find((node) => node.getAttribute("aria-controls") === "second-panel");
    const secondPanel = find(root, (node) => node.id === "second-panel");
    const details = find(root, (node) => node.id === "details-panel" && node.tagName === "DETAILS");
    const detailsButton = find(root, (node) => node.tagName === "BUTTON" && node.textContent === "تبديل التفاصيل");
    assert.equal(slider.value, "20");
    assert.match(metric.textContent, /20/);
    assert.equal(conditional.hidden, true);
    assert.equal(secondPanel.hidden, true);
    assert.equal(details.open, false);

    slider.value = "42";
    slider.dispatch("change");
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.match(metric.textContent, /42/);
    assert.equal(find(root, (node) => node.id === "temperature-reading")?.getAttribute("data-value"), "42");
    assert.equal(conditional.hidden, false);
    assert.deepEqual(adapterBindings, [20, 42]);

    secondTab.dispatch("click");
    assert.equal(secondPanel.hidden, false);
    assert.equal(secondTab.getAttribute("aria-selected"), "true");
    assert.equal(adapterDisposals.length, 1);
    detailsButton.dispatch("click");
    assert.equal(details.open, true);
    await mounted.handle.dispose();
    assert.equal(slider.listeners.get("change")?.size ?? 0, 0, "mount disposal removes its native event listener");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("DOC-05 provides escaped static article output and print-friendly fallbacks", () => {
  const html = renderArticleStatic(articleFixture(), { theme: "light" });
  assert.match(html, /<article[^>]+dir="rtl"/);
  assert.match(html, /href="#methods"/);
  assert.match(html, /&lt;em&gt;لا يتحول إلى عنصر HTML&lt;\/em&gt;/);
  assert.match(html, /<a href="#methods" rel="noopener noreferrer">رابط إلى المنهج<\/a>/);
  assert.doesNotMatch(html, /<em>/);
  assert.match(html, /@media print/);
  assert.match(html, /تفاصيل إضافية/);
});

test("DOC-07 delegates cross-article navigation only as a stable host route token", async () => {
  const article = articleFixture();
  article.sections[0].blocks.push({
    id: "next-article", type: "button", content: "المقال التالي",
    events: { click: { action: "navigate", route: "next-lesson" } },
  });
  const routeCalls = [];
  const mounted = await mountFixture(article, undefined, { onNavigate: (route) => routeCalls.push(route) });
  try {
    assert.deepEqual(mounted.result, { status: "ready" });
    const button = find(mounted.container.shadowRoot, (node) => node.tagName === "BUTTON" && node.textContent === "المقال التالي");
    button?.dispatch("click");
    assert.deepEqual(routeCalls, ["next-lesson"]);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("DOC-07 rejects an unresolved in-article Markdown fragment", () => {
  const article = articleFixture();
  article.sections[0].blocks[0].content = "An unresolved [target](#missing-section) must not ship.";
  const result = validateArticle(article);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.code === "UNKNOWN_INTERNAL_LINK_TARGET"));
});
