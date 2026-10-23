import { ICON_NAMES } from "../src/RichVisualizationIcons.js";

const legacyRoutes = { icons: "icons.html", assets: "svg.html", stickers: "stickers.html", "stickers-title": "stickers.html" };
const legacyHash = decodeURIComponent(location.hash.slice(1));
if (legacyRoutes[legacyHash]) {
  location.replace(new URL(`../visual-browser/${legacyRoutes[legacyHash]}`, import.meta.url));
} else {
  const iconTotal = document.querySelector("#icon-total");
  if (iconTotal) iconTotal.textContent = String(ICON_NAMES.length);
  const appIconTotal = document.querySelector("#app-icon-total");

  try {
    const response = await fetch("../visual-browser/catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Asset discovery failed (${response.status}).`);
    const { assets } = await response.json();
    if (appIconTotal) appIconTotal.textContent = String(assets.filter((item) => item.kind === "application-icon").length);
    const svgTotal = document.querySelector("#svg-total");
    const stickerTotal = document.querySelector("#sticker-total");
    if (svgTotal) svgTotal.textContent = String(assets.filter((item) => item.kind !== "sticker" && String(item.format || item.path.split(".").at(-1)).toLowerCase() === "svg").length);
    if (stickerTotal) stickerTotal.textContent = String(assets.filter((item) => item.kind === "sticker" || /sticker/i.test(item.path)).length);
  } catch {
    const svgTotal = document.querySelector("#svg-total");
    const stickerTotal = document.querySelector("#sticker-total");
    if (appIconTotal) appIconTotal.textContent = "—";
    if (svgTotal) svgTotal.textContent = "—";
    if (stickerTotal) stickerTotal.textContent = "—";
  }
}
