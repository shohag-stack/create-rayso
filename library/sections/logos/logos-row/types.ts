import type { BrandLogo, SectionTone } from "@/types/sanity";

export interface LogosRowData {
  _type: "logosRow";
  _key: string;
  anchor?: string;
  heading?: string;
  brands?: BrandLogo[];
  mono?: boolean;
  tone?: SectionTone;
}
