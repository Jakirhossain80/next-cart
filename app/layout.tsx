import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";

/**
 * Because Header uses Clerk's server helpers (auth/currentUser),
 * which internally rely on request headers, we must mark the
 * app as dynamic so Next.js doesn't try to statically prerender
 * routes like /blog, /cart, /orders, /wishlist, etc.
 */
export const dynamic = "force-dynamic";

/** Fonts (use variable to avoid invalid ranges) */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/** App constants (kept as constants for deterministic SSR output) */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const APP_NAME = "NextCart";
const APP_DESC =
  "NextCart is a modern, SEO-friendly e-commerce app built with Next.js, Tailwind CSS, and TypeScript.";

/** Viewport Section */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

/** SEO metadata */
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} — E-Commerce App`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESC,
  keywords: [
    "NextCart",
    "e-commerce",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Shopping cart",
    "Stripe",
  ],
  authors: [{ name: "NextCart Team" }],
  creator: "NextCart",
  publisher: "NextCart",
  category: "Shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — E-Commerce App`,
    description: APP_DESC,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NextCart — Shop smarter",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextcart",
    creator: "@nextcart",
    title: `${APP_NAME} — E-Commerce App`,
    description: APP_DESC,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  verification: {
    google: "",
    yandex: "",
    other: { me: ["mailto:contact@nextcart.app"] },
  },
};

// Deterministic JSON-LD object to avoid hydration diffs
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: APP_NAME,
  url: APP_URL,
  description: APP_DESC,
  potentialAction: {
    "@type": "SearchAction",
    target: `${APP_URL}/search?q={query}`,
    "query-input": "required name=query",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* JSON-LD rendered on the server for hydration stability */}
        <script
          id="ld-json-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-[var(--background)] text-[var(--foreground)]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:px-3 focus:py-2 focus:ring"
        >
          Skip to content
        </a>

        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
