import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { headingAlignField, sectionHeadingFields, sectionToneField } from "../fields/section";

export const testimonialsSpotlight = defineType({
  name: "testimonialsSpotlight",
  title: "Testimonials, spotlight",
  type: "object",
  icon: CommentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({ name: "link", title: "Heading link", type: "navLink", group: "content", description: 'Optional link at the right of the heading, e.g. "All case studies".' }),
    defineField({
      name: "testimonials",
      type: "array",
      group: "content",
      description: "One to four testimonials, each shown large on its own row. Leave empty to show the newest two.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "media",
      type: "string",
      group: "layout",
      description: "Beside each quote: the person's photo, or their first result as a big number.",
      options: { list: [{ title: "Photo", value: "photo" }, { title: "Big number", value: "stat" }], layout: "radio", direction: "horizontal" },
      initialValue: "photo",
    }),
    defineField({ name: "alternate", title: "Swap sides on every other row", type: "boolean", group: "layout", initialValue: true }),
    defineField({
      name: "panelStyle",
      type: "string",
      group: "layout",
      description: "Framed: a thin border round the quote. Tinted: a lightly coloured panel.",
      options: { list: ["framed", "tinted"], layout: "radio", direction: "horizontal" },
      initialValue: "tinted",
    }),
    defineField({ name: "showStats", title: "Show results next to the logo", type: "boolean", group: "layout", initialValue: true }),
    defineField({ name: "showLogo", title: "Show company logos", type: "boolean", group: "layout", initialValue: true }),
    defineField({ name: "quoteMark", title: "Big quotation mark", type: "boolean", group: "layout", initialValue: true }),
    defineField({ name: "readMoreLabel", type: "string", group: "layout", description: "Text of each testimonial's read-more link.", initialValue: "Read more" }),
    { ...headingAlignField, group: "layout" },
    { ...sectionToneField, group: "layout" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Testimonials", subtitle: "Testimonials, spotlight" }),
  },
});
