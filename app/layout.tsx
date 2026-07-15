import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Clock Is Louder — An Interactive Meditation",
  description: "A choose-your-own-adventure about guilt, time, grief, and the quiet act of noticing.",
  openGraph: {
    title: "The Clock Is Louder When You’re Alone",
    description: "An interactive meditation on time, guilt + grief.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "The clock is louder when you’re alone." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Clock Is Louder When You’re Alone",
    description: "An interactive meditation on time, guilt + grief.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={mono.variable}>{children}</body></html>;
}
