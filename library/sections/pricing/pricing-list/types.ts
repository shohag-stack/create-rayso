import type { BrandLogo, Cta, PricingPlan, SectionHeading, SectionTone, Tint } from "@/types/sanity";

export interface PricingOffer {
  _key?: string;
  heading: string;
  body?: string;
  cta?: Cta;
  brand?: BrandLogo;
  tint?: Tint;
}

export interface PricingListData extends SectionHeading {
  _type: "pricingList";
  _key: string;
  anchor?: string;
  plans?: PricingPlan[];
  offers?: PricingOffer[];
  tone?: SectionTone;
}
