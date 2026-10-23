/** Namespaced rules appended only inside the article renderer's scoped root. */
export const SCIENTIFIC_CSS = `
.if-science-widget { display:grid; min-width:0; gap:1rem; margin-block:1.25rem; color:var(--if-article-text); }
.if-science-title { margin:0; font-size:1.25rem; line-height:1.4; }
.if-science-description, .if-science-status, .if-science-output, .if-science-results, .if-science-text-alternative, .if-science-map-selection { font-size:max(1rem, 16px); line-height:1.65; }
.if-science-description { max-width:68ch; color:var(--if-article-muted); }
.if-science-controls { display:flex; flex-wrap:wrap; align-items:end; gap:.75rem; }
.if-science-control { display:grid; gap:.35rem; min-width:min(100%, 13rem); }
.if-science-control input, .if-science-control select { width:100%; min-height:44px; accent-color:var(--if-article-accent); }
.if-science-value { color:var(--if-article-muted); }
.if-science-chart, .if-science-timeline-stage { min-width:0; overflow:hidden; border:1px solid var(--if-article-border); border-radius:var(--if-article-radius, .75rem); background:var(--if-article-surface); }
.if-science-chart svg { display:block; width:100%; min-height:12rem; max-height:28rem; }
.if-science-axis { fill:none; stroke:var(--if-article-border); stroke-width:2; }
.if-science-axis-label { fill:var(--if-article-muted); font:16px sans-serif; }
.if-science-trajectory, .if-science-graph-line { fill:none; stroke:var(--if-article-accent); stroke-width:4; stroke-linecap:round; stroke-linejoin:round; }
.if-science-projectile, .if-science-graph-point { fill:var(--if-article-accent); stroke:var(--if-article-surface); stroke-width:2; }
.if-science-results { display:grid; grid-template-columns:minmax(8rem, max-content) minmax(5rem, 1fr); gap:.4rem 1rem; max-width:32rem; margin:0; }
.if-science-results dt { color:var(--if-article-muted); }
.if-science-results dd { margin:0; font-weight:700; }
.if-science-mesh-face { fill:color-mix(in srgb, var(--if-article-accent) 28%, var(--if-article-surface)); stroke:var(--if-article-accent); stroke-width:2; vector-effect:non-scaling-stroke; }
.if-science-map-feature { fill:none; stroke:var(--if-article-muted); stroke-width:2; vector-effect:non-scaling-stroke; }
.if-science-map-marker { fill:var(--if-article-accent); stroke:var(--if-article-surface); stroke-width:3; cursor:pointer; }
.if-science-layers, .if-science-text-alternative { min-width:0; max-height:20rem; overflow:auto; padding:1rem; border:1px solid var(--if-article-border); border-radius:.75rem; background:var(--if-article-surface); }
.if-science-layers legend { font-size:1rem; font-weight:700; }
.if-science-atom { fill:var(--if-article-surface); stroke:var(--if-article-accent); stroke-width:3; cursor:pointer; }
.if-science-element-O { fill:color-mix(in srgb, #e45b52 18%, var(--if-article-surface)); }
.if-science-element-H { fill:color-mix(in srgb, #5c8bd5 18%, var(--if-article-surface)); }
.if-science-bond { stroke:var(--if-article-muted); stroke-width:5; }
.if-science-atom-label { fill:var(--if-article-text); font:700 20px sans-serif; pointer-events:none; }
.if-science-anatomy-part { fill:color-mix(in srgb, var(--if-article-accent) 14%, var(--if-article-surface)); stroke:var(--if-article-accent); stroke-width:2; cursor:pointer; }
.if-science-anatomy-part.is-selected, .if-science-anatomy-part:focus { fill:color-mix(in srgb, var(--if-article-accent) 42%, var(--if-article-surface)); stroke-width:4; }
.if-science-formula { margin:0; font-size:1.25rem; font-weight:700; direction:ltr; text-align:start; }
.if-science-timeline-stage { position:relative; min-height:5rem; overflow:hidden; }
.if-science-timeline-marker { position:absolute; inset-block-start:50%; inset-inline-start:0; color:var(--if-article-accent); font-size:1.5rem; will-change:left; }
.if-science-keyframes { display:flex; flex-wrap:wrap; gap:.5rem 1.5rem; padding-inline-start:1.5rem; }
.if-science-keyframes li { font-size:1rem; }
.if-science-fallback { min-height:6rem; display:grid; place-items:center; padding:1rem; color:var(--if-article-muted); text-align:center; }
.if-science-widget button { min-height:44px; }
@media (max-width:40rem) { .if-science-controls { display:grid; grid-template-columns:minmax(0, 1fr); } .if-science-results { grid-template-columns:minmax(6rem, max-content) 1fr; } }
@media (prefers-reduced-motion: reduce) { .if-science-widget *, .if-science-widget *::before, .if-science-widget *::after { scroll-behavior:auto !important; animation-duration:.01ms !important; transition-duration:.01ms !important; } }
`;
