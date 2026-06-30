export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  /** taller tile in the masonry */
  tall?: boolean;
}

export const instagramPosts: InstagramPost[] = [
  { id: "ig1", image: "/images/lifestyle/wrist.jpg", caption: "An afternoon in Milano. #BarroMaison", likes: 4820, tall: true },
  { id: "ig2", image: "/images/lifestyle/box-wood.jpg", caption: "Where a collection begins.", likes: 3140 },
  { id: "ig3", image: "/images/details/movement.jpg", caption: "The soul of the machine. Cal. BR-110.", likes: 6210 },
  { id: "ig4", image: "/images/products/profondo.jpg", caption: "Profondo, warmed by hand. #Sportivo", likes: 5870, tall: true },
  { id: "ig5", image: "/images/story/hands-tweezers.jpg", caption: "412 hours. One pair of hands.", likes: 7430 },
  { id: "ig6", image: "/images/lifestyle/vintage.jpg", caption: "Eredità — heritage you can set your life by.", likes: 3990 },
  { id: "ig7", image: "/images/products/avorio.jpg", caption: "Avorio, cut on a century-old lathe.", likes: 5210, tall: true },
  { id: "ig8", image: "/images/story/portrait-bw.jpg", caption: "Master watchmaker, Atelier Barro.", likes: 8120 },
  { id: "ig9", image: "/images/details/gears.jpg", caption: "Every wheel, accounted for.", likes: 2980 },
  { id: "ig10", image: "/images/products/tourbillon-eterno.jpg", caption: "Tourbillon Eterno. Fifty pieces.", likes: 9640, tall: true },
  { id: "ig11", image: "/images/story/storefront.jpg", caption: "The Maison, Via Monte Napoleone.", likes: 4410 },
  { id: "ig12", image: "/images/details/guilloche.jpg", caption: "A full day, for a single dial.", likes: 3620 },
];
