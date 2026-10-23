# Security, Privacy & Resource Threat Model

## Trust zones
A. **Untrusted:** imported JSON/Markdown/media descriptors, AI generated article packages, arbitrary external URLs, scientific/3D model assets, ZIP input, user-entered formulas.
B. **Trusted by build:** reviewed, pinned/attributed UI and visualization modules and plugins installed by project owner.
C. **Host-authorized capabilities:** approved navigation, persistence, authenticated APIs, optional external network/maps, file export.

All untrusted input must traverse schema normalization and capability permission before reaching the DOM or privileged adapters; never trust JS objects simply because they skipped JSON parsing.

## Threats and hard controls
- XSS/unsafe HTML/SVG, `javascript:`, URL handler abuse: no raw HTML/unsafe SVG injection, strict URL allowlists and sanitization, CSP-friendly renderer.
- Arbitrary action code: no `eval`, `Function`, source-defined JS, dynamic import of article-provided modules, or direct endpoint strings from articles. Use bounded AST and declared host capabilities.
- ZIP path traversal/symlinks/zip bombs: read-only audit, bounded decompression, reject absolute/`..`/symlink entries and suspicious sizes before extraction; never overwrite project source blindly.
- Plugins: pinned versions/licensing/trust/capability checks, isolate optional plugins, no plugin auto-download, no consumer-secret logging.
- Data exfiltration: no silent network calls, no cookies/tokens in traces; external data adapter requires host consent/config and redacted error logs.
- Resource DoS: max nodes, rows, coordinates, depth, media sizes and execution budgets, cancellation on dispose, gracefully inform reader of limits. Large article remains readable when 3D unavailable.
- User progress: host-owned and optional, not embedded into shipped public article package; stable IDs, explicit per-user scoped adapter; no hidden SQLite served as static assets.
- Accessibility as security-of-understanding: errors, status and dangerous user actions must not be conveyed only by color or animation.

## QA adversarial inputs
- Object with unexpected fields, nonplain prototype, cyclic graph, schema mismatch.
- Malicious `<script>`, event handlers, dangerous protocols, remote media with invalid origin, traversal path, oversized string, malformed SVG.
- Derived state dependency cycle, divide by zero, infinite loop, huge table, 10k knowledge nodes, 3D context loss, offline data source, CSP-blocked feature.
- Wrong CDP port process, browser profile mismatch, remote/local loopback confusion.

## Remediation rule
Failures block affected security gate. Do not relax validator, disable CSP, or inject arbitrary JS to make an example render. Evidence of unsupported environment ⇒ `UNVERIFIED`, not `PASS`.
