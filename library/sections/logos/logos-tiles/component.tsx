import { BrandMark } from "@/components/ui/logos/BrandMark";
import { sectionTone } from "@/components/ui/sectionTone";
import { tint } from "@/components/ui/tint";
import type { LogosTilesData } from "@/types/sections/logos-tiles";

export function LogosTilesSection({ heading, body, brands, showNames = true, tileTint = "soft", note, mono = true, tone = "dark" }: LogosTilesData) {
  if (!brands?.length) return null;

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
        {heading && <h2 className="text-3xl leading-tight tracking-tight whitespace-pre-line text-inherit md:text-4xl">{heading}</h2>}
        <div className={heading ? "" : "md:col-start-2"}>
          {(body || showNames) && (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
              {body && <p className="max-w-md leading-relaxed opacity-85">{body}</p>}
              {showNames && (
                <ul className="eyebrow columns-2 gap-8 font-normal tracking-widest">
                  {brands.map((brand, i) => (
                    <li key={brand._key ?? i} className="mb-2">
                      {brand.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <ul className="mt-12 grid grid-cols-2 gap-1.5 md:mt-20">
            {brands.map((brand, i) => (
              <li key={brand._key ?? i} className={`grid aspect-16/9 place-items-center p-6 ${tint[tileTint]}`}>
                <BrandMark
                  brand={brand}
                  index={i}
                  mono={mono}
                  onDark={tileTint === "dark" || tileTint === "accent"}
                  className="h-8 md:h-11"
                  textClassName="text-xl md:text-3xl"
                />
              </li>
            ))}
          </ul>
          {note && <p className="eyebrow mt-12 font-normal tracking-widest md:mt-16">{note}</p>}
        </div>
      </div>
    </div>
  );
}
