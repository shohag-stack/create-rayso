import { CreditCardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields, sectionToneField } from "../fields/section";

export const pricingCompare = defineType({
  name: "pricingCompare",
  title: "Pricing, one price and a comparison",
  type: "object",
  icon: CreditCardIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "table", title: "Comparison" },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content")
      .filter((f) => f.name !== "body")
      .map((f) => (f.name === "eyebrow" ? { ...f, description: 'Optional small label in a box above the heading, e.g. "Pricing".' } : f)),
    defineField({ name: "price", type: "planPrice", group: "content", description: "The price on the large card." }),
    defineField({ name: "body", type: "text", rows: 3, group: "content", description: "Optional text on the card under the price." }),
    defineField({ name: "cta", title: "Button", type: "cta", group: "content" }),
    defineField({ name: "image", type: "imageWithAlt", group: "content", description: "Optional picture behind the card. It is darkened so the text reads." }),
    defineField({
      name: "guarantee",
      type: "object",
      group: "content",
      description: "Optional strip under the card, e.g. a money-back guarantee.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "body", type: "string" }),
        defineField({ name: "badge", type: "string", description: 'Short tag on the right, e.g. "Cancel anytime".' }),
      ],
    }),
    defineField({
      name: "columns",
      type: "array",
      group: "table",
      description: "Names across the top. The first is you and shows in the accent colour.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "rows",
      type: "array",
      group: "table",
      of: [
        defineArrayMember({
          name: "compareRow",
          title: "Row",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "values",
              type: "array",
              description: 'One per column, in order: "yes" for a tick, "no" for a cross, or a short text.',
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: { select: { title: "label", values: "values" }, prepare: ({ title, values }) => ({ title, subtitle: (values ?? []).join(" · ") }) },
        }),
      ],
    }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", price: "price.amount" },
    prepare: ({ title, price }) => ({ title: title || "Pricing", subtitle: ["Pricing, one price and a comparison", price].filter(Boolean).join(" · ") }),
  },
});
