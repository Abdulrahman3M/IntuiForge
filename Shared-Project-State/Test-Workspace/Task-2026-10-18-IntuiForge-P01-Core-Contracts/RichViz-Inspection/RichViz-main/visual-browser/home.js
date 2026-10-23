import { EXAMPLES_CATALOG } from "../src/RichVisualizationExamples.js";
import { DIAGRAM_REGISTRY } from "../src/RichVisualizationRegistry.js";
import { ICON_NAMES } from "../src/RichVisualizationIcons.js";
import { RichViz } from "../src/RichVisualization.js";
import { validateVisualizationSource } from "../src/RichVisualizationSchema.js";
import { loadLibraryRecords } from "./library-data.js";

const previewHost = document.querySelector("#home-showcase");
const exampleIds = ["process-cards", "step-guide", "kpi-dashboard"];
for (const id of exampleIds) {
  const entry = EXAMPLES_CATALOG.find((item) => item.id === id);
  if (!entry) continue;
  const card = document.createElement("article");
  card.className = "showcase-card";
  const preview = document.createElement("div");
  preview.className = "showcase-preview";
  preview.setAttribute("aria-label", `${entry.spec.title} preview`);
  const host = document.createElement("div");
  host.className = "showcase-render";
  preview.append(host);
  const title = document.createElement("h2");
  title.textContent = entry.spec.title;
  card.append(preview, title);
  previewHost.append(card);
  const showcaseSpec = { ...entry.spec, options: { ...entry.spec.options, showTitle: false } };
  const checked = validateVisualizationSource(JSON.stringify(showcaseSpec));
  if (!checked.ok) {
    host.textContent = "Preview unavailable";
    continue;
  }
  RichViz.render(host, checked.spec).ready.catch(() => { /* Keep the rest of the homepage usable if an optional renderer fails. */ });
}

try {
  const { collections, total, types } = await loadLibraryRecords();
  const stats = document.querySelector("#home-stats");
  stats.replaceChildren();
  const values = [
    [total, "browsable items"],
    [types, "visualization types"],
    [collections.find((item) => item.id === "icons")?.count ?? ICON_NAMES.length, "interface icons"],
    [collections.length, "collections"],
  ];
  for (const [value, label] of values) {
    const item = document.createElement("div");
    item.className = "home-stat";
    const count = document.createElement("strong");
    count.textContent = value.toLocaleString();
    const caption = document.createElement("span");
    caption.textContent = label;
    item.append(count, caption);
    stats.append(item);
  }
  stats.setAttribute("aria-busy", "false");
} catch (error) {
  document.querySelector("#home-stats").textContent = "Library statistics will appear when the visual asset catalog is available.";
  document.querySelector("#home-stats").setAttribute("aria-busy", "false");
  console.error(error);
}
