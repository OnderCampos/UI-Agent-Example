/**
 * Search Suggestions API Route
 * GET /api/search/suggestions - Get autocomplete suggestions
 */

import { NextRequest, NextResponse } from "next/server";
import { getSearchService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const searchService = getSearchService();
    const suggestions = await searchService.getSuggestions(query, { limit });

    return NextResponse.json({
      success: true,
      data: suggestions,
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
