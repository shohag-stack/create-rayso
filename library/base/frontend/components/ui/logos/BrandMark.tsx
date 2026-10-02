import Image from "next/image";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { imageSrc } from "@/(core)/sanity/lib/image";
import type { BrandLogo } from "@/types/sanity";

// Wordmark styles for logos without an image, taken in turn so a row of names looks like a row of logos
const wordmarks = [
  "font-heading font-semibold tracking-tight",
  "font-body font-semibold tracking-[0.2em] uppercase text-[0.75em]",
  "font-body font-bold italic tracking-tight",
  "font-heading font-normal",
  "font-body font-black tracking-tighter lowercase",
];

const isSvg = (url?: string) => Boolean(url && /\.svg($|\?)/i.test(url));

// SVGs are served as they are; other images go through the Sanity CDN and next/image
export function brandLogoSource(brand: BrandLogo, width = 400) {
  const url = brand.logo?.asset?.url;
  const svg = isSvg(url);
  return { src: svg ? url : imageSrc(brand.logo, width), unoptimized: svg };
}

// A company logo at a fixed height, or its name as a wordmark when no logo is uploaded.
// mono: draws every logo black (white with onDark) so mixed logos read as one set.
export function BrandMark({
  brand,
  mono = false,
  onDark = false,
  className = "h-8",
  textClassName = "text-xl",
  linked = true,
  index = 0,
}: {
  brand: BrandLogo;
  mono?: boolean;
  onDark?: boolean;
  className?: string;
  textClassName?: string;
  linked?: boolean;
  index?: number;
}) {
  const { src, unoptimized } = brandLogoSource(brand);
  const dims = brand.logo?.asset?.metadata?.dimensions;

  const mark = src ? (
    <Image
      src={src}
      alt={brand.logo?.alt || brand.name}
      width={dims?.width ?? 160}
      height={dims?.height ?? 48}
      unoptimized={unoptimized}
      className={`w-auto max-w-full object-contain ${mono ? (onDark ? "brightness-0 invert" : "brightness-0") : ""} ${className}`}
    />
  ) : (
    <span className={`leading-none whitespace-nowrap ${textClassName}`}>
      <span className={wordmarks[index % wordmarks.length]}>{brand.name}</span>
    </span>
  );

  const href = linked ? linkHref(brand.link) : undefined;
  if (!href) return mark;
  return (
    <Link href={href} {...linkTarget(brand.link)} className="transition-opacity hover:opacity-60" aria-label={brand.name}>
      {mark}
    </Link>
  );
}
