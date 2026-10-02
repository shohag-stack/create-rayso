import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { headingAlignField, sectionHeadingFields, sectionToneField } from "../fields/section";

const radio = (list: { title: string; value: string }[]) => ({ list, layout: "radio" as const, direction: "horizontal" as const });

export const blogCards = defineType({
  name: "blogCards",
  title: "Blog, post cards",
  type: "object",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content").map((f) => (f.name === "eyebrow" ? { ...f, description: 'Optional small label in an outlined box, e.g. "Our news".' } : f)),
    defineField({
      name: "posts",
      type: "array",
      group: "content",
      description: "Pick posts to show, three per row. Leave empty to show the newest.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (rule) => rule.max(9),
    }),
    defineField({ name: "limit", title: "How many newest posts", type: "number", group: "content", description: "Used when no posts are picked.", options: { list: [3, 6, 9] }, initialValue: 3 }),
    defineField({ name: "cta", title: "Button", type: "cta", group: "content", description: 'Optional, e.g. "Visit blog". Under the posts when centred, beside the heading when on the left.' }),
    { ...headingAlignField, initialValue: "center", group: "options" },
    defineField({ name: "divider", title: "Line above the heading", type: "boolean", group: "options", initialValue: false }),
    defineField({
      name: "imageShape",
      title: "Image shape",
      type: "string",
      group: "options",
      options: radio([{ title: "Landscape", value: "landscape" }, { title: "Wide", value: "wide" }, { title: "Tall", value: "tall" }]),
      initialValue: "landscape",
    }),
    defineField({ name: "imageBorder", title: "Thin border around images", type: "boolean", group: "options", initialValue: false }),
    defineField({ name: "showMeta", title: "Show category and date", type: "boolean", group: "options", initialValue: false }),
    defineField({ name: "showExcerpt", title: "Show summary", type: "boolean", group: "options", initialValue: false }),
    defineField({ name: "showAuthor", title: "Show author", type: "boolean", group: "options", initialValue: false }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Blog", subtitle: "Blog, post cards" }),
  },
});
