import { pickedTestimonials } from "@/(core)/fetch/documents/testimonial";
import { navLinkFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const testimonialsSpotlightFields = /* groq */ `
  ${sectionHeadingFields},
  link{ ${navLinkFields} },
  ${pickedTestimonials("testimonials", 2)},
  media,
  alternate,
  panelStyle,
  showStats,
  showLogo,
  quoteMark,
  readMoreLabel,
  align,
  tone
`;
