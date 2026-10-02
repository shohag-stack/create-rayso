import { defineArrayMember, defineField } from "sanity";

// Fields most footers share
export const copyrightField = defineField({
  name: "copyright",
  type: "string",
  description: 'Small print at the bottom. {year} becomes the current year, e.g. "© {year} Studio Name".',
});

export const legalLinksField = defineField({
  name: "legalLinks",
  type: "array",
  description: "Small links next to the copyright, e.g. Privacy, Terms.",
  of: [defineArrayMember({ type: "navLink" })],
});

export const socialLinksField = defineField({
  name: "socialLinks",
  type: "array",
  description: "Social profiles, shown as icons.",
  of: [defineArrayMember({ type: "socialLink" })],
});

export const wordmarkField = defineField({
  name: "wordmark",
  type: "string",
  description: "Optional giant text across the footer, usually the brand name. Short words read best.",
});

export const footerToneField = defineField({
  name: "tone",
  title: "Colours",
  type: "string",
  description: "Light: page colours. Dark: the theme's dark colour. Accent: the brand colour. Gradient: page colour fading into the accent.",
  options: { list: ["light", "dark", "accent", "gradient"], layout: "radio", direction: "horizontal" },
  initialValue: "light",
});
