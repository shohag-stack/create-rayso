// ── app/page.tsx ──────────────────────────────────────────────────────────────
// app/page.tsx

import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}
