import { Heart, Instagram } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/motion";
import { WatchImage } from "@/components/common/WatchImage";
import { instagramPosts } from "@/lib/data/instagram";
import { formatNumber, cn } from "@/lib/utils";

export function InstagramGallery() {
  return (
    <section className="bg-ivory py-section">
      <Container size="wide">
        <SectionHeading
          eyebrow="@barro.milano"
          title="Follow the Maison"
          description="Atelier moments, archival pieces and the world of Barro — shared from Via Monte Napoleone."
          link={{ href: "https://instagram.com", label: "Follow on Instagram" }}
        />

        <Reveal className="mt-14">
          <div className="gap-4 [column-fill:_balance] sm:columns-2 md:columns-3 lg:columns-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="View"
                aria-label={post.caption}
                className="group relative mb-4 block break-inside-avoid overflow-hidden"
              >
                <WatchImage
                  src={post.image}
                  alt={post.caption}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={cn("w-full", post.tall ? "aspect-[3/4]" : "aspect-square")}
                  imgClassName="transition-transform duration-1400 ease-luxe group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Instagram className="h-5 w-5 text-cream" strokeWidth={1.4} />
                  <p className="mt-3 text-pretty font-serif text-sm leading-snug text-cream">
                    {post.caption}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 font-sans text-2xs tracking-wide text-cream/75 tnum">
                    <Heart className="h-3 w-3 fill-current" /> {formatNumber(post.likes)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
