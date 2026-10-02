// Reads and validates the section library in library/sections/<category>/<id>/
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

export const LIBRARY_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'library');

// Every section folder holds these files; variants.json (extra previews) and preview.png are optional
export const SECTION_FILES = ['component.tsx', 'schema.ts', 'query.ts', 'types.ts', 'meta.json', 'seed.json'];

const META_KEYS = ['id', 'category', 'title', 'description', 'tags', 'niches', 'isPageTop', 'uses', 'references', 'features'];

export const camelCase = (id) => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
export const pascalCase = (id) => camelCase(id).replace(/^./, (c) => c.toUpperCase());

// Names a section gets in a template, derived from its id
export function sectionNames(id) {
  const typeName = camelCase(id);
  const pascal = pascalCase(id);
  return {
    typeName,                          // Sanity _type and schema export: heroFullscreenImage
    component: `${pascal}Section`,     // React component: HeroFullscreenImageSection
    dataType: `${pascal}Data`,         // TS props type: HeroFullscreenImageData
    fields: `${typeName}Fields`,       // GROQ fragment: heroFullscreenImageFields
  };
}

export async function loadSections(libraryDir = LIBRARY_DIR) {
  const sectionsDir = path.join(libraryDir, 'sections');
  const errors = [];
  const sections = [];

  for (const category of (await fs.readdir(sectionsDir)).sort()) {
    const categoryDir = path.join(sectionsDir, category);
    if (!(await fs.stat(categoryDir)).isDirectory()) continue;

    for (const id of (await fs.readdir(categoryDir)).sort()) {
      const dir = path.join(categoryDir, id);
      if (!(await fs.stat(dir)).isDirectory()) continue;
      const where = `sections/${category}/${id}`;

      const missing = SECTION_FILES.filter((f) => !fs.existsSync(path.join(dir, f)));
      if (missing.length) {
        errors.push(`${where}: missing ${missing.join(', ')}`);
        continue;
      }

      const meta = await fs.readJson(path.join(dir, 'meta.json'));
      const seed = await fs.readJson(path.join(dir, 'seed.json'));
      // Optional extra previews: { "<name>": { ...fields that differ from seed.json, null removes one } }
      const variantsFile = path.join(dir, 'variants.json');
      const variants = fs.existsSync(variantsFile) ? await fs.readJson(variantsFile) : {};
      const names = sectionNames(id);

      for (const key of META_KEYS) if (!(key in meta)) errors.push(`${where}/meta.json: missing "${key}"`);
      if (meta.id !== id) errors.push(`${where}/meta.json: id "${meta.id}" must match the folder name`);
      if (meta.category !== category) errors.push(`${where}/meta.json: category "${meta.category}" must match the parent folder`);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) errors.push(`${where}: folder name must be kebab-case`);

      // The files must use the derived names, or the generated registries won't compile
      const read = (f) => fs.readFile(path.join(dir, f), 'utf8');
      const checks = [
        ['schema.ts', `name: "${names.typeName}"`],
        ['schema.ts', `export const ${names.typeName} `],
        ['query.ts', `export const ${names.fields} `],
        ['types.ts', `export interface ${names.dataType} `],
        ['types.ts', `_type: "${names.typeName}"`],
        ['component.tsx', `export function ${names.component}(`],
        ['schema.ts', 'anchorField,\n  ],'],
      ];
      for (const [file, needle] of checks) {
        if (!(await read(file)).includes(needle)) errors.push(`${where}/${file}: expected \`${needle.replace('\n', '\\n')}\``);
      }

      sections.push({ ...meta, ...names, dir, seed, variants });
    }
  }

  const seen = new Map();
  for (const s of sections) {
    if (seen.has(s.typeName)) errors.push(`duplicate _type "${s.typeName}" in ${s.id} and ${seen.get(s.typeName)}`);
    seen.set(s.typeName, s.id);
  }

  return { sections, errors };
}

export async function loadTheme(id, libraryDir = LIBRARY_DIR) {
  const file = path.join(libraryDir, 'themes', `${id}.json`);
  if (!fs.existsSync(file)) throw new Error(`Unknown theme "${id}" (no library/themes/${id}.json)`);
  return fs.readJson(file);
}
