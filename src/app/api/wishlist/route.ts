/**
 * Wishlist API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistService } from "@/services/wishlist.service";

export async function GET(request: NextRequest) {
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
    // In production, extract user ID from token
    const userId = "mock-user-id";
    const wishlistService = getWishlistService();

    const wishlists = await wishlistService.getUserWishlists(userId);
    const defaultWishlist = await wishlistService.getDefaultWishlist(userId);

    return NextResponse.json({
      success: true,
      data: {
        wishlists,
        defaultWishlist,
      },
    });
  } catch (error) {
    console.error("Failed to fetch wishlists:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch wishlists" },
      },
      { status: 500 }
    );
  }
}

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
    const { name, isPublic } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Name is required" },
        },
        { status: 400 }
      );
    }

    const userId = "mock-user-id";
    const wishlistService = getWishlistService();
    const wishlist = await wishlistService.createWishlist(userId, { name, isPublic });

    return NextResponse.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error("Failed to create wishlist:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to create wishlist" },
      },
      { status: 500 }
    );
  }
}
