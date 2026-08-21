/**
 * Cart Service
 * Orchestrates cart operations with inventory validation
 */

import * as commercetools from "@/integrations/commercetools";
import type { Cart, AddToCartInput, UpdateCartItemInput, ShippingMethod } from "@/types/cart";
import { InsufficientInventoryError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("CartService");

/**
 * Cart service class
 */
export class CartService {
  /**
   * Get or create cart for user
   */
  async getOrCreateCart(options: {
    cartId?: string;
    customerId?: string;
    anonymousId?: string;
    currency?: string;
  }): Promise<Cart> {
    log.debug("Getting or creating cart", options);

    if (USE_MOCKS) {
      return this.getMockCart(options.cartId);
    }

    // If we have a cart ID, try to get it
    if (options.cartId) {
      try {
        return await commercetools.getCartById(options.cartId);
      } catch {
        // Cart not found, create new one
      }
    }

    // Try to get cart by customer ID
    if (options.customerId) {
      const existingCart = await commercetools.getCartByCustomerId(options.customerId);
      if (existingCart) {
        return existingCart;
      }
    }

    // Create new cart
    return commercetools.createCart({
      customerId: options.customerId,
      anonymousId: options.anonymousId,
      currency: options.currency,
    });
  }

  /**
   * Get cart by ID
   */
  async getCartById(cartId: string): Promise<Cart> {
    log.debug("Fetching cart by ID", { cartId });

    if (USE_MOCKS) {
      return this.getMockCart(cartId);
    }

    return commercetools.getCartById(cartId);
  }

  /**
   * Add item to cart with inventory validation
   */
  async addToCart(cartId: string, input: AddToCartInput): Promise<Cart> {
    log.debug("Adding item to cart", { cartId, input });

    if (USE_MOCKS) {
      return this.getMockCart(cartId, [
        {
          productId: input.productId,
          quantity: input.quantity,
        },
      ]);
    }

    // Validate inventory availability
    // Note: In production, this would call an inventory service
    // For backlog requirement: "Validate Onhand Inventory in Add to Cart"
    const isAvailable = await this.checkInventory(input.productId, input.quantity);
    if (!isAvailable) {
      throw new InsufficientInventoryError(input.productId, input.quantity, 0);
    }

    return commercetools.addToCart(cartId, input);
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(cartId: string, input: UpdateCartItemInput): Promise<Cart> {
    log.debug("Updating cart item", { cartId, input });

    if (USE_MOCKS) {
      return this.getMockCart(cartId);
    }

    // Validate inventory for quantity increase
    if (input.quantity > 0) {
      const cart = await commercetools.getCartById(cartId);
      const lineItem = cart.lineItems.find((item) => item.id === input.lineItemId);

      if (lineItem && input.quantity > lineItem.quantity) {
        const additionalQty = input.quantity - lineItem.quantity;
        const isAvailable = await this.checkInventory(lineItem.productId, additionalQty);
        if (!isAvailable) {
          throw new InsufficientInventoryError(
            lineItem.productId,
            additionalQty,
            0
          );
        }
      }
    }

    return commercetools.updateCartItem(cartId, input);
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
    log.debug("Removing item from cart", { cartId, lineItemId });

    if (USE_MOCKS) {
      return this.getMockCart(cartId);
    }

    return commercetools.removeFromCart(cartId, lineItemId);
  }

  /**
   * Apply discount code
   */
  async applyDiscountCode(cartId: string, code: string): Promise<Cart> {
    log.debug("Applying discount code", { cartId, code });

    if (USE_MOCKS) {
      return this.getMockCart(cartId);
    }

    return commercetools.applyDiscountCode(cartId, code);
  }

  /**
   * Remove discount code
   */
  async removeDiscountCode(cartId: string, discountCodeId: string): Promise<Cart> {
    log.debug("Removing discount code", { cartId, discountCodeId });

    if (USE_MOCKS) {
      return this.getMockCart(cartId);
    }

    return commercetools.removeDiscountCode(cartId, discountCodeId);
  }

  /**
   * Clear cart
   */
  async clearCart(cartId: string): Promise<Cart> {
    log.debug("Clearing cart", { cartId });

    if (USE_MOCKS) {
      return this.getMockCart(cartId, []);
    }

    return commercetools.clearCart(cartId);
  }

  /**
   * Get available shipping methods
   */
  async getShippingMethods(cartId: string): Promise<ShippingMethod[]> {
    log.debug("Fetching shipping methods", { cartId });

    if (USE_MOCKS) {
      return this.getMockShippingMethods();
    }

    // In production, this would fetch from Commercetools or delivery service
    return this.getMockShippingMethods();
  }

  /**
   * Check inventory availability
   * Note: Replace with actual inventory service call
   */
  private async checkInventory(productId: string, quantity: number): Promise<boolean> {
    log.debug("Checking inventory", { productId, quantity });

    // Placeholder - in production, call inventory API
    // For backlog: "Validate Onhand Inventory in Add to Cart"
    return true;
  }

  // ============================================
  // Mock implementations
  // ============================================

  private getMockCart(
    cartId?: string,
    items?: { productId: string; quantity: number }[]
  ): Cart {
    const lineItems =
      items && items.length > 0
        ? items.map((item, index) => ({
            id: `line-${index + 1}`,
            productId: item.productId,
            variantId: "1",
            sku: `SKU-${item.productId}`,
            name: `Product ${index + 1}`,
            slug: `product-${index + 1}`,
            image: {
              id: "img-1",
              url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
              alt: "Product",
              isDefault: true,
            },
            quantity: item.quantity,
            unitPrice: {
              amount: 2999,
              currency: "USD",
              formatted: "$29.99",
            },
            totalPrice: {
              amount: 2999 * item.quantity,
              currency: "USD",
              formatted: `$${((2999 * item.quantity) / 100).toFixed(2)}`,
            },
            attributes: {} as Record<string, string>,
            availability: {
              isAvailable: true,
              maxQuantity: 100,
            },
          }))
        : [
            {
              id: "line-1",
              productId: "product-1",
              variantId: "1",
              sku: "SKU-12345",
              name: "Premium Wireless Headphones",
              slug: "premium-wireless-headphones",
              image: {
                id: "img-1",
                url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                alt: "Premium Wireless Headphones",
                isDefault: true,
              },
              quantity: 1,
              unitPrice: {
                amount: 29999,
                currency: "USD",
                formatted: "$299.99",
              },
              totalPrice: {
                amount: 29999,
                currency: "USD",
                formatted: "$299.99",
              },
              attributes: { color: "Black" },
              availability: {
                isAvailable: true,
                maxQuantity: 50,
              },
            },
            {
              id: "line-2",
              productId: "product-2",
              variantId: "1",
              sku: "SKU-67890",
              name: "Wireless Charging Pad",
              slug: "wireless-charging-pad",
              image: {
                id: "img-2",
                url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
                alt: "Wireless Charging Pad",
                isDefault: true,
              },
              quantity: 2,
              unitPrice: {
                amount: 3999,
                currency: "USD",
                formatted: "$39.99",
              },
              totalPrice: {
                amount: 7998,
                currency: "USD",
                formatted: "$79.98",
              },
              attributes: {} as Record<string, string>,
              availability: {
                isAvailable: true,
                maxQuantity: 100,
              },
            },
          ];

    const subtotal = lineItems.reduce((sum, item) => sum + item.totalPrice.amount, 0);
    const shipping = 999;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;

    return {
      id: cartId || "mock-cart-1",
      customerId: "mock-customer-1",
      lineItems,
      discounts: [],
      shippingInfo: {
        methodId: "standard",
        methodName: "Standard Shipping",
        price: {
          amount: shipping,
          currency: "USD",
          formatted: "$9.99",
        },
        estimatedDelivery: "5-7 business days",
      },
      totals: {
        subtotal: {
          amount: subtotal,
          currency: "USD",
          formatted: `$${(subtotal / 100).toFixed(2)}`,
        },
        shipping: {
          amount: shipping,
          currency: "USD",
          formatted: "$9.99",
        },
        tax: {
          amount: tax,
          currency: "USD",
          formatted: `$${(tax / 100).toFixed(2)}`,
        },
        total: {
          amount: total,
          currency: "USD",
          formatted: `$${(total / 100).toFixed(2)}`,
        },
      },
      itemCount: lineItems.reduce((sum, item) => sum + item.quantity, 0),
      currency: "USD",
      locale: "en-US",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: new Date().toISOString(),
    };
  }

  private getMockShippingMethods(): ShippingMethod[] {
    return [
      {
        id: "standard",
        name: "Standard Shipping",
        description: "Delivered in 5-7 business days",
        price: {
          amount: 999,
          currency: "USD",
          formatted: "$9.99",
        },
        estimatedDelivery: "5-7 business days",
        isDefault: true,
      },
      {
        id: "express",
        name: "Express Shipping",
        description: "Delivered in 2-3 business days",
        price: {
          amount: 1999,
          currency: "USD",
          formatted: "$19.99",
        },
        estimatedDelivery: "2-3 business days",
        isDefault: false,
      },
      {
        id: "overnight",
        name: "Overnight Shipping",
        description: "Delivered next business day",
        price: {
          amount: 3999,
          currency: "USD",
          formatted: "$39.99",
        },
        estimatedDelivery: "Next business day",
        isDefault: false,
      },
    ];
  }
}

// Export singleton instance
let cartServiceInstance: CartService | null = null;

export function getCartService(): CartService {
  if (!cartServiceInstance) {
    cartServiceInstance = new CartService();
  }
  return cartServiceInstance;
}
