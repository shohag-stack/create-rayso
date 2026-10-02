import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  block: { normal: ({ children }) => <p>{children}</p> },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ value, children }) => {
      const href: string | undefined = value?.href;
      if (!href) return <>{children}</>;
      const external = /^https?:/.test(href);
      return (
        <Link href={href} className="underline underline-offset-2 transition-opacity hover:opacity-60" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </Link>
      );
    },
  },
};

// Short formatted text (paragraphs, bold, italic, links, lists) from a Sanity block field
export function RichText({ value, className = "" }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={`space-y-4 ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
