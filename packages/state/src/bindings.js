import { stateError } from "./errors.js";

const PROPERTY_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const VISUAL_DATA_PATH = /^data(?:\.(?:[A-Za-z][A-Za-z0-9_-]{0,63}|0|[1-9][0-9]{0,5}))+$/;
const BLOCKED_PATH_PARTS = new Set(["__proto__", "prototype", "constructor"]);

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function bindingEntries(bindings, blockId, blockType) {
  if (!isPlainObject(bindings)) throw stateError("INVALID_BINDINGS", `Bindings for "${blockId}" must be a plain object.`);
  const keys = Reflect.ownKeys(bindings);
  if (keys.some((property) => typeof property !== "string")) throw stateError("UNSAFE_BINDING", `Bindings for "${blockId}" cannot contain symbol properties.`);
  return keys.map((property) => {
    const descriptor = Object.getOwnPropertyDescriptor(bindings, property);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_BINDING", `Binding "${property}" on "${blockId}" must be an enumerable data property.`);
    const visualDataPath = blockType === "legacyViz" && VISUAL_DATA_PATH.test(property) && property.split(".").every((part) => !BLOCKED_PATH_PARTS.has(part));
    if (!(PROPERTY_PATTERN.test(property) || visualDataPath) || typeof descriptor.value !== "string") throw stateError("INVALID_BINDING", `Binding "${property}" on "${blockId}" is invalid.`);
    return [property, descriptor.value];
  });
}

/** Subscribe renderer consumers to validated block property bindings within one article scope. */
export function bindArticleBlocks(article, store, onUpdate) {
  if (!article || !Array.isArray(article.sections)) throw stateError("INVALID_BINDING_SOURCE", "Bindings require a validated article with sections.");
  if (!store || typeof store.subscribe !== "function") throw stateError("INVALID_STORE", "Bindings require a reactive state store.");
  if (typeof onUpdate !== "function") throw stateError("INVALID_BINDING_CALLBACK", "Bindings require an update callback.");
  const unsubscribers = [];
  let disposed = false;

  function visit(block) {
    if (!block || typeof block !== "object") return;
    if (block.bindings !== undefined) {
      for (const [property, variable] of bindingEntries(block.bindings, block.id, block.type)) {
        unsubscribers.push(store.subscribe(variable, (value) => {
          if (!disposed) onUpdate(Object.freeze({ blockId: block.id, blockType: block.type, property, value }));
        }));
      }
    }
    if (Array.isArray(block.children)) block.children.forEach(visit);
  }

  try {
    for (const section of article.sections) for (const block of section?.blocks ?? []) visit(block);
  } catch (error) {
    for (const unsubscribe of unsubscribers) unsubscribe();
    throw error;
  }

  return Object.freeze({
    dispose() {
      if (disposed) return false;
      disposed = true;
      for (const unsubscribe of unsubscribers.splice(0)) unsubscribe();
      return true;
    },
  });
}
