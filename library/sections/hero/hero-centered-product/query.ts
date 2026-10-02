import { ctaFields, imageFields } from "@/(core)/fetch/fragments";

export const heroCenteredProductFields = /* groq */ `
  eyebrow,
  heading,
  body,
  ctas[]{ ${ctaFields} },
  productImage{ ${imageFields} },
  backdrop{ ${imageFields} },
  tone
`;
