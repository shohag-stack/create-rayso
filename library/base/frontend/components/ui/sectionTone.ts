import type { SectionTone } from "@/types/sanity";

// Page-coloured sections space themselves with margins; coloured ones are full-bleed with padding
export const sectionTone: Record<SectionTone, string> = {
  page: "section-gap text-fg",
  tinted: "bg-surface-alt py-20 text-fg md:py-28",
  dark: "bg-surface-inverse py-20 text-fg-inverse md:py-28",
};
