import type { Cta, PlanPrice, SanityImage, SectionHeading, SectionTone } from "@/types/sanity";

export interface CompareRow {
  _key?: string;
  label: string;
  values?: string[];
}

export interface PricingCompareData extends SectionHeading {
  _type: "pricingCompare";
  _key: string;
  anchor?: string;
  price?: PlanPrice;
  cta?: Cta;
  image?: SanityImage;
  guarantee?: { title?: string; body?: string; badge?: string };
  columns?: string[];
  rows?: CompareRow[];
  tone?: SectionTone;
}
