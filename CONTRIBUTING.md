# Como contribuir

## Fluxo de trabalho
1. Criar um branch a partir de `main`: `feat/…`, `fix/…`, `content/…` ou `docs/…`.
2. Commits pequenos, em português, no imperativo: `adiciona filtro por preço`.
3. Antes de abrir um PR:
   ```bash
   npm test
   ```
   ```bash
   npm run format:check
   ```
4. Abrir um PR com capturas de ecrã (desktop **e** telemóvel) se houver alterações visuais.

## Tarefas frequentes

| Quero… | Edito… |
|---|---|
| Mudar WhatsApp, morada, horário | `src/scripts/config/store.config.js` |
| Adicionar ou alterar produtos | `src/scripts/data/products.js` (e a foto em `public/img/products/`) |
| Mudar cores ou fontes | `src/styles/tokens.css` (e atualizar `docs/BRAND.md`) |
| Mudar textos institucionais | `index.html` |
| Criar uma secção nova | HTML em `index.html` + `src/styles/sections/<nome>.css` + `@import` em `main.css` |
| Criar uma funcionalidade JS | `src/scripts/features/<nome>/` com um `init<Nome>()` chamado em `main.js` |

## Checklist de revisão
- [ ] Funciona sem erros na consola
- [ ] Sem scroll horizontal a 360 px de largura
- [ ] Navegável só com teclado
- [ ] Textos seguem o tom de voz (`docs/BRAND.md`)
- [ ] Lógica nova tem teste em `tests/`
