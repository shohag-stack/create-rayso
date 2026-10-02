import type { SectionHeading as SectionHeadingData } from "@/types/sanity";

// Eyebrow, h2 with an accent-coloured ending, and body text. Children sit at the right (or below when centred).
export function SectionHeading({
  eyebrow,
  heading,
  headingAccent,
  body,
  align = "left",
  className = "",
  children,
}: SectionHeadingData & { align?: "left" | "center"; className?: string; children?: React.ReactNode }) {
  if (!heading && !eyebrow && !children) return null;
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-8 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${className}`}>
      <div className={`max-w-3xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && <p className="eyebrow mb-4 opacity-70">{eyebrow}</p>}
        {heading && (
          <h2 className="text-4xl leading-[1.05] tracking-tight whitespace-pre-line text-inherit md:text-6xl">
            {heading}
            {headingAccent && <span className="text-accent"> {headingAccent}</span>}
          </h2>
        )}
        {body && <p className="mt-5 text-lg leading-relaxed opacity-75">{body}</p>}
      </div>
      {children}
    </div>
  );
}
