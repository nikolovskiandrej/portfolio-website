import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";
import { Rating } from "@/components/common/Rating";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="grain relative overflow-hidden bg-espresso py-section text-cream">
      <Container size="wide">
        <SectionHeading
          dark
          align="center"
          eyebrow="In Their Words"
          title="Worn by those who know the difference"
        />

        <Stagger className="mx-auto mt-16 grid max-w-6xl gap-x-16 gap-y-14 md:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <figure className="flex h-full flex-col">
                <span aria-hidden className="font-display text-6xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <blockquote className="-mt-3 text-pretty font-serif text-xl leading-relaxed text-cream/90 lg:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-end justify-between gap-6 border-t border-cream/10 pt-6">
                  <div>
                    <p className="font-display text-xl font-light text-cream">{t.author}</p>
                    <p className="mt-1 font-serif text-sm text-cream/55">
                      {t.role ? `${t.role} · ` : ""}
                      {t.location}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <Rating value={t.rating} showValue={false} size={13} className="justify-end" />
                    {t.reference && (
                      <p className="mt-2 font-sans text-[9px] uppercase tracking-luxe text-gold/70">
                        {t.reference}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
