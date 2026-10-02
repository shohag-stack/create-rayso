import { ctaFields, imageFields } from "@/(core)/fetch/fragments";

export const heroFullscreenImageFields = /* groq */ `
  eyebrow,
  heading,
  body,
  ctas[]{ ${ctaFields} },
  image{ ${imageFields} },
  overlay,
  showScrollHint
`;
