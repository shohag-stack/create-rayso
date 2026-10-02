import { ctaFields, imageFields, videoFields } from "@/(core)/fetch/fragments";

export const heroFullscreenImageFields = /* groq */ `
  eyebrow,
  heading,
  headingSize,
  uppercaseHeading,
  body,
  bodySize,
  ctas[]{ ${ctaFields} },
  highlights[]{ _key, label, text },
  image{ ${imageFields} },
  video{ ${videoFields} },
  contentPosition,
  overlay,
  showScrollHint
`;
