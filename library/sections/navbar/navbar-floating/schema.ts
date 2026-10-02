import { MenuIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { navBrandNameField, navCtasField, navLinksField, navLogoField, navPositionField } from "../fields/navbar";

export const navbarFloating = defineType({
  name: "navbarFloating",
  title: "Menu, floating panel",
  type: "object",
  icon: MenuIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "layout", title: "Layout" },
  ],
  fields: [
    { ...navLogoField, group: "content" },
    { ...navBrandNameField, group: "content" },
    { ...navLinksField, group: "content" },
    defineField({
      name: "rightLinks",
      type: "array",
      group: "content",
      description: "Optional links at the right, e.g. My account. With a centred logo these sit right of the logo.",
      of: [defineArrayMember({ type: "navLink" }), defineArrayMember({ type: "navGroup" })],
    }),
    { ...navCtasField, group: "content" },
    defineField({
      name: "layout",
      type: "string",
      group: "layout",
      options: { list: [{ title: "Logo at the left", value: "logo-left" }, { title: "Logo in the centre", value: "logo-center" }], layout: "radio", direction: "horizontal" },
      initialValue: "logo-left",
    }),
    defineField({
      name: "width",
      type: "string",
      group: "layout",
      description: "Compact fits the content and sits in the middle; wide spans the page.",
      options: { list: ["compact", "wide"], layout: "radio", direction: "horizontal" },
      initialValue: "compact",
    }),
    defineField({
      name: "tone",
      title: "Colours",
      type: "string",
      group: "layout",
      options: { list: ["light", "dark", "accent"], layout: "radio", direction: "horizontal" },
      initialValue: "dark",
    }),
    defineField({
      name: "shape",
      type: "string",
      group: "layout",
      description: "Card uses the theme's corner radius; pill is fully rounded.",
      options: { list: ["card", "pill"], layout: "radio", direction: "horizontal" },
      initialValue: "pill",
    }),
    defineField({ name: "caps", title: "Small capital links", type: "boolean", group: "layout", initialValue: false }),
    { ...navPositionField, group: "layout" },
    anchorField,
  ],
  preview: {
    select: { title: "brandName", media: "logo" },
    prepare: ({ title, media }) => ({ title: title || "Menu", subtitle: "Menu, floating panel", media }),
  },
});
