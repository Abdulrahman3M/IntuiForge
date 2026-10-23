# Rich Viz Problems and Solutions

Before troubleshooting reader controls, connectors, layout or interaction, review this file and `READER-CONTROLS.md`; add reusable causes and guards after a new fix.

## Unified Toolbar and Geometry-Aware Connectors

 and measured connector routing (2026-10-08)

This entry supersedes the previous recommendation to remove visible Fit to View; keep the historical entry for traceability. Fit is now explicitly requested and useful after manual zoom/pan. Use a target icon for Fit and corner expansion for Fullscreen.

**Cause:** Duplicate glyphs hid distinct actions; controls belonged to different renderer layers. Interactive engine handles were fixed left/right and used generic paths without considering Rich Viz card geometry. Label positions could collide with cards or lose their relationship context.

**Central solution:** Use `RichVisualizationControls.js` for a persistent toolbar, localized hover/focus tooltip and accessible label on every icon-only action. Keep buttons in one row with horizontal overflow on narrow containers. Toggle text alternatives from that same row. Route graph edges through `RichVisualizationConnectors.js` / `GraphConnections.js` in both modes; allocate side ports, avoid padded card rectangles, round turns and anchor arrow tips to endpoints. Place labels in clear space and use a subtle leader when the nearby label needs offset clearance. Mount the interactive SVG in the existing viewport so pan/zoom never requires duplicate global listeners; hide native edges and native edge-label layers only after the replacement is ready. Dispose graph observers on mode change/unmount.

**Guards:** Exercise vertical, branching, reciprocal, parallel and RTL routes, input immutability and label clearance. Check actual browser geometry, single-row controls at 320px and larger widths, zoom/fit, text toggle, tooltip focus/hover and repeated mode switching. Browser-denied fullscreen is a limitation, not successful fullscreen verification. Keep InfoBank's shared-runtime URLs and local layout adaptations when updating from upstream.
