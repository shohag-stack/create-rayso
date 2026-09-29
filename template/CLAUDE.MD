# RAYSO Template – Claude Instructions

Monorepo: `frontend/` (Next.js App Router, Tailwind v4, GSAP) and `studio/` (Sanity).

## Your job
Build front-end UI from Figma designs: markup, styling, responsiveness,
and the Sanity wiring for content. Do NOT write business logic, form
submission, email, auth, or integrations. Leave `// TODO(dev):` markers there.

## Design system
- All tokens live in `frontend/app/globals.css` (Tailwind v4 theme).
- Never hardcode colors, font sizes, radii, or spacing. If a Figma value
  has no matching token, use the closest one and list it in your summary.
- Do not add new tokens without asking.

## Where things go
- Page sections → `frontend/components/sections/<Name>.tsx`
- Reusable UI (buttons, cards, inputs) → `components/ui/`
- SVG icons → `components/icons/` (never inline in sections)
- Animations → `components/animation/` (use existing GSAP helpers)
- Navbar/Footer → `components/layout/`
- Data fetching → `(core)/fetch/` ; Sanity client → `(core)/sanity/lib/`
- Types → `types/index.ts`
- Sanity schemas → `studio/schemaTypes/`, registered in `schemaTypes/index.ts`

## Rules for every section
1. Check `components/ui/` first and reuse before creating anything.
2. Server component by default; add "use client" only when needed (GSAP, state).
3. Mobile-first. Implement all breakpoints, even if Figma only shows desktop:
   stack on mobile, sensible tablet layout.
4. Content comes from Sanity via props. Nothing editable is hardcoded.
5. Use next/image with the image builder for Sanity images.
6. Semantic HTML, one h1 per page, alt text from Sanity.
7. Every section needs: component, Sanity schema, schema registration,
   GROQ query in `(core)/fetch/`, and a type in `types/index.ts`.

## Reference implementation
Follow `components/sections/<ExampleSection>.tsx` and its schema as the pattern.

## Done means
- `npm run lint` and typecheck pass in `frontend/`
- Summary lists: files created, tokens with no match, TODOs left for the dev