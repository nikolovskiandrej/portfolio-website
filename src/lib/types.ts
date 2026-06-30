export type StrapType = "leather" | "metal";
export type Gender = "men" | "women" | "unisex";

export interface StrapOption {
  id: string;
  name: string;
  type: StrapType;
  /** swatch color (hex) for the selector dot */
  swatch: string;
  /** secondary swatch for two-tone */
  swatch2?: string;
}

export interface DialColor {
  name: string;
  hex: string;
}

export interface WatchSpec {
  movement: string;
  caliber: string;
  powerReserve: string;
  frequency: string;
  jewels: string;
  waterResistance: string;
  crystal: string;
  caseMaterial: string;
  diameter: string;
  thickness: string;
  strap: string;
  warranty: string;
}

export interface Watch {
  id: string;
  slug: string;
  name: string;
  /** collection slug */
  collection: string;
  collectionName: string;
  gender: Gender;
  reference: string;
  /** base price in EUR */
  price: number;
  shortDescription: string;
  description: string;
  story?: string;
  rating: number;
  reviewCount: number;
  /** ordered gallery image paths (first = primary) */
  images: string[];
  straps: StrapOption[];
  strapType: StrapType;
  dialColors?: DialColor[];
  specs: WatchSpec;
  isNew?: boolean;
  limited?: boolean;
  limitedCount?: number;
  featured?: boolean;
  inStock: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** roman numeral or index shown as overline */
  index: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  role?: string;
  rating: number;
  reference?: string;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  items: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  /** mega-menu columns */
  columns?: NavColumn[];
  /** optional featured panel in mega-menu */
  feature?: {
    label: string;
    title: string;
    href: string;
    image: string;
  };
}

export interface CartLine {
  watchId: string;
  slug: string;
  name: string;
  collectionName: string;
  price: number;
  image: string;
  strapId: string;
  strapName: string;
  quantity: number;
}
