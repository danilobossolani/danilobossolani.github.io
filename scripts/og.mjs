// Gera a capa que aparece quando o link e compartilhado (WhatsApp, LinkedIn, X).
// 1200x630 e a proporcao que todos eles recortam sem cortar nada.
// Rode com `npm run images`.
import sharp from 'sharp';

const W = 1200;
const H = 630;
const PAD = 76;

const BG = '#0a0a0a';
const INK = '#fafafa';
const SOFT = '#b4b4b4';
const MUTED = '#7a7a7a';
const LINE = '#262626';
const ACCENT = '#ff5c35';

const SITE = 'danilobossolani.github.io';

// ---------------------------------------------------------------- foto
// Coluna da direita, cortada em retrato e esmaecida para dentro do fundo.
const photoW = 560;

// Recorte manual em vez de automatico: o rosto precisa cair na metade direita
// da coluna, senao o esmaecimento da esquerda come metade dele.
const photo = await sharp('assets-src/danilo-original.jpg')
  .extract({ left: 120, top: 270, width: 880, height: 990 })
  .resize(photoW, H, { fit: 'cover' })
  .grayscale()
  .modulate({ brightness: 1.06 })
  .linear(1.12, -12)
  .toBuffer();

// Mascara: transparente na borda esquerda, opaca a partir de ~45% da coluna.
const fade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${photoW}" height="${H}">
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.45" stop-color="#fff" stop-opacity="0.85"/>
      <stop offset="0.75" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="${photoW}" height="${H}" fill="url(#f)"/>
</svg>`);

const photoFaded = await sharp(photo)
  .composite([{ input: fade, blend: 'dest-in' }])
  .png()
  .toBuffer();

// ---------------------------------------------------------------- fundo
const backdrop = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="0.2" cy="0.12" r="0.7">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.035"/>
</svg>`);

// ---------------------------------------------------------------- texto
// Fica por cima da foto, entao vive todo dentro dos 640px da esquerda.
const baseline = { name: 268, tagline: 340, sub: 392 };

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <!-- Fio de progresso do topo do site, repetido aqui como assinatura. -->
  <rect x="0" y="0" width="${W}" height="4" fill="${ACCENT}"/>

  <!-- Selo de disponibilidade. -->
  <circle cx="${PAD + 7}" cy="${150}" r="6" fill="${ACCENT}"/>
  <text x="${PAD + 26}" y="${156}" font-family="JetBrains Mono" font-size="19"
        letter-spacing="3.4" fill="${MUTED}">DESENVOLVEDOR BACK-END JÚNIOR</text>

  <text x="${PAD}" y="${baseline.name}" font-family="Instrument Serif" font-size="92"
        letter-spacing="-1.5" fill="${INK}">Danilo Bossolani</text>

  <text x="${PAD}" y="${baseline.tagline}" font-family="Instrument Serif" font-size="46"
        font-style="italic" fill="${ACCENT}">APIs, dados e sistemas com IA</text>

  <text x="${PAD}" y="${baseline.sub}" font-family="Inter" font-size="23"
        fill="${SOFT}">Java · Spring Boot · PostgreSQL · Node.js</text>

  <line x1="${PAD}" y1="470" x2="${PAD + 470}" y2="470" stroke="${LINE}" stroke-width="1"/>

  <text x="${PAD}" y="${522}" font-family="JetBrains Mono" font-size="21"
        letter-spacing="1.2" fill="${INK}">${SITE}</text>

  <text x="${PAD}" y="${562}" font-family="JetBrains Mono" font-size="17"
        letter-spacing="2.6" fill="${MUTED}">SOROCABA · SP · BRASIL</text>
</svg>`);

await sharp(backdrop)
  .composite([
    { input: photoFaded, left: W - photoW, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 90, progressive: true, mozjpeg: true })
  .toFile('public/og.jpg');

// Versao quadrada: alguns apps de mensagem recortam o preview em 1:1, e o
// recorte automatico deles cortaria o nome pela metade.
await sharp('public/og.jpg')
  .extract({ left: 0, top: 0, width: H, height: H })
  .jpeg({ quality: 90, progressive: true, mozjpeg: true })
  .toFile('public/og-square.jpg');

console.log('capa: ok');
