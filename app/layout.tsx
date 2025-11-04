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

const BUSINESS_NAME = process.env.BUSINESS_NAME || process.env.NEXT_PUBLIC_BUSINESS_NAME || "Home Services";
const BUSINESS_WEBSITE_URL = process.env.BUSINESS_WEBSITE_URL || process.env.NEXT_PUBLIC_BUSINESS_WEBSITE_URL || "";
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@example.com";

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} — Free Estimate` ,
  description: `Request your ${BUSINESS_NAME} estimate and opt in to SMS updates for scheduling.`,
  metadataBase: BUSINESS_WEBSITE_URL ? new URL(BUSINESS_WEBSITE_URL) : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="border-t mt-10 py-6 text-xs text-gray-600 flex flex-col items-center gap-2">
          <div>
            <a href="/terms" className="underline">Terms</a>
            <span className="mx-2">•</span>
            <a href="/privacy" className="underline">Privacy</a>
          </div>
          <div>
            Contact: <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
