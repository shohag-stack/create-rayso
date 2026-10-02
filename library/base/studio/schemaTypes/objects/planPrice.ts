import { defineField, defineType } from "sanity";

// One price of a plan. A plan has one per option of the section's price switch (e.g. Monthly, Yearly).
export const planPrice = defineType({
  name: "planPrice",
  title: "Price",
  type: "object",
  fields: [
    defineField({ name: "amount", type: "string", description: 'As shown, e.g. "$15", "Free" or "Let\'s talk".', validation: (rule) => rule.required() }),
    defineField({ name: "compareAt", title: "Old price", type: "string", description: 'Optional crossed-out price before it, e.g. "$20".' }),
    defineField({ name: "period", type: "string", description: 'Optional, after the price, e.g. "/mo" or "per seat / year".' }),
    defineField({ name: "note", type: "string", description: 'Optional line under the price, e.g. "$180 billed annually".' }),
  ],
  preview: {
    select: { amount: "amount", period: "period", note: "note" },
    prepare: ({ amount, period, note }) => ({ title: [amount, period].filter(Boolean).join(" "), subtitle: note }),
  },
});
