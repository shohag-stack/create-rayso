import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import type { Cta } from "@/types/sanity";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
  glass: "btn-glass",
};

export function CtaButton({ cta, className = "" }: { cta: Cta; className?: string }) {
  const href = linkHref(cta.link);
  if (!href) return null;
  return (
    <Link href={href} className={`btn ${variants[cta.style ?? "primary"]} ${className}`} {...linkTarget(cta.link)}>
      {cta.label}
      {cta.showArrow && <ArrowRight aria-hidden className="size-4" />}
    </Link>
  );
}
