import { LaunchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({ name: "label", type: "string", description: "Text on the button.", validation: (rule) => rule.required() }),
    defineField({
      name: "style",
      type: "string",
      description: "Primary is filled with the accent colour; secondary is outlined.",
      options: { list: ["primary", "secondary"], layout: "radio", direction: "horizontal" },
      initialValue: "primary",
    }),
    defineField({ name: "link", type: "link", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "label", subtitle: "style" } },
});
