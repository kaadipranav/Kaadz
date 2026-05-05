import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/SplashCursor";

export const metadata: Metadata = {
  title: "kaadz — Reliability & Memory Infrastructure for AI Agents",
  description: "Building WatchLLM and Klyd. Reliability and memory infrastructure for AI agents.",
  keywords: ["AI agents", "observability", "memory", "developer tools", "WatchLLM", "Klyd"],
  openGraph: {
    title: "kaadz — Reliability & Memory Infrastructure for AI Agents",
    description: "Building WatchLLM and Klyd. Reliability and memory infrastructure for AI agents.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@100,200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SplashCursor RAINBOW_MODE={false} COLOR="#c9a96e" />
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
