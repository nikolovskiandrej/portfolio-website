import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "classico",
    name: "Classico",
    tagline: "The dress watch, perfected",
    index: "I",
    order: 1,
    image: "/images/collections/classico.jpg",
    description:
      "Pure proportion and quiet authority. The Classico is the watch you reach for when nothing should distract from the moment — slim cases, hand-applied indices and a dial finished to be read at a glance and admired for a lifetime.",
  },
  {
    slug: "sportivo",
    name: "Sportivo",
    tagline: "Engineered for motion",
    index: "II",
    order: 2,
    image: "/images/collections/sportivo.jpg",
    description:
      "Built to be worn hard and still keep impeccable company. Robust cases, luminous legibility and chronometer-grade movements for those who measure life in performance as much as in hours.",
  },
  {
    slug: "eredita",
    name: "Eredità",
    tagline: "Heritage, reissued",
    index: "III",
    order: 3,
    image: "/images/collections/eredita.jpg",
    description:
      "Faithful reissues drawn from the Barro archive in Milano. Vintage silhouettes, warm patinated dials and the same hand-work that defined the Maison in 1947 — carried, unbroken, into the present.",
  },
  {
    slug: "moderno",
    name: "Moderno",
    tagline: "Contemporary lines",
    index: "IV",
    order: 4,
    image: "/images/collections/moderno.jpg",
    description:
      "Where Italian design language meets Swiss-trained mechanics. Architectural cases, open dials and a restraint that feels unmistakably of today — without ever chasing a trend.",
  },
  {
    slug: "edizione-limitata",
    name: "Edizione Limitata",
    tagline: "Numbered, and rare",
    index: "V",
    order: 5,
    image: "/images/collections/limited.jpg",
    description:
      "The Maison at full voice. Tourbillons, skeletonised calibres and grand complications, each piece individually numbered, hand-finished over hundreds of hours and produced in strictly limited series.",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
