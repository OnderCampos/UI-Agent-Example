/**
 * Wishlist Item API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getWishlistService } from "@/services/wishlist.service";

interface RouteParams {
  params: Promise<{ id: string; itemId: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    await wishlistService.removeItem(userId, id, itemId);

    return NextResponse.json({
      success: true,
      data: { removed: true },
    });
  } catch (error) {
    console.error("Failed to remove item:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to remove item" },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
    const body = await request.json();
    const { note, priority } = body;

    const userId = "mock-user-id";
    const wishlistService = getWishlistService();

    const item = await wishlistService.updateItem(userId, id, itemId, {
      note,
      priority,
    });

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("Failed to update item:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to update item" },
      },
      { status: 500 }
    );
  }
}
