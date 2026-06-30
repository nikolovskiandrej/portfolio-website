import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/data/site";
import { socials } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { SearchModal } from "@/components/chrome/SearchModal";
import { CartDrawer } from "@/components/chrome/CartDrawer";
import { MobileNav } from "@/components/chrome/MobileNav";
import { FlashToast } from "@/components/chrome/FlashToast";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { QuickView } from "@/components/product/QuickView";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  keywords: [
    "luxury watches",
    "Italian watchmaking",
    "alta orologeria",
    "mechanical timepieces",
    "Barro",
    "Milano",
    "tourbillon",
    "haute horlogerie",
  ],
  category: "shopping",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/hero/main.jpg",
        width: 1600,
        height: 1067,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/hero/main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1A16" },
  ],
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/images/hero/main.jpg`,
      image: `${site.url}/images/hero/main.jpg`,
      description: site.description,
      foundingDate: String(site.founded),
      founder: { "@type": "Person", name: "Emilio Barro" },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        postalCode: site.address.zip,
        addressCountry: "IT",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.email,
        telephone: site.phone,
        areaServed: ["IT", "GB", "CH", "US"],
        availableLanguage: ["Italian", "English", "French", "German"],
      },
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(display.variable, serif.variable, sans.variable)}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[300] focus:bg-ink focus:px-5 focus:py-3 focus:font-sans focus:text-2xs focus:uppercase focus:tracking-luxe focus:text-cream"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <StoreProvider>
            <ScrollProgress />
            <Header />
            <main id="main">{children}</main>
            <Footer />

            {/* Global overlays */}
            <SearchModal />
            <CartDrawer />
            <MobileNav />
            <QuickView />
            <FlashToast />
            <CustomCursor />
          </StoreProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
