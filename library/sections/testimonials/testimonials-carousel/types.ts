import type { TestimonialData } from "@/types/documents/testimonial";
import type { RatingSummary, SectionHeading, SectionTone } from "@/types/sanity";

export interface TestimonialsCarouselData extends SectionHeading {
  _type: "testimonialsCarousel";
  _key: string;
  anchor?: string;
  testimonials?: (TestimonialData | null)[];
  rating?: RatingSummary;
  cardStyle?: "filled" | "outlined" | "colourful";
  quoteSize?: "normal" | "large";
  photoStyle?: "avatar" | "portrait" | "none";
  showLogo?: boolean;
  showDate?: boolean;
  showStars?: boolean;
  footerDivider?: boolean;
  align?: "left" | "center";
  arrows?: "above" | "below" | "side" | "none";
  ratingPosition?: "header" | "below";
  tone?: SectionTone;
}
