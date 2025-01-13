import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KEANU REAÑO",
  description: "Terminal-based Web Portfolio",
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
