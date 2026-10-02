import Image from "next/image";
import { tint } from "@/components/ui/tint";
import type { BrandLogo, Tint } from "@/types/sanity";
import { brandLogoSource } from "./BrandMark";

const tints: Tint[] = ["soft", "accent", "dark", "alt"];

// A logo filling a round or square badge (app-icon style). Without a logo: the name's first letter on a theme colour.
export function BrandBadge({ brand, index = 0, className = "", textClassName = "", sizes = "160px" }: { brand: BrandLogo; index?: number; className?: string; textClassName?: string; sizes?: string }) {
  const { src, unoptimized } = brandLogoSource(brand, 400);
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden ${src ? "bg-surface-alt" : tint[tints[index % tints.length]]} ${className}`}>
      {src ? (
        <Image src={src} alt={brand.logo?.alt || brand.name} fill sizes={sizes} unoptimized={unoptimized} className="object-cover" />
      ) : (
        <span aria-hidden className={`font-heading leading-none font-bold ${textClassName}`}>
          {brand.name.charAt(0)}
        </span>
      )}
    </span>
  );
}
