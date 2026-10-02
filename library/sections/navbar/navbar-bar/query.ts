import { ctaFields, imageFields, navItemFields } from "@/(core)/fetch/fragments";

export const navbarBarFields = /* groq */ `
  logo{ ${imageFields} },
  brandName,
  badge,
  links[]{ ${navItemFields} },
  note,
  ctas[]{ ${ctaFields} },
  linkAlign,
  linkStyle,
  spacedBrandName,
  position
`;
