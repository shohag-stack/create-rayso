import Image from "next/image";
import { imageSrc } from "@/(core)/sanity/lib/image";
import type { RatingSummary as RatingSummaryData } from "@/types/sanity";
import { Stars } from "./Stars";

// Stars, the average and a count line; "boxed" draws a bordered pill around it
export function RatingSummary({ rating, style = "inline", className = "" }: { rating?: RatingSummaryData; style?: "inline" | "boxed"; className?: string }) {
  if (!rating || (rating.score == null && !rating.label && !rating.badges?.length)) return null;
  const line = (
    <p className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${style === "boxed" ? "rounded-card border border-current/60 px-6 py-4" : ""}`}>
      <Stars rating={rating.score} className="text-xl" />
      {rating.score != null && <span>{rating.score} average rating</span>}
      {rating.score != null && rating.label && <span aria-hidden className="h-4 w-px bg-current/40" />}
      {rating.label && <span>{rating.label}</span>}
    </p>
  );
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {rating.badges?.length ? (
        <ul className="flex flex-wrap items-center gap-4">
          {rating.badges.map((badge, i) => {
            const src = imageSrc(badge, 200);
            return src ? (
              <li key={badge._key ?? i}>
                <Image src={src} alt={badge.alt ?? ""} width={96} height={96} className="size-20 object-contain" />
              </li>
            ) : null;
          })}
        </ul>
      ) : null}
      {line}
    </div>
  );
}
