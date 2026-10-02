import { Sparkle } from "lucide-react";
import Image from "next/image";
import { linkHref } from "@/(core)/lib/link";
import { imageSrc } from "@/(core)/sanity/lib/image";
import { BackgroundMedia } from "@/components/ui/BackgroundMedia";
import { CtaButton } from "@/components/ui/CtaButton";
import type { HeroCenteredImageData } from "@/types/sections/hero-centered-image";

const overlays = {
  none: "",
  light: "bg-black/15",
  medium: "bg-black/35",
  strong: "bg-black/55",
};

const headingSizes = {
  medium: "text-4xl md:text-6xl",
  large: "text-5xl md:text-7xl lg:text-8xl",
};

export function HeroCenteredImageSection({
  mark,
  heading,
  headingAccent,
  headingSize = "large",
  body,
  note,
  ctas,
  emailCapture,
  image,
  video,
  frame = "full",
  overlay = "light",
}: HeroCenteredImageData) {
  const inset = frame === "inset";
  const markSrc = imageSrc(mark, 160);
  const emailAction = emailCapture ? linkHref(emailCapture.link) : undefined;

  return (
    <div className={inset ? "bg-surface-inverse px-3 pt-[var(--spacing-navbar)] pb-3 md:px-6 md:pb-6" : ""}>
      <div
        className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-surface-inverse px-4 text-center text-on-media ${
          inset ? "min-h-[calc(100svh-var(--spacing-navbar)-1.5rem)] rounded-card" : "min-h-svh pt-[var(--spacing-navbar)]"
        }`}
      >
        <BackgroundMedia image={image} video={video} />
        {overlay !== "none" && <div className={`absolute inset-0 ${overlays[overlay]}`} />}

        <div className="relative flex max-w-4xl flex-col items-center py-24">
          {markSrc && (
            <Image src={markSrc} alt={mark?.alt ?? ""} width={64} height={64} className="mb-6 size-12 object-contain md:size-16" />
          )}

          <h1 className={`leading-[1.05] tracking-tight whitespace-pre-line text-on-media ${headingSizes[headingSize]}`}>
            {heading}
            {headingAccent && <em className="block">{headingAccent}</em>}
          </h1>

          {body && <p className="mt-8 max-w-xl text-base leading-relaxed text-on-media/85 md:text-lg">{body}</p>}

          {note && (
            <p className="mt-4 flex items-center gap-2 text-sm text-on-media/70 md:text-base">
              <Sparkle aria-hidden className="size-4" />
              {note}
            </p>
          )}

          {ctas?.length ? (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {ctas.map((cta, i) => (
                <CtaButton key={cta._key ?? i} cta={cta} />
              ))}
            </div>
          ) : null}
        </div>

        {emailAction && (
          <form
            action={emailAction}
            method="get"
            className="relative mb-10 flex w-full max-w-md items-center gap-2 rounded-button border border-on-media/20 bg-on-media/15 p-1.5 backdrop-blur-md md:absolute md:bottom-8 md:mb-0"
          >
            <label htmlFor="hero-email" className="sr-only">
              {emailCapture?.placeholder ?? "Your email"}
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              required
              placeholder={emailCapture?.placeholder ?? "Your email"}
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-on-media outline-none placeholder:text-on-media/60"
            />
            <button type="submit" className="btn btn-light shrink-0 px-6">
              {emailCapture?.buttonLabel ?? "Get started"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
