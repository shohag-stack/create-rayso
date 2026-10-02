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
