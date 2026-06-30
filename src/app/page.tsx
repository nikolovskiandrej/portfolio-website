import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { CollectionsShowcase } from "@/components/home/CollectionsShowcase";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { SignaturePiece } from "@/components/home/SignaturePiece";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Invitation } from "@/components/home/Invitation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedGrid />
      <CollectionsShowcase />
      <Craftsmanship />
      <SignaturePiece />
      <Testimonials />
      <InstagramGallery />
      <Invitation />
    </>
  );
}
