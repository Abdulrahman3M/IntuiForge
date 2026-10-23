import { parseArticleSource, validateArticle } from "../../article/src/index.js";

const MAX_HISTORY_LIMIT = 100;
const MAX_DRAFT_NODES = 100_000;
const MAX_DRAFT_DEPTH = 64;

function issue(code, path, message, fixHint) {
  return { code, path, severity: "error", message, fixHint };
}

function safeClone(value, state = { active: new WeakSet(), nodes: 0 }, depth = 0) {
  state.nodes += 1;
  if (state.nodes > MAX_DRAFT_NODES) throw new ArticleAuthoringError("DRAFT_TOO_LARGE", "Draft exceeds the safe authoring size limit.", [issue("DRAFT_TOO_LARGE", "", "Draft contains too many values.", "Reduce the article data before importing or editing it.")]);
  if (depth > MAX_DRAFT_DEPTH) throw new ArticleAuthoringError("DRAFT_TOO_DEEP", "Draft exceeds the safe nesting limit.", [issue("DRAFT_TOO_DEEP", "", "Draft nesting is deeper than the supported limit.", "Flatten the article data to at most 64 levels.")]);
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (!value || typeof value !== "object") throw new ArticleAuthoringError("UNSAFE_DRAFT_VALUE", "Drafts must contain JSON-compatible values only.", [issue("UNSAFE_DRAFT_VALUE", "", "Draft contains a value that JSON cannot represent safely.", "Remove functions, undefined values, symbols, non-finite numbers, and executable objects.")]);
  if (state.active.has(value)) throw new ArticleAuthoringError("UNSAFE_DRAFT_VALUE", "Cyclic draft data is not supported.", [issue("UNSAFE_DRAFT_VALUE", "", "Draft contains a cyclic reference.", "Replace cycles with stable IDs and declarative references.")]);

  state.active.add(value);
  try {
    const prototype = Object.getPrototypeOf(value);
    if (Array.isArray(value)) {
      if (prototype !== Array.prototype) throw new Error("Array prototype is not supported.");
      const descriptors = Object.getOwnPropertyDescriptors(value);
      const result = [];
      for (let index = 0; index < value.length; index += 1) {
        const descriptor = descriptors[String(index)];
        if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw new Error("Sparse arrays and accessors are not supported.");
        result.push(safeClone(descriptor.value, state, depth + 1));
      }
      for (const key of Reflect.ownKeys(value)) {
        if (typeof key === "symbol" || (key !== "length" && !/^(?:0|[1-9]\d*)$/.test(key))) throw new Error("Array properties must be indexed JSON values.");
      }
      return result;
    }
    if (prototype !== Object.prototype && prototype !== null) throw new Error("Only plain JSON objects are supported.");
    const descriptors = Object.getOwnPropertyDescriptors(value);
    const result = {};
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== "string") throw new Error("Symbol keys are not supported.");
      if (["__proto__", "prototype", "constructor"].includes(key)) throw new Error("Unsafe object key.");
      const descriptor = descriptors[key];
      if (!descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw new Error("Accessors and hidden properties are not supported.");
      Object.defineProperty(result, key, {
        value: safeClone(descriptor.value, state, depth + 1),
        enumerable: true,
        writable: true,
        configurable: true,
      });
    }
    return result;
  } catch (error) {
    if (error instanceof ArticleAuthoringError) throw error;
    throw new ArticleAuthoringError("UNSAFE_DRAFT_VALUE", "Draft object could not be copied safely.", [issue("UNSAFE_DRAFT_VALUE", "", error.message || "Draft object is not safe JSON.", "Use plain objects and arrays containing JSON-compatible values.")]);
  } finally {
    state.active.delete(value);
  }
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

function articleTemplate({ id, kind, title, summary, heading, block }) {
  return {
    id,
    kind,
    label: title,
    article: {
      kind: "intui.article",
      schemaVersion: "1.0.0",
      id,
      locale: "ar",
      dir: "rtl",
      title,
      summary,
      metadata: { status: "draft", contentType: "article", sources: [], canonicalReferences: [], supportedLocales: ["ar"], provenance: [] },
      assets: [],
      initialState: {},
      derived: {},
      sections: [{ id: `${id}-section`, heading, blocks: [block] }],
    },
  };
}

export const ARTICLE_TEMPLATES = deepFreeze([
  articleTemplate({
    id: "article-starter", kind: "article", title: "مقال تفسيري", summary: "مسودة مقال عامة قابلة للتحرير والتحقق دون تشغيل شيفرة من المحتوى.", heading: "الفكرة الأساسية",
    block: { id: "article-lead", type: "paragraph", content: "اكتب شرحًا واضحًا ومترابطًا، ثم أضف التفاعلات التي تدعم الفهم فقط." },
  }),
  articleTemplate({
    id: "quiz-starter", kind: "quiz", title: "درس مع اختبار قصير", summary: "قالب درس عربي مع سؤال اختياري متحقق من عقد المقال.", heading: "تحقق من الفهم",
    block: { id: "knowledge-check", type: "quiz", props: { label: "سؤال قصير", questions: [{ id: "question-one", type: "single-choice", prompt: "أي إجابة تصف الفكرة الرئيسية؟", options: [{ id: "option-a", label: "الإجابة الأولى" }, { id: "option-b", label: "الإجابة الثانية" }], answer: "option-a", explanation: "أضف شرحًا موجزًا يوضح سبب الإجابة." }] } },
  }),
  articleTemplate({
    id: "map-starter", kind: "map", title: "مقال بخريطة مفاهيم", summary: "خريطة مفاهيم محلية تربط الموضوع بأفكار ومصادر أخرى.", heading: "العلاقات بين المفاهيم",
    block: { id: "concept-map", type: "knowledgeMap", props: { title: "خريطة المفاهيم", description: "ابدأ من المفهوم الأساسي ثم تابع العلاقة إلى الخطوة التالية.", layout: "layered", nodes: [{ id: "concept", label: "المفهوم الأساسي", summary: "اشرح الفكرة المحورية." }, { id: "next", label: "الخطوة التالية", summary: "أضف تطبيقًا أو موضوعًا مرتبطًا." }], edges: [{ id: "concept-next", source: "concept", target: "next", label: "يقود إلى" }] } },
  }),
  articleTemplate({
    id: "science-starter", kind: "science", title: "شرح علمي مع رسم", summary: "شرح علمي مع مخطط رياضي محلي ومحدود وآمن.", heading: "النموذج العلمي",
    block: { id: "sine-graph", type: "mathGraph", props: { label: "منحنى توضيحي", description: "رسم محلي لدالة جيب ضمن مجال محدود.", formula: "sin(x)", xMin: -3.14, xMax: 3.14, xUnit: "راديان", yUnit: "قيمة", samples: 64 } },
  }),
]);

export class ArticleAuthoringError extends Error {
  constructor(code, message, issues = []) {
    super(message);
    this.name = "ArticleAuthoringError";
    this.code = code;
    this.issues = issues;
  }
}

/** Return an offline prompt that requests only the existing inert article v1 contract. */
export function createArticlePrompt({ request = "", locale = "ar" } = {}) {
  if (typeof request !== "string" || request.length > 8_000) throw new ArticleAuthoringError("INVALID_PROMPT_REQUEST", "Prompt request must be text no longer than 8,000 characters.", [issue("INVALID_PROMPT_REQUEST", "/request", "The request is not supported.", "Provide plain text no longer than 8,000 characters.")]);
  if (typeof locale !== "string" || !/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(locale)) throw new ArticleAuthoringError("INVALID_PROMPT_LOCALE", "Prompt locale must be a language tag.", [issue("INVALID_PROMPT_LOCALE", "/locale", "The requested language tag is invalid.", "Use a tag such as ar, en, or en-US.")]);
  return [
    "Create one portable IntuiForge article using the declarative intui.article contract.",
    "Return JSON only. Do not include Markdown fences, comments, HTML, CSS, JavaScript, executable expressions, arbitrary URLs, or prose outside the JSON object.",
    "Use kind \"intui.article\" and schemaVersion \"1.0.0\". Include id, locale, dir, title, summary, metadata, assets, initialState, derived, and sections.",
    "Use stable, unique IDs and only article block types, fields, bindings, and allowlisted events supported by the IntuiForge article v1 validator. Keep all behavior declarative and all text inert.",
    "Do not invent a schema migration. Unknown or unsupported fields must be omitted; if the request needs unsupported behavior, explain it outside the generated file only when asked.",
    `Article locale: ${locale}. Requested content (quoted JSON string): ${JSON.stringify(request)}.`,
  ].join("\n");
}

/** Parse JSON or the documented Markdown manifest through the shared article validator. */
export function importArticlePackage(source, options = {}) {
  return parseArticleSource(source, options);
}

function safeFilename(articleId, extension) {
  const stem = String(articleId || "article").replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^[-.]+|[-.]+$/g, "").slice(0, 80) || "article";
  return `${stem}.${extension}`;
}

/** Serialize a validated article as lossless JSON or a single intui-article Markdown manifest. */
export function exportArticlePackage(input, { format = "json" } = {}) {
  if (!new Set(["json", "markdown"]).has(format)) {
    return { ok: false, errors: [issue("UNSUPPORTED_EXPORT_FORMAT", "/format", `Export format ${String(format)} is not supported.`, "Choose json or markdown.")] };
  }
  const validation = validateArticle(input);
  if (!validation.ok) return validation;
  const article = safeClone(validation.value);
  const serialized = JSON.stringify(article, null, 2);
  const content = format === "json" ? serialized : `\`\`\`intui-article\n${serialized}\n\`\`\`\n`;
  return {
    ok: true,
    value: Object.freeze({
      format,
      filename: safeFilename(article.id, format === "json" ? "json" : "md"),
      mimeType: format === "json" ? "application/json;charset=utf-8" : "text/markdown;charset=utf-8",
      content,
      article: safeClone(article),
    }),
  };
}

/** Instantiate a fresh editable copy of one validated built-in template. */
export function createArticleFromTemplate(templateId, options = {}) {
  const template = ARTICLE_TEMPLATES.find((item) => item.id === templateId);
  if (!template) return { ok: false, errors: [issue("UNKNOWN_ARTICLE_TEMPLATE", "/templateId", `Unknown article template: ${String(templateId)}.`, "Choose an ID from ARTICLE_TEMPLATES.")] };
  const allowed = new Set(["articleId", "title", "locale", "dir"]);
  const unsupported = Object.keys(options).find((key) => !allowed.has(key));
  if (unsupported) return { ok: false, errors: [issue("UNSUPPORTED_TEMPLATE_OPTION", `/options/${unsupported}`, `Template option ${unsupported} is not supported.`, "Use only articleId, title, locale, or dir.")] };
  const article = safeClone(template.article);
  if (options.articleId !== undefined) article.id = options.articleId;
  if (options.title !== undefined) article.title = options.title;
  if (options.locale !== undefined) article.locale = options.locale;
  if (options.dir !== undefined) article.dir = options.dir;
  if (typeof article.locale === "string") article.metadata.supportedLocales = [article.locale];
  return validateArticle(article);
}

function forceDraftStatus(article) {
  if (article && typeof article === "object" && article.metadata && typeof article.metadata === "object" && !Array.isArray(article.metadata) && article.metadata.status === "published") {
    article.metadata.status = "draft";
  }
  return article;
}

/** In-memory draft session with bounded undo/redo and an explicit validated publish operation. */
export function createAuthoringSession(input, { maxHistory = 50 } = {}) {
  if (!Number.isInteger(maxHistory) || maxHistory < 1 || maxHistory > MAX_HISTORY_LIMIT) throw new ArticleAuthoringError("INVALID_HISTORY_LIMIT", "History limit must be an integer from 1 to 100.", [issue("INVALID_HISTORY_LIMIT", "/maxHistory", "The requested history limit is outside the safe range.", "Choose an integer between 1 and 100.")]);
  const validation = validateArticle(input);
  if (!validation.ok) throw new ArticleAuthoringError("AUTHORING_INITIAL_ARTICLE_INVALID", "The initial authoring document must be a valid article.", validation.errors);
  let draft = safeClone(validation.value);
  let published = validation.value.metadata.status === "published" ? safeClone(validation.value) : null;
  const undoStack = [];
  const redoStack = [];

  function update(next) {
    const nextDraft = forceDraftStatus(safeClone(next));
    if (!nextDraft || typeof nextDraft !== "object" || Array.isArray(nextDraft)) throw new ArticleAuthoringError("INVALID_DRAFT_ENVELOPE", "Draft must remain an article-like JSON object.", [issue("INVALID_DRAFT_ENVELOPE", "", "The edited draft is not an object.", "Restore an article envelope object before continuing.")]);
    undoStack.push(safeClone(draft));
    if (undoStack.length > maxHistory) undoStack.shift();
    redoStack.length = 0;
    draft = nextDraft;
    return validateArticle(draft);
  }

  return Object.freeze({
    getDraft: () => safeClone(draft),
    getPublished: () => published === null ? null : safeClone(published),
    get canUndo() { return undoStack.length > 0; },
    get canRedo() { return redoStack.length > 0; },
    validate: () => validateArticle(draft),
    update,
    undo() {
      if (!undoStack.length) return false;
      redoStack.push(safeClone(draft));
      draft = undoStack.pop();
      return true;
    },
    redo() {
      if (!redoStack.length) return false;
      undoStack.push(safeClone(draft));
      if (undoStack.length > maxHistory) undoStack.shift();
      draft = redoStack.pop();
      return true;
    },
    publish() {
      const checked = validateArticle(draft);
      if (!checked.ok) return checked;
      const next = safeClone(checked.value);
      next.metadata.status = "published";
      const finalCheck = validateArticle(next);
      if (!finalCheck.ok) return finalCheck;
      draft = safeClone(finalCheck.value);
      published = safeClone(finalCheck.value);
      return { ok: true, value: safeClone(published) };
    },
  });
}

export { mountArticleAuthoringStudio } from "./studio.js";
