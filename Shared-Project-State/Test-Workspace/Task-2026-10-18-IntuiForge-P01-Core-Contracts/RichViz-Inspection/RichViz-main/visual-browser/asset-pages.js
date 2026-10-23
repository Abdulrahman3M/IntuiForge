import { ICON_NAMES, iconMarkup } from "../src/RichVisualizationIcons.js";
import { buildVisualCatalog, sortVisualCatalog } from "./catalog.js";

const pageKind = document.body.dataset.assetPage;
const labels = { icons: "interface icons", "app-icon": "application icons", svg: "SVG illustrations", stickers: "stickers" };
const search = document.querySelector("#asset-search");
const category = document.querySelector("#asset-category");
const sort = document.querySelector("#asset-sort");
const host = document.querySelector("#asset-results");
const count = document.querySelector("#asset-count");
const detail = document.querySelector("#detail");
const detailContent = document.querySelector("#detail-content");
const detailTitle = document.querySelector("#detail-title");
const close = document.querySelector(".close");
const showMore = document.querySelector("#show-more");
const PAGE_SIZE = 48;
let lastTrigger = null;
let visibleLimit = PAGE_SIZE;

function assetUrl(path) { return `../${String(path).split("/").map(encodeURIComponent).join("/")}?v=0.5.0`; }
function addText(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = value ?? "";
  return node;
}

function previewFor(item) {
  const preview = document.createElement("div");
  preview.className = "asset-preview";
  preview.dataset.preview = item.id;
  if (item.kind === "icon") {
    const glyph = document.createElement("span");
    glyph.className = "glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.innerHTML = iconMarkup(item.iconName);
    preview.append(glyph);
  } else if (["svg", "image", "app-icon", "sticker"].includes(item.kind) && ["SVG", "PNG", "JPG", "JPEG", "WEBP", "GIF", "AVIF", "ICO", "BMP"].includes(item.format)) {
    const img = document.createElement("img");
    img.src = assetUrl(item.path);
    img.alt = item.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => { preview.replaceChildren(addText("span", "asset-fallback", `Preview unavailable · ${item.format}`)); }, { once: true });
    preview.append(img);
  } else preview.append(addText("span", "format-preview", `${item.format} ${item.kind === "sticker" ? "sticker" : "visual"} file`));
  return preview;
}

function cardFor(item) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "visual-card asset-card";
  card.dataset.id = item.id;
  card.setAttribute("aria-label", `${item.title}, ${item.id}, open details`);
  const body = document.createElement("span");
  body.className = "card-body";
  body.append(addText("code", "ref", item.id), addText("strong", "asset-name", item.title), addText("span", "page-copy", item.description));
  const badges = document.createElement("span");
  badges.className = "card-meta";
  for (const label of [item.type, item.category, item.format]) badges.append(addText("span", "badge", label));
  body.append(badges);
  card.append(previewFor(item), body);
  card.addEventListener("click", () => openDetails(item, card));
  return card;
}

function openDetails(item, trigger) {
  lastTrigger = trigger;
  detailTitle.textContent = item.title;
  const intro = addText("p", "detail-intro", item.description);
  const ref = addText("code", "ref detail-ref", item.id);
  const preview = previewFor(item);
  preview.classList.add("detail-preview");
  const meta = document.createElement("div");
  meta.className = "detail-meta";
  const fields = [
    ["Name", item.title], ["Type", item.type], ["Category", item.category], ["Reference ID", item.id],
    ["Relative path", item.path], ["Format", item.format],
    ["Usage", item.kind === "icon" ? `Reference icon name “${item.iconName}” in a Rich Viz specification.` : `Use ${item.id} and retain the source asset at ${item.path}.`],
    ["Author", item.asset?.author || (item.kind === "icon" ? "Rich Viz project authors" : "See library asset provenance")],
    ["Source", item.asset?.source || "Rich Viz library"], ["License", item.asset?.license || "Apache-2.0"],
    ["Attribution", item.asset?.attribution || "Retain applicable project and third-party notices"],
  ].filter(([, value]) => value);
  for (const [label, value] of fields) {
    const cell = document.createElement("div");
    cell.append(addText("small", "", label), addText("span", "", value));
    meta.append(cell);
  }
  const actions = document.createElement("div");
  actions.className = "detail-actions";
  const copy = (label, value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(value); button.textContent = "Copied"; }
      catch { button.textContent = "Clipboard unavailable"; }
      window.setTimeout(() => { button.textContent = label; }, 1400);
    });
    actions.append(button);
  };
  copy("Copy reference", item.id);
  copy("Copy path", item.path);
  const source = document.createElement("a");
  source.href = assetUrl(item.path);
  source.textContent = "Open source";
  source.target = "_blank";
  source.rel = "noreferrer";
  actions.append(source);
  detailContent.replaceChildren(intro, ref, preview, meta, actions);
  detail.showModal();
  document.body.classList.add("dialog-open");
  close.focus();
}

function closeDetails() {
  detail.close();
}
close?.addEventListener("click", closeDetails);
detail?.addEventListener("cancel", () => document.body.classList.remove("dialog-open"));
detail?.addEventListener("close", () => { document.body.classList.remove("dialog-open"); lastTrigger?.focus(); });
detail?.addEventListener("click", (event) => { if (event.target === detail) closeDetails(); });

const catalogResponse = await fetch("./catalog.json", { cache: "no-store" });
if (!catalogResponse.ok) throw new Error(`Visual asset discovery failed (${catalogResponse.status}).`);
const discovered = await catalogResponse.json();
const allRecords = buildVisualCatalog({ examplesCatalog: [], diagramRegistry: [], assetsCatalog: { assets: [] }, discoveredAssets: discovered.assets, iconNames: ICON_NAMES });
const recordKind = pageKind === "icons" ? "icon" : pageKind === "stickers" ? "sticker" : pageKind;
const records = allRecords.filter((item) => item.kind === recordKind);
search.value = new URLSearchParams(location.search).get("q") || "";
if (pageKind === "icons" || pageKind === "app-icon") document.querySelector("#page-total").textContent = String(records.length);

if (category) {
  for (const value of [...new Set(records.map((item) => item.category))].sort((a, b) => a.localeCompare(b))) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    category.append(option);
  }
}

function render() {
  const term = search.value.trim().toLocaleLowerCase();
  let visible = records.filter((item) => {
    const searchable = [item.id, item.title, item.type, item.category, item.path, item.format, ...item.tags].join(" ").toLocaleLowerCase();
    return searchable.includes(term) && (!category || category.value === "all" || item.category === category.value);
  });
  visible = sortVisualCatalog(visible, sort?.value || "name");
  const total = visible.length;
  host.replaceChildren();
  if (!visible.length) {
    const empty = document.createElement("section");
    empty.className = "empty-state--page";
    if (records.length) {
      empty.append(addText("h2", "", `No ${labels[pageKind]} match that search`), addText("p", "", "Try a shorter name, a category, or part of the reference ID."));
    } else if (pageKind === "stickers") {
      empty.append(addText("h2", "", "No sticker files in this library release"), addText("p", "", "This page is reserved for sticker assets. There are currently no sticker files in the library; icons and SVG illustrations are listed on their own pages."));
    } else empty.append(addText("h2", "", `No ${labels[pageKind]} are currently registered`), addText("p", "", "When this library contains items in this category, this page will discover and list them automatically."));
    host.append(empty);
  } else for (const item of visible.slice(0, visibleLimit)) host.append(cardFor(item));
  count.textContent = `${Math.min(total, visibleLimit)} of ${total} ${labels[pageKind]} · ${records.length} total`;
  if (showMore) {
    showMore.hidden = total <= visibleLimit;
    showMore.textContent = `Show ${Math.min(PAGE_SIZE, total - visibleLimit)} more ${labels[pageKind]}`;
  }
  host.setAttribute("aria-busy", "false");
}

search.addEventListener("input", () => { visibleLimit = PAGE_SIZE; render(); });
category?.addEventListener("change", render);
sort?.addEventListener("change", render);
showMore?.addEventListener("click", () => { visibleLimit += PAGE_SIZE; render(); });
render();
