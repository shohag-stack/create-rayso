import type { TestimonialData } from "@/types/documents/testimonial";
import type { NavLink, SectionHeading, SectionTone } from "@/types/sanity";

export interface TestimonialsSpotlightData extends SectionHeading {
  _type: "testimonialsSpotlight";
  _key: string;
  anchor?: string;
  link?: NavLink;
  testimonials?: (TestimonialData | null)[];
  media?: "photo" | "stat";
  alternate?: boolean;
  panelStyle?: "framed" | "tinted";
  showStats?: boolean;
  showLogo?: boolean;
  quoteMark?: boolean;
  readMoreLabel?: string;
  align?: "left" | "center";
  tone?: SectionTone;
}
