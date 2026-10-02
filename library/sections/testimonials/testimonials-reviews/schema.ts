import { StarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { ratingSummaryField, sectionHeadingFields } from "../fields/section";

export const testimonialsReviews = defineType({
  name: "testimonialsReviews",
  title: "Testimonials, review cards",
  type: "object",
  icon: StarIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photo" },
  ],
  fields: [
    { ...ratingSummaryField, group: "content", description: "Optional stars, average and count above the heading." },
    ...sectionHeadingFields("content"),
    defineField({ name: "cta", title: "Button", type: "cta", group: "content", description: 'Optional button under the heading, e.g. "See all reviews".' }),
    defineField({
      name: "testimonials",
      title: "Reviews",
      type: "array",
      group: "content",
      description: "Up to three reviews in a row of cards. Leave empty to show the newest three.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "readMoreLabel", type: "string", group: "content", description: "Text of each review's read-more link.", initialValue: "Read all" }),
    defineField({ name: "image", type: "imageWithAlt", group: "media", description: "Optional photo filling the right side of the panel, behind the cards." }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Reviews", subtitle: "Testimonials, review cards", media }),
  },
});
