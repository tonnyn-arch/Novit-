import { $, escapeHtml } from '../../core/dom.js';
import { PRODUCTS, CATEGORIES } from '../../data/products.js';
import { formatPrice } from '../../core/format.js';
import { whatsappLink } from '../../config/store.config.js';
import { productMedia, priceTag, badgeTag } from './product-card.js';
import { toast } from '../../ui/toast.js';

/**
 * Vista rápida de produto num <dialog> nativo
 * (focus trap, tecla Esc e acessibilidade geridos pelo browser).
 */
export function initQuickview(cart) {
  const dialog = $('[data-quickview-dialog]');
  if (!dialog) return;
  const body = $('[data-quickview-body]', dialog);
  let current = null;
  let size = null;

  function open(id) {
    current = PRODUCTS.find((p) => p.id === id);
    if (!current) return;
    size = current.sizes?.length === 1 ? current.sizes[0] : null;
    render();
    dialog.showModal();
  }

  function render() {
    const p = current;
    const cat = CATEGORIES.find((c) => c.id === p.category)?.label ?? '';
    const sizes = p.sizes?.length
      ? `<fieldset class="sizes">
           <legend class="sizes__legend">Tamanho</legend>
           <div class="sizes__list">
             ${p.sizes
               .map(
                 (s) => `<label class="size">
                   <input type="radio" name="size" value="${escapeHtml(s)}" ${s === size ? 'checked' : ''}>
                   <span>${escapeHtml(s)}</span>
                 </label>`,
               )
               .join('')}
           </div>
         </fieldset>`
      : '';

    body.innerHTML = `
      <div class="quickview__media product-media">${productMedia(p)}${badgeTag(p)}</div>
      <div class="quickview__info">
        <p class="eyebrow">${escapeHtml(cat)}</p>
        <h2 class="quickview__title" id="quickview-title">${escapeHtml(p.name)}</h2>
        ${priceTag(p)}
        ${sizes}
        <p class="quickview__hint" data-size-hint hidden>Escolha um tamanho para continuar.</p>
        <div class="quickview__actions">
          <button type="button" class="btn btn--primary btn--block" data-qv-add>Adicionar ao saco</button>
          <a class="btn btn--ghost btn--block" data-qv-whatsapp target="_blank" rel="noopener">
            Perguntar no WhatsApp
          </a>
        </div>
        <ul class="quickview__perks">
          <li>Envio em 2–4 dias úteis</li>
          <li>Trocas fáceis até 14 dias</li>
          <li>Também pode levantar na loja</li>
        </ul>
      </div>`;
    updateWhatsapp();
  }

  function updateWhatsapp() {
    const sizeText = size ? `, tamanho ${size}` : '';
    $('[data-qv-whatsapp]', body).href = whatsappLink(
      `Olá Novitá! Tenho interesse em: ${current.name}${sizeText} (${formatPrice(current.price)}). Ainda está disponível?`,
    );
  }

  body.addEventListener('change', (e) => {
    if (e.target.name !== 'size') return;
    size = e.target.value;
    $('[data-size-hint]', body).hidden = true;
    updateWhatsapp();
  });

  body.addEventListener('click', (e) => {
    if (!e.target.closest('[data-qv-add]')) return;
    if (current.sizes?.length && !size) {
      $('[data-size-hint]', body).hidden = false;
      return;
    }
    cart.add(current.id, size);
    dialog.close();
    toast(`${current.name} foi adicionado ao saco.`);
  });

  // Fecha ao clicar no fundo (backdrop) ou no botão de fechar
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target.closest('[data-quickview-close]')) dialog.close();
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-quickview]');
    if (trigger) open(trigger.dataset.quickview);
  });
}
