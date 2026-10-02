import { defineField } from "sanity";

// Last field of every section: lets menu links like "/#rooms" jump to it
export const anchorField = defineField({
  name: "anchor",
  title: "Anchor ID",
  type: "slug",
  description: 'Optional. Lets menu links jump to this section, e.g. "rooms" for /#rooms. Lowercase, no spaces.',
  validation: (rule) =>
    rule.custom((value) =>
      !value?.current || /^[a-z0-9-]+$/.test(value.current) ? true : "Use lowercase letters, numbers and hyphens"
    ),
});
