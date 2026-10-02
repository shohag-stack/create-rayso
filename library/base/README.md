# <Template Name>

<!-- One-line description of this template. -->

Built with **Next.js**, **Tailwind CSS v4**, **GSAP** animations and a
**Sanity** content studio. Every page is built from sections you can add,
remove and reorder, with no code needed.

```
frontend/   the website (Next.js)
studio/     the content editor (Sanity Studio)
seed/       demo content: pages, projects, posts, images and videos
```

## What you need

- [Node.js](https://nodejs.org) 20.9 or newer, with npm
- A free [Sanity](https://www.sanity.io) account
- A free [Vercel](https://vercel.com) account to put the site online

## 1. Install

From this folder:

```bash
npm install
```

## 2. Create your Sanity project

```bash
cd studio
npx sanity login
npx sanity init --bare
cd ..
```

Pick **Create new project**, name it, and create a dataset called
`production` with **Public** visibility. Note the **project ID** it prints.

## 3. Add your project ID

Copy the two example env files and put your project ID in both:

```bash
cp studio/.env.example studio/.env.local
cp frontend/.env.example frontend/.env.local
```

```bash
# studio/.env.local
SANITY_STUDIO_PROJECT_ID=abc123xy
SANITY_STUDIO_DATASET=production

# frontend/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
```

## 4. Load the demo content

```bash
npm run seed
```

This imports every page, project, blog post, image and video from the demo.
It takes a minute or two.

## 5. Run it

```bash
npm run dev
```

- Website: <http://localhost:3000>
- Studio (content editor): <http://localhost:3333>

If the Studio says the origin isn't allowed, open
[sanity.io/manage](https://www.sanity.io/manage) → your project → **API** →
**CORS origins**, add `http://localhost:3333` and tick **Allow credentials**.

Until you add a project ID the website shows the bundled demo content, so you
can look around first (`npm run dev:frontend`).

### Contact form

The form on the Contact page emails each message to you with
[Resend](https://resend.com) (free plan available). Add to `frontend/.env.local`:

```bash
RESEND_API_KEY=re_...
CONTACT_EMAIL=you@yourbusiness.com
# Optional, once your domain is verified in Resend:
CONTACT_FROM_EMAIL=Website <hello@yourbusiness.com>
```

Without these, messages are accepted while you run `npm run dev` (they show in
the terminal) and the live site asks visitors to email you instead.

## Editing content

Everything on the site is edited in the Studio:

- **Home page** and **Other pages**: each page is a list of sections. Use
  **+ Add item** to add one, and drag to reorder. Each field says where it
  appears on the page.
- Content used in several places (projects, posts, FAQs…) has its own list in
  the sidebar; sections pick from it.
- **Site settings**: the menu, the footer, and other site-wide content.

- Every template has these pages: Home, About, Works, Blog and Contact, plus a
  page for each project (`/works/<project>`) and each post (`/blog/<post>`).
  Add projects under **Works** and posts under **Blog posts**; they appear on
  the Works and Blog pages and get their own page automatically.

<!-- Template-specific: describe this template's document types and special
     sections here (e.g. project pages, background videos). -->

## Put it online

**Studio**: host it free on Sanity:

```bash
npm run deploy:studio
```

**Website**: on Vercel:

1. Push this folder to a GitHub repository. `.env.local` files are
   git-ignored; keep them out of the repository.
2. In Vercel, **Add New → Project** and import the repository.
3. Set **Root Directory** to `frontend`.
4. Under **Environment Variables**, add `NEXT_PUBLIC_SANITY_PROJECT_ID` and
   `NEXT_PUBLIC_SANITY_DATASET` (same values as `frontend/.env.local`).
5. Deploy. Published Studio changes appear on the live site within about a
   minute; no redeploy needed.

## Customising the design

- Colours and font sizes live in the `@theme` block of
  `frontend/app/globals.css`.
- Sections are in `frontend/components/sections/`; their Studio fields are in
  `studio/schemaTypes/sections/`.
- `CLAUDE.md` describes the whole project for AI coding assistants. With
  [Claude Code](https://claude.com/claude-code), run
  `/build-section <figma-link>` to turn a Figma design into a new editable
  section.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Website and Studio together |
| `npm run build` | Production build of the website |
| `npm run seed` | Import the demo content (replaces matching documents) |
| `npm run deploy:studio` | Host the Studio on `<name>.sanity.studio` |
| `npm run deploy:schema` | Upload the content model to Sanity (only needed for Sanity's AI and dashboard tools) |

## License

This template is sold under a commercial license: one purchase covers one
website, for you or for one client. You can't resell or share the source
code. Full terms are in `LICENSE.txt`.
