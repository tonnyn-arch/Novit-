import { $$ } from '../core/dom.js';
import { STORE, whatsappLink } from '../config/store.config.js';
import { formatPrice } from '../core/format.js';

/**
 * Preenche o HTML com os dados de store.config.js.
 * Assim nenhum contacto fica duplicado/"hard-coded" nas páginas.
 *
 *   data-wa="mensagem opcional"  → href do WhatsApp
 *   data-store="chave"           → texto (ver BINDINGS)
 *   data-store-href="chave"      → href (ver HREFS)
 */
const BINDINGS = {
  phone: STORE.contact.phoneDisplay,
  email: STORE.contact.email,
  address: `${STORE.address.street}, ${STORE.address.postalCode} ${STORE.address.city}`,
  freeShipping: formatPrice(STORE.shipping.freeFrom),
  deliveryDays: STORE.shipping.deliveryDays,
  year: String(new Date().getFullYear()),
};

const HREFS = {
  instagram: STORE.social.instagram,
  maps: STORE.address.mapsUrl,
  email: `mailto:${STORE.contact.email}`,
  phone: `tel:+${STORE.contact.whatsapp}`,
};

export function initStoreBindings(root = document) {
  $$('[data-wa]', root).forEach((a) => {
    a.href = whatsappLink(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  $$('[data-store]', root).forEach((el) => {
    const value = BINDINGS[el.dataset.store];
    if (value) el.textContent = value;
  });

  $$('[data-store-href]', root).forEach((a) => {
    const value = HREFS[a.dataset.storeHref];
    if (!value) return;
    a.href = value;
    if (value.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });

  $$('[data-store-hours]', root).forEach((dl) => {
    dl.innerHTML = STORE.hours.map((h) => `<div><dt>${h.days}</dt><dd>${h.time}</dd></div>`).join('');
  });
}
