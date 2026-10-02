import { FolderIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// A labelled set of menu links: a dropdown, or an inline group in pill menus
export const navGroup = defineType({
  name: "navGroup",
  title: "Link group",
  type: "object",
  icon: FolderIcon,
  fields: [
    defineField({ name: "label", type: "string", description: 'Group name, e.g. "Services".', validation: (rule) => rule.required() }),
    defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "navLink" })], validation: (rule) => rule.required().min(1) }),
  ],
  preview: { select: { title: "label", links: "links" }, prepare: ({ title, links }) => ({ title, subtitle: `Group, ${links?.length ?? 0} links` }) },
});
