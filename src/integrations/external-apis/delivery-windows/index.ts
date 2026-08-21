/**
 * Delivery Windows API Adapter
 * Handles delivery scheduling and window selection
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError } from "@/lib/errors";

/**
 * Delivery Windows API configuration
 */
export type DeliveryWindowsConfig = ExternalApiConfig;

/**
 * Delivery window
 */
export interface DeliveryWindow {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  label: string;
  available: boolean;
  capacity: number;
  remaining: number;
  price: number;
  currency: string;
  type: "standard" | "express" | "scheduled";
}

/**
 * Delivery window booking
 */
export interface DeliveryBooking {
  id: string;
  windowId: string;
  orderId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "cancelled";
  confirmationCode: string;
}

/**
 * Gets configuration from environment variables
 */
export function getDeliveryWindowsConfig(): DeliveryWindowsConfig {
  return {
    baseUrl: process.env.DELIVERY_WINDOWS_API_URL || "",
    apiKey: process.env.DELIVERY_WINDOWS_API_KEY,
  };
}

/**
 * Delivery Windows API adapter
 */
export class DeliveryWindowsAdapter extends ExternalApiAdapter<DeliveryWindowsConfig> {
  constructor(config?: DeliveryWindowsConfig) {
    super("DeliveryWindows", config || getDeliveryWindowsConfig());
  }

  /**
   * Get available delivery windows for a location
   */
  async getAvailableWindows(options: {
    postalCode: string;
    startDate?: string;
    endDate?: string;
    types?: ("standard" | "express" | "scheduled")[];
  }): Promise<DeliveryWindow[]> {
    const { postalCode, startDate, endDate, types } = options;

    this.log.debug("Fetching available delivery windows", { postalCode });

    try {
      const params: Record<string, string | undefined> = {
        postalCode,
        startDate,
        endDate,
      };

      if (types && types.length > 0) {
        params.types = types.join(",");
      }

      const response = await this.client.get<{ windows: DeliveryWindow[] }>(
        "/windows",
        { params }
      );

      return response.data.windows;
    } catch (error) {
      throw new ExternalServiceError(
        "DeliveryWindows",
        "Failed to fetch delivery windows",
        error
      );
    }
  }

  /**
   * Book a delivery window
   */
  async bookWindow(data: {
    windowId: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    notes?: string;
  }): Promise<DeliveryBooking> {
    this.log.debug("Booking delivery window", {
      windowId: data.windowId,
      orderId: data.orderId,
    });

    try {
      const response = await this.client.post<DeliveryBooking>(
        "/bookings",
        data
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "DeliveryWindows",
        "Failed to book delivery window",
        error
      );
    }
  }

  /**
   * Cancel a delivery booking
   */
  async cancelBooking(bookingId: string): Promise<{ success: boolean }> {
    this.log.debug("Cancelling delivery booking", { bookingId });

    try {
      const response = await this.client.delete<{ success: boolean }>(
        `/bookings/${bookingId}`
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "DeliveryWindows",
        "Failed to cancel booking",
        error
      );
    }
  }

  /**
   * Get booking by order ID
   */
  async getBookingByOrderId(orderId: string): Promise<DeliveryBooking | null> {
    this.log.debug("Fetching booking by order ID", { orderId });

    try {
      const response = await this.client.get<DeliveryBooking>(
        `/bookings/order/${orderId}`
      );

      return response.data;
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) {
        return null;
      }
      throw new ExternalServiceError(
        "DeliveryWindows",
        "Failed to fetch booking",
        error
      );
    }
  }
}

// Export singleton instance
let instance: DeliveryWindowsAdapter | null = null;

export function getDeliveryWindowsAdapter(): DeliveryWindowsAdapter {
  if (!instance) {
    instance = new DeliveryWindowsAdapter();
  }
  return instance;
}
