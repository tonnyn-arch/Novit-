/** Filtra e ordena produtos — função pura, sem DOM (testada em tests/). */
const SORTERS = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

export function queryProducts(products, { category = 'all', sort = 'featured' } = {}) {
  const filtered =
    category === 'all' ? [...products] : products.filter((p) => p.category === category);
  return filtered.sort(SORTERS[sort] ?? SORTERS.featured);
}
