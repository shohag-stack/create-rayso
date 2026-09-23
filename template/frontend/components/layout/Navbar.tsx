"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Accommodations", href: "/accommodations" },
  { label: "Experiences",    href: "/experiences"    },
  { label: "Gallery",        href: "/gallery"        },
  { label: "About",          href: "/about"          },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height: "var(--spacing-navbar)" }}
    >
      {/* Glass bar */}
      <div
        className="h-full flex items-center justify-between px-6 md:px-12"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-white text-xl tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          MERIDIAN
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/accommodations"
          className="hidden md:inline-flex btn btn-white btn-sm"
          style={{ marginTop: 0 }}
        >
          Book a Stay
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
          />
          <span
            className="block w-6 h-px bg-white transition-all duration-300"
            style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden flex flex-col px-6 py-6 gap-5"
          style={{ background: "rgba(20,8,12,0.97)", backdropFilter: "blur(12px)" }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm tracking-widest uppercase text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/accommodations"
            className="btn btn-primary btn-sm w-fit"
            style={{ marginTop: "0.5rem" }}
          >
            Book a Stay
          </Link>
        </div>
      )}
    </header>
  );
}