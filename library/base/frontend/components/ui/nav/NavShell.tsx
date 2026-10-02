"use client";

import { useEffect, useState } from "react";

// Positions a menu at the top of the page. A fixed menu gets data-scrolled once the
// page scrolls, so it can switch to a solid background (group-data-[scrolled=true]/nav:...).
export function NavShell({
  position = "fixed",
  className = "",
  children,
}: {
  position?: "scrolls" | "fixed";
  className?: string;
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (position !== "fixed") return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [position]);

  return (
    <div
      data-scrolled={scrolled}
      className={`group/nav inset-x-0 top-0 z-40 ${position === "fixed" ? "fixed" : "absolute"} ${className}`}
    >
      {children}
    </div>
  );
}
