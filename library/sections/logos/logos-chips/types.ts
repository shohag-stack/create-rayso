import type { BrandLogo, SectionTone } from "@/types/sanity";

export interface LogosChipsData {
  _type: "logosChips";
  _key: string;
  anchor?: string;
  heading?: string;
  brands?: BrandLogo[];
  tone?: SectionTone;
}
