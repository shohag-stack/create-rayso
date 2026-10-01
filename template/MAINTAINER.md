# Maintainer notes (seller only, not shipped)

Never write a Sanity project ID, token or email into any `.md` file: it changes
per template and per project. Read it from `studio/.env.local` /
`frontend/.env.local` when a command needs it.

`zip.sh` leaves this file out of the buyer zip. Keep anything personal or
release-specific here, not in `CLAUDE.md` or `README.md` (both ship).

## Demo setup
- Sanity demo project: the one in `studio/.env.local` (`SANITY_STUDIO_PROJECT_ID`),
  dataset `production` (public). This is the live preview's content: anything
  published here shows on the demo site within a minute. Never give buyers
  access to it.
- Live preview: Vercel project with Root Directory `frontend` and env vars
  `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` copied from
  `frontend/.env.local`. Add the Vercel URL to the Sanity project's CORS origins.
- Sold on Lemon Squeezy as the zip from `npm run zip`. The GitHub repo holds
  the source only (zips and `seed/*.tar.gz` are git-ignored).

## Releasing (what `/zip-project` does)
1. Bump `version` in the root `package.json` when the release changes anything
   buyers see. The zip is named `<name>-<version>.zip`.
2. Checks: `npm run lint` and `npx tsc --noEmit` in `frontend/`,
   `npx tsc --noEmit` in `studio/`, and `npm run build` at the root. Stop and
   fix on failure.
3. Shipped docs are buyer-safe: no project ID, emails or seller notes in
   `CLAUDE.md`, `README.md`, `.env.example` files or `.claude/commands/`.
   README setup steps still match the code (env vars, scripts, routes).
4. `npm run zip`. It exports the dataset to `seed/demo-content.tar.gz`
   (documents, images and videos), stages a clean copy without seller-only
   files, aborts if an env file, an unfilled license or the demo project ID
   would ship, and writes the zip to the repo root (it unpacks into a
   `<name>/` folder). The export needs `npx sanity login` in `studio/` once;
   `npm run zip -- --no-export` reuses the existing seed file.
5. Check the zip: `unzip -l <zip>` contains `LICENSE.txt`, `README.md`, `CLAUDE.md`,
   `seed/demo-content.tar.gz`, both `.env.example` files; and no
   `MAINTAINER.md`, `zip.sh`, `.env.local`, `node_modules` or `.next`.
6. Upload the zip to Lemon Squeezy. Don't commit it.

Seller-only files left out of the zip: `MAINTAINER.md`, `zip.sh`,
`.claude/commands/zip-project.md`. Add template-specific exclusions (e.g. unused
media folders) to the `rsync` list in `zip.sh` and note them here.

## Before selling
- **License:** `LICENSE.txt` is the commercial license buyers get (one
  purchase = one end product; no reselling or redistributing the code). The
  CLI fills in its name, year and author; `zip.sh` refuses to run if it's
  missing or still has `{{placeholders}}`. Change the terms there if this
  template is sold with other tiers (e.g. an extended/agency license), and
  keep the store page in line with it.
- **Media rights:** the seed redistributes every demo image and video. Make
  sure each one may be redistributed to buyers, or replace it.
- **Placeholder content:** list demo content that still needs real text or
  images (duplicate titles, `example.com` links, stand-in photos).
- **Known TODOs:** anything left as `TODO(dev)` (also listed in `CLAUDE.md`).
