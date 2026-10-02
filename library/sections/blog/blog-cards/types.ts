import type { PostData } from "@/types/documents/post";
import type { Cta, SectionHeading, SectionTone } from "@/types/sanity";

export interface BlogCardsData extends SectionHeading {
  _type: "blogCards";
  _key: string;
  anchor?: string;
  posts?: (PostData | null)[];
  // false when the editor picked none and the newest are shown (then cut to `limit`)
  picked?: boolean;
  limit?: number;
  cta?: Cta;
  align?: "left" | "center";
  divider?: boolean;
  imageShape?: "landscape" | "wide" | "tall";
  imageBorder?: boolean;
  showMeta?: boolean;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  tone?: SectionTone;
}
