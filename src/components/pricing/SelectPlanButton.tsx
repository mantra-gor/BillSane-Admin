"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button, { type ButtonVariant } from "@/components/ui/Button";

/**
 * Remembers the chosen plan for registration and moves on. The `order` key and
 * its `{ planId }` shape are the hand-off contract with the register flow.
 */
export default function SelectPlanButton({
  planId,
  planName,
  variant,
}: {
  planId: number;
  planName: string;
  variant: ButtonVariant;
}) {
  const router = useRouter();

  const choose = () => {
    try {
      sessionStorage.setItem("order", JSON.stringify({ planId }));
    } catch {
      // Storage can be blocked (private windows); registration still opens.
    }
    router.push("/register");
  };

  return (
    <Button
      variant={variant}
      size="lg"
      fullWidth
      onClick={choose}
      aria-label={`Get started with ${planName}`}
      trailing={<ArrowRight size={16} aria-hidden="true" />}
    >
      Get started
    </Button>
  );
}
