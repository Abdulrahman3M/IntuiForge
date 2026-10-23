import { createLearningProgress } from "../../state/src/learning-progress.js";

const ID = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const MAX_RECORD_CHARS = 262_144;

function progressError(code, message, cause) {
  const error = new Error(message, cause === undefined ? undefined : { cause });
  error.name = "IntuiProgressError";
  error.code = code;
  return error;
}

function requireId(value, label) {
  if (typeof value !== "string" || value.length > 96 || !ID.test(value)) throw progressError("INVALID_PROGRESS_SCOPE", `${label} must be a stable ID.`);
  return value;
}

function copyActivityIds(value) {
  if (!Array.isArray(value) || value.length > 1_000) throw progressError("INVALID_PROGRESS_SCOPE", "Activity IDs must be a bounded array.");
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== "string" || (key !== "length" && (!/^(?:0|[1-9]\d*)$/.test(key) || Number(key) >= value.length))) {
      throw progressError("INVALID_PROGRESS_SCOPE", "Activity IDs cannot contain extra properties.");
    }
  }
  const ids = [];
  const unique = new Set();
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (!descriptor?.enumerable || !Object.hasOwn(descriptor, "value")) throw progressError("INVALID_PROGRESS_SCOPE", "Activity IDs must be enumerable data values without accessors or holes.");
    const id = requireId(descriptor.value, "Activity ID");
    if (unique.has(id)) throw progressError("INVALID_PROGRESS_SCOPE", "Activity IDs must be unique.");
    unique.add(id);
    ids.push(id);
  }
  return ids;
}

function requireHostUserId(value) {
  if (typeof value !== "string" || value.length < 1 || value.length > 256 || value !== value.trim() || /[\u0000-\u001f\u007f]/.test(value)) {
    throw progressError("INVALID_PROGRESS_USER", "The host must provide a bounded, non-empty user identifier.");
  }
  return value;
}

function requireRecord(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw progressError("PROGRESS_DATA_INVALID", `${label} must be a JSON object.`);
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) throw progressError("PROGRESS_DATA_INVALID", `${label} must be a plain JSON object.`);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== "string" || !descriptor?.enumerable || !Object.hasOwn(descriptor, "value")) {
      throw progressError("PROGRESS_DATA_INVALID", `${label} cannot contain symbols, non-enumerable fields, or accessors.`);
    }
  }
  return value;
}

function dataProperty(record, key, label) {
  requireRecord(record, label);
  const descriptor = Object.getOwnPropertyDescriptor(record, key);
  if (!descriptor) return undefined;
  if (!descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw progressError("PROGRESS_DATA_INVALID", `${label}.${key} must be an enumerable data property.`);
  return descriptor.value;
}

function keyFor(userId, articleId) {
  requireId(articleId, "Article ID");
  try { return `intuiforge.progress.v1:${encodeURIComponent(userId)}:${encodeURIComponent(articleId)}`; }
  catch (cause) { throw progressError("INVALID_PROGRESS_USER", "The host user identifier cannot be encoded safely.", cause); }
}

/**
 * Adapt caller-owned storage to IntuiForge's optional progress capability.
 * IntuiForge never selects localStorage, IndexedDB, cookies, or a server itself.
 */
export function createProgressPersistenceAdapter({ userId, read, write } = {}) {
  const stableUserId = requireHostUserId(userId);
  if (typeof read !== "function" || typeof write !== "function") throw progressError("INVALID_PROGRESS_STORAGE", "Progress persistence requires explicit read and write functions.");

  async function load({ articleId, activityIds = [], signal } = {}) {
    const key = keyFor(stableUserId, articleId);
    const stableActivityIds = copyActivityIds(activityIds);
    let raw;
    try { raw = await read(key, { signal }); }
    catch (cause) { throw progressError("PROGRESS_READ_FAILED", "The host progress store could not be read.", cause); }
    if (raw === null || raw === undefined || raw === "") return Object.freeze({ activities: Object.freeze(Object.create(null)) });
    if (typeof raw !== "string" || raw.length > MAX_RECORD_CHARS) throw progressError("PROGRESS_DATA_INVALID", "The saved progress record is not a bounded JSON string.");

    let payload;
    try { payload = JSON.parse(raw); }
    catch (cause) { throw progressError("PROGRESS_DATA_INVALID", "The saved progress record is malformed JSON.", cause); }
    requireRecord(payload, "Saved progress");
    if (dataProperty(payload, "kind", "Saved progress") !== "intuiforge.progress" || dataProperty(payload, "version", "Saved progress") !== 1) throw progressError("PROGRESS_VERSION_UNSUPPORTED", "The saved progress record has an unsupported format version.");
    const records = requireRecord(dataProperty(payload, "activities", "Saved progress"), "Saved activities");
    let restored;
    try { restored = createLearningProgress(stableActivityIds, { initialState: records }); }
    catch (cause) { throw progressError("PROGRESS_DATA_INVALID", "The saved progress record contains invalid activity data.", cause); }
    try { return Object.freeze({ activities: restored.getSnapshot().activities }); }
    finally { restored.dispose(); }
  }

  async function save({ articleId, action, progress, signal } = {}) {
    const key = keyFor(stableUserId, articleId);
    const intent = requireRecord(action, "Progress save action");
    const actionType = dataProperty(intent, "action", "Progress save action");
    const scope = dataProperty(intent, "scope", "Progress save action");
    if (actionType !== "saveProgress" || !["article", "activity"].includes(scope)) throw progressError("INVALID_PROGRESS_SCOPE", "Progress may be saved only through an explicit article or activity save action.");
    const activityId = dataProperty(intent, "activityId", "Progress save action");
    const allActivities = requireRecord(dataProperty(progress, "activities", "Progress snapshot"), "Progress snapshot activities");
    const activityIds = scope === "activity" ? [requireId(activityId, "Activity ID")] : Reflect.ownKeys(allActivities);
    if (activityIds.some((id) => typeof id !== "string" || !ID.test(id))) throw progressError("PROGRESS_DATA_INVALID", "The progress snapshot contains an invalid activity ID.");
    if (scope === "activity" && !Object.hasOwn(allActivities, activityId)) throw progressError("INVALID_PROGRESS_SCOPE", "The activity save target is not present in the current snapshot.");

    let validated;
    try { validated = createLearningProgress(activityIds, { initialState: allActivities }); }
    catch (cause) { throw progressError("PROGRESS_DATA_INVALID", "The live progress snapshot is invalid.", cause); }
    let serialized;
    try {
      const snapshot = validated.getSnapshot();
      serialized = JSON.stringify({ kind: "intuiforge.progress", version: 1, activities: snapshot.activities });
    } finally { validated.dispose(); }
    if (serialized.length > MAX_RECORD_CHARS) throw progressError("PROGRESS_DATA_INVALID", "The progress snapshot is too large to persist.");
    if (signal?.aborted) throw progressError("PROGRESS_ABORTED", "Progress saving was canceled because the article was unmounted.");
    try { await write(key, serialized, { signal }); }
    catch (cause) { throw progressError("PROGRESS_WRITE_FAILED", "The host progress store could not be updated.", cause); }
    return Object.freeze({ status: "saved", scope, activityCount: activityIds.length });
  }

  return Object.freeze({ load, save });
}
