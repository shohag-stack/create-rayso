import { SocialIcon, socialName } from "@/components/icons/SocialIcon";
import type { SocialLink } from "@/types/sanity";

// Social profiles as icons (plain or in boxes) or as text links
export function SocialLinks({
  links,
  style = "icons",
  className = "",
}: {
  links?: SocialLink[];
  style?: "icons" | "boxed" | "text";
  className?: string;
}) {
  if (!links?.length) return null;
  return (
    <ul className={`flex flex-wrap items-center ${style === "text" ? "gap-x-6 gap-y-2" : "gap-3"} ${className}`}>
      {links.map((item, i) => (
        <li key={item._key ?? i}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialName(item.platform)}
            className={`transition-opacity hover:opacity-60 ${
              style === "boxed" ? "flex size-10 items-center justify-center rounded-button border border-current/20" : "flex"
            }`}
          >
            {style === "text" ? socialName(item.platform) : <SocialIcon platform={item.platform} />}
          </a>
        </li>
      ))}
    </ul>
  );
}
