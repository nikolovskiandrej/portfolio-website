import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { getWatchesByGender } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "Unisex Timepieces",
  description:
    "Without convention — Barro timepieces designed to be worn by anyone, defined by balance rather than by gender.",
  alternates: { canonical: "/unisex" },
};

export default function UnisexPage() {
  const pieces = getWatchesByGender("unisex");
  return (
    <>
      <PageHero
        eyebrow="Without Convention"
        title="Unisex Timepieces"
        description="Some watches refuse a category. Balanced diameters, neutral dials and universal presence — these are the pieces the Maison makes for the wrist, whoever it belongs to."
        image="/images/hero/movement.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Unisex" }]}
        meta={`${pieces.length} timepieces`}
      />
      <CatalogView watches={pieces} showCollectionFilter showStrapFilter />
    </>
  );
}
