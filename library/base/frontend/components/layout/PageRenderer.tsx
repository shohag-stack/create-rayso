import { getSiteSettings } from "@/(core)/fetch/siteSettings";
import { SectionRenderer, pageTopTypes } from "@/components/sections/SectionRenderer";
import type { PageData, PageSection } from "@/types";
import type { MenuColor } from "@/types/sanity";

// The menu from Site settings, with the page's menu text colour, above the page's content.
// The menu overlays the page, so content that doesn't open with a hero starts below it.
export async function PageShell({ menuColor = "dark", clearMenu = true, children }: { menuColor?: MenuColor; clearMenu?: boolean; children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const navbar = (settings?.navbar ?? []).map((section) => ({ ...section, menuColor }) as PageSection);

  return (
    <>
      {navbar.length ? <SectionRenderer sections={navbar} as="header" /> : null}
      <main className={navbar.length && clearMenu ? "pt-[var(--spacing-navbar)]" : undefined}>{children}</main>
    </>
  );
}

// Shared page renderer: every page (home, [slug], listing pages) goes through it
export async function PageRenderer({ page }: { page: PageData }) {
  const sections = page.sections ?? [];
  return (
    <PageShell menuColor={page.menuColor ?? "dark"} clearMenu={sections.length > 0 && !pageTopTypes.includes(sections[0]._type)}>
      <SectionRenderer sections={sections} />
    </PageShell>
  );
}
