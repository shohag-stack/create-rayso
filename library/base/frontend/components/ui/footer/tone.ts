import type { FooterTone } from "@/types/sanity";

// Background and text colours for a footer tone
export const footerTone: Record<FooterTone, string> = {
  light: "bg-surface text-fg",
  dark: "bg-surface-inverse text-fg-inverse",
  accent: "bg-accent text-accent-fg",
  gradient: "bg-linear-to-b from-surface via-surface to-accent/25 text-fg",
};

export const withYear = (text?: string) => text?.replaceAll("{year}", String(new Date().getFullYear()));
