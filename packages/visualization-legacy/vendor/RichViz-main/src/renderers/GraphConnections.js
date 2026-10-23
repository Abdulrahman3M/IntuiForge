/* Rich Viz owns routing; React Flow continues to own its viewport and unchanged node cards. */
import { svgEl, uid } from '../RichVisualizationDom.js';
import { routeGraph } from '../RichVisualizationConnectors.js';

export const GRAPH_ARROW = Object.freeze({ size: 10, tipX: 10, tipY: 5 });

export function connectorGroup(nodes, edges, id = uid('rev-edge')) {
  const routes = routeGraph(nodes, edges), paths = [];
  const group = svgEl('g', { class: 'rev-connectors', 'aria-hidden': 'true' });
  const marker = `${id}-arrow`;
  group.append(svgEl('defs', {}, [svgEl('marker', { id: marker, markerWidth: 10, markerHeight: 10, refX: 10, refY: 5, orient: 'auto', markerUnits: 'userSpaceOnUse' }, [svgEl('path', { d: 'M0 0 L10 5 L0 10 z', class: 'rev-map__head' })])]));
  for (const route of routes) {
    const edge = svgEl('g', { class: 'rev-connector', 'data-edge-id': route.id });
    const path = svgEl('path', { class: 'rev-map__edge', d: route.d, 'marker-end': `url(#${marker})` });
    edge.append(path);
    if (route.label) {
      const { labelBox: box, label: label } = route;
      if (route.labelLeader) edge.append(svgEl('path', { class: 'rev-connector__label-leader', d: `M${route.labelLeader[0].x} ${route.labelLeader[0].y} L${route.labelLeader[1].x} ${route.labelLeader[1].y}` }));
      edge.append(svgEl('rect', { class: 'rev-connector__label-bg', x: box.left, y: box.top, width: box.right - box.left, height: box.bottom - box.top, rx: 6 }));
      const text = svgEl('text', { class: 'rev-map__edgelabel', x: label.x, y: label.y, 'text-anchor': 'middle', 'dominant-baseline': 'central' });
      text.textContent = route.labelText; edge.append(text);
    }
    paths.push({ element: edge, path, from: route.from, to: route.to }); group.append(edge);
  }
  const points = [...nodes.flatMap((n) => [{ x: n.left, y: n.top }, { x: n.right, y: n.bottom }]), ...routes.flatMap((r) => [...r.points, ...(r.labelBox ? [{ x: r.labelBox.left, y: r.labelBox.top }, { x: r.labelBox.right, y: r.labelBox.bottom }] : [])])];
  const left = Math.min(...points.map((p) => p.x)) - 32, top = Math.min(...points.map((p) => p.y)) - 32;
  const bounds = { x: left, y: top, width: Math.max(...points.map((p) => p.x)) - left + 32, height: Math.max(...points.map((p) => p.y)) - top + 32 };
  return { group, paths, bounds, routes };
}

export function highlightConnections(paths, selected) {
  for (const { element, path, from, to } of paths) {
    const hot = Boolean(selected && (from === selected || to === selected));
    element.toggleAttribute('data-dim', Boolean(selected && !hot));
    path.toggleAttribute('data-hot', hot);
  }
}

export function mountInteractiveConnections(host, model) {
  let disposed = false, frame = 0, svg = null, signature = '', paths = [], known = [];
  const schedule = () => { if (!disposed) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); } };
  const resize = new ResizeObserver(schedule);
  const selection = new MutationObserver(schedule);
  const startup = new MutationObserver(schedule);
  const draw = () => {
    if (disposed) return;
    const viewport = host.querySelector('.react-flow__viewport'), layer = host.querySelector('.react-flow__nodes');
    const elements = [...host.querySelectorAll('.react-flow__node')];
    if (!viewport || !layer || elements.length !== model.nodes.length || elements.some((n) => !n.offsetWidth)) return;
    if (!svg) {
      startup.disconnect();
      svg = svgEl('svg', { class: 'rev-live-connectors', 'aria-hidden': 'true', focusable: 'false' });
      viewport.insertBefore(svg, layer);
      host.dataset.revConnectors = 'true'; known = elements;
      for (const node of known) resize.observe(node);
      resize.observe(host);
      selection.observe(layer, { subtree: true, attributes: true, attributeFilter: ['aria-pressed'] });
    }
    const byId = new Map(known.map((element) => [element.dataset.id, element]));
    const nodes = model.nodes.map((node) => {
      const dom = byId.get(node.id), { x, y } = node.position;
      return { id: node.id, left: x, top: y, right: x + dom.offsetWidth, bottom: y + dom.offsetHeight, width: dom.offsetWidth, height: dom.offsetHeight };
    });
    const next = nodes.map((n) => `${n.id}:${n.width}:${n.height}`).join('|');
    if (next !== signature) { const result = connectorGroup(nodes, model.edges); svg.replaceChildren(result.group); paths = result.paths; signature = next; }
    const selected = known.find((node) => node.querySelector('[aria-pressed="true"]'))?.dataset.id;
    highlightConnections(paths, selected);
  };
  startup.observe(host, { childList: true, subtree: true }); schedule();
  return { redraw: schedule, dispose() { disposed = true; cancelAnimationFrame(frame); startup.disconnect(); selection.disconnect(); resize.disconnect(); svg?.remove(); delete host.dataset.revConnectors; known = []; paths = []; } };
}
