import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keanu Reaño",
  description: "Terminal-based Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#252a33]">{children}</body>
    </html>
  );
}
