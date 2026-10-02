import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { sectionTone } from "@/components/ui/sectionTone";
import { workHref, type WorkData } from "@/types/documents/work";
import type { WorksGridData } from "@/types/sections/works-grid";

const aspect = { landscape: "aspect-4/3", square: "aspect-square", tall: "aspect-4/5" };

export function WorksGridSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  works,
  picked,
  limit = 6,
  cta,
  align = "left",
  columns = 2,
  imageShape = "landscape",
  showExcerpt = false,
  tone = "page",
}: WorksGridData) {
  const items = (works ?? []).filter((w): w is WorkData => Boolean(w)).slice(0, picked === false ? limit : undefined);
  if (!items.length) return null;
  const centered = align === "center";

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        {(eyebrow || heading || body || cta) && (
          <div className={centered ? "mx-auto max-w-3xl text-center" : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"}>
            <div className="max-w-3xl">
              {eyebrow && <p className="eyebrow mb-5 font-normal opacity-70">{eyebrow}</p>}
              {heading && (
                <h2 className="text-4xl leading-[1.05] tracking-tight whitespace-pre-line text-inherit md:text-6xl">
                  {heading}
                  {headingAccent && <span className="text-accent"> {headingAccent}</span>}
                </h2>
              )}
              {body && <p className="mt-5 text-lg leading-relaxed opacity-75">{body}</p>}
            </div>
            {!centered && cta && <CtaButton cta={cta} className="self-start md:self-auto" />}
          </div>
        )}

        <ul className={`mt-12 grid gap-x-6 gap-y-14 md:mt-16 ${columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 md:gap-x-8"}`}>
          {items.map((work) => {
            const href = workHref(work);
            const src = imageSrc(work.cover, columns === 3 ? 1000 : 1400);
            const card = (
              <>
                <div className={`relative overflow-hidden rounded-card bg-current/5 ${aspect[imageShape]}`}>
                  {src && (
                    <Image
                      src={src}
                      alt={work.cover?.alt ?? ""}
                      fill
                      sizes={columns === 3 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                      style={{ objectPosition: imagePosition(work.cover) }}
                    />
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl leading-snug text-inherit md:text-3xl">{work.title}</h3>
                    {(work.category || work.year) && (
                      <p className="eyebrow mt-3 flex gap-3 font-normal opacity-60">
                        {work.category && <span>{work.category}</span>}
                        {work.year && <span>{work.year}</span>}
                      </p>
                    )}
                    {showExcerpt && work.excerpt && <p className="mt-4 line-clamp-2 leading-relaxed opacity-70">{work.excerpt}</p>}
                  </div>
                  {href && <ArrowUpRight aria-hidden className="mt-1 size-6 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                </div>
              </>
            );
            return (
              <li key={work._id}>
                {href ? (
                  <Link href={href} className="group block">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>

        {centered && cta && (
          <div className="mt-14 flex justify-center md:mt-20">
            <CtaButton cta={cta} />
          </div>
        )}
      </div>
    </div>
  );
}
