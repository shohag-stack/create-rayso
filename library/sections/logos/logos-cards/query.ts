import { imageFields, linkFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const logosCardsFields = /* groq */ `
  ${sectionHeadingFields},
  cards[]{ _key, name, tint, logo{ ${imageFields} }, link{ ${linkFields} } },
  linkLabel,
  mono,
  tone
`;
