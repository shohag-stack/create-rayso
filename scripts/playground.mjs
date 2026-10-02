// Generates playground/: a template holding every library section, previewed at /library.
// Usage: npm run playground [-- --theme resort]
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateTemplate } from '../bin/lib/generate.js';
import { loadSections, loadTheme } from '../bin/lib/library.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const targetDir = path.join(root, 'playground');
const themeArg = process.argv.indexOf('--theme');
const themeId = themeArg > -1 ? process.argv[themeArg + 1] : 'resort';

const { sections, errors } = await loadSections();
if (errors.length) {
  console.error('✖ Fix the library first (npm run check:library):\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

// Keep installed packages between runs; replace everything else
if (fs.existsSync(targetDir)) {
  for (const entry of await fs.readdir(targetDir)) {
    if (entry !== 'node_modules') await fs.remove(path.join(targetDir, entry));
  }
}

await generateTemplate({
  targetDir,
  sections,
  theme: await loadTheme(themeId),
  siteName: 'RAYSO Playground',
  pages: [{ id: 'home', title: 'Home', sections: sections.filter((s) => s.category !== 'footer').map((s) => s.id) }],
  preview: true,
});

const pkgFile = path.join(targetDir, 'package.json');
const pkg = await fs.readJson(pkgFile);
await fs.writeJson(pkgFile, { ...pkg, name: 'rayso-playground' }, { spaces: 2 });

console.log(`✔ playground/ generated with ${sections.length} section(s), theme "${themeId}"`);
console.log('  cd playground && npm install && npm run dev:frontend  →  http://localhost:3000/library');
