import { footerSharedFields, imageFields, linkColumnFields, linkFields } from "@/(core)/fetch/fragments";

export const footerColumnsFields = /* groq */ `
  logo{ ${imageFields} },
  brandName,
  tagline,
  details,
  emailCapture{ intro, placeholder, buttonLabel, link{ ${linkFields} } },
  badges[]{ _key, ${imageFields} },
  columns[]{ ${linkColumnFields} },
  layout,
  columnStyle,
  headingStyle,
  socialPosition,
  socialStyle,
  wordmarkStyle,
  wordmarkPosition,
  centerBottomBar,
  ${footerSharedFields}
`;
