/* RichViz — trusted icon registry.
 *
 * Article data may only reference an icon by NAME. The SVG markup below is
 * project-owned, never article-supplied, so rendering it is safe. The set is
 * deliberately small, hand-written 24×24 line art (stroke 1.8) matching the
 * project's own icon style in Application/Core/Utils.js; that shared set has
 * no concept/technology glyphs (git, shield, database…), so this registry
 * adds only the educational ones the visualization families need.
 */
const ICONS = {
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.6-3.6 3.6-5.6 7.5-5.6s6.9 2 7.5 5.6"/>',
  users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M2.8 19.5c.5-3.2 3-5 6.2-5s5.7 1.8 6.2 5"/><path d="M16 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.6c2.3.4 3.7 2.1 4 4.9"/>',
  code: '<path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15"/>',
  terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2.2"/><path d="m7 9.5 3 2.5-3 2.5M12.5 15h4.5"/>',
  database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  server: '<rect x="3.5" y="4" width="17" height="6.5" rx="1.8"/><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.8"/><path d="M7 7.2h.01M7 16.8h.01M11 7.2h6M11 16.8h6"/>',
  cloud: '<path d="M7 18.5h10.2a4 4 0 0 0 .6-7.95A5.8 5.8 0 0 0 6.6 9.3 4.6 4.6 0 0 0 7 18.5Z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5Z"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5"/>',
  unlock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 7.6-1.7M12 14.5v2.5"/>',
  shield: '<path d="M12 3.5 19.5 6v5.6c0 4.4-3 7.8-7.5 9.4-4.5-1.6-7.5-5-7.5-9.4V6L12 3.5Z"/><path d="m8.8 12.2 2.3 2.3 4.2-4.4"/>',
  key: '<circle cx="8" cy="14" r="4"/><path d="m11 11 8.5-8.5M16 6l2.5 2.5M14 8l2 2"/>',
  "git-branch": '<circle cx="6.5" cy="5.5" r="2.2"/><circle cx="6.5" cy="18.5" r="2.2"/><circle cx="17.5" cy="8.5" r="2.2"/><path d="M6.5 7.7v8.6M17.5 10.7c0 4-4 4.3-9.3 6.4"/>',
  "git-merge": '<circle cx="6.5" cy="5.5" r="2.2"/><circle cx="6.5" cy="18.5" r="2.2"/><circle cx="17.5" cy="12" r="2.2"/><path d="M6.5 7.7v8.6M8.7 5.5c5 0 8.8 1.5 8.8 4.3"/>',
  "git-commit": '<circle cx="12" cy="12" r="3.6"/><path d="M3 12h5.4M15.6 12H21"/>',
  "git-pull-request": '<circle cx="6.5" cy="5.5" r="2.2"/><circle cx="6.5" cy="18.5" r="2.2"/><circle cx="17.5" cy="18.5" r="2.2"/><path d="M6.5 7.7v8.6M17.5 16.3V10a3 3 0 0 0-3-3H11M13.5 4.2 11 7l2.5 2.8"/>',
  file: '<path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4.3"/>',
  "file-text": '<path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4.3M9 12.5h6M9 16h6"/>',
  folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.6l2 2.2H19.5A1.5 1.5 0 0 1 21 8.7V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-11.5Z"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 17.5 5-4.5 3.5 3 3-2.5 4.5 4"/>',
  video: '<rect x="3" y="5.5" width="13" height="13" rx="2.2"/><path d="m16 10.5 5-3v9l-5-3"/>',
  mic: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.2"/><path d="m4 7.5 8 6 8-6"/>',
  message: '<path d="M4 5.5h16a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H10l-4.5 3.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M8 10h8M8 13h5"/>',
  bell: '<path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.6-4.6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6"/>',
  wrench: '<path d="M14.5 6.2a4 4 0 0 0 4.8 5.3l-8.3 8.3a2.1 2.1 0 0 1-3-3l8.3-8.3a4 4 0 0 0-1.8-2.3Z"/><path d="M14.5 6.2 17 8.7"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx=".8"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  bolt: '<path d="m13 3-8 10.5h6L10 21l9-11.5h-6.2L13 3Z"/>',
  rocket: '<path d="M14.5 4.5c2.8-.3 4.7-.2 5 .1.3.3.4 2.2.1 5L15 14.2 9.8 9l4.7-4.5Z"/><path d="m9.8 9-3.3.6L4 12.5l3.5.2M15 14.2l-.6 3.3-2.9 2.5-.2-3.5M6.2 16.8c-1.2.3-2 1.1-2.2 3.2 2.1-.2 2.9-1 3.2-2.2"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  flag: '<path d="M5.5 21V4M5.5 5h11.2l-2 3.7 2 3.8H5.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  "check-circle": '<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.3 2.7 2.7 5-5.3"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  "x-circle": '<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6M15 9l-6 6"/>',
  alert: '<path d="M12 3.5 21 20H3L12 3.5Z"/><path d="M12 9v4.8M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>',
  help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.3 9.6a2.8 2.8 0 0 1 5.4.9c0 1.9-2.7 2.3-2.7 4M12 17.3h.01"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17"/>',
  star: '<path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2L3 9.5l6.4-.6L12 3Z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/>',
  bookmark: '<path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4-6.5 4V4.5a1 1 0 0 1 1-1Z"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
  graduation: '<path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6.5 12v4.6c0 1.2 2.5 2.4 5.5 2.4s5.5-1.2 5.5-2.4V12M21.5 9.5V15"/>',
  lightbulb: '<path d="M8.8 15.8c-1.5-1.2-2.5-3-2.5-5.1a5.7 5.7 0 0 1 11.4 0c0 2.1-1 3.9-2.5 5.1-.8.7-1.2 1.4-1.3 2.2h-3.8c-.1-.8-.5-1.5-1.3-2.2Z"/><path d="M10.1 20.5h3.8"/>',
  puzzle: '<path d="M10 4.5a2 2 0 1 1 4 0V6h3.5a1 1 0 0 1 1 1v3.5H20a2 2 0 1 1 0 4h-1.5V18a1 1 0 0 1-1 1H14v-1.5a2 2 0 1 0-4 0V19H6.5a1 1 0 0 1-1-1v-3.5H7a2 2 0 1 0 0-4H5.5V7a1 1 0 0 1 1-1H10V4.5Z"/>',
  layers: '<path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>',
  box: '<path d="M12 3 3.5 7.5v9L12 21l8.5-4.5v-9L12 3Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',
  package: '<path d="M12 3 3.5 7.5v9L12 21l8.5-4.5v-9L12 3Z"/><path d="m7.8 5.3 8.5 4.6M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
  link: '<path d="M10.3 13.7a3.8 3.8 0 0 0 5.4 0l3-3a3.8 3.8 0 0 0-5.4-5.4l-1 1M13.7 10.3a3.8 3.8 0 0 0-5.4 0l-3 3a3.8 3.8 0 0 0 5.4 5.4l1-1"/>',
  "arrow-right": '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  "arrow-down": '<path d="M12 4.5v15M6 13.5l6 6 6-6"/>',
  "arrow-up": '<path d="M12 19.5v-15M6 10.5l6-6 6 6"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9M4.5 12a7.5 7.5 0 0 1 13.2-4.9"/><path d="M18 3.5v4h-4M6 20.5v-4h4"/>',
  play: '<path d="M8 4.8v14.4a.8.8 0 0 0 1.2.7l11-7.2a.8.8 0 0 0 0-1.4L9.2 4.1A.8.8 0 0 0 8 4.8Z"/>',
  pause: '<rect x="6.5" y="4.5" width="4" height="15" rx="1"/><rect x="13.5" y="4.5" width="4" height="15" rx="1"/>',
  download: '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 18.5h15"/>',
  upload: '<path d="M12 15.5v-12M7.5 8 12 3.5 16.5 8M4.5 18.5h15"/>',
  share: '<circle cx="6" cy="12" r="2.6"/><circle cx="17.5" cy="6" r="2.6"/><circle cx="17.5" cy="18" r="2.6"/><path d="m8.3 10.8 7-3.6M8.3 13.2l7 3.6"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  edit: '<path d="m4 20 1-4.2L16.6 4.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19 4 20Z"/><path d="m14.5 6.3 3.2 3.2"/>',
  trash: '<path d="M4.5 6.5h15M9 6.5V4.5h6v2M6.5 6.5l.8 13a1 1 0 0 0 1 .9h7.4a1 1 0 0 0 1-.9l.8-13M10 10.5v6M14 10.5v6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  "chart-bar": '<path d="M4 20.5h16M7 20.5v-8M12 20.5V5M17 20.5v-12"/>',
  "chart-line": '<path d="M4 4.5v16h16"/><path d="m7.5 15 3.5-4 3 2.5 5-6"/>',
  "chart-pie": '<path d="M12 3.5v8.5h8.5A8.5 8.5 0 0 0 12 3.5Z"/><path d="M10.5 5.2A8.5 8.5 0 1 0 18.8 13.5H10.5V5.2Z"/>',
  "trending-up": '<path d="m3.5 17 6-6 3.5 3.5L20.5 7M15 7h5.5v5.5"/>',
  "trending-down": '<path d="m3.5 7 6 6 3.5-3.5 7.5 7.5M15 17h5.5v-5.5"/>',
  dollar: '<path d="M12 3v18M16.5 7.5c-.6-1.4-2.3-2.2-4.5-2.2-2.6 0-4.3 1.2-4.3 3.1 0 4.4 9 1.8 9 6.4 0 1.9-1.9 3.3-4.7 3.3-2.4 0-4.3-.9-4.9-2.6"/>',
  tag: '<path d="M3.5 12.3V4.5a1 1 0 0 1 1-1h7.8a1 1 0 0 1 .7.3l7.4 7.4a1 1 0 0 1 0 1.4l-7.8 7.8a1 1 0 0 1-1.4 0l-7.4-7.4a1 1 0 0 1-.3-.7Z"/><circle cx="8" cy="8" r="1.3"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9.5 20v-6h5v6"/>',
  map: '<path d="m3.5 6.5 5.5-2.5 6 2.5 5.5-2.5v13.5l-5.5 2.5-6-2.5-5.5 2.5V6.5Z"/><path d="M9 4v13.5M15 6.5V20"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.8 8.2-2 5.6-5.6 2 2-5.6 5.6-2Z"/>',
  sparkles: '<path d="M10 4.5 11.8 9l4.5 1.8-4.5 1.8L10 17.1 8.2 12.6 3.7 10.8 8.2 9 10 4.5ZM18 3.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2ZM18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8L18 15Z"/>',
  robot: '<rect x="4.5" y="8" width="15" height="11" rx="3"/><path d="M12 8V4.5M12 4.5h.01M9 13h.01M15 13h.01M9.5 16h5M2.5 12.5v2M21.5 12.5v2"/>',
  network: '<circle cx="12" cy="5.5" r="2.4"/><circle cx="5.5" cy="18" r="2.4"/><circle cx="18.5" cy="18" r="2.4"/><path d="M11 7.8 6.6 15.8M13 7.8l4.4 8M8 18h8"/>',
  workflow: '<rect x="3.5" y="4" width="6.5" height="5.5" rx="1.6"/><rect x="14" y="14.5" width="6.5" height="5.5" rx="1.6"/><path d="M10 6.8h2.5a2 2 0 0 1 2 2v2.4M14 17.2h-2a2 2 0 0 1-2-2v-1"/>',
  "list-check": '<path d="m3.5 6.5 1.6 1.6 2.9-3M3.5 13.5l1.6 1.6 2.9-3M11 7h9.5M11 14h9.5M11 20h9.5"/>',
  filter: '<path d="M4 5.5h16l-6.2 7.3v5.2l-3.6 1.8v-7L4 5.5Z"/>',
  sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 4.5v5M9 14.5v5"/>',
  activity: '<path d="M3 12h4l2.5-6.5 4.5 13 2.5-6.5H21"/>',
  wifi: '<path d="M2.8 9.5a13 13 0 0 1 18.4 0M5.8 12.7a8.6 8.6 0 0 1 12.4 0M8.8 15.9a4.2 4.2 0 0 1 6.4 0M12 19h.01"/>',
  monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.4"/><path d="M11 18.5h2"/>',
  camera: '<path d="M4.5 8h3L9 5.5h6L16.5 8h3a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.4"/>',
  "credit-card": '<rect x="3" y="5.5" width="18" height="13" rx="2.2"/><path d="M3 10h18M7 15h3"/>',
  inbox: '<path d="M3.5 13.5 6 5.5h12l2.5 8v5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-5Z"/><path d="M3.5 13.5h5l1 2.5h5l1-2.5h5"/>',
  stack: '<rect x="4" y="4" width="16" height="4.6" rx="1.4"/><rect x="4" y="9.7" width="16" height="4.6" rx="1.4"/><rect x="4" y="15.4" width="16" height="4.6" rx="1.4"/>',
  merge: '<path d="M6 4.5v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v3M18 4.5v6M12 13.5v7"/>',
  gauge: '<path d="M4.5 17.5a8.5 8.5 0 1 1 15 0"/><path d="m12 13.5 3.5-4.5"/><circle cx="12" cy="14" r="1.2"/>',
  scale: '<path d="M12 4v16M7 20h10M5 8h14M5 8l-2.5 6a3 3 0 0 0 5 0L5 8ZM19 8l-2.5 6a3 3 0 0 0 5 0L19 8Z"/>',
  "zoom-in": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.6-4.6"/><path d="M10.5 7.8v5.4M7.8 10.5h5.4"/>',
  "zoom-out": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.6-4.6"/><path d="M7.8 10.5h5.4"/>',
  expand: '<path d="M9 3.5H4.5V8"/><path d="M15 3.5h4.5V8"/><path d="M9 20.5H4.5V16"/><path d="M15 20.5h4.5V16"/>',
  flask: '<path d="M9.5 3.5h5M10.5 3.5v6L5 18.8A1.6 1.6 0 0 0 6.4 21h11.2a1.6 1.6 0 0 0 1.4-2.2L13.5 9.5v-6"/><path d="M7.7 15h8.6"/>',
};

export const ICON_NAMES = Object.freeze(Object.keys(ICONS));
export const hasIcon = (name) => typeof name === "string" && Object.hasOwn(ICONS, name);

/** Trusted SVG markup for a registered icon, or "" for an unknown name. */
export function iconMarkup(name) {
  return hasIcon(name)
    ? `<svg class="rev-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`
    : "";
}

/** Inner SVG markup only (for embedding inside another <svg>, e.g. the SVG node-map). */
export const iconBody = (name) => (hasIcon(name) ? ICONS[name] : "");
