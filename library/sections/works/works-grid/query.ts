import { pickedWorks } from "@/(core)/fetch/documents/work";
import { ctaFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

// Picked projects, or the first `limit` in order
export const worksGridFields = /* groq */ `
  ${sectionHeadingFields},
  ${pickedWorks("works", 24)},
  "picked": coalesce(count(works), 0) > 0,
  limit,
  cta{ ${ctaFields} },
  align,
  columns,
  imageShape,
  showExcerpt,
  tone
`;
