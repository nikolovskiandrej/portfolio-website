import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";
import { relatedWatches } from "@/lib/data/watches";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({
  slug,
  title = "You May Also Admire",
  eyebrow = "Continue Exploring",
}: {
  slug: string;
  title?: string;
  eyebrow?: string;
}) {
  const related = relatedWatches(slug, 4);
  if (related.length === 0) return null;

  return (
    <section className="bg-ivory py-section-sm">
      <Container size="wide">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          link={{ href: "/collections", label: "All Timepieces" }}
          className="mb-14"
        />
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {related.map((w) => (
            <StaggerItem key={w.id}>
              <ProductCard
                watch={w}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 23vw"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
