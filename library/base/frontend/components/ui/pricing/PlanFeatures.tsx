import { Check, CircleCheck, Plus } from "lucide-react";
import type { FeatureIcon, PricingPlan } from "@/types/sanity";

const icons = { check: Check, checkCircle: CircleCheck, plus: Plus };

// A plan's feature list with an optional heading and a closing "Everything in …" line
export function PlanFeatures({
  plan,
  icon = "check",
  className = "",
  iconClassName = "",
}: {
  plan: Pick<PricingPlan, "featuresHeading" | "features" | "featuresNote">;
  icon?: FeatureIcon;
  className?: string;
  iconClassName?: string;
}) {
  const features = plan.features ?? [];
  if (!features.length && !plan.featuresNote) return null;
  const Icon = icons[icon];
  return (
    <div className={className}>
      {plan.featuresHeading && <p className="mb-4 font-semibold">{plan.featuresHeading}</p>}
      <ul className="flex flex-col gap-3">
        {features.map((feature, i) => (
          <li key={i} className="flex gap-3">
            <Icon aria-hidden strokeWidth={1.75} className={`mt-0.5 size-4.5 shrink-0 ${iconClassName}`} />
            <span>{feature}</span>
          </li>
        ))}
        {plan.featuresNote && (
          <li className="flex gap-3 opacity-60">
            <Plus aria-hidden strokeWidth={1.75} className="mt-0.5 size-4.5 shrink-0" />
            <span>{plan.featuresNote}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
