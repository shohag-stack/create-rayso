import type { FooterTone, LinkColumn, NavLink, SanityImage, SocialLink } from "@/types/sanity";

export interface FooterWordmarkData {
  _type: "footerWordmark";
  _key: string;
  anchor?: string;
  wordmark: string;
  tagline?: string;
  statement?: string;
  mark?: SanityImage;
  topLinks?: NavLink[];
  secondaryLinks?: NavLink[];
  columns?: LinkColumn[];
  socialLinks?: SocialLink[];
  legalLinks?: NavLink[];
  copyright?: string;
  wordmarkPosition?: "top" | "middle";
  split?: boolean;
  wordmarkColor?: "text" | "accent";
  linkStyle?: "normal" | "caps";
  dividers?: boolean;
  tone?: FooterTone;
}
