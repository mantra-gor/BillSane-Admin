"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  Zap,
  Building2,
  Crown,
  ArrowRight,
  Sparkles,
  Shield,
  Headphones,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/ui/Loader";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  id: number;
  name: "Starter" | "Professional" | "Enterprise";
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  icon: React.ReactNode;
  gradient: string;
  shadowColor: string;
  borderGradient: string;
}

const planVisuals: Record<
  PricingPlan["name"],
  Pick<PricingPlan, "icon" | "gradient" | "shadowColor" | "borderGradient">
> = {
  Starter: {
    icon: <Zap className="w-7 h-7" />,
    gradient: "from-primary-600 via-primary-700 to-primary-400",
    shadowColor: "shadow-primary-500/25",
    borderGradient: "from-primary-400 to-primary-600",
  },
  Professional: {
    icon: <Building2 className="w-7 h-7" />,
    gradient: "from-munsell_blue-600 via-munsell_blue-700 to-munsell_blue-500",
    shadowColor: "shadow-munsell_blue/25",
    borderGradient: "from-munsell_blue-400 to-munsell_blue-500",
  },
  Enterprise: {
    icon: <Crown className="w-7 h-7" />,
    gradient: "from-prussian_blue-800 via-prussian_blue to-prussian_blue-600",
    shadowColor: "shadow-prussian_blue-600/25",
    borderGradient: "from-prussian_blue-400 to-prussian_blue-500",
  },
};

const PricingPage: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get<{ planList: PricingPlan[] }>(
          "/api/masters/plan/list"
        );
        setPlans(
          res.data.planList.map((plan) => ({
            ...plan,
            ...planVisuals[plan.name],
          }))
        );
      } catch (err) {
        setError("Failed to fetch pricing plans. Please try again later.");
        console.error("Error fetching plans:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (
      !heroRef.current ||
      !cardsRef.current ||
      !ctaRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current ||
      !backgroundRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([heroRef.current, cardsRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 0,
        y: 30,
      });

      const bgChildren = backgroundRef.current?.children
        ? Array.from(backgroundRef.current.children)
        : [];

      if (bgChildren.length) {
        gsap.set(bgChildren, { opacity: 0.4 });
        gsap.to(bgChildren, {
          opacity: 0.6,
          duration: 1.5,
          ease: "power1.out",
        });
      }

      const tl = gsap.timeline();
      tl.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power1.out",
      })
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          },
          "-=0.2"
        )
        .to(
          [card1Ref.current, card2Ref.current, card3Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power1.out",
          },
          "-=0.1"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          },
          "-=0.1"
        );

      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      cards.forEach((card) => {
        if (card) {
          const cardElement = card as HTMLElement;
          const button = cardElement.querySelector(".pricing-button");
          const icon = cardElement.querySelector(".card-icon");

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
              duration: 0.2,
              ease: "power1.out",
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.2,
                ease: "power1.out",
              });
            }
          });

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              duration: 0.2,
              ease: "power1.out",
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.2,
                ease: "power1.out",
              });
            }
          });

          if (button) {
            const arrow = button.querySelector(".arrow-icon");
            if (arrow) {
              button.addEventListener("mouseenter", () => {
                gsap.to(arrow, {
                  x: 3,
                  duration: 0.15,
                  ease: "power1.out",
                });
              });

              button.addEventListener("mouseleave", () => {
                gsap.to(arrow, {
                  x: 0,
                  duration: 0.15,
                  ease: "power1.out",
                });
              });
            }
          }
        }
      });

      const sparkles = document.querySelectorAll(".sparkle");
      sparkles.forEach((sparkle) => {
        gsap.to(sparkle, {
          rotation: 360,
          duration: 4,
          ease: "none",
          repeat: -1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [plans]);

  const handlePlanSelect = (planId: number) => {
    sessionStorage.setItem("order", JSON.stringify({ planId }));
    router.push("/register");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-slate-200/30 to-slate-300/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div ref={heroRef} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full text-sm font-medium text-slate-700 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-munsell_blue-600" />
            One-time purchase • Lifetime access • No subscriptions
            <Shield className="w-4 h-4 text-green-600 ml-1" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-primary-800 via-primary-600 to-primary-400 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-munsell_blue-600 via-munsell_blue-700 to-munsell_blue-700 bg-clip-text text-transparent">
              BillSane Plan
            </span>
          </h1>

          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed font-light mb-6">
            Transform your business finances with our comprehensive, one-time
            purchase solution. Professional-grade tools without the recurring
            fees.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-primary-500">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-munsell_blue-600" />
              <span>Expert support included</span>
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
        >
          {plans.map((plan, index) => {
            const cardRef =
              index === 0 ? card1Ref : index === 1 ? card2Ref : card3Ref;

            return (
              <div
                key={plan.name}
                ref={cardRef}
                className={`relative group ${
                  plan.isPopular ? "lg:scale-105" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-munsell_blue-600 to-munsell_blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-xl border-2 border-white">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl ${plan.shadowColor} border-2 border-transparent bg-gradient-to-b from-white to-primary-50/50 transition-all duration-200 ease-out hover:shadow-3xl`}
                  style={{
                    background:
                      "linear-gradient(145deg, white, rgba(248, 250, 252, 0.8))",
                    borderImage: plan.isPopular
                      ? `linear-gradient(145deg, ${plan.borderGradient}) 1`
                      : undefined,
                  }}
                >
                  <div className="text-center mb-10">
                    <div
                      className={`card-icon inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${plan.gradient} text-white mb-6 shadow-xl transition-transform duration-200 ease-out`}
                    >
                      {plan.icon}
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 mb-3">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {plan.description}
                    </p>
                  </div>

                  <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-4 mb-3">
                      {plan.originalPrice && (
                        <span className="text-xl text-slate-400 line-through font-medium">
                          ₹{Number(plan.originalPrice).toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        ₹{Number(plan.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 font-medium mb-3">
                      One-time payment • Forever yours
                    </div>
                    {plan.originalPrice && (
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                        Save{" "}
                        {Math.round(
                          (1 -
                            parseInt(plan.price.replace("$", "")) /
                              parseInt(plan.originalPrice.replace("$", ""))) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>

                  <div className="space-y-5 mb-10">
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 feature-item"
                      >
                        <div
                          className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}
                        >
                          <Check className="w-4 h-4 text-white font-bold" />
                        </div>
                        <span className="text-primary-700 leading-relaxed font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`cursor-pointer pricing-button w-full py-5 px-8 rounded-2xl bg-gradient-to-r ${plan.gradient} text-white font-semibold shadow-2xl hover:shadow-3xl transition-all duration-150 ease-out border border-primary/20`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-lg">Get Started Today</span>
                      <ArrowRight className="w-5 h-5 arrow-icon transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ctaRef} className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-200/50 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Looking for a tailored plan for your business?
            </h3>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Our expert team is here to understand your needs, guide you
              through your options, and answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-150 ease-out shadow-xl hover:shadow-2xl">
                <Headphones className="w-5 h-5" />
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
