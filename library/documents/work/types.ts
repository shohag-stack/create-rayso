import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImage } from "@/types/sanity";

export interface WorkData {
  _id: string;
  title: string;
  slug?: string;
  cover?: SanityImage;
  excerpt?: string;
  category?: string;
  client?: string;
  year?: string;
  services?: string[];
}

// Everything on a project's own page
export interface WorkDetailData extends WorkData {
  body?: PortableTextBlock[];
  gallery?: SanityImage[];
  next?: WorkData | null;
}

export const workHref = (work: WorkData) => (work.slug ? `/works/${work.slug}` : undefined);
