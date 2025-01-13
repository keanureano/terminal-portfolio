import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keanu Reaño",
  description:
    "A terminal-based portfolio website with a built-in GPT chatbot for answering questions.",
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
