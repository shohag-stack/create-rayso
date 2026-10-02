import { ctaFields, imageFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const pricingCompareFields = /* groq */ `
  ${sectionHeadingFields},
  price{ amount, compareAt, period, note },
  cta{ ${ctaFields} },
  image{ ${imageFields} },
  guarantee{ title, body, badge },
  columns,
  rows[]{ _key, label, values },
  tone
`;
