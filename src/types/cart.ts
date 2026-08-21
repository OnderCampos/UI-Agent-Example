/**
 * Cart-related types
 */

import type { Price, ProductImage } from "./product";

/**
 * Cart line item
 */
export interface CartLineItem {
  id: string;
  productId: string;
  variantId?: string;
  sku: string;
  name: string;
  slug: string;
  image: ProductImage | null;
  quantity: number;
  unitPrice: Price;
  totalPrice: Price;
  discountedPrice?: Price;
  attributes: Record<string, string>;
  availability: {
    isAvailable: boolean;
    maxQuantity?: number;
  };
}

/**
 * Cart discount
 */
export interface CartDiscount {
  id: string;
  code?: string;
  name: string;
  description?: string;
  type: "percentage" | "fixed" | "shipping";
  value: number;
  discountedAmount: Price;
}

/**
 * Cart shipping info
 */
export interface CartShippingInfo {
  methodId: string;
  methodName: string;
  price: Price;
  estimatedDelivery?: string;
}

/**
 * Cart totals breakdown
 */
export interface CartTotals {
  subtotal: Price;
  shipping?: Price;
  tax?: Price;
  discount?: Price;
  total: Price;
}

/**
 * Full cart entity
 */
export interface Cart {
  id: string;
  customerId?: string;
  anonymousId?: string;
  lineItems: CartLineItem[];
  discounts: CartDiscount[];
  shippingInfo?: CartShippingInfo;
  totals: CartTotals;
  itemCount: number;
  currency: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Add to cart input
 */
export interface AddToCartInput {
  productId: string;
  variantId?: string;
  quantity: number;
}

/**
 * Update cart item input
 */
export interface UpdateCartItemInput {
  lineItemId: string;
  quantity: number;
}

/**
 * Apply discount input
 */
export interface ApplyDiscountInput {
  code: string;
}

/**
 * Set shipping method input
 */
export interface SetShippingMethodInput {
  methodId: string;
}

/**
 * Shipping method option
 */
export interface ShippingMethod {
  id: string;
  name: string;
  description?: string;
  price: Price;
  estimatedDelivery: string;
  isDefault: boolean;
}

/**
 * Available shipping methods response
 */
export interface AvailableShippingMethods {
  methods: ShippingMethod[];
  selectedMethodId?: string;
}
