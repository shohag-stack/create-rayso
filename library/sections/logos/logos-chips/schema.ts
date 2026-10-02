import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { brandsField, sectionToneField } from "../fields/section";

export const logosChips = defineType({
  name: "logosChips",
  title: "Logos, name chips",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    defineField({ name: "heading", type: "text", rows: 2, group: "content", description: "Optional centred heading above the chips." }),
    brandsField("content", "Each shows as a chip with a small square logo and the name. Without a logo the first letter is shown."),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", brands: "brands" },
    prepare: ({ title, brands }) => ({ title: title || "Logos", subtitle: `Logos, name chips · ${brands?.length ?? 0} logos` }),
  },
});
