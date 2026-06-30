import Image from "next/image";
import { cn } from "@/lib/utils";

interface WatchImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  treatment?: "heritage" | "deep" | "none";
  vignette?: boolean;
}

/** next/image wrapped with the unified warm-heritage photographic treatment. */
export function WatchImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = "100vw",
  priority,
  className,
  imgClassName,
  treatment = "heritage",
  vignette = false,
}: WatchImageProps) {
  const t =
    treatment === "heritage"
      ? "img-heritage"
      : treatment === "deep"
        ? "img-heritage-deep"
        : "";
  return (
    <div className={cn("relative overflow-hidden bg-parchment-dark", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={cn("h-full w-full object-cover", t, imgClassName)}
      />
      {vignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 140px 24px rgba(20,16,12,0.55)" }}
        />
      )}
    </div>
  );
}
