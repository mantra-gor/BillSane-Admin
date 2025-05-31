"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// Navigation items
const navItems = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/pricing", label: "Pricing" },
  { path: "/support", label: "Support" },
  { path: "/about", label: "About Us" },
];

export default function NewNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuBackdropRef = useRef(null);

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initial animations for navbar elements
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.5 }
    );

    if (desktopLinksRef.current && desktopLinksRef.current.children) {
      tl.fromTo(
        Array.from(desktopLinksRef.current.children),
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.3"
      );
    }

    tl.fromTo(
      ctaButtonRef.current,
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5 },
      "-=0.2"
    );

    // Scroll trigger for navbar background
    ScrollTrigger.create({
      start: "top -=50",
      end: "bottom top",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle scroll state for navbar styling
  useEffect(() => {
    if (!navbarRef.current) return;

    if (isScrolled) {
      gsap.to(navbarRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        height: "70px",
        backdropFilter: "blur(12px)",
        duration: 0.3,
        ease: "power2.out",
        display: "flex",
      });
    } else {
      gsap.to(navbarRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "none",
        height: "80px",
        backdropFilter: "blur(8px)",
        duration: 0.3,
        ease: "power2.out",
        display: "flex",
      });
    }
  }, [isScrolled]);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const menuItems = mobileMenuRef.current.querySelectorAll("a");

    if (isMenuOpen) {
      // Mobile menu open animation
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.to(menuBackdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        menuItems,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.2,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Mobile menu close animation
      gsap.to(menuItems, {
        x: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(menuBackdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });

      // Restore body scroll
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Close menu when clicking outside or on backdrop
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if current path matches nav item
  const isActivePath = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all"
        style={{
          height: "80px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          display: "none",
        }}
      >
        <div className="container mx-auto h-full px-4 lg:px-6">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div ref={logoRef} className="relative z-10">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-no-background.png"
                  alt="BillSane Logo"
                  width={160}
                  height={42}
                  className="object-contain transition-all duration-300 hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              ref={desktopLinksRef}
              className="hidden md:flex items-center space-x-2 lg:space-x-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative group font-medium text-base py-3 px-4 transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "text-primary-900 tracking-wide"
                      : "text-primary-300"
                  }`}
                >
                  {item.label}
                  <span
                    className={`block h-[2px] transition-all duration-300 ease-out mt-2 group-hover:w-full ${
                      isActivePath(item.path)
                        ? "w-full bg-munsell_blue"
                        : "w-0 group-hover:w-full bg-munsell_blue"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div ref={ctaButtonRef} className="hidden md:block">
              <Link
                href="/pricing"
                className="inline-flex font-semibold items-center justify-center bg-gradient-to-l from-munsell_blue to-munsell_blue-600 text-white text-sm px-6 py-2.5 rounded-md shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-5">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        ref={menuBackdropRef}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        style={{ opacity: 0 }}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl md:hidden border-l border-gray-200"
        style={{ display: "none", transform: "translateX(100%)" }}
      >
        <div className="flex flex-col h-full w-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="text-lg font-semibold text-gray-900">Menu</div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block py-3 px-4 text-base rounded-lg transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "text-munsell_blue-700 bg-blue-50 font-medium border-l-4 border-munsell_blue-500"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="p-6 border-t border-gray-100">
            <Link
              href="/pricing"
              className="inline-flex font-semibold items-center justify-center bg-gradient-to-l from-munsell_blue to-munsell_blue-600 text-white text-sm px-6 py-2.5 rounded-md shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all duration-300"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
