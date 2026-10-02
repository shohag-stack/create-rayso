import Image from "next/image";
import Link from "next/link";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { sectionTone } from "@/components/ui/sectionTone";
import { formatPostDate, postHref, type PostData } from "@/types/documents/post";
import type { BlogCardsData } from "@/types/sections/blog-cards";

const aspect = { landscape: "aspect-3/2", wide: "aspect-16/9", tall: "aspect-4/5" };

export function BlogCardsSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  posts,
  picked,
  limit = 3,
  align = "center",
  divider = false,
  imageShape = "landscape",
  imageBorder = false,
  showMeta = false,
  showExcerpt = false,
  showAuthor = false,
  cta,
  tone = "page",
}: BlogCardsData) {
  const items = (posts ?? []).filter((p): p is PostData => Boolean(p)).slice(0, picked === false ? limit : undefined);
  if (!items.length) return null;
  const centered = align === "center";

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        <div className={`${divider ? "border-t border-current/30 pt-10" : ""} ${centered ? "text-center" : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"}`}>
          <div className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
            {eyebrow && <p className="eyebrow mb-6 inline-block rounded-button border border-current/60 px-2.5 py-1 font-normal">{eyebrow}</p>}
            {heading && (
              <h2 className="text-4xl leading-[1.05] tracking-tight whitespace-pre-line text-inherit md:text-6xl">
                {heading}
                {headingAccent && <span className="text-accent"> {headingAccent}</span>}
              </h2>
            )}
            {body && <p className="mt-5 text-lg leading-relaxed opacity-75">{body}</p>}
          </div>
          {!centered && cta && <CtaButton cta={cta} className="self-start md:self-auto" />}
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {items.map((post) => {
            const href = postHref(post);
            const src = imageSrc(post.cover, 1000);
            const date = formatPostDate(post.publishedAt);
            const card = (
              <>
                {src && (
                  <div className={`relative overflow-hidden rounded-card ${aspect[imageShape]} ${imageBorder ? "border border-current/20" : ""}`}>
                    <Image
                      src={src}
                      alt={post.cover?.alt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
                      style={{ objectPosition: imagePosition(post.cover) }}
                    />
                  </div>
                )}
                <div className="mt-6 flex flex-1 flex-col px-1">
                  {showMeta && (post.category || date) && (
                    <p className="eyebrow mb-4 flex justify-between gap-4 font-normal">
                      <span className="text-accent">{post.category}</span>
                      {date && <time dateTime={post.publishedAt} className="opacity-60">{date}</time>}
                    </p>
                  )}
                  <h3 className="text-xl leading-snug text-inherit md:text-2xl">{post.title}</h3>
                  {showExcerpt && post.excerpt && <p className="mt-5 line-clamp-2 leading-relaxed opacity-60">{post.excerpt}</p>}
                  {showAuthor && post.author?.name && (
                    <p className="mt-auto flex items-center gap-3 pt-8 opacity-70">
                      {post.author.photo?.asset && (
                        <Image src={imageSrc(post.author.photo, 80)!} alt="" width={24} height={24} className="size-6 rounded-full object-cover" />
                      )}
                      {post.author.name}
                    </p>
                  )}
                </div>
              </>
            );
            return (
              <li key={post._id} className="flex">
                {href ? (
                  <Link href={href} className="group flex w-full flex-col">
                    {card}
                  </Link>
                ) : (
                  <div className="flex w-full flex-col">{card}</div>
                )}
              </li>
            );
          })}
        </ul>

        {centered && cta && (
          <div className="mt-14 flex justify-center md:mt-20">
            <CtaButton cta={cta} />
          </div>
        )}
      </div>
    </div>
  );
}
