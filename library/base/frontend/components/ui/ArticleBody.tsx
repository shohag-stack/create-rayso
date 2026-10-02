import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { imageSrc } from "@/(core)/sanity/lib/image";
import type { SanityImage } from "@/types/sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="pt-6 text-3xl leading-tight md:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-4 text-2xl leading-tight">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-accent pl-6 font-heading text-2xl leading-snug">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ value, children }) => {
      const href: string | undefined = value?.href;
      if (!href) return <>{children}</>;
      const external = /^https?:/.test(href);
      return (
        <Link href={href} className="underline underline-offset-4 transition-opacity hover:opacity-60" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </Link>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }: { value: SanityImage }) => {
      const src = imageSrc(value, 1600);
      if (!src) return null;
      const size = value.asset?.metadata?.dimensions;
      return (
        <figure className="py-4">
          <Image src={src} alt={value.alt ?? ""} width={size?.width ?? 1600} height={size?.height ?? 1000} sizes="(min-width: 768px) 48rem, 100vw" className="w-full rounded-card object-cover" />
        </figure>
      );
    },
  },
};

// Long-form text from a Sanity body field: headings, quotes, lists, links and images
export function ArticleBody({ value, className = "" }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={`space-y-6 text-lg leading-relaxed ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
