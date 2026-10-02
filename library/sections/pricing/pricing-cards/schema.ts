import { CreditCardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { featureIconField, headingAlignField, priceOptionsField, sectionHeadingFields, sectionToneField } from "../fields/section";

const radio = (list: { title: string; value: string }[]) => ({ list, layout: "radio" as const, direction: "horizontal" as const });

export const pricingCards = defineType({
  name: "pricingCards",
  title: "Pricing, plan cards",
  type: "object",
  icon: CreditCardIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    priceOptionsField("content"),
    defineField({
      name: "plans",
      type: "array",
      group: "content",
      description: "One to four plans side by side. Turn on \"Highlight this plan\" for the one to stand out.",
      of: [defineArrayMember({ type: "pricingPlan" })],
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: "extras",
      title: "Extra plans",
      type: "array",
      group: "content",
      description: "Optional smaller cards under the plans, e.g. a free plan and Enterprise. Uses the name, first price, description and first button.",
      of: [defineArrayMember({ type: "pricingPlan" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({ name: "note", type: "string", group: "content", description: 'Optional small line under the plans, e.g. "Cancel anytime · No card needed".' }),
    { ...headingAlignField, initialValue: "center", group: "options" },
    defineField({
      name: "cardStyle",
      type: "string",
      group: "options",
      description: "Outlined: a thin border. Filled: a solid panel. Tinted top: name, price and button on a soft colour above the features.",
      options: radio([{ title: "Outlined", value: "outlined" }, { title: "Filled", value: "filled" }, { title: "Tinted top", value: "split" }]),
      initialValue: "outlined",
    }),
    defineField({
      name: "featuredStyle",
      title: "Highlighted plan",
      type: "string",
      group: "options",
      description: "Banner shows the plan's badge as a bar on top of the card.",
      options: radio([{ title: "Accent border", value: "outline" }, { title: "Accent card", value: "filled" }, { title: "Banner", value: "banner" }]),
      initialValue: "outline",
    }),
    defineField({
      name: "ctaPosition",
      title: "Button position",
      type: "string",
      group: "options",
      options: radio([{ title: "Above the features", value: "top" }, { title: "At the bottom", value: "bottom" }]),
      initialValue: "bottom",
    }),
    { ...featureIconField, group: "options" },
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", plans: "plans" },
    prepare: ({ title, plans }) => ({ title: title || "Pricing", subtitle: `Pricing, plan cards · ${plans?.length ?? 0} plans` }),
  },
});
