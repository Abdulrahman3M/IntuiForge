const ID = { type: "string", pattern: "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$", minLength: 1, maxLength: 96 };
const VARIABLE_ID = { type: "string", pattern: "^[A-Za-z][A-Za-z0-9_-]{0,63}$", maxLength: 64 };
const NON_EMPTY_TEXT = { type: "string", minLength: 1, maxLength: 10000 };
const JSON_VALUE = {
  anyOf: [
    { type: ["null", "boolean", "number", "string"] },
    { type: "array", maxItems: 10000, items: { $ref: "#/$defs/jsonValue" } },
    { type: "object", maxProperties: 10000, additionalProperties: { $ref: "#/$defs/jsonValue" } },
  ],
};

const expressionOps = [
  ["add", ["a", "b"]], ["subtract", ["a", "b"]], ["multiply", ["a", "b"]], ["divide", ["a", "b"]],
  ["clamp", ["value", "min", "max"]], ["if", ["condition", "then", "else"]],
  ["lt", ["a", "b"]], ["lte", ["a", "b"]], ["gt", ["a", "b"]], ["gte", ["a", "b"]], ["eq", ["a", "b"]],
  ["and", ["a", "b"]], ["or", ["a", "b"]], ["not", ["value"]],
  ["lookup", ["object", "key"]], ["formatNumber", ["value", "locale"]],
].map(([op, fields]) => ({
  type: "object",
  required: ["op", ...fields],
  properties: {
    op: { const: op },
    ...Object.fromEntries(fields.map((field) => [field, field === "locale" ? { type: "string", minLength: 2, maxLength: 64 } : { $ref: "#/$defs/expression" }])),
  },
  additionalProperties: false,
}));

const ACTION_PROPERTIES = {
  variable: VARIABLE_ID, value: JSON_VALUE,
  valueFrom: { type: "string", enum: ["event.value", "event.checked", "event.index", "event.optionId"] },
  optionId: ID, filterId: ID, quizId: ID, targetId: ID, route: ID, assetId: ID,
  seconds: { type: "number", minimum: 0 }, gestureRequired: { type: "boolean" }, activityId: ID,
  scope: { type: "string", enum: ["article", "activity"] },
};
const ACTIONS = [
  ["setState", ["variable", "value", "valueFrom"]], ["nextStep", ["variable"]], ["previousStep", ["variable"]],
  ["selectOption", ["variable", "optionId", "valueFrom"]], ["setFilter", ["filterId", "value", "valueFrom"]],
  ["submitQuiz", ["quizId"]], ["toggle", ["variable"]], ["openDialog", ["targetId"]], ["closeDialog", ["targetId"]],
  ["navigate", ["route"]], ["scroll", ["targetId"]], ["expand", ["targetId"]],
  ["seekMedia", ["assetId", "seconds", "valueFrom"]],
  ["playMedia", ["assetId", "gestureRequired"]], ["resetActivity", ["activityId"]],
  ["saveProgress", ["activityId", "scope"]],
].map(([action, optional]) => ({
  type: "object",
  required: ["action"],
  properties: {
    action: { const: action },
    ...Object.fromEntries(optional.map((field) => [field, ACTION_PROPERTIES[field]])),
  },
  additionalProperties: false,
}));

const BLOCK_TYPES = [
  "heading", "paragraph", "text", "list", "callout", "quote", "table", "math", "code", "citation", "figure", "audio", "video",
  "grid", "columns", "tabs", "accordion", "carousel", "conditional", "group", "dialog", "menu", "tooltip", "card",
  "button", "select", "slider", "input", "quiz", "calculator", "flashcards", "smartTable", "stepper", "timeline", "filter", "comparison", "guidedComparison", "progress", "metric",
  "legacyViz", "svg", "knowledgeMap", "map", "simulator2d", "model3d", "mathGraph", "physicsExperiment", "chemistry", "anatomy", "animationTimeline", "plugin",
];

export const ARTICLE_V1_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://intuiforge.dev/schemas/article-v1.schema.json",
  title: "IntuiForge Portable Article v1",
  type: "object",
  required: ["kind", "schemaVersion", "id", "locale", "dir", "title", "summary", "metadata", "assets", "initialState", "derived", "sections"],
  properties: {
    kind: { const: "intui.article" },
    schemaVersion: { const: "1.0.0" },
    id: ID,
    locale: { type: "string", pattern: "^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$", maxLength: 64 },
    dir: { enum: ["ltr", "rtl"] },
    title: { type: "string", minLength: 1, maxLength: 240 },
    summary: { type: "string", minLength: 24, maxLength: 2000 },
    metadata: { $ref: "#/$defs/metadata" },
    assets: { type: "array", maxItems: 512, items: { $ref: "#/$defs/asset" } },
    initialState: { type: "object", maxProperties: 256, propertyNames: VARIABLE_ID, additionalProperties: { $ref: "#/$defs/stateVariable" } },
    derived: { type: "object", maxProperties: 256, propertyNames: VARIABLE_ID, additionalProperties: { $ref: "#/$defs/expression" } },
    sections: { type: "array", minItems: 1, maxItems: 256, items: { $ref: "#/$defs/section" } },
  },
  additionalProperties: false,
  $defs: {
    jsonValue: JSON_VALUE,
    metadata: {
      type: "object",
      required: ["status", "contentType", "sources", "canonicalReferences", "supportedLocales", "provenance"],
      properties: {
        status: { enum: ["draft", "published"] },
        contentType: { type: "string", minLength: 1, maxLength: 100 },
        sources: { type: "array", maxItems: 512, items: { $ref: "#/$defs/source" } },
        canonicalReferences: { type: "array", maxItems: 512, items: ID },
        supportedLocales: { type: "array", minItems: 1, maxItems: 64, items: { type: "string", pattern: "^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$", maxLength: 64 } },
        provenance: { type: "array", maxItems: 512, items: { $ref: "#/$defs/provenance" } },
      },
      additionalProperties: false,
    },
    source: {
      type: "object",
      required: ["id", "title"],
      properties: {
        id: ID, title: { type: "string", minLength: 1, maxLength: 500 },
        author: { type: "string", maxLength: 300 }, publisher: { type: "string", maxLength: 300 },
        url: { type: "string", maxLength: 2048 }, license: { type: "string", maxLength: 300 },
        publishedAt: { type: "string", maxLength: 64 }, accessedAt: { type: "string", maxLength: 64 },
      },
      additionalProperties: false,
    },
    provenance: {
      type: "object",
      required: ["kind"],
      properties: {
        kind: { enum: ["author-supplied", "ai-generated", "imported", "derived", "reviewed"] },
        source: { type: "string", maxLength: 2048 }, attribution: { type: "string", maxLength: 500 }, license: { type: "string", maxLength: 300 },
      },
      additionalProperties: false,
    },
    captionTrack: {
      type: "object",
      required: ["assetId", "locale", "label"],
      properties: {
        assetId: ID, locale: { type: "string", pattern: "^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$", maxLength: 64 },
        label: { type: "string", minLength: 1, maxLength: 100 }, kind: { enum: ["captions", "subtitles"] },
      },
      additionalProperties: false,
    },
    asset: {
      type: "object",
      required: ["id", "url", "type", "alt", "license", "provenance"],
      properties: {
        id: ID, url: { type: "string", minLength: 1, maxLength: 2048 },
        type: { type: "string", pattern: "^[A-Za-z0-9!#$&^_.+-]+/[A-Za-z0-9!#$&^_.+-]+$", maxLength: 127 },
        alt: { type: "string", maxLength: 2000 }, decorative: { type: "boolean" },
        license: { type: "string", minLength: 1, maxLength: 300 }, provenance: { type: "string", minLength: 1, maxLength: 2048 },
        integrity: { type: "string", pattern: "^sha(256|384|512)-[A-Za-z0-9+/]+={0,2}$", maxLength: 256 },
        captions: { type: "object", maxProperties: 64, propertyNames: { pattern: "^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$" }, additionalProperties: { type: "string", maxLength: 10000 } },
        captionTracks: { type: "array", maxItems: 64, items: { $ref: "#/$defs/captionTrack" } },
        durationSeconds: { type: "number", minimum: 0, maximum: 604800 }, width: { type: "integer", minimum: 1, maximum: 100000 }, height: { type: "integer", minimum: 1, maximum: 100000 },
      },
      additionalProperties: false,
    },
    stateVariable: {
      type: "object",
      required: ["type", "value"],
      properties: {
        type: { enum: ["number", "integer", "string", "boolean", "enum"] },
        value: { type: ["number", "integer", "string", "boolean"] }, min: { type: "number" }, max: { type: "number" }, step: { type: "number", exclusiveMinimum: 0 },
        minLength: { type: "integer", minimum: 0, maximum: 100000 }, maxLength: { type: "integer", minimum: 0, maximum: 100000 },
        values: { type: "array", minItems: 1, maxItems: 1000, items: { type: ["string", "number"] } },
        persistence: { enum: ["none", "session", "host"] },
      },
      additionalProperties: false,
    },
    expression: {
      anyOf: [
        { type: ["string", "number", "boolean"] },
        { type: "object", required: ["ref"], properties: { ref: VARIABLE_ID }, additionalProperties: false },
        ...expressionOps,
      ],
    },
    action: { oneOf: ACTIONS },
    section: {
      type: "object",
      required: ["id", "heading", "blocks"],
      properties: { id: ID, heading: { type: "string", minLength: 1, maxLength: 500 }, blocks: { type: "array", minItems: 1, maxItems: 5000, items: { $ref: "#/$defs/block" } } },
      additionalProperties: false,
    },
    block: {
      type: "object",
      required: ["id", "type"],
      properties: {
        id: ID, type: { enum: BLOCK_TYPES }, content: { type: "string", maxLength: 100000 },
        props: { type: "object", maxProperties: 1000, description: "Widget-specific contracts and cross-field rules are enforced by validateArticle.", additionalProperties: { $ref: "#/$defs/jsonValue" } },
        bindings: { type: "object", maxProperties: 256, additionalProperties: VARIABLE_ID },
        events: { type: "object", maxProperties: 256, additionalProperties: { $ref: "#/$defs/action" } },
        children: { type: "array", minItems: 1, maxItems: 1000, items: { $ref: "#/$defs/block" } },
      },
      anyOf: [{ required: ["content"] }, { required: ["props"] }, { required: ["children"] }],
      additionalProperties: false,
    },
  },
};

export const ARTICLE_BLOCK_TYPES = Object.freeze([...BLOCK_TYPES]);
export const ARTICLE_JSON_VALUE_SCHEMA = JSON_VALUE;
