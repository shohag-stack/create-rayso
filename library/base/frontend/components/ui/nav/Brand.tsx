import Image from "next/image";
import Link from "next/link";
import { imageSrc } from "@/(core)/sanity/lib/image";
import type { SanityImage } from "@/types/sanity";

// The logo, or the brand name as text, linking home
export function Brand({
  logo,
  brandName,
  spaced = false,
  className = "",
}: {
  logo?: SanityImage;
  brandName?: string;
  spaced?: boolean;
  className?: string;
}) {
  const src = imageSrc(logo, 400);
  if (!src && !brandName) return null;
  return (
    <Link href="/" className={`flex shrink-0 items-center ${className}`} aria-label={brandName ? `${brandName}, home` : "Home"}>
      {src ? (
        <Image src={src} alt={logo?.alt ?? brandName ?? ""} width={200} height={60} className="h-7 w-auto object-contain md:h-8" priority />
      ) : (
        <span className={`font-heading text-xl leading-none md:text-2xl ${spaced ? "tracking-[0.25em] uppercase" : ""}`}>{brandName}</span>
      )}
    </Link>
  );
}
