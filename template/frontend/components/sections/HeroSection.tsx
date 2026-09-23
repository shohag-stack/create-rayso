// ── Hero Section ──────────────────────────────────────────────────────────────
// components/sections/HeroSection.tsx

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image — swap src for your hero image or video */}
      <Image
        src="/img/hero.jpg"
        alt="Resort hero"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,4,6,0.3) 0%, rgba(10,4,6,0.15) 40%, rgba(10,4,6,0.6) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          {/* Location tag */}
          <p className="font-body text-white/60 text-xs tracking-[0.3em] uppercase mb-6">
            Maldives, Indian Ocean
          </p>

          {/* Headline */}
          <h1
            className="font-display text-white mb-8"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            Where stillness
            <br />
            meets the sea.
          </h1>

          {/* Sub + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <p className="font-body text-white/60 text-sm leading-relaxed max-w-sm">
              Private villas, overwater bungalows, and curated experiences for
              those who seek something beyond ordinary.
            </p>

            <Link
              href="/accommodations"
              className="btn btn-white shrink-0"
              style={{ marginTop: 0 }}
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
        <span
          className="font-body text-white/40 text-[10px] tracking-[0.25em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-white/60"
            style={{
              height: "40%",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(350%); }
        }
      `}</style>
    </section>
  );
}
