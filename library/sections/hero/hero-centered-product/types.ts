import type { Cta, SanityImage } from "@/types/sanity";

export interface HeroCenteredProductData {
  _type: "heroCenteredProduct";
  _key: string;
  anchor?: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  ctas?: Cta[];
  productImage?: SanityImage;
  backdrop?: SanityImage;
  tone?: "dark" | "light";
}
