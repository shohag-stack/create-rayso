import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { BrandMark } from "@/components/ui/logos/BrandMark";
import { sectionTone } from "@/components/ui/sectionTone";
import { tint } from "@/components/ui/tint";
import type { LogosCardsData } from "@/types/sections/logos-cards";

export function LogosCardsSection({ eyebrow, heading, headingAccent, body, cards, linkLabel, mono = true, tone = "page" }: LogosCardsData) {
  if (!cards?.length) return null;

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        {eyebrow && <p className="eyebrow mb-4 font-normal opacity-70">{eyebrow}</p>}
        {heading && (
          <h2 className="max-w-4xl text-3xl leading-[1.1] tracking-tight whitespace-pre-line text-inherit md:text-5xl">
            {heading}
            {headingAccent && <span className="block opacity-40">{headingAccent}</span>}
          </h2>
        )}
        {body && <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-75">{body}</p>}

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {cards.map((card, i) => {
            const colour = card.tint ?? "alt";
            const href = linkHref(card.link);
            const cls = `flex aspect-square flex-col rounded-card p-7 sm:aspect-4/5 md:p-9 ${tint[colour]}`;
            const content = (
              <>
                {href && linkLabel && <span className="eyebrow font-normal">{linkLabel}</span>}
                <span className="flex flex-1 items-center justify-center">
                  <BrandMark
                    brand={card}
                    index={i}
                    linked={false}
                    mono={mono}
                    onDark={colour === "dark" || colour === "accent"}
                    className="h-12 md:h-16"
                    textClassName="text-4xl md:text-5xl"
                  />
                </span>
              </>
            );
            return (
              <li key={card._key ?? i}>
                {href ? (
                  <Link href={href} {...linkTarget(card.link)} aria-label={`${linkLabel ?? "View"}: ${card.name}`} className={`${cls} transition-transform duration-300 ease-smooth hover:-rotate-1 hover:scale-[1.01]`}>
                    {content}
                  </Link>
                ) : (
                  <div className={cls}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
