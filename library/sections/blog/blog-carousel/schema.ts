import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionToneField } from "../fields/section";

export const blogCarousel = defineType({
  name: "blogCarousel",
  title: "Blog, photo carousel",
  type: "object",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    defineField({ name: "heading", type: "string", group: "content", description: 'e.g. "Latest news".' }),
    defineField({ name: "viewAll", title: "View all link", type: "cta", group: "content", description: "Optional small link next to the heading." }),
    defineField({
      name: "posts",
      type: "array",
      group: "content",
      description: "Pick posts to show. Leave empty to show the newest eight.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (rule) => rule.max(12),
    }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Blog", subtitle: "Blog, photo carousel" }),
  },
});
