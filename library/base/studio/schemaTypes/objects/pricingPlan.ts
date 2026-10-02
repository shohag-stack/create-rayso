import { CreditCardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// A plan in the pricing sections. Each section uses the fields it has room for.
export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Plan",
  type: "object",
  icon: CreditCardIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "audience", title: "Who it's for", type: "string", description: 'Optional small line, e.g. "For personal use".' }),
    defineField({ name: "badge", type: "string", description: 'Optional tag, e.g. "Recommended" or "Best value".' }),
    defineField({ name: "featured", title: "Highlight this plan", type: "boolean", initialValue: false }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "prices",
      type: "array",
      description: "One price, or one per option of the section's price switch, in the same order.",
      of: [defineArrayMember({ type: "planPrice" })],
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({ name: "allowance", type: "string", description: 'Optional highlighted line, e.g. "1,000 credits/mo".' }),
    defineField({ name: "featuresHeading", type: "string", description: 'Optional line above the features, e.g. "Everything in Plus, and:".' }),
    defineField({ name: "features", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "featuresNote", type: "string", description: 'Optional last line with a plus, e.g. "Everything in Plus".' }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      description: "The first is the plan's button; a second shows as a small link.",
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({ name: "footnote", type: "string", description: 'Optional small print, e.g. "Minimum 2 users".' }),
  ],
  preview: {
    select: { title: "name", price: "prices.0.amount", featured: "featured" },
    prepare: ({ title, price, featured }) => ({ title, subtitle: [price, featured && "highlighted"].filter(Boolean).join(" · ") }),
  },
});
