/**
 * Categories API Route
 * GET /api/categories - List categories
 */

import { NextRequest, NextResponse } from "next/server";
import { getProductService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const parentId = searchParams.get("parentId");

    const productService = getProductService();
    const categories = await productService.getCategories({
      parentId: parentId || undefined,
    });

    return NextResponse.json({
      success: true,
      data: categories,
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
