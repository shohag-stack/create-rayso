import { BackgroundMedia } from "@/components/ui/BackgroundMedia";
import { CtaButton } from "@/components/ui/CtaButton";
import type { HeroFullscreenImageData } from "@/types/sections/hero-fullscreen-image";

const overlays = {
  none: "",
  light: "from-black/10 via-black/0 to-black/40",
  medium: "from-black/30 via-black/15 to-black/60",
  strong: "from-black/50 via-black/35 to-black/80",
};

const headingSizes = {
  medium: "text-4xl md:text-6xl leading-[1.05]",
  large: "text-5xl md:text-7xl lg:text-8xl leading-[0.95]",
};

export function HeroFullscreenImageSection({
  eyebrow,
  heading,
  headingSize = "large",
  uppercaseHeading,
  body,
  bodySize = "small",
  ctas,
  highlights,
  image,
  video,
  contentPosition = "bottom",
  overlay = "medium",
  showScrollHint,
}: HeroFullscreenImageData) {
  const atTop = contentPosition === "top";

  return (
    <div className="relative min-h-[640px] w-full overflow-hidden bg-surface-inverse md:h-svh">
      <BackgroundMedia image={image} video={video} />
      {overlay !== "none" && <div className={`absolute inset-0 bg-linear-to-b ${overlays[overlay]}`} />}

      <div
        className={`container-site relative flex min-h-[640px] flex-col gap-12 md:h-full lg:flex-row lg:justify-between ${
          atTop ? "pt-[calc(var(--spacing-navbar)+3rem)] pb-16" : "justify-end pt-32 pb-16 md:pb-20 lg:items-end"
        }`}
      >
        <div className={`text-on-media ${bodySize === "large" ? "max-w-3xl" : "max-w-2xl"}`}>
          {eyebrow && <p className="mb-6 text-xs tracking-[0.3em] text-on-media/70 uppercase">{eyebrow}</p>}

          <h1
            className={`tracking-tight whitespace-pre-line text-on-media ${headingSizes[headingSize]} ${
              uppercaseHeading ? "uppercase" : ""
            }`}
          >
            {heading}
          </h1>

          {atTop && showScrollHint && (
            <div aria-hidden className="mt-8 flex h-24 w-3 flex-col items-center">
              <div className="w-px flex-1 bg-on-media/70" />
              <div className="size-2 -translate-y-1 rotate-45 border-r border-b border-on-media/70" />
            </div>
          )}

          {body && (
            <p
              className={`mt-8 max-w-xl text-on-media/80 ${
                bodySize === "large" ? "text-2xl leading-snug md:text-4xl" : "text-base leading-relaxed"
              }`}
            >
              {body}
            </p>
          )}

          {ctas?.length ? (
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              {ctas.map((cta, i) => (
                <CtaButton key={cta._key ?? i} cta={cta} />
              ))}
            </div>
          ) : null}
        </div>

        {highlights?.length ? (
          <ul className={`flex w-full max-w-sm flex-col gap-2 ${atTop ? "lg:mt-auto lg:mb-[20vh]" : ""}`}>
            {highlights.map((item) => (
              <li
                key={item._key}
                className="flex items-baseline gap-3 rounded-card border border-on-media/15 bg-on-media-fg/35 px-4 py-3 text-on-media shadow-lg backdrop-blur-md"
              >
                {item.label && (
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-on-media/70">
                    <span aria-hidden className="size-1.5 rounded-full bg-status-good" />
                    {item.label}
                  </span>
                )}
                <span className="text-sm font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {showScrollHint && !atTop && (
        <div aria-hidden className="absolute right-6 bottom-8 hidden flex-col items-center gap-2 md:flex">
          <span className="text-[10px] tracking-[0.25em] text-on-media/40 uppercase [writing-mode:vertical-rl]">Scroll</span>
          <div className="relative h-12 w-px overflow-hidden bg-on-media/20">
            <div className="absolute top-0 left-0 h-2/5 w-full animate-scroll-line bg-on-media/60 motion-reduce:animate-none" />
          </div>
        </div>
      )}
    </div>
  );
}
