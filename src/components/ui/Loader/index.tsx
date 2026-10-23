import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  label?: string;
  className?: string;
}

function Loader({ label = "Loading", className }: LoaderProps) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-2 text-sm text-ink-muted", className)}>
      <Loader2 size={18} className="animate-spin text-munsell_blue" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default Loader;
