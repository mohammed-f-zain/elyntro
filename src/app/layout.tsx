import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Elyntro — Think Forward. Build Smarter.",
  description:
    "Intelligent technology built around your business. Scalable software, connected systems, and AI-powered automation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
