/**
 * Move Wishlist Item to Cart API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistService } from "@/services/wishlist.service";

interface RouteParams {
  params: Promise<{ id: string; itemId: string }>;
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
    const { id, itemId } = await params;
    const userId = "mock-user-id";
    const wishlistService = getWishlistService();

    await wishlistService.moveToCart(userId, id, itemId);

    return NextResponse.json({
      success: true,
      data: { movedToCart: true },
    });
  } catch (error) {
    console.error("Failed to move to cart:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to move to cart" },
      },
      { status: 500 }
    );
  }
}
