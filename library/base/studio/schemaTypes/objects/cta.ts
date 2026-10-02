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
      description: "Primary: accent colour. Secondary: outlined. Light: white, for photos. Glass: see-through, for photos.",
      options: { list: ["primary", "secondary", "light", "glass"], layout: "radio", direction: "horizontal" },
      initialValue: "primary",
    }),
    defineField({ name: "showArrow", title: "Show arrow", type: "boolean", description: "Adds → after the text.", initialValue: false }),
    defineField({ name: "link", type: "link", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "label", subtitle: "style" } },
});
