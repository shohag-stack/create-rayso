import type { PortableTextBlock } from "@portabletext/react";
import { linkHref } from "@/(core)/lib/link";
import type { SanityImage, SanityLink } from "@/types/sanity";

export interface PostData {
  _id: string;
  title: string;
  slug?: string;
  cover?: SanityImage;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  author?: { name?: string; photo?: SanityImage };
  link?: SanityLink;
}

// Everything on a post's own page
export interface PostDetailData extends PostData {
  body?: PortableTextBlock[];
  more?: PostData[];
}

// Where a post card links: its "Link instead", or its own page under /blog
export const postHref = (post: PostData) => linkHref(post.link) ?? (post.slug ? `/blog/${post.slug}` : undefined);

export const formatPostDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : undefined;
