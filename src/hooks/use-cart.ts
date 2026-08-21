"use client";

import { useState, useCallback, useEffect } from "react";
import type { Cart } from "@/types/cart";

interface AddToCartInput {
  productId: string;
  variantId?: string;
  quantity: number;
}

interface SavedItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  slug: string;
  image?: { url: string; alt?: string };
  price: { amount: number; formatted: string };
  savedAt: string;
}

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [savedForLater, setSavedForLater] = useState<SavedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<{ amount: number; formatted: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Fetch cart on mount
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (data.success) {
        setCart(data.data);
        // Load saved for later from localStorage
        const saved = localStorage.getItem("savedForLater");
        if (saved) {
          setSavedForLater(JSON.parse(saved));
        }
      } else {
        // Cart might not exist yet, that's okay
        setCart(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = useCallback(async (input: AddToCartInput) => {
    try {
      setIsUpdating(true);
      setUpdatingItemId(input.productId);
      setError(null);

      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (data.success) {
        setCart(data.data);
        return data.data;
      } else {
        throw new Error(data.error?.message || "Failed to add to cart");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add to cart";
      setError(message);
      throw err;
    } finally {
      setIsUpdating(false);
      setUpdatingItemId(null);
    }
  }, []);

  // Update item quantity
  const updateItem = useCallback(async (lineItemId: string, quantity: number) => {
    try {
      setIsUpdating(true);
      setUpdatingItemId(lineItemId);
      setError(null);

      const res = await fetch(`/api/cart/items/${lineItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      const data = await res.json();

      if (data.success) {
        setCart(data.data);
        return data.data;
      } else {
        throw new Error(data.error?.message || "Failed to update item");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update item";
      setError(message);
      throw err;
    } finally {
      setIsUpdating(false);
      setUpdatingItemId(null);
    }
  }, []);

  // Remove item from cart
  const removeItem = useCallback(async (lineItemId: string) => {
    try {
      setIsUpdating(true);
      setUpdatingItemId(lineItemId);
      setError(null);

      const res = await fetch(`/api/cart/items/${lineItemId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setCart(data.data);
        return data.data;
      } else {
        throw new Error(data.error?.message || "Failed to remove item");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to remove item";
      setError(message);
      throw err;
    } finally {
      setIsUpdating(false);
      setUpdatingItemId(null);
    }
  }, []);

  // Apply promo code
  const applyPromoCode = useCallback(async (code: string) => {
    try {
      setPromoError(null);
      
      const res = await fetch("/api/cart/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.success) {
        setPromoCode(code);
        setPromoDiscount(data.data.discount);
        if (data.data.cart) {
          setCart(data.data.cart);
        }
        return data.data;
      } else {
        setPromoError(data.error?.message || "Invalid promo code");
        throw new Error(data.error?.message || "Invalid promo code");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to apply promo code";
      setPromoError(message);
      throw err;
    }
  }, []);

  // Remove promo code
  const removePromoCode = useCallback(async () => {
    try {
      const res = await fetch("/api/cart/promo", {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setPromoCode(null);
        setPromoDiscount(null);
        setPromoError(null);
        if (data.data.cart) {
          setCart(data.data.cart);
        }
      }
    } catch (_err) {
      // Silently fail - promo removal is not critical
    }
  }, []);

  // Save item for later
  const saveForLater = useCallback(async (lineItemId: string) => {
    if (!cart) return;

    const item = cart.lineItems.find((i) => i.id === lineItemId);
    if (!item) return;

    try {
      setIsUpdating(true);
      setUpdatingItemId(lineItemId);

      // Add to saved items
      const savedItem: SavedItem = {
        id: `saved-${Date.now()}`,
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        sku: item.sku,
        slug: item.slug,
        image: item.image || undefined,
        price: {
          amount: item.unitPrice.amount,
          formatted: item.unitPrice.formatted,
        },
        savedAt: new Date().toISOString(),
      };

      const newSaved = [...savedForLater, savedItem];
      setSavedForLater(newSaved);
      localStorage.setItem("savedForLater", JSON.stringify(newSaved));

      // Remove from cart
      await removeItem(lineItemId);
    } finally {
      setIsUpdating(false);
      setUpdatingItemId(null);
    }
  }, [cart, savedForLater, removeItem]);

  // Move saved item back to cart
  const moveToCart = useCallback(async (savedItemId: string) => {
    const item = savedForLater.find((i) => i.id === savedItemId);
    if (!item) return;

    try {
      setIsUpdating(true);

      // Add to cart
      await addToCart({
        productId: item.productId,
        variantId: item.variantId,
        quantity: 1,
      });

      // Remove from saved
      const newSaved = savedForLater.filter((i) => i.id !== savedItemId);
      setSavedForLater(newSaved);
      localStorage.setItem("savedForLater", JSON.stringify(newSaved));
    } finally {
      setIsUpdating(false);
    }
  }, [savedForLater, addToCart]);

  // Remove saved item
  const removeSavedItem = useCallback((savedItemId: string) => {
    const newSaved = savedForLater.filter((i) => i.id !== savedItemId);
    setSavedForLater(newSaved);
    localStorage.setItem("savedForLater", JSON.stringify(newSaved));
  }, [savedForLater]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart(null);
    setPromoCode(null);
    setPromoDiscount(null);
    setPromoError(null);
  }, []);

  // Helper to check if a specific product is being added
  const isAddingProduct = useCallback(
    (productId: string) => isUpdating && updatingItemId === productId,
    [isUpdating, updatingItemId]
  );

  // Helper to check if a specific item is being updated
  const isUpdatingItem = useCallback(
    (itemId: string) => isUpdating && updatingItemId === itemId,
    [isUpdating, updatingItemId]
  );

  // Calculate totals with promo
  const totalsWithPromo = cart?.totals
    ? {
        ...cart.totals,
        discount: promoDiscount,
        total: promoDiscount
          ? {
              amount: cart.totals.total.amount - promoDiscount.amount,
              formatted: `$${((cart.totals.total.amount - promoDiscount.amount) / 100).toFixed(2)}`,
            }
          : cart.totals.total,
      }
    : null;

  return {
    cart,
    isLoading,
    isUpdating,
    updatingItemId,
    error,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    refresh: fetchCart,
    isAddingProduct,
    isUpdatingItem,
    // Promo code
    promoCode,
    promoDiscount,
    promoError,
    applyPromoCode,
    removePromoCode,
    // Save for later
    savedForLater,
    saveForLater,
    moveToCart,
    removeSavedItem,
    // Enhanced totals
    totalsWithPromo,
  };
}
