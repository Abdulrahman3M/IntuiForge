import { ARTICLE_BLOCK_TYPES, validateArticle } from "../../article/src/index.js";
import { createIntuiEngine } from "../../core/src/engine.js";
import { registerArticleRenderer } from "../../article-renderer/src/index.js";
import {
  ArticleAuthoringError,
  createArticleFromTemplate,
  createArticlePrompt,
  createAuthoringSession,
  exportArticlePackage,
  importArticlePackage,
  ARTICLE_TEMPLATES,
} from "./index.js";

const STUDIO_CSS = `
:host { display:block; color-scheme:light dark; --if-studio-canvas:#f5f7f4; --if-studio-surface:#fff; --if-studio-raised:#f8faf8; --if-studio-text:#17231f; --if-studio-muted:#57665f; --if-studio-border:#dce4de; --if-studio-accent:#176b5b; --if-studio-focus:#176b5b; }
:host([data-theme="dark"]) { --if-studio-canvas:#111814; --if-studio-surface:#18221c; --if-studio-raised:#202b24; --if-studio-text:#eef3ef; --if-studio-muted:#b5c3ba; --if-studio-border:#35443b; --if-studio-accent:#80d5b5; --if-studio-focus:#a9ead3; }
:host([data-theme="system"]) { color-scheme:light dark; }
@media (prefers-color-scheme:dark) { :host([data-theme="system"]) { --if-studio-canvas:#111814; --if-studio-surface:#18221c; --if-studio-raised:#202b24; --if-studio-text:#eef3ef; --if-studio-muted:#b5c3ba; --if-studio-border:#35443b; --if-studio-accent:#80d5b5; --if-studio-focus:#a9ead3; } }
* { box-sizing:border-box; }
.studio { min-height:100vh; background:var(--if-studio-canvas); color:var(--if-studio-text); font:1rem/1.55 "Segoe UI",Tahoma,Arial,sans-serif; }
.frame { width:min(100%,96rem); margin-inline:auto; padding:clamp(.75rem,2vw,1.5rem); }
.masthead { display:grid; grid-template-columns:minmax(16rem,1fr) auto; gap:1rem; align-items:end; border-bottom:1px solid var(--if-studio-border); padding-bottom:1.1rem; }
.eyebrow { margin:0 0 .25rem; color:var(--if-studio-muted); font-size:1rem; letter-spacing:.04em; }
h1,h2,h3,p { margin-top:0; }
h1 { margin-bottom:.35rem; font-family:Georgia,"Times New Roman",serif; font-size:clamp(1.8rem,3vw,2.5rem); line-height:1.18; }
h2 { margin:0 0 .8rem; font-family:Georgia,"Times New Roman",serif; font-size:1.3rem; }
h3 { margin:0 0 .45rem; font-size:1rem; }
.subtitle { margin:0; color:var(--if-studio-muted); max-width:66ch; }
.toolbar,.tool-group,.inline-controls { display:flex; flex-wrap:wrap; align-items:center; gap:.5rem; }
.toolbar { justify-content:flex-end; max-width:32rem; }
button,select,input,textarea { max-width:100%; font:inherit; }
button,select { min-height:2.75rem; border:1px solid var(--if-studio-border); border-radius:.75rem; background:var(--if-studio-surface); color:var(--if-studio-text); padding:.5rem .8rem; }
button { cursor:pointer; }
button:hover:not(:disabled) { border-color:var(--if-studio-accent); }
button:disabled { cursor:not-allowed; opacity:.55; }
:focus-visible { outline:3px solid var(--if-studio-focus); outline-offset:2px; }
.primary { border-color:var(--if-studio-accent); background:var(--if-studio-accent); color:#fff; font-weight:650; }
:host([data-theme="dark"]) .primary { color:#102018; }
.meta-row { display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap; margin:1rem 0; }
.status { margin:0; color:var(--if-studio-muted); }
.status[data-kind="error"] { color:#a32135; }
.status[data-kind="success"] { color:#176b5b; }
.template-tools { display:flex; flex-wrap:wrap; gap:.5rem; align-items:center; }
details.prompt { margin:1rem 0; border-block:1px solid var(--if-studio-border); padding:.65rem 0; }
details.prompt summary { cursor:pointer; font-weight:650; }
details.prompt textarea { width:100%; min-height:8rem; margin-top:.6rem; direction:ltr; text-align:left; }
.workspace { display:grid; grid-template-columns:minmax(16rem,19rem) minmax(0,1fr) minmax(16rem,19rem); gap:1rem; align-items:start; }
.panel { min-width:0; border:1px solid var(--if-studio-border); border-radius:1rem; background:var(--if-studio-surface); padding:1rem; }
.editor-panel { display:grid; gap:.85rem; }
.field { display:grid; gap:.35rem; min-width:0; }
.field > label,.field-label { font-weight:650; }
.field input,.field textarea,.field select { width:100%; min-width:0; border:1px solid var(--if-studio-border); border-radius:.65rem; background:var(--if-studio-raised); color:var(--if-studio-text); padding:.65rem .75rem; }
.field textarea { min-height:5rem; resize:vertical; }
.field textarea.json { min-height:5rem; direction:ltr; text-align:left; font-family:Consolas,"Courier New",monospace; font-size:1rem; }
.block-list { display:grid; gap:.35rem; padding:0; margin:0; list-style:none; }
.block-list button { width:100%; text-align:start; overflow-wrap:anywhere; }
.block-list button[aria-current="true"] { border-color:var(--if-studio-accent); box-shadow:inset 3px 0 var(--if-studio-accent); }
.preview-panel { min-height:36rem; }
.preview-status { color:var(--if-studio-muted); font-size:1rem; }
.preview-root { min-width:0; min-height:24rem; }
.inspector-panel { position:sticky; top:1rem; }
.inspector { white-space:pre-wrap; overflow-wrap:anywhere; direction:ltr; text-align:left; font:1rem/1.5 Consolas,"Courier New",monospace; background:var(--if-studio-raised); border-radius:.65rem; padding:.75rem; }
.import-area { display:grid; gap:.5rem; margin-top:.8rem; }
.import-area textarea { width:100%; min-height:7rem; border:1px solid var(--if-studio-border); border-radius:.65rem; background:var(--if-studio-raised); color:var(--if-studio-text); padding:.65rem; direction:ltr; text-align:left; font:1rem/1.45 Consolas,"Courier New",monospace; }
.errors { border:1px solid #bd4354; border-inline-start-width:.3rem; border-radius:.75rem; padding:.8rem 1rem; margin:1rem 0; background:color-mix(in srgb,#bd4354 7%,var(--if-studio-surface)); }
.errors[hidden] { display:none; }
.errors h2 { font-family:inherit; font-size:1.05rem; }
.error-list { display:grid; gap:.75rem; margin:0; padding-inline-start:1.4rem; }
.error-list li { padding-inline-start:.2rem; }
.error-list p { margin:.2rem 0; }
.error-path { direction:ltr; unicode-bidi:plaintext; font:1rem/1.4 Consolas,"Courier New",monospace; overflow-wrap:anywhere; }
.small-button { min-height:2.75rem; padding:.35rem .6rem; font-size:1rem; }
.sr-only { position:absolute!important; width:1px!important; height:1px!important; padding:0!important; margin:-1px!important; overflow:hidden!important; clip:rect(0,0,0,0)!important; white-space:nowrap!important; border:0!important; }
@media(max-width:1050px) { .workspace { grid-template-columns:minmax(15rem,1fr) minmax(0,1.5fr); } .inspector-panel { position:static; grid-column:1/-1; } .masthead { grid-template-columns:1fr; } .toolbar { justify-content:flex-start; max-width:none; } }
@media(max-width:680px) { .frame { padding:.75rem; } .workspace { grid-template-columns:minmax(0,1fr); } .inspector-panel { grid-column:auto; } .panel { padding:.85rem; } .preview-panel { min-height:20rem; } .toolbar>* { flex:1 1 auto; } .template-tools>* { flex:1 1 auto; } }
@media(prefers-reduced-motion:reduce) { *,*::before,*::after { scroll-behavior:auto!important; animation-duration:.01ms!important; transition-duration:.01ms!important; } }
`;

function element(document, tag, { className, text, attrs = {} } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (value === true) node.setAttribute(name, "");
    else node.setAttribute(name, String(value));
  }
  return node;
}

function makeButton(document, label, action, { className = "", data = action } = {}) {
  return element(document, "button", { text: label, className, attrs: { type: "button", "data-p11": data } });
}

function addField(document, parent, { label, name, kind = "input", value = "", rows, className = "" }) {
  const wrap = element(document, "div", { className: "field" });
  const id = `if-author-${name}`;
  const labelNode = element(document, "label", { text: label, attrs: { for: id } });
  const input = element(document, kind, { className, attrs: { id, "data-p11": name, rows, "aria-label": label } });
  if (kind === "input") input.type = "text";
  input.value = value;
  wrap.append(labelNode, input);
  parent.append(wrap);
  return input;
}

function collectBlocks(article) {
  const items = [];
  for (let sectionIndex = 0; sectionIndex < (article.sections ?? []).length; sectionIndex += 1) {
    const section = article.sections[sectionIndex];
    const visit = (blocks, path = []) => {
      for (let index = 0; index < (blocks ?? []).length; index += 1) {
        const block = blocks[index];
        const currentPath = [...path, index];
        items.push({ block, sectionIndex, path: currentPath });
        visit(block.children, currentPath);
      }
    };
    visit(section.blocks);
  }
  return items;
}

function blockAtPath(article, sectionIndex, path) {
  let list = article.sections?.[sectionIndex]?.blocks;
  let block;
  for (const index of path) {
    block = list?.[index];
    list = block?.children;
  }
  return block;
}

function findBlock(article, id) {
  return collectBlocks(article).find((entry) => entry.block.id === id);
}

function stringify(value) {
  return value === undefined ? "" : JSON.stringify(value, null, 2);
}

function themeLabel(theme) {
  return `المظهر: ${theme === "light" ? "فاتح" : theme === "dark" ? "داكن" : "النظام"}`;
}

/** Mount the reusable, isolated article authoring studio. Drafts stay in memory until explicit export/publish. */
export function mountArticleAuthoringStudio(container, { article, document: documentOption, theme = "system", onExport, cspNonce } = {}) {
  const document = documentOption ?? container?.ownerDocument ?? globalThis.document;
  if (!container || !document?.createElement || typeof container.replaceChildren !== "function" || typeof container.attachShadow !== "function") {
    throw new ArticleAuthoringError("INVALID_STUDIO_CONTAINER", "The authoring studio requires a browser element that supports an isolated shadow root.");
  }
  if (!new Set(["light", "dark", "system"]).has(theme)) throw new ArticleAuthoringError("INVALID_STUDIO_THEME", "Studio theme must be light, dark, or system.");

  const session = createAuthoringSession(article);
  const shadow = container.shadowRoot ?? container.attachShadow({ mode: "open" });
  shadow.replaceChildren();
  container.setAttribute("data-theme", theme);
  const style = element(document, "style", { text: STUDIO_CSS });
  if (typeof cspNonce === "string" && /^[A-Za-z0-9+/_=-]{1,256}$/.test(cspNonce)) style.setAttribute("nonce", cspNonce);
  const app = element(document, "main", { className: "studio", attrs: { lang: "ar", dir: "rtl", "aria-labelledby": "if-studio-title" } });
  const frame = element(document, "div", { className: "frame" });
  const masthead = element(document, "header", { className: "masthead" });
  const intro = element(document, "div");
  intro.append(
    element(document, "p", { className: "eyebrow", text: "INTUIFORGE · AUTHORING" }),
    element(document, "h1", { text: "استوديو تأليف المقال", attrs: { id: "if-studio-title" } }),
    element(document, "p", { className: "subtitle", text: "حرّر محتوى المقال وبيانات مكوّناته، ثم تحقّق من المعاينة قبل التصدير أو النشر الصريح." }),
  );
  const toolbar = element(document, "div", { className: "toolbar", attrs: { role: "toolbar", "aria-label": "إجراءات المقال" } });
  const undoButton = makeButton(document, "تراجع", "undo");
  const redoButton = makeButton(document, "إعادة", "redo");
  const themeButton = makeButton(document, "المظهر: النظام", "theme");
  const exportButton = makeButton(document, "تصدير المقال", "export", { className: "primary" });
  const publishButton = makeButton(document, "نشر صريح", "publish");
  toolbar.append(undoButton, redoButton, themeButton, exportButton, publishButton);
  masthead.append(intro, toolbar);

  const status = element(document, "p", { className: "status", text: "مسودة محلية — لم يتم حفظ أي بيانات خارج هذه الجلسة.", attrs: { role: "status", "aria-live": "polite", "data-p11": "status" } });
  const templateSelect = element(document, "select", { attrs: { "data-p11": "template" } });
  const templateLabel = element(document, "label", { className: "sr-only", text: "قالب المقال", attrs: { for: "if-author-template" } });
  templateSelect.id = "if-author-template";
  const templatePlaceholder = element(document, "option", { text: "اختر قالبًا" });
  templatePlaceholder.value = "";
  templateSelect.append(templatePlaceholder);
  for (const template of ARTICLE_TEMPLATES) {
    const option = element(document, "option", { text: template.label });
    option.value = template.id;
    templateSelect.append(option);
  }
  const templateButton = makeButton(document, "تحميل القالب", "template-load", { className: "small-button" });
  const templateTools = element(document, "div", { className: "template-tools" });
  templateTools.append(templateLabel, templateSelect, templateButton);
  const metaRow = element(document, "div", { className: "meta-row" });
  metaRow.append(status, templateTools);

  const promptDetails = element(document, "details", { className: "prompt" });
  promptDetails.append(element(document, "summary", { text: "إنشاء عقد تعليمات لمساعد AI دون اتصال" }));
  const promptText = element(document, "textarea", { attrs: { id: "if-author-prompt", name: "aiPrompt", readonly: true, "aria-label": "عقد تعليمات إنشاء مقال IntuiForge", "data-p11": "prompt" } });
  promptDetails.append(promptText);

  const errors = element(document, "section", { className: "errors", attrs: { hidden: true, "aria-labelledby": "if-errors-heading", "data-p11": "errors", role: "region" } });
  const errorTitle = element(document, "h2", { text: "يلزم تصحيح المقال", attrs: { id: "if-errors-heading" } });
  const errorList = element(document, "ol", { className: "error-list" });
  errors.append(errorTitle, errorList);

  const workspace = element(document, "div", { className: "workspace" });
  const editorPanel = element(document, "section", { className: "panel editor-panel", attrs: { "aria-labelledby": "if-editor-heading" } });
  editorPanel.append(element(document, "h2", { text: "تحرير", attrs: { id: "if-editor-heading" } }));
  const titleInput = addField(document, editorPanel, { label: "عنوان المقال", name: "title" });
  const summaryInput = addField(document, editorPanel, { label: "ملخص المقال", name: "summary", kind: "textarea", rows: 3 });
  const directionWrap = element(document, "div", { className: "field" });
  const directionLabel = element(document, "label", { text: "اتجاه المحتوى", attrs: { for: "if-author-direction" } });
  const directionSelect = element(document, "select", { attrs: { id: "if-author-direction", "data-p11": "direction" } });
  for (const [value, label] of [["rtl", "من اليمين إلى اليسار"], ["ltr", "من اليسار إلى اليمين"]]) {
    const option = element(document, "option", { text: label }); option.value = value; directionSelect.append(option);
  }
  directionWrap.append(directionLabel, directionSelect);
  editorPanel.append(directionWrap);

  const sectionSelect = element(document, "select", { attrs: { "data-p11": "section" } });
  const sectionWrap = element(document, "div", { className: "field" });
  sectionWrap.append(element(document, "label", { text: "القسم", attrs: { for: "if-author-section" } }));
  sectionSelect.id = "if-author-section";
  sectionWrap.append(sectionSelect);
  editorPanel.append(sectionWrap);
  const sectionHeadingInput = addField(document, editorPanel, { label: "عنوان القسم", name: "section-heading" });

  const blocksHeading = element(document, "h3", { text: "المكوّنات" });
  const blockList = element(document, "ul", { className: "block-list", attrs: { "data-p11": "block-list", "aria-label": "مكوّنات القسم" } });
  const blockTools = element(document, "div", { className: "inline-controls" });
  const addBlockButton = makeButton(document, "إضافة فقرة", "add-block", { className: "small-button" });
  const removeBlockButton = makeButton(document, "حذف المكوّن", "remove-block", { className: "small-button" });
  blockTools.append(addBlockButton, removeBlockButton);
  editorPanel.append(blocksHeading, blockList, blockTools);
  const contentInput = addField(document, editorPanel, { label: "محتوى نصي", name: "content", kind: "textarea", rows: 4 });
  const propsInput = addField(document, editorPanel, { label: "خصائص المكوّن — JSON بيانات فقط", name: "props", kind: "textarea", className: "json" });
  const bindingsInput = addField(document, editorPanel, { label: "روابط البيانات — JSON", name: "bindings", kind: "textarea", className: "json" });
  const eventsInput = addField(document, editorPanel, { label: "أحداث مصرّح بها — JSON", name: "events", kind: "textarea", className: "json" });
  const applyButton = makeButton(document, "تطبيق التعديلات والتحقق", "apply", { className: "primary" });
  editorPanel.append(applyButton);

  const previewPanel = element(document, "section", { className: "panel preview-panel", attrs: { "aria-labelledby": "if-preview-heading" } });
  previewPanel.append(element(document, "h2", { text: "معاينة المقال", attrs: { id: "if-preview-heading" } }));
  const previewStatus = element(document, "p", { className: "preview-status", text: "المعاينة تستخدم مدقق المقال وrenderer الإنتاج نفسيهما.", attrs: { role: "status", "aria-live": "polite", "data-p11": "preview-status" } });
  const previewRoot = element(document, "div", { className: "preview-root", attrs: { "data-p11": "preview" } });
  previewPanel.append(previewStatus, previewRoot);

  const inspectorPanel = element(document, "aside", { className: "panel inspector-panel", attrs: { "aria-labelledby": "if-inspector-heading" } });
  inspectorPanel.append(element(document, "h2", { text: "مفتّش المكوّن", attrs: { id: "if-inspector-heading" } }));
  const inspectorHelp = element(document, "p", { text: "عرض آمن لخصائص المكوّن وروابط البيانات ووصف الأحداث؛ لا تُنفّذ الأحداث داخل المفتّش." });
  const inspector = element(document, "pre", { className: "inspector", attrs: { "data-p11": "inspector", tabindex: "0" } });
  inspectorPanel.append(inspectorHelp, inspector);
  const importArea = element(document, "div", { className: "import-area" });
  const importLabel = element(document, "label", { text: "استيراد JSON أو Markdown موثّق", attrs: { for: "if-author-import" } });
  const importText = element(document, "textarea", { attrs: { id: "if-author-import", "data-p11": "import-source", "aria-label": "محتوى المقال للاستيراد" } });
  const importButton = makeButton(document, "استيراد والتحقق", "import", { className: "small-button" });
  importArea.append(importLabel, importText, importButton);
  inspectorPanel.append(importArea);

  const prompt = () => {
    const current = session.getDraft();
    promptText.value = createArticlePrompt({ locale: current.locale || "ar", request: "أنشئ مقالًا تعليميًا عامًا صالحًا لعقد IntuiForge." });
  };
  let selectedSection = 0;
  const selectedSectionIndex = () => Math.min(Math.max(0, selectedSection), Math.max(0, (session.getDraft().sections?.length ?? 1) - 1));
  let selectedBlockId = "";
  let effectiveTheme = theme;
  themeButton.textContent = themeLabel(effectiveTheme);
  let engine;
  let previewHandle;
  let disposed = false;
  let latestValidation = validateArticle(session.getDraft());

  function updateStatus(text, kind = "normal") {
    status.textContent = text;
    status.dataset.kind = kind;
  }

  function updateHistoryButtons() {
    undoButton.disabled = !session.canUndo;
    redoButton.disabled = !session.canRedo;
  }

  function updateInspector() {
    const current = session.getDraft();
    const entry = selectedBlockId ? findBlock(current, selectedBlockId) : undefined;
    const block = entry?.block;
    inspector.textContent = JSON.stringify({
      id: block?.id ?? null,
      type: block?.type ?? null,
      content: block?.content ?? null,
      props: block?.props ?? {},
      bindings: block?.bindings ?? {},
      events: block?.events ?? {},
      validation: latestValidation.ok ? "valid" : latestValidation.errors.filter((error) => !entry || error.path.includes(`/blocks/${entry.path.at(-1)}`)),
    }, null, 2);
  }

  function renderErrors(validation) {
    latestValidation = validation;
    errorList.replaceChildren();
    if (validation.ok) {
      errors.hidden = true;
      publishButton.disabled = false;
      return;
    }
    errors.hidden = false;
    publishButton.disabled = true;
    for (const problem of validation.errors) {
      const item = element(document, "li");
      const message = element(document, "p", { text: `${problem.code}: ${problem.message}` });
      const path = element(document, "p", { className: "error-path", text: problem.path || "/" });
      const hint = element(document, "p", { text: `التصحيح: ${problem.fixHint}` });
      const locate = makeButton(document, "فتح الحقل", "locate-error", { className: "small-button" });
      locate.dataset.errorPath = problem.path || "";
      item.append(message, path, hint, locate);
      errorList.append(item);
    }
  }

  function populateSections(current) {
    sectionSelect.replaceChildren();
    (current.sections ?? []).forEach((section, index) => {
      const option = element(document, "option", { text: `${index + 1}. ${section.heading || section.id || "قسم"}` });
      option.value = String(index);
      sectionSelect.append(option);
    });
    if (!current.sections?.length) sectionSelect.value = "";
    else sectionSelect.value = String(selectedSectionIndex());
  }

  function populateBlocks(current) {
    blockList.replaceChildren();
    const sectionIndex = selectedSectionIndex();
    const items = collectBlocks(current).filter((entry) => entry.sectionIndex === sectionIndex);
    if (!items.some((entry) => entry.block.id === selectedBlockId)) selectedBlockId = items[0]?.block.id ?? "";
    for (const { block } of items) {
      const li = element(document, "li");
      const button = makeButton(document, `${block.id} · ${block.type}`, "select-block", { className: "small-button", data: "block" });
      button.dataset.blockId = block.id;
      button.setAttribute("aria-current", String(block.id === selectedBlockId));
      li.append(button);
      blockList.append(li);
    }
    removeBlockButton.disabled = !selectedBlockId;
  }

  function populateForm() {
    const current = session.getDraft();
    titleInput.value = current.title ?? "";
    summaryInput.value = current.summary ?? "";
    directionSelect.value = current.dir === "ltr" ? "ltr" : "rtl";
    sectionSelect.value = String(selectedSectionIndex());
    populateSections(current);
    populateBlocks(current);
    sectionHeadingInput.value = current.sections?.[selectedSectionIndex()]?.heading ?? "";
    const block = selectedBlockId ? findBlock(current, selectedBlockId)?.block : undefined;
    contentInput.value = block?.content ?? "";
    propsInput.value = stringify(block?.props);
    bindingsInput.value = stringify(block?.bindings);
    eventsInput.value = stringify(block?.events);
    contentInput.disabled = !block;
    propsInput.disabled = !block;
    bindingsInput.disabled = !block;
    eventsInput.disabled = !block;
    applyButton.disabled = false;
    prompt();
    updateInspector();
    updateHistoryButtons();
  }

  async function createPreview(nextArticle) {
    if (previewHandle) await previewHandle.dispose();
    if (engine) await engine.dispose();
    engine = createIntuiEngine({ validateArticle });
    registerArticleRenderer(engine, { theme: effectiveTheme });
    previewHandle = engine.mount(previewRoot, nextArticle, {
      document,
      lang: nextArticle.locale || "ar",
      dir: nextArticle.dir || "rtl",
      theme: effectiveTheme,
      cspNonce,
    });
    const result = await previewHandle.ready;
    if (result.status !== "ready") throw new ArticleAuthoringError("PREVIEW_RENDER_FAILED", "The shared article renderer could not mount the preview.");
    previewRoot.dataset.valid = "true";
    previewStatus.textContent = "معاينة صالحة باستخدام renderer الإنتاج.";
  }

  async function refreshPreview(validation) {
    renderErrors(validation);
    updateInspector();
    if (!validation.ok) {
      previewRoot.dataset.valid = "false";
      previewStatus.textContent = "المعاينة تعرض آخر نسخة صالحة؛ أصلح الأخطاء ثم طبّق التعديلات.";
      updateStatus(`المسودة غير صالحة: ${validation.errors.length} مشكلة تتطلب تصحيحًا.`, "error");
      return false;
    }
    try {
      if (previewHandle) {
        const result = await previewHandle.update(validation.value);
        if (result.status !== "ready") throw new Error(`Renderer state: ${result.status}`);
        previewRoot.dataset.valid = "true";
        previewStatus.textContent = "معاينة صالحة باستخدام renderer الإنتاج.";
      } else await createPreview(validation.value);
      updateStatus("المسودة صالحة؛ التغييرات محلية حتى التصدير أو النشر الصريح.", "success");
      return true;
    } catch (error) {
      previewRoot.dataset.valid = "false";
      previewStatus.textContent = `تعذرت المعاينة: ${error.message}`;
      updateStatus("تعذرت المعاينة؛ بقيت النسخة المنشورة دون تغيير.", "error");
      return false;
    }
  }

  function applyEdits() {
    const current = session.getDraft();
    current.title = titleInput.value;
    current.summary = summaryInput.value;
    current.dir = directionSelect.value;
    const sectionIndex = selectedSectionIndex();
    const section = current.sections?.[sectionIndex];
    if (!section) {
      const report = { ok: false, errors: [issueForSection()] };
      renderErrors(report);
      updateInspector();
      return Promise.resolve(false);
    }
    section.heading = sectionHeadingInput.value;
    const selected = selectedBlockId ? findBlock(current, selectedBlockId) : undefined;
    if (selected) {
      const block = selected.block;
      if (contentInput.value.trim() || Object.hasOwn(block, "content")) block.content = contentInput.value;
      for (const [field, key, control] of [["props", "props", propsInput], ["bindings", "bindings", bindingsInput], ["events", "events", eventsInput]]) {
        const source = control.value.trim();
        if (!source) { delete block[key]; continue; }
        let value;
        try { value = JSON.parse(source); }
        catch {
          const bad = { ok: false, errors: [{ code: "INVALID_EDITOR_JSON", path: `/sections/${sectionIndex}/blocks/${selected.path.at(-1)}/${key}`, severity: "error", message: `بيانات ${field} ليست JSON صالحًا.`, fixHint: "صحح JSON في الحقل دون إضافة شيفرة HTML أو JavaScript." }] };
          renderErrors(bad);
          previewRoot.dataset.valid = "false";
          previewStatus.textContent = "المعاينة تعرض آخر نسخة صالحة؛ أصلح JSON قبل المتابعة.";
          return Promise.resolve(false);
        }
        if (!value || typeof value !== "object" || Array.isArray(value)) {
          const bad = { ok: false, errors: [{ code: "EDITOR_OBJECT_REQUIRED", path: `/sections/${sectionIndex}/blocks/${selected.path.at(-1)}/${key}`, severity: "error", message: `بيانات ${field} يجب أن تكون كائن JSON.`, fixHint: "أدخل كائنًا بين أقواس معقوفة أو اترك الحقل فارغًا." }] };
          renderErrors(bad);
          previewRoot.dataset.valid = "false";
          return Promise.resolve(false);
        }
        block[key] = value;
      }
    }
    const report = session.update(current);
    populateForm();
    updateHistoryButtons();
    return refreshPreview(report);
  }

  async function exportCurrent() {
    const report = session.validate();
    if (!report.ok) { renderErrors(report); updateStatus("لم يُصدّر المقال: أصلح أخطاء التحقق أولًا.", "error"); return; }
    const result = exportArticlePackage(report.value, { format: exportFormat.value });
    if (!result.ok) { renderErrors(result); return; }
    try {
      if (typeof onExport === "function") await onExport(result.value);
      else {
        const view = document.defaultView ?? globalThis;
        const blob = new view.Blob([result.value.content], { type: result.value.mimeType });
        const url = view.URL.createObjectURL(blob);
        const anchor = element(document, "a", { attrs: { href: url, download: result.value.filename } });
        shadow.append(anchor);
        anchor.click();
        anchor.remove();
        view.URL.revokeObjectURL(url);
      }
      updateStatus(`تم تجهيز ${result.value.filename}؛ لم يتم حفظ المقال تلقائيًا.`, "success");
    } catch {
      updateStatus("تعذر تسليم الحزمة؛ لم تتغير النسخة المنشورة.", "error");
    }
  }

  function loadTemplate() {
    const result = createArticleFromTemplate(templateSelect.value, { articleId: `draft-${templateSelect.value || "article"}` });
    if (!result.ok) { renderErrors(result); updateStatus("اختر قالبًا صالحًا أولًا.", "error"); return; }
    const report = session.update(result.value);
    selectedBlockId = collectBlocks(result.value)[0]?.block.id ?? "";
    populateForm();
    void refreshPreview(report);
  }

  function importCurrent() {
    const imported = importArticlePackage(importText.value);
    if (!imported.ok) {
      renderErrors(imported);
      updateStatus("تعذر الاستيراد؛ أصلح مواضع الخطأ ثم حاول مجددًا.", "error");
      return;
    }
    const report = session.update(imported.value);
    selectedBlockId = collectBlocks(imported.value)[0]?.block.id ?? "";
    populateForm();
    void refreshPreview(report);
    updateStatus("تم استيراد المقال إلى مسودة محلية والتحقق منه.", "success");
  }

  function changeTheme() {
    effectiveTheme = effectiveTheme === "light" ? "dark" : effectiveTheme === "dark" ? "system" : "light";
    container.setAttribute("data-theme", effectiveTheme);
    themeButton.textContent = themeLabel(effectiveTheme);
    const validation = session.validate();
    renderErrors(validation);
    updateInspector();
    if (validation.ok) {
      void createPreview(validation.value).then(() => updateStatus("تغيّر المظهر؛ بقيت المسودة محلية دون حفظ دائم.", "success"))
        .catch(() => updateStatus("تعذرت إعادة إنشاء المعاينة للمظهر المحدد.", "error"));
    } else void refreshPreview(validation);
  }

  function locateIssue(path) {
    if (path === "/title") { titleInput.focus(); return; }
    if (path === "/summary") { summaryInput.focus(); return; }
    const match = /^\/sections\/(\d+)\/blocks\/(\d+)(?:\/|$)/.exec(path);
    if (!match) return;
    const sectionIndex = Number(match[1]);
    const pathIndexes = [Number(match[2]), ...[...path.matchAll(/\/children\/(\d+)/g)].map((item) => Number(item[1]))];
    const block = blockAtPath(session.getDraft(), sectionIndex, pathIndexes);
    if (block) {
      selectedSection = sectionIndex;
      selectedBlockId = block.id;
      populateForm();
      if (path.includes("/props")) propsInput.focus();
      else if (path.includes("/bindings")) bindingsInput.focus();
      else if (path.includes("/events")) eventsInput.focus();
      else contentInput.focus();
    }
  }

  workspace.append(editorPanel, previewPanel, inspectorPanel);
  frame.append(masthead, metaRow, promptDetails, errors, workspace);
  app.append(frame);
  shadow.append(style, app);

  const exportFormatWrap = element(document, "label", { className: "sr-only", text: "صيغة التصدير", attrs: { for: "if-author-export-format" } });
  const exportFormat = element(document, "select", { attrs: { id: "if-author-export-format", "data-p11": "export-format", "aria-label": "صيغة التصدير" } });
  for (const [value, text] of [["json", "JSON"], ["markdown", "Markdown"]]) { const option = element(document, "option", { text }); option.value = value; exportFormat.append(option); }
  exportFormatWrap.hidden = true;
  toolbar.insertBefore(exportFormat, exportButton);
  toolbar.append(exportFormatWrap);

  sectionSelect.addEventListener("change", () => {
    selectedSection = Math.max(0, Number.parseInt(sectionSelect.value || "0", 10) || 0);
    const first = collectBlocks(session.getDraft()).find((entry) => entry.sectionIndex === selectedSectionIndex());
    selectedBlockId = first?.block.id ?? "";
    populateForm();
  });
  blockList.addEventListener("click", (event) => {
    const button = event.target.closest?.("button[data-block-id]");
    if (!button) return;
    selectedBlockId = button.dataset.blockId;
    populateForm();
  });
  applyButton.addEventListener("click", () => { void applyEdits(); });
  undoButton.addEventListener("click", () => {
    if (session.undo()) { populateForm(); void refreshPreview(session.validate()); updateStatus("تم التراجع إلى نسخة سابقة من المسودة."); }
  });
  redoButton.addEventListener("click", () => {
    if (session.redo()) { populateForm(); void refreshPreview(session.validate()); updateStatus("تمت إعادة التعديل إلى المسودة."); }
  });
  themeButton.addEventListener("click", changeTheme);
  exportButton.addEventListener("click", () => { void exportCurrent(); });
  publishButton.addEventListener("click", () => {
    const result = session.publish();
    if (!result.ok) { renderErrors(result); updateStatus("لم يتم النشر؛ المقال غير صالح.", "error"); return; }
    populateForm();
    void refreshPreview({ ok: true, value: result.value });
    updateStatus("تم النشر صراحةً لهذه الجلسة؛ لا يوجد حفظ دائم أو إرسال إلى خادم.", "success");
  });
  templateButton.addEventListener("click", loadTemplate);
  importButton.addEventListener("click", importCurrent);
  promptDetails.addEventListener("toggle", () => { if (promptDetails.open) prompt(); });
  errors.addEventListener("click", (event) => {
    const button = event.target.closest?.("button[data-error-path]");
    if (button) locateIssue(button.dataset.errorPath || "");
  });
  addBlockButton.addEventListener("click", () => {
    const current = session.getDraft();
    const sectionIndex = selectedSectionIndex();
    const section = current.sections?.[sectionIndex];
    if (!section) return;
    const existing = new Set(collectBlocks(current).map((entry) => entry.block.id));
    let suffix = 1;
    let id = `paragraph-${suffix}`;
    while (existing.has(id)) id = `paragraph-${++suffix}`;
    const block = { id, type: "paragraph", content: "اكتب فقرة جديدة." };
    if (!Array.isArray(section.blocks)) section.blocks = [];
    section.blocks.push(block);
    const report = session.update(current);
    selectedBlockId = id;
    populateForm();
    void refreshPreview(report);
  });
  removeBlockButton.addEventListener("click", () => {
    const current = session.getDraft();
    const selected = selectedBlockId ? findBlock(current, selectedBlockId) : undefined;
    if (!selected) return;
    const section = current.sections[selected.sectionIndex];
    let list = section.blocks;
    for (const index of selected.path.slice(0, -1)) list = list[index].children;
    list.splice(selected.path.at(-1), 1);
    const report = session.update(current);
    selectedBlockId = collectBlocks(current).find((entry) => entry.sectionIndex === selected.sectionIndex)?.block.id ?? "";
    populateForm();
    void refreshPreview(report);
  });

  populateSections(session.getDraft());
  selectedSection = 0;
  selectedBlockId = collectBlocks(session.getDraft())[0]?.block.id ?? "";
  populateForm();
  const ready = refreshPreview(session.validate());

  return Object.freeze({
    ready,
    get draft() { return session.getDraft(); },
    get published() { return session.getPublished(); },
    get validation() { return session.validate(); },
    get rendererId() { return "org.intuiforge.article"; },
    dispose: async () => {
      if (disposed) return;
      disposed = true;
      if (previewHandle) await previewHandle.dispose();
      if (engine) await engine.dispose();
      shadow.replaceChildren();
    },
  });
}

function issueForSection() {
  return { code: "SECTION_REQUIRED", path: "/sections", severity: "error", message: "لا يوجد قسم صالح للتعديل.", fixHint: "استورد مقالًا صالحًا أو اختر قالبًا." };
}

export { ARTICLE_BLOCK_TYPES };
