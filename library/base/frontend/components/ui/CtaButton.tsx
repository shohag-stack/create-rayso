import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import type { Cta } from "@/types/sanity";

export function CtaButton({ cta, className = "" }: { cta: Cta; className?: string }) {
  const href = linkHref(cta.link);
  if (!href) return null;
  const variant = cta.style === "secondary" ? "btn-secondary" : "btn-primary";
  return (
    <Link href={href} className={`btn ${variant} ${className}`} {...linkTarget(cta.link)}>
      {cta.label}
    </Link>
  );
}
