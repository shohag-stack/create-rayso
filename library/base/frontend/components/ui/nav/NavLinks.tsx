import { ChevronDown } from "lucide-react";
import { FooterLink } from "@/components/ui/footer/FooterLink";
import type { NavItem } from "@/types/sanity";

// Desktop menu links. Groups open a dropdown on hover or keyboard focus;
// in the "pills" style they sit inline in a pill with their label in front.
export function NavLinks({
  items,
  style = "plain",
  caps = false,
  className = "",
}: {
  items?: NavItem[];
  style?: "plain" | "pills";
  caps?: boolean;
  className?: string;
}) {
  if (!items?.length) return null;
  const pills = style === "pills";
  const pill = "rounded-button border border-current/15 bg-current/10 backdrop-blur-md";
  const text = caps ? "text-xs tracking-[0.15em] uppercase" : "text-[15px]";

  return (
    <ul className={`flex items-center ${pills ? "gap-2" : "gap-8"} ${text} ${className}`}>
      {items.map((item, i) => {
        if (item._type === "navGroup") {
          return pills ? (
            <li key={item._key ?? i} className={`flex items-center gap-6 px-5 py-2.5 ${pill}`}>
              <span className="opacity-60">{item.label}</span>
              {item.links?.map((link, j) => <FooterLink key={link._key ?? j} item={link} />)}
            </li>
          ) : (
            <li key={item._key ?? i} className="group/menu relative">
              <button type="button" className="flex items-center gap-1 transition-opacity hover:opacity-60" aria-haspopup="true">
                {item.label}
                <ChevronDown aria-hidden className="size-4 transition-transform group-focus-within/menu:rotate-180 group-hover/menu:rotate-180" />
              </button>
              <div className="invisible absolute top-full left-1/2 z-10 -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100">
                <ul className="flex min-w-52 flex-col gap-1 rounded-card bg-surface-alt p-2 text-fg normal-case shadow-xl">
                  {item.links?.map((link, j) => (
                    <li key={link._key ?? j}>
                      <FooterLink item={link} className="block rounded-button px-3 py-2 hover:bg-surface hover:opacity-100" />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        }
        return (
          <li key={item._key ?? i} className={pills ? `px-5 py-2.5 ${pill}` : ""}>
            <FooterLink item={item} />
          </li>
        );
      })}
    </ul>
  );
}
