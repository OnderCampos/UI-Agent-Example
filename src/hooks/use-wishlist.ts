"use client";

import { useState, useEffect, useCallback } from "react";
import type { Wishlist, WishlistSummary } from "@/types/wishlist";

interface UseWishlistReturn {
  wishlists: WishlistSummary[];
  currentWishlist: Wishlist | null;
  isLoading: boolean;
  error: string | null;
  addItem: (productId: string, note?: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  moveToCart: (itemId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  shareWishlist: () => Promise<string | null>;
  refreshWishlists: () => Promise<void>;
}

export function useWishlist(wishlistId?: string): UseWishlistReturn {
  const [wishlists, setWishlists] = useState<WishlistSummary[]>([]);
  const [currentWishlist, setCurrentWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishlists
  const refreshWishlists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/wishlist");
      const data = await response.json();

      if (data.success) {
        setWishlists(data.data.wishlists || []);
      }
    } catch (_err) {
      setError("Failed to load wishlists");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch specific wishlist
  const fetchWishlist = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`);
      const data = await response.json();

      if (data.success) {
        setCurrentWishlist(data.data);
      }
    } catch (_err) {
      setError("Failed to load wishlist");
    }
  }, []);

  useEffect(() => {
    refreshWishlists();
    if (wishlistId) {
      fetchWishlist(wishlistId);
    }
  }, [wishlistId, refreshWishlists, fetchWishlist]);

  // Add item to wishlist
  const addItem = useCallback(async (productId: string, note?: string) => {
    try {
      const response = await fetch("/api/wishlist/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          wishlistId,
          note,
        }),
      });

      if (!response.ok) throw new Error("Failed to add item");

      // Refresh current wishlist
      if (wishlistId) {
        await fetchWishlist(wishlistId);
      }
      await refreshWishlists();
    } catch (err) {
      setError("Failed to add item to wishlist");
      throw err;
    }
  }, [wishlistId, fetchWishlist, refreshWishlists]);

  // Remove item from wishlist
  const removeItem = useCallback(async (itemId: string) => {
    if (!currentWishlist) return;

    try {
      const response = await fetch(`/api/wishlist/${currentWishlist.id}/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      // Update local state
      setCurrentWishlist((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== itemId),
        };
      });
      await refreshWishlists();
    } catch (err) {
      setError("Failed to remove item");
      throw err;
    }
  }, [currentWishlist, refreshWishlists]);

  // Move item to cart
  const moveToCart = useCallback(async (itemId: string) => {
    if (!currentWishlist) return;

    try {
      const response = await fetch(`/api/wishlist/${currentWishlist.id}/items/${itemId}/move-to-cart`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to move to cart");

      // Update local state
      setCurrentWishlist((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.filter((i) => i.id !== itemId),
        };
      });
      await refreshWishlists();
    } catch (err) {
      setError("Failed to move item to cart");
      throw err;
    }
  }, [currentWishlist, refreshWishlists]);

  // Check if product is in wishlist
  const isInWishlist = useCallback((productId: string): boolean => {
    if (!currentWishlist) return false;
    return currentWishlist.items.some((item) => item.productId === productId);
  }, [currentWishlist]);

  // Share wishlist
  const shareWishlist = useCallback(async (): Promise<string | null> => {
    if (!currentWishlist) return null;

    try {
      const response = await fetch(`/api/wishlist/${currentWishlist.id}/share`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        setCurrentWishlist((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            isPublic: true,
            shareToken: data.data.shareToken,
            shareUrl: data.data.shareUrl,
          };
        });
        return data.data.shareUrl;
      }

      return null;
    } catch (_err) {
      setError("Failed to share wishlist");
      return null;
    }
  }, [currentWishlist]);

  return {
    wishlists,
    currentWishlist,
    isLoading,
    error,
    addItem,
    removeItem,
    moveToCart,
    isInWishlist,
    shareWishlist,
    refreshWishlists,
  };
}
