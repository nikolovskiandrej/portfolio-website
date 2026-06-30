import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WatchImage } from "@/components/common/WatchImage";
import { Button } from "@/components/ui/button";
import { Reveal, Parallax, Stagger, StaggerItem } from "@/components/motion";
import { heritageStats, site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "The Maison",
  description:
    "Founded in Milano in 1947, Barro is a family house of haute horlogerie. Discover the story, the craftsmanship and the people behind every hand-finished timepiece.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "1947", text: "Emilio Barro opens a one-bench workshop on Via Brera, Milano." },
  { year: "1962", text: "The Notte reference establishes the house language of the dress watch." },
  { year: "1978", text: "The first fully in-house automatic, Calibre BR-110, leaves the atelier." },
  { year: "1999", text: "Barro completes its first one-minute tourbillon, entirely by hand." },
  { year: "2014", text: "The Maison returns to family ownership after a generation abroad." },
  { year: "Oggi", text: "Five watchmaking families, one address, an unbroken line of craft." },
];

const CRAFT_STEPS = [
  { n: "01", title: "Conception", text: "Every reference begins as a drawing at the bench, not a brief in a boardroom." },
  { n: "02", title: "Movement", text: "Bridges are bevelled, polished and decorated by hand before a single jewel is set." },
  { n: "03", title: "Assembly", text: "Each calibre is built, regulated and cased by one watchmaker, start to finish." },
  { n: "04", title: "The Test", text: "Nothing leaves Milano until it has kept time, on the wrist, for a fortnight." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="La Maison · Dal 1947"
        title={
          <>
            Time,
            <br />
            made by hand.
          </>
        }
        description="For seventy-eight years, in the same quarter of Milano, Barro has built mechanical watches the only way it knows how — slowly, completely, and by hand."
        image="/images/story/portrait.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "The Maison" }]}
        size="lg"
      />

      {/* Founding narrative */}
      <section className="bg-ivory py-section-sm">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal dir="up">
              <p className="label-gold mb-6">The Beginning</p>
              <h2 className="font-display text-display-sm font-light leading-[1.04] text-ink">
                A house begun by one man and a single bench.
              </h2>
              <div className="mt-7 flex max-w-prose2 flex-col gap-5 font-serif text-lg leading-relaxed text-ink-muted">
                <p>
                  In the autumn of 1947, Emilio Barro hung a hand-painted sign above a narrow
                  doorway on Via Brera and began making watches for the people of Milano. He had no
                  factory, no investors and no intention of building either. He had a loupe, a set
                  of files inherited from his own master, and a conviction that a watch should be
                  finished as carefully on the side no one sees as on the dial.
                </p>
                <p>
                  Three generations later, that conviction is the whole of our method. We are not a
                  large house, and we have never wished to be. We make a few hundred timepieces a
                  year, each one answerable to the name engraved upon it.
                </p>
              </div>
              <p className="mt-9 border-l-2 border-gold/50 pl-6 font-display text-2xl font-light italic leading-snug text-oxblood">
                “We do not sell time. We give it the respect it is owed.”
                <span className="mt-3 block font-sans text-2xs uppercase not-italic tracking-luxe text-ink-faint">
                  Emilio Barro, 1947
                </span>
              </p>
            </Reveal>

            <Reveal dir="none" duration={1}>
              <Parallax speed={0.1}>
                <div className="relative aspect-[4/5] overflow-hidden bg-parchment shadow-luxe">
                  <WatchImage
                    src="/images/story/portrait-bw.jpg"
                    alt="A Barro watchmaker at the bench in Milano"
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="h-full w-full"
                  />
                </div>
              </Parallax>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The numbers */}
      <section className="bg-espresso py-section-sm text-cream">
        <Container size="wide">
          <Stagger className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {heritageStats.map((s) => (
              <StaggerItem key={s.label} className="border-t border-cream/15 pt-6">
                <p className="font-display text-6xl font-light text-gold-pale tnum">{s.value}</p>
                <p className="mt-3 max-w-[18ch] font-sans text-2xs uppercase tracking-luxe text-cream/60">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-ivory py-section-sm">
        <Container size="wide">
          <Reveal>
            <p className="label-gold mb-4">An Unbroken Line</p>
            <h2 className="max-w-2xl font-display text-display-sm font-light leading-[1.04] text-ink">
              Seventy-eight years, told in moments.
            </h2>
          </Reveal>
          <div className="mt-14 flex flex-col">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} dir="up" delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-line py-7 sm:grid-cols-[160px_1fr] sm:gap-10">
                  <span className="font-display text-3xl font-light text-oxblood tnum sm:text-4xl">
                    {t.year}
                  </span>
                  <p className="max-w-prose2 font-serif text-lg leading-relaxed text-ink-muted">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Craftsmanship */}
      <section id="craftsmanship" className="scroll-mt-24 bg-parchment py-section-sm">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal dir="none" duration={1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] overflow-hidden bg-parchment-dark shadow-soft">
                  <WatchImage
                    src="/images/story/hands-tweezers.jpg"
                    alt="Hand-assembly of a Barro movement"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="h-full w-full"
                  />
                </div>
                <div className="relative mt-10 aspect-[3/4] overflow-hidden bg-parchment-dark shadow-soft">
                  <WatchImage
                    src="/images/story/loupe.jpg"
                    alt="Inspecting a calibre through the loupe"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal dir="up" className="lg:self-center">
              <p className="label-gold mb-6">The Craft</p>
              <h2 className="font-display text-display-sm font-light leading-[1.04] text-ink">
                Four hundred hours, give or take a lifetime.
              </h2>
              <p className="mt-7 max-w-prose2 font-serif text-lg leading-relaxed text-ink-muted">
                A single Barro passes through the hands of one watchmaker from first bridge to final
                regulation — on average, four hundred and twelve hours of work. There are no
                production lines here, and no shortcuts that the eye, or time, would ever forgive.
              </p>

              <Stagger className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                {CRAFT_STEPS.map((s) => (
                  <StaggerItem key={s.n}>
                    <p className="font-display text-2xl font-light text-gold-dark tnum">{s.n}</p>
                    <h3 className="mt-2 font-display text-xl font-light text-ink">{s.title}</h3>
                    <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-ink-muted">
                      {s.text}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Atelier gallery */}
      <section className="bg-ivory py-section-sm">
        <Container size="wide">
          <Reveal>
            <p className="label-gold mb-4 text-center">Inside the Atelier</p>
            <h2 className="mx-auto mb-14 max-w-2xl text-center font-display text-display-sm font-light leading-[1.04] text-ink">
              Where the work is the whole point.
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { src: "/images/story/clockwork.jpg", alt: "Movement components" },
              { src: "/images/story/engraving.jpg", alt: "Hand-engraving" },
              { src: "/images/details/gears.jpg", alt: "Gear train" },
              { src: "/images/story/hands-caseback.jpg", alt: "Fitting a caseback" },
            ].map((img, i) => (
              <StaggerItem key={img.src}>
                <div
                  className={`relative aspect-[3/4] overflow-hidden bg-parchment shadow-soft ${
                    i % 2 === 1 ? "lg:mt-10" : ""
                  }`}
                >
                  <WatchImage
                    src={img.src}
                    alt={img.alt}
                    sizes="(max-width: 1024px) 45vw, 23vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-1500 ease-luxe hover:scale-105"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-espresso py-section text-cream">
        <div className="absolute inset-0 bg-radial-gold" />
        <Container size="narrow" className="relative z-10 text-center">
          <Reveal>
            <p className="label mb-7 text-gold">An Invitation</p>
            <h2 className="mx-auto max-w-3xl text-balance font-display text-display-md font-light leading-[1.0] text-cream">
              The rest is best discovered in person.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-pretty font-serif text-lg leading-relaxed text-cream/75">
              Visit the Maison on {site.address.street}, or begin with the collection that first
              caught your eye.
            </p>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="onDarkGold" size="lg" asChild>
                <Link href="/collections">Explore the Collections</Link>
              </Button>
              <Button variant="onDark" size="lg" asChild>
                <Link href="/contact">Book an Appointment</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
