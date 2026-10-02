import { priceOptionFields, pricingPlanFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const pricingCardsFields = /* groq */ `
  ${sectionHeadingFields},
  ${priceOptionFields},
  plans[]{ ${pricingPlanFields} },
  extras[]{ ${pricingPlanFields} },
  note,
  align,
  cardStyle,
  featuredStyle,
  ctaPosition,
  featureIcon,
  tone
`;
