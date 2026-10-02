// Imports the demo content (documents, images, videos) into your Sanity dataset.
// Usage: npm run seed
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const studioDir = path.join(root, "studio");
const envFile = path.join(studioDir, ".env.local");
// A full dataset export (with images and videos) wins over the generated NDJSON
const seedFile = ["demo-content.tar.gz", "demo-content.ndjson"]
  .map((name) => path.join(root, "seed", name))
  .find((file) => existsSync(file));

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

if (!seedFile) fail("seed/demo-content.tar.gz or seed/demo-content.ndjson not found.");
if (!existsSync(envFile)) {
  fail("studio/.env.local not found. Copy studio/.env.example and add your project ID (README step 3).");
}

const env = Object.fromEntries(
  readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/))
    .filter(Boolean)
    .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, "")])
);

const projectId = env.SANITY_STUDIO_PROJECT_ID;
const dataset = env.SANITY_STUDIO_DATASET || "production";
if (!projectId || projectId === "your_project_id") {
  fail("Set SANITY_STUDIO_PROJECT_ID in studio/.env.local (README step 3).");
}

console.log(`Importing demo content into ${projectId}/${dataset}...\n`);
const result = spawnSync(
  "npx",
  ["sanity", "dataset", "import", seedFile, dataset, "--replace"],
  { cwd: studioDir, stdio: "inherit", shell: process.platform === "win32" }
);
process.exit(result.status ?? 1);
