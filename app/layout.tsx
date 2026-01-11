import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Langvo - Language Learning Platform",
  description: "Practice languages with real bilingual humans",
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
