import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The site's content column: 1200px, with 16px gutters on phones. */
export function Container({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}
      {...rest}
    />
  );
}

const TONES = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  shell: "bg-shell text-white",
};

interface SectionProps extends ComponentProps<"section"> {
  tone?: keyof typeof TONES;
}

/** A page band. Sections separate by space and tone, not by divider lines. */
export function Section({ tone = "canvas", className, children, ...rest }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", TONES[tone], className)} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Use h1 for the page's top heading. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Heading
        className={cn(
          "font-semibold",
          Heading === "h1"
            ? "text-[2.75rem] sm:text-6xl"
            : "text-[2rem] sm:text-[2.75rem]",
          "leading-[1.05]"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}

export default Section;
