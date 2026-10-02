import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { footerSectionTypes } from "../sections";

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
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({ name: "menuCta", title: "Menu button", type: "cta", description: "Optional button at the right of the menu." }),
    ...(footerSectionTypes.length
      ? [
          defineField({
            name: "footer",
            type: "array",
            description: "The footer on every page. Pick one footer layout.",
            of: footerSectionTypes.map((section) => defineArrayMember({ type: section.name })),
            validation: (rule) => rule.max(1),
          }),
        ]
      : []),
    defineField({ name: "contactEmail", type: "string", description: "Shown on the site and used as the default reply address.", validation: (rule) => rule.email() }),
    defineField({ name: "seo", title: "Default SEO", type: "seo", description: "Used by pages that don't set their own." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
