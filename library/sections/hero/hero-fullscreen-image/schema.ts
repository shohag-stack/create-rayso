import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const heroFullscreenImage = defineType({
  name: "heroFullscreenImage",
  title: "Hero, full-screen image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({ name: "eyebrow", type: "string", description: "Small line above the heading, e.g. a location." }),
    defineField({
      name: "heading",
      type: "text",
      rows: 2,
      description: "Large heading at the bottom left of the photo. Press Enter for a line break.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", type: "text", rows: 3, description: "Short text next to the buttons." }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      description: "Up to two buttons next to the text.",
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({ name: "image", type: "imageWithAlt", description: "Full-screen background photo. Use at least 2000 px wide.", validation: (rule) => rule.required() }),
    defineField({
      name: "overlay",
      title: "Darkening",
      type: "string",
      description: "How much the photo is darkened so the text stays readable.",
      options: { list: ["light", "medium", "strong"], layout: "radio", direction: "horizontal" },
      initialValue: "medium",
    }),
    defineField({ name: "showScrollHint", title: "Show scroll hint", type: "boolean", description: 'Animated "Scroll" line at the bottom right.', initialValue: true }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title, subtitle: "Hero, full-screen image", media }),
  },
});
