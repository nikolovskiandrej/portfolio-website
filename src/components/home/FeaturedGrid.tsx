import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";
import { ProductCard } from "@/components/product/ProductCard";
import { featuredWatches } from "@/lib/data/watches";

export function FeaturedGrid() {
  const watches = featuredWatches.slice(0, 3);

  return (
    <section className="bg-ivory pb-section">
      <Container size="wide">
        <SectionHeading
          eyebrow="The Signature Selection"
          title="Pieces that define the Maison"
          description="A curated few from across the collections — each a complete statement of what Barro stands for."
          link={{ href: "/collections", label: "View all timepieces" }}
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {watches.map((watch, i) => (
            <StaggerItem key={watch.id}>
              <ProductCard watch={watch} priority={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
