import { createEmitter } from '../../core/emitter.js';
import { roundMoney } from '../../core/format.js';

const MAX_QTY = 10;

/**
 * Estado do carrinho — lógica pura, sem DOM.
 * Recebe dependências por injeção para ser testável (ver tests/).
 *
 * @param {Object} deps
 * @param {(id: string) => import('../../data/products.js').Product | undefined} deps.findProduct
 * @param {{ get: Function, set: Function }} [deps.storage]
 */
export function createCartStore({ findProduct, storage }) {
  const emitter = createEmitter();
  /** @type {{ id: string, size: string|null, qty: number }[]} */
  let lines = sanitize(storage?.get('cart', []) ?? []);

  function sanitize(raw) {
    if (!Array.isArray(raw)) return [];
    return raw.filter((l) => l && findProduct(l.id) && Number.isInteger(l.qty) && l.qty > 0);
  }

  const lineKey = (id, size) => `${id}__${size ?? ''}`;

  function commit() {
    storage?.set('cart', lines);
    emitter.emit(api.getState());
  }

  const api = {
    subscribe: emitter.subscribe,

    add(id, size = null, qty = 1) {
      if (!findProduct(id)) return;
      const existing = lines.find((l) => lineKey(l.id, l.size) === lineKey(id, size));
      if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
      else lines = [...lines, { id, size, qty: Math.min(MAX_QTY, qty) }];
      commit();
    },

    setQty(id, size, qty) {
      if (qty <= 0) return api.remove(id, size);
      lines = lines.map((l) =>
        lineKey(l.id, l.size) === lineKey(id, size) ? { ...l, qty: Math.min(MAX_QTY, qty) } : l,
      );
      commit();
    },

    remove(id, size) {
      lines = lines.filter((l) => lineKey(l.id, l.size) !== lineKey(id, size));
      commit();
    },

    clear() {
      lines = [];
      commit();
    },

    getState() {
      const items = lines.map((l) => {
        const product = findProduct(l.id);
        return { ...l, product, subtotal: roundMoney(product.price * l.qty) };
      });
      return {
        items,
        count: items.reduce((n, i) => n + i.qty, 0),
        total: roundMoney(items.reduce((sum, i) => sum + i.subtotal, 0)),
      };
    },
  };

  return api;
}

/**
 * Converte o carrinho numa mensagem de encomenda para WhatsApp.
 * @param {ReturnType<ReturnType<typeof createCartStore>['getState']>} state
 * @param {(n: number) => string} format
 */
export function buildOrderMessage(state, format) {
  const lines = state.items.map((i) => {
    const size = i.size ? ` (tam. ${i.size})` : '';
    return `• ${i.qty}× ${i.product.name}${size} — ${format(i.subtotal)}`;
  });
  return [
    'Olá Novitá! Gostaria de encomendar:',
    '',
    ...lines,
    '',
    `Total: ${format(state.total)}`,
    '',
    'Podem confirmar a disponibilidade e as formas de pagamento? Fico a aguardar!',
  ].join('\n');
}
