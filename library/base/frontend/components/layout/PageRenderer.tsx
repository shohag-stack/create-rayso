import { SectionRenderer } from "@/components/sections/SectionRenderer";
import type { PageData } from "@/types";

// Shared page renderer: every page (home, [slug], listing pages) goes through it
export function PageRenderer({ page }: { page: PageData }) {
  return (
    <main>
      <SectionRenderer sections={page.sections ?? []} />
    </main>
  );
}
