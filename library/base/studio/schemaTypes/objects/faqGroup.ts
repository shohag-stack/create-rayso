import { FolderIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// Questions under a shared label, e.g. "Ordering & shipping"
export const faqGroup = defineType({
  name: "faqGroup",
  title: "Question group",
  type: "object",
  icon: FolderIcon,
  fields: [
    defineField({ name: "title", type: "string", description: "Optional group label. Leave empty for a plain list." }),
    defineField({ name: "items", title: "Questions", type: "array", of: [defineArrayMember({ type: "faqItem" })], validation: (rule) => rule.required().min(1) }),
  ],
  preview: { select: { title: "title", items: "items" }, prepare: ({ title, items }) => ({ title: title || "Questions", subtitle: `${items?.length ?? 0} questions` }) },
});
