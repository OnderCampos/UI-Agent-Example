/**
 * Invoices API Route
 * List and create invoices
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInvoiceService } from "@/services/invoice.service";
import type { EInvoiceCountry } from "@/types/invoice";

export async function GET(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
      },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") as EInvoiceCountry | null;
    const orderId = searchParams.get("orderId");

    const invoiceService = getInvoiceService();

    if (orderId) {
      const invoices = await invoiceService.getOrderInvoices(orderId);
      return NextResponse.json({
        success: true,
        data: { invoices },
      });
    }

    // Get customer invoices (would use actual customer ID from token)
    const result = await invoiceService.getCustomerInvoices("mock-customer-id");

    // Filter by country if specified
    let invoices = result.invoices;
    if (country) {
      invoices = invoices.filter((inv) => inv.country === country);
    }

    return NextResponse.json({
      success: true,
      data: {
        invoices,
        total: invoices.length,
      },
    });
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch invoices" },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      orderId,
      country,
      customerTaxId,
      customerTaxIdType,
      customerName,
      customerEmail,
      customerAddress,
      usoCfdi,
      regimenFiscal,
      // Order details would typically come from order service
      items,
      totals,
    } = body;

    if (!orderId || !country || !customerTaxId || !customerName || !customerEmail) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Missing required fields" },
        },
        { status: 400 }
      );
    }

    const invoiceService = getInvoiceService();

    // In production, fetch order details from order service
    const orderItems = items || [
      {
        productId: "prod-1",
        name: "Sample Product",
        quantity: 1,
        unitPrice: 100,
        taxRate: 0.13,
      },
    ];

    const orderTotals = totals || {
      subtotal: 100,
      tax: 13,
      total: 113,
      currency: "USD",
    };

    const invoice = await invoiceService.createInvoice(
      {
        orderId,
        country,
        customerTaxId,
        customerTaxIdType,
        customerName,
        customerEmail,
        customerAddress,
        usoCfdi,
        regimenFiscal,
      },
      orderItems,
      orderTotals
    );

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Failed to create invoice:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to create invoice" },
      },
      { status: 500 }
    );
  }
}
