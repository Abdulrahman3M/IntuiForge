const finite = (value) => typeof value === "number" && Number.isFinite(value);

/** Perspective-project an allowlisted local triangle mesh to normalized SVG coordinates. */
export function projectMesh(model, { yaw = 0.65, pitch = -0.35, scale = 1, width = 100, height = 100 } = {}) {
  if (model?.format !== "intuiforge.mesh.v1" || !Array.isArray(model.vertices) || !Array.isArray(model.faces) || model.vertices.length > 256 || model.faces.length > 512) throw new TypeError("Unsupported or unbounded mesh model.");
  if (![yaw, pitch, scale, width, height].every(finite) || scale < 0.1 || scale > 8 || width <= 0 || height <= 0) throw new RangeError("Mesh camera values must be finite and bounded.");
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const projected = model.vertices.map((vertex) => {
    if (!Array.isArray(vertex) || vertex.length !== 3 || !vertex.every((value) => finite(value) && Math.abs(value) <= 1000)) throw new TypeError("Invalid mesh vertex.");
    const x = vertex[0] * cy - vertex[2] * sy;
    const z = vertex[0] * sy + vertex[2] * cy;
    const y = vertex[1] * cp - z * sp;
    const depth = vertex[1] * sp + z * cp;
    const perspective = 1 / Math.max(0.25, 4 - depth);
    return { x: width / 2 + x * width * 0.28 * scale * perspective, y: height / 2 - y * height * 0.28 * scale * perspective, depth };
  });
  return model.faces.map((face, index) => {
    if (!Array.isArray(face) || face.length !== 3 || face.some((vertex) => !Number.isInteger(vertex) || vertex < 0 || vertex >= projected.length)) throw new TypeError(`Invalid mesh face ${index}.`);
    return face.map((vertex) => projected[vertex]);
  });
}

/** Equirectangular projection for local/offline geographic data. */
export function projectGeoPoint(coordinates, bounds) {
  const [longitude, latitude] = coordinates ?? [];
  if (!finite(longitude) || !finite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) throw new RangeError("Invalid geographic coordinate.");
  if (!bounds || ![bounds.west, bounds.south, bounds.east, bounds.north].every(finite) || bounds.west >= bounds.east || bounds.south >= bounds.north) throw new RangeError("Invalid geographic bounds.");
  return Object.freeze({ x: (longitude - bounds.west) / (bounds.east - bounds.west) * 100, y: 100 - (latitude - bounds.south) / (bounds.north - bounds.south) * 100 });
}

/** Parent-first stable hierarchy; disconnected/cyclic data is rejected instead of hidden. */
export function flattenAnatomy(parts) {
  if (!Array.isArray(parts) || parts.length > 200) throw new TypeError("Anatomy parts must be a bounded array.");
  const byId = new Map(parts.map((part) => [part.id, part]));
  if (byId.size !== parts.length || parts.some((part) => part.parentId && !byId.has(part.parentId))) throw new TypeError("Anatomy hierarchy has duplicate or missing parts.");
  const result = [];
  const visiting = new Set();
  const visited = new Set();
  const visit = (part, depth) => {
    if (visiting.has(part.id)) throw new TypeError("Anatomy hierarchy contains a cycle.");
    if (visited.has(part.id)) return;
    visiting.add(part.id);
    result.push(Object.freeze({ id: part.id, label: part.label, description: part.description, depth }));
    for (const child of parts) if (child.parentId === part.id) visit(child, depth + 1);
    visiting.delete(part.id);
    visited.add(part.id);
  };
  for (const part of parts) if (!part.parentId) visit(part, 0);
  if (visited.size !== parts.length) throw new TypeError("Anatomy hierarchy is cyclic or disconnected.");
  return result;
}
