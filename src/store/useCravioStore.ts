import { create } from 'zustand';
import { Dish, CartItem, Order, User, Restaurant } from '../types';
import { DEMO_USER, DISHES, RESTAURANTS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface CravioState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (dish: Dish, quantity?: number, selectedCustomizations?: Record<string, string>, instructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleCartDrawer: (open?: boolean) => void;

  // Favorites
  favoriteDishIds: string[];
  favoriteRestaurantIds: string[];
  toggleFavoriteDish: (dishId: string) => void;
  toggleFavoriteRestaurant: (restaurantId: string) => void;

  // Modals
  activeDishModal: Dish | null;
  openDishModal: (dish: Dish) => void;
  closeDishModal: () => void;

  activeOrderTracker: Order | null;
  openOrderTracker: (order: Order) => void;
  closeOrderTracker: () => void;

  isSearchOpen: boolean;
  toggleSearchModal: (open?: boolean) => void;

  // Filters & Search
  activeCraving: string | null;
  setActiveCraving: (craving: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // User & Orders
  user: User;
  orders: Order[];
  placeOrder: (deliveryAddress: string, paymentMethod: string) => Order;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

export const useCravioStore = create<CravioState>((set, get) => ({
  cart: [
    {
      id: 'cart-init-1',
      dish: DISHES[3], // Truffle Cream & Burrata Pasta
      quantity: 1,
      selectedCustomizations: { 'Pasta Selection': 'Fettuccine' },
      itemTotal: 499,
    },
    {
      id: 'cart-init-2',
      dish: DISHES[0], // Smoked Truffle Butter Dal Makhani
      quantity: 1,
      selectedCustomizations: { 'Spice Level': 'Mild & Creamy' },
      itemTotal: 389,
    },
  ],
  isCartOpen: false,

  favoriteDishIds: ['dish-1', 'dish-4', 'dish-9'],
  favoriteRestaurantIds: ['rest-1', 'rest-2', 'rest-15'],

  activeDishModal: null,
  activeOrderTracker: null,
  isSearchOpen: false,

  activeCraving: null,
  searchQuery: '',

  user: DEMO_USER,
  orders: [
    {
      id: 'CRV-8942',
      createdAt: 'Today, 2:15 PM',
      restaurantName: 'EMBER HOUSE',
      restaurantId: 'rest-1',
      items: [
        {
          dishId: 'dish-1',
          dishName: 'Smoked Truffle Butter Dal Makhani',
          quantity: 1,
          unitPrice: 389,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
        },
      ],
      subtotal: 389,
      tax: 35,
      deliveryFee: 40,
      total: 464,
      status: 'Out for Delivery',
      estimatedDeliveryMinutes: 18,
      deliveryAddress: '42 Boat Club Road, RA Puram, Chennai',
      paymentMethod: 'UPI / GPay',
      trackingTimeline: [
        { title: 'Order Received', time: '2:15 PM', completed: true },
        { title: 'Kitchen Preparing', time: '2:18 PM', completed: true },
        { title: 'Out for Delivery', time: '2:30 PM', completed: true },
        { title: 'Delivered', time: 'Est. 2:45 PM', completed: false },
      ],
    },
  ],

  toastMessage: null,

  showToast: (msg: string) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3000);
  },

  addToCart: (dish, quantity = 1, selectedCustomizations = {}, instructions = '') => {
    const currentCart = get().cart;
    const cartItemId = `${dish.id}-${JSON.stringify(selectedCustomizations)}`;
    const existingIndex = currentCart.findIndex(item => item.id === cartItemId);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = currentCart.map((item, idx) =>
        idx === existingIndex
          ? {
              ...item,
              quantity: item.quantity + quantity,
              itemTotal: (item.quantity + quantity) * dish.price,
            }
          : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          id: cartItemId,
          dish,
          quantity,
          selectedCustomizations,
          itemTotal: dish.price * quantity,
          instructions,
        },
      ];
    }

    set({ cart: updatedCart });
    get().showToast(`Added "${dish.name}" to cart`);

    // Trigger subtle confetti burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#E05A2B', '#D4AF37', '#FAF7F2'],
    });
  },

  removeFromCart: (cartItemId) => {
    set({ cart: get().cart.filter(item => item.id !== cartItemId) });
  },

  updateCartItemQuantity: (cartItemId, delta) => {
    const updated = get().cart.map(item => {
      if (item.id === cartItemId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return {
          ...item,
          quantity: newQty,
          itemTotal: newQty * item.dish.price,
        };
      }
      return item;
    }).filter(Boolean) as CartItem[];

    set({ cart: updated });
  },

  clearCart: () => set({ cart: [] }),

  toggleCartDrawer: (open) => {
    set({ isCartOpen: open !== undefined ? open : !get().isCartOpen });
  },

  toggleFavoriteDish: (dishId) => {
    const list = get().favoriteDishIds;
    const isFav = list.includes(dishId);
    const newList = isFav ? list.filter(id => id !== dishId) : [...list, dishId];
    set({ favoriteDishIds: newList });
    const dish = DISHES.find(d => d.id === dishId);
    get().showToast(isFav ? `Removed from favorites` : `Saved ${dish?.name || 'dish'} to favorites ❤️`);
  },

  toggleFavoriteRestaurant: (restaurantId) => {
    const list = get().favoriteRestaurantIds;
    const isFav = list.includes(restaurantId);
    const newList = isFav ? list.filter(id => id !== restaurantId) : [...list, restaurantId];
    set({ favoriteRestaurantIds: newList });
    const rest = RESTAURANTS.find(r => r.id === restaurantId);
    get().showToast(isFav ? `Removed from saved places` : `Saved ${rest?.name || 'restaurant'} ❤️`);
  },

  openDishModal: (dish) => set({ activeDishModal: dish }),
  closeDishModal: () => set({ activeDishModal: null }),

  openOrderTracker: (order) => set({ activeOrderTracker: order }),
  closeOrderTracker: () => set({ activeOrderTracker: null }),

  toggleSearchModal: (open) => set({ isSearchOpen: open !== undefined ? open : !get().isSearchOpen }),

  setActiveCraving: (craving) => set({ activeCraving: craving }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  placeOrder: (deliveryAddress, paymentMethod) => {
    const cart = get().cart;
    if (cart.length === 0) return get().orders[0];

    const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
    const tax = Math.round(subtotal * 0.08);
    const deliveryFee = subtotal > 600 ? 0 : 40;
    const total = subtotal + tax + deliveryFee;

    const newOrder: Order = {
      id: `CRV-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      restaurantName: cart[0].dish.restaurantName,
      restaurantId: cart[0].dish.restaurantId,
      items: cart.map(item => ({
        dishId: item.dish.id,
        dishName: item.dish.name,
        quantity: item.quantity,
        unitPrice: item.dish.price,
        image: item.dish.image,
      })),
      subtotal,
      tax,
      deliveryFee,
      total,
      status: 'Received',
      estimatedDeliveryMinutes: 28,
      deliveryAddress,
      paymentMethod,
      trackingTimeline: [
        { title: 'Order Received', time: 'Just now', completed: true },
        { title: 'Kitchen Preparing', time: 'Est. 5 mins', completed: false },
        { title: 'Out for Delivery', time: 'Est. 18 mins', completed: false },
        { title: 'Delivered', time: 'Est. 28 mins', completed: false },
      ],
    };

    set({
      orders: [newOrder, ...get().orders],
      cart: [],
      activeOrderTracker: newOrder,
    });

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
    });

    return newOrder;
  },
}));
