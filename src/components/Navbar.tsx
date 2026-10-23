"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/support", label: "Support" },
];

/**
 * Over the hero the header sits flat on the canvas. Once the hero has scrolled
 * under it, the links gather into one white, ring-edged pill that floats over
 * the page. Pages mark their hero with `data-hero`. On phones the same pill
 * opens downward to hold the links, with the perforation rule as the tear line.
 */
export default function Navbar() {
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch the page's hero; the pill takes over once its bottom passes the header.
  useEffect(() => {
    const hero =
      document.querySelector("[data-hero]") ?? document.querySelector("main")?.firstElementChild;
    if (!hero) {
      setIsPastHero(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 64),
      { rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };
    // The menu is phone-only, so growing past md must not leave the page locked.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = (e: MediaQueryListEvent) => e.matches && setIsMenuOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname.startsWith(path);
  const isPill = isPastHero || isMenuOpen;
  // Hover needs a fill that shows on whichever surface sits behind the links.
  const hoverFill = isPill ? "hover:bg-surface-muted" : "hover:bg-surface";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16">
      {/* Scrim behind the open menu; tapping it closes the menu. */}
      <div
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "fixed inset-0 -z-10 bg-ink/20 transition-opacity duration-200 ease-snap motion-reduce:transition-none md:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* The flat bar over the hero: canvas, so hero content scrolls out of sight beneath it. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-canvas transition-[opacity,box-shadow] duration-200 ease-snap motion-reduce:transition-none",
          isPill ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          isScrolled && "shadow-[0_1px_0_0_var(--color-line)]"
        )}
      />

      <Container className="relative h-full pt-2">
        <div
          className={cn(
            "pointer-events-auto -mx-2 rounded-3xl transition-[background-color,box-shadow] duration-200 ease-snap motion-reduce:transition-none sm:-mx-3 lg:-mx-5",
            isMenuOpen
              ? "bg-surface shadow-pop"
              : isPastHero
                ? "bg-surface shadow-raised"
                : "bg-transparent shadow-none"
          )}
        >
          <div className="grid h-12 grid-cols-[1fr_auto] items-center pl-4 pr-1 md:grid-cols-[1fr_auto_1fr] lg:pl-5">
            <Link
              href="/"
              aria-label="BillSane home"
              className="shrink-0 justify-self-start rounded-md"
            >
              <Image
                src="/logo-no-background.png"
                alt="BillSane"
                width={1500}
                height={433}
                priority
                className="h-[28px] w-auto"
              />
            </Link>

            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      className={cn(
                        "inline-flex h-8 items-center rounded-full px-3.5 text-sm font-medium transition-[background-color,color] duration-150 ease-snap",
                        isActive(item.path)
                          ? "bg-munsell_blue-5 text-munsell_blue-700"
                          : cn("text-ink-soft hover:text-ink", hoverFill)
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center justify-self-end">
              <ButtonLink
                href="/pricing"
                variant="primary"
                size="md"
                className="px-4 sm:px-[18px]"
                trailing={<ArrowRight size={14} aria-hidden="true" className="hidden sm:block" />}
              >
                Get started
              </ButtonLink>

              <button
                ref={toggleRef}
                type="button"
                className={cn(
                  "ml-1 inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-150 ease-snap md:hidden",
                  hoverFill
                )}
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Phone menu: the same plane, opened downward. */}
          <div
            id="mobile-menu"
            inert={!isMenuOpen}
            className={cn(
              "grid transition-[grid-template-rows] duration-200 ease-snap motion-reduce:transition-none md:hidden",
              isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <div role="presentation" className="rule-perforated mx-4 text-ink" />
              <nav aria-label="Main" className="p-2">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        aria-current={isActive(item.path) ? "page" : undefined}
                        className={cn(
                          "flex h-12 items-center justify-between rounded-2xl px-4 text-base font-medium transition-colors duration-150 ease-snap",
                          isActive(item.path)
                            ? "bg-munsell_blue-5 text-munsell_blue-700"
                            : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                        )}
                      >
                        {item.label}
                        <ChevronRight
                          size={16}
                          aria-hidden="true"
                          className={isActive(item.path) ? "text-munsell_blue-700" : "text-ink-faint"}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
