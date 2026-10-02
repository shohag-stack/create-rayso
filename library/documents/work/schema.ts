import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// One project or case study, listed by works sections and shown on its own page under /works
export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  icon: ProjectsIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "The project's web address, e.g. /works/harbour-house. Click Generate to make it from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "cover", title: "Cover image", type: "imageWithAlt", group: "content", description: "Shown on the project's card and at the top of its page." }),
    defineField({ name: "excerpt", title: "Summary", type: "text", rows: 3, group: "content", description: "One or two sentences shown on cards and under the title." }),
    defineField({
      name: "body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) })],
              }),
            ],
          },
        }),
        defineArrayMember({ type: "imageWithAlt" }),
      ],
    }),
    defineField({
      name: "gallery",
      type: "array",
      group: "content",
      description: "More pictures, shown in a grid after the text.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      options: { layout: "grid" },
    }),
    defineField({ name: "category", type: "string", group: "details", description: 'Optional label on cards, e.g. "Branding" or "Interiors".' }),
    defineField({ name: "client", type: "string", group: "details" }),
    defineField({ name: "year", type: "string", group: "details", description: 'e.g. "2026".' }),
    defineField({ name: "services", type: "array", group: "details", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "orderRank", title: "Order", type: "number", group: "details", description: "Lower numbers are listed first. Leave empty to list newest first." }),
  ],
  orderings: [{ title: "Order", name: "orderRankAsc", by: [{ field: "orderRank", direction: "asc" }] }],
  preview: {
    select: { title: "title", client: "client", year: "year", media: "cover" },
    prepare: ({ title, client, year, media }) => ({ title, subtitle: [client, year].filter(Boolean).join(" · "), media }),
  },
});
