// app/privacy/page.tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | NextCart",
  description:
    "Learn how NextCart collects, uses, and protects your personal data when you browse our store and place orders.",
  openGraph: {
    title: "NextCart Privacy Policy",
    description:
      "Details about how we collect, use, and protect your personal information at NextCart.",
    type: "article",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <Container className="py-10 md:py-12 lg:py-16">
      <div className="space-y-6 md:space-y-8">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-[var(--muted-foreground)]">
            Your privacy is important to us. This Privacy Policy explains how
            NextCart collects, uses, and protects your personal information when
            you use our website and services.
          </p>
        </div>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              1. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>We may collect the following categories of information:</p>
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Account information:
                </span>{" "}
                name, email address, password, profile details.
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Order details:
                </span>{" "}
                products purchased, shipping address, billing address, and order
                history.
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Payment information:
                </span>{" "}
                partial card details or tokens processed securely by our payment
                providers (e.g., Stripe). We do not store your full card number.
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Usage data:
                </span>{" "}
                device information, IP address, browser type, pages visited, and
                actions taken on the site.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              2. How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>We use your information to:</p>
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>Process and deliver your orders.</li>
              <li>Provide customer support and respond to inquiries.</li>
              <li>
                Personalize your experience, such as showing relevant products
                and recommendations.
              </li>
              <li>
                Improve our website performance, security, and overall user
                experience.
              </li>
              <li>
                Send you transactional emails (e.g., order confirmations,
                payment receipts) and, where permitted, marketing communications.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              3. Cookies &amp; Tracking Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              We use cookies and similar technologies to remember your
              preferences, keep you signed in, and analyze how you use our site.
            </p>
            <p>
              You can control cookies through your browser settings, but
              disabling certain cookies may affect core functionality such as
              sign-in or the shopping cart.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              4. Data Sharing &amp; Third Parties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              We may share your information with trusted third-party providers
              that help us operate our services, including:
            </p>
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>Payment processors (e.g., Stripe).</li>
              <li>Cloud hosting and infrastructure providers.</li>
              <li>
                Analytics providers to understand site performance and usage.
              </li>
            </ul>
            <p>
              We do not sell your personal data. We share only the minimum
              necessary information required for these services to function.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              5. Data Security &amp; Retention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              We implement reasonable technical and organizational measures to
              protect your information from unauthorized access, loss, misuse,
              or alteration.
            </p>
            <p>
              We retain your data only for as long as necessary to provide our
              services, comply with legal obligations, resolve disputes, and
              enforce our agreements.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              6. Your Rights &amp; Choices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>You may have the right to:</p>
            <ul className="space-y-2 list-disc pl-4 md:pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Object to or restrict certain types of processing.</li>
              <li>
                Opt out of marketing communications at any time via the unsubscribe
                link or by contacting us.
              </li>
            </ul>
            <p>
              To exercise your rights, please contact us at{" "}
              <a
                href="mailto:privacy@nextcart.dev"
                className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
              >
                privacy@nextcart.dev
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              7. Changes to This Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &quot;Last updated&quot; date below. We
              encourage you to review this page regularly to stay informed about
              our privacy practices.
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
