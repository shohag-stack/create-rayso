export * from "./sanity";
export * from "./sections";

import type { PageSection } from "./sections";
import type { Cta, NavLink, SanityImage, Seo } from "./sanity";

export interface PageData {
  _id: string;
  title: string;
  slug?: string;
  menuColor?: "light" | "dark";
  seo?: Seo;
  sections?: PageSection[];
}

export interface SiteSettings {
  siteName: string;
  logo?: SanityImage;
  menu?: NavLink[];
  menuCta?: Cta;
  footer?: PageSection[];
  contactEmail?: string;
}
