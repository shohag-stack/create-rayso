import { brandLogoFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const logosGridFields = /* groq */ `
  ${sectionHeadingFields},
  label,
  brands[]{ ${brandLogoFields} },
  columns,
  cells,
  lines,
  fullWidth,
  mono,
  tone
`;
