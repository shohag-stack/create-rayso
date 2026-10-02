import type { Cta, FaqGroup, SectionHeading, SectionTone } from "@/types/sanity";

export interface FaqSidebarData extends SectionHeading {
  _type: "faqSidebar";
  _key: string;
  anchor?: string;
  ctas?: Cta[];
  groups?: FaqGroup[];
  openFirst?: boolean;
  dotted?: boolean;
  tone?: SectionTone;
}
