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

// A panel colour picked from the theme. Used by feature cards and logo tiles.
export const tintOptions = [
  { title: "Soft accent", value: "soft" },
  { title: "Accent", value: "accent" },
  { title: "Light panel", value: "alt" },
  { title: "Dark", value: "dark" },
];

export const tintField = (name = "tint", title = "Colour") =>
  defineField({ name, title, type: "string", options: { list: tintOptions, layout: "radio", direction: "horizontal" }, initialValue: "soft" });

// Icons editors can pick without uploading one. Keep in step with frontend/components/ui/IconByName.tsx.
export const iconOptions = [
  "search", "sparkles", "scan", "zap", "shield", "heart", "star", "leaf", "globe", "clock", "users", "chart",
  "calendar", "map", "chat", "lock", "gift", "sun", "wave", "coffee",
];

export const iconField = defineField({
  name: "icon",
  type: "string",
  description: "Optional icon from the built-in set.",
  options: { list: iconOptions },
});

// The logo list the logo sections share
export const brandsField = (group?: string, description = "Company logos. Without an uploaded logo the name is shown as text.") =>
  defineField({
    name: "brands",
    title: "Logos",
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "brandLogo" })],
    validation: (rule) => rule.required().min(1),
  });

export const monoLogosField = defineField({
  name: "mono",
  title: "One-colour logos",
  type: "boolean",
  description: "Draws every logo in the text colour so logos with different colours look like one set.",
  initialValue: true,
});

// The switch above pricing plans: billing periods or currencies. Plans list one price per option, in order.
export const priceOptionsField = (group?: string) =>
  defineField({
    name: "priceOptions",
    title: "Price switch",
    type: "array",
    group,
    description: 'Optional. Two or three options, e.g. "Monthly" and "Yearly", or "USD" and "EUR". Leave empty to show each plan\'s first price.',
    of: [
      defineArrayMember({
        name: "priceOption",
        type: "object",
        fields: [
          defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "badge", type: "string", description: 'Optional, e.g. "Save 33%".' }),
        ],
        preview: { select: { title: "label", subtitle: "badge" } },
      }),
    ],
    validation: (rule) => rule.max(3),
  });

export const featureIconField = defineField({
  name: "featureIcon",
  title: "Feature marks",
  type: "string",
  options: {
    list: [{ title: "Tick", value: "check" }, { title: "Tick in a circle", value: "checkCircle" }, { title: "Plus", value: "plus" }],
    layout: "radio",
    direction: "horizontal",
  },
  initialValue: "check",
});
