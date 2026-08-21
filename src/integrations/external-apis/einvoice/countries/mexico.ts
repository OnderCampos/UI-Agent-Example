/**
 * Mexico E-Invoice Adapter
 * CFDI (Comprobante Fiscal Digital por Internet) via SAT
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
 * Mexico-specific configuration
 */
export interface MexicoEInvoiceConfig extends CountryEInvoiceConfig {
  pacProvider: string;  // PAC (Proveedor Autorizado de Certificacion)
  rfcEmisor: string;    // RFC of the issuing company
  certificado: string;  // Digital certificate
  llavePrivada: string; // Private key
}

/**
 * CFDI Use codes (Uso CFDI)
 */
export const CFDI_USES = {
  G01: "Adquisicion de mercancias",
  G02: "Devoluciones, descuentos o bonificaciones",
  G03: "Gastos en general",
  I01: "Construcciones",
  I02: "Mobiliario y equipo de oficina",
  I03: "Equipo de transporte",
  I04: "Equipo de computo y accesorios",
  I05: "Dados, troqueles, moldes, matrices y herramental",
  I06: "Comunicaciones telefonicas",
  I07: "Comunicaciones satelitales",
  I08: "Otra maquinaria y equipo",
  D01: "Honorarios medicos, dentales y gastos hospitalarios",
  D02: "Gastos medicos por incapacidad o discapacidad",
  D03: "Gastos funerales",
  D04: "Donativos",
  D05: "Intereses reales efectivamente pagados por creditos hipotecarios",
  D06: "Aportaciones voluntarias al SAR",
  D07: "Primas por seguros de gastos medicos",
  D08: "Gastos de transportacion escolar obligatoria",
  D09: "Depositos en cuentas para el ahorro",
  D10: "Pagos por servicios educativos",
  P01: "Por definir",
  S01: "Sin efectos fiscales",
  CP01: "Pagos",
  CN01: "Nomina",
};

/**
 * Tax Regime codes (Regimen Fiscal)
 */
export const TAX_REGIMES = {
  601: "General de Ley Personas Morales",
  603: "Personas Morales con Fines no Lucrativos",
  605: "Sueldos y Salarios e Ingresos Asimilados a Salarios",
  606: "Arrendamiento",
  607: "Regimen de Enajenacion o Adquisicion de Bienes",
  608: "Demas ingresos",
  610: "Residentes en el Extranjero sin Establecimiento Permanente en Mexico",
  611: "Ingresos por Dividendos (socios y accionistas)",
  612: "Personas Fisicas con Actividades Empresariales y Profesionales",
  614: "Ingresos por intereses",
  615: "Regimen de los ingresos por obtencion de premios",
  616: "Sin obligaciones fiscales",
  620: "Sociedades Cooperativas de Produccion",
  621: "Incorporacion Fiscal",
  622: "Actividades Agricolas, Ganaderas, Silvicolas y Pesqueras",
  623: "Opcional para Grupos de Sociedades",
  624: "Coordinados",
  625: "Regimen de las Actividades Empresariales con ingresos a traves de Plataformas Tecnologicas",
  626: "Regimen Simplificado de Confianza",
};

export class MexicoEInvoiceAdapter extends BaseEInvoiceAdapter {
  protected countryCode: EInvoiceCountry = "MX";
  protected countryName = "Mexico";
  private mexicoConfig: MexicoEInvoiceConfig;

  constructor(config: MexicoEInvoiceConfig) {
    super(config);
    this.mexicoConfig = config;
  }

  async validateTaxId(request: TaxIdValidationRequest): Promise<TaxIdValidation> {
    this.log.debug("Validating RFC", { taxId: request.taxId });

    // RFC format: 4 letters for companies, 3 for individuals + 6 digit date + 3 homoclave
    const rfcPattern = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
    const isValidFormat = rfcPattern.test(request.taxId.toUpperCase());

    if (!isValidFormat) {
      return {
        valid: false,
        taxId: request.taxId,
        taxIdType: "RFC",
        message: "Invalid RFC format",
      };
    }

    // In production, validate against SAT's RFC list
    if (this.isSandbox()) {
      return {
        valid: true,
        taxId: request.taxId.toUpperCase(),
        taxIdType: "RFC",
        status: "active",
      };
    }

    // TODO: Implement actual SAT validation
    return {
      valid: true,
      taxId: request.taxId.toUpperCase(),
      taxIdType: "RFC",
      status: "active",
    };
  }

  async submitInvoice(request: InvoiceSubmissionRequest): Promise<InvoiceSubmissionResponse> {
    this.log.debug("Submitting CFDI", { orderId: request.orderId });

    if (this.isSandbox()) {
      // Mock response for development
      const invoiceNumber = this.generateInvoiceNumber("F");
      const uuid = this.generateUUID();

      return {
        success: true,
        invoiceId: `MX-${Date.now()}`,
        status: "accepted",
        invoiceNumber,
        fiscalFolio: uuid,
        authorizationCode: `SAT-${Date.now()}`,
        xmlUrl: `/api/invoices/mock/${uuid}.xml`,
        pdfUrl: `/api/invoices/mock/${uuid}.pdf`,
        qrCodeUrl: `/api/invoices/mock/${uuid}.png`,
      };
    }

    // TODO: Implement actual PAC integration
    // 1. Build CFDI XML
    // 2. Sign with certificate
    // 3. Send to PAC for timbrado
    // 4. Return stamped CFDI

    return {
      success: false,
      invoiceId: "",
      status: "rejected",
      error: "Production e-invoice not implemented",
    };
  }

  async getInvoiceStatus(invoiceId: string): Promise<EInvoice> {
    this.log.debug("Getting CFDI status", { invoiceId });

    // TODO: Implement status check
    throw new Error("Not implemented");
  }

  async cancelInvoice(request: InvoiceCancellationRequest): Promise<{ success: boolean; message: string }> {
    this.log.debug("Cancelling CFDI", { invoiceId: request.invoiceId });

    if (this.isSandbox()) {
      return {
        success: true,
        message: "Invoice cancelled successfully (sandbox)",
      };
    }

    // TODO: Implement actual cancellation via PAC
    return {
      success: false,
      message: "Production cancellation not implemented",
    };
  }

  async downloadXml(invoiceId: string): Promise<DocumentDownloadResponse> {
    this.log.debug("Downloading CFDI XML", { invoiceId });

    // Mock XML for development
    const mockXml = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" Version="4.0">
  <cfdi:Emisor Rfc="${this.mexicoConfig.rfcEmisor}" Nombre="PriceSmart" RegimenFiscal="601"/>
  <!-- Invoice content -->
</cfdi:Comprobante>`;

    return {
      content: mockXml,
      contentType: "application/xml",
      filename: `${invoiceId}.xml`,
    };
  }

  async downloadPdf(invoiceId: string): Promise<DocumentDownloadResponse> {
    this.log.debug("Downloading CFDI PDF", { invoiceId });

    // TODO: Generate PDF representation of CFDI
    return {
      content: Buffer.from("PDF content"),
      contentType: "application/pdf",
      filename: `${invoiceId}.pdf`,
    };
  }

  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16).toUpperCase();
    });
  }
}
