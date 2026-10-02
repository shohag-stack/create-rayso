import type { SanityLink } from "@/types/sanity";

export function linkHref(link: SanityLink | undefined): string | undefined {
  if (!link) return undefined;
  if (link.kind === "url") return link.url;
  const path = !link.pageId || link.pageId === "home" ? "/" : `/${link.slug}`;
  return link.anchor ? `${path}#${link.anchor}` : path;
}

export function linkTarget(link: SanityLink | undefined) {
  return link?.kind === "url" && link.openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
