import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Passes Anyway",
  description: "A short interactive meditation about time, guilt, and loss.",
  openGraph: {
    title: "The Clock Does Not Need You",
    description: "A short interactive meditation about time, guilt + loss.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "The clock does not need you." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Clock Does Not Need You",
    description: "A short interactive meditation about time, guilt + loss.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={mono.variable}>{children}</body></html>;
}
