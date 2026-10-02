import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { brandsField, monoLogosField, sectionHeadingFields, sectionToneField } from "../fields/section";

const radio = (list: { title: string; value: string }[]) => ({ list, layout: "radio" as const, direction: "horizontal" as const });

export const logosGrid = defineType({
  name: "logosGrid",
  title: "Logos, grid",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content").map((f) => (f.name === "headingAccent" ? { ...f, description: "Optional words after the heading, shown in a lighter colour." } : f)),
    defineField({ name: "label", type: "string", group: "content", description: 'Optional text in a wide cell in the middle of the first row, e.g. "Trusted by 50+ companies".' }),
    brandsField("content"),
    defineField({
      name: "columns",
      type: "string",
      group: "options",
      description: "Logos per row on large screens. Phones show two.",
      options: radio([{ title: "4", value: "4" }, { title: "5", value: "5" }, { title: "6", value: "6" }]),
      initialValue: "6",
    }),
    defineField({ name: "cells", type: "string", group: "options", options: radio([{ title: "Square", value: "square" }, { title: "Short", value: "short" }]), initialValue: "square" }),
    defineField({ name: "lines", type: "string", group: "options", options: radio([{ title: "Solid", value: "solid" }, { title: "Dashed", value: "dashed" }]), initialValue: "solid" }),
    defineField({ name: "fullWidth", title: "Full width", type: "boolean", group: "options", description: "Let the grid run to the edges of the screen.", initialValue: false }),
    { ...monoLogosField, group: "options" },
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", label: "label", brands: "brands" },
    prepare: ({ title, label, brands }) => ({ title: title || label || "Logos", subtitle: `Logos, grid · ${brands?.length ?? 0} logos` }),
  },
});
