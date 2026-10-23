import { RichViz, RICHVIZ_VERSION } from "./index.js";
import { EXAMPLES, EXAMPLES_CATALOG } from "../vendor/RichViz-main/src/RichVisualizationExamples.js";
import { ICON_NAMES, iconMarkup } from "../vendor/RichViz-main/src/RichVisualizationIcons.js";
import { ADAPTER_LIBRARIES, ADAPTER_LOADERS, DIAGRAM_REGISTRY } from "../vendor/RichViz-main/src/RichVisualizationRegistry.js";

const ASSET_CATALOG_URL = new URL("../asset-library/Assets/catalog.json", import.meta.url);
const ADAPTER_NAMES = Object.freeze(Object.keys(ADAPTER_LOADERS));
const safeText = (value) => String(value ?? "");

function engineExample(adapter) {
  if (adapter === "mermaid") return EXAMPLES.mermaid;
  if (adapter === "react-flow") return EXAMPLES["react-flow"];
  return { ...EXAMPLES["data-chart"], options: { ...EXAMPLES["data-chart"].options, engine: adapter } };
}

/** Build one searchable inventory from canonical type/example/icon registries and the source asset catalog. */
export function buildVisualCatalog(assetCatalog, { assetCatalogUrl = ASSET_CATALOG_URL.href } = {}) {
  const typeById = new Map(DIAGRAM_REGISTRY.map((entry) => [entry.id, entry]));
  const items = [];
  const included = new Set();
  for (const entry of EXAMPLES_CATALOG) {
    if (!RichViz.types.includes(entry.spec.type) || included.has(entry.spec.type)) continue;
    included.add(entry.spec.type);
    const type = typeById.get(entry.spec.type);
    items.push(Object.freeze({
      id: `diagram-${entry.spec.type}`, kind: "diagram", group: "diagrams", name: type?.name ?? entry.spec.title ?? entry.spec.type,
      description: entry.spec.description ?? "", type: entry.spec.type, family: type?.category ?? "Visualization", renderer: type?.renderer ?? "RichViz",
      tags: Object.freeze([entry.spec.type, type?.category, entry.group, "diagram"].filter(Boolean)), author: "RichViz project",
      source: "RichViz canonical example catalog", license: "Apache-2.0", attribution: "Preserve the RichViz copyright and license notices.", spec: entry.spec,
    }));
  }
  for (const adapter of ADAPTER_NAMES) {
    const spec = engineExample(adapter);
    items.push(Object.freeze({
      id: `engine-${adapter}`, kind: "engine", group: "engines", name: ADAPTER_LIBRARIES[adapter] ?? adapter,
      description: `Preview the bundled ${adapter} adapter with a canonical ${spec.type} example.`, adapter, type: spec.type,
      tags: Object.freeze([adapter, ADAPTER_LIBRARIES[adapter], spec.type, "engine"].filter(Boolean)), author: "RichViz adapter registry",
      source: `RichViz v${RICHVIZ_VERSION} adapter registry`, license: "See bundled third-party notices", attribution: "Third-party licenses remain isolated in External-Libraries.", spec,
    }));
  }
  for (const name of ICON_NAMES) items.push(Object.freeze({
    id: `glyph-${name}`, kind: "interface-icon", group: "interface-icons", name, description: `Project-owned interface glyph: ${name}.`, iconName: name,
    tags: Object.freeze([name, "interface icon", "glyph"]), author: "Abdulrahman ElBatrah", source: "RichViz trusted icon registry",
    license: "Apache-2.0", attribution: "Retain the project copyright and Apache-2.0 notices.",
  }));
  for (const asset of assetCatalog?.assets ?? []) {
    const source = typeof asset.path === "string" ? new URL(asset.path, assetCatalogUrl).href : "";
    const group = asset.kind === "application-icon" ? "application-icons" : asset.kind === "illustration" ? "illustrations" : asset.kind === "sticker" ? "stickers" : "assets";
    items.push(Object.freeze({
      ...asset, id: `asset-${asset.id}`, kind: asset.kind ?? "asset", group, name: asset.name ?? asset.id,
      description: `${asset.category ?? "Asset"}${asset.collection ? ` — ${asset.collection}` : ""}`,
      tags: Object.freeze([...(asset.tags ?? []), asset.kind, asset.collection, asset.license].filter(Boolean)), assetUrl: source,
    }));
  }
  return Object.freeze(items);
}

const CATEGORY_LABELS = Object.freeze({
  all: "All", diagrams: "Diagrams", engines: "Engine adapters", "interface-icons": "Interface icons",
  "application-icons": "Application icons", illustrations: "Illustrations", stickers: "Stickers", assets: "Other assets",
});

function cardMatches(item, query) {
  const text = [item.id, item.name, item.description, item.kind, item.family, item.category, item.collection, item.author, item.source, item.license, ...(item.tags ?? [])].join(" ").toLocaleLowerCase();
  return text.includes(query);
}

function appendText(document, parent, tag, value, className) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = safeText(value);
  parent.appendChild(element);
  return element;
}

async function loadAssetCatalog(url) {
  const response = await fetch(url, { credentials: "omit", cache: "no-store" });
  if (!response.ok) throw new Error(`Asset catalog returned HTTP ${response.status}.`);
  const data = await response.json();
  if (!Array.isArray(data.assets)) throw new TypeError("Asset catalog must contain an assets array.");
  return data;
}

/** Mount the RichViz + asset collection Visual Browser. Only the selected preview is rendered. */
export async function mountVisualBrowser(root, { assetCatalogUrl = ASSET_CATALOG_URL.href } = {}) {
  const document = root.ownerDocument ?? globalThis.document;
  const items = buildVisualCatalog(await loadAssetCatalog(assetCatalogUrl), { assetCatalogUrl });
  const search = document.createElement("input"); search.type = "search"; search.placeholder = "Search diagrams, icons, stickers, authors or licenses"; search.setAttribute("aria-label", "Search visual library");
  const searchLabel = appendText(document, root, "label", "Search the visual library", "if-vb-search-label"); searchLabel.appendChild(search);
  const categoryNav = document.createElement("nav"); categoryNav.className = "if-vb-categories"; categoryNav.setAttribute("aria-label", "Visual library categories"); root.appendChild(categoryNav);
  const results = document.createElement("section"); results.className = "if-vb-results"; results.setAttribute("aria-label", "Visual library results"); root.appendChild(results);
  const pagination = document.createElement("nav"); pagination.className = "if-vb-pagination"; pagination.setAttribute("aria-label", "Visual library pages"); root.appendChild(pagination);
  const previousPage = document.createElement("button"); previousPage.type = "button"; previousPage.className = "if-vb-page-button"; previousPage.textContent = "Previous page"; pagination.appendChild(previousPage);
  const pageStatus = appendText(document, pagination, "span", "", "if-vb-page-status"); pageStatus.setAttribute("aria-live", "polite");
  const nextPage = document.createElement("button"); nextPage.type = "button"; nextPage.className = "if-vb-page-button"; nextPage.textContent = "Next page"; pagination.appendChild(nextPage);
  const count = appendText(document, root, "p", "", "if-vb-count"); count.setAttribute("role", "status"); count.setAttribute("aria-live", "polite");
  const categoryOrder = ["all", "diagrams", "engines", "interface-icons", "application-icons", "illustrations", "stickers", "assets"];
  const pageSize = 24;
  let category = "all"; let selectedId = ""; let activeHandle = null; let activePage = true; let currentPage = 0;
  const cardById = new Map();
  const categoryButtons = new Map();
  for (const key of categoryOrder) {
    const button = document.createElement("button"); button.type = "button"; button.className = "if-vb-category";
    button.textContent = CATEGORY_LABELS[key]; button.setAttribute("aria-pressed", String(key === category)); button.dataset.category = key;
    button.addEventListener("click", () => { category = key; currentPage = 0; for (const [id, item] of categoryButtons) item.setAttribute("aria-pressed", String(id === key)); renderResults(); });
    categoryNav.appendChild(button); categoryButtons.set(key, button);
  }
  const disposePreview = async () => { const handle = activeHandle; activeHandle = null; try { await handle?.dispose?.(); } catch { /* preview teardown is isolated */ } };
  function addMetadata(card, item) {
    const dl = document.createElement("dl"); dl.className = "if-vb-metadata";
    for (const [label, value] of [["ID", item.id], ["Author", item.author], ["License", item.license], ["Source", item.source], ["Attribution", item.attribution], ["Format", item.format], ["Category", item.category ?? item.family]]) {
      if (!value) continue;
      appendText(document, dl, "dt", label); appendText(document, dl, "dd", value);
    }
    if (typeof item.source === "string" && /^https:\/\//i.test(item.source)) {
      const link = document.createElement("a"); link.href = item.source; link.rel = "noopener noreferrer"; link.target = "_blank"; link.textContent = "Open upstream source"; dl.appendChild(link);
    }
    card.appendChild(dl);
  }
  async function preview(item, card) {
    if (selectedId === item.id) { selectedId = ""; await disposePreview(); card.querySelector(".if-vb-preview")?.replaceChildren(); return; }
    await disposePreview(); selectedId = item.id;
    for (const [id, current] of cardById) {
      const button = current.querySelector("[data-preview]");
      if (button) button.setAttribute("aria-expanded", String(id === item.id));
      if (id !== item.id) current.querySelector(".if-vb-preview")?.replaceChildren();
    }
    const previewRoot = card.querySelector(".if-vb-preview"); if (!previewRoot) return;
    previewRoot.replaceChildren();
    if (item.kind === "diagram" || item.kind === "engine") {
      const mount = document.createElement("div"); mount.className = "if-vb-diagram-mount"; previewRoot.appendChild(mount);
      const handle = RichViz.render(mount, JSON.stringify(item.spec), { document, lang: document.documentElement.lang || "en", dir: document.documentElement.dir || "ltr" });
      activeHandle = handle; await handle.ready;
      if (!activePage || selectedId !== item.id) await handle.dispose?.();
    } else if (item.kind === "interface-icon") {
      const glyph = document.createElement("div"); glyph.className = "if-vb-glyph-preview";
      // iconMarkup is generated only from the project-owned trusted icon registry.
      glyph.innerHTML = iconMarkup(item.iconName); previewRoot.appendChild(glyph);
    } else {
      const image = document.createElement("img"); image.src = item.assetUrl; image.alt = item.name; image.loading = "lazy"; image.decoding = "async";
      image.addEventListener("error", () => { image.remove(); appendText(document, previewRoot, "p", "Preview unavailable: the catalog path could not be loaded.", "if-vb-preview-error"); }, { once: true });
      previewRoot.appendChild(image);
    }
    card.setAttribute("data-preview-open", "true");
  }
  function renderResults() {
    const query = search.value.trim().toLocaleLowerCase();
    const filtered = items.filter((item) => (category === "all" || item.group === category) && cardMatches(item, query));
    for (const [key, button] of categoryButtons) button.hidden = key !== "all" && !items.some((item) => item.group === key);
    if (!filtered.some((item) => item.id === selectedId)) { selectedId = ""; void disposePreview(); }
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.max(0, Math.min(currentPage, pageCount - 1));
    const pageItems = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    results.replaceChildren(); cardById.clear();
    for (const item of pageItems) {
      const card = document.createElement("article"); card.className = `if-vb-card if-vb-${item.group}`; card.dataset.visualId = item.id; card.dataset.visualKind = item.kind;
      appendText(document, card, "h2", item.name, "if-vb-card-title");
      appendText(document, card, "p", item.description, "if-vb-card-description");
      const previewButton = document.createElement("button"); previewButton.type = "button"; previewButton.className = "if-vb-preview-button"; previewButton.dataset.preview = ""; previewButton.textContent = "Preview"; previewButton.setAttribute("aria-expanded", "false");
      card.appendChild(previewButton);
      const previewRoot = document.createElement("div"); previewRoot.className = "if-vb-preview"; card.appendChild(previewRoot);
      addMetadata(card, item); results.appendChild(card); cardById.set(item.id, card);
      previewButton.addEventListener("click", () => void preview(item, card));
    }
    count.textContent = `${filtered.length} of ${items.length} items`;
    if (!filtered.length) appendText(document, results, "p", "No matching items. Try another search or category.", "if-vb-empty");
    pagination.hidden = pageCount < 2;
    previousPage.disabled = currentPage === 0;
    nextPage.disabled = currentPage >= pageCount - 1;
    pageStatus.textContent = `${currentPage + 1} / ${pageCount}`;
  }
  search.addEventListener("input", () => { currentPage = 0; renderResults(); });
  previousPage.addEventListener("click", () => { currentPage = Math.max(0, currentPage - 1); renderResults(); });
  nextPage.addEventListener("click", () => { currentPage += 1; renderResults(); });
  renderResults();
  return Object.freeze({
    items,
    async preview(id) { const item = items.find((entry) => entry.id === id); const card = cardById.get(id); if (item && card) await preview(item, card); },
    getVisibleIds() { return [...cardById.keys()]; },
    setCategory(value) { category = categoryOrder.includes(value) ? value : "all"; currentPage = 0; for (const [id, button] of categoryButtons) button.setAttribute("aria-pressed", String(id === category)); renderResults(); },
    setSearch(value) { search.value = safeText(value); currentPage = 0; renderResults(); },
    next() { if (!nextPage.disabled) { currentPage += 1; renderResults(); } },
    previous() { if (!previousPage.disabled) { currentPage -= 1; renderResults(); } },
    getPage() { return Object.freeze({ current: currentPage + 1, count: Math.max(1, Math.ceil(items.filter((item) => (category === "all" || item.group === category) && cardMatches(item, search.value.trim().toLocaleLowerCase())).length / pageSize)), pageSize }); },
    dispose: async () => { activePage = false; await disposePreview(); root.replaceChildren(); },
  });
}

if (typeof document !== "undefined") {
  const root = document.querySelector("[data-visual-browser]");
  if (root) mountVisualBrowser(root).then((browser) => { globalThis.IntuiForgeVisualBrowser = browser; }).catch((error) => {
    const status = document.createElement("p"); status.className = "if-vb-error"; status.setAttribute("role", "alert"); status.textContent = `Visual library unavailable: ${error.message}`; root.appendChild(status);
  });
}
