import { BrandMark } from "@/components/ui/logos/BrandMark";
import { sectionTone } from "@/components/ui/sectionTone";
import type { LogosRowData } from "@/types/sections/logos-row";

export function LogosRowSection({ heading, brands, mono = true, tone = "page" }: LogosRowData) {
  if (!brands?.length) return null;
  return (
    <div className={sectionTone[tone]}>
      <div className="container-site text-center">
        {heading && <h2 className="mx-auto max-w-3xl text-lg leading-snug tracking-tight text-inherit opacity-70 md:text-2xl">{heading}</h2>}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:mt-14 md:gap-x-20">
          {brands.map((brand, i) => (
            <li key={brand._key ?? i}>
              <BrandMark brand={brand} index={i} mono={mono} onDark={tone === "dark"} className="h-10 md:h-14" textClassName="text-2xl md:text-3xl" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
