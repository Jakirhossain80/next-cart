// components/Footer.tsx
import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getCategories } from "@/sanity/queries";

const Footer = async () => {
  // Fetch categories dynamically from Sanity
  const categories =
    ((await getCategories()) as { title?: string; slug?: { current?: string } }[]) ||
    [];

  // Optionally limit how many categories show in the footer
  const footerCategories = categories.slice(0, 9); // enough for your list

  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand + description + socials */}
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover curated furniture collections at NextCart, blending style
              and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          {/* Quick links */}
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic categories from Sanity */}
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {footerCategories.map((cat) => {
                const slug = cat?.slug?.current;
                const title = cat?.title;

                if (!slug || !title) return null;

                return (
                  <li key={slug}>
                    <Link
                      href={`/category/${encodeURIComponent(slug)}`}
                      className="hover:text-shop_light_green hoverEffect font-medium"
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Subscribe to our newsletter to receive updates and exclusive
              offers
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Enter your email" type="email" required />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom line */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
