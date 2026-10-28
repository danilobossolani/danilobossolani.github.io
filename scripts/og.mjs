// Gera a capa que aparece quando o link e compartilhado (WhatsApp, LinkedIn, X).
// Mesma identidade do curriculo: fundo branco, IBM Plex, fio escuro e verde.
// 1200x630 e a proporcao que todos eles recortam sem cortar nada; a versao
// quadrada tem layout proprio, porque um recorte cortaria o nome.
// Rode com `npm run images`.
import sharp from 'sharp';

const BG = '#ffffff';
const INK = '#16201d';
const MUTED = '#55605b';
const ACCENT = '#0f6b58';
const ACCENT_SOFT = '#e8f2ef';

const SANS = 'IBM Plex Sans';
const MONO = 'IBM Plex Mono';

const NAME = 'Danilo Yamazaki Bossolani';
const ROLE = 'Desenvolvedor Júnior · Java · Spring Boot · IA aplicada';
const STACK = 'Java 21 · Spring Boot · PostgreSQL · Node.js · TypeScript';
const WHERE = 'Sorocaba, SP · remoto · disponível para CLT ou PJ';
const SITE = 'danilobossolani.github.io';

const save = (svg, file) =>
  sharp(Buffer.from(svg)).jpeg({ quality: 90, progressive: true, mozjpeg: true }).toFile(file);

// ---------------------------------------------------------------- 1200x630
{
  const W = 1200;
  const H = 630;
  const X = 80;

  await save(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <text x="${X}" y="200" font-family="${SANS}" font-weight="700" font-size="68"
        letter-spacing="-0.5" fill="${INK}">${NAME}</text>
  <text x="${X}" y="256" font-family="${SANS}" font-weight="600" font-size="30"
        fill="${ACCENT}">${ROLE}</text>

  <!-- O fio grosso sob o cabecalho, como no curriculo. -->
  <rect x="${X}" y="300" width="${W - 2 * X}" height="4" fill="${INK}"/>

  <text x="${X}" y="370" font-family="${MONO}" font-size="24" fill="${ACCENT}">${STACK}</text>
  <text x="${X}" y="418" font-family="${SANS}" font-size="26" fill="${MUTED}">${WHERE}</text>

  <rect x="${X}" y="490" width="6" height="64" fill="${ACCENT}"/>
  <rect x="${X + 6}" y="490" width="${W - 2 * X - 6}" height="64" fill="${ACCENT_SOFT}"/>
  <text x="${X + 30}" y="531" font-family="${MONO}" font-weight="500" font-size="24"
        fill="${INK}">${SITE}</text>
</svg>`,
    'public/og.jpg',
  );
}

// ---------------------------------------------------------------- 630x630
{
  const S = 630;
  const X = 56;

  await save(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <rect width="${S}" height="${S}" fill="${BG}"/>

  <text x="${X}" y="170" font-family="${SANS}" font-weight="700" font-size="56"
        letter-spacing="-0.5" fill="${INK}">Danilo Yamazaki</text>
  <text x="${X}" y="236" font-family="${SANS}" font-weight="700" font-size="56"
        letter-spacing="-0.5" fill="${INK}">Bossolani</text>

  <text x="${X}" y="296" font-family="${SANS}" font-weight="600" font-size="28"
        fill="${ACCENT}">Desenvolvedor Júnior</text>
  <text x="${X}" y="336" font-family="${SANS}" font-weight="600" font-size="28"
        fill="${ACCENT}">Java · Spring Boot · IA aplicada</text>

  <rect x="${X}" y="376" width="${S - 2 * X}" height="4" fill="${INK}"/>

  <text x="${X}" y="430" font-family="${SANS}" font-size="22" fill="${MUTED}">Sorocaba, SP · remoto · CLT ou PJ</text>

  <rect x="${X}" y="490" width="5" height="56" fill="${ACCENT}"/>
  <rect x="${X + 5}" y="490" width="${S - 2 * X - 5}" height="56" fill="${ACCENT_SOFT}"/>
  <text x="${X + 24}" y="526" font-family="${MONO}" font-weight="500" font-size="21"
        fill="${INK}">${SITE}</text>
</svg>`,
    'public/og-square.jpg',
  );
}

console.log('capa: ok');
