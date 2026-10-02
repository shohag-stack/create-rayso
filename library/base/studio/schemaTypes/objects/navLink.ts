import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// A text link: menu items, footer links, legal links
export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "link", type: "link", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "label" } },
});
