import { faqGroupFields, imageFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const faqSplitFields = /* groq */ `
  ${sectionHeadingFields},
  groups[]{ ${faqGroupFields} },
  image{ ${imageFields} },
  imageSide,
  openFirst,
  groupMarker
`;
