/**
 * Ponto de entrada da aplicação.
 * Cada feature expõe um `init*()` independente; se o elemento-alvo
 * não existir na página, a feature simplesmente não arranca.
 */
import { PRODUCTS } from './data/products.js';
import { createStorage } from './core/storage.js';
import { createCartStore } from './features/cart/cart.store.js';
import { initCartView } from './features/cart/cart.view.js';
import { initCatalog } from './features/catalog/catalog.js';
import { initQuickview } from './features/catalog/quickview.js';
import { initHeader } from './ui/header.js';
import { initStoreBindings } from './ui/store-bindings.js';
import { observeReveal } from './ui/reveal.js';

const storage = createStorage('novita');
const cart = createCartStore({
  findProduct: (id) => PRODUCTS.find((p) => p.id === id),
  storage,
});

initStoreBindings();
initHeader();
initCatalog();
initQuickview(cart);
initCartView(cart);
observeReveal();
