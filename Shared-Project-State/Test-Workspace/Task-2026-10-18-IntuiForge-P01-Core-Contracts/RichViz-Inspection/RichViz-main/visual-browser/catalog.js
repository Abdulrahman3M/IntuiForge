const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Build browse records from the library's source registries; no browser-owned metadata is maintained. */
export function buildVisualCatalog({ examplesCatalog, diagramRegistry, assetsCatalog, discoveredAssets = [], iconNames }) {
  const types = new Map(diagramRegistry.map((item) => [item.id, item]));
  const records = examplesCatalog.map((entry) => {
    const type = types.get(entry.spec.type);
    const pattern = entry.group === "patterns";
    const category = type?.name || (entry.spec.type === "media" ? "Media" : "Composition");
    const path = `Examples/${pattern ? "patterns" : "core"}/${entry.id}.json`;
    return {
      id: `RV-EX-${entry.group.toUpperCase()}-${slug(entry.id)}`,
      kind: "example", title: entry.spec.title || type?.name || entry.id, type: entry.spec.type,
      category, description: entry.spec.description || `A ${category.toLowerCase()} visualization example.`,
      path, docs: type?.documentation || "docs/API.md", format: "JSON", tags: [entry.id, entry.group, category, entry.spec.type, ...(["bar-chart", "data-chart", "kpi-dashboard"].includes(entry.spec.type) ? ["statistics", "data visualization"] : [])],
      static: type?.static ?? true, interactive: type?.interactive ?? false, spec: entry.spec,
    };
  });
  const assetByPath = new Map();
  for (const asset of [...(assetsCatalog.assets || []), ...(assetsCatalog.discoveredAssets || []), ...discoveredAssets]) {
    const path = asset.path.startsWith("../") || asset.path.startsWith("./")
      ? decodeURIComponent(new URL(asset.path, "https://richviz.invalid/Assets/catalog.json").pathname.slice(1))
      : decodeURIComponent(asset.path.replace(/^\//, ""));
    const key = path.toLocaleLowerCase();
    const existing = assetByPath.get(key);
    assetByPath.set(key, { ...(existing || {}), ...asset, id: existing?.id || asset.id, path });
  }
  for (const asset of assetByPath.values()) {
    const extension = asset.format || asset.path.split(".").at(-1).toUpperCase();
    const category = asset.category || asset.path.split("/").slice(0, -1).at(-1) || "Visual assets";
    const isApplicationIcon = asset.kind === "application-icon" || Boolean(asset.collection);
    const isSticker = asset.kind === "sticker" || /\.(?:tgs|lottie)$/i.test(asset.path) || /sticker/i.test(`${category}/${asset.path}`);
    const isSvg = /^svg$/i.test(extension) || asset.path.toLocaleLowerCase().endsWith(".svg");
    const kind = isApplicationIcon ? "app-icon" : isSticker ? "sticker" : isSvg ? "svg" : "image";
    const prefix = kind === "app-icon" ? "RV-APP" : kind === "sticker" ? "RV-STICKER" : "RV-SVG";
    const id = asset.id ? `${prefix}-${slug(asset.id)}` : `RV-ASSET-${slug(asset.path)}`;
    records.push({
      id, kind, title: asset.name || asset.path.split("/").at(-1), type: kind === "app-icon" ? "Application icon" : asset.kind || (isSticker ? "Sticker" : isSvg ? "SVG asset" : "Image asset"), category,
      description: asset.dimensions ? `${extension} illustration (${asset.dimensions}).` : `${extension} visual asset from ${category}.`, path: asset.path,
      docs: asset.id ? "Assets/catalog.json" : "Assets/index.html", format: extension,
      tags: [...(asset.tags || []), category, extension, "static"], static: true, interactive: false, asset,
    });
  }
  for (const iconName of iconNames) {
    records.push({
      id: `RV-ICON-${slug(iconName)}`, kind: "icon", title: iconName, type: "Icon", category: "Icons",
      description: `Hand-authored SVG glyph named ${iconName}.`, path: "src/RichVisualizationIcons.js", docs: "Assets/catalog.json",
      format: "SVG", tags: [iconName, "icon", "svg", "static"], static: true, interactive: false, iconName,
    });
  }
  return records;
}

export function filterVisualCatalog(records, { query = "", kind = "all", behavior = "all", category = "all" } = {}) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return records.filter((item) => {
    if (kind !== "all" && (kind === "image" ? !["image", "sticker"].includes(item.kind) : item.kind !== kind)) return false;
    if (category !== "all" && item.category !== category) return false;
    if (behavior === "static" && !item.static) return false;
    if (behavior === "interactive" && !item.interactive) return false;
    if (behavior === "statistical" && !["bar-chart", "data-chart", "kpi-dashboard"].includes(item.type)) return false;
    const haystack = [item.id, item.title, item.type, item.category, item.path, item.description, ...item.tags].join(" ").toLocaleLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function sortVisualCatalog(records, order = "featured", preferredIds = []) {
  const sorted = [...records];
  if (order === "name") return sorted.sort((a, b) => a.title.localeCompare(b.title));
  if (order === "type") return sorted.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title));
  if (order === "category") return sorted.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
  if (order === "reference") return sorted.sort((a, b) => a.id.localeCompare(b.id));
  if (order !== "featured" || !preferredIds.length) return sorted;
  const priority = new Map(preferredIds.map((id, index) => [id, index]));
  return sorted.sort((a, b) => (priority.get(a.id) ?? Infinity) - (priority.get(b.id) ?? Infinity));
}
