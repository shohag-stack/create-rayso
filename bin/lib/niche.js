// Reads niche files (library/niches/<id>.json): which theme, menu, footer and page sections a template uses
import fs from 'fs-extra';
import path from 'path';
import { LIBRARY_DIR } from './library.js';

// Home page order when a niche has no file and its sections are picked from the library
const DRAFT_ORDER = ['hero', 'logos', 'features', 'testimonials', 'pricing', 'blog', 'faq'];

const entryId = (e) => (typeof e === 'string' ? e : e?.id);
const fits = (s, niche) => s.niches?.includes(niche) || s.niches?.includes('*');

export async function loadNiches(libraryDir = LIBRARY_DIR) {
  const dir = path.join(libraryDir, 'niches');
  if (!fs.existsSync(dir)) return [];
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.json')).sort();
  return Promise.all(files.map((f) => fs.readJson(path.join(dir, f))));
}

export async function loadNiche(id, libraryDir = LIBRARY_DIR) {
  const file = path.join(libraryDir, 'niches', `${id}.json`);
  return fs.existsSync(file) ? fs.readJson(file) : null;
}

// Problems with a niche file, as readable lines (empty when it's fine)
export function nicheErrors(niche, sections, themeIds) {
  const where = `niches/${niche.id}.json`;
  const errors = [];
  const byId = new Map(sections.map((s) => [s.id, s]));
  const checkEntry = (e, category, label) => {
    const s = byId.get(entryId(e));
    if (!s) return errors.push(`${where}: ${label} "${entryId(e)}" is not in the library`);
    if (category && s.category !== category) errors.push(`${where}: ${label} "${s.id}" is not a ${category} section`);
    if (!category && (s.category === 'navbar' || s.category === 'footer')) errors.push(`${where}: ${label} "${s.id}" goes in "navbar"/"footer", not on a page`);
    if (typeof e === 'object' && e.variant && !s.variants[e.variant]) {
      errors.push(`${where}: ${label} "${s.id}" has no variant "${e.variant}" (has: ${Object.keys(s.variants).join(', ') || 'none'})`);
    }
  };
  for (const key of ['id', 'title', 'theme', 'siteName', 'pages']) if (!niche[key]) errors.push(`${where}: "${key}" is missing`);
  if (niche.theme && !themeIds.includes(niche.theme)) errors.push(`${where}: theme "${niche.theme}" is not in library/themes`);
  if (niche.navbar) checkEntry(niche.navbar, 'navbar', 'navbar');
  if (niche.footer) checkEntry(niche.footer, 'footer', 'footer');
  const pages = niche.pages ?? [];
  if (pages.length && !pages.some((p) => p.id === 'home')) errors.push(`${where}: needs a page with "id": "home"`);
  for (const p of pages) {
    if (p.id !== 'home' && !p.slug) errors.push(`${where}: page "${p.id}" needs a "slug"`);
    for (const e of p.sections ?? []) checkEntry(e, null, `page "${p.id}" section`);
  }
  return errors;
}

// A first niche for a name with no file: one home page with a fitting section from each category
export function draftNiche(id, sections, theme = 'resort') {
  const pick = (category) => {
    const options = sections.filter((s) => s.category === category && fits(s, id));
    return (options.find((s) => s.niches.includes(id)) ?? options[0])?.id;
  };
  const title = id.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  return {
    id,
    title,
    description: `First draft, picked from each section's "niches" in the library.`,
    theme,
    siteName: title,
    navbar: pick('navbar'),
    footer: pick('footer'),
    pages: [{ id: 'home', title: 'Home', menuColor: 'light', sections: DRAFT_ORDER.map(pick).filter(Boolean) }],
  };
}

// The library sections a niche uses (pages, navbar and footer), in library order
export function nicheSections(niche, sections) {
  const ids = new Set([niche.navbar, niche.footer, ...niche.pages.flatMap((p) => p.sections)].filter(Boolean).map(entryId));
  return sections.filter((s) => ids.has(s.id));
}
