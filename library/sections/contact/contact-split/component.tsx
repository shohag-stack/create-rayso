import { ContactForm } from "@/components/ui/ContactForm";
import { sectionTone } from "@/components/ui/sectionTone";
import type { ContactSplitData } from "@/types/sections/contact-split";

export function ContactSplitSection({
  eyebrow,
  heading,
  headingAccent,
  body,
  details,
  showPhone = true,
  messagePlaceholder,
  submitLabel,
  successMessage,
  layout = "split",
  tone = "page",
}: ContactSplitData) {
  const card = layout === "card";

  return (
    <div className={sectionTone[tone]}>
      <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          {eyebrow && <p className="eyebrow mb-5 font-normal opacity-70">{eyebrow}</p>}
          {heading && (
            <h2 className="text-4xl leading-[1.05] tracking-tight whitespace-pre-line text-inherit md:text-6xl">
              {heading}
              {headingAccent && <span className="text-accent"> {headingAccent}</span>}
            </h2>
          )}
          {body && <p className="mt-6 max-w-md text-lg leading-relaxed opacity-75">{body}</p>}
          {details?.length ? (
            <dl className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {details.map((d) => (
                <div key={d._key}>
                  <dt className="eyebrow font-normal opacity-60">{d.label}</dt>
                  <dd className="mt-3 leading-relaxed whitespace-pre-line">
                    {d.url ? (
                      <a href={d.url} className="underline-offset-4 hover:underline" {...(/^https?:/.test(d.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {d.text}
                      </a>
                    ) : (
                      d.text
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div className={`md:col-span-7 lg:col-span-6 lg:col-start-7 ${card ? "rounded-card bg-surface-alt p-6 text-fg shadow-sm md:p-10" : "md:border-l md:border-current/15 md:pl-10"}`}>
          <ContactForm showPhone={showPhone} messagePlaceholder={messagePlaceholder} submitLabel={submitLabel} successMessage={successMessage} />
        </div>
      </div>
    </div>
  );
}
