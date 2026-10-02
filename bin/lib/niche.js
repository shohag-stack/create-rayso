// Reads niche files (library/niches/<id>.json): which theme, menu, footer and page sections a template uses
import fs from 'fs-extra';
import path from 'path';
import { LIBRARY_DIR } from './library.js';

// Pages every template has. /works/<slug> and /blog/<slug> come with the works and blog
// sections (their documents have a route), so those pages must hold one.
export const REQUIRED_PAGES = [
  { id: 'home' },
  { id: 'about', slug: 'about' },
  { id: 'works', slug: 'works', needs: 'works' },
  { id: 'blog', slug: 'blog', needs: 'blog' },
  { id: 'contact', slug: 'contact', needs: 'contact' },
];

// Home page order when a niche has no file and its sections are picked from the library
const DRAFT_ORDER = ['hero', 'logos', 'features', 'works', 'testimonials', 'blog', 'faq'];

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
  for (const req of REQUIRED_PAGES) {
    const page = pages.find((p) => p.id === req.id);
    if (!page) {
      errors.push(`${where}: every template needs a "${req.id}" page`);
      continue;
    }
    if (req.slug && page.slug !== req.slug) errors.push(`${where}: page "${req.id}" needs "slug": "${req.slug}"`);
    if (req.needs && !(page.sections ?? []).some((e) => byId.get(entryId(e))?.category === req.needs)) {
      errors.push(`${where}: page "${req.id}" needs a ${req.needs} section`);
    }
  }
  for (const p of pages) {
    if (p.id !== 'home' && !p.slug) errors.push(`${where}: page "${p.id}" needs a "slug"`);
    for (const e of p.sections ?? []) checkEntry(e, null, `page "${p.id}" section`);
  }
  return errors;
}

// A first niche for a name with no file: the standard pages, each with fitting sections from the library
export function draftNiche(id, sections, theme = 'resort') {
  const pickAll = (category) => {
    const options = sections.filter((s) => s.category === category && fits(s, id));
    return [...options.filter((s) => s.niches.includes(id)), ...options.filter((s) => !s.niches.includes(id))].map((s) => s.id);
  };
  const pick = (category) => pickAll(category)[0];
  const second = (category) => pickAll(category)[1] ?? pick(category);
  const title = id.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  const link = (label, url) => ({ _type: 'navLink', label, link: { _type: 'link', kind: 'url', url } });
  const listing = (category, heading) => {
    const s = sections.find((x) => x.id === pick(category));
    // The variant that lists every seeded document, when the section has one
    const variant = s && Object.entries(s.variants).sort(([, a], [, b]) => JSON.stringify(b).length - JSON.stringify(a).length)[0]?.[0];
    return s && { id: s.id, ...(variant ? { variant } : {}), content: { heading, eyebrow: null, cta: null, tone: 'page' } };
  };
  const page = (pageId, pageTitle, menuColor, list) => ({
    id: pageId,
    title: pageTitle,
    ...(pageId === 'home' ? {} : { slug: pageId }),
    menuColor,
    sections: list.filter(Boolean),
  });
  return {
    id,
    title,
    description: `First draft, picked from each section's "niches" in the library.`,
    theme,
    siteName: title,
    navbar: pick('navbar') && {
      id: pick('navbar'),
      content: { links: [link('About', '/about'), link('Works', '/works'), link('Blog', '/blog'), link('Contact', '/contact')] },
    },
    // Footer link columns pointing at the standard pages, for footers that have columns
    footer: sections.find((s) => s.id === pick('footer'))?.seed.columns
      ? {
          id: pick('footer'),
          content: {
            columns: [
              { _type: 'linkColumn', heading: 'Company', links: [link('About', '/about'), link('Works', '/works')] },
              { _type: 'linkColumn', heading: 'Read', links: [link('Blog', '/blog')] },
              { _type: 'linkColumn', heading: 'Contact', links: [link('Get in touch', '/contact')] },
            ],
          },
        }
      : pick('footer'),
    pages: [
      page('home', 'Home', 'light', DRAFT_ORDER.map(pick)),
      page('about', 'About', 'light', [
        second('hero') && { id: second('hero'), content: { heading: `About ${title}`, headingAccent: null, eyebrow: null, emailCapture: null } },
        pick('features'),
        second('testimonials'),
        pick('logos'),
      ]),
      page('works', 'Works', 'dark', [listing('works', 'Our work')]),
      page('blog', 'Blog', 'dark', [listing('blog', 'Blog')]),
      page('contact', 'Contact', 'dark', [pick('contact'), pick('faq')]),
    ],
  };
}

// The library sections a niche uses (pages, navbar and footer), in library order
export function nicheSections(niche, sections) {
  const ids = new Set([niche.navbar, niche.footer, ...niche.pages.flatMap((p) => p.sections)].filter(Boolean).map(entryId));
  return sections.filter((s) => ids.has(s.id));
}
