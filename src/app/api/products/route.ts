/**
 * Products API Route
 * GET /api/products - List/search products
 */

import { NextRequest, NextResponse } from "next/server";
import { getProductService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const sortBy = searchParams.get("sortBy") as "name" | "price" | "createdAt" | null;
    const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc";

    const productService = getProductService();

    if (categoryId) {
      const result = await productService.getProductsByCategory(categoryId, {
        page,
        limit,
        sortBy: sortBy || undefined,
        sortOrder,
      });

      return NextResponse.json({
        success: true,
        data: result.products,
        pagination: {
          page: result.page,
          limit,
          total: result.total,
          totalPages: result.totalPages,
          hasNextPage: result.page < result.totalPages,
          hasPreviousPage: result.page > 1,
        },
      });
    }

    // Default: return all products
    const result = await productService.getProductsByCategory("", {
      page,
      limit,
      sortBy: sortBy || undefined,
      sortOrder,
    });

    return NextResponse.json({
      success: true,
      data: result.products,
      pagination: {
        page: result.page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNextPage: result.page < result.totalPages,
        hasPreviousPage: result.page > 1,
      },
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
