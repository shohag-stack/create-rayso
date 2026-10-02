import type { Tint } from "@/types/sanity";

// Panel colours editors pick from (fields/section.ts tintField). Text colour follows the panel.
export const tint: Record<Tint, string> = {
  // A solid light tint of the accent, so it reads the same on light and dark backgrounds
  soft: "bg-[color-mix(in_oklab,var(--color-accent)_18%,var(--color-surface-alt))] text-fg",
  accent: "bg-accent text-accent-fg",
  alt: "bg-surface-alt text-fg",
  dark: "bg-surface-inverse text-fg-inverse",
};
