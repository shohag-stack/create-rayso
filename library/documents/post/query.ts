import { demoDocuments } from "@/(core)/demo";
import { imageFields, linkFields } from "@/(core)/fetch/fragments";
import { client, isSanityConfigured } from "@/(core)/sanity/lib/client";
import type { PostData, PostDetailData } from "@/types/documents/post";

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

const allPosts = /* groq */ `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)`;

// Picked posts, or the newest ones when none are picked
export const pickedPosts = (field: string, limit = 6) => /* groq */ `
  "${field}": select(
    count(${field}) > 0 => ${field}[]->{ ${postFields} },
    ${allPosts}[0...${limit}]{ ${postFields} }
  )
`;

const postDetailFields = /* groq */ `
  ${postFields},
  body[]{ ..., _type == "imageWithAlt" => { ${imageFields} } }
`;

// One post's page, with up to three newer or older posts to read next (until Sanity is connected: the demo content)
export async function getPost(slug: string): Promise<PostDetailData | null> {
  const { post, all } = isSanityConfigured
    ? await client.fetch<{ post: PostDetailData | null; all: PostData[] }>(
        `{ "post": *[_type == "post" && slug.current == $slug][0]{ ${postDetailFields} }, "all": ${allPosts}[0...4]{ ${postFields} } }`,
        { slug }
      )
    : { post: demoDocuments<PostDetailData>("post").find((p) => p.slug === slug) ?? null, all: demoDocuments<PostData>("post") };
  if (!post) return null;
  return { ...post, more: all.filter((p) => p._id !== post._id).slice(0, 3) };
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return demoDocuments<PostData>("post").flatMap((p) => (p.slug ? [p.slug] : []));
  return client.fetch<string[]>(`${allPosts}.slug.current`);
}
