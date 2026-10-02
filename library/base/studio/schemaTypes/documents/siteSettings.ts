import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { footerSectionTypes, navbarSectionTypes } from "../sections";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "siteName", type: "string", description: "Used in browser tabs and as the default for the menu and footer.", validation: (rule) => rule.required() }),
    ...(navbarSectionTypes.length
      ? [
          defineField({
            name: "navbar",
            title: "Menu",
            type: "array",
            description: "The menu at the top of every page. Pick one menu layout.",
            of: navbarSectionTypes.map((section) => defineArrayMember({ type: section.name })),
            validation: (rule) => rule.max(1),
          }),
        ]
      : []),
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
