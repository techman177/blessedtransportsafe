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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blessedtransportsafe.com"),
  title: {
    default: "Blessed Transport Safe - Traslados VIP y Tours",
    template: "%s | Blessed Transport Safe",
  },
  description: "Traslados privados, tours exclusivos y rent car en República Dominicana con atención VIP las 24 horas.",
  keywords: ["traslados VIP", "tours República Dominicana", "rent car", "Blessed Transport Safe"],
  openGraph: {
    type: "website",
    locale: "es_DO",
    alternateLocale: ["en_US", "it_IT"],
    siteName: "Blessed Transport Safe",
    title: "Blessed Transport Safe - Traslados VIP y Tours",
    description: "Viaja seguro por República Dominicana con traslados privados, tours exclusivos y rent car.",
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Blessed Transport Safe - Traslados VIP y Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blessed Transport Safe - Traslados VIP y Tours",
    description: "Traslados privados, tours exclusivos y rent car en República Dominicana.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
