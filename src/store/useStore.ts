import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
  CartItem,
  Product,
  PointTransaction,
  Service,
  Appointment,
  Order,
} from "../types";

// Enhanced Product type for Wishlist sorting
export type WishlistProduct = Product & { addedAt: number };

interface GlobalStore {
  // --- State Definitions ---
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  wishlistItems: WishlistProduct[]; // Updated with timestamp support
  points: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  pointsHistory: PointTransaction[];
  tierBenefits: string[];
  selectedService: Service | null;
  selectedDate: string | null;
  selectedTime: string | null;
  bookingHistory: Appointment[];
  orders: Order[];
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  displayName: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  recentlyViewed: Product[];

  // --- NEW: Task #26 Missing Properties ---
  bookingPhone: string;
  bookingNotes: string;
  bookingReferral: string;

  // --- Actions ---
  addToCart: (product: Product, options: any) => void;
  addBundleToCart: (products: Product[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  addPoints: (amount: number, reason: string) => void;
  redeemPoints: (amount: number) => void;
  setService: (s: Service) => void;
  setDate: (d: string) => void;
  setTime: (t: string) => void;
  confirmBooking: (appointment: Appointment) => void;
  clearBooking: () => void;
  setAppointmentRating: (id: string, rating: number) => void;
  rebookService: (service: Service) => void;
  addOrder: (order: Order) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
  addToRecentlyViewed: (product: Product) => void;
  removeFromRecentlyViewed: (id: string) => void;

  // --- NEW: Task #26 Action Setters ---
  setBookingPhone: (phone: string) => void;
  setBookingNotes: (notes: string) => void;
  setBookingReferral: (ref: string) => void;
}

export const useStore = create<GlobalStore>()(
  devtools(
    persist(
      (set, get) => ({
        // --- INITIAL STATE ---
        cartItems: [],
        cartTotal: 0,
        cartCount: 0,
        wishlistItems: [],
        points: 1250,
        tier: "Bronze",
        pointsHistory: [],
        tierBenefits: ["Priority Booking", "Exclusive Discounts"],
        selectedService: null,
        selectedDate: null,
        selectedTime: null,

        // Form States
        bookingPhone: "",
        bookingNotes: "",
        bookingReferral: "",

        // Dummy Data for Appointments
        bookingHistory: [
          {
            id: "appt_001",
            service: {
              id: "s1",
              name: "HydraFacial Luxe",
              price: 45000,
              duration: "60 mins",
            },
            date: "May 10, 2026",
            time: "14:00 PM",
            stylist: {
              id: "st_01",
              name: "Precious A.",
              role: "Master Esthetician",
            },
            status: "completed",
            rating: 0,
          },
          {
            id: "appt_002",
            service: {
              id: "s2",
              name: "Kinky Twist Install",
              price: 65000,
              duration: "180 mins",
            },
            date: "June 02, 2026",
            time: "09:00 AM",
            stylist: {
              id: "st_02",
              name: "Zainab B.",
              role: "Senior Braider",
            },
            status: "upcoming",
          },
        ],

        // Dummy Data for Orders
        orders: [
          {
            id: "gh_order_88219",
            date: "May 04, 2026",
            total: 115000,
            status: "shipped",
            address: "Plot 12, Garki Luxury Apartments, Abuja",
            paymentMethod: "**** 4521",
            items: [
              {
                product: {
                  id: "p1",
                  name: "Glow Essence",
                  price: 65000,
                  image:
                    "https://images.unsplash.com/photo-1620916566398-39f1143af7be?q=80&w=200",
                  rating: 4.8,
                  reviewsCount: 124,
                  badges: ["BESTSELLER"],
                  isSoldOut: false,
                },
                quantity: 1,
              },
              {
                product: {
                  id: "p2",
                  name: "Silk Wrap",
                  price: 50000,
                  image:
                    "https://images.unsplash.com/photo-1606411210633-87597f8c950b?q=80&w=200",
                  rating: 5.0,
                  reviewsCount: 88,
                  badges: ["NEW"],
                  isSoldOut: false,
                },
                quantity: 1,
              },
            ],
          },
          {
            id: "gh_order_88220",
            date: "May 05, 2026",
            total: 35000,
            status: "processing",
            address: "Plot 12, Garki Luxury Apartments, Abuja",
            paymentMethod: "**** 4521",
            items: [
              {
                product: {
                  id: "p3",
                  name: "Night Cream",
                  price: 35000,
                  image:
                    "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200",
                  rating: 4.5,
                  reviewsCount: 42,
                  badges: ["SALE"],
                  isSoldOut: false,
                },
                quantity: 1,
              },
            ],
          },
          {
            id: "gh_order_88221",
            date: "May 01, 2026",
            total: 45000,
            status: "delivered",
            address: "15 Victoria Island, Lagos",
            paymentMethod: "**** 4521",
            items: [
              {
                product: {
                  id: "p4",
                  name: "Rosehip Cleanser",
                  price: 45000,
                  image:
                    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200",
                  rating: 4.9,
                  reviewsCount: 210,
                  badges: ["BESTSELLER"],
                  isSoldOut: false,
                },
                quantity: 1,
              },
            ],
          },
          {
            id: "gh_order_88222",
            date: "April 28, 2026",
            total: 28000,
            status: "cancelled",
            address: "Plot 12, Garki Luxury Apartments, Abuja",
            paymentMethod: "**** 4521",
            items: [
              {
                product: {
                  id: "p5",
                  name: "Travel Mist",
                  price: 28000,
                  image:
                    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200",
                  rating: 4.2,
                  reviewsCount: 15,
                  badges: ["SALE"],
                  isSoldOut: false,
                },
                quantity: 1,
              },
            ],
          },
        ],

        cartOpen: false,
        searchOpen: false,
        mobileMenuOpen: false,
        displayName: "M. Anche",
        email: "admin@glowhaus.com",
        avatar: "/avatar.png",
        isLoggedIn: true,
        recentlyViewed: [],

        // --- ACTIONS ---
        addToCart: (product, options) => {
          set((state) => {
            const existing = state.cartItems.find(
              (i) => i.product.id === product.id,
            );
            const newItems = existing
              ? state.cartItems.map((i) =>
                  i.product.id === product.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i,
                )
              : [
                  ...state.cartItems,
                  { product, quantity: 1, selectedOptions: options },
                ];
            return {
              cartItems: newItems,
              cartCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
              cartTotal: newItems.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0,
              ),
            };
          });
        },

        addBundleToCart: (products) => {
          set((state) => {
            let currentCart = [...state.cartItems];
            products.forEach((product) => {
              const existingIndex = currentCart.findIndex(
                (i) => i.product.id === product.id,
              );
              if (existingIndex > -1) {
                currentCart[existingIndex] = {
                  ...currentCart[existingIndex],
                  quantity: currentCart[existingIndex].quantity + 1,
                };
              } else {
                currentCart.push({ product, quantity: 1, selectedOptions: {} });
              }
            });
            return {
              cartItems: currentCart,
              cartCount: currentCart.reduce(
                (acc, item) => acc + item.quantity,
                0,
              ),
              cartTotal: currentCart.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0,
              ),
            };
          });
        },

        removeFromCart: (id) => {
          set((state) => {
            const newItems = state.cartItems.filter((i) => i.product.id !== id);
            return {
              cartItems: newItems,
              cartCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
              cartTotal: newItems.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0,
              ),
            };
          });
        },

        updateQuantity: (id, qty) => {
          set((state) => {
            const newItems = state.cartItems.map((i) =>
              i.product.id === id ? { ...i, quantity: qty } : i,
            );
            return {
              cartItems: newItems,
              cartCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
              cartTotal: newItems.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0,
              ),
            };
          });
        },

        clearCart: () => set({ cartItems: [], cartTotal: 0, cartCount: 0 }),

        // UPDATED: Luxe Wishlist Action with addedAt timestamp
        addToWishlist: (product) =>
          set((state) => ({
            wishlistItems: state.wishlistItems.some((p) => p.id === product.id)
              ? state.wishlistItems
              : [{ ...product, addedAt: Date.now() }, ...state.wishlistItems],
          })),

        removeFromWishlist: (id) =>
          set((state) => ({
            wishlistItems: state.wishlistItems.filter((p) => p.id !== id),
          })),

        isWishlisted: (id) => get().wishlistItems.some((p) => p.id === id),

        addPoints: (amount, reason) =>
          set((state) => ({
            points: state.points + amount,
            pointsHistory: [
              ...state.pointsHistory,
              {
                id: Math.random().toString(),
                amount,
                reason,
                date: new Date().toISOString(),
              },
            ],
          })),

        redeemPoints: (amount) =>
          set((state) => ({ points: Math.max(0, state.points - amount) })),

        setService: (s) => set({ selectedService: s }),
        setDate: (d) => set({ selectedDate: d }),
        setTime: (t) => set({ selectedTime: t }),

        setBookingPhone: (phone) => set({ bookingPhone: phone }),
        setBookingNotes: (notes) => set({ bookingNotes: notes }),
        setBookingReferral: (ref) => set({ bookingReferral: ref }),

        confirmBooking: (appointment) =>
          set((state) => ({
            bookingHistory: [appointment, ...state.bookingHistory],
          })),

        clearBooking: () =>
          set({
            selectedService: null,
            selectedDate: null,
            selectedTime: null,
            bookingPhone: "",
            bookingNotes: "",
            bookingReferral: "",
          }),

        setAppointmentRating: (id, rating) =>
          set((state) => ({
            bookingHistory: state.bookingHistory.map((appt) =>
              appt.id === id ? { ...appt, rating } : appt,
            ),
          })),

        rebookService: (service) =>
          set({
            selectedService: service,
            selectedDate: null,
            selectedTime: null,
          }),

        addOrder: (order) =>
          set((state) => ({ orders: [order, ...state.orders] })),

        setCartOpen: (v) => set({ cartOpen: v }),
        setSearchOpen: (v) => set({ searchOpen: v }),
        setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),

        addToRecentlyViewed: (product) => {
          set((state) => {
            const filtered = state.recentlyViewed.filter(
              (p) => p.id !== product.id,
            );
            return { recentlyViewed: [product, ...filtered].slice(0, 10) };
          });
        },

        removeFromRecentlyViewed: (id) =>
          set((state) => ({
            recentlyViewed: state.recentlyViewed.filter((p) => p.id !== id),
          })),
      }),
      {
        name: "glowhaus-storage",
        partialize: (state) => ({
          cartItems: state.cartItems,
          wishlistItems: state.wishlistItems,
          points: state.points,
          displayName: state.displayName,
          email: state.email,
          isLoggedIn: state.isLoggedIn,
          recentlyViewed: state.recentlyViewed,
          bookingHistory: state.bookingHistory,
          orders: state.orders,
        }),
      },
    ),
  ),
);
