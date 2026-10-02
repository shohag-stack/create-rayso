import { imageFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const featuresColumnsFields = /* groq */ `
  ${sectionHeadingFields},
  features[]{ _key, icon, title, body, tint, image{ ${imageFields} } },
  align,
  tone
`;
