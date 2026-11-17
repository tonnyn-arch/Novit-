import { $, $$, escapeHtml, lockScroll } from '../../core/dom.js';
import { formatPrice } from '../../core/format.js';
import { STORE, whatsappLink } from '../../config/store.config.js';
import { buildOrderMessage } from './cart.store.js';
import { productMedia } from '../catalog/product-card.js';

/** Liga o estado do carrinho ao drawer lateral e aos contadores do header. */
export function initCartView(cart) {
  const drawer = $('[data-cart]');
  if (!drawer) return;

  const list = $('[data-cart-list]', drawer);
  const total = $('[data-cart-total]', drawer);
  const checkout = $('[data-cart-checkout]', drawer);
  const shippingNote = $('[data-cart-shipping]', drawer);
  const badges = $$('[data-cart-count]');
  let lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    lockScroll(true);
    $('[data-cart-close]', drawer).focus();
  }

  function close() {
    drawer.classList.remove('is-open');
    lockScroll(false);
    drawer.addEventListener('transitionend', () => (drawer.hidden = true), { once: true });
    lastFocus?.focus();
  }

  function shippingMessage(value) {
    const missing = STORE.shipping.freeFrom - value;
    return missing > 0
      ? `Faltam <strong>${formatPrice(missing)}</strong> para portes grátis.`
      : '<strong>Parabéns!</strong> Tem portes grátis.';
  }

  function render(state) {
    badges.forEach((b) => {
      b.textContent = state.count;
      b.hidden = state.count === 0;
    });

    if (!state.items.length) {
      list.innerHTML = `
        <li class="cart__empty">
          <p class="cart__empty-title">O seu saco está vazio.</p>
          <p>Descubra as novidades da semana.</p>
          <a href="#catalogo" class="btn btn--ghost" data-cart-close>Ver novidades</a>
        </li>`;
      checkout.setAttribute('aria-disabled', 'true');
      checkout.removeAttribute('href');
    } else {
      list.innerHTML = state.items.map(lineTemplate).join('');
      checkout.removeAttribute('aria-disabled');
      checkout.href = whatsappLink(buildOrderMessage(state, formatPrice));
    }

    total.textContent = formatPrice(state.total);
    shippingNote.innerHTML = shippingMessage(state.total);
    const pct = Math.min(100, (state.total / STORE.shipping.freeFrom) * 100);
    drawer.style.setProperty('--shipping-progress', `${pct}%`);
  }

  function lineTemplate(item) {
    const { product, size, qty } = item;
    const data = `data-id="${escapeHtml(product.id)}" data-size="${escapeHtml(size ?? '')}"`;
    return `
      <li class="cart-line">
        <div class="cart-line__media product-media">${productMedia(product)}</div>
        <div class="cart-line__info">
          <p class="cart-line__name">${escapeHtml(product.name)}</p>
          ${size ? `<p class="cart-line__meta">Tamanho ${escapeHtml(size)}</p>` : ''}
          <div class="stepper" role="group" aria-label="Quantidade de ${escapeHtml(product.name)}">
            <button type="button" ${data} data-step="-1" aria-label="Diminuir">−</button>
            <output aria-live="polite">${qty}</output>
            <button type="button" ${data} data-step="1" aria-label="Aumentar">+</button>
          </div>
        </div>
        <div class="cart-line__end">
          <p class="cart-line__price">${formatPrice(item.subtotal)}</p>
          <button type="button" class="link-btn" ${data} data-remove>Remover</button>
        </div>
      </li>`;
  }

  drawer.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-cart-close]') || t === drawer) return close();

    const step = t.closest('[data-step]');
    if (step) {
      const { id, size } = step.dataset;
      const line = cart.getState().items.find((i) => i.id === id && (i.size ?? '') === size);
      if (line) cart.setQty(id, line.size, line.qty + Number(step.dataset.step));
      return;
    }

    const rm = t.closest('[data-remove]');
    if (rm) {
      const line = cart.getState().items.find((i) => i.id === rm.dataset.id && (i.size ?? '') === rm.dataset.size);
      if (line) cart.remove(line.id, line.size);
    }

    if (t.closest('[data-cart-checkout][aria-disabled]')) e.preventDefault();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });

  $$('[data-cart-open]').forEach((btn) => btn.addEventListener('click', open));

  cart.subscribe(render);
  render(cart.getState());
}
