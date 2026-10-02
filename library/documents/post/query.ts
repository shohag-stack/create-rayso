import { imageFields, linkFields } from "@/(core)/fetch/fragments";

// What a post card needs (the body is left out)
export const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  cover{ ${imageFields} },
  excerpt,
  category,
  publishedAt,
  author{ name, photo{ ${imageFields} } },
  link{ ${linkFields} }
`;

// Picked posts, or the newest ones when none are picked
export const pickedPosts = (field: string, limit = 6) => /* groq */ `
  "${field}": select(
    count(${field}) > 0 => ${field}[]->{ ${postFields} },
    *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...${limit}]{ ${postFields} }
  )
`;
