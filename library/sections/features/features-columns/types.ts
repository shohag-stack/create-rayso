import type { SanityImage, SectionHeading, SectionTone, Tint } from "@/types/sanity";

export interface FeatureColumn {
  _key?: string;
  icon?: string;
  title: string;
  body?: string;
  tint?: Tint;
  image?: SanityImage;
}

export interface FeaturesColumnsData extends SectionHeading {
  _type: "featuresColumns";
  _key: string;
  anchor?: string;
  features?: FeatureColumn[];
  align?: "left" | "center";
  tone?: SectionTone;
}
