import { BrandMark } from "@/components/ui/logos/BrandMark";
import { CtaButton } from "@/components/ui/CtaButton";
import { sectionTone } from "@/components/ui/sectionTone";
import { tint } from "@/components/ui/tint";
import type { PricingListData } from "@/types/sections/pricing-list";

export function PricingListSection({ eyebrow, heading, headingAccent, body, plans, offers, tone = "page" }: PricingListData) {
  if (!plans?.length) return null;

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        {eyebrow && <p className="eyebrow border-b border-current/15 pb-4 font-normal opacity-60">{eyebrow}</p>}
        {heading && (
          <h2 className="mt-6 max-w-4xl text-4xl leading-[1.05] tracking-tight whitespace-pre-line text-inherit md:text-6xl">
            {heading}
            {headingAccent && <span className="text-accent"> {headingAccent}</span>}
          </h2>
        )}
        {body && <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-75">{body}</p>}

        <ul className="mt-12 flex flex-col gap-4 md:mt-16">
          {plans.map((plan, i) => {
            const price = plan.prices?.[0];
            return (
              <li key={plan._key ?? i} className={`rounded-card border p-5 md:px-6 ${plan.featured ? "border-accent" : "border-current/15"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg tracking-wide text-inherit uppercase">{plan.name}</h3>
                  {price && (
                    <p className="eyebrow font-normal">
                      {price.compareAt && <s className="mr-2 opacity-40">{price.compareAt}</s>}
                      {[price.amount, price.period].filter(Boolean).join(" / ")}
                    </p>
                  )}
                </div>
                {plan.description && <p className="mt-3 opacity-55">{plan.description}</p>}
              </li>
            );
          })}
        </ul>

        {offers?.length ? (
          <div className={`mt-12 grid gap-4 md:mt-16 ${offers.length > 1 ? "md:grid-cols-[3fr_2fr]" : ""}`}>
            {offers.map((offer, i) => {
              const colour = offer.tint ?? (i === 0 ? "accent" : "dark");
              return (
                <article key={offer._key ?? i} className={`flex items-center justify-between gap-8 rounded-card p-6 md:p-8 ${tint[colour]}`}>
                  <div className="max-w-md">
                    <h3 className="text-2xl leading-tight text-inherit md:text-3xl">{offer.heading}</h3>
                    {offer.body && <p className="mt-5 leading-relaxed opacity-90">{offer.body}</p>}
                    {offer.cta && <CtaButton cta={offer.cta} className="mt-6" />}
                  </div>
                  {offer.brand?.name && (
                    <div className="hidden shrink-0 sm:block">
                      <BrandMark brand={offer.brand} mono onDark={colour === "dark" || colour === "accent"} className="h-12 md:h-16" textClassName="text-3xl md:text-4xl" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
