import { isSanityConfigured } from "@/(core)/sanity/lib/client";
import type { PageData, SiteSettings } from "@/types";
import content from "./content.json";

// The template's demo content, written by create-rayso. The site shows it until a
// Sanity project is connected, so a fresh install has something to look at.
const demo = content as unknown as { settings: SiteSettings | null; pages: PageData[]; documents: Record<string, unknown[]> };

export const isDemo = !isSanityConfigured && demo.pages.length > 0;

export const demoSettings = () => demo.settings;
export const demoPage = (id: string) => demo.pages.find((p) => p._id === id) ?? null;
export const demoPageBySlug = (slug: string) => demo.pages.find((p) => p._id !== "home" && p.slug === slug) ?? null;
export const demoPageSlugs = () => demo.pages.filter((p) => p._id !== "home" && p.slug).map((p) => p.slug as string);
// Seeded documents of one type (posts, works, ...) in the shape their queries return
export const demoDocuments = <T>(type: string) => (demo.documents[type] ?? []) as T[];
