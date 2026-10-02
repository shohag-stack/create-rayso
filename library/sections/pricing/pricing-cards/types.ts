import type { FeatureIcon, PriceOption, PricingPlan, SectionHeading, SectionTone } from "@/types/sanity";

export interface PricingCardsData extends SectionHeading {
  _type: "pricingCards";
  _key: string;
  anchor?: string;
  priceOptions?: PriceOption[];
  plans?: PricingPlan[];
  extras?: PricingPlan[];
  note?: string;
  align?: "left" | "center";
  cardStyle?: "outlined" | "filled" | "split";
  featuredStyle?: "outline" | "filled" | "banner";
  ctaPosition?: "top" | "bottom";
  featureIcon?: FeatureIcon;
  tone?: SectionTone;
}
