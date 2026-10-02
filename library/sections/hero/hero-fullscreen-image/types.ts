import type { Cta, SanityImage } from "@/types/sanity";

export interface HeroFullscreenImageData {
  _type: "heroFullscreenImage";
  _key: string;
  anchor?: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  ctas?: Cta[];
  image?: SanityImage;
  overlay?: "light" | "medium" | "strong";
  showScrollHint?: boolean;
}
