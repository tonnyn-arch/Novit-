import { $, lockScroll } from '../core/dom.js';

/** Header fixo (muda de estilo com o scroll) + menu mobile. */
export function initHeader() {
  const header = $('[data-header]');
  if (!header) return;

  const toggle = $('[data-menu-toggle]', header);
  const menu = $('[data-menu]', header);

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-menu-open', open);
    lockScroll(open);
  }

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => setMenu(false));
}
