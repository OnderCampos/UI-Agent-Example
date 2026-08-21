/**
 * E-Invoice Types
 * Types for electronic invoicing (LATAM)
 */

/**
 * Supported countries for e-invoicing
 */
export type EInvoiceCountry = "MX" | "CR" | "PA" | "CO" | "CL" | "PE";

/**
 * Invoice document types
 */
export type EInvoiceType = 
  | "factura"         // Standard invoice
  | "boleta"          // Consumer receipt (Chile, Peru)
  | "nota_credito"    // Credit note
  | "nota_debito";    // Debit note

/**
 * Invoice status
 */
export type EInvoiceStatus = 
  | "draft"           // Not yet submitted
  | "pending"         // Submitted, awaiting validation
  | "submitted"       // Submitted to tax authority
  | "accepted"        // Accepted by tax authority
  | "rejected"        // Rejected by tax authority
  | "cancelled";      // Cancelled/voided

/**
 * E-Invoice entity
 */
export interface EInvoice {
  id: string;
  orderId: string;
  type: EInvoiceType;
  country: EInvoiceCountry;
  status: EInvoiceStatus;
  
  // Tax identification
  customerTaxId: string;
  customerTaxIdType: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: InvoiceAddress;
  
  // Invoice details
  invoiceNumber?: string;
  fiscalFolio?: string;        // Mexico: UUID
  authorizationCode?: string;  // Tax authority code
  series?: string;
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
  items: EInvoiceItem[];
  
  // Tax breakdown
  taxBreakdown?: TaxBreakdown[];
  
  // Documents
  xmlUrl?: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
  
  // Timestamps
  issueDate: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  acceptedAt?: string;
}

/**
 * Invoice line item
 */
export interface EInvoiceItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  unitCode?: string;       // SAT unit code (Mexico)
  productCode?: string;    // SAT product code (Mexico)
}

/**
 * Tax breakdown by rate
 */
export interface TaxBreakdown {
  taxType: string;    // IVA, ISR, etc.
  rate: number;
  base: number;
  amount: number;
}

/**
 * Invoice address
 */
export interface InvoiceAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  neighborhood?: string;  // Colonia (Mexico)
}

/**
 * Tax ID validation result
 */
export interface TaxIdValidation {
  valid: boolean;
  taxId: string;
  taxIdType: string;
  name?: string;
  status?: string;
  message?: string;
}

/**
 * Invoice request data
 */
export interface CreateInvoiceRequest {
  orderId: string;
  country: EInvoiceCountry;
  type?: EInvoiceType;
  customerTaxId: string;
  customerTaxIdType: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: InvoiceAddress;
  usoCfdi?: string;          // Mexico: Use of CFDI
  regimenFiscal?: string;    // Mexico: Tax regime
  metodoPago?: string;       // Mexico: Payment method
  formaPago?: string;        // Mexico: Payment form
}

/**
 * Country-specific tax ID types
 */
export const TAX_ID_TYPES: Record<EInvoiceCountry, { code: string; name: string; pattern: string }[]> = {
  MX: [
    { code: "RFC", name: "Registro Federal de Contribuyentes", pattern: "^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$" },
  ],
  CR: [
    { code: "CEDULA", name: "Cedula de Identidad", pattern: "^[0-9]{9}$" },
    { code: "JURIDICA", name: "Cedula Juridica", pattern: "^[0-9]{10}$" },
    { code: "DIMEX", name: "DIMEX", pattern: "^[0-9]{11,12}$" },
  ],
  PA: [
    { code: "RUC", name: "Registro Unico de Contribuyente", pattern: "^[0-9]+-[0-9]+-[0-9]+$" },
    { code: "CEDULA", name: "Cedula", pattern: "^[0-9]+-[0-9]+-[0-9]+$" },
  ],
  CO: [
    { code: "NIT", name: "Numero de Identificacion Tributaria", pattern: "^[0-9]{9,10}$" },
    { code: "CC", name: "Cedula de Ciudadania", pattern: "^[0-9]{6,10}$" },
  ],
  CL: [
    { code: "RUT", name: "Rol Unico Tributario", pattern: "^[0-9]{7,8}-[0-9Kk]$" },
  ],
  PE: [
    { code: "RUC", name: "Registro Unico de Contribuyentes", pattern: "^[0-9]{11}$" },
    { code: "DNI", name: "Documento Nacional de Identidad", pattern: "^[0-9]{8}$" },
  ],
};

/**
 * Country configurations
 */
export const INVOICE_COUNTRY_CONFIG: Record<EInvoiceCountry, {
  name: string;
  taxAuthority: string;
  taxRate: number;
  currency: string;
  requiresAddress: boolean;
}> = {
  MX: {
    name: "Mexico",
    taxAuthority: "SAT",
    taxRate: 0.16,
    currency: "MXN",
    requiresAddress: true,
  },
  CR: {
    name: "Costa Rica",
    taxAuthority: "Ministerio de Hacienda",
    taxRate: 0.13,
    currency: "CRC",
    requiresAddress: true,
  },
  PA: {
    name: "Panama",
    taxAuthority: "DGI",
    taxRate: 0.07,
    currency: "PAB",
    requiresAddress: false,
  },
  CO: {
    name: "Colombia",
    taxAuthority: "DIAN",
    taxRate: 0.19,
    currency: "COP",
    requiresAddress: true,
  },
  CL: {
    name: "Chile",
    taxAuthority: "SII",
    taxRate: 0.19,
    currency: "CLP",
    requiresAddress: true,
  },
  PE: {
    name: "Peru",
    taxAuthority: "SUNAT",
    taxRate: 0.18,
    currency: "PEN",
    requiresAddress: true,
  },
};
