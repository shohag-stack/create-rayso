import { footerSharedFields, imageFields, linkColumnFields, navLinkFields } from "@/(core)/fetch/fragments";

export const footerWordmarkFields = /* groq */ `
  tagline,
  statement,
  mark{ ${imageFields} },
  topLinks[]{ ${navLinkFields} },
  secondaryLinks[]{ ${navLinkFields} },
  columns[]{ ${linkColumnFields} },
  wordmarkPosition,
  split,
  wordmarkColor,
  linkStyle,
  dividers,
  ${footerSharedFields}
`;
