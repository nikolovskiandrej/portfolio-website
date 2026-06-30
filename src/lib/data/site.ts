export const site = {
  name: "Barro",
  legalName: "Barro S.p.A.",
  tagline: "Alta Orologeria Italiana",
  shortTagline: "Maison · Milano · 1947",
  founded: 1947,
  city: "Milano",
  country: "Italia",
  url: "https://barro.example",
  description:
    "Barro — Alta Orologeria Italiana. Hand-finished mechanical timepieces from the Maison in Milano, founded 1947. Crafted for those who value time.",
  email: "concierge@barro.com",
  phone: "+39 02 4700 1947",
  address: {
    street: "Via Monte Napoleone 12",
    city: "Milano",
    zip: "20121",
    country: "Italia",
  },
  boutiques: [
    { city: "Milano", address: "Via Monte Napoleone 12", phone: "+39 02 4700 1947" },
    { city: "Roma", address: "Via dei Condotti 88", phone: "+39 06 6920 1947" },
    { city: "Genève", address: "Rue du Rhône 40", phone: "+41 22 310 1947" },
    { city: "London", address: "12 New Bond Street", phone: "+44 20 7499 1947" },
  ],
} as const;

export const heritageStats = [
  { value: "1947", label: "Founded in Milano" },
  { value: "412", label: "Hours of hand-finishing, on average" },
  { value: "5", label: "Watchmaking families" },
  { value: "78", label: "Years of unbroken craft" },
];
