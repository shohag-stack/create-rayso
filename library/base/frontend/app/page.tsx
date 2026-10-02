import type { Metadata } from "next";
import { getPage } from "@/(core)/fetch/page";
import { isDemo } from "@/(core)/demo";
import { isSanityConfigured } from "@/(core)/sanity/lib/client";
import { PageRenderer } from "@/components/layout/PageRenderer";
import { SetupNotice } from "@/components/layout/SetupNotice";

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured && !isDemo) return {};
  const page = await getPage("home");
  return { title: page?.seo?.title ?? page?.title, description: page?.seo?.description };
}

export default async function Home() {
  if (!isSanityConfigured && !isDemo) return <SetupNotice />;
  const page = await getPage("home");
  if (!page) return <SetupNotice reason="no-home" />;
  return <PageRenderer page={page} />;
}
