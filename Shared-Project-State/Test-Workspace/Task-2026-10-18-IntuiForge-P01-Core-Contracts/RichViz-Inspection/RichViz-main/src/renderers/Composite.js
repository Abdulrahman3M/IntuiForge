/* Infographic-style explanation (F12) and the controlled custom component composer (E7).
 * Custom visuals are assembled ONLY from the approved block vocabulary below; interaction is limited to the
 * built-in behaviours (tabs, accordion, card selection). No author HTML, CSS, scripts or event handlers exist. */
import { el, icon, iconChip, statusChip, progressBar, mediaFigure, uid } from "../RichVisualizationDom.js";
import { cardElement } from "./Cards.js";
import { metricElement } from "./Dashboard.js";

function infoSection(section, ctx) {
  const items = section.items.length
    ? el("ul", { class: "rev-kv" }, section.items.map((it) => el("li", {}, [
      el("span", {}, [it.icon ? icon(it.icon) : null, el("span", { text: it.label })]),
      it.value ? el("strong", { text: it.value }) : null,
      it.text ? el("span", { class: "rev-card__subtitle", text: it.text }) : null,
    ])))
    : null;
  return el("section", { class: "rev-section", dataset: { tone: section.tone || "accent" } }, [
    el("div", { class: "rev-section__head" }, [section.icon ? iconChip(section.icon, section.tone || "accent") : null, el("div", {}, [el("div", { class: "rev-t", text: section.title }), section.subtitle ? el("p", { text: section.subtitle }) : null])]),
    statusChip(section.status),
    section.metric ? el("div", { class: "rev-bigmetric" }, [el("span", { text: typeof section.metric.value === "number" ? section.metric.value.toLocaleString() : section.metric.value }), section.metric.unit ? el("small", { text: section.metric.unit }) : null, section.metric.label ? el("small", { text: section.metric.label }) : null]) : null,
    section.text ? el("p", { class: "rev-card__text", text: section.text }) : null,
    items,
    section.steps.length ? el("ol", { class: "rev-checklist" }, section.steps.map((step) => el("li", { text: step }))) : null,
    progressBar(section.progress, { tone: section.tone || "accent" }),
    mediaFigure(section.media, ctx),
  ]);
}

export function renderInfographic(stage, spec, ctx) {
  const { intro, sections, columns } = spec.data;
  const root = el("div", { class: "rev-info" });
  if (intro) root.append(el("div", { class: "rev-info__intro", dataset: { tone: intro.tone || "accent" } }, [intro.icon ? iconChip(intro.icon, intro.tone || "accent") : null, el("div", {}, [el("div", { class: "rev-t", text: intro.title }), intro.text ? el("p", { text: intro.text }) : null])]));
  root.append(el("div", { class: "rev-info__grid", style: { "--rev-cols": columns || Math.min(3, sections.length) } }, sections.map((section) => infoSection(section, ctx))));
  stage.append(root);
  return {};
}

function tabsBlock(block, ctx, depth) {
  const id = uid("rev-tabs");
  const root = el("div", { class: "rev-tabs" });
  const list = el("div", { class: "rev-tablist", attrs: { role: "tablist", "aria-label": ctx.t("tabs") } });
  const tabs = []; const panels = [];
  block.items.forEach((item, index) => {
    const tab = el("button", { class: "rev-tab", dataset: { tone: item.tone }, attrs: { type: "button", role: "tab", id: `${id}-t${index}`, "aria-controls": `${id}-p${index}`, "aria-selected": String(index === 0), tabindex: index === 0 ? 0 : -1 } }, [item.icon ? icon(item.icon) : null, el("span", { text: item.label })]);
    const panel = el("div", { class: "rev-tabpanel", attrs: { role: "tabpanel", id: `${id}-p${index}`, "aria-labelledby": `${id}-t${index}`, tabindex: 0 } }, item.blocks.map((b) => blockElement(b, ctx, depth + 1)));
    panel.hidden = index !== 0;
    tabs.push(tab); panels.push(panel); list.append(tab);
  });
  const activate = (index, focus) => {
    tabs.forEach((tab, i) => { tab.setAttribute("aria-selected", String(i === index)); tab.tabIndex = i === index ? 0 : -1; panels[i].hidden = i !== index; });
    if (focus) tabs[index].focus();
  };
  list.addEventListener("click", (event) => { const tab = event.target.closest(".rev-tab"); if (tab) activate(tabs.indexOf(tab), false); });
  list.addEventListener("keydown", (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    const rtl = getComputedStyle(list).direction === "rtl";
    const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[event.key];
    let next = null;
    if (step) next = (current + step + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next !== null) { event.preventDefault(); activate(next, true); }
  });
  root.append(list, ...panels);
  return root;
}

function blocksContainer(blocks, ctx, depth, layout, columns) {
  return el("div", { class: "rev-blocks", dataset: { layout }, style: columns ? { "--rev-cols": columns } : undefined }, blocks.map((b) => blockElement(b, ctx, depth)));
}

export function blockElement(block, ctx, depth = 0) {
  switch (block.block) {
    case "heading": return el("div", { class: "rev-heading", dataset: { level: block.level, tone: block.tone } }, [block.icon ? icon(block.icon) : null, el("span", { text: block.text })]);
    case "text": return el("p", { class: "rev-text", dataset: { tone: block.tone, muted: block.muted ? "" : undefined }, text: block.text });
    case "card": { const card = cardElement(block, ctx); card.classList.add("rev-card--block"); return el("ul", { class: "rev-cardlist" }, [card]); }
    case "chips": return el("ul", { class: "rev-chips" }, block.items.map((chip) => el("li", {}, [statusChip(chip)])));
    case "progress": return progressBar({ value: block.value }, { label: block.label, tone: block.tone || "info", caption: block.caption });
    case "metric": return metricElement({ ...block }, "div");
    case "image": return mediaFigure(block.media, ctx);
    case "list": return el(block.ordered ? "ol" : "ul", { class: "rev-list", dataset: { tone: block.tone } }, block.items.map((item) => el("li", { text: item })));
    case "callout": return el("div", { class: "rev-callout", dataset: { tone: block.tone }, attrs: { role: "note" } }, [icon(block.icon || (block.tone === "warning" || block.tone === "danger" ? "alert" : "info")), el("div", {}, [block.title ? el("strong", { text: block.title }) : null, el("p", { text: block.text })])]);
    case "divider": return el("hr", { class: "rev-divider" });
    case "group": return el("div", { class: "rev-subgroup", dataset: { tone: block.tone } }, [block.title ? el("div", { class: "rev-t", text: block.title }) : null, blocksContainer(block.blocks, ctx, depth + 1, block.layout, block.columns)]);
    case "tabs": return tabsBlock(block, ctx, depth);
    case "accordion": return el("div", { class: "rev-accordion" }, block.items.map((item, index) => {
      const details = el("details", { dataset: { tone: item.tone } }, [el("summary", {}, [item.icon ? icon(item.icon) : null, el("span", { text: item.label })]), el("div", {}, item.blocks.map((b) => blockElement(b, ctx, depth + 1)))]);
      details.open = index === 0;
      return details;
    }));
    default: return null;
  }
}

export function renderCustom(stage, spec, ctx) {
  stage.append(blocksContainer(spec.data.blocks, ctx, 0, spec.data.layout, spec.data.columns));
  return {};
}
