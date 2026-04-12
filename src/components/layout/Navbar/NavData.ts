export interface MegaMenuCategory {
  links: string[];
  image: string;
}

export interface NavDataType {
  Hair: MegaMenuCategory;
  Nails: MegaMenuCategory;
  Accessories: MegaMenuCategory;
  Simple: string[];
}

export const NAV_DATA: NavDataType = {
  Hair: {
    links: [
      "Wigs",
      "Weaves",
      "Extensions",
      "Closures & Frontals",
      "Hair Care",
      "Accessories",
    ],
    image:
      "https://images.unsplash.com/photo-1595475241949-0f02b288d607?q=80&w=500",
  },
  Nails: {
    links: [
      "Press-On Nails",
      "Gel Kits",
      "Nail Art",
      "Tools & Lamps",
      "Nail Care",
    ],
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=500",
  },
  Accessories: {
    links: [
      "Silk & Satin",
      "Makeup Tools",
      "Skincare",
      "Mirrors & Lighting",
      "Perfume",
    ],
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=500",
  },
  Simple: ["Book", "Gallery", "Sale"],
};
