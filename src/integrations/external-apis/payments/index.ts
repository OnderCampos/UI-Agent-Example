/**
 * Payments API Adapter
 * Handles payment processing
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError, PaymentError } from "@/lib/errors";

/**
 * Payments API configuration
 */
export interface PaymentsConfig extends ExternalApiConfig {
  webhookSecret?: string;
}

/**
 * Payment method
 */
export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank_transfer" | "wallet";
  lastFour?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault: boolean;
}

/**
 * Payment intent
 */
export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: "requires_payment_method" | "requires_confirmation" | "processing" | "succeeded" | "failed" | "cancelled";
  paymentMethodId?: string;
  metadata?: Record<string, string>;
  createdAt: string;
}

/**
 * Payment result
 */
export interface PaymentResult {
  id: string;
  status: "succeeded" | "failed" | "pending" | "requires_action";
  amount: number;
  currency: string;
  paymentMethodId?: string;
  errorCode?: string;
  errorMessage?: string;
  receiptUrl?: string;
  metadata?: Record<string, string>;
}

/**
 * Refund result
 */
export interface RefundResult {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed";
  reason?: string;
  createdAt: string;
}

/**
 * Gets configuration from environment variables
 */
export function getPaymentsConfig(): PaymentsConfig {
  return {
    baseUrl: process.env.PAYMENTS_API_URL || "",
    apiKey: process.env.PAYMENTS_API_KEY,
    webhookSecret: process.env.PAYMENTS_WEBHOOK_SECRET,
  };
}

/**
 * Payments API adapter
 */
export class PaymentsAdapter extends ExternalApiAdapter<PaymentsConfig> {
  constructor(config?: PaymentsConfig) {
    super("Payments", config || getPaymentsConfig());
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(data: {
    amount: number;
    currency: string;
    customerId?: string;
    orderId?: string;
    metadata?: Record<string, string>;
  }): Promise<PaymentIntent> {
    this.log.debug("Creating payment intent", {
      amount: data.amount,
      currency: data.currency,
    });

    try {
      const response = await this.client.post<PaymentIntent>(
        "/payment-intents",
        data
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Payments",
        "Failed to create payment intent",
        error
      );
    }
  }

  /**
   * Confirm a payment intent
   */
  async confirmPaymentIntent(
    intentId: string,
    data: {
      paymentMethodId: string;
      returnUrl?: string;
    }
  ): Promise<PaymentResult> {
    this.log.debug("Confirming payment intent", { intentId });

    try {
      const response = await this.client.post<PaymentResult>(
        `/payment-intents/${intentId}/confirm`,
        data
      );

      if (response.data.status === "failed") {
        throw new PaymentError(
          response.data.errorMessage || "Payment failed",
          response.data.errorCode
        );
      }

      return response.data;
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new ExternalServiceError(
        "Payments",
        "Failed to confirm payment",
        error
      );
    }
  }

  /**
   * Cancel a payment intent
   */
  async cancelPaymentIntent(intentId: string): Promise<PaymentIntent> {
    this.log.debug("Cancelling payment intent", { intentId });

    try {
      const response = await this.client.post<PaymentIntent>(
        `/payment-intents/${intentId}/cancel`
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Payments",
        "Failed to cancel payment",
        error
      );
    }
  }

  /**
   * Create a refund
   */
  async createRefund(data: {
    paymentId: string;
    amount?: number;
    reason?: string;
    metadata?: Record<string, string>;
  }): Promise<RefundResult> {
    this.log.debug("Creating refund", {
      paymentId: data.paymentId,
      amount: data.amount,
    });

    try {
      const response = await this.client.post<RefundResult>("/refunds", data);

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Payments",
        "Failed to create refund",
        error
      );
    }
  }

  /**
   * Get customer payment methods
   */
  async getPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    this.log.debug("Fetching payment methods", { customerId });

    try {
      const response = await this.client.get<{ methods: PaymentMethod[] }>(
        `/customers/${customerId}/payment-methods`
      );

      return response.data.methods;
    } catch (error) {
      throw new ExternalServiceError(
        "Payments",
        "Failed to fetch payment methods",
        error
      );
    }
  }

  /**
   * Add a payment method for a customer
   */
  async addPaymentMethod(
    customerId: string,
    data: {
      type: PaymentMethod["type"];
      token: string;
      isDefault?: boolean;
    }
  ): Promise<PaymentMethod> {
    this.log.debug("Adding payment method", { customerId, type: data.type });

    try {
      const response = await this.client.post<PaymentMethod>(
        `/customers/${customerId}/payment-methods`,
        data
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Payments",
        "Failed to add payment method",
        error
      );
    }
  }

  /**
   * Delete a payment method
   */
  async deletePaymentMethod(
    customerId: string,
    paymentMethodId: string
  ): Promise<{ success: boolean }> {
    this.log.debug("Deleting payment method", { customerId, paymentMethodId });

    try {
      const response = await this.client.delete<{ success: boolean }>(
        `/customers/${customerId}/payment-methods/${paymentMethodId}`
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Payments",
        "Failed to delete payment method",
        error
      );
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    payload: string,
    signature: string
  ): boolean {
    if (!this.config.webhookSecret) {
      this.log.warn("Webhook secret not configured");
      return false;
    }

    // In production, implement proper signature verification
    // This is a placeholder for the actual implementation
    // Example using crypto:
    // const expectedSignature = crypto
    //   .createHmac('sha256', this.config.webhookSecret)
    //   .update(payload)
    //   .digest('hex');
    // return crypto.timingSafeEqual(
    //   Buffer.from(signature),
    //   Buffer.from(expectedSignature)
    // );

    this.log.debug("Webhook signature verification placeholder");
    return true;
  }
}

// Export singleton instance
let instance: PaymentsAdapter | null = null;

export function getPaymentsAdapter(): PaymentsAdapter {
  if (!instance) {
    instance = new PaymentsAdapter();
  }
  return instance;
}
