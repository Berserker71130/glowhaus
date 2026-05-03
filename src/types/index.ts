export type BadgeType =
  | "NEW"
  | "BESTSELLER"
  | "SALE"
  | "LOW STOCK"
  | "SOLD OUT"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Stylist {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category?: string;
  badges: BadgeType[];
  isSoldOut: boolean;
}

// --- Added for Task #26 ---
export interface Order {
  id: string;
  date: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  address: string;
  paymentMethod: string; // e.g. "**** 4521"
}

export interface Appointment {
  id: string;
  service: Service;
  date: string; // "YYYY-MM-DD" format recommended
  time: string;
  stylist: Stylist; // Added for Task #26
  status: "upcoming" | "completed" | "cancelled"; // Added
  rating?: number; // Added (1-5)
}

// Keep your existing CartItem, PointTransaction, and Service as they were
export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, any>;
}

export interface PointTransaction {
  id: string;
  amount: number;
  reason: string;
  date: string;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
}
