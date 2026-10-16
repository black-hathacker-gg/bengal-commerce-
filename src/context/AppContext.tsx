import React, { createContext, useContext, useState } from 'react';
import { CartItem } from '@/types';

export type ScreenType = 'storefront' | 'product-detail' | 'retail-pos';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedHub: string;
  setSelectedHub: (hub: string) => void;
  language: 'EN' | 'BN';
  setLanguage: (lang: 'EN' | 'BN') => void;
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number; imageUrl: string; variant?: string; batchId?: string }, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('storefront');
  const [selectedHub, setSelectedHub] = useState('Dhanmondi Hub #04');
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial cart with essential items
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'pran-milk-1l',
      name: 'Pran UHT Full Cream Milk 1L',
      price: 95.0,
      quantity: 2,
      variant: '1L Tetrapak',
      imageUrl: '/src/assets/images/bengal_milk_carton_1792138091407.jpg',
      batchId: 'BNG-2024-089',
      fefoDiscount: 25,
    },
    {
      id: 'cart-2',
      productId: 'radhuni-mustard-500ml',
      name: 'Radhuni Pure Mustard Oil 500ml',
      price: 195.0,
      quantity: 1,
      variant: '500ml Bottle',
      imageUrl: '/src/assets/images/bengal_mustard_oil_1792138091764.jpg',
      batchId: 'BNG-2024-094',
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(['pran-milk-1l', 'ispahani-tea-100s']);
  const [userPoints, setUserPoints] = useState(2450);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: { id: string; name: string; price: number; imageUrl: string; variant?: string; batchId?: string }, qty = 1) => {
    const variantName = product.variant || 'Standard Pack';
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id && item.variant === variantName);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        variant: variantName,
        imageUrl: product.imageUrl,
        batchId: product.batchId,
      };
      return [...prev, newItem];
    });
    showToast('Added to Cart', `${qty}x ${product.name} (${variantName}) added.`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item Removed', 'Item removed from your cart.', 'info');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Wishlist Updated', 'Removed item from saved wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Item added to your favorite staples.', 'success');
        return [...prev, productId];
      }
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedHub,
        setSelectedHub,
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        userPoints,
        setUserPoints,
        toasts,
        showToast,
        removeToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
