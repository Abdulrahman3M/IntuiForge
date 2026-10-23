/* Shared reader controls. Icon-only actions always have a localized tooltip and accessible name. */
import { el, icon, uid } from './RichVisualizationDom.js';

export const CONTROL_ICONS = Object.freeze({ zoomIn: 'zoom-in', zoomOut: 'zoom-out', fitView: 'target', fullscreen: 'expand' });

export function setControlLabel(button, label) {
  if (!label) throw new Error('Rich Viz controls require an accessible label.');
  button.setAttribute('aria-label', label);
  button.title = label;
  button.dataset.tooltip = label;
}

export function controlButton(action, glyph, label, text = '') {
  const button = el('button', { class: 'rev-btn', attrs: { type: 'button' }, dataset: { action } }, [glyph ? icon(glyph) : null, text ? el('span', { text }) : null]);
  setControlLabel(button, label);
  return button;
}

export function createToolbar(ctx, actions = Object.keys(CONTROL_ICONS)) {
  const bar = el('div', { class: 'rev-toolbar', attrs: { role: 'toolbar', 'aria-label': ctx.t('controls'), dir: ctx.dir } });
  const buttons = new Map();
  for (const action of actions) {
    const glyph = CONTROL_ICONS[action];
    const button = controlButton(action, glyph, ctx.t(action));
    buttons.set(action, button); bar.append(button);
  }
  const tooltip = el('div', { class: 'rev-tooltip', attrs: { id: uid('rev-tooltip'), role: 'tooltip', hidden: true } });
  const owner = el('div', { class: 'rev-toolbar-shell' }, [bar, tooltip]);
  let active = null;
  const hide = () => { active?.removeAttribute('aria-describedby'); active = null; tooltip.hidden = true; };
  const show = (button) => {
    if (!button?.dataset.tooltip || button.disabled) return;
    hide(); active = button; tooltip.textContent = button.dataset.tooltip; tooltip.hidden = false;
    button.setAttribute('aria-describedby', tooltip.id);
    const b = button.getBoundingClientRect(), o = owner.getBoundingClientRect();
    tooltip.style.left = `${Math.max(8, Math.min(b.left - o.left + b.width / 2, o.width - 8))}px`;
  };
  const over = (event) => show(event.target.closest('[data-tooltip]'));
  const out = (event) => { if (!active?.contains(event.relatedTarget)) hide(); };
  const key = (event) => { if (event.key === 'Escape') hide(); };
  bar.addEventListener('pointerover', over); bar.addEventListener('pointerout', out);
  bar.addEventListener('focusin', over); bar.addEventListener('focusout', out); bar.addEventListener('keydown', key);
  bar.addEventListener('scroll', hide, { passive: true });
  return { owner, bar, buttons, dispose() { hide(); bar.removeEventListener('pointerover', over); bar.removeEventListener('pointerout', out); bar.removeEventListener('focusin', over); bar.removeEventListener('focusout', out); bar.removeEventListener('keydown', key); bar.removeEventListener('scroll', hide); } };
}

export function attachTextAlternative(toolbar, details, ctx, host) {
  details.classList.add('rev__alt--controlled'); details.id = uid('rev-text');
  const button = controlButton('textVersion', 'file-text', ctx.t('textVersion'), ctx.t('textVersion'));
  button.setAttribute('aria-controls', details.id); button.setAttribute('aria-expanded', 'false');
  const update = () => button.setAttribute('aria-expanded', String(details.open));
  const toggle = () => { details.open = !details.open; update(); };
  button.addEventListener('click', toggle); details.addEventListener('toggle', update);
  toolbar.bar.append(button); host.append(details);
  return () => { button.removeEventListener('click', toggle); details.removeEventListener('toggle', update); };
}

export function bindFullscreen(button, target, ctx, onChange = () => {}, onError = () => {}) {
  const update = () => {
    const active = document.fullscreenElement === target;
    button.setAttribute('aria-pressed', String(active));
    setControlLabel(button, ctx.t(active ? 'exitFullscreen' : 'fullscreen'));
    requestAnimationFrame(onChange);
  };
  const click = () => {
    const action = document.fullscreenElement === target ? document.exitFullscreen?.() : target.requestFullscreen?.({ navigationUI: 'hide' });
    if (action === undefined) { onError(); return; }
    void Promise.resolve(action).catch(onError);
  };
  button.addEventListener('click', click); document.addEventListener('fullscreenchange', update);
  button.setAttribute('aria-pressed', 'false');
  return () => { button.removeEventListener('click', click); document.removeEventListener('fullscreenchange', update); };
}

export function zoomViewBox(bounds, zoom) {
  const factor = Math.max(0.25, Math.min(4, Number(zoom) || 1));
  const width = bounds.width / factor, height = bounds.height / factor;
  return { x: bounds.x + (bounds.width - width) / 2, y: bounds.y + (bounds.height - height) / 2, width, height };
}
