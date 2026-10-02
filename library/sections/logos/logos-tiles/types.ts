import type { BrandLogo, SectionTone, Tint } from "@/types/sanity";

export interface LogosTilesData {
  _type: "logosTiles";
  _key: string;
  anchor?: string;
  heading?: string;
  body?: string;
  brands?: BrandLogo[];
  note?: string;
  showNames?: boolean;
  tileTint?: Tint;
  mono?: boolean;
  tone?: SectionTone;
}
