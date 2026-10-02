import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { PlanFeatures } from "@/components/ui/pricing/PlanFeatures";
import { PlanPrice, PriceSwitchProvider } from "@/components/ui/pricing/PriceSwitch";
import { sectionTone } from "@/components/ui/sectionTone";
import type { PricingDuoData } from "@/types/sections/pricing-duo";

export function PricingDuoSection({ eyebrow, heading, headingAccent, body, cta, plans, note, tone = "dark" }: PricingDuoData) {
  const list = (plans ?? []).slice(0, 2);
  if (!list.length) return null;
  const topHref = linkHref(cta?.link);

  return (
    <PriceSwitchProvider>
      <div className={sectionTone[tone]}>
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:gap-10">
            <p className="eyebrow self-start border-t border-current/20 pt-4 font-normal opacity-70">{eyebrow}</p>
            <div>
              {heading && (
                <h2 className="text-4xl leading-none font-bold tracking-tight whitespace-pre-line text-inherit md:text-6xl">
                  {heading}
                  {headingAccent && <span className="text-accent"> {headingAccent}</span>}
                </h2>
              )}
              {body && <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">{body}</p>}
            </div>
            {cta && topHref && (
              <Link href={topHref} {...linkTarget(cta.link)} className="eyebrow inline-flex items-center gap-2 self-start transition-opacity hover:opacity-60 md:pt-4">
                {cta.label}
                <ChevronRight aria-hidden className="size-4" />
              </Link>
            )}
          </div>

          <div className={`mx-auto mt-14 grid max-w-6xl border border-current/15 md:mt-24 ${list.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
            {list.map((plan, i) => {
              const featured = Boolean(plan.featured);
              const main = plan.ctas?.[0];
              const href = linkHref(main?.link);
              return (
                <article key={plan._key ?? i} className={`flex flex-col p-7 md:p-12 ${featured ? "bg-accent text-accent-fg" : ""}`}>
                  <div className="eyebrow flex justify-between gap-4 font-normal">
                    <span className={featured ? "" : "text-accent"}>{String(i + 1).padStart(2, "0")}</span>
                    {plan.badge && <span className="opacity-80">{plan.badge}</span>}
                  </div>
                  <h3 className="mt-14 text-4xl font-bold tracking-tight text-inherit md:mt-24 md:text-5xl">{plan.name}</h3>
                  {plan.description && <p className="mt-4 max-w-sm leading-relaxed opacity-80">{plan.description}</p>}
                  <PlanPrice
                    prices={plan.prices}
                    className="mt-12 border-b border-current/20 pb-8"
                    amountClassName="text-6xl font-bold tracking-tighter md:text-8xl"
                    periodClassName="eyebrow font-normal"
                    noteClassName="mt-4 text-sm opacity-70"
                  />
                  <PlanFeatures plan={plan} icon="plus" className="mt-8 mb-10" iconClassName={featured ? "" : "text-accent"} />
                  {plan.footnote && <p className="-mt-4 mb-10 text-sm opacity-70">{plan.footnote}</p>}
                  {main && href && (
                    <Link
                      href={href}
                      {...linkTarget(main.link)}
                      className={`eyebrow mt-auto flex items-center justify-between gap-4 px-6 py-5 transition-opacity hover:opacity-85 ${
                        featured ? "bg-surface-inverse text-fg-inverse" : "bg-accent text-accent-fg"
                      }`}
                    >
                      {main.label}
                      <ChevronRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

          {note && <p className="mt-8 text-center text-sm opacity-70">{note}</p>}
        </div>
      </div>
    </PriceSwitchProvider>
  );
}
