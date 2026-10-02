import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { FaqItem } from "@/components/ui/faq/FaqItem";
import { sectionTone } from "@/components/ui/sectionTone";
import type { FaqSidebarData } from "@/types/sections/faq-sidebar";

export function FaqSidebarSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  ctas,
  groups,
  openFirst = true,
  dotted = false,
  tone = "page",
}: FaqSidebarData) {
  const list = (groups ?? []).filter((g) => g.items?.length);
  if (!list.length) return null;
  const [primary, ...links] = ctas ?? [];

  return (
    <div className={`relative ${sectionTone[tone]}`}>
      {dotted && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1.5px)] bg-size-[28px_28px] opacity-10"
        />
      )}
      <div className="relative container-site grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          {eyebrow && <p className="eyebrow mb-5 opacity-60">{eyebrow}</p>}
          {heading && (
            <h2 className="text-4xl leading-[1.1] tracking-tight whitespace-pre-line text-inherit md:text-5xl">
              {heading}
              {headingAccent && <span className="text-accent"> {headingAccent}</span>}
            </h2>
          )}
          {body && <p className="mt-5 leading-relaxed opacity-70">{body}</p>}
          {(primary || links.length > 0) && (
            <div className="mt-8 inline-flex flex-col items-stretch gap-4">
              {primary && <CtaButton cta={primary} />}
              {links.map((cta, i) => {
                const href = linkHref(cta.link);
                if (!href) return null;
                return (
                  <Link
                    key={cta._key ?? i}
                    href={href}
                    {...linkTarget(cta.link)}
                    className="eyebrow inline-flex items-center justify-center gap-1 self-end border-b border-current/30 pb-1 opacity-70 transition-opacity hover:opacity-100"
                  >
                    {cta.label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-12 md:gap-14">
          {list.map((group, g) => (
            <div key={group._key ?? g} className="border-t border-current/15">
              {group.title && <h3 className="eyebrow pt-3 font-body font-normal text-inherit opacity-55">{group.title}</h3>}
              {group.items!.map((item, i) => (
                <FaqItem
                  key={item._key ?? i}
                  item={item}
                  open={openFirst && g === 0 && i === 0}
                  strokeWidth={1.25}
                  className="border-b border-current/15"
                  summaryClassName="py-6 text-xl leading-snug tracking-tight md:text-2xl"
                  iconClassName="opacity-60"
                  answerClassName="max-w-2xl pb-7 text-sm leading-relaxed opacity-70"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
