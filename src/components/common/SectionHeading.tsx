import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  link?: { href: string; label: string };
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  link,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex flex-wrap items-end gap-x-10 gap-y-6",
            align === "center" ? "flex-col items-center" : "justify-between",
          )}
        >
          <div className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
            {eyebrow && (
              <span
                className={cn(
                  "label inline-flex items-center",
                  dark ? "text-gold" : "text-gold-dark",
                )}
              >
                <span className="mr-3 h-px w-8 bg-current opacity-60" />
                {eyebrow}
              </span>
            )}
            <h2
              className={cn(
                "max-w-3xl text-balance font-display text-display-sm font-light leading-[1.02]",
                dark ? "text-cream" : "text-ink",
                titleClassName,
              )}
            >
              {title}
            </h2>
          </div>

          {link && (
            <Link
              href={link.href}
              data-cursor-label="Explore"
              className={cn(
                "group inline-flex shrink-0 items-center gap-3 font-sans text-2xs uppercase tracking-luxe transition-colors",
                dark ? "text-cream/80 hover:text-gold" : "text-ink-soft hover:text-oxblood",
              )}
            >
              {link.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1.5" />
            </Link>
          )}
        </div>
      </Reveal>

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-prose2 text-pretty text-lg leading-relaxed",
              align === "center" && "mx-auto",
              dark ? "text-cream/70" : "text-ink-muted",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
