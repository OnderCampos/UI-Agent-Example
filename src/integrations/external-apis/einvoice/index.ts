/**
 * E-Invoice Integration
 * Unified interface for country-specific e-invoice adapters
 */

import { logger } from "@/lib/logger";
import type { EInvoiceCountry, EInvoice, TaxIdValidation, CreateInvoiceRequest } from "@/types/invoice";
import type {
  InvoiceSubmissionRequest,
  InvoiceSubmissionResponse,
  DocumentDownloadResponse,
} from "./types";
import { BaseEInvoiceAdapter } from "./countries/base";
import { MexicoEInvoiceAdapter, type MexicoEInvoiceConfig } from "./countries/mexico";
import { CostaRicaEInvoiceAdapter, type CostaRicaEInvoiceConfig } from "./countries/costa-rica";

// Re-export types
export * from "./types";
export { BaseEInvoiceAdapter } from "./countries/base";
export { MexicoEInvoiceAdapter, CFDI_USES, TAX_REGIMES } from "./countries/mexico";
export { CostaRicaEInvoiceAdapter, CR_DOCUMENT_TYPES, CR_ID_TYPES } from "./countries/costa-rica";

const log = logger.child("EInvoice");

/**
 * E-Invoice adapter factory
 */
export class EInvoiceAdapterFactory {
  private static adapters: Map<EInvoiceCountry, BaseEInvoiceAdapter> = new Map();

  /**
   * Get adapter for a specific country
   */
  static getAdapter(country: EInvoiceCountry): BaseEInvoiceAdapter {
    let adapter = this.adapters.get(country);
    
    if (!adapter) {
      adapter = this.createAdapter(country);
      this.adapters.set(country, adapter);
    }
    
    return adapter;
  }

  /**
   * Create adapter based on country
   */
  private static createAdapter(country: EInvoiceCountry): BaseEInvoiceAdapter {
    const baseConfig = {
      baseUrl: process.env[`EINVOICE_${country}_URL`] || "",
      apiKey: process.env[`EINVOICE_${country}_API_KEY`],
      sandbox: process.env.NODE_ENV !== "production",
      country,
    };

    switch (country) {
      case "MX":
        return new MexicoEInvoiceAdapter({
          ...baseConfig,
          pacProvider: process.env.EINVOICE_MX_PAC || "",
          rfcEmisor: process.env.EINVOICE_MX_RFC || "",
          certificado: process.env.EINVOICE_MX_CERT || "",
          llavePrivada: process.env.EINVOICE_MX_KEY || "",
        } as MexicoEInvoiceConfig);

      case "CR":
        return new CostaRicaEInvoiceAdapter({
          ...baseConfig,
          username: process.env.EINVOICE_CR_USER || "",
          password: process.env.EINVOICE_CR_PASS || "",
          pin: process.env.EINVOICE_CR_PIN || "",
          cryptoPath: process.env.EINVOICE_CR_CRYPTO || "",
        } as CostaRicaEInvoiceConfig);

      case "PA":
      case "CO":
      case "CL":
      case "PE":
        // These would have their own implementations
        // For now, throw an error
        throw new Error(`E-invoice adapter for ${country} not yet implemented`);

      default:
        throw new Error(`Unknown country: ${country}`);
    }
  }
}

/**
 * Unified E-Invoice Service
 */
export class EInvoiceService {
  /**
   * Validate a tax ID
   */
  async validateTaxId(
    country: EInvoiceCountry,
    taxId: string,
    taxIdType: string
  ): Promise<TaxIdValidation> {
    log.debug("Validating tax ID", { country, taxId, taxIdType });
    
    const adapter = EInvoiceAdapterFactory.getAdapter(country);
    return adapter.validateTaxId({ country, taxId, taxIdType });
  }

  /**
   * Create and submit an invoice
   */
  async createInvoice(
    request: CreateInvoiceRequest,
    items: InvoiceSubmissionRequest["items"],
    totals: InvoiceSubmissionRequest["totals"]
  ): Promise<InvoiceSubmissionResponse> {
    log.debug("Creating invoice", { country: request.country, orderId: request.orderId });

    const adapter = EInvoiceAdapterFactory.getAdapter(request.country);
    
    return adapter.submitInvoice({
      orderId: request.orderId,
      type: request.type || "factura",
      customerData: {
        taxId: request.customerTaxId,
        taxIdType: request.customerTaxIdType,
        name: request.customerName,
        email: request.customerEmail,
        address: request.customerAddress,
        regimenFiscal: request.regimenFiscal,
        usoCfdi: request.usoCfdi,
      },
      items,
      totals,
    });
  }

  /**
   * Get invoice status
   */
  async getInvoiceStatus(country: EInvoiceCountry, invoiceId: string): Promise<EInvoice> {
    const adapter = EInvoiceAdapterFactory.getAdapter(country);
    return adapter.getInvoiceStatus(invoiceId);
  }

  /**
   * Cancel an invoice
   */
  async cancelInvoice(
    country: EInvoiceCountry,
    invoiceId: string,
    reason: string
  ): Promise<{ success: boolean; message: string }> {
    const adapter = EInvoiceAdapterFactory.getAdapter(country);
    return adapter.cancelInvoice({ invoiceId, reason });
  }

  /**
   * Download invoice XML
   */
  async downloadXml(country: EInvoiceCountry, invoiceId: string): Promise<DocumentDownloadResponse> {
    const adapter = EInvoiceAdapterFactory.getAdapter(country);
    return adapter.downloadXml(invoiceId);
  }

  /**
   * Download invoice PDF
   */
  async downloadPdf(country: EInvoiceCountry, invoiceId: string): Promise<DocumentDownloadResponse> {
    const adapter = EInvoiceAdapterFactory.getAdapter(country);
    return adapter.downloadPdf(invoiceId);
  }
}

// Export singleton instance
let eInvoiceServiceInstance: EInvoiceService | null = null;

export function getEInvoiceService(): EInvoiceService {
  if (!eInvoiceServiceInstance) {
    eInvoiceServiceInstance = new EInvoiceService();
  }
  return eInvoiceServiceInstance;
}
