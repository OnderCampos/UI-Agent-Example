/**
 * E-Invoice API Types
 */

import type { EInvoiceCountry, EInvoiceType, EInvoiceStatus } from "@/types/invoice";

/**
 * E-Invoice API configuration
 */
export interface EInvoiceApiConfig {
  baseUrl: string;
  apiKey?: string;
  certificatePath?: string;
  privateKeyPath?: string;
  sandbox?: boolean;
}

/**
 * Country-specific configuration
 */
export interface CountryEInvoiceConfig extends EInvoiceApiConfig {
  country: EInvoiceCountry;
  taxAuthorityUrl?: string;
  pacUrl?: string;  // Mexico: PAC provider URL
}

/**
 * Generic invoice submission request
 */
export interface InvoiceSubmissionRequest {
  orderId: string;
  type: EInvoiceType;
  customerData: CustomerInvoiceData;
  items: InvoiceItemData[];
  totals: InvoiceTotals;
  metadata?: Record<string, unknown>;
}

/**
 * Customer data for invoice
 */
export interface CustomerInvoiceData {
  taxId: string;
  taxIdType: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    neighborhood?: string;
  };
  // Country-specific fields
  regimenFiscal?: string;  // Mexico
  usoCfdi?: string;        // Mexico
}

/**
 * Invoice item data
 */
export interface InvoiceItemData {
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  // Country-specific fields
  unitCode?: string;    // SAT unit code
  productCode?: string; // SAT product/service code
}

/**
 * Invoice totals
 */
export interface InvoiceTotals {
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
  taxBreakdown?: {
    taxType: string;
    rate: number;
    base: number;
    amount: number;
  }[];
}

/**
 * Invoice submission response
 */
export interface InvoiceSubmissionResponse {
  success: boolean;
  invoiceId: string;
  status: EInvoiceStatus;
  invoiceNumber?: string;
  fiscalFolio?: string;
  authorizationCode?: string;
  xmlUrl?: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
  error?: string;
  validationErrors?: string[];
}

/**
 * Tax ID validation request
 */
export interface TaxIdValidationRequest {
  taxId: string;
  taxIdType: string;
  country: EInvoiceCountry;
}

/**
 * Tax ID validation response
 */
export interface TaxIdValidationResponse {
  valid: boolean;
  taxId: string;
  taxIdType: string;
  name?: string;
  status?: string;
  message?: string;
}

/**
 * Invoice cancellation request
 */
export interface InvoiceCancellationRequest {
  invoiceId: string;
  reason: string;
  relatedInvoiceId?: string;  // For substitution
}

/**
 * Document download response
 */
export interface DocumentDownloadResponse {
  content: Buffer | string;
  contentType: string;
  filename: string;
}
