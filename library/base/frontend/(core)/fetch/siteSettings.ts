import { ctaFields, imageFields, navLinkFields } from "@/(core)/fetch/fragments";
import { sectionFields } from "@/(core)/fetch/page";
import { client, isSanityConfigured } from "@/(core)/sanity/lib/client";
import type { SiteSettings } from "@/types";

const siteSettingsQuery = /* groq */ `*[_id == "siteSettings"][0]{
  siteName,
  logo{ ${imageFields} },
  menu[]{ ${navLinkFields} },
  menuCta{ ${ctaFields} },
  footer[]{ ${sectionFields} },
  contactEmail
}`;

export function getSiteSettings() {
  if (!isSanityConfigured) return Promise.resolve(null);
  return client.fetch<SiteSettings | null>(siteSettingsQuery);
}
