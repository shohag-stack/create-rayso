import { ctaFields, footerSharedFields, imageFields, linkColumnFields, navLinkFields } from "@/(core)/fetch/fragments";

export const footerCtaFields = /* groq */ `
  heading,
  headingAccent,
  accentStyle,
  body,
  ctas[]{ ${ctaFields} },
  card{ image{ ${imageFields} }, text, cta{ ${ctaFields} } },
  mark{ ${imageFields} },
  inlineLinks{ label, links[]{ ${navLinkFields} } },
  columns[]{ ${linkColumnFields} },
  socialStyle,
  credit,
  ctaPosition,
  frame,
  ${footerSharedFields}
`;
