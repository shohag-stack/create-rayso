import { HelpCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// A question and its answer, shown in FAQ accordions
export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "answer",
      type: "array",
      description: "Bold, italic, links and bullet lists are allowed. Press Enter for a new paragraph.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullets", value: "bullet" }, { title: "Numbers", value: "number" }],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    description: "A web address, a path like /contact, mailto: or tel:.",
                    validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "question" } },
});
