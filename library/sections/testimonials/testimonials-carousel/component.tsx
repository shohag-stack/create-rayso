import Image from "next/image";
import { imageSrc } from "@/(core)/sanity/lib/image";
import { Carousel } from "@/components/ui/Carousel";
import { RatingSummary } from "@/components/ui/RatingSummary";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionTone } from "@/components/ui/sectionTone";
import { Stars } from "@/components/ui/Stars";
import { Author } from "@/components/ui/testimonial/Author";
import { Logo } from "@/components/ui/testimonial/Logo";
import type { TestimonialData } from "@/types/documents/testimonial";
import type { TestimonialsCarouselData } from "@/types/sections/testimonials-carousel";

// Colourful cards take turns with these; on a dark background they stay solid so the text reads
const colourful = {
  light: ["bg-accent/15 text-fg", "bg-surface-alt text-fg", "bg-accent text-accent-fg"],
  dark: ["bg-surface text-fg", "bg-accent text-accent-fg", "bg-surface-alt text-fg"],
};

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) : undefined;

export function TestimonialsCarouselSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  testimonials,
  rating,
  cardStyle = "filled",
  quoteSize = "normal",
  photoStyle = "avatar",
  showLogo = false,
  showDate = false,
  showStars = false,
  footerDivider = false,
  align = "left",
  arrows = "below",
  ratingPosition = "header",
  tone = "page",
}: TestimonialsCarouselData) {
  const items = (testimonials ?? []).filter((t): t is TestimonialData => Boolean(t));
  if (!items.length) return null;
  const large = quoteSize === "large";
  const dark = tone === "dark";

  const cardClass = (i: number) => {
    if (cardStyle === "colourful") {
      const list = colourful[dark ? "dark" : "light"];
      return list[i % list.length];
    }
    if (cardStyle === "outlined") return "border border-current/20";
    return dark ? "bg-current/10" : tone === "tinted" ? "bg-surface" : "bg-surface-alt";
  };

  return (
    <div className={`overflow-hidden ${sectionTone[tone]}`}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} heading={heading} headingAccent={headingAccent} body={body} align={align}>
          {ratingPosition === "header" && <RatingSummary rating={rating} className={align === "center" ? "items-center" : "md:items-end"} />}
        </SectionHeading>
      </div>

      <Carousel label="Testimonials" arrows={arrows} className="mt-12 md:mt-16">
        {items.map((t, i) => {
          const portrait = photoStyle === "portrait" ? imageSrc(t.photo, 400) : undefined;
          return (
            <article
              key={t._id ?? i}
              className={`flex shrink-0 snap-start flex-col justify-between gap-10 rounded-card p-7 md:p-10 ${cardClass(i)} ${
                large ? "w-[85%] md:w-[min(46rem,70vw)]" : "w-[85%] sm:w-[22rem] md:w-[26rem]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {showLogo && <Logo logo={t.logo} />}
                {showDate && t.date && <span className="w-fit rounded-full bg-current/10 px-4 py-1.5 text-sm">{formatDate(t.date)}</span>}
                {showStars && <Stars rating={t.rating} />}
                <blockquote className={large ? "font-heading text-2xl leading-tight md:text-4xl" : "text-lg leading-relaxed"}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <footer className={`flex items-end justify-between gap-6 ${footerDivider ? "-mx-7 border-t border-current/20 px-7 pt-6 md:-mx-10 md:px-10" : ""}`}>
                <Author person={t} avatar={photoStyle === "avatar"} />
                {portrait && (
                  <Image src={portrait} alt={t.photo?.alt ?? ""} width={200} height={200} className="size-24 shrink-0 object-cover md:size-36" />
                )}
              </footer>
            </article>
          );
        })}
      </Carousel>

      {ratingPosition === "below" && rating && (
        <div className="container-site mt-12 flex justify-center">
          <RatingSummary rating={rating} style="boxed" />
        </div>
      )}
    </div>
  );
}
