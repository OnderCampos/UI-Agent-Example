/**
 * Tax ID Validation API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { getInvoiceService } from "@/services/invoice.service";
import type { EInvoiceCountry } from "@/types/invoice";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { country, taxId, taxIdType } = body;

    if (!country || !taxId || !taxIdType) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Missing required fields" },
        },
        { status: 400 }
      );
    }

    const invoiceService = getInvoiceService();
    const result = await invoiceService.validateTaxId(
      country as EInvoiceCountry,
      taxId,
      taxIdType
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to validate tax ID:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to validate tax ID" },
      },
      { status: 500 }
    );
  }
}
