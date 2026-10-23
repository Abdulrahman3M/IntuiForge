/* RichViz — inert article markup for ```edu-viz fences.
 *
 * Deliberately tiny and dependency-free: the article parser imports it on every page, so it only builds the
 * placeholder figure (source kept verbatim in a text <template>, title/description as no-script fallback text).
 * Validation, rendering and every engine load later, on demand, from RichVisualization.js. */
export const RICH_FENCE = "edu-viz";
export const MAX_FENCE_SOURCE = 120000;

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function renderRichVisualizationFence(source) {
  const raw = String(source || "");
  if (raw.length > MAX_FENCE_SOURCE) return null;
  let title = ""; let description = ""; let type = "";
  try {
    const value = JSON.parse(raw);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      title = typeof value.title === "string" ? value.title.slice(0, 160) : "";
      description = typeof value.description === "string" ? value.description.slice(0, 1200) : "";
      type = typeof value.type === "string" && /^[a-z0-9-]{1,24}$/.test(value.type) ? value.type : "";
    }
  } catch { /* the hydrator reports invalid source; the placeholder just omits the fallback text */ }
  const label = title || "Article visualization";
  return `<figure class="article-diagram article-diagram--edu-viz" data-article-diagram="${RICH_FENCE}" data-rev-type="${escapeHtml(type)}"><div class="article-diagram__canvas" data-diagram-canvas aria-busy="true"><p class="rev-prefallback"><strong>${escapeHtml(label)}</strong>${description ? ` — ${escapeHtml(description)}` : ""}</p></div><template class="article-diagram__source">${escapeHtml(raw)}</template><figcaption class="article-diagram__caption">${escapeHtml(label)}</figcaption></figure>`;
}
