import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { products, Product } from '../data/products';

export interface StoredCartItem {
  productId: string;
  packSize: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  packSize: string;
  selectedSize: string; // compatibility with existing usages
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, packSize: string) => void;
  updateQuantity: (productId: string, packSize: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const MAX_QUANTITY_PER_LINE = 20;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('of_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];

      // Validate and migrate/filter valid references only
      const valid: StoredCartItem[] = [];
      for (const item of parsed) {
        const pId = item.productId || item.product?.id;
        const pSize = item.packSize || item.selectedSize || 'Standard Pack';
        const qty = typeof item.quantity === 'number' ? Math.min(Math.max(1, item.quantity), MAX_QUANTITY_PER_LINE) : 1;

        if (pId) {
          // Normalise legacy corriander typos
          const cleanId = pId === 'corriander-powder' ? 'coriander-powder' : pId === 'corriander-whole' ? 'coriander-whole' : pId;
          const found = products.find(p => p.id === cleanId);
          if (found) {
            valid.push({
              productId: cleanId,
              packSize: pSize,
              quantity: qty
            });
          }
        }
      }
      return valid;
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('of_cart', JSON.stringify(storedItems));
    } catch (e) {
      console.warn('Storage unavailable or quota exceeded:', e);
    }
  }, [storedItems]);

  const addToCart = (product: Product, quantity = 1, selectedSize = "Standard Pack") => {
    setStoredItems(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id && item.packSize === selectedSize);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, MAX_QUANTITY_PER_LINE);
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      }
      return [...prev, { productId: product.id, packSize: selectedSize, quantity: Math.min(quantity, MAX_QUANTITY_PER_LINE) }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, packSize: string) => {
    setStoredItems(prev => prev.filter(item => !(item.productId === productId && item.packSize === packSize)));
  };

  const updateQuantity = (productId: string, packSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, packSize);
      return;
    }
    const clampedQty = Math.min(quantity, MAX_QUANTITY_PER_LINE);
    setStoredItems(prev =>
      prev.map(item =>
        item.productId === productId && item.packSize === packSize
          ? { ...item, quantity: clampedQty }
          : item
      )
    );
  };

  const clearCart = () => setStoredItems([]);

  // Derive cart items dynamically from current catalog prices at render time
  const items: CartItem[] = useMemo(() => {
    return storedItems.reduce((acc: CartItem[], stored) => {
      const product = products.find(p => p.id === stored.productId);
      if (!product) return acc;

      const pack = product.packSizes.find(s => s.size === stored.packSize);
      const unitPrice = pack ? pack.price : product.startingPrice;
      const lineTotal = unitPrice * stored.quantity;

      acc.push({
        product: { ...product, price: unitPrice } as any,
        packSize: stored.packSize,
        selectedSize: stored.packSize,
        quantity: stored.quantity,
        unitPrice,
        lineTotal
      });
      return acc;
    }, []);
  }, [storedItems]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.lineTotal, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
