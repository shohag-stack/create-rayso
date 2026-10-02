import type { PostData } from "@/types/documents/post";
import type { Cta, SectionTone } from "@/types/sanity";

export interface BlogCarouselData {
  _type: "blogCarousel";
  _key: string;
  anchor?: string;
  heading?: string;
  viewAll?: Cta;
  posts?: (PostData | null)[];
  tone?: SectionTone;
}
