import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { brandsField, monoLogosField, sectionToneField } from "../fields/section";

export const logosRow = defineType({
  name: "logosRow",
  title: "Logos, one row",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    defineField({ name: "heading", type: "string", group: "content", description: 'Optional line above the logos, e.g. "Trusted by 1,800+ hotels".' }),
    brandsField("content"),
    { ...monoLogosField, group: "options" },
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", brands: "brands" },
    prepare: ({ title, brands }) => ({ title: title || "Logos", subtitle: `Logos, one row · ${brands?.length ?? 0} logos` }),
  },
});
