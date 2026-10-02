"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// A row of cards that scrolls sideways (swipe, trackpad or the arrow buttons). Cards start at the
// content edge and run off the right of the screen. Give each child "shrink-0 snap-start" and a width.
// arrows "header": the arrows sit at the right of the `header` row above the cards.
export function Carousel({
  label,
  arrows = "below",
  header,
  className = "",
  children,
}: {
  label: string;
  arrows?: "above" | "below" | "side" | "header" | "none";
  header?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el) return;
    el.scrollBy({ left: direction * (card ? card.offsetWidth + 16 : el.clientWidth * 0.8), behavior: "smooth" });
  };

  const button = "flex size-12 items-center justify-center rounded-full border border-current/20 transition hover:bg-current/10 disabled:opacity-30";
  const arrowButtons = (
    <>
      <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous" className={button}>
        <ArrowLeft aria-hidden className="size-5" />
      </button>
      <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next" className={button}>
        <ArrowRight aria-hidden className="size-5" />
      </button>
    </>
  );
  const buttons = <div className={`flex gap-3 ${arrows === "above" ? "justify-center" : "container-site"}`}>{arrowButtons}</div>;

  return (
    <div className={`relative ${className}`}>
      {arrows === "above" && <div className="mb-10">{buttons}</div>}
      {(header || arrows === "header") && (
        <div className="container-site mb-10 flex items-end justify-between gap-6">
          <div className="min-w-0">{header}</div>
          {arrows === "header" && <div className="hidden shrink-0 gap-3 md:flex">{arrowButtons}</div>}
        </div>
      )}
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] md:scroll-px-8 md:px-8 xl:scroll-px-[calc((100vw-80rem)/2+2rem)] xl:px-[calc((100vw-80rem)/2+2rem)] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {arrows === "below" && <div className="mt-8">{buttons}</div>}
      {arrows === "side" && !edges.end && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next"
          className="absolute top-1/2 right-4 flex size-14 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg transition hover:bg-accent-hover md:right-8"
        >
          <ArrowRight aria-hidden className="size-6" />
        </button>
      )}
    </div>
  );
}
