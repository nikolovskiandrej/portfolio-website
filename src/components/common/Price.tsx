"use client";

import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Price({ amount, className }: { amount: number; className?: string }) {
  const { currency } = useStore();
  return <span className={cn("tnum", className)}>{formatPrice(amount, currency)}</span>;
}
