import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { backgroundVideoField } from "../fields/backgroundVideo";

export const heroCenteredImage = defineType({
  name: "heroCenteredImage",
  title: "Hero, centred on image",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photo or video" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    defineField({ name: "mark", title: "Logo mark", type: "imageWithAlt", group: "content", description: "Optional small icon above the heading. A white SVG or PNG works best." }),
    defineField({ name: "heading", type: "text", rows: 2, group: "content", description: "Centred heading. Press Enter for a line break.", validation: (rule) => rule.required() }),
    defineField({ name: "headingAccent", title: "Italic line", type: "string", group: "content", description: 'Optional second heading line in italics, e.g. "Not a machine."' }),
    defineField({ name: "body", type: "text", rows: 2, group: "content", description: "Short text under the heading." }),
    defineField({ name: "note", title: "Status note", type: "string", group: "content", description: 'Optional small line under the text, e.g. "Booked 8 appointments today".' }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      group: "content",
      description: "Up to two buttons under the text.",
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "emailCapture",
      title: "Email sign-up bar",
      type: "object",
      group: "content",
      description: "Optional email field and button at the bottom. It opens the chosen page with the email filled in.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "placeholder", type: "string", initialValue: "Your email" }),
        defineField({ name: "buttonLabel", type: "string", initialValue: "Get started" }),
        defineField({ name: "link", title: "Opens", type: "link", description: "Usually your contact or sign-up page." }),
      ],
    }),
    defineField({ name: "image", type: "imageWithAlt", group: "media", description: "Background photo, at least 2000 px wide. Also the poster for the video.", validation: (rule) => rule.required() }),
    { ...backgroundVideoField, group: "media" },
    defineField({
      name: "frame",
      type: "string",
      group: "layout",
      description: "Full fills the screen; inset shows the photo as a rounded panel with a border of page colour.",
      options: { list: ["full", "inset"], layout: "radio", direction: "horizontal" },
      initialValue: "full",
    }),
    defineField({
      name: "headingSize",
      type: "string",
      group: "layout",
      options: { list: ["medium", "large"], layout: "radio", direction: "horizontal" },
      initialValue: "large",
    }),
    defineField({
      name: "overlay",
      title: "Darkening",
      type: "string",
      group: "layout",
      description: "How much the photo is darkened so the text stays readable.",
      options: { list: ["none", "light", "medium", "strong"], layout: "radio", direction: "horizontal" },
      initialValue: "light",
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title, subtitle: "Hero, centred on image", media }),
  },
});
