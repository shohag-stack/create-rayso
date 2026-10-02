import { defineArrayMember, defineField } from "sanity";

// Fields most navbars share
export const navLogoField = defineField({
  name: "logo",
  type: "imageWithAlt",
  description: "Logo at the left or centre of the menu. A white or single-colour SVG works best. Leave empty to show the brand name.",
});

export const navBrandNameField = defineField({ name: "brandName", type: "string", description: "Shown as text when there is no logo." });

export const navLinksField = defineField({
  name: "links",
  title: "Menu links",
  type: "array",
  description: "Left to right. A link group shows its links in a dropdown.",
  of: [defineArrayMember({ type: "navLink" }), defineArrayMember({ type: "navGroup" })],
});

export const navCtasField = defineField({
  name: "ctas",
  title: "Buttons",
  type: "array",
  description: "Up to two buttons at the right, e.g. Log in and Start free trial.",
  of: [defineArrayMember({ type: "cta" })],
  validation: (rule) => rule.max(2),
});

export const navPositionField = defineField({
  name: "position",
  type: "string",
  description: "Scrolls away with the page, or stays at the top while scrolling.",
  options: { list: [{ title: "Scrolls away", value: "scrolls" }, { title: "Stays at the top", value: "fixed" }], layout: "radio", direction: "horizontal" },
  initialValue: "fixed",
});
