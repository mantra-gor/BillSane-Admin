import type { ReactNode } from "react";

/** A keyboard key, styled like the desktop app's shortcut chips. */
export default function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-surface-subtle px-1.5 font-sans text-[11px] font-semibold text-ink-soft shadow-field">
      {children}
    </kbd>
  );
}
