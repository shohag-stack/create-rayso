import { CreditCardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields, sectionToneField } from "../fields/section";

export const pricingDuo = defineType({
  name: "pricingDuo",
  title: "Pricing, two joined panels",
  type: "object",
  icon: CreditCardIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content").map((f) => (f.name === "eyebrow" ? { ...f, description: "Optional small label on the left, above a line." } : f)),
    defineField({ name: "cta", title: "Top link", type: "cta", group: "content", description: 'Optional small link at the top right, e.g. "Explore Motion+".' }),
    defineField({
      name: "plans",
      type: "array",
      group: "content",
      description: 'One or two plans. A highlighted plan fills with the accent colour. The plan\'s first button is its full-width button.',
      of: [defineArrayMember({ type: "pricingPlan" })],
      validation: (rule) => rule.required().min(1).max(2),
    }),
    defineField({ name: "note", type: "string", group: "content", description: "Optional line under the panels." }),
    { ...sectionToneField, initialValue: "dark", group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Pricing", subtitle: "Pricing, two joined panels" }),
  },
});
