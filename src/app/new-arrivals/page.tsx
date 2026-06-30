import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { newArrivals } from "@/lib/data/watches";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "The latest from the Maison — newly unveiled Barro timepieces, fresh from the bench in Milano.",
  alternates: { canonical: "/new-arrivals" },
};

export default function NewArrivalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Just Unveiled"
        title="New Arrivals"
        description="The most recent expressions of the Maison's craft — new dials, new calibres and new complications, each carrying seventy-eight years of practice into the present."
        image="/images/hero/main.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "New Arrivals" }]}
        meta={`${newArrivals.length} new timepieces`}
      />
      <CatalogView watches={newArrivals} showCollectionFilter showGenderFilter showStrapFilter />
    </>
  );
}
