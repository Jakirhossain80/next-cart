// app/contact/page.tsx
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Container from "@/components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us | NextCart",
  description:
    "Get in touch with the NextCart support team. We’re here to help with orders, returns, payments, and general questions.",
  openGraph: {
    title: "Contact NextCart Support",
    description:
      "Need help with an order, payment, or account? Reach out to the NextCart support team.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Container className="py-10 md:py-12 lg:py-16">
      <div className="space-y-6 md:space-y-8">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-[var(--muted-foreground)]">
            Have a question about your order, payment, or our products? Fill out
            the form or reach us using the contact details below. Our support
            team typically responds within 24 hours.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] xl:gap-8">
          {/* Contact info */}
          <div className="space-y-4 md:space-y-5">
            <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                  Support Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-[var(--muted)] p-2">
                    <Mail className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Email
                    </p>
                    <p className="text-[var(--muted-foreground)]">
                      support@nextcart.dev
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-[var(--muted)] p-2">
                    <Phone className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Phone
                    </p>
                    <p className="text-[var(--muted-foreground)]">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-[var(--muted)] p-2">
                    <MapPin className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Address
                    </p>
                    <p className="text-[var(--muted-foreground)]">
                      123 Commerce Street, Suite 400
                      <br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-[var(--muted)] p-2">
                    <Clock className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      Support Hours
                    </p>
                    <p className="text-[var(--muted-foreground)]">
                      Saturday – Thursday: 9:00 AM – 8:00 PM
                      <br />
                      (GMT+6 / Asia&#x2F;Dhaka)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[var(--muted)]/40 border-[var(--border)] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                  Order & Payment Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm md:text-base text-[var(--muted-foreground)]">
                <p>
                  For questions about a recent order, please include your{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    Order Number
                  </span>{" "}
                  in the message so we can help you faster.
                </p>
                <p>
                  We’ll never ask for your full card number or password over
                  email.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-[var(--foreground)]">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* No real backend wired yet – hook this up to an API route or 3rd party later */}
              <form
                className="space-y-4 md:space-y-5"
                action="#"
                method="post"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs md:text-sm font-medium text-[var(--foreground)]"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Md. Jakir Hossain"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs md:text-sm font-medium text-[var(--foreground)]"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs md:text-sm font-medium text-[var(--foreground)]"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="Order support, payment issue, general question..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs md:text-sm font-medium text-[var(--foreground)]"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your question or issue in detail..."
                  />
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-[0.7rem] md:text-xs text-[var(--muted-foreground)]">
                    By submitting, you agree that we may contact you about your
                    request using the details provided.
                  </p>
                  <Button
                    type="submit"
                    className="inline-flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
