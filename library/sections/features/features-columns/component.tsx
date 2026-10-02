import Image from "next/image";
import { imagePosition, imageSrc } from "@/(core)/sanity/lib/image";
import { IconByName } from "@/components/ui/IconByName";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionTone } from "@/components/ui/sectionTone";
import { tint } from "@/components/ui/tint";
import type { FeaturesColumnsData } from "@/types/sections/features-columns";

const columns = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

export function FeaturesColumnsSection({ eyebrow, heading, headingAccent, body, align = "center", features, tone = "page" }: FeaturesColumnsData) {
  if (!features?.length) return null;
  const centered = align === "center";
  const count = Math.min(Math.max(features.length, 2), 4) as 2 | 3 | 4;

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} heading={heading} headingAccent={headingAccent} body={body} align={align} />

        <div className={`mt-14 grid gap-14 md:mt-20 md:gap-8 ${columns[count]}`}>
          {features.map((feature, i) => {
            const panel = tint[feature.tint ?? "soft"];
            const src = imageSrc(feature.image, 1000);
            return (
              <article key={feature._key ?? i} className={`flex flex-col ${centered ? "items-center text-center" : ""}`}>
                <h3 className="flex items-center gap-4 text-2xl text-inherit md:text-3xl">
                  {feature.icon && (
                    <span aria-hidden className={`grid size-11 shrink-0 place-items-center rounded-button border border-current/25 ${panel}`}>
                      <IconByName name={feature.icon} className="size-6" />
                    </span>
                  )}
                  {feature.title}
                </h3>
                {feature.body && <p className="mt-5 max-w-sm text-lg leading-snug opacity-80">{feature.body}</p>}
                {src && (
                  <div className={`relative mt-10 aspect-16/10 w-full overflow-hidden rounded-card ${panel}`}>
                    <Image
                      src={src}
                      alt={feature.image?.alt ?? ""}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: imagePosition(feature.image) }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
