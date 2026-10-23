/* Card-based families: Rich Card-Based Process (F3), Step-by-Step Visual Guide (F5), Pipeline (F6). */
import {
  LIMITS, readText, readTone, readIcon, readMedia, readStatus, readProgress, readList, readObject,
  readEnum, readBool, readId, readStringList, uniqueIds, isPlainObject,
} from "./Primitives.js";

const ORIENTATIONS = ["auto", "vertical", "horizontal"];

function readGroup(c, value, path) {
  if (value === undefined || value === null) return undefined;
  const group = readObject(c, value, path, ["title", "subtitle", "icon", "tone"]);
  if (!group) return undefined;
  return {
    title: readText(c, group, "title", path, { required: true }),
    subtitle: readText(c, group, "subtitle", path, { max: LIMITS.subtitle }),
    icon: readIcon(c, group, "icon", path),
    tone: readTone(c, group, "tone", path),
  };
}

function readStage(c, entry, path) {
  const stage = readObject(c, entry, path, ["id", "title", "subtitle", "description", "icon", "tone", "status", "progress", "media", "active"]);
  if (!stage) return undefined;
  return {
    id: readId(c, stage, "id", path),
    title: readText(c, stage, "title", path, { required: true }),
    subtitle: readText(c, stage, "subtitle", path, { max: LIMITS.subtitle }),
    description: readText(c, stage, "description", path, { max: LIMITS.body }),
    icon: readIcon(c, stage, "icon", path),
    tone: readTone(c, stage, "tone", path),
    status: readStatus(c, stage.status, `${path}.status`),
    progress: readProgress(c, stage.progress, `${path}.progress`),
    media: readMedia(c, stage.media, `${path}.media`),
    active: readBool(c, stage, "active", path, false),
  };
}

function assignIds(stages, prefix) {
  stages.forEach((stage, index) => { stage.id ||= `${prefix}${index + 1}`; });
}

function singleActive(c, items, path) {
  if (items.filter((item) => item.active).length > 1) c.err(path, "Only one item can start as active.");
}

export const processCards = {
  id: "process-cards", family: "F3", label: "Rich card-based process", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["group", "stages", "orientation", "connectors"]);
    if (!input) return null;
    const stages = readList(c, input, "stages", "data", { min: 1, max: LIMITS.stages, item: (entry, path) => readStage(c, entry, path) });
    assignIds(stages, "stage-");
    uniqueIds(c, stages, "data.stages");
    singleActive(c, stages, "data.stages");
    return {
      group: readGroup(c, input.group, "data.group"), stages,
      orientation: readEnum(c, input, "orientation", "data", ORIENTATIONS, "auto"),
      connectors: readBool(c, input, "connectors", "data", true),
    };
  },
  describe: (data) => data.stages.map((s, i) => `${i + 1}. ${s.title}${s.subtitle ? ` — ${s.subtitle}` : ""}${s.description ? `: ${s.description}` : ""}`),
};

export const stepGuide = {
  id: "step-guide", family: "F5", label: "Step-by-step visual guide", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["steps", "numbered", "orientation"]);
    if (!input) return null;
    const steps = readList(c, input, "steps", "data", { min: 1, max: LIMITS.stages, item: (entry, path) => {
      const step = readObject(c, entry, path, ["id", "title", "text", "icon", "tone", "status", "media", "tip", "active"]);
      if (!step) return undefined;
      return {
        id: readId(c, step, "id", path),
        title: readText(c, step, "title", path, { required: true }),
        text: readText(c, step, "text", path, { max: LIMITS.body }),
        icon: readIcon(c, step, "icon", path),
        tone: readTone(c, step, "tone", path),
        status: readStatus(c, step.status, `${path}.status`),
        media: readMedia(c, step.media, `${path}.media`),
        tip: readText(c, step, "tip", path, { max: LIMITS.subtitle }),
        active: readBool(c, step, "active", path, false),
      };
    } });
    assignIds(steps, "step-");
    uniqueIds(c, steps, "data.steps");
    singleActive(c, steps, "data.steps");
    return { steps, numbered: readBool(c, input, "numbered", "data", true), orientation: readEnum(c, input, "orientation", "data", ORIENTATIONS, "vertical") };
  },
  describe: (data) => data.steps.map((s, i) => `${i + 1}. ${s.title}${s.text ? `: ${s.text}` : ""}${s.tip ? ` (${s.tip})` : ""}`),
};

export const pipeline = {
  id: "pipeline", family: "F6", label: "Pipeline diagram", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["stages", "direction", "returnPath"]);
    if (!input) return null;
    const stages = readList(c, input, "stages", "data", { min: 2, max: LIMITS.stages, item: (entry, path) => {
      const stage = readObject(c, entry, path, ["id", "title", "subtitle", "icon", "tone", "status", "inputs", "outputs", "linkLabel", "active"]);
      if (!stage) return undefined;
      return {
        id: readId(c, stage, "id", path),
        title: readText(c, stage, "title", path, { required: true }),
        subtitle: readText(c, stage, "subtitle", path, { max: LIMITS.subtitle }),
        icon: readIcon(c, stage, "icon", path),
        tone: readTone(c, stage, "tone", path),
        status: readStatus(c, stage.status, `${path}.status`),
        inputs: readStringList(c, stage, "inputs", path, { max: 6, itemMax: LIMITS.short }),
        outputs: readStringList(c, stage, "outputs", path, { max: 6, itemMax: LIMITS.short }),
        linkLabel: readText(c, stage, "linkLabel", path, { max: LIMITS.short }),
        active: readBool(c, stage, "active", path, false),
      };
    } });
    assignIds(stages, "stage-");
    uniqueIds(c, stages, "data.stages");
    singleActive(c, stages, "data.stages");
    return {
      stages, direction: readEnum(c, input, "direction", "data", ORIENTATIONS, "auto"),
      returnPath: isPlainObject(input.returnPath) ? readReturnPath(c, input.returnPath) : (input.returnPath === undefined ? undefined : (c.err("data.returnPath", "Expected an object with label."), undefined)),
    };
  },
  describe: (data) => data.stages.map((s, i) => `${i + 1}. ${s.title}${s.inputs.length ? ` (in: ${s.inputs.join(", ")})` : ""}${s.outputs.length ? ` (out: ${s.outputs.join(", ")})` : ""}${s.linkLabel ? ` → ${s.linkLabel}` : ""}`),
};

function readReturnPath(c, value) {
  const path = "data.returnPath";
  const object = readObject(c, value, path, ["label"]);
  return object ? { label: readText(c, object, "label", path, { max: LIMITS.short, required: true }) } : undefined;
}
