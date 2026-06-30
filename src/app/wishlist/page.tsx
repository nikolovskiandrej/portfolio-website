import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "The Barro timepieces you have saved to consider.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  return <WishlistView />;
}
