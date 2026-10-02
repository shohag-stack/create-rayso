import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import type { SanityImage, SanityVideo } from "@/types/sanity";

// Full-size photo or looping video behind a section; the photo doubles as the video poster
export function BackgroundMedia({
  image,
  video,
  priority = true,
  className = "",
}: {
  image?: SanityImage;
  video?: SanityVideo;
  priority?: boolean;
  className?: string;
}) {
  const src = imageSrc(image, 2400);
  const videoUrl = video?.asset?.url;

  if (videoUrl) {
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{ objectPosition: imagePosition(image) }}
        src={videoUrl}
        poster={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
    );
  }

  if (!src) return null;
  return (
    <Image
      src={src}
      alt={image?.alt ?? ""}
      fill
      priority={priority}
      sizes="100vw"
      className={`object-cover ${className}`}
      style={{ objectPosition: imagePosition(image) }}
      placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image?.asset?.metadata?.lqip}
    />
  );
}
