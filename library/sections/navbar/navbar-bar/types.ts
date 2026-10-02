import type { Cta, MenuColor, NavItem, SanityImage } from "@/types/sanity";

export interface NavbarBarData {
  _type: "navbarBar";
  _key: string;
  anchor?: string;
  menuColor?: MenuColor;
  logo?: SanityImage;
  brandName?: string;
  badge?: string;
  links?: NavItem[];
  note?: string;
  ctas?: Cta[];
  linkAlign?: "center" | "right";
  linkStyle?: "plain" | "pills";
  spacedBrandName?: boolean;
  position?: "scrolls" | "fixed";
}
