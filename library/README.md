# Section library

Everything the new generator builds templates from. The original scaffold in
`template/` (used by `bin/index.js`) is kept as it was and isn't used here.

```
library/
  base/        complete template every generated project starts from
               (Next.js frontend, Sanity studio, page + siteSettings schemas,
               shared fields, CLAUDE.md, README, zip and seed scripts)
  sections/    one folder per section: sections/<category>/<id>/
  documents/   document types sections pick from (testimonials, ...): documents/<id>/
  themes/      niche themes: colours, fonts, radii (<id>.json)
```

## A section folder

```
sections/hero/hero-fullscreen-image/
  component.tsx   React component, props = the data type
  schema.ts       Sanity object type
  query.ts        GROQ fragment for the page query
  types.ts        TypeScript data type (_type, _key, fields)
  meta.json       id, category, title, description, tags, niches, uses, ...
  seed.json       demo content, imported into Sanity and shown in the playground
  variants.json   optional: extra playground previews, { "<name>": { fields that differ, null removes one } }
```

## Document types

Content used in more than one place (testimonials, later team members,
projects) is a Sanity document, not section fields. `documents/<id>/` holds
`schema.ts`, `query.ts` (`<id>Fields`), `types.ts` (`<Id>Data`), `meta.json`
(`id`, `title` for the Studio sidebar, `icon` from `@sanity/icons`) and
`seed.json` (an array of documents with fixed `_id`s). A section lists the
types it uses in `meta.json` `references`; the generator copies only those,
adds them to the Studio sidebar, seeds them, and resolves `{ "_type":
"reference", "_ref": "<_id>" }` in section seeds for the playground. Sections
pick documents with an array of references; empty shows the newest.

## Menus and footers

Sections in `sections/navbar/` and `sections/footer/` are not page sections.
Editors pick one of each in **Site settings** (Menu, Footer). `PageRenderer`
renders the menu inside a `<header>`, with the page's menu text colour passed
in as `menuColor`; `app/layout.tsx` renders the footer inside a `<footer>`. The
generator seeds Site settings with the first of each (or the ids passed as
`navbar` and `footer`). Shared pieces live in the base:
`components/ui/nav/` (brand, links and dropdowns, mobile menu, open-and-close
panel, scroll-aware shell), `components/ui/footer/` (link columns, social
links, wordmark, bottom bar), the `navLink`, `navGroup`, `linkColumn` and
`socialLink` objects, and `studio/schemaTypes/fields/navbar.ts` and `footer.ts`.

## Shared pieces for FAQs, features and logos

- FAQs use the `faqItem` (question and a short rich-text answer) and `faqGroup`
  objects, `components/ui/faq/FaqItem.tsx` (a native `<details>`; the height
  animation is in `globals.css`) and `components/ui/RichText.tsx`.
- Logo sections use the `brandLogo` object (name, optional logo, optional
  link) and `brandsField` / `monoLogosField` from `fields/section.ts`.
  `components/ui/logos/BrandMark.tsx` draws a logo, or the name as a wordmark
  when no logo is uploaded; `BrandBadge.tsx` fills a round or square badge.
- `tintField` and `components/ui/tint.ts` give editors four panel colours from
  the theme (soft accent, accent, light panel, dark). `iconField` and
  `components/ui/IconByName.tsx` give them a small built-in icon set.
- Pricing uses the `pricingPlan` and `planPrice` objects and
  `components/ui/pricing/`. `priceOptionsField` adds a switch (Monthly/Yearly,
  or currencies); each plan lists one price per option, in the same order, and
  `PlanPrice` shows the picked one. Sections that use `PlanPrice` wrap
  themselves in `PriceSwitchProvider`.
- Blog sections use the `post` document. `pickedPosts("posts", n)` in
  `@/(core)/fetch/documents/post` returns the picked posts or the newest `n`;
  `postHref` links to the post's own link or `/blog/<slug>` (the post page
  itself is not in the library yet).

Names come from the folder name (`hero-fullscreen-image`), and
`npm run check:library` fails if a file doesn't use them:

| What | Name |
|---|---|
| Sanity `_type` and schema export | `heroFullscreenImage` |
| Component | `HeroFullscreenImageSection` |
| Data type | `HeroFullscreenImageData` |
| GROQ fragment | `heroFullscreenImageFields` |

Files are copied into a template as-is, so imports use the template's paths:
`@/types/sections/<id>`, `@/(core)/fetch/fragments`, `@/components/ui/...`,
and `../fields/anchor` in schemas.

## Rules

- Semantic tokens only (`bg-surface`, `text-fg`, `bg-accent`, `font-heading`,
  `rounded-card`, ...; listed in `base/CLAUDE.MD`). No hex values, font names
  or copy in a component, so one section works in every theme.
- Everything an editor sees comes from Sanity. Every field has a plain-English
  `description`; `anchorField` is the last field; the preview subtitle is the
  section title.
- Variants that differ only by an option (image left or right) are one section
  with a field, not two folders.
- Images in `seed.json` use `"_sanityAsset": "image@<url>"`, which Sanity's
  importer uploads. Use images that may be redistributed to buyers.

## Niches

A niche file, `niches/<id>.json`, describes one sellable template: `theme`,
`siteName`, `navbar`, `footer` and `pages` (`id`, `title`, `slug` for every page
but `home`, `menuColor`, `sections`). Every navbar, footer or page section is a
section id, or `{ "id", "variant", "content" }`: `variant` is a name from that
section's `variants.json`, and `content` replaces seed fields (`null` removes
one). `npm run check:library` validates niche files too.

`npm create rayso@latest <niche>` (`bin/create.js`) builds the template with
only the sections the niche uses, installs it and starts the site. Until a
Sanity project is connected the site shows the demo content from
`frontend/(core)/demo/content.json`, with a small notice. A name with no niche
file gets a home page with one fitting section per category (by `niches` in
`meta.json`); Every template gets the recipe it was built from as `niche.json` (left out of the zip); `--save-niche` also writes a drafted one to `niches/`. Options go after `--`:
`--list`, `--name`, `--author`, `--theme`, `--project-id`, `--zip`,
`--no-install`, `--no-start`. With no niche the command runs the original
scaffold (`bin/index.js`).

Every niche must have the standard pages (`REQUIRED_PAGES` in
`bin/lib/niche.js`): `home`, `about`, `works` (with a works section), `blog`
(with a blog section) and `contact` (with a contact section). A document type
with `"route": "<base>"` in `meta.json` and a `page.tsx` gets a page per
document at `/<base>/<slug>`: `post` → `/blog/<slug>`, `work` → `/works/<slug>`.
The generator also writes `app/<base>/page.tsx` for the listing page and
`(core)/routes.ts`. Sections that need a document type list it in
`references`, which is what brings its route in.

The contact section posts to `app/api/contact/route.ts` (base), which emails
messages with Resend (`RESEND_API_KEY`, `CONTACT_EMAIL`).

A page whose first section isn't `isPageTop` starts below the menu.

## Commands (from the repo root)

| Command | What it does |
|---|---|
| `npm run check:library` | Validates every section folder |
| `node bin/create.js starter --no-start` | Builds `starter-template/` from `niches/starter.json` (what `npm create rayso@latest starter` runs) |
| `npm run playground` | Generates `playground/` with every section and the resort theme |
| `cd playground && npm install && npm run dev:frontend` | Shows every section at <http://localhost:3000/library>, no Sanity project needed |

The generator writes the files that list sections (`studio/schemaTypes/sections/index.ts`,
`frontend/(core)/fetch/page.ts`, `frontend/types/sections.ts`,
`frontend/components/sections/SectionRenderer.tsx`), the theme
(`frontend/app/theme.css`, `frontend/app/fonts.ts`), demo content
(`seed/demo-content.ndjson`, and the same in query shape in
`frontend/(core)/demo/content.json`) and the section table in `CLAUDE.MD`.
