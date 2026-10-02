import { ThLargeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { headingAlignField, iconField, sectionHeadingFields, sectionToneField, tintField } from "../fields/section";

export const featuresColumns = defineType({
  name: "featuresColumns",
  title: "Features, columns with pictures",
  type: "object",
  icon: ThLargeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "features",
      type: "array",
      group: "content",
      description: "Two to four features side by side.",
      of: [
        defineArrayMember({
          name: "feature",
          type: "object",
          fields: [
            { ...iconField, description: "Optional icon in a small coloured box before the title." },
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({ name: "image", type: "imageWithAlt", description: "Optional picture or illustration in a coloured card under the text." }),
            { ...tintField(), description: "Colour of the icon box and of the card behind the picture." },
          ],
          preview: { select: { title: "title", subtitle: "body", media: "image" } },
        }),
      ],
      validation: (rule) => rule.required().min(2).max(4),
    }),
    { ...headingAlignField, title: "Text position", initialValue: "center", group: "options" },
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Features", subtitle: "Features, columns with pictures" }),
  },
});
