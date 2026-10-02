import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, getWorkSlugs } from "@/(core)/fetch/documents/work";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { PageShell } from "@/components/layout/PageRenderer";
import { ArticleBody } from "@/components/ui/ArticleBody";
import { workHref } from "@/types/documents/work";

// A project's own page: /works/<slug>
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getWorkSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await getWork((await params).slug);
  return work ? { title: work.title, description: work.excerpt } : {};
}

export default async function WorkPage({ params }: Props) {
  const work = await getWork((await params).slug);
  if (!work) notFound();
  const cover = imageSrc(work.cover, 2400);
  const facts = [
    { label: "Client", value: work.client },
    { label: "Year", value: work.year },
    { label: "Services", value: work.services?.join(", ") },
  ].filter((f) => f.value);
  const next = work.next;
  const nextHref = next ? workHref(next) : undefined;

  return (
    <PageShell>
      <article className="text-fg">
        <header className="container-site grid gap-10 pt-16 pb-12 md:grid-cols-12 md:pt-24 md:pb-16">
          <div className="md:col-span-7">
            <p className="eyebrow flex gap-3 font-normal">
              <Link href="/works" className="opacity-60 transition-opacity hover:opacity-100">Works</Link>
              {work.category && <span className="text-accent">{work.category}</span>}
            </p>
            <h1 className="mt-6 text-5xl leading-none tracking-tight md:text-7xl">{work.title}</h1>
            {work.excerpt && <p className="mt-8 max-w-xl text-lg opacity-70 md:text-xl">{work.excerpt}</p>}
          </div>
          {facts.length > 0 && (
            <dl className="grid content-end gap-6 sm:grid-cols-3 md:col-span-5 md:grid-cols-1">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-border pt-4">
                  <dt className="eyebrow font-normal opacity-60">{f.label}</dt>
                  <dd className="mt-2">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>
        {cover && (
          <div className="relative aspect-4/3 overflow-hidden bg-surface-alt md:aspect-video">
            <Image src={cover} alt={work.cover?.alt ?? ""} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: imagePosition(work.cover) }} />
          </div>
        )}
        <ArticleBody value={work.body} className="container-site max-w-3xl py-16 md:py-24" />
        {work.gallery?.length ? (
          <div className="container-site grid gap-4 pb-16 sm:grid-cols-2 md:gap-6 md:pb-24">
            {work.gallery.map((image, i) => {
              const src = imageSrc(image, 1400);
              if (!src) return null;
              const wide = work.gallery!.length % 2 === 1 && i === 0;
              return (
                <div key={i} className={`relative overflow-hidden rounded-card bg-surface-alt ${wide ? "aspect-video sm:col-span-2" : "aspect-4/5"}`}>
                  <Image src={src} alt={image.alt ?? ""} fill sizes={wide ? "100vw" : "(min-width: 640px) 50vw, 100vw"} className="object-cover" style={{ objectPosition: imagePosition(image) }} />
                </div>
              );
            })}
          </div>
        ) : null}
      </article>

      {next && nextHref && (
        <Link href={nextHref} className="group block border-t border-border text-fg">
          <div className="container-site flex items-end justify-between gap-6 py-16 md:py-24">
            <div>
              <p className="eyebrow font-normal opacity-60">Next project</p>
              <p className="mt-4 font-heading text-4xl leading-none tracking-tight md:text-6xl">{next.title}</p>
            </div>
            <ArrowRight aria-hidden className="size-8 shrink-0 transition-transform group-hover:translate-x-2 md:size-12" />
          </div>
        </Link>
      )}
    </PageShell>
  );
}
