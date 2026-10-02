import Image from "next/image";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { Stars } from "@/components/ui/Stars";
import type { TestimonialData } from "@/types/documents/testimonial";
import type { TestimonialsReviewsData } from "@/types/sections/testimonials-reviews";

export function TestimonialsReviewsSection({
  rating,
  eyebrow,
  heading,
  headingAccent,
  body,
  cta,
  testimonials,
  readMoreLabel = "Read all",
  image,
}: TestimonialsReviewsData) {
  const items = (testimonials ?? []).filter((t): t is TestimonialData => Boolean(t)).slice(0, 3);
  const src = imageSrc(image, 1400);

  return (
    <div className="section-gap container-site text-fg">
      <div className="relative overflow-hidden rounded-card bg-fg/5 px-6 py-10 md:px-14 md:py-16">
        {src && (
          <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
            <Image src={src} alt={image?.alt ?? ""} fill sizes="50vw" className="object-cover" style={{ objectPosition: imagePosition(image) }} />
          </div>
        )}

        <div className="relative max-w-md">
          {rating?.score != null && (
            <p className="mb-5 flex items-center gap-3">
              <Stars rating={rating.score} className="text-lg" />
              <span className="font-medium">{rating.score.toFixed(1)}</span>
              {rating.label && <span className="opacity-50">({rating.label})</span>}
            </p>
          )}
          {eyebrow && <p className="eyebrow mb-4 opacity-70">{eyebrow}</p>}
          {heading && (
            <h2 className="text-4xl leading-[1.05] tracking-tight whitespace-pre-line text-inherit md:text-5xl">
              {heading}
              {headingAccent && <span className="text-accent"> {headingAccent}</span>}
            </h2>
          )}
          {body && <p className="mt-4 leading-relaxed opacity-75">{body}</p>}
          {cta && <CtaButton cta={cta} className="mt-8" />}
        </div>

        {items.length ? (
          <div className="relative mt-12 grid divide-y divide-border overflow-hidden rounded-card bg-surface-alt shadow-xl md:grid-cols-3 md:divide-x md:divide-y-0">
            {items.map((t, i) => {
              const href = linkHref(t.link);
              return (
                <article key={t._id ?? i} className="flex flex-col justify-between gap-8 p-7 md:p-9">
                  <div className="flex flex-col gap-4">
                    <Stars rating={t.rating} className="text-sm" />
                    <blockquote className="line-clamp-5 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  </div>
                  <footer className="flex items-center justify-between gap-4 text-sm">
                    <span className="opacity-55">{t.name}</span>
                    {href && (
                      <Link href={href} {...linkTarget(t.link)} className="font-medium transition-opacity hover:opacity-60">
                        {readMoreLabel}
                      </Link>
                    )}
                  </footer>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
