import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { headingAlignField, sectionHeadingFields, sectionToneField } from "../fields/section";

const radio = (list: { title: string; value: string }[]) => ({ list, layout: "radio" as const, direction: "horizontal" as const });

export const worksGrid = defineType({
  name: "worksGrid",
  title: "Works, project grid",
  type: "object",
  icon: ProjectsIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "works",
      title: "Projects",
      type: "array",
      group: "content",
      description: "Pick projects to show. Leave empty to show them all in their set order.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "work" }] })],
      validation: (rule) => rule.max(24),
    }),
    defineField({ name: "limit", title: "How many projects", type: "number", group: "content", description: "Used when no projects are picked.", options: { list: [2, 3, 4, 6, 9, 12] }, initialValue: 6 }),
    defineField({ name: "cta", title: "Button", type: "cta", group: "content", description: 'Optional, e.g. "All works".' }),
    { ...headingAlignField, initialValue: "left", group: "options" },
    defineField({ name: "columns", type: "number", group: "options", options: { list: [2, 3], layout: "radio", direction: "horizontal" }, initialValue: 2 }),
    defineField({
      name: "imageShape",
      title: "Image shape",
      type: "string",
      group: "options",
      options: radio([{ title: "Landscape", value: "landscape" }, { title: "Square", value: "square" }, { title: "Tall", value: "tall" }]),
      initialValue: "landscape",
    }),
    defineField({ name: "showExcerpt", title: "Show summary", type: "boolean", group: "options", initialValue: false }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Works", subtitle: "Works, project grid" }),
  },
});
