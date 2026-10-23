/* RichViz — pure graph layout (no DOM; unit-testable).
 *
 * rankNodes():   longest-path layering that tolerates cycles (back edges are ignored for ranking).
 * layerOrder():  stable ordering inside each layer by neighbour barycentre (two sweeps).
 * mapPositions(): x/y for the node-map family (layered, radial or grid) in a fixed design space.
 */
export const NODE_SIZE = Object.freeze({ width: 232, height: 120 });
const GAP = Object.freeze({ rank: 96, order: 36 });

function adjacency(ids, edges) {
  const out = new Map(ids.map((id) => [id, []]));
  const incoming = new Map(ids.map((id) => [id, []]));
  for (const edge of edges) {
    if (!out.has(edge.from) || !out.has(edge.to)) continue;
    out.get(edge.from).push(edge.to);
    incoming.get(edge.to).push(edge.from);
  }
  return { out, incoming };
}

/** Back edges found by DFS from nodes in source order; they are excluded from ranking so cycles do not loop. */
function forwardEdges(ids, edges) {
  const { out } = adjacency(ids, edges);
  const state = new Map();
  const back = new Set();
  const visit = (id) => {
    state.set(id, 1);
    for (const next of out.get(id)) {
      if (state.get(next) === 1) back.add(`${id}>${next}`);
      else if (!state.get(next)) visit(next);
    }
    state.set(id, 2);
  };
  const { incoming } = adjacency(ids, edges);
  // Start from real sources first so the author's top-to-bottom order wins; then any remaining nodes.
  ids.filter((id) => !incoming.get(id).length).forEach((id) => { if (!state.get(id)) visit(id); });
  ids.forEach((id) => { if (!state.get(id)) visit(id); });
  return edges.filter((edge) => !back.has(`${edge.from}>${edge.to}`));
}

export function rankNodes(ids, edges) {
  const forward = forwardEdges(ids, edges);
  const { out, incoming } = adjacency(ids, forward);
  const rank = new Map(ids.map((id) => [id, 0]));
  const pending = new Map(ids.map((id) => [id, incoming.get(id).length]));
  const queue = ids.filter((id) => pending.get(id) === 0);
  while (queue.length) {
    const id = queue.shift();
    for (const next of out.get(id)) {
      rank.set(next, Math.max(rank.get(next), rank.get(id) + 1));
      pending.set(next, pending.get(next) - 1);
      if (pending.get(next) === 0) queue.push(next);
    }
  }
  return { rank, forward };
}

export function layerOrder(ids, edges) {
  const { rank, forward } = rankNodes(ids, edges);
  const depth = Math.max(0, ...rank.values());
  const layers = Array.from({ length: depth + 1 }, () => []);
  ids.forEach((id) => layers[rank.get(id)].push(id));
  const { out, incoming } = adjacency(ids, forward);
  const position = new Map();
  const reindex = () => layers.forEach((layer) => layer.forEach((id, index) => position.set(id, index)));
  reindex();
  const sweep = (neighbours, layerList) => {
    for (const layer of layerList) {
      const score = new Map(layer.map((id) => {
        const near = neighbours.get(id).filter((n) => position.has(n));
        return [id, near.length ? near.reduce((sum, n) => sum + position.get(n), 0) / near.length : position.get(id)];
      }));
      layer.sort((a, b) => score.get(a) - score.get(b) || position.get(a) - position.get(b));
      layer.forEach((id, index) => position.set(id, index));
    }
  };
  sweep(incoming, layers.slice(1));
  sweep(out, layers.slice(0, -1).reverse());
  return { layers, rank, forward };
}

function layered(nodes, edges, direction) {
  const ids = nodes.map((node) => node.id);
  const { layers } = layerOrder(ids, edges);
  const widest = Math.max(...layers.map((layer) => layer.length));
  const horizontal = direction !== "TB";
  const positions = new Map();
  const stepRank = (horizontal ? NODE_SIZE.width : NODE_SIZE.height) + GAP.rank;
  const stepOrder = (horizontal ? NODE_SIZE.height : NODE_SIZE.width) + GAP.order;
  layers.forEach((layer, rankIndex) => {
    const offset = ((widest - layer.length) * stepOrder) / 2;
    layer.forEach((id, orderIndex) => {
      const along = rankIndex * stepRank;
      const across = offset + orderIndex * stepOrder;
      positions.set(id, horizontal ? { x: along, y: across } : { x: across, y: along });
    });
  });
  return positions;
}

function radial(nodes, edges) {
  const ids = nodes.map((node) => node.id);
  const { out, incoming } = adjacency(ids, edges);
  const degree = (id) => out.get(id).length + incoming.get(id).length;
  const root = [...ids].sort((a, b) => degree(b) - degree(a) || ids.indexOf(a) - ids.indexOf(b))[0];
  const ring = new Map([[root, 0]]);
  const queue = [root];
  while (queue.length) {
    const id = queue.shift();
    for (const next of [...out.get(id), ...incoming.get(id)]) if (!ring.has(next)) { ring.set(next, ring.get(id) + 1); queue.push(next); }
  }
  ids.forEach((id) => { if (!ring.has(id)) ring.set(id, Math.max(...ring.values()) + 1); });
  const rings = new Map();
  ids.forEach((id) => rings.set(ring.get(id), [...(rings.get(ring.get(id)) || []), id]));
  const positions = new Map();
  const radiusStep = NODE_SIZE.width * 0.95 + GAP.rank;
  for (const [level, members] of rings) {
    if (level === 0) { positions.set(members[0], { x: 0, y: 0 }); continue; }
    const radius = level * radiusStep;
    members.forEach((id, index) => {
      const angle = (index / members.length) * Math.PI * 2 - Math.PI / 2;
      positions.set(id, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * 0.72 });
    });
  }
  return positions;
}

function grid(nodes) {
  const columns = Math.max(1, Math.ceil(Math.sqrt(nodes.length * 1.6)));
  const positions = new Map();
  nodes.forEach((node, index) => positions.set(node.id, { x: (index % columns) * (NODE_SIZE.width + GAP.order * 2), y: Math.floor(index / columns) * (NODE_SIZE.height + GAP.order * 2) }));
  return positions;
}

/** Positions (top-left corners, origin shifted to 0,0) for a node-map spec's data. Author x/y always wins. */
export function mapPositions(data) {
  const base = data.layout === "radial" ? radial(data.nodes, data.edges) : data.layout === "grid" ? grid(data.nodes) : layered(data.nodes, data.edges, data.direction);
  const placed = data.nodes.map((node) => [node.id, node.x !== undefined ? { x: node.x, y: node.y } : base.get(node.id)]);
  const minX = Math.min(...placed.map(([, p]) => p.x));
  const minY = Math.min(...placed.map(([, p]) => p.y));
  return new Map(placed.map(([id, p]) => [id, { x: Math.round(p.x - minX), y: Math.round(p.y - minY) }]));
}

/** Bounding box of positioned nodes in design space. */
export function mapBounds(positions) {
  const points = [...positions.values()];
  return { width: Math.max(...points.map((p) => p.x)) + NODE_SIZE.width, height: Math.max(...points.map((p) => p.y)) + NODE_SIZE.height };
}
