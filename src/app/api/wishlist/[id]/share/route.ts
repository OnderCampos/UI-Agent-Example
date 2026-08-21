/**
 * Share Wishlist API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistService } from "@/services/wishlist.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
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
    const userId = "mock-user-id";
    const wishlistService = getWishlistService();

    const result = await wishlistService.shareWishlist(userId, id);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Failed to share wishlist:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to share wishlist" },
      },
      { status: 500 }
    );
  }
}
