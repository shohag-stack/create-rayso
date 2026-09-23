#!/usr/bin/env node

import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

// ── Banner ────────────────────────────────────────────────────────────────────
console.log('\n' + chalk.bold.white('RAYSO.STUDIO') + chalk.gray(' — Template Scaffolder'));
console.log(chalk.gray('─'.repeat(42)) + '\n');

// ── Questions ─────────────────────────────────────────────────────────────────
const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    default: 'my-template',
    validate: (v) =>
      /^[a-z0-9-_]+$/.test(v) || 'Use lowercase letters, numbers, hyphens only',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:',
    default: 'A premium Next.js template by RAYSO.STUDIO',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author:',
    default: 'RAYSO.STUDIO',
  },
]);

const { projectName, description, author } = answers;
const targetDir = path.resolve(process.cwd(), projectName);

// ── Check target dir ──────────────────────────────────────────────────────────
if (fs.existsSync(targetDir)) {
  console.log(chalk.red(`\n✖ Directory "${projectName}" already exists.\n`));
  process.exit(1);
}

// ── Copy template ─────────────────────────────────────────────────────────────
const copySpinner = ora('Scaffolding project...').start();

try {
  await fs.copy(TEMPLATE_DIR, targetDir);

  const gitkeeps = await fs.glob('**/.gitkeep', { cwd: targetDir });
  await Promise.all(gitkeeps.map(f => fs.remove(path.join(targetDir, f))));

  // Inject project name + description into root package.json
  const rootPkg = await fs.readJson(path.join(targetDir, 'package.json'));
  rootPkg.name = projectName;
  rootPkg.description = description;
  rootPkg.author = author;
  await fs.writeJson(path.join(targetDir, 'package.json'), rootPkg, { spaces: 2 });

  // Inject into frontend/package.json
  const frontendPkg = await fs.readJson(path.join(targetDir, 'frontend', 'package.json'));
  frontendPkg.name = `${projectName}-frontend`;
  frontendPkg.description = description;
  await fs.writeJson(path.join(targetDir, 'frontend', 'package.json'), frontendPkg, { spaces: 2 });

  // Inject into studio/package.json
  const studioPkg = await fs.readJson(path.join(targetDir, 'studio', 'package.json'));
  studioPkg.name = `${projectName}-studio`;
  await fs.writeJson(path.join(targetDir, 'studio', 'package.json'), studioPkg, { spaces: 2 });

  // Create .env.local files from examples
  const frontendEnvExample = path.join(targetDir, 'frontend', '.env.example');
  const frontendEnvLocal   = path.join(targetDir, 'frontend', '.env.local');
  if (fs.existsSync(frontendEnvExample) && !fs.existsSync(frontendEnvLocal)) {
    await fs.copy(frontendEnvExample, frontendEnvLocal);
  }

  const studioEnvExample = path.join(targetDir, 'studio', '.env.example');
  const studioEnvLocal   = path.join(targetDir, 'studio', '.env.local');
  if (fs.existsSync(studioEnvExample) && !fs.existsSync(studioEnvLocal)) {
    await fs.copy(studioEnvExample, studioEnvLocal);
  }

  copySpinner.succeed('Project scaffolded');
} catch (err) {
  copySpinner.fail('Scaffolding failed');
  console.error(err);
  process.exit(1);
}

// ── Install dependencies ──────────────────────────────────────────────────────
const installSpinner = ora('Installing dependencies...').start();

try {
  await execa('npm', ['install'], { cwd: targetDir, stdio: 'pipe' });
  installSpinner.succeed('Dependencies installed');
} catch (err) {
  installSpinner.fail('npm install failed — run it manually');
  console.warn(chalk.yellow('\n  cd ' + projectName + ' && npm install\n'));
}

// ── Done ──────────────────────────────────────────────────────────────────────
console.log('\n' + chalk.green('✔ Ready!') + '\n');
console.log(chalk.white('  Next steps:\n'));
console.log(chalk.gray('  1.') + '  cd ' + chalk.cyan(projectName));
console.log(chalk.gray('  2.') + '  Fill in ' + chalk.cyan('frontend/.env.local') + ' with your Sanity + Resend keys');
console.log(chalk.gray('  3.') + '  ' + chalk.cyan('npm run dev'));
console.log('\n' + chalk.gray('  Frontend →') + ' http://localhost:3000');
console.log(chalk.gray('  Studio   →') + ' http://localhost:3333\n');
console.log(chalk.gray('─'.repeat(42)));
console.log(chalk.gray('  Built by ') + chalk.white('RAYSO.STUDIO') + '\n');
