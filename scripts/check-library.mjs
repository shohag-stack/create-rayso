// Validates every section, document type and niche in the library. Usage: npm run check:library
import fs from 'fs-extra';
import path from 'path';
import { LIBRARY_DIR, loadLibrary } from '../bin/lib/library.js';
import { loadNiches, nicheErrors } from '../bin/lib/niche.js';

const { sections, documents, errors } = await loadLibrary();
const niches = await loadNiches();
const themeIds = (await fs.readdir(path.join(LIBRARY_DIR, 'themes'))).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
for (const niche of niches) errors.push(...nicheErrors(niche, sections, themeIds));
if (errors.length) {
  console.error(`✖ ${errors.length} problem(s) in the section library:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✔ ${sections.length} section(s) OK: ${sections.map((s) => s.id).join(', ')}`);
console.log(`✔ ${documents.length} document type(s) OK: ${documents.map((d) => d.id).join(', ') || 'none'}`);
console.log(`✔ ${niches.length} niche(s) OK: ${niches.map((n) => n.id).join(', ') || 'none'}`);
