/**
 * Configuração central da loja Novitá.
 * ---------------------------------------------------------------
 * ÚNICO ficheiro que a equipa de marketing/loja precisa de editar
 * para atualizar contactos, links e textos institucionais.
 * Todos os valores marcados com `TODO` devem ser confirmados com
 * a loja (ver docs/BRAND.md → "Dados a confirmar").
 */
export const STORE = Object.freeze({
  name: 'Novitá',
  handle: 'lojanovita',
  tagline: 'Sempre algo novo.',
  description:
    'Moda e acessórios com curadoria. Peças novas todas as semanas, escolhidas para quem gosta de se sentir bem e diferente.',

  locale: 'pt-PT',
  currency: 'EUR',

  contact: {
    // TODO: número oficial em formato internacional, só dígitos (ex.: 351912345678)
    whatsapp: '351900000000',
    email: 'ola@lojanovita.com', // TODO
    phoneDisplay: '+351 900 000 000', // TODO
  },

  address: {
    // TODO: morada real da loja física (se existir)
    street: 'Rua da Novidade, 10',
    city: 'Lisboa',
    postalCode: '1000-000',
    country: 'PT',
    mapsUrl: 'https://maps.google.com/?q=Loja+Novita',
  },

  hours: [
    { days: 'Segunda a Sexta', time: '10h00 – 19h00' },
    { days: 'Sábado', time: '10h00 – 14h00' },
    { days: 'Domingo', time: 'Encerrado' },
  ],

  social: {
    instagram: 'https://www.instagram.com/lojanovita',
    bioSite: 'https://bio.site/lojanovita',
  },

  shipping: {
    freeFrom: 60, // TODO: valor mínimo para portes grátis
    deliveryDays: '2 a 4 dias úteis',
  },
});

/** Link de WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message = '') {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${STORE.contact.whatsapp}${text}`;
}
