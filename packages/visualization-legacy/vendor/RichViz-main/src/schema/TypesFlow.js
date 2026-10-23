/* Flow families: Mermaid (F1), React Flow (F2), Process Flow Cards (F4), Interactive Node Map (F10). */
import {
  LIMITS, readText, readTone, readIcon, readMedia, readStatus, readList, readObject, readEnum, readBool,
  readId, readNumber, uniqueIds,
} from "./Primitives.js";

const EDGE_TYPES = ["default", "straight", "step", "smoothstep"];
const SHAPES = ["card", "pill", "circle", "diamond"];

export const mermaid = {
  id: "mermaid", family: "F1", label: "Mermaid diagram", engine: "mermaid",
  validate(data, c) {
    const input = readObject(c, data, "data", ["source"]);
    if (!input) return null;
    const source = readText(c, input, "source", "data", { max: LIMITS.mermaid, required: true });
    return source ? { source } : null;
  },
  describe: () => [],
};

function readRichNodeData(c, value, path) {
  const data = readObject(c, value, path, ["label", "subtitle", "icon", "tone", "status", "media", "details"]);
  if (!data) return undefined;
  return {
    label: readText(c, data, "label", path, { max: LIMITS.label, required: true }),
    subtitle: readText(c, data, "subtitle", path, { max: LIMITS.subtitle }),
    icon: readIcon(c, data, "icon", path),
    tone: readTone(c, data, "tone", path),
    status: readStatus(c, data.status, `${path}.status`),
    media: readMedia(c, data.media, `${path}.media`),
    details: readText(c, data, "details", path, { max: LIMITS.body }),
  };
}

/** React Flow source structure. A version-1 node graph is the supported declarative subset of the engine schema. */
export function readFlowGraph(c, value, path) {
  const graph = readObject(c, value, path, ["version", "nodes", "edges"]);
  if (!graph) return null;
  if (graph.version !== 1) c.err(`${path}.version`, "Expected version 1.");
  const nodes = readList(c, graph, "nodes", path, { min: 1, max: LIMITS.nodes, item: (entry, here) => {
    const node = readObject(c, entry, here, ["id", "type", "position", "data"]);
    if (!node) return undefined;
    if (node.type !== undefined && node.type !== "default") c.err(`${here}.type`, "Custom node components are not supported; use the default type.");
    const position = readObject(c, node.position, `${here}.position`, ["x", "y"]);
    const x = position ? readNumber(c, position, "x", `${here}.position`, { min: -100000, max: 100000, required: true }) : undefined;
    const y = position ? readNumber(c, position, "y", `${here}.position`, { min: -100000, max: 100000, required: true }) : undefined;
    const id = readId(c, node, "id", here, { required: true });
    const data = readRichNodeData(c, node.data, `${here}.data`);
    return id && data && x !== undefined && y !== undefined ? { id, type: "default", position: { x, y }, data } : undefined;
  } });
  uniqueIds(c, nodes, `${path}.nodes`);
  const ids = new Set(nodes.map((node) => node.id));
  const edgeIds = new Set();
  const edges = readList(c, graph, "edges", path, { max: LIMITS.edges, item: (entry, here) => {
    const edge = readObject(c, entry, here, ["id", "source", "target", "type", "label", "animated"]);
    if (!edge) return undefined;
    const id = readId(c, edge, "id", here, { required: true });
    const source = readId(c, edge, "source", here, { required: true });
    const target = readId(c, edge, "target", here, { required: true });
    if (id && edgeIds.has(id)) c.err(`${here}.id`, `Duplicate id "${id}".`);
    if (id) edgeIds.add(id);
    if (source && !ids.has(source)) c.err(`${here}.source`, `Unknown node "${source}".`);
    if (target && !ids.has(target)) c.err(`${here}.target`, `Unknown node "${target}".`);
    if (source && source === target) c.err(`${here}.target`, "A connection needs two distinct nodes.");
    if (!id || !source || !target) return undefined;
    const label = readText(c, edge, "label", here, { max: LIMITS.label });
    return { id, source, target, type: readEnum(c, edge, "type", here, EDGE_TYPES, "smoothstep"), ...(label ? { label } : {}), ...(readBool(c, edge, "animated", here, false) ? { animated: true } : {}) };
  } });
  return { version: 1, nodes, edges };
}

export const reactFlow = {
  id: "react-flow", family: "F2", label: "React Flow interactive diagram", engine: "react-flow",
  validate(data, c) {
    const input = readObject(c, data, "data", ["graph"]);
    if (!input) return null;
    const graph = readFlowGraph(c, input.graph, "data.graph");
    return graph ? { graph } : null;
  },
  describe: (data) => {
    const names = new Map(data.graph.nodes.map((n) => [n.id, n.data.label]));
    return data.graph.edges.map((e) => `${names.get(e.source)} → ${names.get(e.target)}${e.label ? ` (${e.label})` : ""}`);
  },
};

function readFlowNode(c, entry, path) {
  const node = readObject(c, entry, path, ["id", "title", "subtitle", "icon", "tone", "shape", "status", "media"]);
  if (!node) return undefined;
  return {
    id: readId(c, node, "id", path, { required: true }),
    title: readText(c, node, "title", path, { required: true }),
    subtitle: readText(c, node, "subtitle", path, { max: LIMITS.subtitle }),
    icon: readIcon(c, node, "icon", path),
    tone: readTone(c, node, "tone", path),
    shape: readEnum(c, node, "shape", path, SHAPES, "card"),
    status: readStatus(c, node.status, `${path}.status`),
    media: readMedia(c, node.media, `${path}.media`),
  };
}

function readFromTo(c, entry, path, ids, extras = []) {
  const edge = readObject(c, entry, path, ["from", "to", "label", ...extras]);
  if (!edge) return undefined;
  const from = readId(c, edge, "from", path, { required: true });
  const to = readId(c, edge, "to", path, { required: true });
  if (from && !ids.has(from)) c.err(`${path}.from`, `Unknown node "${from}".`);
  if (to && !ids.has(to)) c.err(`${path}.to`, `Unknown node "${to}".`);
  if (from && from === to) c.err(`${path}.to`, "A connection needs two distinct nodes.");
  if (!from || !to) return undefined;
  const label = readText(c, edge, "label", path, { max: LIMITS.short });
  return { from, to, ...(label ? { label } : {}), edge };
}

export const processFlow = {
  id: "process-flow", family: "F4", label: "Process flow cards", engine: "native",
  validate(data, c) {
    const input = readObject(c, data, "data", ["nodes", "edges", "direction"]);
    if (!input) return null;
    const nodes = readList(c, input, "nodes", "data", { min: 2, max: 60, item: (entry, path) => readFlowNode(c, entry, path) });
    uniqueIds(c, nodes, "data.nodes");
    const ids = new Set(nodes.map((node) => node.id));
    const edges = readList(c, input, "edges", "data", { min: 1, max: 160, item: (entry, path) => {
      const result = readFromTo(c, entry, path, ids, ["tone", "dashed"]);
      if (!result) return undefined;
      const { edge, ...rest } = result;
      const tone = readTone(c, edge, "tone", path);
      return { ...rest, ...(tone ? { tone } : {}), ...(readBool(c, edge, "dashed", path, false) ? { dashed: true } : {}) };
    } });
    return { nodes, edges, direction: readEnum(c, input, "direction", "data", ["TB", "LR"], "TB") };
  },
  describe(data) {
    const names = new Map(data.nodes.map((n) => [n.id, n.title]));
    return data.edges.map((e) => `${names.get(e.from)} → ${names.get(e.to)}${e.label ? ` (${e.label})` : ""}`);
  },
};

export const nodeMap = {
  id: "node-map", family: "F10", label: "Interactive node map", engine: "react-flow",
  validate(data, c) {
    const input = readObject(c, data, "data", ["nodes", "edges", "groups", "layout", "direction"]);
    if (!input) return null;
    const groups = readList(c, input, "groups", "data", { max: 12, item: (entry, path) => {
      const group = readObject(c, entry, path, ["id", "label", "tone"]);
      return group ? { id: readId(c, group, "id", path, { required: true }), label: readText(c, group, "label", path, { required: true, max: LIMITS.short }), tone: readTone(c, group, "tone", path) } : undefined;
    } });
    uniqueIds(c, groups, "data.groups");
    const groupIds = new Set(groups.map((group) => group.id));
    const nodes = readList(c, input, "nodes", "data", { min: 2, max: LIMITS.nodes, item: (entry, path) => {
      const node = readObject(c, entry, path, ["id", "label", "subtitle", "icon", "tone", "group", "status", "media", "details", "x", "y"]);
      if (!node) return undefined;
      const group = readId(c, node, "group", path);
      if (group && !groupIds.has(group)) c.err(`${path}.group`, `Unknown group "${group}".`);
      const x = readNumber(c, node, "x", path, { min: -100000, max: 100000 });
      const y = readNumber(c, node, "y", path, { min: -100000, max: 100000 });
      if ((x === undefined) !== (y === undefined)) c.err(path, "Give both x and y, or neither to use automatic layout.");
      return {
        id: readId(c, node, "id", path, { required: true }),
        label: readText(c, node, "label", path, { required: true }),
        subtitle: readText(c, node, "subtitle", path, { max: LIMITS.subtitle }),
        icon: readIcon(c, node, "icon", path),
        tone: readTone(c, node, "tone", path),
        group,
        status: readStatus(c, node.status, `${path}.status`),
        media: readMedia(c, node.media, `${path}.media`),
        details: readText(c, node, "details", path, { max: LIMITS.body }),
        ...(x !== undefined && y !== undefined ? { x, y } : {}),
      };
    } });
    uniqueIds(c, nodes, "data.nodes");
    const ids = new Set(nodes.map((node) => node.id));
    const edges = readList(c, input, "edges", "data", { max: LIMITS.edges, item: (entry, path) => {
      const result = readFromTo(c, entry, path, ids);
      if (!result) return undefined;
      const { edge, ...rest } = result;
      return rest;
    } });
    return { nodes, edges, groups, layout: readEnum(c, input, "layout", "data", ["layered", "radial", "grid"], "layered"), direction: readEnum(c, input, "direction", "data", ["TB", "LR"], "LR") };
  },
  describe(data) {
    const names = new Map(data.nodes.map((n) => [n.id, n.label]));
    const lines = data.nodes.map((n) => `${n.label}${n.subtitle ? ` — ${n.subtitle}` : ""}${n.details ? `: ${n.details}` : ""}`);
    return [...lines, ...data.edges.map((e) => `${names.get(e.from)} → ${names.get(e.to)}${e.label ? ` (${e.label})` : ""}`)];
  },
};
