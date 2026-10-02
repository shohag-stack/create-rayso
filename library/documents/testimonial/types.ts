import type { SanityImage, SanityLink } from "@/types/sanity";

export interface TestimonialData {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  photo?: SanityImage;
  logo?: SanityImage;
  rating?: number;
  date?: string;
  stats?: { _key?: string; value: string; label?: string }[];
  link?: SanityLink;
}
