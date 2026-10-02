#!/usr/bin/env node
// npm create rayso@latest <niche> [folder] [-- options]
// Builds a template for a niche from the section library, installs it and starts the preview.
// With no niche it runs the original scaffold (bin/index.js).
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import { parseArgs } from 'util';
import { SITE_CATEGORIES, generateTemplate } from './lib/generate.js';
import { LIBRARY_DIR, loadLibrary, loadTheme } from './lib/library.js';
import { draftNiche, loadNiche, loadNiches, nicheErrors, nicheSections } from './lib/niche.js';

const HELP = `
${chalk.bold('npm create rayso@latest <niche> [folder] -- [options]')}

  Builds a template for <niche> (starter, or any name like dental), installs it and opens the preview.
  With no niche it runs the original scaffold.

  --list              Show the niches in the library
  --name <name>       Package and folder name (default: <niche>-template)
  --author <name>     License holder (default: RAYSO.STUDIO)
  --theme <id>        Use another theme from library/themes
  --project-id <id>   Connect a Sanity project (writes the .env.local files)
  --zip               Also make the buyer zip
  --no-install        Only write the files
  --no-start          Don't start the preview
  --save-niche        For a niche with no file, also save the picked sections to library/niches/<niche>.json
                      (every template gets its recipe as niche.json either way)
`;

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    list: { type: 'boolean' },
    help: { type: 'boolean', short: 'h' },
    name: { type: 'string' },
    author: { type: 'string', default: 'RAYSO.STUDIO' },
    theme: { type: 'string' },
    'project-id': { type: 'string' },
    zip: { type: 'boolean' },
    'no-install': { type: 'boolean' },
    'no-start': { type: 'boolean' },
    'save-niche': { type: 'boolean' },
  },
});

if (opts.help) {
  console.log(HELP);
  process.exit(0);
}

const fail = (message) => {
  console.error(chalk.red(`\n✖ ${message}\n`));
  process.exit(1);
};

if (opts.list) {
  const niches = await loadNiches();
  console.log('\n' + chalk.bold('Niches in the library') + '\n');
  for (const n of niches) console.log(`  ${chalk.cyan(n.id.padEnd(14))} ${n.description ?? n.title}`);
  console.log(chalk.gray('\n  Any other name builds a first draft from the sections that fit it.\n'));
  process.exit(0);
}

const [nicheId, folder] = positionals;
if (!nicheId) {
  await import('./index.js');
} else {
  await createFromNiche(nicheId, folder);
}

async function createFromNiche(nicheId, folder) {
  if (!/^[a-z0-9-]+$/.test(nicheId)) fail(`Niche "${nicheId}": use lowercase letters, numbers and hyphens`);
  console.log('\n' + chalk.bold.white('RAYSO.STUDIO') + chalk.gray(` · ${nicheId} template`));
  console.log(chalk.gray('─'.repeat(42)) + '\n');

  const { sections, documents, errors } = await loadLibrary();
  if (errors.length) fail('The section library has problems (npm run check:library):\n' + errors.map((e) => `  - ${e}`).join('\n'));

  let niche = await loadNiche(nicheId);
  if (!niche) {
    niche = draftNiche(nicheId, sections, opts.theme);
    console.log(chalk.yellow(`  No library/niches/${nicheId}.json yet, so the sections were picked from the library:`));
    console.log(chalk.gray(`  ${niche.pages[0].sections.join(', ')}\n`));
    if (opts['save-niche']) {
      const file = path.join(LIBRARY_DIR, 'niches', `${nicheId}.json`);
      await fs.outputJson(file, niche, { spaces: 2 });
      console.log(chalk.gray(`  Saved ${path.relative(process.cwd(), file)}\n`));
    }
  }
  if (opts.theme) niche = { ...niche, theme: opts.theme };
  const themeIds = (await fs.readdir(path.join(LIBRARY_DIR, 'themes'))).map((f) => f.replace(/\.json$/, ''));
  const problems = nicheErrors(niche, sections, themeIds);
  if (problems.length) fail(`The ${nicheId} niche has problems:\n` + problems.map((e) => `  - ${e}`).join('\n'));

  const name = opts.name ?? folder ?? `${nicheId}-template`;
  if (!/^[a-z0-9-_]+$/.test(name)) fail(`Name "${name}": use lowercase letters, numbers, hyphens only`);
  const targetDir = path.resolve(process.cwd(), folder ?? name);
  if (fs.existsSync(targetDir)) fail(`Folder "${path.relative(process.cwd(), targetDir)}" already exists`);

  // 1. Build
  const used = nicheSections(niche, sections);
  const spinner = ora(`Building ${used.length} sections into ${path.relative(process.cwd(), targetDir)}...`).start();
  try {
    await generateTemplate({
      targetDir,
      sections: used,
      documents,
      theme: await loadTheme(niche.theme),
      siteName: niche.siteName,
      navbar: niche.navbar,
      footer: niche.footer,
      pages: niche.pages,
    });
    await personalise(targetDir, { name, author: opts.author, niche, projectId: opts['project-id'] });
    // The recipe this template was built from, so it can be edited and rebuilt (not shipped in the zip)
    await fs.writeJson(path.join(targetDir, 'niche.json'), niche, { spaces: 2 });
    spinner.succeed(`Built ${niche.pages.length} page(s) and ${used.filter((s) => !SITE_CATEGORIES.includes(s.category)).length} section type(s), with the Sanity schema and demo content`);
  } catch (err) {
    spinner.fail('Build failed');
    await fs.remove(targetDir);
    fail(err.message);
  }

  const run = (args, label) => execa('npm', args, { cwd: targetDir, stdio: label ? 'pipe' : 'inherit' });

  // 2. Install
  if (!opts['no-install']) {
    const install = ora('Installing packages (takes a minute)...').start();
    try {
      await run(['install'], true);
      install.succeed('Packages installed');
    } catch {
      install.fail(`npm install failed. Run it yourself: cd ${name} && npm install`);
      process.exit(1);
    }
  }

  // 3. Zip
  if (opts.zip) {
    if (opts['no-install']) console.log(chalk.yellow('  --zip needs the packages; skipped with --no-install'));
    else {
      const zip = ora('Making the buyer zip...').start();
      try {
        const { stdout } = await execa('bash', ['zip.sh', ...(opts['project-id'] ? [] : ['--no-export'])], { cwd: targetDir });
        zip.succeed(stdout.split('\n').pop().replace(/^✅ /, 'Zip ready: '));
      } catch (err) {
        zip.fail(`Zip failed: ${(err.stderr || err.message).trim()}`);
      }
    }
  }

  // 4. Preview
  const rel = path.relative(process.cwd(), targetDir);
  console.log('\n' + chalk.green('✔ Ready') + chalk.gray(` · ${rel}`));
  if (!opts['project-id']) {
    console.log(chalk.gray('  The site shows the demo content until you connect Sanity (README step 3).'));
  } else {
    console.log(chalk.gray(`  Sanity project ${opts['project-id']} is set. Load the demo content with: cd ${rel} && npm run seed`));
  }
  if (opts['no-install'] || opts['no-start']) {
    console.log(`\n  cd ${chalk.cyan(rel)} && ${chalk.cyan(opts['no-install'] ? 'npm install && npm run dev:frontend' : 'npm run dev:frontend')}\n`);
    return;
  }
  console.log(chalk.gray('  Starting the preview. Press Ctrl+C to stop.\n'));
  console.log(`  Site   → ${chalk.cyan('http://localhost:3000')}`);
  if (opts['project-id']) console.log(`  Studio → ${chalk.cyan('http://localhost:3333')}`);
  console.log('');
  await run(['run', opts['project-id'] ? 'dev' : 'dev:frontend']).catch(() => {});
}

// Names, license and env files for this template
async function personalise(targetDir, { name, author, niche, projectId }) {
  const description = `${niche.title} template by ${author}. Next.js, Sanity and Tailwind.`;
  const editJson = async (rel, fn) => {
    const file = path.join(targetDir, rel);
    await fs.writeJson(file, fn(await fs.readJson(file)), { spaces: 2 });
  };
  await editJson('package.json', (p) => ({ ...p, name, description, author }));
  await editJson('frontend/package.json', (p) => ({ ...p, name: `${name}-frontend` }));
  await editJson('studio/package.json', (p) => ({ ...p, name: `${name}-studio` }));

  const license = path.join(targetDir, 'LICENSE.txt');
  if (fs.existsSync(license)) {
    const text = await fs.readFile(license, 'utf8');
    await fs.writeFile(
      license,
      text.replaceAll('{{TEMPLATE_NAME}}', name).replaceAll('{{YEAR}}', String(new Date().getFullYear())).replaceAll('{{AUTHOR}}', author)
    );
  }

  for (const app of ['frontend', 'studio']) {
    const example = path.join(targetDir, app, '.env.example');
    const local = path.join(targetDir, app, '.env.local');
    if (!fs.existsSync(example)) continue;
    let env = await fs.readFile(example, 'utf8');
    if (projectId) env = env.replace(/^((NEXT_PUBLIC_SANITY|SANITY_STUDIO)_PROJECT_ID)=.*$/gm, `$1=${projectId}`);
    await fs.writeFile(local, env);
  }
}
