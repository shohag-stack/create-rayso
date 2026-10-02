import { ctaFields, pricingPlanFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const pricingDuoFields = /* groq */ `
  ${sectionHeadingFields},
  cta{ ${ctaFields} },
  plans[]{ ${pricingPlanFields} },
  note,
  tone
`;
