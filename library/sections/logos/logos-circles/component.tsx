import { BrandBadge } from "@/components/ui/logos/BrandBadge";
import { BrandMark } from "@/components/ui/logos/BrandMark";
import { CtaButton } from "@/components/ui/CtaButton";
import { sectionTone } from "@/components/ui/sectionTone";
import type { BrandLogo } from "@/types/sanity";
import type { LogosCirclesData } from "@/types/sections/logos-circles";

function Circles({ brands, offset, className }: { brands: BrandLogo[]; offset: number; className: string }) {
  return (
    <ul className={`flex items-center gap-3 md:gap-6 ${className}`}>
      {brands.map((brand, i) => (
        <li key={brand._key ?? i} title={brand.name}>
          <BrandBadge brand={brand} index={offset + i} className="size-20 rounded-full md:size-36" textClassName="text-3xl md:text-5xl" />
        </li>
      ))}
    </ul>
  );
}

export function LogosCirclesSection({ eyebrow, heading, headingAccent, body, brands, highlight, cta, tone = "page" }: LogosCirclesData) {
  if (!brands?.length) return null;
  const half = Math.ceil(brands.length / 2);

  return (
    <div className={`overflow-hidden ${sectionTone[tone]}`}>
      <div className="container-site text-center">
        {eyebrow && <p className="mb-6 inline-block rounded-button bg-current/5 px-3 py-1.5 text-sm">{eyebrow}</p>}
        {heading && (
          <h2 className="mx-auto max-w-3xl text-4xl leading-none font-bold tracking-tight whitespace-pre-line text-inherit md:text-6xl">
            {heading}
            {headingAccent && <span className="text-accent"> {headingAccent}</span>}
          </h2>
        )}
      </div>

      {/* The highlight stays centred; the circles on each side run off the screen */}
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center md:mt-16">
        <Circles brands={brands.slice(0, half)} offset={0} className="justify-end" />
        {highlight?.name ? (
          <div className="relative z-10 -mx-4 grid size-40 place-items-center rounded-full bg-surface-inverse p-6 text-center text-fg-inverse md:-mx-8 md:size-72">
            <BrandMark
              brand={highlight}
              linked={false}
              className="h-12 md:h-20"
              textClassName="block text-2xl leading-[0.9] font-bold uppercase md:text-4xl"
            />
          </div>
        ) : (
          <span className="w-3 md:w-6" />
        )}
        <Circles brands={brands.slice(half)} offset={half} className="justify-start" />
      </div>

      {(body || cta) && (
        <div className="container-site mt-12 flex flex-col items-center text-center md:mt-16">
          {body && <p className="max-w-xl text-lg leading-relaxed opacity-80">{body}</p>}
          {cta && <CtaButton cta={cta} className="mt-8" />}
        </div>
      )}
    </div>
  );
}
