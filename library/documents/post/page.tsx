import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/(core)/fetch/documents/post";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { PageShell } from "@/components/layout/PageRenderer";
import { ArticleBody } from "@/components/ui/ArticleBody";
import { formatPostDate, postHref } from "@/types/documents/post";

// A blog post's own page: /blog/<slug>
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const cover = imageSrc(post.cover, 2000);
  const avatar = imageSrc(post.author?.photo, 120);
  const date = formatPostDate(post.publishedAt);

  return (
    <PageShell>
      <article className="text-fg">
        <header className="container-site max-w-4xl pt-16 pb-10 text-center md:pt-24">
          <p className="eyebrow flex justify-center gap-3 font-normal">
            <Link href="/blog" className="opacity-60 transition-opacity hover:opacity-100">Blog</Link>
            {post.category && <span className="text-accent">{post.category}</span>}
            {date && <span className="opacity-60">{date}</span>}
          </p>
          <h1 className="mt-6 text-4xl leading-tight tracking-tight text-balance md:text-6xl">{post.title}</h1>
          {post.excerpt && <p className="mx-auto mt-6 max-w-2xl text-lg opacity-70 md:text-xl">{post.excerpt}</p>}
          {post.author?.name && (
            <p className="mt-8 flex items-center justify-center gap-3 text-sm">
              {avatar && <Image src={avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />}
              {post.author.name}
            </p>
          )}
        </header>
        {cover && (
          <div className="container-site">
            <div className="relative aspect-video overflow-hidden rounded-card bg-surface-alt">
              <Image src={cover} alt={post.cover?.alt ?? ""} fill priority sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover" style={{ objectPosition: imagePosition(post.cover) }} />
            </div>
          </div>
        )}
        <ArticleBody value={post.body} className="container-site max-w-3xl py-16 md:py-24" />
      </article>

      {post.more?.length ? (
        <aside className="border-t border-border text-fg">
          <div className="container-site py-16 md:py-24">
            <div className="mb-10 flex items-baseline justify-between gap-6">
              <h2 className="text-3xl md:text-4xl">Keep reading</h2>
              <Link href="/blog" className="eyebrow font-normal opacity-60 transition-opacity hover:opacity-100">All posts</Link>
            </div>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
              {post.more.map((p) => {
                const href = postHref(p) ?? "/blog";
                const src = imageSrc(p.cover, 900);
                return (
                  <Link key={p._id} href={href} className="group">
                    <div className="relative aspect-3/2 overflow-hidden rounded-card bg-surface-alt">
                      {src && <Image src={src} alt={p.cover?.alt ?? ""} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
                    </div>
                    {p.category && <p className="eyebrow mt-5 font-normal text-accent">{p.category}</p>}
                    <h3 className="mt-2 text-xl leading-snug">{p.title}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      ) : null}
    </PageShell>
  );
}
