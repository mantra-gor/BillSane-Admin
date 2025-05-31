"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  // Refs for animation targets
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const column3Ref = useRef(null);
  const column4Ref = useRef(null);
  const newsletterRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Set up scrollTrigger for footer elements
    const footerAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate footer background first
    footerAnimation.fromTo(
      footerRef.current,
      {
        backgroundPosition: "0% 100%",
        opacity: 0.8,
      },
      {
        backgroundPosition: "0% 0%",
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    // Animate logo and description
    footerAnimation.fromTo(
      [logoRef.current, descriptionRef.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" },
      "-=1"
    );

    // Animate social icons with a bounce effect
    if (socialsRef.current) {
      footerAnimation.fromTo(
        socialsRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.4"
      );
    }

    // Animate columns with staggered effect
    footerAnimation.fromTo(
      [
        column1Ref.current,
        column2Ref.current,
        column3Ref.current,
        column4Ref.current,
      ],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // Animate newsletter section
    footerAnimation.fromTo(
      newsletterRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Animate copyright at the end
    footerAnimation.fromTo(
      copyrightRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    );

    // Clean up function
    return () => {
      if (footerAnimation.scrollTrigger) {
        footerAnimation.scrollTrigger.kill();
      }
    };
  }, []);

  // Handle hover effect for links
  const handleLinkHover = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    isEnter: boolean
  ) => {
    const target = e.currentTarget;
    gsap.to(target, {
      x: isEnter ? 5 : 0,
      color: isEnter ? "#ffffff" : "#cbd5e1",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Handle hover effect for social icons
  const handleSocialHover = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    isEnter: boolean
  ) => {
    const target = e.currentTarget;
    gsap.to(target, {
      y: isEnter ? -4 : 0,
      scale: isEnter ? 1.15 : 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-prussian_blue to-prussian_blue-900 text-white py-16 overflow-hidden"
      style={{
        backgroundSize: "100% 200%",
        backgroundPosition: "0% 100%",
      }}
    >
      {/* Decorative shape elements */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-munsell_blue-500/20 to-teal-500/20 opacity-30 transform -skew-y-2"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-64 bg-prussian_blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-teal-300/10 rounded-full blur-xl animate-bounce"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12">
          {/* First column - Logo & description */}
          <div className="md:col-span-3">
            <div ref={logoRef} className="mb-4">
              <Link href="/" className="inline-block">
                <h2 className="text-2xl font-bold text-white">BillSane</h2>
              </Link>
            </div>

            <p ref={descriptionRef} className="text-slate-300 mb-6">
              Modern billing and business management solution designed to
              simplify your enterprise operations and optimize financial
              workflows.
            </p>

            <div ref={socialsRef} className="flex space-x-4 mb-8">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail size={16} className="text-munsell_blue" />
                <span>contact@billsane.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone size={16} className="text-munsell_blue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin size={16} className="text-munsell_blue mt-1" />
                <span>
                  123 Business Avenue, Suite 200
                  <br />
                  Tech City, CA 94103
                </span>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          <div ref={column1Ref} className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 relative">
              Product
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-munsell_blue-400 mt-1"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Download App
                </Link>
              </li>
              <li>
                <Link
                  href="/updates"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* <div ref={column2Ref} className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 relative">
              Support
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 mt-1"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  System Status
                </Link>
              </li>
            </ul>
          </div> */}

          <div ref={column3Ref} className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 relative">
              Company
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-munsell_blue-400 mt-1"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-slate-300 hover:text-white flex items-center transition-all duration-300"
                  onMouseEnter={(e) => handleLinkHover(e, true)}
                  onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                  <ChevronRight
                    size={14}
                    className="opacity-0 transition-opacity duration-300 mr-1 text-blue-300"
                  />
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter section */}
          <div ref={newsletterRef} className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-6 relative">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-munsell_blue-400 mt-1"></span>
            </h3>
            <p className="text-slate-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-l from-munsell_blue to-munsell_blue-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div
          ref={copyrightRef}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-300"
        >
          <p>
            &copy; {new Date().getFullYear()} BillSane. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
