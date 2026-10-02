import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getPageSlugs } from "@/(core)/fetch/page";
import { isDemo } from "@/(core)/demo";
import { isSanityConfigured } from "@/(core)/sanity/lib/client";
import { PageRenderer } from "@/components/layout/PageRenderer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (!isSanityConfigured && !isDemo) return [];
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured && !isDemo) return {};
  const page = await getPageBySlug((await params).slug);
  return { title: page?.seo?.title ?? page?.title, description: page?.seo?.description };
}

export default async function Page({ params }: Props) {
  if (!isSanityConfigured && !isDemo) notFound();
  const page = await getPageBySlug((await params).slug);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
