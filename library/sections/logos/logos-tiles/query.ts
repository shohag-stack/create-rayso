import { brandLogoFields } from "@/(core)/fetch/fragments";

export const logosTilesFields = /* groq */ `
  heading,
  body,
  brands[]{ ${brandLogoFields} },
  note,
  showNames,
  tileTint,
  mono,
  tone
`;
