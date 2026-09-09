import type { Metadata } from "next";
import { Public_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Beacon · Content Engine",
  description: "Beacon Content Engine: signals to localized, compliant campaign content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${fraunces.variable} font-sans antialiased bg-beacon-bg text-beacon-ink`}
      >
        {children}
      </body>
    </html>
  );
}
