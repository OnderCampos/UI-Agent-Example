/**
 * Banners API Route
 * GET /api/content/banners - Get active banners
 */

import { NextRequest, NextResponse } from "next/server";
import { getContentService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const preview = searchParams.get("preview") === "true";

    const contentService = getContentService();
    const banners = await contentService.getActiveBanners({ preview });

    return NextResponse.json({
      success: true,
      data: banners,
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
