import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

// The site refreshes from Sanity at most once a minute
export const revalidate = 60;

export const metadata: Metadata = {
  title: "RAYSO Template",
  description: "A Next.js and Sanity template by RAYSO.STUDIO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Font variables sit on <html> so the theme's --font-heading and --font-body resolve
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
