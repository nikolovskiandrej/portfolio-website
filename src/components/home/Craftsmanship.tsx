import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Reveal, Parallax } from "@/components/motion";
import { WatchImage } from "@/components/common/WatchImage";
import { Button } from "@/components/ui/button";
import { heritageStats } from "@/lib/data/site";

export function Craftsmanship() {
  return (
    <section id="craftsmanship" className="grain relative overflow-hidden bg-espresso py-section text-cream">
      <div className="bg-radial-gold pointer-events-none absolute inset-x-0 top-0 h-1/2" />
      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image composition */}
          <Reveal dir="left">
            <div className="relative pb-12 pr-12 sm:pb-16 sm:pr-16">
              <Parallax speed={0.12}>
                <WatchImage
                  src="/images/story/bench.jpg"
                  alt="A master watchmaker at the bench in the Barro atelier, Milano"
                  treatment="deep"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="aspect-[4/5] w-full"
                />
              </Parallax>
              <div className="absolute bottom-0 right-0 w-2/5 border-8 border-espresso shadow-luxe">
                <WatchImage
                  src="/images/story/loupe.jpg"
                  alt="Inspecting a movement through a loupe"
                  treatment="deep"
                  sizes="(max-width: 1024px) 36vw, 18vw"
                  className="aspect-square w-full"
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="label text-gold">The Hand of the Maison</span>
              <h2 className="mt-6 font-display text-display-sm font-light leading-[1.05] text-cream">
                412 hours of work you will never see —{" "}
                <span className="italic text-gold-pale">and always feel.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 space-y-5 font-serif text-lg leading-relaxed text-cream/70">
                <p>
                  Every Barro is finished by a single watchmaker, from the first bevel to the
                  final regulation. Bridges are chamfered by hand at a fixed angle; dials are
                  engine-turned on lathes older than the watchmakers who run them.
                </p>
                <p>
                  None of it is strictly necessary for a watch to keep time. All of it is
                  necessary for a watch to keep faith — with the person who will wear it, and the
                  one who inherits it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-cream/10 pt-10">
                {heritageStats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-5xl font-light text-gold-pale tnum">{s.value}</dt>
                    <dd className="mt-2 font-serif text-sm text-cream/60">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-11">
                <Button variant="onDarkGold" size="lg" asChild>
                  <Link href="/about#craftsmanship">Inside the Atelier</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
