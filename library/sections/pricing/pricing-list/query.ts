import { brandLogoFields, ctaFields, pricingPlanFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const pricingListFields = /* groq */ `
  ${sectionHeadingFields},
  plans[]{ ${pricingPlanFields} },
  offers[]{ _key, heading, body, tint, cta{ ${ctaFields} }, brand{ ${brandLogoFields} } },
  tone
`;
