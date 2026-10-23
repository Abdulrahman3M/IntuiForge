import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { EXAMPLES_CATALOG } from "../src/RichVisualizationExamples.js";
import { DIAGRAM_REGISTRY } from "../src/RichVisualizationRegistry.js";
import { ICON_NAMES } from "../src/RichVisualizationIcons.js";
import { buildVisualCatalog, filterVisualCatalog, sortVisualCatalog } from "../visual-browser/catalog.js";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const assets = JSON.parse(readFileSync(resolve(root, "Assets/catalog.json"), "utf8"));
const catalog = buildVisualCatalog({ examplesCatalog: EXAMPLES_CATALOG, diagramRegistry: DIAGRAM_REGISTRY, assetsCatalog: assets, iconNames: ICON_NAMES });

test("browser catalog derives unique stable IDs for examples, application icons, SVGs, stickers and UI icons", () => {
  assert.equal(catalog.length, 377);
  assert.equal(new Set(catalog.map((item) => item.id)).size, catalog.length);
  assert.equal(catalog.filter((item) => item.kind === "example").length, 24);
  assert.equal(catalog.filter((item) => item.kind === "svg").length, 12);
  assert.equal(catalog.filter((item) => item.kind === "icon").length, 99);
  assert.equal(catalog.filter((item) => item.kind === "app-icon").length, 231);
  assert.equal(catalog.filter((item) => item.kind === "sticker").length, 11);
  assert.ok(catalog.some((item) => item.id === "RV-EX-CORE-bar-chart"));
  assert.ok(catalog.some((item) => item.id === "RV-SVG-sample-checks"));
  assert.ok(catalog.some((item) => item.id === "RV-ICON-git-branch"));
});

test("browser catalog includes every discovered SVG and raster asset with portable metadata", () => {
  const discoveredAssets = [
    { id: "sample-checks", name: "Passing checks illustration", path: "src/gallery/media/sample-checks.svg", format: "SVG", category: "Illustrations", license: "Apache-2.0" },
    { id: "hero-art", name: "Rich Viz identity", path: "Assets/richviz-hero.svg", format: "SVG", category: "Brand", license: "Apache-2.0" },
    { name: "Home page icon", path: "Assets/Icons/home-page.png", format: "PNG", category: "Icons", license: "Apache-2.0" },
  ];
  const expanded = buildVisualCatalog({ examplesCatalog: EXAMPLES_CATALOG, diagramRegistry: DIAGRAM_REGISTRY, assetsCatalog: assets, iconNames: ICON_NAMES, discoveredAssets });
  assert.equal(expanded.filter((item) => item.kind === "svg").length, 13);
  assert.equal(expanded.filter((item) => item.kind === "image").length, 1);
  assert.ok(expanded.some((item) => item.path === "Assets/Icons/home-page.png" && item.id.startsWith("RV-ASSET-")));
  assert.equal(new Set(expanded.map((item) => item.id)).size, expanded.length);
});

test("discovery enriches catalogued paths without discarding their attribution identity", () => {
  const enriched = buildVisualCatalog({ examplesCatalog: [], diagramRegistry: [], assetsCatalog: assets, iconNames: [], discoveredAssets: [{ name: "Discovered sample", path: "src/gallery/media/sample-checks.svg", format: "SVG", category: "Images" }] });
  const item = enriched.find((record) => record.kind === "svg");
  assert.equal(item.id, "RV-SVG-sample-checks");
  assert.equal(item.asset.license, "Apache-2.0");
  assert.equal(item.asset.name, "Discovered sample");
});

test("visual browser presents a shared design, independent routes, complete asset details and an accessible modal header", () => {
  const html = readFileSync(resolve(root, "visual-browser/index.html"), "utf8");
  const diagramHtml = readFileSync(resolve(root, "visual-browser/diagrams.html"), "utf8");
  const libraryHtml = readFileSync(resolve(root, "visual-browser/library.html"), "utf8");
  const shell = readFileSync(resolve(root, "visual-browser/shell.js"), "utf8");
  const css = readFileSync(resolve(root, "visual-browser/browser.css"), "utf8");
  const js = readFileSync(resolve(root, "visual-browser/browser.js"), "utf8");
  const assetJs = readFileSync(resolve(root, "visual-browser/asset-pages.js"), "utf8");
  for (const [page, kind] of [["icons", "icons"], ["svg", "svg"], ["stickers", "stickers"]]) {
    const assetPage = readFileSync(resolve(root, `visual-browser/${page}.html`), "utf8");
    assert.match(assetPage, new RegExp(`data-asset-page="${kind}"`));
    assert.match(assetPage, /data-site-header/);
    assert.match(assetPage, /data-site-footer/);
    assert.match(assetPage, /src="shell\.js(?:\?[^\"]*)?"/);
    assert.match(assetPage, /src="asset-pages\.js(?:\?[^\"]*)?"/);
  }
  const appPage = readFileSync(resolve(root, "visual-browser/app-icons.html"), "utf8");
  assert.match(appPage, /data-asset-page="app-icon"/);
  assert.match(appPage, /src="asset-pages\.js(?:\?[^\"]*)?"/);
  assert.ok(shell.includes('"Application Icons"'));
  for (const page of ["project", "about"]) {
    const standalonePage = readFileSync(resolve(root, `visual-browser/${page}.html`), "utf8");
    assert.match(standalonePage, /data-site-header/);
    assert.match(standalonePage, /data-site-footer/);
    assert.match(standalonePage, /src="shell\.js(?:\?[^\"]*)?"/);
  }
  for (const label of ["Home", "Explore Library", "Project", "About", "Diagrams", "Icons", "Application Icons", "SVG", "Stickers"]) assert.ok(shell.includes(`"${label}"`));
  assert.doesNotMatch(shell.slice(0, shell.indexOf("const libraryTabs")), /Full Gallery/);
  assert.equal((shell.slice(shell.indexOf("const libraryTabs"), shell.indexOf("const paths")).match(/\.html"/g) || []).length, 5);
  assert.match(shell, /id = "version-badge"/);
  assert.match(html, /data-site-header/);
  assert.match(html, /Make complex ideas/);
  assert.match(html, /Explore Library/);
  assert.match(html, /home-showcase/);
  assert.match(html, /RTL node maps wrap subtitles inside their cards and align arrows with their endpoints. Instructional diagram text keeps a 16px minimum. Interactive node maps use one fullscreen control alongside zoom; the graph fits automatically when opened and expanded./);
  assert.match(libraryHtml, /id="collection-cards"/);
  assert.match(libraryHtml, /id="library-search"/);
  assert.match(libraryHtml, /id="library-total"/);
  assert.match(diagramHtml, /id="category"/);
  assert.match(diagramHtml, /id="sort"/);
  assert.match(diagramHtml, /id="results"/);
  assert.doesNotMatch(html, /featured-cards/);
  assert.match(diagramHtml, /class="dialog-header"/);
  assert.match(css, /\.masthead\s*\{[^}]*position:\s*sticky/s);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /grid-template-columns:\s*repeat\(5,minmax\(0,1fr\)\)/);
  assert.match(css, /\.detail-preview\.asset-preview/);
  assert.match(js, /addEventListener\("cancel"/);
  assert.match(js, /item\.asset\?\.license/);
  assert.match(js, /validateVisualizationSource\(JSON\.stringify\(spec\)\)/);
  assert.match(js, /encodeURIComponent/);
  assert.match(shell, /fetch\(new URL\("\.\.\/VERSION", import\.meta\.url\)/);
  assert.match(js, /EXAMPLES_CATALOG\.length/);
  assert.match(js, /DIAGRAM_REGISTRY\.length/);
  assert.match(js, /assetsCatalog: \{ assets: \[\] \}/);
  assert.match(js, /iconNames: \[\]/);
  assert.doesNotMatch(js, /fetch\([^\n]*(?:catalog\.json|catalog\.js)/);
  assert.match(assetJs, /pageKind === "stickers" \? "sticker"/);
  assert.match(readFileSync(resolve(root, "visual-browser/library-data.js"), "utf8"), /records\.filter\(\(record\) => record\.kind === collection\.kind\)\.length/);
  assert.match(readFileSync(resolve(root, "visual-browser/home.js"), "utf8"), /EXAMPLES_CATALOG\.find/);
  assert.match(readFileSync(resolve(root, "visual-browser/home.js"), "utf8"), /validateVisualizationSource\(JSON\.stringify\(showcaseSpec\)\)/);
  assert.match(readFileSync(resolve(root, "visual-browser/library.js"), "utf8"), /filterVisualCatalog/);
  assert.match(css, /\.library-nav\s*\{[^}]*position:\s*sticky/s);
  assert.match(css, /@view-transition\s*\{\s*navigation:\s*auto/s);
});

test("asset catalog hub links to independent Icons, SVG and Stickers pages", () => {
  const html = readFileSync(resolve(root, "Assets/index.html"), "utf8");
  const js = readFileSync(resolve(root, "Assets/assets.js"), "utf8");
  for (const path of ["../visual-browser/icons.html", "../visual-browser/svg.html", "../visual-browser/stickers.html"]) assert.ok(html.includes(path));
  assert.match(html, /src="assets\.js"/);
  assert.match(js, /fetch\("\.\.\/visual-browser\/catalog\.json", \{ cache: "no-store" \}\)/);
  assert.match(js, /assets: "svg\.html"/);
});

test("icons, SVG artwork, and stickers are separate kinds without GIF-based assumptions", () => {
  const classified = buildVisualCatalog({ examplesCatalog: [], diagramRegistry: [], assetsCatalog: { assets: [] }, iconNames: ["home"], discoveredAssets: [
    { id: "artwork", path: "Assets/Artwork/example.svg", format: "SVG" },
    { id: "animation", path: "Assets/Media/animation.gif", format: "GIF" },
    { id: "sticker", path: "Assets/Stickers/flower.png", format: "PNG" },
  ] });
  assert.equal(classified.filter((item) => item.kind === "icon").length, 1);
  assert.equal(classified.filter((item) => item.kind === "svg").length, 1);
  assert.equal(classified.filter((item) => item.kind === "sticker").length, 1);
  assert.equal(classified.find((item) => item.path.endsWith("animation.gif")).kind, "image");
  assert.equal(classified.filter((item) => item.kind === "icon").some((item) => item.path.endsWith("example.svg")), false);
});

test("application icon packs remain separate from UI glyphs and retain GPL collection provenance", () => {
  const appIcons = catalog.filter((item) => item.kind === "app-icon");
  assert.equal(appIcons.length, 231);
  assert.ok(appIcons.every((item) => item.asset?.collection === "Captiva" && item.asset?.license === "GPL-3.0+"));
  assert.ok(appIcons.every((item) => item.id.startsWith("RV-APP-captiva-")));
  assert.equal(new Set(appIcons.map((item) => item.asset.sha256)).size, appIcons.length);
  assert.ok(catalog.filter((item) => item.kind === "icon").every((item) => !item.id.startsWith("RV-APP-")));
});

test("all catalog paths resolve to source files and docs links are file targets", () => {
  for (const item of catalog) {
    assert.ok(existsSync(resolve(root, item.path)), `${item.id}: ${item.path}`);
    assert.ok(existsSync(resolve(root, item.docs)), `${item.id}: ${item.docs}`);
  }
});

test("search covers ID, type, category, filename and tags; filters match real capabilities", () => {
  assert.equal(filterVisualCatalog(catalog, { query: "RV-EX-CORE-bar-chart" })[0].type, "bar-chart");
  assert.ok(filterVisualCatalog(catalog, { query: "Statistics" }).some((item) => item.type === "bar-chart"));
  assert.ok(filterVisualCatalog(catalog, { query: "Examples/patterns/course-preparation-gantt.json" }).length > 0);
  assert.ok(filterVisualCatalog(catalog, { query: "workflow" }).length > 0);
  assert.ok(filterVisualCatalog(catalog, { kind: "icon" }).every((item) => item.kind === "icon"));
  assert.ok(filterVisualCatalog(catalog, { behavior: "interactive" }).length > 0);
  assert.ok(filterVisualCatalog(catalog, { behavior: "statistical" }).every((item) => ["bar-chart", "data-chart", "kpi-dashboard"].includes(item.type)));
});

test("visual browser sorting uses live catalog records without mutating their contents", () => {
  const before = catalog.map((item) => item.id);
  assert.equal(sortVisualCatalog(catalog, "name")[0].title, [...catalog].map((item) => item.title).sort((a, b) => a.localeCompare(b))[0]);
  assert.equal(sortVisualCatalog(catalog, "reference")[0].id, [...catalog].map((item) => item.id).sort((a, b) => a.localeCompare(b))[0]);
  assert.deepEqual(sortVisualCatalog(catalog, "featured", ["RV-EX-CORE-bar-chart"]).slice(0, 2).map((item) => item.id), ["RV-EX-CORE-bar-chart", catalog.find((item) => item.id !== "RV-EX-CORE-bar-chart").id]);
  assert.deepEqual(catalog.map((item) => item.id), before);
});

test("browser has its own sticker category sourced from unique catalogued files", () => {
  assert.equal(catalog.filter((item) => item.kind === "sticker").length, 11);
  const html = readFileSync(resolve(root, "visual-browser/stickers.html"), "utf8");
  assert.match(html, /data-asset-page="stickers"/);
  assert.match(readFileSync(resolve(root, "visual-browser/asset-pages.js"), "utf8"), /No sticker files in this library release/);
});

test("current public branding uses Rich Visualization Library and Rich Viz", () => {
  const readme = readFileSync(resolve(root, "README.md"), "utf8");
  const browser = readFileSync(resolve(root, "visual-browser/index.html"), "utf8");
  const banner = readFileSync(resolve(root, "Assets/richviz-hero.svg"), "utf8");
  assert.match(readme, /^# Rich Visualization Library/m);
  assert.match(readme, /### Rich Viz/);
  assert.match(browser, /Rich Viz — Visual Library/);
  assert.match(banner, /Rich Visualization Library system/);
  assert.doesNotMatch(readme, /Rich Educational Visualization Library/);
});
