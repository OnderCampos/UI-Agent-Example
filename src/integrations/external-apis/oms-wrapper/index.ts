/**
 * OMS Wrapper API Adapter
 * Handles order management system operations
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError, NotFoundError } from "@/lib/errors";
import type { OrderStatus } from "@/types/order";

/**
 * OMS API configuration
 */
export type OmsConfig = ExternalApiConfig;

/**
 * OMS Order submission request
 */
export interface OmsOrderSubmission {
  orderId: string;
  orderNumber: string;
  customerId: string;
  email: string;
  items: {
    sku: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
  };
}

/**
 * OMS Order status response
 */
export interface OmsOrderStatus {
  orderId: string;
  omsOrderId: string;
  status: string;
  fulfillmentStatus?: string;
  shipments: {
    id: string;
    carrier: string;
    trackingNumber: string;
    trackingUrl?: string;
    status: string;
    items: { sku: string; quantity: number }[];
    shippedAt?: string;
    deliveredAt?: string;
  }[];
  estimatedDelivery?: string;
  lastUpdated: string;
}

/**
 * Gets configuration from environment variables
 */
export function getOmsConfig(): OmsConfig {
  return {
    baseUrl: process.env.OMS_WRAPPER_API_URL || "",
    apiKey: process.env.OMS_WRAPPER_API_KEY,
  };
}

/**
 * OMS Wrapper API adapter
 */
export class OmsWrapperAdapter extends ExternalApiAdapter<OmsConfig> {
  constructor(config?: OmsConfig) {
    super("OMS", config || getOmsConfig());
  }

  /**
   * Maps OMS status to application OrderStatus
   */
  private toOrderStatus(omsStatus: string): OrderStatus {
    const statusMap: Record<string, OrderStatus> = {
      received: "pending",
      processing: "processing",
      confirmed: "confirmed",
      shipped: "shipped",
      delivered: "delivered",
      cancelled: "cancelled",
      refunded: "refunded",
    };

    return statusMap[omsStatus.toLowerCase()] || "pending";
  }

  /**
   * Submit order to OMS
   */
  async submitOrder(order: OmsOrderSubmission): Promise<{
    omsOrderId: string;
    status: string;
    estimatedProcessingTime: number;
  }> {
    this.log.debug("Submitting order to OMS", { orderId: order.orderId });

    try {
      const response = await this.client.post<{
        omsOrderId: string;
        status: string;
        estimatedProcessingTime: number;
      }>("/orders", order);

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "OMS",
        "Failed to submit order",
        error
      );
    }
  }

  /**
   * Get order status from OMS
   */
  async getOrderStatus(orderId: string): Promise<OmsOrderStatus> {
    this.log.debug("Fetching order status from OMS", { orderId });

    try {
      const response = await this.client.get<OmsOrderStatus>(
        `/orders/${orderId}/status`
      );

      return response.data;
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) {
        throw new NotFoundError("Order", `Order ${orderId} not found in OMS`);
      }
      throw new ExternalServiceError(
        "OMS",
        "Failed to fetch order status",
        error
      );
    }
  }

  /**
   * Cancel order in OMS
   */
  async cancelOrder(
    orderId: string,
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    this.log.debug("Cancelling order in OMS", { orderId });

    try {
      const response = await this.client.post<{
        success: boolean;
        message: string;
      }>(`/orders/${orderId}/cancel`, { reason });

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "OMS",
        "Failed to cancel order",
        error
      );
    }
  }

  /**
   * Sync order status (poll for updates)
   */
  async syncOrderStatus(orderId: string): Promise<{
    status: OrderStatus;
    shipments: OmsOrderStatus["shipments"];
    changed: boolean;
  }> {
    this.log.debug("Syncing order status", { orderId });

    try {
      const omsStatus = await this.getOrderStatus(orderId);

      return {
        status: this.toOrderStatus(omsStatus.status),
        shipments: omsStatus.shipments,
        changed: true, // Caller should compare with previous state
      };
    } catch (error) {
      throw new ExternalServiceError(
        "OMS",
        "Failed to sync order status",
        error
      );
    }
  }
}

// Export singleton instance
let instance: OmsWrapperAdapter | null = null;

export function getOmsWrapperAdapter(): OmsWrapperAdapter {
  if (!instance) {
    instance = new OmsWrapperAdapter();
  }
  return instance;
}
