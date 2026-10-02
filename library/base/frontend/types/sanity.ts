// Shapes returned by the shared GROQ fragments in (core)/fetch/fragments.ts

export interface SanityImage {
  alt?: string;
  hotspot?: { x: number; y: number };
  asset?: {
    _id?: string;
    url: string;
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } };
  };
}

export interface SanityLink {
  kind?: "page" | "url";
  slug?: string;
  pageId?: string;
  anchor?: string;
  url?: string;
  openInNewTab?: boolean;
}

export interface Cta {
  _key?: string;
  label: string;
  style?: "primary" | "secondary" | "light" | "glass";
  showArrow?: boolean;
  link?: SanityLink;
}

export interface Seo {
  title?: string;
  description?: string;
  image?: SanityImage;
}

export interface SanityVideo {
  asset?: { url: string; mimeType?: string };
}

export interface NavLink {
  _key?: string;
  label: string;
  link?: SanityLink;
}

export interface LinkColumn {
  _key?: string;
  heading?: string;
  links?: NavLink[];
  viewAll?: NavLink;
}

export interface SocialLink {
  _key?: string;
  platform: string;
  url: string;
}

export type FooterTone = "light" | "dark" | "accent" | "gradient";

export interface NavGroup {
  _key?: string;
  _type: "navGroup";
  label: string;
  links?: NavLink[];
}

// A menu item: a link, or a labelled group of links
export type NavItem = (NavLink & { _type?: "navLink" }) | NavGroup;

// Set by the page (its "Menu text colour"), not by the menu itself
export type MenuColor = "light" | "dark";
