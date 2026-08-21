/**
 * Wishlist Types
 */

import type { ProductListItem } from "./product";

/**
 * Wishlist item
 */
export interface WishlistItem {
  id: string;
  productId: string;
  product: ProductListItem;
  addedAt: string;
  note?: string;
  priority?: WishlistPriority;
}

/**
 * Wishlist priority levels
 */
export type WishlistPriority = "low" | "medium" | "high";

/**
 * Wishlist entity
 */
export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  items: WishlistItem[];
  isPublic: boolean;
  isDefault: boolean;
  shareToken?: string;
  shareUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Add to wishlist request
 */
export interface AddToWishlistRequest {
  productId: string;
  wishlistId?: string; // Use default wishlist if not specified
  note?: string;
  priority?: WishlistPriority;
}

/**
 * Update wishlist item request
 */
export interface UpdateWishlistItemRequest {
  note?: string;
  priority?: WishlistPriority;
}

/**
 * Create wishlist request
 */
export interface CreateWishlistRequest {
  name: string;
  isPublic?: boolean;
}

/**
 * Share wishlist response
 */
export interface ShareWishlistResponse {
  shareToken: string;
  shareUrl: string;
}

/**
 * Wishlist summary (for quick display)
 */
export interface WishlistSummary {
  id: string;
  name: string;
  itemCount: number;
  previewImages: string[];
  isPublic: boolean;
}
