import { sectionHeadingFields } from "@/(core)/fetch/fragments";

export const contactSplitFields = /* groq */ `
  ${sectionHeadingFields},
  details[]{ _key, label, text, url },
  showPhone,
  messagePlaceholder,
  submitLabel,
  successMessage,
  layout,
  tone
`;
