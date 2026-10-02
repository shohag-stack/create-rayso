import { brandLogoFields } from "@/(core)/fetch/fragments";

export const logosChipsFields = /* groq */ `
  heading,
  brands[]{ ${brandLogoFields} },
  tone
`;
