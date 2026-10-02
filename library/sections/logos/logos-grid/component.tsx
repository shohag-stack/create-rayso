import { BrandMark } from "@/components/ui/logos/BrandMark";
import { sectionTone } from "@/components/ui/sectionTone";
import type { LogosGridData } from "@/types/sections/logos-grid";

const columnClass = { "4": "md:grid-cols-4", "5": "md:grid-cols-5", "6": "md:grid-cols-4 lg:grid-cols-6" };

export function LogosGridSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  label,
  brands,
  columns = "6",
  lines = "solid",
  cells = "square",
  fullWidth = false,
  mono = true,
  tone = "page",
}: LogosGridData) {
  if (!brands?.length) return null;
  const line = `border-current/15 ${lines === "dashed" ? "border-dashed" : ""}`;
  const cell = `flex items-center justify-center border-r border-b ${line} ${cells === "square" ? "aspect-square p-6" : "h-24 px-6 md:h-28"}`;
  // The label takes two cells in the middle of the first row
  const labelAt = Math.max(0, Math.floor(Number(columns) / 2) - 1);
  const items = brands.map((brand, i) => (
    <li key={brand._key ?? i} className={cell}>
      <BrandMark brand={brand} index={i} mono={mono} onDark={tone === "dark"} className="h-7 md:h-9" textClassName="text-lg md:text-2xl" />
    </li>
  ));
  if (label) {
    items.splice(
      labelAt,
      0,
      <li key="label" className={`${cell} col-span-2 aspect-auto! text-center`}>
        <span className="eyebrow font-normal opacity-70">{label}</span>
      </li>,
    );
  }

  return (
    <div className={sectionTone[tone]}>
      {(heading || eyebrow) && (
        <div className="container-site mb-12 md:mb-16">
          {eyebrow && <p className="eyebrow mb-4 font-normal opacity-70">{eyebrow}</p>}
          {heading && (
            <h2 className="max-w-4xl text-3xl leading-[1.1] tracking-tight whitespace-pre-line text-inherit md:text-5xl">
              {heading}
              {headingAccent && <span className="opacity-40"> {headingAccent}</span>}
            </h2>
          )}
          {body && <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-75">{body}</p>}
        </div>
      )}
      <div className={fullWidth ? "" : "container-site"}>
        <ul className={`grid grid-cols-2 border-t border-l ${line} ${columnClass[columns]}`}>{items}</ul>
      </div>
    </div>
  );
}
