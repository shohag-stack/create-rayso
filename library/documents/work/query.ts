import { demoDocuments } from "@/(core)/demo";
import { imageFields } from "@/(core)/fetch/fragments";
import { client, isSanityConfigured } from "@/(core)/sanity/lib/client";
import type { WorkData, WorkDetailData } from "@/types/documents/work";

// What a project card needs
export const workFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  cover{ ${imageFields} },
  excerpt,
  category,
  client,
  year,
  services
`;

const workOrder = /* groq */ `order(coalesce(orderRank, 9999) asc, _createdAt desc)`;
const allWorks = /* groq */ `*[_type == "work" && defined(slug.current)] | ${workOrder}`;

// Picked projects, or the first ones in order when none are picked
export const pickedWorks = (field: string, limit = 6) => /* groq */ `
  "${field}": select(
    count(${field}) > 0 => ${field}[]->{ ${workFields} },
    ${allWorks}[0...${limit}]{ ${workFields} }
  )
`;

const workDetailFields = /* groq */ `
  ${workFields},
  body[]{ ..., _type == "imageWithAlt" => { ${imageFields} } },
  gallery[]{ ${imageFields} }
`;

// One project's page, with the next project in the list (until Sanity is connected: the demo content)
export async function getWork(slug: string): Promise<WorkDetailData | null> {
  const { work, all } = isSanityConfigured
    ? await client.fetch<{ work: WorkDetailData | null; all: WorkData[] }>(
        `{ "work": *[_type == "work" && slug.current == $slug][0]{ ${workDetailFields} }, "all": ${allWorks}{ ${workFields} } }`,
        { slug }
      )
    : { work: demoDocuments<WorkDetailData>("work").find((w) => w.slug === slug) ?? null, all: demoDocuments<WorkData>("work") };
  if (!work) return null;
  const index = all.findIndex((w) => w._id === work._id);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;
  return { ...work, next };
}

export async function getWorkSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return demoDocuments<WorkData>("work").flatMap((w) => (w.slug ? [w.slug] : []));
  return client.fetch<string[]>(`${allWorks}.slug.current`);
}
