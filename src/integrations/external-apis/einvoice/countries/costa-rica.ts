/**
 * Costa Rica E-Invoice Adapter
 * Factura Electronica via Ministerio de Hacienda
 */

import { BaseEInvoiceAdapter } from "./base";
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
 * Costa Rica-specific configuration
 */
export interface CostaRicaEInvoiceConfig extends CountryEInvoiceConfig {
  username: string;
  password: string;
  pin: string;
  cryptoPath: string;
}

/**
 * Costa Rica document types
 */
export const CR_DOCUMENT_TYPES = {
  "01": "Factura Electronica",
  "02": "Nota de Debito Electronica",
  "03": "Nota de Credito Electronica",
  "04": "Tiquete Electronico",
  "08": "Factura Electronica de Compra",
  "09": "Factura Electronica de Exportacion",
};

/**
 * Costa Rica ID types
 */
export const CR_ID_TYPES = {
  "01": "Cedula Fisica",
  "02": "Cedula Juridica",
  "03": "DIMEX",
  "04": "NITE",
};

export class CostaRicaEInvoiceAdapter extends BaseEInvoiceAdapter {
  protected countryCode: EInvoiceCountry = "CR";
  protected countryName = "Costa Rica";

  async validateTaxId(request: TaxIdValidationRequest): Promise<TaxIdValidation> {
    this.log.debug("Validating Costa Rica ID", { taxId: request.taxId });

    let isValid = false;
    const cleanId = request.taxId.replace(/[-\s]/g, "");

    switch (request.taxIdType) {
      case "CEDULA":
        // Cedula fisica: 9 digits
        isValid = /^[0-9]{9}$/.test(cleanId);
        break;
      case "JURIDICA":
        // Cedula juridica: 10 digits
        isValid = /^[0-9]{10}$/.test(cleanId);
        break;
      case "DIMEX":
        // DIMEX: 11-12 digits
        isValid = /^[0-9]{11,12}$/.test(cleanId);
        break;
      default:
        isValid = false;
    }

    return {
      valid: isValid,
      taxId: cleanId,
      taxIdType: request.taxIdType,
      message: isValid ? undefined : `Invalid ${request.taxIdType} format`,
    };
  }

  async submitInvoice(request: InvoiceSubmissionRequest): Promise<InvoiceSubmissionResponse> {
    this.log.debug("Submitting CR invoice", { orderId: request.orderId });

    if (this.isSandbox()) {
      const clave = this.generateClave();
      const consecutivo = this.generateConsecutivo();

      return {
        success: true,
        invoiceId: `CR-${Date.now()}`,
        status: "accepted",
        invoiceNumber: consecutivo,
        fiscalFolio: clave,
        authorizationCode: `MH-${Date.now()}`,
        xmlUrl: `/api/invoices/mock/${clave}.xml`,
        pdfUrl: `/api/invoices/mock/${clave}.pdf`,
      };
    }

    // TODO: Implement Hacienda API integration
    return {
      success: false,
      invoiceId: "",
      status: "rejected",
      error: "Production e-invoice not implemented",
    };
  }

  async getInvoiceStatus(invoiceId: string): Promise<EInvoice> {
    this.log.debug("Getting CR invoice status", { invoiceId });
    throw new Error("Not implemented");
  }

  async cancelInvoice(request: InvoiceCancellationRequest): Promise<{ success: boolean; message: string }> {
    this.log.debug("Cancelling CR invoice", { invoiceId: request.invoiceId });

    // In Costa Rica, invoices cannot be cancelled, only credit notes can be issued
    return {
      success: false,
      message: "Invoices cannot be cancelled in Costa Rica. Issue a credit note instead.",
    };
  }

  async downloadXml(invoiceId: string): Promise<DocumentDownloadResponse> {
    this.log.debug("Downloading CR XML", { invoiceId });

    const mockXml = `<?xml version="1.0" encoding="UTF-8"?>
<FacturaElectronica xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/facturaElectronica">
  <!-- Invoice content -->
</FacturaElectronica>`;

    return {
      content: mockXml,
      contentType: "application/xml",
      filename: `${invoiceId}.xml`,
    };
  }

  async downloadPdf(invoiceId: string): Promise<DocumentDownloadResponse> {
    this.log.debug("Downloading CR PDF", { invoiceId });

    return {
      content: Buffer.from("PDF content"),
      contentType: "application/pdf",
      filename: `${invoiceId}.pdf`,
    };
  }

  /**
   * Generate 50-digit clave numerica
   */
  private generateClave(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const random = Math.random().toString().slice(2, 10);
    
    // Simplified clave for mock
    return `506${day}${month}${year}${"0".repeat(20)}${random}${"0".repeat(8)}`;
  }

  /**
   * Generate consecutivo (20 digits)
   */
  private generateConsecutivo(): string {
    const sequence = Date.now().toString().slice(-10);
    return `00100001${sequence}01`;
  }
}
