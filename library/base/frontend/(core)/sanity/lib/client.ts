import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// False until a real project ID is in frontend/.env.local
export const isSanityConfigured = Boolean(projectId && projectId !== "your_project_id");

export const client = createClient({
  projectId: isSanityConfigured ? projectId : "missing",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
