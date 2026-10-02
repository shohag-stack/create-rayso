import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { backgroundVideoField } from "../fields/backgroundVideo";

export const heroFullscreenImage = defineType({
  name: "heroFullscreenImage",
  title: "Hero, full-screen image",
  type: "object",
  icon: ImageIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photo or video" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    defineField({ name: "eyebrow", type: "string", group: "content", description: "Small line above the heading, e.g. a location." }),
    defineField({
      name: "heading",
      type: "text",
      rows: 2,
      group: "content",
      description: "Large heading on the left. Press Enter for a line break.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", type: "text", rows: 3, group: "content", description: "Text under the heading." }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      group: "content",
      description: 'Up to two buttons. On a photo, the "light" and "glass" styles read best.',
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "highlights",
      title: "Floating cards",
      type: "array",
      group: "content",
      description: 'Optional small cards stacked on the right, e.g. "Task completed · SEO audit". Up to four.',
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "label", type: "string", description: 'Small text with a green dot, e.g. "Task completed".' }),
            defineField({ name: "text", type: "string", description: "Main text of the card.", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "text", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({ name: "image", type: "imageWithAlt", group: "media", description: "Full-screen background photo. Use at least 2000 px wide.", validation: (rule) => rule.required() }),
    { ...backgroundVideoField, group: "media" },
    defineField({
      name: "contentPosition",
      title: "Text position",
      type: "string",
      group: "layout",
      description: "Top puts the text under the menu; bottom puts it near the bottom of the photo.",
      options: { list: ["top", "bottom"], layout: "radio", direction: "horizontal" },
      initialValue: "bottom",
    }),
    defineField({
      name: "headingSize",
      type: "string",
      group: "layout",
      options: { list: ["medium", "large"], layout: "radio", direction: "horizontal" },
      initialValue: "large",
    }),
    defineField({ name: "uppercaseHeading", title: "Uppercase heading", type: "boolean", group: "layout", initialValue: false }),
    defineField({
      name: "bodySize",
      title: "Text size",
      type: "string",
      group: "layout",
      description: "Large turns the text under the heading into a lead paragraph.",
      options: { list: ["small", "large"], layout: "radio", direction: "horizontal" },
      initialValue: "small",
    }),
    defineField({
      name: "overlay",
      title: "Darkening",
      type: "string",
      group: "layout",
      description: "How much the photo is darkened so the text stays readable. None suits bright illustrations.",
      options: { list: ["none", "light", "medium", "strong"], layout: "radio", direction: "horizontal" },
      initialValue: "medium",
    }),
    defineField({ name: "showScrollHint", title: "Show scroll hint", type: "boolean", group: "layout", description: "An animated line that invites visitors to scroll.", initialValue: true }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title, subtitle: "Hero, full-screen image", media }),
  },
});
