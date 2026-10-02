import type { Cta, MenuColor, NavItem, SanityImage } from "@/types/sanity";

export interface NavbarFloatingData {
  _type: "navbarFloating";
  _key: string;
  anchor?: string;
  menuColor?: MenuColor;
  logo?: SanityImage;
  brandName?: string;
  links?: NavItem[];
  rightLinks?: NavItem[];
  ctas?: Cta[];
  layout?: "logo-left" | "logo-center";
  width?: "compact" | "wide";
  tone?: "light" | "dark" | "accent";
  shape?: "card" | "pill";
  caps?: boolean;
  position?: "scrolls" | "fixed";
}
