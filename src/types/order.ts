/**
 * Order-related types
 */

import type { Price, ProductImage } from "./product";
import type { Address } from "@/lib/validation";

/**
 * Order status
 */
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

/**
 * Payment status
 */
export type PaymentStatus =
  | "pending"
  | "authorized"
  | "captured"
  | "failed"
  | "refunded";

/**
 * Order line item
 */
export interface OrderLineItem {
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
}

/**
 * Order shipping information
 */
export interface OrderShipping {
  method: string;
  methodId: string;
  price: Price;
  address: Address;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
}

/**
 * Order payment information
 */
export interface OrderPayment {
  id: string;
  method: string;
  status: PaymentStatus;
  amount: Price;
  paidAt?: string;
  lastFourDigits?: string;
  brand?: string;
}

/**
 * Order discount
 */
export interface OrderDiscount {
  id: string;
  code?: string;
  name: string;
  discountedAmount: Price;
}

/**
 * Order totals
 */
export interface OrderTotals {
  subtotal: Price;
  shipping: Price;
  tax: Price;
  discount?: Price;
  total: Price;
}

/**
 * Order status history entry
 */
export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

/**
 * Full order entity
 */
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  email: string;
  status: OrderStatus;
  lineItems: OrderLineItem[];
  shipping: OrderShipping;
  billingAddress: Address;
  payment: OrderPayment;
  discounts: OrderDiscount[];
  totals: OrderTotals;
  statusHistory: OrderStatusHistory[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Order list item (lighter version for listings)
 */
export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  itemCount: number;
  total: Price;
  createdAt: string;
  firstItemImage?: ProductImage;
}

/**
 * Create order input
 */
export interface CreateOrderInput {
  cartId: string;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethodId: string;
  paymentMethodId: string;
  paymentToken?: string;
  notes?: string;
}

/**
 * Order query parameters
 */
export interface OrderQuery {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
