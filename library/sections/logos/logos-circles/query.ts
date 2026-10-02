import { brandLogoFields, ctaFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const logosCirclesFields = /* groq */ `
  ${sectionHeadingFields},
  brands[]{ ${brandLogoFields} },
  highlight{ ${brandLogoFields} },
  cta{ ${ctaFields} },
  tone
`;
