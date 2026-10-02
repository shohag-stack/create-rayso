import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { FaqItem } from "@/components/ui/faq/FaqItem";
import type { FaqSplitData } from "@/types/sections/faq-split";

export function FaqSplitSection({
  image,
  imageSide = "left",
  eyebrow,
  heading,
  headingAccent,
  body,
  groups,
  openFirst = true,
  groupMarker = true,
}: FaqSplitData) {
  const list = (groups ?? []).filter((g) => g.items?.length);
  if (!list.length) return null;
  const src = imageSrc(image, 1600);

  return (
    <div className="section-gap grid text-fg md:grid-cols-2">
      {src && (
        <div className={`relative aspect-4/5 md:sticky md:top-0 md:aspect-auto md:h-svh md:self-start ${imageSide === "right" ? "md:order-2" : ""}`}>
          <Image src={src} alt={image?.alt ?? ""} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: imagePosition(image) }} />
        </div>
      )}

      <div className={`px-4 py-14 md:px-12 md:py-20 lg:px-20 ${src ? "" : "mx-auto w-full max-w-3xl md:col-span-2"}`}>
        {eyebrow && <p className="eyebrow mb-4 opacity-70">{eyebrow}</p>}
        {heading && (
          <h2 className="text-lg font-semibold tracking-wide whitespace-pre-line text-inherit uppercase md:text-xl">
            {heading}
            {headingAccent && <span className="text-accent"> {headingAccent}</span>}
          </h2>
        )}
        {body && <p className="mt-4 leading-relaxed opacity-80">{body}</p>}

        {list.map((group, g) => (
          <div key={group._key ?? g} className="mt-14 first:mt-0 md:mt-16">
            {group.title && (
              <div className="mb-2 flex items-center gap-5">
                {groupMarker && (
                  <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-accent">
                    <span className="size-3.5 rounded-full bg-surface" />
                  </span>
                )}
                <h3 className="font-body text-sm font-normal text-inherit">{group.title}</h3>
              </div>
            )}
            <div>
              {group.items!.map((item, i) => (
                <FaqItem
                  key={item._key ?? i}
                  item={item}
                  open={openFirst && g === 0 && i === 0}
                  strokeWidth={2.5}
                  className="border-b border-border"
                  summaryClassName="py-8 text-lg font-semibold"
                  answerClassName="max-w-xl pb-10 leading-snug"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
