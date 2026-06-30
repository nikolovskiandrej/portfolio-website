import { Fragment } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Minimal, typographic breadcrumb trail. Server-renderable. */
export function Breadcrumb({
  items,
  tone = "ink",
  className,
}: {
  items: Crumb[];
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("font-sans text-2xs uppercase tracking-luxe", className)}
    >
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li>
                {item.href && !last ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors duration-300",
                      tone === "cream"
                        ? "text-cream/55 hover:text-gold-pale"
                        : "text-ink-faint hover:text-oxblood",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className={tone === "cream" ? "text-cream" : "text-ink-soft"}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!last && (
                <li
                  aria-hidden
                  className={tone === "cream" ? "text-cream/25" : "text-ink-faint/50"}
                >
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
