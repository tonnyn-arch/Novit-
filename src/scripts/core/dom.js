/** Utilitários DOM pequenos e explícitos. */
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/** Escapa texto para interpolação segura em templates HTML. */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[ch]);
}

/** Bloqueia/desbloqueia o scroll do body (drawers, menus). */
export function lockScroll(locked) {
  document.documentElement.classList.toggle('is-locked', locked);
}
