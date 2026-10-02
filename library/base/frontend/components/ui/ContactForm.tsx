"use client";

import { useState } from "react";

export interface ContactFormLabels {
  showPhone?: boolean;
  messagePlaceholder?: string;
  submitLabel?: string;
  successMessage?: string;
}

const field =
  "w-full rounded-button border border-current/25 bg-transparent px-4 py-3 text-base outline-none transition-colors placeholder:opacity-50 focus:border-accent";

// Name, email, optional phone and message; posts to /api/contact
export function ContactForm({ showPhone = true, messagePlaceholder, submitLabel = "Send message", successMessage = "Thank you. We'll get back to you soon." }: ContactFormLabels) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);
    if (response?.ok) {
      setState("sent");
      form.reset();
      return;
    }
    const body = await response?.json().catch(() => null);
    setError(body?.error ?? "Sorry, the message couldn't be sent. Please try again.");
    setState("error");
  }

  if (state === "sent") {
    return (
      <p role="status" className="text-2xl leading-snug">
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className={`grid gap-5 ${showPhone ? "sm:grid-cols-2" : ""}`}>
        <label className="grid gap-2 text-sm">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        {showPhone && (
          <label className="grid gap-2 text-sm">
            Phone <span className="sr-only">(optional)</span>
            <input name="phone" type="tel" autoComplete="tel" className={field} />
          </label>
        )}
      </div>
      <label className="grid gap-2 text-sm">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="grid gap-2 text-sm">
        Message
        <textarea name="message" required rows={5} placeholder={messagePlaceholder} className={`${field} resize-y`} />
      </label>
      {/* Hidden from people; bots fill it in */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state === "error" && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn btn-primary justify-self-start disabled:opacity-60">
        {state === "sending" ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
