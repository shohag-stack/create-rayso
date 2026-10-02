import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// One blog post or news item, listed by every blog section
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
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
      description: "The post's web address, e.g. /blog/summer-menu. Click Generate to make it from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "cover", title: "Cover image", type: "imageWithAlt", group: "content", description: "Shown on the post's card. Landscape images work best." }),
    defineField({ name: "excerpt", title: "Summary", type: "text", rows: 3, group: "content", description: "One or two sentences shown on cards under the title." }),
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
    defineField({ name: "category", type: "string", group: "details", description: 'Optional label, e.g. "News" or "Press release".' }),
    defineField({ name: "publishedAt", title: "Date", type: "date", group: "details", description: "Shown on cards. Newer posts are listed first.", options: { dateFormat: "D MMMM YYYY" } }),
    defineField({
      name: "author",
      type: "object",
      group: "details",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "photo", type: "imageWithAlt", description: "Small round picture next to the name." }),
      ],
    }),
    defineField({ name: "link", title: "Link instead", type: "link", group: "details", description: "Optional. Send readers somewhere else instead of the post's own page, e.g. a press release on another site." }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publishedAt", category: "category", media: "cover" },
    prepare: ({ title, date, category, media }) => ({ title, subtitle: [category, date].filter(Boolean).join(" · "), media }),
  },
});
