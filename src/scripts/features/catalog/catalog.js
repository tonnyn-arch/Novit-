import { $, $$ } from '../../core/dom.js';
import { CATEGORIES, PRODUCTS } from '../../data/products.js';
import { productCard } from './product-card.js';
import { queryProducts } from './query.js';
import { observeReveal } from '../../ui/reveal.js';

const labelOf = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? '';

/** Monta o catálogo: filtros por categoria, ordenação e grelha. */
export function initCatalog() {
  const root = $('[data-catalog]');
  if (!root) return;

  const grid = $('[data-catalog-grid]', root);
  const filters = $('[data-catalog-filters]', root);
  const sortSelect = $('[data-catalog-sort]', root);
  const count = $('[data-catalog-count]', root);
  const state = { category: 'all', sort: 'featured' };

  filters.innerHTML = CATEGORIES.map(
    (c) =>
      `<button type="button" class="chip" data-category="${c.id}" aria-pressed="${c.id === 'all'}">${c.label}</button>`,
  ).join('');

  function render() {
    const list = queryProducts(PRODUCTS, state);
    grid.innerHTML = list.map((p) => productCard(p, labelOf(p.category))).join('');
    count.textContent = `${list.length} ${list.length === 1 ? 'peça' : 'peças'}`;
    observeReveal(grid);
  }

  function selectCategory(id) {
    state.category = id;
    $$('[data-category]', filters).forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.category === id)),
    );
    render();
  }

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]');
    if (btn) selectCategory(btn.dataset.category);
  });

  sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    render();
  });

  // Atalhos externos para categorias (ex.: cartões da secção "Coleções")
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-filter-link]');
    if (link) selectCategory(link.dataset.filterLink);
  });

  render();
}
