import { EnvelopeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField } from "../fields/anchor";
import { sectionHeadingFields, sectionToneField } from "../fields/section";

export const contactSplit = defineType({
  name: "contactSplit",
  title: "Contact, details and form",
  type: "object",
  icon: EnvelopeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "form", title: "Form" },
    { name: "options", title: "Options" },
  ],
  fields: [
    ...sectionHeadingFields("content"),
    defineField({
      name: "details",
      type: "array",
      group: "content",
      description: "Shown beside the form, e.g. Email, Phone, Address, Opening hours.",
      of: [
        defineArrayMember({
          type: "object",
          name: "contactDetail",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 3, description: "One or more lines.", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "Link", type: "string", description: "Optional, e.g. mailto:hello@example.com, tel:+15551234567 or a map link." }),
          ],
          preview: { select: { title: "label", subtitle: "text" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: "showPhone", title: "Ask for a phone number", type: "boolean", group: "form", initialValue: true }),
    defineField({ name: "messagePlaceholder", title: "Message hint", type: "string", group: "form", description: 'Grey text in the empty message box, e.g. "Dates, number of guests, anything else".' }),
    defineField({ name: "submitLabel", title: "Button label", type: "string", group: "form", initialValue: "Send message" }),
    defineField({ name: "successMessage", title: "Thank-you message", type: "string", group: "form", description: "Replaces the form once a message is sent." }),
    defineField({
      name: "layout",
      type: "string",
      group: "options",
      options: { list: [{ title: "Details left, form right", value: "split" }, { title: "Form in a card", value: "card" }], layout: "radio", direction: "horizontal" },
      initialValue: "split",
    }),
    { ...sectionToneField, group: "options" },
    anchorField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Contact", subtitle: "Contact, details and form" }),
  },
});
