'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Pizza, Topping } from './supabase';

interface CartContextType {
  cart: CartItem[];
  addToCart: (pizza: Pizza, size: string, quantity: number, toppings: Topping[], removedToppings?: string[], comments?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pizzaCart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (pizza: Pizza, size: string, quantity: number, toppings: Topping[], removedToppings: string[] = [], comments: string = '') => {
    const sizeObj = pizza.sizes.find(s => s.name === size);
    const sizePrice = sizeObj ? sizeObj.price : 0;
    const toppingsTotal = toppings.reduce((sum, t) => sum + t.price, 0);
    const totalPrice = (pizza.base_price + sizePrice + toppingsTotal) * quantity;

    setCart([
      ...cart,
      {
        id: `${pizza.id}-${size}-${Date.now()}`,
        pizza,
        size,
        quantity,
        selectedToppings: toppings,
        removedToppings,
        comments,
        totalPrice,
        toppings,
      },
    ]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        const sizeObj = item.pizza.sizes.find(s => s.name === item.size);
        const sizePrice = sizeObj ? sizeObj.price : 0;
        const toppingsTotal = item.selectedToppings.reduce((sum, t) => sum + t.price, 0);
        const totalPrice = (item.pizza.base_price + sizePrice + toppingsTotal) * quantity;
        return { ...item, quantity, totalPrice };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
