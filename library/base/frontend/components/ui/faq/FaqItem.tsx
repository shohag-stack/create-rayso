import { Minus, Plus } from "lucide-react";
import { RichText } from "@/components/ui/RichText";
import type { FaqItem as FaqItemData } from "@/types/sanity";

// One question. A native <details>, so it opens without JavaScript; globals.css animates the height.
// icon "plusMinus" swaps + for −; "plusX" turns the + into an ×.
export function FaqItem({
  item,
  open = false,
  icon = "plusMinus",
  className = "",
  summaryClassName = "",
  iconClassName = "",
  answerClassName = "",
  strokeWidth = 2,
}: {
  item: FaqItemData;
  open?: boolean;
  icon?: "plusMinus" | "plusX";
  className?: string;
  summaryClassName?: string;
  iconClassName?: string;
  answerClassName?: string;
  strokeWidth?: number;
}) {
  return (
    <details open={open} className={`accordion group ${className}`}>
      <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden ${summaryClassName}`}>
        <span>{item.question}</span>
        <span aria-hidden className={`grid shrink-0 place-items-center ${iconClassName}`}>
          {icon === "plusX" ? (
            <Plus strokeWidth={strokeWidth} className="size-5 transition-transform duration-300 group-open:rotate-45" />
          ) : (
            <>
              <Plus strokeWidth={strokeWidth} className="size-5 group-open:hidden" />
              <Minus strokeWidth={strokeWidth} className="hidden size-5 group-open:block" />
            </>
          )}
        </span>
      </summary>
      <RichText value={item.answer} className={answerClassName} />
    </details>
  );
}
