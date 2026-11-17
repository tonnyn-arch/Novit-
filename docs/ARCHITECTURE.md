# Arquitetura

## Decisões

| Decisão | Porquê |
|---|---|
| **HTML + CSS + JavaScript (ES modules), sem framework nem build** | Site de loja pequena: carrega depressa, aloja-se em qualquer lado (GitHub Pages, Netlify, Vercel) e qualquer dev o mantém. |
| **Checkout por WhatsApp** | É o canal que a loja já usa. Não exige pagamentos online, backend nem RGPD extra para guardar dados de clientes. |
| **Dados em ficheiros JS** (`config/`, `data/`) | Uma única fonte de verdade. Quem não programa só precisa de editar dois ficheiros. |
| **Lógica pura separada do DOM** (`*.store.js`, `query.js`) | Testável com `node --test`, sem browser nem dependências. |
| **Design tokens em CSS custom properties** | Mudar a marca (cores, fontes, espaços) num só ficheiro. |

## Estrutura

```
.
├── index.html                 # Página principal (landing + catálogo)
├── links.html                 # "Link na bio" próprio (substitui o bio.site)
├── 404.html
├── public/img/                # Favicon, imagem de partilha (OG), fotos de produto
├── src/
│   ├── scripts/
│   │   ├── main.js            # Entrada: liga as features
│   │   ├── config/            # store.config.js → contactos, morada, horário
│   │   ├── data/              # products.js → catálogo e categorias
│   │   ├── core/              # Utilitários sem regras de negócio (dom, format, storage, emitter)
│   │   ├── features/
│   │   │   ├── cart/          # cart.store.js (estado) + cart.view.js (UI)
│   │   │   └── catalog/       # query.js (filtro), product-card.js, catalog.js, quickview.js
│   │   └── ui/                # Comportamentos globais: header, reveal, toast, store-bindings
│   └── styles/
│       ├── main.css           # Só @imports, pela ordem das camadas
│       ├── tokens.css         # Design tokens
│       ├── base.css, layout.css
│       ├── components/        # Peças reutilizáveis
│       └── sections/          # Estilos específicos de cada secção
├── tests/                     # Testes unitários (node:test)
└── docs/                      # Marca, arquitetura e contribuição
```

## Fluxo de dados

```
products.js ──► catalog.js ──► grelha HTML
                    │
       [data-quickview] clique
                    ▼
             quickview.js ──► cart.add()
                                 │
                       cart.store.js (estado + localStorage)
                                 │ subscribe
                                 ▼
                           cart.view.js ──► drawer + contador + link WhatsApp
```

## Convenções

- **Hooks de JS via `data-*`**, nunca via classes CSS. As classes servem só para estilo; os atributos `data-*` servem para comportamento. Um designer pode mudar classes sem partir nada.
- **CSS em BEM leve:** `.bloco`, `.bloco__elemento`, `.bloco--variante`.
- **Contactos nunca escritos no HTML:** usar `data-wa`, `data-store` e `data-store-href` (ver `ui/store-bindings.js`). O texto que está no HTML serve só de fallback sem JS.
- **Acessibilidade:** `<dialog>` nativo, `aria-*` nos controlos, foco visível, `prefers-reduced-motion` respeitado e skip link.

## Evolução sugerida

1. Fotos reais em `public/img/products/` (WebP, 1200×1500).
2. Passar o catálogo para um CMS headless ou um Google Sheet (CSV) quando a loja quiser editar sem programador.
3. Juntar o CSS num só ficheiro para produção (ex.: `npx lightningcss --bundle --minify`).
4. Pagamentos online (Stripe/SumUp) só quando o volume o justificar.
