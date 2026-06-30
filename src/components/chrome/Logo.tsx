import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "ink" | "cream";
  className?: string;
  /** show the "Milano" overline */
  withMark?: boolean;
}

/** The Barro wordmark. Engraved serif, generously tracked. */
export function Logo({ tone = "ink", className, withMark = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Barro — home"
      data-cursor-label="Home"
      className={cn(
        "group inline-flex flex-col items-center leading-none",
        tone === "cream" ? "text-cream" : "text-ink",
        className,
      )}
    >
      <span className="font-display text-[1.6rem] font-medium tracking-[0.34em] sm:text-[1.75rem]">
        <span className="inline-block transition-transform duration-700 ease-luxe group-hover:-translate-y-px">
          BARRO
        </span>
      </span>
      {withMark && (
        <span
          className={cn(
            "mt-1 font-sans text-[8px] uppercase tracking-[0.42em] transition-colors duration-500",
            tone === "cream" ? "text-cream/55" : "text-ink-faint",
          )}
        >
          Milano · 1947
        </span>
      )}
    </Link>
  );
}
