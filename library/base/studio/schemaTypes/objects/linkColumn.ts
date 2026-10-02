import { ThListIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// A column of footer links with an optional heading and "View all" link
export const linkColumn = defineType({
  name: "linkColumn",
  title: "Link column",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({ name: "heading", type: "string", description: "Optional small heading above the links." }),
    defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "navLink" })], validation: (rule) => rule.required().min(1) }),
    defineField({ name: "viewAll", title: '"View all" link', type: "navLink", description: "Optional last link, shown brighter with an arrow." }),
  ],
  preview: { select: { title: "heading", links: "links" }, prepare: ({ title, links }) => ({ title: title || "Links", subtitle: `${links?.length ?? 0} links` }) },
});
