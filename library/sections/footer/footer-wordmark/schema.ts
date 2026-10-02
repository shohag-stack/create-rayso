import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { copyrightField, footerToneField, legalLinksField, socialLinksField } from "../fields/footer";

export const footerWordmark = defineType({
  name: "footerWordmark",
  title: "Footer, giant wordmark",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "links", title: "Links" },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    defineField({
      name: "wordmark",
      type: "string",
      group: "content",
      description: "Giant text across the footer, usually the brand name. Short words read best.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", type: "string", group: "content", description: "Optional line in the top row, left of the top links." }),
    defineField({ name: "statement", type: "text", rows: 3, group: "content", description: "Optional paragraph, e.g. an acknowledgement of country or a mission line." }),
    defineField({ name: "mark", title: "Logo mark", type: "imageWithAlt", group: "content", description: "Optional small symbol at the bottom right." }),
    defineField({
      name: "topLinks",
      type: "array",
      group: "links",
      description: "Optional row of links at the top right.",
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({
      name: "secondaryLinks",
      title: "Link row",
      type: "array",
      group: "links",
      description: "Optional row of links under the wordmark, left of the social links.",
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({
      name: "columns",
      title: "Link columns",
      type: "array",
      group: "links",
      description: "Optional columns of links. Links can be emails, addresses or social profiles too.",
      of: [defineArrayMember({ type: "linkColumn" })],
      validation: (rule) => rule.max(5),
    }),
    { ...socialLinksField, group: "links", description: "Social profiles, shown as text links spread across the row." },
    { ...legalLinksField, group: "links" },
    { ...copyrightField, group: "links" },
    defineField({
      name: "wordmarkPosition",
      type: "string",
      group: "layout",
      description: "At the very top, or under the top row.",
      options: { list: ["top", "middle"], layout: "radio", direction: "horizontal" },
      initialValue: "middle",
    }),
    defineField({ name: "split", title: "Spread words to the edges", type: "boolean", group: "layout", initialValue: false }),
    defineField({
      name: "wordmarkColor",
      type: "string",
      group: "layout",
      options: { list: [{ title: "Text colour", value: "text" }, { title: "Accent colour", value: "accent" }], layout: "radio", direction: "horizontal" },
      initialValue: "text",
    }),
    defineField({
      name: "linkStyle",
      type: "string",
      group: "layout",
      options: { list: [{ title: "Normal", value: "normal" }, { title: "Small capitals", value: "caps" }], layout: "radio", direction: "horizontal" },
      initialValue: "normal",
    }),
    defineField({ name: "dividers", title: "Divider lines", type: "boolean", group: "layout", initialValue: true }),
    { ...footerToneField, group: "layout" },
    anchorField,
  ],
  preview: {
    select: { title: "wordmark" },
    prepare: ({ title }) => ({ title, subtitle: "Footer, giant wordmark" }),
  },
});
