import { faqItemFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const faqCardsFields = /* groq */ `
  ${sectionHeadingFields},
  items[]{ ${faqItemFields} },
  openFirst,
  tone
`;
