import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Links to",
      type: "string",
      options: { list: [{ title: "A page on this site", value: "page" }, { title: "A web address", value: "url" }], layout: "radio" },
      initialValue: "page",
    }),
    defineField({
      name: "page",
      type: "reference",
      to: [{ type: "page" }],
      description: "The page this link opens.",
      hidden: ({ parent }) => parent?.kind === "url",
    }),
    defineField({
      name: "anchor",
      title: "Section anchor",
      type: "string",
      description: 'Optional. Jumps to a section on that page, e.g. "rooms".',
      hidden: ({ parent }) => parent?.kind === "url",
    }),
    defineField({
      name: "url",
      title: "Web address",
      type: "url",
      description: "A full address (https://…), a path like /contact, mailto: or tel:.",
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
      hidden: ({ parent }) => parent?.kind !== "url",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in a new tab",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.kind !== "url",
    }),
  ],
});
