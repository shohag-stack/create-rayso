import Image from "next/image";
import { imageSrc } from "@/(core)/sanity/lib/image";
import { InlineLinks } from "@/components/ui/footer/FooterLink";
import { LinkColumns } from "@/components/ui/footer/LinkColumns";
import { SocialLinks } from "@/components/ui/footer/SocialLinks";
import { footerTone, withYear } from "@/components/ui/footer/tone";
import { Wordmark } from "@/components/ui/footer/Wordmark";
import type { FooterWordmarkData } from "@/types/sections/footer-wordmark";

export function FooterWordmarkSection({
  wordmark,
  tagline,
  statement,
  mark,
  topLinks,
  secondaryLinks,
  columns,
  socialLinks,
  legalLinks,
  copyright,
  wordmarkPosition = "middle",
  split = false,
  wordmarkColor = "text",
  linkStyle = "normal",
  dividers = true,
  tone = "light",
}: FooterWordmarkData) {
  const markSrc = imageSrc(mark, 120);
  const rule = dividers ? "border-t border-current/20" : "";
  const small = linkStyle === "caps" ? "text-xs tracking-[0.15em] uppercase" : "";
  const giant = (
    <Wordmark text={wordmark} split={split} className={wordmarkColor === "accent" && tone !== "accent" ? "text-accent" : ""} />
  );
  const hasTopRow = Boolean(tagline || topLinks?.length);
  const hasLinkRow = Boolean(secondaryLinks?.length || columns?.length || socialLinks?.length);

  return (
    <div className={`overflow-hidden pt-10 md:pt-16 ${footerTone[tone]}`}>
      <div className="container-site">
        {wordmarkPosition === "top" && <div className="pb-16 md:pb-32">{giant}</div>}

        {hasTopRow && (
          <div className={`flex flex-col gap-6 py-6 lg:flex-row lg:items-baseline lg:justify-between ${rule}`}>
            {tagline && <p className="font-heading text-2xl md:text-3xl">{tagline}</p>}
            <InlineLinks links={topLinks} className={`md:text-lg ${small}`} />
          </div>
        )}

        {wordmarkPosition === "middle" && <div className="py-8 md:py-10">{giant}</div>}

        {statement && (
          <div className={`py-6 ${rule}`}>
            <p className="max-w-5xl font-heading text-xl leading-snug md:text-2xl">{statement}</p>
          </div>
        )}

        {hasLinkRow && (
          <div className={`grid gap-10 py-8 md:items-start ${socialLinks?.length ? "md:grid-cols-2" : ""} ${small} ${statement ? "" : rule}`}>
            <div className="flex flex-col gap-10">
              <InlineLinks links={secondaryLinks} className="md:text-lg" />
              <LinkColumns columns={columns} className="lg:grid-cols-3" />
            </div>
            <SocialLinks links={socialLinks} style="text" className="md:justify-between md:text-lg" />
          </div>
        )}

        <div className={`flex flex-col gap-4 py-8 text-sm md:flex-row md:items-center md:justify-between ${rule} ${small}`}>
          <InlineLinks links={legalLinks} />
          <div className="flex items-center justify-between gap-6 md:justify-end">
            {copyright && <p>{withYear(copyright)}</p>}
            {markSrc && <Image src={markSrc} alt={mark?.alt ?? ""} width={40} height={40} className="size-8 object-contain" />}
          </div>
        </div>
      </div>
    </div>
  );
}
