import type { Cta, MenuColor, NavItem, NavLink, SanityImage } from "@/types/sanity";

export interface NavbarMenuData {
  _type: "navbarMenu";
  _key: string;
  anchor?: string;
  menuColor?: MenuColor;
  logo?: SanityImage;
  brandName?: string;
  label?: string;
  note?: string;
  quickLinks?: NavLink[];
  barCta?: Cta;
  links?: NavItem[];
  ctas?: Cta[];
  menuLabel?: string;
  layout?: "centered" | "bar";
  tone?: "light" | "dark";
  spacedBrandName?: boolean;
  position?: "scrolls" | "fixed";
}
