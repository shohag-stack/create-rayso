# Section library

Everything the new generator builds templates from. The original scaffold in
`template/` (used by `bin/index.js`) is kept as it was and isn't used here.

```
library/
  base/        complete template every generated project starts from
               (Next.js frontend, Sanity studio, page + siteSettings schemas,
               shared fields, CLAUDE.md, README, zip and seed scripts)
  sections/    one folder per section: sections/<category>/<id>/
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

## Commands (from the repo root)

| Command | What it does |
|---|---|
| `npm run check:library` | Validates every section folder |
| `npm run playground` | Generates `playground/` with every section and the resort theme |
| `cd playground && npm install && npm run dev:frontend` | Shows every section at <http://localhost:3000/library>, no Sanity project needed |

The generator writes the files that list sections (`studio/schemaTypes/sections/index.ts`,
`frontend/(core)/fetch/page.ts`, `frontend/types/sections.ts`,
`frontend/components/sections/SectionRenderer.tsx`), the theme
(`frontend/app/theme.css`, `frontend/app/fonts.ts`), demo content
(`seed/demo-content.ndjson`) and the section table in `CLAUDE.MD`.
