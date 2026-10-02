import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { headingAlignField, ratingSummaryField, sectionHeadingFields, sectionToneField } from "../fields/section";

export const testimonialsCarousel = defineType({
  name: "testimonialsCarousel",
  title: "Testimonials, carousel",
  type: "object",
  icon: CommentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "cards", title: "Cards" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "testimonials",
      type: "array",
      group: "content",
      description: "Pick testimonials in the order to show them. Leave empty to show the newest 12.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
    }),
    { ...ratingSummaryField, group: "content" },
    defineField({
      name: "cardStyle",
      type: "string",
      group: "cards",
      description: "Filled: a solid card. Outlined: a thin border. Colourful: cards take turns with the theme's colours.",
      options: { list: ["filled", "outlined", "colourful"], layout: "radio", direction: "horizontal" },
      initialValue: "filled",
    }),
    defineField({
      name: "quoteSize",
      type: "string",
      group: "cards",
      description: "Large sets the quote in the heading font on wide cards.",
      options: { list: ["normal", "large"], layout: "radio", direction: "horizontal" },
      initialValue: "normal",
    }),
    defineField({
      name: "photoStyle",
      type: "string",
      group: "cards",
      description: "Round photo next to the name, a square portrait in the corner, or no photo.",
      options: { list: [{ title: "Round", value: "avatar" }, { title: "Square portrait", value: "portrait" }, { title: "None", value: "none" }], layout: "radio", direction: "horizontal" },
      initialValue: "avatar",
    }),
    defineField({ name: "showLogo", title: "Show company logos", type: "boolean", group: "cards", initialValue: false }),
    defineField({ name: "showDate", title: "Show dates", type: "boolean", group: "cards", initialValue: false }),
    defineField({ name: "showStars", title: "Show star ratings", type: "boolean", group: "cards", initialValue: false }),
    defineField({ name: "footerDivider", title: "Line above the name", type: "boolean", group: "cards", initialValue: false }),
    { ...headingAlignField, group: "layout" },
    defineField({
      name: "arrows",
      type: "string",
      group: "layout",
      description: "Where the previous and next buttons sit. People can always swipe.",
      options: { list: [{ title: "Under the heading", value: "above" }, { title: "Under the cards", value: "below" }, { title: "One button on the cards", value: "side" }, { title: "None", value: "none" }] },
      initialValue: "below",
    }),
    defineField({
      name: "ratingPosition",
      title: "Rating summary position",
      type: "string",
      group: "layout",
      options: { list: [{ title: "Next to the heading", value: "header" }, { title: "Under the cards", value: "below" }], layout: "radio", direction: "horizontal" },
      initialValue: "header",
    }),
    { ...sectionToneField, group: "layout" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Testimonials", subtitle: "Testimonials, carousel" }),
  },
});
