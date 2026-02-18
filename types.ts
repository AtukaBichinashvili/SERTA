
export type Language = 'ka' | 'en';

export interface LocalizedString {
  ka: string;
  en: string;
}

export interface SizePrice {
  size: number;
  price: number;
}

export interface Product {
  id: string;
  name: LocalizedString;
  sizePrices: SizePrice[]; // Unified size and price management
  type: LocalizedString;
  firmness: number; // 1-10
  height: number; // cm
  warranty: number; // years
  description: LocalizedString;
  features: LocalizedString[];
  careInstructions?: LocalizedString;
  image: string;
  isBestSeller?: boolean;
  category: 'Memory Foam' | 'Spring' | 'Hybrid' | 'Orthopedic';
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: number;
}

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
}
