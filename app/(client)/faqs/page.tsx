// app/faqs/page.tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "FAQs | NextCart",
  description:
    "Find answers to frequently asked questions about orders, payments, shipping, and returns on NextCart.",
  openGraph: {
    title: "NextCart FAQs",
    description:
      "Frequently asked questions about using NextCart, placing orders, payments, shipping, and returns.",
    type: "website",
    url: "/faqs",
  },
};

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "After completing your payment, you can track your order from the Orders page when you are signed in. You’ll also receive an email with your order number and status updates.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We process payments securely via Stripe. Depending on your region, you can typically use major credit and debit cards such as Visa, Mastercard, and American Express.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "If your order has not yet been shipped, you can contact our support team with your order number to request changes or cancellation. Once an order is shipped, we may not be able to modify it.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "If you receive a damaged or incorrect item, please contact us within the specified return window shown on your order details. After reviewing your case, we may offer a replacement or refund according to our policy.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "We recommend creating an account so you can easily track orders, manage addresses, and view your purchase history. Some features, such as order history and wishlist, require an account.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. All payments are processed by Stripe using industry-standard encryption. We do not store your full card details on our servers.",
  },
];

export default function FAQsPage() {
  return (
    <Container className="py-10 md:py-12 lg:py-16">
      <div className="space-y-6 md:space-y-8">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-[var(--muted-foreground)]">
            Need help with something? Start with our most common questions about
            orders, payments, shipping, and returns. If you can&apos;t find the
            answer, feel free to{" "}
            <a
              href="/contact"
              className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>

        <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              General &amp; Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-3 md:p-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm md:text-base font-medium text-[var(--foreground)]">
                  <span>{faq.question}</span>
                  <span className="text-xs md:text-sm text-[var(--muted-foreground)] group-open:hidden">
                    Show
                  </span>
                  <span className="text-xs md:text-sm text-[var(--muted-foreground)] hidden group-open:inline">
                    Hide
                  </span>
                </summary>
                <div className="mt-2 text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[var(--muted)]/40 border-[var(--border)] shadow-sm">
          <CardHeader>
            <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
              Still have questions?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm md:text-base text-[var(--muted-foreground)]">
            <p>
              If you don&apos;t see your question listed here, our support team
              is happy to help.
            </p>
            <p>
              Reach out via our{" "}
              <a
                href="/contact"
                className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
              >
                Contact page
              </a>{" "}
              and we&apos;ll get back to you as soon as possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
