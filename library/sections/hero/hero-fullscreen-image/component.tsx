import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import type { HeroFullscreenImageData } from "@/types/sections/hero-fullscreen-image";

const overlays = {
  light: "from-black/10 via-black/0 to-black/40",
  medium: "from-black/30 via-black/15 to-black/60",
  strong: "from-black/50 via-black/35 to-black/80",
};

export function HeroFullscreenImageSection({
  eyebrow,
  heading,
  body,
  ctas,
  image,
  overlay = "medium",
  showScrollHint,
}: HeroFullscreenImageData) {
  const src = imageSrc(image, 2400);

  return (
    <div className="relative h-svh min-h-[560px] w-full overflow-hidden bg-surface-inverse">
      {src && (
        <Image
          src={src}
          alt={image?.alt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition(image) }}
          placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={image?.asset?.metadata?.lqip}
        />
      )}
      <div className={`absolute inset-0 bg-linear-to-b ${overlays[overlay]}`} />

      <div className="container-site absolute inset-x-0 bottom-0 pb-16 md:pb-20">
        <div className="max-w-2xl text-fg-inverse">
          {eyebrow && <p className="mb-6 text-xs tracking-[0.3em] text-fg-inverse/70 uppercase">{eyebrow}</p>}

          <h1 className="mb-8 text-5xl leading-[0.95] tracking-tight whitespace-pre-line text-fg-inverse uppercase md:text-7xl lg:text-8xl">
            {heading}
          </h1>

          {(body || ctas?.length) && (
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              {body && <p className="max-w-sm text-sm leading-relaxed text-fg-inverse/70">{body}</p>}
              {ctas?.length ? (
                <div className="flex shrink-0 flex-wrap gap-3">
                  {ctas.map((cta, i) => (
                    <CtaButton key={cta._key ?? i} cta={cta} />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {showScrollHint && (
        <div aria-hidden className="absolute right-6 bottom-8 hidden flex-col items-center gap-2 md:flex">
          <span className="text-[10px] tracking-[0.25em] text-fg-inverse/40 uppercase [writing-mode:vertical-rl]">Scroll</span>
          <div className="relative h-12 w-px overflow-hidden bg-fg-inverse/20">
            <div className="absolute top-0 left-0 h-2/5 w-full animate-scroll-line bg-fg-inverse/60 motion-reduce:animate-none" />
          </div>
        </div>
      )}
    </div>
  );
}
