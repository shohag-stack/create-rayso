import { defineField } from "sanity";

// Optional looping video behind a section; the section's image is its poster and mobile fallback
export const backgroundVideoField = defineField({
  name: "video",
  title: "Background video",
  type: "file",
  description: "Optional. A short muted loop (MP4 or WebM, under 10 MB). The image above is shown while it loads.",
  options: { accept: "video/mp4,video/webm" },
});
