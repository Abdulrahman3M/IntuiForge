/* Pure orthogonal connector routing: card-aware ports, obstacle clearance and rounded corners. */
const EPS = 0.001;
const point = (x, y) => ({ x, y });
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
export function segmentHitsRect(a, b, r) {
  if (Math.abs(a.x - b.x) < EPS) return a.x > r.left + EPS && a.x < r.right - EPS && Math.max(a.y, b.y) > r.top + EPS && Math.min(a.y, b.y) < r.bottom - EPS;
  if (Math.abs(a.y - b.y) < EPS) return a.y > r.top + EPS && a.y < r.bottom - EPS && Math.max(a.x, b.x) > r.left + EPS && Math.min(a.x, b.x) < r.right - EPS;
  return true;
}
const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
const padded = (r, p) => ({ left: r.left - p, right: r.right + p, top: r.top - p, bottom: r.bottom + p });
const simplify = (points) => points.filter((p, i) => !i || p.x !== points[i - 1].x || p.y !== points[i - 1].y).filter((p, i, all) => !i || i === all.length - 1 || !((all[i - 1].x === p.x && p.x === all[i + 1].x) || (all[i - 1].y === p.y && p.y === all[i + 1].y)));

function sides(s, t) {
  if (t.left >= s.right) return ['right', 'left'];
  if (t.right <= s.left) return ['left', 'right'];
  return (t.top + t.bottom) / 2 >= (s.top + s.bottom) / 2 ? ['bottom', 'top'] : ['top', 'bottom'];
}
function port(r, side, offset, gap) {
  const x = (r.left + r.right) / 2, y = (r.top + r.bottom) / 2;
  const delta = Math.max(-Math.min(r.width, r.height) / 3, Math.min(Math.min(r.width, r.height) / 3, offset));
  if (side === 'left') return point(r.left - gap, y + delta);
  if (side === 'right') return point(r.right + gap, y + delta);
  if (side === 'top') return point(x + delta, r.top - gap);
  return point(x + delta, r.bottom + gap);
}

class MinHeap {
  items = [];
  push(item) { let i = this.items.length; this.items.push(item); while (i) { const p = (i - 1) >> 1; if (this.items[p].f <= item.f) break; this.items[i] = this.items[p]; i = p; } this.items[i] = item; }
  pop() { const first = this.items[0], last = this.items.pop(); if (!this.items.length) return first; let i = 0; while (i * 2 + 1 < this.items.length) { let c = i * 2 + 1; if (c + 1 < this.items.length && this.items[c + 1].f < this.items[c].f) c++; if (this.items[c].f >= last.f) break; this.items[i] = this.items[c]; i = c; } this.items[i] = last; return first; }
}

function findPath(start, end, obstacles) {
  const clear = (a, b) => !obstacles.some((r) => segmentHitsRect(a, b, r));
  const candidates = [
    [start, point(end.x, start.y), end], [start, point(start.x, end.y), end],
    [start, point((start.x + end.x) / 2, start.y), point((start.x + end.x) / 2, end.y), end],
    [start, point(start.x, (start.y + end.y) / 2), point(end.x, (start.y + end.y) / 2), end],
  ];
  const direct = candidates.filter((path) => path.slice(1).every((p, i) => clear(path[i], p)));
  if (direct.length) return simplify(direct.sort((a, b) => a.reduce((sum, p, i) => sum + (i ? distance(a[i - 1], p) : 0), 0) - b.reduce((sum, p, i) => sum + (i ? distance(b[i - 1], p) : 0), 0))[0]);
  // Sparse channel grid; created only when a simple route is blocked. Search neighbours lazily.
  const xs = [...new Set([start.x, end.x, ...obstacles.flatMap((r) => [r.left - 1, r.right + 1])])].sort((a, b) => a - b);
  const ys = [...new Set([start.y, end.y, ...obstacles.flatMap((r) => [r.top - 1, r.bottom + 1])])].sort((a, b) => a - b);
  const nx = xs.length, key = (x, y, dir) => (y * nx + x) * 3 + dir;
  const sx = xs.indexOf(start.x), sy = ys.indexOf(start.y), tx = xs.indexOf(end.x), ty = ys.indexOf(end.y);
  const heap = new MinHeap(), costs = new Map(), previous = new Map(), entries = new Map();
  const first = { x: sx, y: sy, dir: 0, key: key(sx, sy, 0), g: 0, f: distance(start, end) };
  heap.push(first); costs.set(first.key, 0); entries.set(first.key, first);
  while (heap.items.length) {
    const cur = heap.pop(); if (cur.g !== costs.get(cur.key)) continue;
    if (cur.x === tx && cur.y === ty) { const points = []; let id = cur.key; while (id !== undefined) { const e = entries.get(id); points.push(point(xs[e.x], ys[e.y])); id = previous.get(id); } return simplify(points.reverse()); }
    for (const [dx, dy, dir] of [[1, 0, 1], [-1, 0, 1], [0, 1, 2], [0, -1, 2]]) {
      const x = cur.x + dx, y = cur.y + dy; if (x < 0 || y < 0 || x >= nx || y >= ys.length) continue;
      const a = point(xs[cur.x], ys[cur.y]), b = point(xs[x], ys[y]); if (!clear(a, b)) continue;
      const id = key(x, y, dir), g = cur.g + distance(a, b) + (cur.dir && cur.dir !== dir ? 24 : 0);
      if (g >= (costs.get(id) ?? Infinity)) continue;
      const entry = { x, y, dir, key: id, g, f: g + distance(b, end) };
      costs.set(id, g); previous.set(id, cur.key); entries.set(id, entry); heap.push(entry);
    }
  }
  // Overlapping authored cards may enclose a port; keep the relationship visible rather than omit it.
  return candidates[0];
}

export function roundedPath(points, radius = 10) {
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1], b = points[i], c = points[i + 1];
    const r = Math.min(radius, distance(a, b) / 2, distance(b, c) / 2);
    const before = point(b.x + Math.sign(a.x - b.x) * r, b.y + Math.sign(a.y - b.y) * r);
    const after = point(b.x + Math.sign(c.x - b.x) * r, b.y + Math.sign(c.y - b.y) * r);
    d += ` L${before.x} ${before.y} Q${b.x} ${b.y} ${after.x} ${after.y}`;
  }
  return `${d} L${points.at(-1).x} ${points.at(-1).y}`;
}

function labelPosition(text, points, obstacles, used) {
  const width = Math.max(36, Array.from(text).length * 8.8 + 20), height = 28;
  const segments = points.slice(1).map((b, i) => ({ a: points[i], b, length: distance(points[i], b) })).sort((a, b) => b.length - a.length);
  for (const { a, b } of segments) for (const offset of [0, -19, 19, -38, 38, -64, 64, -96, 96, -140, 140, -180, 180]) {
    const x = (a.x + b.x) / 2 + (a.x === b.x ? offset + Math.sign(offset) * width / 2 : 0);
    const y = (a.y + b.y) / 2 + (a.y === b.y ? offset : 0);
    const box = { left: x - width / 2, right: x + width / 2, top: y - height / 2, bottom: y + height / 2 };
    const anchor = point((a.x + b.x) / 2, (a.y + b.y) / 2);
    const near = a.x === b.x ? point(x - Math.sign(offset) * width / 2, y) : point(x, y - Math.sign(offset) * height / 2);
    if (![...obstacles, ...used].some((r) => overlaps(box, r)) && !obstacles.some((r) => segmentHitsRect(anchor, near, r))) return { x, y, box, leader: Math.abs(offset) > 38 ? [anchor, near] : null };
  }
  const x = Math.max(...obstacles.map((r) => r.right)) + width / 2 + 20, y = used.length * 34;
  return { x, y, box: { left: x - width / 2, right: x + width / 2, top: y - height / 2, bottom: y + height / 2 } };
}

export function routeGraph(nodes, edges) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const ports = new Map(), records = [];
  for (const edge of edges) {
    const s = byId.get(edge.from), t = byId.get(edge.to); if (!s || !t) continue;
    const [sourceSide, targetSide] = sides(s, t);
    const record = { ...edge, s, t, sourceSide, targetSide }; records.push(record);
    for (const [id, side, field] of [[s.id, sourceSide, 'source'], [t.id, targetSide, 'target']]) { const key = `${id}:${side}`; if (!ports.has(key)) ports.set(key, []); ports.get(key).push({ record, field }); }
  }
  for (const group of ports.values()) group.forEach(({ record, field }, i) => { record[`${field}Offset`] = (i - (group.length - 1) / 2) * 18; });
  const obstacles = nodes.map((node) => padded(node, 12)), usedLabels = [];
  return records.map(({ s, t, sourceSide, targetSide, sourceOffset, targetOffset, ...edge }) => {
    const start = port(s, sourceSide, sourceOffset, 4), end = port(t, targetSide, targetOffset, 4);
    const outerStart = port(s, sourceSide, sourceOffset, 26), outerEnd = port(t, targetSide, targetOffset, 26);
    const points = simplify([start, ...findPath(outerStart, outerEnd, obstacles), end]);
    const label = edge.label ? labelPosition(edge.label, points, obstacles, usedLabels) : null;
    if (label) usedLabels.push(label.box);
    return { ...edge, labelText: edge.label || '', sourceSide, targetSide, points, d: roundedPath(points), label: label ? { x: label.x, y: label.y } : null, labelBox: label?.box || null, labelLeader: label?.leader || null };
  });
}
