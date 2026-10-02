# create-rayso – Claude Instructions

This repo builds RAYSO.STUDIO templates (Next.js + Sanity + Tailwind v4).

- `template/` + `bin/index.js`: the original scaffold and CLI. Keep them as
  they are unless asked.
- `library/`: the section library and the base template the new generator
  uses. Read `library/README.md` before changing it.
- `bin/lib/`: the generator (`library.js` loads and validates sections,
  `generate.js` builds a template).
- `playground/`: generated, git-ignored. Never edit it by hand; change the
  library and run `npm run playground`.

## Adding a section to the library
Use `/add-section <figma-url or image>`. It follows
`library/base/CLAUDE.MD` ("Building a section", "Rules for every section") but
writes the six files into `library/sections/<category>/<id>/` instead of a
template, then runs `npm run check:library` and `npm run playground`.

## Done means
- `npm run check:library` passes.
- After `npm run playground` and `npm install` in `playground/`:
  `npx tsc --noEmit` and `npm run lint` in `playground/frontend`,
  `npx tsc --noEmit` and `npx sanity schema validate` in `playground/studio`,
  and `npm run build` in `playground/frontend` all pass.
- The section renders at `/library` on mobile (375 px) and desktop (1440 px).
