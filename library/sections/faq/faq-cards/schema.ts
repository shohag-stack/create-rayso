import { HelpCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields, sectionToneField } from "../fields/section";

export const faqCards = defineType({
  name: "faqCards",
  title: "FAQ, centred cards",
  type: "object",
  icon: HelpCircleIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content").map((f) => (f.name === "eyebrow" ? { ...f, description: 'Optional small label in a box above the heading, e.g. "FAQs".' } : f)),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "openFirst", title: "Open the first question", type: "boolean", group: "options", initialValue: true }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare: ({ title, items }) => ({ title: title || "FAQ", subtitle: `FAQ, centred cards · ${items?.length ?? 0} questions` }),
  },
});
