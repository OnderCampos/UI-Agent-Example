/**
 * Check Wishlist API Route
 * Check if a product is in the user's wishlist
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistService } from "@/services/wishlist.service";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({
      success: true,
      data: { inWishlist: false },
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Product ID is required" },
        },
        { status: 400 }
      );
    }

    const userId = "mock-user-id";
    const wishlistService = getWishlistService();
    const inWishlist = await wishlistService.isInWishlist(userId, productId);

    return NextResponse.json({
      success: true,
      data: { inWishlist },
    });
  } catch (error) {
    console.error("Failed to check wishlist:", error);
    return NextResponse.json({
      success: true,
      data: { inWishlist: false },
    });
  }
}
