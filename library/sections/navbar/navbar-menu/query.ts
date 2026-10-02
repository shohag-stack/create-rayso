import { ctaFields, imageFields, navItemFields, navLinkFields } from "@/(core)/fetch/fragments";

export const navbarMenuFields = /* groq */ `
  logo{ ${imageFields} },
  brandName,
  label,
  note,
  quickLinks[]{ ${navLinkFields} },
  barCta{ ${ctaFields} },
  links[]{ ${navItemFields} },
  ctas[]{ ${ctaFields} },
  menuLabel,
  layout,
  tone,
  spacedBrandName,
  position
`;
