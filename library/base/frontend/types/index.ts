export * from "./sanity";
export * from "./sections";

import type { PageSection } from "./sections";
import type { MenuColor, Seo } from "./sanity";

export interface PageData {
  _id: string;
  title: string;
  slug?: string;
  menuColor?: MenuColor;
  seo?: Seo;
  sections?: PageSection[];
}

export interface SiteSettings {
  siteName: string;
  navbar?: PageSection[];
  footer?: PageSection[];
  contactEmail?: string;
}
