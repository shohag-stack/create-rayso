import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { brandsField, sectionHeadingFields, sectionToneField } from "../fields/section";

export const logosCircles = defineType({
  name: "logosCircles",
  title: "Logos, circles around yours",
  type: "object",
  icon: ImagesIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content").map((f) => (f.name === "eyebrow" ? { ...f, description: 'Optional small label in a box above the heading, e.g. "Integrations".' } : f)),
    brandsField("content", "Square logos or app icons, shown in circles. Half go left of the centre circle, half right. Without a logo the first letter is shown."),
    defineField({
      name: "highlight",
      title: "Centre circle",
      type: "brandLogo",
      group: "content",
      description: "Your own logo or name in the large dark circle in the middle. A white logo works best.",
    }),
    defineField({ name: "cta", title: "Button", type: "cta", group: "content", description: 'Optional, e.g. "View all integrations".' }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading", brands: "brands" },
    prepare: ({ title, brands }) => ({ title: title || "Logos", subtitle: `Logos, circles around yours · ${brands?.length ?? 0} logos` }),
  },
});
