export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  hasPhoto: boolean;
}

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-h1",
    userName: "Amina Yusuf",
    rating: 5,
    comment:
      "The Brazilian straight is 10/10! No shedding even after the first wash. Omo, I'm impressed.",
    date: "2024-02-10",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-2",
    productId: "prod-h5",
    userName: "Chioma Okoro",
    rating: 5,
    comment:
      "Bone straight that is actually bone straight. It stays sleek even in this Lagos humidity.",
    date: "2024-02-12",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-3",
    productId: "prod-n1",
    userName: "Titi Adenuga",
    rating: 4,
    comment:
      "The gel kit is great for DIY. The UV lamp works perfectly, but the pink shade is a bit lighter than the photo.",
    date: "2024-02-15",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-4",
    productId: "prod-h3",
    userName: "Blessing Itodo",
    rating: 5,
    comment:
      "This HD lace is invisible! My stylist asked where I got it. Melting was so easy.",
    date: "2024-02-18",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-5",
    productId: "prod-a1",
    userName: "Zainab Lawal",
    rating: 5,
    comment:
      "Since I started using this silk pillowcase, my morning frizz has reduced significantly.",
    date: "2024-02-20",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-6",
    productId: "prod-h8",
    userName: "Efe Agbaje",
    rating: 5,
    comment:
      "Best heat protectant in the market. It doesn't leave my hair greasy at all.",
    date: "2024-02-22",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-7",
    productId: "prod-n2",
    userName: "Khadija Saliu",
    rating: 4,
    comment:
      "French tips look so natural. People actually think I went to the salon.",
    date: "2024-02-25",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-8",
    productId: "prod-a3",
    userName: "Oyin Kazeem",
    rating: 5,
    comment:
      "The vanity mirror is a game changer for my makeup routine. The LED lights are very bright.",
    date: "2024-02-27",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-9",
    productId: "prod-h11",
    userName: "Ngozi Umeh",
    rating: 4,
    comment:
      "I've been using the scalp serum for 3 weeks and I can see tiny baby hairs growing.",
    date: "2024-03-01",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-10",
    productId: "prod-n6",
    userName: "Funmi Taiwo",
    rating: 5,
    comment:
      "The colors in the gel collection are so vibrant. One coat is enough for most of them.",
    date: "2024-03-03",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-11",
    productId: "prod-h12",
    userName: "Mairo Zaki",
    rating: 5,
    comment:
      "Finally a bonnet that fits my long braids and doesn't fall off at night.",
    date: "2024-03-05",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-12",
    productId: "prod-a2",
    userName: "Adaeze Joda",
    rating: 4,
    comment:
      "The jade roller feels so cooling in the morning. Really helps with my puffiness.",
    date: "2024-03-07",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-13",
    productId: "prod-h4",
    userName: "Victoria P.",
    rating: 5,
    comment:
      "Full lace wig is worth the investment. I can style it any way I want.",
    date: "2024-03-09",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-14",
    productId: "prod-n5",
    userName: "Bukky R.",
    rating: 4,
    comment: "Good lamp. Dries my nails in 60 seconds. Very satisfied.",
    date: "2024-03-11",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-15",
    productId: "prod-a4",
    userName: "Ifeoma D.",
    rating: 5,
    comment:
      "The brushes are so soft and they don't shed. Great value for money.",
    date: "2024-03-13",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-16",
    productId: "prod-h10",
    userName: "Sandra W.",
    rating: 5,
    comment:
      "This conditioning mask saved my bleached hair. It feels soft again.",
    date: "2024-03-15",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-17",
    productId: "prod-n10",
    userName: "Peju S.",
    rating: 4,
    comment: "Acrylic powder is easy to work with. No yellowing so far.",
    date: "2024-03-17",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-18",
    productId: "prod-a10",
    userName: "Bose F.",
    rating: 3,
    comment:
      "The magnetic lashes are okay, but you have to use a lot of the liner for them to stick well.",
    date: "2024-03-18",
    isVerified: true,
    hasPhoto: false,
  },
  {
    id: "rev-19",
    productId: "prod-h9",
    userName: "Uju G.",
    rating: 5,
    comment:
      "My curls are popping! This cream is better than the expensive ones I bought abroad.",
    date: "2024-03-20",
    isVerified: true,
    hasPhoto: true,
  },
  {
    id: "rev-20",
    productId: "prod-a9",
    userName: "Ladi K.",
    rating: 5,
    comment: "Beautiful colors and they don't break my hair. 100% recommend.",
    date: "2024-03-22",
    isVerified: true,
    hasPhoto: false,
  },
];
