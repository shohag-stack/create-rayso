import { brandLogoFields } from "@/(core)/fetch/fragments";

export const logosRowFields = /* groq */ `
  heading,
  brands[]{ ${brandLogoFields} },
  mono,
  tone
`;
