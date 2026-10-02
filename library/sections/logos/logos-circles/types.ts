import type { BrandLogo, Cta, SectionHeading, SectionTone } from "@/types/sanity";

export interface LogosCirclesData extends SectionHeading {
  _type: "logosCircles";
  _key: string;
  anchor?: string;
  brands?: BrandLogo[];
  highlight?: BrandLogo;
  cta?: Cta;
  tone?: SectionTone;
}
