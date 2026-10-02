import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", type: "string", description: "Browser tab and search result title. Defaults to the page title.", validation: (rule) => rule.max(60).warning("Search engines show about 60 characters") }),
    defineField({ name: "description", type: "text", rows: 3, description: "Search result snippet.", validation: (rule) => rule.max(160).warning("Search engines show about 160 characters") }),
    defineField({ name: "image", title: "Share image", type: "imageWithAlt", description: "Shown when the page is shared on social media (1200 × 630)." }),
  ],
});
