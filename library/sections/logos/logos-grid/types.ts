import type { BrandLogo, SectionHeading, SectionTone } from "@/types/sanity";

export interface LogosGridData extends SectionHeading {
  _type: "logosGrid";
  _key: string;
  anchor?: string;
  label?: string;
  brands?: BrandLogo[];
  columns?: "4" | "5" | "6";
  cells?: "square" | "short";
  lines?: "solid" | "dashed";
  fullWidth?: boolean;
  mono?: boolean;
  tone?: SectionTone;
}
