import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kaadz.me — The Lab",
  description:
    "Personal R&D lab. Where experiments become products and ideas hit production. AI tooling, developer infrastructure, and shipping fast.",
  keywords: ["kaadz", "WatchLLM", "AI observability", "developer tools", "SaaS"],
  openGraph: {
    title: "kaadz.me — The Lab",
    description: "Personal R&D lab. Shipping real products, not portfolios.",
    url: "https://kaadz.me",
    siteName: "kaadz.me",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kaadz.me — The Lab",
    description: "Personal R&D lab. Shipping real products, not portfolios.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
