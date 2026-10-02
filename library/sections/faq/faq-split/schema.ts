import { HelpCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields } from "../fields/section";

export const faqSplit = defineType({
  name: "faqSplit",
  title: "FAQ, photo and grouped list",
  type: "object",
  icon: HelpCircleIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photo" },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "groups",
      title: "Question groups",
      type: "array",
      group: "content",
      description: "Each group has an optional label, e.g. \"Ordering & shipping\". Use one group without a label for a plain list.",
      of: [defineArrayMember({ type: "faqGroup" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "image", type: "imageWithAlt", group: "media", description: "Fills one half of the section and stays in view while the questions scroll." }),
    defineField({
      name: "imageSide",
      title: "Photo side",
      type: "string",
      group: "media",
      options: { list: [{ title: "Left", value: "left" }, { title: "Right", value: "right" }], layout: "radio", direction: "horizontal" },
      initialValue: "left",
    }),
    defineField({ name: "openFirst", title: "Open the first question", type: "boolean", group: "options", initialValue: true }),
    defineField({ name: "groupMarker", title: "Dot before group labels", type: "boolean", group: "options", initialValue: true }),
    anchorField,
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "FAQ", subtitle: "FAQ, photo and grouped list", media }),
  },
});
