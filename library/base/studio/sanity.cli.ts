import { defineCliConfig } from "sanity/cli";

// Read from studio/.env.local, which the Sanity CLI loads for every command
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
});
