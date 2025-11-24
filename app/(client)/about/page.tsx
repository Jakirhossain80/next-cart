// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Globe2,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | NextCart",
  description:
    "Learn more about NextCart – a modern e-commerce experience focused on trusted products, secure payments, and a smooth shopping journey.",
  openGraph: {
    title: "About NextCart",
    description:
      "Discover who we are, what we believe in, and how NextCart is building a better online shopping experience.",
    type: "website",
    url: "/about",
  },
};

const stats = [
  {
    label: "Products curated",
    value: "5K+",
  },
  {
    label: "Orders processed",
    value: "20K+",
  },
  {
    label: "Customer satisfaction",
    value: "98%",
  },
];

const values = [
  {
    title: "Customer-first mindset",
    description:
      "Every feature, from our product listings to our order tracking, is designed to make your shopping journey smooth and transparent.",
    icon: HeartHandshake,
  },
  {
    title: "Trust & Transparency",
    description:
      "Clear pricing, honest product descriptions, and secure payments. No hidden tricks, no confusing terms.",
    icon: ShieldCheck,
  },
  {
    title: "Reliability at scale",
    description:
      "Built with modern web technologies so your experience stays fast, stable, and responsive, even during busy seasons.",
    icon: Globe2,
  },
];

const reasons = [
  {
    title: "Modern, intuitive experience",
    description:
      "A clean, responsive interface that works beautifully on mobile and desktop so you can shop from anywhere.",
    icon: Sparkles,
  },
  {
    title: "Secure checkout powered by Stripe",
    description:
      "We use industry-standard encryption and trusted payment providers to keep your transactions safe.",
    icon: ShoppingBag,
  },
  {
    title: "Fast shipping & clear updates",
    description:
      "Real-time order status and clear communication help you know exactly where your order is.",
    icon: Truck,
  },
  {
    title: "Built by people who care",
    description:
      "NextCart is crafted with attention to detail, constant iteration, and a passion for great user experience.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <Container className="py-10 md:py-12 lg:py-16">
      <div className="space-y-8 md:space-y-10">
        {/* Hero section */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-4 md:space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
              <ShoppingBag className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span>About NextCart</span>
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              Building a better way to shop online.
            </h1>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-xl">
              NextCart is a modern e-commerce experience focused on trusted
              products, secure payments, and a smooth shopping journey. We blend
              clean design with a robust technology stack to make every step—
              from browsing to checkout—feel effortless.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm md:text-base"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Start shopping</span>
                </Link>
              </Button>
              <Link
                href="/help"
                className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-[var(--primary)] underline-offset-2 hover:underline"
              >
                Visit Help Center
              </Link>
            </div>
          </div>

          <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Our mission
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-[var(--muted-foreground)]">
                A trustworthy shopping experience from first click to delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-sm text-[var(--muted-foreground)]">
              <p>
                We believe online shopping should feel simple, transparent, and
                enjoyable. That&apos;s why NextCart focuses on clear product
                information, reliable stock data, and a checkout that&apos;s as
                secure as it is fast.
              </p>
              <p>
                Behind the scenes, we use modern tools and best practices so
                your experience stays consistent, whether you&apos;re browsing
                our deals page, managing your orders, or reading our latest
                blog posts.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Stats */}
        <section className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/40 px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-start gap-1 sm:items-center sm:text-center"
            >
              <p className="text-xl md:text-2xl font-semibold text-[var(--foreground)]">
                {item.value}
              </p>
              <p className="text-[0.7rem] md:text-xs text-[var(--muted-foreground)]">
                {item.label}
              </p>
            </div>
          ))}
        </section>

        {/* Values */}
        <section className="space-y-4 md:space-y-5">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">
              What we stand for
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
              Our values guide how we design, build, and improve NextCart every
              day—from the technology choices we make to how we listen to
              customer feedback.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="h-full border-[var(--border)] bg-[var(--card)] shadow-sm"
                >
                  <CardContent className="flex h-full flex-col gap-3 p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[var(--muted)]/70 p-2.5">
                        <Icon className="h-4 w-4 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-[var(--foreground)]">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Our story */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Our story
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-[var(--muted-foreground)]">
                From idea to a full-stack experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-sm text-[var(--muted-foreground)]">
              <p>
                NextCart started with a simple idea: create an e-commerce
                experience that feels trustworthy and delightful for both new
                and experienced shoppers. Instead of reinventing the wheel, we
                focused on getting the fundamentals exactly right.
              </p>
              <p>
                That means fast product discovery, clear categories and brands,
                real-time stock information, and a checkout flow that just
                works. Every part of the system—from the storefront UI to the
                backend order processing and content management—is carefully
                integrated to deliver a cohesive experience.
              </p>
              <p>
                As we continue to grow, we&apos;re committed to iterating on
                features, refining performance, and introducing thoughtful
                improvements based on how people actually use NextCart.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[var(--muted)]/40 border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Technology that supports the experience
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-[var(--muted-foreground)]">
                Modern tools, real-world reliability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-sm text-[var(--muted-foreground)]">
              <p>
                NextCart uses a modern tech stack to deliver a smooth experience
                end-to-end—from dynamic product content to secure payments and
                order tracking.
              </p>
              <ul className="space-y-1.5 list-disc pl-4 md:pl-5">
                <li>Performance-focused Next.js frontend with clean UI.</li>
                <li>
                  Structured content powering products, brands, and blogs for
                  flexible updates.
                </li>
                <li>
                  Secure payment flows and webhooks to keep order data accurate.
                </li>
              </ul>
              <p>
                All of this is built with scalability and maintainability in
                mind so the platform can evolve as new features are added.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why shop with us / CTA */}
        <section className="space-y-4 md:space-y-5">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">
              Why shop with NextCart?
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
              Here are a few reasons customers choose NextCart for their online
              shopping, and why they keep coming back.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <Card
                  key={reason.title}
                  className="border-[var(--border)] bg-[var(--card)] shadow-sm"
                >
                  <CardContent className="flex gap-3 p-4 md:p-5">
                    <div className="mt-1 rounded-xl bg-[var(--muted)]/70 p-2.5">
                      <Icon className="h-4 w-4 text-[var(--primary)]" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-sm md:text-base font-semibold text-[var(--foreground)]">
                        {reason.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
                        {reason.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-2 bg-[var(--muted)]/40 border-[var(--border)] shadow-sm">
            <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-[var(--foreground)]">
                  Ready to explore NextCart?
                </p>
                <p className="text-[0.7rem] md:text-xs text-[var(--muted-foreground)] max-w-xl">
                  Browse our latest products, discover deals, and experience a
                  modern e-commerce platform built with care.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button asChild>
                  <Link
                    href="/deal"
                    className="inline-flex items-center gap-2 text-sm md:text-base"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>View hot deals</span>
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-xs md:text-sm"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Go to shop</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Container>
  );
}
