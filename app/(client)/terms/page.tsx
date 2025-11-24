// app/terms/page.tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms & Conditions | NextCart",
  description:
    "Read the terms and conditions for using the NextCart website, creating an account, and placing orders.",
  openGraph: {
    title: "NextCart Terms & Conditions",
    description:
      "Understand your rights and responsibilities when using the NextCart platform.",
    type: "article",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <Container className="py-10 md:py-12 lg:py-16">
      <div className="space-y-6 md:space-y-8">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm md:text-base text-[var(--muted-foreground)]">
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of
            the NextCart website and services. By accessing or using our
            platform, you agree to be bound by these Terms.
          </p>
        </div>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              1. Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              NextCart (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an
              online e-commerce platform that allows users to browse, purchase,
              and manage orders for various products. By using NextCart, you
              confirm that you are at least 18 years old or have permission from
              a legal guardian.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              2. Account Registration &amp; Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </li>
              <li>
                You must provide accurate and up-to-date information during
                registration and keep it updated.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these Terms or are involved in fraudulent activity.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              3. Orders, Pricing &amp; Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              Product prices, availability, and descriptions are subject to
              change without notice. We take care to ensure accuracy, but errors
              may occur.
            </p>
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>
                Your order is an offer to purchase products. We may accept or
                reject any order at our sole discretion.
              </li>
              <li>
                Payments are processed securely via third-party payment
                providers (e.g., Stripe). We do not store your full card
                details on our servers.
              </li>
              <li>
                In case of pricing errors, we may contact you to confirm the
                order or cancel it with a full refund if payment has already
                been made.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              4. Shipping, Delivery &amp; Returns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>
                Estimated delivery times are provided for convenience and are
                not guaranteed.
              </li>
              <li>
                Risk of loss passes to you upon delivery of products to the
                delivery address you provide.
              </li>
              <li>
                Return and refund eligibility is subject to our{" "}
                <a
                  href="/privacy"
                  className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
                >
                  Returns &amp; Refunds
                </a>{" "}
                sections described in these Terms or other policies on our
                website.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              5. User Conduct
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>By using NextCart, you agree that you will not:</p>
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>Engage in any unlawful, harmful, or fraudulent activity.</li>
              <li>
                Attempt to gain unauthorized access to our systems, data, or
                other users&apos; accounts.
              </li>
              <li>
                Use automated tools (bots, scrapers) to interact with the site
                in a way that may damage performance or compromise security.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              6. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              To the maximum extent permitted by law, NextCart shall not be
              liable for any indirect, incidental, consequential, or punitive
              damages arising from your use of the platform, products, or
              services.
            </p>
            <p>
              Our total aggregate liability for any claim relating to your use
              of NextCart shall not exceed the total amount paid by you for the
              relevant order.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              7. Changes to These Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              We may update these Terms from time to time to reflect changes in
              our services, legal requirements, or business practices. The
              updated version will be posted on this page with a revised
              &quot;Last updated&quot; date.
            </p>
            <p className="font-medium text-[var(--foreground)]">
              Last updated: November 24, 2025
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
