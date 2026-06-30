import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { getWatchesByStrap } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "Leather Straps",
  description:
    "Tuscan vegetable-tanned leather and hand-stitched alligator — Barro timepieces on straps that age as gracefully as the watch they carry.",
  alternates: { canonical: "/leather-strap" },
};

export default function LeatherStrapPage() {
  const pieces = getWatchesByStrap("leather");
  return (
    <>
      <PageHero
        eyebrow="Tuscan Vegetable-Tanned"
        title="On Leather"
        description="Cut from Tuscan vegetable-tanned hides and hand-stitched in our workshop, every strap is chosen to deepen with wear — a quiet record of the life lived alongside it."
        image="/images/lifestyle/vintage.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Leather Strap" }]}
        meta={`${pieces.length} timepieces`}
      />
      <CatalogView watches={pieces} showCollectionFilter showGenderFilter />
    </>
  );
}
