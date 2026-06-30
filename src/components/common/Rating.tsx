import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function Rating({ value, count, size = 13, showValue = true, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const fillPct = Math.max(0, Math.min(1, value - i)) * 100;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                className="absolute inset-0 text-gold/30"
                style={{ width: size, height: size }}
                strokeWidth={1.2}
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPct}%` }}
              >
                <Star
                  className="fill-gold text-gold"
                  style={{ width: size, height: size }}
                  strokeWidth={1.2}
                />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="font-sans text-2xs tracking-wide text-ink-muted tnum">
          {value.toFixed(1)}
          {count != null && <span className="text-ink-faint"> · {count} reviews</span>}
        </span>
      )}
      <span className="sr-only">
        Rated {value} out of 5{count != null ? ` from ${count} reviews` : ""}
      </span>
    </div>
  );
}
