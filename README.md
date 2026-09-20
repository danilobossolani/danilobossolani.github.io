# Portfólio — Danilo Bossolani

Site pessoal em React, bilíngue (pt-BR / inglês), com tema escuro e claro.
Publicado em <https://danilobossolani.github.io>.

## Stack

- **React 19** + **TypeScript** com **Vite**
- **Tailwind CSS v4** — tokens de cor em `src/index.css`, um par por tema
- **Motion** para as animações de entrada e o paralaxe
- **lucide-react** para os ícones
- **sharp** para gerar o retrato e a capa de compartilhamento
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

## Imagens

O retrato e a capa que aparece ao compartilhar o link são **gerados**, não
editados à mão:

```bash
npm run images
```

O comando lê `assets-src/danilo-original.jpg` e escreve:

| Saída | O quê |
|---|---|
| `public/img/danilo-*.avif` / `.webp` / `.jpg` | O retrato do "Sobre", em cinco larguras (480 a 1200), para o `srcset` escolher a certa em cada tela |
| `public/og.jpg` | A capa 1200×630 do WhatsApp, LinkedIn e X |
| `public/og-square.jpg` | A mesma capa em 1:1, para apps que recortam quadrado |

Para trocar a foto, substitua `assets-src/danilo-original.jpg` e rode
`npm run images`. O enquadramento fica em `scripts/images.mjs` (constante
`CROP`) e `scripts/og.mjs` (o `extract` da foto).

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

- Metade da vida do site no desktop é `hover`, e o Tailwind só aplica `hover`
  onde existe ponteiro. Quem devolve a resposta no celular são os utilitários
  `tap`, `tap-line` e `tap-ink` (fim de `src/index.css`), ativos apenas sob
  `@media (hover: none)`.
- No "Sobre", o preto e branco da foto sai com o **scroll** no celular, não com
  o hover — a foto ganha cor ao chegar ao centro da tela.
- `container-page` usa `env(safe-area-inset-*)`: no iPhone deitado o conteúdo
  não entra embaixo do entalhe.
- O cabeçalho se esconde ao descer e volta ao primeiro gesto para cima, só em
  telas menores que `md`.

## Estrutura

```
assets-src/       originais das imagens e as fontes usadas pelo sharp
scripts/          geradores do retrato e da capa (npm run images)
src/
  components/     uma seção por arquivo
  context/        tema e idioma, persistidos em localStorage
  data/content.ts todo o conteúdo e os textos
  index.css       tokens, tipografia e utilitários
.github/workflows/deploy.yml   build e publicação no Pages
```
