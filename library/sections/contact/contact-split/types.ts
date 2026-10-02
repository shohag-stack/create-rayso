import type { SectionHeading, SectionTone } from "@/types/sanity";

export interface ContactDetail {
  _key: string;
  label: string;
  text: string;
  url?: string;
}

export interface ContactSplitData extends SectionHeading {
  _type: "contactSplit";
  _key: string;
  anchor?: string;
  details?: ContactDetail[];
  showPhone?: boolean;
  messagePlaceholder?: string;
  submitLabel?: string;
  successMessage?: string;
  layout?: "split" | "card";
  tone?: SectionTone;
}
