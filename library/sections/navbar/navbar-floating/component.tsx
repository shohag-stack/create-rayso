import { CtaButton } from "@/components/ui/CtaButton";
import { Brand } from "@/components/ui/nav/Brand";
import { MobileMenu } from "@/components/ui/nav/MobileMenu";
import { NavLinks } from "@/components/ui/nav/NavLinks";
import { NavShell } from "@/components/ui/nav/NavShell";
import type { NavbarFloatingData } from "@/types/sections/navbar-floating";

const tones = {
  light: "bg-surface-alt text-fg",
  dark: "bg-surface-inverse text-fg-inverse",
  accent: "bg-accent text-accent-fg",
};

export function NavbarFloatingSection({
  logo,
  brandName,
  links,
  rightLinks,
  ctas,
  layout = "logo-left",
  width = "compact",
  tone = "dark",
  shape = "pill",
  caps = false,
  position = "fixed",
}: NavbarFloatingData) {
  const centered = layout === "logo-center";
  const allLinks = [...(links ?? []), ...(rightLinks ?? [])];
  const brand = <Brand logo={logo} brandName={brandName} />;

  const end = (
    <div className="flex items-center justify-end gap-6">
      <NavLinks items={rightLinks} caps={caps} className="hidden lg:flex" />
      {ctas?.length ? (
        <div className="hidden items-center gap-2 sm:flex">
          {ctas.map((cta, i) => (
            <CtaButton key={cta._key ?? i} cta={cta} className={`px-5 py-2.5 ${shape === "pill" ? "rounded-full" : ""}`} />
          ))}
        </div>
      ) : null}
      <MobileMenu items={allLinks} ctas={ctas} className="lg:hidden" />
    </div>
  );

  return (
    <NavShell position={position} className="px-3 pt-3 md:px-6 md:pt-5">
      <nav
        aria-label="Main"
        className={`relative mx-auto min-h-16 py-2.5 shadow-sm ${tones[tone]} ${shape === "pill" ? "rounded-full pr-2.5 pl-6" : "rounded-card px-6"} ${
          width === "wide" ? "w-full" : "w-full lg:w-fit"
        } ${centered ? "grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-16" : "flex items-center gap-6 lg:gap-12"}`}
      >
        {centered ? (
          <>
            <div>
              <NavLinks items={links} caps={caps} className="hidden lg:flex" />
            </div>
            {brand}
            {end}
          </>
        ) : (
          <>
            {brand}
            <NavLinks items={links} caps={caps} className="hidden lg:ml-8 lg:flex" />
            <div className="ml-auto">{end}</div>
          </>
        )}
      </nav>
    </NavShell>
  );
}
