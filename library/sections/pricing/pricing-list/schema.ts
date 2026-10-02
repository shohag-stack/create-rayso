import { CreditCardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields, sectionToneField, tintField } from "../fields/section";

export const pricingList = defineType({
  name: "pricingList",
  title: "Pricing, plan rows and offers",
  type: "object",
  icon: CreditCardIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "plans",
      type: "array",
      group: "content",
      description: "One row per plan with its name, first price and description.",
      of: [defineArrayMember({ type: "pricingPlan" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "offers",
      type: "array",
      group: "content",
      description: "Optional panels under the plans, e.g. a partner discount or a student offer.",
      of: [
        defineArrayMember({
          name: "pricingOffer",
          title: "Offer",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "text", rows: 2, validation: (rule) => rule.required() }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({ name: "cta", title: "Button", type: "cta" }),
            defineField({ name: "brand", title: "Partner logo", type: "brandLogo", description: "Optional logo on the right." }),
            { ...tintField("tint", "Panel colour"), initialValue: undefined, description: "Leave empty: accent for the first, dark for the second." },
          ],
          preview: { select: { title: "heading", subtitle: "body" } },
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", plans: "plans" },
    prepare: ({ title, plans }) => ({ title: title || "Pricing", subtitle: `Pricing, plan rows and offers · ${plans?.length ?? 0} plans` }),
  },
});
