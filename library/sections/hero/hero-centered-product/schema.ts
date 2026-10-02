import { DesktopIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";

export const heroCenteredProduct = defineType({
  name: "heroCenteredProduct",
  title: "Hero, centred with product shot",
  type: "object",
  icon: DesktopIcon,
  fields: [
    defineField({ name: "eyebrow", type: "string", description: 'Optional small line above the heading, e.g. "Now in beta".' }),
    defineField({ name: "heading", type: "text", rows: 2, description: "Centred heading. Press Enter for a line break.", validation: (rule) => rule.required() }),
    defineField({ name: "body", type: "text", rows: 3, description: "Text under the heading." }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      description: "Up to two buttons under the text.",
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "productImage",
      title: "Product screenshot",
      type: "imageWithAlt",
      description: "Large screenshot under the text, shown in a rounded frame. 16:10 at 2400 px wide works best.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backdrop",
      type: "imageWithAlt",
      description: "Optional image behind the bottom of the screenshot, e.g. a landscape. Fades into the background.",
    }),
    defineField({
      name: "tone",
      type: "string",
      description: "Dark uses the theme's dark background; light uses the page background.",
      options: { list: ["dark", "light"], layout: "radio", direction: "horizontal" },
      initialValue: "dark",
    }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "productImage" },
    prepare: ({ title, media }) => ({ title, subtitle: "Hero, centred with product shot", media }),
  },
});
