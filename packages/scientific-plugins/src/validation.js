import { parseScientificFormula } from "./math.js";

const ID = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const ELEMENTS = new Set(["H", "C", "N", "O", "F", "P", "S", "Cl", "Na", "Mg", "Ca", "Fe"]);
const NETWORK_KEYS = /(?:url|uri|endpoint|tile|source|src|request|fetch|token|credential)/i;

function isFiniteNumber(value, minimum, maximum) {
  return typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum;
}
function isRecord(value) { return value !== null && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype; }
function isText(value, max = 1000) { return typeof value === "string" && value.trim().length > 0 && value.length <= max; }
function uniqueId(value) { return typeof value === "string" && ID.test(value); }

/** Return stable, path-aware issues for a science block; validation never mutates the article. */
export function validateScientificBlock(block) {
  const issues = [];
  const props = isRecord(block?.props) ? block.props : {};
  const type = block?.type;
  const add = (code, path, message, fixHint = "Correct the scientific block props.") => issues.push({ code, path, message, fixHint });
  const allowed = new Set(["label", "description"]);
  const allow = (...keys) => keys.forEach((key) => allowed.add(key));
  const requireCopy = () => {
    if (props.label !== undefined && !isText(props.label, 160)) add("INVALID_SCIENTIFIC_LABEL", "/label", "Scientific labels must be readable text up to 160 characters.");
    const description = props.description ?? block.content;
    if (!isText(description, 2000)) add("MISSING_SCIENTIFIC_DESCRIPTION", "/description", "Scientific blocks require an accessible text description.", "Provide props.description or readable block content.");
  };
  const checkKeys = () => {
    for (const key of Object.keys(props)) if (!allowed.has(key)) {
      const mapEndpoint = type === "map" && NETWORK_KEYS.test(key);
      add(mapEndpoint ? "UNSAFE_MAP_SOURCE" : "UNSUPPORTED_SCIENTIFIC_PROP", `/${key}`, mapEndpoint ? "Map URLs, endpoints, tiles, and network sources must come from an explicitly invoked trusted host capability." : `Scientific property "${key}" is not supported.`, "Use only the documented declarative fields; never place a URL or executable code in article data.");
    }
  };
  const bounded = (value, minimum, maximum, path, label) => {
    if (!isFiniteNumber(value, minimum, maximum)) add("INVALID_SCIENTIFIC_BOUND", path, `${label} must be finite and between ${minimum} and ${maximum}.`);
  };
  const validatePoint = (coordinate, path) => {
    if (!Array.isArray(coordinate) || coordinate.length !== 2 || !isFiniteNumber(coordinate[0], -180, 180) || !isFiniteNumber(coordinate[1], -90, 90)) {
      add("INVALID_MAP_COORDINATE", path, "Geographic coordinates must be finite [longitude, latitude] values in WGS84 bounds.");
      return false;
    }
    return true;
  };

  if (["simulator2d", "physicsExperiment"].includes(type)) {
    allow("kind", "speed", "angleDeg", "gravity", "durationSeconds");
    requireCopy();
    if (props.kind !== "projectile") add("UNSUPPORTED_SIMULATION_KIND", "/kind", "Only the deterministic projectile model is supported in P09.");
    bounded(props.speed, 0.1, 100, "/speed", "Launch speed");
    bounded(props.angleDeg, 0, 90, "/angleDeg", "Launch angle");
    bounded(props.gravity, 0.1, 30, "/gravity", "Gravity");
    if (type === "simulator2d") bounded(props.durationSeconds, 0.1, 30, "/durationSeconds", "Simulation duration");
  } else if (type === "model3d") {
    allow("model", "modelId"); requireCopy();
    if (props.modelId !== undefined && !uniqueId(props.modelId)) add("INVALID_MODEL_ID", "/modelId", "Model IDs must be stable canonical tokens.");
    if (props.model !== undefined) {
      const model = props.model;
      if (!isRecord(model) || model.format !== "intuiforge.mesh.v1" || !Array.isArray(model.vertices) || !Array.isArray(model.faces)) {
        add("INVALID_MODEL_FORMAT", "/model", "Only the bounded intuiforge.mesh.v1 triangle format is supported.");
      } else {
        if (Object.keys(model).some((key) => !["format", "vertices", "faces"].includes(key))) add("INVALID_MODEL_FORMAT", "/model", "Mesh records may contain only format, vertices, and faces.");
        if (model.vertices.length < 3 || model.vertices.length > 256) add("INVALID_MESH_VERTICES", "/model/vertices", "Meshes require 3–256 bounded vertices.");
        model.vertices.forEach((vertex, index) => {
          if (!Array.isArray(vertex) || vertex.length !== 3 || vertex.some((value) => !isFiniteNumber(value, -1000, 1000))) add("INVALID_MESH_VERTEX", `/model/vertices/${index}`, "Each mesh vertex must be a finite [x,y,z] triple within ±1000.");
        });
        if (model.faces.length < 1 || model.faces.length > 512) add("INVALID_MESH_FACES", "/model/faces", "Meshes require 1–512 triangle faces.");
        model.faces.forEach((face, index) => {
          if (!Array.isArray(face) || face.length !== 3 || face.some((vertex) => !Number.isInteger(vertex) || vertex < 0 || vertex >= model.vertices.length) || new Set(face).size !== 3) add("INVALID_MESH_FACE", `/model/faces/${index}`, "Each face must reference three distinct declared vertices.");
        });
      }
    }
  } else if (type === "map") {
    allow("mapId", "bounds", "layers", "markers"); requireCopy();
    if (props.mapId !== undefined && !uniqueId(props.mapId)) add("INVALID_MAP_ID", "/mapId", "Map IDs must be stable canonical tokens.");
    const bounds = props.bounds;
    if (!isRecord(bounds) || !isFiniteNumber(bounds.west, -180, 180) || !isFiniteNumber(bounds.east, -180, 180) || !isFiniteNumber(bounds.south, -90, 90) || !isFiniteNumber(bounds.north, -90, 90) || bounds.west >= bounds.east || bounds.south >= bounds.north) add("INVALID_MAP_BOUNDS", "/bounds", "Map bounds require increasing finite WGS84 west/east and south/north values.");
    if (!Array.isArray(props.layers) || props.layers.length > 16) add("INVALID_MAP_LAYERS", "/layers", "Maps support at most 16 local data layers.");
    const layerIds = new Set();
    for (const [layerIndex, layer] of (Array.isArray(props.layers) ? props.layers : []).entries()) {
      if (!isRecord(layer) || !uniqueId(layer.id) || !isText(layer.label, 160) || layer.visible !== undefined && typeof layer.visible !== "boolean" || !Array.isArray(layer.features) || layer.features.length > 500) { add("INVALID_MAP_LAYER", `/layers/${layerIndex}`, "Map layers require a stable ID, label, optional visibility flag, and at most 500 local features."); continue; }
      if (layerIds.has(layer.id)) add("DUPLICATE_MAP_LAYER_ID", `/layers/${layerIndex}/id`, "Map layer IDs must be unique.");
      layerIds.add(layer.id);
      for (const [featureIndex, feature] of layer.features.entries()) {
        const featurePath = `/layers/${layerIndex}/features/${featureIndex}`;
        if (!isRecord(feature) || !["Point", "LineString", "Polygon"].includes(feature.type)) { add("INVALID_MAP_FEATURE", featurePath, "Map features must be Point, LineString, or Polygon records."); continue; }
        const coordinates = feature.coordinates;
        const points = feature.type === "Point" ? [coordinates] : feature.type === "LineString" ? coordinates : Array.isArray(coordinates) ? coordinates.flat(1) : [];
        if (!Array.isArray(points) || points.length < (feature.type === "Point" ? 1 : 2) || points.length > 2000) add("INVALID_MAP_GEOMETRY", `${featurePath}/coordinates`, "Map geometry must contain a bounded sequence of geographic points.");
        else points.forEach((point, index) => validatePoint(point, `${featurePath}/coordinates/${index}`));
      }
    }
    if (!Array.isArray(props.markers) || props.markers.length > 500) add("INVALID_MAP_MARKERS", "/markers", "Maps support at most 500 selectable markers.");
    const markerIds = new Set();
    for (const [index, marker] of (Array.isArray(props.markers) ? props.markers : []).entries()) {
      if (!isRecord(marker) || !uniqueId(marker.id) || !isText(marker.label, 160) || marker.description !== undefined && !isText(marker.description, 1000) || !validatePoint(marker.coordinates, `/markers/${index}/coordinates`)) { add("INVALID_MAP_MARKER", `/markers/${index}`, "Markers require stable IDs, readable labels, optional descriptions and WGS84 coordinates."); continue; }
      if (markerIds.has(marker.id)) add("DUPLICATE_MAP_MARKER_ID", `/markers/${index}/id`, "Map marker IDs must be unique.");
      markerIds.add(marker.id);
    }
  } else if (type === "mathGraph") {
    allow("formula", "xMin", "xMax", "xUnit", "yUnit", "samples"); requireCopy();
    if (typeof props.formula !== "string") add("UNSAFE_SCIENTIFIC_FORMULA", "/formula", "A graph requires a safe mathematical formula.");
    else try { parseScientificFormula(props.formula); } catch { add("UNSAFE_SCIENTIFIC_FORMULA", "/formula", "Formula must use only the bounded scientific arithmetic grammar."); }
    bounded(props.xMin, -1_000_000, 1_000_000, "/xMin", "Minimum x value");
    bounded(props.xMax, -1_000_000, 1_000_000, "/xMax", "Maximum x value");
    if (Number.isFinite(props.xMin) && Number.isFinite(props.xMax) && props.xMin >= props.xMax) add("INVALID_GRAPH_BOUNDS", "/xMax", "Graph x bounds must increase.");
    for (const field of ["xUnit", "yUnit"]) if (!isText(props[field], 32)) add("INVALID_GRAPH_UNIT", `/${field}`, `${field} must be a short readable unit label.`);
    if (props.samples !== undefined && (!Number.isInteger(props.samples) || props.samples < 2 || props.samples > 512)) add("INVALID_GRAPH_SAMPLES", "/samples", "Graph samples must be an integer from 2 to 512.");
  } else if (type === "chemistry") {
    allow("formula", "atoms", "bonds"); requireCopy();
    if (!isText(props.formula, 64)) add("INVALID_MOLECULE_FORMULA", "/formula", "Molecule formula must be readable text up to 64 characters.");
    if (!Array.isArray(props.atoms) || props.atoms.length < 1 || props.atoms.length > 64) add("INVALID_MOLECULE_ATOMS", "/atoms", "Molecules require 1–64 atoms.");
    const atomIds = new Set();
    for (const [index, atom] of (Array.isArray(props.atoms) ? props.atoms : []).entries()) {
      if (!isRecord(atom) || !uniqueId(atom.id) || !ELEMENTS.has(atom.element) || !isFiniteNumber(atom.x, -1000, 1000) || !isFiniteNumber(atom.y, -1000, 1000) || atom.label !== undefined && !isText(atom.label, 100)) { add("INVALID_MOLECULE_ATOM", `/atoms/${index}`, "Atoms require unique IDs, allowlisted elements, bounded coordinates, and optional readable labels."); continue; }
      if (atomIds.has(atom.id)) add("DUPLICATE_MOLECULE_ATOM_ID", `/atoms/${index}/id`, "Atom IDs must be unique.");
      atomIds.add(atom.id);
    }
    if (!Array.isArray(props.bonds) || props.bonds.length > 128) add("INVALID_MOLECULE_BONDS", "/bonds", "Molecules support at most 128 bonds.");
    for (const [index, bond] of (Array.isArray(props.bonds) ? props.bonds : []).entries()) if (!isRecord(bond) || !atomIds.has(bond.source) || !atomIds.has(bond.target) || bond.source === bond.target || bond.order !== undefined && ![1, 2, 3].includes(bond.order)) add("INVALID_MOLECULE_BOND", `/bonds/${index}`, "Bonds must connect two distinct declared atoms with order 1–3.");
  } else if (type === "anatomy") {
    allow("viewBox", "parts"); requireCopy();
    const box = props.viewBox;
    if (!isRecord(box) || !isFiniteNumber(box.width, 1, 2000) || !isFiniteNumber(box.height, 1, 2000)) add("INVALID_ANATOMY_VIEWBOX", "/viewBox", "Anatomy viewBox width and height must be between 1 and 2000.");
    if (!Array.isArray(props.parts) || props.parts.length < 1 || props.parts.length > 200) add("INVALID_ANATOMY_PARTS", "/parts", "Anatomy viewers require 1–200 parts.");
    const parts = new Map();
    for (const [index, part] of (Array.isArray(props.parts) ? props.parts : []).entries()) {
      if (!isRecord(part) || !uniqueId(part.id) || !isText(part.label, 160) || !isText(part.description, 1000) || part.parentId !== undefined && !uniqueId(part.parentId) || !isRecord(part.shape)) { add("INVALID_ANATOMY_PART", `/parts/${index}`, "Parts require stable IDs, readable labels/descriptions, optional parent IDs, and bounded shapes."); continue; }
      if (parts.has(part.id)) add("DUPLICATE_ANATOMY_PART_ID", `/parts/${index}/id`, "Anatomy part IDs must be unique.");
      parts.set(part.id, part);
      const shape = part.shape;
      const values = shape.type === "circle" ? [shape.cx, shape.cy, shape.r] : shape.type === "ellipse" ? [shape.cx, shape.cy, shape.rx, shape.ry] : shape.type === "rect" ? [shape.x, shape.y, shape.width, shape.height] : [];
      if (["circle", "ellipse", "rect"].includes(shape.type)) {
        if (values.some((value) => !isFiniteNumber(value, 0, 2000)) || (shape.type === "circle" && shape.r === 0) || (shape.type === "ellipse" && (!shape.rx || !shape.ry)) || (shape.type === "rect" && (!shape.width || !shape.height))) add("INVALID_ANATOMY_SHAPE", `/parts/${index}/shape`, "Shape geometry must be finite, positive and within the viewBox coordinate cap.");
      } else if (shape.type === "polygon") {
        if (!Array.isArray(shape.points) || shape.points.length < 3 || shape.points.length > 128 || shape.points.some((point) => !Array.isArray(point) || point.length !== 2 || point.some((value) => !isFiniteNumber(value, 0, 2000)))) add("INVALID_ANATOMY_SHAPE", `/parts/${index}/shape/points`, "Polygon shapes require 3–128 bounded [x,y] points.");
      } else add("INVALID_ANATOMY_SHAPE", `/parts/${index}/shape/type`, "Only circle, ellipse, rect, and polygon shapes are supported.");
    }
    for (const [index, part] of (Array.isArray(props.parts) ? props.parts : []).entries()) if (part?.parentId && !parts.has(part.parentId)) add("UNKNOWN_ANATOMY_PARENT", `/parts/${index}/parentId`, "Anatomy parents must reference declared parts.");
    const state = new Map();
    function visit(id) {
      if (state.get(id) === 1) return false;
      if (state.get(id) === 2) return true;
      state.set(id, 1);
      const parent = parts.get(id)?.parentId;
      if (parent && parts.has(parent) && !visit(parent)) return false;
      state.set(id, 2);
      return true;
    }
    for (const [index, part] of (Array.isArray(props.parts) ? props.parts : []).entries()) if (parts.has(part?.id) && !visit(part.id)) { add("ANATOMY_CYCLE", `/parts/${index}/parentId`, "Anatomy hierarchy must be acyclic."); break; }
  } else if (type === "animationTimeline") {
    allow("durationMs", "frames"); requireCopy();
    bounded(props.durationMs, 100, 120_000, "/durationMs", "Animation duration");
    if (!Array.isArray(props.frames) || props.frames.length < 2 || props.frames.length > 100) add("INVALID_ANIMATION_FRAMES", "/frames", "Animation timelines require 2–100 frames.");
    let previousTime = -1;
    const frameIds = new Set();
    for (const [index, frame] of (Array.isArray(props.frames) ? props.frames : []).entries()) {
      if (!isRecord(frame) || !uniqueId(frame.id) || !isText(frame.label, 160) || !isFiniteNumber(frame.timeMs, 0, 120_000) || frame.timeMs > props.durationMs || !Object.hasOwn(frame, "value") || frame.value !== null && typeof frame.value === "object" || typeof frame.value === "number" && !Number.isFinite(frame.value)) { add("INVALID_ANIMATION_FRAME", `/frames/${index}`, "Frames require stable IDs, readable labels, bounded time and a finite scalar value."); continue; }
      if (frameIds.has(frame.id) || frame.timeMs <= previousTime) add("INVALID_ANIMATION_FRAME", `/frames/${index}`, "Frame IDs must be unique and times strictly increasing.");
      frameIds.add(frame.id); previousTime = frame.timeMs;
    }
  }

  checkKeys();
  return issues;
}
