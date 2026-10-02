import { Check, CircleCheck, X } from "lucide-react";
import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { sectionTone } from "@/components/ui/sectionTone";
import type { PricingCompareData } from "@/types/sections/pricing-compare";

// "yes" draws a tick, "no" or empty a cross; anything else is shown as text
function Cell({ value }: { value?: string }) {
  const v = value?.trim().toLowerCase();
  if (v === "yes")
    return (
      <span className="mx-auto grid size-7 place-items-center rounded-full bg-accent text-accent-fg">
        <Check aria-hidden className="size-4" strokeWidth={2.5} />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (!v || v === "no")
    return (
      <span className="mx-auto grid size-7 place-items-center rounded-full border border-current/25 opacity-40">
        <X aria-hidden className="size-3.5" />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className="text-sm">{value}</span>;
}

export function PricingCompareSection({ eyebrow, heading, headingAccent, price, body, cta, image, guarantee, columns, rows, tone = "page" }: PricingCompareData) {
  const src = imageSrc(image, 1600);
  const cols = columns ?? [];

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site max-w-4xl!">
        {eyebrow && <p className="mb-6 inline-block rounded-button bg-current/5 px-3 py-1.5 text-sm">{eyebrow}</p>}
        {heading && (
          <h2 className="text-4xl leading-none font-bold tracking-tight whitespace-pre-line text-inherit md:text-6xl">
            {heading}
            {headingAccent && <span className="text-accent"> {headingAccent}</span>}
          </h2>
        )}

        {price?.amount && (
          <div className="relative mt-10 overflow-hidden rounded-card bg-surface-inverse text-fg-inverse md:mt-14">
            {src && (
              <>
                <Image src={src} alt={image?.alt ?? ""} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" style={{ objectPosition: imagePosition(image) }} />
                <div aria-hidden className="absolute inset-0 bg-surface-inverse/45" />
              </>
            )}
            <div className="relative flex flex-col gap-10 p-7 md:flex-row md:items-end md:justify-between md:p-8">
              <div className="max-w-md">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-6xl leading-none font-bold tracking-tight md:text-7xl">{price.amount}</span>
                  {price.period && <span className="opacity-75">{price.period}</span>}
                </p>
                {price.note && <p className="mt-4 text-sm leading-relaxed opacity-70">{price.note}</p>}
                {body && <p className="mt-10 text-lg leading-relaxed">{body}</p>}
              </div>
              {cta && <CtaButton cta={cta} className="self-start md:self-auto" />}
            </div>
          </div>
        )}

        {guarantee?.title && (
          <div className="mt-2 flex flex-col gap-4 rounded-card bg-current/5 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div>
              <p className="text-lg text-fg">{guarantee.title}</p>
              {guarantee.body && <p className="mt-1 text-sm opacity-75">{guarantee.body}</p>}
            </div>
            {guarantee.badge && (
              <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-button bg-current/5 px-3 py-2 sm:self-auto">
                <CircleCheck aria-hidden className="size-4 text-accent" />
                {guarantee.badge}
              </p>
            )}
          </div>
        )}

        {cols.length > 0 && rows?.length ? (
          <table className="mt-14 w-full table-fixed border-collapse md:mt-20">
            <thead>
              <tr className="border-b border-current/15">
                <th className="w-1/3">
                  <span className="sr-only">Compared</span>
                </th>
                {cols.map((col, i) => (
                  <th key={i} scope="col" className={`px-1 pb-6 text-center text-xs leading-tight font-bold tracking-tight uppercase sm:text-lg md:text-3xl ${i === 0 ? "text-accent" : ""}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={row._key ?? r} className="border-b border-current/15">
                  <th scope="row" className="py-5 pr-4 text-left font-normal md:py-6 md:text-lg">
                    {row.label}
                  </th>
                  {cols.map((_, c) => (
                    <td key={c} className="px-1 text-center">
                      <Cell value={row.values?.[c]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
