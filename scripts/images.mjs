// Gera as versoes servidas do retrato a partir do original em assets-src/.
// Rode com `npm run images` sempre que trocar a foto.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'assets-src/danilo-original.jpg';
const OUT = 'public/img';

// O card do "Sobre" e 4:5. O original e 3:4, entao sobra altura: cortamos
// pelo topo, que e so toldo, e o rosto sobe para o terco superior do quadro.
const CROP = { left: 0, top: 100, width: 1200, height: 1500 };

// Larguras que cobrem de celular 1x ate desktop retina.
const WIDTHS = [480, 640, 800, 1024, 1200];

await mkdir(OUT, { recursive: true });

const base = sharp(SRC).extract(CROP);

for (const w of WIDTHS) {
  const resized = () =>
    base
      .clone()
      .resize(w, Math.round((w * CROP.height) / CROP.width), { kernel: 'lanczos3' })
      // Compensa o amaciamento da reamostragem sem deixar halo.
      .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.2 });

  await resized().avif({ quality: 58, effort: 6 }).toFile(`${OUT}/danilo-${w}.avif`);
  await resized().webp({ quality: 80, effort: 6 }).toFile(`${OUT}/danilo-${w}.webp`);
}

// Fallback unico para navegadores sem avif/webp.
await base
  .clone()
  .resize(800, 1000, { kernel: 'lanczos3' })
  .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.2 })
  .jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile(`${OUT}/danilo-800.jpg`);

console.log('retrato: ok');
