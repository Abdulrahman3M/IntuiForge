import { EngineError } from "./errors.js";

const ID_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const SEMVER_IDENTIFIER = "(?:0|[1-9]\\d*|[0-9A-Za-z-]*[A-Za-z-][0-9A-Za-z-]*)";
const SEMVER_PATTERN = new RegExp(`^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-${SEMVER_IDENTIFIER}(?:\\.${SEMVER_IDENTIFIER})*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$`);

function invalidRegistration(kind, reason) {
  return new EngineError("INVALID_REGISTRATION", `Invalid ${kind} registration: ${reason}`);
}

function ownDataValue(descriptors, key, kind, required = true) {
  const descriptor = descriptors[key];
  if (!descriptor) {
    if (required) throw invalidRegistration(kind, `missing own data property "${key}"`);
    return undefined;
  }
  if (descriptor.get || descriptor.set || !descriptor.enumerable) throw invalidRegistration(kind, `"${key}" must be an enumerable data property`);
  return descriptor.value;
}

function copyCapabilities(value, kind) {
  let descriptors;
  let prototype;
  let isArray;
  let symbols;
  try {
    isArray = Array.isArray(value);
    prototype = Object.getPrototypeOf(value);
    descriptors = Object.getOwnPropertyDescriptors(value);
    symbols = Object.getOwnPropertySymbols(value);
  } catch {
    throw invalidRegistration(kind, "capabilities could not be inspected safely");
  }
  if (!isArray || prototype !== Array.prototype || symbols.length) throw invalidRegistration(kind, "capabilities must be a plain array");
  const lengthDescriptor = descriptors.length;
  const length = lengthDescriptor?.value;
  if (!Number.isSafeInteger(length) || length < 0 || length > 32) throw invalidRegistration(kind, "capabilities may contain at most 32 entries");
  const capabilities = [];
  for (let index = 0; index < length; index += 1) {
    const item = descriptors[String(index)];
    if (!item || item.get || item.set || !item.enumerable || typeof item.value !== "string" || !item.value.trim() || item.value.length > 64) {
      throw invalidRegistration(kind, "capabilities must contain ordinary non-empty strings of at most 64 characters");
    }
    capabilities.push(item.value);
  }
  for (const key of Object.keys(descriptors)) {
    if (key === "length" || /^(?:0|[1-9]\d*)$/.test(key) && Number(key) < length) continue;
    throw invalidRegistration(kind, "capabilities may not have extra properties");
  }
  return capabilities;
}

export function createRegistrationRegistry(kind) {
  const entries = new Map();

  function register(registration) {
    if (!registration || typeof registration !== "object") {
      throw invalidRegistration(kind, "expected an object descriptor");
    }
    let prototype;
    let descriptors;
    let symbols;
    let isArray;
    try {
      isArray = Array.isArray(registration);
      prototype = Object.getPrototypeOf(registration);
      descriptors = Object.getOwnPropertyDescriptors(registration);
      symbols = Object.getOwnPropertySymbols(registration);
    } catch {
      throw invalidRegistration(kind, "descriptor could not be inspected safely");
    }
    if (isArray || prototype !== Object.prototype && prototype !== null || symbols.length) throw invalidRegistration(kind, "expected a plain object descriptor without symbol properties");
    const id = ownDataValue(descriptors, "id", kind);
    const version = ownDataValue(descriptors, "version", kind);
    const capabilities = copyCapabilities(ownDataValue(descriptors, "capabilities", kind), kind);
    const render = ownDataValue(descriptors, "render", kind);
    const isDefault = ownDataValue(descriptors, "default", kind, false);
    if (typeof id !== "string" || !ID_PATTERN.test(id)) throw invalidRegistration(kind, "id must be a stable lowercase identifier");
    if (typeof version !== "string" || !SEMVER_PATTERN.test(version)) throw invalidRegistration(kind, "version must be semantic versioning");
    if (isDefault !== undefined && typeof isDefault !== "boolean") throw invalidRegistration(kind, '"default" must be a boolean when supplied');
    if (new Set(capabilities).size !== capabilities.length) throw invalidRegistration(kind, "capabilities must not repeat");
    if (typeof render !== "function") throw invalidRegistration(kind, "render must be a function");
    if (entries.has(id)) throw new EngineError("DUPLICATE_REGISTRATION", `A ${kind} with id "${id}" is already registered.`);

    const entry = Object.freeze({
      id,
      version,
      capabilities: Object.freeze([...capabilities]),
      render,
      ...(isDefault === true ? { default: true } : {}),
    });
    entries.set(id, entry);

    let registered = true;
    return () => {
      if (!registered) return false;
      registered = false;
      if (entries.get(id) !== entry) return false;
      entries.delete(id);
      return true;
    };
  }

  return Object.freeze({
    register,
    get: (id) => entries.get(id),
    list: () => [...entries.values()],
    describe: () => [...entries.values()].map(({ id, version, capabilities, default: isDefault }) => ({
      id,
      version,
      capabilities: [...capabilities],
      ...(isDefault ? { default: true } : {}),
    })),
    clear: () => entries.clear(),
  });
}
