const navigation = [
  ["index.html", "Home", "home"],
  ["library.html", "Explore Library", "grid"],
  ["project.html", "Project", "book"],
  ["about.html", "About", "info"],
];

const libraryTabs = [
  ["diagrams.html", "Diagrams", "diagram"],
  ["icons.html", "Icons", "spark"],
  ["app-icons.html", "Application Icons", "image"],
  ["svg.html", "SVG", "file"],
  ["stickers.html", "Stickers", "sticker"],
];

const paths = {
  home: ["M3 10.5 12 3l9 7.5", "M5.5 9v11h13V9", "M9 20v-6h6v6"],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5z", "M4 5.5v14"],
  grid: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M3 14h7v7H3z", "M14 14h7v7h-7z"],
  diagram: ["M5 5h5v5H5z", "M14 14h5v5h-5z", "M14 3h5v5h-5z", "M10 7h4", "M16.5 8v6", "M7.5 10v7h6.5"],
  spark: ["m12 3 2.2 5.1L20 10l-5.8 1.9L12 17l-2.2-5.1L4 10l5.8-1.9L12 3z", "m18 14 1.1 2.4L22 17l-2.9.7L18 20l-1.1-2.3L14 17l2.9-.6L18 14z"],
  image: ["M4 5h16v14H4z", "M4 15l5-5 4 4 2-2 5 5", "M16 7h.01"],
  file: ["M6 3h8l5 5v13H6z", "M14 3v5h5", "M9 13h7", "M9 17h7"],
  sticker: ["M20 13V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8", "M14 21v-6h6", "m14 21 6-6"],
  info: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 11v5", "M12 8h.01"],
};

function makeIcon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  for (const d of paths[name] || []) {
    const node = document.createElementNS(svg.namespaceURI, d.endsWith(".01") ? "circle" : "path");
    if (d.endsWith(".01")) { node.setAttribute("cx", "12"); node.setAttribute("cy", "8"); node.setAttribute("r", ".7"); }
    else node.setAttribute("d", d);
    svg.append(node);
  }
  return svg;
}

const currentPage = location.pathname.includes("/Assets/") ? "asset-hub.html" : location.pathname.includes("/src/gallery/") ? "qa-gallery.html" : location.pathname.split("/").at(-1) || "index.html";
const libraryPages = new Set(["library.html", "diagrams.html", "icons.html", "app-icons.html", "svg.html", "stickers.html", "asset-hub.html"]);
const header = document.createElement("header");
header.className = "masthead";
const brand = document.createElement("a");
brand.className = "brand";
brand.href = new URL("./index.html", import.meta.url).href;
brand.setAttribute("aria-label", "Rich Viz home");
const mark = document.createElement("span");
mark.className = "brand-mark";
mark.setAttribute("aria-hidden", "true");
mark.textContent = "R";
const name = document.createElement("strong");
name.textContent = "Rich Viz";
brand.append(mark, name);
const nav = document.createElement("nav");
nav.className = "primary-nav";
nav.setAttribute("aria-label", "Primary navigation");
for (const [href, label, icon] of navigation) {
  const link = document.createElement("a");
  link.className = "nav-link";
  link.href = new URL(href, import.meta.url).href;
  if (href === currentPage || (href === "library.html" && libraryPages.has(currentPage))) link.setAttribute("aria-current", "page");
  link.append(makeIcon(icon), document.createTextNode(label));
  nav.append(link);
}
const version = document.createElement("a");
version.className = "version-badge";
version.href = "../VERSION";
version.id = "version-badge";
version.setAttribute("aria-label", "Rich Viz version");
version.textContent = "v…";
const themeButton = document.createElement("button");
themeButton.className = "theme-toggle";
themeButton.id = "theme-toggle";
themeButton.type = "button";
themeButton.append(makeIcon("info"));
themeButton.querySelector("svg").innerHTML = '<path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.7 8.8 8.8 0 1 0 20.5 15.5Z"/>';
const themeLabel = document.createElement("span");
themeLabel.textContent = "Theme";
themeButton.append(themeLabel);
themeButton.setAttribute("aria-label", "Switch to dark theme");
themeButton.setAttribute("aria-pressed", "false");
header.append(brand, nav, version, themeButton);
const headerSlot = document.querySelector("[data-site-header]");
if (headerSlot) headerSlot.replaceWith(header);

if (libraryPages.has(currentPage)) {
  const subnav = document.createElement("nav");
  subnav.className = "library-nav";
  subnav.setAttribute("aria-label", "Library sections");
  const inner = document.createElement("div");
  inner.className = "library-nav__inner";
  for (const [href, label, icon] of libraryTabs) {
    const link = document.createElement("a");
    link.className = "library-tab";
    link.href = new URL(href, import.meta.url).href;
    if (href === currentPage) { link.setAttribute("aria-current", "page"); link.setAttribute("aria-label", `${label}, current section`); }
    link.append(makeIcon(icon), document.createTextNode(label));
    inner.append(link);
  }
  subnav.append(inner);
  header.after(subnav);
  const updateHeaderOffset = () => document.documentElement.style.setProperty("--site-header-height", `${header.getBoundingClientRect().height}px`);
  updateHeaderOffset();
  if ("ResizeObserver" in window) new ResizeObserver(updateHeaderOffset).observe(header);
  else window.addEventListener("resize", updateHeaderOffset, { passive: true });
}

const footer = document.createElement("footer");
footer.className = "site-footer";
const footerBrand = document.createElement("span");
footerBrand.textContent = "Rich Visualization Library · Rich Viz";
const footerLicense = document.createElement("span");
footerLicense.textContent = "Apache-2.0 applies to original library work; third-party notices remain with their components.";
footer.append(footerBrand, footerLicense);
document.querySelector("[data-site-footer]")?.replaceWith(footer);

function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  try { localStorage.setItem("richviz-visual-browser-theme", dark ? "dark" : "light"); } catch { /* Storage can be unavailable in private contexts. */ }
}
let dark = false;
try { dark = localStorage.getItem("richviz-visual-browser-theme") === "dark"; } catch { /* Keep the light default. */ }
applyTheme(dark);
themeButton.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme !== "dark"));

try {
  const response = await fetch(new URL("../VERSION", import.meta.url), { cache: "no-store" });
  const value = response.ok ? (await response.text()).trim() : "";
  if (/^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/.test(value)) {
    version.textContent = `v${value}`;
    version.setAttribute("aria-label", `Rich Viz version ${value}`);
    version.title = `Rich Viz ${value} · read from VERSION`;
  }
} catch { /* Keep a neutral placeholder if version cannot be read. */ }
