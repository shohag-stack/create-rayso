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
