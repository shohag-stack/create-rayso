import { MenuIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { navBrandNameField, navCtasField, navLinksField, navLogoField, navPositionField } from "../fields/navbar";

export const navbarBar = defineType({
  name: "navbarBar",
  title: "Menu, full-width bar",
  type: "object",
  icon: MenuIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    { ...navLogoField, group: "content" },
    { ...navBrandNameField, group: "content" },
    defineField({ name: "badge", type: "string", group: "content", description: 'Optional small tag next to the logo, e.g. "By Studio Name".' }),
    { ...navLinksField, group: "content" },
    defineField({ name: "note", type: "string", group: "content", description: 'Optional short line at the right on wide screens, e.g. "Free shipping over $100".' }),
    { ...navCtasField, group: "content" },
    defineField({
      name: "linkAlign",
      title: "Link position",
      type: "string",
      group: "layout",
      options: { list: [{ title: "Centred", value: "center" }, { title: "Right, next to the buttons", value: "right" }], layout: "radio", direction: "horizontal" },
      initialValue: "center",
    }),
    defineField({
      name: "linkStyle",
      type: "string",
      group: "layout",
      description: "Plain text links, or each link in a frosted pill. In pills, a link group shows inline with its label.",
      options: { list: ["plain", "pills"], layout: "radio", direction: "horizontal" },
      initialValue: "plain",
    }),
    defineField({ name: "spacedBrandName", title: "Spaced capitals for the brand name", type: "boolean", group: "layout", initialValue: false }),
    { ...navPositionField, group: "layout" },
    anchorField,
  ],
  preview: {
    select: { title: "brandName", media: "logo" },
    prepare: ({ title, media }) => ({ title: title || "Menu", subtitle: "Menu, full-width bar", media }),
  },
});
