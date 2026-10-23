import { stateError } from "./errors.js";

const ID = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const ACTIVITY_STATUS = new Set(["not-started", "in-progress", "complete"]);

function progressEntries(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw stateError("INVALID_PROGRESS_STATE", `${label} must be a plain object.`);
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) throw stateError("INVALID_PROGRESS_STATE", `${label} must be a plain object.`);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) throw stateError("UNSAFE_PROGRESS_STATE", `${label} cannot contain symbol properties.`);
  return keys.map((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_PROGRESS_STATE", `${label}.${key} must be an enumerable data property.`);
    return [key, descriptor.value];
  });
}

function normalizeActivityProgress(value, id) {
  const fields = new Map(progressEntries(value, `Progress activity "${id}"`));
  const allowed = new Set(["status", "selectedId", "score", "maximumScore", "reviewedCardIds"]);
  for (const key of fields.keys()) if (!allowed.has(key)) throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" contains an unsupported field.`);
  const status = fields.get("status") ?? "not-started";
  const selectedId = fields.has("selectedId") ? fields.get("selectedId") : null;
  const score = fields.has("score") ? fields.get("score") : null;
  const maximumScore = fields.has("maximumScore") ? fields.get("maximumScore") : null;
  const reviewedCardIds = fields.has("reviewedCardIds") ? fields.get("reviewedCardIds") : [];
  if (!ACTIVITY_STATUS.has(status)) throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has an unsupported status.`);
  if (selectedId !== null && (typeof selectedId !== "string" || !ID.test(selectedId))) throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has an invalid selection.`);
  if (score !== null || maximumScore !== null) {
    if (!Number.isFinite(score) || !Number.isFinite(maximumScore) || maximumScore <= 0 || score < 0 || score > maximumScore) throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has an invalid score.`);
  }
  if (!Array.isArray(reviewedCardIds) || reviewedCardIds.length > 500) {
    throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has invalid reviewed card IDs.`);
  }
  const reviewedCardKeys = Reflect.ownKeys(reviewedCardIds);
  if (reviewedCardKeys.some((key) => typeof key !== "string" || (key !== "length" && (!/^(?:0|[1-9]\d*)$/.test(key) || Number(key) >= reviewedCardIds.length)))) {
    throw stateError("UNSAFE_PROGRESS_STATE", `Progress activity "${id}" has unsafe reviewed card IDs.`);
  }
  const normalizedCards = [];
  for (let index = 0; index < reviewedCardIds.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(reviewedCardIds, String(index));
    if (!descriptor?.enumerable) {
      throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has invalid reviewed card IDs.`);
    }
    if (!Object.hasOwn(descriptor, "value")) throw stateError("UNSAFE_PROGRESS_STATE", `Progress activity "${id}" cannot use accessors for reviewed card IDs.`);
    if (typeof descriptor.value !== "string" || !ID.test(descriptor.value)) throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has invalid reviewed card IDs.`);
    normalizedCards.push(descriptor.value);
  }
  if (new Set(normalizedCards).size !== normalizedCards.length) throw stateError("INVALID_PROGRESS_STATE", `Progress activity "${id}" has invalid reviewed card IDs.`);
  return { status, selectedId, score, maximumScore, reviewedCardIds: normalizedCards };
}

/** Create immutable, in-memory learning progress for one mounted article session. */
export function createLearningProgress(activityIds = [], { initialState } = {}) {
  if (!Array.isArray(activityIds)) throw stateError("INVALID_PROGRESS_ACTIVITIES", "Learning progress activity IDs must be an array.");
  const activities = new Map();
  for (const id of activityIds) {
    if (typeof id !== "string" || !ID.test(id)) throw stateError("INVALID_PROGRESS_ACTIVITY_ID", "Learning progress requires canonical activity IDs.");
    if (activities.has(id)) throw stateError("DUPLICATE_PROGRESS_ACTIVITY_ID", `Learning activity "${id}" was registered more than once.`);
    activities.set(id, { status: "not-started", selectedId: null, score: null, maximumScore: null, reviewedCardIds: [] });
  }

  if (initialState !== undefined) {
    for (const [id, activity] of progressEntries(initialState, "Initial progress")) {
      if (!activities.has(id)) continue;
      activities.set(id, normalizeActivityProgress(activity, id));
    }
  }

  const subscribers = new Set();
  let disposed = false;
  const ensureLive = () => { if (disposed) throw stateError("PROGRESS_DISPOSED", "Learning progress has been disposed."); };
  const ensureActivity = (id) => {
    ensureLive();
    const activity = activities.get(id);
    if (!activity) throw stateError("UNKNOWN_PROGRESS_ACTIVITY", `Learning activity "${id}" is not registered for this session.`);
    return activity;
  };
  function snapshot() {
    const records = Object.create(null);
    let completedCount = 0;
    for (const [id, activity] of activities) {
      if (activity.status === "complete") completedCount += 1;
      records[id] = Object.freeze({ ...activity, reviewedCardIds: Object.freeze([...activity.reviewedCardIds]) });
    }
    return Object.freeze({ sessionOnly: true, completedCount, totalCount: activities.size, activities: Object.freeze(records) });
  }
  function publish() {
    const current = snapshot();
    const errors = [];
    for (const listener of subscribers) { try { listener(current); } catch (error) { errors.push(error); } }
    if (errors.length) throw new AggregateError(errors, "One or more learning progress subscribers failed.");
  }
  function update(id, changes) {
    const current = ensureActivity(id);
    const next = { ...current, ...changes };
    if (JSON.stringify(current) === JSON.stringify(next)) return false;
    activities.set(id, next);
    publish();
    return true;
  }
  function begin(id, changes = {}) {
    const current = ensureActivity(id);
    return update(id, { ...changes, status: current.status === "complete" ? "complete" : "in-progress" });
  }

  return Object.freeze({
    getSnapshot() { ensureLive(); return snapshot(); },
    setSelection(id, selectedId) {
      if (typeof selectedId !== "string" || selectedId.length > 96) throw stateError("INVALID_PROGRESS_SELECTION", "A learning selection must be a bounded stable ID.");
      return begin(id, { selectedId });
    },
    markCardReviewed(id, cardId) {
      if (typeof cardId !== "string" || !ID.test(cardId)) throw stateError("INVALID_PROGRESS_CARD_ID", "A reviewed card must have a canonical stable ID.");
      const current = ensureActivity(id);
      if (current.reviewedCardIds.includes(cardId)) return false;
      return begin(id, { reviewedCardIds: [...current.reviewedCardIds, cardId] });
    },
    setScore(id, score, maximumScore) {
      if (!Number.isFinite(score) || !Number.isFinite(maximumScore) || maximumScore <= 0 || score < 0 || score > maximumScore) throw stateError("INVALID_PROGRESS_SCORE", "Learning score must be finite and within a positive maximum score.");
      return update(id, { status: "complete", score, maximumScore });
    },
    complete(id) { return update(id, { status: "complete" }); },
    reset(id) { return update(id, { status: "not-started", selectedId: null, score: null, maximumScore: null, reviewedCardIds: [] }); },
    subscribe(listener) {
      ensureLive();
      if (typeof listener !== "function") throw stateError("INVALID_PROGRESS_SUBSCRIBER", "A learning progress subscriber must be a function.");
      subscribers.add(listener);
      listener(snapshot());
      let active = true;
      return () => { if (!active) return false; active = false; return subscribers.delete(listener); };
    },
    dispose() { if (disposed) return; disposed = true; subscribers.clear(); },
  });
}
