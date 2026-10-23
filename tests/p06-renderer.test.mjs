import assert from "node:assert/strict";
import test from "node:test";
import { createIntuiEngine } from "../packages/core/src/index.js";
import { validateArticle } from "../packages/article/src/index.js";
import { registerArticleRenderer, renderArticleStatic } from "../packages/article-renderer/src/index.js";

class FakeNode {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase(); this.children = []; this.parentNode = null;
    this.attributes = new Map(); this.listeners = new Map(); this.hidden = false; this.open = false;
    this.style = { values: new Map(), setProperty: (key, value) => this.style.values.set(key, String(value)) };
  }
  set textContent(value) { this._text = String(value ?? ""); this.replaceChildren(); }
  get textContent() { return `${this._text ?? ""}${this.children.map((child) => child.textContent).join("")}`; }
  append(...nodes) { for (const node of nodes) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.push(node); } }
  appendChild(node) { this.append(node); return node; }
  prepend(...nodes) { for (const node of [...nodes].reverse()) { node.parentNode?.removeChild(node); node.parentNode = this; this.children.unshift(node); } }
  removeChild(node) { const index = this.children.indexOf(node); if (index >= 0) this.children.splice(index, 1); node.parentNode = null; return node; }
  replaceChildren(...nodes) { for (const child of [...this.children]) this.removeChild(child); this.append(...nodes); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); if (name === "id") this.id = String(value); if (name === "type") this.type = String(value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, listener) { const list = this.listeners.get(type) ?? new Set(); list.add(listener); this.listeners.set(type, list); }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  dispatch(type, event = {}) { for (const listener of this.listeners.get(type) ?? []) listener({ type, target: this, preventDefault() {}, ...event }); }
  click() { this.dispatch("click"); }
  focus() { this.focused = true; }
  showModal() { this.open = true; }
  close() { this.open = false; }
  scrollIntoView() {}
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
  return {
    kind: "intui.article", schemaVersion: "1.0.0", id: "p06-widgets", locale: "en", dir: "ltr",
    title: "P06 general widgets", summary: "A declarative, host-independent widget fixture.",
    metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["en"], provenance: [] },
    assets: [],
    initialState: {
      count: { type: "number", value: 1, min: 0, max: 10 },
      quantity: { type: "number", value: 2, min: 0, max: 20 },
      price: { type: "number", value: 4, min: 0, max: 100 },
      groupFilter: { type: "enum", value: "all", values: ["all", "active", "paused"] },
      selectedCard: { type: "enum", value: "card-a", values: ["card-a", "card-b"] },
      activeTab: { type: "enum", value: "tab-a", values: ["tab-a", "tab-b"] },
      detailsOpen: { type: "boolean", value: false },
      comparisonPosition: { type: "number", value: 50, min: 0, max: 100 },
    },
    derived: {
      filteredKpi: { op: "if", condition: { op: "eq", a: { ref: "groupFilter" }, b: "active" }, then: 2, else: 4 },
      total: { op: "multiply", a: { ref: "quantity" }, b: { ref: "price" } },
    },
    sections: [{ id: "widgets", heading: "Widgets", blocks: [
      { id: "table", type: "smartTable", props: {
        caption: "Items", columns: [{ key: "name", label: "Name" }, { key: "score", label: "Score", type: "number" }, { key: "group", label: "Group" }],
        rows: [
          { name: "Amber", score: 12, group: "active" }, { name: "Basil", score: 8, group: "paused" },
          { name: "Cedar", score: 21, group: "active" }, { name: "Dahlia", score: 17, group: "active" },
        ], pageSize: 2, filters: [{ columnId: "group", label: "Group", options: [{ value: "active", label: "Active" }, { value: "paused", label: "Paused" }] }],
      } },
      { id: "count-input", type: "input", content: "Count", props: { label: "Count", inputType: "number", min: 0, max: 10, required: true }, bindings: { value: "count" } },
      { id: "calculator", type: "calculator", props: {
        label: "Cost calculator", resultLabel: "Total", unit: "USD", inputs: [{ variable: "quantity", label: "Quantity", min: 0, max: 20 }, { variable: "price", label: "Price", min: 0, max: 100 }],
        expression: { op: "multiply", a: { ref: "quantity" }, b: { ref: "price" } }, resultMin: 0, resultMax: 2000,
      } },
      { id: "comparison", type: "comparison", props: { mode: "overlay", label: "Count comparison", left: { label: "Count" }, right: { label: "Total", unit: "USD" }, positionLabel: "Compare position" }, bindings: { left: "count", right: "total", position: "comparisonPosition" } },
      { id: "category-filter", type: "filter", content: "Group", props: { label: "Group filter", options: [{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "paused", label: "Paused" }] }, bindings: { value: "groupFilter" } },
      { id: "filtered-kpi", type: "metric", props: { label: "Filtered items" }, bindings: { value: "filteredKpi" } },
      { id: "filter-plot", type: "legacyViz", props: { description: "Filtered plot", spec: { version: 1, type: "step-guide", title: "Filter", description: "A validated plot fallback.", data: { steps: [{ title: "Active", text: "Active group" }] } } }, bindings: { group: "groupFilter", count: "filteredKpi" } },
      { id: "open-dialog", type: "button", content: "Open details", events: { click: { action: "openDialog", targetId: "details-dialog" } } },
      { id: "close-dialog", type: "button", content: "Close details", events: { click: { action: "closeDialog", targetId: "details-dialog" } } },
      { id: "details-dialog", type: "dialog", props: { label: "Details" }, children: [{ id: "dialog-copy", type: "paragraph", content: "Dialog body." }] },
      { id: "more-menu", type: "menu", props: { label: "More actions" }, children: [{ id: "menu-copy", type: "paragraph", content: "Menu content." }] },
      { id: "help-tooltip", type: "tooltip", props: { label: "Help", text: "Helpful explanation." } },
      { id: "card-a", type: "card", props: { label: "First card", selectLabel: "Choose first" }, bindings: { selected: "selectedCard" } },
      { id: "card-b", type: "card", props: { label: "Second card", selectLabel: "Choose second" }, bindings: { selected: "selectedCard" } },
      { id: "tabs", type: "tabs", props: { label: "Widget panels" }, bindings: { selected: "activeTab" }, children: [
        { id: "tab-a", type: "group", props: { label: "Panel A" }, children: [{ id: "copy-a", type: "paragraph", content: "First panel." }] },
        { id: "tab-b", type: "group", props: { label: "Panel B" }, children: [{ id: "copy-b", type: "paragraph", content: "Second panel." }] },
      ] },
      { id: "toggle-details", type: "button", content: "Toggle details", events: { click: { action: "toggle", variable: "detailsOpen" } } },
      { id: "accordion", type: "accordion", content: "Extra details", bindings: { open: "detailsOpen" }, children: [{ id: "accordion-copy", type: "paragraph", content: "Accordion body." }] },
    ] }],
  };
}

async function mount(article, onExport = () => {}) {
  const previousDocument = globalThis.document;
  globalThis.document = new FakeDocument();
  const engine = createIntuiEngine({ validateArticle });
  const adapterBindings = [];
  engine.registerAdapter({
    id: "org.intuiforge.richviz", version: "0.5.0", capabilities: ["visualization"],
    render(container, _spec, options) { adapterBindings.push(options.bindings); container.textContent = "Filtered plot"; return { dispose() {} }; },
  });
  registerArticleRenderer(engine, { theme: "light", onExport });
  const container = new FakeNode("div");
  const handle = engine.mount(container, article, { document: globalThis.document });
  const result = await handle.ready;
  return { container, engine, handle, result, adapterBindings, restore: () => { globalThis.document = previousDocument; } };
}

test("WGT-01 renders legacy key columns and wires table search, filtering, sorting, paging and CSV export", async () => {
  const exports = [];
  const mounted = await mount(articleFixture(), (payload) => exports.push(payload));
  try {
    assert.deepEqual(mounted.result, { status: "ready" });
    const root = mounted.container.shadowRoot;
    const table = find(root, (node) => node.id === "table");
    const body = find(table, (node) => node.tagName === "TBODY");
    const search = find(table, (node) => node.type === "search");
    const tableSelect = find(table, (node) => node.tagName === "SELECT");
    const headerButtons = find(table, (node) => node.tagName === "THEAD").children[0].children.map((cell) => cell.children[0]);
    assert.equal(body.children.length, 2);
    assert.equal(find(table, (node) => node.tagName === "TH").getAttribute("scope"), "col");
    assert.ok(search.getAttribute("aria-label"));
    search.value = "Cedar"; search.dispatch("input");
    assert.equal(body.children.length, 1); assert.match(body.textContent, /Cedar/);
    search.value = ""; search.dispatch("input");
    tableSelect.value = "active"; tableSelect.dispatch("change");
    assert.equal(body.children.length, 2); assert.doesNotMatch(body.textContent, /Basil/);
    headerButtons[1].click();
    assert.equal(headerButtons[1].parentNode.getAttribute("aria-sort"), "ascending");
    const paginationButtons = find(table, (node) => node.getAttribute("class") === "if-widget-pagination").children;
    paginationButtons[2].click();
    assert.match(body.textContent, /Cedar|Dahlia/);
    const exportButton = find(table, (node) => node.tagName === "BUTTON" && node.textContent === "Export CSV");
    exportButton.click();
    assert.equal(exports.length, 1);
    assert.match(exports[0].content, /^Name,Score,Group\r\n/);
    assert.equal(exports[0].mimeType, "text/csv;charset=utf-8");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("WGT-02/03 validate bound controls and keep calculator results reactive and safe", async () => {
  const mounted = await mount(articleFixture());
  try {
    const root = mounted.container.shadowRoot;
    const inputBlock = find(root, (node) => node.id === "count-input");
    const input = find(inputBlock, (node) => node.tagName === "INPUT");
    const metric = find(root, (node) => node.id === "comparison");
    const calculator = find(root, (node) => node.id === "calculator");
    const output = find(calculator, (node) => node.tagName === "OUTPUT");
    input.value = "11"; input.dispatch("input");
    assert.equal(input.getAttribute("aria-invalid"), "true");
    assert.match(inputBlock.textContent, /allowed maximum/);
    assert.match(metric.textContent, /1/);
    input.value = "3"; input.dispatch("input");
    assert.equal(input.getAttribute("aria-invalid"), "false");
    assert.match(metric.textContent, /3/);
    const quantity = find(calculator, (node) => node.tagName === "INPUT" && node.getAttribute("min") === "0");
    quantity.value = "5"; quantity.dispatch("input");
    assert.equal(output.textContent, "20 USD");
    assert.equal(find(root, (node) => node.id === "filtered-kpi").textContent.includes("4"), true);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("WGT-04/06 update comparison, filters, metrics and visualization bindings from shared state", async () => {
  const mounted = await mount(articleFixture());
  try {
    const root = mounted.container.shadowRoot;
    const filter = find(root, (node) => node.id === "category-filter");
    const select = find(filter, (node) => node.tagName === "SELECT");
    const metric = find(root, (node) => node.id === "filtered-kpi");
    const comparison = find(root, (node) => node.id === "comparison");
    select.value = "active"; select.dispatch("change");
    assert.match(metric.textContent, /2/);
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(mounted.adapterBindings.at(-1).group, "active");
    assert.equal(mounted.adapterBindings.at(-1).count, 2);
    const comparisonComponent = find(comparison, (node) => node.getAttribute("class") === "if-article-comparison");
    assert.equal(comparisonComponent.getAttribute("data-mode"), "overlay");
    assert.equal(find(comparisonComponent, (node) => node.type === "range").getAttribute("aria-label"), "Compare position");
    assert.equal(comparisonComponent.style.values.get("--if-comparison-position"), "50%");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("WGT-05/07 retain native semantics, dialog controls, selectable cards and stateful tabs/accordion", async () => {
  const mounted = await mount(articleFixture());
  try {
    const root = mounted.container.shadowRoot;
    find(root, (node) => node.id === "open-dialog").children[0].click();
    const dialog = find(root, (node) => node.tagName === "DIALOG");
    assert.equal(dialog.tagName, "DIALOG"); assert.equal(dialog.open, true); assert.ok(dialog.getAttribute("aria-labelledby"));
    find(root, (node) => node.id === "close-dialog").children[0].click(); assert.equal(dialog.open, false);
    const menu = find(root, (node) => node.tagName === "DETAILS" && node.getAttribute("class") === "if-article-menu"); assert.equal(menu.children[0].tagName, "SUMMARY");
    const tooltip = find(root, (node) => node.id === "help-tooltip");
    const tooltipTrigger = tooltip.children[0].children[0]; assert.equal(tooltipTrigger.getAttribute("aria-describedby"), "help-tooltip-tooltip");
    assert.equal(find(tooltip, (node) => node.getAttribute("role") === "tooltip").textContent, "Helpful explanation.");
    const cardA = find(root, (node) => node.id === "card-a"); const cardB = find(root, (node) => node.id === "card-b");
    const chooseA = find(cardA, (node) => node.tagName === "BUTTON"); const chooseB = find(cardB, (node) => node.tagName === "BUTTON");
    chooseB.click();
    assert.equal(chooseA.getAttribute("aria-pressed"), "false");
    assert.equal(chooseB.getAttribute("aria-pressed"), "true");
    const tabs = find(root, (node) => node.getAttribute("role") === "tablist").children;
    tabs[1].dispatch("keydown", { key: "ArrowRight" });
    assert.equal(tabs[1].getAttribute("aria-selected"), "true");
    find(root, (node) => node.id === "toggle-details").children[0].click();
    assert.equal(find(root, (node) => node.id === "accordion").children[0].open, true);
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("generated form controls have unique stable ids and names", async () => {
  const mounted = await mount(articleFixture());
  try {
    const root = mounted.container.shadowRoot;
    const controls = [];
    const collect = (node) => {
      if (["INPUT", "SELECT"].includes(node.tagName)) controls.push(node);
      for (const child of node.children ?? []) collect(child);
    };
    collect(root);
    const ids = controls.map((control) => control.getAttribute("id"));
    assert.equal(controls.length, 7);
    assert.ok(ids.every((id) => typeof id === "string" && id.length > 0), "every generated input/select should have an id");
    assert.equal(new Set(ids).size, controls.length, "generated control ids should be unique");
    assert.ok(controls.every((control) => typeof control.getAttribute("name") === "string" && control.getAttribute("name").length > 0), "every generated input/select should have a name");
  } finally { await mounted.handle.dispose(); await mounted.engine.dispose(); mounted.restore(); }
});

test("P06 widgets provide useful escaped static output and reject executable props", () => {
  const article = articleFixture();
  const html = renderArticleStatic(article, { theme: "light" });
  assert.match(html, /<table class="if-smart-table">/);
  assert.match(html, /<output>8 USD<\/output>/);
  assert.match(html, /Filtered items/);
  assert.match(html, /Dialog body/);
  assert.match(html, /Menu content/);
  article.sections[0].blocks.find((block) => block.id === "count-input").props.onChange = () => {};
  assert.equal(validateArticle(article).ok, false);

  const unsafeCell = articleFixture();
  unsafeCell.sections[0].blocks.find((block) => block.id === "table").props.rows[0].score = { value: 12 };
  assert.ok(validateArticle(unsafeCell).errors.some((issue) => issue.code === "INVALID_TABLE_CELL"));

  const invalidFilter = articleFixture();
  invalidFilter.sections[0].blocks.find((block) => block.id === "category-filter").props.options.push({ value: "unknown", label: "Unknown" });
  assert.ok(validateArticle(invalidFilter).errors.some((issue) => issue.code === "UNKNOWN_FILTER_OPTION_VALUE"));

  const invalidCard = articleFixture();
  invalidCard.initialState.selectedCard.values = ["card-a"];
  assert.ok(validateArticle(invalidCard).errors.some((issue) => issue.code === "INVALID_CARD_SELECTION_STATE"));
});
