/* Card renderers: process-cards (F3), step-guide (F5), pipeline (F6) and the shared card element. */
import { el, iconChip, icon, statusChip, progressBar, mediaFigure, arrowIcon } from "../RichVisualizationDom.js";

/** One rich card. `item` is a validated stage/step/block; every string is set through textContent. */
export function cardElement(item, ctx, { selectable = false, lead = null, extra = [], titleTag = "p" } = {}) {
  const chip = lead || (item.icon ? iconChip(item.icon, item.tone) : null);
  const card = el("li", { class: `rev-card${chip ? "" : " rev-card--noicon"}`, dataset: { tone: item.tone, active: item.active ? "true" : undefined, selectable: selectable ? "" : undefined } });
  if (item.active) card.setAttribute("aria-current", "step");
  if (chip) card.append(chip);
  const title = el(titleTag, { class: "rev-card__title" });
  if (selectable) title.append(el("button", { text: item.title, attrs: { type: "button", "aria-pressed": item.active ? "true" : "false" } }));
  else title.textContent = item.title;
  card.append(el("div", { class: "rev-card__head" }, [title, statusChip(item.status)]));
  if (item.subtitle) card.append(el("p", { class: "rev-card__subtitle", text: item.subtitle }));
  const bodyParts = [item.description || item.text ? el("p", { class: "rev-card__text", text: item.description || item.text }) : null, ...extra,
    progressBar(item.progress, { tone: item.tone }), mediaFigure(item.media, ctx)];
  if (bodyParts.some(Boolean)) card.append(el("div", { class: "rev-card__body" }, bodyParts));
  return card;
}

/** Click or keyboard-select one card; selecting it again clears the selection. */
function wireSelection(list, ctx, announce) {
  const select = (card) => {
    const already = card.getAttribute("aria-current") === "step";
    list.querySelectorAll(".rev-card").forEach((other) => { other.removeAttribute("aria-current"); other.dataset.active = "false"; other.querySelector(".rev-card__title button")?.setAttribute("aria-pressed", "false"); });
    if (!already) { card.setAttribute("aria-current", "step"); card.dataset.active = "true"; card.querySelector(".rev-card__title button")?.setAttribute("aria-pressed", "true"); }
    announce?.(already ? "" : card.querySelector(".rev-card__title")?.textContent || "");
  };
  const onClick = (event) => { const card = event.target.closest(".rev-card"); if (card && list.contains(card) && !event.target.closest("a")) select(card); };
  list.addEventListener("click", onClick);
  return () => list.removeEventListener("click", onClick);
}

function connector(orientationAttr, label) {
  const link = el("li", { class: "rev-link", attrs: { "aria-hidden": "true", role: "presentation" } }, [label ? el("span", { class: "rev-link__label", text: label }) : arrowIcon(orientationAttr === "horizontal" ? "right" : "down")]);
  link.dataset.orientation = orientationAttr;
  return link;
}

function flowList(items, ctx, { orientation, connectors, labelOf, build }) {
  const list = el("ol", { class: "rev-flowlist", dataset: { orientation } });
  items.forEach((item, index) => {
    list.append(build(item, index));
    if (connectors && index < items.length - 1) list.append(connector(orientation === "vertical" ? "vertical" : "horizontal", labelOf?.(item)));
  });
  return list;
}

export function renderProcessCards(stage, spec, ctx) {
  const { data } = spec;
  const live = el("p", { class: "rev__note", attrs: { role: "status", "aria-live": "polite" } });
  const list = flowList(data.stages, ctx, { orientation: data.orientation, connectors: data.connectors, build: (item) => cardElement(item, ctx, { selectable: true }) });
  let host = list;
  if (data.group) {
    const group = data.group;
    host = el("div", { class: "rev-group", dataset: { tone: group.tone } }, [
      el("div", { class: "rev-group__head" }, [group.icon ? iconChip(group.icon, group.tone) : null, el("div", {}, [el("div", { class: "rev-t", text: group.title }), group.subtitle ? el("p", { text: group.subtitle }) : null])]), list]);
  }
  stage.append(host, live);
  const off = wireSelection(list, ctx, (name) => { live.textContent = name ? `${ctx.t("selected")}: ${name}` : ""; });
  return { dispose: off };
}

export function renderStepGuide(stage, spec, ctx) {
  const { data } = spec;
  const live = el("p", { class: "rev__note", attrs: { role: "status", "aria-live": "polite" } });
  const list = flowList(data.steps, ctx, { orientation: data.orientation, connectors: true, build: (step, index) => {
    const number = data.numbered ? el("span", { class: "rev-step__no", text: String(index + 1), attrs: { "aria-hidden": "true" } }) : null;
    const tip = step.tip ? el("div", { class: "rev-tip" }, [icon("lightbulb"), el("span", { text: step.tip })]) : null;
    const card = cardElement(step, ctx, { selectable: true, lead: number || undefined, extra: [tip] });
    card.classList.add("rev-step");
    if (number && step.icon) card.querySelector(".rev-card__head")?.prepend(el("span", { class: "rev-step__lead" }, [iconChip(step.icon, step.tone)]));
    card.setAttribute("aria-label", `${ctx.t("step")} ${index + 1}: ${step.title}`);
    return card;
  } });
  stage.append(list, live);
  const off = wireSelection(list, ctx, (name) => { live.textContent = name ? `${ctx.t("selected")}: ${name}` : ""; });
  return { dispose: off };
}

export function renderPipeline(stage, spec, ctx) {
  const { data } = spec;
  const live = el("p", { class: "rev__note", attrs: { role: "status", "aria-live": "polite" } });
  const io = (label, values) => (values.length ? el("div", { class: "rev-io__row" }, [el("span", { class: "rev-io__tag", text: label }), ...values.map((value) => el("span", { class: "rev-io__item", text: value }))]) : null);
  const list = flowList(data.stages, ctx, { orientation: data.direction === "auto" ? "auto" : data.direction, connectors: true, labelOf: (item) => item.linkLabel,
    build: (item) => cardElement(item, ctx, { selectable: true, extra: [item.inputs.length || item.outputs.length ? el("div", { class: "rev-io" }, [io("in", item.inputs), io("out", item.outputs)]) : null] }) });
  stage.append(list);
  if (data.returnPath) stage.append(el("div", { class: "rev-return", text: data.returnPath.label }));
  stage.append(live);
  const off = wireSelection(list, ctx, (name) => { live.textContent = name ? `${ctx.t("selected")}: ${name}` : ""; });
  return { dispose: off };
}
