import type { NavLink, SocialLink } from "@/types/sanity";
import { InlineLinks } from "./FooterLink";
import { SocialLinks } from "./SocialLinks";
import { withYear } from "./tone";

// Copyright, legal links and social icons along the bottom of a footer
export function BottomBar({
  copyright,
  note,
  legalLinks,
  socialLinks,
  socialStyle = "icons",
  divider = true,
  centered = false,
}: {
  copyright?: string;
  note?: string;
  legalLinks?: NavLink[];
  socialLinks?: SocialLink[];
  socialStyle?: "icons" | "boxed" | "text";
  divider?: boolean;
  centered?: boolean;
}) {
  if (!copyright && !note && !legalLinks?.length && !socialLinks?.length) return null;
  return (
    <div
      className={`flex flex-col gap-4 py-8 text-sm ${divider ? "border-t border-current/15" : ""} ${
        centered ? "items-center text-center" : "md:flex-row md:items-center md:justify-between"
      }`}
    >
      <div className={`flex flex-col gap-3 opacity-70 md:flex-row md:items-center md:gap-8 ${centered ? "md:flex-col md:gap-3" : ""}`}>
        {(copyright || note) && (
          <div className="flex flex-col gap-1">
            {copyright && <p>{withYear(copyright)}</p>}
            {note && <p>{note}</p>}
          </div>
        )}
        <InlineLinks links={legalLinks} className={centered ? "justify-center" : ""} />
      </div>
      <SocialLinks links={socialLinks} style={socialStyle} />
    </div>
  );
}
