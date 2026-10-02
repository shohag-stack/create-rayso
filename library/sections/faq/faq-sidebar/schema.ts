import { HelpCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields, sectionToneField } from "../fields/section";

export const faqSidebar = defineType({
  name: "faqSidebar",
  title: "FAQ, side heading",
  type: "object",
  icon: HelpCircleIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      group: "content",
      description: "Optional. The first is a button; a second shows as a small link under it.",
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "groups",
      title: "Question groups",
      type: "array",
      group: "content",
      description: 'Each group has an optional label, e.g. "General". Use one group without a label for a plain list.',
      of: [defineArrayMember({ type: "faqGroup" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "openFirst", title: "Open the first question", type: "boolean", group: "options", initialValue: true }),
    defineField({ name: "dotted", title: "Dotted background", type: "boolean", group: "options", initialValue: false }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "FAQ", subtitle: "FAQ, side heading" }),
  },
});
