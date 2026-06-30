import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { limitedWatches } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "Edizione Limitata",
  description:
    "Numbered and rare — Barro tourbillons, skeletonised calibres and grand complications, each produced in strictly limited series.",
  alternates: { canonical: "/limited-edition" },
};

export default function LimitedEditionPage() {
  return (
    <>
      <PageHero
        eyebrow="Numbered & Rare"
        title="Edizione Limitata"
        description="The Maison at full voice. Tourbillons, openworked calibres and grand complications, each individually numbered and finished over hundreds of hours — made in series small enough to count."
        image="/images/collections/limited.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Limited Edition" }]}
        meta={`${limitedWatches.length} numbered series`}
        size="lg"
      />
      <CatalogView watches={limitedWatches} showCollectionFilter showGenderFilter showStrapFilter />
    </>
  );
}
