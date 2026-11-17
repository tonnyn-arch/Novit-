import { escapeHtml } from '../../core/dom.js';
import { formatPrice } from '../../core/format.js';

const BADGE_LABEL = { novo: 'Novo', promo: 'Promo', 'últimas': 'Últimas peças' };

/** Visual do produto: imagem real ou painel tonal com monograma. */
export function productMedia(product) {
  if (product.image) {
    return `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">`;
  }
  return `
    <div class="product-media__tone" style="--tone:${escapeHtml(product.tone)}" aria-hidden="true">
      <span class="product-media__mark">${escapeHtml(product.name.charAt(0))}</span>
    </div>`;
}

export function priceTag(product) {
  const old = product.oldPrice
    ? `<s class="price__old"><span class="sr-only">Antes </span>${formatPrice(product.oldPrice)}</s>`
    : '';
  return `<p class="price">${old}<span class="price__now">${formatPrice(product.price)}</span></p>`;
}

export function badgeTag(product) {
  if (!product.badge) return '';
  const variant = product.badge === 'promo' ? 'accent' : 'ink';
  return `<span class="badge badge--${variant}">${BADGE_LABEL[product.badge]}</span>`;
}

/** Template de um cartão do catálogo. */
export function productCard(product, categoryLabel) {
  const id = escapeHtml(product.id);
  const name = escapeHtml(product.name);
  return `
    <li class="product-card" data-reveal>
      <button class="product-card__hit" type="button" data-quickview="${id}" aria-label="Ver ${name}">
        <div class="product-media">${productMedia(product)}${badgeTag(product)}</div>
      </button>
      <div class="product-card__body">
        <p class="product-card__cat">${escapeHtml(categoryLabel)}</p>
        <h3 class="product-card__name">${name}</h3>
        ${priceTag(product)}
      </div>
      <button class="product-card__add" type="button" data-quickview="${id}">
        Escolher <span aria-hidden="true">→</span>
      </button>
    </li>`;
}
