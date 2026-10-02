import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { brandsField, monoLogosField, sectionToneField, tintField } from "../fields/section";

export const logosTiles = defineType({
  name: "logosTiles",
  title: "Logos, coloured tiles",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    defineField({ name: "heading", type: "text", rows: 2, group: "content", description: 'Heading on the left, e.g. "Supported by".' }),
    defineField({ name: "body", type: "text", rows: 4, group: "content", description: "Optional text above the tiles." }),
    brandsField("content"),
    defineField({ name: "note", type: "string", group: "content", description: "Optional small line under the tiles, e.g. how to become a partner." }),
    defineField({ name: "showNames", title: "List the names", type: "boolean", group: "options", description: "Show the company names as a small list next to the text.", initialValue: true }),
    { ...tintField("tileTint", "Tile colour"), group: "options" },
    { ...monoLogosField, group: "options" },
    { ...sectionToneField, initialValue: "dark", group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", brands: "brands" },
    prepare: ({ title, brands }) => ({ title: title || "Logos", subtitle: `Logos, coloured tiles · ${brands?.length ?? 0} logos` }),
  },
});
