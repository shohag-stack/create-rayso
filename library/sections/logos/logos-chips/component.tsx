import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { BrandBadge } from "@/components/ui/logos/BrandBadge";
import { sectionTone } from "@/components/ui/sectionTone";
import type { LogosChipsData } from "@/types/sections/logos-chips";

export function LogosChipsSection({ heading, brands, tone = "page" }: LogosChipsData) {
  if (!brands?.length) return null;

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        {heading && <h2 className="mx-auto max-w-4xl text-center text-2xl leading-tight tracking-tight text-inherit md:text-4xl">{heading}</h2>}
        <ul className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-3 md:mt-14 md:gap-4">
          {brands.map((brand, i) => {
            const href = linkHref(brand.link);
            const chip = (
              <>
                <BrandBadge brand={brand} index={i} sizes="32px" className="size-7 rounded-[calc(var(--radius-button)*0.6)] ring-1 ring-border ring-inset md:size-8" textClassName="text-sm" />
                <span>{brand.name}</span>
              </>
            );
            const cls = "inline-flex items-center gap-2.5 rounded-button border border-border bg-surface-alt py-1.5 pr-3 pl-1.5 text-fg md:text-lg";
            return (
              <li key={brand._key ?? i}>
                {href ? (
                  <Link href={href} {...linkTarget(brand.link)} className={`${cls} transition-colors hover:border-fg/40`}>
                    {chip}
                  </Link>
                ) : (
                  <span className={cls}>{chip}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
