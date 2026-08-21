/**
 * Checkout Service
 * Orchestrates checkout flow across multiple services
 */

import * as commercetools from "@/integrations/commercetools";
import { getOmsWrapperAdapter } from "@/integrations/external-apis/oms-wrapper";
import { getTaxAdapter } from "@/integrations/external-apis/tax";
import { getPaymentsAdapter } from "@/integrations/external-apis/payments";
import { getDeliveryWindowsAdapter } from "@/integrations/external-apis/delivery-windows";
import type { Order, CreateOrderInput } from "@/types/order";
import type { Cart } from "@/types/cart";
import type { Address } from "@/lib/validation";
import type {
  PaymentIntent,
  PaymentResult,
  DeliveryWindow,
} from "@/integrations/external-apis";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";

const log = logger.child("CheckoutService");

/**
 * Checkout session data
 */
export interface CheckoutSession {
  cartId: string;
  step: "shipping" | "payment" | "review" | "complete";
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethodId?: string;
  deliveryWindowId?: string;
  paymentIntentId?: string;
  taxCalculation?: {
    totalTax: number;
    breakdown: { jurisdiction: string; rate: number; amount: number }[];
  };
}

/**
 * Checkout service class
 */
export class CheckoutService {
  private omsAdapter = getOmsWrapperAdapter();
  private taxAdapter = getTaxAdapter();
  private paymentsAdapter = getPaymentsAdapter();
  private deliveryAdapter = getDeliveryWindowsAdapter();

  /**
   * Initialize checkout session
   */
  async initializeCheckout(cartId: string): Promise<CheckoutSession> {
    log.debug("Initializing checkout", { cartId });

    return {
      cartId,
      step: "shipping",
    };
  }

  /**
   * Set shipping address and calculate tax
   */
  async setShippingAddress(
    session: CheckoutSession,
    address: Address
  ): Promise<CheckoutSession & { taxCalculation: CheckoutSession["taxCalculation"] }> {
    log.debug("Setting shipping address", { cartId: session.cartId });

    if (USE_MOCKS) {
      return {
        ...session,
        shippingAddress: address,
        step: "payment",
        taxCalculation: {
          totalTax: 3200,
          breakdown: [
            { jurisdiction: "State", rate: 0.0625, amount: 2500 },
            { jurisdiction: "Local", rate: 0.0175, amount: 700 },
          ],
        },
      };
    }

    // Get cart to calculate tax
    const cart = await commercetools.getCartById(session.cartId);

    // Calculate tax
    const taxResult = await this.taxAdapter.calculateTax({
      orderId: session.cartId,
      lineItems: cart.lineItems.map((item) => ({
        id: item.id,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice.amount / 100,
      })),
      shippingAmount: cart.shippingInfo?.price.amount
        ? cart.shippingInfo.price.amount / 100
        : 0,
      fromAddress: {
        state: "CA",
        postalCode: "94105",
        country: "US",
      },
      toAddress: {
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        city: address.city,
      },
      currencyCode: cart.currency,
    });

    return {
      ...session,
      shippingAddress: address,
      step: "payment",
      taxCalculation: {
        totalTax: Math.round(taxResult.totalTax * 100),
        breakdown: taxResult.summary.map((s) => ({
          jurisdiction: s.jurisdiction,
          rate: s.rate,
          amount: Math.round(s.amount * 100),
        })),
      },
    };
  }

  /**
   * Get available delivery windows
   */
  async getDeliveryWindows(
    postalCode: string,
    options: { startDate?: string; endDate?: string } = {}
  ): Promise<DeliveryWindow[]> {
    log.debug("Fetching delivery windows", { postalCode });

    if (USE_MOCKS) {
      return this.getMockDeliveryWindows();
    }

    return this.deliveryAdapter.getAvailableWindows({
      postalCode,
      ...options,
    });
  }

  /**
   * Create payment intent
   */
  async createPaymentIntent(
    session: CheckoutSession,
    cart: Cart
  ): Promise<PaymentIntent> {
    log.debug("Creating payment intent", { cartId: session.cartId });

    if (USE_MOCKS) {
      return this.getMockPaymentIntent(cart);
    }

    return this.paymentsAdapter.createPaymentIntent({
      amount: cart.totals.total.amount,
      currency: cart.currency,
      orderId: session.cartId,
      metadata: {
        cartId: session.cartId,
      },
    });
  }

  /**
   * Process payment
   */
  async processPayment(
    session: CheckoutSession,
    paymentMethodId: string
  ): Promise<PaymentResult> {
    log.debug("Processing payment", {
      cartId: session.cartId,
      intentId: session.paymentIntentId,
    });

    if (USE_MOCKS) {
      return this.getMockPaymentResult();
    }

    if (!session.paymentIntentId) {
      throw new Error("Payment intent not initialized");
    }

    return this.paymentsAdapter.confirmPaymentIntent(session.paymentIntentId, {
      paymentMethodId,
    });
  }

  /**
   * Complete checkout and create order
   */
  async completeCheckout(
    session: CheckoutSession,
    input: Omit<CreateOrderInput, "cartId">
  ): Promise<Order> {
    log.debug("Completing checkout", { cartId: session.cartId });

    if (USE_MOCKS) {
      return this.getMockOrder(session);
    }

    // Create order in Commercetools
    const order = await commercetools.createOrderFromCart({
      cartId: session.cartId,
      ...input,
    });

    // Submit order to OMS
    // Per backlog: Order creation is "performed by Commercetools" but needs OMS sync
    const cart = await commercetools.getCartById(session.cartId);

    await this.omsAdapter.submitOrder({
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      email: order.email,
      items: cart.lineItems.map((item) => ({
        sku: item.sku,
        quantity: item.quantity,
        price: item.unitPrice.amount / 100,
        name: item.name,
      })),
      shippingAddress: {
        firstName: input.shippingAddress.firstName,
        lastName: input.shippingAddress.lastName,
        street: input.shippingAddress.streetAddress,
        city: input.shippingAddress.city,
        state: input.shippingAddress.state,
        postalCode: input.shippingAddress.postalCode,
        country: input.shippingAddress.country,
        phone: input.shippingAddress.phone,
      },
      shippingMethod: input.shippingMethodId,
      paymentMethod: input.paymentMethodId,
      totals: {
        subtotal: cart.totals.subtotal.amount / 100,
        shipping: (cart.totals.shipping?.amount || 0) / 100,
        tax: (cart.totals.tax?.amount || 0) / 100,
        discount: (cart.totals.discount?.amount || 0) / 100,
        total: cart.totals.total.amount / 100,
      },
    });

    return order;
  }

  // ============================================
  // Mock implementations
  // ============================================

  private getMockDeliveryWindows(): DeliveryWindow[] {
    const today = new Date();
    const windows: DeliveryWindow[] = [];

    for (let i = 2; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      windows.push({
        id: `window-${i}-am`,
        date: date.toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "12:00",
        label: "Morning (9 AM - 12 PM)",
        available: true,
        capacity: 20,
        remaining: 15 - (i % 5),
        price: 0,
        currency: "USD",
        type: "scheduled",
      });

      windows.push({
        id: `window-${i}-pm`,
        date: date.toISOString().split("T")[0],
        startTime: "14:00",
        endTime: "18:00",
        label: "Afternoon (2 PM - 6 PM)",
        available: true,
        capacity: 20,
        remaining: 18 - (i % 7),
        price: 0,
        currency: "USD",
        type: "scheduled",
      });
    }

    return windows;
  }

  private getMockPaymentIntent(cart: Cart): PaymentIntent {
    return {
      id: "pi_mock_" + Date.now(),
      clientSecret: "pi_mock_secret_" + Date.now(),
      amount: cart.totals.total.amount,
      currency: cart.currency,
      status: "requires_payment_method",
      createdAt: new Date().toISOString(),
    };
  }

  private getMockPaymentResult(): PaymentResult {
    return {
      id: "pay_mock_" + Date.now(),
      status: "succeeded",
      amount: 41997,
      currency: "USD",
      paymentMethodId: "pm_mock_card",
      receiptUrl: "https://example.com/receipt",
    };
  }

  private getMockOrder(session: CheckoutSession): Order {
    return {
      id: "order-mock-" + Date.now(),
      orderNumber: "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      customerId: "mock-customer-1",
      email: "john.doe@example.com",
      status: "confirmed",
      lineItems: [
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
            alt: "Headphones",
            isDefault: true,
          },
          quantity: 1,
          unitPrice: { amount: 29999, currency: "USD", formatted: "$299.99" },
          totalPrice: { amount: 29999, currency: "USD", formatted: "$299.99" },
          attributes: {},
        },
      ],
      shipping: {
        method: "Standard Shipping",
        methodId: "standard",
        price: { amount: 999, currency: "USD", formatted: "$9.99" },
        address: session.shippingAddress || {
          firstName: "John",
          lastName: "Doe",
          streetAddress: "123 Main St",
          city: "San Francisco",
          state: "CA",
          postalCode: "94105",
          country: "US",
        },
        estimatedDelivery: "5-7 business days",
      },
      billingAddress: session.billingAddress || session.shippingAddress || {
        firstName: "John",
        lastName: "Doe",
        streetAddress: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94105",
        country: "US",
      },
      payment: {
        id: "pay-1",
        method: "card",
        status: "captured",
        amount: { amount: 33198, currency: "USD", formatted: "$331.98" },
        lastFourDigits: "4242",
        brand: "visa",
      },
      discounts: [],
      totals: {
        subtotal: { amount: 29999, currency: "USD", formatted: "$299.99" },
        shipping: { amount: 999, currency: "USD", formatted: "$9.99" },
        tax: { amount: 2200, currency: "USD", formatted: "$22.00" },
        total: { amount: 33198, currency: "USD", formatted: "$331.98" },
      },
      statusHistory: [
        { status: "pending", timestamp: new Date().toISOString() },
        { status: "confirmed", timestamp: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

// Export singleton instance
let checkoutServiceInstance: CheckoutService | null = null;

export function getCheckoutService(): CheckoutService {
  if (!checkoutServiceInstance) {
    checkoutServiceInstance = new CheckoutService();
  }
  return checkoutServiceInstance;
}
