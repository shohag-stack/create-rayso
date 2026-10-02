import { ArrowRight } from "lucide-react";
import type { LinkColumn } from "@/types/sanity";
import { FooterLink } from "./FooterLink";

// Columns of links; "divided" draws a thin rule between columns
export function LinkColumns({
  columns,
  divided = false,
  headingStyle = "muted",
  className = "",
}: {
  columns?: LinkColumn[];
  divided?: boolean;
  headingStyle?: "muted" | "bold" | "caps";
  className?: string;
}) {
  if (!columns?.length) return null;
  const headings = {
    muted: "text-sm opacity-60",
    bold: "text-sm font-semibold",
    caps: "eyebrow opacity-60",
  };

  return (
    <div
      className={`grid grid-cols-2 gap-y-10 sm:grid-cols-3 ${columns.length >= 4 ? "lg:grid-cols-4" : ""} ${
        columns.length >= 5 ? "xl:grid-cols-5" : ""
      } ${divided ? "gap-x-0" : "gap-x-8"} ${className}`}
    >
      {columns.map((column, i) => (
        <div key={column._key ?? i} className={divided ? "border-l border-current/15 px-6 py-2" : ""}>
          {column.heading && <p className={`mb-5 ${headings[headingStyle]}`}>{column.heading}</p>}
          <ul className="flex flex-col gap-3">
            {column.links?.map((item, j) => (
              <li key={item._key ?? j}>
                <FooterLink item={item} className="opacity-80" />
              </li>
            ))}
            {column.viewAll && (
              <li className="mt-1 font-medium">
                <FooterLink item={column.viewAll} />
                <ArrowRight aria-hidden className="ml-1 inline size-4 align-[-0.15em]" />
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
