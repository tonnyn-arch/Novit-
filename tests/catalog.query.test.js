import { test } from 'node:test';
import assert from 'node:assert/strict';
import { queryProducts } from '../src/scripts/features/catalog/query.js';
import { PRODUCTS, CATEGORIES } from '../src/scripts/data/products.js';

test('"all" devolve todos os produtos sem alterar o original', () => {
  const result = queryProducts(PRODUCTS);
  assert.equal(result.length, PRODUCTS.length);
  assert.notEqual(result, PRODUCTS);
});

test('filtra por categoria', () => {
  const result = queryProducts(PRODUCTS, { category: 'acessorios' });
  assert.ok(result.length > 0);
  assert.ok(result.every((p) => p.category === 'acessorios'));
});

test('ordena por preço', () => {
  const asc = queryProducts(PRODUCTS, { sort: 'price-asc' }).map((p) => p.price);
  assert.deepEqual(asc, [...asc].sort((a, b) => a - b));
  const desc = queryProducts(PRODUCTS, { sort: 'price-desc' }).map((p) => p.price);
  assert.deepEqual(desc, [...desc].sort((a, b) => b - a));
});

test('integridade do catálogo: ids únicos e categorias válidas', () => {
  const ids = PRODUCTS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'ids duplicados');
  const valid = new Set(CATEGORIES.map((c) => c.id));
  PRODUCTS.forEach((p) => assert.ok(valid.has(p.category), `categoria inválida em ${p.id}`));
  PRODUCTS.forEach((p) => assert.ok(p.price > 0, `preço inválido em ${p.id}`));
});
