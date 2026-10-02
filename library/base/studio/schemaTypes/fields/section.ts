import { defineArrayMember, defineField } from "sanity";

// Heading fields many sections share. Spread them into a section's fields with its group.
export const sectionHeadingFields = (group?: string) => [
  defineField({ name: "eyebrow", type: "string", group, description: "Optional small line above the heading." }),
  defineField({ name: "heading", type: "text", rows: 2, group, description: "Section heading. Press Enter for a line break." }),
  defineField({ name: "headingAccent", type: "string", group, description: "Optional words after the heading, shown in the accent colour." }),
  defineField({ name: "body", type: "text", rows: 2, group, description: "Optional text under the heading." }),
];

export const headingAlignField = defineField({
  name: "align",
  title: "Heading position",
  type: "string",
  options: { list: [{ title: "Left", value: "left" }, { title: "Centred", value: "center" }], layout: "radio", direction: "horizontal" },
  initialValue: "left",
});

export const sectionToneField = defineField({
  name: "tone",
  title: "Background",
  type: "string",
  description: "Page: the page colour. Tinted: a slightly different panel. Dark: the theme's dark colour.",
  options: { list: ["page", "tinted", "dark"], layout: "radio", direction: "horizontal" },
  initialValue: "page",
});

export const ratingSummaryField = defineField({
  name: "rating",
  title: "Rating summary",
  type: "object",
  description: 'Optional stars and a line like "4.8 average rating, 500+ reviews", plus award badges.',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "score", type: "number", description: "Average out of 5.", validation: (rule) => rule.min(0).max(5) }),
    defineField({ name: "label", type: "string", description: 'e.g. "500+ reviews".' }),
    defineField({ name: "badges", type: "array", description: "Optional award or review-site badges.", of: [defineArrayMember({ type: "imageWithAlt" })], validation: (rule) => rule.max(4) }),
  ],
});
