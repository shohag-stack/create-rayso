import { getSiteSettings } from "@/(core)/fetch/siteSettings";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import type { PageData, PageSection } from "@/types";

// Shared page renderer: every page (home, [slug], listing pages) goes through it.
// The menu from Site settings gets the page's menu text colour.
export async function PageRenderer({ page }: { page: PageData }) {
  const settings = await getSiteSettings();
  const navbar = (settings?.navbar ?? []).map((section) => ({ ...section, menuColor: page.menuColor ?? "dark" }) as PageSection);

  return (
    <>
      {navbar.length ? <SectionRenderer sections={navbar} as="header" /> : null}
      <main>
        <SectionRenderer sections={page.sections ?? []} />
      </main>
    </>
  );
}
