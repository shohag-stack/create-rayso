import { ctaFields, imageFields, navItemFields } from "@/(core)/fetch/fragments";

export const navbarFloatingFields = /* groq */ `
  logo{ ${imageFields} },
  brandName,
  links[]{ ${navItemFields} },
  rightLinks[]{ ${navItemFields} },
  ctas[]{ ${ctaFields} },
  layout,
  width,
  tone,
  shape,
  caps,
  position
`;
