import { linkHref } from "@/(core)/lib/link";
import type { SanityLink } from "@/types/sanity";

export interface EmailCapture {
  intro?: string;
  placeholder?: string;
  buttonLabel?: string;
  link?: SanityLink;
}

// Email field + button. It opens the chosen page with ?email=… filled in;
// the contact form feature handles the actual sign-up.
export function EmailCaptureForm({
  capture,
  variant = "outline",
  className = "",
}: {
  capture?: EmailCapture;
  variant?: "outline" | "glass";
  className?: string;
}) {
  const action = linkHref(capture?.link);
  if (!capture || !action) return null;
  const placeholder = capture.placeholder ?? "Your email";

  return (
    <div className={className}>
      {capture.intro && <p className="mb-3 text-sm opacity-70">{capture.intro}</p>}
      <form
        action={action}
        method="get"
        className={`flex w-full max-w-md items-center gap-2 rounded-button border p-1.5 ${
          variant === "glass" ? "border-on-media/20 bg-on-media/15 text-on-media backdrop-blur-md" : "border-current/20"
        }`}
      >
        <label className="min-w-0 flex-1">
          <span className="sr-only">{placeholder}</span>
          <input
            name="email"
            type="email"
            required
            placeholder={placeholder}
            className="w-full bg-transparent px-4 py-2 outline-none placeholder:opacity-60"
          />
        </label>
        <button type="submit" className={`btn shrink-0 px-6 ${variant === "glass" ? "btn-light" : "btn-primary"}`}>
          {capture.buttonLabel ?? "Get started"}
        </button>
      </form>
    </div>
  );
}
