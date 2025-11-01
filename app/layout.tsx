import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Next Cart",
  description: "Your cart built with Next.js",
};

// Keep JSON-LD as a plain constant so it’s identical on every render.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Next Cart",
  // Update to your real site URL when deployed
  url: "https://example.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* JSON-LD rendered on server to avoid hydration diffs */}
        <script
          id="ld-json-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}

        {/* Toasts (client component) */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
