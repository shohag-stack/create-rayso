import type { TestimonialData } from "@/types/documents/testimonial";
import type { Cta, RatingSummary, SanityImage, SectionHeading } from "@/types/sanity";

export interface TestimonialsReviewsData extends SectionHeading {
  _type: "testimonialsReviews";
  _key: string;
  anchor?: string;
  rating?: RatingSummary;
  cta?: Cta;
  testimonials?: (TestimonialData | null)[];
  readMoreLabel?: string;
  image?: SanityImage;
}
