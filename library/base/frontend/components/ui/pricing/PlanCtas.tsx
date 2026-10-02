import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { CtaButton } from "@/components/ui/CtaButton";
import type { Cta } from "@/types/sanity";

// A plan's main button (full width) and an optional second action as a small link
export function PlanCtas({ ctas, className = "", buttonClassName = "w-full" }: { ctas?: Cta[]; className?: string; buttonClassName?: string }) {
  const [main, second] = ctas ?? [];
  if (!main) return null;
  const href = second ? linkHref(second.link) : undefined;
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <CtaButton cta={main} className={buttonClassName} />
      {second && href && (
        <Link href={href} {...linkTarget(second.link)} className="inline-flex items-center gap-1.5 self-start font-medium underline underline-offset-4 transition-opacity hover:opacity-60">
          {second.label}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      )}
    </div>
  );
}
