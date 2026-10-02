import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describes the image for screen readers and search engines.",
      validation: (rule) => rule.required(),
    }),
  ],
});
