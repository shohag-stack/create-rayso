import type { Cta, SanityImage, SanityVideo } from "@/types/sanity";

export interface HeroFullscreenImageData {
  _type: "heroFullscreenImage";
  _key: string;
  anchor?: string;
  eyebrow?: string;
  heading: string;
  headingSize?: "medium" | "large";
  uppercaseHeading?: boolean;
  body?: string;
  bodySize?: "small" | "large";
  ctas?: Cta[];
  highlights?: { _key: string; label?: string; text: string }[];
  image?: SanityImage;
  video?: SanityVideo;
  contentPosition?: "top" | "bottom";
  overlay?: "none" | "light" | "medium" | "strong";
  showScrollHint?: boolean;
}
