import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import type { HeroCenteredProductData } from "@/types/sections/hero-centered-product";

export function HeroCenteredProductSection({ eyebrow, heading, body, ctas, productImage, backdrop, tone = "dark" }: HeroCenteredProductData) {
  const dark = tone === "dark";
  const productSrc = imageSrc(productImage, 2400);
  const backdropSrc = imageSrc(backdrop, 2400);
  const dims = productImage?.asset?.metadata?.dimensions;

  return (
    <div className={`relative overflow-hidden ${dark ? "bg-surface-inverse text-fg-inverse" : "bg-surface text-fg"}`}>
      <div className="container-site relative flex flex-col items-center pt-[calc(var(--spacing-navbar)+3rem)] text-center md:pt-[calc(var(--spacing-navbar)+5rem)]">
        {eyebrow && <p className={`eyebrow mb-6 ${dark ? "text-fg-inverse/60" : "text-fg-muted"}`}>{eyebrow}</p>}

        <h1 className={`max-w-4xl text-4xl leading-[1.05] tracking-tight whitespace-pre-line md:text-6xl lg:text-7xl ${dark ? "text-fg-inverse" : ""}`}>
          {heading}
        </h1>

        {body && (
          <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${dark ? "text-fg-inverse/70" : "text-fg-muted"}`}>{body}</p>
        )}

        {ctas?.length ? (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ctas.map((cta, i) => (
              <CtaButton key={cta._key ?? i} cta={cta} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative mt-16 pb-16 md:mt-20 md:pb-24">
        {backdropSrc && (
          <div className="absolute inset-x-0 top-1/3 bottom-0">
            <Image
              src={backdropSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition(backdrop) }}
            />
            <div className={`absolute inset-0 bg-linear-to-b ${dark ? "from-surface-inverse" : "from-surface"} via-transparent to-transparent`} />
          </div>
        )}

        {productSrc && (
          <div className="container-site relative">
            <div
              className={`mx-auto max-w-5xl overflow-hidden rounded-card border p-1.5 shadow-2xl md:p-2 ${
                dark ? "border-fg-inverse/10 bg-fg-inverse/5" : "border-border bg-surface-alt"
              }`}
            >
              <Image
                src={productSrc}
                alt={productImage?.alt ?? ""}
                width={dims?.width ?? 2400}
                height={dims?.height ?? 1500}
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                className="h-auto w-full rounded-[calc(var(--radius-card)*0.75)]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
