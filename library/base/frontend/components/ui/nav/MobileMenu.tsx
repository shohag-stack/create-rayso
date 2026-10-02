import { FooterLink } from "@/components/ui/footer/FooterLink";
import { CtaButton } from "@/components/ui/CtaButton";
import type { Cta, NavItem } from "@/types/sanity";
import { MenuPanel } from "./MenuPanel";

// The menu on small screens: a button that drops down every link and button
export function MobileMenu({ items, ctas, className = "" }: { items?: NavItem[]; ctas?: Cta[]; className?: string }) {
  if (!items?.length && !ctas?.length) return null;
  return (
    <MenuPanel
      className={className}
      panelClassName="absolute inset-x-3 top-full mt-2 max-h-[80svh] overflow-y-auto rounded-card bg-surface-alt p-6 text-fg shadow-xl"
    >
      <ul className="flex flex-col divide-y divide-border text-lg">
        {items?.map((item, i) =>
          item._type === "navGroup" ? (
            <li key={item._key ?? i} className="py-3">
              <p className="eyebrow mb-2 text-fg-muted">{item.label}</p>
              <ul className="flex flex-col gap-2">
                {item.links?.map((link, j) => (
                  <li key={link._key ?? j}>
                    <FooterLink item={link} />
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={item._key ?? i} className="py-3">
              <FooterLink item={item} className="block" />
            </li>
          )
        )}
      </ul>
      {ctas?.length ? (
        <div className="mt-6 flex flex-col gap-2">
          {ctas.map((cta, i) => (
            // Glass and light buttons are made for photos; on the panel the last button is the main one
            <CtaButton
              key={cta._key ?? i}
              cta={{ ...cta, style: cta.style === "glass" || cta.style === "light" ? (i === ctas.length - 1 ? "primary" : "secondary") : cta.style }}
            />
          ))}
        </div>
      ) : null}
    </MenuPanel>
  );
}
