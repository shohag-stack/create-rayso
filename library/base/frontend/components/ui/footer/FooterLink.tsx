import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import type { NavLink } from "@/types/sanity";

export function FooterLink({ item, className = "" }: { item: NavLink; className?: string }) {
  const href = linkHref(item.link);
  if (!href) return null;
  return (
    <Link href={href} className={`transition-opacity hover:opacity-60 ${className}`} {...linkTarget(item.link)}>
      {item.label}
    </Link>
  );
}

export function InlineLinks({ links, className = "" }: { links?: NavLink[]; className?: string }) {
  if (!links?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {links.map((item, i) => (
        <li key={item._key ?? i}>
          <FooterLink item={item} />
        </li>
      ))}
    </ul>
  );
}
