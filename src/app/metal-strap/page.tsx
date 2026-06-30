import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { getWatchesByStrap } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "Metal Bracelets",
  description:
    "Milled, brushed and hand-polished — Barro timepieces on integrated steel and gold bracelets, finished link by link.",
  alternates: { canonical: "/metal-strap" },
};

export default function MetalStrapPage() {
  const pieces = getWatchesByStrap("metal");
  return (
    <>
      <PageHero
        eyebrow="Milled & Hand-Brushed"
        title="On Metal"
        description="The bracelet is a watch in its own right. Each link is milled, brushed and polished by hand, then assembled to flow from case to clasp without a seam — engineering you feel before you see."
        image="/images/hero/band.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Metal Bracelet" }]}
        meta={`${pieces.length} timepieces`}
      />
      <CatalogView watches={pieces} showCollectionFilter showGenderFilter />
    </>
  );
}
