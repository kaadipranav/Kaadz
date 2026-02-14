import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kaadz.me — Personal Lab",
  description: "Founder + hacker operating system. Real products, real experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

