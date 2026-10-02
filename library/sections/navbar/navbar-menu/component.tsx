import { CtaButton } from "@/components/ui/CtaButton";
import { FooterLink, InlineLinks } from "@/components/ui/footer/FooterLink";
import { Brand } from "@/components/ui/nav/Brand";
import { MenuPanel } from "@/components/ui/nav/MenuPanel";
import { NavShell } from "@/components/ui/nav/NavShell";
import type { Cta, NavItem } from "@/types/sanity";
import type { NavbarMenuData } from "@/types/sections/navbar-menu";

const tones = {
  light: "bg-surface-alt text-fg",
  dark: "bg-surface-inverse text-fg-inverse",
};

// Big links with dividers, then the panel buttons
function PanelContent({ links, ctas }: { links?: NavItem[]; ctas?: Cta[] }) {
  return (
    <>
      <ul className="divide-y divide-current/10 border-t border-current/10">
        {links?.map((item, i) => (
          <li key={item._key ?? i} className="px-6 py-4 text-xl md:px-10 md:text-2xl">
            {item._type === "navGroup" ? (
              <>
                <p className="mb-2 text-sm opacity-60">{item.label}</p>
                <InlineLinks links={item.links} className="text-lg" />
              </>
            ) : (
              <FooterLink item={item} className="block" />
            )}
          </li>
        ))}
      </ul>
      {ctas?.length ? (
        <div className="grid grid-cols-2 gap-2 border-t border-current/10 p-3 md:p-4">
          {ctas.map((cta, i) => (
            <CtaButton key={cta._key ?? i} cta={cta} className={`py-4 ${ctas.length % 2 === 1 && i === 0 ? "col-span-2" : ""}`} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export function NavbarMenuSection({
  menuColor = "light",
  logo,
  brandName,
  label,
  note,
  quickLinks,
  barCta,
  links,
  ctas,
  menuLabel,
  layout = "centered",
  tone = "dark",
  spacedBrandName = false,
  position = "fixed",
}: NavbarMenuData) {
  const brand = <Brand logo={logo} brandName={brandName} spaced={spacedBrandName} />;
  const button = barCta && <CtaButton cta={barCta} className="hidden px-6 py-3 lg:inline-flex" />;

  if (layout === "bar") {
    return (
      <NavShell position={position}>
        <nav
          aria-label="Main"
          className={`relative flex h-[var(--spacing-navbar)] items-center gap-8 px-4 md:px-8 ${menuColor === "light" ? "text-on-media" : "text-fg"}`}
        >
          {brand}
          {label && <p className="hidden text-sm opacity-80 lg:block">{label}</p>}
          <div className="ml-auto flex items-center gap-8">
            {note && <p className="hidden opacity-90 xl:block">{note}</p>}
            <InlineLinks links={quickLinks} className="hidden sm:flex" />
            {button}
            <MenuPanel
              label={menuLabel}
              panelClassName={`absolute top-full right-3 w-[min(28rem,calc(100vw-1.5rem))] overflow-hidden rounded-card shadow-xl ${tones[tone]}`}
            >
              <PanelContent links={links} ctas={ctas} />
            </MenuPanel>
          </div>
        </nav>
      </NavShell>
    );
  }

  return (
    <NavShell position={position} className="px-3 pt-3 md:pt-5">
      <nav aria-label="Main" className={`relative mx-auto w-full max-w-xl rounded-card shadow-xl ${tones[tone]}`}>
        <div className="flex h-16 items-center gap-6 pr-20 pl-6">
          {brand}
          {label && <p className="mx-auto hidden text-xs tracking-[0.15em] uppercase sm:block">{label}</p>}
        </div>
        <MenuPanel label={menuLabel} icon="plus" buttonClassName="absolute top-0 right-0 h-16 px-6" panelClassName="max-h-[75svh] overflow-y-auto">
          <PanelContent links={links} ctas={ctas} />
        </MenuPanel>
      </nav>
      {barCta && <div className="absolute top-5 right-6">{button}</div>}
    </NavShell>
  );
}
