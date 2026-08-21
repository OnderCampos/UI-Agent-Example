/**
 * Invoice Service
 * Orchestrates e-invoice operations
 */

import { getEInvoiceService } from "@/integrations/external-apis/einvoice";
import { logger } from "@/lib/logger";
import { USE_MOCKS } from "@/lib/constants";
import type {
  EInvoice,
  EInvoiceCountry,
  TaxIdValidation,
  CreateInvoiceRequest,
} from "@/types/invoice";

const log = logger.child("InvoiceService");

// Mock invoices for development
const mockInvoices: Map<string, EInvoice> = new Map();

/**
 * Invoice service class
 */
export class InvoiceService {
  private eInvoiceService = getEInvoiceService();

  /**
   * Validate a tax ID
   */
  async validateTaxId(
    country: EInvoiceCountry,
    taxId: string,
    taxIdType: string
  ): Promise<TaxIdValidation> {
    log.debug("Validating tax ID", { country, taxId, taxIdType });

    return this.eInvoiceService.validateTaxId(country, taxId, taxIdType);
  }

  /**
   * Create an invoice for an order
   */
  async createInvoice(
    request: CreateInvoiceRequest,
    orderItems: Array<{
      productId: string;
      name: string;
      quantity: number;
      unitPrice: number;
      taxRate: number;
    }>,
    orderTotals: {
      subtotal: number;
      tax: number;
      total: number;
      currency: string;
    }
  ): Promise<EInvoice> {
    log.debug("Creating invoice", { orderId: request.orderId, country: request.country });

    // Convert order items to invoice items
    const items = orderItems.map((item) => ({
      productId: item.productId,
      description: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxRate: item.taxRate,
    }));

    const totals = {
      subtotal: orderTotals.subtotal,
      taxAmount: orderTotals.tax,
      total: orderTotals.total,
      currency: orderTotals.currency,
    };

    if (USE_MOCKS) {
      // Create mock invoice
      const mockInvoice: EInvoice = {
        id: `INV-${Date.now()}`,
        orderId: request.orderId,
        type: request.type || "factura",
        country: request.country,
        status: "accepted",
        customerTaxId: request.customerTaxId,
        customerTaxIdType: request.customerTaxIdType,
        customerName: request.customerName,
        customerEmail: request.customerEmail,
        customerAddress: request.customerAddress,
        invoiceNumber: `F${Date.now().toString(36).toUpperCase()}`,
        fiscalFolio: `${request.country}-${Date.now()}`,
        subtotal: totals.subtotal,
        taxAmount: totals.taxAmount,
        total: totals.total,
        currency: totals.currency,
        items: items.map((item, index) => ({
          id: `item-${index}`,
          ...item,
          taxAmount: item.unitPrice * item.quantity * item.taxRate,
          total: item.unitPrice * item.quantity * (1 + item.taxRate),
        })),
        xmlUrl: `/api/invoices/mock/invoice.xml`,
        pdfUrl: `/api/invoices/mock/invoice.pdf`,
        issueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        acceptedAt: new Date().toISOString(),
      };

      mockInvoices.set(mockInvoice.id, mockInvoice);
      return mockInvoice;
    }

    const result = await this.eInvoiceService.createInvoice(request, items, totals);

    if (!result.success) {
      throw new Error(result.error || "Failed to create invoice");
    }

    // Fetch the created invoice
    return this.getInvoice(request.country, result.invoiceId);
  }

  /**
   * Get invoice by ID
   */
  async getInvoice(country: EInvoiceCountry, invoiceId: string): Promise<EInvoice> {
    log.debug("Fetching invoice", { country, invoiceId });

    if (USE_MOCKS) {
      const invoice = mockInvoices.get(invoiceId);
      if (!invoice) {
        throw new Error(`Invoice ${invoiceId} not found`);
      }
      return invoice;
    }

    return this.eInvoiceService.getInvoiceStatus(country, invoiceId);
  }

  /**
   * Get invoices for a customer
   */
  async getCustomerInvoices(
    customerId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<{ invoices: EInvoice[]; total: number }> {
    log.debug("Fetching customer invoices", { customerId });

    if (USE_MOCKS) {
      const invoices = Array.from(mockInvoices.values());
      return {
        invoices: invoices.slice(options?.offset || 0, (options?.offset || 0) + (options?.limit || 20)),
        total: invoices.length,
      };
    }

    // In production, fetch from database
    return { invoices: [], total: 0 };
  }

  /**
   * Get invoices for an order
   */
  async getOrderInvoices(orderId: string): Promise<EInvoice[]> {
    log.debug("Fetching order invoices", { orderId });

    if (USE_MOCKS) {
      return Array.from(mockInvoices.values()).filter((inv) => inv.orderId === orderId);
    }

    // In production, fetch from database
    return [];
  }

  /**
   * Download invoice XML
   */
  async downloadXml(
    country: EInvoiceCountry,
    invoiceId: string
  ): Promise<{ content: Buffer | string; filename: string }> {
    log.debug("Downloading invoice XML", { country, invoiceId });

    const result = await this.eInvoiceService.downloadXml(country, invoiceId);
    return {
      content: result.content,
      filename: result.filename,
    };
  }

  /**
   * Download invoice PDF
   */
  async downloadPdf(
    country: EInvoiceCountry,
    invoiceId: string
  ): Promise<{ content: Buffer | string; filename: string }> {
    log.debug("Downloading invoice PDF", { country, invoiceId });

    const result = await this.eInvoiceService.downloadPdf(country, invoiceId);
    return {
      content: result.content,
      filename: result.filename,
    };
  }

  /**
   * Cancel an invoice
   */
  async cancelInvoice(
    country: EInvoiceCountry,
    invoiceId: string,
    reason: string
  ): Promise<{ success: boolean; message: string }> {
    log.debug("Cancelling invoice", { country, invoiceId, reason });

    if (USE_MOCKS) {
      const invoice = mockInvoices.get(invoiceId);
      if (invoice) {
        invoice.status = "cancelled";
        invoice.updatedAt = new Date().toISOString();
      }
      return { success: true, message: "Invoice cancelled (mock)" };
    }

    return this.eInvoiceService.cancelInvoice(country, invoiceId, reason);
  }
}

// Export singleton instance
let invoiceServiceInstance: InvoiceService | null = null;

export function getInvoiceService(): InvoiceService {
  if (!invoiceServiceInstance) {
    invoiceServiceInstance = new InvoiceService();
  }
  return invoiceServiceInstance;
}
