import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "@/types/sanity";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// Sized URL for a Sanity image; non-Sanity URLs (library previews) pass through
export function imageSrc(image: SanityImage | undefined, width: number) {
  const url = image?.asset?.url;
  if (!url) return undefined;
  if (!url.startsWith("https://cdn.sanity.io/")) return url;
  return urlFor(url).width(width).auto("format").url();
}

// CSS object-position from the editor's hotspot
export function imagePosition(image: SanityImage | undefined) {
  const hotspot = image?.hotspot;
  return hotspot ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : undefined;
}
