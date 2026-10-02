import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "siteName", type: "string", description: "Used in the menu when there is no logo, and in browser tabs.", validation: (rule) => rule.required() }),
    defineField({ name: "logo", type: "imageWithAlt", description: "Shown in the menu and footer." }),
    defineField({
      name: "menu",
      type: "array",
      description: "Links in the top menu, left to right.",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuItem",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "link", type: "link", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "menuCta", title: "Menu button", type: "cta", description: "Optional button at the right of the menu." }),
    defineField({ name: "footerText", type: "text", rows: 3, description: "Short text in the footer." }),
    defineField({
      name: "socialLinks",
      type: "array",
      description: "Icons in the footer.",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "platform", type: "string", options: { list: ["instagram", "facebook", "linkedin", "x", "youtube", "tiktok"] }, validation: (rule) => rule.required() }),
            defineField({ name: "url", type: "url", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "contactEmail", type: "string", description: "Shown on the site and used as the default reply address.", validation: (rule) => rule.email() }),
    defineField({ name: "seo", title: "Default SEO", type: "seo", description: "Used by pages that don't set their own." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
