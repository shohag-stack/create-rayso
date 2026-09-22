# create-rayso

Official CLI scaffolder for RAYSO.STUDIO templates.

## Usage

```bash
npm create rayso@latest
```

Or with a project name:

```bash
npm create rayso@latest my-template
```

## What it does

1. Asks for project name, description, and author
2. Scaffolds the full folder structure
3. Injects your project name into all `package.json` files
4. Copies `.env.example` → `.env.local` in both frontend and studio
5. Runs `npm install` automatically

## After scaffolding

```bash
cd my-template

# Fill in your keys
nano frontend/.env.local

# Start both servers
npm run dev
```

- Frontend → http://localhost:3000
- Studio   → http://localhost:3333

## Publishing to npm

```bash
npm login
npm publish --access public
```

## Template structure

```
my-template/
├── frontend/
│   ├── app/
│   │   ├── globals.css       ← Full Tailwind v4 design system
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── sections/         ← Page sections
│   │   ├── ui/               ← Reusable UI components
│   │   ├── icons/            ← Icon components
│   │   ├── animation/        ← GSAP / AnimatedHeading etc
│   │   └── layout/           ← Navbar, Footer
│   ├── (core)/
│   │   ├── fetch/            ← Data fetching functions
│   │   ├── sanity/lib/       ← Sanity client + image builder
│   │   └── lib/              ← Email, utilities
│   ├── types/index.ts
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   └── tsconfig.json
│
├── studio/
│   ├── schemaTypes/index.ts  ← Register your schemas here
│   ├── sanity.config.ts
│   └── tsconfig.json
│
├── .gitignore
├── zip.sh                    ← npm run zip → clean dist zip
└── package.json
