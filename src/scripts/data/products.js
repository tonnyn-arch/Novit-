/**
 * Catálogo de produtos.
 * ---------------------------------------------------------------
 * Fonte de dados estática (sem backend). Para adicionar um produto,
 * copie um objeto e altere os campos. `image` é opcional — sem imagem,
 * o cartão usa um fundo tonal com a cor `tone`.
 *
 * Os produtos abaixo são EXEMPLOS de demonstração e devem ser
 * substituídos pelo catálogo real da loja.
 *
 * @typedef {Object} Product
 * @property {string} id         Identificador único (slug)
 * @property {string} name
 * @property {string} category   Deve existir em CATEGORIES
 * @property {number} price
 * @property {number} [oldPrice] Preço antes da promoção
 * @property {string[]} [sizes]
 * @property {string} tone       Cor de fundo do cartão (hex)
 * @property {string} [image]    Caminho para a imagem
 * @property {('novo'|'promo'|'últimas')} [badge]
 */

export const CATEGORIES = Object.freeze([
  { id: 'all', label: 'Tudo' },
  { id: 'vestidos', label: 'Vestidos' },
  { id: 'tops', label: 'Tops & Blusas' },
  { id: 'calcas', label: 'Calças & Saias' },
  { id: 'acessorios', label: 'Acessórios' },
]);

/** @type {ReadonlyArray<Product>} */
export const PRODUCTS = Object.freeze([
  { id: 'vestido-linho-areia', name: 'Vestido Linho Areia', category: 'vestidos', price: 49.9, sizes: ['XS', 'S', 'M', 'L'], tone: '#D9C7B0', badge: 'novo' },
  { id: 'vestido-midi-terracota', name: 'Vestido Midi Terracota', category: 'vestidos', price: 59.9, oldPrice: 74.9, sizes: ['S', 'M', 'L'], tone: '#C27A5A', badge: 'promo' },
  { id: 'blusa-seda-marfim', name: 'Blusa Acetinada Marfim', category: 'tops', price: 34.9, sizes: ['XS', 'S', 'M', 'L', 'XL'], tone: '#EDE4D6', badge: 'novo' },
  { id: 'top-canelado-oliva', name: 'Top Canelado Oliva', category: 'tops', price: 19.9, sizes: ['S', 'M', 'L'], tone: '#8A8B67' },
  { id: 'calca-alfaiataria-preta', name: 'Calça Alfaiataria Preta', category: 'calcas', price: 44.9, sizes: ['34', '36', '38', '40', '42'], tone: '#3A3532' },
  { id: 'saia-plissada-champanhe', name: 'Saia Plissada Champanhe', category: 'calcas', price: 39.9, sizes: ['S', 'M', 'L'], tone: '#CDB892', badge: 'últimas' },
  { id: 'mala-tote-caramelo', name: 'Mala Tote Caramelo', category: 'acessorios', price: 54.9, tone: '#A66B3F', badge: 'novo' },
  { id: 'brincos-argola-dourados', name: 'Brincos Argola Dourados', category: 'acessorios', price: 14.9, oldPrice: 19.9, tone: '#D8B96A', badge: 'promo' },
]);
