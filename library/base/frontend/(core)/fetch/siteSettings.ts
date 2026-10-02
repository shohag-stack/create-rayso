import { cache } from "react";
import { sectionFields } from "@/(core)/fetch/page";
import { demoSettings } from "@/(core)/demo";
import { client, isSanityConfigured } from "@/(core)/sanity/lib/client";
import type { SiteSettings } from "@/types";

const siteSettingsQuery = /* groq */ `*[_id == "siteSettings"][0]{
  siteName,
  navbar[]{ ${sectionFields} },
  footer[]{ ${sectionFields} },
  contactEmail
}`;

// cache(): the layout (footer) and the page (menu) share one request
export const getSiteSettings = cache(async () => {
  if (!isSanityConfigured) return demoSettings();
  return client.fetch<SiteSettings | null>(siteSettingsQuery);
});
