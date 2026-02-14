import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAADZ // Founder Operating Lab",
  description: "A live control room for products, systems, and experiments.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
