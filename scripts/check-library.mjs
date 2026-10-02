// Validates every section in library/sections. Usage: npm run check:library
import { loadSections } from '../bin/lib/library.js';

const { sections, errors } = await loadSections();
if (errors.length) {
  console.error(`✖ ${errors.length} problem(s) in the section library:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✔ ${sections.length} section(s) OK: ${sections.map((s) => s.id).join(', ')}`);
