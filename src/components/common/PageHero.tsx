import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { Breadcrumb, type Crumb } from "@/components/common/Breadcrumb";
import { WatchImage } from "@/components/common/WatchImage";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image?: string;
  breadcrumb?: Crumb[];
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  /** small overline metric, e.g. number of pieces */
  meta?: string;
  children?: ReactNode;
}

const HEIGHTS = {
  sm: "min-h-[clamp(360px,52vh,560px)]",
  md: "min-h-[clamp(440px,64vh,680px)]",
  lg: "min-h-[clamp(560px,82vh,860px)]",
};

/** Dark, full-bleed page masthead. Sits behind the transparent header on
 *  catalogue, collection and editorial routes. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumb,
  align = "left",
  size = "md",
  meta,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex w-full items-end overflow-hidden bg-espresso text-cream",
        HEIGHTS[size],
      )}
    >
      {image ? (
        <>
          <WatchImage
            src={image}
            alt=""
            priority
            treatment="deep"
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
            imgClassName="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-radial-gold" />
      )}
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      <Container
        size="wide"
        className={cn(
          "relative z-10 pb-14 pt-[132px] sm:pb-20",
          align === "center" && "flex flex-col items-center text-center",
        )}
      >
        {breadcrumb && (
          <Reveal dir="none" duration={0.8}>
            <Breadcrumb items={breadcrumb} tone="cream" className="mb-9" />
          </Reveal>
        )}

        {eyebrow && (
          <Reveal dir="up" duration={0.8}>
            <p className="label mb-5 inline-flex items-center text-gold">
              <span className="mr-3 h-px w-8 bg-current opacity-60" />
              {eyebrow}
            </p>
          </Reveal>
        )}

        <Reveal dir="up" delay={0.05}>
          <h1
            className={cn(
              "max-w-4xl text-balance font-display text-display-md font-light leading-[0.98] text-cream",
              align === "center" && "mx-auto",
            )}
          >
            {title}
          </h1>
        </Reveal>

        {description && (
          <Reveal dir="up" delay={0.12}>
            <p
              className={cn(
                "mt-7 max-w-prose2 text-pretty font-serif text-lg leading-relaxed text-cream/75",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          </Reveal>
        )}

        {meta && (
          <Reveal dir="up" delay={0.18}>
            <p className="mt-8 font-sans text-2xs uppercase tracking-luxe text-cream/55">{meta}</p>
          </Reveal>
        )}

        {children && (
          <Reveal dir="up" delay={0.18}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
