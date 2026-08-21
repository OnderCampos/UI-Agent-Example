/**
 * Base E-Invoice Country Adapter
 * Abstract class for country-specific implementations
 */

import { ExternalServiceError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import type { EInvoiceCountry, EInvoice, TaxIdValidation } from "@/types/invoice";
import type {
  CountryEInvoiceConfig,
  InvoiceSubmissionRequest,
  InvoiceSubmissionResponse,
  TaxIdValidationRequest,
  DocumentDownloadResponse,
  InvoiceCancellationRequest,
} from "../types";

/**
 * Abstract base class for country-specific e-invoice adapters
 */
export abstract class BaseEInvoiceAdapter {
  protected config: CountryEInvoiceConfig;
  protected log: ReturnType<typeof logger.child>;
  protected abstract countryCode: EInvoiceCountry;
  protected abstract countryName: string;

  constructor(config: CountryEInvoiceConfig) {
    this.config = config;
    this.log = logger.child(`EInvoice:${config.country}`);
  }

  /**
   * Validate tax ID format and optionally verify with tax authority
   */
  abstract validateTaxId(request: TaxIdValidationRequest): Promise<TaxIdValidation>;

  /**
   * Submit invoice to tax authority
   */
  abstract submitInvoice(request: InvoiceSubmissionRequest): Promise<InvoiceSubmissionResponse>;

  /**
   * Get invoice status from tax authority
   */
  abstract getInvoiceStatus(invoiceId: string): Promise<EInvoice>;

  /**
   * Cancel/void an invoice
   */
  abstract cancelInvoice(request: InvoiceCancellationRequest): Promise<{ success: boolean; message: string }>;

  /**
   * Download invoice XML
   */
  abstract downloadXml(invoiceId: string): Promise<DocumentDownloadResponse>;

  /**
   * Download invoice PDF
   */
  abstract downloadPdf(invoiceId: string): Promise<DocumentDownloadResponse>;

  /**
   * Validate tax ID format using regex
   */
  protected validateTaxIdFormat(taxId: string, pattern: string): boolean {
    const regex = new RegExp(pattern);
    return regex.test(taxId.toUpperCase());
  }

  /**
   * Generate invoice number in country-specific format
   */
  protected generateInvoiceNumber(prefix: string = ""): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${year}${month}-${random}`;
  }

  /**
   * Handle API errors
   */
  protected handleError(message: string, error: unknown): never {
    const err = error instanceof Error ? error : new Error(String(error));
    this.log.error(message, err, { rawError: error });
    throw new ExternalServiceError(
      `EInvoice:${this.countryCode}`,
      message,
      error
    );
  }

  /**
   * Check if in sandbox/test mode
   */
  protected isSandbox(): boolean {
    return this.config.sandbox || process.env.NODE_ENV !== "production";
  }
}
