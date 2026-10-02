import type { Cta, SanityImage, SanityLink, SanityVideo } from "@/types/sanity";

export interface HeroCenteredImageData {
  _type: "heroCenteredImage";
  _key: string;
  anchor?: string;
  mark?: SanityImage;
  heading: string;
  headingAccent?: string;
  headingSize?: "medium" | "large";
  body?: string;
  note?: string;
  ctas?: Cta[];
  emailCapture?: { placeholder?: string; buttonLabel?: string; link?: SanityLink };
  image?: SanityImage;
  video?: SanityVideo;
  frame?: "full" | "inset";
  overlay?: "none" | "light" | "medium" | "strong";
}
