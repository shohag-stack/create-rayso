"use client";

import { Menu, Minus, Plus, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

// A button that opens and closes a panel. Closes on Escape and when a link inside is clicked.
export function MenuPanel({
  label,
  icon = "bars",
  buttonClassName = "",
  panelClassName = "",
  className = "",
  children,
}: {
  label?: string;
  icon?: "bars" | "plus";
  buttonClassName?: string;
  panelClassName?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const Icon = icon === "plus" ? (open ? Minus : Plus) : open ? X : Menu;

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label ? undefined : open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 transition-opacity hover:opacity-70 ${buttonClassName}`}
      >
        {label ? <span>{open ? "Close" : label}</span> : <Icon aria-hidden className="size-6" />}
      </button>
      <div
        id={id}
        hidden={!open}
        onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}
        className={panelClassName}
      >
        {children}
      </div>
    </div>
  );
}
