import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { monoLogosField, sectionHeadingFields, sectionToneField, tintField } from "../fields/section";

export const logosCards = defineType({
  name: "logosCards",
  title: "Logos, coloured cards",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content").map((f) => (f.name === "headingAccent" ? { ...f, description: "Optional words after the heading, shown on a new line in a lighter colour." } : f)),
    defineField({
      name: "cards",
      type: "array",
      group: "content",
      description: "One card per client. Each can link to its story.",
      of: [
        defineArrayMember({
          name: "logoCard",
          title: "Card",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", description: "Company name. Shown as text when there is no logo.", validation: (rule) => rule.required() }),
            defineField({ name: "logo", type: "imageWithAlt", description: "SVG or PNG with a transparent background works best." }),
            defineField({ name: "link", type: "link", description: "Optional. Makes the whole card clickable." }),
            { ...tintField("tint", "Card colour"), initialValue: "alt" },
          ],
          preview: { select: { title: "name", subtitle: "tint", media: "logo" } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "linkLabel", type: "string", group: "content", description: "Small text at the top of linked cards.", initialValue: "View case" }),
    { ...monoLogosField, group: "options" },
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", cards: "cards" },
    prepare: ({ title, cards }) => ({ title: title || "Logos", subtitle: `Logos, coloured cards · ${cards?.length ?? 0} cards` }),
  },
});
