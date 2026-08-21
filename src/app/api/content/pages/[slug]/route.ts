/**
 * Content Page API Route
 * GET /api/content/pages/[slug] - Get page by slug
 */

import { NextRequest, NextResponse } from "next/server";
import { getContentService } from "@/services";
import { isAppError, toAppError } from "@/lib/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const preview = searchParams.get("preview") === "true";

    const contentService = getContentService();
    const page = await contentService.getPageBySlug(slug, { preview });

    return NextResponse.json({
      success: true,
      data: page,
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
