import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/register", label: "Get your license" },
  { href: "/support", label: "Support" },
];

const platforms = ["macOS", "Windows", "Linux"];

export default function Footer() {
  return (
    <footer className="bg-shell text-white">
      <Container className="pb-8 pt-14 sm:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.02em] [font-stretch:92%] sm:text-[3.25rem]">
              Make your finances{" "}
              <span className="text-munsell_blue-400">sane.</span>
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
              Everyday billing, inventory and insights in one simple app. Less
              time learning software, more time running your business.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href="/pricing"
              variant="accent"
              size="lg"
              trailing={<ArrowRight size={16} aria-hidden="true" />}
            >
              Get started
            </ButtonLink>
            <ButtonLink href="/features" variant="on-dark" size="lg">
              See features
            </ButtonLink>
          </div>
        </div>

        <div className="rule-perforated my-10 text-white sm:my-12" role="presentation" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <Link
              href="/"
              aria-label="BillSane home"
              className="inline-flex rounded-lg bg-white px-3 py-1.5"
            >
              <Image
                src="/logo-no-background.png"
                alt="BillSane"
                width={1500}
                height={433}
                className="h-6 w-auto"
              />
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-white/60">Desktop app for</span>
              {platforms.map((platform) => (
                <Badge key={platform} tone="on-dark">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-1 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} BillSane. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </Container>
    </footer>
  );
}
