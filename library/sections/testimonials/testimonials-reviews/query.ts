import { pickedTestimonials } from "@/(core)/fetch/documents/testimonial";
import { ctaFields, imageFields, ratingSummaryFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const testimonialsReviewsFields = /* groq */ `
  ${ratingSummaryFields},
  ${sectionHeadingFields},
  cta{ ${ctaFields} },
  ${pickedTestimonials("testimonials", 3)},
  readMoreLabel,
  image{ ${imageFields} }
`;
