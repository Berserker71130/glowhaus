export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

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

export interface Appointment {
  id: string;
  service: Service;
  date: string;
  time: string;
}
