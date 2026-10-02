import { pickedPosts } from "@/(core)/fetch/documents/post";
import { ctaFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

// Picked posts, or the newest `limit` (default 3)
export const blogCardsFields = /* groq */ `
  ${sectionHeadingFields},
  ${pickedPosts("posts", 9)},
  "picked": coalesce(count(posts), 0) > 0,
  limit,
  cta{ ${ctaFields} },
  align,
  divider,
  imageShape,
  imageBorder,
  showMeta,
  showExcerpt,
  showAuthor,
  tone
`;
