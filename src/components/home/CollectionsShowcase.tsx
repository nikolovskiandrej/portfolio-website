import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion";
import { WatchImage } from "@/components/common/WatchImage";
import { collections } from "@/lib/data/collections";
import { cn } from "@/lib/utils";

export function CollectionsShowcase() {
  return (
    <section className="bg-cream py-section">
      <Container size="wide">
        <SectionHeading
          eyebrow="Five Families, One Maison"
          title="The Collections"
          description="From the dress watch perfected to grand complications produced in strictly numbered series."
          link={{ href: "/collections", label: "Explore every family" }}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={c.slug}
                delay={Math.min(i * 0.06, 0.24)}
                className={cn(featured && "md:col-span-2")}
              >
                <Link
                  href={`/collections/${c.slug}`}
                  data-cursor-label="Discover"
                  className="group relative block h-full overflow-hidden"
                >
                  <WatchImage
                    src={c.image}
                    alt={c.name}
                    treatment="deep"
                    vignette
                    sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className={cn("h-full w-full", featured ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]")}
                    imgClassName="transition-transform duration-1500 ease-luxe group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex flex-col justify-between p-7 lg:p-9">
                    <span className="font-display text-2xl font-light italic text-gold-pale">
                      {c.index}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "font-display font-light leading-none text-cream",
                          featured ? "text-5xl lg:text-7xl" : "text-4xl",
                        )}
                      >
                        {c.name}
                      </h3>
                      <p className="mt-3 max-w-sm font-serif text-cream/70">{c.tagline}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-sans text-2xs uppercase tracking-luxe text-cream/85">
                        Discover the {c.name}
                        <ArrowUpRight className="h-4 w-4 -translate-x-1 transition-transform duration-500 group-hover:translate-x-0 group-hover:text-gold" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
