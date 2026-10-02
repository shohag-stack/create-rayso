import { CtaButton } from "@/components/ui/CtaButton";
import { Brand } from "@/components/ui/nav/Brand";
import { MobileMenu } from "@/components/ui/nav/MobileMenu";
import { NavLinks } from "@/components/ui/nav/NavLinks";
import { NavShell } from "@/components/ui/nav/NavShell";
import type { NavbarBarData } from "@/types/sections/navbar-bar";

// Turns solid once a fixed menu scrolls over the page
const scrolled =
  "group-data-[scrolled=true]/nav:bg-surface/90 group-data-[scrolled=true]/nav:text-fg group-data-[scrolled=true]/nav:shadow-sm group-data-[scrolled=true]/nav:backdrop-blur-md";

export function NavbarBarSection({
  menuColor = "light",
  logo,
  brandName,
  badge,
  links,
  note,
  ctas,
  linkAlign = "center",
  linkStyle = "plain",
  spacedBrandName = false,
  position = "fixed",
}: NavbarBarData) {
  return (
    <NavShell position={position}>
      <nav
        aria-label="Main"
        className={`relative flex h-[var(--spacing-navbar)] items-center gap-6 px-4 transition-colors duration-300 md:px-8 ${
          menuColor === "light" ? "text-on-media" : "text-fg"
        } ${scrolled}`}
      >
        <div className="flex items-center gap-4">
          <Brand logo={logo} brandName={brandName} spaced={spacedBrandName} />
          {badge && <span className="hidden rounded-button bg-current/10 px-3 py-1.5 text-sm backdrop-blur-md md:inline">{badge}</span>}
        </div>

        <NavLinks
          items={links}
          style={linkStyle}
          className={`hidden lg:flex ${linkAlign === "center" ? "absolute left-1/2 -translate-x-1/2" : "ml-auto"}`}
        />

        <div className={`flex items-center gap-3 ${linkAlign === "center" ? "ml-auto" : ""}`}>
          {note && <p className="hidden text-sm opacity-80 xl:block">{note}</p>}
          {ctas?.map((cta, i) => (
            <CtaButton key={cta._key ?? i} cta={cta} className={`px-5 py-2.5 ${i < ctas.length - 1 ? "hidden md:inline-flex" : "hidden sm:inline-flex"}`} />
          ))}
          <MobileMenu items={links} ctas={ctas} className="lg:hidden" />
        </div>
      </nav>
    </NavShell>
  );
}
