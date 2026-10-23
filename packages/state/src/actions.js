import { stateError } from "./errors.js";

const ID_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const VARIABLE_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const EVENT_TOKENS = Object.freeze({
  "event.value": "value",
  "event.checked": "checked",
  "event.index": "index",
  "event.optionId": "optionId",
});
const ACTION_FIELDS = Object.freeze({
  setState: ["variable", "value", "valueFrom"], nextStep: ["variable"], previousStep: ["variable"],
  selectOption: ["variable", "optionId", "valueFrom"], setFilter: ["filterId", "value", "valueFrom"],
  submitQuiz: ["quizId"], toggle: ["variable"], openDialog: ["targetId"], closeDialog: ["targetId"],
  navigate: ["route"], scroll: ["targetId"], expand: ["targetId"],
  seekMedia: ["assetId", "seconds", "valueFrom"], playMedia: ["assetId", "gestureRequired"],
  resetActivity: ["activityId"], saveProgress: ["activityId", "scope"],
});
const ACTION_CAPABILITY = Object.freeze({
  setFilter: "filter", submitQuiz: "submit", navigate: "navigate", scroll: "scroll", expand: "expand",
  seekMedia: "media", playMedia: "media", openDialog: "dialog", closeDialog: "dialog",
  resetActivity: "activity", saveProgress: "progress",
});

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function entries(value, label) {
  if (!isPlainObject(value)) throw stateError("INVALID_ACTION", `${label} must be a plain object.`);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) throw stateError("UNSAFE_ACTION", `${label} cannot contain symbol properties.`);
  return keys.map((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_ACTION", `${label}.${key} must be an enumerable data property.`);
    return [key, descriptor.value];
  });
}

function validateAction(action) {
  const fields = new Map(entries(action, "action"));
  const name = fields.get("action");
  const allowed = typeof name === "string" ? ACTION_FIELDS[name] : undefined;
  if (!allowed) throw stateError("UNSUPPORTED_ACTION", `Action "${typeof name === "string" ? name : "<non-string>"}" is not allowlisted.`);
  for (const key of fields.keys()) if (key !== "action" && !allowed.includes(key)) throw stateError("INVALID_ACTION", `Field "${key}" is not supported for action "${name}".`);
  const required = (field) => {
    if (!fields.has(field)) throw stateError("INVALID_ACTION", `Action "${name}" requires "${field}".`);
    return fields.get(field);
  };
  const requireId = (field) => {
    const value = required(field);
    if (typeof value !== "string" || !ID_PATTERN.test(value)) throw stateError("INVALID_ACTION", `Action "${name}" requires a stable ${field} token.`);
    return value;
  };
  const requireVariable = () => {
    const value = required("variable");
    if (typeof value !== "string" || !VARIABLE_PATTERN.test(value)) throw stateError("INVALID_ACTION", `Action "${name}" requires a valid state variable token.`);
    return value;
  };
  if (["setState", "nextStep", "previousStep", "selectOption", "toggle"].includes(name)) requireVariable();
  if (name === "setState" && fields.has("value") === fields.has("valueFrom")) throw stateError("INVALID_ACTION_VALUE", "setState requires exactly one of value and valueFrom.");
  if (name === "selectOption" && fields.has("optionId") === fields.has("valueFrom")) throw stateError("INVALID_ACTION_VALUE", "selectOption requires exactly one of optionId and valueFrom.");
  if (name === "setFilter") {
    requireId("filterId");
    if (fields.has("value") === fields.has("valueFrom")) throw stateError("INVALID_ACTION_VALUE", "setFilter requires exactly one of value and valueFrom.");
  }
  if (name === "submitQuiz") requireId("quizId");
  if (["openDialog", "closeDialog", "scroll", "expand"].includes(name)) requireId("targetId");
  if (name === "navigate") requireId("route");
  if (["seekMedia", "playMedia"].includes(name)) requireId("assetId");
  if (name === "seekMedia" && fields.has("seconds") === fields.has("valueFrom")) throw stateError("INVALID_ACTION_VALUE", "seekMedia requires exactly one of seconds and valueFrom.");
  if (name === "seekMedia" && fields.has("seconds") && (!Number.isFinite(fields.get("seconds")) || fields.get("seconds") < 0)) throw stateError("INVALID_ACTION_VALUE", "seekMedia seconds must be a finite non-negative number.");
  if (name === "playMedia" && fields.get("gestureRequired") !== true) throw stateError("GESTURE_REQUIRED", "Media playback must require an explicit user gesture.");
  if (["resetActivity", "saveProgress"].includes(name)) requireId("activityId");
  if (name === "saveProgress" && !["article", "activity"].includes(fields.get("scope"))) throw stateError("INVALID_PROGRESS_SCOPE", "Progress scope must be article or activity.");
  if (fields.has("valueFrom") && (typeof fields.get("valueFrom") !== "string" || !Object.hasOwn(EVENT_TOKENS, fields.get("valueFrom")))) throw stateError("INVALID_ACTION_VALUE", "Action references an unsupported event token.");
  return { name, fields };
}

function eventValue(event, token) {
  const field = typeof token === "string" ? EVENT_TOKENS[token] : undefined;
  if (!field) throw stateError("INVALID_ACTION_VALUE", "Action references an unsupported event token.");
  if (!Object.hasOwn(event, field)) throw stateError("MISSING_EVENT_VALUE", `Event payload is missing "${field}".`);
  return event[field];
}

function normalizeEvent(event) {
  const fields = entries(event, "event payload");
  const normalized = Object.create(null);
  for (const [key, value] of fields) {
    if (!["value", "checked", "index", "optionId"].includes(key)) throw stateError("UNSUPPORTED_EVENT_FIELD", `Event field "${key}" is not allowlisted.`);
    if (value !== null && typeof value !== "string" && typeof value !== "boolean" && !(typeof value === "number" && Number.isFinite(value))) throw stateError("INVALID_EVENT_VALUE", `Event field "${key}" must be a finite scalar value.`);
    if (key === "checked" && typeof value !== "boolean" || key === "index" && (!Number.isInteger(value) || value < 0) || key === "optionId" && (typeof value !== "string" || !ID_PATTERN.test(value))) {
      throw stateError("INVALID_EVENT_VALUE", `Event field "${key}" has an invalid value.`);
    }
    normalized[key] = value;
  }
  return Object.freeze(normalized);
}

function advance(store, variable, direction) {
  const definition = store.getDefinition(variable);
  if (!definition) throw stateError("UNKNOWN_STATE_VARIABLE", `State variable "${variable}" is not declared.`);
  const current = store.get(variable);
  if (definition.type === "enum") {
    const index = definition.values.findIndex((value) => Object.is(value, current));
    return store.set(variable, definition.values[Math.max(0, Math.min(definition.values.length - 1, index + direction))]);
  }
  if (definition.type !== "number" && definition.type !== "integer") throw stateError("INVALID_STEP_VARIABLE", `Step actions require numeric or enum state; "${variable}" is ${definition.type}.`);
  const step = definition.step ?? 1;
  let next = current + step * direction;
  if (definition.min !== undefined) next = Math.max(definition.min, next);
  if (definition.max !== undefined) next = Math.min(definition.max, next);
  return store.set(variable, next);
}

function findEvents(article) {
  if (!article || !Array.isArray(article.sections)) throw stateError("INVALID_ACTION_SOURCE", "Action dispatch requires a validated article with sections.");
  const events = new Map();
  function visit(block) {
    if (!block || typeof block !== "object") return;
    if (typeof block.id === "string") {
      if (events.has(block.id)) throw stateError("DUPLICATE_BLOCK_ID", `Block ID "${block.id}" is duplicated.`);
      events.set(block.id, block.events && isPlainObject(block.events) ? block.events : Object.create(null));
    }
    if (Array.isArray(block.children)) block.children.forEach(visit);
  }
  for (const section of article.sections) for (const block of section?.blocks ?? []) visit(block);
  return events;
}

/** Execute validated declarative actions; non-state effects require trusted host handlers. */
export function createActionDispatcher({ store, article, handlers = {} } = {}) {
  if (!store || typeof store.get !== "function" || typeof store.set !== "function") throw stateError("INVALID_STORE", "Action dispatcher requires a reactive state store.");
  const eventMap = article ? findEvents(article) : new Map();
  const handlerEntries = new Map(entries(handlers, "host handlers"));
  const capabilities = new Set(Object.values(ACTION_CAPABILITY));
  for (const [name, handler] of handlerEntries) {
    if (!capabilities.has(name) || typeof handler !== "function") throw stateError("INVALID_HOST_HANDLER", `Host handler "${name}" is not an allowlisted capability function.`);
  }

  function dispatch(action, event = Object.create(null)) {
    const { name, fields } = validateAction(action);
    const normalizedEvent = normalizeEvent(event);
    if (name === "setState") return store.set(fields.get("variable"), fields.has("value") ? fields.get("value") : eventValue(normalizedEvent, fields.get("valueFrom")));
    if (name === "nextStep") return advance(store, fields.get("variable"), 1);
    if (name === "previousStep") return advance(store, fields.get("variable"), -1);
    if (name === "toggle") return store.set(fields.get("variable"), !store.get(fields.get("variable")));
    if (name === "selectOption") return store.set(fields.get("variable"), fields.has("optionId") ? fields.get("optionId") : eventValue(normalizedEvent, fields.get("valueFrom")));

    const capability = ACTION_CAPABILITY[name];
    const handler = handlerEntries.get(capability);
    if (!handler) throw stateError("ACTION_CAPABILITY_UNAVAILABLE", `Host capability "${capability}" is not registered; action "${name}" was not executed.`);
    return handler(Object.freeze(Object.fromEntries(fields)), Object.freeze({ event: normalizedEvent, store }));
  }

  function dispatchEvent(blockId, eventName, event = Object.create(null)) {
    const blockEvents = eventMap.get(blockId);
    if (!blockEvents) throw stateError("UNKNOWN_EVENT_BLOCK", `No article block is registered as "${blockId}".`);
    const descriptor = Object.getOwnPropertyDescriptor(blockEvents, eventName);
    if (!descriptor || !Object.hasOwn(descriptor, "value")) throw stateError("UNKNOWN_ARTICLE_EVENT", `Block "${blockId}" has no declarative event "${eventName}".`);
    return dispatch(descriptor.value, event);
  }

  return Object.freeze({ dispatch, dispatchEvent });
}
