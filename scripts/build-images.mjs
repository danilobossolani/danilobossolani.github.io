// Ponto de entrada de `npm run images`.
//
// A capa do preview tem texto, e quem desenha texto dentro do sharp e o
// fontconfig do sistema — que nao conhece IBM Plex Sans nem IBM Plex Mono.
// Entao apontamos o fontconfig para assets-src/fonts antes de chamar o
// gerador. A variavel precisa existir quando o sharp carrega, por isso o
// script roda num processo filho em vez de um import daqui.
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fontDir = resolve(root, 'assets-src/fonts');
const cacheDir = resolve(root, 'scripts/.tmp/fccache');
const confPath = resolve(cacheDir, 'fonts.conf');

const posix = (p) => p.replace(/\\/g, '/');

mkdirSync(cacheDir, { recursive: true });
writeFileSync(
  confPath,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${posix(fontDir)}</dir>
  <cachedir>${posix(cacheDir)}</cachedir>
</fontconfig>
`,
);

const env = { ...process.env, FONTCONFIG_FILE: posix(confPath) };

for (const script of ['scripts/og.mjs']) {
  const run = spawnSync(process.execPath, [script], { cwd: root, env, stdio: 'inherit' });
  if (run.status !== 0) process.exit(run.status ?? 1);
}
