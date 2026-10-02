import { imageFields, linkFields } from "@/(core)/fetch/fragments";

export const testimonialFields = /* groq */ `
  _id,
  quote,
  name,
  role,
  company,
  photo{ ${imageFields} },
  logo{ ${imageFields} },
  rating,
  date,
  stats[]{ _key, value, label },
  link{ ${linkFields} }
`;

// Picked testimonials, or the newest ones when none are picked
export const pickedTestimonials = (field: string, limit = 12) => /* groq */ `
  "${field}": select(
    count(${field}) > 0 => ${field}[]->{ ${testimonialFields} },
    *[_type == "testimonial"] | order(_createdAt desc)[0...${limit}]{ ${testimonialFields} }
  )
`;
