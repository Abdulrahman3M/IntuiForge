import { filterVisualCatalog } from "./catalog.js";
import { loadLibraryRecords } from "./library-data.js";
import { iconMarkup } from "../src/RichVisualizationIcons.js";

const cards = document.querySelector("#collection-cards");
const search = document.querySelector("#library-search");
const type = document.querySelector("#library-type");
const results = document.querySelector("#library-results");
const status = document.querySelector("#library-result-count");
const searchForm = document.querySelector("#library-search-form");

function icon(name) {
  const span = document.createElement("span");
  span.className = "collection-icon";
  span.setAttribute("aria-hidden", "true");
  span.innerHTML = iconMarkup(name);
  return span;
}

function categoryCard(collection) {
  const link = document.createElement("a");
  link.className = "collection-card";
  link.href = collection.href;
  link.dataset.collection = collection.id;
  link.append(icon(collection.icon));
  const header = document.createElement("span");
  header.className = "collection-card__header";
  const title = document.createElement("strong");
  title.textContent = collection.label;
  const count = document.createElement("span");
  count.className = "collection-count";
  count.textContent = collection.count.toLocaleString();
  header.append(title, count);
  const description = document.createElement("span");
  description.className = "collection-description";
  description.textContent = collection.description;
  const action = document.createElement("span");
  action.className = "collection-action";
  action.textContent = "Browse collection";
  link.append(header, description, action);
  return link;
}

function resultRow(item) {
  const link = document.createElement("a");
  link.className = "library-result";
  const kindRoute = { example: "diagrams.html", icon: "icons.html", "app-icon": "app-icons.html", svg: "svg.html", sticker: "stickers.html", image: "diagrams.html" };
  const route = kindRoute[item.kind] || "diagrams.html";
  const params = new URLSearchParams({ q: search.value.trim() });
  link.href = `./${route}?${params}`;
  const name = document.createElement("strong");
  name.textContent = item.title;
  const meta = document.createElement("span");
  meta.textContent = `${item.type} · ${item.id}`;
  const arrow = document.createElement("span");
  arrow.className = "result-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(name, meta, arrow);
  return link;
}

let state;
function render() {
  const query = search.value.trim();
  const selected = type.value;
  const matches = query ? filterVisualCatalog(state.collectionRecords, { query, kind: selected }).slice(0, 8) : [];
  results.replaceChildren(...matches.map(resultRow));
  const count = query ? filterVisualCatalog(state.collectionRecords, { query, kind: selected }).length : 0;
  status.textContent = query ? `${count.toLocaleString()} matching items${count > matches.length ? ` · showing ${matches.length}` : ""}` : "Search item names, types, categories or reference IDs.";
  results.hidden = !query;
  status.hidden = !query;
}

try {
  state = await loadLibraryRecords();
  cards.replaceChildren(...state.collections.map(categoryCard));
  document.querySelector("#library-total").textContent = state.total.toLocaleString();
  document.querySelector("#library-collection-total").textContent = state.collections.length.toLocaleString();
  document.querySelector("#library-type-total").textContent = state.types.toLocaleString();
  searchForm.hidden = false;
  render();
} catch (error) {
  cards.innerHTML = "";
  const notice = document.createElement("p");
  notice.className = "empty-state--page";
  notice.textContent = "The visual catalog could not be loaded. Start the local website server and refresh this page.";
  cards.append(notice);
  console.error(error);
}

search.addEventListener("input", render);
type.addEventListener("change", render);
