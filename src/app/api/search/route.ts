/**
 * Search API Route
 * GET /api/search - Search products
 */

import { NextRequest, NextResponse } from "next/server";
import { getSearchService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "0", 10);
    const hitsPerPage = parseInt(searchParams.get("hitsPerPage") || "20", 10);
    const sortBy = searchParams.get("sortBy") as
      | "relevance"
      | "price_asc"
      | "price_desc"
      | "newest"
      | null;

    // Parse filters from query string
    const filters: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      if (
        key.startsWith("filter_") ||
        ["categories", "brand", "inStock"].includes(key)
      ) {
        const filterKey = key.replace("filter_", "");
        const existing = filters[filterKey];
        if (existing) {
          if (Array.isArray(existing)) {
            existing.push(value);
          } else {
            filters[filterKey] = [existing, value];
          }
        } else {
          filters[filterKey] = value;
        }
      }
    });

    const searchService = getSearchService();
    const results = await searchService.searchProducts(query, {
      page,
      hitsPerPage,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      sortBy: sortBy || undefined,
    });

    return NextResponse.json({
      success: true,
      data: results,
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
