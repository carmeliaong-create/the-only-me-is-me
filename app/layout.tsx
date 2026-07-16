import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Passes Anyway",
  description: "A short interactive meditation about time, guilt, and loss.",
  openGraph: {
    title: "You Do Not Have to Justify Yourself",
    description: "A cyclical interactive meditation about guilt, time + grief.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "You do not have to justify yourself." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "You Do Not Have to Justify Yourself",
    description: "A cyclical interactive meditation about guilt, time + grief.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={mono.variable}>{children}</body></html>;
}
