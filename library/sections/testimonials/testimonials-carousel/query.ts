import { pickedTestimonials } from "@/(core)/fetch/documents/testimonial";
import { ratingSummaryFields, sectionHeadingFields } from "@/(core)/fetch/fragments";

export const testimonialsCarouselFields = /* groq */ `
  ${sectionHeadingFields},
  ${pickedTestimonials("testimonials")},
  ${ratingSummaryFields},
  cardStyle,
  quoteSize,
  photoStyle,
  showLogo,
  showDate,
  showStars,
  footerDivider,
  align,
  arrows,
  ratingPosition,
  tone
`;
