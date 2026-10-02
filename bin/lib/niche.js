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

// Same seed, same numbers: a mix can be rebuilt from its code
function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const shuffle = (list, random) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// A variant's look without its demo text: short single-word values (layout, tone, position),
// booleans, numbers and removals are kept; text and lists go back to the section's own seed
const isStyleValue = (v) => v === null || typeof v === 'boolean' || typeof v === 'number' || (typeof v === 'string' && v.length <= 20 && !/\s/.test(v));
const TEXT_KEYS = new Set(['heading', 'headingAccent', 'eyebrow', 'body', 'title', 'note', 'label', 'brandName', 'tagline', 'copyright']);
function styleOnly(s, variant) {
  const content = {};
  for (const [k, v] of Object.entries(s.variants[variant])) if (TEXT_KEYS.has(k) || !isStyleValue(v)) content[k] = s.seed[k] ?? null;
  return content;
}

/**
 * A first niche for a name with no file: the standard pages, each with fitting sections from the library.
 * With `mix` (a number), sections, their versions and the theme are picked at random from that seed.
 */
export function draftNiche(id, sections, theme, { mix, themes = ['resort'] } = {}) {
  const random = mix === undefined ? null : seededRandom(mix);
  const order = new Map();
  const pickAll = (category) => {
    if (!order.has(category)) {
      const options = sections.filter((s) => s.category === category && fits(s, id));
      const exact = options.filter((s) => s.niches.includes(id));
      const rest = options.filter((s) => !s.niches.includes(id));
      order.set(category, (random ? [...shuffle(exact, random), ...shuffle(rest, random)] : [...exact, ...rest]).map((s) => s.id));
    }
    return order.get(category);
  };
  // A section id, or with a mix, sometimes one of its versions (in the section's own look, not its demo text)
  const entry = (sectionId, content = {}) => {
    if (!sectionId) return undefined;
    const s = sections.find((x) => x.id === sectionId);
    const names = random ? [null, ...Object.keys(s.variants)] : [null];
    const variant = names[Math.floor((random?.() ?? 0) * names.length)];
    if (!variant && !Object.keys(content).length) return sectionId;
    return { id: sectionId, ...(variant ? { variant } : {}), content: { ...(variant ? styleOnly(s, variant) : {}), ...content } };
  };
  const pick = (category, content) => entry(pickAll(category)[0], content);
  const second = (category, content) => entry(pickAll(category)[1] ?? pickAll(category)[0], content);
  theme ??= random ? themes[Math.floor(random() * themes.length)] : 'resort';
  const title = id.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  const link = (label, url) => ({ _type: 'navLink', label, link: { _type: 'link', kind: 'url', url } });
  const listing = (category, heading) => {
    const s = sections.find((x) => x.id === pickAll(category)[0]);
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
    ...(mix === undefined ? {} : { mix }),
    navbar: pick('navbar', { links: [link('About', '/about'), link('Works', '/works'), link('Blog', '/blog'), link('Contact', '/contact')] }),
    // Footer link columns pointing at the standard pages, for footers that have columns
    footer: pick(
      'footer',
      sections.find((s) => s.id === pickAll('footer')[0])?.seed.columns
        ? {
            columns: [
              { _type: 'linkColumn', heading: 'Company', links: [link('About', '/about'), link('Works', '/works')] },
              { _type: 'linkColumn', heading: 'Read', links: [link('Blog', '/blog')] },
              { _type: 'linkColumn', heading: 'Contact', links: [link('Get in touch', '/contact')] },
            ],
          }
        : {}
    ),
    pages: [
      page('home', 'Home', 'light', DRAFT_ORDER.map((c) => pick(c))),
      page('about', 'About', 'light', [
        second('hero', { heading: `About ${title}`, headingAccent: null, eyebrow: null, emailCapture: null }),
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
