/**
 * Invoice Download API Route
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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
    const type = searchParams.get("type") as "pdf" | "xml";
    const country = searchParams.get("country") as EInvoiceCountry;

    if (!type || !country) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Type and country are required" },
        },
        { status: 400 }
      );
    }

    const invoiceService = getInvoiceService();
    
    const result = type === "pdf"
      ? await invoiceService.downloadPdf(country, id)
      : await invoiceService.downloadXml(country, id);

    const contentType = type === "pdf" ? "application/pdf" : "application/xml";
    const content =
      typeof result.content === "string"
        ? result.content
        : result.content instanceof ArrayBuffer
          ? result.content
          : new Uint8Array(result.content);

    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${result.filename}"`,
      },
    });
  } catch (error) {
    console.error("Failed to download invoice:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to download invoice" },
      },
      { status: 500 }
    );
  }
}
