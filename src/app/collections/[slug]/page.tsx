import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { CatalogView } from "@/components/product/CatalogView";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { collections, getCollection } from "@/lib/data/collections";
import { getWatchesByCollection } from "@/lib/data/watches";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: `${collection.tagline}. ${collection.description}`,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} · Barro`,
      description: collection.tagline,
      images: [{ url: collection.image, width: 1600, height: 1067, alt: collection.name }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const pieces = getWatchesByCollection(collection.slug);

  return (
    <>
      <PageHero
        eyebrow={`Collezione ${collection.index}`}
        title={collection.name}
        description={collection.description}
        image={collection.image}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
        meta={`${collection.tagline} · ${pieces.length} ${pieces.length === 1 ? "piece" : "pieces"}`}
        size="lg"
      />

      <CatalogView watches={pieces} showGenderFilter showStrapFilter />

      <RelatedProducts
        slug={pieces[0]?.slug ?? ""}
        eyebrow="Beyond the Collection"
        title="From Across the Maison"
      />
    </>
  );
}
