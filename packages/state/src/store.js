import { getExpressionReferences, evaluateExpression } from "./expressions.js";
import { stateError } from "./errors.js";

const VARIABLE_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const DEFINITION_FIELDS = new Set(["type", "value", "min", "max", "step", "minLength", "maxLength", "values", "persistence"]);

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function dataEntries(value, name) {
  if (!isPlainObject(value)) throw stateError("INVALID_STATE_DEFINITION", `${name} must be a plain object.`);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) throw stateError("UNSAFE_STATE_DEFINITION", `${name} cannot contain symbol properties.`);
  return keys.map((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_STATE_DEFINITION", `${name}.${key} must be an enumerable data property.`);
    return [key, descriptor.value];
  });
}

function scalar(value) {
  return value === null || typeof value === "string" && value.length <= 100_000 || typeof value === "boolean" || typeof value === "number" && Number.isFinite(value);
}

function enumValues(name, input) {
  if (!Array.isArray(input) || Object.getPrototypeOf(input) !== Array.prototype || input.length === 0 || input.length > 1000) {
    throw stateError("INVALID_STATE_ENUM", `Enum state variable "${name}" requires a bounded plain array.`);
  }
  const keys = Reflect.ownKeys(input);
  if (keys.some((key) => typeof key !== "string") || keys.length !== input.length + 1 || keys.some((key) => key !== "length" && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= input.length))) {
    throw stateError("UNSAFE_STATE_ENUM", `Enum state variable "${name}" must be a dense array without extra properties.`);
  }
  const values = [];
  for (let index = 0; index < input.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(input, String(index));
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_STATE_ENUM", `Enum state variable "${name}" cannot contain holes or accessor values.`);
    const value = descriptor.value;
    if (typeof value !== "string" && !(typeof value === "number" && Number.isFinite(value)) || typeof value === "string" && value.length > 100_000) {
      throw stateError("INVALID_STATE_ENUM", `Enum state variable "${name}" values must be bounded strings or finite numbers.`);
    }
    values.push(value);
  }
  return values;
}

function copyDefinition(name, input) {
  const fields = new Map(dataEntries(input, `initialState.${name}`));
  for (const field of fields.keys()) if (!DEFINITION_FIELDS.has(field)) throw stateError("UNKNOWN_STATE_DEFINITION_FIELD", `State variable "${name}" has unsupported field "${field}".`);
  const type = fields.get("type");
  const value = fields.get("value");
  if (!["number", "integer", "string", "boolean", "enum"].includes(type)) throw stateError("INVALID_STATE_TYPE", `State variable "${name}" has an unsupported type.`);
  if (!scalar(value)) throw stateError("INVALID_STATE_VALUE", `State variable "${name}" must start with a finite JSON scalar value.`);
  const definition = Object.fromEntries(fields);
  if (type === "number" || type === "integer") {
    if (typeof value !== "number" || type === "integer" && !Number.isInteger(value)) throw stateError("INVALID_STATE_VALUE", `State variable "${name}" requires a ${type} value.`);
    if (fields.has("min") && (!Number.isFinite(fields.get("min"))) || fields.has("max") && (!Number.isFinite(fields.get("max")))) throw stateError("INVALID_STATE_BOUNDS", `State variable "${name}" bounds must be finite numbers.`);
    if (fields.has("min") && fields.has("max") && fields.get("min") > fields.get("max")) throw stateError("INVALID_STATE_BOUNDS", `State variable "${name}" minimum exceeds its maximum.`);
    if (fields.has("step") && (!Number.isFinite(fields.get("step")) || fields.get("step") <= 0)) throw stateError("INVALID_STATE_STEP", `State variable "${name}" step must be finite and positive.`);
  } else if (type === "string") {
    if (typeof value !== "string") throw stateError("INVALID_STATE_VALUE", `State variable "${name}" requires a string value.`);
    for (const key of ["minLength", "maxLength"]) if (fields.has(key) && (!Number.isInteger(fields.get(key)) || fields.get(key) < 0)) throw stateError("INVALID_STATE_BOUNDS", `State variable "${name}" ${key} must be a non-negative integer.`);
    if (fields.has("minLength") && fields.has("maxLength") && fields.get("minLength") > fields.get("maxLength")) throw stateError("INVALID_STATE_BOUNDS", `State variable "${name}" minimum length exceeds its maximum.`);
  } else if (type === "boolean" && typeof value !== "boolean") {
    throw stateError("INVALID_STATE_VALUE", `State variable "${name}" requires a boolean value.`);
  } else if (type === "enum") {
    const values = enumValues(name, fields.get("values"));
    if (new Set(values.map((entry) => `${typeof entry}:${String(entry)}`)).size !== values.length) throw stateError("DUPLICATE_ENUM_VALUE", `Enum state variable "${name}" contains duplicate values.`);
    if (!values.some((entry) => Object.is(entry, value))) throw stateError("INVALID_STATE_ENUM", `Enum state variable "${name}" initial value is not declared.`);
    definition.values = Object.freeze([...values]);
  }
  if (type === "number" || type === "integer") {
    if (fields.has("min") && value < fields.get("min") || fields.has("max") && value > fields.get("max")) throw stateError("STATE_VALUE_OUT_OF_RANGE", `State variable "${name}" initial value is outside its bounds.`);
  }
  if (type === "string" && (fields.has("minLength") && value.length < fields.get("minLength") || fields.has("maxLength") && value.length > fields.get("maxLength"))) {
    throw stateError("STATE_VALUE_OUT_OF_RANGE", `State variable "${name}" initial value is outside its length bounds.`);
  }
  if (fields.has("persistence") && !["none", "session", "host"].includes(fields.get("persistence"))) throw stateError("INVALID_STATE_PERSISTENCE", `State variable "${name}" declares an unsupported persistence scope.`);
  return Object.freeze(definition);
}

function validateValue(name, value, definition) {
  if (!scalar(value)) throw stateError("INVALID_STATE_VALUE", `State variable "${name}" accepts only finite JSON scalar values.`);
  const { type } = definition;
  if (type === "number" && typeof value !== "number" || type === "integer" && (typeof value !== "number" || !Number.isInteger(value)) || type === "string" && typeof value !== "string" || type === "boolean" && typeof value !== "boolean") {
    throw stateError("INVALID_STATE_VALUE", `State variable "${name}" requires a ${type} value.`);
  }
  if (type === "enum" && !definition.values.some((entry) => Object.is(entry, value))) throw stateError("INVALID_STATE_ENUM", `State variable "${name}" value is not in its declared enum.`);
  if ((type === "number" || type === "integer") && (definition.min !== undefined && value < definition.min || definition.max !== undefined && value > definition.max)) {
    throw stateError("STATE_VALUE_OUT_OF_RANGE", `State variable "${name}" value is outside its declared bounds.`);
  }
  if (type === "string" && (definition.minLength !== undefined && value.length < definition.minLength || definition.maxLength !== undefined && value.length > definition.maxLength)) {
    throw stateError("STATE_VALUE_OUT_OF_RANGE", `State variable "${name}" value is outside its declared length bounds.`);
  }
  return value;
}

function buildDerivedPlan(derivedEntries, stateNames) {
  const derivedNames = new Set(derivedEntries.map(([name]) => name));
  for (const name of derivedNames) if (stateNames.has(name)) throw stateError("DUPLICATE_REACTIVE_NAME", `"${name}" cannot be both state and derived data.`);
  const references = new Map();
  for (const [name, expression] of derivedEntries) {
    if (!VARIABLE_PATTERN.test(name)) throw stateError("INVALID_DERIVED_ID", `Derived value ID "${name}" is invalid.`);
    const refs = getExpressionReferences(expression);
    for (const reference of refs) if (!stateNames.has(reference) && !derivedNames.has(reference)) throw stateError("UNKNOWN_REFERENCE", `Derived value "${name}" references undeclared value "${reference}".`);
    references.set(name, refs);
  }
  const visiting = new Set();
  const visited = new Set();
  const order = [];
  function visit(name, chain) {
    if (visiting.has(name)) throw stateError("DERIVED_CYCLE", `Derived dependency cycle detected: ${[...chain, name].join(" → ")}.`);
    if (visited.has(name)) return;
    visiting.add(name);
    for (const reference of references.get(name) ?? []) if (derivedNames.has(reference)) visit(reference, [...chain, name]);
    visiting.delete(name);
    visited.add(name);
    order.push(name);
  }
  for (const name of derivedNames) visit(name, []);
  const dependents = new Map();
  for (const [name, refs] of references) {
    for (const reference of refs) {
      if (!dependents.has(reference)) dependents.set(reference, new Set());
      dependents.get(reference).add(name);
    }
  }
  return { derivedNames, references, order, dependents };
}

/** Create one article-scoped deterministic reactive store from validated v1 data. */
export function createReactiveStore(article, options = {}) {
  const articleEntries = new Map(dataEntries(article, "article runtime input"));
  const initialEntries = dataEntries(articleEntries.get("initialState"), "initialState");
  const derivedEntries = dataEntries(articleEntries.get("derived") ?? Object.create(null), "derived");
  if (initialEntries.length > 256 || derivedEntries.length > 256) throw stateError("STATE_LIMIT_EXCEEDED", "An article may declare at most 256 state and 256 derived values.");

  const definitions = new Map();
  const state = new Map();
  for (const [name, rawDefinition] of initialEntries) {
    if (!VARIABLE_PATTERN.test(name)) throw stateError("INVALID_VARIABLE_ID", `State variable ID "${name}" is invalid.`);
    const definition = copyDefinition(name, rawDefinition);
    definitions.set(name, definition);
    state.set(name, definition.value);
  }
  const plan = buildDerivedPlan(derivedEntries, new Set(state.keys()));
  const derivedExpressions = new Map(derivedEntries);
  const computed = new Map();
  function scopeFor(candidateState, candidateDerived = computed) {
    return new Map([...candidateState, ...candidateDerived]);
  }
  for (const name of plan.order) computed.set(name, evaluateExpression(derivedExpressions.get(name), scopeFor(state, computed)));

  const subscribers = new Set();
  const notificationQueue = [];
  let notifying = false;
  let disposed = false;
  let draft = null;

  function ensureLive() {
    if (disposed) throw stateError("STORE_DISPOSED", "The reactive state store has been disposed.");
  }

  function derivedFor(candidateState, candidateDerived = computed) {
    return candidateState === state ? candidateDerived : calculateDerived(candidateState).nextComputed;
  }

  function readValue(name, candidateState = draft ?? state, candidateDerived = computed) {
    candidateDerived = derivedFor(candidateState, candidateDerived);
    if (candidateState.has(name)) return candidateState.get(name);
    if (candidateDerived.has(name)) return candidateDerived.get(name);
    throw stateError("UNKNOWN_STATE_VARIABLE", `State or derived value "${name}" is not declared.`);
  }

  function snapshot(candidateState = draft ?? state, candidateDerived = computed) {
    candidateDerived = derivedFor(candidateState, candidateDerived);
    return Object.freeze(Object.fromEntries([...candidateState, ...candidateDerived]));
  }

  function notify() {
    notificationQueue.push(snapshot(state, computed));
    if (notifying) return;
    notifying = true;
    const failures = [];
    try {
      while (notificationQueue.length) {
        const current = notificationQueue.shift();
        const changed = [];
        for (const subscription of subscribers) {
          let nextValue;
          try { nextValue = subscription.select(current); }
          catch (error) { failures.push(error); continue; }
          if (!subscription.equals(subscription.value, nextValue)) {
            const previous = subscription.value;
            subscription.value = nextValue;
            changed.push({ subscription, nextValue, previous });
          }
        }
        for (const change of changed) {
          try { change.subscription.listener(change.nextValue, change.previous); }
          catch (error) { failures.push(error); }
        }
      }
    } finally {
      notifying = false;
    }
    if (failures.length) {
      if (typeof options.onSubscriberError === "function") {
        try { options.onSubscriberError(new AggregateError(failures, "One or more reactive subscribers failed.")); }
        catch (error) { throw error; }
      } else throw new AggregateError(failures, "One or more reactive subscribers failed.");
    }
  }

  function calculateDerived(candidateState) {
    const changedState = new Set();
    for (const [name, value] of candidateState) {
      validateValue(name, value, definitions.get(name));
      if (!Object.is(state.get(name), value)) changedState.add(name);
    }
    if (!changedState.size) return { changedState, nextComputed: new Map(computed) };
    const affected = new Set();
    const queue = [...changedState];
    while (queue.length) {
      const source = queue.shift();
      for (const dependent of plan.dependents.get(source) ?? []) {
        if (!affected.has(dependent)) {
          affected.add(dependent);
          queue.push(dependent);
        }
      }
    }
    const nextComputed = new Map(computed);
    for (const name of plan.order) if (affected.has(name)) {
      nextComputed.set(name, evaluateExpression(derivedExpressions.get(name), scopeFor(candidateState, nextComputed)));
    }
    return { changedState, nextComputed };
  }

  function commit(candidateState) {
    const { changedState, nextComputed } = calculateDerived(candidateState);
    if (!changedState.size) return false;
    state.clear();
    for (const entry of candidateState) state.set(...entry);
    computed.clear();
    for (const entry of nextComputed) computed.set(...entry);
    notify();
    return true;
  }

  function setValue(name, value) {
    ensureLive();
    if (!definitions.has(name)) throw stateError("UNKNOWN_STATE_VARIABLE", `State variable "${name}" is not declared or is read-only.`);
    validateValue(name, value, definitions.get(name));
    if (draft) {
      draft.set(name, value);
      return value;
    }
    const candidate = new Map(state);
    candidate.set(name, value);
    commit(candidate);
    return value;
  }

  function subscribe(selector, listener, equals = Object.is) {
    ensureLive();
    if (typeof listener !== "function") throw stateError("INVALID_SUBSCRIBER", "A reactive subscriber must be a function.");
    if (typeof equals !== "function") throw stateError("INVALID_EQUALITY_FUNCTION", "A selector equality check must be a function.");
    const select = typeof selector === "string"
      ? (values) => {
        if (!Object.hasOwn(values, selector)) throw stateError("UNKNOWN_STATE_VARIABLE", `State or derived value "${selector}" is not declared.`);
        return values[selector];
      }
      : selector;
    if (typeof select !== "function") throw stateError("INVALID_SELECTOR", "A selector must be a declared value ID or a function.");
    const current = snapshot();
    const subscription = { select, listener, equals, value: select(current) };
    subscribers.add(subscription);
    try { listener(subscription.value, undefined); }
    catch (error) { subscribers.delete(subscription); throw error; }
    let active = true;
    return () => {
      if (!active) return false;
      active = false;
      return subscribers.delete(subscription);
    };
  }

  function transaction(mutator) {
    ensureLive();
    if (typeof mutator !== "function") throw stateError("INVALID_TRANSACTION", "A transaction requires a synchronous callback.");
    if (draft) throw stateError("NESTED_TRANSACTION", "Nested reactive transactions are not supported.");
    const candidate = new Map(state);
    draft = candidate;
    const draftApi = Object.freeze({ get: (name) => readValue(name, candidate), set: (name, value) => setValue(name, value) });
    let result;
    try {
      result = mutator(draftApi);
      if (result && typeof result.then === "function") throw stateError("ASYNC_TRANSACTION_UNSUPPORTED", "Reactive transactions must be synchronous.");
      draft = null;
      commit(candidate);
      return result;
    } catch (error) {
      draft = null;
      throw error;
    }
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    subscribers.clear();
    notificationQueue.length = 0;
  }

  return Object.freeze({
    get: (name) => { ensureLive(); return readValue(name); },
    getState: () => { ensureLive(); return Object.freeze(Object.fromEntries(draft ?? state)); },
    getSnapshot: () => { ensureLive(); return snapshot(); },
    getDefinition: (name) => { ensureLive(); return definitions.get(name); },
    set: setValue,
    transaction,
    subscribe,
    dispose,
  });
}
