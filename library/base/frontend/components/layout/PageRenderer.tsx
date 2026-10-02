import { getSiteSettings } from "@/(core)/fetch/siteSettings";
import { SectionRenderer, pageTopTypes } from "@/components/sections/SectionRenderer";
import type { PageData, PageSection } from "@/types";

// Shared page renderer: every page (home, [slug], listing pages) goes through it.
// The menu from Site settings gets the page's menu text colour.
export async function PageRenderer({ page }: { page: PageData }) {
  const settings = await getSiteSettings();
  const navbar = (settings?.navbar ?? []).map((section) => ({ ...section, menuColor: page.menuColor ?? "dark" }) as PageSection);

  const sections = page.sections ?? [];
  // The menu overlays the page, so a page that doesn't open with a hero starts below it
  const clearMenu = navbar.length > 0 && sections.length > 0 && !pageTopTypes.includes(sections[0]._type);

  return (
    <>
      {navbar.length ? <SectionRenderer sections={navbar} as="header" /> : null}
      <main className={clearMenu ? "pt-[var(--spacing-navbar)]" : undefined}>
        <SectionRenderer sections={sections} />
      </main>
    </>
  );
}
