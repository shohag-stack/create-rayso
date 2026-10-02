import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pageSectionTypes, sectionGroups } from "../sections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", type: "string", description: "Page name in the Studio and the default browser tab title.", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The page address, e.g. about for /about. Not used by the home page.",
      options: { source: "title" },
      hidden: ({ document }) => document?._id.replace(/^drafts\./, "") === "home",
      validation: (rule) =>
        rule.custom((value, { document }) =>
          document?._id.replace(/^drafts\./, "") === "home" || value?.current ? true : "Required"
        ),
    }),
    defineField({
      name: "menuColor",
      title: "Menu text colour",
      type: "string",
      description: "Light = white menu text over a dark hero; dark = black text.",
      options: { list: ["light", "dark"], layout: "radio", direction: "horizontal" },
      initialValue: "dark",
    }),
    defineField({
      name: "sections",
      type: "array",
      description: "The page, top to bottom. Add, remove and drag to reorder.",
      of: pageSectionTypes.map((section) => defineArrayMember({ type: section.name })),
      options: { insertMenu: { groups: sectionGroups, views: [{ name: "list" }] } },
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title", slug: "slug.current" }, prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/${slug}` : "/" }) },
});
