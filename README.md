# Novitá — *Sempre algo novo.*

Site oficial e catálogo da loja **Novitá** ([@lojanovita](https://www.instagram.com/lojanovita)).

## Funcionalidades

- **Catálogo** com filtros por categoria, ordenação por preço e etiquetas (Novo, Promo, Últimas peças)
- **Vista rápida** de produto com escolha de tamanho
- **Saco de compras** guardado no browser, com barra de progresso para portes grátis
- **Checkout por WhatsApp**: a encomenda vai já escrita, com peças, tamanhos e total
- Botão de WhatsApp flutuante e pedidos de ajuda pré-escritos em cada contexto
- **Clube Novitá**: entrada na lista VIP pelo WhatsApp
- FAQ, "Como comprar", localização e horário
- **`links.html`**: página de "link na bio" com a identidade da marca (substitui o bio.site)
- SEO: meta tags, Open Graph e dados estruturados (`ClothingStore`)
- Acessível (teclado, leitores de ecrã, `prefers-reduced-motion`) e responsivo

## Começar

```bash
npm run dev
```

Abre em http://localhost:5173. Não há dependências para instalar.

> Os ES modules não funcionam ao abrir o `index.html` diretamente (`file://`). Use sempre um servidor local.

```bash
npm test
```

## Personalizar

1. **Dados da loja:** `src/scripts/config/store.config.js`
2. **Produtos:** `src/scripts/data/products.js`
3. **Cores e fontes:** `src/styles/tokens.css`

Os valores provisórios a confirmar estão listados em [`docs/BRAND.md`](docs/BRAND.md#5-dados-a-confirmar-com-a-loja).

## Documentação

- [Guia de Marca](docs/BRAND.md): posicionamento, tom de voz, paleta e sugestões de marketing
- [Arquitetura](docs/ARCHITECTURE.md): decisões técnicas, estrutura e convenções
- [Como contribuir](CONTRIBUTING.md): fluxo de trabalho da equipa

## Publicar

É um site estático: basta publicar a pasta raiz no GitHub Pages, Netlify ou Vercel.
