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
    image: "/hair.jpg",
  },
  Nails: {
    links: [
      "Press-On Nails",
      "Gel Kits",
      "Nail Art",
      "Tools & Lamps",
      "Nail Care",
    ],
    image: "/midnightchrometips.jpg",
  },
  Accessories: {
    links: [
      "Silk & Satin",
      "Makeup Tools",
      "Skincare",
      "Mirrors & Lighting",
      "Perfume",
    ],
    image: "/accessories.jpg",
  },
  Simple: ["Book", "Gallery", "Sale"],
};
