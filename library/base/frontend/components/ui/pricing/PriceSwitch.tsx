"use client";

import { createContext, useContext, useState } from "react";
import type { PlanPrice as PlanPriceData, PriceOption } from "@/types/sanity";

// Which option of the price switch is picked. Plans list one price per option, in the same order.
const PriceIndex = createContext<[number, (index: number) => void]>([0, () => {}]);

export function PriceSwitchProvider({ children }: { children: React.ReactNode }) {
  const state = useState(0);
  return <PriceIndex.Provider value={state}>{children}</PriceIndex.Provider>;
}

// Pill-shaped segmented control
export function PriceSwitch({ options, className = "" }: { options?: PriceOption[]; className?: string }) {
  const [index, setIndex] = useContext(PriceIndex);
  if (!options || options.length < 2) return null;
  return (
    <div role="group" aria-label="Show prices for" className={`inline-flex rounded-button bg-current/5 p-1 ${className}`}>
      {options.map((option, i) => {
        const active = i === index;
        return (
          <button
            key={option._key ?? i}
            type="button"
            aria-pressed={active}
            onClick={() => setIndex(i)}
            className={`flex cursor-pointer items-center gap-2 rounded-button px-4 py-2 text-sm font-medium transition-colors ${
              active ? "bg-accent text-accent-fg shadow-sm" : "opacity-70 hover:opacity-100"
            }`}
          >
            {option.label}
            {option.badge && <span className={active ? "opacity-80" : "text-accent"}>{option.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

// The plan's price for the picked option (or its last price when it has fewer)
export function PlanPrice({
  prices,
  className = "",
  amountClassName = "text-5xl",
  longAmountClassName,
  compareClassName = "text-2xl",
  periodClassName = "text-base opacity-60",
  noteClassName = "mt-2 text-sm opacity-60",
}: {
  prices?: PlanPriceData[];
  className?: string;
  amountClassName?: string;
  // Used instead of amountClassName for words like "Contact us", which would wrap at full size
  longAmountClassName?: string;
  compareClassName?: string;
  periodClassName?: string;
  noteClassName?: string;
}) {
  const [index] = useContext(PriceIndex);
  if (!prices?.length) return null;
  const price = prices[Math.min(index, prices.length - 1)];
  const amountClass = longAmountClassName && price.amount.length > 7 ? longAmountClassName : amountClassName;
  return (
    <div className={className}>
      <p className="flex flex-wrap items-baseline gap-x-2">
        {price.compareAt && (
          <s className={`opacity-35 ${compareClassName}`}>
            <span className="sr-only">Was </span>
            {price.compareAt}
          </s>
        )}
        <span className={`leading-none tracking-tight ${amountClass}`}>{price.amount}</span>
        {price.period && <span className={periodClassName}>{price.period}</span>}
      </p>
      {price.note && <p className={noteClassName}>{price.note}</p>}
    </div>
  );
}
