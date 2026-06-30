"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { Watch } from "@/lib/types";
import { cn } from "@/lib/utils";

const SPEC_ROWS: { key: keyof Watch["specs"]; label: string }[] = [
  { key: "movement", label: "Movement" },
  { key: "caliber", label: "Calibre" },
  { key: "powerReserve", label: "Power Reserve" },
  { key: "frequency", label: "Frequency" },
  { key: "jewels", label: "Jewels" },
  { key: "caseMaterial", label: "Case Material" },
  { key: "diameter", label: "Case Diameter" },
  { key: "thickness", label: "Case Thickness" },
  { key: "crystal", label: "Crystal" },
  { key: "waterResistance", label: "Water Resistance" },
  { key: "strap", label: "Strap / Bracelet" },
  { key: "warranty", label: "Warranty" },
];

const TAB_TRIGGER =
  "relative pb-4 font-sans text-2xs uppercase tracking-luxe text-ink-faint transition-colors duration-300 hover:text-ink data-[state=active]:text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-oxblood after:transition-transform after:duration-500 after:ease-luxe data-[state=active]:after:scale-x-100";

export function ProductSpecs({ watch }: { watch: Watch }) {
  return (
    <Tabs.Root defaultValue="specs" className="w-full">
      <Tabs.List
        aria-label="Product details"
        className="flex flex-wrap gap-x-9 gap-y-3 border-b border-line"
      >
        <Tabs.Trigger value="specs" className={TAB_TRIGGER}>
          Specifications
        </Tabs.Trigger>
        <Tabs.Trigger value="craft" className={TAB_TRIGGER}>
          Movement &amp; Craft
        </Tabs.Trigger>
        <Tabs.Trigger value="service" className={TAB_TRIGGER}>
          Delivery &amp; Service
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="specs" className="pt-10 focus:outline-none">
        <dl className="grid grid-cols-1 gap-x-16 sm:grid-cols-2">
          {SPEC_ROWS.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-6 border-b border-line/70 py-4"
            >
              <dt className="font-sans text-2xs uppercase tracking-luxe text-ink-faint">{label}</dt>
              <dd className="text-right font-serif text-[15px] text-ink-soft">{watch.specs[key]}</dd>
            </div>
          ))}
        </dl>
      </Tabs.Content>

      <Tabs.Content value="craft" className="pt-10 focus:outline-none">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-prose2">
            <p className="font-serif text-lg leading-relaxed text-ink-soft">{watch.description}</p>
            {watch.story && (
              <p className="mt-6 border-l-2 border-gold/50 pl-6 font-serif text-lg italic leading-relaxed text-ink-muted">
                {watch.story}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-6 self-start border-t border-line pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <CraftFact term="Assembly" detail="Cased, regulated and tested by hand in Milano." />
            <CraftFact term="Finishing" detail="Anglage, Côtes de Genève and circular graining applied by the bench." />
            <CraftFact
              term="Calibre"
              detail={`${watch.specs.caliber}, beating at ${watch.specs.frequency}.`}
            />
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="service" className="pt-10 focus:outline-none">
        <div className="grid gap-x-16 gap-y-9 sm:grid-cols-2">
          <ServiceBlock
            title="Delivery"
            body="Each timepiece is despatched fully insured in signature Barro packaging, with complimentary worldwide delivery and a dedicated concierge to track its journey to your door."
          />
          <ServiceBlock
            title="Returns & Exchanges"
            body="Should a piece not meet your expectation, it may be returned within fourteen days in its original, unworn condition for a full refund or exchange."
          />
          <ServiceBlock
            title="Warranty"
            body={`Covered by a ${watch.specs.warranty.toLowerCase()} warranty against manufacturing defect, with the option to extend through the Maison's care programme.`}
          />
          <ServiceBlock
            title="Servicing"
            body="We recommend a complete service every five to seven years. Our master watchmakers in Milano maintain every Barro for the lifetime of the watch."
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function CraftFact({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <p className="label-gold mb-1.5 text-[9px]">{term}</p>
      <p className="font-serif text-[15px] leading-relaxed text-ink-muted">{detail}</p>
    </div>
  );
}

function ServiceBlock({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <div className={cn("max-w-prose2", className)}>
      <h3 className="font-display text-2xl font-light text-ink">{title}</h3>
      <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
