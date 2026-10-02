import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// One testimonial, reused by every testimonial section
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, description: "What they said, without quotation marks.", validation: (rule) => rule.required() }),
    defineField({ name: "name", type: "string", description: "Who said it.", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", description: 'Their job or how they know you, e.g. "Head of Marketing" or "Stayed in June".' }),
    defineField({ name: "company", type: "string", description: "Optional company name, shown after the role." }),
    defineField({ name: "photo", type: "imageWithAlt", description: "Optional portrait. Square photos work best." }),
    defineField({ name: "logo", title: "Company logo", type: "imageWithAlt", description: "Optional logo, shown in some layouts. A single-colour SVG works best." }),
    defineField({ name: "rating", type: "number", description: "Optional star rating out of 5.", validation: (rule) => rule.min(0).max(5) }),
    defineField({ name: "date", type: "date", description: "Optional, shown in some layouts.", options: { dateFormat: "MMMM YYYY" } }),
    defineField({
      name: "stats",
      title: "Results",
      type: "array",
      description: 'Optional numbers to show with the quote, e.g. "28%" and "More direct bookings".',
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "link", title: "Read more link", type: "link", description: "Optional link to the full story or review." }),
  ],
  preview: {
    select: { title: "name", subtitle: "quote", media: "photo" },
  },
});
