/**
 * Store Detail API Route
 * Returns a single store by ID or slug
 */

import { NextRequest, NextResponse } from "next/server";
import { getStoreService } from "@/services/store.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const storeService = getStoreService();

    // Try to find by ID first, then by slug
    let store = await storeService.getStoreById(id);
    
    if (!store) {
      store = await storeService.getStoreBySlug(id);
    }

    if (!store) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "STORE_NOT_FOUND",
            message: `Store with ID or slug "${id}" not found`,
          },
        },
        { status: 404 }
      );
    }

    // Get additional store content
    const content = await storeService.getStoreContent(store.id);

    return NextResponse.json({
      success: true,
      data: {
        store,
        content,
      },
    });
  } catch (error) {
    console.error("Failed to fetch store:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "STORE_FETCH_ERROR",
          message: "Failed to fetch store details",
        },
      },
      { status: 500 }
    );
  }
}
