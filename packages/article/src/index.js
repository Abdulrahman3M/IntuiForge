import { RichViz } from "../../visualization-legacy/src/index.js";
import { validateScientificBlock } from "../../scientific-plugins/src/validation.js";
import { ARTICLE_BLOCK_TYPES, ARTICLE_JSON_VALUE_SCHEMA, ARTICLE_V1_SCHEMA } from "./schema.js";

export const ARTICLE_KIND = "intui.article";
export const ARTICLE_SCHEMA_VERSION = "1.0.0";

const MAX_SOURCE_LENGTH = 1_000_000;
const MAX_TOTAL_STRING_LENGTH = 1_000_000;
const MAX_DEPTH = 32;
const MAX_NODES = 10_000;
const MAX_STRING_LENGTH = 100_000;
const MAX_MARKDOWN_LINES = 20_000;
const ID_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const VARIABLE_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const LOCALE_PATTERN = /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/;
const BLOCK_TYPES = new Set(ARTICLE_BLOCK_TYPES);
const LEGACY_TYPES = new Set(RichViz.types);
const EXPRESSION_FIELDS = Object.freeze({
  add: ["a", "b"], subtract: ["a", "b"], multiply: ["a", "b"], divide: ["a", "b"],
  clamp: ["value", "min", "max"], if: ["condition", "then", "else"],
  lt: ["a", "b"], lte: ["a", "b"], gt: ["a", "b"], gte: ["a", "b"], eq: ["a", "b"],
  and: ["a", "b"], or: ["a", "b"], not: ["value"], lookup: ["object", "key"], formatNumber: ["value", "locale"],
});
const ACTION_FIELDS = Object.freeze({
  setState: ["variable", "value", "valueFrom"], nextStep: ["variable"], previousStep: ["variable"],
  selectOption: ["variable", "optionId", "valueFrom"], setFilter: ["filterId", "value", "valueFrom"],
  submitQuiz: ["quizId"], toggle: ["variable"], openDialog: ["targetId"], closeDialog: ["targetId"],
  navigate: ["route"], scroll: ["targetId"], expand: ["targetId"],
  seekMedia: ["assetId", "seconds", "valueFrom"],
  playMedia: ["assetId", "gestureRequired"], resetActivity: ["activityId"], saveProgress: ["activityId", "scope"],
});
const UNSAFE_PROPERTY = /^(?:__proto__|prototype|constructor|innerHTML|outerHTML|dangerouslySetInnerHTML|srcdoc|script|eval|html)$/i;
const EVENT_HANDLER_PROPERTY = /^on[a-z]/i;
const SCRIPT_TAG = /<\s*\/?\s*script\b/i;

function pointer(parts) {
  return parts.length ? `/${parts.map((part) => String(part).replace(/~/g, "~0").replace(/\//g, "~1")).join("/")}` : "";
}

function sourceLocation(source, offset, baseLine = 1) {
  const prefix = source.slice(0, Math.max(0, offset));
  const lines = prefix.split("\n");
  return { line: baseLine + lines.length - 1, column: lines.at(-1).length + 1 };
}

function createSourceLocator(source, baseLine = 1) {
  const starts = [0];
  for (let index = 0; index < source.length; index += 1) if (source[index] === "\n") starts.push(index + 1);
  return (offset) => {
    let low = 0;
    let high = starts.length;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (starts[middle] <= offset) low = middle + 1;
      else high = middle;
    }
    const lineIndex = Math.max(0, low - 1);
    return { line: baseLine + lineIndex, column: offset - starts[lineIndex] + 1 };
  };
}

function nearestLocation(sourceMap, path) {
  if (!(sourceMap instanceof Map)) return undefined;
  let candidate = path;
  while (true) {
    if (sourceMap.has(candidate)) return sourceMap.get(candidate);
    const cut = candidate.lastIndexOf("/");
    if (cut < 0) break;
    candidate = candidate.slice(0, cut);
  }
  return sourceMap.get("");
}

function addIssue(errors, sourceMap, code, path, message, fixHint, location) {
  const issue = { code, path, severity: "error", message, fixHint };
  const resolvedLocation = location ?? nearestLocation(sourceMap, path);
  if (resolvedLocation) issue.location = { line: resolvedLocation.line, column: resolvedLocation.column };
  errors.push(issue);
}

function resultFailure(errors, sourceMap) {
  const result = { ok: false, errors };
  if (sourceMap?.size) result.sourceMap = Object.fromEntries(sourceMap);
  return result;
}

function resultSuccess(value, sourceMap) {
  const result = { ok: true, value };
  if (sourceMap?.size) result.sourceMap = Object.fromEntries(sourceMap);
  return result;
}

function skipWhitespace(source, state) {
  while (/\s/.test(source[state.index] ?? "")) state.index += 1;
}

function parseJsonStringAt(source, state) {
  const start = state.index;
  state.index += 1;
  while (state.index < source.length) {
    const char = source[state.index];
    if (char === "\\") state.index += 2;
    else if (char === '"') {
      state.index += 1;
      return { value: JSON.parse(source.slice(start, state.index)), start };
    } else state.index += 1;
  }
  return { value: "", start };
}

function scanJsonLocations(source, baseLine, errors) {
  const state = { index: 0 };
  const locations = new Map();
  const locate = createSourceLocator(source, baseLine);
  function scan(pathParts) {
    skipWhitespace(source, state);
    const start = state.index;
    locations.set(pointer(pathParts), locate(start));
    const char = source[state.index];
    if (char === '"') {
      parseJsonStringAt(source, state);
      return;
    }
    if (char === "{") {
      state.index += 1;
      skipWhitespace(source, state);
      const keys = new Set();
      while (source[state.index] && source[state.index] !== "}") {
        skipWhitespace(source, state);
        const keyToken = parseJsonStringAt(source, state);
        const key = keyToken.value;
        if (keys.has(key)) {
          addIssue(errors, locations, "DUPLICATE_JSON_KEY", pointer([...pathParts, key]), `The JSON object repeats the property "${key}".`, "Remove the duplicate property so the document has one unambiguous value.", locate(keyToken.start));
        }
        keys.add(key);
        skipWhitespace(source, state);
        if (source[state.index] !== ":") return;
        state.index += 1;
        scan([...pathParts, key]);
        skipWhitespace(source, state);
        if (source[state.index] === ",") state.index += 1;
        else break;
      }
      if (source[state.index] === "}") state.index += 1;
      return;
    }
    if (char === "[") {
      state.index += 1;
      skipWhitespace(source, state);
      let index = 0;
      while (source[state.index] && source[state.index] !== "]") {
        scan([...pathParts, index]);
        index += 1;
        skipWhitespace(source, state);
        if (source[state.index] === ",") state.index += 1;
        else break;
      }
      if (source[state.index] === "]") state.index += 1;
      return;
    }
    while (state.index < source.length && !/[\s,}\]]/.test(source[state.index])) state.index += 1;
  }
  try { scan([]); } catch { /* JSON.parse is authoritative; mapping is best-effort after a successful parse. */ }
  return locations;
}

function precheckJsonText(source, baseLine, errors) {
  if (source.length > MAX_SOURCE_LENGTH) {
    addIssue(errors, undefined, "SOURCE_TOO_LARGE", "", `Article source exceeds ${MAX_SOURCE_LENGTH} characters.`, "Split the article or reduce its embedded content.", sourceLocation(source, 0, baseLine));
    return false;
  }
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === "{" || char === "[") {
      depth += 1;
      if (depth > MAX_DEPTH) {
        addIssue(errors, undefined, "MAX_DEPTH_EXCEEDED", "", `JSON nesting exceeds the supported limit of ${MAX_DEPTH}.`, "Reduce nested object/array depth before validation.", sourceLocation(source, index, baseLine));
        return false;
      }
    } else if (char === "}" || char === "]") depth = Math.max(0, depth - 1);
  }
  return true;
}

function parseJsonText(source, baseLine = 1) {
  const errors = [];
  if (!precheckJsonText(source, baseLine, errors)) return { errors, sourceMap: new Map() };
  let value;
  try {
    value = JSON.parse(source);
  } catch (error) {
    const match = String(error?.message ?? "").match(/position\s+(\d+)/i);
    const offset = match ? Number(match[1]) : Math.max(0, source.length - 1);
    addIssue(errors, undefined, "INVALID_JSON", "", "Article JSON could not be parsed.", "Correct the JSON syntax at the reported location; the validator does not rewrite source.", sourceLocation(source, offset, baseLine));
    return { errors, sourceMap: new Map() };
  }
  const sourceMap = scanJsonLocations(source, baseLine, errors);
  return { value, errors, sourceMap };
}

function safeClone(input, context, pathParts = [], depth = 0) {
  const path = pointer(pathParts);
  context.nodes += 1;
  if (context.nodes > MAX_NODES) {
    addIssue(context.errors, context.sourceMap, "MAX_NODES_EXCEEDED", path, `Article exceeds the supported ${MAX_NODES} value-node limit.`, "Reduce the number of fields and nested values.");
    return undefined;
  }
  if (depth > MAX_DEPTH) {
    addIssue(context.errors, context.sourceMap, "MAX_DEPTH_EXCEEDED", path, `Article nesting exceeds the supported depth of ${MAX_DEPTH}.`, "Reduce nested object/array depth.");
    return undefined;
  }
  if (input === null || typeof input === "boolean") return input;
  if (typeof input === "string") {
    context.stringLength += input.length;
    if (input.length > MAX_STRING_LENGTH) addIssue(context.errors, context.sourceMap, "STRING_TOO_LARGE", path, `String exceeds ${MAX_STRING_LENGTH} characters.`, "Shorten the field or split its content into smaller blocks.");
    if (context.stringLength > MAX_TOTAL_STRING_LENGTH && !context.totalStringLimitReported) {
      context.totalStringLimitReported = true;
      addIssue(context.errors, context.sourceMap, "TOTAL_STRING_LIMIT_EXCEEDED", path, `Article string content exceeds the ${MAX_TOTAL_STRING_LENGTH} character aggregate limit.`, "Reduce repeated or embedded text before validation.");
    }
    if (SCRIPT_TAG.test(input)) addIssue(context.errors, context.sourceMap, "UNSAFE_MARKUP", path, "Raw script tags are not article data.", "Remove script markup; article content is declarative text and never executable HTML.");
    return input;
  }
  if (typeof input === "number") {
    if (!Number.isFinite(input)) addIssue(context.errors, context.sourceMap, "NON_FINITE_NUMBER", path, "Article numbers must be finite.", "Replace NaN or Infinity with a finite number.");
    return input;
  }
  if (typeof input !== "object") {
    addIssue(context.errors, context.sourceMap, "UNSAFE_VALUE", path, `Values of type ${typeof input} are not JSON article data.`, "Use only plain JSON values; executable or undefined values are not allowed.");
    return undefined;
  }

  if (context.active.has(input)) {
    addIssue(context.errors, context.sourceMap, "CYCLIC_OBJECT", path, "Cyclic object graphs are not supported article data.", "Convert the object to a tree of plain JSON values with explicit references.");
    return undefined;
  }

  let prototype;
  let descriptors;
  let symbols;
  let isArray;
  try {
    isArray = Array.isArray(input);
    prototype = Object.getPrototypeOf(input);
    descriptors = Object.getOwnPropertyDescriptors(input);
    symbols = Object.getOwnPropertySymbols(input);
  } catch {
    addIssue(context.errors, context.sourceMap, "UNSAFE_OBJECT", path, "The object could not be inspected as inert article data.", "Pass a plain object created from trusted data or provide its JSON text instead.");
    return undefined;
  }

  if (isArray ? prototype !== Array.prototype : prototype !== Object.prototype && prototype !== null) {
    addIssue(context.errors, context.sourceMap, "UNSAFE_OBJECT", path, "Only plain objects and arrays are accepted; class instances and custom prototypes are rejected.", "Convert the value to a plain JSON object before validation.");
    return undefined;
  }
  if (symbols.length) addIssue(context.errors, context.sourceMap, "UNSAFE_OBJECT", path, "Symbol-keyed values are not supported article data.", "Remove symbol properties before validation.");

  context.active.add(input);
  if (isArray) {
    const lengthDescriptor = descriptors.length;
    const length = lengthDescriptor?.value;
    if (lengthDescriptor?.get || lengthDescriptor?.set || !Number.isSafeInteger(length) || length < 0 || length > 10000) {
      addIssue(context.errors, context.sourceMap, "ARRAY_TOO_LARGE", path, "Arrays must have a safe length of at most 10000 entries.", "Split the array into smaller article blocks.");
    }
    const boundedLength = Number.isSafeInteger(length) && length >= 0 ? Math.min(length, 10000) : 0;
    const output = [];
    for (let index = 0; index < boundedLength; index += 1) {
      const descriptor = descriptors[String(index)];
      if (!descriptor) {
        addIssue(context.errors, context.sourceMap, "SPARSE_ARRAY", pointer([...pathParts, index]), "Sparse arrays are not supported article data.", "Provide a value for every array entry.");
        output.push(undefined);
      } else if (descriptor.get || descriptor.set || !descriptor.enumerable) {
        addIssue(context.errors, context.sourceMap, "UNSAFE_ACCESSOR", pointer([...pathParts, index]), "Array accessors and non-enumerable entries are rejected without invoking them.", "Replace the accessor with an ordinary JSON value.");
        output.push(undefined);
      } else output.push(safeClone(descriptor.value, context, [...pathParts, index], depth + 1));
    }
    for (const key of Object.keys(descriptors)) {
      if (key === "length" || /^(?:0|[1-9]\d*)$/.test(key) && Number(key) < boundedLength) continue;
      addIssue(context.errors, context.sourceMap, "UNSAFE_OBJECT", pointer([...pathParts, key]), "Arrays may not carry extra named properties.", "Move data into a plain object field.");
    }
    context.active.delete(input);
    return output;
  }

  const output = {};
  for (const key of Object.keys(descriptors)) {
    const descriptor = descriptors[key];
    const childPath = [...pathParts, key];
    if (UNSAFE_PROPERTY.test(key) || EVENT_HANDLER_PROPERTY.test(key)) {
      addIssue(context.errors, context.sourceMap, "UNSAFE_PROPERTY", pointer(childPath), `Property "${key}" is not allowed in declarative article data.`, "Remove executable/HTML handler fields; represent behavior through the validated action vocabulary.");
      continue;
    }
    if (descriptor.get || descriptor.set || !descriptor.enumerable) {
      addIssue(context.errors, context.sourceMap, "UNSAFE_ACCESSOR", pointer(childPath), "Getters, setters and non-enumerable properties are rejected without invoking them.", "Replace the property with an ordinary enumerable JSON value.");
      continue;
    }
    output[key] = safeClone(descriptor.value, context, childPath, depth + 1);
  }
  context.active.delete(input);
  return output;
}

function resolveSchemaReference(reference) {
  if (!reference.startsWith("#/$defs/")) return undefined;
  return reference.slice(2).split("/").reduce((current, segment) => current?.[segment.replace(/~1/g, "/").replace(/~0/g, "~")], ARTICLE_V1_SCHEMA);
}

function matchesType(value, type) {
  if (Array.isArray(type)) return type.some((entry) => matchesType(value, entry));
  switch (type) {
    case "object": return value !== null && typeof value === "object" && !Array.isArray(value);
    case "array": return Array.isArray(value);
    case "integer": return typeof value === "number" && Number.isInteger(value);
    case "number": return typeof value === "number" && Number.isFinite(value);
    case "string": return typeof value === "string";
    case "boolean": return typeof value === "boolean";
    case "null": return value === null;
    default: return true;
  }
}

function schemaIssue(errors, sourceMap, code, path, message, fixHint) {
  addIssue(errors, sourceMap, code, path, message, fixHint);
}

function validateSchema(value, schema, path, errors, sourceMap) {
  if (!schema || typeof schema !== "object") return;
  if (schema.$ref) {
    const target = resolveSchemaReference(schema.$ref);
    if (target) validateSchema(value, target, path, errors, sourceMap);
    return;
  }
  for (const keyword of ["anyOf", "oneOf"]) {
    if (!schema[keyword]) continue;
    const matches = schema[keyword].filter((branch) => {
      const branchErrors = [];
      validateSchema(value, branch, path, branchErrors, sourceMap);
      return branchErrors.length === 0;
    }).length;
    if (keyword === "anyOf" ? matches === 0 : matches !== 1) {
      schemaIssue(errors, sourceMap, "SCHEMA_MISMATCH", path, `Value does not match the article schema's ${keyword} constraint.`, "Use exactly one of the documented data shapes for this field.");
      return;
    }
  }
  if (schema.type && !matchesType(value, schema.type)) {
    schemaIssue(errors, sourceMap, "INVALID_TYPE", path, `Expected ${Array.isArray(schema.type) ? schema.type.join(" or ") : schema.type}.`, "Change the value to the declared article field type.");
    return;
  }
  if (Object.hasOwn(schema, "const") && value !== schema.const) {
    const code = path === "/schemaVersion" ? "UNSUPPORTED_SCHEMA_VERSION" : "INVALID_VALUE";
    const hint = path === "/schemaVersion" ? `Use schemaVersion ${ARTICLE_SCHEMA_VERSION}, or add a tested explicit migration before accepting another version.` : "Use the exact value declared by the article contract.";
    schemaIssue(errors, sourceMap, code, path, path === "/schemaVersion" ? `No migration is registered for article schema version ${String(value)}.` : `Expected the fixed value ${JSON.stringify(schema.const)}.`, hint);
    return;
  }
  if (schema.enum && !schema.enum.some((entry) => Object.is(entry, value))) {
    schemaIssue(errors, sourceMap, "INVALID_VALUE", path, "Value is not in the declared article vocabulary.", "Choose one of the documented values.");
    return;
  }
  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength || schema.maxLength !== undefined && value.length > schema.maxLength) {
      schemaIssue(errors, sourceMap, "INVALID_LENGTH", path, "String length is outside the article schema's allowed range.", "Shorten the value or provide the required amount of text.");
    }
    if (schema.pattern && !new RegExp(schema.pattern, "u").test(value)) schemaIssue(errors, sourceMap, "INVALID_FORMAT", path, "String does not match the required article identifier/locale format.", "Use the documented canonical ID or BCP-47 locale format.");
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) schemaIssue(errors, sourceMap, "NON_FINITE_NUMBER", path, "Numbers must be finite.", "Replace NaN or Infinity with a finite value.");
    if (schema.minimum !== undefined && value < schema.minimum || schema.maximum !== undefined && value > schema.maximum || schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) {
      schemaIssue(errors, sourceMap, "OUT_OF_RANGE", path, "Number is outside the article schema's allowed range.", "Set a value within the declared bounds.");
    }
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems || schema.maxItems !== undefined && value.length > schema.maxItems) schemaIssue(errors, sourceMap, "INVALID_LENGTH", path, "Array length is outside the article schema's allowed range.", "Add/remove entries to meet the declared array limits.");
    if (schema.items) value.forEach((item, index) => validateSchema(item, schema.items, `${path}/${index}`, errors, sourceMap));
    return;
  }
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value);
    if (schema.minProperties !== undefined && keys.length < schema.minProperties || schema.maxProperties !== undefined && keys.length > schema.maxProperties) schemaIssue(errors, sourceMap, "INVALID_LENGTH", path, "Object property count is outside the article schema's allowed range.", "Reduce or add properties to meet the declared limit.");
    if (schema.propertyNames) for (const key of keys) validateSchema(key, schema.propertyNames, `${path}/${key}`, errors, sourceMap);
    for (const required of schema.required ?? []) if (!Object.hasOwn(value, required)) schemaIssue(errors, sourceMap, "MISSING_FIELD", `${path}/${required}`, `Required field "${required}" is missing.`, `Add the required "${required}" field without changing unrelated content.`);
    for (const key of keys) {
      const propertySchema = schema.properties?.[key];
      if (propertySchema) validateSchema(value[key], propertySchema, `${path}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`, errors, sourceMap);
      else if (schema.additionalProperties === false) schemaIssue(errors, sourceMap, "UNKNOWN_FIELD", `${path}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`, `Unknown field "${key}" is not allowed by article schema v${ARTICLE_SCHEMA_VERSION}.`, "Remove the unknown field or use a documented property in this schema version.");
      else if (schema.additionalProperties && typeof schema.additionalProperties === "object") validateSchema(value[key], schema.additionalProperties, `${path}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`, errors, sourceMap);
    }
  }
}

function validateStateVariables(article, errors, sourceMap) {
  for (const [name, variable] of Object.entries(article.initialState ?? {})) {
    const path = `/initialState/${name}`;
    if (!VARIABLE_PATTERN.test(name)) addIssue(errors, sourceMap, "INVALID_VARIABLE_ID", path, "State variable IDs must be stable identifier tokens.", "Use an ASCII letter followed by letters, digits, underscores or hyphens.");
    if (!variable || typeof variable !== "object") continue;
    const { type, value, min, max, step, minLength, maxLength, values } = variable;
    if (type === "number" || type === "integer") {
      if (typeof value !== "number" || !Number.isFinite(value) || type === "integer" && !Number.isInteger(value)) addIssue(errors, sourceMap, "INVALID_STATE_VALUE", `${path}/value`, `State variable "${name}" requires a finite ${type} value.`, "Set a value matching the declared state type.");
      if (min !== undefined && max !== undefined && min > max) addIssue(errors, sourceMap, "INVALID_STATE_BOUNDS", path, "State minimum cannot exceed maximum.", "Correct min/max so the permitted interval is non-empty.");
      if (typeof value === "number" && (min !== undefined && value < min || max !== undefined && value > max)) addIssue(errors, sourceMap, "STATE_VALUE_OUT_OF_RANGE", `${path}/value`, "Initial state value is outside its declared bounds.", "Set value within min/max or adjust those bounds.");
      if (step !== undefined && !(step > 0)) addIssue(errors, sourceMap, "INVALID_STATE_STEP", `${path}/step`, "State step must be greater than zero.", "Set a finite positive step.");
    } else if (type === "string") {
      if (typeof value !== "string") addIssue(errors, sourceMap, "INVALID_STATE_VALUE", `${path}/value`, "String state variables require string values.", "Use a string value matching the declared state type.");
      else if (minLength !== undefined && value.length < minLength || maxLength !== undefined && value.length > maxLength) addIssue(errors, sourceMap, "STATE_VALUE_OUT_OF_RANGE", `${path}/value`, "String state value is outside its declared length bounds.", "Adjust the value or length bounds.");
    } else if (type === "boolean" && typeof value !== "boolean") addIssue(errors, sourceMap, "INVALID_STATE_VALUE", `${path}/value`, "Boolean state variables require boolean values.", "Use true or false.");
    else if (type === "enum") {
      if (!Array.isArray(values) || values.length === 0 || !values.some((entry) => Object.is(entry, value))) addIssue(errors, sourceMap, "INVALID_STATE_ENUM", `${path}/value`, "Enum state value must be included in its declared values list.", "Add the value to values or select a declared value.");
      if (Array.isArray(values) && new Set(values.map((entry) => `${typeof entry}:${String(entry)}`)).size !== values.length) addIssue(errors, sourceMap, "DUPLICATE_ENUM_VALUE", `${path}/values`, "Enum values must be unique.", "Remove duplicate enum entries.");
    }
  }
}

function collectExpressionReferences(node, path, stateNames, derivedNames, dependencies, errors, sourceMap, depth = 0, counter = { value: 0 }) {
  counter.value += 1;
  if (counter.value > 1000 || depth > 32) {
    addIssue(errors, sourceMap, "EXPRESSION_LIMIT_EXCEEDED", path, "Derived expression exceeds the bounded complexity limit.", "Split the expression into smaller named derived values.");
    return;
  }
  if (typeof node === "number") {
    if (!Number.isFinite(node)) addIssue(errors, sourceMap, "NON_FINITE_NUMBER", path, "Derived literals must be finite numbers.", "Replace this value with a finite literal.");
    return;
  }
  if (typeof node === "string" || typeof node === "boolean") return;
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    addIssue(errors, sourceMap, "INVALID_EXPRESSION", path, "Derived values must be literals, references or allowlisted operator nodes.", "Use the declarative expression AST; JavaScript expressions are not accepted.");
    return;
  }
  const keys = Object.keys(node);
  if (Object.hasOwn(node, "ref")) {
    if (keys.length !== 1 || typeof node.ref !== "string" || !VARIABLE_PATTERN.test(node.ref)) addIssue(errors, sourceMap, "INVALID_REFERENCE", path, "Reference nodes must contain exactly one valid ref field.", "Use {ref: variableId} with a declared state or derived value.");
    else if (stateNames.has(node.ref)) return;
    else if (derivedNames.has(node.ref)) dependencies.add(node.ref);
    else addIssue(errors, sourceMap, "UNKNOWN_REFERENCE", `${path}/ref`, `Reference "${node.ref}" is not declared in initialState or derived.`, "Declare the variable or correct the reference ID.");
    return;
  }
  const fields = EXPRESSION_FIELDS[node.op];
  if (!fields) {
    addIssue(errors, sourceMap, "UNSUPPORTED_OPERATOR", `${path}/op`, `Operator "${String(node.op)}" is not in the safe article expression vocabulary.`, "Use a documented fixed operator; source-defined code is not allowed.");
    return;
  }
  const expectedKeys = new Set(["op", ...fields]);
  for (const key of keys) if (!expectedKeys.has(key)) addIssue(errors, sourceMap, "UNKNOWN_FIELD", `${path}/${key}`, `Unknown expression field "${key}" for operator ${node.op}.`, "Use only the documented operands for this operator.");
  for (const field of fields) if (!Object.hasOwn(node, field)) addIssue(errors, sourceMap, "MISSING_FIELD", `${path}/${field}`, `Operator ${node.op} requires "${field}".`, "Provide the required operand.");
  for (const field of fields) {
    if (node.op === "formatNumber" && field === "locale") {
      if (typeof node.locale !== "string" || !LOCALE_PATTERN.test(node.locale)) addIssue(errors, sourceMap, "INVALID_LOCALE", `${path}/locale`, "formatNumber locale must be a BCP-47 locale tag.", "Use a valid locale tag such as en or ar.");
    } else collectExpressionReferences(node[field], `${path}/${field}`, stateNames, derivedNames, dependencies, errors, sourceMap, depth + 1, counter);
  }
  if (node.op === "divide" && staticNumber(node.b) === 0) addIssue(errors, sourceMap, "DIVIDE_BY_ZERO", `${path}/b`, "A statically known division denominator is zero.", "Use a non-zero denominator or an explicit conditional branch.");
}

function staticNumber(node) {
  if (typeof node === "number" && Number.isFinite(node)) return node;
  if (!node || typeof node !== "object" || Array.isArray(node)) return undefined;
  const a = staticNumber(node.a);
  const b = staticNumber(node.b);
  if (node.op === "add" && a !== undefined && b !== undefined) return a + b;
  if (node.op === "subtract" && a !== undefined && b !== undefined) return a - b;
  if (node.op === "multiply" && a !== undefined && b !== undefined) return a * b;
  if (node.op === "divide" && a !== undefined && b !== undefined && b !== 0) return a / b;
  return undefined;
}

function validateDerived(article, errors, sourceMap) {
  const stateNames = new Set(Object.keys(article.initialState ?? {}));
  const derived = article.derived ?? {};
  const derivedNames = new Set(Object.keys(derived));
  const graph = new Map();
  for (const [name, expression] of Object.entries(derived)) {
    const dependencies = new Set();
    collectExpressionReferences(expression, `/derived/${name}`, stateNames, derivedNames, dependencies, errors, sourceMap);
    graph.set(name, dependencies);
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(name, stack) {
    if (visiting.has(name)) {
      addIssue(errors, sourceMap, "DERIVED_CYCLE", `/derived/${name}`, `Derived dependency cycle detected: ${[...stack, name].join(" → ")}.`, "Break the cycle by referencing state or a non-cyclic derived value.");
      return;
    }
    if (visited.has(name)) return;
    visiting.add(name);
    for (const dependency of graph.get(name) ?? []) visit(dependency, [...stack, name]);
    visiting.delete(name);
    visited.add(name);
  }
  for (const name of graph.keys()) visit(name, []);
}

function safeAssetUrl(url, options) {
  if (typeof url !== "string" || !url || url !== url.trim() || /[\u0000-\u0020\\]/.test(url)) return { ok: false, reason: "Asset URL contains whitespace, control characters or a backslash." };
  if (url.startsWith("//")) return { ok: false, reason: "Protocol-relative asset URLs are not permitted." };
  const scheme = url.match(/^([A-Za-z][A-Za-z0-9+.-]*):/);
  if (scheme) {
    if (scheme[1].toLowerCase() !== "https") return { ok: false, reason: "Only explicitly approved HTTPS asset URLs are allowed." };
    let parsed;
    try { parsed = new URL(url); } catch { return { ok: false, reason: "Asset URL is malformed." }; }
    if (parsed.username || parsed.password) return { ok: false, reason: "Credentials in asset URLs are not permitted." };
    const allowed = new Set(options.allowedAssetOrigins ?? []);
    if (!allowed.has(parsed.origin)) return { ok: false, reason: `Asset origin ${parsed.origin} was not explicitly approved by the host.` };
    if (!/^sha(?:256|384|512)-[A-Za-z0-9+/]+={0,2}$/.test(options.integrity ?? "")) return { ok: false, reason: "Approved external assets require a sha256/sha384/sha512 integrity value." };
    return { ok: true };
  }
  const pathname = url.split(/[?#]/, 1)[0];
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return { ok: false, reason: "Asset path contains malformed percent encoding." }; }
  if (/%2f|%5c/i.test(pathname) || decoded.split(/[\\/]/).some((segment) => segment === "..")) return { ok: false, reason: "Asset path traversal is not permitted." };
  return { ok: true };
}

function safeHref(url) {
  if (typeof url !== "string" || !url || url !== url.trim() || /[\u0000-\u0020\\]/.test(url) || url.startsWith("//")) return false;
  const scheme = url.match(/^([A-Za-z][A-Za-z0-9+.-]*):/);
  if (scheme) {
    if (scheme[1].toLowerCase() !== "https") return false;
    try {
      const parsed = new URL(url);
      return !parsed.username && !parsed.password;
    } catch { return false; }
  }
  const pathname = url.split(/[?#]/, 1)[0];
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return false; }
  return !/%2f|%5c/i.test(pathname) && !decoded.split(/[\\/]/).some((segment) => segment === "..");
}

function validateContentLinks(text, path, errors, sourceMap) {
  if (typeof text !== "string") return;
  const pattern = /\]\(\s*([^\s)]+)/g;
  for (const match of text.matchAll(pattern)) {
    if (!safeHref(match[1])) addIssue(errors, sourceMap, "UNSAFE_LINK_URL", path, "Markdown link uses an unsafe, malformed or traversing URL.", "Use an HTTPS link or a safe relative/fragment target; article text is never allowed to execute URL schemes.");
  }
}

function validateDeclaredReferences(value, path, errors, sourceMap) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((entry, index) => validateDeclaredReferences(entry, `${path}/${index}`, errors, sourceMap));
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`;
    if (["src", "srcset"].includes(key.toLowerCase())) addIssue(errors, sourceMap, "UNMANIFESTED_RESOURCE_URL", childPath, "Media source URLs must be declared in the article asset manifest, not hidden in component props.", "Add a typed asset manifest entry and reference it by assetId.");
    else if (["href", "url"].includes(key.toLowerCase()) && typeof child === "string" && !safeHref(child)) addIssue(errors, sourceMap, "UNSAFE_LINK_URL", childPath, "Link/citation URL uses an unsafe, malformed or traversing target.", "Use HTTPS or a safe relative/fragment target; active schemes are not allowed.");
    validateDeclaredReferences(child, childPath, errors, sourceMap);
  }
}

function validateResourceManifest(article, errors, sourceMap, options) {
  const assetIds = new Set();
  const assetsById = new Map();
  for (let index = 0; index < (article.assets ?? []).length; index += 1) {
    const asset = article.assets[index];
    if (!asset || typeof asset !== "object") continue;
    assetIds.add(asset.id);
    assetsById.set(asset.id, asset);
    const urlResult = safeAssetUrl(asset.url, { ...options, integrity: asset.integrity });
    if (!urlResult.ok) addIssue(errors, sourceMap, "UNSAFE_ASSET_URL", `/assets/${index}/url`, urlResult.reason, "Use a relative path without traversal, or provide a host-approved HTTPS origin and a matching integrity digest.");
    if (asset.decorative === true && asset.alt !== "") addIssue(errors, sourceMap, "DECORATIVE_ALT_MUST_BE_EMPTY", `/assets/${index}/alt`, "Decorative assets must use an empty alt string.", "Set alt to an empty string when the asset conveys no article information.");
    if (asset.decorative !== true && typeof asset.alt === "string" && !asset.alt.trim()) addIssue(errors, sourceMap, "MISSING_ALT_TEXT", `/assets/${index}/alt`, "Informative assets require a non-empty localized alt description.", "Add alt text in the article's locale or mark the asset decorative.");
  }
  for (let index = 0; index < (article.assets ?? []).length; index += 1) {
    const asset = article.assets[index];
    if (!asset || typeof asset !== "object" || !Array.isArray(asset.captionTracks)) continue;
    if (!/^audio\//i.test(asset.type ?? "") && !/^video\//i.test(asset.type ?? "")) addIssue(errors, sourceMap, "CAPTION_TRACK_PARENT_NOT_MEDIA", `/assets/${index}/captionTracks`, "Caption tracks can only be attached to audio or video assets.", "Attach this track to a declared audio or video asset.");
    const uniqueTracks = new Set();
    for (let trackIndex = 0; trackIndex < asset.captionTracks.length; trackIndex += 1) {
      const track = asset.captionTracks[trackIndex];
      if (!track || typeof track !== "object") continue;
      const trackPath = `/assets/${index}/captionTracks/${trackIndex}`;
      const referenced = assetsById.get(track.assetId);
      if (!referenced) addIssue(errors, sourceMap, "UNKNOWN_CAPTION_TRACK_ASSET", `${trackPath}/assetId`, `Caption track asset "${String(track.assetId)}" is not declared.`, "Declare the WebVTT file in the asset manifest and reference its stable ID.");
      else if (referenced.type?.toLowerCase() !== "text/vtt") addIssue(errors, sourceMap, "INVALID_CAPTION_TRACK_TYPE", `${trackPath}/assetId`, "Caption track assets must use the text/vtt media type.", "Use a declared text/vtt asset for each caption/subtitle track.");
      const key = `${track.locale}:${track.kind ?? "captions"}`;
      if (uniqueTracks.has(key)) addIssue(errors, sourceMap, "DUPLICATE_CAPTION_TRACK", trackPath, "Only one track of each kind may be declared per locale on a media asset.", "Keep one captions/subtitles track per locale.");
      uniqueTracks.add(key);
    }
  }
  return assetIds;
}

function validateAction(action, path, article, assetIds, errors, sourceMap) {
  if (!action || typeof action !== "object" || Array.isArray(action)) return;
  const name = action.action;
  const allowed = ACTION_FIELDS[name];
  if (!allowed) {
    addIssue(errors, sourceMap, "UNSUPPORTED_ACTION", `${path}/action`, `Action "${String(name)}" is not allowlisted.`, "Use one of the declarative, bounded article actions; never embed JavaScript.");
    return;
  }
  for (const key of Object.keys(action)) if (key !== "action" && !allowed.includes(key)) addIssue(errors, sourceMap, "UNKNOWN_FIELD", `${path}/${key}`, `Field "${key}" is not supported for action ${name}.`, "Remove it or use the documented fields for this action.");
  const requireField = (field) => { if (!Object.hasOwn(action, field)) addIssue(errors, sourceMap, "MISSING_FIELD", `${path}/${field}`, `Action ${name} requires "${field}".`, "Provide the required declarative action field."); };
  if (["setState", "nextStep", "previousStep", "selectOption", "toggle"].includes(name)) {
    requireField("variable");
    if (action.variable && !Object.hasOwn(article.initialState ?? {}, action.variable)) addIssue(errors, sourceMap, "UNKNOWN_STATE_VARIABLE", `${path}/variable`, `State variable "${action.variable}" is not declared.`, "Declare the variable in initialState or correct the ID.");
  }
  if (name === "setState" && (Object.hasOwn(action, "value") === Object.hasOwn(action, "valueFrom"))) addIssue(errors, sourceMap, "INVALID_ACTION_VALUE", path, "setState requires exactly one of value or valueFrom.", "Provide a static JSON value or one allowlisted event token, not both.");
  if (name === "selectOption" && !Object.hasOwn(action, "optionId") && !Object.hasOwn(action, "valueFrom")) addIssue(errors, sourceMap, "INVALID_ACTION_VALUE", path, "selectOption requires optionId or valueFrom.", "Provide the selected option or an allowlisted event token.");
  if (name === "setFilter") {
    requireField("filterId");
    if (!Object.hasOwn(action, "value") && !Object.hasOwn(action, "valueFrom")) addIssue(errors, sourceMap, "INVALID_ACTION_VALUE", path, "setFilter requires value or valueFrom.", "Provide a value or allowlisted event token.");
  }
  if (name === "submitQuiz") requireField("quizId");
  if (name === "openDialog" || name === "closeDialog") requireField("targetId");
  if (name === "navigate") {
    requireField("route");
    if (typeof action.route === "string" && !ID_PATTERN.test(action.route)) addIssue(errors, sourceMap, "UNSAFE_NAVIGATION_TARGET", `${path}/route`, "Article navigation must reference a stable host-approved route token, not a URL or endpoint.", "Use a registered route ID and let the host authorize navigation.");
  }
  if (name === "scroll" || name === "expand") requireField("targetId");
  if (name === "seekMedia" || name === "playMedia") {
    requireField("assetId");
    if (action.assetId && !assetIds.has(action.assetId)) addIssue(errors, sourceMap, "UNKNOWN_ASSET_REFERENCE", `${path}/assetId`, `Asset "${action.assetId}" is not declared in the article manifest.`, "Declare the asset or correct its ID.");
  }
  if (name === "seekMedia" && !Object.hasOwn(action, "seconds") && !Object.hasOwn(action, "valueFrom")) addIssue(errors, sourceMap, "INVALID_ACTION_VALUE", path, "seekMedia requires seconds or valueFrom.", "Provide a numeric position or allowlisted event token.");
  if (name === "playMedia" && action.gestureRequired !== true) addIssue(errors, sourceMap, "GESTURE_REQUIRED", `${path}/gestureRequired`, "Media playback must be explicitly tied to a user gesture.", "Set gestureRequired to true.");
  if (name === "resetActivity" || name === "saveProgress") requireField("activityId");
  if (name === "saveProgress" && !["article", "activity"].includes(action.scope)) addIssue(errors, sourceMap, "INVALID_PROGRESS_SCOPE", `${path}/scope`, "Progress persistence scope must be explicitly article or activity scoped.", "Use an approved scope; the host adapter remains responsible for authorization.");
}

function hashToken(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 0x01000193);
  return (hash >>> 0).toString(36);
}

function isIsoTimelineDate(value) {
  if (typeof value !== "string") return false;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/);
  if (!match) return false;
  const [, yearText, monthText, dayText, hourText, minuteText, secondText, zone] = match;
  const date = new Date(Date.UTC(Number(yearText), Number(monthText) - 1, Number(dayText)));
  if (date.getUTCFullYear() !== Number(yearText) || date.getUTCMonth() + 1 !== Number(monthText) || date.getUTCDate() !== Number(dayText)) return false;
  if (hourText !== undefined && (Number(hourText) > 23 || Number(minuteText) > 59 || Number(secondText ?? 0) > 59)) return false;
  if (zone && zone !== "Z") {
    const [, hours, minutes] = zone.match(/^[+-](\d{2}):(\d{2})$/) ?? [];
    if (Number(hours) > 14 || Number(minutes) > 59 || Number(hours) === 14 && Number(minutes) !== 0) return false;
  }
  return Number.isFinite(Date.parse(value));
}

function omitUndefined(value) {
  if (Array.isArray(value)) return value.map((entry) => entry === undefined ? null : omitUndefined(entry));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined).map(([key, entry]) => [key, omitUndefined(entry)]));
  return value;
}

function validateBlocks(article, assetIds, errors, sourceMap) {
  const ids = new Map();
  const targetIds = new Set();
  const targetTypes = new Map();
  const stateNames = new Set(Object.keys(article.initialState ?? {}));
  const derivedNames = new Set(Object.keys(article.derived ?? {}));
  const sourceIds = new Set((article.metadata?.sources ?? []).map((source) => source?.id).filter((id) => typeof id === "string"));
  function collectTargets(block) {
    if (!block || typeof block !== "object") return;
    if (typeof block.id === "string") { targetIds.add(block.id); targetTypes.set(block.id, block.type); }
    for (const child of block.children ?? []) collectTargets(child);
  }
  for (const section of article.sections ?? []) {
    if (typeof section?.id === "string") targetIds.add(section.id);
    for (const block of section?.blocks ?? []) collectTargets(block);
  }
  function addId(id, path) {
    if (typeof id !== "string") return;
    if (!ID_PATTERN.test(id)) addIssue(errors, sourceMap, "INVALID_CANONICAL_ID", path, `ID "${id}" is not a canonical article identifier.`, "Use a lowercase ASCII letter followed by lowercase letters, digits or single hyphen-separated segments.");
    if (ids.has(id)) addIssue(errors, sourceMap, "DUPLICATE_ID", path, `ID "${id}" is already used at ${ids.get(id)}.`, "Assign one stable, unique ID per section, block and asset target.");
    else ids.set(id, path);
  }
  function scalar(value) { return value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number" && Number.isFinite(value); }
  function validateWidgetProps(block, path) {
    const props = block.props ?? {};
    const issue = (code, suffix, message, fixHint) => addIssue(errors, sourceMap, code, `${path}/props${suffix}`, message, fixHint);
    const numberField = (field, minimum = undefined, maximum = undefined) => {
      if (props[field] !== undefined && (typeof props[field] !== "number" || !Number.isFinite(props[field]) || minimum !== undefined && props[field] < minimum || maximum !== undefined && props[field] > maximum)) issue("INVALID_WIDGET_BOUND", `/${field}`, `Widget ${field} must be a finite number within its documented bounds.`, "Provide a finite in-range number.");
    };
    if (block.type === "citation") {
      if (props.sourceId !== undefined && typeof props.sourceId !== "string") issue("INVALID_CITATION_SOURCE", "/sourceId", "Citation sourceId must be a declared stable source ID.", "Reference a source in metadata.sources.");
      else if (props.sourceId && !sourceIds.has(props.sourceId)) issue("UNKNOWN_CITATION_SOURCE", "/sourceId", `Citation source "${props.sourceId}" is not declared in metadata.sources.`, "Add the source to metadata.sources or correct its ID.");
      if (props.note !== undefined && (typeof props.note !== "string" || props.note.length > 10000)) issue("INVALID_CITATION_NOTE", "/note", "A citation note must be plain text up to 10000 characters.", "Provide a bounded plain-text note.");
    }
    if (block.type === "math" && typeof block.content === "string" && block.content.length > 4096) issue("MATH_EXPRESSION_TOO_LONG", "", "Math notation is limited to 4096 characters per expression.", "Split the expression into smaller independently described blocks.");
    if (["audio", "video", "figure"].includes(block.type) && props.transcript !== undefined && (typeof props.transcript !== "string" || props.transcript.length > 10000)) issue("INVALID_MEDIA_TRANSCRIPT", "/transcript", "Media transcripts must be plain text up to 10000 characters.", "Provide a bounded plain-text transcript.");
    if (block.type === "figure" && props.hotspots !== undefined) {
      if (!Array.isArray(props.hotspots) || props.hotspots.length > 100) issue("INVALID_HOTSPOTS", "/hotspots", "Annotated figures support at most 100 hotspot records.", "Provide a bounded hotspot list.");
      else {
        const ids = new Set();
        props.hotspots.forEach((hotspot, index) => {
          const hotspotPath = `/hotspots/${index}`;
          if (!hotspot || typeof hotspot !== "object" || Array.isArray(hotspot)) { issue("INVALID_HOTSPOT", hotspotPath, "Each hotspot must be a structured object.", "Provide id, label, description, x and y fields."); return; }
          if (typeof hotspot.id !== "string" || !ID_PATTERN.test(hotspot.id)) issue("INVALID_HOTSPOT_ID", `${hotspotPath}/id`, "Hotspot IDs must be canonical stable identifiers.", "Use lowercase letters, digits and single hyphen-separated segments.");
          else if (ids.has(hotspot.id)) issue("DUPLICATE_HOTSPOT_ID", `${hotspotPath}/id`, "Hotspot IDs must be unique within a figure.", "Assign a distinct stable ID to each hotspot.");
          else ids.add(hotspot.id);
          if (typeof hotspot.label !== "string" || !hotspot.label.trim() || hotspot.label.length > 200) issue("INVALID_HOTSPOT_LABEL", `${hotspotPath}/label`, "Each hotspot requires a readable label of at most 200 characters.", "Provide a concise visible/accessible label.");
          if (typeof hotspot.description !== "string" || !hotspot.description.trim() || hotspot.description.length > 2000) issue("INVALID_HOTSPOT_DESCRIPTION", `${hotspotPath}/description`, "Each hotspot requires a text alternative of at most 2000 characters.", "Describe the indicated scene region in plain text.");
          for (const coordinate of ["x", "y"]) if (typeof hotspot[coordinate] !== "number" || !Number.isFinite(hotspot[coordinate]) || hotspot[coordinate] < 0 || hotspot[coordinate] > 100) issue("INVALID_HOTSPOT_POSITION", `${hotspotPath}/${coordinate}`, "Hotspot coordinates must be finite percentages from 0 to 100.", "Use x/y percentages within the image bounds.");
        });
      }
    }
    if (block.type === "knowledgeMap") {
      const nodes = props.nodes;
      const edges = props.edges ?? [];
      const nodeIds = new Set();
      if (!Array.isArray(nodes) || nodes.length < 1 || nodes.length > 1000) issue("INVALID_KNOWLEDGE_MAP_NODES", "/nodes", "Knowledge maps require 1–1000 node records.", "Provide bounded nodes with unique stable IDs and readable labels.");
      for (const [index, node] of (Array.isArray(nodes) ? nodes : []).entries()) {
        const nodePath = `/nodes/${index}`;
        if (!node || typeof node !== "object" || Array.isArray(node)) { issue("INVALID_KNOWLEDGE_MAP_NODE", nodePath, "Each knowledge-map node must be an object.", "Use a node record with id and label fields."); continue; }
        if (typeof node.id !== "string" || !ID_PATTERN.test(node.id)) issue("INVALID_KNOWLEDGE_MAP_NODE_ID", `${nodePath}/id`, "Knowledge-map node IDs must be stable canonical IDs.", "Use lowercase letters, digits and single hyphen-separated segments.");
        else if (nodeIds.has(node.id)) issue("DUPLICATE_KNOWLEDGE_MAP_NODE_ID", `${nodePath}/id`, "Node IDs must be unique within a knowledge map.", "Assign each node a distinct stable ID.");
        else nodeIds.add(node.id);
        if (typeof node.label !== "string" || !node.label.trim() || node.label.length > 280) issue("INVALID_KNOWLEDGE_MAP_LABEL", `${nodePath}/label`, "Each node requires a readable label of at most 280 characters.", "Provide concise, non-empty node text.");
        if (node.summary !== undefined && (typeof node.summary !== "string" || node.summary.length > 2000)) issue("INVALID_KNOWLEDGE_MAP_SUMMARY", `${nodePath}/summary`, "Node summaries must be text no longer than 2000 characters.", "Shorten the summary or omit it.");
        if (node.articleRef !== undefined && (typeof node.articleRef !== "string" || !ID_PATTERN.test(node.articleRef))) issue("INVALID_KNOWLEDGE_MAP_ARTICLE_REF", `${nodePath}/articleRef`, "Article deep links must be canonical route tokens, not arbitrary URLs.", "Use a stable article ID; the host resolves it through onNavigate.");
        if ((node.x === undefined) !== (node.y === undefined)) issue("INCOMPLETE_KNOWLEDGE_MAP_POSITION", nodePath, "Explicit node positions must provide both x and y.", "Set both finite coordinates or let the automatic layout place the node.");
        for (const coordinate of ["x", "y"]) if (node[coordinate] !== undefined && (typeof node[coordinate] !== "number" || !Number.isFinite(node[coordinate]) || Math.abs(node[coordinate]) > 100000)) issue("INVALID_KNOWLEDGE_MAP_POSITION", `${nodePath}/${coordinate}`, "Explicit map coordinates must be finite and within ±100000.", "Use bounded coordinates or omit both values for automatic layout.");
      }
      if (!Array.isArray(edges) || edges.length > 5000) issue("INVALID_KNOWLEDGE_MAP_EDGES", "/edges", "Knowledge maps support at most 5000 edge records.", "Remove excess edges while preserving the important relationships.");
      const edgeIds = new Set();
      for (const [index, edge] of (Array.isArray(edges) ? edges : []).entries()) {
        const edgePath = `/edges/${index}`;
        if (!edge || typeof edge !== "object" || Array.isArray(edge)) { issue("INVALID_KNOWLEDGE_MAP_EDGE", edgePath, "Each knowledge-map edge must be an object.", "Use source and target node IDs."); continue; }
        if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) issue("UNKNOWN_KNOWLEDGE_MAP_EDGE_NODE", edgePath, "Every edge source and target must reference a declared node.", "Correct the edge endpoints or add the referenced nodes.");
        if (edge.id !== undefined) {
          if (typeof edge.id !== "string" || !ID_PATTERN.test(edge.id)) issue("INVALID_KNOWLEDGE_MAP_EDGE_ID", `${edgePath}/id`, "Optional edge IDs must be canonical IDs.", "Use a stable edge token or omit the ID.");
          else if (edgeIds.has(edge.id)) issue("DUPLICATE_KNOWLEDGE_MAP_EDGE_ID", `${edgePath}/id`, "Edge IDs must be unique within a map.", "Assign distinct IDs or omit them.");
          else edgeIds.add(edge.id);
        }
        if (edge.label !== undefined && (typeof edge.label !== "string" || edge.label.length > 280)) issue("INVALID_KNOWLEDGE_MAP_EDGE_LABEL", `${edgePath}/label`, "Edge labels must be text no longer than 280 characters.", "Shorten or omit the relationship label.");
      }
      if (!["auto", "layered", "grid", "radial"].includes(props.layout ?? "auto")) issue("INVALID_KNOWLEDGE_MAP_LAYOUT", "/layout", "Knowledge-map layout must be auto, layered, grid or radial.", "Choose one of the supported deterministic layouts.");
      for (const field of ["pan", "zoom", "pinchZoom", "minimap", "interactive"]) if (props[field] !== undefined && typeof props[field] !== "boolean") issue("INVALID_KNOWLEDGE_MAP_OPTION", `/${field}`, `${field} must be a boolean when provided.`, "Use true or false.");
      const description = props.description ?? props.title ?? block.content;
      if (typeof description !== "string" || !description.trim()) issue("MISSING_KNOWLEDGE_MAP_DESCRIPTION", "/description", "Knowledge maps need a non-empty accessible description.", "Describe the map's purpose in description or title.");
      if (block.bindings?.selected) {
        const selection = article.initialState?.[block.bindings.selected];
        if (!selection || selection.type !== "enum" || [...nodeIds].some((id) => !selection.values?.includes(id))) issue("INVALID_KNOWLEDGE_MAP_SELECTION_STATE", "/bindings/selected", "A selected-node binding must be an enum containing every node ID.", "Declare a selected-node enum with each stable map node ID.");
      }
    }
    if (block.type === "quiz") {
      const questions = props.questions;
      if (!Array.isArray(questions) || questions.length < 1 || questions.length > 100) issue("INVALID_QUIZ_QUESTIONS", "/questions", "Quiz requires 1–100 bounded question records.", "Provide supported question types with stable IDs, readable prompts, and declarative answers.");
      const questionIds = new Set();
      for (const [index, question] of (Array.isArray(questions) ? questions : []).entries()) {
        const questionPath = `/questions/${index}`;
        if (!question || typeof question !== "object" || Array.isArray(question)) { issue("INVALID_QUIZ_QUESTION", questionPath, "Each quiz question must be an object.", "Use a supported question record."); continue; }
        if (typeof question.id !== "string" || !ID_PATTERN.test(question.id)) issue("INVALID_QUIZ_QUESTION_ID", `${questionPath}/id`, "Quiz question IDs must be stable canonical IDs.", "Use a lowercase stable identifier for each question.");
        else if (questionIds.has(question.id)) issue("DUPLICATE_QUIZ_QUESTION_ID", `${questionPath}/id`, "Quiz question IDs must be unique within their quiz.", "Assign a distinct stable ID to each question.");
        else questionIds.add(question.id);
        if (typeof question.prompt !== "string" || !question.prompt.trim()) issue("MISSING_QUIZ_PROMPT", `${questionPath}/prompt`, "Each quiz question requires a readable prompt.", "Provide non-empty question text.");
        if (question.explanation !== undefined && (typeof question.explanation !== "string" || !question.explanation.trim())) issue("INVALID_QUIZ_EXPLANATION", `${questionPath}/explanation`, "Quiz explanations must be non-empty text when provided.", "Provide useful feedback text or omit the explanation.");
        if (question.weight !== undefined && (typeof question.weight !== "number" || !Number.isFinite(question.weight) || question.weight <= 0 || question.weight > 1000)) issue("INVALID_QUIZ_WEIGHT", `${questionPath}/weight`, "Question weight must be finite and greater than zero.", "Use a positive weight no greater than 1000.");
        const type = question.type;
        if (!["single-choice", "multiple-choice", "true-false", "short-answer", "matching", "ordering"].includes(type)) {
          issue("INVALID_QUIZ_QUESTION_TYPE", `${questionPath}/type`, `Quiz question type "${String(type)}" is not supported.`, "Use single-choice, multiple-choice, true-false, short-answer, matching, or ordering.");
          continue;
        }
        const validateOptionList = (items, field, minimum = 2) => {
          const optionIds = new Set();
          if (!Array.isArray(items) || items.length < minimum || items.length > 100) { issue("INVALID_QUIZ_OPTIONS", `${questionPath}/${field}`, `${field} must contain ${minimum}–100 labeled options/items.`, "Use stable IDs and non-empty labels."); return optionIds; }
          for (const [optionIndex, option] of items.entries()) {
            if (!option || typeof option !== "object" || Array.isArray(option) || typeof option.id !== "string" || !ID_PATTERN.test(option.id) || typeof option.label !== "string" || !option.label.trim()) issue("INVALID_QUIZ_OPTION", `${questionPath}/${field}/${optionIndex}`, "Quiz options/items require a canonical ID and readable label.", "Provide {id,label} records with stable unique IDs.");
            else if (optionIds.has(option.id)) issue("DUPLICATE_QUIZ_OPTION_ID", `${questionPath}/${field}/${optionIndex}/id`, "IDs within an option list must be unique.", "Give every option a distinct stable ID.");
            else optionIds.add(option.id);
          }
          return optionIds;
        };
        if (type === "single-choice" || type === "multiple-choice") {
          const optionIds = validateOptionList(question.options, "options");
          if (type === "single-choice" && (typeof question.answer !== "string" || !optionIds.has(question.answer))) issue("INVALID_QUIZ_ANSWER", `${questionPath}/answer`, "Single-choice answer must reference one declared option ID.", "Set answer to an option's stable ID.");
          if (type === "multiple-choice") {
            if (!Array.isArray(question.answer) || question.answer.length < 1 || question.answer.some((id) => typeof id !== "string" || !optionIds.has(id)) || new Set(question.answer).size !== question.answer.length) issue("INVALID_QUIZ_ANSWER", `${questionPath}/answer`, "Multiple-choice answer must contain unique declared option IDs.", "Provide a non-empty array of distinct option IDs.");
          }
        } else if (type === "true-false") {
          if (typeof question.answer !== "boolean") issue("INVALID_QUIZ_ANSWER", `${questionPath}/answer`, "True/false answer must be a boolean.", "Set answer to true or false.");
        } else if (type === "short-answer") {
          const accepted = question.acceptedAnswers ?? [question.answer];
          if (!Array.isArray(accepted) || accepted.length < 1 || accepted.length > 100 || accepted.some((answer) => typeof answer !== "string" || !answer.trim())) issue("INVALID_QUIZ_ANSWER", `${questionPath}/acceptedAnswers`, "Short-answer questions require one or more accepted text answers.", "Provide answer or a bounded acceptedAnswers array of non-empty strings.");
        } else if (type === "matching") {
          const leftIds = validateOptionList(question.pairs, "pairs");
          const rightIds = validateOptionList(question.options, "options");
          const answer = question.answer;
          if (!answer || typeof answer !== "object" || Array.isArray(answer) || Object.keys(answer).length !== leftIds.size || [...leftIds].some((id) => !rightIds.has(answer[id])) || new Set(Object.values(answer)).size !== Object.values(answer).length) issue("INVALID_QUIZ_MATCHING_ANSWER", `${questionPath}/answer`, "Matching answer must map every pair ID to one unique declared option ID.", "Provide a complete one-to-one mapping between declared pairs and options.");
        } else if (type === "ordering") {
          const itemIds = validateOptionList(question.items, "items");
          if (!Array.isArray(question.answer) || question.answer.length !== itemIds.size || new Set(question.answer).size !== itemIds.size || question.answer.some((id) => !itemIds.has(id))) issue("INVALID_QUIZ_ANSWER", `${questionPath}/answer`, "Ordering answer must be an exact permutation of declared item IDs.", "List every item ID exactly once in the correct order.");
        }
      }
    }
    if (["stepper", "timeline"].includes(block.type)) {
      const children = Array.isArray(block.children) ? block.children : [];
      if (children.length < 1 || children.length > 100) issue("INVALID_LEARNING_STEPS", "/children", "Step and timeline widgets require 1–100 stable child panels.", "Declare each panel as a nested block with a stable ID.");
      const childIds = children.map((child) => child?.id).filter((id) => typeof id === "string");
      if (block.bindings?.selected) {
        const selection = article.initialState?.[block.bindings.selected];
        if (!selection || selection.type !== "enum" || childIds.some((id) => !selection.values?.includes(id))) issue("INVALID_LEARNING_SELECTION_STATE", "/bindings/selected", "A selected panel binding must be an enum containing every child block ID.", "Declare a mutable enum whose values include all stable child IDs.");
      }
      if (block.type === "timeline") children.forEach((child, index) => {
        const date = child?.props?.date;
        if (!isIsoTimelineDate(date)) issue("INVALID_TIMELINE_DATE", `/children/${index}/props/date`, "Each timeline event requires a valid ISO date or datetime.", "Use YYYY-MM-DD or an ISO 8601 datetime.");
      });
    }
    if (block.type === "flashcards") {
      const cards = props.cards;
      if (!Array.isArray(cards) || cards.length < 1 || cards.length > 500) issue("INVALID_FLASHCARDS", "/cards", "Flashcards require 1–500 card records.", "Provide stable card IDs and non-empty front/back text.");
      const cardIds = new Set();
      for (const [index, card] of (Array.isArray(cards) ? cards : []).entries()) {
        if (!card || typeof card !== "object" || Array.isArray(card) || typeof card.id !== "string" || !ID_PATTERN.test(card.id) || typeof card.front !== "string" || !card.front.trim() || typeof card.back !== "string" || !card.back.trim()) issue("INVALID_FLASHCARD", `/cards/${index}`, "Each card requires a canonical ID and non-empty front and back text.", "Use {id,front,back} with readable text.");
        else if (cardIds.has(card.id)) issue("DUPLICATE_FLASHCARD_ID", `/cards/${index}/id`, "Flashcard IDs must be unique within this deck.", "Assign each card a distinct stable ID.");
        else cardIds.add(card.id);
      }
    }
    if (block.type === "progress") {
      numberField("max", Number.MIN_VALUE, 1_000_000);
      numberField("value", 0, props.max ?? 1_000_000);
      const valueDefinition = article.initialState?.[block.bindings?.value];
      if (block.bindings?.value && (!valueDefinition || !["number", "integer"].includes(valueDefinition.type))) issue("INVALID_PROGRESS_STATE", "/bindings/value", "Progress value must bind to a declared numeric state variable.", "Bind it to a number/integer variable bounded between zero and max.");
      if (block.bindings?.value && valueDefinition && ["number", "integer"].includes(valueDefinition.type)) {
        const maximum = props.max ?? 100;
        if (!Number.isFinite(valueDefinition.min) || !Number.isFinite(valueDefinition.max) || valueDefinition.min < 0 || valueDefinition.max > maximum) issue("INVALID_PROGRESS_BOUNDS", "/bindings/value", "Progress state must declare numeric bounds within zero and the widget maximum.", "Set state min to at least zero and max no greater than props.max.");
      }
      if (!block.bindings?.value && (typeof props.value !== "number" || !Number.isFinite(props.value))) issue("MISSING_PROGRESS_VALUE", "/value", "Progress requires a numeric value or state binding.", "Provide props.value or bindings.value.");
    }
    if (block.type === "guidedComparison") {
      const scenarios = props.scenarios;
      if (!Array.isArray(scenarios) || scenarios.length < 2 || scenarios.length > 50) issue("INVALID_GUIDED_SCENARIOS", "/scenarios", "Guided comparison requires 2–50 scenarios.", "Provide labeled scenarios with two sides and a rationale.");
      const scenarioIds = new Set();
      for (const [index, scenario] of (Array.isArray(scenarios) ? scenarios : []).entries()) {
        if (!scenario || typeof scenario !== "object" || Array.isArray(scenario) || typeof scenario.id !== "string" || !ID_PATTERN.test(scenario.id) || typeof scenario.label !== "string" || !scenario.label.trim() || typeof scenario.rationale !== "string" || !scenario.rationale.trim()) issue("INVALID_GUIDED_SCENARIO", `/scenarios/${index}`, "Each scenario requires a stable ID, label, and explanatory rationale.", "Provide {id,label,left,right,rationale}.");
        else if (scenarioIds.has(scenario.id)) issue("DUPLICATE_GUIDED_SCENARIO_ID", `/scenarios/${index}/id`, "Guided scenario IDs must be unique.", "Assign each scenario a distinct stable ID.");
        else scenarioIds.add(scenario.id);
        for (const side of ["left", "right"]) {
          const panel = scenario?.[side];
          if (!panel || typeof panel !== "object" || Array.isArray(panel) || typeof panel.label !== "string" || !panel.label.trim() || !scalar(panel.value)) issue("INVALID_GUIDED_COMPARISON_PANEL", `/scenarios/${index}/${side}`, "Each scenario side requires a readable label and scalar value.", "Use {label,value} for both comparison sides.");
        }
      }
      if (block.bindings?.selected) {
        const selection = article.initialState?.[block.bindings.selected];
        if (!selection || selection.type !== "enum" || [...scenarioIds].some((id) => !selection.values?.includes(id))) issue("INVALID_GUIDED_SELECTION_STATE", "/bindings/selected", "Guided scenario selection must be an enum containing every scenario ID.", "Declare a mutable enum containing all stable scenario IDs.");
      }
    }
    if (["slider", "input"].includes(block.type)) {
      if (props.required !== undefined && typeof props.required !== "boolean") issue("INVALID_WIDGET_REQUIRED", "/required", "Control required must be boolean.", "Use true or false.");
      for (const field of ["min", "max", "step"]) numberField(field, field === "step" ? Number.MIN_VALUE : undefined);
      if (props.min !== undefined && props.max !== undefined && props.min > props.max) issue("INVALID_WIDGET_BOUND", "", "Control min cannot exceed max.", "Correct the numeric interval.");
      for (const field of ["minLength", "maxLength"]) if (props[field] !== undefined && (!Number.isInteger(props[field]) || props[field] < 0 || props[field] > 100000)) issue("INVALID_WIDGET_LENGTH", `/${field}`, `${field} must be a bounded non-negative integer.`, "Use a whole number from 0 to 100000.");
      if (props.minLength !== undefined && props.maxLength !== undefined && props.minLength > props.maxLength) issue("INVALID_WIDGET_LENGTH", "", "Control minLength cannot exceed maxLength.", "Correct the allowed length interval.");
      if (props.inputType !== undefined && !["text", "number", "date", "email"].includes(props.inputType)) issue("INVALID_WIDGET_INPUT_TYPE", "/inputType", "Input type is not supported by the safe control renderer.", "Use text, number, date, or email.");
      const inputDefinition = article.initialState?.[block.bindings?.value];
      if (block.type === "input" && inputDefinition && props.inputType === "number" && !["number", "integer"].includes(inputDefinition.type)) issue("INPUT_STATE_TYPE_MISMATCH", "/bindings/value", "A number input must bind to numeric article state.", "Bind it to a number/integer state variable or use a text input.");
      if (block.type === "input" && inputDefinition && ["date", "email"].includes(props.inputType) && inputDefinition.type !== "string") issue("INPUT_STATE_TYPE_MISMATCH", "/bindings/value", "Date and email inputs must bind to string article state.", "Bind them to a string state variable.");
      if (inputDefinition && ["number", "integer"].includes(props.validation?.type) && !["number", "integer"].includes(inputDefinition.type)) issue("INPUT_STATE_TYPE_MISMATCH", "/validation/type", "Numeric validation must bind to numeric article state.", "Use numeric state or remove the numeric validation override.");
      if (inputDefinition && props.validation?.type === "boolean" && inputDefinition.type !== "boolean") issue("INPUT_STATE_TYPE_MISMATCH", "/validation/type", "Boolean validation must bind to boolean article state.", "Use boolean state or remove the boolean validation override.");
      if (props.validation !== undefined) {
        if (!props.validation || typeof props.validation !== "object" || Array.isArray(props.validation)) issue("INVALID_WIDGET_VALIDATION", "/validation", "Control validation must be a declarative object.", "Use only required/type/min/max/minLength/maxLength/values fields.");
        else {
          const allowed = new Set(["required", "type", "min", "max", "minLength", "maxLength", "values"]);
          for (const key of Object.keys(props.validation)) if (!allowed.has(key)) issue("UNKNOWN_WIDGET_VALIDATION_FIELD", `/validation/${key}`, `Validation field "${key}" is not supported.`, "Remove the field or use the documented validation contract.");
          if (props.validation.required !== undefined && typeof props.validation.required !== "boolean") issue("INVALID_WIDGET_REQUIRED", "/validation/required", "Validation required must be boolean.", "Use true or false.");
          if (props.validation.type !== undefined && !["string", "text", "number", "integer", "enum", "boolean", "date", "email"].includes(props.validation.type)) issue("INVALID_WIDGET_VALIDATION_TYPE", "/validation/type", "Validation type is not supported.", "Use string, number, integer, enum, boolean, date, or email.");
          for (const field of ["min", "max"]) if (props.validation[field] !== undefined && (typeof props.validation[field] !== "number" || !Number.isFinite(props.validation[field]))) issue("INVALID_WIDGET_BOUND", `/validation/${field}`, `Validation ${field} must be finite.`, "Provide a finite numeric bound.");
          if (props.validation.min !== undefined && props.validation.max !== undefined && props.validation.min > props.validation.max) issue("INVALID_WIDGET_BOUND", "/validation", "Validation min cannot exceed max.", "Correct the numeric interval.");
          for (const field of ["minLength", "maxLength"]) if (props.validation[field] !== undefined && (!Number.isInteger(props.validation[field]) || props.validation[field] < 0 || props.validation[field] > 100000)) issue("INVALID_WIDGET_LENGTH", `/validation/${field}`, `Validation ${field} must be a bounded non-negative integer.`, "Use a whole number from 0 to 100000.");
          if (props.validation.minLength !== undefined && props.validation.maxLength !== undefined && props.validation.minLength > props.validation.maxLength) issue("INVALID_WIDGET_LENGTH", "/validation", "Validation minLength cannot exceed maxLength.", "Correct the allowed length interval.");
          if (props.validation.values !== undefined) {
            const values = props.validation.values;
            if (!Array.isArray(values) || values.length === 0 || values.length > 256 || values.some((value) => value === null || !scalar(value))) issue("INVALID_WIDGET_VALUES", "/validation/values", "Validation values must be a non-empty bounded scalar array.", "Provide 1–256 string, number, or boolean values.");
            else if (new Set(values.map((value) => `${typeof value}:${String(value)}`)).size !== values.length) issue("DUPLICATE_WIDGET_VALUES", "/validation/values", "Validation values must be unique.", "Remove duplicate values.");
            if (props.validation.type !== undefined && props.validation.type !== "enum") issue("UNEXPECTED_WIDGET_VALUES", "/validation/values", "Validation values are only valid for enum controls.", "Set validation.type to enum or remove values.");
          }
          if (props.validation.type === "enum" && props.validation.values === undefined && !(inputDefinition?.type === "enum" && Array.isArray(inputDefinition.values))) issue("MISSING_WIDGET_VALUES", "/validation/values", "Enum validation requires declared values.", "Provide values or bind to an enum state variable.");
        }
      }
    }
    if (block.type === "select") {
      const options = props.options;
      if (!Array.isArray(options) || options.length === 0 || options.length > 256) issue("INVALID_WIDGET_OPTIONS", "/options", "Select requires 1–256 options.", "Provide a bounded options array with unique scalar values and readable labels.");
      else {
        const seen = new Set();
        options.forEach((option, index) => {
          const value = option && typeof option === "object" && !Array.isArray(option) ? option.value ?? option.id : option;
          const label = option && typeof option === "object" && !Array.isArray(option) ? option.label ?? value : value;
          if (value === null || !scalar(value) || typeof label !== "string" && typeof label !== "number") issue("INVALID_WIDGET_OPTION", `/options/${index}`, "Select options require a non-null scalar value and readable label.", "Use a primitive option or {value,label} object.");
          const token = `${typeof value}:${String(value)}`;
          if (seen.has(token)) issue("DUPLICATE_WIDGET_OPTION", `/options/${index}`, "Select option values must be unique.", "Use a distinct stable value for every option.");
          seen.add(token);
        });
      }
    }
    if (block.type === "smartTable") {
      const columns = props.columns;
      const rows = props.rows;
      if (!Array.isArray(columns) || columns.length === 0 || columns.length > 100) issue("INVALID_TABLE_COLUMNS", "/columns", "Smart table requires 1–100 columns.", "Provide columns with unique id, label, and optional type.");
      else {
        const seen = new Set();
        columns.forEach((column, index) => {
          const columnId = column?.id ?? column?.key;
          if (!column || typeof column !== "object" || Array.isArray(column) || typeof columnId !== "string" || !ID_PATTERN.test(columnId) || typeof column.label !== "string" || !column.label.trim()) issue("INVALID_TABLE_COLUMN", `/columns/${index}`, "Each column requires a canonical id/key and non-empty label.", "Use the frozen v1 {key,label} or {id,label,type?} form with a stable lowercase identifier.");
          else if (column.id !== undefined && column.key !== undefined && column.id !== column.key) issue("CONFLICTING_TABLE_COLUMN_ID", `/columns/${index}`, "A table column's id and key aliases must agree.", "Use one identifier or give both aliases the same value.");
          else if (seen.has(columnId)) issue("DUPLICATE_TABLE_COLUMN", `/columns/${index}/id`, "Smart-table column ids must be unique.", "Give each column a distinct stable id.");
          else seen.add(columnId);
          if (column?.type !== undefined && !["string", "number", "date"].includes(column.type)) issue("INVALID_TABLE_COLUMN_TYPE", `/columns/${index}/type`, "Column type must be string, number, or date.", "Choose a supported cell type.");
        });
      }
      if (!Array.isArray(rows) || rows.length > 10000) issue("INVALID_TABLE_ROWS", "/rows", "Smart table requires at most 10000 rows.", "Provide a bounded rows array.");
      else rows.forEach((row, index) => {
        if (!row || typeof row !== "object" || Array.isArray(row)) issue("INVALID_TABLE_ROW", `/rows/${index}`, "Each row must be a plain record of scalar cells.", "Use a JSON object keyed by column id.");
        else for (const [key, value] of Object.entries(row)) if (!scalar(value)) issue("INVALID_TABLE_CELL", `/rows/${index}/${key}`, "Table cells must be null or finite scalar values.", "Use string, number, boolean, or null cell values.");
      });
      if (props.pageSize !== undefined && (!Number.isInteger(props.pageSize) || props.pageSize < 1 || props.pageSize > 100)) issue("INVALID_TABLE_PAGE_SIZE", "/pageSize", "Smart-table pageSize must be an integer from 1 to 100.", "Choose a bounded page size.");
      if (props.filters !== undefined && (!Array.isArray(props.filters) || props.filters.length > 32)) issue("INVALID_TABLE_FILTERS", "/filters", "Smart-table filters must be a bounded array.", "Provide at most 32 filter definitions.");
      const filteredColumns = new Set();
      for (const [index, filter] of (Array.isArray(props.filters) ? props.filters : []).entries()) {
        if (!filter || !columns?.some((column) => (column.id ?? column.key) === filter.columnId) || !Array.isArray(filter.options) || filter.options.length === 0 || filter.options.length > 100) issue("INVALID_TABLE_FILTER", `/filters/${index}`, "Table filters must target a column and provide a non-empty bounded options array.", "Use {columnId,label,options:[{value,label}]}.");
        else {
          if (filteredColumns.has(filter.columnId)) issue("DUPLICATE_TABLE_FILTER_COLUMN", `/filters/${index}/columnId`, "A smart table may declare only one filter per column.", "Combine the values into one filter for this column.");
          filteredColumns.add(filter.columnId);
          const optionValues = new Set();
          filter.options.forEach((option, optionIndex) => {
            if (!option || typeof option !== "object" || Array.isArray(option) || option.value === null || !scalar(option.value) || option.label !== undefined && typeof option.label !== "string") issue("INVALID_TABLE_FILTER_OPTION", `/filters/${index}/options/${optionIndex}`, "Table filter options require non-null scalar values and optional text labels.", "Use {value,label?} records.");
            else { const token = `${typeof option.value}:${String(option.value)}`; if (optionValues.has(token)) issue("DUPLICATE_TABLE_FILTER_OPTION", `/filters/${index}/options/${optionIndex}/value`, "Table filter option values must be unique.", "Use distinct scalar values."); optionValues.add(token); }
          });
        }
      }
    }
    if (block.type === "calculator") {
      if (!Array.isArray(props.inputs) || props.inputs.length === 0 || props.inputs.length > 20) issue("INVALID_CALCULATOR_INPUTS", "/inputs", "Calculator requires 1–20 numeric inputs.", "Declare bounded numeric state variables with labels.");
      else props.inputs.forEach((input, index) => {
        const definition = article.initialState?.[input?.variable];
        if (!input || typeof input.variable !== "string" || !definition || !["number", "integer"].includes(definition.type) || typeof input.label !== "string" || !input.label.trim()) issue("INVALID_CALCULATOR_INPUT", `/inputs/${index}`, "Calculator inputs must name a declared numeric state variable and a label.", "Declare a number/integer in initialState and reference it by variable id.");
        if (input?.min !== undefined && (typeof input.min !== "number" || !Number.isFinite(input.min)) || input?.max !== undefined && (typeof input.max !== "number" || !Number.isFinite(input.max))) issue("INVALID_CALCULATOR_INPUT_BOUND", `/inputs/${index}`, "Calculator input bounds must be finite.", "Use finite numeric min/max values.");
      });
      if (props.expression === undefined) issue("MISSING_CALCULATOR_EXPRESSION", "/expression", "Calculator requires a safe expression AST.", "Use the fixed article expression operators; do not provide source code.");
      else collectExpressionReferences(props.expression, `${path}/props/expression`, stateNames, derivedNames, new Set(), errors, sourceMap);
      numberField("resultMin"); numberField("resultMax");
      if (props.resultMin !== undefined && props.resultMax !== undefined && props.resultMin > props.resultMax) issue("INVALID_CALCULATOR_RESULT_BOUNDS", "", "resultMin cannot exceed resultMax.", "Correct the result range.");
    }
    if (block.type === "comparison") {
      if (props.mode !== undefined && !["side-by-side", "overlay"].includes(props.mode)) issue("INVALID_COMPARISON_MODE", "/mode", "Comparison mode must be side-by-side or overlay.", "Choose a supported responsive presentation.");
      for (const side of ["left", "right"]) {
        const item = props[side];
        if (!item || typeof item !== "object" || Array.isArray(item) || typeof item.label !== "string" || !item.label.trim()) issue("INVALID_COMPARISON_PANEL", `/${side}`, `Comparison ${side} panel requires a label.`, "Provide a labeled panel and either a scalar value or a binding.");
        else if (!scalar(item.value) && !block.bindings?.[side]) issue("MISSING_COMPARISON_VALUE", `/${side}/value`, `Comparison ${side} panel requires a scalar value or binding.`, `Set props.${side}.value or bindings.${side}.`);
      }
      if (props.mode === "overlay") numberField("position", 0, 100);
      const positionDefinition = article.initialState?.[block.bindings?.position];
      if (block.bindings?.position && positionDefinition && !["number", "integer"].includes(positionDefinition.type)) issue("INVALID_COMPARISON_POSITION_STATE", "/bindings/position", "Comparison position must bind to numeric state.", "Bind position to a number/integer variable bounded from 0 to 100.");
    }
    if (block.type === "filter") {
      const filterDefinition = article.initialState?.[block.bindings?.value];
      if (!block.bindings?.value || !filterDefinition) issue("MISSING_FILTER_STATE", "/bindings/value", "A filter must bind to a mutable article state variable.", "Declare initialState and bind its value property.");
      else if (filterDefinition.type !== "enum") issue("INVALID_FILTER_STATE_TYPE", "/bindings/value", "A filter must bind to enum state so selected values remain type-safe.", "Declare an enum with the filter's allowed scalar values.");
      if (!Array.isArray(props.options) || props.options.length === 0 || props.options.length > 100) issue("INVALID_FILTER_OPTIONS", "/options", "A data filter requires 1–100 options.", "Provide stable scalar values and readable labels.");
      else {
        const seen = new Set();
        props.options.forEach((option, index) => {
          if (!option || typeof option !== "object" || Array.isArray(option) || option.value === null || !scalar(option.value) || typeof option.label !== "string" || !option.label.trim()) issue("INVALID_FILTER_OPTION", `/options/${index}`, "Filter options require a non-null scalar value and non-empty label.", "Use {value,label} objects.");
          else {
            const token = `${typeof option.value}:${String(option.value)}`;
            if (seen.has(token)) issue("DUPLICATE_FILTER_OPTION", `/options/${index}/value`, "Filter values must be unique.", "Use distinct filter values.");
            seen.add(token);
            if (filterDefinition?.type === "enum" && !filterDefinition.values.some((value) => Object.is(value, option.value))) issue("UNKNOWN_FILTER_OPTION_VALUE", `/options/${index}/value`, "Filter values must belong to the bound enum.", "Add the option to the enum or remove it from the filter.");
          }
        });
      }
    }
    if (block.type === "card" && block.bindings?.selected) {
      const selection = article.initialState?.[block.bindings.selected];
      if (!selection) issue("UNKNOWN_CARD_SELECTION_STATE", "/bindings/selected", "Selectable cards must bind to a declared mutable state variable.", "Declare the selection variable in initialState.");
      else if (selection.type !== "enum" || !selection.values?.includes(block.id)) issue("INVALID_CARD_SELECTION_STATE", "/bindings/selected", "Card selection requires an enum that includes this card's stable ID.", "Declare an enum containing every selectable card ID in this group.");
    }
    for (const [property, variable] of Object.entries(block.bindings ?? {})) {
      if (!["filter", "calculator", "comparison", "card", "stepper", "timeline", "progress", "guidedComparison", "legacyViz", "knowledgeMap"].includes(block.type)) continue;
      if (!stateNames.has(variable) && !derivedNames.has(variable)) issue("UNKNOWN_WIDGET_BINDING", `/bindings/${property}`, `Widget binding references unknown state or derived value "${variable}".`, "Declare the state/derived value or correct the binding.");
    }
  }
  for (let index = 0; index < (article.assets ?? []).length; index += 1) addId(article.assets[index]?.id, `/assets/${index}/id`);
  function inspectBlock(block, path) {
    if (!block || typeof block !== "object") return;
    addId(block.id, `${path}/id`);
    if (!BLOCK_TYPES.has(block.type)) return;
    if (block.type !== "code") {
      validateContentLinks(block.content, `${path}/content`, errors, sourceMap);
      if (typeof block.content === "string") for (const match of block.content.matchAll(/\]\(\s*#([^\s)]+)/g)) {
        let fragment;
        try { fragment = decodeURIComponent(match[1].split(/[?#]/, 1)[0]); } catch { continue; }
        if (fragment && !targetIds.has(fragment)) addIssue(errors, sourceMap, "UNKNOWN_INTERNAL_LINK_TARGET", `${path}/content`, `In-article link target "${fragment}" does not identify a declared section or block.`, "Link to an existing canonical section/block ID or use a host-approved route action for another article.");
      }
    }
    validateDeclaredReferences(block.props, `${path}/props`, errors, sourceMap);
    validateWidgetProps(block, path);
    if (["simulator2d", "model3d", "map", "mathGraph", "physicsExperiment", "chemistry", "anatomy", "animationTimeline"].includes(block.type)) {
      for (const issue of validateScientificBlock(block)) {
        addIssue(errors, sourceMap, issue.code, `${path}/props${issue.path}`, issue.message, issue.fixHint);
      }
    }
    if (block.props && typeof block.props === "object") {
      if (typeof block.props.assetId === "string" && !assetIds.has(block.props.assetId)) addIssue(errors, sourceMap, "UNKNOWN_ASSET_REFERENCE", `${path}/props/assetId`, `Asset "${block.props.assetId}" is not declared in the article manifest.`, "Declare the asset or correct its ID.");
      if (typeof block.props.assetId === "string") {
        const asset = (article.assets ?? []).find((candidate) => candidate.id === block.props.assetId);
        const expected = block.type === "audio" ? "audio/" : block.type === "video" ? "video/" : block.type === "figure" ? "image/" : "";
        if (asset && expected && !asset.type?.toLowerCase().startsWith(expected)) addIssue(errors, sourceMap, "INVALID_MEDIA_ASSET_TYPE", `${path}/props/assetId`, `${block.type} blocks require an asset with a ${expected} media type.`, `Use a declared ${expected.slice(0, -1)} asset or choose a matching block type.`);
      }
      if (block.type === "legacyViz") {
        if (block.props.spec !== undefined) {
          let validation;
          try { validation = RichViz.validate(JSON.stringify(block.props.spec)); } catch { validation = { ok: false, errors: [] }; }
          if (!validation?.ok) addIssue(errors, sourceMap, "INVALID_LEGACY_VIZ", `${path}/props/spec`, "legacyViz spec failed the preserved RichViz v1 validator.", "Provide a valid RichViz v1 spec; do not rewrite legacy visualization input as executable code.");
          else for (const [binding, variable] of Object.entries(block.bindings ?? {})) if (binding.startsWith("data.")) {
            const parts = binding.slice(5).split(".");
            let target = validation.spec?.data;
            const validPath = parts.length > 0 && parts.every((part) => /^(?:[A-Za-z][A-Za-z0-9_-]*|0|[1-9][0-9]*)$/.test(part) && !["__proto__", "prototype", "constructor"].includes(part));
            if (validPath) for (const part of parts) {
              if (!target || typeof target !== "object" || !Object.hasOwn(target, part)) { target = undefined; break; }
              target = target[part];
            }
            if (!validPath || target === undefined || target !== null && typeof target === "object") addIssue(errors, sourceMap, "INVALID_VIZ_BINDING_PATH", `${path}/bindings/${binding}`, "Visualization data bindings must target an existing primitive path under spec.data.", "Bind an existing data value, for example data.metrics.0.value; keep engine and structural fields static.");
            else {
              const initial = article.initialState?.[variable]?.value;
              if (article.initialState?.[variable] && (initial === null ? target !== null : typeof initial !== typeof target)) addIssue(errors, sourceMap, "VIZ_BINDING_TYPE_MISMATCH", `${path}/bindings/${binding}`, "Visualization data binding must preserve the declared scalar type.", "Bind a number to a numeric value, string to string, boolean to boolean, or matching null value.");
            }
          }
        } else if (typeof block.props.vizType !== "string" || !LEGACY_TYPES.has(block.props.vizType)) addIssue(errors, sourceMap, "INVALID_LEGACY_VIZ_TYPE", `${path}/props/vizType`, "legacyViz requires a registered RichViz type or a validated v1 spec.", "Use a registered legacy visualization type or provide its validated spec.");
      }
    }
    for (const [eventName, action] of Object.entries(block.events ?? {})) {
      validateAction(action, `${path}/events/${eventName}`, article, assetIds, errors, sourceMap);
      if (["openDialog", "closeDialog"].includes(action?.action) && targetTypes.get(action.targetId) !== "dialog") addIssue(errors, sourceMap, "INVALID_DIALOG_TARGET", `${path}/events/${eventName}/targetId`, "Dialog actions must target a declared dialog block.", "Use the canonical ID of a dialog block.");
    }
    (block.children ?? []).forEach((child, index) => inspectBlock(child, `${path}/children/${index}`));
  }
  for (let sectionIndex = 0; sectionIndex < (article.sections ?? []).length; sectionIndex += 1) {
    const section = article.sections[sectionIndex];
    addId(section?.id, `/sections/${sectionIndex}/id`);
    (section?.blocks ?? []).forEach((block, blockIndex) => inspectBlock(block, `/sections/${sectionIndex}/blocks/${blockIndex}`));
  }
}

function checkUnsafeProps(value, path, errors, sourceMap, depth = 0) {
  if (!value || typeof value !== "object" || depth > MAX_DEPTH) return;
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`;
    if (UNSAFE_PROPERTY.test(key) || EVENT_HANDLER_PROPERTY.test(key)) addIssue(errors, sourceMap, "UNSAFE_PROPERTY", childPath, `Property "${key}" is not allowed in declarative article data.`, "Represent readable markup as text and behavior through the validated action vocabulary.");
    else checkUnsafeProps(child, childPath, errors, sourceMap, depth + 1);
  }
}

function validateSemantics(article, errors, sourceMap, options) {
  if (typeof article.summary === "string" && article.summary.trim().length < 24) addIssue(errors, sourceMap, "MISSING_STATIC_NARRATIVE", "/summary", "Article summary must contain at least 24 non-whitespace characters for a useful static fallback.", "Write a concise explanation that remains meaningful without JavaScript.");
  if (Array.isArray(article.metadata?.supportedLocales) && !article.metadata.supportedLocales.includes(article.locale)) addIssue(errors, sourceMap, "PRIMARY_LOCALE_NOT_SUPPORTED", "/metadata/supportedLocales", "The article locale must be included in supportedLocales.", "Add the primary locale to supportedLocales.");
  const assetIds = validateResourceManifest(article, errors, sourceMap, options);
  validateDeclaredReferences(article.metadata?.sources, "/metadata/sources", errors, sourceMap);
  validateStateVariables(article, errors, sourceMap);
  validateDerived(article, errors, sourceMap);
  for (let index = 0; index < (article.sections ?? []).length; index += 1) {
    const section = article.sections[index];
    for (let blockIndex = 0; blockIndex < (section?.blocks ?? []).length; blockIndex += 1) checkUnsafeProps(section.blocks[blockIndex], `/sections/${index}/blocks/${blockIndex}`, errors, sourceMap);
  }
  validateBlocks(article, assetIds, errors, sourceMap);
}

function markdownId(text, prefix) {
  return `${prefix}-${hashToken(text)}`;
}

function makeSectionId(heading, explicitId, line) {
  if (explicitId) return explicitId;
  const slug = heading.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64);
  return slug ? `section-${slug}` : `section-${hashToken(heading)}`;
}

function markdownBody(records, article, sourceMap, errors) {
  const sections = [];
  let current;
  let generatedBlocks = 0;
  let blockLimitReported = false;
  let sectionLimitReported = false;
  let paragraphLines = [];
  let paragraphStart = 0;
  const sectionMap = new Map();
  function startSection(heading, id, line) {
    if (sections.length >= 256) {
      if (!sectionLimitReported) {
        sectionLimitReported = true;
        addIssue(errors, sourceMap, "MARKDOWN_SECTION_LIMIT_EXCEEDED", "", "Markdown article exceeds the 256 generated section limit.", "Reduce the number of top-level headings.", { line, column: 1 });
      }
      current = sections.at(-1);
      return;
    }
    current = { id: makeSectionId(heading, id, line), heading, blocks: [] };
    sections.push(current);
    sectionMap.set(sections.length - 1, sourceLocation("", 0, line));
  }
  function ensureSection(line) {
    if (!current) startSection(article.title, "markdown-body", line);
  }
  function addBlock(block, line) {
    ensureSection(line);
    if (generatedBlocks >= 10_000) {
      if (!blockLimitReported) {
        blockLimitReported = true;
        addIssue(errors, sourceMap, "MARKDOWN_BLOCK_LIMIT_EXCEEDED", "", "Markdown article exceeds the 10000 generated block limit.", "Reduce the number of headings and content blocks.", { line, column: 1 });
      }
      return;
    }
    const index = current.blocks.length;
    current.blocks.push(block);
    generatedBlocks += 1;
    const sectionIndex = sections.length - 1;
    sourceMap.set(`/sections/${(article.sections?.length ?? 0) + sectionIndex}/blocks/${index}`, { line, column: 1 });
  }
  function flushParagraph() {
    if (!paragraphLines.length) return;
    const rawContent = paragraphLines.map((record) => record.text).join("\n").trim();
    const anchor = rawContent.match(/\s+\{#([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\}$/);
    const content = anchor ? rawContent.slice(0, anchor.index).trim() : rawContent;
    if (content) addBlock({ id: anchor?.[1] ?? markdownId(content, "paragraph"), type: "paragraph", content }, paragraphStart);
    paragraphLines = [];
  }
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const line = record.text;
    if (/^\s*```/.test(line)) {
      flushParagraph();
      const fence = line.match(/^\s*```([A-Za-z0-9_-]*)(?:\s+\{#([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\})?\s*$/);
      if (!fence) {
        addIssue(errors, sourceMap, "INVALID_MARKDOWN_FENCE", "", "Markdown fence header is not in the supported portable form.", "Use a simple fenced block, ```edu-viz, or ```intui-article {#optional-id}.", { line: record.line, column: 1 });
        continue;
      }
      const language = fence[1] ?? "";
      const body = [];
      const startLine = record.line;
      let closed = false;
      while (++index < records.length) {
        if (/^\s*```+\s*$/.test(records[index].text)) { closed = true; break; }
        body.push(records[index].text);
      }
      if (!closed) {
        addIssue(errors, sourceMap, "UNCLOSED_MARKDOWN_FENCE", "", "Markdown code fence has no closing delimiter.", "Add a closing triple-backtick line.", { line: startLine, column: 1 });
        break;
      }
      const content = body.join("\n");
      if (language === "intui-article") {
        addIssue(errors, sourceMap, "DUPLICATE_ARTICLE_MANIFEST", "", "A Markdown article may contain only one intui-article manifest fence.", "Keep the single article manifest at the document boundary.", { line: startLine, column: 1 });
      } else if (language === "edu-viz") {
        const legacyResult = RichViz.validate(content);
        if (!legacyResult?.ok) addIssue(errors, sourceMap, "INVALID_LEGACY_VIZ", "", "edu-viz fence failed the preserved RichViz v1 validator.", "Correct the fence JSON/spec according to RichViz v1; it will not be executed or silently converted.", { line: startLine, column: 1 });
        else addBlock({ id: fence[2] ?? markdownId(content, "legacy-viz"), type: "legacyViz", props: { spec: omitUndefined(legacyResult.spec) } }, startLine);
      } else {
        const props = language ? { language } : {};
        addBlock({ id: fence[2] ?? markdownId(content, "code"), type: "code", content, ...(Object.keys(props).length ? { props } : {}) }, startLine);
      }
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const rawHeading = heading[2].trim();
      const anchor = rawHeading.match(/\s+\{#([a-z][a-z0-9]*(?:-[a-z0-9]+)*)\}$/);
      const text = anchor ? rawHeading.slice(0, anchor.index).trim() : rawHeading;
      if (!text) {
        addIssue(errors, sourceMap, "EMPTY_MARKDOWN_HEADING", "", "Markdown headings must contain visible text.", "Add a heading label.", { line: record.line, column: 1 });
        continue;
      }
      if (level === 1) startSection(text, anchor?.[1], record.line);
      else {
        ensureSection(record.line);
        addBlock({ id: anchor?.[1] ?? markdownId(text, "heading"), type: "heading", content: text, props: { level } }, record.line);
      }
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      continue;
    }
    if (!paragraphLines.length) paragraphStart = record.line;
    paragraphLines.push(record);
  }
  flushParagraph();
  for (let index = 0; index < sections.length; index += 1) sourceMap.set(`/sections/${(article.sections?.length ?? 0) + index}`, sectionMap.get(index));
  return sections;
}

function parseMarkdownArticle(source) {
  let lineCount = 1;
  for (const character of source) if (character === "\n") lineCount += 1;
  if (lineCount > MAX_MARKDOWN_LINES) {
    const errors = [];
    addIssue(errors, undefined, "MARKDOWN_LINE_LIMIT_EXCEEDED", "", `Markdown article exceeds the ${MAX_MARKDOWN_LINES} line limit.`, "Reduce line count before parsing the Markdown body.", { line: 1, column: 1 });
    return { errors, sourceMap: new Map() };
  }
  const lines = source.split(/\r?\n/);
  const starts = [];
  for (let index = 0; index < lines.length; index += 1) if (/^\s*```intui-article\s*$/.test(lines[index])) starts.push(index);
  if (starts.length !== 1) {
    const line = starts.length ? starts[1] + 1 : 1;
    const errors = [];
    addIssue(errors, undefined, starts.length ? "DUPLICATE_ARTICLE_MANIFEST" : "MISSING_ARTICLE_MANIFEST", "", starts.length ? "Markdown source contains more than one intui-article manifest." : "Markdown article source requires one intui-article JSON manifest fence.", "Add exactly one ```intui-article fenced JSON envelope; plain Markdown is not treated as executable or self-describing article metadata.", { line, column: 1 });
    return { errors, sourceMap: new Map() };
  }
  const start = starts[0];
  let end = -1;
  for (let index = start + 1; index < lines.length; index += 1) if (/^\s*```+\s*$/.test(lines[index])) { end = index; break; }
  if (end < 0) {
    const errors = [];
    addIssue(errors, undefined, "UNCLOSED_ARTICLE_MANIFEST", "", "intui-article manifest fence has no closing delimiter.", "Close the manifest fence with a line containing triple backticks.", { line: start + 1, column: 1 });
    return { errors, sourceMap: new Map() };
  }
  const manifestText = lines.slice(start + 1, end).join("\n");
  const parsed = parseJsonText(manifestText, start + 2);
  if (parsed.errors.length) return parsed;
  if (!parsed.value || typeof parsed.value !== "object" || Array.isArray(parsed.value)) {
    const errors = [];
    addIssue(errors, parsed.sourceMap, "INVALID_MANIFEST", "", "intui-article manifest must be one JSON object.", "Provide a portable article envelope object.");
    return { errors, sourceMap: parsed.sourceMap };
  }
  const article = parsed.value;
  const records = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (index >= start && index <= end) continue;
    records.push({ text: lines[index], line: index + 1 });
  }
  const errors = parsed.errors;
  const bodySections = markdownBody(records, article, parsed.sourceMap, errors);
  if (!Array.isArray(article.sections)) article.sections = [];
  article.sections.push(...bodySections);
  return { value: article, errors, sourceMap: parsed.sourceMap };
}

function inputToArticle(input) {
  if (typeof input !== "string") return { value: input, sourceMap: new Map(), errors: [] };
  if (input.length > MAX_SOURCE_LENGTH) {
    const errors = [];
    addIssue(errors, undefined, "SOURCE_TOO_LARGE", "", `Article source exceeds ${MAX_SOURCE_LENGTH} characters.`, "Split the article or reduce its embedded content.", sourceLocation(input, 0));
    return { errors, sourceMap: new Map() };
  }
  const trimmed = input.trimStart();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return parseJsonText(input, 1);
  return parseMarkdownArticle(input);
}

function validateDocument(article, sourceMap, errors, options) {
  if (errors.length) return resultFailure(errors, sourceMap);
  if (!article || typeof article !== "object" || Array.isArray(article)) {
    addIssue(errors, sourceMap, "INVALID_ARTICLE", "", "An article must be a plain object envelope.", "Provide the intui.article v1 object or its documented Markdown representation.");
    return resultFailure(errors, sourceMap);
  }
  if (article.schemaVersion !== ARTICLE_SCHEMA_VERSION) {
    addIssue(errors, sourceMap, "UNSUPPORTED_SCHEMA_VERSION", "/schemaVersion", `No migration is registered for article schema version ${String(article.schemaVersion)}.`, `Use schemaVersion ${ARTICLE_SCHEMA_VERSION}; add a tested migration before accepting a different version.`);
    return resultFailure(errors, sourceMap);
  }
  validateSchema(article, ARTICLE_V1_SCHEMA, "", errors, sourceMap);
  validateSemantics(article, errors, sourceMap, options);
  return errors.length ? resultFailure(errors, sourceMap) : resultSuccess(article, sourceMap);
}

/** Parse/normalize JSON text, the documented Markdown form, and plain JS objects through one validation path. */
export function validateArticle(input, options = {}) {
  const parsed = inputToArticle(input);
  const errors = [...(parsed.errors ?? [])];
  const sourceMap = parsed.sourceMap ?? new Map();
  if (errors.length) return resultFailure(errors, sourceMap);
  const context = { errors, sourceMap, active: new WeakSet(), nodes: 0, stringLength: 0, totalStringLimitReported: false };
  const normalized = safeClone(parsed.value, context);
  if (errors.length) return resultFailure(errors, sourceMap);
  return validateDocument(normalized, sourceMap, errors, options);
}

/** Version dispatcher: v1 is normalized losslessly; unregistered versions fail with an explicit diagnostic. */
export function migrateArticle(input, options = {}) {
  return validateArticle(input, options);
}

/** Public alias clarifying that string/object inputs are parsed and validated as article source. */
export function parseArticleSource(input, options = {}) {
  return validateArticle(input, options);
}

export { ARTICLE_BLOCK_TYPES, ARTICLE_JSON_VALUE_SCHEMA, ARTICLE_V1_SCHEMA };
