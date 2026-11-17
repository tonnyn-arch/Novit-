import { STORE } from '../config/store.config.js';

const currencyFormatter = new Intl.NumberFormat(STORE.locale, {
  style: 'currency',
  currency: STORE.currency,
});

/** Formata um número como preço na moeda da loja. */
export const formatPrice = (value) => currencyFormatter.format(value);

/** Arredonda valores monetários a 2 casas (evita 0.1 + 0.2). */
export const roundMoney = (value) => Math.round(value * 100) / 100;
