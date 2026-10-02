import { MenuIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { navBrandNameField, navLinksField, navLogoField, navPositionField } from "../fields/navbar";

export const navbarMenu = defineType({
  name: "navbarMenu",
  title: "Menu, open-and-close panel",
  type: "object",
  icon: MenuIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "panel", title: "Menu panel" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    { ...navLogoField, group: "content" },
    { ...navBrandNameField, group: "content" },
    defineField({ name: "label", type: "string", group: "content", description: "Optional short line in the middle of the bar, e.g. a slogan." }),
    defineField({ name: "note", type: "string", group: "content", description: 'Optional short line at the right on wide screens, e.g. "Free shipping over $100".' }),
    defineField({
      name: "quickLinks",
      type: "array",
      group: "content",
      description: "Optional links always shown on the bar, e.g. Cart or Book.",
      of: [defineArrayMember({ type: "navLink" })],
      validation: (rule) => rule.max(3),
    }),
    defineField({ name: "barCta", title: "Bar button", type: "cta", group: "content", description: "Optional button at the far right, outside the panel." }),
    { ...navLinksField, group: "panel", description: "The big links inside the panel, top to bottom. A link group shows its links in a row under its label." },
    defineField({
      name: "ctas",
      title: "Panel buttons",
      type: "array",
      group: "panel",
      description: "Up to three buttons at the bottom of the panel. With three, the first spans the full width.",
      of: [defineArrayMember({ type: "cta" })],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "menuLabel",
      title: "Menu button text",
      type: "string",
      group: "panel",
      description: 'Text on the button that opens the panel, e.g. "Menu". Leave empty for an icon.',
    }),
    defineField({
      name: "layout",
      type: "string",
      group: "layout",
      description: "Centred: a compact panel in the middle that opens downwards. Bar: a full-width bar whose panel opens at the right.",
      options: { list: [{ title: "Centred panel", value: "centered" }, { title: "Full-width bar", value: "bar" }], layout: "radio", direction: "horizontal" },
      initialValue: "centered",
    }),
    defineField({
      name: "tone",
      title: "Panel colours",
      type: "string",
      group: "layout",
      options: { list: ["light", "dark"], layout: "radio", direction: "horizontal" },
      initialValue: "dark",
    }),
    defineField({ name: "spacedBrandName", title: "Spaced capitals for the brand name", type: "boolean", group: "layout", initialValue: false }),
    { ...navPositionField, group: "layout" },
    anchorField,
  ],
  preview: {
    select: { title: "brandName", media: "logo" },
    prepare: ({ title, media }) => ({ title: title || "Menu", subtitle: "Menu, open-and-close panel", media }),
  },
});
