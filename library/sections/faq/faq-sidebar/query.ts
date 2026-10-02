import { ctaFields, faqGroupFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const faqSidebarFields = /* groq */ `
  ${sectionHeadingFields},
  ctas[]{ ${ctaFields} },
  groups[]{ ${faqGroupFields} },
  openFirst,
  dotted,
  tone
`;
