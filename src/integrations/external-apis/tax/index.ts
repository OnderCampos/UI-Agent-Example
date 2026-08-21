/**
 * Tax API Adapter
 * Handles tax calculation for orders
 */

import { ExternalApiAdapter, type ExternalApiConfig } from "../base";
import { ExternalServiceError } from "@/lib/errors";

/**
 * Tax API configuration
 */
export type TaxConfig = ExternalApiConfig;

/**
 * Tax line item
 */
export interface TaxLineItem {
  id: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxCode?: string;
}

/**
 * Tax calculation request
 */
export interface TaxCalculationRequest {
  orderId?: string;
  customerId?: string;
  lineItems: TaxLineItem[];
  shippingAmount: number;
  discountAmount?: number;
  fromAddress: {
    street?: string;
    city?: string;
    state: string;
    postalCode: string;
    country: string;
  };
  toAddress: {
    street?: string;
    city?: string;
    state: string;
    postalCode: string;
    country: string;
  };
  currencyCode: string;
  date?: string;
}

/**
 * Tax calculation result
 */
export interface TaxCalculationResult {
  orderId?: string;
  totalTax: number;
  totalTaxableAmount: number;
  currency: string;
  lines: {
    lineItemId: string;
    taxableAmount: number;
    taxAmount: number;
    taxRate: number;
    details: {
      jurisdiction: string;
      jurisdictionType: "state" | "county" | "city" | "special";
      rate: number;
      amount: number;
    }[];
  }[];
  shippingTax?: number;
  summary: {
    jurisdiction: string;
    rate: number;
    amount: number;
  }[];
}

/**
 * Tax exemption
 */
export interface TaxExemption {
  id: string;
  customerId: string;
  exemptionType: string;
  exemptionNumber: string;
  validFrom: string;
  validTo: string;
  regions: string[];
}

/**
 * Gets configuration from environment variables
 */
export function getTaxConfig(): TaxConfig {
  return {
    baseUrl: process.env.TAX_API_URL || "",
    apiKey: process.env.TAX_API_KEY,
  };
}

/**
 * Tax API adapter
 */
export class TaxAdapter extends ExternalApiAdapter<TaxConfig> {
  constructor(config?: TaxConfig) {
    super("Tax", config || getTaxConfig());
  }

  /**
   * Calculate tax for an order
   */
  async calculateTax(request: TaxCalculationRequest): Promise<TaxCalculationResult> {
    this.log.debug("Calculating tax", {
      orderId: request.orderId,
      itemCount: request.lineItems.length,
    });

    try {
      const response = await this.client.post<TaxCalculationResult>(
        "/tax/calculate",
        request
      );

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Tax",
        "Failed to calculate tax",
        error
      );
    }
  }

  /**
   * Validate a tax exemption certificate
   */
  async validateExemption(
    customerId: string,
    exemptionNumber: string
  ): Promise<{
    valid: boolean;
    exemption?: TaxExemption;
    reason?: string;
  }> {
    this.log.debug("Validating tax exemption", { customerId, exemptionNumber });

    try {
      const response = await this.client.post<{
        valid: boolean;
        exemption?: TaxExemption;
        reason?: string;
      }>("/exemptions/validate", {
        customerId,
        exemptionNumber,
      });

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Tax",
        "Failed to validate exemption",
        error
      );
    }
  }

  /**
   * Get tax rate for a location
   */
  async getTaxRate(address: {
    state: string;
    postalCode: string;
    country: string;
    city?: string;
  }): Promise<{
    combinedRate: number;
    rates: {
      jurisdiction: string;
      jurisdictionType: string;
      rate: number;
    }[];
  }> {
    this.log.debug("Getting tax rate", { postalCode: address.postalCode });

    try {
      const response = await this.client.get<{
        combinedRate: number;
        rates: {
          jurisdiction: string;
          jurisdictionType: string;
          rate: number;
        }[];
      }>("/tax/rates", {
        params: {
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          city: address.city,
        },
      });

      return response.data;
    } catch (error) {
      throw new ExternalServiceError(
        "Tax",
        "Failed to get tax rate",
        error
      );
    }
  }
}

// Export singleton instance
let instance: TaxAdapter | null = null;

export function getTaxAdapter(): TaxAdapter {
  if (!instance) {
    instance = new TaxAdapter();
  }
  return instance;
}
