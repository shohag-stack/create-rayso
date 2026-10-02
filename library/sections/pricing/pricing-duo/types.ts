import type { Cta, PricingPlan, SectionHeading, SectionTone } from "@/types/sanity";

export interface PricingDuoData extends SectionHeading {
  _type: "pricingDuo";
  _key: string;
  anchor?: string;
  cta?: Cta;
  plans?: PricingPlan[];
  note?: string;
  tone?: SectionTone;
}
