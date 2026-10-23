import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductShotProps {
  /** A real screenshot of the BillSane desktop app, e.g. /screens/invoice.png */
  src: string;
  /** Say what the screen shows, not "screenshot". */
  alt: string;
  width: number;
  height: number;
  /** Shown in the window's title bar. */
  title?: string;
  caption?: string;
  priority?: boolean;
  /** Lighter frame for screenshots placed on the navy shell. */
  onDark?: boolean;
  className?: string;
}

/**
 * A desktop-app screenshot seated in a neutral window frame. The frame is
 * deliberately OS-agnostic: BillSane ships on macOS, Windows and Linux.
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  title = "BillSane",
  caption,
  priority = false,
  onDark = false,
  className,
}: ProductShotProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "rounded-[20px] p-1.5 sm:p-2",
          onDark
            ? "bg-white/[0.06] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1)]"
            : "bg-surface-sunken/70 shadow-ring"
        )}
      >
        <div className="overflow-hidden rounded-[14px] bg-surface shadow-card">
          <div className="flex h-8 items-center gap-3 border-b border-line bg-surface-subtle px-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </span>
            <span className="truncate text-xs font-medium text-ink-muted">{title}</span>
          </div>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="block h-auto w-full"
            sizes="(min-width: 1200px) 1136px, 100vw"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

export default ProductShot;
