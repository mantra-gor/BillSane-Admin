"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
}

/**
 * Sticky jump links under the site header. The link for the section in the
 * middle of the viewport is marked current, so the long page stays oriented.
 */
export default function FeatureNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-16 z-30 bg-canvas/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md">
      <Container>
        <nav aria-label="Features" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="flex h-14 w-max items-center gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 ease-snap",
                    active === item.id
                      ? "bg-surface text-ink shadow-card"
                      : "text-ink-soft hover:bg-surface/70 hover:text-ink"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
