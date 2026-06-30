import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { getWatchesByGender } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "Watches for Men",
  description:
    "Architectural presence and quiet authority — discover Barro mechanical watches for men, from slim dress pieces to chronometer-grade sports timepieces.",
  alternates: { canonical: "/men" },
};

export default function MenPage() {
  const pieces = getWatchesByGender("men");
  return (
    <>
      <PageHero
        eyebrow="For Him"
        title="Watches for Men"
        description="Presence without noise. A selection conceived for the wrist that prefers to be noticed only on closer inspection — slim cases, deep dials and movements built to outlast their owner."
        image="/images/lifestyle/wrist.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Men" }]}
        meta={`${pieces.length} timepieces`}
      />
      <CatalogView watches={pieces} showCollectionFilter showStrapFilter />
    </>
  );
}
