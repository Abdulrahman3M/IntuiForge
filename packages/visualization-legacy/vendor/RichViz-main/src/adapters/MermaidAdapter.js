/* Mermaid adapter — concise, source-first diagrams (flows, sequences, architecture, relationships).
 * Library: External-Libraries/mermaid/active/, loaded only when a Mermaid diagram is on the page.
 * The adapter replaces Mermaid's default look with the shared design tokens (light/dark aware); the source stays text. */
import { mixColor, libraryUrl, loadModuleOnce } from "./Common.js";

export const MERMAID_MODULE_URL = libraryUrl("mermaid", "dist/mermaid.esm.min.mjs");

export function mermaidOptions(theme) {
  const t = theme.tones;
  const card = theme.card;
  const soft = (tone, share = 0.15) => mixColor(t[tone], card, share);
  const border = (tone) => mixColor(t[tone], card, 0.75);
  return {
    startOnLoad: false, securityLevel: "strict", htmlLabels: false, maxTextSize: 50000, theme: "base",
    themeVariables: {
      fontFamily: theme.font, fontSize: "16px", background: card,
      primaryColor: soft("info"), primaryBorderColor: border("info"), primaryTextColor: theme.ink,
      secondaryColor: soft("violet"), secondaryBorderColor: border("violet"), secondaryTextColor: theme.ink,
      tertiaryColor: soft("teal"), tertiaryBorderColor: border("teal"), tertiaryTextColor: theme.ink,
      lineColor: mixColor(theme.ink, card, 0.62), textColor: theme.ink, mainBkg: soft("info"), nodeBorder: border("info"), nodeTextColor: theme.ink,
      clusterBkg: soft("accent", 0.07), clusterBorder: theme.line, titleColor: theme.ink, edgeLabelBackground: card,
      actorBkg: soft("info"), actorBorder: border("info"), actorTextColor: theme.ink, actorLineColor: theme.muted,
      signalColor: theme.ink, signalTextColor: theme.ink, labelBoxBkgColor: soft("violet"), labelBoxBorderColor: border("violet"), labelTextColor: theme.ink, loopTextColor: theme.ink,
      noteBkgColor: soft("warning", 0.2), noteBorderColor: border("warning"), noteTextColor: theme.ink, activationBkgColor: soft("teal", 0.3), activationBorderColor: border("teal"), sequenceNumberColor: card,
      altBackground: soft("neutral", 0.1), errorBkgColor: soft("danger"), errorTextColor: theme.ink,
    },
    flowchart: { htmlLabels: false, useMaxWidth: true, curve: "basis", padding: 14 },
    sequence: { useMaxWidth: true },
  };
}

export async function getMermaid(theme) {
  const module = await loadModuleOnce(MERMAID_MODULE_URL);
  const mermaid = module.default || globalThis.mermaid;
  if (!mermaid?.render) throw new Error("The local Mermaid renderer is unavailable.");
  mermaid.initialize(mermaidOptions(theme));
  return mermaid;
}

/** Render Mermaid source into `host`; resolves with a disposable handle. Throws a readable error for invalid source. */
export async function renderMermaidSource(host, source, theme, label = "Mermaid Diagram") {
  if (!source.trim() || source.length > 50000) throw new Error("This Mermaid source is empty or too large to render.");
  const mermaid = await getMermaid(theme);
  if (!(await mermaid.parse(source))) throw new Error("Mermaid could not parse this definition.");
  const result = await mermaid.render(`rev-mermaid-${crypto.randomUUID()}`, source);
  host.innerHTML = result.svg; // SVG produced by Mermaid in strict security mode from the author's source; labels are not HTML.
  const svg = host.querySelector("svg");
  if (svg) {
    svg.classList.add("article-diagram__svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
    const box = svg.viewBox?.baseVal;
    if (box?.width > 0 && box?.height > 0) { svg.setAttribute("width", String(box.width)); svg.setAttribute("height", String(box.height)); svg.style.setProperty("--rev-natural", `${Math.round(box.width)}px`); }
  }
  return { dispose() { host.replaceChildren(); } };
}

export default {
  id: "mermaid",
  async load() { return loadModuleOnce(MERMAID_MODULE_URL); },
  async render(host, data, ctx) { return renderMermaidSource(host, data.source, ctx.theme(host), ctx.summary || "Mermaid Diagram"); },
};
