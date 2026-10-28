# Portfólio — Danilo Bossolani

Site pessoal em React, bilíngue (pt-BR / inglês), com tema escuro e claro.
Publicado em <https://danilobossolani.github.io>.

O conteúdo segue os currículos em `public/` (PT e EN), que são a fonte
oficial: nada no site vai além do que está neles. A identidade visual: Instrument
Serif grande nos títulos, IBM Plex Sans no texto, IBM Plex Mono só em detalhes,
verde `#0f6b58` e prints reais de cada projeto em `public/projetos/`.

## Stack

- **React 19** + **TypeScript** com **Vite**
- **Tailwind CSS v4** — tokens de cor em `src/index.css`, um par por tema
- **Instrument Serif**, **IBM Plex Sans** e **IBM Plex Mono** servidas pelo próprio site (`@fontsource`), sem Google Fonts
- Animações só em CSS (`.rise`, `.fade-up`, `.reveal` em `src/index.css`), desligadas com "reduzir movimento"
- **lucide-react** para os ícones
- **sharp** para gerar a capa de compartilhamento
- **GitHub Pages** (via GitHub Actions) para a publicação

## Rodar localmente

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:5173`.

Para abrir no celular, na mesma rede Wi-Fi:

```bash
npm run dev -- --host
```

O terminal imprime um endereço `http://192.168.x.x:5173` — é esse que vai no
navegador do telefone.

## Build

```bash
npm run build     # gera dist/
npm run preview   # serve o build para conferência
```

## Publicar

Cada `git push` na `main` dispara `.github/workflows/deploy.yml`, que roda o
build e publica o `dist/` no GitHub Pages. Não há passo manual.

Na primeira vez é preciso ligar o Pages no repositório:
**Settings → Pages → Source: GitHub Actions**.

<details>
<summary>Publicar na Cloudflare (como era antes)</summary>

O `wrangler.jsonc` continua no repositório. Para voltar:

```bash
npx wrangler login
npm run deploy:cloudflare
```

</details>

## Capa de compartilhamento

A imagem que aparece ao compartilhar o link é **gerada**, não editada à mão:

```bash
npm run images
```

O comando roda `scripts/og.mjs` e escreve:

| Saída | O quê |
|---|---|
| `public/og.jpg` | A capa 1200×630 do WhatsApp, LinkedIn e X |
| `public/og-square.jpg` | A versão 1:1, com layout próprio, para apps que recortam quadrado |

Ao mudar a capa, suba também o `?v=` do `og:image` no `index.html`: WhatsApp e
LinkedIn guardam a imagem em cache pelo endereço.

As fontes em `assets-src/fonts/` existem só para o texto da capa: quem desenha
esse texto é o sharp, que não enxerga as fontes carregadas pelo navegador.

## Onde mexer no conteúdo

Quase tudo vive em **`src/data/content.ts`**:

| O quê | Onde |
|---|---|
| Nome, e-mail, telefone, links | `profile` |
| Projetos (título, stack, links, textos) | `projects` |
| Grupos de tecnologia | `stackGroups` |
| Todos os textos das seções, nos dois idiomas | `content.pt` / `content.en` |

Os dois idiomas são checados em tempo de compilação: se um campo existir em
`pt` e faltar em `en`, o `npm run build` falha. É de propósito.

## Trocar as cores

Em `src/index.css`, no topo: `:root[data-theme='dark']` e
`:root[data-theme='light']`. Os componentes nunca usam cor literal, só os
nomes semânticos (`bg`, `ink`, `muted`, `accent`, `line`), então trocar a
paleta é mexer nesses dois blocos.

## Celular

Algumas decisões que só existem por causa do toque, e que é bom saber antes de
mexer no CSS:

- O Tailwind só aplica `hover` onde existe ponteiro. No celular, quem devolve a
  resposta ao toque é o utilitário `tap` (fim de `src/index.css`), ativo apenas
  sob `@media (hover: none)`.
- `container-page` usa `env(safe-area-inset-*)`: no iPhone deitado o conteúdo
  não entra embaixo do entalhe.
- O cabeçalho se esconde ao descer e volta ao primeiro gesto para cima, só em
  telas menores que `md`.

## Estrutura

```
assets-src/fonts/ fontes usadas pelo sharp para desenhar a capa
scripts/          gerador da capa (npm run images)
src/
  components/     uma seção por arquivo
  context/        tema e idioma, persistidos em localStorage
  data/content.ts todo o conteúdo e os textos
  index.css       tokens, tipografia e utilitários
.github/workflows/deploy.yml   build e publicação no Pages
```
