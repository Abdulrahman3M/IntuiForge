import test from 'node:test';
import assert from 'node:assert/strict';
import { routeGraph, segmentHitsRect } from '../src/RichVisualizationConnectors.js';
import { zoomViewBox, CONTROL_ICONS } from '../src/RichVisualizationControls.js';

const rect = (id, x, y, w = 200, h = 100) => ({ id, left: x, top: y, right: x + w, bottom: y + h, width: w, height: h });
function assertSafe(nodes, routes) {
  for (const route of routes) {
    assert.ok(route.points.length >= 2);
    for (let i = 1; i < route.points.length; i++) {
      const a = route.points[i - 1], b = route.points[i];
      assert.ok(a.x === b.x || a.y === b.y, 'orthogonal segments');
      for (const node of nodes) assert.equal(segmentHitsRect(a, b, node), false, `edge ${route.id} crosses ${node.id}`);
    }
    for (const node of nodes) {
      const end = route.points.at(-1);
      assert.ok(end.x < node.left || end.x > node.right || end.y < node.top || end.y > node.bottom, 'arrow tip stays outside card');
      if (route.labelBox) assert.ok(route.labelBox.right <= node.left || route.labelBox.left >= node.right || route.labelBox.bottom <= node.top || route.labelBox.top >= node.bottom, 'label avoids cards');
    }
  }
}
test('connectors route around intervening cards and preserve direction', () => {
  const nodes = [rect('a', 0, 0), rect('blocker', 270, 0), rect('b', 550, 0)];
  const before = structuredClone(nodes);
  const routes = routeGraph(nodes, [{ id: 'ab', from: 'a', to: 'b', label: 'An important relationship' }]);
  assertSafe(nodes, routes);
  assert.deepEqual(nodes, before);
  assert.equal(routes[0].from, 'a'); assert.equal(routes[0].to, 'b');
  assert.match(routes[0].d, /^M/); assert.match(routes[0].d, /Q/);
});
test('vertical, reciprocal, branching and RTL connections avoid cards', () => {
  for (const flip of [1, -1]) {
    const nodes = [rect('a', flip * 400, 0), rect('b', flip * 100, 240), rect('c', flip * 700, 240)];
    const edges = [{ id: 'ab', from: 'a', to: 'b' }, { id: 'ba', from: 'b', to: 'a' }, { id: 'ac', from: 'a', to: 'c' }, { id: 'bc', from: 'b', to: 'c' }];
    const routes = routeGraph(nodes, edges);
    assertSafe(nodes, routes); assert.equal(routes.length, edges.length);
    assert.notEqual(routes[0].d, routes[1].d);
    assert.deepEqual(routeGraph(nodes, edges), routes, 'deterministic routes');
  }
});
test('parallel edges receive distinct ports and labels', () => {
  const nodes = [rect('a', 0, 0), rect('b', 380, 0)];
  const routes = routeGraph(nodes, [{ id: 'one', from: 'a', to: 'b', label: 'One' }, { id: 'two', from: 'a', to: 'b', label: 'Two' }]);
  assertSafe(nodes, routes); assert.notEqual(routes[0].d, routes[1].d);
  assert.notDeepEqual(routes[0].label, routes[1].label);
});
test('static zoom remains centered and Fit restores the original bounds', () => {
  const box = { x: -40, y: -40, width: 800, height: 400 };
  const zoomed = zoomViewBox(box, 2);
  assert.equal(zoomed.width, 400); assert.equal(zoomed.height, 200);
  assert.equal(zoomed.x + zoomed.width / 2, box.x + box.width / 2);
  assert.deepEqual(zoomViewBox(box, 1), box);
  assert.notEqual(CONTROL_ICONS.fitView, CONTROL_ICONS.fullscreen);
});
