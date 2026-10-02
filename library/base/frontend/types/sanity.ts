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
  style?: "primary" | "secondary";
  link?: SanityLink;
}

export interface Seo {
  title?: string;
  description?: string;
  image?: SanityImage;
}
