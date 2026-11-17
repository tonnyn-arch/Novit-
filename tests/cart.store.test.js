import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCartStore, buildOrderMessage } from '../src/scripts/features/cart/cart.store.js';
import { PRODUCTS } from '../src/scripts/data/products.js';

const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return { get: (k, fb) => (k in data ? data[k] : fb), set: (k, v) => (data[k] = v), data };
}

test('adiciona produtos e soma quantidades da mesma linha', () => {
  const cart = createCartStore({ findProduct });
  cart.add('vestido-linho-areia', 'M');
  cart.add('vestido-linho-areia', 'M');
  cart.add('vestido-linho-areia', 'S');
  const s = cart.getState();
  assert.equal(s.items.length, 2);
  assert.equal(s.count, 3);
  assert.equal(s.total, 149.7);
});

test('ignora produtos inexistentes', () => {
  const cart = createCartStore({ findProduct });
  cart.add('nao-existe');
  assert.equal(cart.getState().count, 0);
});

test('setQty a 0 remove a linha e limita ao máximo', () => {
  const cart = createCartStore({ findProduct });
  cart.add('mala-tote-caramelo');
  cart.setQty('mala-tote-caramelo', null, 99);
  assert.equal(cart.getState().count, 10);
  cart.setQty('mala-tote-caramelo', null, 0);
  assert.equal(cart.getState().items.length, 0);
});

test('persiste no storage e descarta dados corrompidos ao arrancar', () => {
  const storage = memoryStorage({
    cart: [
      { id: 'top-canelado-oliva', size: 'S', qty: 2 },
      { id: 'apagado', size: null, qty: 1 },
      { id: 'mala-tote-caramelo', size: null, qty: -3 },
    ],
  });
  const cart = createCartStore({ findProduct, storage });
  assert.equal(cart.getState().count, 2);
  cart.add('mala-tote-caramelo');
  assert.equal(storage.data.cart.length, 2);
});

test('notifica subscritores em cada alteração', () => {
  const cart = createCartStore({ findProduct });
  const counts = [];
  cart.subscribe((s) => counts.push(s.count));
  cart.add('mala-tote-caramelo');
  cart.clear();
  assert.deepEqual(counts, [1, 0]);
});

test('gera a mensagem de encomenda para WhatsApp', () => {
  const cart = createCartStore({ findProduct });
  cart.add('blusa-seda-marfim', 'M', 2);
  const msg = buildOrderMessage(cart.getState(), (n) => `${n.toFixed(2)}€`);
  assert.match(msg, /2× Blusa Acetinada Marfim \(tam\. M\) — 69\.80€/);
  assert.match(msg, /Total: 69\.80€/);
});
