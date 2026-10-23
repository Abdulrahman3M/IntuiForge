/* Adapter plumbing shared by every engine adapter. Engine bundles live in independently licensed
 * directories under External-Libraries/ and are loaded lazily when a renderer needs them. */
import { pointTone, seriesTone } from "../RichVisualizationCharts.js";

const EXTERNAL_ROOT = new URL("../../External-Libraries/", import.meta.url);
export const libraryUrl = (id, file) => new URL(`${id}/active/${file}`, EXTERNAL_ROOT).href;

/** The shared React runtime (React Flow editor bundle). Every consumer must import this EXACT url so the
 * browser keeps a single module instance, and therefore a single React copy. Keep equal to FLOW_MODULE_URL
 * and compatible host applications. */
export const SHARED_RUNTIME_URL = `${libraryUrl("react-flow", "react-flow-editor.js")}?v=reader5`;
export const SHARED_RUNTIME_CSS_URL = `${libraryUrl("react-flow", "react-flow-editor.css")}?v=reader5`;

const scripts = new Map();

/** Load a classic (UMD) script once and resolve with the global it defines; a failed load can be retried. */
export function loadGlobalScript(url, globalName) {
  if (globalThis[globalName]) return Promise.resolve(globalThis[globalName]);
  if (!scripts.has(url)) {
    scripts.set(url, new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.dataset.richVisualizationEngine = globalName;
      script.onload = () => (globalThis[globalName] ? resolve(globalThis[globalName]) : reject(new Error(`${globalName} did not initialise.`)));
      script.onerror = () => { scripts.delete(url); script.remove(); reject(new Error(`Could not load ${url}.`)); };
      document.head.append(script);
    }));
  }
  return scripts.get(url);
}

const modules = new Map();
export function loadModuleOnce(url) {
  if (!modules.has(url)) modules.set(url, import(url).catch((error) => { modules.delete(url); throw error; }));
  return modules.get(url);
}

/** "#rgb"/"#rrggbb" → rgba(); any other CSS colour string is returned unchanged (used only where alpha is optional). */
export function withAlpha(color, alpha) {
  const value = String(color).trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value);
  if (!hex) return value;
  const full = hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join("") : hex[1];
  const n = Number.parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Linear mix of two #hex colours (share of `a` = pct); anything else returns `a` unchanged. */
export function mixColor(a, b, pct) {
  const parse = (c) => { const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(c).trim()); if (!m) return null; const f = m[1].length === 3 ? [...m[1]].map((x) => x + x).join("") : m[1]; const n = Number.parseInt(f, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const x = parse(a); const y = parse(b);
  if (!x || !y) return a;
  return `#${x.map((v, i) => Math.round(v * pct + y[i] * (1 - pct)).toString(16).padStart(2, "0")).join("")}`;
}

export const toneColor = (theme, tone) => theme.tones[tone] || theme.tones.info;
export const seriesColor = (data, theme, index) => toneColor(theme, seriesTone(data, index));
export const pointColors = (data, theme, seriesIndex) => data.series[seriesIndex].values.map((_, i) => toneColor(theme, pointTone(data, seriesIndex, i)));

/** Scatter series values are [x, y] pairs; every other kind is one value per label. */
export const isRound = (data) => data.chart === "pie" || data.chart === "doughnut";

export function observeResize(host, callback) {
  if (typeof ResizeObserver === "undefined") return () => {};
  let frame = 0;
  const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(callback); });
  observer.observe(host);
  return () => { cancelAnimationFrame(frame); observer.disconnect(); };
}
