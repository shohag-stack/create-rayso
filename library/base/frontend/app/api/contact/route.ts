import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sends contact form messages by email with Resend.
// Needs RESEND_API_KEY and CONTACT_EMAIL in frontend/.env.local (README step 5).
const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_EMAIL;
const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";
const isSet = (v?: string) => Boolean(v && !v.startsWith("your_") && v !== "hello@yoursite.com");

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data || typeof data !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill the hidden "company" field; pretend it worked
  if (clean(data.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(data.name, 200);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 50);
  const message = clean(data.message, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please add your name, a valid email and a message." }, { status: 400 });
  }

  if (!isSet(apiKey) || !isSet(to)) {
    // While building the site, accept the message so the form can be tried out
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] Email is not set up yet; this message was not sent:", { name, email, phone, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "The contact form isn't set up yet. Please email us instead." }, { status: 503 });
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to!,
    replyTo: email,
    subject: `New message from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, phone && `Phone: ${phone}`, "", message].filter((l) => l !== "").join("\n"),
  });
  if (error) return NextResponse.json({ error: "Sorry, the message couldn't be sent. Please try again or email us." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
