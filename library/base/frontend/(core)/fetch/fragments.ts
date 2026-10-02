// Shared GROQ projections used by section fragments

export const imageFields = /* groq */ `
  alt,
  hotspot,
  asset->{ _id, url, metadata { lqip, dimensions } }
`;

export const linkFields = /* groq */ `
  kind,
  "slug": page->slug.current,
  "pageId": page->_id,
  anchor,
  url,
  openInNewTab
`;

export const ctaFields = /* groq */ `
  _key,
  label,
  style,
  showArrow,
  link{ ${linkFields} }
`;

export const videoFields = /* groq */ `
  asset->{ url, mimeType }
`;

export const navLinkFields = /* groq */ `
  _key,
  label,
  link{ ${linkFields} }
`;

export const linkColumnFields = /* groq */ `
  _key,
  heading,
  links[]{ ${navLinkFields} },
  viewAll{ ${navLinkFields} }
`;

export const socialLinkFields = /* groq */ `
  _key,
  platform,
  url
`;

// Fields from studio/schemaTypes/fields/footer.ts
export const footerSharedFields = /* groq */ `
  copyright,
  legalLinks[]{ ${navLinkFields} },
  socialLinks[]{ ${socialLinkFields} },
  wordmark,
  tone
`;

// Menu links and link groups (studio/schemaTypes/fields/navbar.ts)
export const navItemFields = /* groq */ `
  _type,
  _key,
  label,
  link{ ${linkFields} },
  links[]{ ${navLinkFields} }
`;

// Fields from studio/schemaTypes/fields/section.ts
export const sectionHeadingFields = /* groq */ `
  eyebrow,
  heading,
  headingAccent,
  body
`;

export const ratingSummaryFields = /* groq */ `
  rating{ score, label, badges[]{ _key, ${imageFields} } }
`;

// Objects from studio/schemaTypes/objects/faqItem.ts and faqGroup.ts
export const faqItemFields = /* groq */ `
  _key,
  question,
  answer
`;

export const faqGroupFields = /* groq */ `
  _key,
  title,
  items[]{ ${faqItemFields} }
`;

// studio/schemaTypes/objects/brandLogo.ts
export const brandLogoFields = /* groq */ `
  _key,
  name,
  logo{ ${imageFields} },
  link{ ${linkFields} }
`;
