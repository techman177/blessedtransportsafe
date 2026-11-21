import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  metadataBase: new URL("https://blessedtransportsafe.com"),
  title: {
    default: "Blessed Transport Safe | Private Airport Transfers & VIP Tours",
    template: "%s | Blessed Transport Safe",
  },
  description: "Private airport transfers from SDQ, PUJ and LRM, VIP tours and car rental in the Dominican Republic.",
  keywords: [
    "private airport transfers Dominican Republic",
    "SDQ airport transfer",
    "Punta Cana airport transfer",
    "VIP tours Dominican Republic",
    "rent a car Dominican Republic",
    "traslados privados República Dominicana",
    "transfer aeroportuali Repubblica Dominicana",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_DO", "it_IT"],
    siteName: "Blessed Transport Safe",
    title: "Blessed Transport Safe | Private Airport Transfers & VIP Tours",
    description: "Private airport transfers from SDQ, PUJ and LRM, VIP tours and car rental in the Dominican Republic.",
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
    title: "Blessed Transport Safe | Private Airport Transfers & VIP Tours",
    description: "Private airport transfers from SDQ, PUJ and LRM, VIP tours and car rental in the Dominican Republic.",
    images: ["/og-image.svg"],
  },
};

const transportationServiceSchema = {
  "@context": "https://schema.org",
  "@type": ["TransportationService", "LocalBusiness"],
  name: "Blessed Transport Safe",
  url: "https://blessedtransportsafe.com",
  telephone: "+1-809-447-7101",
  currenciesAccepted: "USD",
  serviceType: [
    "Private airport transfers",
    "VIP tours",
    "Car rental",
  ],
  areaServed: [
    { "@type": "Airport", name: "Aeropuerto Internacional Las Américas (SDQ)" },
    { "@type": "Airport", name: "Punta Cana International Airport (PUJ)" },
    { "@type": "Airport", name: "La Romana International Airport (LRM)" },
    { "@type": "City", name: "Santo Domingo" },
    { "@type": "Place", name: "Bávaro" },
    { "@type": "Place", name: "Bayahíbe" },
    { "@type": "Place", name: "Samaná" },
  ],
  availableLanguage: ["Spanish", "English", "Italian"],
};

function getDocumentLanguage(acceptLanguage: string | null): "es" | "en" | "it" {
  const languages = acceptLanguage
    ?.split(",")
    .map((item) => item.split(";")[0].trim().split("-")[0].toLowerCase());

  return languages?.find((language): language is "es" | "en" | "it" =>
    language === "es" || language === "en" || language === "it",
  ) ?? "es";
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const requestHeaders = await headers();
  const language = getDocumentLanguage(requestHeaders.get("accept-language"));

  return (
    <html
      lang={language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(transportationServiceSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
