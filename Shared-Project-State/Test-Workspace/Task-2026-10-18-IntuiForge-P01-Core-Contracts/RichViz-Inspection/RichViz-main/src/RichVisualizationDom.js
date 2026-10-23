/* RichViz — DOM building blocks shared by every renderer.
 *
 * Renderers build elements with these helpers and textContent only; article data is never parsed as
 * HTML. Icon markup comes from the trusted registry, never from the spec.
 */
import { iconMarkup, iconBody } from "./RichVisualizationIcons.js";

let counter = 0;
export const uid = (prefix = "rev") => `${prefix}-${(counter += 1).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** el("div", { class: "x", text: "hi", attrs: { role: "list" }, dataset: { tone: "info" } }, [children]) */
export function el(tag, { class: className, text, attrs, dataset, style } = {}, children = []) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  if (attrs) for (const [name, value] of Object.entries(attrs)) if (value !== undefined && value !== null && value !== false) node.setAttribute(name, value === true ? "" : String(value));
  if (dataset) for (const [name, value] of Object.entries(dataset)) if (value !== undefined && value !== null) node.dataset[name] = String(value);
  if (style) for (const [name, value] of Object.entries(style)) node.style.setProperty(name, String(value));
  for (const child of children) if (child) node.append(child);
  return node;
}

export function svgEl(tag, attrs = {}, children = []) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [name, value] of Object.entries(attrs)) if (value !== undefined && value !== null) node.setAttribute(name, String(value));
  for (const child of children) if (child) node.append(child);
  return node;
}

/** Trusted icon registry → live <svg> node. Unknown names return null (validation already rejects them). */
export function icon(name) {
  const markup = iconMarkup(name);
  if (!markup) return null;
  const template = document.createElement("template");
  template.innerHTML = markup;
  return template.content.firstElementChild;
}

/** <g> holding a registered icon's strokes, positioned and scaled inside another SVG (24-unit icon grid). */
export function svgIconGroup(name, x, y, size, stroke = "currentColor") {
  const body = iconBody(name);
  if (!body) return null;
  const group = svgEl("g", { transform: `translate(${x} ${y}) scale(${size / 24})`, fill: "none", stroke, "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" });
  const template = document.createElement("template");
  template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  for (const child of [...template.content.firstElementChild.childNodes]) group.append(document.importNode(child, true));
  return group;
}

export function iconChip(name, tone) {
  const glyph = icon(name);
  return glyph ? el("span", { class: "rev-iconchip", dataset: { tone: tone || undefined }, attrs: { "aria-hidden": "true" } }, [glyph]) : null;
}

export function statusChip(status, className = "rev-chip") {
  if (!status) return null;
  const glyph = status.icon ? icon(status.icon) : null;
  return el("span", { class: className, dataset: { tone: status.tone, state: status.state } }, [
    glyph || el("span", { class: "rev-chip__dot", attrs: { "aria-hidden": "true" } }),
    el("span", { text: status.text }),
  ]);
}

export function progressBar(progress, { label, tone, caption, ariaLabel } = {}) {
  if (!progress) return null;
  const text = progress.label || label;
  const id = uid("rev-progress");
  const bar = el("div", { class: "rev-progress", dataset: { tone: progress.tone || tone || undefined } }, [
    el("div", { class: "rev-progress__head" }, [
      text ? el("span", { class: "rev-progress__label", text, attrs: { id } }) : null,
      el("span", { class: "rev-progress__value", text: `${Math.round(progress.value)}%` }),
    ]),
    el("div", { class: "rev-progress__track", attrs: { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(progress.value), "aria-labelledby": text ? id : undefined, "aria-label": text ? undefined : (ariaLabel ? `${ariaLabel}: ${Math.round(progress.value)}%` : `${Math.round(progress.value)}%`) } }, [
      el("div", { class: "rev-progress__fill", style: { "--rev-value": `${Math.max(0, Math.min(100, progress.value))}%` } }),
    ]),
    caption ? el("span", { class: "rev-progress__caption", text: caption }) : null,
  ]);
  return bar;
}

/** Media: lazy image resolved through ctx.resolveMedia (the article's package directory in the reader). */
export function mediaFigure(media, ctx, className = "rev-media") {
  if (!media) return null;
  const image = el("img", { attrs: { alt: media.decorative ? "" : media.alt, loading: "lazy", decoding: "async", referrerpolicy: "same-origin" } });
  const resolved = ctx.resolveMedia ? ctx.resolveMedia(media.src) : media.src;
  image.src = resolved;
  image.style.objectFit = media.fit || "cover";
  const wrapper = el("figure", { class: className }, [image, media.caption ? el("figcaption", { class: "rev-media__caption", text: media.caption }) : null]);
  image.addEventListener("error", () => { wrapper.dataset.broken = "true"; image.hidden = true; if (!wrapper.querySelector(".rev-media__missing")) wrapper.prepend(el("span", { class: "rev-media__missing", text: media.alt || ctx.t("mediaMissing") })); }, { once: true });
  return wrapper;
}

export function arrowIcon(direction) {
  return el("span", { class: `rev-arrow rev-arrow--${direction}`, attrs: { "aria-hidden": "true" } }, [icon(direction === "down" ? "arrow-down" : "arrow-right")]);
}

/** Read the page's resolved colours once per render so engines that need literal colours (canvas, SVG strings) match the theme. */
export function readTheme(element) {
  const style = getComputedStyle(element);
  const read = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
  const tones = {};
  for (const tone of ["neutral", "accent", "info", "success", "warning", "danger", "violet", "teal", "pink", "orange"]) tones[tone] = read(`--rev-t-${tone}`, "#6b7280");
  return {
    ink: read("--rev-ink", "#252923"), muted: read("--rev-muted", "#6f756d"), line: read("--rev-line", "#d9d3c6"),
    card: read("--rev-card", "#ffffff"), card2: read("--rev-card-2", "#f8f4e9"), font: read("--rev-font", "system-ui, sans-serif"), tones,
    dark: style.colorScheme?.includes("dark") || document.documentElement.dataset.theme === "dark",
  };
}

export const prefersReducedMotion = () => globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
