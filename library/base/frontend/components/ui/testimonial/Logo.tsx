import Image from "next/image";
import { imageSrc } from "@/(core)/sanity/lib/image";
import type { SanityImage } from "@/types/sanity";

// A company logo at a fixed height
export function Logo({ logo, className = "" }: { logo?: SanityImage; className?: string }) {
  const src = imageSrc(logo, 300);
  if (!src) return null;
  return <Image src={src} alt={logo?.alt ?? ""} width={160} height={48} className={`h-7 w-auto object-contain object-left ${className}`} />;
}
