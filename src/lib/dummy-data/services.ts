export interface Service {
  id: string;
  name: string;
  category: "Hair" | "Nails" | "Beauty";
  price: number;
  duration: string;
  description: string;
}

export const services: Service[] = [
  // --- HAIR SERVICES (5 items) ---
  {
    id: "ser-h1",
    name: "Full Sew-In Install",
    category: "Hair",
    price: 25000,
    duration: "3hrs",
    description:
      "Professional bundle installation with natural leave-out and styling.",
  },
  {
    id: "ser-h2",
    name: "Braids (Box Braids, Large)",
    category: "Hair",
    price: 18000,
    duration: "4hrs",
    description: "Clean, jumbo-sized box braids. Price excludes extensions.",
  },
  {
    id: "ser-h3",
    name: "Silk Press & Style",
    category: "Hair",
    price: 12000,
    duration: "2hrs",
    description:
      "Deep conditioning, blow-dry, and flat iron for a silky finish on natural hair.",
  },
  {
    id: "ser-h4",
    name: "Hair Colouring (Full Head)",
    category: "Hair",
    price: 35000,
    duration: "3.5hrs",
    description:
      "Full head color application. Includes lifting/bleaching if required.",
  },
  {
    id: "ser-h5",
    name: "Lace Wig Install & Melt",
    category: "Hair",
    price: 15000,
    duration: "1.5hrs",
    description:
      "Customization of lace and professional adhesive install for a seamless melt.",
  },

  // --- NAIL SERVICES (5 items) ---
  {
    id: "ser-n1",
    name: "Gel Manicure",
    category: "Nails",
    price: 8500,
    duration: "1hr",
    description:
      "Classic manicure finished with long-lasting, high-shine gel polish.",
  },
  {
    id: "ser-n2",
    name: "Acrylic Nail Set (Full)",
    category: "Nails",
    price: 15000,
    duration: "2hrs",
    description:
      "Full set of nail extensions using premium acrylic powder and tips.",
  },
  {
    id: "ser-n3",
    name: "Nail Art (Per Nail)",
    category: "Nails",
    price: 1500,
    duration: "varies",
    description: "Custom hand-painted designs, charms, or stones per nail.",
  },
  {
    id: "ser-n4",
    name: "Pedicure (Luxury Spa)",
    category: "Nails",
    price: 12000,
    duration: "1.5hrs",
    description:
      "Soak, scrub, massage, and callous removal followed by polish.",
  },
  {
    id: "ser-n5",
    name: "Nail Removal + Refill",
    category: "Nails",
    price: 10000,
    duration: "1.5hrs",
    description:
      "Safe removal of old acrylic/gel and fresh refill of the regrowth area.",
  },

  // --- BEAUTY SERVICES (5 items) ---
  {
    id: "ser-b1",
    name: "Eyebrow Threading & Tint",
    category: "Beauty",
    price: 6500,
    duration: "45min",
    description:
      "Precise brow shaping via threading followed by semi-permanent tinting.",
  },
  {
    id: "ser-b2",
    name: "Eyelash Extension (Classic)",
    category: "Beauty",
    price: 22000,
    duration: "2hrs",
    description: "One-to-one lash application for a natural but enhanced look.",
  },
  {
    id: "ser-b3",
    name: "Facial (Deep Cleanse)",
    category: "Beauty",
    price: 18000,
    duration: "1hr",
    description:
      "Deep pore extraction, steam, and mask tailored to your skin type.",
  },
  {
    id: "ser-b4",
    name: "Makeup (Full Glam)",
    category: "Beauty",
    price: 35000,
    duration: "2hrs",
    description:
      "Full face transformation for parties or events, includes lashes.",
  },
  {
    id: "ser-b5",
    name: "Bridal Package",
    category: "Beauty",
    price: 120000,
    duration: "5hrs",
    description: "Premium bridal makeup and hair styling for the big day.",
  },
];
