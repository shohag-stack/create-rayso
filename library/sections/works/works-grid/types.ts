import type { WorkData } from "@/types/documents/work";
import type { Cta, SectionHeading, SectionTone } from "@/types/sanity";

export interface WorksGridData extends SectionHeading {
  _type: "worksGrid";
  _key: string;
  anchor?: string;
  works?: (WorkData | null)[];
  // false when the editor picked none and the first ones are shown (then cut to `limit`)
  picked?: boolean;
  limit?: number;
  cta?: Cta;
  align?: "left" | "center";
  columns?: 2 | 3;
  imageShape?: "landscape" | "square" | "tall";
  showExcerpt?: boolean;
  tone?: SectionTone;
}
