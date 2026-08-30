export interface FlavorProfile {
  spice: number; // 0-10
  crunch: number; // 0-10
  creaminess: number; // 0-10
  sweetness: number; // 0-10
  savory: number; // 0-10
}

export interface Dish {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string; // e.g. "Signature Dishes", "Main Course", "Starters", "Desserts", "Beverages"
  image: string;
  rating: number;
  reviewsCount: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree?: boolean;
  spiceLevel: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Hot
  preparationTimeMinutes: number;
  calories?: number;
  ingredients: string[];
  customizations?: {
    name: string;
    options: { label: string; price: number }[];
  }[];
  trending?: boolean;
  featured?: boolean;
  isHiddenGem?: boolean;
  cravingTags: string[]; // e.g. ["Spicy", "Cheesy", "Comfort Food", "Crispy", "Late Night"]
  cuisine: string;
  flavorProfile?: FlavorProfile;
  matchScore?: number; // Calculated dynamic match %
  matchReason?: string; // AI explanation
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  cuisine: string[];
  rating: number;
  reviewsCount: number;
  priceRange: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  location: string;
  address: string;
  distanceKm: number;
  openingHours: string;
  isOpen: boolean;
  featured: boolean;
  trending: boolean;
  isHiddenGem?: boolean;
  coverImage: string;
  logoImage?: string;
  galleryImages: string[];
  signatureDish: string;
  chefName?: string;
  dineInAvailable: boolean;
  takeoutAvailable: boolean;
  deliveryTimeMinutes: number;
}

export interface CravingCategory {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  image: string;
  bgGradient: string;
  synonyms: string[];
}

export interface Occasion {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  dishName?: string;
}

export interface CartItem {
  id: string;
  dish: Dish;
  quantity: number;
  selectedCustomizations: Record<string, string>;
  itemTotal: number;
  instructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    isDefault: boolean;
  }[];
  preferences: {
    dietary: string[];
    favoriteCuisines: string[];
    spicePreference: string;
  };
}

export interface OrderItem {
  dishId: string;
  dishName: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  restaurantName: string;
  restaurantId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimatedDeliveryMinutes: number;
  deliveryAddress: string;
  paymentMethod: string;
  trackingTimeline: {
    title: string;
    time: string;
    completed: boolean;
  }[];
}

export interface RecommendationRequest {
  mood: string;
  cuisine: string;
  budget: string;
  diet: string;
  promptQuery?: string;
}

export interface RecommendationMatch {
  dish: Dish;
  matchScore: number;
  matchReason: string;
}
