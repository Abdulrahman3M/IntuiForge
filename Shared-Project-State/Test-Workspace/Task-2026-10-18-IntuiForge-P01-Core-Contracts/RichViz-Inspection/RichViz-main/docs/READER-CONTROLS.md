## Unified Reader Controls and Connectors (0.5.0)

Graph readers share one persistent, single-row toolbar across static and interactive views: Zoom In, Zoom Out, Fit to View (target icon), Fullscreen (corner icon), view toggle and Text Version. Small screens scroll the toolbar horizontally without wrapping or widening the page. Other renderers expose their supported controls in the same toolbar component; they do not claim unsupported zoom or interactive capabilities.

Every icon-only control must have a clear localized tooltip on hover/focus and an accessible label. Use `controlButton()`/`setControlLabel()` and the shared toolbar; never reuse one ambiguous glyph for different actions. Fullscreen requires browser permission and user activation; report denial without claiming success.

Static and interactive node maps / React Flow specifications share rounded orthogonal routing, grouped card-edge ports, obstacle clearance, aligned arrow tips and label backgrounds. Interactive connectors inherit the engine viewport transform and reroute only when measured card sizes change. Selection stays accessible; observers and listeners are disposed with their graph. Existing cards, source JSON and relationship direction are preserved. Process-card/flow renderers keep their semantic layout; independent vendor engines retain their own connectors.

Focused checks: `node --test tests/controls-connectors.test.mjs`; existing registry, stylesheet, layout and lifecycle checks remain required. Verify RTL/LTR, narrow widths, all controls, label clearance and viewport alignment in a real browser.
