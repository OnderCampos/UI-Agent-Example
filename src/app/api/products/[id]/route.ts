/**
 * Product Detail API Route
 * GET /api/products/[id] - Get product by ID or slug
 */

import { NextRequest, NextResponse } from "next/server";
import { getProductService } from "@/services";
import { isAppError, toAppError, NotFoundError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productService = getProductService();

    // Try by ID first, then by slug
    let product;
    try {
      product = await productService.getProductById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        // Try by slug
        product = await productService.getProductBySlug(id);
      } else {
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    const appError = isAppError(error) ? error : toAppError(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: appError.code,
          message: appError.message,
        },
      },
      { status: appError.statusCode }
    );
  }
}
