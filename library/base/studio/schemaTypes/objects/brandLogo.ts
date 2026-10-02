import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// A client, partner or integration: its name, logo and an optional link
export const brandLogo = defineType({
  name: "brandLogo",
  title: "Logo",
  type: "object",
  icon: TagIcon,
  fields: [
    defineField({ name: "name", type: "string", description: "Company name. Shown as text when there is no logo, and read by screen readers.", validation: (rule) => rule.required() }),
    defineField({ name: "logo", type: "imageWithAlt", description: "SVG or PNG with a transparent background works best." }),
    defineField({ name: "link", type: "link", description: "Optional. Makes the logo clickable." }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});
