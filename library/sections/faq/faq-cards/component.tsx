import { FaqItem } from "@/components/ui/faq/FaqItem";
import { sectionTone } from "@/components/ui/sectionTone";
import type { FaqCardsData } from "@/types/sections/faq-cards";

export function FaqCardsSection({ eyebrow, heading, headingAccent, body, items, openFirst = true, tone = "page" }: FaqCardsData) {
  if (!items?.length) return null;

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-6 inline-block rounded-button bg-current/5 px-3 py-1.5 text-sm">{eyebrow}</p>}
          {heading && (
            <h2 className="text-4xl leading-none font-bold tracking-tight whitespace-pre-line text-inherit md:text-6xl">
              {heading}
              {headingAccent && <span className="text-accent"> {headingAccent}</span>}
            </h2>
          )}
          {body && <p className="mt-5 text-lg leading-relaxed opacity-75">{body}</p>}
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 md:mt-16">
          {items.map((item, i) => (
            <FaqItem
              key={item._key ?? i}
              item={item}
              open={openFirst && i === 0}
              icon="plusX"
              strokeWidth={1.5}
              className="rounded-card bg-current/5 p-2"
              summaryClassName="pl-3 text-lg md:pl-4"
              iconClassName="size-12 rounded-button bg-current/5"
              answerClassName="px-3 pt-2 pb-3 leading-relaxed opacity-85 md:px-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
