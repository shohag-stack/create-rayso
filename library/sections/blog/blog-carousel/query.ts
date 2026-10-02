import { pickedPosts } from "@/(core)/fetch/documents/post";
import { ctaFields } from "@/(core)/fetch/fragments";

export const blogCarouselFields = /* groq */ `
  heading,
  viewAll{ ${ctaFields} },
  ${pickedPosts("posts", 8)},
  tone
`;
