import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
  CartItem,
  Product,
  PointTransaction,
  Service,
  Appointment,
} from "../types";

interface GlobalStore {
  // Cart Slice
  cartItems: CartItem[];
  addToCart: (product: Product, options: any) => void;
  addBundleToCart: (products: Product[]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist Slice
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;

  // Loyalty Slice
  points: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  pointsHistory: PointTransaction[];
  tierBenefits: string[];
  addPoints: (amount: number, reason: string) => void;
  redeemPoints: (amount: number) => void;

  // Booking Slice
  selectedService: Service | null;
  selectedDate: string | null;
  selectedTime: string | null;
  bookingHistory: Appointment[];
  setService: (s: Service) => void;
  setDate: (d: string) => void;
  setTime: (t: string) => void;
  // Task #23 Additions
  bookingPhone: string;
  bookingNotes: string;
  bookingReferral: string;
  setBookingPhone: (phone: string) => void;
  setBookingNotes: (notes: string) => void;
  setBookingReferral: (src: string) => void;
  confirmBooking: (appointment: Appointment) => void;
  clearBooking: () => void;

  // UI Slice
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;

  // User Slice
  displayName: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;

  // Recently Viewed Slice
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  removeFromRecentlyViewed: (id: string) => void;
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
        points: 0,
        tier: "Bronze",
        pointsHistory: [],
        tierBenefits: ["Priority Booking", "Exclusive Discounts"],
        selectedService: null,
        selectedDate: null,
        selectedTime: null,
        bookingHistory: [],
        bookingPhone: "",
        bookingNotes: "",
        bookingReferral: "",
        cartOpen: false,
        searchOpen: false,
        mobileMenuOpen: false,
        displayName: "M. Anche",
        email: "admin@glowhaus.com",
        avatar: "/avatar.png",
        isLoggedIn: true,
        recentlyViewed: [],

        // --- CART ACTIONS ---
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

        // --- WISHLIST ACTIONS ---
        addToWishlist: (product) =>
          set((state) => ({
            wishlistItems: state.wishlistItems.some((p) => p.id === product.id)
              ? state.wishlistItems
              : [...state.wishlistItems, product],
          })),

        removeFromWishlist: (id) =>
          set((state) => ({
            wishlistItems: state.wishlistItems.filter((p) => p.id !== id),
          })),

        isWishlisted: (id) => get().wishlistItems.some((p) => p.id === id),

        // --- LOYALTY ACTIONS ---
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

        // --- BOOKING ACTIONS ---
        setService: (s) => set({ selectedService: s }),
        setDate: (d) => set({ selectedDate: d }),
        setTime: (t) => set({ selectedTime: t }),
        setBookingPhone: (phone) => set({ bookingPhone: phone }),
        setBookingNotes: (notes) => set({ bookingNotes: notes }),
        setBookingReferral: (src) => set({ bookingReferral: src }),
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

        // --- UI ACTIONS ---
        setCartOpen: (v) => set({ cartOpen: v }),
        setSearchOpen: (v) => set({ searchOpen: v }),
        setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),

        // --- RECENTLY VIEWED ACTIONS ---
        addToRecentlyViewed: (product) => {
          set((state) => {
            const filtered = state.recentlyViewed.filter(
              (p) => p.id !== product.id,
            );
            const updated = [product, ...filtered].slice(0, 10);
            return { recentlyViewed: updated };
          });
        },

        removeFromRecentlyViewed: (id) => {
          set((state) => ({
            recentlyViewed: state.recentlyViewed.filter((p) => p.id !== id),
          }));
        },
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
        }),
      },
    ),
  ),
);
