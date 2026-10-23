import { EXAMPLES_CATALOG } from "../src/RichVisualizationExamples.js";
import { DIAGRAM_REGISTRY } from "../src/RichVisualizationRegistry.js";
import { ICON_NAMES } from "../src/RichVisualizationIcons.js";
import { buildVisualCatalog } from "./catalog.js";

export async function loadLibraryRecords() {
  const response = await fetch(new URL("./catalog.json", import.meta.url), { cache: "no-store" });
  if (!response.ok) throw new Error(`Visual asset discovery failed (${response.status}).`);
  const catalog = await response.json();
  const records = buildVisualCatalog({
    examplesCatalog: EXAMPLES_CATALOG,
    diagramRegistry: DIAGRAM_REGISTRY,
    assetsCatalog: { assets: [] },
    discoveredAssets: catalog.assets || [],
    iconNames: ICON_NAMES,
  });
  const collections = [
    { id: "diagrams", label: "Diagrams", description: "Flows, charts, data stories and reusable visual patterns.", href: "./diagrams.html", kind: "example", icon: "workflow" },
    { id: "icons", label: "Icons", description: "Compact interface glyphs from the Rich Viz icon registry.", href: "./icons.html", kind: "icon", icon: "sparkles" },
    { id: "app-icons", label: "Application Icons", description: "Detailed app artwork, indexed separately by collection.", href: "./app-icons.html", kind: "app-icon", icon: "image" },
    { id: "svg", label: "SVG", description: "Standalone illustrations ready for documentation and product UI.", href: "./svg.html", kind: "svg", icon: "file-text" },
    { id: "stickers", label: "Stickers", description: "Developer-focused sticker artwork and source details.", href: "./stickers.html", kind: "sticker", icon: "star" },
  ].map((collection) => ({ ...collection, count: records.filter((record) => record.kind === collection.kind).length }));
  const collectionKinds = new Set(collections.map((collection) => collection.kind));
  const collectionRecords = records.filter((record) => collectionKinds.has(record.kind));
  return { records, collectionRecords, collections, types: DIAGRAM_REGISTRY.length, total: collectionRecords.length };
}
