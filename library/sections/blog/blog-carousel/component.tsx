import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { linkHref, linkTarget } from "@/(core)/lib/link";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { Carousel } from "@/components/ui/Carousel";
import { sectionTone } from "@/components/ui/sectionTone";
import { postHref, type PostData } from "@/types/documents/post";
import type { BlogCarouselData } from "@/types/sections/blog-carousel";

export function BlogCarouselSection({ heading, viewAll, posts, tone = "page" }: BlogCarouselData) {
  const items = (posts ?? []).filter((p): p is PostData => Boolean(p));
  if (!items.length) return null;
  const viewAllHref = linkHref(viewAll?.link);

  return (
    <div className={`overflow-hidden ${sectionTone[tone]}`}>
      <Carousel
        label={heading ?? "Latest posts"}
        arrows="header"
        header={
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {heading && <h2 className="text-3xl tracking-tight text-inherit md:text-4xl">{heading}</h2>}
            {viewAll && viewAllHref && (
              <Link href={viewAllHref} {...linkTarget(viewAll.link)} className="eyebrow inline-flex items-center gap-2 font-normal opacity-60 transition-opacity hover:opacity-100">
                {viewAll.label}
                <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            )}
          </div>
        }
      >
        {items.map((post) => {
          const href = postHref(post);
          const src = imageSrc(post.cover, 1000);
          const card = (
            <>
              {src && (
                <Image
                  src={src}
                  alt={post.cover?.alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 85vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                  style={{ objectPosition: imagePosition(post.cover) }}
                />
              )}
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-surface-inverse/80 via-surface-inverse/10 to-surface-inverse/30" />
              <div className="relative flex h-full flex-col justify-between p-7 text-fg-inverse md:p-10">
                {post.category ? <p className="eyebrow font-normal">{post.category}</p> : <span />}
                <h3 className="text-2xl leading-tight text-inherit md:text-3xl">{post.title}</h3>
              </div>
            </>
          );
          const cls = "group relative block aspect-4/5 w-[85vw] shrink-0 snap-start overflow-hidden rounded-card bg-surface-inverse sm:w-[60vw] md:w-[45vw] lg:w-[calc((min(100vw,80rem)-4rem-2rem)/3)]";
          return href ? (
            <Link key={post._id} href={href} className={cls}>
              {card}
            </Link>
          ) : (
            <div key={post._id} className={cls}>
              {card}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
