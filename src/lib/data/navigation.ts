import type { NavItem } from "@/lib/types";

export const mainNav: NavItem[] = [
  {
    label: "Watches",
    href: "/collections",
    columns: [
      {
        heading: "By Audience",
        items: [
          { label: "Men", href: "/men", description: "Architectural presence" },
          { label: "Women", href: "/women", description: "Refined proportion" },
          { label: "Unisex", href: "/unisex", description: "Without convention" },
        ],
      },
      {
        heading: "By Strap",
        items: [
          { label: "Metal Bracelet", href: "/metal-strap", description: "Milled & hand-brushed" },
          { label: "Leather Strap", href: "/leather-strap", description: "Tuscan vegetable-tanned" },
        ],
      },
      {
        heading: "Discover",
        items: [
          { label: "New Arrivals", href: "/new-arrivals" },
          { label: "Limited Edition", href: "/limited-edition" },
          { label: "All Timepieces", href: "/collections" },
        ],
      },
    ],
    feature: {
      label: "Maison Icon",
      title: "Tourbillon Eterno",
      href: "/watches/tourbillon-eterno",
      image: "/images/collections/limited.jpg",
    },
  },
  {
    label: "Collections",
    href: "/collections",
    columns: [
      {
        heading: "The Five Families",
        items: [
          { label: "Classico", href: "/collections/classico", description: "The dress watch, perfected" },
          { label: "Sportivo", href: "/collections/sportivo", description: "Engineered for motion" },
          { label: "Eredità", href: "/collections/eredita", description: "Heritage reissues" },
        ],
      },
      {
        heading: " ",
        items: [
          { label: "Moderno", href: "/collections/moderno", description: "Contemporary lines" },
          { label: "Edizione Limitata", href: "/collections/edizione-limitata", description: "Numbered & rare" },
        ],
      },
    ],
    feature: {
      label: "Since 1947",
      title: "The Eredità Story",
      href: "/collections/eredita",
      image: "/images/collections/heritage.jpg",
    },
  },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Limited Edition", href: "/limited-edition" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Flat list of every catalog destination — used by the mobile menu. */
export const mobileNav = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Unisex", href: "/unisex" },
  { label: "Metal Strap", href: "/metal-strap" },
  { label: "Leather Strap", href: "/leather-strap" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections", href: "/collections" },
  { label: "Limited Edition", href: "/limited-edition" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  maison: {
    heading: "The Maison",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Craftsmanship", href: "/about#craftsmanship" },
      { label: "Collections", href: "/collections" },
      { label: "Limited Edition", href: "/limited-edition" },
      { label: "Boutiques", href: "/contact" },
    ],
  },
  client: {
    heading: "Client Services",
    links: [
      { label: "Contact Concierge", href: "/contact" },
      { label: "Book an Appointment", href: "/contact" },
      { label: "Warranty & Registration", href: "/contact" },
      { label: "Servicing & Care", href: "/contact" },
      { label: "Shipping & Returns", href: "/contact" },
    ],
  },
  legal: {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/contact" },
      { label: "Terms of Sale", href: "/contact" },
      { label: "Cookie Preferences", href: "/contact" },
      { label: "Accessibility", href: "/contact" },
    ],
  },
};

export const socials = [
  { label: "Instagram", href: "https://instagram.com", handle: "@barro.milano" },
  { label: "Pinterest", href: "https://pinterest.com", handle: "Barro Milano" },
  { label: "YouTube", href: "https://youtube.com", handle: "Barro Maison" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "Barro S.p.A." },
];

export const languages = ["Italiano", "English", "Français", "Deutsch", "日本語", "中文"];

export const currencies = [
  { code: "EUR", label: "Euro" },
  { code: "USD", label: "US Dollar" },
  { code: "GBP", label: "British Pound" },
  { code: "CHF", label: "Swiss Franc" },
] as const;
