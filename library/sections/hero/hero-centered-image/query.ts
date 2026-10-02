import { ctaFields, imageFields, linkFields, videoFields } from "@/(core)/fetch/fragments";

export const heroCenteredImageFields = /* groq */ `
  mark{ ${imageFields} },
  heading,
  headingAccent,
  headingSize,
  body,
  note,
  ctas[]{ ${ctaFields} },
  emailCapture{ placeholder, buttonLabel, link{ ${linkFields} } },
  image{ ${imageFields} },
  video{ ${videoFields} },
  frame,
  overlay
`;
