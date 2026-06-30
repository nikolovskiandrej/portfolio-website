import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { getWatchesByGender } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "Watches for Women",
  description:
    "Refined proportion and luminous dials — discover Barro mechanical watches for women, from ultra-thin calibres to open-heart automatics.",
  alternates: { canonical: "/women" },
};

export default function WomenPage() {
  const pieces = getWatchesByGender("women");
  return (
    <>
      <PageHero
        eyebrow="For Her"
        title="Watches for Women"
        description="Proportion as poetry. Slender cases, guilloché and mother-of-pearl, and mechanics finished to the same exacting standard as every Barro — femininity that never sacrifices substance."
        image="/images/lifestyle/hands-dress.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Women" }]}
        meta={`${pieces.length} timepieces`}
      />
      <CatalogView watches={pieces} showCollectionFilter showStrapFilter />
    </>
  );
}
