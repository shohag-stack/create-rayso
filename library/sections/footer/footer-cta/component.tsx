import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { BottomBar } from "@/components/ui/footer/BottomBar";
import { InlineLinks } from "@/components/ui/footer/FooterLink";
import { LinkColumns } from "@/components/ui/footer/LinkColumns";
import { footerTone } from "@/components/ui/footer/tone";
import { Wordmark } from "@/components/ui/footer/Wordmark";
import type { FooterCtaData } from "@/types/sections/footer-cta";

export function FooterCtaSection({
  heading,
  headingAccent,
  accentStyle = "italic",
  body,
  ctas,
  card,
  mark,
  inlineLinks,
  columns,
  socialLinks,
  socialStyle = "icons",
  legalLinks,
  copyright,
  credit,
  ctaPosition = "left",
  frame = "plain",
  wordmark,
  tone = "light",
}: FooterCtaData) {
  const markSrc = imageSrc(mark, 200);
  const cardSrc = imageSrc(card?.image, 1000);
  const right = ctaPosition === "right";
  const inCard = frame === "card";

  const markImage = markSrc && (
    <Image src={markSrc} alt={mark?.alt ?? ""} width={96} height={96} className="size-12 object-contain object-left md:size-16" />
  );

  const ctaBlock = (
    <div className="flex flex-col">
      <h2 className="font-heading text-inherit text-4xl leading-[1.05] tracking-tight whitespace-pre-line md:text-6xl">
        {heading}
        {headingAccent && <span className={`block ${accentStyle === "italic" ? "italic" : "opacity-55"}`}>{headingAccent}</span>}
      </h2>
      {body && <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-85">{body}</p>}
      {ctas?.length ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {ctas.map((cta, i) => (
            <CtaButton key={cta._key ?? i} cta={cta} />
          ))}
        </div>
      ) : null}
      {inlineLinks?.links?.length ? (
        <div className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-lg">
          {inlineLinks.label && <span className="opacity-55">{inlineLinks.label}</span>}
          <InlineLinks links={inlineLinks.links} />
        </div>
      ) : null}
      {cardSrc && <LinkColumns columns={columns} className="mt-10 max-w-lg" />}
    </div>
  );

  const otherSide = cardSrc ? (
    <div className="w-full max-w-md justify-self-end rounded-card border border-current/10 bg-surface-alt p-3 shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface-inverse">
        <Image
          src={cardSrc}
          alt={card?.image?.alt ?? ""}
          fill
          sizes="(min-width: 768px) 28rem, 100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition(card?.image) }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-6 pt-24 text-on-media">
          {card?.text && <p className="text-xl leading-snug font-medium md:text-2xl">{card.text}</p>}
          {card?.cta && <CtaButton cta={card.cta} className="mt-5" />}
        </div>
      </div>
    </div>
  ) : (
    <div className={`flex flex-col gap-12 ${right ? "" : "md:justify-between"}`}>
      {right && markImage}
      <LinkColumns columns={columns} />
      {!right && markImage}
    </div>
  );

  const content = (
    <div className="grid gap-14 pb-14 md:grid-cols-2 md:gap-10 md:pb-20">
      {right ? otherSide : ctaBlock}
      {right ? ctaBlock : otherSide}
    </div>
  );

  const bottom = (
      <BottomBar copyright={copyright} note={credit} legalLinks={legalLinks} socialLinks={socialLinks} socialStyle={socialStyle} divider={!inCard} />
  );

  if (inCard) {
    return (
      <div className={`overflow-hidden ${footerTone[tone]}`}>
        <div className="rounded-b-card bg-surface pt-16 text-fg md:pt-24">
          <div className="container-site">
            {content}
            {bottom}
          </div>
        </div>
        {wordmark && (
          <div className="container-site pt-6 text-surface">
            <Wordmark text={wordmark} bleed />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden pt-16 md:pt-24 ${footerTone[tone]}`}>
      <div className="container-site">
        {content}
        {wordmark && <Wordmark text={wordmark} className="pb-6" />}
        {bottom}
      </div>
    </div>
  );
}
