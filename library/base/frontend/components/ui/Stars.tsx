import { Star, StarHalf } from "lucide-react";

// A star rating out of 5, with half stars
export function Stars({ rating, className = "" }: { rating?: number; className?: string }) {
  if (rating == null) return null;
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        if (rounded >= n) return <Star key={n} aria-hidden className="size-[1em] fill-current" strokeWidth={0} />;
        if (rounded === n - 0.5)
          return (
            <span key={n} className="relative inline-flex">
              <Star aria-hidden className="size-[1em] opacity-25" strokeWidth={1.5} />
              <StarHalf aria-hidden className="absolute inset-0 size-[1em] fill-current" strokeWidth={0} />
            </span>
          );
        return <Star key={n} aria-hidden className="size-[1em] opacity-25" strokeWidth={1.5} />;
      })}
    </span>
  );
}
