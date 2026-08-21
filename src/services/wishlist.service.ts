/**
 * Wishlist Service
 * Manages user wishlists
 */

import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";
import type {
  Wishlist,
  WishlistItem,
  AddToWishlistRequest,
  CreateWishlistRequest,
  ShareWishlistResponse,
  WishlistSummary,
} from "@/types/wishlist";
import type { ProductListItem } from "@/types/product";

const log = logger.child("WishlistService");

// Mock storage
const mockWishlists: Map<string, Wishlist> = new Map();
const mockUserWishlists: Map<string, string[]> = new Map();

// Mock product for demo
const mockProduct: ProductListItem = {
  id: "prod-1",
  sku: "SKU-001",
  name: "Sample Product",
  slug: "sample-product",
  shortDescription: "A sample product for demonstration",
  price: {
    amount: 2999,
    currency: "USD",
    formatted: "$29.99",
  },
  image: {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    alt: "Sample Product",
    isDefault: true,
  },
  isAvailable: true,
  hasVariants: false,
  categories: [
    {
      id: "cat-1",
      name: "Featured",
      slug: "featured",
    },
  ],
};

/**
 * Wishlist service class
 */
export class WishlistService {
  /**
   * Get user's wishlists
   */
  async getUserWishlists(userId: string): Promise<WishlistSummary[]> {
    log.debug("Fetching user wishlists", { userId });

    if (USE_MOCKS) {
      const wishlistIds = mockUserWishlists.get(userId) || [];
      return wishlistIds.map((id) => {
        const wishlist = mockWishlists.get(id);
        if (!wishlist) return null;
        return {
          id: wishlist.id,
          name: wishlist.name,
          itemCount: wishlist.items.length,
          previewImages: wishlist.items
            .slice(0, 4)
            .map((i) => i.product.image?.url)
            .filter((url): url is string => Boolean(url)),
          isPublic: wishlist.isPublic,
        };
      }).filter(Boolean) as WishlistSummary[];
    }

    // In production, fetch from database/API
    return [];
  }

  /**
   * Get or create default wishlist
   */
  async getDefaultWishlist(userId: string): Promise<Wishlist> {
    log.debug("Getting default wishlist", { userId });

    if (USE_MOCKS) {
      const wishlistIds = mockUserWishlists.get(userId) || [];
      for (const id of wishlistIds) {
        const wishlist = mockWishlists.get(id);
        if (wishlist?.isDefault) return wishlist;
      }

      // Create default wishlist if none exists
      return this.createWishlist(userId, { name: "My Wishlist" });
    }

    throw new Error("Not implemented");
  }

  /**
   * Get wishlist by ID
   */
  async getWishlist(wishlistId: string): Promise<Wishlist | null> {
    log.debug("Fetching wishlist", { wishlistId });

    if (USE_MOCKS) {
      return mockWishlists.get(wishlistId) || null;
    }

    return null;
  }

  /**
   * Get wishlist by share token
   */
  async getWishlistByToken(shareToken: string): Promise<Wishlist | null> {
    log.debug("Fetching wishlist by token", { shareToken });

    if (USE_MOCKS) {
      for (const wishlist of mockWishlists.values()) {
        if (wishlist.shareToken === shareToken && wishlist.isPublic) {
          return wishlist;
        }
      }
      return null;
    }

    return null;
  }

  /**
   * Create a new wishlist
   */
  async createWishlist(userId: string, data: CreateWishlistRequest): Promise<Wishlist> {
    log.debug("Creating wishlist", { userId, name: data.name });

    const wishlistId = `wishlist-${Date.now()}`;
    const now = new Date().toISOString();

    const wishlist: Wishlist = {
      id: wishlistId,
      userId,
      name: data.name,
      items: [],
      isPublic: data.isPublic || false,
      isDefault: mockUserWishlists.get(userId)?.length === 0,
      createdAt: now,
      updatedAt: now,
    };

    if (USE_MOCKS) {
      mockWishlists.set(wishlistId, wishlist);
      const userLists = mockUserWishlists.get(userId) || [];
      userLists.push(wishlistId);
      mockUserWishlists.set(userId, userLists);
    }

    return wishlist;
  }

  /**
   * Add item to wishlist
   */
  async addItem(userId: string, request: AddToWishlistRequest): Promise<WishlistItem> {
    log.debug("Adding item to wishlist", { userId, productId: request.productId });

    let wishlist: Wishlist;

    if (request.wishlistId) {
      const found = await this.getWishlist(request.wishlistId);
      if (!found) throw new Error("Wishlist not found");
      wishlist = found;
    } else {
      wishlist = await this.getDefaultWishlist(userId);
    }

    // Check if already in wishlist
    const existing = wishlist.items.find((i) => i.productId === request.productId);
    if (existing) {
      return existing;
    }

    // In production, fetch actual product data
    const product = { ...mockProduct, id: request.productId };

    const item: WishlistItem = {
      id: `item-${Date.now()}`,
      productId: request.productId,
      product,
      addedAt: new Date().toISOString(),
      note: request.note,
      priority: request.priority || "medium",
    };

    wishlist.items.push(item);
    wishlist.updatedAt = new Date().toISOString();

    if (USE_MOCKS) {
      mockWishlists.set(wishlist.id, wishlist);
    }

    return item;
  }

  /**
   * Remove item from wishlist
   */
  async removeItem(userId: string, wishlistId: string, itemId: string): Promise<void> {
    log.debug("Removing item from wishlist", { userId, wishlistId, itemId });

    const wishlist = await this.getWishlist(wishlistId);
    if (!wishlist) throw new Error("Wishlist not found");

    wishlist.items = wishlist.items.filter((i) => i.id !== itemId);
    wishlist.updatedAt = new Date().toISOString();

    if (USE_MOCKS) {
      mockWishlists.set(wishlist.id, wishlist);
    }
  }

  /**
   * Update wishlist item
   */
  async updateItem(
    userId: string,
    wishlistId: string,
    itemId: string,
    data: { note?: string; priority?: "low" | "medium" | "high" }
  ): Promise<WishlistItem> {
    log.debug("Updating wishlist item", { userId, wishlistId, itemId });

    const wishlist = await this.getWishlist(wishlistId);
    if (!wishlist) throw new Error("Wishlist not found");

    const item = wishlist.items.find((i) => i.id === itemId);
    if (!item) throw new Error("Item not found");

    if (data.note !== undefined) item.note = data.note;
    if (data.priority !== undefined) item.priority = data.priority;
    wishlist.updatedAt = new Date().toISOString();

    if (USE_MOCKS) {
      mockWishlists.set(wishlist.id, wishlist);
    }

    return item;
  }

  /**
   * Check if product is in any wishlist
   */
  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    if (USE_MOCKS) {
      const wishlistIds = mockUserWishlists.get(userId) || [];
      for (const id of wishlistIds) {
        const wishlist = mockWishlists.get(id);
        if (wishlist?.items.some((i) => i.productId === productId)) {
          return true;
        }
      }
      return false;
    }

    return false;
  }

  /**
   * Generate share link for wishlist
   */
  async shareWishlist(userId: string, wishlistId: string): Promise<ShareWishlistResponse> {
    log.debug("Sharing wishlist", { userId, wishlistId });

    const wishlist = await this.getWishlist(wishlistId);
    if (!wishlist) throw new Error("Wishlist not found");

    const shareToken = this.generateShareToken();
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://pricesmart.com"}/wishlist/shared/${shareToken}`;

    wishlist.shareToken = shareToken;
    wishlist.shareUrl = shareUrl;
    wishlist.isPublic = true;
    wishlist.updatedAt = new Date().toISOString();

    if (USE_MOCKS) {
      mockWishlists.set(wishlist.id, wishlist);
    }

    return { shareToken, shareUrl };
  }

  /**
   * Move item to cart
   */
  async moveToCart(
    userId: string,
    wishlistId: string,
    itemId: string
  ): Promise<{ success: boolean }> {
    log.debug("Moving item to cart", { userId, wishlistId, itemId });

    const wishlist = await this.getWishlist(wishlistId);
    if (!wishlist) throw new Error("Wishlist not found");

    const item = wishlist.items.find((i) => i.id === itemId);
    if (!item) throw new Error("Item not found");

    // In production, call cart service to add item
    // await cartService.addItem(userId, { productId: item.productId, quantity: 1 });

    // Optionally remove from wishlist
    await this.removeItem(userId, wishlistId, itemId);

    return { success: true };
  }

  /**
   * Generate share token
   */
  private generateShareToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

// Export singleton instance
let wishlistServiceInstance: WishlistService | null = null;

export function getWishlistService(): WishlistService {
  if (!wishlistServiceInstance) {
    wishlistServiceInstance = new WishlistService();
  }
  return wishlistServiceInstance;
}
