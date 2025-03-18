import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const suit = localFont({
  src: "../assets/fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "YoPlan",
  description: "YoPlan application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${suit.variable}`}>
      <body className="font-suit">{children}</body>
    </html>
  );
}
