import Image from "next/image";
import { imageSrc } from "@/(core)/sanity/lib/image";
import { EmailCaptureForm } from "@/components/ui/EmailCaptureForm";
import { BottomBar } from "@/components/ui/footer/BottomBar";
import { LinkColumns } from "@/components/ui/footer/LinkColumns";
import { SocialLinks } from "@/components/ui/footer/SocialLinks";
import { footerTone } from "@/components/ui/footer/tone";
import { Wordmark } from "@/components/ui/footer/Wordmark";
import type { FooterColumnsData } from "@/types/sections/footer-columns";

export function FooterColumnsSection({
  logo,
  brandName,
  tagline,
  details,
  emailCapture,
  badges,
  columns,
  socialLinks,
  legalLinks,
  copyright,
  layout = "side",
  columnStyle = "plain",
  headingStyle = "muted",
  socialPosition = "bottom",
  socialStyle = "icons",
  wordmark,
  wordmarkStyle = "faded",
  wordmarkPosition = "bottom",
  centerBottomBar = false,
  tone = "light",
}: FooterColumnsData) {
  const logoSrc = imageSrc(logo, 400);
  const stacked = layout === "stacked";
  const formVariant = tone === "accent" ? "glass" : "outline";
  const hasBrand = Boolean(logoSrc || brandName || tagline || details || emailCapture || badges?.length || socialPosition === "brand");

  const brand = hasBrand && (
    <div className={`flex flex-col gap-6 ${stacked ? "md:flex-row md:items-start md:justify-between" : ""}`}>
      <div className="flex max-w-md flex-col gap-4">
        {logoSrc ? (
          <Image src={logoSrc} alt={logo?.alt ?? brandName ?? ""} width={200} height={60} className="h-10 w-auto object-contain object-left" />
        ) : (
          brandName && <p className="font-heading text-2xl md:text-3xl">{brandName}</p>
        )}
        {tagline && <p className="leading-relaxed opacity-80">{tagline}</p>}
        {details && <p className="text-sm whitespace-pre-line opacity-60">{details}</p>}
        {!stacked && <EmailCaptureForm capture={emailCapture} variant={formVariant} className="mt-2" />}
        {socialPosition === "brand" && <SocialLinks links={socialLinks} style={socialStyle} className="mt-2" />}
      </div>
      {stacked && <EmailCaptureForm capture={emailCapture} variant={formVariant} className="w-full md:max-w-md" />}
      {badges?.length ? (
        <ul className={`flex flex-wrap gap-3 ${stacked ? "" : "mt-2"}`}>
          {badges.map((badge, i) => {
            const src = imageSrc(badge, 160);
            return src ? (
              <li key={badge._key ?? i}>
                <Image src={src} alt={badge.alt ?? ""} width={64} height={64} className="size-14 object-contain" />
              </li>
            ) : null;
          })}
        </ul>
      ) : null}
    </div>
  );

  const mark = <Wordmark text={wordmark} style={wordmarkStyle} bleed={wordmarkPosition === "bottom"} className="mt-10" />;

  return (
    <div className={`relative overflow-hidden pt-16 md:pt-24 ${footerTone[tone]}`}>
      <div className="container-site">
        <div className={`grid gap-14 pb-14 md:pb-20 ${!stacked && hasBrand ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20" : ""}`}>
          {brand}
          <LinkColumns columns={columns} divided={columnStyle === "divided"} headingStyle={headingStyle} />
        </div>
        {wordmarkPosition === "middle" && mark}
        <BottomBar
          copyright={copyright}
          legalLinks={legalLinks}
          socialLinks={socialPosition === "bottom" ? socialLinks : undefined}
          socialStyle={socialStyle}
          centered={centerBottomBar}
          divider={wordmarkPosition !== "middle" || !wordmark}
        />
        {wordmarkPosition === "bottom" && mark}
      </div>
    </div>
  );
}
