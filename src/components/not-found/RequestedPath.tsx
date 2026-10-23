"use client";

import { usePathname } from "next/navigation";

/** The address the visitor asked for, shown as the bill's one line item. */
export default function RequestedPath() {
  const pathname = usePathname();
  return (
    <span className="min-w-0 break-all font-semibold text-ink">{pathname}</span>
  );
}
