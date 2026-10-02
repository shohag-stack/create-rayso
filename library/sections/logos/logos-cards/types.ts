import type { BrandLogo, SectionHeading, SectionTone, Tint } from "@/types/sanity";

export interface LogoCard extends BrandLogo {
  tint?: Tint;
}

export interface LogosCardsData extends SectionHeading {
  _type: "logosCards";
  _key: string;
  anchor?: string;
  cards?: LogoCard[];
  linkLabel?: string;
  mono?: boolean;
  tone?: SectionTone;
}
