/**
 * Invoice Detail API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInvoiceService } from "@/services/invoice.service";
import type { EInvoiceCountry } from "@/types/invoice";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") as EInvoiceCountry;

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Country is required" },
        },
        { status: 400 }
      );
    }

    const invoiceService = getInvoiceService();
    const invoice = await invoiceService.getInvoice(country, id);

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch invoice" },
      },
      { status: 500 }
    );
  }
}
