// Writes the package.json version into the lythumb.js banner, which esbuild carries over to dist.
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const { version } = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const file = new URL('lythumb.js', root);
const src = readFileSync(file, 'utf8');
const banner = /^(\/\*! Lythumb v)\S+/;

if (!banner.test(src)) {
  console.error('sync-version: banner "/*! Lythumb v..." not found at the top of lythumb.js');
  process.exit(1);
}
const out = src.replace(banner, `$1${version}`);
if (out !== src) {
  writeFileSync(file, out);
  console.log(`sync-version: lythumb.js -> v${version}`);
}
