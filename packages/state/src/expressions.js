import { stateError } from "./errors.js";

const VARIABLE_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const LOCALE_PATTERN = /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/;
const UNSAFE_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const EXPRESSION_FIELDS = Object.freeze({
  add: ["a", "b"], subtract: ["a", "b"], multiply: ["a", "b"], divide: ["a", "b"],
  clamp: ["value", "min", "max"], if: ["condition", "then", "else"],
  lt: ["a", "b"], lte: ["a", "b"], gt: ["a", "b"], gte: ["a", "b"], eq: ["a", "b"],
  and: ["a", "b"], or: ["a", "b"], not: ["value"], lookup: ["object", "key"], formatNumber: ["value", "locale"],
});
const MAX_NODES = 1000;
const MAX_DEPTH = 32;

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function ownDataEntries(value, path) {
  if (!isPlainObject(value)) throw stateError("INVALID_EXPRESSION", `${path} must be a plain declarative object.`);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) throw stateError("UNSAFE_EXPRESSION", `${path} cannot contain symbol properties.`);
  return keys.map((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_EXPRESSION", `${path} must contain enumerable data properties only.`);
    return [key, descriptor.value];
  });
}

function inspectExpression(expression) {
  const references = new Set();
  let nodes = 0;
  function visit(node, depth, path) {
    nodes += 1;
    if (nodes > MAX_NODES || depth > MAX_DEPTH) throw stateError("EXPRESSION_LIMIT_EXCEEDED", "Expression exceeds the supported depth or node limit.");
    if (typeof node === "number") {
      if (!Number.isFinite(node)) throw stateError("INVALID_EXPRESSION_LITERAL", `${path} must be a finite number.`);
      return;
    }
    if (typeof node === "string" || typeof node === "boolean") return;
    const entries = ownDataEntries(node, path);
    const fields = new Map(entries);
    if (fields.has("ref")) {
      if (entries.length !== 1 || typeof fields.get("ref") !== "string" || !VARIABLE_PATTERN.test(fields.get("ref"))) {
        throw stateError("INVALID_EXPRESSION_REFERENCE", `${path} must be exactly { ref: variableId }.`);
      }
      references.add(fields.get("ref"));
      return;
    }
    const op = fields.get("op");
    const operands = typeof op === "string" ? EXPRESSION_FIELDS[op] : undefined;
    if (!operands) throw stateError("UNSUPPORTED_OPERATOR", `Expression operator "${typeof op === "string" ? op : "<non-string>"}" is not allowlisted.`);
    const expected = new Set(["op", ...operands]);
    for (const key of fields.keys()) if (!expected.has(key)) throw stateError("INVALID_EXPRESSION", `Field "${key}" is not supported for operator "${op}".`);
    for (const field of operands) if (!fields.has(field)) throw stateError("INVALID_EXPRESSION", `Operator "${op}" requires field "${field}".`);
    if (op === "formatNumber") {
      const locale = fields.get("locale");
      if (typeof locale !== "string" || !LOCALE_PATTERN.test(locale)) throw stateError("INVALID_EXPRESSION_LOCALE", "formatNumber requires a valid locale tag.");
      visit(fields.get("value"), depth + 1, `${path}/value`);
      return;
    }
    for (const field of operands) visit(fields.get(field), depth + 1, `${path}/${field}`);
  }
  visit(expression, 0, "expression");
  return references;
}

function number(value, operator, operand) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw stateError("EXPRESSION_TYPE_ERROR", `Operator "${operator}" requires a finite number for "${operand}".`);
  }
  return value;
}

function boolean(value, operator, operand) {
  if (typeof value !== "boolean") throw stateError("EXPRESSION_TYPE_ERROR", `Operator "${operator}" requires a boolean for "${operand}".`);
  return value;
}

function finiteResult(value, operator) {
  if (!Number.isFinite(value)) throw stateError("EXPRESSION_NON_FINITE_RESULT", `Operator "${operator}" produced a non-finite result.`);
  return value;
}

function readReference(scope, name) {
  if (scope instanceof Map) {
    if (!scope.has(name)) throw stateError("UNKNOWN_REFERENCE", `Expression reference "${name}" is not available.`);
    return scope.get(name);
  }
  if (!isPlainObject(scope) || !Object.hasOwn(scope, name)) throw stateError("UNKNOWN_REFERENCE", `Expression reference "${name}" is not available.`);
  const descriptor = Object.getOwnPropertyDescriptor(scope, name);
  if (!descriptor || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_REFERENCE", `Expression reference "${name}" cannot be an accessor.`);
  return descriptor.value;
}

function compareValues(left, right, operator) {
  if (typeof left !== typeof right || !["number", "string"].includes(typeof left) || typeof left === "number" && (!Number.isFinite(left) || !Number.isFinite(right))) {
    throw stateError("EXPRESSION_TYPE_ERROR", `Operator "${operator}" requires comparable values of the same type.`);
  }
  if (operator === "lt") return left < right;
  if (operator === "lte") return left <= right;
  if (operator === "gt") return left > right;
  return left >= right;
}

function evaluate(node, scope) {
  if (typeof node === "number" || typeof node === "string" || typeof node === "boolean") return node;
  const fields = new Map(Object.entries(node));
  if (fields.has("ref")) return readReference(scope, fields.get("ref"));
  const op = fields.get("op");
  const operand = (name) => evaluate(fields.get(name), scope);
  if (op === "if") return boolean(operand("condition"), op, "condition") ? operand("then") : operand("else");
  if (op === "and") return boolean(operand("a"), op, "a") && boolean(operand("b"), op, "b");
  if (op === "or") return boolean(operand("a"), op, "a") || boolean(operand("b"), op, "b");
  if (op === "not") return !boolean(operand("value"), op, "value");
  if (op === "eq") return Object.is(operand("a"), operand("b"));
  if (["lt", "lte", "gt", "gte"].includes(op)) return compareValues(operand("a"), operand("b"), op);
  if (op === "lookup") {
    const object = operand("object");
    const key = operand("key");
    if (!isPlainObject(object) || typeof key !== "string") throw stateError("EXPRESSION_TYPE_ERROR", "lookup requires a plain object and string key.");
    if (UNSAFE_KEYS.has(key)) throw stateError("UNSAFE_LOOKUP_KEY", `lookup key "${key}" is not permitted.`);
    const descriptor = Object.getOwnPropertyDescriptor(object, key);
    if (!descriptor || !Object.hasOwn(descriptor, "value")) throw stateError("LOOKUP_KEY_NOT_FOUND", `lookup key "${key}" is not an own data property.`);
    return descriptor.value;
  }
  if (op === "formatNumber") {
    const value = number(operand("value"), op, "value");
    try { return new Intl.NumberFormat(fields.get("locale")).format(value); }
    catch (cause) { throw stateError("INVALID_EXPRESSION_LOCALE", "formatNumber locale is not supported by this runtime.", { cause }); }
  }
  if (op === "clamp") {
    const value = number(operand("value"), op, "value");
    const min = number(operand("min"), op, "min");
    const max = number(operand("max"), op, "max");
    if (min > max) throw stateError("EXPRESSION_INVALID_BOUNDS", "clamp minimum cannot exceed its maximum.");
    return Math.min(max, Math.max(min, value));
  }
  const a = number(operand("a"), op, "a");
  const b = number(operand("b"), op, "b");
  if (op === "add") return finiteResult(a + b, op);
  if (op === "subtract") return finiteResult(a - b, op);
  if (op === "multiply") return finiteResult(a * b, op);
  if (op === "divide") {
    if (b === 0) throw stateError("EXPRESSION_DIVIDE_BY_ZERO", "Division by zero is not permitted.");
    return finiteResult(a / b, op);
  }
  throw stateError("UNSUPPORTED_OPERATOR", `Expression operator "${typeof op === "string" ? op : "<non-string>"}" is not allowlisted.`);
}

/** Evaluate a bounded declarative expression AST. No source text is compiled or executed. */
export function evaluateExpression(expression, scope = {}) {
  inspectExpression(expression);
  return evaluate(expression, scope);
}

export function getExpressionReferences(expression) {
  return inspectExpression(expression);
}
