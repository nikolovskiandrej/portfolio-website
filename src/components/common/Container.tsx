import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** wider gutter rhythm for full sections */
  size?: "default" | "wide" | "narrow";
}

/** Centered max-width wrapper with the site's horizontal rhythm. */
export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16",
        size === "default" && "max-w-8xl",
        size === "wide" && "max-w-9xl",
        size === "narrow" && "max-w-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
