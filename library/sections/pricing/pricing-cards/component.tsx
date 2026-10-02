import { Sparkles, Zap } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { PlanCtas } from "@/components/ui/pricing/PlanCtas";
import { PlanFeatures } from "@/components/ui/pricing/PlanFeatures";
import { PlanPrice, PriceSwitch, PriceSwitchProvider } from "@/components/ui/pricing/PriceSwitch";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionTone } from "@/components/ui/sectionTone";
import type { FeatureIcon, PricingPlan, SectionTone } from "@/types/sanity";
import type { PricingCardsData } from "@/types/sections/pricing-cards";

const columns: Record<number, string> = {
  1: "mx-auto max-w-md",
  2: "mx-auto max-w-5xl md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

type CardOptions = Required<Pick<PricingCardsData, "cardStyle" | "featuredStyle" | "ctaPosition">> & { featureIcon: FeatureIcon; tone: SectionTone };

function PlanCard({ plan, cardStyle, featuredStyle, ctaPosition, featureIcon, tone }: { plan: PricingPlan } & CardOptions) {
  const featured = Boolean(plan.featured);
  const filled = featured && featuredStyle === "filled";
  const banner = featured && featuredStyle === "banner" && plan.badge;
  const split = cardStyle === "split";
  const ctaTop = split || ctaPosition === "top";

  const surface = filled
    ? "bg-accent text-accent-fg"
    : cardStyle === "filled"
      ? tone === "dark"
        ? "bg-current/5"
        : "bg-surface-alt"
      : "border border-current/15";
  const outline = featured && featuredStyle === "outline" ? "ring-2 ring-accent" : "";
  // A primary button on an accent card would vanish, so it swaps to the card's text colour
  const ctaClass = filled ? "w-full bg-accent-fg! text-accent! border-transparent!" : "w-full";

  const header = (
    <>
      <div className={`flex items-start justify-between gap-4 ${split ? "flex-col items-center text-center" : ""}`}>
        <div>
          {plan.audience && <p className="mb-1 text-sm opacity-60">{plan.audience}</p>}
          <h3 className="text-2xl text-inherit">{plan.name}</h3>
        </div>
        {plan.badge && !banner && (
          <span className={`shrink-0 rounded-button px-2.5 py-1 text-xs font-medium ${filled ? "bg-accent-fg/15" : "bg-accent/10 text-accent"}`}>{plan.badge}</span>
        )}
      </div>
      <PlanPrice prices={plan.prices} amountClassName="font-heading text-5xl md:text-6xl" longAmountClassName="font-heading text-4xl md:text-5xl" className={split ? "text-center [&>p]:justify-center" : ""} />
      {plan.allowance && (
        <p className={`flex items-center gap-2 font-medium ${split ? "justify-center" : ""}`}>
          <Sparkles aria-hidden className="size-4.5" strokeWidth={1.75} />
          {plan.allowance}
        </p>
      )}
      {plan.description && <p className={`leading-relaxed opacity-75 ${split ? "text-center" : ""}`}>{plan.description}</p>}
    </>
  );

  return (
    <div className="flex h-full flex-col">
      {banner && (
        <p className="flex h-10 items-center gap-2 rounded-t-card bg-accent px-6 text-sm font-semibold text-accent-fg">
          <Zap aria-hidden className="size-4" />
          {plan.badge}
        </p>
      )}
      <article
        className={`flex flex-1 flex-col gap-6 rounded-card ${surface} ${outline} ${banner ? "rounded-t-none" : featuredStyle === "banner" ? "md:mt-10" : ""} ${split ? "p-2" : "p-7 md:p-8"}`}
      >
        {split ? (
          <div className="flex flex-col gap-5 rounded-card bg-linear-to-b from-accent/15 to-transparent px-6 pt-8 pb-6">
            {header}
            <PlanCtas ctas={plan.ctas} buttonClassName={ctaClass} className="mt-2 items-center" />
          </div>
        ) : (
          header
        )}
        {!split && ctaTop && <PlanCtas ctas={plan.ctas} buttonClassName={ctaClass} />}
        <PlanFeatures plan={plan} icon={featureIcon} className={split ? "border-t border-current/15 px-6 pt-7 pb-6" : ""} />
        {(plan.footnote || !ctaTop) && (
          <div className={`mt-auto flex flex-col gap-4 ${split ? "px-6 pb-4" : ""}`}>
            {!ctaTop && <PlanCtas ctas={plan.ctas} buttonClassName={ctaClass} />}
            {plan.footnote && <p className="text-xs tracking-wide opacity-60">{plan.footnote}</p>}
          </div>
        )}
      </article>
    </div>
  );
}

export function PricingCardsSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  align = "center",
  priceOptions,
  plans,
  cardStyle = "outlined",
  featuredStyle = "outline",
  ctaPosition = "bottom",
  featureIcon = "check",
  extras,
  note,
  tone = "page",
}: PricingCardsData) {
  if (!plans?.length) return null;
  const centered = align === "center";
  const options = { cardStyle, featuredStyle, ctaPosition, featureIcon, tone };

  return (
    <PriceSwitchProvider>
      <div className={sectionTone[tone]}>
        <div className="container-site">
          <SectionHeading eyebrow={eyebrow} heading={heading} headingAccent={headingAccent} body={body} align={align}>
            {!centered && <PriceSwitch options={priceOptions} />}
          </SectionHeading>
          {centered && (
            <div className="mt-10 flex justify-center">
              <PriceSwitch options={priceOptions} />
            </div>
          )}

          <div className={`mt-12 grid gap-6 md:mt-16 ${columns[Math.min(plans.length, 4)]}`}>
            {plans.map((plan, i) => (
              <PlanCard key={plan._key ?? i} plan={plan} {...options} />
            ))}
          </div>

          {extras?.length ? (
            <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-2">
              {extras.map((plan, i) => (
                <article key={plan._key ?? i} className={`flex flex-col items-start gap-3 rounded-card p-7 md:p-9 ${tone === "dark" ? "bg-current/5" : "bg-surface-alt"}`}>
                  <h3 className="text-2xl text-inherit">{plan.name}</h3>
                  {plan.prices?.[0] && <p className="font-medium opacity-60">{plan.prices[0].amount}</p>}
                  {plan.description && <p className="mt-2 max-w-xl leading-relaxed opacity-80">{plan.description}</p>}
                  {plan.ctas?.[0] && <CtaButton cta={plan.ctas[0]} className="mt-5" />}
                </article>
              ))}
            </div>
          ) : null}

          {note && <p className={`eyebrow mt-8 font-normal opacity-60 ${centered ? "text-center" : ""}`}>{note}</p>}
        </div>
      </div>
    </PriceSwitchProvider>
  );
}
