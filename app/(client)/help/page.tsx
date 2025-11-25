// app/help/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LifeBuoy,
  Package,
  CreditCard,
  Truck,
  ShieldCheck,
  User,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | NextCart",
  description:
    "Get help with orders, payments, shipping, returns, and your NextCart account. Browse help topics or contact support.",
  openGraph: {
    title: "NextCart Help Center",
    description:
      "Find answers to common questions about orders, payments, shipping, returns, and account management on NextCart.",
    type: "website",
    url: "/help",
  },
};

const quickLinks = [
  {
    title: "Track & manage your orders",
    href: "/order",
    description:
      "View your recent orders, check status, and see payment details.",
    icon: Package,
  },
  {
    title: "Payments & billing",
    href: "/faqs",
    description:
      "Learn about accepted payment methods and payment-related questions.",
    icon: CreditCard,
  },
  {
    title: "Shipping & delivery",
    href: "/faqs",
    description:
      "Find information on delivery timelines, shipping updates, and more.",
    icon: Truck,
  },
  {
    title: "Returns & refunds",
    href: "/terms",
    description:
      "Understand our returns, refunds, and replacement policy.",
    icon: ShieldCheck,
  },
  {
    title: "Account & security",
    href: "/privacy",
    description:
      "Learn how we protect your data and how to manage your account.",
    icon: User,
  },
  {
    title: "FAQs & common questions",
    href: "/faqs",
    description:
      "Browse frequently asked questions about using NextCart.",
    icon: LifeBuoy,
  },
];

export default function HelpPage() {
  return (
    <Container className="py-10 md:py-12 lg:py-16">
      <div className="space-y-8 md:space-y-10">
        {/* Hero section */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-4 md:space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
              <LifeBuoy className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span>Help Center</span>
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              How can we help you today?
            </h1>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-xl">
              Get quick answers about orders, payments, shipping, returns, and
              your account. Use the shortcuts below to jump into the right
              section or reach out to our support team if you&apos;re stuck.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact Support</span>
                </Link>
              </Button>
              <Link
                href="/faqs"
                className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-[var(--primary)] underline-offset-2 hover:underline"
              >
                View FAQs
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Need help with a recent order?
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-[var(--muted-foreground)]">
                The fastest way to get help is to have your{" "}
                <span className="font-medium text-[var(--foreground)]">
                  order number
                </span>{" "}
                ready.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-sm text-[var(--muted-foreground)]">
              <ol className="space-y-2 list-decimal pl-4 md:pl-5">
                <li>Go to the Orders page while signed in to your account.</li>
                <li>Find the order you need help with.</li>
                <li>
                  Check the status, payment details, and any delivery updates.
                </li>
                <li>
                  If something looks wrong, contact support and mention your
                  order number.
                </li>
              </ol>
              <Button asChild variant="outline" className="mt-1">
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 text-xs md:text-sm"
                >
                  <Package className="h-4 w-4" />
                  <span>Go to my orders</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Quick topic cards */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">
              Browse help topics
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)] max-w-2xl">
              Choose a topic below to learn more. Each section links to the most
              relevant page for managing your orders, payments, and account
              settings.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group h-full"
                >
                  <Card className="flex h-full flex-col border-[var(--border)] bg-[var(--card)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-[var(--muted)]/70 p-2.5">
                          <Icon className="h-4 w-4 text-[var(--primary)]" />
                        </div>
                        <h3 className="text-sm md:text-base font-semibold text-[var(--foreground)]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
                        {item.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-[0.7rem] md:text-xs font-medium text-[var(--primary)]">
                        Learn more
                        <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular questions / guidance */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Popular help questions
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-[var(--muted-foreground)]">
                Quick answers to some of the most common issues customers face.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs md:text-sm text-[var(--muted-foreground)]">
              <div>
                <p className="font-medium text-[var(--foreground)]">
                  My payment was successful, but I don&apos;t see my order.
                </p>
                <p className="mt-1">
                  First, refresh the Orders page. If the order still doesn&apos;t
                  appear after a few minutes, contact support with your email
                  address and any payment reference you received.
                </p>
              </div>

              <div>
                <p className="font-medium text-[var(--foreground)]">
                  The delivery date has passed, but my order hasn&apos;t arrived.
                </p>
                <p className="mt-1">
                  Check your order status for any updates. If it shows as
                  delivered but you haven&apos;t received it, or if there are no
                  updates, please contact support and include your order number.
                </p>
              </div>

              <div>
                <p className="font-medium text-[var(--foreground)]">
                  I received a damaged or incorrect item.
                </p>
                <p className="mt-1">
                  We&apos;re sorry this happened. Please take clear photos of
                  the item and packaging, then contact support within the
                  specified return window. Our team will review and offer a
                  replacement or refund where applicable.
                </p>
              </div>

              <div>
                <p className="font-medium text-[var(--foreground)]">
                  I can&apos;t sign in to my account.
                </p>
                <p className="mt-1">
                  Try using the &quot;Forgot password&quot; option. If you still
                  can&apos;t sign in or suspect unauthorized access, contact
                  support immediately so we can help secure your account.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--muted)]/40 border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Still need help?
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-[var(--muted-foreground)]">
                Our support team is here to assist you with anything you can&apos;t
                find in the Help Center.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs md:text-sm text-[var(--muted-foreground)]">
              <p>
                For the fastest response, include your order number, the email
                address used at checkout, and a short description of the issue.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact support</span>
                  </Link>
                </Button>
                <Link
                  href="/faqs"
                  className="inline-flex items-center gap-1 text-[0.7rem] md:text-xs font-medium text-[var(--primary)] underline-offset-2 hover:underline"
                >
                  Browse FAQs
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Container>
  );
}
