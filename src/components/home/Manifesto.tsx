import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/motion";

const pillars = [
  { label: "In-House Calibres", text: "Movements conceived, assembled and regulated under one Milanese roof." },
  { label: "Finished by Hand", text: "Anglage, perlage and guilloché executed by a single artisan, never a machine." },
  { label: "Built to Outlast", text: "Serviced for life, so a Barro passes intact from one wrist to the next." },
];

export function Manifesto() {
  return (
    <section className="relative bg-ivory py-section">
      <Container size="default" className="flex flex-col items-center text-center">
        <Reveal>
          <span className="label-gold">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-gold-dark opacity-60" />
            The Barro Philosophy
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 max-w-5xl text-balance font-display text-display-md font-light leading-[1.08] text-ink">
            There are watches that merely tell the time —{" "}
            <span className="italic text-oxblood">and those that keep it</span>, through decades,
            through hands, through the quiet ceremony of each morning&rsquo;s winding.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-9 max-w-prose2 text-pretty font-serif text-lg leading-relaxed text-ink-muted">
            Since 1947, the Maison has made only the second kind. We measure success not in
            volume, but in the years a single timepiece will outlive its first owner.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-16 w-full">
          <div className="grid gap-px overflow-hidden border-y border-line sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.label} className="bg-ivory px-8 py-10 text-center sm:py-12">
                <p className="label-gold mb-4">{p.label}</p>
                <p className="mx-auto max-w-xs text-pretty font-serif text-ink-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
