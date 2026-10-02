import type { Cta, FooterTone, LinkColumn, NavLink, SanityImage, SocialLink } from "@/types/sanity";

export interface FooterCtaData {
  _type: "footerCta";
  _key: string;
  anchor?: string;
  heading: string;
  headingAccent?: string;
  accentStyle?: "italic" | "muted";
  body?: string;
  ctas?: Cta[];
  card?: { image?: SanityImage; text?: string; cta?: Cta };
  mark?: SanityImage;
  inlineLinks?: { label?: string; links?: NavLink[] };
  columns?: LinkColumn[];
  socialLinks?: SocialLink[];
  socialStyle?: "icons" | "boxed";
  legalLinks?: NavLink[];
  copyright?: string;
  credit?: string;
  ctaPosition?: "left" | "right";
  frame?: "plain" | "card";
  wordmark?: string;
  tone?: FooterTone;
}
