/**
 * Wishlist Items API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistService } from "@/services/wishlist.service";

export async function POST(request: NextRequest) {
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
    const body = await request.json();
    const { productId, wishlistId, note, priority } = body;

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
    
    const item = await wishlistService.addItem(userId, {
      productId,
      wishlistId,
      note,
      priority,
    });

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("Failed to add item:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to add item" },
      },
      { status: 500 }
    );
  }
}
