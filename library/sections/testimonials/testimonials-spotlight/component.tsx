import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { FooterLink } from "@/components/ui/footer/FooterLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionTone } from "@/components/ui/sectionTone";
import { Author } from "@/components/ui/testimonial/Author";
import { Logo } from "@/components/ui/testimonial/Logo";
import type { TestimonialData } from "@/types/documents/testimonial";
import type { TestimonialsSpotlightData } from "@/types/sections/testimonials-spotlight";

export function TestimonialsSpotlightSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  link,
  testimonials,
  media = "photo",
  alternate = true,
  panelStyle = "tinted",
  showStats = true,
  showLogo = true,
  quoteMark = true,
  readMoreLabel = "Read more",
  align = "left",
  tone = "page",
}: TestimonialsSpotlightData) {
  const items = (testimonials ?? []).filter((t): t is TestimonialData => Boolean(t));
  if (!items.length) return null;
  const panel = panelStyle === "framed" ? "border border-accent/40" : tone === "dark" ? "bg-current/10" : "bg-accent/10";

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} heading={heading} headingAccent={headingAccent} body={body} align={align}>
          {link && (
            <p className="flex items-center gap-2 font-medium">
              <ArrowRight aria-hidden className="size-4" />
              <FooterLink item={link} />
            </p>
          )}
        </SectionHeading>

        <div className={`flex flex-col gap-8 ${heading || eyebrow ? "mt-12 md:mt-20" : ""}`}>
          {items.map((t, i) => {
            const flip = alternate && i % 2 === 1;
            const photo = imageSrc(t.photo, 900);
            const [first, ...rest] = t.stats ?? [];
            const bigStat = media === "stat" && first;
            const inlineStats = showStats ? (bigStat ? rest : t.stats) ?? [] : [];
            const href = linkHref(t.link);

            const side = bigStat ? (
              <div className="flex h-full min-h-72 flex-col justify-between gap-12 rounded-card bg-accent p-8 text-accent-fg md:p-10">
                <p className="font-heading text-7xl leading-none md:text-8xl">{first.value}</p>
                {first.label && <p className="max-w-md text-3xl leading-tight md:text-4xl">{first.label}</p>}
              </div>
            ) : photo ? (
              <div className="relative min-h-80 overflow-hidden rounded-card md:min-h-full">
                <Image
                  src={photo}
                  alt={t.photo?.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: imagePosition(t.photo) }}
                />
              </div>
            ) : null;

            return (
              <article key={t._id ?? i} className={`grid gap-4 md:gap-0 ${side ? "md:grid-cols-[2fr_3fr]" : ""}`}>
                {side && <div className={`h-full ${flip ? "md:order-last" : ""}`}>{side}</div>}
                <div className={`flex flex-col gap-8 rounded-card p-8 md:p-12 ${panel}`}>
                  {(showLogo && t.logo) || inlineStats.length ? (
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      {showLogo ? <Logo logo={t.logo} className="h-9" /> : <span />}
                      {inlineStats.length ? (
                        <dl className="flex gap-8">
                          {inlineStats.map((stat, j) => (
                            <div key={stat._key ?? j} className="border-l border-current/30 pl-4">
                              <dt className="sr-only">{stat.label}</dt>
                              <dd className="text-3xl font-semibold">{stat.value}</dd>
                              {stat.label && <dd className="max-w-40 text-sm leading-snug opacity-75">{stat.label}</dd>}
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col justify-center gap-6">
                    {quoteMark && <Quote aria-hidden className="size-10 rotate-180 fill-current" strokeWidth={0} />}
                    <blockquote className="max-w-3xl font-heading text-2xl leading-snug md:text-3xl">{t.quote}</blockquote>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <Author person={t} avatar={false} />
                    {href && (
                      <Link href={href} {...linkTarget(t.link)} className="flex items-center gap-2 font-medium transition-opacity hover:opacity-60">
                        <ArrowRight aria-hidden className="size-4" />
                        {readMoreLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
