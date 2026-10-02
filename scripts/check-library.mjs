// Validates every section and document type in the library. Usage: npm run check:library
import { loadLibrary } from '../bin/lib/library.js';

const { sections, documents, errors } = await loadLibrary();
if (errors.length) {
  console.error(`✖ ${errors.length} problem(s) in the section library:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✔ ${sections.length} section(s) OK: ${sections.map((s) => s.id).join(', ')}`);
console.log(`✔ ${documents.length} document type(s) OK: ${documents.map((d) => d.id).join(', ') || 'none'}`);
