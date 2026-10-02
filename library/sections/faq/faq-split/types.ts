import type { FaqGroup, SanityImage, SectionHeading } from "@/types/sanity";

export interface FaqSplitData extends SectionHeading {
  _type: "faqSplit";
  _key: string;
  anchor?: string;
  groups?: FaqGroup[];
  image?: SanityImage;
  imageSide?: "left" | "right";
  openFirst?: boolean;
  groupMarker?: boolean;
}
