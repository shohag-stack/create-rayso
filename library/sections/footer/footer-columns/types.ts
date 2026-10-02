import type { EmailCapture } from "@/components/ui/EmailCaptureForm";
import type { FooterTone, LinkColumn, NavLink, SanityImage, SocialLink } from "@/types/sanity";

export interface FooterColumnsData {
  _type: "footerColumns";
  _key: string;
  anchor?: string;
  logo?: SanityImage;
  brandName?: string;
  tagline?: string;
  details?: string;
  emailCapture?: EmailCapture;
  badges?: (SanityImage & { _key?: string })[];
  columns?: LinkColumn[];
  socialLinks?: SocialLink[];
  legalLinks?: NavLink[];
  copyright?: string;
  layout?: "side" | "stacked";
  columnStyle?: "plain" | "divided";
  headingStyle?: "muted" | "bold" | "caps";
  socialPosition?: "brand" | "bottom";
  socialStyle?: "icons" | "boxed";
  wordmark?: string;
  wordmarkStyle?: "solid" | "faded";
  wordmarkPosition?: "middle" | "bottom";
  centerBottomBar?: boolean;
  tone?: FooterTone;
}
