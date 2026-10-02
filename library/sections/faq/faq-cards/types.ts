import type { FaqItem, SectionHeading, SectionTone } from "@/types/sanity";

export interface FaqCardsData extends SectionHeading {
  _type: "faqCards";
  _key: string;
  anchor?: string;
  items?: FaqItem[];
  openFirst?: boolean;
  tone?: SectionTone;
}
